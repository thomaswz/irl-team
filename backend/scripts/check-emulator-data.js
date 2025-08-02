import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator, collection, getDocs } from 'firebase/firestore'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Firebase config for emulator
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_STAGING_API_KEY,
  authDomain: process.env.VITE_FIREBASE_STAGING_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_STAGING_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STAGING_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_STAGING_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_STAGING_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

connectFirestoreEmulator(db, 'localhost', process.env.VITE_FIRESTORE_EMULATOR_PORT || 8080)

const EMULATOR_BASE_URL = `http://localhost:${process.env.VITE_AUTH_EMULATOR_PORT || 9099}`
const PROJECT_ID = process.env.VITE_FIREBASE_STAGING_PROJECT_ID || 'djh-projects'

async function checkAuthUsers() {
  try {
    console.log('🔍 Checking Firebase Auth emulator...')

    // Try to get users from Auth emulator
    const response = await fetch(
      `${EMULATOR_BASE_URL}/identitytoolkit/v1/projects/${PROJECT_ID}/accounts:query`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      },
    )

    if (response.ok) {
      const data = await response.json()
      console.log('✅ Auth emulator is running')
      console.log('📋 Users in Auth emulator:', data.userInfo?.length || 0)
      if (data.userInfo) {
        data.userInfo.forEach((user) => {
          console.log(`  • ${user.email} (${user.localId})`)
        })
      }
    } else {
      console.log('❌ Auth emulator not responding:', response.status)
    }
  } catch (error) {
    console.log('❌ Error checking Auth emulator:', error.message)
  }
}

async function checkFirestoreData() {
  try {
    console.log('\n🔍 Checking Firestore emulator...')

    // Check roles collection
    const rolesSnapshot = await getDocs(collection(db, 'roles'))
    console.log('📋 Roles in Firestore:', rolesSnapshot.size)
    rolesSnapshot.forEach((doc) => {
      console.log(`  • ${doc.id}: ${doc.data().name}`)
    })

    // Check users collection
    const usersSnapshot = await getDocs(collection(db, 'users'))
    console.log('📋 Users in Firestore:', usersSnapshot.size)
    usersSnapshot.forEach((doc) => {
      const userData = doc.data()
      console.log(`  • ${userData.email} (${userData.role})`)
    })

    // Check Gantt data collection
    const ganttSnapshot = await getDocs(collection(db, 'ganttTemplates/Default/Tasks'))
    console.log('📊 Gantt Tasks in Firestore:', ganttSnapshot.size)
    ganttSnapshot.forEach((doc) => {
      const taskData = doc.data()
      console.log(`  • ${taskData.name} (${taskData.resource})`)
    })
  } catch (error) {
    console.log('❌ Error checking Firestore:', error.message)
  }
}

async function checkEmulatorStatus() {
  console.log('🚀 Checking Firebase emulator status...\n')

  await checkAuthUsers()
  await checkFirestoreData()

  console.log('\n✅ Data check completed!')
}

checkEmulatorStatus()

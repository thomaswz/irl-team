// Script to load users into Firebase Auth emulator
import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword } from 'firebase/auth'
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  addDoc,
  doc,
  setDoc,
} from 'firebase/firestore'
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
const auth = getAuth(app)
const db = getFirestore(app)

// Connect to emulators
connectAuthEmulator(auth, `http://localhost:${process.env.VITE_AUTH_EMULATOR_PORT || 9099}`)
connectFirestoreEmulator(db, 'localhost', process.env.VITE_FIRESTORE_EMULATOR_PORT || 8080)

async function createUser(email, password, role) {
  try {
    // Create user using Firebase SDK (this is what worked originally)
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    console.log(`✅ Created user: ${email} (${role})`)

    // Store user role in Firestore
    try {
      await setDoc(doc(db, 'users', user.uid), {
        email: email,
        role: role,
        displayName: `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
        createdAt: new Date(),
        lastLogin: new Date(),
        isActive: true,
        permissions: getRolePermissions(role),
      })
      console.log(`✅ Stored role in Firestore for: ${email}`)
    } catch (firestoreError) {
      console.error(`❌ Error storing role in Firestore for ${email}:`, firestoreError.message)
    }

    return user.uid
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log(`User ${email} already exists, skipping...`)
      return null
    } else {
      console.error(`❌ Error creating user ${email}:`, error.message)
      return null
    }
  }
}

function getRolePermissions(role) {
  const permissions = {
    admin: [
      'read:all',
      'write:all',
      'delete:all',
      'upload:documents',
      'manage:users',
      'view:reports',
      'edit:tasks',
      'delete:tasks',
    ],
    editing: [
      'read:all',
      'write:tasks',
      'edit:tasks',
      'view:documents',
      'download:documents',
      'view:reports',
    ],
    viewing: ['read:tasks', 'view:documents', 'download:documents', 'view:reports'],
  }
  return permissions[role] || []
}

async function createRoleDefinitions() {
  try {
    console.log('📋 Creating role definitions in Firestore...')

    const roles = [
      {
        id: 'admin',
        name: 'Administrator',
        description: 'Full system access with all permissions',
        permissions: getRolePermissions('admin'),
        color: '#dc3545',
        icon: 'shield-check',
      },
      {
        id: 'editing',
        name: 'Editor',
        description: 'Can edit tasks and view documents',
        permissions: getRolePermissions('editing'),
        color: '#fd7e14',
        icon: 'pencil-square',
      },
      {
        id: 'viewing',
        name: 'Viewer',
        description: 'Read-only access to tasks and documents',
        permissions: getRolePermissions('viewing'),
        color: '#6c757d',
        icon: 'eye',
      },
    ]

    for (const role of roles) {
      await setDoc(doc(db, 'roles', role.id), {
        ...role,
        createdAt: new Date(),
        isActive: true,
      })
      console.log(`✅ Created role definition: ${role.name}`)
    }
  } catch (error) {
    console.error('❌ Error creating role definitions:', error.message)
  }
}

async function loadUsers() {
  console.log('🚀 Loading users and roles into Firebase emulators...')

  // First create role definitions
  await createRoleDefinitions()

  const users = [
    { email: 'admin@example.com', password: 'password123', role: 'admin' },
    { email: 'editor@example.com', password: 'password123', role: 'editing' },
    { email: 'viewer@example.com', password: 'password123', role: 'viewing' },
  ]

  const createdUserIds = []
  for (const user of users) {
    const userId = await createUser(user.email, user.password, user.role)
    if (userId) {
      createdUserIds.push({ id: userId, ...user })
    }
  }

  console.log('🎉 User and role loading completed!')
  console.log('\n📋 Test Users:')
  console.log('  • Admin: admin@example.com / password123')
  console.log('  • Editor: editor@example.com / password123')
  console.log('  • Viewer: viewer@example.com / password123')

  console.log('\n📁 Firestore Collections Created:')
  console.log('  • /users - User profiles with roles')
  console.log('  • /roles - Role definitions and permissions')

  console.log('\n🔐 Role Permissions:')
  console.log('  • Admin: Full access (upload, edit, delete)')
  console.log('  • Editor: Edit tasks, view documents')
  console.log('  • Viewer: Read-only access')

  process.exit(0)
}

loadUsers()

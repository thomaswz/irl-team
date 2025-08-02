// Script to load Gantt template data into Firestore production
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, deleteDoc, getDocs } from 'firebase/firestore'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// NO emulator connection - this will connect to production Firebase

// Load template data from the correct path
const templatePath = path.join(__dirname, '..', 'ganttTemplate.json')
const templateData = JSON.parse(fs.readFileSync(templatePath, 'utf8'))

async function loadGanttData() {
  try {
    console.log('Loading Gantt template data into Firebase PRODUCTION...')
    console.log('⚠️  WARNING: This will modify data in your production Firebase project!')

    // Clear existing data
    const existingDocs = await getDocs(collection(db, 'ganttTemplates/Default/Tasks'))
    for (const doc of existingDocs.docs) {
      await deleteDoc(doc.ref)
    }

    // Add new data
    for (const item of templateData) {
      const docData = {}

      // Convert Firestore format to regular object
      for (const [key, value] of Object.entries(item.fields)) {
        if (value.stringValue !== undefined) {
          docData[key] = value.stringValue
        } else if (value.integerValue !== undefined) {
          docData[key] = parseInt(value.integerValue)
        } else if (value.timestampValue !== undefined) {
          docData[key] = new Date(value.timestampValue)
        } else if (value.nullValue !== undefined) {
          docData[key] = null
        }
      }

      await addDoc(collection(db, 'ganttTemplates/Default/Tasks'), docData)
      console.log(`Added task: ${docData.name}`)
    }

    console.log('Gantt template data loaded successfully into production!')
  } catch (error) {
    console.error('Error loading Gantt data:', error)
  }
}

loadGanttData()

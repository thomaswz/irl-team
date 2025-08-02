import { spawn } from 'child_process'

console.log('🚀 Firebase Emulator Status Check')
console.log('=====================================\n')

console.log('📋 To start Firebase emulators, run:')
console.log('   npx firebase emulators:start\n')

console.log('🔍 This will start:')
console.log('   • Auth emulator on port 9099')
console.log('   • Firestore emulator on port 8080')
console.log('   • Storage emulator on port 9199')
console.log('   • Firebase UI on port 4000\n')

console.log('📝 After emulators are running:')
console.log('   1. Run: node backend/scripts/load-all-data.js')
console.log('   2. Or run individual scripts:')
console.log('      • node backend/scripts/load-emulator-users.js')
console.log('      • node backend/scripts/load-gantt-data.js\n')

console.log('🌐 Access Firebase UI at: http://localhost:4000')
console.log('   (This will show you the emulator status and data)\n')

// Try to check if emulators are already running
console.log('🔍 Checking if emulators are currently running...')

const netstat = spawn('netstat', ['-an'], { shell: true })

netstat.stdout.on('data', (data) => {
  const output = data.toString()
  const lines = output.split('\n')

  const authRunning = lines.some((line) => line.includes(':9099'))
  const firestoreRunning = lines.some((line) => line.includes(':8080'))
  const storageRunning = lines.some((line) => line.includes(':9199'))

  console.log(`   Auth (9099): ${authRunning ? '✅ Running' : '❌ Not running'}`)
  console.log(`   Firestore (8080): ${firestoreRunning ? '✅ Running' : '❌ Not running'}`)
  console.log(`   Storage (9199): ${storageRunning ? '✅ Running' : '❌ Not running'}`)

  if (!authRunning || !firestoreRunning || !storageRunning) {
    console.log('\n⚠️  Some emulators are not running. Please start them first.')
  } else {
    console.log('\n✅ All emulators appear to be running!')
  }
})

netstat.stderr.on('data', (data) => {
  console.log('❌ Error checking ports:', data.toString())
})

netstat.on('close', (code) => {
  if (code !== 0) {
    console.log('❌ Could not check port status')
  }
})

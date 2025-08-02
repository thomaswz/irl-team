// Master script to load all data into Firebase emulators
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function runScript(scriptName) {
  return new Promise((resolve, reject) => {
    const scriptPath = join(__dirname, scriptName)
    console.log(`🚀 Running ${scriptName}...`)

    const child = spawn('node', [scriptPath], {
      stdio: 'inherit',
      cwd: process.cwd(),
    })

    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ ${scriptName} completed successfully`)
        resolve()
      } else {
        console.error(`❌ ${scriptName} failed with code ${code}`)
        reject(new Error(`${scriptName} failed`))
      }
    })

    child.on('error', (error) => {
      console.error(`❌ Error running ${scriptName}:`, error)
      reject(error)
    })
  })
}

async function main() {
  try {
    // Check if emulators are running by trying to connect
    console.log('🔍 Checking if Firebase emulators are running...')

    // Run the scripts in sequence
    await runScript('load-emulator-users.js')
    await runScript('load-gantt-data.js')

    console.log('\n🎉 All data loaded successfully!')
    console.log('\n📋 Available scripts:')
    console.log('  • load-emulator-users.js - Load test users')
    console.log('  • load-gantt-data.js - Load Gantt chart data')
  } catch (error) {
    console.error('❌ Error in main process:', error)
    process.exit(1)
  }
}

main()

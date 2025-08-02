// Master script to load all data into Firebase PRODUCTION
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
    console.log('🚀 Loading all data into Firebase PRODUCTION...')
    console.log('⚠️  WARNING: This will modify your production Firebase project!')
    console.log('📋 Project: djh-projects')
    console.log('🌐 URL: https://djh-projects.web.app')
    console.log('')

    // Run the production scripts in sequence
    await runScript('load-production-users.js')
    await runScript('load-production-gantt-data.js')

    console.log('\n🎉 All data loaded successfully into PRODUCTION!')
    console.log('\n📋 Available production scripts:')
    console.log('  • load-production-users.js - Load test users into production')
    console.log('  • load-production-gantt-data.js - Load Gantt chart data into production')
    console.log('\n📋 Available emulator scripts:')
    console.log('  • load-emulator-users.js - Load test users into emulators')
    console.log('  • load-gantt-data.js - Load Gantt chart data into emulators')
    console.log('  • load-all-data.js - Load all data into emulators')
  } catch (error) {
    console.error('❌ Error in main process:', error)
    process.exit(1)
  }
}

main()

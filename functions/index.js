/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { setGlobalOptions } = require('firebase-functions')
const { onRequest } = require('firebase-functions/https')
const logger = require('firebase-functions/logger')

// Initialize Firebase Admin SDK
const admin = require('firebase-admin')

admin.initializeApp()

// Get Firestore instance
const db = admin.firestore()

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 })

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// Example function using admin SDK
exports.helloWorld = onRequest((request, response) => {
  logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase with Admin SDK!')
})

// Example function to read from Firestore using admin SDK
exports.getUserData = onRequest(async (request, response) => {
  try {
    const userId = request.query.userId
    if (!userId) {
      response.status(400).send('User ID is required')
      return
    }

    const userDoc = await db.collection('users').doc(userId).get()
    if (userDoc.exists) {
      response.json(userDoc.data())
    } else {
      response.status(404).send('User not found')
    }
  } catch (error) {
    logger.error('Error getting user data:', error)
    response.status(500).send('Internal server error')
  }
})

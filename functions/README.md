# Firebase Functions Setup

## Service Account Configuration

This Firebase Functions setup uses a service account for server-side operations with full admin privileges.

### Setup Instructions:

1. **Download Service Account Key**:

   - Go to your Firebase Console
   - Navigate to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Save the JSON file

2. **Configure Service Account**:

   - Replace the contents of `serviceAccountKey.json` with your actual service account JSON
   - The file is already in `.gitignore` to prevent accidental commits

3. **Install Dependencies**:

   ```bash
   cd functions
   npm install
   ```

4. **Deploy Functions**:
   ```bash
   npm run deploy
   ```

### Available Functions:

- `helloWorld`: Basic test function
- `getUserData`: Example function that reads user data from Firestore using admin SDK

### Security Notes:

- The service account has full admin access to your Firebase project
- Never commit the service account key to version control
- Use environment variables in production for better security
- Consider using Firebase App Check for additional security

### Environment Variables (Optional):

For production, you can use environment variables instead of the JSON file:

```bash
firebase functions:config:set service_account.project_id="your-project-id"
firebase functions:config:set service_account.private_key="-----BEGIN PRIVATE KEY-----\n..."
firebase functions:config:set service_account.client_email="firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com"
```

Then update the initialization in `index.js` to use:

```javascript
const serviceAccount = {
  projectId: functions.config().service_account.project_id,
  privateKey: functions.config().service_account.private_key.replace(/\\n/g, '\n'),
  clientEmail: functions.config().service_account.client_email,
}
```

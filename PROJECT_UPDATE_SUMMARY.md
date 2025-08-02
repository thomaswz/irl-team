# Project Update Summary

## Changes Made

The project has been updated to use the new project names:
- **Production**: `irl-team`
- **Staging**: `irl-team-staging`

### Files Updated

1. **Environment Configuration**
   - `env.production` - Updated to use `irl-team` project
   - `env.staging` - Updated to use `irl-team-staging` project

2. **Firebase Configuration**
   - `firebase.json` - Updated function codebase names
   - `firebase.production.json` - Production configuration
   - `firebase.staging.json` - Staging configuration

3. **Package Configuration**
   - `package.json` - Updated project name, description, and deployment scripts

4. **Documentation**
   - `README.md` - Updated project title
   - `DEPLOYMENT.md` - Updated project references
   - `FIREBASE_SETUP.md` - Updated project names and setup instructions

## Next Steps

### 1. Create Firebase Projects

You'll need to create two new Firebase projects:

```bash
# Create staging project
firebase projects:create irl-team-staging

# Create production project
firebase projects:create irl-team
```

### 2. Update Environment Variables

Update the environment files with your actual Firebase configuration:

**For `env.production`:**
```bash
VITE_FIREBASE_PRODUCTION_API_KEY=your-actual-api-key
VITE_FIREBASE_PRODUCTION_AUTH_DOMAIN=irl-team.firebaseapp.com
VITE_FIREBASE_PRODUCTION_PROJECT_ID=irl-team
VITE_FIREBASE_PRODUCTION_STORAGE_BUCKET=irl-team.firebasestorage.app
VITE_FIREBASE_PRODUCTION_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_PRODUCTION_APP_ID=your-app-id
```

**For `env.staging`:**
```bash
VITE_FIREBASE_STAGING_API_KEY=your-actual-api-key
VITE_FIREBASE_STAGING_AUTH_DOMAIN=irl-team-staging.firebaseapp.com
VITE_FIREBASE_STAGING_PROJECT_ID=irl-team-staging
VITE_FIREBASE_STAGING_STORAGE_BUCKET=irl-team-staging.firebasestorage.app
VITE_FIREBASE_STAGING_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_STAGING_APP_ID=your-app-id
```

### 3. Initialize Firebase Projects

```bash
# Initialize staging project
firebase use irl-team-staging
firebase init hosting
firebase init firestore
firebase init storage
firebase init functions

# Initialize production project
firebase use irl-team
firebase init hosting
firebase init firestore
firebase init storage
firebase init functions
```

### 4. Update Service Account Keys

Generate new service account keys for both projects and update the files:
- `serviceAccountKey-production.json` - For `irl-team` project
- `serviceAccountKey-staging.json` - For `irl-team-staging` project

### 5. Test the Setup

```bash
# Test staging environment
npm run dev:staging

# Test production environment
npm run dev:production
```

## Available Commands

- `npm run dev:staging` - Development with staging environment
- `npm run dev:production` - Development with production environment
- `npm run build:staging` - Build for staging
- `npm run build:production` - Build for production
- `npm run deploy:staging` - Deploy to staging
- `npm run deploy:production` - Deploy to production

## Important Notes

1. **Environment Variables**: Make sure to update the environment files with your actual Firebase project configuration values.

2. **Service Account Keys**: Never commit these files to version control. They're already in `.gitignore`.

3. **Firebase CLI**: Ensure you're logged into Firebase CLI and have access to both projects.

4. **Project Permissions**: Make sure you have the necessary permissions to create and manage both Firebase projects. 
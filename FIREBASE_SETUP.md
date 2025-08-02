# Firebase Dual Environment Setup

This guide explains how to set up and use the dual Firebase environment configuration for staging and production.

## Overview

The app is configured to work with two Firebase projects:
- **Staging**: `irl-team-staging` (for testing and development)
- **Production**: `irl-team` (for live users)

## Environment Variables

### Service Account Keys

You'll need separate service account keys for each environment:

1. **Generate Production Service Account Key:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your `irl-team` project
   - Go to **Project Settings** → **Service Accounts**
   - Click **Generate new private key**
   - Save as `serviceAccountKey-production.json`

2. **Generate Staging Service Account Key:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your `irl-team-staging` project
   - Go to **Project Settings** → **Service Accounts**
   - Click **Generate new private key**
   - Save as `serviceAccountKey-staging.json`

**⚠️ Important:** Never commit these files to version control. They're already added to `.gitignore`.

### Staging Environment
Create a `.env.staging` file with the following variables:
```bash
VITE_FIREBASE_ENVIRONMENT=staging
VITE_FIREBASE_STAGING_API_KEY=your_staging_api_key
VITE_FIREBASE_STAGING_AUTH_DOMAIN=irl-team-staging.firebaseapp.com
VITE_FIREBASE_STAGING_PROJECT_ID=irl-team-staging
VITE_FIREBASE_STAGING_STORAGE_BUCKET=irl-team-staging.appspot.com
VITE_FIREBASE_STAGING_MESSAGING_SENDER_ID=your_staging_sender_id
VITE_FIREBASE_STAGING_APP_ID=your_staging_app_id
VITE_FIREBASE_STAGING_SERVICE_ACCOUNT_PATH=./serviceAccountKey-staging.json
```

### Production Environment
Create a `.env.production` file with the following variables:
```bash
VITE_FIREBASE_ENVIRONMENT=production
VITE_FIREBASE_PRODUCTION_API_KEY=your_production_api_key
VITE_FIREBASE_PRODUCTION_AUTH_DOMAIN=irl-team.firebaseapp.com
VITE_FIREBASE_PRODUCTION_PROJECT_ID=irl-team
VITE_FIREBASE_PRODUCTION_STORAGE_BUCKET=irl-team.appspot.com
VITE_FIREBASE_PRODUCTION_MESSAGING_SENDER_ID=your_production_sender_id
VITE_FIREBASE_PRODUCTION_APP_ID=your_production_app_id
VITE_FIREBASE_PRODUCTION_SERVICE_ACCOUNT_PATH=./serviceAccountKey-production.json
```

## Firebase Project Setup

### 1. Create Staging Project
```bash
firebase projects:create irl-team-staging
```

### 2. Initialize Staging Project
```bash
firebase use irl-team-staging
firebase init hosting
firebase init firestore
firebase init storage
firebase init functions
```

### 3. Set up Production Project (if not already done)
```bash
firebase use irl-team
firebase init hosting
firebase init firestore
firebase init storage
firebase init functions
```

## Development Commands

### Local Development
```bash
# Development with staging environment
npm run dev:staging

# Development with production environment
npm run dev:production

# Default development (uses production by default)
npm run dev
```

### Building for Different Environments
```bash
# Build for staging
npm run build:staging

# Build for production
npm run build:production

# Default build (uses production by default)
npm run build
```

## Deployment

### Deploy to Staging
```bash
# Deploy only hosting to staging
npm run deploy:staging

# Deploy everything to staging
npm run deploy:staging:all
```

### Deploy to Production
```bash
# Deploy only hosting to production
npm run deploy:production

# Deploy everything to production
npm run deploy:production:all
```

## Firebase CLI Configuration

The `.firebaserc` file is configured with both projects:
```json
{
  "projects": {
    "default": "djh-projects",
    "staging": "djh-staging",
    "production": "djh-projects"
  }
}
```

## Switching Between Projects

### Using Firebase CLI
```bash
# Switch to staging
firebase use staging

# Switch to production
firebase use production

# Check current project
firebase projects:list
```

### Using Environment Variables
The app automatically switches environments based on the `VITE_FIREBASE_ENVIRONMENT` variable:
- `staging` - Uses staging Firebase project
- `production` (or any other value) - Uses production Firebase project

## Security Rules

Both environments use the same security rules files:
- `firestore.rules` - Firestore security rules
- `storage.rules` - Storage security rules

Make sure to deploy rules to both environments:
```bash
# Deploy rules to staging
firebase deploy --only firestore:rules,storage --project staging

# Deploy rules to production
firebase deploy --only firestore:rules,storage --project production
```

## Data Migration

When setting up the staging environment, you may want to copy data from production:

1. Export data from production:
```bash
firebase firestore:export ./backup/production --project production
```

2. Import data to staging:
```bash
firebase firestore:import ./backup/production --project staging
```

## Environment-Specific Features

The app exports the current environment, which you can use in your components:

```javascript
import { environment } from '@/firebase'

// Check current environment
if (environment === 'staging') {
  // Staging-specific logic
} else {
  // Production-specific logic
}
```

## Troubleshooting

### Common Issues

1. **Environment variables not loading**: Make sure your `.env` files are in the root directory and follow the naming convention.

2. **Wrong project being used**: Check the `VITE_FIREBASE_ENVIRONMENT` variable and ensure it's set correctly.

3. **Deployment fails**: Verify that you're using the correct project with `firebase use [project-name]`.

4. **Emulator connection issues**: Ensure emulator ports are correctly configured and not conflicting.

### Debugging

To debug environment configuration:
```javascript
// In your Vue component
console.log('Current environment:', import.meta.env.VITE_FIREBASE_ENVIRONMENT)
console.log('Firebase config:', firebaseConfig)
```

## Best Practices

1. **Never commit `.env` files**: Add them to `.gitignore`
2. **Use different API keys**: Each environment should have its own Firebase project and API keys
3. **Test in staging first**: Always test changes in staging before deploying to production
4. **Monitor both environments**: Set up monitoring and logging for both staging and production
5. **Regular backups**: Regularly backup production data and test restores in staging 
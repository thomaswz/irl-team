# Data Loading Guide

This guide explains how to load test data into your Firebase project for development and production.

## Available Scripts

### Emulator Scripts (Safe for Development)

```bash
# Load all data into emulators
npm run load:emulator

# Load only users into emulators
npm run load:users:emulator

# Load only Gantt data into emulators
npm run load:gantt:emulator
```

### Production Scripts (⚠️ Modifies Real Data)

```bash
# Load all data into production
npm run load:production

# Load only users into production
npm run load:users:production

# Load only Gantt data into production
npm run load:gantt:production
```

## What Each Script Does

### User Loading Scripts

- Creates test users with different roles (admin, editor, viewer)
- Sets up role definitions and permissions
- Stores user profiles in Firestore

**Test Users Created:**

- `admin@example.com` / `password123` (Full access)
- `editor@example.com` / `password123` (Edit tasks, view documents)
- `viewer@example.com` / `password123` (Read-only access)

### Gantt Data Loading Scripts

- Loads template Gantt chart data from `ganttTemplate.json`
- Clears existing data and adds new template data
- Creates tasks with start/end dates, dependencies, etc.

## Environment Setup

Make sure your `.env` file contains the correct Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=djh-projects
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Firebase Project Information

- **Project ID**: `djh-projects`
- **Hosting URL**: https://djh-projects.web.app
- **Console**: https://console.firebase.google.com/project/djh-projects

## Troubleshooting

### Common Issues

1. **Authentication Errors**

   - Ensure you're logged into Firebase CLI: `firebase login`
   - Verify your project is selected: `firebase use djh-projects`

2. **Permission Errors**

   - Check that your Firebase project has the necessary services enabled
   - Verify your service account has the required permissions

3. **Environment Variables**

   - Ensure `.env` file exists and contains correct Firebase config
   - Check that all required variables are set

4. **Emulator Connection Issues**
   - Start emulators: `firebase emulators:start`
   - Verify emulator ports match your configuration

### Verification Steps

After loading data, you can verify it was loaded correctly:

1. **Check Firebase Console**

   - Go to https://console.firebase.google.com/project/djh-projects
   - Navigate to Authentication > Users
   - Navigate to Firestore Database > Data

2. **Test Login**

   - Try logging in with the test users
   - Verify roles and permissions work correctly

3. **Check Gantt Data**
   - Navigate to the Gantt chart in your application
   - Verify template data is displayed correctly

## Best Practices

1. **Always use emulators for development**
2. **Test thoroughly before loading to production**
3. **Backup production data before major changes**
4. **Use specific scripts rather than loading all data when possible**
5. **Verify data after loading**

## Script Differences

| Feature       | Emulator Scripts        | Production Scripts         |
| ------------- | ----------------------- | -------------------------- |
| Connection    | `connectAuthEmulator()` | Direct Firebase connection |
| Safety        | Safe for development    | Modifies real data         |
| Use Case      | Local development       | Production setup           |
| Warning Level | Info only               | ⚠️ Warnings displayed      |

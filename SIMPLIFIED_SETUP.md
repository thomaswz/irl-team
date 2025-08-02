# Simplified Single Project Setup

## Overview

This project now uses a simplified single-project approach with one `.env` file and clear environment switching.

## Environment Management

### Single .env File
All environment variables are in one `.env` file:
- `VITE_FIREBASE_ENVIRONMENT=staging|production`
- Staging Firebase config
- Production Firebase config
- Emulator config

### Environment Switching

```bash
# Switch to staging
./switch-env.sh staging

# Switch to production  
./switch-env.sh production
```

## Development

```bash
# Development with current environment
npm run dev

# Development with specific environment
npm run dev:staging
npm run dev:production
```

## Building

```bash
# Build for current environment
npm run build

# Build for specific environment
npm run build:staging
npm run build:production
```

## Deployment

```bash
# Deploy to staging
./deploy.sh staging

# Deploy to production
./deploy.sh production

# Or use npm scripts
npm run deploy:staging
npm run deploy:production
```

## Emulator Development

```bash
# Start emulators
firebase emulators:start

# Load test data
npm run load:emulator

# Access emulator UI
http://localhost:4000
```

## Project Structure

```
irl-team/
├── src/                    # Source code
├── functions/              # Single functions directory
├── firebase.json          # Single Firebase config
├── .env                   # Single environment file
├── deploy.sh              # Deployment script
├── switch-env.sh          # Environment switcher
└── package.json           # Build scripts
```

## Benefits

✅ **Single Configuration**: One Firebase config file
✅ **Simple Environment Switching**: One .env file
✅ **Clear Deployment**: Simple deploy scripts
✅ **No Conflicts**: No duplicate configurations
✅ **Easy Maintenance**: Single codebase to manage

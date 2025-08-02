# IRL Team

Vue 3 application with Firebase dual environment setup for staging and production.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
# Development with staging environment
npm run dev:staging

# Development with production environment
npm run dev:production

# Default development (uses production by default)
npm run dev
```

### Compile and Minify for Production

```sh
# Build for staging
npm run build:staging

# Build for production
npm run build:production

# Default build (uses production by default)
npm run build
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

## Deployment

This project is configured for Firebase hosting deployment with dual environments.

### Deploy to Staging

```sh
# Deploy only hosting to staging
npm run deploy:staging

# Deploy everything to staging
npm run deploy:staging:all
```

### Deploy to Production

```sh
# Deploy only hosting to production
npm run deploy:production

# Deploy everything to production
npm run deploy:production:all
```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Environment Setup

For detailed environment setup instructions, see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md).

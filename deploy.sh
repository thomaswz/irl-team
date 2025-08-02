#!/bin/bash

# Simple deployment script for IRL Team
# Usage: ./deploy.sh [staging|production]

ENVIRONMENT=${1:-staging}

echo "🚀 Deploying to $ENVIRONMENT environment..."

if [ "$ENVIRONMENT" = "staging" ]; then
    echo "📦 Building for staging..."
    npm run build:staging
    
    echo "🚀 Deploying to staging..."
    firebase deploy --project irl-team-staging
    
elif [ "$ENVIRONMENT" = "production" ]; then
    echo "📦 Building for production..."
    npm run build:production
    
    echo "🚀 Deploying to production..."
    firebase deploy --project irl-team
    
else
    echo "❌ Invalid environment. Use 'staging' or 'production'"
    exit 1
fi

echo "✅ Deployment complete!"

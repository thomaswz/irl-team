#!/bin/bash

# Environment switcher for IRL Team
# Usage: ./switch-env.sh [staging|production]

ENVIRONMENT=${1:-staging}

if [ "$ENVIRONMENT" = "staging" ] || [ "$ENVIRONMENT" = "production" ]; then
    echo "🔄 Switching to $ENVIRONMENT environment..."
    
    # Update .env file
    sed -i "s/VITE_FIREBASE_ENVIRONMENT=.*/VITE_FIREBASE_ENVIRONMENT=$ENVIRONMENT/" .env
    
    echo "✅ Environment switched to $ENVIRONMENT"
    echo "📝 Current environment: $(grep VITE_FIREBASE_ENVIRONMENT .env)"
    
else
    echo "❌ Invalid environment. Use 'staging' or 'production'"
    echo "📋 Available environments:"
    echo "  • staging"
    echo "  • production"
    exit 1
fi

#!/bin/bash
set -e  # Exit immediately if any command fails

echo "🚀 Starting deployment..."

# Navigate to app directory
cd /home/ubuntu/virtual-scroll-app

# Pull latest code from GitHub
echo "📥 Pulling latest changes from GitHub..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run tests
echo "🧪 Running tests..."
npm run test

# Check if tests passed
if [ $? -eq 0 ]; then
  echo "✅ Tests passed! Building application..."
  npm run build:production
  
  echo "🔄 Restarting nginx..."
  sudo systemctl restart nginx
  
  echo "✅ Deployment successful!"
else
  echo "❌ Tests failed! Deployment aborted."
  exit 1
fi
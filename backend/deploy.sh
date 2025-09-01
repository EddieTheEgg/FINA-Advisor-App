#!/bin/bash

# Deployment Script for Finance App Backend
# Run this on your EC2 instance to deploy/update your app

set -e

echo "🚀 Deploying Finance App Backend..."

# Navigate to app directory
cd /home/ubuntu/finance-app/backend

# Pull latest changes
echo "📥 Pulling latest code..."
git pull origin main

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down

# Remove old images
echo "🧹 Cleaning up old images..."
docker image prune -f

# Build and start containers
echo "🏗️ Building and starting containers..."
docker-compose -f docker-compose.prod.yml up -d --build

# Show running containers
echo "📊 Container status:"
docker-compose -f docker-compose.prod.yml ps

# Show logs
echo "📝 Recent logs:"
docker-compose -f docker-compose.prod.yml logs --tail=20

echo "✅ Deployment complete!"
echo "🌐 Your app should be running at: https://your-domain.com"

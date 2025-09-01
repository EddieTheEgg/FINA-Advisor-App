#!/bin/bash

# EC2 Setup Script for Finance App Backend
# Run this script on your fresh Ubuntu EC2 instance

set -e

echo "🚀 Setting up Finance App Backend on EC2..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Docker
echo "🐳 Installing Docker..."
sudo apt install -y docker.io docker-compose-v2
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu

# Install NGINX
echo "🌐 Installing NGINX..."
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Install Certbot for SSL
echo "🔒 Installing Certbot for SSL..."
sudo apt install -y certbot python3-certbot-nginx

# Install other utilities
echo "🛠️ Installing utilities..."
sudo apt install -y curl git htop ufw

# Configure firewall
echo "🔥 Configuring firewall..."
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw --force enable

# Create app directory
echo "📁 Creating app directory..."
mkdir -p /home/ubuntu/finance-app
cd /home/ubuntu/finance-app

# Clone your repository (you'll need to replace this URL)
echo "📥 Cloning repository..."
git clone https://github.com/EddieTheEgg/FINA-Advisor-App.git .

# Navigate to backend
cd backend

# Copy environment template
echo "⚙️ Setting up environment..."
cp env.template .env
echo "⚠️  IMPORTANT: Edit .env file with your actual values!"

# Set proper permissions
sudo chown -R ubuntu:ubuntu /home/ubuntu/finance-app

echo "✅ Basic setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Edit /home/ubuntu/finance-app/backend/.env with your values"
echo "2. Edit nginx/sites-available/finance-app with your domain"
echo "3. Run: docker-compose -f docker-compose.prod.yml up -d"
echo "4. Set up SSL: sudo certbot --nginx -d your-domain.com"
echo ""
echo "🎉 Your EC2 instance is ready for deployment!"

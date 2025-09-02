#!/bin/bash

# Setup script for domain configuration with Nginx
# This script should be run on the EC2 instance

echo "🌐 Setting up domain configuration for finance--connection.app..."

# Install Nginx
echo "📦 Installing Nginx..."
sudo apt update
sudo apt install -y nginx

# Create Nginx configuration
echo "⚙️ Creating Nginx configuration..."
sudo tee /etc/nginx/sites-available/llm-eiapp <<EOF
server {
    listen 80;
    server_name api.finance--connection.app 3.232.108.227;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        
        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
EOF

# Enable the site
echo "🔗 Enabling Nginx site..."
sudo ln -sf /etc/nginx/sites-available/llm-eiapp /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
echo "🧪 Testing Nginx configuration..."
sudo nginx -t

# Restart Nginx
echo "🔄 Restarting Nginx..."
sudo systemctl restart nginx
sudo systemctl enable nginx

# Configure firewall
echo "🔥 Configuring firewall..."
sudo ufw allow 'Nginx Full'
sudo ufw allow 80
sudo ufw allow 443

echo "✅ Domain setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Add DNS record: api.finance--connection.app → 3.232.108.227"
echo "2. Your backend will be accessible at: http://api.finance--connection.app"
echo "3. For HTTPS, you'll need to set up SSL (Let's Encrypt recommended)"
echo ""
echo "🔍 Check Nginx status: sudo systemctl status nginx"
echo "📝 View Nginx logs: sudo tail -f /var/log/nginx/access.log"

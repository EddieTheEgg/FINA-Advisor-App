#!/bin/bash

# SSL setup script with Let's Encrypt
# This script should be run on the EC2 instance AFTER setting up Nginx

echo "🔒 Setting up SSL with Let's Encrypt..."

# Install Certbot
echo "📦 Installing Certbot..."
sudo apt update
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
echo "🎫 Getting SSL certificate..."
echo "Make sure your DNS is pointing to this server before continuing!"
echo "Press Enter when ready..."
read

# Request certificate
sudo certbot --nginx -d api.finance--connection.app

# Test auto-renewal
echo "🧪 Testing auto-renewal..."
sudo certbot renew --dry-run

# Update Nginx configuration for HTTPS
echo "⚙️ Updating Nginx for HTTPS..."
sudo tee /etc/nginx/sites-available/llm-eiapp <<EOF
server {
    listen 80;
    server_name api.finance--connection.app;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.finance--connection.app;

    ssl_certificate /etc/letsencrypt/live/api.finance--connection.app/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.finance--connection.app/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

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

# Test and restart Nginx
echo "🧪 Testing Nginx configuration..."
sudo nginx -t

echo "🔄 Restarting Nginx..."
sudo systemctl restart nginx

echo "✅ SSL setup completed!"
echo ""
echo "🌐 Your backend is now accessible at:"
echo "   https://api.finance--connection.app"
echo ""
echo "🔒 SSL certificate will auto-renew every 60 days"
echo "📊 Check status: sudo certbot certificates"

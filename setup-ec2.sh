#!/bin/bash

# Setup script for LLM-EIapp backend on EC2
# This script should be run on the EC2 instance

echo "🔧 Setting up LLM-EIapp backend on EC2..."

# Update system packages
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Python and pip
echo "🐍 Installing Python and pip..."
sudo apt install -y python3 python3-pip python3-venv

# Install system dependencies for psycopg2
echo "🗄️ Installing PostgreSQL dependencies..."
sudo apt install -y libpq-dev python3-dev build-essential

# Create virtual environment
echo "🌍 Creating Python virtual environment..."
python3 -m venv venv
source venv/bin/activate

# Upgrade pip
echo "⬆️ Upgrading pip..."
pip install --upgrade pip

# Install Python dependencies
echo "📚 Installing Python dependencies..."
pip install -r requirements.txt

# Install gunicorn for production
echo "🚀 Installing Gunicorn..."
pip install gunicorn

# Create systemd service file
echo "⚙️ Creating systemd service..."
sudo tee /etc/systemd/system/llm-eiapp.service > /dev/null <<EOF
[Unit]
Description=LLM-EIapp Backend
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/llm-eiapp
Environment=PATH=/home/ubuntu/llm-eiapp/venv/bin
ExecStart=/home/ubuntu/llm-eiapp/venv/bin/gunicorn -w 4 -k uvicorn.workers.UvicornWorker backend.src.main:app --bind 0.0.0.0:8000
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd and enable service
echo "🔄 Reloading systemd..."
sudo systemctl daemon-reload
sudo systemctl enable llm-eiapp.service

echo "✅ Setup completed!"
echo "🚀 To start the service: sudo systemctl start llm-eiapp"
echo "📊 To check status: sudo systemctl status llm-eiapp"
echo "📝 To view logs: sudo journalctl -u llm-eiapp -f"

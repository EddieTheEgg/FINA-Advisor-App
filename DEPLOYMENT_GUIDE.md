# 🚀 LLM-EIapp Backend Deployment Guide

This guide will help you deploy your backend changes to AWS EC2.

## 📋 Prerequisites

- AWS EC2 instance running Ubuntu/Linux
- EC2 key pair (.pem file)
- EC2 instance accessible via SSH
- Security group allowing ports 22 (SSH) and 8000 (HTTP)

## 🔧 Quick Deployment

### 1. Deploy Files to EC2

```bash
# Make sure you're in the project root directory
cd /Users/edisonkwok/Downloads/LLM-EIapp

# Deploy to your EC2 instance
./deploy.sh <your-ec2-ip> <path-to-your-key.pem>

# Example:
./deploy.sh 54.123.45.67 ~/.ssh/my-key.pem
```

### 2. SSH into EC2 and Setup

```bash
# SSH into your EC2 instance
ssh -i <path-to-your-key.pem> ubuntu@<your-ec2-ip>

# Navigate to the project directory
cd /home/ubuntu/llm-eiapp

# Run the setup script
./setup-ec2.sh
```

### 3. Start the Service

```bash
# Start the backend service
sudo systemctl start llm-eiapp

# Check service status
sudo systemctl status llm-eiapp

# View logs
sudo journalctl -u llm-eiapp -f
```

## 🛠️ Manual Setup (Alternative)

If you prefer to set up manually:

### 1. Install Dependencies

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y python3 python3-pip python3-venv libpq-dev python3-dev build-essential
```

### 2. Create Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
pip install gunicorn
```

### 3. Configure Environment Variables

```bash
# Copy the example file
cp env.example .env

# Edit with your actual values
nano .env
```

### 4. Create Systemd Service

The setup script creates this automatically, but you can create it manually:

```bash
sudo nano /etc/systemd/system/llm-eiapp.service
```

## 📊 Service Management

Use the provided service management script:

```bash
./start-service.sh start    # Start service
./start-service.sh stop     # Stop service
./start-service.sh restart  # Restart service
./start-service.sh status   # Check status
./start-service.sh logs     # View logs
```

## 🔍 Troubleshooting

### Check Service Status
```bash
sudo systemctl status llm-eiapp
```

### View Service Logs
```bash
sudo journalctl -u llm-eiapp -f
```

### Check Port Usage
```bash
sudo netstat -tlnp | grep :8000
```

### Test API Endpoint
```bash
curl http://localhost:8000/
```

## 🌐 Access Your API

Once deployed, your API will be available at:
- **Local (on EC2)**: `http://localhost:8000`
- **External**: `http://<your-ec2-public-ip>:8000`

## 🔄 Updating After Changes

To deploy new changes:

1. Run the deployment script again:
   ```bash
   ./deploy.sh <ec2-ip> <key-file>
   ```

2. SSH into EC2 and restart the service:
   ```bash
   ssh -i <key-file> ubuntu@<ec2-ip>
   cd /home/ubuntu/llm-eiapp
   sudo systemctl restart llm-eiapp
   ```

## 📝 Important Notes

- Make sure your EC2 security group allows inbound traffic on port 8000
- The service runs as a systemd service and will auto-restart on failure
- Logs are available via `sudo journalctl -u llm-eiapp -f`
- The backend runs on port 8000 by default
- Database connection string should be updated in your `.env` file

## 🆘 Need Help?

If you encounter issues:
1. Check service status: `sudo systemctl status llm-eiapp`
2. View logs: `sudo journalctl -u llm-eiapp -f`
3. Verify port is open: `sudo netstat -tlnp | grep :8000`
4. Check firewall settings: `sudo ufw status`

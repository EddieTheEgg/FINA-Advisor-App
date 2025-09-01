# 🚀 EC2 Deployment Guide

Complete guide to deploy your Finance App backend on AWS EC2.

## 📋 Prerequisites

1. **AWS Account** with EC2 access
2. **Domain name** (optional, can use IP address for testing)
3. **SSH key pair** for EC2 access

## 🏗️ Step 1: Launch EC2 Instance

### Instance Configuration:
- **AMI**: Ubuntu Server 22.04 LTS
- **Instance Type**: t3.micro (1 vCPU, 1GB RAM)
- **Storage**: 8GB gp3
- **Key Pair**: Your SSH key
- **Security Group**: Allow SSH (22), HTTP (80), HTTPS (443)

### Security Group Rules:
```
SSH (22)    - Your IP only
HTTP (80)   - 0.0.0.0/0
HTTPS (443) - 0.0.0.0/0
```

## 🛠️ Step 2: Initial Server Setup

SSH into your instance:
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

Run the setup script:
```bash
wget https://raw.githubusercontent.com/EddieTheEgg/FINA-Advisor-App/main/backend/setup-ec2.sh
chmod +x setup-ec2.sh
./setup-ec2.sh
```

## ⚙️ Step 3: Configure Environment

Edit your environment variables:
```bash
cd /home/ubuntu/finance-app/backend
nano .env
```

Fill in your actual values:
```env
DATABASE_URL=your_supabase_connection_string
OPENAI_API_KEY=your_openai_api_key
ACCESS_TOKEN_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
```

## 🌐 Step 4: Configure Domain (Optional)

If using a domain, edit the NGINX config:
```bash
nano nginx/sites-available/finance-app
```

Replace `YOUR_DOMAIN_HERE` with your actual domain.

## 🚀 Step 5: Deploy

Run the deployment:
```bash
./deploy.sh
```

## 🔒 Step 6: Set Up SSL (If using domain)

```bash
sudo certbot --nginx -d your-domain.com
```

## ✅ Step 7: Verify Deployment

Check if your app is running:
```bash
curl http://your-domain-or-ip/
```

You should see:
```json
{"message": "Welcome to Expense Insights API"}
```

## 🔄 Updates

To deploy new changes:
1. Push code to GitHub
2. SSH into EC2
3. Run `./deploy.sh`

## 📊 Monitoring

View logs:
```bash
docker-compose -f docker-compose.prod.yml logs -f
```

Check container status:
```bash
docker-compose -f docker-compose.prod.yml ps
```

## 💰 Cost Estimate

- **t3.micro**: ~$8.50/month
- **8GB Storage**: ~$0.80/month
- **Data Transfer**: ~$1-5/month
- **Total**: ~$10-15/month

## 🆘 Troubleshooting

### App not responding:
```bash
docker-compose -f docker-compose.prod.yml restart
```

### Check logs:
```bash
docker-compose -f docker-compose.prod.yml logs finance-app
```

### Rebuild containers:
```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

## 🔥 Production Tips

1. **Monitor disk space**: `df -h`
2. **Check memory usage**: `free -h`
3. **Monitor logs**: Set up log rotation
4. **Backup**: Regular database backups
5. **Security**: Keep system updated with `sudo apt update && sudo apt upgrade`

---

🎉 **Your FastAPI backend is now running on EC2 with NGINX, SSL, and Docker!**

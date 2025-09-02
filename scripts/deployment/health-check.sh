#!/bin/bash

# Health check script for LLM-EIapp Backend
# Usage: ./health-check.sh

echo "🏥 Health Check for LLM-EIapp Backend"
echo "======================================"

# Check if service is running
echo "📊 Service Status:"
if sudo systemctl is-active --quiet llm-eiapp; then
    echo "✅ Service is running"
else
    echo "❌ Service is not running"
    exit 1
fi

# Check service status
echo ""
echo "🔍 Detailed Service Status:"
sudo systemctl status llm-eiapp --no-pager -l

# Check if port is listening
echo ""
echo "🌐 Port Check:"
if sudo netstat -tlnp | grep :8000 > /dev/null; then
    echo "✅ Port 8000 is listening"
else
    echo "❌ Port 8000 is not listening"
fi

# Test API endpoint
echo ""
echo "🧪 API Health Check:"
if curl -s http://localhost:8000/ > /dev/null; then
    echo "✅ API is responding"
else
    echo "❌ API is not responding"
fi

# Check disk space
echo ""
echo "💾 Disk Space:"
df -h / | tail -1

# Check memory usage
echo ""
echo "🧠 Memory Usage:"
free -h

echo ""
echo "🏁 Health check completed!"

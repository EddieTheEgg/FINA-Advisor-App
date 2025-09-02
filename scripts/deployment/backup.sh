#!/bin/bash

# Backup script for LLM-EIapp Backend
# Usage: ./backup.sh

BACKUP_DIR="/home/ubuntu/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="llm-eiapp_backup_$TIMESTAMP"

echo "💾 Creating backup: $BACKUP_NAME"
echo "=================================="

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Stop service temporarily for consistent backup
echo "🛑 Stopping service for backup..."
sudo systemctl stop llm-eiapp

# Wait a moment for service to stop
sleep 2

# Create backup
echo "📦 Creating backup archive..."
tar -czf "$BACKUP_DIR/$BACKUP_NAME.tar.gz" \
    --exclude=venv \
    --exclude=__pycache__ \
    --exclude=*.pyc \
    --exclude=.git \
    --exclude=node_modules \
    .

# Restart service
echo "🚀 Restarting service..."
sudo systemctl start llm-eiapp

# Check if backup was created
if [ -f "$BACKUP_DIR/$BACKUP_NAME.tar.gz" ]; then
    echo "✅ Backup created successfully: $BACKUP_NAME.tar.gz"
    echo "📁 Location: $BACKUP_DIR/$BACKUP_NAME.tar.gz"
    echo "📏 Size: $(du -h "$BACKUP_DIR/$BACKUP_NAME.tar.gz" | cut -f1)"
else
    echo "❌ Backup failed!"
    exit 1
fi

# Clean up old backups (keep last 5)
echo "🧹 Cleaning up old backups..."
cd "$BACKUP_DIR"
ls -t *.tar.gz | tail -n +6 | xargs -r rm

echo "🏁 Backup completed!"

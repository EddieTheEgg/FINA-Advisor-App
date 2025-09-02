#!/bin/bash

# Service management script for LLM-EIapp backend
# Usage: ./start-service.sh [start|stop|restart|status|logs]

SERVICE_NAME="llm-eiapp.service"

case "$1" in
    start)
        echo "🚀 Starting LLM-EIapp service..."
        sudo systemctl start $SERVICE_NAME
        echo "✅ Service started!"
        ;;
    stop)
        echo "🛑 Stopping LLM-EIapp service..."
        sudo systemctl stop $SERVICE_NAME
        echo "✅ Service stopped!"
        ;;
    restart)
        echo "🔄 Restarting LLM-EIapp service..."
        sudo systemctl restart $SERVICE_NAME
        echo "✅ Service restarted!"
        ;;
    status)
        echo "📊 Service status:"
        sudo systemctl status $SERVICE_NAME
        ;;
    logs)
        echo "📝 Service logs (press Ctrl+C to exit):"
        sudo journalctl -u $SERVICE_NAME -f
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status|logs}"
        echo ""
        echo "Commands:"
        echo "  start   - Start the service"
        echo "  stop    - Stop the service"
        echo "  restart - Restart the service"
        echo "  status  - Show service status"
        echo "  logs    - Show service logs"
        exit 1
        ;;
esac

#!/bin/bash

# Docker management script for LLM-EIapp Backend
# Usage: ./docker-manage.sh [start|stop|restart|logs|status|build]

case "$1" in
    start)
        echo "🐳 Starting LLM-EIapp backend with Docker..."
        docker-compose up -d
        echo "✅ Backend started!"
        ;;
    stop)
        echo "🛑 Stopping LLM-EIapp backend..."
        docker-compose down
        echo "✅ Backend stopped!"
        ;;
    restart)
        echo "🔄 Restarting LLM-EIapp backend..."
        docker-compose down
        docker-compose up -d
        echo "✅ Backend restarted!"
        ;;
    logs)
        echo "📝 Backend logs (press Ctrl+C to exit):"
        docker-compose logs -f backend
        ;;
    status)
        echo "📊 Docker containers status:"
        docker-compose ps
        echo ""
        echo "🔍 Individual container status:"
        docker ps -a | grep llm-eiapp
        ;;
    build)
        echo "🔨 Building LLM-EIapp backend Docker image..."
        docker-compose build --no-cache
        echo "✅ Build completed!"
        ;;
    clean)
        echo "🧹 Cleaning up Docker resources..."
        docker-compose down --volumes --remove-orphans
        docker system prune -f
        echo "✅ Cleanup completed!"
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|logs|status|build|clean}"
        echo ""
        echo "Commands:"
        echo "  start   - Start the backend with Docker Compose"
        echo "  stop    - Stop the backend"
        echo "  restart - Restart the backend"
        echo "  logs    - Show backend logs"
        echo "  status  - Show container status"
        echo "  build   - Build the Docker image"
        echo "  clean   - Clean up Docker resources"
        exit 1
        ;;
esac

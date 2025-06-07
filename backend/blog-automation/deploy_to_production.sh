#!/bin/bash

# Deploy Blog Automation to Production Server
# This script sets up the blog automation system on the production server

set -e  # Exit on any error

SERVER_IP="49.13.238.33"
SERVER_USER="root"
SERVER_PASSWORD="iHv9XTVvAURxrPn94H9iK"
REMOTE_DIR="/var/www/clicksalesmedia/backend/blog-automation"

echo "🚀 Deploying Blog Automation to Production Server..."
echo "Server: $SERVER_USER@$SERVER_IP"
echo "Remote Directory: $REMOTE_DIR"

# Function to run commands on remote server
run_remote() {
    sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" "$1"
}

# Function to copy files to remote server
copy_to_remote() {
    sshpass -p "$SERVER_PASSWORD" scp -o StrictHostKeyChecking=no -r "$1" "$SERVER_USER@$SERVER_IP:$2"
}

echo "📁 Creating remote directory structure..."
run_remote "mkdir -p $REMOTE_DIR"
run_remote "mkdir -p $REMOTE_DIR/logs"

echo "📋 Installing UV on production server..."
run_remote "curl -LsSf https://astral.sh/uv/install.sh | sh || echo 'UV might already be installed'"

echo "📦 Copying project files..."
copy_to_remote ".env" "$REMOTE_DIR/"
copy_to_remote "blog_generator.py" "$REMOTE_DIR/"
copy_to_remote "run_daily.sh" "$REMOTE_DIR/"
copy_to_remote "setup_cron.sh" "$REMOTE_DIR/"
copy_to_remote "README.md" "$REMOTE_DIR/"
copy_to_remote "pyproject.toml" "$REMOTE_DIR/"

echo "🔧 Setting up Python environment on server..."
run_remote "cd $REMOTE_DIR && ~/.local/bin/uv sync"

echo "🔑 Setting script permissions..."
run_remote "chmod +x $REMOTE_DIR/run_daily.sh"
run_remote "chmod +x $REMOTE_DIR/setup_cron.sh"

echo "🧪 Testing installation..."
if run_remote "cd $REMOTE_DIR && ~/.local/bin/uv run python -c 'from blog_generator import BlogGenerator; print(\"✅ System ready\")'"; then
    echo "✅ Installation test passed!"
else
    echo "❌ Installation test failed!"
    exit 1
fi

echo "⏰ Setting up cron job..."
run_remote "cd $REMOTE_DIR && echo 'y' | ./setup_cron.sh"

echo "📊 Verifying cron job..."
run_remote "crontab -l | grep blog-automation || echo 'No cron job found'"

echo ""
echo "🎉 Deployment completed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. The system will automatically generate 2 blog posts daily at 9:00 AM"
echo "2. Check logs with: ssh root@$SERVER_IP 'tail -f $REMOTE_DIR/blog_automation.log'"
echo "3. Manual run: ssh root@$SERVER_IP 'cd $REMOTE_DIR && ./run_daily.sh'"
echo "4. View cron job: ssh root@$SERVER_IP 'crontab -l'"
echo ""
echo "🔍 Monitoring:"
echo "- Logs directory: $REMOTE_DIR/logs/"
echo "- Generation logs: $REMOTE_DIR/generation_log_*.json"
echo "- Application log: $REMOTE_DIR/blog_automation.log"
echo ""
echo "💰 Daily costs: ~\$0.50-1.00 (OpenAI API)"
echo "📈 Content: 2 posts/day (EN + AR) on marketing topics" 
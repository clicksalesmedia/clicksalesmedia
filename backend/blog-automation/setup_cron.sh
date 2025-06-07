#!/bin/bash

# Script to setup cron job for daily blog generation
# Run this script to install the cron job

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CRON_SCRIPT="$SCRIPT_DIR/run_daily.sh"

echo "🔧 Setting up cron job for daily blog generation..."
echo "Script location: $CRON_SCRIPT"

# Check if script exists
if [ ! -f "$CRON_SCRIPT" ]; then
    echo "❌ Error: run_daily.sh not found at $CRON_SCRIPT"
    exit 1
fi

# Make sure script is executable
chmod +x "$CRON_SCRIPT"

# Create cron job entry (runs at 9:00 AM every day)
CRON_JOB="0 9 * * * $CRON_SCRIPT"

# Check if cron job already exists
if crontab -l 2>/dev/null | grep -q "$CRON_SCRIPT"; then
    echo "⚠️  Cron job already exists for this script"
    echo "Current crontab:"
    crontab -l | grep "$CRON_SCRIPT"
    
    read -p "Do you want to replace it? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Setup cancelled"
        exit 0
    fi
    
    # Remove existing cron job
    crontab -l | grep -v "$CRON_SCRIPT" | crontab -
fi

# Add new cron job
(crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

echo "✅ Cron job installed successfully!"
echo "📅 Blog posts will be generated daily at 9:00 AM"
echo "📍 Cron job: $CRON_JOB"

# Verify installation
echo ""
echo "📋 Current crontab:"
crontab -l | grep "$CRON_SCRIPT" || echo "❌ Cron job not found!"

echo ""
echo "📝 To manually run the blog generation:"
echo "   $CRON_SCRIPT"
echo ""
echo "📝 To remove the cron job:"
echo "   crontab -e"
echo "   (then delete the line containing '$CRON_SCRIPT')"
echo ""
echo "📝 To view logs:"
echo "   ls -la $SCRIPT_DIR/logs/" 
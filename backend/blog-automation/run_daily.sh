#!/bin/bash

# Daily Blog Generation Script
# This script runs the blog automation system

# Set the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Create logs directory if it doesn't exist
mkdir -p logs

# Set log file with timestamp
LOG_FILE="logs/daily_run_$(date +%Y%m%d_%H%M%S).log"

# Function to log with timestamp
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

log "🚀 Starting daily blog generation..."
log "Working directory: $SCRIPT_DIR"

# Activate UV environment and run the script with enhanced generator
if ~/.local/bin/uv run python main.py >> "$LOG_FILE" 2>&1; then
    log "✅ Blog generation completed successfully"
    exit_code=0
else
    log "❌ Blog generation failed"
    exit_code=1
fi

# Keep only last 30 days of logs
find logs/ -name "daily_run_*.log" -mtime +30 -delete 2>/dev/null

# Keep only last 30 days of generation logs
find . -name "generation_log_*.json" -mtime +30 -delete 2>/dev/null

log "📝 Cleanup completed"
log "🏁 Script finished with exit code: $exit_code"

exit $exit_code 
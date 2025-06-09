#!/bin/bash

# ClickSales Media Quick Update Script
# For minor updates that don't require full rebuild

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Server credentials
HETZNER_IP="49.13.238.33"
HETZNER_USER="root"
HETZNER_PASSWORD="iHv9XTVvAURxrPn94H9iK"

echo -e "${BLUE}⚡ Quick Update - ClickSales Media${NC}"
echo "===================================="

# Step 1: Push local changes
echo -e "${YELLOW}📤 Pushing local changes...${NC}"
if [[ -n $(git status --porcelain) ]]; then
    git add .
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    git commit -m "quick-update: $TIMESTAMP"
    git push origin main
    echo -e "${GREEN}✅ Changes pushed to GitHub${NC}"
else
    echo "No local changes found"
fi

# Step 2: Quick server update
echo -e "${YELLOW}⚡ Quick server update...${NC}"
sshpass -p "$HETZNER_PASSWORD" ssh -o StrictHostKeyChecking=no "$HETZNER_USER@$HETZNER_IP" << 'REMOTE_SCRIPT'
cd /var/www/clicksalesmedia
echo "Pulling latest changes..."
git pull origin main
echo "Restarting PM2..."
pm2 restart clicksalesmedia
echo "Quick update completed!"
pm2 status
REMOTE_SCRIPT

echo -e "${GREEN}✅ Quick update completed!${NC}"
echo -e "${BLUE}🌐 Website: https://clicksalesmedia.com${NC}" 
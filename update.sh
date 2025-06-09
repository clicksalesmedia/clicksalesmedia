#!/bin/bash

# ClickSales Media Update Script
# This script automatically updates the production server with latest changes

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Server credentials
HETZNER_IP="49.13.238.33"
HETZNER_USER="root"
HETZNER_PASSWORD="iHv9XTVvAURxrPn94H9iK"

echo -e "${BLUE}🔄 Starting ClickSales Media Update Process...${NC}"
echo "============================================="

# Step 1: Local Git Operations
echo -e "\n${YELLOW}📦 Step 1: Committing and pushing local changes to GitHub...${NC}"

# Check if there are any changes to commit
if [[ -n $(git status --porcelain) ]]; then
    echo "Found local changes to commit..."
    git add .
    
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    git commit -m "update: automated update - $TIMESTAMP" || echo "No changes to commit"
    
    echo -e "${YELLOW}Pushing to GitHub...${NC}"
    git push origin main
    echo -e "${GREEN}✅ Local changes pushed to GitHub!${NC}"
else
    echo "No local changes found. Checking for remote updates..."
    
    # Fetch latest changes
    git fetch origin main
    
    # Check if remote has new commits
    if [[ $(git rev-list HEAD...origin/main --count) -eq 0 ]]; then
        echo -e "${YELLOW}⚠️ No updates available. Repository is up to date.${NC}"
        echo -e "${BLUE}Checking server status instead...${NC}"
    else
        echo "Remote updates found. Proceeding with update..."
        git pull origin main
    fi
fi

# Step 2: Server Update
echo -e "\n${YELLOW}🚀 Step 2: Updating production server...${NC}"

# Create update script for server
cat > server_update.sh << 'EOF'
#!/bin/bash

echo "🔄 Starting server update process..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

cd /var/www/clicksalesmedia

# Backup current state
echo -e "${YELLOW}📋 Creating backup...${NC}"
cp -r /var/www/clicksalesmedia /var/www/clicksalesmedia_backup_$(date +%Y%m%d_%H%M%S) || echo "Backup failed, continuing..."

# Pull latest changes from GitHub
echo -e "${YELLOW}📥 Pulling latest changes from GitHub...${NC}"
git fetch origin main
if [[ $(git rev-list HEAD...origin/main --count) -gt 0 ]]; then
    echo "New changes found, pulling updates..."
    git pull origin main
else
    echo "Repository already up to date"
fi

# Install/update dependencies
echo -e "${YELLOW}📦 Installing/updating dependencies...${NC}"
npm ci --production

# Check if package.json or package-lock.json changed
if git diff --name-only HEAD~1 HEAD | grep -E "(package\.json|package-lock\.json)" > /dev/null; then
    echo "Dependencies changed, installing new packages..."
    npm install --production
fi

# Run database migrations and updates
echo -e "${YELLOW}🗄️ Running database migrations...${NC}"
export DATABASE_URL="postgresql://clicksales:ClickSales2024!@localhost:5432/clicksalesmedia"
npx prisma generate
npx prisma db push

# Check for schema changes
if git diff --name-only HEAD~1 HEAD | grep "prisma/schema.prisma" > /dev/null; then
    echo "Database schema changed, applying migrations..."
    npx prisma db push --force-reset || npx prisma db push
fi

# Build the application
echo -e "${YELLOW}🏗️ Building application...${NC}"
npm run build

# Restart PM2 processes
echo -e "${YELLOW}🔄 Restarting application...${NC}"
pm2 restart clicksalesmedia

# Wait a moment for the app to start
sleep 5

# Check application health
echo -e "${YELLOW}🏥 Checking application health...${NC}"
if curl -f -s http://localhost:3000 > /dev/null; then
    echo -e "${GREEN}✅ Application is running successfully!${NC}"
else
    echo -e "${RED}❌ Application health check failed!${NC}"
    echo "Checking PM2 status:"
    pm2 status
    echo "Checking logs:"
    pm2 logs clicksalesmedia --lines 10
fi

# Restart Nginx to ensure proper routing
echo -e "${YELLOW}🌐 Restarting Nginx...${NC}"
systemctl restart nginx

# Final status check
echo -e "${YELLOW}📊 Final status check...${NC}"
echo "PM2 Status:"
pm2 status
echo ""
echo "Nginx Status:"
systemctl status nginx --no-pager -l
echo ""

# Check SSL certificate expiry
echo -e "${YELLOW}🔒 Checking SSL certificate...${NC}"
if command -v certbot &> /dev/null; then
    certbot certificates
fi

echo -e "${GREEN}✅ Server update completed successfully!${NC}"
echo "🌐 Website: https://clicksalesmedia.com"
echo "📊 Admin: https://clicksalesmedia.com/dashboard"
EOF

# Copy and execute update script on server
echo -e "\n${YELLOW}📤 Deploying update script to server...${NC}"
sshpass -p "$HETZNER_PASSWORD" scp -o StrictHostKeyChecking=no server_update.sh "$HETZNER_USER@$HETZNER_IP:/tmp/"

echo -e "${YELLOW}🚀 Executing update on server...${NC}"
sshpass -p "$HETZNER_PASSWORD" ssh -o StrictHostKeyChecking=no "$HETZNER_USER@$HETZNER_IP" "chmod +x /tmp/server_update.sh && /tmp/server_update.sh"

# Step 3: Post-Update Verification
echo -e "\n${YELLOW}🔍 Step 3: Verifying update...${NC}"

# Test website accessibility
echo -e "${YELLOW}Testing website accessibility...${NC}"
if curl -f -s -k https://clicksalesmedia.com > /dev/null; then
    echo -e "${GREEN}✅ Website is accessible at https://clicksalesmedia.com${NC}"
else
    echo -e "${RED}❌ Website accessibility test failed${NC}"
fi

# Test admin panel
echo -e "${YELLOW}Testing admin panel...${NC}"
if curl -f -s -k https://clicksalesmedia.com/dashboard > /dev/null; then
    echo -e "${GREEN}✅ Admin panel is accessible${NC}"
else
    echo -e "${RED}❌ Admin panel accessibility test failed${NC}"
fi

# Clean up
rm -f server_update.sh

echo -e "\n${GREEN}🎉 Update completed successfully!${NC}"
echo "============================================="
echo -e "${BLUE}🌐 Website: https://clicksalesmedia.com${NC}"
echo -e "${BLUE}📊 Admin Panel: https://clicksalesmedia.com/dashboard${NC}"
echo ""
echo -e "${YELLOW}📊 Server Management Commands:${NC}"
echo -e "• Check status: ssh root@49.13.238.33 'pm2 status'"
echo -e "• Monitor: ssh root@49.13.238.33 'pm2 monit'"
echo -e "• View logs: ssh root@49.13.238.33 'pm2 logs clicksalesmedia'"
echo -e "• Restart: ssh root@49.13.238.33 'pm2 restart clicksalesmedia'"
echo ""
echo -e "${GREEN}🚀 Your website has been updated successfully!${NC}"

# Optional: Show recent changes
echo -e "\n${BLUE}📋 Recent changes applied:${NC}"
git log --oneline -5 
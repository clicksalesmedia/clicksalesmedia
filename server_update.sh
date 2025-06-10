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

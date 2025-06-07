#!/bin/bash

# ClickSales Media Deployment Script
# This script deploys the website to GitHub and sets up the database on Hetzner

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

echo -e "${BLUE}🚀 Starting ClickSales Media Deployment...${NC}"
echo "============================================="

# Step 1: GitHub Deployment
echo -e "\n${YELLOW}📦 Step 1: Deploying to GitHub...${NC}"
echo "Git status:"
git status

echo -e "\n${YELLOW}Adding all changes...${NC}"
git add .

echo -e "\n${YELLOW}Committing changes...${NC}"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
git commit -m "deploy: automated deployment - $TIMESTAMP" || echo "No changes to commit"

echo -e "\n${YELLOW}Pushing to GitHub...${NC}"
git push origin main

echo -e "${GREEN}✅ GitHub deployment completed!${NC}"

# Step 2: Hetzner Database Setup
echo -e "\n${YELLOW}🗄️ Step 2: Setting up Hetzner Database...${NC}"

# Check if sshpass is installed
if ! command -v sshpass &> /dev/null; then
    echo -e "${YELLOW}Installing sshpass for SSH automation...${NC}"
    if command -v brew &> /dev/null; then
        brew install hudochenkov/sshpass/sshpass
    elif command -v apt-get &> /dev/null; then
        sudo apt-get update && sudo apt-get install -y sshpass
    else
        echo -e "${RED}❌ Please install sshpass manually${NC}"
        exit 1
    fi
fi

# Create database setup script
cat > hetzner_setup.sql << 'EOF'
-- ClickSales Media Database Setup
CREATE DATABASE IF NOT EXISTS clicksalesmedia;
CREATE USER IF NOT EXISTS 'clicksales'@'%' IDENTIFIED BY 'ClickSales2024!';
GRANT ALL PRIVILEGES ON clicksalesmedia.* TO 'clicksales'@'%';
FLUSH PRIVILEGES;

-- Show databases to confirm
SHOW DATABASES;
EOF

# Create server setup script
cat > server_setup.sh << 'EOF'
#!/bin/bash

echo "🔧 Setting up Hetzner server for clicksalesmedia.com..."

# Update and upgrade system
echo "📦 Updating system packages..."
apt-get update -y
apt-get upgrade -y

# Install essential packages
echo "📦 Installing essential packages..."
apt-get install -y curl wget gnupg2 software-properties-common apt-transport-https ca-certificates lsb-release

# Install Node.js 18 LTS
echo "📦 Installing Node.js 18 LTS..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Verify Node.js installation
echo "Node.js version: $(node --version)"
echo "NPM version: $(npm --version)"

# Install PostgreSQL
echo "📦 Installing PostgreSQL..."
apt-get install -y postgresql postgresql-contrib

# Start and enable PostgreSQL
systemctl start postgresql
systemctl enable postgresql

# Install Nginx
echo "📦 Installing Nginx..."
apt-get install -y nginx

# Install Certbot for SSL
echo "📦 Installing Certbot for SSL..."
apt-get install -y snapd
snap install core; snap refresh core
snap install --classic certbot
ln -sf /snap/bin/certbot /usr/bin/certbot

# Install PM2 globally
echo "📦 Installing PM2 for process management..."
npm install -g pm2

# Install Git
apt-get install -y git

# Install other useful tools
apt-get install -y htop ufw fail2ban

# Setup firewall
echo "🔒 Setting up firewall..."
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable

# Create application directory
echo "📁 Creating application directory..."
mkdir -p /var/www/clicksalesmedia
cd /var/www/clicksalesmedia

# Clone the repository
echo "📥 Cloning repository..."
git clone https://github.com/clicksalesmedia/clicksalesmedia.git .

# Install dependencies
echo "📦 Installing Node.js dependencies..."
npm ci --production

# Setup PostgreSQL database
echo "🗄️ Setting up PostgreSQL database..."
sudo -u postgres psql << PSQL_EOF
CREATE DATABASE clicksalesmedia;
CREATE USER clicksales WITH PASSWORD 'ClickSales2024!';
GRANT ALL PRIVILEGES ON DATABASE clicksalesmedia TO clicksales;
ALTER USER clicksales CREATEDB;
\q
PSQL_EOF

# Create .env.production
echo "⚙️ Creating production environment file..."
cat > .env.production << ENV_EOF
# Database
DATABASE_URL="postgresql://clicksales:ClickSales2024!@localhost:5432/clicksalesmedia"

# NextAuth
NEXTAUTH_URL="https://clicksalesmedia.com"
NEXTAUTH_SECRET="ClickSales2024SecretKey!@#$%^&*()"

# Application
NODE_ENV="production"
PORT=3000
ENV_EOF

# Setup Prisma
echo "🔧 Setting up Prisma..."
npx prisma generate
npx prisma db push

# Build the application
echo "🏗️ Building the application..."
npm run build

# Create Nginx configuration
echo "🌐 Setting up Nginx configuration..."
cat > /etc/nginx/sites-available/clicksalesmedia.com << NGINX_EOF
server {
    listen 80;
    server_name clicksalesmedia.com www.clicksalesmedia.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINX_EOF

# Enable the site
ln -sf /etc/nginx/sites-available/clicksalesmedia.com /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# Restart Nginx
systemctl restart nginx
systemctl enable nginx

# Create PM2 ecosystem file
echo "🔧 Creating PM2 ecosystem file..."
cat > ecosystem.config.js << PM2_EOF
module.exports = {
  apps: [{
    name: 'clicksalesmedia',
    script: 'npm',
    args: 'start',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/pm2/clicksalesmedia-error.log',
    out_file: '/var/log/pm2/clicksalesmedia-out.log',
    log_file: '/var/log/pm2/clicksalesmedia-combined.log',
    time: true
  }]
}
PM2_EOF

# Create PM2 log directory
mkdir -p /var/log/pm2

# Start application with PM2
echo "🚀 Starting application with PM2..."
pm2 start ecosystem.config.js
pm2 startup systemd -u root --hp /root
pm2 save

# Setup SSL certificate
echo "🔒 Setting up SSL certificate..."
certbot --nginx -d clicksalesmedia.com -d www.clicksalesmedia.com --non-interactive --agree-tos --email admin@clicksalesmedia.com

# Setup auto-renewal for SSL
echo "0 12 * * * /usr/bin/certbot renew --quiet" | crontab -

# Final status check
echo "📊 Final status check..."
systemctl status postgresql --no-pager
systemctl status nginx --no-pager
pm2 status

echo "✅ Server setup completed!"
echo "🌐 Application should be available at: https://clicksalesmedia.com"
echo "📊 PM2 monitoring: pm2 monit"
echo "📜 PM2 logs: pm2 logs clicksalesmedia"
EOF

echo -e "\n${YELLOW}Connecting to Hetzner server and setting up environment...${NC}"

# Copy setup script to server and execute
sshpass -p "$HETZNER_PASSWORD" scp -o StrictHostKeyChecking=no server_setup.sh "$HETZNER_USER@$HETZNER_IP:/tmp/"
sshpass -p "$HETZNER_PASSWORD" ssh -o StrictHostKeyChecking=no "$HETZNER_USER@$HETZNER_IP" "chmod +x /tmp/server_setup.sh && /tmp/server_setup.sh"

echo -e "${GREEN}✅ Hetzner server setup completed!${NC}"

# Step 3: Database Migration
echo -e "\n${YELLOW}📊 Step 3: Running database migrations...${NC}"

sshpass -p "$HETZNER_PASSWORD" ssh -o StrictHostKeyChecking=no "$HETZNER_USER@$HETZNER_IP" << 'MIGRATION_EOF'
cd /var/www/clicksalesmedia
echo "Running Prisma migrations..."
npx prisma db push
echo "Seeding database with sample data..."
npx prisma db seed || echo "No seed script found, skipping..."
MIGRATION_EOF

echo -e "${GREEN}✅ Database migrations completed!${NC}"

# Step 4: Restart services
echo -e "\n${YELLOW}🔄 Step 4: Restarting services...${NC}"

sshpass -p "$HETZNER_PASSWORD" ssh -o StrictHostKeyChecking=no "$HETZNER_USER@$HETZNER_IP" << 'RESTART_EOF'
cd /var/www/clicksalesmedia
echo "Restarting application..."
pm2 restart clicksalesmedia
pm2 status
RESTART_EOF

# Cleanup temporary files
rm -f hetzner_setup.sql server_setup.sh

echo -e "\n${GREEN}🎉 Deployment completed successfully!${NC}"
echo "============================================="
echo -e "${BLUE}🌐 Website: https://clicksalesmedia.com${NC}"
echo -e "${BLUE}📊 Admin Panel: https://clicksalesmedia.com/dashboard${NC}"
echo -e "${BLUE}📱 Vercel (Backup): https://clicksalesmedia.vercel.app${NC}"
echo ""
echo -e "${YELLOW}🔒 SSL Certificate: ✅ Automatically configured${NC}"
echo -e "${YELLOW}🔧 PM2 Process Manager: ✅ Running in cluster mode${NC}"
echo -e "${YELLOW}🗄️ PostgreSQL Database: ✅ Configured and running${NC}"
echo ""
echo -e "${YELLOW}Default Admin Credentials:${NC}"
echo -e "Email: admin@clicksalesmedia.com"
echo -e "Password: ClickAdmin123!"
echo ""
echo -e "${BLUE}📊 Server Management Commands:${NC}"
echo -e "• Check PM2 status: ssh root@49.13.238.33 'pm2 status'"
echo -e "• Monitor PM2: ssh root@49.13.238.33 'pm2 monit'"
echo -e "• View logs: ssh root@49.13.238.33 'pm2 logs clicksalesmedia'"
echo -e "• Restart app: ssh root@49.13.238.33 'pm2 restart clicksalesmedia'"
echo ""
echo -e "${GREEN}🚀 Your website is now live with SSL!${NC}" 
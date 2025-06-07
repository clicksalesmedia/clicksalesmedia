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

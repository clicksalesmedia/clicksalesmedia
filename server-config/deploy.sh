#!/bin/bash

# This script performs a complete reset and deployment of the Next.js application

echo "===== BEGINNING COMPLETE SERVER RESET AND DEPLOYMENT ====="

# Stop all running PM2 processes
echo "Stopping all PM2 processes..."
pm2 stop all || true
pm2 delete all || true

# Selectively manage cache directories
echo "Selectively managing cache directories..."
# Preserve image cache but clear other caches
rm -rf /var/cache/nginx/proxy_cache/* || true
rm -rf /var/cache/nginx/static_cache/* || true
# Ensure cache directories exist
mkdir -p /var/cache/nginx/proxy_cache
mkdir -p /var/cache/nginx/static_cache
mkdir -p /var/cache/nginx/image_cache

# Set proper ownership and permissions
echo "Setting proper ownership and permissions..."
chown -R www-data:www-data /var/cache/nginx
chmod -R 755 /var/cache/nginx

# Copy Nginx configuration
echo "Updating Nginx configuration..."
cp server-config/nginx-config.conf /etc/nginx/sites-available/clicksalesmedia

# Ensure symbolic link exists
ln -sf /etc/nginx/sites-available/clicksalesmedia /etc/nginx/sites-enabled/clicksalesmedia

# Test Nginx configuration
echo "Testing Nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
  # Restart Nginx if config is valid
  echo "Restarting Nginx..."
  systemctl restart nginx
else
  echo "Nginx configuration test failed. Not restarting Nginx."
  exit 1
fi

# Change to the application directory
cd /var/www/clicksalesmediaAI

# Clean the Next.js build directory to start fresh
echo "Cleaning Next.js build..."
rm -rf .next
rm -rf node_modules/.cache

# Install dependencies again to ensure everything is fresh
echo "Installing dependencies..."
npm ci --force

# Set Next.js build optimization flags
export NEXT_OPTIMIZE_IMAGES=true
export NEXT_OPTIMIZE_CSS=true
export NEXT_OPTIMIZE_FONTS=true

# Build the Next.js application
echo "Building Next.js application..."
npm run build

# Set proper permissions
echo "Setting permissions on application files..."
chown -R www-data:www-data .next
chmod -R 755 .next

# Start with new PM2 configuration
echo "Starting the application with PM2..."
pm2 start npm --name "clicksalesmedia" -- start -- --max-old-space-size=4096

# Save PM2 configuration
pm2 save

# Display status
echo "PM2 Status:"
pm2 status

# Update the PM2 startup configuration
pm2 startup

# Force reload Nginx
echo "Force reloading Nginx..."
systemctl restart nginx

# Clear Nginx cache (optional, only if needed)
# echo "Clearing Nginx cache..."
# rm -rf /var/cache/nginx/*
# systemctl reload nginx

# Output success message
echo "===== DEPLOYMENT COMPLETED ====="
echo "If you're still experiencing issues, please check:"
echo "1. The Nginx error log: cat /var/log/nginx/error.log"
echo "2. The Next.js application logs: pm2 logs clicksalesmedia"
echo "3. Cache status: curl -I https://clicksalesmedia.com | grep X-Cache-Status" 
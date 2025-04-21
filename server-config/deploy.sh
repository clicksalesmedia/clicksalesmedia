#!/bin/bash

# This script is meant to be run on the server after pulling from GitHub

# Create necessary directories
mkdir -p /var/cache/nginx/proxy_cache
mkdir -p /var/cache/nginx/static_cache
mkdir -p /var/log/pm2

# Set correct permissions
chown -R www-data:www-data /var/cache/nginx

# Copy configuration files
cp server-config/nginx-config.conf /etc/nginx/sites-available/clicksalesmedia
cp server-config/pm2-config.json /var/www/clicksalesmediaAI/pm2-config.json

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

# Stop the current PM2 process
echo "Stopping current PM2 process..."
pm2 stop clicksalesmedia || true
pm2 delete clicksalesmedia || true

# Change to the application directory
cd /var/www/clicksalesmediaAI

# Build the Next.js application
echo "Building Next.js application..."
npm run build

# Start with new PM2 configuration
echo "Starting with new PM2 configuration..."
pm2 start pm2-config.json

# Save PM2 configuration
pm2 save

# Display status
echo "PM2 Status:"
pm2 status

# Update the PM2 startup configuration
pm2 startup

echo "Deployment completed." 
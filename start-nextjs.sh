#!/bin/bash
export NODE_ENV=production
export PORT=3000
cd /var/www/clicksalesmediaAI
exec node_modules/.bin/next start -p 3000

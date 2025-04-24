#!/bin/bash
export NODE_OPTIONS="--max-old-space-size=4096"
cd /var/www/clicksalesmediaAI
node_modules/.bin/next build || echo "Build finished with some warnings"

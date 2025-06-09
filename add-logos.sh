#!/bin/bash

# ClickSales Media - Add Logos to Production Database
# This script adds professional client logos to the production database

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

echo -e "${BLUE}🎯 Adding Client Logos to Production Database${NC}"
echo "============================================="

# Create logo seeding script for server
cat > server_logos.js << 'EOF'
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const professionalLogos = [
  {
    name: "Google",
    imageUrl: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200&h=80&fit=crop&crop=center",
    altText: "Google - Search Engine & Cloud Services",
    link: "https://google.com",
    active: true,
    sortOrder: 1
  },
  {
    name: "Microsoft",
    imageUrl: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=200&h=80&fit=crop&crop=center",
    altText: "Microsoft - Technology Solutions",
    link: "https://microsoft.com",
    active: true,
    sortOrder: 2
  },
  {
    name: "Apple",
    imageUrl: "https://images.unsplash.com/photo-1621768216002-5ac171876625?w=200&h=80&fit=crop&crop=center",
    altText: "Apple - Premium Technology",
    link: "https://apple.com",
    active: true,
    sortOrder: 3
  },
  {
    name: "Amazon",
    imageUrl: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=200&h=80&fit=crop&crop=center",
    altText: "Amazon - E-commerce & Cloud",
    link: "https://amazon.com",
    active: true,
    sortOrder: 4
  },
  {
    name: "Meta",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=80&fit=crop&crop=center",
    altText: "Meta - Social Media Platform",
    link: "https://meta.com",
    active: true,
    sortOrder: 5
  },
  {
    name: "Tesla",
    imageUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=200&h=80&fit=crop&crop=center",
    altText: "Tesla - Electric Vehicles",
    link: "https://tesla.com",
    active: true,
    sortOrder: 6
  },
  {
    name: "Netflix",
    imageUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=200&h=80&fit=crop&crop=center",
    altText: "Netflix - Streaming Entertainment",
    link: "https://netflix.com",
    active: true,
    sortOrder: 7
  },
  {
    name: "Adobe",
    imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=80&fit=crop&crop=center",
    altText: "Adobe - Creative Software",
    link: "https://adobe.com",
    active: true,
    sortOrder: 8
  },
  {
    name: "Spotify",
    imageUrl: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&h=80&fit=crop&crop=center",
    altText: "Spotify - Music Streaming",
    link: "https://spotify.com",
    active: true,
    sortOrder: 9
  },
  {
    name: "Uber",
    imageUrl: "https://images.unsplash.com/photo-1619718669840-6aca0ca8b399?w=200&h=80&fit=crop&crop=center",
    altText: "Uber - Transportation Services",
    link: "https://uber.com",
    active: true,
    sortOrder: 10
  },
  {
    name: "Airbnb",
    imageUrl: "https://images.unsplash.com/photo-1549294413-26f195200c16?w=200&h=80&fit=crop&crop=center",
    altText: "Airbnb - Travel & Hospitality",
    link: "https://airbnb.com",
    active: true,
    sortOrder: 11
  },
  {
    name: "LinkedIn",
    imageUrl: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=200&h=80&fit=crop&crop=center",
    altText: "LinkedIn - Professional Network",
    link: "https://linkedin.com",
    active: true,
    sortOrder: 12
  },
  {
    name: "Shopify",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=80&fit=crop&crop=center",
    altText: "Shopify - E-commerce Platform",
    link: "https://shopify.com",
    active: true,
    sortOrder: 13
  },
  {
    name: "Slack",
    imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=80&fit=crop&crop=center",
    altText: "Slack - Business Communication",
    link: "https://slack.com",
    active: true,
    sortOrder: 14
  },
  {
    name: "Zoom",
    imageUrl: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=200&h=80&fit=crop&crop=center",
    altText: "Zoom - Video Conferencing",
    link: "https://zoom.us",
    active: true,
    sortOrder: 15
  },
  {
    name: "HubSpot",
    imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=80&fit=crop&crop=center",
    altText: "HubSpot - CRM & Marketing",
    link: "https://hubspot.com",
    active: true,
    sortOrder: 16
  },
  {
    name: "Salesforce",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=80&fit=crop&crop=center",
    altText: "Salesforce - CRM Solutions",
    link: "https://salesforce.com",
    active: true,
    sortOrder: 17
  },
  {
    name: "Mailchimp",
    imageUrl: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=200&h=80&fit=crop&crop=center",
    altText: "Mailchimp - Email Marketing",
    link: "https://mailchimp.com",
    active: true,
    sortOrder: 18
  }
];

async function seedLogos() {
  try {
    console.log('🔍 Checking existing logos...');
    const existingCount = await prisma.logo.count();
    
    if (existingCount > 0) {
      console.log(`Found ${existingCount} existing logos. Clearing them...`);
      await prisma.logo.deleteMany();
    }

    console.log(`📦 Adding ${professionalLogos.length} client logos...`);
    
    let successCount = 0;
    for (const logo of professionalLogos) {
      try {
        await prisma.logo.create({ data: logo });
        console.log(`✅ Added: ${logo.name}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Failed to add ${logo.name}: ${error.message}`);
      }
    }

    console.log(`\n🎉 Successfully added ${successCount}/${professionalLogos.length} logos!`);
    
    const finalCount = await prisma.logo.count();
    console.log(`📊 Total logos in database: ${finalCount}`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedLogos();
EOF

# Copy and execute script on server
echo -e "${YELLOW}📤 Uploading logo script to server...${NC}"
sshpass -p "$HETZNER_PASSWORD" scp -o StrictHostKeyChecking=no server_logos.js "$HETZNER_USER@$HETZNER_IP:/tmp/"

echo -e "${YELLOW}🚀 Running logo seeding script...${NC}"
sshpass -p "$HETZNER_PASSWORD" ssh -o StrictHostKeyChecking=no "$HETZNER_USER@$HETZNER_IP" << 'REMOTE_SCRIPT'
cd /var/www/clicksalesmedia
echo "Setting up environment..."
export DATABASE_URL="postgresql://clicksales:ClickSales2024!@localhost:5432/clicksalesmedia"

echo "Running logo seeding script..."
node /tmp/server_logos.js

echo "Cleaning up..."
rm -f /tmp/server_logos.js
REMOTE_SCRIPT

# Clean up local files
rm -f server_logos.js

echo -e "\n${GREEN}✅ Logos successfully added to production database!${NC}"
echo -e "${BLUE}🌐 Visit https://clicksalesmedia.com to see the client logos${NC}"
echo -e "${BLUE}📊 Manage logos at https://clicksalesmedia.com/dashboard/logos${NC}" 
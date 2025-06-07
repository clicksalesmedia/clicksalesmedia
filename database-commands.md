# Database Setup Commands for ClickSalesMedia

This document contains useful commands for database management for the ClickSalesMedia project.

## Initial Database Setup

Run the following command to set up the PostgreSQL database on the server:

```bash
# Set up the database user and database
sudo -u postgres psql -c "CREATE USER clicksalesmedia_user WITH ENCRYPTED PASSWORD '3LU926xp8A7W';"
sudo -u postgres psql -c "CREATE DATABASE clicksalesmedia;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE clicksalesmedia TO clicksalesmedia_user;"
sudo -u postgres psql -c "ALTER USER clicksalesmedia_user WITH SUPERUSER;"

# Update .env file with the database URL
sed -i "s|DATABASE_URL=.*|DATABASE_URL=\"postgresql://clicksalesmedia_user:3LU926xp8A7W@localhost:5432/clicksalesmedia\"|g" .env

# Run migrations to set up the schema
npx prisma migrate deploy
```

## Creating or Updating Sample Data

Sample data for users, blog posts, and categories has been prepared in the `upsert-seed.js` file. Run this script to populate the database with initial content:

```bash
# Make sure you're in the project directory
cd /var/www/clicksalesmediaAI

# Run the seed script
node upsert-seed.js
```

This script uses "upsert" operations that will create new records if they don't exist or update existing ones.

## Admin Access

After running the seeding script, you can log in to the admin dashboard with the following credentials:

- URL: https://www.clicksalesmedia.com/dashboard
- Email: admin@clicksalesmedia.com
- Password: adminpass123!

## Database Maintenance Commands

### Checking Database Tables

```bash
# Connect to the database
sudo -u postgres psql -d clicksalesmedia

# List all tables
\dt

# Check users
SELECT * FROM "User" LIMIT 5;

# Check blog posts
SELECT * FROM "BlogPost" LIMIT 5;

# Check categories
SELECT * FROM "Category" LIMIT 5;

# Exit PostgreSQL
\q
```

### Creating Database Backup

```bash
# Create a backup file
sudo -u postgres pg_dump clicksalesmedia > /var/www/clicksalesmedia_backup_$(date +%Y%m%d).sql
```

### Restoring from Backup

```bash
# Restore from backup file
sudo -u postgres psql clicksalesmedia < /path/to/backup_file.sql
```

## Refreshing the Application

After making changes to the database, rebuild the application and restart services:

```bash
# Rebuild the Next.js application
cd /var/www/clicksalesmediaAI
npm run build

# Restart the application
pm2 restart all

# Restart Nginx if needed
systemctl restart nginx
``` 
#!/bin/bash

# Script to set up PostgreSQL database for ClickSalesMedia

# Constants
DB_NAME="clicksalesmedia"
DB_USER="clicksalesmedia_user"
DB_PASSWORD="3LU926xp8A7W"
POSTGRES_USER="postgres"

echo "Setting up PostgreSQL database for ClickSalesMedia..."

# Check if postgresql is installed
if ! command -v psql &> /dev/null; then
    echo "PostgreSQL is not installed. Installing PostgreSQL..."
    apt update
    apt install -y postgresql postgresql-contrib
    systemctl enable postgresql
    systemctl start postgresql
fi

# Create database user if not exists
sudo -u postgres psql -c "SELECT 1 FROM pg_roles WHERE rolname='$DB_USER'" | grep -q 1 || \
    sudo -u postgres psql -c "CREATE USER $DB_USER WITH ENCRYPTED PASSWORD '$DB_PASSWORD';"

# Create database if not exists
sudo -u postgres psql -c "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'" | grep -q 1 || \
    sudo -u postgres psql -c "CREATE DATABASE $DB_NAME;"

# Grant privileges
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"
sudo -u postgres psql -c "ALTER USER $DB_USER WITH SUPERUSER;"

# Update .env file with new database URL
sed -i "s|DATABASE_URL=.*|DATABASE_URL=\"postgresql://$DB_USER:$DB_PASSWORD@localhost:5432/$DB_NAME\"|g" .env

echo "Database setup complete!"

# Run Prisma migrations to create tables
echo "Running Prisma migrations..."
npx prisma migrate deploy

# Create sample content via seed endpoint
echo "Creating sample content..."
# Wait for server to be ready before trying to seed data
pm2 restart all
sleep 10
curl "http://localhost:3000/api/seed?key=development_seed_key"

echo "Sample data setup attempted. Check application logs for details."
echo "Database URL: postgresql://$DB_USER:$DB_PASSWORD@localhost:5432/$DB_NAME"

# Rebuild the application with the new database
echo "Rebuilding application..."
npm run build
pm2 restart all

echo "Database setup and application rebuild complete!" 
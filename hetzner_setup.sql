-- ClickSales Media Database Setup
CREATE DATABASE IF NOT EXISTS clicksalesmedia;
CREATE USER IF NOT EXISTS 'clicksales'@'%' IDENTIFIED BY 'ClickSales2024!';
GRANT ALL PRIVILEGES ON clicksalesmedia.* TO 'clicksales'@'%';
FLUSH PRIVILEGES;

-- Show databases to confirm
SHOW DATABASES;

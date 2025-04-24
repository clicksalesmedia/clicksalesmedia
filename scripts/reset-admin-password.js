const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function resetAdminPassword() {
  try {
    // Clear hash of existing admin user
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@clicksalesmedia.com' }
    });

    if (!admin) {
      console.log('Admin user not found');
      return;
    }

    // Generate new password hash
    const newPassword = 'ClickAdmin123!';
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user with new password
    const updatedUser = await prisma.user.update({
      where: { email: 'admin@clicksalesmedia.com' },
      data: { password: hashedPassword }
    });

    console.log(`Password reset for user: ${updatedUser.email}`);
    console.log(`New password: ${newPassword}`);
    
  } catch (error) {
    console.error('Error resetting password:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetAdminPassword(); 
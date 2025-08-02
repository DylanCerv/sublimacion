/**
 * Script to create admin user for Firebase Authentication email
 */

import { FirebaseService } from '../services/firebaseService';

const createEmailAdmin = async () => {
  console.log('👤 Creating admin user for Firebase Authentication email...');
  
  try {
    await FirebaseService.createDefaultAdmin();
    console.log('✅ Admin users created successfully!');
    console.log('');
    console.log('🔑 Available admin credentials:');
    console.log('   Username: admin | Password: admin123');
    console.log('   Email: gownerbeats@gmail.com | Password: admin123');
    console.log('');
    console.log('🌐 You can now login with either credential at:');
    console.log('   http://localhost:5174/admin');
    
  } catch (error) {
    console.error('❌ Error creating admin users:', error);
    throw error;
  }
};

// Export for use in other scripts
export { createEmailAdmin };

// Run if called directly
if (require.main === module) {
  createEmailAdmin()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
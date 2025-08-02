/**
 * Script to set up default admin user in Firebase
 * Run this once to create the initial admin credentials
 */

import { FirebaseService } from '../services/firebaseService';

const setupDefaultAdmin = async () => {
  console.log('🔧 Setting up default admin user...');
  
  try {
    await FirebaseService.createDefaultAdmin();
    console.log('✅ Default admin user created successfully!');
    console.log('');
    console.log('🔑 Default admin credentials:');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    console.log('');
    console.log('⚠️  IMPORTANT: Change these credentials in production!');
    console.log('   You can update them directly in Firebase Console.');
    
  } catch (error) {
    console.error('❌ Error setting up admin user:', error);
    throw error;
  }
};

// Export for use in other scripts
export { setupDefaultAdmin };

// Run if called directly
if (require.main === module) {
  setupDefaultAdmin()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
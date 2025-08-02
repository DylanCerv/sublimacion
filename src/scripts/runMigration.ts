#!/usr/bin/env node

/**
 * Migration script runner
 * Executes the Firebase migration process
 */

import { migrateToFirebase } from './migrateToFirebase';
import { setupDefaultAdmin } from './setupAdmin';

const main = async () => {
  console.log('🚀 Starting Firebase setup and data migration...');
  console.log('Make sure you have configured your Firebase credentials in .env.local');
  console.log('');

  try {
    // First, migrate the data
    await migrateToFirebase();
    
    console.log('');
    console.log('👤 Setting up admin user...');
    
    // Then, create the default admin user
    await setupDefaultAdmin();
    
    process.exit(0);
  } catch (error) {
    console.error('Setup failed:', error);
    process.exit(1);
  }
};

// Run the migration
main();
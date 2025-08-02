/**
 * Script to migrate local data to Firebase Firestore
 * 
 * IMPORTANT: Before running this script:
 * 1. Configure your Firebase project
 * 2. Set up your .env.local file with Firebase credentials
 * 3. Make sure you have the necessary permissions to write to Firestore
 * 
 * To run this script:
 * npm run migrate-data
 */

import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FirebaseService } from '../services/firebaseService';
// Note: This migration script is no longer needed as data is already in Firebase
// Keeping for reference only - original data has been migrated
import type { Shirt, Collection } from '../types';

const COLLECTIONS = {
    SHIRTS: 'shirts',
    COLLECTIONS: 'collections'
};

// Function to upload shirts to Firebase
const uploadShirts = async (): Promise<void> => {
    console.log('🔄 Starting shirts migration...');
    console.log('⚠️  Migration script is disabled - data already exists in Firebase');
    console.log('If you need to re-migrate, update this script with fresh data and uncomment the migration logic');
    return;

    /* 
    // Original migration code - COMMENTED OUT as data is already migrated
    try {
        const shirtsRef = collection(db, COLLECTIONS.SHIRTS);
        let successCount = 0;
        let errorCount = 0;

        for (const shirt of shirts) {
            try {
                await setDoc(doc(shirtsRef, shirt.id), {
                    name: shirt.name,
                    collection: shirt.collection,
                    originalPrice: shirt.originalPrice,
                    discountPercentage: shirt.discountPercentage,
                    images: shirt.images,
                    description: shirt.description,
                    sizes: shirt.sizes,
                    colors: shirt.colors || [],
                    tags: shirt.tags,
                    coutes: shirt.coutes,
                    porcentajeWithCoutes: shirt.porcentajeWithCoutes,
                    freeShippingThreshold: shirt.freeShippingThreshold,
                    featured: shirt.featured,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                successCount++;
                console.log(`✅ Uploaded shirt: ${shirt.name}`);
            } catch (error) {
                errorCount++;
                console.error(`❌ Failed to upload shirt ${shirt.name}:`, error);
            }
        }

        console.log(`🎉 Shirts migration completed! Success: ${successCount}, Errors: ${errorCount}`);
    } catch (error) {
        console.error('💥 Fatal error during shirts migration:', error);
        throw error;
    }
    */
};

// Function to upload collections to Firebase
const uploadCollections = async (): Promise<void> => {
    console.log('🔄 Starting collections migration...');
    console.log('⚠️  Migration script is disabled - data already exists in Firebase');
    console.log('If you need to re-migrate, update this script with fresh data and uncomment the migration logic');
    return;

    /* 
    // Original migration code - COMMENTED OUT as data is already migrated
    try {
        const collectionsRef = collection(db, COLLECTIONS.COLLECTIONS);
        let successCount = 0;
        let errorCount = 0;

        for (const coll of collections) {
            try {
                await setDoc(doc(collectionsRef, coll.id), {
                    name: coll.name,
                    description: coll.description,
                    image: coll.image,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                successCount++;
                console.log(`✅ Uploaded collection: ${coll.name}`);
            } catch (error) {
                errorCount++;
                console.error(`❌ Failed to upload collection ${coll.name}:`, error);
            }
        }

        console.log(`🎉 Collections migration completed! Success: ${successCount}, Errors: ${errorCount}`);
    } catch (error) {
        console.error('💥 Fatal error during collections migration:', error);
        throw error;
    }
    */
};

// Function to check if data already exists
const checkExistingData = async (): Promise<{ shirtsExist: boolean; collectionsExist: boolean }> => {
    console.log('🔍 Checking for existing data...');

    try {
        const [shirtsSnapshot, collectionsSnapshot] = await Promise.all([
            getDocs(collection(db, COLLECTIONS.SHIRTS)),
            getDocs(collection(db, COLLECTIONS.COLLECTIONS))
        ]);

        const shirtsExist = !shirtsSnapshot.empty;
        const collectionsExist = !collectionsSnapshot.empty;

        console.log(`📊 Existing data check:`);
        console.log(`   - Shirts: ${shirtsExist ? 'Found' : 'None'} (${shirtsSnapshot.size} documents)`);
        console.log(`   - Collections: ${collectionsExist ? 'Found' : 'None'} (${collectionsSnapshot.size} documents)`);

        return { shirtsExist, collectionsExist };
    } catch (error) {
        console.error('❌ Error checking existing data:', error);
        throw error;
    }
};

// Function to create default admin user
const createDefaultAdmin = async (): Promise<void> => {
  console.log('👤 Creating default admin user...');
  
  try {
    await FirebaseService.createDefaultAdmin();
    console.log('✅ Default admin user created (username: admin, password: admin123)');
  } catch (error) {
    console.error('❌ Failed to create default admin user:', error);
  }
};

// Main migration function
export const migrateToFirebase = async (): Promise<void> => {
  console.log('🚀 Starting Firebase migration...');
  console.log('='.repeat(50));

  try {
    // Check for existing data
    const { shirtsExist, collectionsExist } = await checkExistingData();

    // Ask for confirmation if data exists (in a real scenario)
    if (shirtsExist || collectionsExist) {
      console.log('⚠️  WARNING: Existing data found in Firestore!');
      console.log('   This migration will overwrite existing documents with the same IDs.');
      console.log('   Consider backing up your data before proceeding.');
    }

    // Create default admin user first
    await createDefaultAdmin();

    // Migrate collections first
    if (!collectionsExist) {
      await uploadCollections();
    } else {
      console.log('⏭️  Skipping collections migration (data already exists)');
    }

    // Migrate shirts
    if (!shirtsExist) {
      await uploadShirts();
    } else {
      console.log('⏭️  Skipping shirts migration (data already exists)');
    }

    console.log('='.repeat(50));
    console.log('🎊 Migration completed successfully!');
    console.log('Your data is now available in Firebase Firestore.');
    console.log('');
    console.log('🔐 Admin Panel Access:');
    console.log('   URL: http://localhost:5173/admin');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    
  } catch (error) {
    console.error('='.repeat(50));
    console.error('💥 Migration failed:', error);
    console.error('Please check your Firebase configuration and try again.');
    throw error;
  }
};

// Export individual functions for selective migration
export { uploadShirts, uploadCollections, checkExistingData };
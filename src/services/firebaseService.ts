import { collection, getDocs, doc, getDoc, query, where, orderBy, addDoc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { Shirt, Collection } from '../types';

// Collections names in Firestore
const COLLECTIONS = {
  SHIRTS: 'shirts',
  COLLECTIONS: 'collections',
  ADMINS: 'admins'
};

export class FirebaseService {
  // Fetch all shirts from Firestore
  static async getShirts(): Promise<Shirt[]> {
    try {
      const shirtsRef = collection(db, COLLECTIONS.SHIRTS);
      const q = query(shirtsRef, orderBy('featured', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const shirts: Shirt[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as DocumentData;
        shirts.push({
          id: doc.id,
          ...data
        } as Shirt);
      });
      
      return shirts;
    } catch (error) {
      console.error('Error fetching shirts:', error);
      throw new Error('Failed to fetch shirts from database');
    }
  }

  // Fetch a single shirt by ID
  static async getShirtById(id: string): Promise<Shirt | null> {
    try {
      const shirtRef = doc(db, COLLECTIONS.SHIRTS, id);
      const docSnap = await getDoc(shirtRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as Shirt;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching shirt:', error);
      throw new Error('Failed to fetch shirt from database');
    }
  }

  // Add a new shirt
  static async addShirt(shirtData: Omit<Shirt, 'id'>): Promise<string> {
    try {
      const shirtsRef = collection(db, COLLECTIONS.SHIRTS);
      const docRef = await addDoc(shirtsRef, {
        ...shirtData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding shirt:', error);
      throw new Error('Failed to add shirt to database');
    }
  }

  // Update an existing shirt
  static async updateShirt(id: string, shirtData: Partial<Shirt>): Promise<void> {
    try {
      const shirtRef = doc(db, COLLECTIONS.SHIRTS, id);
      await updateDoc(shirtRef, {
        ...shirtData,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating shirt:', error);
      throw new Error('Failed to update shirt in database');
    }
  }

  // Delete a shirt
  static async deleteShirt(id: string): Promise<void> {
    try {
      const shirtRef = doc(db, COLLECTIONS.SHIRTS, id);
      await deleteDoc(shirtRef);
    } catch (error) {
      console.error('Error deleting shirt:', error);
      throw new Error('Failed to delete shirt from database');
    }
  }

  // Fetch shirts by collection
  static async getShirtsByCollection(collectionName: string): Promise<Shirt[]> {
    try {
      const shirtsRef = collection(db, COLLECTIONS.SHIRTS);
      const q = query(
        shirtsRef, 
        where('collection', '==', collectionName),
        orderBy('featured', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const shirts: Shirt[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as DocumentData;
        shirts.push({
          id: doc.id,
          ...data
        } as Shirt);
      });
      
      return shirts;
    } catch (error) {
      console.error('Error fetching shirts by collection:', error);
      throw new Error('Failed to fetch shirts by collection from database');
    }
  }

  // Fetch featured shirts
  static async getFeaturedShirts(): Promise<Shirt[]> {
    try {
      const shirtsRef = collection(db, COLLECTIONS.SHIRTS);
      const q = query(shirtsRef, where('featured', '==', true));
      const querySnapshot = await getDocs(q);
      
      const shirts: Shirt[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as DocumentData;
        shirts.push({
          id: doc.id,
          ...data
        } as Shirt);
      });
      
      return shirts;
    } catch (error) {
      console.error('Error fetching featured shirts:', error);
      throw new Error('Failed to fetch featured shirts from database');
    }
  }

  // Fetch all collections
  static async getCollections(): Promise<Collection[]> {
    try {
      const collectionsRef = collection(db, COLLECTIONS.COLLECTIONS);
      const querySnapshot = await getDocs(collectionsRef);
      
      const collections: Collection[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as DocumentData;
        collections.push({
          id: doc.id,
          ...data
        } as Collection);
      });
      
      return collections;
    } catch (error) {
      console.error('Error fetching collections:', error);
      throw new Error('Failed to fetch collections from database');
    }
  }

  // Add a new collection
  static async addCollection(collectionData: Omit<Collection, 'id'>): Promise<string> {
    try {
      const collectionsRef = collection(db, COLLECTIONS.COLLECTIONS);
      const docRef = await addDoc(collectionsRef, {
        ...collectionData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding collection:', error);
      throw new Error('Failed to add collection to database');
    }
  }

  // Update an existing collection
  static async updateCollection(id: string, collectionData: Partial<Collection>): Promise<void> {
    try {
      const collectionRef = doc(db, COLLECTIONS.COLLECTIONS, id);
      await updateDoc(collectionRef, {
        ...collectionData,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating collection:', error);
      throw new Error('Failed to update collection in database');
    }
  }

  // Delete a collection
  static async deleteCollection(id: string): Promise<void> {
    try {
      const collectionRef = doc(db, COLLECTIONS.COLLECTIONS, id);
      await deleteDoc(collectionRef);
    } catch (error) {
      console.error('Error deleting collection:', error);
      throw new Error('Failed to delete collection from database');
    }
  }

  // Search shirts by text
  static async searchShirts(searchTerm: string): Promise<Shirt[]> {
    try {
      // Note: Firestore doesn't have full-text search built-in
      // This is a basic implementation that searches by name
      // For advanced search, consider using Algolia or similar
      const shirtsRef = collection(db, COLLECTIONS.SHIRTS);
      const querySnapshot = await getDocs(shirtsRef);
      
      const searchTermLower = searchTerm.toLowerCase();
      const shirts: Shirt[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data() as DocumentData;
        const shirt = {
          id: doc.id,
          ...data
        } as Shirt;
        
        // Search in name, description, and tags
        const matchesName = shirt.name.toLowerCase().includes(searchTermLower);
        const matchesDescription = shirt.description.toLowerCase().includes(searchTermLower);
        const matchesTags = shirt.tags.some(tag => 
          tag.toLowerCase().includes(searchTermLower)
        );
        
        if (matchesName || matchesDescription || matchesTags) {
          shirts.push(shirt);
        }
      });
      
      return shirts;
    } catch (error) {
      console.error('Error searching shirts:', error);
      throw new Error('Failed to search shirts in database');
    }
  }

  // Admin authentication
  static async authenticateAdmin(username: string, password: string): Promise<boolean> {
    try {
      // For production, use proper authentication
      // This is a simple implementation for demo purposes
      const adminsRef = collection(db, COLLECTIONS.ADMINS);
      
      // Try to find by username first
      let q = query(adminsRef, where('username', '==', username));
      let querySnapshot = await getDocs(q);
      
      // If not found by username, try by email
      if (querySnapshot.empty) {
        q = query(adminsRef, where('email', '==', username));
        querySnapshot = await getDocs(q);
      }
      
      if (querySnapshot.empty) {
        return false;
      }
      
      const adminDoc = querySnapshot.docs[0];
      const adminData = adminDoc.data();
      
      // In production, hash the password
      return adminData.password === password;
    } catch (error) {
      console.error('Error authenticating admin:', error);
      return false;
    }
  }

  // Create default admin user (for setup)
  static async createDefaultAdmin(): Promise<void> {
    try {
      // Create default admin with username
      const adminRef = doc(db, COLLECTIONS.ADMINS, 'default-admin');
      await setDoc(adminRef, {
        username: 'admin',
        password: 'admin123', // In production, hash this
        role: 'super-admin',
        createdAt: new Date()
      });

      // Create admin with email for Firebase Authentication users
      const emailAdminRef = doc(db, COLLECTIONS.ADMINS, 'email-admin');
      await setDoc(emailAdminRef, {
        username: 'gownerbeats@gmail.com',
        email: 'gownerbeats@gmail.com',
        password: 'admin123', // In production, hash this
        role: 'super-admin',
        createdAt: new Date()
      });
    } catch (error) {
      console.error('Error creating default admin:', error);
    }
  }
}
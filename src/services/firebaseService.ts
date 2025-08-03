import { collection, getDocs, doc, getDoc, query, where, orderBy, addDoc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { Shirt, Collection, SiteSettings } from '../types';
import type { AdminUser } from '../types/admin';

// Collections names in Firestore
const COLLECTIONS = {
  SHIRTS: 'shirts',
  COLLECTIONS: 'collections',
  ADMINS: 'admins',
  SETTINGS: 'settings'
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

  // Search shirts by text with advanced filtering
  static async searchShirts(searchTerm: string, filters?: {
    collections?: string[];
    priceRange?: [number, number];
    sizes?: string[];
    colors?: string[];
  }): Promise<Shirt[]> {
    try {
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
        
        // Search in name, description, tags, and collection
        const matchesSearch = !searchTerm || (
          shirt.name.toLowerCase().includes(searchTermLower) ||
          shirt.description.toLowerCase().includes(searchTermLower) ||
          shirt.collection.toLowerCase().includes(searchTermLower) ||
          shirt.tags.some(tag => tag.toLowerCase().includes(searchTermLower))
        );
        
        // Apply filters if provided
        let matchesFilters = true;
        
        if (filters) {
          // Collection filter
          if (filters.collections?.length && !filters.collections.includes(shirt.collection)) {
            matchesFilters = false;
          }
          
          // Price range filter
          if (filters.priceRange && (
            shirt.originalPrice < filters.priceRange[0] || 
            shirt.originalPrice > filters.priceRange[1]
          )) {
            matchesFilters = false;
          }
          
          // Size filter
          if (filters.sizes?.length && !filters.sizes.some(size => shirt.sizes.includes(size))) {
            matchesFilters = false;
          }
          
          // Color filter
          if (filters.colors?.length && (!shirt.colors || !filters.colors.some(color => shirt.colors!.includes(color)))) {
            matchesFilters = false;
          }
        }
        
        if (matchesSearch && matchesFilters) {
          shirts.push(shirt);
        }
      });
      
      return shirts;
    } catch (error) {
      console.error('Error searching shirts:', error);
      throw new Error('Failed to search shirts in database');
    }
  }

  // Get unique sizes from all shirts
  static async getAvailableSizes(): Promise<string[]> {
    try {
      const shirts = await this.getShirts();
      const sizes = new Set<string>();
      shirts.forEach(shirt => {
        shirt.sizes.forEach(size => sizes.add(size));
      });
      return Array.from(sizes).sort();
    } catch (error) {
      console.error('Error getting available sizes:', error);
      return [];
    }
  }

  // Get unique colors from all shirts
  static async getAvailableColors(): Promise<string[]> {
    try {
      const shirts = await this.getShirts();
      const colors = new Set<string>();
      shirts.forEach(shirt => {
        if (shirt.colors) {
          shirt.colors.forEach(color => colors.add(color));
        }
      });
      return Array.from(colors).sort();
    } catch (error) {
      console.error('Error getting available colors:', error);
      return [];
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

  // SETTINGS MANAGEMENT

  // Get site settings
  static async getSettings(): Promise<SiteSettings | null> {
    try {
      const settingsRef = collection(db, COLLECTIONS.SETTINGS);
      const querySnapshot = await getDocs(settingsRef);
      
      if (querySnapshot.empty) {
        // Create default settings if none exist
        return await this.createDefaultSettings();
      }

      const doc = querySnapshot.docs[0];
      const data = doc.data();
      
      return {
        id: doc.id,
        contact: data.contact,
        socialNetworks: data.socialNetworks,
        texts: data.texts,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date()
      } as SiteSettings;
    } catch (error) {
      console.error('Error fetching settings:', error);
      return null;
    }
  }

  // Update site settings
  static async updateSettings(settingsData: Partial<SiteSettings>): Promise<boolean> {
    try {
      const settingsRef = collection(db, COLLECTIONS.SETTINGS);
      const querySnapshot = await getDocs(settingsRef);

      if (querySnapshot.empty) {
        // Create new settings document
        await addDoc(settingsRef, {
          ...settingsData,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      } else {
        // Update existing settings
        const docRef = doc(db, COLLECTIONS.SETTINGS, querySnapshot.docs[0].id);
        await updateDoc(docRef, {
          ...settingsData,
          updatedAt: new Date()
        });
      }

      return true;
    } catch (error) {
      console.error('Error updating settings:', error);
      return false;
    }
  }

  // Create default settings
  static async createDefaultSettings(): Promise<SiteSettings> {
    const defaultSettings: Omit<SiteSettings, 'id'> = {
      contact: {
        phone: '+54 11 1234-5678',
        whatsapp: '5491123456789',
        whatsappDefaultMessage: 'Hola! Me interesa obtener más información sobre sus productos.',
        email: 'info@sublimacion.com',
        address: 'Buenos Aires, Argentina',
        businessHours: 'Lunes a Viernes: 9:00 - 18:00\nSábados: 9:00 - 13:00\nDomingos: Cerrado'
      },
      socialNetworks: [
        {
          id: 'instagram',
          name: 'Instagram',
          url: 'https://instagram.com/sublimacion',
          icon: 'instagram',
          enabled: true
        },
        {
          id: 'facebook',
          name: 'Facebook',
          url: 'https://facebook.com/sublimacion',
          icon: 'facebook',
          enabled: true
        },
        {
          id: 'twitter',
          name: 'Twitter',
          url: 'https://twitter.com/sublimacion',
          icon: 'twitter',
          enabled: false
        },
        {
          id: 'tiktok',
          name: 'TikTok',
          url: 'https://tiktok.com/@sublimacion',
          icon: 'tiktok',
          enabled: false
        }
      ],
      texts: {
        footerDescription: 'DRIVEN - Sublimación Premium. Diseños únicos para verdaderos fanáticos del automovilismo.'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    try {
      const settingsRef = collection(db, COLLECTIONS.SETTINGS);
      const docRef = await addDoc(settingsRef, defaultSettings);
      
      return {
        id: docRef.id,
        ...defaultSettings
      } as SiteSettings;
    } catch (error) {
      console.error('Error creating default settings:', error);
      throw error;
    }
  }
}
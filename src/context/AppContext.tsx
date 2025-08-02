import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Shirt, Filter, Collection } from '../types';
import { useFirebase } from '../hooks/useFirebase';
import { FirebaseService } from '../services/firebaseService';
// Fallback data in case Firebase is not configured
import { shirts as fallbackShirts } from '../data/shirts';
import { collections as fallbackCollections } from '../data/collections';

interface AppContextType {
  allShirts: Shirt[];
  filteredShirts: Shirt[];
  collections: Collection[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: Filter;
  setFilters: (filters: Filter) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isCollectionSidebarOpen: boolean;
  setIsCollectionSidebarOpen: (open: boolean) => void;
  applyFilters: () => void;
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Use Firebase hook with fallback to local data
  const { shirts: firebaseShirts, collections: firebaseCollections, isLoading, error, refreshData } = useFirebase();
  
  // State management
  const [allShirts, setAllShirts] = useState<Shirt[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [filteredShirts, setFilteredShirts] = useState<Shirt[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Filter>({
    collections: [],
    priceRange: [0, 50000],
    sizes: [],
    colors: []
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollectionSidebarOpen, setIsCollectionSidebarOpen] = useState(false);

  // Update data when Firebase data changes or fallback to local data
  useEffect(() => {
    if (!isLoading) {
      if (error) {
        // Use fallback data if Firebase fails
        console.warn('Using fallback data due to Firebase error:', error);
        setAllShirts(fallbackShirts);
        setCollections(fallbackCollections);
      } else {
        // Use Firebase data if available
        setAllShirts(firebaseShirts);
        setCollections(firebaseCollections);
      }
    }
  }, [firebaseShirts, firebaseCollections, isLoading, error]);

  const applyFilters = () => {
    let filtered = allShirts;

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(shirt =>
        shirt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shirt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shirt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply collection filter
    if (filters.collections.length > 0) {
      filtered = filtered.filter(shirt =>
        filters.collections.includes(shirt.collection)
      );
    }

    // Apply price filter
    filtered = filtered.filter(shirt =>
      shirt.originalPrice >= filters.priceRange[0] && shirt.originalPrice <= filters.priceRange[1]
    );

    // Apply size filter
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(shirt =>
        filters.sizes.some(size => shirt.sizes.includes(size))
      );
    }

    // Apply color filter
    if (filters.colors.length > 0) {
      filtered = filtered.filter(shirt =>
        shirt.colors && filters.colors.some(color => shirt.colors!.includes(color))
      );
    }

    setFilteredShirts(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filters, allShirts]);

  const value: AppContextType = {
    allShirts,
    filteredShirts,
    collections,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    isSidebarOpen,
    setIsSidebarOpen,
    isCollectionSidebarOpen,
    setIsCollectionSidebarOpen,
    applyFilters,
    isLoading,
    error,
    refreshData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}; 
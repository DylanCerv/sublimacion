import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Shirt, Filter, Collection } from '../types';
import { useFirebase } from '../hooks/useFirebase';
import { FirebaseService } from '../services/firebaseService';


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
  isFilterSidebarOpen: boolean;
  setIsFilterSidebarOpen: (open: boolean) => void;
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
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

  // Update data when Firebase data changes
  useEffect(() => {
    if (!isLoading && !error) {
      // Use Firebase data when available
      setAllShirts(firebaseShirts);
      setCollections(firebaseCollections);
    }
  }, [firebaseShirts, firebaseCollections, isLoading, error]);

  const applyFilters = async () => {
    // If we have Firebase data and search term or active filters, use Firebase search
    const hasSearchTerm = searchTerm.trim() !== '';
    const hasActiveFilters = filters.collections.length > 0 || 
                            filters.sizes.length > 0 || 
                            filters.colors.length > 0 ||
                            filters.priceRange[0] > 0 || 
                            filters.priceRange[1] < 50000;

    if (!error && (hasSearchTerm || hasActiveFilters)) {
      try {
        // Use Firebase search with filters for better performance
        const searchResults = await FirebaseService.searchShirts(searchTerm, {
          collections: filters.collections.length > 0 ? filters.collections : undefined,
          priceRange: filters.priceRange,
          sizes: filters.sizes.length > 0 ? filters.sizes : undefined,
          colors: filters.colors.length > 0 ? filters.colors : undefined,
        });
        setFilteredShirts(searchResults);
        return;
      } catch (searchError) {
        console.warn('Firebase search failed, using local filtering:', searchError);
      }
    }

    // Fallback to local filtering
    let filtered = allShirts;

    // Apply search filter locally
    if (hasSearchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter(shirt =>
        shirt.name.toLowerCase().includes(searchTermLower) ||
        shirt.description.toLowerCase().includes(searchTermLower) ||
        shirt.collection.toLowerCase().includes(searchTermLower) ||
        shirt.tags.some(tag => tag.toLowerCase().includes(searchTermLower))
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
    isFilterSidebarOpen,
    setIsFilterSidebarOpen,
    applyFilters,
    isLoading,
    error,
    refreshData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}; 
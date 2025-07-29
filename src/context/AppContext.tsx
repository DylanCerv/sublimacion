import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Shirt, Filter } from '../types';
import { shirts } from '../data/shirts';

interface AppContextType {
  allShirts: Shirt[];
  filteredShirts: Shirt[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: Filter;
  setFilters: (filters: Filter) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isCollectionSidebarOpen: boolean;
  setIsCollectionSidebarOpen: (open: boolean) => void;
  applyFilters: () => void;
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
  const [allShirts] = useState<Shirt[]>(shirts);
  const [filteredShirts, setFilteredShirts] = useState<Shirt[]>(shirts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Filter>({
    collections: [],
    priceRange: [0, 50000],
    sizes: [],
    colors: []
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollectionSidebarOpen, setIsCollectionSidebarOpen] = useState(false);

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

  React.useEffect(() => {
    applyFilters();
  }, [searchTerm, filters, allShirts]);

  const value: AppContextType = {
    allShirts,
    filteredShirts,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    isSidebarOpen,
    setIsSidebarOpen,
    isCollectionSidebarOpen,
    setIsCollectionSidebarOpen,
    applyFilters
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}; 
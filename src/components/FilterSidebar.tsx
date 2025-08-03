import React, { useMemo, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { X, Filter } from 'lucide-react';

const FilterSidebar: React.FC = () => {
  const { filters, setFilters, collections, allShirts, isFilterSidebarOpen, setIsFilterSidebarOpen } = useAppContext();
  
  // Check if it's mobile screen
  const [isMobile, setIsMobile] = React.useState(false);
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Get dynamic sizes and colors from actual products in Firebase
  const { allSizes, allColors } = useMemo(() => {
    const sizes = new Set<string>();
    const colors = new Set<string>();

    allShirts.forEach(shirt => {
      shirt.sizes.forEach(size => sizes.add(size));
      if (shirt.colors) {
        shirt.colors.forEach(color => colors.add(color));
      }
    });

    return {
      allSizes: Array.from(sizes).sort(),
      allColors: Array.from(colors).sort()
    };
  }, [allShirts]);

  const handleCollectionFilter = (collectionName: string) => {
    const newCollections = filters.collections.includes(collectionName)
      ? filters.collections.filter(c => c !== collectionName)
      : [...filters.collections, collectionName];
    
    setFilters({ ...filters, collections: newCollections });
  };

  const handleSizeFilter = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    
    setFilters({ ...filters, sizes: newSizes });
  };

  const handleColorFilter = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    
    setFilters({ ...filters, colors: newColors });
  };

  const handlePriceChange = (min: number, max: number) => {
    setFilters({ 
      ...filters, 
      priceRange: [min, max] as [number, number]
    });
  };

  const clearAllFilters = () => {
    setFilters({
      collections: [],
      sizes: [],
      colors: [],
      priceRange: [0, 50000] as [number, number]
    });
  };

  // Don't render on mobile unless open
  if (isMobile && !isFilterSidebarOpen) {
    return null;
  }
  
  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isFilterSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsFilterSidebarOpen(false)}
        />
      )}
      
      {/* Filter Sidebar */}
      <div className={`
        ${isMobile 
          ? 'fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out'
          : 'w-64 bg-white border-r border-gray-200'
        } p-4 sm:p-6 h-full overflow-y-auto
        ${isMobile && isFilterSidebarOpen ? 'translate-x-0' : ''}
        ${isMobile && !isFilterSidebarOpen ? 'translate-x-full' : ''}
      `}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
          <div className="flex items-center gap-2">
            <button 
              onClick={clearAllFilters}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Limpiar
            </button>
            {isMobile && (
              <button
                onClick={() => setIsFilterSidebarOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-md lg:hidden"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            )}
          </div>
        </div>
      
      {/* Colecciones */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wide">Colecciones</h4>
        <div className="space-y-3">
          {collections.map((collection) => (
            <div key={collection.id} className="flex items-center">
              <input
                type="checkbox"
                id={`collection-${collection.id}`}
                checked={filters.collections.includes(collection.name)}
                onChange={() => handleCollectionFilter(collection.name)}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label 
                htmlFor={`collection-${collection.id}`} 
                className="ml-3 text-sm text-gray-700 hover:text-gray-900 cursor-pointer"
              >
                {collection.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Colores */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wide">Color</h4>
        <div className="space-y-3">
          {allColors.map((color) => (
            <div key={color} className="flex items-center">
              <input
                type="checkbox"
                id={`color-${color}`}
                checked={filters.colors.includes(color)}
                onChange={() => handleColorFilter(color)}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label 
                htmlFor={`color-${color}`} 
                className="ml-3 text-sm text-gray-700 hover:text-gray-900 cursor-pointer"
              >
                {color}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Talles */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wide">Talle</h4>
        <div className="space-y-3">
          {allSizes.map((size) => (
            <div key={size} className="flex items-center">
              <input
                type="checkbox"
                id={`size-${size}`}
                checked={filters.sizes.includes(size)}
                onChange={() => handleSizeFilter(size)}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label 
                htmlFor={`size-${size}`} 
                className="ml-3 text-sm text-gray-700 hover:text-gray-900 cursor-pointer"
              >
                {size}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Precio */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wide">Precio</h4>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Min"
            className="border border-gray-300 rounded px-3 py-2 w-20 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              handlePriceChange(value, filters.priceRange[1]);
            }}
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            placeholder="Max"
            className="border border-gray-300 rounded px-3 py-2 w-20 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            onChange={(e) => {
              const value = parseInt(e.target.value) || 50000;
              handlePriceChange(filters.priceRange[0], value);
            }}
          />
        </div>
      </div>
      </div>
    </>
  );
};

export default FilterSidebar;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ShirtCard from '../components/ShirtCard';
import FilterSidebar from '../components/FilterSidebar';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Products: React.FC = () => {
  const { collectionId } = useParams<{ collectionId?: string }>();
  const { 
    allShirts, 
    filteredShirts, 
    filters, 
    setFilters, 
    collections, 
    isLoading, 
    error, 
    refreshData 
  } = useAppContext();
  const navigate = useNavigate();
  const [hasInitialized, setHasInitialized] = useState(false);

  const collection = collectionId ? collections.find(c => c.id === collectionId) : null;
  
  useEffect(() => {
    // Only set collection filter when first loading a specific collection page
    if (collection && !hasInitialized) {
      setFilters({
        ...filters,
        collections: [collection.name]
      });
      setHasInitialized(true);
    } else if (!collection && !hasInitialized) {
      // Clear collection filters when not on a specific collection page
      setFilters({
        ...filters,
        collections: []
      });
      setHasInitialized(true);
    }
  }, [collection, hasInitialized]);

  // Reset initialization when route changes
  useEffect(() => {
    setHasInitialized(false);
  }, [collectionId]);

  // Determine which products to show
  let productsToShow: typeof allShirts;
  let showingAllProducts = false;

  if (collection) {
    // On a specific collection page - show products from that collection with other filters applied
    const collectionShirts = allShirts.filter(shirt => shirt.collection === collection.name);
    // Apply other filters to collection shirts
         productsToShow = collectionShirts.filter(shirt => {
       // Apply price filter
       if (shirt.originalPrice < filters.priceRange[0] || shirt.originalPrice > filters.priceRange[1]) {
         return false;
       }
       // Apply size filter
       if (filters.sizes.length > 0 && !filters.sizes.some(size => shirt.sizes.includes(size))) {
         return false;
       }
       // Apply color filter
       if (filters.colors.length > 0 && (!shirt.colors || !filters.colors.some(color => shirt.colors!.includes(color)))) {
         return false;
       }
       return true;
     });
  } else {
    // On general collection page - use filtered shirts or all shirts if no filters
    const hasActiveFilters = filters.collections.length > 0 || 
                            filters.sizes.length > 0 || 
                            filters.colors.length > 0 ||
                            filters.priceRange[0] > 0 || 
                            filters.priceRange[1] < 50000;
    
    if (hasActiveFilters) {
      productsToShow = filteredShirts;
    } else {
      productsToShow = allShirts;
      showingAllProducts = true;
    }
  }

  const pageTitle = collection ? `${collection.name}` : 'Todas las Camisas';
  const productCount = productsToShow.length;

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex">
        <FilterSidebar />
        <div className="flex-1 p-6">
          <LoadingSpinner size="large" message="Cargando productos..." />
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex">
        <FilterSidebar />
        <div className="flex-1 p-6">
          <ErrorMessage message={error} onRetry={refreshData} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex">
      <FilterSidebar />
      
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {pageTitle}
          </h1>
          <p className="text-gray-600 text-sm">
            {showingAllProducts ? 
              `Mostrando todos los ${productCount} productos` :
              `${productCount} productos${collection ? ' en esta colección' : ' encontrados'}`
            }
          </p>
        </div>

        {productsToShow.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {collection ? 
                'No hay productos en esta colección que coincidan con los filtros seleccionados.' :
                'No se encontraron productos con los filtros seleccionados.'
              }
            </p>
            <button 
              onClick={() => setFilters({
                collections: collection ? [collection.name] : [],
                sizes: [],
                colors: [],
                priceRange: [0, 50000]
              })}
              className="mt-4 text-blue-600 hover:text-blue-800 underline"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {productsToShow.map((shirt) => (
              <ShirtCard key={shirt.id} shirt={shirt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products; 
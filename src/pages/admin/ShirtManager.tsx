import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { FirebaseService } from '../../services/firebaseService';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Star, 
  Search,
  Filter,
  Package,
  ArrowUpRight,
  Grid3X3,
  ShoppingBag
} from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

const ShirtManager: React.FC = () => {
  const { allShirts, collections, isLoading, error, refreshData } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const filteredShirts = allShirts.filter(shirt => {
    const matchesSearch = shirt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shirt.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCollection = !selectedCollection || shirt.collection === selectedCollection;
    return matchesSearch && matchesCollection;
  });

  const handleDeleteShirt = async (shirtId: string, shirtName: string) => {
    const confirmed = window.confirm(`¿Estás seguro de que quieres eliminar "${shirtName}"?`);
    if (!confirmed) return;

    setIsDeleting(shirtId);
    try {
      await FirebaseService.deleteShirt(shirtId);
      refreshData();
    } catch (error) {
      console.error('Error deleting shirt:', error);
      alert('Error al eliminar el producto. Inténtalo de nuevo.');
    } finally {
      setIsDeleting(null);
    }
  };

  if (isLoading) {
    return <LoadingSpinner size="large" message="Cargando productos..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refreshData} />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-gray-900 mb-2">Productos</h1>
          <p className="text-gray-500 text-lg">Gestiona el inventario completo de tu tienda</p>
        </div>
        <Link
          to="/admin/shirts/new"
          className="group bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-2xl flex items-center space-x-2 transition-all hover:scale-[1.02] shadow-lg"
        >
          <Plus className="h-5 w-5" />
          <span className="font-medium">Nuevo Producto</span>
          <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar en productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 focus:bg-white transition-all placeholder-gray-400"
            />
          </div>

          {/* Collection Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 focus:bg-white transition-all appearance-none"
            >
              <option value="">Todas las colecciones</option>
              {collections.map(collection => (
                <option key={collection.id} value={collection.name}>
                  {collection.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {filteredShirts.length} de {allShirts.length} productos
          </div>
          {allShirts.length > 0 && (
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <Grid3X3 className="h-4 w-4" />
              <span>Vista en cuadrícula</span>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {filteredShirts.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-3xl p-16 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-light text-gray-900 mb-3">
            {allShirts.length === 0 ? 'Sin productos aún' : 'Sin resultados'}
          </h3>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            {allShirts.length === 0 
              ? 'Crea tu primer producto para comenzar a construir tu catálogo de sublimación.'
              : 'No encontramos productos que coincidan con tu búsqueda. Prueba otros términos o filtros.'
            }
          </p>
          {allShirts.length === 0 && (
            <Link
              to="/admin/shirts/new"
              className="group bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-2xl inline-flex items-center space-x-3 transition-all hover:scale-[1.02] shadow-lg"
            >
              <Plus className="h-5 w-5" />
              <span className="font-medium">Crear Primer Producto</span>
              <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredShirts.map((shirt) => (
            <div key={shirt.id} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={shirt.images[0]}
                  alt={shirt.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {shirt.featured && (
                  <div className="absolute top-3 right-3 bg-amber-400/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center shadow-lg">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Destacado
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-3">
                  <h3 className="font-medium text-gray-900 text-base leading-tight mb-1 line-clamp-2">
                    {shirt.name}
                  </h3>
                  <p className="text-sm text-gray-500">{shirt.collection}</p>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-light text-gray-900">
                    ${shirt.originalPrice.toLocaleString()}
                  </span>
                  {shirt.discountPercentage > 0 && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                      -{shirt.discountPercentage}%
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Link
                    to={`/admin/shirts/edit/${shirt.id}`}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDeleteShirt(shirt.id, shirt.name)}
                    disabled={isDeleting === shirt.id}
                    className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isDeleting === shirt.id ? (
                      <div className="h-4 w-4 animate-spin border-2 border-red-600 border-t-transparent rounded-full" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShirtManager;
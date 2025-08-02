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
  Package
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Productos</h1>
          <p className="text-gray-600">Administra todas las camisetas de tu tienda</p>
        </div>
        <Link
          to="/admin/shirts/new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Nuevo Producto</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Collection Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
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
        <div className="mt-4 text-sm text-gray-600">
          Mostrando {filteredShirts.length} de {allShirts.length} productos
        </div>
      </div>

      {/* Products Grid */}
      {filteredShirts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {allShirts.length === 0 ? 'No hay productos existentes' : 'No se encontraron productos'}
          </h3>
          <p className="text-gray-600 mb-6">
            {allShirts.length === 0 
              ? 'Comienza creando tu primer producto para la tienda.'
              : 'Prueba ajustando los filtros de búsqueda.'
            }
          </p>
          {allShirts.length === 0 && (
            <Link
              to="/admin/shirts/new"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg inline-flex items-center space-x-2 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Crear Primer Producto</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredShirts.map((shirt) => (
            <div key={shirt.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {/* Image */}
              <div className="relative h-48">
                <img
                  src={shirt.images[0]}
                  alt={shirt.name}
                  className="w-full h-full object-cover"
                />
                {shirt.featured && (
                  <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <Star className="h-3 w-3 mr-1" />
                    Destacado
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900 text-sm leading-tight">
                    {shirt.name}
                  </h3>
                </div>
                
                <p className="text-xs text-gray-600 mb-2">{shirt.collection}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-gray-900">
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
                    className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
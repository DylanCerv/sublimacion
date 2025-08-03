import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { FirebaseService } from '../../services/firebaseService';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Folder,
  Image as ImageIcon,
  ArrowUpRight,
  Package
} from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

const CollectionManager: React.FC = () => {
  const { allShirts, collections, isLoading, error, refreshData } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collection.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCollectionShirtCount = (collectionName: string) => {
    return allShirts.filter(shirt => shirt.collection === collectionName).length;
  };

  const handleDeleteCollection = async (collectionId: string, collectionName: string) => {
    const shirtCount = getCollectionShirtCount(collectionName);
    
    if (shirtCount > 0) {
      alert(`No puedes eliminar esta colección porque tiene ${shirtCount} productos asociados. Elimina o reasigna los productos primero.`);
      return;
    }

    const confirmed = window.confirm(`¿Estás seguro de que quieres eliminar la colección "${collectionName}"?`);
    if (!confirmed) return;

    setIsDeleting(collectionId);
    try {
      await FirebaseService.deleteCollection(collectionId);
      refreshData();
    } catch (error) {
      console.error('Error deleting collection:', error);
      alert('Error al eliminar la colección. Inténtalo de nuevo.');
    } finally {
      setIsDeleting(null);
    }
  };

  if (isLoading) {
    return <LoadingSpinner size="large" message="Cargando colecciones..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refreshData} />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-gray-900 mb-2">Colecciones</h1>
          <p className="text-gray-500 text-lg">Organiza y gestiona las categorías de productos</p>
        </div>
        <Link
          to="/admin/collections/new"
          className="group bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-2xl flex items-center space-x-2 transition-all hover:scale-[1.02] shadow-lg"
        >
          <Plus className="h-5 w-5" />
          <span className="font-medium">Nueva Colección</span>
          <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar en colecciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 focus:bg-white transition-all placeholder-gray-400"
          />
        </div>

        {/* Results Count */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {filteredCollections.length} de {collections.length} colecciones
          </div>
          {collections.length > 0 && (
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <Package className="h-4 w-4" />
              <span>Total de categorías activas</span>
            </div>
          )}
        </div>
      </div>

      {/* Collections List */}
      {filteredCollections.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-3xl p-16 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Folder className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-light text-gray-900 mb-3">
            {collections.length === 0 ? 'Sin colecciones aún' : 'Sin resultados'}
          </h3>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            {collections.length === 0 
              ? 'Crea tu primera colección para organizar y categorizar tus productos de manera efectiva.'
              : 'No encontramos colecciones que coincidan con tu búsqueda. Intenta con otros términos.'
            }
          </p>
          {collections.length === 0 && (
            <Link
              to="/admin/collections/new"
              className="group bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-2xl inline-flex items-center space-x-3 transition-all hover:scale-[1.02] shadow-lg"
            >
              <Plus className="h-5 w-5" />
              <span className="font-medium">Crear Primera Colección</span>
              <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCollections.map((collection) => {
            const shirtCount = getCollectionShirtCount(collection.name);
            
            return (
              <div key={collection.id} className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between">
                  {/* Collection Info */}
                  <div className="flex items-center space-x-6 flex-1 min-w-0">
                    {/* Image */}
                    <div className="flex-shrink-0">
                      <div className="relative h-16 w-16">
                        {collection.image ? (
                          <img
                            className="h-16 w-16 rounded-2xl object-cover shadow-sm"
                            src={collection.image}
                            alt={collection.name}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              (e.currentTarget.parentElement!.children[1] as HTMLElement).style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className="h-16 w-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm"
                          style={{ display: collection.image ? 'none' : 'flex' }}
                        >
                          <ImageIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {collection.name}
                        </h3>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          {shirtCount} producto{shirtCount !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm line-clamp-2">
                        {collection.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        ID: {collection.id}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-3">
                    <Link
                      to={`/admin/collections/edit/${collection.id}`}
                      className="group/edit flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="text-sm font-medium">Editar</span>
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover/edit:opacity-100 transition-opacity" />
                    </Link>
                    <button
                      onClick={() => handleDeleteCollection(collection.id, collection.name)}
                      disabled={isDeleting === collection.id || shirtCount > 0}
                      className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      title={shirtCount > 0 ? 'No puedes eliminar una colección con productos' : 'Eliminar colección'}
                    >
                      {isDeleting === collection.id ? (
                        <div className="h-4 w-4 animate-spin border-2 border-red-600 border-t-transparent rounded-full" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                      <span className="text-sm font-medium">Eliminar</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CollectionManager;
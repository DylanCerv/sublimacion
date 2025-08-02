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
  Image as ImageIcon
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Colecciones</h1>
          <p className="text-gray-600">Administra las categorías de productos de tu tienda</p>
        </div>
        <Link
          to="/admin/collections/new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Nueva Colección</span>
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Buscar colecciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600">
          Mostrando {filteredCollections.length} de {collections.length} colecciones
        </div>
      </div>

      {/* Collections List */}
      {filteredCollections.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Folder className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {collections.length === 0 ? 'No hay colecciones existentes' : 'No se encontraron colecciones'}
          </h3>
          <p className="text-gray-600 mb-6">
            {collections.length === 0 
              ? 'Comienza creando tu primera colección para organizar los productos.'
              : 'Prueba ajustando el término de búsqueda.'
            }
          </p>
          {collections.length === 0 && (
            <Link
              to="/admin/collections/new"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg inline-flex items-center space-x-2 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Crear Primera Colección</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Colección
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Productos
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCollections.map((collection) => {
                  const shirtCount = getCollectionShirtCount(collection.name);
                  
                  return (
                    <tr key={collection.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16">
                            {collection.image ? (
                              <img
                                className="h-16 w-16 rounded-lg object-cover"
                                src={collection.image}
                                alt={collection.name}
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  (e.currentTarget.parentElement!.children[1] as HTMLElement).style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <div 
                              className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center"
                              style={{ display: collection.image ? 'none' : 'flex' }}
                            >
                              <ImageIcon className="h-6 w-6 text-gray-400" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {collection.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {collection.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs">
                          {collection.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            {shirtCount} producto{shirtCount !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link
                            to={`/admin/collections/edit/${collection.id}`}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm transition-colors flex items-center"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Link>
                          <button
                            onClick={() => handleDeleteCollection(collection.id, collection.name)}
                            disabled={isDeleting === collection.id || shirtCount > 0}
                            className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                            title={shirtCount > 0 ? 'No puedes eliminar una colección con productos' : 'Eliminar colección'}
                          >
                            {isDeleting === collection.id ? (
                              <div className="h-4 w-4 animate-spin border-2 border-red-600 border-t-transparent rounded-full" />
                            ) : (
                              <>
                                <Trash2 className="h-4 w-4 mr-1" />
                                Eliminar
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionManager;
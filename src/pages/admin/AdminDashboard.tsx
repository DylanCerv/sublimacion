import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { 
  Shirt, 
  Folder, 
  TrendingUp, 
  Star,
  Plus,
  Package,
  BarChart3
} from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

const AdminDashboard: React.FC = () => {
  const { allShirts, collections, isLoading, error, refreshData } = useAppContext();
  const [stats, setStats] = useState({
    totalShirts: 0,
    totalCollections: 0,
    featuredShirts: 0,
    averagePrice: 0
  });

  useEffect(() => {
    if (!isLoading && allShirts.length > 0) {
      const featuredCount = allShirts.filter(shirt => shirt.featured).length;
      const totalPrice = allShirts.reduce((sum, shirt) => sum + shirt.originalPrice, 0);
      const avgPrice = totalPrice / allShirts.length;

      setStats({
        totalShirts: allShirts.length,
        totalCollections: collections.length,
        featuredShirts: featuredCount,
        averagePrice: Math.round(avgPrice)
      });
    }
  }, [allShirts, collections, isLoading]);

  if (isLoading) {
    return <LoadingSpinner size="large" message="Cargando dashboard..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refreshData} />;
  }

  const statsCards = [
    {
      title: 'Total Camisetas',
      value: stats.totalShirts,
      icon: Shirt,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Colecciones',
      value: stats.totalCollections,
      icon: Folder,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Productos Destacados',
      value: stats.featuredShirts,
      icon: Star,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    },
    {
      title: 'Precio Promedio',
      value: `$${stats.averagePrice.toLocaleString()}`,
      icon: TrendingUp,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    }
  ];

  const quickActions = [
    {
      title: 'Agregar Camiseta',
      description: 'Crear un nuevo producto',
      icon: Plus,
      link: '/admin/shirts/new',
      color: 'bg-indigo-600 hover:bg-indigo-700'
    },
    {
      title: 'Nueva Colección',
      description: 'Crear una nueva categoría',
      icon: Package,
      link: '/admin/collections/new',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'Ver Camisetas',
      description: 'Gestionar productos existentes',
      icon: Shirt,
      link: '/admin/shirts',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'Ver Colecciones',
      description: 'Gestionar categorías',
      icon: Folder,
      link: '/admin/collections',
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Panel de Administración
        </h1>
        <p className="text-gray-600">
          Gestiona productos, colecciones y configura tu tienda de sublimación.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`${stat.bgColor} rounded-lg p-6 border border-gray-200`}>
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                to={action.link}
                className={`${action.color} text-white p-4 rounded-lg transition-colors hover:scale-105 transform duration-200`}
              >
                <div className="flex items-center mb-2">
                  <Icon className="h-5 w-5 mr-2" />
                  <h3 className="font-medium">{action.title}</h3>
                </div>
                <p className="text-sm opacity-90">{action.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Shirts */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Productos Recientes</h2>
            <Link 
              to="/admin/shirts" 
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              Ver todos
            </Link>
          </div>
          
          {allShirts.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No hay productos existentes</p>
              <Link 
                to="/admin/shirts/new" 
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium mt-2 inline-block"
              >
                Crear el primer producto
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {allShirts.slice(0, 5).map((shirt) => (
                <div key={shirt.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <img 
                    src={shirt.images[0]} 
                    alt={shirt.name}
                    className="w-12 h-12 object-cover rounded-lg mr-3"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{shirt.name}</h3>
                    <p className="text-sm text-gray-600">{shirt.collection}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${shirt.originalPrice.toLocaleString()}</p>
                    {shirt.featured && (
                      <Star className="h-4 w-4 text-yellow-500 ml-auto" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Collections Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Colecciones</h2>
            <Link 
              to="/admin/collections" 
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              Ver todas
            </Link>
          </div>
          
          {collections.length === 0 ? (
            <div className="text-center py-8">
              <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No hay colecciones existentes</p>
              <Link 
                to="/admin/collections/new" 
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium mt-2 inline-block"
              >
                Crear la primera colección
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {collections.map((collection) => {
                const collectionShirtCount = allShirts.filter(
                  shirt => shirt.collection === collection.name
                ).length;
                
                return (
                  <div key={collection.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <img 
                      src={collection.image} 
                      alt={collection.name}
                      className="w-12 h-12 object-cover rounded-lg mr-3"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{collection.name}</h3>
                      <p className="text-sm text-gray-600">{collection.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{collectionShirtCount} productos</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
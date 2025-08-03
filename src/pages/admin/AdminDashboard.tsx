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
  BarChart3,
  ArrowUpRight,
  Activity,
  ShoppingBag
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
      title: 'Total Productos',
      value: stats.totalShirts,
      icon: ShoppingBag,
      trend: '+12%',
      description: 'productos activos',
      gradient: 'from-blue-50 to-indigo-50',
      iconColor: 'text-blue-600',
      textColor: 'text-gray-900'
    },
    {
      title: 'Colecciones',
      value: stats.totalCollections,
      icon: Folder,
      trend: '+3%',
      description: 'categorías disponibles',
      gradient: 'from-emerald-50 to-teal-50',
      iconColor: 'text-emerald-600',
      textColor: 'text-gray-900'
    },
    {
      title: 'Destacados',
      value: stats.featuredShirts,
      icon: Star,
      trend: '+8%',
      description: 'productos promocionados',
      gradient: 'from-amber-50 to-orange-50',
      iconColor: 'text-amber-600',
      textColor: 'text-gray-900'
    },
    {
      title: 'Precio Promedio',
      value: `$${stats.averagePrice.toLocaleString()}`,
      icon: TrendingUp,
      trend: '+5%',
      description: 'precio medio',
      gradient: 'from-purple-50 to-pink-50',
      iconColor: 'text-purple-600',
      textColor: 'text-gray-900'
    }
  ];

  const quickActions = [
    {
      title: 'Nuevo Producto',
      description: 'Agregar camiseta',
      icon: Plus,
      link: '/admin/shirts/new',
      primary: true
    },
    {
      title: 'Nueva Colección',
      description: 'Crear categoría',
      icon: Package,
      link: '/admin/collections/new',
      primary: false
    },
    {
      title: 'Gestionar Productos',
      description: 'Ver inventario',
      icon: Shirt,
      link: '/admin/shirts',
      primary: false
    },
    {
      title: 'Ver Colecciones',
      description: 'Administrar categorías',
      icon: Folder,
      link: '/admin/collections',
      primary: false
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              Dashboard
            </h1>
            <p className="text-gray-500 text-lg">
              Resumen de tu tienda de sublimación
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-600">Sistema activo</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className={`bg-gradient-to-br ${stat.gradient} border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className={`${stat.iconColor} mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className={`text-3xl font-light ${stat.textColor} mb-1`}>{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
                <div className="flex items-center text-green-600 text-xs font-medium">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {stat.trend}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-gray-900">Acciones Rápidas</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                to={action.link}
                className={`group relative p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  action.primary 
                    ? 'border-gray-900 bg-gray-900 text-white hover:bg-gray-800' 
                    : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-start">
                  <div className={`mb-4 ${action.primary ? 'text-white' : 'text-gray-600'}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium mb-1">{action.title}</h3>
                  <p className={`text-sm ${action.primary ? 'text-gray-300' : 'text-gray-500'}`}>
                    {action.description}
                  </p>
                </div>
                <ArrowUpRight 
                  className={`absolute top-6 right-6 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                    action.primary ? 'text-white' : 'text-gray-400'
                  }`} 
                />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Shirts */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium text-gray-900">Productos Recientes</h2>
            <Link 
              to="/admin/shirts" 
              className="text-gray-500 hover:text-gray-900 text-sm font-medium flex items-center group"
            >
              Ver todos
              <ArrowUpRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
          
          {allShirts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-4">No hay productos aún</p>
              <Link 
                to="/admin/shirts/new" 
                className="inline-flex items-center text-gray-900 hover:text-gray-700 font-medium"
              >
                Crear primer producto
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {allShirts.slice(-5).reverse().map((shirt) => (
                <div key={shirt.id} className="group flex items-center p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="relative">
                    <img 
                      src={shirt.images[0]} 
                      alt={shirt.name}
                      className="w-14 h-14 object-cover rounded-xl"
                    />
                    {shirt.featured && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center">
                        <Star className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 ml-4 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{shirt.name}</h3>
                    <p className="text-sm text-gray-500">{shirt.collection}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${shirt.originalPrice.toLocaleString()}</p>
                    <ArrowUpRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Collections Overview */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium text-gray-900">Colecciones Activas</h2>
            <Link 
              to="/admin/collections" 
              className="text-gray-500 hover:text-gray-900 text-sm font-medium flex items-center group"
            >
              Ver todas
              <ArrowUpRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
          
          {collections.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Folder className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-4">No hay colecciones aún</p>
              <Link 
                to="/admin/collections/new" 
                className="inline-flex items-center text-gray-900 hover:text-gray-700 font-medium"
              >
                Crear primera colección
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {collections.map((collection) => {
                const collectionShirtCount = allShirts.filter(
                  shirt => shirt.collection === collection.name
                ).length;
                
                return (
                  <div key={collection.id} className="group flex items-center p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <img 
                      src={collection.image} 
                      alt={collection.name}
                      className="w-14 h-14 object-cover rounded-xl"
                    />
                    <div className="flex-1 ml-4 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{collection.name}</h3>
                      <p className="text-sm text-gray-500 truncate">{collection.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {collectionShirtCount}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
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
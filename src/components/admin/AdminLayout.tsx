import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdminContext } from '../../context/AdminContext';
import { 
  LayoutDashboard, 
  ShirtIcon as Shirt, 
  Folder, 
  LogOut, 
  Settings,
  Home
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { logout, user } = useAdminContext();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    {
      path: '/admin/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
      description: 'Panel principal'
    },
    {
      path: '/admin/shirts',
      icon: Shirt,
      label: 'Camisetas',
      description: 'Gestionar productos'
    },
    {
      path: '/admin/collections',
      icon: Folder,
      label: 'Colecciones',
      description: 'Gestionar categorías'
    },
    {
      path: '/admin/settings',
      icon: Settings,
      label: 'Configuración',
      description: 'Ajustes del sitio'
    }
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:w-64 bg-white shadow-lg flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-xs sm:text-sm text-gray-600">Sublimación</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 sm:p-4 space-y-1 sm:space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center p-2 sm:p-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className={`h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 ${isActive ? 'text-indigo-600' : 'text-gray-500'}`} />
                <div>
                  <div className="font-medium text-sm sm:text-base">{item.label}</div>
                  <div className="text-xs text-gray-500 hidden sm:block">{item.description}</div>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-2 sm:p-4 border-t border-gray-200 space-y-1 sm:space-y-2">
          {/* Back to Site */}
          <Link
            to="/"
            className="flex items-center p-2 sm:p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors w-full"
          >
            <Home className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-gray-500" />
            <span className="font-medium text-sm sm:text-base">Ver Sitio</span>
          </Link>

          {/* User Info & Logout */}
          <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center min-w-0 flex-1">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-indigo-600 font-medium text-xs sm:text-sm">
                  {user?.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-2 min-w-0 flex-1">
                <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">{user?.username}</div>
                <div className="text-xs text-gray-600 hidden sm:block">{user?.role}</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1 text-gray-500 hover:text-red-600 transition-colors flex-shrink-0"
              title="Cerrar sesión"
            >
              <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              {navItems.find(item => isActivePath(item.path))?.label || 'Admin Panel'}
            </h2>
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mobile menu for navigation on small screens */}
              <div className="lg:hidden">
                <select 
                  value={location.pathname}
                  onChange={(e) => navigate(e.target.value)}
                  className="text-sm border border-gray-300 rounded-md px-2 py-1"
                >
                  {navItems.map((item) => (
                    <option key={item.path} value={item.path}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline">
                Bienvenido, {user?.username}
              </span>
              <button
                onClick={handleLogout}
                className="lg:hidden bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
              >
                Salir
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
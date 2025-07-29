import React, { useEffect, useState } from 'react';
import { X, Home, Package, Phone, Ruler, Truck, HelpCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const { isSidebarOpen, setIsSidebarOpen, setIsCollectionSidebarOpen } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300); // Match the duration of the transition
      return () => clearTimeout(timer);
    }
  }, [isSidebarOpen]);

  const menuItems = [
    { icon: Home, label: 'INICIO', path: '/' },
    { icon: Package, label: 'COLECCIONES', path: '/collection', isCollection: true },
    { icon: Phone, label: 'CONTACTO', path: '/contact' },
    { icon: Ruler, label: 'GUÍA DE TALLES', path: '/size-guide' },
    { icon: Truck, label: 'ENVÍOS Y DEVOLUCIONES', path: '/shipping' },
    { icon: HelpCircle, label: '¿CÓMO COMPRAR?', path: '/how-to-buy' }
  ];

  const handleItemClick = (item: any) => {
    if (item.isCollection) {
      setIsCollectionSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  };

  if (!isVisible && !isSidebarOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <X 
            size={24} 
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-pointer" 
            onClick={() => setIsSidebarOpen(false)} 
          />
        </div>

        <nav className="p-4">
          <ul className="space-y-6">
            {menuItems.map((item, index) => (
              <li 
                key={index} 
                className="transition-all duration-300" 
                style={{ 
                  opacity: isSidebarOpen ? 1 : 0,
                  transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-20px)',
                  transitionDelay: `${index * 50}ms`
                }}
              >
                {item.isCollection ? (
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleItemClick(item)}
                      className="w-full text-left text-gray-800 font-medium text-sm cursor-pointer"
                    >
                      {item.label}
                    </button>
                    <span className="text-gray-500 cursor-pointer">→</span>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => handleItemClick(item)}
                    className="block text-gray-800 font-medium text-sm cursor-pointer"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
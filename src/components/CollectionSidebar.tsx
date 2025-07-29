import React, { useEffect, useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { collections } from '../data/collections';

const CollectionSidebar: React.FC = () => {
  const { isCollectionSidebarOpen, setIsCollectionSidebarOpen, setIsSidebarOpen } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isCollectionSidebarOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300); // Match the duration of the transition
      return () => clearTimeout(timer);
    }
  }, [isCollectionSidebarOpen]);

  const handleBackToMain = () => {
    setIsCollectionSidebarOpen(false);
    setIsSidebarOpen(true);
  };

  const handleCollectionClick = () => {
    setIsCollectionSidebarOpen(false);
    setIsSidebarOpen(false);
  };

  if (!isVisible && !isCollectionSidebarOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-60 transition-opacity duration-300 ${
          isCollectionSidebarOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={() => setIsCollectionSidebarOpen(false)}
      />

      {/* Collection Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-60 transition-all duration-300 ease-in-out ${
          isCollectionSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleBackToMain}
              className="rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-semibold text-gray-900">Colecciones</h2>
          </div>

          <X
            size={24}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
            onClick={() => setIsCollectionSidebarOpen(false)}
          />
        </div>

        <nav className="p-4">
          <ul className="">
            <li 
              className="transition-all duration-300" 
              style={{ 
                opacity: isCollectionSidebarOpen ? 1 : 0,
                transform: isCollectionSidebarOpen ? 'translateX(0)' : 'translateX(-20px)',
                transitionDelay: '0ms'
              }}
            >
              <Link
                to="/collection"
                onClick={handleCollectionClick}
                className="block px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100 transition-colors font-medium"
              >
                Ver todo en COLECCIONES
              </Link>
            </li>
            {collections.map((collection, index) => (
              <li 
                key={collection.id}
                className="transition-all duration-300" 
                style={{ 
                  opacity: isCollectionSidebarOpen ? 1 : 0,
                  transform: isCollectionSidebarOpen ? 'translateX(0)' : 'translateX(-20px)',
                  transitionDelay: `${(index + 1) * 50}ms`
                }}
              >
                <Link
                  to={`/collection/${collection.id}`}
                  onClick={handleCollectionClick}
                  className="block px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                >
                  {collection.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default CollectionSidebar; 
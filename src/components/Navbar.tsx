import React, { useState, useEffect, useRef } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { searchTerm, setSearchTerm, setIsSidebarOpen, allShirts, collections } = useAppContext();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<{ type: 'shirt' | 'collection', item: any }[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const announcements = [
    "ENVIOS GRATIS APARTIR DE LOS $100000",
    "5% DESCUENTO EN PAGOS CON TRANSFERENCIA",
    "ENVIOS A TODO EL PAIS"
  ];

  // Generate search suggestions
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const term = searchTerm.toLowerCase();
    const newSuggestions: { type: 'shirt' | 'collection', item: any }[] = [];

    // Add shirt suggestions
    allShirts
      .filter(shirt => 
        shirt.name.toLowerCase().includes(term) ||
        shirt.description.toLowerCase().includes(term) ||
        shirt.tags.some(tag => tag.toLowerCase().includes(term))
      )
      .slice(0, 3)
      .forEach(shirt => {
        newSuggestions.push({ type: 'shirt', item: shirt });
      });

    // Add collection suggestions
    collections
      .filter(collection => 
        collection.name.toLowerCase().includes(term) ||
        collection.description.toLowerCase().includes(term)
      )
      .slice(0, 2)
      .forEach(collection => {
        newSuggestions.push({ type: 'collection', item: collection });
      });

    setSuggestions(newSuggestions);
    setShowSuggestions(newSuggestions.length > 0);
  }, [searchTerm, allShirts, collections]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion: { type: 'shirt' | 'collection', item: any }) => {
    if (suggestion.type === 'shirt') {
      navigate(`/product/${suggestion.item.id}`);
    } else {
      navigate(`/collection/${suggestion.item.id}`);
    }
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate('/collection');
      setShowSuggestions(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowSuggestions(false);
  };

  return (
    <div className="w-full fixed top-0 left-0 right-0 z-50">
      <div className="w-full bg-black">
        {/* Announcement carousel with continuous movement */}
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee-reverse whitespace-nowrap py-1">
            {announcements.map((announcement, index) => (
              <span key={index} className="text-[10.25px] text-white mx-4">
                {announcement}
              </span>
            ))}
            {announcements.map((announcement, index) => (
              <span key={`repeat-${index}`} className="text-[10.25px] text-white mx-4">
                {announcement}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white shadow-md">
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Hamburger Menu */}
              <div className="flex items-center space-x-4 w-48">
                <Menu
                  onClick={() => setIsSidebarOpen(true)}
                  size={24}
                  className="rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
                />
              </div>

              {/* Logo */}
              <div className="flex-shrink-0">
                <Link to="/" className="flex items-center">
                  <img
                    src="https://acdn-us.mitiendanube.com/stores/003/856/863/themes/common/logo-339415911-1738341627-c0b8a891d660d5e30b99eb3cdec64b5f1738341627-480-0.webp"
                    alt="Driven Logo"
                    className="h-16 w-auto my-4"
                  />
                </Link>
              </div>

              {/* Search Bar - Now visible on all devices */}
              <div className="w-fit">
                <div className="relative" ref={searchRef}>
                  <form onSubmit={handleSearchSubmit}>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => searchTerm.trim() && suggestions.length > 0 && setShowSuggestions(true)}
                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 text-sm"
                        style={{ width: '230px' }}
                      />
                      {searchTerm && (
                        <button
                          type="button"
                          onClick={clearSearch}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                        </button>
                      )}
                    </div>
                  </form>

                  {/* Search Suggestions Dropdown */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-64 overflow-y-auto" style={{ width: '230px' }}>
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={`${suggestion.type}-${suggestion.item.id}-${index}`}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-3"
                        >
                          {suggestion.type === 'shirt' ? (
                            <>
                              <img 
                                src={suggestion.item.images[0]} 
                                alt={suggestion.item.name}
                                className="w-8 h-8 object-cover rounded"
                              />
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {suggestion.item.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  ${suggestion.item.originalPrice.toLocaleString()}
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                                <Search className="w-4 h-4 text-gray-400" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {suggestion.item.name}
                                </div>
                                <div className="text-xs text-gray-500">Colección</div>
                              </div>
                            </>
                          )}
                        </button>
                      ))}
                      {searchTerm.trim() && (
                        <button
                          onClick={handleSearchSubmit}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 border-t border-gray-200"
                        >
                          <div className="text-sm text-gray-600">
                            Buscar "{searchTerm}" en todos los productos
                          </div>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
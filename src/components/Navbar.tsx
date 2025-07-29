import React from 'react';
import { Menu, Search } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { searchTerm, setSearchTerm, setIsSidebarOpen } = useAppContext();

  const announcements = [
    "ENVIOS GRATIS APARTIR DE LOS $100000",
    "5% DESCUENTO EN PAGOS CON TRANSFERENCIA",
    "ENVIOS A TODO EL PAIS"
  ];

  return (
    <nav className="w-full fixed top-0 left-0 right-0 z-50">
      <div className="w-full bg-black overflow-hidden">
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

              {/* Search Bar */}
              <div className="w-fit hidden md:block">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-48 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
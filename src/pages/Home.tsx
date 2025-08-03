import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useSettings } from '../hooks/useSettings';
import ShirtCard from '../components/ShirtCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { FaTruckFast } from 'react-icons/fa6';
import { IoShieldCheckmark } from 'react-icons/io5';
import { IoMdChatboxes } from 'react-icons/io';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Home: React.FC = () => {
  const { allShirts, collections, isLoading, error, refreshData } = useAppContext();
  const { settings } = useSettings();
  const recentShirts = allShirts.slice(-10).reverse(); // Últimos 10 productos agregados
  const featuredShirts = allShirts.filter(shirt => shirt.featured).slice(0, 6);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" message="Cargando página principal..." />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorMessage message={error} onRetry={refreshData} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        className="text-white py-10 sm:py-16 md:py-20 bg-cover bg-center bg-no-repeat min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:h-screen w-full flex justify-center items-center overflow-hidden" 
        style={{ 
          backgroundImage: "url('https://acdn-us.mitiendanube.com/stores/003/856/863/themes/rio/2-slide-1745253666447-4242535366-1f408de47a2feed5497e96cc5200af471745253672-1920-1920.webp?795276416')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}
      >
        <Link
          to="/collection"
          className="inline-block border-2 border-white text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-lg transition-all duration-300 hover:bg-white hover:text-black text-sm sm:text-base"
        >
          Ver Todo
        </Link>
      </section>

      {/* Featured Products - Carousel */}
      <section className="py-16">
        <div className="mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 uppercase">
              Destacados
            </h2>
          </div>

          <div className="relative px-2 sm:px-4 md:px-8">
            <button 
              onClick={scrollLeft} 
              className="hidden sm:block absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Anterior"
            >
              <FaChevronLeft size={16} className="sm:w-5 sm:h-5" />
            </button>
            
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory gap-2 sm:gap-4 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {featuredShirts.map((shirt) => (
                <div key={shirt.id} className="flex-none snap-start w-40 sm:w-48 md:w-60 lg:w-72">
                  <ShirtCard shirt={shirt} featured />
                </div>
              ))}
            </div>
            
            <button 
              onClick={scrollRight} 
              className="hidden sm:block absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Siguiente"
            >
              <FaChevronRight size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Recent Products */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 uppercase">
              Recién Agregados
            </h2>
          </div>

          {recentShirts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4 md:gap-6">
              {recentShirts.map((shirt) => (
                <ShirtCard key={shirt.id} shirt={shirt} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No hay productos nuevos disponibles.</p>
            </div>
          )}
        </div>
      </section>

      {/* Collections Preview */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestras Colecciones
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Explora nuestras diferentes líneas temáticas
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                to={`/collection/${collection.id}`}
                className="group relative block bg-gray-900 rounded-lg overflow-hidden hover:scale-[1.02] sm:hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="text-center text-white">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">{collection.name}</h3>
                    <p className="text-xs sm:text-sm opacity-90 line-clamp-2">{collection.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping and Services Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="flex flex-col items-center p-4 sm:p-6">
              <div className="mb-3 sm:mb-4 text-gray-700">
                <FaTruckFast size={50} className="sm:w-16 sm:h-16 md:w-[70px] md:h-[70px]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold uppercase mb-2">ENVÍOS A TODO EL PAÍS</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Envíos gratis a partir de los $100.000
              </p>
            </div>
            
            <div className="flex flex-col items-center p-4 sm:p-6">
              <div className="mb-3 sm:mb-4 text-gray-700">
                <IoShieldCheckmark size={50} className="sm:w-16 sm:h-16 md:w-[70px] md:h-[70px]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold uppercase mb-2">COMPRA 100% SEGURA</h3>
              <p className="text-sm sm:text-base text-gray-600">Tus datos totalmente protegidos</p>
            </div>
            
            <div className="flex flex-col items-center p-4 sm:p-6">
              <div className="mb-3 sm:mb-4 text-gray-700">
                <IoMdChatboxes size={50} className="sm:w-16 sm:h-16 md:w-[70px] md:h-[70px]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold uppercase mb-2">ESTAMOS PARA AYUDARTE</h3>
              <p className="text-sm sm:text-base text-gray-600">Asistencia ante cualquier duda</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 
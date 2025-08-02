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
        className="text-white py-20 bg-cover bg-center bg-no-repeat h-screen w-screen flex justify-center items-center max-w-[98.9vw] mx-auto overflow-hidden" 
        style={{ 
          backgroundImage: "url('https://acdn-us.mitiendanube.com/stores/003/856/863/themes/rio/2-slide-1745253666447-4242535366-1f408de47a2feed5497e96cc5200af471745253672-1920-1920.webp?795276416')",
          backgroundSize: 'cover',
          position: 'relative'
        }}
      >
        <Link
          to="/collection"
          className="inline-block border border-white text-white font-semibold py-1 px-4 rounded-lg transition-colors"
        >
          Ver Todo
        </Link>
      </section>

      {/* Featured Products - Carousel */}
      <section className="py-16">
        <div className="mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-2xl font-bold text-gray-900 mb-4 uppercase">
              Novedades
            </h2>
          </div>

          <div className="relative px-4 md:px-8">
            <button 
              onClick={scrollLeft} 
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              aria-label="Anterior"
            >
              <FaChevronLeft size={20} />
            </button>
            
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory gap-4 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {featuredShirts.map((shirt) => (
                <div key={shirt.id} className="flex-none snap-start w-60 md:w-72">
                  <ShirtCard shirt={shirt} featured />
                </div>
              ))}
            </div>
            
            <button 
              onClick={scrollRight} 
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              aria-label="Siguiente"
            >
              <FaChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-2xl font-bold text-gray-900 mb-4 uppercase">
              Destacados
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {featuredShirts.map((shirt) => (
              <ShirtCard key={shirt.id} shirt={shirt} featured />
            ))}
          </div>
        </div>
      </section>

      {/* Collections Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestras Colecciones
            </h2>
            <p className="text-xl text-gray-600">
              Explora nuestras diferentes líneas temáticas
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                to={`/collection/${collection.id}`}
                className="group relative block bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-64 object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">{collection.name}</h3>
                    <p className="text-sm opacity-90">{collection.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping and Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <FaTruckFast size={70} />
              </div>
              <h3 className="text-xl font-bold uppercase mb-2">ENVÍOS A TODO EL PAÍS</h3>
              <p className="text-gray-600">
                {settings?.shipping.freeShippingMessage || "Envíos gratis a partir de los $100.000"}
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <IoShieldCheckmark size={70} />
              </div>
              <h3 className="text-xl font-bold uppercase mb-2">COMPRA 100% SEGURA</h3>
              <p className="text-gray-600">Tus datos totalmente protegidos</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <IoMdChatboxes size={70} />
              </div>
              <h3 className="text-xl font-bold uppercase mb-2">ESTAMOS PARA AYUDARTE</h3>
              <p className="text-gray-600">Asistencia ante cualquier duda</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 
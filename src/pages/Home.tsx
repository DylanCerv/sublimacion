import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ShirtCard from '../components/ShirtCard';
import { collections } from '../data/collections';

const Home: React.FC = () => {
  const { allShirts } = useAppContext();
  const featuredShirts = allShirts.filter(shirt => shirt.featured).slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Sublimación de Calidad
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Diseños únicos inspirados en el mundo automotriz
          </p>
          <Link
            to="/products"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
          >
            Ver Todo el Catálogo
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Productos Destacados
            </h2>
            <p className="text-xl text-gray-600">
              Nuestras camisas más populares y exclusivas
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredShirts.map((shirt) => (
              <ShirtCard key={shirt.id} shirt={shirt} featured />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/products"
              className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
            >
              Ver Todas las Camisas
            </Link>
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
            {collections.slice(0, 6).map((collection) => (
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
    </div>
  );
};

export default Home; 
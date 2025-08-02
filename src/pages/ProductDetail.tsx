import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useShirt } from '../hooks/useFirebase';
import ShirtCard from '../components/ShirtCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Minus, Plus, X } from 'lucide-react';
import { CiDeliveryTruck } from 'react-icons/ci';
import { RxRulerHorizontal } from 'react-icons/rx';
import { FaWhatsapp } from 'react-icons/fa';

// Static size guide images - these don't change often so keeping them here is OK
const talles = [
  "https://d2r9epyceweg5n.cloudfront.net/stores/003/856/863/rte/Guia%20de%20talles.png",
  "https://d2r9epyceweg5n.cloudfront.net/stores/003/856/863/rte/Guia%20de%20talles.png",
];

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { allShirts } = useAppContext();
  const { shirt: firebaseShirt, isLoading: shirtLoading, error: shirtError } = useShirt(id || '');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [currentSizeGuideIndex, setCurrentSizeGuideIndex] = useState(0);

  // Use Firebase shirt if available, fallback to context shirt
  const shirt = firebaseShirt || allShirts.find(s => s.id === id);
  
  // Auto rotate main image
  useEffect(() => {
    if (!shirt || shirt.images.length <= 1) return;
    
    const interval = setInterval(() => {
      setSelectedImageIndex(prevIndex => 
        prevIndex === shirt.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [shirt]);

  // Auto rotate size guide images
  useEffect(() => {
    if (!showSizeGuide) return;
    
    const interval = setInterval(() => {
      setCurrentSizeGuideIndex(prevIndex => 
        prevIndex === talles.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, [showSizeGuide]);
  
  // Show loading state for shirt data
  if (shirtLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" message="Cargando producto..." />
      </div>
    );
  }

  // Show error state for shirt data
  if (shirtError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorMessage 
          message={shirtError} 
          onRetry={() => window.location.reload()} 
        />
      </div>
    );
  }

  if (!shirt) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h1>
          <p className="text-gray-600">Lo sentimos, el producto que buscas no existe.</p>
        </div>
      </div>
    );
  }

  // Get recommendations (same collection or similar tags)
  const recommendations = allShirts
    .filter(s => s.id !== shirt.id && (
      s.collection === shirt.collection || 
      s.tags.some(tag => shirt.tags.includes(tag))
    ));

  const getPorcentage = (porcentaje: number) => {
    return porcentaje / 100;
  };

  const getDiscountedPrice = (price: number) => {
    return price * (1 - getPorcentage(shirt.discountPercentage));
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = '5491112345678';
    const message = `Hola! Me interesa la camisa "${shirt.name}" - $ ${getDiscountedPrice(shirt.originalPrice)}. ¿Podrían darme más información?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="bg-white pt-8">
      {showSizeGuide && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto relative">
            <button 
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </button>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Guía de Talles</h3>
              <div className="flex justify-center">
                <img 
                  src={talles[currentSizeGuideIndex]} 
                  alt="Guía de talles" 
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="md:flex justify-between gap-8">
          {/* Left side - Images */}
          <div className="flex flex-col md:flex-row-reverse gap-4">
            <div className="flex-1">
              <img
                src={shirt.images[selectedImageIndex]}
                alt={shirt.name}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="flex flex-row md:flex-col gap-4 overflow-x-auto w-full md:w-28">
              {shirt.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${shirt.name} view ${index + 1}`}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-28 h-28 object-cover cursor-pointer ${selectedImageIndex === index ? 'border-2 border-black/50' : ''}`}
                />
              ))}
            </div>
          </div>

          {/* Right side - Product Info */}
          <div className="md:max-w-md w-md">
            <div className="mb-4 space-y-4 border-b pb-4 border-gray-200">
              <h1 className="text-2xl font-bold">{shirt.name}</h1>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {shirt.originalPrice && (
                    <p className="text-gray-500 line-through text-sm">
                      ${shirt.originalPrice.toLocaleString()}
                    </p>
                  )}
                  <p className="text-sm font-medium">${getDiscountedPrice(shirt.originalPrice).toLocaleString()}</p>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm">
                    {shirt.coutes} cuotas de ${((getDiscountedPrice(shirt.originalPrice) * (1 + getPorcentage(shirt.porcentajeWithCoutes))) / shirt.coutes).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-4 flex items-center gap-2">
              <CiDeliveryTruck />
              <p className="text-gray-500 text-xs">Envío gratis superando los ${shirt.freeShippingThreshold.toLocaleString()}</p>
            </div>

            {/* Size Selection */}
            <div className="mb-6 flex items-center gap-2">
              <p className="font-medium">Talle:</p>
              <div className="flex flex-wrap gap-2">
                {shirt.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-6 h-6 text-xs flex items-center justify-center border cursor-pointer ${
                      selectedSize === size
                        ? 'border-black/20 bg-black/20 text-black'
                        : 'border-gray-300 hover:border-black/30'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6 flex items-center gap-2">
              <button 
                onClick={() => setShowSizeGuide(true)}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <RxRulerHorizontal size={16} className="text-gray-500" />
                <p className="text-gray-500 text-xs">Guía de talles</p>
              </button>
            </div>

            {/* Quantity */}
            <div className="mb-6 flex items-center gap-2">
              <div className="flex items-center border border-gray-300 rounded-sm">
                <button 
                  onClick={decrementQuantity}
                  className="px-3 py-1.5 cursor-pointer"
                >
                  <Minus size={10} />
                </button>
                <span className="px-4 py-1.5 text-sm">{quantity}</span>
                <button 
                  onClick={incrementQuantity}
                  className="px-3 py-1.5 cursor-pointer"
                >
                  <Plus size={10} />
                </button>
              </div>

              {/* WhatsApp Contact */}
              <button
                onClick={handleWhatsAppContact}
                className="flex items-center justify-center space-x-2 w-full bg-green-600 border border-green-600 text-white py-1.5 hover:bg-green-700 transition-colors cursor-pointer text-sm rounded-sm"
              >
                <FaWhatsapp size={18} />
                <span>Consultar por WhatsApp</span>
              </button>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Descripción</h3>
              <p className="text-gray-600 text-sm">{shirt.description}</p>
            </div>
          </div>
        </div>

        {/* Product Thumbnails - Carousel */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-center mb-8">Productos relacionados</h2>
          <div className="relative overflow-hidden">
            <div className="flex overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth">
              {recommendations.map((recommendedShirt, index) => (
                <div key={`${recommendedShirt.id}-${index}`} className="min-w-[250px] flex-shrink-0 px-2 snap-start">
                  <ShirtCard shirt={recommendedShirt} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
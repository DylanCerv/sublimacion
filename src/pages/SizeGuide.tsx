import React, { useState } from 'react';
import { X } from 'lucide-react';
import { talles } from '../data/talles';

const SizeGuide: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto rotate size guide images
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => 
        prevIndex === talles.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-8">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Guía de Talles</h1>
          <div className="flex justify-center">
            <img 
              src={talles[currentImageIndex]} 
              alt="Guía de talles" 
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;
import React, { useState } from 'react';
import { X } from 'lucide-react';

// Static size guide images - these don't change often so keeping them here is OK
const talles = [
  "https://d2r9epyceweg5n.cloudfront.net/stores/003/856/863/rte/Guia%20de%20talles.png",
  "https://d2r9epyceweg5n.cloudfront.net/stores/003/856/863/rte/Guia%20de%20talles.png",
];

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
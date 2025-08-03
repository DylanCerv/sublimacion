import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Shirt } from '../types';

interface ShirtCardProps {
  shirt: Shirt;
  featured?: boolean;
}

const ShirtCard: React.FC<ShirtCardProps> = ({ shirt, featured = false }) => {
  const [imageIndex, setImageIndex] = useState(0);
  
  const getDiscountedPrice = (price: number, discountPercentage: number) => {
    return price * (1 - discountPercentage / 100);
  };

  return (
    <Link
      to={`/product/${shirt.id}`}
      className="group block bg-white overflow-hidden w-full"
    >
      <div 
        className="relative aspect-square overflow-hidden"
        onMouseEnter={() => shirt.images.length > 1 && setImageIndex(1)}
        onMouseLeave={() => setImageIndex(0)}
      >
        <img
          src={shirt.images[imageIndex]}
          alt={shirt.name}
          className="w-full h-full object-cover"
        />
        {shirt.discountPercentage > 0 && (
          <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 bg-white text-black rounded-md px-1.5 sm:px-2 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-medium">
            {shirt.discountPercentage}% OFF
          </div>
        )}
      </div>
      
      <div className="p-2 sm:p-3">
        <h3 className="font-medium text-xs sm:text-sm text-gray-900 line-clamp-2 mb-1">
          {shirt.name}
        </h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          {shirt.originalPrice && (
            <span className="text-gray-500 line-through text-[10px] sm:text-xs">
              ${shirt.originalPrice.toLocaleString()}
            </span>
          )}
          <span className="font-bold text-xs sm:text-sm text-gray-900">
            ${getDiscountedPrice(shirt.originalPrice, shirt.discountPercentage).toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ShirtCard; 
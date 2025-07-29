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
      className="group block bg-white overflow-hidden"
    >
      <div 
        className="relative aspect-square overflow-hidden"
        onMouseEnter={() => shirt.images.length > 1 && setImageIndex(1)}
        onMouseLeave={() => setImageIndex(0)}
      >
        <img
          src={shirt.images[imageIndex]}
          alt={shirt.name}
          className="max-w-60 w-full h-full object-cover"
        />
        {shirt.discountPercentage > 0 && (
          <div className="absolute bottom-2 left-2 bg-white text-black rounded-md px-2 py-1 text-[10px]">
            {shirt.discountPercentage}% OFF
          </div>
        )}
      </div>
      
      <div className="p-2">
        <h3 className="font-medium text-sm text-gray-900">
          {shirt.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          {shirt.originalPrice && (
            <span className="text-gray-500 line-through text-xs">
              ${shirt.originalPrice.toLocaleString()}
            </span>
          )}
          <span className="font-bold text-xs">
            ${getDiscountedPrice(shirt.originalPrice, shirt.discountPercentage).toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ShirtCard; 
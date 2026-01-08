import React from 'react';
import { Product } from '../types';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group cursor-pointer tap-highlight-transparent flex flex-col gap-2.5">
      {/* Image Container - Sharpened to rounded-md (6px) for a premium feel */}
      <div className="relative aspect-square overflow-hidden rounded-md bg-gray-100 border border-black/[0.03] active:scale-[0.98] transition-transform duration-200">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Overlay Badges */}
        {(product.tag || product.condition === 'New') && (
          <div className="absolute bottom-2 left-2 flex gap-1 pointer-events-none">
             {product.tag && (
                <span className="bg-white/95 backdrop-blur-md text-gray-900 text-[10px] font-bold px-1.5 py-0.5 rounded-sm shadow-sm border border-black/5 leading-none flex items-center">
                  {product.tag}
                </span>
             )}
          </div>
        )}
        
        {/* Favorite Button */}
        <button className="absolute top-2 right-2 p-2 bg-white/60 backdrop-blur-md rounded-full border border-white/40 hover:bg-white active:scale-90 transition-all">
          <Heart 
            className={`w-4 h-4 transition-colors ${product.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} 
            strokeWidth={2} 
          />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-1">
        <div className="flex justify-between items-baseline">
           <p className="text-[15px] font-bold text-gray-900 tracking-tight leading-none">
             {product.price.toLocaleString('bg-BG')} {product.currency}
           </p>
        </div>

        <h3 className="text-[13px] font-medium text-gray-800 truncate leading-snug">
          {product.title}
        </h3>
        
        <p className="text-[11px] text-gray-400 truncate flex items-center gap-1.5 font-medium">
            {product.location} <span className="w-0.5 h-0.5 bg-gray-300 rounded-full"></span> {product.postedAt}
        </p>
      </div>
    </div>
  );
};
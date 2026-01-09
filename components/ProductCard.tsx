import React from 'react';
import { Product } from '../types';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer tap-highlight-transparent flex flex-col gap-3"
    >
      {/* Image Container - No Scale Animation */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 transition-opacity active:opacity-95 duration-200">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {(product.tag || product.condition === 'New') && (
          <div className="absolute bottom-2 left-2 flex gap-1 pointer-events-none">
             {product.tag && (
                <span className="bg-white/95 backdrop-blur-md text-gray-900 text-[10px] font-bold px-2 py-1 rounded shadow-sm leading-none flex items-center tracking-wide uppercase">
                  {product.tag}
                </span>
             )}
          </div>
        )}
        
        <button 
          className="absolute top-2 right-2 p-2 bg-white/70 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-all"
          onClick={(e) => {
            e.stopPropagation();
            // handle favorite logic here
          }}
        >
          <Heart 
            className={`w-[18px] h-[18px] transition-colors ${product.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-900'}`} 
            strokeWidth={1.5} 
          />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-1 px-0.5">
        <div className="flex justify-between items-start gap-2">
           <h3 className="text-[14px] font-normal text-gray-700 leading-snug line-clamp-2 min-h-[2.5em]">
             {product.title}
           </h3>
        </div>

        <div className="flex items-baseline justify-between pt-1">
           <p className="text-[16px] font-extrabold text-gray-900 tracking-tight leading-none">
             {product.price}<span className="text-[14px] font-bold ml-0.5">{product.currency}</span>
           </p>
        </div>
        
        <p className="text-[11px] text-gray-400 truncate flex items-center gap-1.5 font-medium pt-0.5">
            {product.location} • {product.postedAt}
        </p>
      </div>
    </div>
  );
};
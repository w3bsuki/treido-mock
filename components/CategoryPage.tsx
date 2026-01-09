import React, { useState } from 'react';
import { ArrowLeft, Search, SlidersHorizontal, ChevronDown, ShoppingBag, ArrowUpDown } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { FilterModal } from './FilterModal';
import { SUB_CATEGORIES, PRODUCTS } from '../constants';
import { Product } from '../types';

interface CategoryPageProps {
  categoryName: string;
  onBack: () => void;
  onProductSelect: (product: Product) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categoryName, onBack, onProductSelect }) => {
  const [activeSub, setActiveSub] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="bg-white min-h-screen pb-24 font-sans relative">
      <FilterModal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        onApply={() => setIsFilterOpen(false)} 
      />

      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        
        <div className="pt-safe-top">
          <div className="flex items-center justify-between px-2 h-[52px]">
            <div className="flex items-center">
              <button 
                onClick={onBack}
                className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors text-gray-900"
              >
                <ArrowLeft className="w-[24px] h-[24px] stroke-[1.5]" />
              </button>
              <h1 className="text-[17px] font-bold text-gray-900 ml-1 leading-none transform translate-y-[0.5px]">
                {categoryName}
              </h1>
            </div>
            
            <div className="flex items-center">
              <button className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors text-gray-900">
                 <Search className="w-[24px] h-[24px] stroke-[1.5]" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors text-gray-900 relative">
                 <ShoppingBag className="w-[24px] h-[24px] stroke-[1.5]" />
                 <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600 border border-white"></span>
                 </span>
              </button>
            </div>
          </div>
        </div>

        {/* Sub-Categories */}
        <div className="pb-3 pt-1">
           <div className="flex overflow-x-auto no-scrollbar px-4 gap-2">
             {SUB_CATEGORIES.map((sub) => {
               const isActive = activeSub === sub.id;
               return (
                 <button
                   key={sub.id}
                   onClick={() => setActiveSub(sub.id)}
                   className={`
                     whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-medium transition-all border
                     ${isActive 
                       ? 'bg-gray-900 text-white border-gray-900' 
                       : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 active:bg-gray-50'}
                   `}
                 >
                   {sub.name}
                 </button>
               );
             })}
           </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center border-t border-gray-200 h-[48px] px-4 bg-white gap-3 overflow-x-auto no-scrollbar">
           <button 
             onClick={() => setIsFilterOpen(true)}
             className="flex-shrink-0 flex items-center gap-2 text-[13px] font-bold text-gray-900 active:opacity-60"
           >
             <SlidersHorizontal className="w-4 h-4 stroke-[2]" />
             <span>Филтри</span>
           </button>

           <div className="h-5 w-[1px] bg-gray-300 flex-shrink-0"></div>

           <div className="flex items-center gap-4 flex-shrink-0">
             <button onClick={() => setIsFilterOpen(true)} className="flex items-center gap-1 text-[13px] font-medium text-gray-700 active:text-gray-900">
               Цена <ChevronDown className="w-3.5 h-3.5 stroke-[2] text-gray-400" />
             </button>
             <button onClick={() => setIsFilterOpen(true)} className="flex items-center gap-1 text-[13px] font-medium text-gray-700 active:text-gray-900">
               Състояние <ChevronDown className="w-3.5 h-3.5 stroke-[2] text-gray-400" />
             </button>
           </div>
           
           <div className="flex-1 min-w-[20px]"></div>

           <button 
             onClick={() => setIsFilterOpen(true)}
             className="flex-shrink-0 flex items-center gap-1.5 text-[13px] font-medium text-gray-700 active:text-gray-900"
           >
              <ArrowUpDown className="w-3.5 h-3.5 stroke-[2]" />
              <span className="hidden sm:inline">Сортирай</span>
           </button>
        </div>
      </div>

      {/* Grid */}
      <div className="px-3 pt-3">
         <div className="grid grid-cols-2 gap-x-3 gap-y-6">
            {[...PRODUCTS, ...PRODUCTS].map((product, idx) => (
               <ProductCard 
                  key={`${product.id}-${idx}`} 
                  product={product} 
                  onClick={() => onProductSelect(product)}
               />
            ))}
         </div>
         
         <div className="py-12 flex flex-col items-center justify-center gap-2 text-center opacity-60">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            <p className="text-[12px] text-gray-400 font-medium tracking-wide uppercase">Край на резултатите</p>
         </div>
      </div>
    </div>
  );
};
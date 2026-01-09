import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp, ArrowRight, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface SearchPageProps {
  onProductSelect: (product: Product) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ onProductSelect }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState(['iPhone 13', 'Nike', 'PS5']);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Filter products based on query
  const filteredProducts = query.length > 0 
    ? PRODUCTS.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) 
    : [];

  const handleClear = () => {
    setQuery('');
    if (inputRef.current) inputRef.current.focus();
  };

  const handleRecentClick = (term: string) => {
    setQuery(term);
  };

  const removeRecent = (term: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches(recentSearches.filter(t => t !== term));
  };

  return (
    <div className="min-h-screen bg-white pb-[80px]">
      {/* 1. Search Header - Sticky & Clean */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="pt-safe-top px-4 pb-3">
          <div className="h-[52px] flex items-center gap-3">
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`w-4.5 h-4.5 transition-colors ${isFocused ? 'text-gray-900' : 'text-gray-400'}`} />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="block w-full h-[46px] pl-10 pr-10 bg-gray-100 border-transparent focus:bg-white focus:border-gray-900 focus:ring-0 rounded-xl text-[16px] text-gray-900 placeholder-gray-400 transition-all font-medium outline-none border-2"
                placeholder="Търси марки, продукти..."
              />
              {query && (
                <button 
                  onClick={handleClear}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 active:text-gray-900"
                >
                  <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
                    <X className="w-3 h-3 stroke-[3] text-gray-600" />
                  </div>
                </button>
              )}
            </div>
          </div>
          
          {/* Filter Bar (Only shown when searching) */}
          {query.length > 0 && (
             <div className="flex items-center gap-2 mt-1 overflow-x-auto no-scrollbar pb-1">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white rounded-lg text-[13px] font-bold whitespace-nowrap">
                   <SlidersHorizontal className="w-3.5 h-3.5" />
                   Филтри
                </button>
                <div className="w-[1px] h-5 bg-gray-200 mx-1"></div>
                <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-700 bg-white whitespace-nowrap">Цена</button>
                <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-700 bg-white whitespace-nowrap">Състояние</button>
                <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-700 bg-white whitespace-nowrap">Локация</button>
             </div>
          )}
        </div>
      </div>

      {/* 2. Content Area */}
      <div className="pt-2">
        {query.length === 0 ? (
          // Zero State
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="mb-6">
                <div className="px-5 mb-2 flex items-center justify-between">
                  <h3 className="text-[13px] font-bold text-gray-900 uppercase tracking-wide">Скорошни</h3>
                  <button onClick={() => setRecentSearches([])} className="text-[12px] font-medium text-gray-400 hover:text-gray-900">Изчисти</button>
                </div>
                <div>
                  {recentSearches.map((term) => (
                    <div 
                      key={term}
                      onClick={() => handleRecentClick(term)}
                      className="flex items-center justify-between px-5 py-3.5 active:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50 last:border-0"
                    >
                      <div className="flex items-center gap-3.5">
                        <Clock className="w-4.5 h-4.5 text-gray-400 stroke-[2]" />
                        <span className="text-[15px] font-medium text-gray-900">{term}</span>
                      </div>
                      <button 
                        onClick={(e) => removeRecent(term, e)}
                        className="p-2 -mr-2 text-gray-300 active:text-gray-900"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trending */}
            <div className="mb-8 px-5">
               <h3 className="text-[13px] font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                 <TrendingUp className="w-4 h-4 stroke-[2.5]" />
                 Популярни сега
               </h3>
               <div className="flex flex-wrap gap-2">
                 {['Зимни якета', 'iPhone 15', 'BMW E46', 'Ски обувки', 'PlayStation 5'].map(tag => (
                   <button 
                     key={tag}
                     onClick={() => setQuery(tag)}
                     className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-700 active:bg-gray-200 active:border-gray-300 transition-all"
                   >
                     {tag}
                   </button>
                 ))}
               </div>
            </div>

            {/* Discover Categories */}
            <div className="px-5">
               <h3 className="text-[13px] font-bold text-gray-900 uppercase tracking-wide mb-3">Разгледай</h3>
               <div className="grid grid-cols-2 gap-3">
                 {CATEGORIES.slice(1, 5).map(cat => (
                   <button key={cat.id} className="h-[80px] bg-gray-50 rounded-xl border border-gray-100 p-4 flex flex-col justify-between items-start active:scale-[0.98] transition-transform">
                      <span className="font-bold text-gray-900">{cat.name}</span>
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-gray-200">
                        <ArrowRight className="w-3 h-3 text-gray-900" />
                      </div>
                   </button>
                 ))}
               </div>
            </div>

          </div>
        ) : (
          // Results State
          <div className="px-4 animate-in fade-in duration-300">
            {filteredProducts.length > 0 ? (
              <>
                 <div className="flex items-center justify-between mb-4 mt-2">
                    <p className="text-[13px] font-medium text-gray-500">
                      Намерени {filteredProducts.length} резултата
                    </p>
                 </div>
                 <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                    {filteredProducts.map(product => (
                       <ProductCard 
                          key={product.id} 
                          product={product} 
                          onClick={() => onProductSelect(product)}
                       />
                    ))}
                 </div>
                 
                 {/* Search suggestions at bottom */}
                 <div className="mt-8 pt-6 border-t border-gray-100">
                    <h4 className="text-[12px] font-bold text-gray-400 uppercase mb-2">Свързани търсения</h4>
                    <div className="space-y-3">
                       <div className="flex items-center gap-2 text-gray-600 font-medium text-[14px]">
                          <Search className="w-3.5 h-3.5" />
                          {query} <span className="text-gray-400">в Мода</span>
                       </div>
                       <div className="flex items-center gap-2 text-gray-600 font-medium text-[14px]">
                          <Search className="w-3.5 h-3.5" />
                          {query} <span className="text-gray-400">в Техника</span>
                       </div>
                    </div>
                 </div>
              </>
            ) : (
              // Empty Search State
              <div className="flex flex-col items-center justify-center py-20 text-center">
                 <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-gray-300" />
                 </div>
                 <h3 className="text-[16px] font-bold text-gray-900 mb-1">Няма намерени резултати</h3>
                 <p className="text-[14px] text-gray-500 max-w-[200px] leading-relaxed">
                    Опитайте с други ключови думи или проверете правописа.
                 </p>
                 <button 
                   onClick={handleClear}
                   className="mt-6 px-6 py-2.5 bg-gray-900 text-white rounded-lg font-bold text-[14px] shadow-lg shadow-gray-200/50 active:scale-95 transition-transform"
                 >
                    Изчисти търсенето
                 </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
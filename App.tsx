import React, { useState } from 'react';
import { Header } from './components/Header';
import { CategoryStrip } from './components/CategoryStrip';
import { PromoBanner } from './components/PromoBanner';
import { FilterStrip } from './components/FilterStrip';
import { ProductCard } from './components/ProductCard';
import { BottomNav } from './components/BottomNav';
import { CategoryPage } from './components/CategoryPage';
import { ProductPage } from './components/ProductPage';
import { FilterModal } from './components/FilterModal';
import { SellPage } from './components/SellPage';
import { PRODUCTS } from './constants';
import { Product } from './types';

type ViewState = 'HOME' | 'CATEGORY' | 'PRODUCT' | 'SELL';

function App() {
  const [view, setView] = useState<ViewState>('HOME');
  const [selectedCategory, setSelectedCategory] = useState<{id: string, name: string} | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Filter state for Home
  const [isHomeFilterOpen, setIsHomeFilterOpen] = useState(false);

  // Router Handlers
  const handleCategorySelect = (id: string, name: string) => {
    setSelectedCategory({ id, name });
    setView('CATEGORY');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setView('PRODUCT');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToHome = () => {
    setView('HOME');
    setSelectedCategory(null);
    setSelectedProduct(null);
  };

  const handleBackToCategory = () => {
    if (selectedCategory) {
      setView('CATEGORY');
    } else {
      setView('HOME');
    }
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#F2F4F7] flex justify-center font-sans antialiased">
      {/* Mobile Wrapper */}
      <div className="w-full max-w-[430px] bg-white min-h-screen relative shadow-[0_0_50px_rgba(0,0,0,0.04)] pb-safe">
        
        {view === 'HOME' && (
          <>
            <FilterModal 
               isOpen={isHomeFilterOpen} 
               onClose={() => setIsHomeFilterOpen(false)} 
               onApply={() => setIsHomeFilterOpen(false)} 
            />
            
            {/* Unified Sticky Header Container */}
            <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100/80 supports-[backdrop-filter]:bg-white/80">
              <Header />
              <CategoryStrip onSelect={handleCategorySelect} />
            </div>

            <main className="w-full pb-24">
              <div className="flex flex-col gap-4">
                <PromoBanner />
                <FilterStrip onFilterClick={() => setIsHomeFilterOpen(true)} />
              </div>

              {/* Product Grid */}
              <div className="px-4 mt-4">
                <div className="flex items-end justify-between mb-4 px-1">
                   <h2 className="text-[18px] font-bold text-gray-900 tracking-tight leading-none">Свежи обяви</h2>
                   <button className="text-[12px] font-medium text-gray-500 hover:text-gray-900 transition-colors">Виж всички</button>
                </div>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                  {PRODUCTS.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onClick={() => handleProductSelect(product)}
                    />
                  ))}
                </div>
              </div>
            </main>
          </>
        )}

        {view === 'CATEGORY' && selectedCategory && (
          <CategoryPage 
            categoryName={selectedCategory.name} 
            onBack={handleBackToHome}
            onProductSelect={handleProductSelect}
          />
        )}

        {view === 'PRODUCT' && selectedProduct && (
          <ProductPage 
            product={selectedProduct} 
            onBack={handleBackToCategory} 
          />
        )}

        {view === 'SELL' && (
          <SellPage onClose={handleBackToHome} />
        )}

        {/* Bottom Nav stays persistent only on Home/Category. Hidden on Product/Sell Page. */}
        {view !== 'PRODUCT' && view !== 'SELL' && <BottomNav onSellClick={() => setView('SELL')} />}
      </div>
    </div>
  );
}

export default App;
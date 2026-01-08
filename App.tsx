import React from 'react';
import { Header } from './components/Header';
import { CategoryStrip } from './components/CategoryStrip';
import { PromoBanner } from './components/PromoBanner';
import { FilterStrip } from './components/FilterStrip';
import { ProductCard } from './components/ProductCard';
import { BottomNav } from './components/BottomNav';
import { PRODUCTS } from './constants';

function App() {
  return (
    <div className="min-h-screen bg-[#F2F4F7] flex justify-center font-sans antialiased">
      {/* Mobile Wrapper */}
      <div className="w-full max-w-[430px] bg-white min-h-screen relative shadow-[0_0_50px_rgba(0,0,0,0.04)] pb-24">
        
        {/* THE FIX: Unified Sticky Header Container
            This wrapper holds both the Main Header and the Category Tabs.
            They will move as one unit. No gaps. */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100/80 supports-[backdrop-filter]:bg-white/80">
          <Header />
          <CategoryStrip />
        </div>

        <main className="w-full">
          <div className="flex flex-col gap-4">
            <PromoBanner />
            <FilterStrip />
          </div>

          {/* Product Grid */}
          <div className="px-4 mt-4">
            <div className="flex items-end justify-between mb-4 px-1">
               <h2 className="text-[18px] font-bold text-gray-900 tracking-tight leading-none">Свежи обяви</h2>
               <button className="text-[12px] font-medium text-gray-500 hover:text-gray-900 transition-colors">Виж всички</button>
            </div>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-8">
              {PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}

export default App;
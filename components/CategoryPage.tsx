import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Search, SlidersHorizontal, ChevronDown, ShoppingBag, 
  ArrowUpDown, X, Shirt, Footprints, Watch, Gamepad2, 
  Baby, Package, Glasses
} from 'lucide-react';
import { ProductCard } from './ProductCard';
import { FilterModal } from './FilterModal';
import { FASHION_GROUPS, FASHION_TREE, PRODUCTS, SUB_CATEGORIES } from '../constants';
import { Product } from '../types';

interface CategoryPageProps {
  categoryName: string;
  onBack: () => void;
  onProductSelect: (product: Product) => void;
}

// Map IDs to Icons for the "Visual" L2 Navigation
const DEPT_ICONS: Record<string, React.ElementType> = {
  clothing: Shirt,
  shoes: Footprints,
  bags: ShoppingBag,
  accessories: Watch,
  sunglasses: Glasses,
  toys: Gamepad2,
  girls: Baby,
  boys: Baby,
  default: Package
};

export const CategoryPage: React.FC<CategoryPageProps> = ({ categoryName, onBack, onProductSelect }) => {
  const [activeGender, setActiveGender] = useState('women');      // L1: Gender
  const [activeDept, setActiveDept] = useState<string | null>(null); // L2: Department
  const [activeCategory, setActiveCategory] = useState('all');    // L3: Specific
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // When Gender changes, reset to the main "Circles" view
  useEffect(() => {
    setActiveDept(null);
    setActiveCategory('all');
  }, [activeGender]);

  // When Department changes, reset category to 'all'
  useEffect(() => {
    setActiveCategory('all');
  }, [activeDept]);

  // Data Logic
  const isFashion = categoryName === 'Мода';
  const currentDepartments = isFashion ? (FASHION_TREE[activeGender as keyof typeof FASHION_TREE] || []) : [];
  
  // L3 Items (Subcategories)
  const currentSubItems = activeDept 
    ? currentDepartments.find(d => d.id === activeDept)?.items || [] 
    : [];

  // Helper to get icon
  const getIcon = (id: string) => DEPT_ICONS[id] || DEPT_ICONS['default'];

  // Get current active department object
  const activeDeptObj = activeDept ? currentDepartments.find(d => d.id === activeDept) : null;
  const ActiveIcon = activeDeptObj ? getIcon(activeDeptObj.id) : null;

  return (
    <div className="bg-white min-h-screen pb-24 font-sans relative">
      <FilterModal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        onApply={() => setIsFilterOpen(false)} 
      />

      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-zinc-200">
        
        {/* Top Bar */}
        <div className="pt-safe-top">
          <div className="flex items-center justify-between px-2 h-[52px]">
            <div className="flex items-center">
              <button 
                onClick={onBack}
                className="w-10 h-10 flex items-center justify-center rounded-full active:bg-zinc-100 transition-colors text-zinc-900"
              >
                <ArrowLeft className="w-[24px] h-[24px] stroke-[1.5]" />
              </button>
              <h1 className="text-[17px] font-bold text-zinc-900 ml-1 leading-none transform translate-y-[0.5px]">
                {categoryName}
              </h1>
            </div>
            
            <div className="flex items-center">
              <button className="w-10 h-10 flex items-center justify-center rounded-full active:bg-zinc-100 transition-colors text-zinc-900">
                 <Search className="w-[24px] h-[24px] stroke-[1.5]" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full active:bg-zinc-100 transition-colors text-zinc-900 relative">
                 <ShoppingBag className="w-[24px] h-[24px] stroke-[1.5]" />
                 <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600 border border-white"></span>
                 </span>
              </button>
            </div>
          </div>
        </div>

        {/* L1 NAVIGATION: Gender Tabs */}
        {isFashion && (
            <div className="flex items-center px-4 gap-6 border-b border-zinc-100 overflow-x-auto no-scrollbar">
                {FASHION_GROUPS.map((group) => {
                    const isActive = activeGender === group.id;
                    return (
                        <button
                            key={group.id}
                            onClick={() => setActiveGender(group.id)}
                            className={`
                                relative py-3 text-[14px] whitespace-nowrap transition-colors flex-shrink-0
                                ${isActive 
                                    ? 'text-zinc-900 font-bold' 
                                    : 'text-zinc-500 font-medium hover:text-zinc-700'}
                            `}
                        >
                            {group.name}
                            {isActive && (
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-zinc-900 rounded-t-full"></span>
                            )}
                        </button>
                    );
                })}
            </div>
        )}

        {/* L2/L3 NAVIGATION: The Transformer Area */}
        <div className="bg-white">
           
           {/* STATE 1: Circles (Default) */}
           {!activeDept && isFashion && (
             <div className="py-4 overflow-x-auto no-scrollbar px-3 animate-in fade-in duration-300">
                <div className="flex items-start gap-2">
                  {currentDepartments.map((dept) => {
                    const Icon = getIcon(dept.id);
                    return (
                      <button
                        key={dept.id}
                        onClick={() => setActiveDept(dept.id)}
                        className="flex flex-col items-center gap-2 group flex-shrink-0 w-[72px]"
                      >
                        <div className="w-[56px] h-[56px] rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center group-active:scale-95 group-active:bg-zinc-100 transition-all shadow-sm">
                           <Icon className="w-6 h-6 text-zinc-900 stroke-[1.5]" />
                        </div>
                        <span className="text-[11px] font-medium text-zinc-700 leading-tight text-center px-1">
                          {dept.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
             </div>
           )}

           {/* STATE 2: Drill-Down (Active Context) */}
           {(activeDept || !isFashion) && (
             <div className="py-3 flex items-center overflow-x-auto no-scrollbar px-3 gap-2 animate-in fade-in slide-in-from-right-2 duration-300">
                 
                 {/* The "Morphed" Back Button */}
                 {isFashion && activeDeptObj && ActiveIcon && (
                   <>
                      <button 
                        onClick={() => setActiveDept(null)}
                        className="flex-shrink-0 flex items-center gap-1.5 pl-2 pr-3 py-1.5 bg-zinc-900 text-white rounded-full text-[13px] font-medium active:opacity-90 transition-opacity shadow-sm"
                      >
                        <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                            <ActiveIcon className="w-3 h-3 stroke-[2]" />
                        </div>
                        <span>{activeDeptObj.name}</span>
                        <X className="w-3.5 h-3.5 ml-1 opacity-60" />
                      </button>
                      
                      {/* Divider */}
                      <div className="w-[1px] h-5 bg-zinc-200 mx-1 flex-shrink-0"></div>
                   </>
                 )}

                 {/* Sub-Category Pills */}
                 {isFashion ? (
                   <>
                      <button
                        onClick={() => setActiveCategory('all')}
                        className={`
                          whitespace-nowrap px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all border
                          ${activeCategory === 'all'
                            ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm' 
                            : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'}
                        `}
                      >
                        Всички
                      </button>
                      {currentSubItems.map((item) => {
                        const isActive = activeCategory === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => setActiveCategory(item.id)}
                            className={`
                              whitespace-nowrap px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all border
                              ${isActive 
                                ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm' 
                                : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'}
                            `}
                          >
                            {item.name}
                          </button>
                        );
                      })}
                   </>
                 ) : (
                    /* Non-Fashion Generic Pills */
                    SUB_CATEGORIES.map(sub => (
                       <button key={sub.id} className="whitespace-nowrap px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all border bg-white text-zinc-600 border-zinc-200">
                          {sub.name}
                       </button>
                    ))
                 )}
             </div>
           )}
        </div>

        {/* Filter Bar */}
        <div className="flex items-center border-t border-zinc-200 h-[44px] px-3 bg-zinc-50/50 gap-3 overflow-x-auto no-scrollbar">
           <button 
             onClick={() => setIsFilterOpen(true)}
             className="flex-shrink-0 flex items-center gap-2 text-[13px] font-bold text-zinc-900 active:opacity-60 bg-white px-2.5 py-1 rounded-md border border-zinc-200 shadow-sm"
           >
             <SlidersHorizontal className="w-3.5 h-3.5 stroke-[2.5]" />
             <span>Филтри</span>
           </button>

           <div className="h-4 w-[1px] bg-zinc-200 flex-shrink-0"></div>

           <div className="flex items-center gap-3 flex-shrink-0">
             <button onClick={() => setIsFilterOpen(true)} className="flex items-center gap-1 text-[13px] font-medium text-zinc-600 active:text-zinc-900">
               Размер <ChevronDown className="w-3.5 h-3.5 stroke-[2] text-zinc-300" />
             </button>
             <button onClick={() => setIsFilterOpen(true)} className="flex items-center gap-1 text-[13px] font-medium text-zinc-600 active:text-zinc-900">
               Състояние <ChevronDown className="w-3.5 h-3.5 stroke-[2] text-zinc-300" />
             </button>
           </div>
           
           <div className="flex-1 min-w-[20px]"></div>

           <button 
             onClick={() => setIsFilterOpen(true)}
             className="flex-shrink-0 flex items-center gap-1.5 text-[13px] font-medium text-zinc-600 active:text-zinc-900"
           >
              <ArrowUpDown className="w-3.5 h-3.5 stroke-[2]" />
              <span className="hidden sm:inline">Сортирай</span>
           </button>
        </div>
      </div>

      {/* Grid */}
      <div className="px-3 pt-3">
         {/* Breadcrumb Context */}
         <div className="mb-3 px-1 flex items-center gap-1.5 text-[11px] font-medium text-zinc-400">
            <span>Мода</span>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-900 font-bold capitalize">
                {FASHION_GROUPS.find(g => g.id === activeGender)?.name}
            </span>
            {activeDept && (
               <>
                  <span className="text-zinc-300">/</span>
                  <span className={`${activeCategory === 'all' ? 'text-zinc-900 font-bold' : 'text-zinc-500'} capitalize`}>
                     {currentDepartments.find(d => d.id === activeDept)?.name}
                  </span>
               </>
            )}
            {activeDept && activeCategory !== 'all' && (
               <>
                  <span className="text-zinc-300">/</span>
                  <span className="text-zinc-900 font-bold capitalize">
                     {currentSubItems.find(i => i.id === activeCategory)?.name}
                  </span>
               </>
            )}
         </div>

         <div className="grid grid-cols-2 gap-2">
            {[...PRODUCTS, ...PRODUCTS].map((product, idx) => (
               <ProductCard 
                  key={`${product.id}-${idx}`} 
                  product={product} 
                  onClick={() => onProductSelect(product)}
               />
            ))}
         </div>
         
         <div className="py-12 flex flex-col items-center justify-center gap-2 text-center opacity-60">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-300"></div>
            <p className="text-[12px] text-zinc-400 font-medium tracking-wide uppercase">Край на резултатите</p>
         </div>
      </div>
    </div>
  );
};
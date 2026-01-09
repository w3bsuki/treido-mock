import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Search, SlidersHorizontal, ChevronDown, ShoppingBag, 
  ArrowUpDown, X, Shirt, Footprints, Watch, Gamepad2, 
  Baby, Package, Glasses, ChevronRight
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
  const [activeSubCategory, setActiveSubCategory] = useState('all'); // L4: Deep Specific
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // State Management
  useEffect(() => {
    setActiveDept(null);
    setActiveCategory('all');
    setActiveSubCategory('all');
  }, [activeGender]);

  useEffect(() => {
    setActiveCategory('all');
    setActiveSubCategory('all');
  }, [activeDept]);
  
  useEffect(() => {
    setActiveSubCategory('all');
  }, [activeCategory]);

  // Data Logic
  const isFashion = categoryName === 'Мода';
  const currentDepartments = isFashion ? (FASHION_TREE[activeGender] || []) : [];
  
  // L2 Item (Dept)
  const activeDeptObj = activeDept ? currentDepartments.find(d => d.id === activeDept) : null;
  const ActiveDeptIcon = activeDeptObj ? (DEPT_ICONS[activeDeptObj.id] || DEPT_ICONS['default']) : null;

  // L3 Items (Categories)
  const currentL3Items = activeDeptObj?.items || [];
  const activeCategoryObj = activeCategory !== 'all' ? currentL3Items.find(i => i.id === activeCategory) : null;

  // L4 Items (Sub-Categories)
  const currentL4Items = activeCategoryObj?.items || [];
  const isL4View = activeCategory !== 'all' && currentL4Items.length > 0;
  
  // Determine if we are in "Deep Focus Mode" (L2+ selected)
  const isDeepMode = !!activeDept;

  // Navigation Handlers
  const handleHeaderBack = () => {
    if (isL4View) {
        if (activeSubCategory !== 'all') {
             setActiveSubCategory('all');
        } else {
             setActiveCategory('all');
        }
    } else if (activeDept) {
        if (activeCategory !== 'all') {
            setActiveCategory('all');
        } else {
            setActiveDept(null);
        }
    } else {
        onBack();
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24 font-sans relative">
      <FilterModal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        onApply={() => setIsFilterOpen(false)} 
      />

      {/* Sticky Header Wrapper */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-zinc-200 transition-all duration-300">
        
        {/* ROW 1: Main Header (Always Visible) - 48px Fixed */}
        <div className="pt-safe-top">
          <div className="flex items-center justify-between px-3 h-[48px]">
            <div className="flex items-center">
              <button 
                onClick={handleHeaderBack}
                className="w-9 h-9 flex items-center justify-center rounded-full active:bg-zinc-100 transition-colors text-zinc-900 -ml-1"
              >
                <ArrowLeft className="w-[22px] h-[22px] stroke-[2]" />
              </button>
              
              {/* Dynamic Title based on Depth */}
              <h1 className="text-[16px] font-bold text-zinc-900 ml-1 leading-none transform translate-y-[0.5px] animate-in fade-in slide-in-from-left-2 truncate max-w-[200px]">
                {!isDeepMode 
                    ? categoryName 
                    : (activeCategoryObj?.name || activeDeptObj?.name)
                }
              </h1>
            </div>
            
            <div className="flex items-center gap-1">
              <button className="w-9 h-9 flex items-center justify-center rounded-full active:bg-zinc-100 transition-colors text-zinc-900">
                 <Search className="w-[22px] h-[22px] stroke-[1.5]" />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full active:bg-zinc-100 transition-colors text-zinc-900 relative">
                 <ShoppingBag className="w-[22px] h-[22px] stroke-[1.5]" />
                 <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600 border border-white"></span>
                 </span>
              </button>
            </div>
          </div>
        </div>

        {/* MODE A: ROOT NAVIGATION (Gender + Circles) - Only shown when NOT deep */}
        {!isDeepMode && isFashion && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                {/* Gender Tabs */}
                <div className="flex items-center px-3 gap-5 border-b border-zinc-100 overflow-x-auto no-scrollbar h-[44px]">
                    {FASHION_GROUPS.map((group) => {
                        const isActive = activeGender === group.id;
                        return (
                            <button
                                key={group.id}
                                onClick={() => setActiveGender(group.id)}
                                className={`
                                    relative h-full flex items-center text-[13px] whitespace-nowrap transition-colors flex-shrink-0
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

                {/* Circle Departments */}
                <div className="py-3 overflow-x-auto no-scrollbar px-3">
                    <div className="flex items-start gap-3">
                      {currentDepartments.map((dept) => {
                        const Icon = (DEPT_ICONS[dept.id] || DEPT_ICONS['default']);
                        return (
                          <button
                            key={dept.id}
                            onClick={() => setActiveDept(dept.id)}
                            className="flex flex-col items-center gap-2 group flex-shrink-0 w-[64px]"
                          >
                            <div className="w-[52px] h-[52px] rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center group-active:scale-95 group-active:bg-zinc-100 transition-all shadow-sm">
                               <Icon className="w-5 h-5 text-zinc-900 stroke-[1.5]" />
                            </div>
                            <span className="text-[10px] font-medium text-zinc-700 leading-tight text-center px-1">
                              {dept.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                </div>
            </div>
        )}

        {/* MODE B: FOCUS NAVIGATION (Active Context + Full Width Options) */}
        {isDeepMode && (activeDept || !isFashion) && (
             <div className="flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300">
                 
                 {/* ROW 1: CONTEXT STACK (The "Where Am I" Row) */}
                 {/* This row exclusively shows the path back up. It does not contain new options. */}
                 <div className="px-3 py-2 border-b border-zinc-100 flex items-center gap-2 overflow-x-auto no-scrollbar bg-zinc-50/50">
                     
                     {/* L2 Context: Dept */}
                     {isFashion && activeDeptObj && ActiveDeptIcon && (
                       <button 
                         onClick={() => setActiveDept(null)}
                         className={`
                            flex-shrink-0 flex items-center gap-1.5 pl-2 pr-2 py-1.5 rounded-md text-[12px] font-medium transition-colors border shadow-sm
                            ${!isL4View 
                                ? 'bg-zinc-900 text-white border-zinc-900' 
                                : 'bg-white text-zinc-600 border-zinc-200 active:bg-zinc-100'}
                         `}
                       >
                         <ActiveDeptIcon className={`w-3.5 h-3.5 stroke-[2] ${!isL4View ? 'text-white' : 'text-zinc-900'}`} />
                         <span>{activeDeptObj.name}</span>
                         {!isL4View && <X className="w-3 h-3 ml-1 opacity-60" />}
                       </button>
                     )}

                     {/* Separator */}
                     {isL4View && activeCategoryObj && <ChevronRight className="w-3 h-3 text-zinc-300 flex-shrink-0" />}

                     {/* L3 Context: Category */}
                     {isFashion && isL4View && activeCategoryObj && (
                       <button 
                         onClick={() => setActiveCategory('all')}
                         className="flex-shrink-0 flex items-center gap-1.5 pl-3 pr-2 py-1.5 bg-zinc-900 text-white rounded-md text-[12px] font-medium shadow-sm active:opacity-90 transition-opacity"
                       >
                         <span>{activeCategoryObj.name}</span>
                         <X className="w-3 h-3 ml-1 opacity-60" />
                       </button>
                     )}
                 </div>

                 {/* ROW 2: OPTIONS DECK (The "Where To Go" Row) */}
                 {/* This row has 100% width dedicated to the next set of choices. */}
                 <div className="px-3 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar bg-white border-b border-zinc-100">
                      {/* Only show 'All' if we are drilling down, to allow clearing filters */}
                      <button
                        onClick={() => isL4View ? setActiveSubCategory('all') : setActiveCategory('all')}
                        className={`
                          whitespace-nowrap px-3 py-1.5 rounded-full text-[12px] font-medium transition-all border flex-shrink-0
                          ${(isL4View ? activeSubCategory === 'all' : activeCategory === 'all')
                            ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm' 
                            : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'}
                        `}
                      >
                        Всички
                      </button>

                      {/* Render Items */}
                      {(isL4View ? currentL4Items : currentL3Items).map((item) => {
                        const isActive = isL4View ? activeSubCategory === item.id : activeCategory === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => isL4View ? setActiveSubCategory(item.id) : setActiveCategory(item.id)}
                            className={`
                              whitespace-nowrap px-3 py-1.5 rounded-full text-[12px] font-medium transition-all border flex-shrink-0
                              ${isActive 
                                ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm' 
                                : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'}
                            `}
                          >
                            {item.name}
                          </button>
                        );
                      })}
                 </div>
             </div>
        )}

        {/* Filter Bar - Always Visible */}
        <div className="flex items-center border-t border-zinc-200 h-[40px] px-3 bg-zinc-50/50 gap-3 overflow-x-auto no-scrollbar">
           <button 
             onClick={() => setIsFilterOpen(true)}
             className="flex-shrink-0 flex items-center gap-1.5 text-[12px] font-bold text-zinc-900 active:opacity-60 bg-white px-2.5 py-1 rounded-md border border-zinc-200 shadow-sm"
           >
             <SlidersHorizontal className="w-3 h-3 stroke-[2.5]" />
             <span>Филтри</span>
           </button>
           <div className="h-3 w-[1px] bg-zinc-200 flex-shrink-0"></div>
           <div className="flex items-center gap-3 flex-shrink-0">
             <button onClick={() => setIsFilterOpen(true)} className="flex items-center gap-1 text-[12px] font-medium text-zinc-600 active:text-zinc-900">
               Размер <ChevronDown className="w-3 h-3 stroke-[2] text-zinc-300" />
             </button>
             <button onClick={() => setIsFilterOpen(true)} className="flex items-center gap-1 text-[12px] font-medium text-zinc-600 active:text-zinc-900">
               Състояние <ChevronDown className="w-3 h-3 stroke-[2] text-zinc-300" />
             </button>
           </div>
           <div className="flex-1 min-w-[20px]"></div>
           <button 
             onClick={() => setIsFilterOpen(true)}
             className="flex-shrink-0 flex items-center gap-1.5 text-[12px] font-medium text-zinc-600 active:text-zinc-900"
           >
              <ArrowUpDown className="w-3 h-3 stroke-[2]" />
              <span className="hidden sm:inline">Сортирай</span>
           </button>
        </div>
      </div>

      {/* Grid */}
      <div className="px-3 pt-3">
         {/* Breadcrumb Context (Body) */}
         <div className="mb-2.5 px-1 flex flex-wrap items-center gap-1.5 text-[10px] font-medium text-zinc-400">
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
            {activeCategory !== 'all' && (
               <>
                  <span className="text-zinc-300">/</span>
                  <span className={`${isL4View && activeSubCategory === 'all' ? 'text-zinc-900 font-bold' : 'text-zinc-500'} capitalize`}>
                     {activeCategoryObj?.name}
                  </span>
               </>
            )}
            {isL4View && activeSubCategory !== 'all' && (
                <>
                    <span className="text-zinc-300">/</span>
                    <span className="text-zinc-900 font-bold capitalize">
                        {currentL4Items.find(i => i.id === activeSubCategory)?.name}
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
            <p className="text-[11px] text-zinc-400 font-medium tracking-wide uppercase">Край на резултатите</p>
         </div>
      </div>
    </div>
  );
};
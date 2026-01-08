import React from 'react';
import { Search, Heart, ShoppingBag, Bell } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    // Clean component: No sticky, no background (handled by parent)
    <div className="pt-safe-top">
      {/* Main Header Bar - Compact 48px */}
      <div className="flex items-center justify-between px-2 h-12">
        {/* Logo */}
        <div className="flex items-center gap-2 px-2">
           <span className="text-[20px] font-extrabold tracking-tighter text-gray-900">treido.</span>
        </div>
        
        {/* Action Icons */}
        <div className="flex items-center gap-0.5">
           <button className="p-2.5 text-gray-600 hover:text-gray-900 active:opacity-50 transition-all relative">
             <Bell className="w-[20px] h-[20px] stroke-[1.5]" />
             <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white"></span>
           </button>
           <button className="p-2.5 text-gray-600 hover:text-gray-900 active:opacity-50 transition-all">
             <Heart className="w-[20px] h-[20px] stroke-[1.5]" />
           </button>
           <button className="p-2.5 text-gray-600 hover:text-gray-900 active:opacity-50 transition-all -mr-1">
             <ShoppingBag className="w-[20px] h-[20px] stroke-[1.5]" />
           </button>
        </div>
      </div>

      {/* Search Input - Zero bottom padding to merge with categories below */}
      <div className="px-3 pb-0">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-[16px] w-[16px] text-gray-400 group-focus-within:text-gray-600 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-9 pr-4 py-2 bg-gray-100/50 border border-transparent focus:border-gray-200 rounded-md text-gray-900 text-[14px] font-medium placeholder-gray-400 focus:outline-none focus:bg-white transition-all shadow-sm shadow-gray-200/20"
            placeholder="Търсене на продукти..."
          />
        </div>
      </div>
    </div>
  );
};
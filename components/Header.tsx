import React from 'react';
import { Search, Heart, ShoppingBag, Bell } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <div className="pt-safe-top bg-white/80 backdrop-blur-xl border-b border-zinc-200">
      {/* Main Header Bar - Compact 44px */}
      <div className="flex items-center justify-between px-3 h-11">
        {/* Logo - Tracking Tight */}
        <div className="flex items-center gap-2">
           <span className="text-[18px] font-bold tracking-tight text-zinc-900">treido.</span>
        </div>
        
        {/* Action Icons - Stroke 1.5px */}
        <div className="flex items-center gap-1">
           <button className="p-2 text-zinc-500 hover:text-zinc-900 active:opacity-50 transition-all relative">
             <Bell className="w-[20px] h-[20px] stroke-[1.5]" />
             <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white"></span>
           </button>
           <button className="p-2 text-zinc-500 hover:text-zinc-900 active:opacity-50 transition-all">
             <Heart className="w-[20px] h-[20px] stroke-[1.5]" />
           </button>
           <button className="p-2 text-zinc-500 hover:text-zinc-900 active:opacity-50 transition-all -mr-2">
             <ShoppingBag className="w-[20px] h-[20px] stroke-[1.5]" />
           </button>
        </div>
      </div>

      {/* Search Input - Technical Look (Zinc-50 bg, rounded-md) */}
      <div className="px-3 pb-2">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-[14px] w-[14px] text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full h-10 pl-9 pr-4 bg-zinc-50 border border-zinc-200 focus:border-zinc-400 rounded-md text-zinc-900 text-[14px] font-medium placeholder-zinc-400 focus:outline-none focus:bg-white transition-all shadow-sm"
            placeholder="Търсене на продукти..."
          />
        </div>
      </div>
    </div>
  );
};
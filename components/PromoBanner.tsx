import React from 'react';
import { ArrowRight } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  return (
    <div className="px-4 pt-4">
      {/* Dark Theme Banner - rounded-md matches products */}
      <div className="group relative overflow-hidden bg-gray-900 rounded-md p-5 shadow-sm active:scale-[0.99] transition-all duration-200 cursor-pointer">
        <div className="flex items-center justify-between relative z-10">
          <div className="space-y-1.5">
            <h2 className="text-[16px] font-bold text-white tracking-tight leading-none">Продай за минути</h2>
            <p className="text-[13px] text-gray-400 font-medium leading-tight">Освободи място и спечели.</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-gray-900 transition-all">
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>
        
        {/* Subtle texture/gradient overlay */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
      </div>
    </div>
  );
};
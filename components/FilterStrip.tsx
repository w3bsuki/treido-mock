import React, { useState } from 'react';
import { FILTERS } from '../constants';
import { SlidersHorizontal } from 'lucide-react';

export const FilterStrip: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('newest');

  return (
    <div className="w-full overflow-x-auto no-scrollbar pl-4">
      <div className="flex items-center gap-2 pr-4">
        <button className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-200 rounded-full text-gray-700 text-[13px] font-semibold whitespace-nowrap active:bg-gray-50 transition-colors shadow-sm">
           <SlidersHorizontal className="w-3.5 h-3.5" />
           <span>Филтри</span>
        </button>
        
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`
                flex-shrink-0 px-3.5 py-2 rounded-full text-[13px] font-medium transition-all whitespace-nowrap border
                ${isActive 
                  ? 'bg-gray-900 text-white border-gray-900 shadow-md shadow-gray-200' 
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}
              `}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
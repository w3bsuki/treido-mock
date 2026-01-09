import React, { useState } from 'react';
import { FILTERS } from '../constants';
import { SlidersHorizontal } from 'lucide-react';

interface FilterStripProps {
  onFilterClick?: () => void;
}

export const FilterStrip: React.FC<FilterStripProps> = ({ onFilterClick }) => {
  const [activeFilter, setActiveFilter] = useState('newest');

  return (
    <div className="w-full overflow-x-auto no-scrollbar pl-4">
      <div className="flex items-center gap-2 pr-4">
        <button 
          onClick={onFilterClick}
          className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 text-[13px] font-bold whitespace-nowrap active:bg-gray-50 transition-colors"
        >
           <SlidersHorizontal className="w-4 h-4 stroke-[2]" />
           <span>Филтри</span>
        </button>
        
        {/* Simple separators removed, just pure list now for cleaner horizontal scroll */}
        <div className="w-[1px] h-6 bg-gray-200 mx-1"></div>
        
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`
                flex-shrink-0 px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all whitespace-nowrap border
                ${isActive 
                  ? 'bg-gray-900 text-white border-gray-900' 
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
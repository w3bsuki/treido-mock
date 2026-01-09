import React, { useState } from 'react';
import { CATEGORIES } from '../constants';

interface CategoryStripProps {
  onSelect?: (id: string, name: string) => void;
}

export const CategoryStrip: React.FC<CategoryStripProps> = ({ onSelect }) => {
  const [activeId, setActiveId] = useState('all');

  const handleSelect = (id: string, name: string) => {
    setActiveId(id);
    if (onSelect && id !== 'all') {
      onSelect(id, name);
    }
  };

  return (
    // Clean component: No sticky, no background (handled by parent).
    // pt-3 gives exactly the right breathing room below the search bar.
    <div className="pt-3 pb-0">
      <div className="flex overflow-x-auto no-scrollbar px-4 gap-6">
        {CATEGORIES.map((cat) => {
          const isActive = activeId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.id, cat.name)}
              className={`
                flex-shrink-0 relative text-[13px] font-medium pb-2.5 transition-colors
                ${isActive 
                  ? 'text-gray-900' 
                  : 'text-gray-500 hover:text-gray-900'}
              `}
            >
              {cat.name}
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-900 rounded-t-full"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
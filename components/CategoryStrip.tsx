import React, { useState } from 'react';
import { CATEGORIES } from '../constants';

export const CategoryStrip: React.FC = () => {
  const [activeId, setActiveId] = useState('all');

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
              onClick={() => setActiveId(cat.id)}
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
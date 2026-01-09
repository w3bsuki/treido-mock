import React from 'react';
import { Home, Search, Plus, MessageSquare, User } from 'lucide-react';

interface BottomNavProps {
  currentView: string;
  onNavClick: (view: 'HOME' | 'SEARCH' | 'SELL' | 'CHAT' | 'PROFILE') => void;
  onSellClick: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavClick, onSellClick }) => {
  return (
    <nav className="fixed bottom-0 z-50 w-full max-w-[430px] mx-auto bg-white/90 backdrop-blur-xl border-t border-zinc-200 pb-safe">
      <div className="grid grid-cols-5 items-center px-1 h-[52px]">
        
        <NavItem 
           icon={<Home />} 
           label="Начало" 
           isActive={currentView === 'HOME' || currentView === 'CATEGORY'} 
           onClick={() => onNavClick('HOME')}
        />
        
        <NavItem 
           icon={<Search />} 
           label="Търси" 
           isActive={currentView === 'SEARCH'} 
           onClick={() => onNavClick('SEARCH')}
        />
        
        {/* Sell Button - Technical "Chip" Style */}
        <div className="flex items-center justify-center -mt-4">
            <button 
              onClick={onSellClick}
              className="flex items-center justify-center w-12 h-12 bg-zinc-900 rounded-full text-white shadow-lg shadow-zinc-200 active:scale-95 transition-transform border-4 border-white"
            >
               <Plus className="w-6 h-6 stroke-[2]" />
            </button>
        </div>

        <NavItem 
           icon={<MessageSquare />} 
           label="Чат" 
           isActive={currentView === 'CHAT'} 
           onClick={() => onNavClick('CHAT')}
        />
        
        <NavItem 
           icon={<User />} 
           label="Профил" 
           isActive={currentView === 'PROFILE'} 
           onClick={() => onNavClick('PROFILE')}
        />
      </div>
    </nav>
  );
};

const NavItem: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  isActive?: boolean;
  onClick: () => void; 
}> = ({ icon, label, isActive, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 group active:opacity-50 transition-opacity p-1 w-full ${isActive ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'}`}
    >
      {React.cloneElement(icon as React.ReactElement<any>, {
         className: `w-[22px] h-[22px] transition-colors ${isActive ? 'stroke-[2] text-zinc-900' : 'stroke-[1.5] group-hover:stroke-zinc-600'}`
      })}
      <span className={`text-[10px] tracking-tight leading-none ${isActive ? 'font-bold' : 'font-medium'}`}>{label}</span>
    </button>
  );
};
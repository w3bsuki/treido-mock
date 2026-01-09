import React from 'react';
import { Home, Search, PlusSquare, MessageCircle, User } from 'lucide-react';

interface BottomNavProps {
  currentView: string;
  onNavClick: (view: 'HOME' | 'SEARCH' | 'SELL' | 'CHAT' | 'PROFILE') => void;
  onSellClick: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavClick, onSellClick }) => {
  return (
    <nav className="fixed bottom-0 z-50 w-full max-w-[430px] mx-auto bg-white/95 backdrop-blur-xl border-t border-gray-100 pb-safe">
      <div className="grid grid-cols-5 items-center px-1 h-[50px]">
        
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
        
        {/* Sell Tab - Special Handling */}
        <button 
          onClick={onSellClick}
          className="flex flex-col items-center justify-center gap-0.5 group active:opacity-50 transition-opacity p-1 w-full text-gray-900"
        >
           <PlusSquare className="w-[22px] h-[22px] stroke-[1.5]" />
           <span className="text-[10px] font-semibold tracking-tight leading-none mt-0.5">Продай</span>
        </button>

        <NavItem 
           icon={<MessageCircle />} 
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
      className={`flex flex-col items-center justify-center gap-0.5 group active:opacity-50 transition-opacity p-1 w-full ${isActive ? 'text-gray-900' : 'text-gray-400 hover:text-gray-900'}`}
    >
      {React.cloneElement(icon as React.ReactElement<any>, {
         className: `w-[22px] h-[22px] transition-colors ${isActive ? 'stroke-[2.5] fill-gray-900/5' : 'stroke-[1.5] group-hover:stroke-gray-600'}`
      })}
      <span className={`text-[10px] tracking-tight leading-none mt-0.5 ${isActive ? 'font-bold' : 'font-medium'}`}>{label}</span>
    </button>
  );
};
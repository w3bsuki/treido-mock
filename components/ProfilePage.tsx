import React from 'react';
import { Settings, MapPin, Star, Box, Heart, CreditCard, ChevronRight, LogOut, HelpCircle, ShoppingBag, CheckCircle2, Package } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-[80px] font-sans">
      
      {/* 1. Header (Sticky) */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100">
        <div className="pt-safe-top">
           <div className="h-[52px] px-4 flex items-center justify-between">
              <h1 className="text-[17px] font-bold text-gray-900">Профил</h1>
              <button className="p-2 -mr-2 text-gray-900 active:opacity-50">
                 <Settings className="w-[22px] h-[22px] stroke-[1.5]" />
              </button>
           </div>
        </div>
      </div>

      {/* 2. Identity Card */}
      <div className="bg-white px-4 py-6 border-b border-gray-100 mb-2">
         <div className="flex items-center gap-4">
            <div className="relative">
               <div className="w-[72px] h-[72px] rounded-full overflow-hidden border border-gray-100 bg-gray-100">
                  <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
               </div>
               <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-1 border-2 border-white">
                  <CheckCircle2 className="w-3.5 h-3.5" />
               </div>
            </div>
            
            <div className="flex-1 min-w-0">
               <h2 className="text-[18px] font-bold text-gray-900 leading-tight truncate">Александър Димов</h2>
               <div className="flex items-center gap-3 mt-1.5 text-gray-500">
                  <div className="flex items-center gap-1 text-[13px] font-medium">
                     <Star className="w-3.5 h-3.5 fill-gray-900 text-gray-900" />
                     <span className="text-gray-900">4.9</span>
                     <span>(28)</span>
                  </div>
                  <div className="w-[1px] h-3 bg-gray-300"></div>
                  <div className="flex items-center gap-1 text-[13px]">
                     <MapPin className="w-3.5 h-3.5" />
                     <span>София</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Quick Stats Row */}
         <div className="grid grid-cols-3 gap-2 mt-6">
            <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl border border-gray-100">
               <span className="text-[18px] font-bold text-gray-900">12</span>
               <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">Активни</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl border border-gray-100">
               <span className="text-[18px] font-bold text-gray-900">48</span>
               <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">Продадени</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl border border-gray-100">
               <span className="text-[18px] font-bold text-gray-900">156</span>
               <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">Следващи</span>
            </div>
         </div>
      </div>

      {/* 3. Dashboard / Balance */}
      <div className="bg-white border-y border-gray-100 mb-2">
         <div className="p-4 flex items-center justify-between border-b border-gray-100 active:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-700">
                  <CreditCard className="w-5 h-5 stroke-[2]" />
               </div>
               <div>
                  <p className="text-[13px] font-medium text-gray-500">Наличен баланс</p>
                  <p className="text-[16px] font-bold text-gray-900">245.00 лв.</p>
               </div>
            </div>
            <button className="px-4 py-1.5 bg-gray-900 text-white text-[13px] font-bold rounded-lg active:scale-95 transition-transform">
               Теглене
            </button>
         </div>
      </div>

      {/* 4. Menu Groups */}
      
      {/* Buying Group */}
      <div className="bg-white border-y border-gray-100 mb-2">
         <div className="px-4 py-2 border-b border-gray-100 bg-gray-50/30">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Моите покупки</span>
         </div>
         <MenuItem icon={<ShoppingBag />} label="Поръчки" badge="2" />
         <MenuItem icon={<Heart />} label="Любими обяви" />
         <MenuItem icon={<Package />} label="Доставки" />
      </div>

      {/* Selling Group */}
      <div className="bg-white border-y border-gray-100 mb-2">
         <div className="px-4 py-2 border-b border-gray-100 bg-gray-50/30">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Продажби</span>
         </div>
         <MenuItem icon={<Box />} label="Моите обяви" />
         <MenuItem icon={<CreditCard />} label="Плащания и промотиране" />
      </div>

      {/* Settings Group */}
      <div className="bg-white border-y border-gray-100 mb-6">
         <div className="px-4 py-2 border-b border-gray-100 bg-gray-50/30">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Акаунт</span>
         </div>
         <MenuItem icon={<HelpCircle />} label="Помощ и контакти" />
         <div className="flex items-center gap-3 px-4 py-4 cursor-pointer active:bg-gray-50 transition-colors">
            <LogOut className="w-[20px] h-[20px] text-red-500 stroke-[1.5]" />
            <span className="text-[15px] font-medium text-red-500">Изход</span>
         </div>
      </div>

      <div className="flex flex-col items-center justify-center pb-8 opacity-40">
         <p className="text-[11px] font-bold text-gray-900">TREIDO APP</p>
         <p className="text-[10px] text-gray-500">Версия 1.0.4</p>
      </div>

    </div>
  );
};

const MenuItem: React.FC<{ icon: React.ReactNode, label: string, badge?: string }> = ({ icon, label, badge }) => {
   return (
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 last:border-0 cursor-pointer active:bg-gray-50 transition-colors group">
         <div className="flex items-center gap-3.5">
            {React.cloneElement(icon as React.ReactElement, {
               className: "w-[20px] h-[20px] text-gray-400 group-hover:text-gray-900 transition-colors stroke-[1.5]"
            })}
            <span className="text-[15px] font-medium text-gray-900">{label}</span>
         </div>
         <div className="flex items-center gap-2">
            {badge && (
               <span className="bg-red-500 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-md min-w-[20px] text-center">
                  {badge}
               </span>
            )}
            <ChevronRight className="w-4 h-4 text-gray-300" />
         </div>
      </div>
   );
};
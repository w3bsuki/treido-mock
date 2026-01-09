import React, { useState } from 'react';
import { X, Camera, ChevronRight, MapPin, AlertCircle, Trash2 } from 'lucide-react';

interface SellPageProps {
  onClose: () => void;
}

export const SellPage: React.FC<SellPageProps> = ({ onClose }) => {
  const [condition, setCondition] = useState('new');
  const [images, setImages] = useState<string[]>([]); // Mock state
  
  // Mock adding an image
  const handleAddImage = () => {
    // Just a mock interaction
    setImages([...images, 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=200']);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white min-h-screen pb-[90px] font-sans relative z-[60]">
      
      {/* 1. Header - Sticky */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="pt-safe-top">
          <div className="flex items-center justify-between px-4 h-[52px]">
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center -ml-2 rounded-full active:bg-gray-100 text-gray-900"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>
            <h1 className="text-[16px] font-bold text-gray-900">Нова обява</h1>
            <button className="text-[14px] font-bold text-gray-400 disabled:opacity-50">
              Запази
            </button>
          </div>
        </div>
      </div>

      {/* 2. Photo Upload - Horizontal Scroll */}
      <div className="py-6 border-b border-gray-100">
        <div className="px-4 mb-3 flex items-center justify-between">
           <h3 className="text-[14px] font-bold text-gray-900">Снимки</h3>
           <span className="text-[12px] text-gray-500 font-medium">0/10</span>
        </div>
        
        <div className="flex overflow-x-auto no-scrollbar px-4 gap-3">
           {/* Upload Button */}
           <button 
             onClick={handleAddImage}
             className="flex-shrink-0 w-[100px] h-[100px] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-1 text-gray-500 bg-gray-50 active:bg-gray-100 active:border-gray-400 transition-all"
           >
              <Camera className="w-6 h-6 stroke-[1.5]" />
              <span className="text-[11px] font-bold">Добави</span>
           </button>

           {/* Images Preview */}
           {images.map((img, idx) => (
             <div key={idx} className="relative flex-shrink-0 w-[100px] h-[100px] rounded-lg overflow-hidden bg-gray-100 border border-gray-100">
               <img src={img} alt="" className="w-full h-full object-cover" />
               <button 
                 onClick={() => removeImage(idx)}
                 className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full backdrop-blur-sm"
               >
                 <Trash2 className="w-3.5 h-3.5" />
               </button>
               {idx === 0 && (
                 <div className="absolute bottom-0 left-0 right-0 bg-gray-900/80 text-white text-[9px] font-bold text-center py-0.5">
                   КОРИЦА
                 </div>
               )}
             </div>
           ))}
        </div>
        <p className="px-4 mt-2 text-[11px] text-gray-400">Първата снимка ще бъде основна за обявата.</p>
      </div>

      {/* 3. Title & Description */}
      <div className="p-4 border-b border-gray-100 space-y-4">
        <div>
           <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-wide mb-1.5">Заглавие</label>
           <input 
              type="text" 
              placeholder="Напр. iPhone 13 Pro, Запазено яке..." 
              className="w-full h-[48px] px-3 bg-gray-50 border border-gray-200 rounded-lg text-[15px] font-medium text-gray-900 focus:bg-white focus:border-gray-900 focus:ring-0 transition-colors placeholder:text-gray-400 outline-none"
           />
        </div>
        
        <div>
           <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-wide mb-1.5">Категория</label>
           <button className="w-full h-[48px] px-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between active:bg-gray-50 transition-colors text-left group">
              <span className="text-[15px] text-gray-500 font-medium group-active:text-gray-900">Избери категория</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
           </button>
        </div>
      </div>

      {/* 4. Condition */}
      <div className="p-4 border-b border-gray-100">
         <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-wide mb-3">Състояние</label>
         <div className="grid grid-cols-2 gap-3">
            {['new', 'used'].map((c) => (
              <label 
                key={c}
                className={`
                  flex items-center justify-center h-[46px] rounded-lg border cursor-pointer transition-all
                  ${condition === c 
                    ? 'bg-gray-900 text-white border-gray-900 font-bold shadow-md' 
                    : 'bg-white text-gray-600 border-gray-200 font-medium active:bg-gray-50'}
                `}
                onClick={() => setCondition(c)}
              >
                 <span className="text-[14px]">{c === 'new' ? 'Ново' : 'Използвано'}</span>
              </label>
            ))}
         </div>
      </div>

      {/* 5. Price */}
      <div className="p-4 border-b border-gray-100">
         <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-wide mb-1.5">Цена</label>
         <div className="relative">
            <input 
              type="number" 
              placeholder="0.00" 
              className="w-full h-[56px] pl-4 pr-12 bg-white border border-gray-200 rounded-lg text-[24px] font-bold text-gray-900 focus:border-gray-900 focus:ring-0 transition-colors placeholder:text-gray-300 outline-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[16px] font-bold text-gray-400">лв.</span>
         </div>
         <div className="mt-3 flex items-center gap-2">
            <input type="checkbox" id="negotiable" className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900" />
            <label htmlFor="negotiable" className="text-[14px] font-medium text-gray-700">По договаряне</label>
         </div>
      </div>

      {/* 6. Description */}
      <div className="p-4 border-b border-gray-100">
         <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-wide mb-1.5">Описание</label>
         <textarea 
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-[15px] text-gray-900 min-h-[120px] focus:bg-white focus:border-gray-900 outline-none resize-none"
            placeholder="Опиши състоянието, размерите и забележките..."
         ></textarea>
      </div>

      {/* 7. Location */}
      <div className="p-4">
         <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-wide mb-1.5">Локация</label>
         <div className="flex items-center gap-2 px-3 py-3 bg-blue-50/50 border border-blue-100 rounded-lg text-blue-800">
            <MapPin className="w-5 h-5 shrink-0" />
            <span className="text-[14px] font-bold">София, Център</span>
            <button className="ml-auto text-[12px] font-bold underline decoration-blue-300 underline-offset-2">Промени</button>
         </div>
         <div className="mt-4 flex gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <AlertCircle className="w-5 h-5 text-gray-400 shrink-0" />
            <p className="text-[12px] text-gray-500 leading-snug">
               Чрез публикуването на тази обява, вие се съгласявате с нашите <span className="underline">Общи условия</span>.
            </p>
         </div>
      </div>

      {/* Sticky Footer Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50">
        <div className="p-4">
          <button className="w-full h-[50px] bg-gray-900 text-white font-bold text-[16px] rounded-lg flex items-center justify-center shadow-lg shadow-gray-200 active:scale-[0.99] transition-transform">
            Публикувай обявата
          </button>
        </div>
      </div>

    </div>
  );
};
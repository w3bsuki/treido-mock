import React, { useState } from 'react';
import { ArrowLeft, Share2, Heart, ShieldCheck, MapPin, Star, MessageCircle, MoreHorizontal, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';

interface ProductPageProps {
  product: Product;
  onBack: () => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ product, onBack }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const images = [product.imageUrl, product.imageUrl, product.imageUrl];
  const specs = {
    'Състояние': product.condition === 'New' ? 'Ново' : 'Използвано',
    'Марка': 'Apple', 
    'Цвят': 'Graphite',
    'Памет': '256GB',
    'Доставка': 'Еконт / Спиди'
  };

  const moreFromSeller = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

  // Mock description if missing, to demonstrate the UI
  const descriptionText = product.description || `Продавам телефона, защото си взех по-нов модел. Работи перфектно, без драскотини по екрана. Винаги е носен с калъф и протектор.\n\nБатерията е на 89% живот. Идва с оригиналната кутия и кабел за зареждане. Няма iCloud заключване и работи с всички оператори.\n\nМоже да се види и тества на място в София. За страната изпращам с Еконт/Спиди с опция преглед и тест. Бартери не ме интересуват. Цената е крайна.`;
  
  const TRUNCATE_LENGTH = 150;
  const shouldTruncate = descriptionText.length > TRUNCATE_LENGTH;
  const displayedText = !isExpanded && shouldTruncate 
    ? descriptionText.slice(0, TRUNCATE_LENGTH) + '...' 
    : descriptionText;

  return (
    <div className="bg-white min-h-screen pb-[70px] font-sans relative z-50">
      
      {/* 1. Header: Ultra-clean, no distractions */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="pt-safe-top">
          <div className="flex items-center justify-between px-2 h-[48px]">
            <button 
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center text-gray-900 active:bg-gray-50 transition-colors rounded-full"
            >
              <ArrowLeft className="w-[22px] h-[22px] stroke-[1.5]" />
            </button>
            
            <div className="flex items-center">
              <button className="w-10 h-10 flex items-center justify-center text-gray-900 active:bg-gray-50 transition-colors rounded-full">
                <Share2 className="w-[20px] h-[20px] stroke-[1.5]" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center text-gray-900 active:bg-gray-50 transition-colors rounded-full">
                <MoreHorizontal className="w-[20px] h-[20px] stroke-[1.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Gallery: Pure functionality */}
      <div className="relative w-full aspect-square bg-gray-50">
        <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar w-full h-full">
          {images.map((img, idx) => (
            <div key={idx} className="flex-shrink-0 w-full h-full snap-center">
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        {/* Simple dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 px-2 py-1 bg-black/40 rounded-full">
          {images.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-1.5 h-1.5 rounded-full ${activeImage === idx ? 'bg-white' : 'bg-white/50'}`} 
            />
          ))}
        </div>
      </div>

      {/* 3. Info Block: Compact & Readable */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-start justify-between gap-4">
           <h1 className="text-[16px] leading-snug font-normal text-gray-900 line-clamp-2">{product.title}</h1>
           <button className="text-gray-400 active:text-red-500 pt-0.5">
             <Heart className={`w-6 h-6 stroke-[1.5] ${product.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
           </button>
        </div>
        
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-[22px] font-bold text-gray-900">{product.price}</span>
          <span className="text-[15px] font-medium text-gray-900">{product.currency}</span>
        </div>
        
        <div className="mt-2 flex items-center gap-2 text-[12px] text-gray-500">
          <span className="flex items-center gap-1">
             <MapPin className="w-3.5 h-3.5 stroke-[1.5]" /> {product.location}
          </span>
          <span className="w-0.5 h-0.5 bg-gray-300 rounded-full"></span>
          <span>{product.postedAt}</span>
        </div>
      </div>

      {/* 4. Protection: Gray only, no gradients */}
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-start gap-3">
           <ShieldCheck className="w-5 h-5 text-gray-900 mt-0.5 stroke-[1.5]" />
           <div>
             <h3 className="text-[13px] font-bold text-gray-900">Защита на купувача</h3>
             <p className="text-[12px] text-gray-500 leading-snug mt-0.5">
               Преглед и тест преди плащане. Сигурна доставка.
             </p>
           </div>
        </div>
      </div>

      {/* 5. Seller: Minimal Profile Row */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden border border-gray-100">
             <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Seller" className="w-full h-full object-cover" />
           </div>
           
           <div className="flex-1 min-w-0">
             <div className="flex items-center gap-1.5">
                <h4 className="text-[14px] font-bold text-gray-900 truncate">Иван Петров</h4>
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 fill-white" />
             </div>
             <div className="flex items-center gap-1 text-[12px] text-gray-500">
               <Star className="w-3 h-3 fill-gray-900 text-gray-900" />
               <span className="font-medium text-gray-900">4.9</span>
               <span>(24)</span>
             </div>
           </div>
           
           <button className="text-[12px] font-medium text-gray-900 border border-gray-200 px-3 py-1.5 rounded bg-white active:bg-gray-50">
              Виж профила
           </button>
        </div>
      </div>

      {/* 6. Specs: List style (Cleanest) */}
      <div className="px-4 py-4 border-b border-gray-100">
        <h3 className="text-[14px] font-bold text-gray-900 mb-3">Детайли</h3>
        <div className="space-y-2">
           {Object.entries(specs).map(([key, value]) => (
             <div key={key} className="flex justify-between text-[13px]">
               <span className="text-gray-500">{key}</span>
               <span className="text-gray-900 font-medium">{value}</span>
             </div>
           ))}
        </div>
      </div>

      {/* 7. Description (Enhanced) */}
      <div className="px-4 py-4 border-b border-gray-100">
        <h3 className="text-[14px] font-bold text-gray-900 mb-2">Описание</h3>
        <div className="relative">
          <p className="text-[13px] text-gray-600 leading-relaxed whitespace-pre-line">
            {displayedText}
          </p>
          {shouldTruncate && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[13px] font-bold text-gray-900 mt-2 underline decoration-gray-300 underline-offset-4 active:text-gray-600 transition-colors"
            >
              {isExpanded ? 'Скрий' : 'Още'}
            </button>
          )}
        </div>
      </div>

      {/* 8. More from Seller */}
      <div className="py-4 bg-gray-50/50">
         <div className="flex items-center justify-between px-4 mb-3">
            <h3 className="text-[14px] font-bold text-gray-900">Още от Иван</h3>
            <button className="text-[12px] font-medium text-gray-500">Виж всички</button>
         </div>
         
         <div className="flex overflow-x-auto no-scrollbar px-4 gap-2.5">
            {moreFromSeller.map((item, idx) => (
               <div key={idx} className="w-[130px] flex-shrink-0 bg-white rounded border border-gray-200 overflow-hidden">
                  <div className="aspect-square bg-gray-100 relative">
                     <img src={item.imageUrl} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-2">
                     <p className="font-bold text-gray-900 text-[13px]">{item.price} {item.currency}</p>
                     <p className="text-[11px] text-gray-500 truncate mt-0.5">{item.title}</p>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* 9. Bottom Bar: Compact, No Shadows, 42px height */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50">
        <div className="flex items-center gap-2 px-4 py-2">
          <button className="flex-1 h-[42px] flex items-center justify-center gap-2 rounded border border-gray-300 bg-white text-gray-900 font-bold text-[14px] active:bg-gray-50 transition-colors">
            <MessageCircle className="w-4.5 h-4.5 stroke-[1.5]" />
            Чат
          </button>
          <button className="flex-1 h-[42px] flex items-center justify-center rounded bg-gray-900 text-white font-bold text-[14px] active:opacity-90 transition-opacity">
            Купи сега
          </button>
        </div>
      </div>
    </div>
  );
};
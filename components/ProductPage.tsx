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
  const descriptionText = product.description || `Продавам телефона, защото си взех по-нов модел. Работи перфектно, без драскотини по екрана. Винаги е носен с калъф и протектор.\n\nБатерията е на 89% живот. Идва с оригиналната кутия и кабел за зареждане. Няма iCloud заключване и работи с всички оператори.\n\nМоже да се види и тества на място в София. За страната изпращам с Еконт/Спиди с опция преглед и тест. Бартери не ме интересуват. Цената е крайна.`;
  const TRUNCATE_LENGTH = 150;
  const shouldTruncate = descriptionText.length > TRUNCATE_LENGTH;
  const displayedText = !isExpanded && shouldTruncate 
    ? descriptionText.slice(0, TRUNCATE_LENGTH) + '...' 
    : descriptionText;
  const sellerName = product.seller?.name || "Иван Петров";
  const sellerAvatar = product.seller?.avatarUrl || "https://i.pravatar.cc/150?u=a042581f4e29026024d";

  return (
    <div className="bg-white min-h-screen pb-[70px] font-sans relative z-50">
      
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-zinc-100">
        <div className="pt-safe-top">
          <div className="flex items-center justify-between px-3 h-11">
            <button 
              onClick={onBack}
              className="w-9 h-9 flex items-center justify-center text-zinc-900 active:bg-zinc-100 transition-colors rounded-full"
            >
              <ArrowLeft className="w-5 h-5 stroke-[1.5]" />
            </button>
            
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full overflow-hidden bg-zinc-100 border border-zinc-200">
                    <img src={sellerAvatar} alt={sellerName} className="w-full h-full object-cover" />
                </div>
                <span className="text-[13px] font-bold text-zinc-900">{sellerName}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <button className="w-9 h-9 flex items-center justify-center text-zinc-900 active:bg-zinc-100 transition-colors rounded-full">
                <Share2 className="w-[18px] h-[18px] stroke-[1.5]" />
              </button>
              <button className="w-9 h-9 flex items-center justify-center text-zinc-900 active:bg-zinc-100 transition-colors rounded-full">
                <MoreHorizontal className="w-[18px] h-[18px] stroke-[1.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="relative w-full aspect-square bg-zinc-50 border-b border-zinc-200">
        <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar w-full h-full">
          {images.map((img, idx) => (
            <div key={idx} className="flex-shrink-0 w-full h-full snap-center">
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 px-2 py-1 bg-black/40 backdrop-blur-md rounded-full">
          {images.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-1 h-1 rounded-full ${activeImage === idx ? 'bg-white' : 'bg-white/40'}`} 
            />
          ))}
        </div>
      </div>

      {/* Info Block */}
      <div className="px-4 py-4 border-b border-zinc-100">
        <div className="flex items-start justify-between gap-4">
           <h1 className="text-[16px] leading-snug font-medium text-zinc-900 line-clamp-2">{product.title}</h1>
           <button className="text-zinc-400 active:text-red-500 pt-1">
             <Heart className={`w-5 h-5 stroke-[2] ${product.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
           </button>
        </div>
        
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-[20px] font-bold text-zinc-900 tracking-tight">{product.price}</span>
          <span className="text-[14px] font-semibold text-zinc-900">{product.currency}</span>
        </div>
        
        <div className="mt-2 flex items-center gap-2 text-[12px] text-zinc-500 font-medium">
          <span className="flex items-center gap-1">
             <MapPin className="w-3.5 h-3.5 stroke-[1.5]" /> {product.location}
          </span>
          <span className="w-0.5 h-0.5 bg-zinc-300 rounded-full"></span>
          <span>{product.postedAt}</span>
        </div>
      </div>

      {/* Protection */}
      <div className="px-4 py-3 border-b border-zinc-100 bg-zinc-50/50">
        <div className="flex items-start gap-3">
           <ShieldCheck className="w-5 h-5 text-zinc-800 mt-0.5 stroke-[1.5]" />
           <div>
             <h3 className="text-[13px] font-bold text-zinc-900">Защита на купувача</h3>
             <p className="text-[12px] text-zinc-500 leading-snug mt-0.5">
               Преглед и тест преди плащане. Сигурна доставка.
             </p>
           </div>
        </div>
      </div>

      {/* Seller */}
      <div className="px-4 py-4 border-b border-zinc-100">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200">
             <img src={sellerAvatar} alt="Seller" className="w-full h-full object-cover" />
           </div>
           
           <div className="flex-1 min-w-0">
             <div className="flex items-center gap-1.5">
                <h4 className="text-[14px] font-bold text-zinc-900 truncate">{sellerName}</h4>
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 fill-white" />
             </div>
             <div className="flex items-center gap-1 text-[12px] text-zinc-500">
               <Star className="w-3 h-3 fill-zinc-900 text-zinc-900" />
               <span className="font-bold text-zinc-900">4.9</span>
               <span>(24)</span>
             </div>
           </div>
           
           <button className="text-[12px] font-bold text-zinc-900 border border-zinc-200 px-3 py-1.5 rounded-md bg-white active:bg-zinc-50">
              Виж профила
           </button>
        </div>
      </div>

      {/* Specs */}
      <div className="px-4 py-4 border-b border-zinc-100">
        <h3 className="text-[13px] font-bold text-zinc-900 mb-3 uppercase tracking-wide">Детайли</h3>
        <div className="space-y-2">
           {Object.entries(specs).map(([key, value]) => (
             <div key={key} className="flex justify-between text-[13px]">
               <span className="text-zinc-500">{key}</span>
               <span className="text-zinc-900 font-semibold">{value}</span>
             </div>
           ))}
        </div>
      </div>

      {/* Description */}
      <div className="px-4 py-4 border-b border-zinc-100">
        <h3 className="text-[13px] font-bold text-zinc-900 mb-2 uppercase tracking-wide">Описание</h3>
        <div className="relative">
          <p className="text-[13px] text-zinc-600 leading-relaxed whitespace-pre-line">
            {displayedText}
          </p>
          {shouldTruncate && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[13px] font-bold text-zinc-900 mt-2 underline decoration-zinc-300 underline-offset-4 active:text-zinc-600 transition-colors"
            >
              {isExpanded ? 'Скрий' : 'Още'}
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 pb-safe z-50">
        <div className="flex items-center gap-2 px-4 py-2">
          <button className="flex-1 h-[44px] flex items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white text-zinc-900 font-bold text-[14px] active:bg-zinc-50 transition-colors">
            <MessageCircle className="w-4.5 h-4.5 stroke-[1.5]" />
            Чат
          </button>
          <button className="flex-1 h-[44px] flex items-center justify-center rounded-md bg-zinc-900 text-white font-bold text-[14px] active:opacity-90 transition-opacity">
            Купи сега
          </button>
        </div>
      </div>
    </div>
  );
};
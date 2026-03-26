import React, { useState, useEffect } from "react";

interface FeaturedCardData {
  id: string;
  name: string;
  rating: number;
  type: string;
  location: string;
  website: string;
  featured: boolean;
  programs: string[];
  imageUrls: string[];
  logo?: string;
  secondaryBadge?: string;
  badgeColor?: string;
  title?: string;
}

interface AdmissionFeaturedCardProps {
  card: FeaturedCardData;
  onNavigate: (view: string, data: any) => void;
}

const AdmissionFeaturedCard: React.FC<AdmissionFeaturedCardProps> = ({ card, onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = card.imageUrls.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const moveSlide = (e: React.MouseEvent, direction: number) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + direction + totalSlides) % totalSlides);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm w-full flex flex-col border border-gray-100 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden group/card cursor-pointer"
      onClick={() => onNavigate("collegeDetails", { id: card.id })}
    >
      {/* 1. Compact Image Carousel */}
      <div className="p-2 pb-0">
        <div className="h-[120px] w-full bg-gray-100 overflow-hidden relative rounded-lg group/carousel">
          {/* Badges */}
          <div className="absolute top-2 left-2 z-20 flex flex-col gap-1">
            <span className={`${card.badgeColor || 'bg-blue-600'} text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-sm`}>
              {card.secondaryBadge || 'Featured'}
            </span>
          </div>

          {/* Carousel Track */}
          <div 
            className="flex transition-transform duration-500 ease-out h-full w-full" 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {card.imageUrls.map((img, idx) => (
              <div key={idx} className="w-full h-full shrink-0">
                <img src={img} alt={`${card.name} - ${idx}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Controls */}
          {totalSlides > 1 && (
            <>
              <button
                className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10 focus:outline-none backdrop-blur-sm"
                onClick={(e) => moveSlide(e, -1)}
              >
                <i className="fa-solid fa-chevron-left text-[10px]"></i>
              </button>
              <button
                className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10 focus:outline-none backdrop-blur-sm"
                onClick={(e) => moveSlide(e, 1)}
              >
                <i className="fa-solid fa-chevron-right text-[10px]"></i>
              </button>
            </>
          )}

          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {card.imageUrls.map((_, i) => (
              <div 
                key={i}
                className={`h-[6px] rounded-full transition-all duration-300 ${i === currentSlide ? 'w-[12px] bg-white' : 'w-[6px] bg-white/50'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Compact Content */}
      <div className="p-3.5 flex flex-col flex-grow">
        {/* Header: Logo, Title, Rating */}
        <div className="flex items-start gap-3 mb-3">
          <img 
            src={card.logo || "https://studsphere.com/logo.png"} 
            alt="Logo" 
            className="w-10 h-10 object-contain rounded border border-gray-100 shadow-sm shrink-0 mt-0.5" 
          />
          <div className="flex-grow flex flex-col gap-1.5 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[14px] font-bold text-gray-900 leading-none truncate">{card.name}</span>
              <svg className="w-4 h-4 text-[#0040ff] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
              </svg>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
              <div className="flex items-center gap-1">
                <i className="fa-solid fa-location-dot text-[10px]"></i>
                <span className="truncate">{card.location}</span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1">
                <i className="fa-solid fa-building text-[10px]"></i>
                <span>{card.type}</span>
              </div>
            </div>
          </div>
          {/* Rating */}
          <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded text-[11px] font-bold shrink-0 mt-0.5">
            <i className="fa-solid fa-star text-[10px]"></i>
            {card.rating}
          </div>
        </div>

        {/* Combined Links Row (Website) */}
        <div className="flex items-center justify-between mb-3">
          <span 
            className="flex items-center gap-1.5 text-[12px] text-[#1053F3] font-medium hover:underline cursor-pointer truncate"
            onClick={(e) => { e.stopPropagation(); window.open(`https://${card.website}`, '_blank'); }}
          >
            <i className="fa-solid fa-globe text-[12px]"></i>
            {card.website}
          </span>
          <div className="flex items-center gap-2 relative">
             <i className="fa-brands fa-whatsapp text-green-500 hover:text-green-600 transition-colors cursor-pointer"></i>
             <i className="fa-brands fa-viber text-purple-500 hover:text-purple-600 transition-colors cursor-pointer"></i>
          </div>
        </div>

        {/* Title */}
        {card.title && (
          <h3 className="font-bold text-[14px] text-gray-800 leading-[1.3] mb-3 line-clamp-2 min-h-[36px]">
            {card.title}
          </h3>
        )}

        {/* Programs Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
          {card.programs.map((program, idx) => (
            <span key={idx} className="bg-blue-50/50 text-gray-600 border border-blue-100/50 text-[10px] font-semibold px-2 py-0.5 rounded-sm flex items-center gap-1.5">
              {idx === 0 && (
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                </span>
              )}
              {program}
            </span>
          ))}
        </div>

        {/* Actions Grid */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex flex-col gap-2">
          <button className="w-full bg-[#1053F3] hover:bg-blue-700 text-white text-[13px] font-semibold py-2 rounded-md transition-colors shadow-sm">
            Apply Now
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button className="bg-[#EBF1FF] text-[#1053F3] hover:bg-blue-100 text-[11px] font-semibold py-2 rounded-md transition-colors flex items-center justify-center gap-1.5">
              <i className="fa-solid fa-pen-to-square text-[12px]"></i>
              Mock Test
            </button>
            <button className="bg-[#EBF1FF] text-[#1053F3] hover:bg-blue-100 text-[11px] font-semibold py-2 rounded-md transition-colors flex items-center justify-center gap-1.5">
              <i className="fa-solid fa-user-doctor text-[12px]"></i>
              Counselling
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionFeaturedCard;

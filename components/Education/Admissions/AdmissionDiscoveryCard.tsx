import React, { useState, useEffect } from "react";

interface ProgramInfo {
  name: string;
  status: "Closing Soon" | "Opening Soon" | "Seats Available";
}

interface AdmissionCardData {
  id: string;
  name: string;
  rating: number;
  type: string;
  location: string;
  website: string;
  featured: boolean;
  affiliation: string;
  programs: string[] | ProgramInfo[]; // Support both or normalize
  imageUrls: string[];
  tag?: { text: string; color: string };
}

interface AdmissionDiscoveryCardProps {
  card: AdmissionCardData;
  onNavigate: (view: string, data: any) => void;
}

const AdmissionDiscoveryCard: React.FC<AdmissionDiscoveryCardProps> = ({ card, onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const totalSlides = card.imageUrls.length;

  const moveSlide = (e: React.MouseEvent, direction: number) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + direction + totalSlides) % totalSlides);
  };

  // Status tag mapping or fallback
  const tag = card.tag || (card.featured ? { text: "Featured", color: "bg-[#0d6efd]" } : null);

  // Normalize programs to include status
  const normalizedPrograms: ProgramInfo[] = (card.programs as any[]).map((p) => {
    if (typeof p === "string") {
      return { name: p, status: "Seats Available" };
    }
    return p;
  });

  return (
    <div 
      className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden w-full max-w-[340px] flex flex-col h-full transition-transform hover:shadow-md group/card cursor-pointer font-['Plus_Jakarta_Sans',sans-serif]"
      onClick={() => onNavigate("collegeDetails", { id: card.id })}
    >
      {/* Image Section with Carousel (Hero Area) */}
      <div className="p-2.5 pb-0 shrink-0">
        <div className="relative h-28 w-full bg-gray-200 rounded-[14px] overflow-hidden group/carousel">
          {/* Carousel Track */}
          <div 
            className="flex w-full h-full transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {card.imageUrls.map((img, idx) => (
              <img 
                key={idx}
                src={img} 
                alt={`${card.name} - ${idx}`} 
                className="w-full h-full object-cover flex-shrink-0" 
              />
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

          {/* Dynamic Status Tag */}
          {tag && (
            <div className={`absolute top-2.5 left-0 ${tag.color} text-white text-[10px] font-bold px-2.5 py-1 tracking-wide rounded-r-md z-10 uppercase shadow-sm`}>
              {tag.text}
            </div>
          )}

          {/* Tiny Integrated Text Links */}
          <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1 bg-black/30 backdrop-blur-sm px-1.5 py-0.5 rounded border border-white/10">
            <span className="text-white text-[8px] font-medium tracking-tight opacity-90">Required Counselling?</span>
            <span className="w-[1px] h-2 bg-white/20"></span>
            <span 
              className="text-emerald-300 text-[8px] font-bold tracking-tight cursor-pointer hover:text-emerald-100 transition-colors"
              onClick={(e) => { e.stopPropagation(); /* Handle Reserve Seat */ }}
            >
              Reserve Seat
            </span>
          </div>

          {/* Pagination Dots */}
          {totalSlides > 1 && (
            <div className="absolute bottom-2 right-3 flex items-center gap-1 z-10">
              {card.imageUrls.map((_, i) => (
                <button 
                  key={i}
                  className={`h-[6px] rounded-full shadow-sm transition-all duration-300 focus:outline-none ${i === currentSlide ? 'w-[12px] bg-white' : 'w-[6px] bg-white/50'}`}
                  onClick={(e) => { e.stopPropagation(); setCurrentSlide(i); }}
                ></button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3 pb-3 flex flex-col flex-grow">
        <div className="flex items-center gap-1.5 mb-1">
          <h2 className="text-[#0f172a] text-[18px] font-bold leading-tight truncate">{card.name}</h2>
          <svg className="w-4 h-4 text-[#0d6efd] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
          </svg>
        </div>

        <div className="flex items-center text-[11px] text-[#64748b] mb-1.5 whitespace-nowrap overflow-hidden">
          <div className="flex items-center gap-1 shrink-0">
            <i className="fa-solid fa-star text-[#f59e0b] text-[13px]"></i>
            <span className="font-bold text-[#334155]">{card.rating}</span>
          </div>
          <span className="mx-2 text-gray-300">|</span>
          <div className="flex items-center gap-1.5 shrink-0">
            <i className="fa-solid fa-building text-[14px]"></i>
            <span>{card.type}</span>
          </div>
          <span className="mx-2 text-gray-300">|</span>
          <div className="flex items-center gap-1.5 truncate">
            <i className="fa-solid fa-location-dot text-[14px] flex-shrink-0"></i>
            <span className="truncate">{card.location.split(',')[0]}</span>
          </div>
        </div>

        <div 
          className="flex items-center gap-1.5 text-[12px] text-[#64748b] mb-2 hover:text-[#0d6efd] transition-colors cursor-pointer w-fit truncate"
          onClick={(e) => { e.stopPropagation(); window.open(`https://${card.website}`, '_blank'); }}
        >
          <i className="fa-solid fa-globe text-[14px]"></i>
          <span className="truncate">{card.website}</span>
        </div>

        <hr className="border-gray-100 mb-2" />

        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[12px] font-medium text-[#64748b]">Programs Offered</span>
          <span className="text-[12px] font-semibold text-[#2563eb]">Admission Open</span>
        </div>

        <ul className="space-y-1 mb-2">
          {normalizedPrograms.slice(0, 3).map((prog, idx) => (
            <li key={idx} className="flex justify-between items-center text-[12px]">
              <span className="font-semibold text-[#1e293b] truncate mr-2">{prog.name}</span>
              <div className={`flex items-center gap-1.5 font-medium text-[10px] shrink-0 ${prog.status === 'Closing Soon' ? 'text-[#ef4444]' : 'text-[#059669]'}`}>
                <span className="relative flex h-2 w-2 justify-center items-center">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${prog.status === 'Closing Soon' ? 'bg-[#ef4444]' : 'bg-[#059669]'}`}></span>
                  <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${prog.status === 'Closing Soon' ? 'bg-[#ef4444]' : 'bg-[#059669]'}`}></span>
                </span>
                {prog.status}
              </div>
            </li>
          ))}
        </ul>

        <a href="#" className="inline-flex items-center gap-1 text-[#2563eb] text-[12px] font-semibold hover:underline mb-2">
          30+ programs <i className="fa-solid fa-chevron-right text-[8px] mt-0.5"></i>
        </a>

        {/* Custom utility for the fine dotted line separator */}
        <div className="border-b-[1.5px] border-dotted border-gray-200 mt-auto mb-3 w-full pt-2"></div>

        <div className="flex items-center gap-1.5 mb-2">
          <button className="flex-1 py-1.5 px-2 bg-gray-50 text-[#334155] hover:bg-gray-100 border border-gray-200 rounded-md text-[10px] font-semibold transition-colors flex justify-center items-center gap-1 whitespace-nowrap">
            <i className="fa-solid fa-pen-to-square text-[12px]"></i>
            Mock Test
          </button>
          <button className="flex-1 py-1.5 px-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-100 rounded-md text-[10px] font-semibold transition-colors flex justify-center items-center gap-1 whitespace-nowrap">
            <i className="fa-solid fa-comment-dots text-[12px]"></i>
            Ask Question
          </button>
        </div>
        
        <div className="flex items-center gap-1.5">
          <button className="flex-1 py-2 px-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-md text-[12px] font-bold transition-colors shadow-sm">
            Apply Now
          </button>
          <button 
            className={`flex-none w-9 h-9 flex items-center justify-center border rounded-md transition-colors ${isFavorited ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 text-[#64748b] hover:bg-gray-50'}`}
            onClick={(e) => { e.stopPropagation(); setIsFavorited(!isFavorited); }}
          >
            <i className={`fa-heart text-[16px] ${isFavorited ? 'fa-solid' : 'fa-regular'}`}></i>
          </button>
        </div>
      </div>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
};

export default AdmissionDiscoveryCard;

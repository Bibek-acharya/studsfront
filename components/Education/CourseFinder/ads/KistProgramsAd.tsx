import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, GraduationCap, MapPin, Clock } from "lucide-react";

export const KistProgramsAd: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 306; // 290 width + 16 gap
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollCarousel = (direction: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const jumpToCard = (index: number) => {
    if (carouselRef.current) {
      const allCards = carouselRef.current.querySelectorAll('.snap-center');
      if (allCards[index]) {
        const card = allCards[index] as HTMLElement;
        const scrollPos = card.offsetLeft - (carouselRef.current.clientWidth / 2) + (card.clientWidth / 2);
        carouselRef.current.scrollTo({ left: scrollPos, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        let newIndex = 0;
        let minDistance = Infinity;
        const carousel = carouselRef.current;
        const carouselCenter = carousel.scrollLeft + (carousel.clientWidth / 2);
        const allCards = carousel.querySelectorAll('.snap-center');

        allCards.forEach((card, index) => {
          const c = card as HTMLElement;
          const cardCenter = c.offsetLeft + (c.clientWidth / 2);
          const distance = Math.abs(carouselCenter - cardCenter);
          if (distance < minDistance) {
            minDistance = distance;
            newIndex = index;
          }
        });
        setActiveIndex(newIndex);
      }
    };
    
    const el = carouselRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const companies = [
    { 
      name: "Leapfrog", 
      bgColor: "bg-white",
      logo: "https://www.lftechnology.com/images/lf-logo.svg" 
    },
    { 
      name: "Leapfrog Connect", 
      bgColor: "bg-[#0b1b3d]", 
      logo: "https://leapfrogconnect.co/svg/header_logo.svg" 
    },
    { 
      name: "Softnep", 
      bgColor: "bg-white", 
      logo: "https://www.softnep.com/themes/softnep/images/logo.webp" 
    },
    { 
      name: "F1Soft", 
      bgColor: "bg-black", 
      isText: true, textHtml: <span className="font-bold text-[10px] text-white tracking-widest">F1<span className="text-orange-500">.</span></span> 
    },
    { 
      name: "Techbit", 
      bgColor: "bg-white", 
      isText: true, textHtml: <span className="font-medium text-[9px] text-gray-800">techbit</span> 
    },
    { 
      name: "InfoDevs", 
      bgColor: "bg-white", 
      isText: true, textHtml: <span className="font-bold text-[12px] text-purple-700 italic">ID</span> 
    }
  ];

  const cards = [
    { title: "BIT in KIST College", subtitle: "Best college for the IT enthusiasts", rating: "4.8/5", uni: "Purbanchal Univ", duration: "4 Years (8 Sem)", loc: "Kamalpokhari" },
    { title: "BCA in KIST College", subtitle: "Top choice for future developers", rating: "4.7/5", uni: "Purbanchal Univ", duration: "4 Years (8 Sem)", loc: "Kamalpokhari" },
    { title: "BBA in KIST College", subtitle: "Leading business management", rating: "4.9/5", uni: "Purbanchal Univ", duration: "4 Years (8 Sem)", loc: "Kamalpokhari" },
    { title: "BIM in KIST College", subtitle: "Information Management", rating: "4.6/5", uni: "Tribhuvan Univ", duration: "4 Years (8 Sem)", loc: "Kamalpokhari" },
    { title: "BBM in KIST College", subtitle: "Business Management", rating: "4.8/5", uni: "Tribhuvan Univ", duration: "4 Years (8 Sem)", loc: "Kamalpokhari" },
  ];

  return (
    <div className="w-full bg-[#ebfbf1] border border-[#c6f6d5] rounded-[28px] p-5 shadow-sm flex flex-col items-center mb-8">
      
      <div className="w-full max-w-[902px] flex items-center justify-between xl:-ml-6 mb-4">
        <div>
          <h2 className="text-[22px] font-bold text-green-900 tracking-tight leading-snug">Best bachelor degree</h2>
          <p className="text-[13px] text-green-700 font-medium">on best colleges</p>
        </div>
        
        <div className="hidden sm:flex items-center gap-2">
          <button 
            onClick={() => scrollCarousel(-1)} 
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={() => scrollCarousel(1)} 
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div 
        ref={carouselRef} 
        className="w-full max-w-[902px] xl:-ml-6 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 justify-start items-stretch [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {cards.map((c, i) => (
          <div key={i} className="w-[290px] flex-shrink-0 bg-white rounded-[16px] shadow-sm border border-gray-100 p-4 relative snap-center flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex justify-between items-start mb-3 gap-2">
                <div>
                  <h2 className="text-[17px] font-bold text-gray-900 leading-tight tracking-tight mb-0.5">{c.title}</h2>
                  <p className="text-[12px] font-normal text-slate-500">{c.subtitle}</p>
                </div>
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-white rounded-[6px] p-1 border border-gray-100 shadow-sm">
                  <img src="https://kist.edu.np/resources/assets/img/logo_small.jpg" alt="KIST Logo" className="w-full object-contain rounded-[4px]" />
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-gray-200 rounded-full text-[11px] font-medium text-slate-700">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {c.rating}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 bg-white border border-gray-200 rounded-full text-[11px] font-medium text-slate-700">
                  {c.uni}
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-[12px] text-slate-600 mb-3">
                <div className="flex items-center gap-1 flex-shrink-0">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span className="whitespace-nowrap">{c.duration}</span>
                </div>
                <div className="flex items-center gap-1 truncate">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{c.loc}</span>
                </div>
              </div>
            </div>

            <div>
              <hr className="border-gray-100 mb-3" />
              <div>
                <p className="text-[11px] font-medium text-slate-500 mb-1.5 uppercase tracking-wider">MOU Companies</p>
                <div className="flex flex-wrap items-center gap-1.5 pb-0.5">
                  {companies.map((comp, idx) => (
                    <div key={idx} className={`group relative flex-shrink-0 w-8 h-[28px] rounded-[4px] border border-gray-200 flex items-center justify-center cursor-pointer ${comp.bgColor}`}>
                      {comp.isText ? comp.textHtml : <img src={comp.logo} alt={comp.name} className="w-full h-full object-contain p-1" />}
                      <div className="absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-center pointer-events-none z-50">
                        <div className="bg-gray-800 text-white text-[10px] font-medium px-2 py-0.5 rounded-[4px] whitespace-nowrap shadow-sm">
                          {comp.name}
                        </div>
                        <div className="w-1.5 h-1.5 bg-gray-800 transform rotate-45 -mt-[3px]"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-4 w-full max-w-[902px] xl:-ml-6">
        <div className="flex items-center gap-2">
          {cards.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => jumpToCard(idx)}
              className={`rounded-full transition-all duration-300 outline-none ${activeIndex === idx ? 'bg-blue-600 w-5 h-1.5' : 'bg-gray-300 hover:bg-gray-400 w-1.5 h-1.5'}`} 
            />
          ))}
        </div>
      </div>

    </div>
  );
};

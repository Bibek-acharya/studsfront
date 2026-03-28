import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Bookmark, Star, GraduationCap, MapPin, Clock } from "lucide-react";

export const CourseCarouselAd: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 300;
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
      carouselRef.current.scrollTo({
        left: index * scrollAmount,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const scrollPos = carouselRef.current.scrollLeft;
        const index = Math.round(scrollPos / scrollAmount);
        setActiveIndex(index);
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

  const cards = [
    {
      title: "BSc. CSIT",
      subtitle: "Highly sought-after core computing degree.",
      rating: "4.8+",
      uni: "Tribhuvan University",
      level: "Bachelor's Degree",
      location: "Kathmandu",
      duration: "4 Years (8 Semesters)",
      logos: [
        { name: "KIST College", src: "https://kist.edu.np/resources/assets/img/logo_small.jpg" },
        { name: "Trinity College", src: "https://www.trinity.edu.np/assets/backend/uploads/Logo/trinity%20college%20logo.jpg" },
        { name: "Advance College", src: "https://advancefoundation.edu.np/public/assets/img/logo.jpg" }
      ]
    },
    {
      title: "BCA",
      subtitle: "Application development and software engineering.",
      rating: "4.5+",
      uni: "Pokhara University",
      level: "Bachelor's Degree",
      location: "Pokhara / Ktm",
      duration: "4 Years (8 Semesters)",
      logos: [
        { name: "KIST College", src: "https://kist.edu.np/resources/assets/img/logo_small.jpg" },
        { name: "Trinity College", src: "https://www.trinity.edu.np/assets/backend/uploads/Logo/trinity%20college%20logo.jpg" },
        { name: "Advance College", src: "https://advancefoundation.edu.np/public/assets/img/logo.jpg" }
      ]
    },
    {
      title: "BIT",
      subtitle: "Information technology and network systems.",
      rating: "4.6+",
      uni: "Purbanchal University",
      level: "Bachelor's Degree",
      location: "Biratnagar",
      duration: "4 Years (8 Semesters)",
      logos: [
        { name: "KIST College", src: "https://kist.edu.np/resources/assets/img/logo_small.jpg" },
        { name: "Advance College", src: "https://advancefoundation.edu.np/public/assets/img/logo.jpg" },
        { name: "Trinity College", src: "https://www.trinity.edu.np/assets/backend/uploads/Logo/trinity%20college%20logo.jpg" }
      ]
    },
    {
      title: "BBA",
      subtitle: "Bachelor of Business Administration programs.",
      rating: "4.7+",
      uni: "Tribhuvan University",
      level: "Bachelor's Degree",
      location: "Kathmandu",
      duration: "4 Years (8 Semesters)",
      logos: [
        { name: "Trinity College", src: "https://www.trinity.edu.np/assets/backend/uploads/Logo/trinity%20college%20logo.jpg" },
        { name: "KIST College", src: "https://kist.edu.np/resources/assets/img/logo_small.jpg" },
        { name: "Advance College", src: "https://advancefoundation.edu.np/public/assets/img/logo.jpg" }
      ]
    },
    {
      title: "BIM",
      subtitle: "Bachelor of Information Management programs.",
      rating: "4.4+",
      uni: "Tribhuvan University",
      level: "Bachelor's Degree",
      location: "Kathmandu",
      duration: "4 Years (8 Semesters)",
      logos: [
         { name: "KIST College", src: "https://kist.edu.np/resources/assets/img/logo_small.jpg" },
         { name: "Trinity College", src: "https://www.trinity.edu.np/assets/backend/uploads/Logo/trinity%20college%20logo.jpg" },
         { name: "Advance College", src: "https://advancefoundation.edu.np/public/assets/img/logo.jpg" }
      ]
    }
  ];

  return (
    <div className="w-full bg-blue-600 rounded-3xl p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,255,0.2)] mb-8 font-sans">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-[26px] font-extrabold text-white tracking-tight">Courses within different colleges</h2>
        <div className="flex gap-3">
          <button 
            onClick={() => scrollCarousel(-1)}
            className="w-11 h-11 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-lg hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all outline-none"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <button 
            onClick={() => scrollCarousel(1)}
            className="w-11 h-11 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-lg hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all outline-none"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div 
          ref={carouselRef}
          className="flex gap-5 overflow-x-auto pb-3 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {cards.map((card, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-5 min-w-[260px] max-w-[280px] shrink-0 snap-start shadow-sm border border-gray-100 flex flex-col relative transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center hover:bg-blue-100 transition-colors">
                <Bookmark className="w-4 h-4" />
              </button>
              
              <h3 className="text-[17px] font-bold text-slate-800 mb-1 pr-10">{card.title}</h3>
              <p className="text-[13px] text-slate-500 leading-snug line-clamp-2 min-h-[36px]">{card.subtitle}</p>
              
              <div className="flex gap-2 mt-3">
                <div className="px-2.5 py-1 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {card.rating}
                </div>
                <div className="px-2.5 py-1 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 truncate max-w-[140px]">
                  {card.uni}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-4 text-xs font-medium text-slate-600">
                <div className="flex items-center gap-1.5 truncate">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  {card.level}
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  {card.location}
                </div>
                <div className="col-span-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  {card.duration}
                </div>
              </div>

              <div className="h-px bg-slate-100 my-4 w-full" />

              <div className="mt-auto">
                <p className="text-xs font-semibold text-slate-500 mb-2">Available at top colleges:</p>
                <div className="flex gap-1 flex-wrap">
                  {card.logos.map((logo, lIdx) => (
                    <div key={lIdx} className="w-7 h-7 rounded-md border border-slate-100 p-[3px] flex items-center justify-center bg-white cursor-pointer relative group">
                      <img src={logo.src} alt={logo.name} className="max-w-full max-h-full object-contain opacity-85 group-hover:opacity-100" />
                      <div className="absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-lg">
                        {logo.name}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-slate-800"></div>
                      </div>
                    </div>
                  ))}
                  {/* Fake UI Avatar for rest */}
                  <div className="w-7 h-7 rounded-md border border-slate-100 p-[3px] flex items-center justify-center bg-white cursor-pointer relative group">
                    <img src="https://ui-avatars.com/api/?name=NC&background=f1f5f9&color=64748b&bold=true&size=64" alt="National College" className="max-w-full max-h-full opacity-85 group-hover:opacity-100 rounded-md" />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 mt-6">
        {cards.map((_, idx) => (
          <div 
            key={idx}
            onClick={() => jumpToCard(idx)}
            className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${activeIndex === idx ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </div>
    </div>
  );
};

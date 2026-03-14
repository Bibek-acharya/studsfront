import React, { useState, useEffect } from "react";

const HeroSection = ({ onNavigate }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1380&q=80",
      alt: "College Campus 1",
      collegeLabel: "kist.edu.np",
      collegeSearch: "KIST College",
      collegeHref: "https://kist.edu.np",
    },
    {
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1380&q=80",
      alt: "College Campus 2",
      collegeLabel: "trinity.edu.np",
      collegeSearch: "Trinity International College",
      collegeHref: "https://trinity.edu.np",
    },
    {
      image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1380&q=80",
      alt: "Library",
      collegeLabel: "sxj.edu.np",
      collegeSearch: "St. Xavier's College",
      collegeHref: "https://sxj.edu.np",
    },
    {
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1380&q=80",
      alt: "Graduation",
      collegeLabel: "kcm.edu.np",
      collegeSearch: "Kathmandu College of Management",
      collegeHref: "https://kcm.edu.np",
    },
    {
      image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1380&q=80",
      alt: "Students",
      collegeLabel: "goldengate.edu.np",
      collegeSearch: "GoldenGate International College",
      collegeHref: "https://goldengate.edu.np",
    }
  ];

  const activeSlide = heroSlides[currentSlide];

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide(prev => (prev + 1) % heroSlides.length), 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  return (
    <main className="max-w-[1400px] w-full h-[580px] mx-auto relative overflow-hidden mt-6 rounded-[20px] shadow-lg group">
      <div
        id="slider-track"
        className="absolute inset-0 flex w-full h-full slider-track"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {heroSlides.map((slide, index) => (
          <div key={index} className="w-full h-full shrink-0 relative">
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6">
        <h1 className="text-[52px] font-bold text-white mb-4 tracking-tight shadow-sm text-center">
          Find Your Perfect College
        </h1>
        <p className="text-[17px] text-white/90 max-w-[800px] text-center mb-10 leading-relaxed font-medium">
          Discover and compare colleges with our free search tool. Get insights
          on admissions, programs, and student reviews to build your ideal
          college list.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onNavigate("findCollege", { search: searchTerm });
          }}
          className="w-full max-w-[700px] bg-white rounded-2xl p-2 flex items-center shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex-1 flex items-center px-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by college name,location & program..........."
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-[15px] h-10"
            />
          </div>
          <button
            type="submit"
            className="bg-[#4965F6] hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
          >
            Search
          </button>
        </form>

        <div className="mt-6 flex items-center space-x-4 text-[14px]">
          <span className="text-white font-semibold">Your recent visit :</span>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => onNavigate("findCollege", { search: "BIT" })}
              className="text-white/90 hover:text-white transition-colors"
            >
              BIT Colleges
            </button>
            <button
              type="button"
              onClick={() => onNavigate("collegeRecommender")}
              className="text-white/90 hover:text-white transition-colors"
            >
              college Predictor
            </button>
            <button
              type="button"
              onClick={() => onNavigate("scholarshipFinder")}
              className="text-white/90 hover:text-white transition-colors"
            >
              Scholarship
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex justify-between items-center px-8 z-20">
        <div className="w-40 hidden md:block" />

        <div className="flex space-x-2 items-center justify-center">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              className={
                currentSlide === index
                  ? "slider-dot w-3 h-3 rounded-full bg-[#4965F6] transition-all duration-300"
                  : "slider-dot w-2 h-2 rounded-full bg-white/60 hover:bg-white/90 transition-all duration-300"
              }
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        <a
          href={activeSlide.collegeHref}
          target="_blank"
          rel="noreferrer"
          className="w-40 flex justify-end"
        >
          <span className="bg-white hover:bg-gray-50 text-[#4965F6] px-5 py-2.5 rounded-full flex items-center shadow-md transition-colors text-sm font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            {activeSlide.collegeLabel}
          </span>
        </a>
      </div>
    </main>
  );
};

export default HeroSection;
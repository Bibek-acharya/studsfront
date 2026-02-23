import React, { useState } from "react";

interface HeroProps {
  onUploadClick: () => void;
  onBrowseClick: () => void;
}

const ResourcesHero: React.FC<HeroProps> = ({
  onUploadClick,
  onBrowseClick,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
    }
  };

  return (
    <section className="relative w-full overflow-hidden min-h-[450px] flex items-center pt-16">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2940&auto=format&fit=crop"
          alt="Study Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Transparent Blue Overlay with Curve */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="rgba(37, 99, 235, 0.82)"
            d="M0,0 L0,600 L1200,1300 Q1100,1200 1200,800 Q1000,0 500,0 Z"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12 w-full animate-fadeInUp">
        <div className="max-w-3xl">
          <div className="inline-block px-4 py-1 mb-4 text-[10px] font-black tracking-[0.2em] uppercase bg-white/10 rounded-full backdrop-blur-md border border-white/20 text-blue-300">
            <i className="fa-solid fa-rocket mr-2 text-amber-400"></i> The #1
            Student Knowledge Hub
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight tracking-tighter uppercase">
            Elevate Your <br />
            <span className="text-white">Preparation</span>
          </h1>

          <p className="text-base md:text-lg text-white/90 mb-8 max-w-2xl font-medium leading-relaxed">
            Access verified handwritten notes, summaries, and past question
            solutions from TU, KU, and NEB shared by high-performing students.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="relative max-w-2xl mb-6 group"
          >
            <div className="flex items-center bg-white rounded-full shadow-2xl overflow-hidden p-1 border border-white/20">
              <div className="pl-5 text-slate-400">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes, subjects, or keywords..."
                className="flex-1 py-4 px-4 text-slate-800 text-lg border-0 outline-none placeholder-slate-400 font-bold"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 font-black rounded-full transition-all active:scale-95 uppercase tracking-widest text-[10px]"
              >
                Search
              </button>
            </div>
          </form>

          {/* Hero Actions */}
          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={onBrowseClick}
              className="px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 rounded-full font-black text-[10px] uppercase tracking-widest transition-all shadow-xl active:scale-95 border border-white/20"
            >
              Browse Materials
            </button>
            <button
              onClick={onUploadClick}
              className="px-8 py-4 bg-blue-600/20 backdrop-blur-md border border-blue-500/30 text-white rounded-full font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-3 shadow-xl active:scale-95 group/btn"
            >
              <i className="fa-solid fa-cloud-arrow-up text-blue-400"></i>{" "}
              Upload & Get Points
            </button>
          </div>
        </div>
      </div>

      {/* Stats Chip */}
      <div className="absolute bottom-12 right-12 z-20 hidden lg:block">
        <div className="bg-white/10 backdrop-blur-xl px-8 py-6 rounded-3xl shadow-2xl border border-white/20 animate-fadeIn text-center">
          <div className="flex flex-col items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shadow-xl">
              <i className="fa-solid fa-check-double text-2xl"></i>
            </div>
            <div>
              <div className="text-[10px] text-blue-200 font-black uppercase tracking-widest opacity-60">
                Active Today
              </div>
              <div className="text-3xl font-black text-white leading-none mt-1">
                156 Uploads
              </div>
              <div className="text-sm font-bold text-blue-100 opacity-80 mt-1 flex items-center justify-center gap-2">
                <i className="fa-solid fa-download text-xs"></i>
                5.2k Downloads
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesHero;

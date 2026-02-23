import React, { useState } from "react";

const AdmissionsHero: React.FC = () => {
  const [query, setQuery] = useState("");

  return (
    <section className="relative w-full overflow-hidden min-h-[550px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000&auto=format&fit=crop"
          alt="Admissions Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Curved Blue Overlay */}
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
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 w-full animate-fadeInUp -translate-y-[50px]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black uppercase tracking-widest mb-8 shadow-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            2025 Intake Active Now
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tighter">
            Discover Top <br />
            <span className="text-white">College Admissions</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl font-medium leading-relaxed">
            Real-time enrollment updates from Nepal's premier institutions. Find
            ongoing admissions, application forms, and scholarships in one
            place.
          </p>

          {/* Search Bar */}
          <form
            className="relative max-w-2xl mb-8 group"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex items-center bg-white rounded-full shadow-2xl overflow-hidden p-1.5 border border-white/20">
              <div className="pl-6 text-slate-400">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find colleges opening for BBA, CSIT, MBBS..."
                className="flex-1 py-4 px-4 text-slate-800 text-lg border-0 outline-none placeholder-slate-400 font-bold"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 font-black rounded-full transition-all active:scale-95 uppercase tracking-widest text-xs"
              >
                Explore
              </button>
            </div>
          </form>

          {/* Popular Filters */}
          <div className="flex flex-wrap items-center gap-6 text-white/80">
            <span className="text-xs font-black uppercase tracking-widest opacity-60">
              Closing Soon:
            </span>
            <button className="text-sm font-bold border-b border-white/20 hover:border-white transition-colors">
              IOE Pulchowk
            </button>
            <button className="text-sm font-bold border-b border-white/20 hover:border-white transition-colors">
              CMAT Regular
            </button>
            <button className="text-sm font-bold border-b border-white/20 hover:border-white transition-colors">
              CEE Scholarship
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[82px] right-8 z-20">
        <div className="bg-white/95 backdrop-blur-md px-6 py-2.5 rounded-full shadow-2xl border border-white/50 flex items-center gap-3 animate-fadeIn">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-black text-blue-600 uppercase tracking-widest">
            admissions-live.ss
          </span>
        </div>
      </div>
    </section>
  );
};

export default AdmissionsHero;

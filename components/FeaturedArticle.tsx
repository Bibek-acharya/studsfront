import React from "react";

interface FeaturedArticleProps {
  onNavigate?: (view: any, data?: any) => void;
}

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white py-16 md:py-24 border-t border-slate-100">
      <main className="w-full px-6 lg:px-12 relative z-20">
        <article
          onClick={() => onNavigate?.("blogDetails", { id: "1" })}
          className="group cursor-pointer relative overflow-hidden rounded-xl p-1 bg-gradient-to-br from-blue-500/10 to-transparent"
        >
          <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center p-6 md:p-8">
            {/* Image Side */}
            <div className="md:w-1/2 w-full relative">
              <div className="overflow-hidden rounded-lg shadow-2xl h-[250px] sm:h-[350px] md:h-[450px]">
                <div className="absolute top-4 left-4 z-10 bg-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                  Featured
                </div>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                  alt="Office collaboration"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
            </div>
            {/* Content Side */}
            <div className="md:w-1/2 flex flex-col justify-center">
              <div className="flex items-center text-sm text-gray-500 mb-6 space-x-6">
                <span className="flex items-center font-bold text-[10px] uppercase tracking-widest">
                  <i className="far fa-clock mr-2 text-blue-500"></i> January
                  22, 2025
                </span>
                <span className="flex items-center font-bold text-[10px] uppercase tracking-widest">
                  <i className="fas fa-map-marker-alt mr-2 text-blue-500"></i>{" "}
                  Kathmandu, Nepal
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                Elevate Your Career Today: Strategies for 2025
              </h2>
              <p className="text-slate-500 mb-8 leading-relaxed text-lg md:text-xl font-medium">
                Discover the cutting-edge techniques that are reshaping career
                growth. From AI-driven resumes to remote networking adaptation,
                stay ahead of the curve with our expert guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20 flex items-center gap-3 justify-center active:scale-95">
                  Read Article{" "}
                  <i className="fas fa-arrow-right text-[10px]"></i>
                </button>
                <button className="px-10 py-4 border-2 border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-3 justify-center active:scale-95">
                  Case Studies
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Pagination/Scroll Dots */}
        <div className="flex justify-center gap-3 mt-12">
          <span className="w-10 h-2 rounded-full bg-blue-600 cursor-pointer shadow-lg shadow-blue-500/30"></span>
          <span className="w-2 h-2 rounded-full bg-slate-300 cursor-pointer hover:bg-slate-400 transition-all"></span>
          <span className="w-2 h-2 rounded-full bg-slate-300 cursor-pointer hover:bg-slate-400 transition-all"></span>
        </div>
      </main>
    </div>
  );
};

export default FeaturedArticle;

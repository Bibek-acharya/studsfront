
import React from 'react';

const Founders: React.FC = () => {
  return (
    <section className="mb-20 md:mb-32 w-full max-w-7xl px-2 md:px-6 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 md:mb-12 text-center">How it started</h2>
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative">
        
        {/* Santosh (Desktop) */}
        <div className="hidden md:flex flex-col items-center order-1 mt-[-40px] animate-float">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" alt="Santosh" className="w-[90px] h-[90px] rounded-full object-cover border-4 border-white shadow-lg z-10" />
          <div className="relative mt-[-20px] z-20 px-4 py-1 rounded-full text-white text-center font-semibold min-w-[110px] text-sm shadow-md bg-[#0A61EF]">Santosh</div>
        </div>

        {/* Text Content */}
        <div className="max-w-xl text-center text-slate-600 leading-relaxed space-y-6 order-2 px-4">
          <p className="text-base md:text-lg"><span className="font-bold text-blue-600">StudSphere</span> is a youth-driven platform dedicated to empowering students across Nepal by providing them with the right guidance, opportunities, and pathways to shape their future.</p>
          <p className="text-base md:text-lg">Through mentorship and resources, we aim to bridge the gap between academic learning and real-world application, ensuring every student has the tools they need to succeed.</p>
        </div>

        {/* Jagdish (Desktop) */}
        <div className="hidden md:flex flex-col items-center order-3 mt-[-40px] animate-float" style={{ animationDelay: '1s' }}>
          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" alt="Jagdish" className="w-[90px] h-[90px] rounded-full object-cover border-4 border-white shadow-lg z-10" />
          <div className="relative mt-[-20px] z-20 px-4 py-1 rounded-full text-white text-center font-semibold min-w-[110px] text-sm shadow-md bg-[#8476F1]">Jagdish</div>
        </div>
      </div>

      {/* Mobile Founders Display */}
      <div className="flex md:hidden flex-wrap justify-center gap-8 mt-10">
        <div className="flex flex-col items-center animate-float">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" alt="Santosh" className="w-[80px] h-[80px] rounded-full object-cover border-4 border-white shadow-lg z-10" />
          <div className="relative mt-[-15px] z-20 px-3 py-1 rounded-full text-white text-center font-semibold min-w-[90px] text-xs shadow-md bg-[#0A61EF]">Santosh</div>
        </div>
        <div className="flex flex-col items-center animate-float" style={{ animationDelay: '1s' }}>
          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" alt="Jagdish" className="w-[80px] h-[80px] rounded-full object-cover border-4 border-white shadow-lg z-10" />
          <div className="relative mt-[-15px] z-20 px-3 py-1 rounded-full text-white text-center font-semibold min-w-[90px] text-xs shadow-md bg-[#8476F1]">Jagdish</div>
        </div>
      </div>
      
      {/* Badal (Bottom Founder) */}
      <div className="flex flex-col items-center mt-8 md:mt-12 animate-float" style={{ animationDelay: '2s' }}>
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80" alt="Badal" className="w-[80px] h-[80px] md:w-[90px] md:h-[90px] rounded-full object-cover border-4 border-white shadow-lg z-10" />
        <div className="relative mt-[-15px] md:mt-[-20px] z-20 px-4 py-1 rounded-full text-white text-center font-semibold min-w-[100px] md:min-w-[110px] text-xs md:text-sm shadow-md bg-[#EEAE85]">Badal</div>
      </div>
    </section>
  );
};

export default Founders;

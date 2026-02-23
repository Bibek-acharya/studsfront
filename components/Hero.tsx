import React from "react";
import BridgeIllustration from "./BridgeIllustration";

interface HeroProps {
  onStart?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative w-full h-screen min-h-[700px] overflow-hidden flex flex-col justify-start items-center bg-slate-900">
      {/* Text Content Layer */}
      <div className="relative z-10 text-center px-4 mt-[15vh] md:mt-[20vh] animate-fadeInDown">
        <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg leading-tight max-w-4xl mx-auto font-jakarta">
          Connecting You to Your Future
        </h1>
        <p className="text-base sm:text-lg md:text-2xl text-blue-300 font-medium max-w-2xl mx-auto drop-shadow-md px-4 opacity-90">
          Bridging the Skill Gap between your academic life and your dream
          career
        </p>

        <button
          onClick={onStart}
          className="mt-8 md:mt-10 px-8 md:px-10 py-3 md:py-4 bg-blue-500 hover:bg-blue-400 text-white font-extrabold rounded-lg transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] active:scale-95 shadow-xl text-sm md:text-base uppercase tracking-widest"
        >
          Start Exploring
        </button>
      </div>

      {/* Illustration Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <BridgeIllustration />
      </div>
    </div>
  );
};

export default Hero;

import React from "react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SudsphereBannerAd: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginNav = () => {
    navigate("/login");
  };

  return (
    <div 
      className="relative w-full rounded-2xl overflow-hidden flex items-center shadow-lg mb-8"
      style={{
        backgroundColor: "#0b71d1",
        backgroundImage: `
          radial-gradient(circle at 5% 150%, rgba(20, 160, 255, 0.3) 0%, transparent 40%),
          radial-gradient(circle at 80% 150%, rgba(0, 80, 180, 0.3) 0%, transparent 50%)
        `
      }}
    >
      
      {/* Background Decorations */}
      <div className="border border-white/15 rounded-full absolute pointer-events-none w-[300px] h-[300px] -top-[150px] right-[10%]"></div>
      <div className="border-[0.5px] border-white/15 rounded-full absolute pointer-events-none w-[400px] h-[400px] -top-[200px] right-[5%]"></div>
      <div className="absolute bottom-0 left-0 w-[40%] h-[150%] bg-[#128cf4] opacity-20 rounded-tr-full mix-blend-screen pointer-events-none transform -translate-x-10 translate-y-20"></div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 py-10 md:px-16 flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="text-center md:text-left flex-1">
          <h1 className="text-white text-3xl md:text-[36px] font-extrabold leading-[1.2] tracking-tight">
            Empower your career with<br />Studsphere today
          </h1>
        </div>

        <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            
            {/* Google Button */}
            <button 
              onClick={handleLoginNav} 
              className="flex items-center justify-center gap-3 bg-white text-[#333333] font-bold px-6 py-3 rounded-md shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200 min-w-[240px]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            {/* Email Button */}
            <button 
              onClick={handleLoginNav} 
              className="flex items-center justify-center gap-3 bg-[#0c519d] text-white font-bold px-6 py-3 rounded-md shadow-sm hover:bg-[#0a4485] hover:shadow-md transition-all duration-200 border border-[#0d5ba6] min-w-[240px]"
            >
              <Mail className="w-5 h-5 text-white" />
              Continue with Email
            </button>

          </div>

          <p className="text-white/85 text-xs md:text-sm mt-1 font-medium">
            By continuing, you agree to our <button onClick={() => {}} className="underline hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 inline">T&C.</button>
          </p>

        </div>
      </div>
    </div>
  );
};

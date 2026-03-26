import React from "react";

interface DirectAdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  {
    icon: "https://i.pinimg.com/1200x/8d/94/a9/8d94a9ab7d4cae915dcecd7cfe10484d.jpg",
    title: "1. Create Profile",
    desc: "Build your academic profile in minutes by entering your SEE/+2 results, preferred faculty, and location. No complex paperwork required."
  },
  {
    icon: "https://i.pinimg.com/1200x/77/26/ec/7726ecf44da329c20c215fca1982a5f9.jpg",
    title: "2. Get Matched",
    desc: "Our smart system instantly connects you with colleges and programs where you are eligible for direct admission based on your marks, stream, and preferences."
  },
  {
    icon: "https://i.pinimg.com/1200x/6b/14/ee/6b14ee22b8589497cd6cfcba2420af7f.jpg",
    title: "3. Compare & Choose",
    desc: "Explore matched colleges, compare fees, facilities, scholarships, and locations — then choose the program that fits you best."
  },
  {
    icon: "https://i.pinimg.com/1200x/f9/90/34/f99034c1ff77e20f8b97347bf96171df.jpg",
    title: "4. Apply Instantly",
    desc: "Send your application directly to the college with one click. No need to visit multiple campuses."
  },
  {
    icon: "https://i.pinimg.com/736x/61/9f/b2/619fb264043785065fc11519f5897cbb.jpg",
    title: "5. Confirm Admission",
    desc: "Get quick confirmation from the college and secure your seat before it fills."
  }
];

const DirectAdmissionModal: React.FC<DirectAdmissionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[1000] bg-gray-900/40 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden relative flex flex-col p-6 md:p-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-900 transition-colors bg-white rounded-full z-10"
        >
          <i className="fa-solid fa-xmark text-[20px]"></i>
        </button>

        {/* Title */}
        <div className="text-center mb-6 mt-2 md:mt-0 px-4">
          <h2 className="font-['Poppins',sans-serif] text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
            How does College Direct Admission work?
          </h2>
        </div>

        {/* Stepper Timeline */}
        <div className="relative flex flex-col md:flex-row justify-between w-full mx-auto mb-6 gap-y-6 md:gap-y-0 md:gap-x-3 overflow-y-auto pr-2 custom-scrollbar">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-[48px] left-[10%] right-[10%] h-[2px] bg-gray-200 z-0 hidden md:block"></div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-row md:flex-col items-center flex-1 relative z-10 px-1 gap-4 md:gap-2">
              <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center flex-shrink-0 z-10 hover:-translate-y-0.5 transition-transform overflow-hidden bg-white border border-gray-100 rounded-lg shadow-sm">
                <img src={step.icon} alt={step.title} className="w-full h-full object-cover mix-blend-multiply" />
              </div>
              <div className="text-left md:text-center flex-1">
                <h4 className="font-['Poppins',sans-serif] font-bold text-gray-900 text-[13px] md:text-sm mb-1">{step.title}</h4>
                <p className="text-gray-500 text-[11px] md:text-xs leading-snug">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-2 bg-indigo-50/60 border border-indigo-100 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 w-full mx-auto shadow-sm">
          <div className="flex-1 w-full order-2 md:order-1">
            <h3 className="font-['Poppins',sans-serif] font-bold text-gray-900 text-lg md:text-xl mb-1">Complete your profile now</h3>
            <p className="text-gray-500 text-xs md:text-sm mb-4">You are just a few steps away from unlocking direct admission matches.</p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
              <div className="flex items-center gap-3 w-full sm:max-w-[180px]">
                <div className="w-full bg-indigo-100/80 rounded-full h-2 overflow-hidden">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <span className="text-xs font-bold text-indigo-700">40%</span>
              </div>
              <button 
                onClick={onClose}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2 px-5 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
              >
                Get direct admission
              </button>
            </div>
          </div>

          <div className="flex-shrink-0 w-20 h-20 md:w-28 md:h-28 order-1 md:order-2 flex items-center justify-center">
            <img 
              src="https://i.pinimg.com/1200x/c0/a7/68/c0a7688c3212fe6d63227c3f23ce060a.jpg" 
              alt="Profile Illustration" 
              className="w-full h-full object-cover mix-blend-multiply" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectAdmissionModal;

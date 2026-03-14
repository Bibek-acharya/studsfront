const CourseCategoriesSection = ({ onNavigate }: any) => (
 <div className="w-full max-w-[1380px] mx-auto">
  {/* Header Section */}
  <div className="text-center mb-12">
    <h2 className="text-[34px] leading-tight font-extrabold text-gray-900 mb-3 tracking-tight">
      Right Course. Right College
    </h2>
    <p className="text-gray-500 text-[15px] font-medium">
      Make better decisions with the right resources at your fingertips.
    </p>
  </div>
  {/* Scrollable Card Container */}
  {/* The JS below enables mouse dragging on this container */}
  <div
    id="scrollContainer"
    className="scroll-container flex overflow-x-auto gap-5 pb-6 pt-2 no-scrollbar select-none"
  >
    {/* Card 1: Science & Technology */}
    <div className="min-w-[280px] bg-white rounded-2xl border border-cardBorder p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col shrink-0 pointer-events-none">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-[17px] font-semibold text-gray-900 pointer-events-auto cursor-pointer hover:text-blue-600 transition-colors">
          Science &amp; Technology
        </h3>
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
      <p className="text-gray-500 text-[13px] font-medium mb-6">2k+ colleges</p>
      <div className="flex gap-2.5 mt-auto">
        {/* Logos */}
        <div className="w-[46px] h-[46px] rounded-xl border border-gray-100 flex items-center justify-center p-1.5">
          <img
            src="https://kist.edu.np/resources/assets/img/logo_small.jpg"
            alt="Logo"
            className="max-w-full max-h-full object-contain pointer-events-none"
          />
        </div>
        <div className="w-[46px] h-[46px] rounded-xl border border-gray-100 flex items-center justify-center p-1.5">
          <img
            src="https://kist.edu.np/resources/assets/img/logo_small.jpg"
            alt="Logo"
            className="max-w-full max-h-full object-contain pointer-events-none"
          />
        </div>
        <div className="w-[46px] h-[46px] rounded-xl border border-gray-100 flex items-center justify-center p-1.5">
          <img
            src="https://kist.edu.np/resources/assets/img/logo_small.jpg"
            alt="Logo"
            className="max-w-full max-h-full object-contain pointer-events-none"
          />
        </div>
        <div className="w-[46px] h-[46px] rounded-xl border border-gray-100 flex items-center justify-center p-1.5">
          <img
            src="https://kist.edu.np/resources/assets/img/logo_small.jpg"
            alt="Logo"
            className="max-w-full max-h-full object-contain pointer-events-none"
          />
        </div>
      </div>
    </div>
    {/* Card 2: Engineering (Note the blue text for subtitle) */}
    <div className="min-w-[280px] bg-white rounded-2xl border border-cardBorder p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col shrink-0 pointer-events-none">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-[17px] font-semibold text-gray-900 pointer-events-auto cursor-pointer hover:text-blue-600 transition-colors">
          Engineering
        </h3>
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
      <p className="text-blue-500 text-[13px] font-semibold mb-6">
        2k+ colleges
      </p>
      <div className="flex gap-2.5 mt-auto">
        {/* Logos */}
        <div className="w-[46px] h-[46px] rounded-xl border border-gray-100 flex items-center justify-center p-1.5">
          <img
            src="https://kist.edu.np/resources/assets/img/logo_small.jpg"
            alt="Logo"
            className="max-w-full max-h-full object-contain pointer-events-none"
          />
        </div>
        <div className="w-[46px] h-[46px] rounded-xl border border-gray-100 flex items-center justify-center p-1.5">
          <img
            src="https://kist.edu.np/resources/assets/img/logo_small.jpg"
            alt="Logo"
            className="max-w-full max-h-full object-contain pointer-events-none"
          />
        </div>
        <div className="w-[46px] h-[46px] rounded-xl border border-gray-100 flex items-center justify-center p-1.5">
          <img
            src="https://kist.edu.np/resources/assets/img/logo_small.jpg"
            alt="Logo"
            className="max-w-full max-h-full object-contain pointer-events-none"
          />
        </div>
        <div className="w-[46px] h-[46px] rounded-xl border border-gray-100 flex items-center justify-center p-1.5">
          <img
            src="https://kist.edu.np/resources/assets/img/logo_small.jpg"
            alt="Logo"
            className="max-w-full max-h-full object-contain pointer-events-none"
          />
        </div>
      </div>
    </div>
    {/* Card 3: Management & Business */}
    <div className="min-w-[280px] bg-white rounded-2xl border border-cardBorder p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col shrink-0 pointer-events-none">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-[17px] font-semibold text-gray-900 pointer-events-auto cursor-pointer hover:text-blue-600 transition-colors">
          Management &amp; Business
        </h3>
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
      <p className="text-gray-500 text-[13px] font-medium mb-6">2k+ colleges</p>
      <div className="flex gap-2.5 mt-auto">
        {/* Logos */}
        <div className="w-[46px] h-[46px] rounded-xl border border-gray-100 flex items-center justify-center p-1.5">
          <img
            src="https://kist.edu.np/resources/assets/img/logo_small.jpg"
            alt="Logo"
            className="max-w-full max-h-full object-contain pointer-events-none"
          />
        </div>
        <div className="w-[46px] h-[46px] rounded-xl border border-gray-100 flex items-center justify-center p-1.5">
          <img
            src="https://kist.edu.np/resources/assets/img/logo_small.jpg"
            alt="Logo"
            className="max-w-full max-h-full object-contain pointer-events-none"
          />
        </div>
        <div className="w-[46px] h-[46px] rounded-xl border border-gray-100 flex items-center justify-center p-1.5">
          <img
            src="https://kist.edu.np/resources/assets/img/logo_small.jpg"
            alt="Logo"
            className="max-w-full max-h-full object-contain pointer-events-none"
          />
        </div>
        <div className="w-[46px] h-[46px] rounded-xl border border-gray-100 flex items-center justify-center p-1.5">
          <img
            src="https://kist.edu.np/resources/assets/img/logo_small.jpg"
            alt="Logo"
            className="max-w-full max-h-full object-contain pointer-events-none"
          />
        </div>
      </div>
    </div>
    {/* Card 4: Health & Medical */}
    <div className="min-w-[280px] bg-white rounded-2xl border border-cardBorder p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col shrink-0 pointer-events-none">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-[17px] font-semibold text-gray-900 pointer-events-auto cursor-pointer hover:text-blue-600 transition-colors">
          Health &amp; Medical
        </h3>
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
      <p className="text-gray-500 text-[13px] font-medium mb-6">2k+ colleges</p>
      <div className="flex gap-2.5 mt-auto">
        {/* Logos */}
        <div className="w-[46px] h-[46px] rounded-xl border border-gray-100 flex items-center justify-center p-1.5">
          <img
            src="https://kist.edu.np/resources/assets/img/logo_small.jpg"
            alt="Logo"
            className="max-w-full max-h-full object-contain pointer-events-none"
          />
        </div>
        <div className="w-[46px] h-[46px] rounded-xl border border-gray-100 flex items-center justify-center p-1.5">
          <img
            src="https://kist.edu.np/resources/assets/img/logo_small.jpg"
            alt="Logo"
            className="max-w-full max-h-full object-contain pointer-events-none"
          />
        </div>
        <div className="w-[46px] h-[46px] rounded-xl border border-gray-100 flex items-center justify-center p-1.5">
          <img
            src="https://kist.edu.np/resources/assets/img/logo_small.jpg"
            alt="Logo"
            className="max-w-full max-h-full object-contain pointer-events-none"
          />
        </div>
        <div className="w-[46px] h-[46px] rounded-xl border border-gray-100 flex items-center justify-center p-1.5">
          <img
            src="https://kist.edu.np/resources/assets/img/logo_small.jpg"
            alt="Logo"
            className="max-w-full max-h-full object-contain pointer-events-none"
          />
        </div>
      </div>
    </div>
    {/* Card 5: Business */}
    <div className="min-w-[280px] bg-white rounded-2xl border border-cardBorder p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col shrink-0 pointer-events-none">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-[17px] font-semibold text-gray-900 pointer-events-auto cursor-pointer hover:text-blue-600 transition-colors">
          Business
        </h3>
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
      <p className="text-gray-500 text-[13px] font-medium mb-6">2k+ colleges</p>
      <div className="flex gap-2.5 mt-auto">
        {/* Logos */}
        <div className="w-[46px] h-[46px] rounded-xl border border-gray-100 flex items-center justify-center p-1.5">
          <img
            src="https://kist.edu.np/resources/assets/img/logo_small.jpg"
            alt="Logo"
            className="max-w-full max-h-full object-contain pointer-events-none"
          />
        </div>
        <div className="w-[46px] h-[46px] rounded-xl border border-gray-100 flex items-center justify-center p-1.5">
          <img
            src="https://kist.edu.np/resources/assets/img/logo_small.jpg"
            alt="Logo"
            className="max-w-full max-h-full object-contain pointer-events-none"
          />
        </div>
        <div className="w-[46px] h-[46px] rounded-xl border border-gray-100 flex items-center justify-center p-1.5">
          <img
            src="https://kist.edu.np/resources/assets/img/logo_small.jpg"
            alt="Logo"
            className="max-w-full max-h-full object-contain pointer-events-none"
          />
        </div>
        <div className="w-[46px] h-[46px] rounded-xl border border-gray-100 flex items-center justify-center p-1.5">
          <img
            src="https://kist.edu.np/resources/assets/img/logo_small.jpg"
            alt="Logo"
            className="max-w-full max-h-full object-contain pointer-events-none"
          />
        </div>
      </div>
    </div>
  </div>
</div>

);

export default CourseCategoriesSection;
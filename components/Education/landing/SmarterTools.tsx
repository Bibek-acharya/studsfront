const SmarterToolsSection = ({ onNavigate }: any) => (
<section className="max-w-[1400px] mx-auto mt-20 mb-24 px-4 sm:px-0">
  {/* Section Header */}
  <div className="text-center mb-12">
    <h2 className="text-[34px] font-extrabold text-[#0F172A] mb-3 tracking-tight">
      Smarter Tools, Greater Success
    </h2>
    <p className="text-[15px] subtitle-color font-medium">
      Make better decisions with the right resources at your fingertips.
    </p>
  </div>
  {/* Tools Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Card 1: College Finder */}
    <div
      className="bg-white rounded-[24px] p-7 shadow-[0_4px_24px_rgb(0,0,0,0.02)] border border-gray-100/80 flex flex-col hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
      role="button"
      tabIndex={0}
      onClick={() => onNavigate("collegeRecommenderTool")}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onNavigate("collegeRecommenderTool");
        }
      }}
    >
      {/* Icon container with light green background */}
      <div className="w-[60px] h-[60px] rounded-[18px] bg-[#E1F7E7] flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-[#22C55E]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      </div>
      <h3 className="text-[20px] font-bold text-[#0F172A] mb-3">
        College Recommender
      </h3>
      <p className="text-[14px] text-gray-500 leading-relaxed mb-8 flex-grow">
        Filter thousands of institutions by location, major, tuition, and
        ranking to find your perfect match.
      </p>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNavigate("collegeRecommenderTool");
        }}
        className="w-full py-3.5 bg-[#22C55E] hover:bg-[#16A34A] text-white text-[15px] font-semibold rounded-xl transition-colors"
      >
        Find My Match
      </button>
    </div>
    {/* Card 2: Compare College */}
    <div
      className="bg-white rounded-[24px] p-7 shadow-[0_4px_24px_rgb(0,0,0,0.02)] border border-gray-100/80 flex flex-col hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
      role="button"
      tabIndex={0}
      onClick={() => onNavigate("compareColleges")}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onNavigate("compareColleges");
        }
      }}
    >
      {/* Icon container with light blue background */}
      <div className="w-[60px] h-[60px] rounded-[18px] bg-[#E3EFFF] flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-[#4A8BFF]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
          />
        </svg>
      </div>
      <h3 className="text-[20px] font-bold text-[#0F172A] mb-3">
        Compare College
      </h3>
      <p className="text-[14px] text-gray-500 leading-relaxed mb-8 flex-grow">
        Filter thousands of institutions by location, major, tuition, and
        ranking to find your perfect match.
      </p>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNavigate("compareColleges");
        }}
        className="w-full py-3.5 bg-[#4A8BFF] hover:bg-blue-600 text-white text-[15px] font-semibold rounded-xl transition-colors"
      >
        Start Comparison
      </button>
    </div>
    {/* Card 3: Scholarship Finder */}
    <div
      className="bg-white rounded-[24px] p-7 shadow-[0_4px_24px_rgb(0,0,0,0.02)] border border-gray-100/80 flex flex-col hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
      role="button"
      tabIndex={0}
      onClick={() => onNavigate("scholarshipFinderTool")}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onNavigate("scholarshipFinderTool");
        }
      }}
    >
      {/* Icon container with light yellow background */}
      <div className="w-[60px] h-[60px] rounded-[18px] bg-[#FFF8DB] flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-[#EAB308]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-[20px] font-bold text-[#0F172A] mb-3">
        Scholarship Finder
      </h3>
      <p className="text-[14px] text-gray-500 leading-relaxed mb-8 flex-grow">
        Filter thousands of institutions by location, major, tuition, and
        ranking to find your perfect match.
      </p>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNavigate("scholarshipFinderTool");
        }}
        className="w-full py-3.5 bg-[#EAB308] hover:bg-yellow-600 text-white text-[15px] font-semibold rounded-xl transition-colors"
      >
        Search Funding
      </button>
    </div>
    {/* Card 4: Courses Finder */}
    <div
      className="bg-white rounded-[24px] p-7 shadow-[0_4px_24px_rgb(0,0,0,0.02)] border border-gray-100/80 flex flex-col hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
      role="button"
      tabIndex={0}
      onClick={() => onNavigate("courseFinder")}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onNavigate("courseFinder");
        }
      }}
    >
      {/* Icon container with light red background */}
      <div className="w-[60px] h-[60px] rounded-[18px] bg-[#FDE2E2] flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-[#F04C4C]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      </div>
      <h3 className="text-[20px] font-bold text-[#0F172A] mb-3">
        Courses Finder
      </h3>
      <p className="text-[14px] text-gray-500 leading-relaxed mb-8 flex-grow">
        Filter thousands of institutions by location, major, tuition, and
        ranking to find your perfect match.
      </p>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNavigate("courseFinder");
        }}
        className="w-full py-3.5 bg-[#F04C4C] hover:bg-red-600 text-white text-[15px] font-semibold rounded-xl transition-colors"
      >
        Explore Courses
      </button>
    </div>
  </div>
</section>

);

export default SmarterToolsSection;
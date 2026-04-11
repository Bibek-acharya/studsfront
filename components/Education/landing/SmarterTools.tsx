const SmarterToolsSection = ({ onNavigate }: any) => (
<section className="w-full py-12 md:py-16">
  <div className="max-w-350 mx-auto">
  <div className="text-center mb-10 md:mb-16">
    <h2 className="text-[28px] md:text-[40px] font-bold text-[#0f172a] mb-4 tracking-tight">
      Smarter Tools, Greater Success
    </h2>
    <p className="text-[15px] md:text-[17px] text-gray-600 max-w-2xl mx-auto">
      Make better decisions with the right resources at your fingertips.
    </p>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
    {/* Card 1: College Recommender */}
    <div
      className="bg-white rounded-2xl p-7 card-shadow flex flex-col h-full hover:-translate-y-1 transition-transform duration-300"
      onClick={() => onNavigate("collegeRecommenderTool")}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#e6f7ec] flex items-center justify-center mb-6">
        <i className="fa-solid fa-shield-halved text-[#1dc05c] text-2xl"></i>
      </div>
      <h3 className="text-xl font-bold text-[#0f172a] mb-3">College Recommender</h3>
      <p className="text-gray-500 text-[15px] leading-relaxed mb-8 flex-grow">
        Filter thousands of institutions by location, major, tuition, and ranking to find your perfect match.
      </p>
      <button className="w-full bg-[#24c75e] hover:bg-[#1fb354] text-white font-semibold py-3.5 px-4 rounded-xl transition-colors duration-200">
        Find My Match
      </button>
    </div>

    {/* Card 2: Compare College */}
    <div
      className="bg-white rounded-2xl p-7 card-shadow flex flex-col h-full hover:-translate-y-1 transition-transform duration-300"
      onClick={() => onNavigate("compareColleges")}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#e7f0ff] flex items-center justify-center mb-6">
        <i className="fa-solid fa-scale-balanced text-[#4a86fc] text-2xl"></i>
      </div>
      <h3 className="text-xl font-bold text-[#0f172a] mb-3">Compare College</h3>
      <p className="text-gray-500 text-[15px] leading-relaxed mb-8 grow">
        Filter thousands of institutions by location, major, tuition, and ranking to find your perfect match.
      </p>
      <button className="w-full bg-[#4f8aff] hover:bg-[#3f7aef] text-white font-semibold py-3.5 px-4 rounded-xl transition-colors duration-200">
        Start Comparison
      </button>
    </div>

    {/* Card 3: Scholarship Finder */}
    <div
      className="bg-white rounded-2xl p-7 card-shadow flex flex-col h-full hover:-translate-y-1 transition-transform duration-300"
      onClick={() => onNavigate("scholarshipFinderTool")}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#fdf6e3] flex items-center justify-center mb-6">
        <i className="fa-solid fa-circle-dollar-to-slot text-[#dfac1d] text-2xl"></i>
      </div>
      <h3 className="text-xl font-bold text-[#0f172a] mb-3">Scholarship Finder</h3>
      <p className="text-gray-500 text-[15px] leading-relaxed mb-8 flex-grow">
        Filter thousands of institutions by location, major, tuition, and ranking to find your perfect match.
      </p>
      <button className="w-full bg-[#ebb316] hover:bg-[#d9a512] text-white font-semibold py-3.5 px-4 rounded-xl transition-colors duration-200">
        Search Funding
      </button>
    </div>

    {/* Card 4: Courses Finder */}
    <div
      className="bg-white rounded-2xl p-7 card-shadow flex flex-col h-full hover:-translate-y-1 transition-transform duration-300"
      onClick={() => onNavigate("courseFinder")}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#fceced] flex items-center justify-center mb-6">
        <i className="fa-solid fa-book-open text-[#ef5e61] text-2xl"></i>
      </div>
      <h3 className="text-xl font-bold text-[#0f172a] mb-3">Courses Finder</h3>
      <p className="text-gray-500 text-[15px] leading-relaxed mb-8 flex-grow">
        Filter thousands of institutions by location, major, tuition, and ranking to find your perfect match.
      </p>
      <button className="w-full bg-[#f04f53] hover:bg-[#e04044] text-white font-semibold py-3.5 px-4 rounded-xl transition-colors duration-200">
        Explore Courses
      </button>
    </div>
  </div>
  </div>
</section>


);

export default SmarterToolsSection;
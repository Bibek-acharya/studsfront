import React from "react";

interface FindCollegeHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeTab: "all" | "plustwo" | "bachelor" | "master";
  onTabChange: (tab: "all" | "plustwo" | "bachelor" | "master") => void;
}

const FindCollegeHero: React.FC<FindCollegeHeroProps> = ({
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
}) => {
  const tabs: Array<{
    key: "all" | "plustwo" | "bachelor" | "master";
    label: string;
  }> = [
    { key: "all", label: "All" },
    { key: "plustwo", label: "Plus Two (+2)" },
    { key: "bachelor", label: "Bachelor" },
    { key: "master", label: "Master" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="bg-white border-b border-gray-200 pt-10 pb-6 px-1 md:px-2 mb-8">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Programs</h1>
        <p className="text-gray-500 text-base mb-6 max-w-2xl">
          Discover the perfect course to advance your career and academic journey.
        </p>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
          <div className="flex flex-wrap items-center gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => onTabChange(tab.key)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors shadow-sm border ${
                    isActive
                      ? "bg-[#3b82f6] text-white border-[#3b82f6]"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSearch} className="relative w-full md:w-72">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search courses, colleges..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent text-sm shadow-sm transition-shadow"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default FindCollegeHero;

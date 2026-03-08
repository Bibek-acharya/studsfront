import React, { useState } from "react";
import FindCollegeHero from "./FindCollegeHero";
import FilterSidebar from "./FilterSidebar";
import CollegeGrid from "./CollegeGrid";

interface FindCollegePageProps {
  onNavigate: (view: any, data?: any) => void;
}

export interface CollegeFilters {
  verified: boolean;
  popular: boolean;
  type: string[];
  location: string;
  search: string;
  academic: string[];
  stream: string[];
  nationalWide: boolean;
}

const FindCollegePage: React.FC<FindCollegePageProps> = ({ onNavigate }) => {
  const [filters, setFilters] = useState<CollegeFilters>({
    verified: false,
    popular: false,
    type: [],
    location: "",
    search: "",
    academic: [],
    stream: [],
    nationalWide: false,
  });

  return (
    <div className="font-[Inter,sans-serif] bg-[#f8fafc] min-h-screen">
      <FindCollegeHero
        searchQuery={filters.search}
        onSearchChange={(search) => setFilters((prev) => ({ ...prev, search }))}
      />
      <div className="p-4 md:p-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-6 items-start">
          <aside className="w-full md:w-[320px] flex-shrink-0 bg-white border border-slate-200 rounded-xl shadow-sm p-5 h-max">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </aside>
          <main className="flex-grow w-full">
            <CollegeGrid filters={filters} onNavigate={onNavigate} setFilters={setFilters} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default FindCollegePage;

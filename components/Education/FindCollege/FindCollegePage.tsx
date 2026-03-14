import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FilterSidebar from "./FilterSidebar";
import CollegeGrid from "./CollegeGrid";

interface FindCollegePageProps {
  onNavigate: (view: any, data?: any) => void;
}

export interface CollegeFilters {
  type: string[];
  location: string[];
  search: string;
  quick: string[];
  academic: string[];
  stream: string[];
  facilities: string[];
  feeRange: string[];
  duration: string[];
  popularity: string[];
}

export const DEFAULT_COLLEGE_FILTERS: CollegeFilters = {
  type: [],
  location: [],
  search: "",
  quick: [],
  academic: [],
  stream: [],
  facilities: [],
  feeRange: [],
  duration: [],
  popularity: [],
};

const FindCollegePage: React.FC<FindCollegePageProps> = ({ onNavigate }) => {
  const location = useLocation();
  const [filters, setFilters] = useState<CollegeFilters>(DEFAULT_COLLEGE_FILTERS);

  useEffect(() => {
    const state = location.state as { search?: string } | null;
    const incomingSearch = state?.search?.trim();

    if (!incomingSearch) {
      return;
    }

    setFilters((prev) =>
      prev.search === incomingSearch ? prev : { ...prev, search: incomingSearch },
    );
  }, [location.state]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-[Inter,sans-serif] text-gray-800 md:p-6 lg:p-8">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 lg:flex-row lg:flex-nowrap lg:gap-8">
          <aside className="w-full shrink-0 lg:w-[300px]">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </aside>
          <main className="min-w-0 flex-1">
            <CollegeGrid filters={filters} onNavigate={onNavigate} setFilters={setFilters} />
          </main>
      </div>
    </div>
  );
};

export default FindCollegePage;

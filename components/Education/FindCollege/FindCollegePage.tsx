import React from "react";
import FindCollegeHero from "./FindCollegeHero";
import FilterSidebar from "./FilterSidebar";
import CollegeGrid from "./CollegeGrid";

interface FindCollegePageProps {
  onNavigate: (view: any) => void;
}

const FindCollegePage: React.FC<FindCollegePageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-jakarta">
      <FindCollegeHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
          {/* Sidebar Filter */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Results */}
          <main className="lg:col-span-9">
            <CollegeGrid onNavigate={onNavigate} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default FindCollegePage;

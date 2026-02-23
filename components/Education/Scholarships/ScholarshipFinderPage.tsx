
import React from 'react';
import ScholarshipHero from './ScholarshipHero';
import ScholarshipFilters from './ScholarshipFilters';
import ScholarshipGrid from './ScholarshipGrid';

interface ScholarshipFinderPageProps {
  onNavigate: (view: any, data?: any) => void;
}

const ScholarshipFinderPage: React.FC<ScholarshipFinderPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-jakarta">
      <ScholarshipHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-80 shrink-0">
             <ScholarshipFilters />
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
             <ScholarshipGrid onNavigate={onNavigate} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default ScholarshipFinderPage;

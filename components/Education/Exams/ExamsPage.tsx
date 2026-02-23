
import React from 'react';
import ExamsHero from './ExamsHero';
import ExamFilters from './ExamFilters';
import ExamGrid from './ExamGrid';

interface ExamsPageProps {
  onNavigate: (view: any, data?: any) => void;
}

const ExamsPage: React.FC<ExamsPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-jakarta">
      <ExamsHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
          <aside className="lg:col-span-3">
            <ExamFilters />
          </aside>
          <main className="lg:col-span-9">
            <ExamGrid onNavigate={onNavigate} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ExamsPage;

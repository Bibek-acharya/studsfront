import React from "react";
import CoursesHero from "./CoursesHero";
import CourseFilters from "./CourseFilters";
import CourseGrid from "./CourseGrid";

interface CourseFinderPageProps {
  onNavigate: (view: any) => void;
}

const CourseFinderPage: React.FC<CourseFinderPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-jakarta">
      <CoursesHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
          {/* Sidebar Filter */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24">
              <CourseFilters />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9">
            <CourseGrid onNavigate={onNavigate} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default CourseFinderPage;

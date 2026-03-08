import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CourseFilters from "./CourseFilters";
import CourseGrid from "./CourseGrid";
import { apiService } from "../../../services/api";
import {
  applyCourseFinderFilters,
  defaultCourseFinderFilters,
  getCourseFilterCounts,
  CourseFinderFilters,
} from "./types";

interface CourseFinderPageProps {
  onNavigate: (view: any) => void;
}

const CourseFinderPage: React.FC<CourseFinderPageProps> = ({ onNavigate }) => {
  const [filters, setFilters] = useState<CourseFinderFilters>(
    defaultCourseFinderFilters,
  );

  const { data, isLoading } = useQuery({
    queryKey: ["education-courses"],
    queryFn: () => apiService.getEducationCourses(),
  });

  const allCourses = data?.data?.courses ?? [];

  const filteredCourses = useMemo(
    () => applyCourseFinderFilters(allCourses, filters),
    [allCourses, filters],
  );

  const filterCounts = useMemo(() => getCourseFilterCounts(allCourses), [allCourses]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* container matches prototype wrapper */}
      <div className="max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar Filter (same as prototype) */}
          <aside className="w-[280px] flex-shrink-0 hidden lg:flex flex-col bg-white border border-gray-100 rounded-xl p-5 shadow-sm h-fit">
            <CourseFilters
              filters={filters}
              counts={filterCounts}
              onChange={setFilters}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0" id="main-content">
            <CourseGrid
              onNavigate={onNavigate}
              filters={filters}
              courses={filteredCourses}
              totalCourses={allCourses.length}
              isLoading={isLoading}
              onFiltersChange={setFilters}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default CourseFinderPage;

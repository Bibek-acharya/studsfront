import React from "react";
import { useQuery } from "@tanstack/react-query";
import { apiService, EducationCourse } from "../../../services/api";

interface CourseGridProps {
  onNavigate: (view: any, data?: any) => void;
}

const defaultCourseData: EducationCourse[] = [
  {
    id: 1,
    title: "B.Sc CSIT (Computer Science & IT)",
    colleges: 34,
    affiliation: "TU Affiliated",
    badges: ["Top Choice", "High Growth"],
    level: "Bachelor",
    field: "IT / Computing",
    duration: "4 Years",
    estFee: "NPR 4L - 8L",
    highlights: [
      "Merit Scholarships (20 Seats)",
      "Internship Guaranteed",
      "Practical Based",
    ],
    careerPath: "Software Engineer, System Analyst, AI Researcher",
    icon: "fa-laptop-code",
    color: "blue",
  },
  {
    id: 2,
    title: "BIT (Bachelor in IT)",
    colleges: 15,
    affiliation: "Foreign Degree",
    badges: ["Global Value", "Industry Ready"],
    level: "Bachelor",
    field: "IT / Computing",
    duration: "3 Years",
    estFee: "NPR 6L - 10L",
    highlights: ["Direct Entry", "Job Assistance", "Dual Certification"],
    careerPath: "IT Consultant, Cloud Architect, Web Developer",
    icon: "fa-network-wired",
    color: "emerald",
  },
  {
    id: 3,
    title: "MBA (Business Administration)",
    colleges: 25,
    affiliation: "Pokhara University",
    badges: ["Executive", "Networking"],
    level: "Master",
    field: "Management",
    duration: "2 Years",
    estFee: "NPR 3L - 6L",
    highlights: [
      "Corporate Guest Sessions",
      "Leadership Focus",
      "Case Study Method",
    ],
    careerPath: "Operations Manager, Entrepreneur, HR Director",
    icon: "fa-briefcase",
    color: "purple",
  },
];

const CourseGrid: React.FC<CourseGridProps> = ({ onNavigate }) => {
  const { data } = useQuery({
    queryKey: ["education-courses"],
    queryFn: () => apiService.getEducationCourses(),
  });

  const courseData = data?.data?.courses || defaultCourseData;

  return (
    <div className="space-y-8">
      {/* Search Result Stats & Sorting */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
            Showing <span className="text-slate-900 font-black">{courseData.length}</span>{" "}
            results matching your interests
          </p>
          <div className="flex gap-2 mt-3">
            <ActiveBadge label="Bachelor" />
            <ActiveBadge label="IT & Computing" />
          </div>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
          Sort By:
          <select className="bg-transparent border-none focus:ring-0 text-slate-900 font-black cursor-pointer p-0">
            <option>Recommended</option>
            <option>Duration</option>
            <option>Popularity</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courseData.map((course, idx) => (
          <div
            key={course.id}
            className="bg-white rounded-xl p-5 sm:p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:border-primary-100 transition-all duration-500 group flex flex-col animate-fadeInUp"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            {/* Badges Row */}
            <div className="flex gap-2 mb-6">
              <span className="px-3 py-1 bg-primary-50 text-primary-600 border border-primary-100 rounded-lg text-[9px] font-black uppercase tracking-widest">
                {course.affiliation}
              </span>
              {course.badges.map((b) => (
                <span
                  key={b}
                  className="px-3 py-1 bg-slate-50 text-slate-400 border border-slate-100 rounded-lg text-[9px] font-black uppercase tracking-widest"
                >
                  {b}
                </span>
              ))}
            </div>

            {/* Title & Stats */}
            <div className="mb-8">
              <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary-600 transition-colors leading-tight mb-2">
                {course.title}
              </h3>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <i className="fa-solid fa-building-columns text-primary-400"></i>{" "}
                View {course.colleges} Colleges Offering This
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-6 pb-8 border-b border-slate-50 mb-8">
              <InfoItem
                icon="fa-graduation-cap"
                label="Level"
                val={course.level}
              />
              <InfoItem
                icon="fa-layer-group"
                label="Field"
                val={course.field}
              />
              <InfoItem
                icon="fa-clock"
                label="Duration"
                val={course.duration}
              />
              <InfoItem icon="fa-wallet" label="Est. Fee" val={course.estFee} />
            </div>

            {/* Highlights Section */}
            <div className="mb-8 flex-grow">
              <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">
                Scholarship & Highlights
              </h4>
              <ul className="space-y-3">
                {course.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center text-[10px] shadow-inner">
                      <i className="fa-solid fa-check"></i>
                    </div>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Career Path Footer */}
            <div className="bg-primary-50/30 rounded-xl p-4 border border-primary-50 mb-8 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary-600 shrink-0">
                <i className="fa-solid fa-user-tie"></i>
              </div>
              <div>
                <p className="text-[9px] font-black text-primary-400 uppercase tracking-widest mb-1">
                  Major Career Path
                </p>
                <p className="text-xs font-bold text-slate-700 leading-relaxed">
                  {course.careerPath}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => onNavigate("courseDetails", { id: course.id })}
                className="flex-1 py-4 bg-white border-2 border-slate-100 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-xl hover:border-primary-600 hover:text-primary-600 transition-all"
              >
                Details
              </button>
              <button className="flex-1 py-4 bg-slate-900 hover:bg-black text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/10 transition-all active:scale-95 flex items-center justify-center gap-2 group/btn">
                Apply Now
                <i className="fa-solid fa-arrow-right transition-transform group-hover/btn:translate-x-1"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 pt-12">
        <PageBtn icon="fa-chevron-left" disabled />
        <PageBtn label="1" active />
        <PageBtn label="2" />
        <PageBtn label="3" />
        <PageBtn icon="fa-chevron-right" />
      </div>
    </div>
  );
};

const ActiveBadge: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-[10px] font-black text-slate-600 shadow-sm">
    {label}{" "}
    <button className="text-slate-300 hover:text-rose-500 transition-colors">
      <i className="fa-solid fa-xmark"></i>
    </button>
  </div>
);

const InfoItem: React.FC<{ icon: string; label: string; val: string }> = ({
  icon,
  label,
  val,
}) => (
  <div className="flex items-start gap-3">
    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-primary-500 text-sm shrink-0 shadow-sm group-hover:scale-105 transition-transform">
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div>
      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-0.5">
        {label}
      </p>
      <p className="text-xs font-black text-slate-800 leading-tight">{val}</p>
    </div>
  </div>
);

const PageBtn: React.FC<{
  label?: string;
  icon?: string;
  active?: boolean;
  disabled?: boolean;
}> = ({ label, icon, active, disabled }) => (
  <button
    disabled={disabled}
    className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm transition-all border ${
      active
        ? "bg-primary-600 text-white border-primary-600 shadow-xl shadow-primary-500/20"
        : "bg-white text-slate-400 border-slate-100 hover:border-primary-200 hover:text-primary-600 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
    }`}
  >
    {icon ? <i className={`fa-solid ${icon}`}></i> : label}
  </button>
);

export default CourseGrid;

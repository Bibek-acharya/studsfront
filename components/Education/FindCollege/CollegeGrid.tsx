import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "../../../services/api";

interface CollegeGridProps {
  onNavigate: (view: any, data?: any) => void;
}

const CollegeGrid: React.FC<CollegeGridProps> = ({ onNavigate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("rating");

  const { data, isLoading, error } = useQuery({
    queryKey: ["colleges", currentPage, sortBy],
    queryFn: () =>
      apiService.getColleges({
        page: currentPage,
        pageSize: 10,
        sort: sortBy,
        order: "DESC",
      }),
  });

  const colleges = data?.data?.colleges || [];
  const totalPages = data?.data?.pagination?.totalPages || 1;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <i className="fa-solid fa-spinner animate-spin text-4xl text-primary-600 mb-4"></i>
          <p className="text-slate-600 font-semibold">Loading colleges...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-700 font-semibold">{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Active Filter Bar */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
          Active:
        </span>
        <ActiveFilter label="Bachelor" />
        <ActiveFilter label="IT & Computing" />
        <button className="text-[10px] font-black text-primary-600 hover:underline uppercase tracking-widest">
          Clear All
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
          Showing <span className="text-slate-900 font-black">{colleges.length}</span>{" "}
          results for{" "}
          <span className="text-primary-600 font-black">Colleges</span>
        </p>
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
          Sort by:
          <select 
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-transparent border-none focus:ring-0 text-slate-900 font-black cursor-pointer"
          >
            <option value="rating">Highest Rating</option>
            <option value="name">Name (A-Z)</option>
            <option value="reviews">Most Popular</option>
          </select>
        </div>
      </div>

      {/* College Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Render colleges */}
        {colleges.slice(0, 2).map((college) => (
          <CollegeCard
            key={college.id}
            college={college}
            onNavigate={onNavigate}
          />
        ))}

        {/* Promo Banner spanning full width */}
        {colleges.length > 2 && (
          <div className="md:col-span-2 relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer animate-fadeInUp">
            <img
              src="https://images.unsplash.com/photo-1523050335392-495619989da1?q=80&w=2070&auto=format&fit=crop"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              alt="Admission Open"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/40 to-transparent flex items-center p-12">
              <div className="max-w-md">
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] text-white mb-4 inline-block">
                  Flash Feature
                </span>
                <h3 className="text-2xl md:text-4xl font-black text-white mb-4 leading-tight">
                  Secure your seat at top IT colleges.
                </h3>
                <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-blue-50 transition-all active:scale-95">
                  Explore admissions
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Row 2 */}
        {colleges.slice(2).map((college) => (
          <CollegeCard
            key={college.id}
            college={college}
            onNavigate={onNavigate}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 pt-10">
        <PageBtn 
          icon="fa-chevron-left" 
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
        />
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
          <PageBtn 
            key={page}
            label={String(page)}
            active={page === currentPage}
            onClick={() => setCurrentPage(page)}
          />
        ))}
        <PageBtn 
          icon="fa-chevron-right"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
        />
      </div>
    </div>
  );
};

const CollegeCard: React.FC<{
  college: any;
  onNavigate: (v: any, data?: any) => void;
}> = ({ college, onNavigate }) => {
  const featuredPrograms = Array.isArray(college?.featured_programs)
    ? college.featured_programs
    : Array.isArray(college?.programs_list)
      ? college.programs_list
      : typeof college?.programs_list === "string"
        ? college.programs_list
            .split(",")
            .map((program: string) => program.trim())
            .filter(Boolean)
        : ["Computer Science", "Information Technology", "Business Administration"];

  return (
  <div className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:border-primary-100 transition-all duration-500 group animate-fadeInUp">
    <div className="flex items-start gap-5 mb-8">
      <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center text-primary-600 text-2xl font-black shadow-inner shrink-0 group-hover:scale-110 transition-transform">
        {college?.name?.[0] || "C"}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-black text-slate-900 leading-tight mb-1 truncate group-hover:text-primary-600 transition-colors">
          {college.name}
        </h3>
        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">
          <i className="fa-solid fa-location-dot text-primary-400"></i>
          <span className="truncate">{college.location}</span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5 bg-amber-50 text-amber-600 px-2 py-0.5 rounded-lg font-black text-[10px] border border-amber-100 uppercase">
            {college.rating} <i className="fa-solid fa-star text-[8px]"></i>
          </div>
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
            {Number(college?.reviews || 0).toLocaleString()} Reviews
          </span>
        </div>
      </div>
    </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500">
          <i className="fa-solid fa-building-columns text-primary-400"></i>{" "}
          {college.affiliation || "N/A"}
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500">
          <i className="fa-solid fa-graduation-cap text-primary-400"></i>{" "}
          {college.type || "N/A"}
        </div>
        {college.verified && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-emerald-600 shadow-sm">
            <i className="fa-solid fa-circle-check"></i> Verified
          </div>
        )}
      </div>

      <div className="space-y-4 mb-10 pt-6 border-t border-slate-50">
        <div className="flex justify-between items-center">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
            Featured Programs
          </h4>
          <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest">
            {college.programs || 5} Total
          </span>
        </div>
        <div className="space-y-2">
          {featuredPrograms.slice(0, 3).map((program, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100 group-hover:bg-white transition-all">
              <span className="text-xs font-bold text-slate-700">
                {program}
              </span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Bachelor
              </span>
            </div>
          ))}
        </div>
      </div>

    <div className="flex gap-4">
      <button
        onClick={() => onNavigate("collegeDetails", { id: college.id })}
        className="flex-1 py-4 bg-white border-2 border-slate-100 hover:border-primary-600 hover:text-primary-600 text-slate-400 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all"
      >
        View Details
      </button>
      <button className="flex-1 py-4 bg-slate-900 hover:bg-black text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/10 transition-all active:scale-95">
        Apply Now →
      </button>
      <button className="w-12 h-12 rounded-xl bg-slate-50 text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all flex items-center justify-center text-xl group/fav border border-slate-100 hover:border-rose-100 flex-shrink-0">
        <i className="fa-regular fa-heart"></i>
      </button>
    </div>
  </div>
  );
};

const ActiveFilter: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-[10px] font-black text-slate-600 shadow-sm">
    {label}
    <button className="text-slate-300 hover:text-rose-500 transition-colors">
      <i className="fa-solid fa-xmark"></i>
    </button>
  </div>
);

const PageBtn: React.FC<{
  label?: string;
  icon?: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}> = ({ label, icon, active, disabled, onClick }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-xs transition-all border ${
      active
        ? "bg-primary-600 text-white border-primary-600 shadow-xl shadow-primary-500/20"
        : "bg-white text-slate-400 border-slate-100 hover:border-primary-200 hover:text-primary-600 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
    }`}
  >
    {icon ? <i className={`fa-solid ${icon}`}></i> : label}
  </button>
);

export default CollegeGrid;

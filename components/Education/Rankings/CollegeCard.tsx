import React from "react";
import { College } from "./types";

interface CollegeCardProps {
  college: College;
  isSelected: boolean;
  onToggleCompare: (id: number) => void;
}

const CollegeCard: React.FC<CollegeCardProps> = ({
  college,
  isSelected,
  onToggleCompare,
}) => {
  return (
    <div
      className={`bg-white rounded-2xl p-6 border transition-all duration-500 group animate-fadeInUp flex items-center justify-between ${
        isSelected
          ? "border-primary-600 shadow-xl shadow-primary-500/10 scale-[1.02]"
          : "border-slate-100 shadow-sm hover:shadow-xl hover:border-primary-100"
      }`}
    >
      <div className="flex items-center gap-6 overflow-hidden">
        <div
          className={`w-16 h-16 rounded-2xl ${college.color} flex items-center justify-center text-white text-2xl font-black shadow-lg transition-transform group-hover:scale-110 shrink-0`}
        >
          {college.logo}
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-black text-slate-900 group-hover:text-primary-600 transition-colors truncate leading-tight">
            {college.name}
          </h3>
          <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-location-dot"></i> {college.location}
            </span>
            <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-star text-amber-400"></i>{" "}
              {college.stats.rating}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {college.tags.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-400 border border-slate-100 text-[9px] font-black uppercase tracking-widest"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-3 shrink-0 ml-4">
        <div className="text-right">
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-0.5">
            Ranking
          </p>
          <p className="text-2xl font-black text-slate-900">#{college.rank}</p>
        </div>
        <button
          onClick={() => onToggleCompare(college.id)}
          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
            isSelected
              ? "bg-primary-600 text-white shadow-lg"
              : "bg-slate-50 text-slate-400 hover:bg-primary-50 hover:text-primary-600 border border-transparent hover:border-primary-100"
          }`}
        >
          {isSelected ? "Selected" : "Compare"}
        </button>
      </div>
    </div>
  );
};

export default CollegeCard;

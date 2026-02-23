import React from "react";
import { College } from "./types";
import { STAR_ICON, HEART_ICON } from "./Constants";

interface CollegeCardProps {
  college: College;
  onViewDetails: (college: College) => void;
}

const CollegeCard: React.FC<CollegeCardProps> = ({
  college,
  onViewDetails,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-2xl hover:border-primary-100 transition-all duration-500 overflow-hidden flex flex-col h-full group animate-fadeInUp">
      <div className="p-5 sm:p-8 flex flex-col h-full">
        {/* Header: Logo and Basic Info */}
        <div className="flex gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center p-3 shadow-inner group-hover:scale-110 transition-transform duration-500">
            <div className="w-full h-full bg-slate-900 rounded-lg sm:rounded-xl flex items-center justify-center text-white text-2xl sm:text-3xl font-black">
              {college.name[0]}
            </div>
          </div>
          <div className="grow pt-1">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-primary-600 transition-colors leading-tight line-clamp-2 uppercase tracking-tight">
              {college.name}
            </h3>
            <div className="flex items-center text-slate-400 text-xs mt-3 font-bold uppercase tracking-widest">
              <i className="fa-solid fa-location-dot text-primary-500 mr-2"></i>
              {college.location}
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center bg-amber-50 text-amber-600 px-2.5 py-0.5 rounded-lg border border-amber-100 text-[10px] font-black uppercase tracking-widest shadow-sm">
                {STAR_ICON}
                <span className="ml-1.5">{college.rating} / 5.0</span>
              </div>
              <div className="flex items-center text-[10px] uppercase tracking-[0.2em] font-black text-slate-300">
                <i className="fa-solid fa-building-columns mr-2"></i>
                {college.university} Board
              </div>
            </div>
          </div>
        </div>

        {/* Programs with Ongoing/Closed status */}
        <div className="mb-10 grow">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
              Admission Status
            </span>
            <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest bg-primary-50 px-3 py-1 rounded-full border border-primary-100">
              {college.programs.length} Active Tracks
            </span>
          </div>
          <div className="space-y-3">
            {college.programs.slice(0, 3).map((prog, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-slate-50/50 border border-slate-100 rounded-xl group-hover:bg-white transition-all"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-black text-slate-700 uppercase tracking-tight">
                    {prog.name}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                    {prog.level}
                  </span>
                </div>
                <div
                  className={`text-[10px] font-black px-4 py-1.5 rounded-lg border uppercase tracking-widest shadow-sm ${
                    prog.status === "Ongoing"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                      : "bg-slate-50 text-slate-300 border-slate-100"
                  }`}
                >
                  {prog.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex gap-4 pt-8 border-t border-slate-50">
          <button
            onClick={() => onViewDetails(college)}
            className="flex-1 py-4 bg-white border-2 border-slate-100 text-slate-400 rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-primary-600 hover:text-primary-600 transition-all shadow-sm active:scale-95"
          >
            Details
          </button>
          <button className="flex-[2] py-4 bg-slate-900 hover:bg-black text-white rounded-xl font-black text-[10px] uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-900/10 active:scale-95 group/btn">
            Inquiry Now
            <i className="fa-solid fa-arrow-right text-[10px] group-hover/btn:translate-x-1 transition-transform"></i>
          </button>
          <button className="w-14 h-14 bg-slate-50 text-slate-300 hover:text-rose-500 rounded-xl transition-all border border-slate-100 flex items-center justify-center text-xl shadow-sm hover:shadow-lg">
            {HEART_ICON}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;

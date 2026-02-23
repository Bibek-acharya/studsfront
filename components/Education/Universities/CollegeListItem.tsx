import React from "react";
import { College } from "./types";

interface CollegeListItemProps {
  college: College;
}

const CollegeListItem: React.FC<CollegeListItemProps> = ({ college }) => {
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-5 flex items-center gap-5 hover:shadow-xl hover:border-primary-100 transition-all duration-300 cursor-pointer group animate-fadeInUp">
      <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-3 shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500">
        <img
          src={college.logo}
          alt="Logo"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-slate-900 font-black text-lg leading-tight mb-2 truncate group-hover:text-primary-600 transition-colors">
          {college.name}
        </h3>
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1.5 text-amber-500">
            <i className="fa-solid fa-star text-xs"></i>
            <span className="text-xs font-black text-slate-800">
              {college.rating}
            </span>
          </div>
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
            {college.reviews} reviews
          </span>
        </div>

        <div className="flex gap-2">
          <span className="bg-primary-50 text-primary-600 text-[9px] font-black px-3 py-1 rounded-lg border border-primary-100 uppercase tracking-widest">
            {college.affiliation}
          </span>
          <span className="bg-slate-50 text-slate-400 text-[9px] font-black px-3 py-1 rounded-lg border border-slate-100 uppercase tracking-widest">
            {college.type}
          </span>
        </div>
      </div>

      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 group-hover:bg-primary-50 group-hover:text-primary-600 group-hover:rotate-45 transition-all duration-500">
        <i className="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  );
};

export default CollegeListItem;

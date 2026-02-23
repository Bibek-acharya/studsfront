import React from "react";
import { University } from "./types";

interface AffiliationTabProps {
  university: University;
  isActive: boolean;
  onClick: () => void;
}

const AffiliationTab: React.FC<AffiliationTabProps> = ({
  university,
  isActive,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative flex-1 min-w-[240px] cursor-pointer p-6 rounded-xl border transition-all duration-300 group ${
        isActive
          ? "bg-white border-primary-500 shadow-xl shadow-primary-500/10 scale-105 z-10"
          : "bg-white border-transparent hover:border-slate-200 opacity-60 hover:opacity-100"
      }`}
    >
      {isActive && (
        <div className="absolute top-4 right-4 text-primary-500 animate-fadeIn">
          <i className="fa-solid fa-circle-check text-lg"></i>
        </div>
      )}
      <h3 className="text-slate-900 font-black text-sm mb-2 group-hover:text-primary-600 transition-colors uppercase tracking-tight">
        {university.name}
      </h3>
      <div className="flex items-center gap-2 text-primary-500 text-[10px] font-black uppercase tracking-widest">
        <span>{university.collegesCount.toLocaleString()} colleges</span>
        <i className="fa-solid fa-arrow-right-long transition-transform group-hover:translate-x-1"></i>
      </div>
    </div>
  );
};

export default AffiliationTab;

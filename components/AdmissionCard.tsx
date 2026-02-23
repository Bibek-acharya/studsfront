import React from "react";
import { AdmissionCardProps } from "../types";

const AdmissionCard: React.FC<{ uni: AdmissionCardProps }> = ({ uni }) => {
  return (
    <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden group hover:shadow-[0_20px_50px_rgb(59,130,246,0.1)] transition-all duration-500 hover:-translate-y-2">
      <div className="p-5 sm:p-7 pb-5">
        <div className="flex items-start gap-5">
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
              uni.colorTheme === "blue"
                ? "bg-blue-50 border-blue-100 text-blue-600"
                : uni.colorTheme === "purple"
                  ? "bg-purple-50 border-purple-100 text-purple-600"
                  : "bg-teal-50 border-teal-100 text-teal-600"
            }`}
          >
            <i className={`fa-solid ${uni.icon} text-xl sm:text-2xl`}></i>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 truncate group-hover:text-blue-600 transition-colors">
              {uni.university}
            </h2>
            <div className="flex items-center text-slate-500 text-sm mb-3">
              <i className="fa-solid fa-location-dot mr-1.5 opacity-70"></i>
              <span>{uni.location}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md text-amber-700 border border-amber-100 text-xs font-bold">
                <i className="fa-solid fa-star"></i> {uni.rating}
              </div>
              <span className="bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100 text-xs text-slate-600">
                {uni.affiliation}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-7 py-3 border-y border-slate-50 bg-slate-50/30 flex justify-between items-center">
        <span className="text-xs font-bold text-blue-600 bg-white px-3 py-1 rounded-full shadow-sm">
          {uni.programs.length} Programs
        </span>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Admission Status
        </h3>
      </div>

      <div className="p-7 space-y-3">
        {uni.programs.map((prog, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-white transition-all group/item cursor-pointer"
          >
            <div className="flex flex-col">
              <span className="font-bold text-slate-800 text-sm group-hover/item:text-blue-600">
                {prog.name}
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                {prog.level}
              </span>
            </div>
            <div className="flex items-center">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide border ${
                  prog.status === "Ongoing"
                    ? "bg-green-100 text-green-700 border-green-200"
                    : "bg-red-50 text-red-500 border-red-100"
                }`}
              >
                {prog.status === "Ongoing" && (
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                )}
                {prog.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdmissionCard;

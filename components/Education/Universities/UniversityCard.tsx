import React, { useState } from "react";
import { University } from "./types";

interface UniversityCardProps {
  university: University;
  onNavigate?: (view: any, data?: any) => void;
  onShowColleges?: (uniId: number) => void;
}

const UniversityCard: React.FC<UniversityCardProps> = ({
  university,
  onNavigate,
  onShowColleges,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100 flex flex-col gap-8 hover:shadow-2xl hover:border-primary-100 transition-all duration-500 group animate-fadeInUp h-full">
      {/* Header Info */}
      <div className="flex gap-6">
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-primary-50 flex items-center justify-center shrink-0 border border-primary-100 shadow-inner group-hover:scale-110 transition-transform duration-500">
          <img
            src={university.logo}
            alt={university.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-black text-slate-900 mb-1 group-hover:text-primary-600 transition-colors truncate">
              {university.name}
            </h2>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFavorite(!isFavorite);
              }}
              className={`w-10 h-10 flex items-center justify-center rounded-xl border border-slate-100 transition-all shadow-sm shrink-0 ${
                isFavorite
                  ? "bg-rose-50 border-rose-100 text-rose-500"
                  : "bg-slate-50 text-slate-300 hover:text-rose-500"
              }`}
            >
              <i
                className={`fa-solid fa-heart ${isFavorite ? "scale-110" : "scale-100"} transition-transform`}
              ></i>
            </button>
          </div>

          <div className="flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-widest mt-2 mb-4">
            <i className="fa-solid fa-location-dot text-primary-500"></i>
            <span className="truncate">{university.location}</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-star text-amber-400 text-sm"></i>
              <span className="font-black text-slate-900 text-sm uppercase tracking-widest">
                {university.rating.toFixed(1)} / 5.0
              </span>
            </div>
            <div className="flex items-center gap-2 border-l border-slate-100 pl-6">
              <i className="fa-solid fa-building-columns text-primary-500 text-sm"></i>
              <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest">
                {university.type}
              </span>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-lg border border-emerald-100 uppercase tracking-[0.2em]">
              Rank #{university.rank}
            </span>
            {university.isPopular && (
              <span className="bg-primary-50 text-primary-600 text-[10px] font-black px-3 py-1 rounded-lg border border-primary-100 uppercase tracking-[0.2em]">
                Popular
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats Divider */}
      <div className="grid grid-cols-2 border-y border-slate-50 py-8">
        <div className="flex items-center justify-center gap-5 border-r border-slate-50">
          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shadow-inner text-primary-500">
            <i className="fa-solid fa-book-open text-xl"></i>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {university.programsCount}
            </div>
            <div className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">
              Programs
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-5">
          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shadow-inner text-primary-500">
            <i className="fa-solid fa-graduation-cap text-xl"></i>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {university.collegesCount}
            </div>
            <div className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">
              Colleges
            </div>
          </div>
        </div>
      </div>

      {/* Popular Programs */}
      <div>
        <h3 className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4">
          Popular Streams
        </h3>
        <div className="flex flex-wrap gap-2">
          {university.popularPrograms.map((program, idx) => (
            <span
              key={idx}
              className="bg-slate-50 text-slate-500 text-[10px] font-black px-4 py-2 rounded-xl border border-slate-100 uppercase tracking-widest group-hover:border-primary-100 transition-colors"
            >
              {program}
            </span>
          ))}
          <button className="text-primary-600 text-[10px] font-black px-4 py-2 hover:underline uppercase tracking-widest">
            + More
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 mt-auto pt-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate?.("universityDetails", { id: university.id });
          }}
          className="flex-1 bg-white border-2 border-slate-100 hover:border-primary-600 hover:text-primary-600 text-slate-400 rounded-xl font-black text-[10px] uppercase tracking-widest py-4 transition-all shadow-sm"
        >
          Details
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onShowColleges?.(university.id);
          }}
          className="flex-[1.5] bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest py-4 transition-all shadow-xl shadow-primary-500/20 active:scale-95 flex justify-center items-center gap-3"
        >
          View Colleges <i className="fa-solid fa-arrow-right"></i>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className={`shrink-0 w-12 h-12 flex items-center justify-center rounded-xl border-2 transition-all shadow-sm ${
            isFavorite
              ? "bg-rose-50 border-rose-100 text-rose-500"
              : "bg-slate-50 border-slate-100 text-slate-300 hover:text-rose-500 hover:border-rose-100"
          }`}
        >
          <i
            className={`fa-solid fa-heart ${isFavorite ? "scale-110" : "scale-100"} transition-transform`}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default UniversityCard;

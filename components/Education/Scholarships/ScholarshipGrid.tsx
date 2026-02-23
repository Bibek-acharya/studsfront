import React, { useState } from "react";
import { getAllScholarships } from "../../../lib/scholarships-data";

interface ScholarshipGridProps {
  onNavigate?: (view: any, data?: any) => void;
}

const ScholarshipGrid: React.FC<ScholarshipGridProps> = ({ onNavigate }) => {
  const scholarships = getAllScholarships();
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  return (
    <div className="space-y-10">
      {/* Active filters / Results stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
            Showing{" "}
            <span className="text-slate-900 font-black">
              {scholarships.length}
            </span>{" "}
            scholarship results
          </p>
          <div className="flex gap-2 mt-4">
            <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-[10px] font-black text-slate-600 shadow-sm">
              Merit-Based{" "}
              <button className="text-slate-300 hover:text-rose-500 transition-colors">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-[10px] font-black text-slate-600 shadow-sm">
              Kathmandu{" "}
              <button className="text-slate-300 hover:text-rose-500 transition-colors">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white px-4 py-2.5 rounded-2xl border border-slate-100 shadow-sm">
          Sort By:
          <select className="bg-transparent border-none focus:ring-0 text-slate-900 font-black cursor-pointer p-0 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%23cbd5e1%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')] bg-[length:1em] bg-[right_center] pr-6">
            <option>Deadline</option>
            <option>Value (High)</option>
            <option>Relevance</option>
          </select>
        </div>
      </div>

      {/* Scholarship Grid - 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {scholarships.map((s, idx) => {
          const isClosingSoon = idx % 3 === 2;
          const isHighComp = idx % 4 === 0;

          return (
            <div
              key={s.id}
              className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:border-primary-100 transition-all duration-500 group flex flex-col animate-fadeInUp"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-primary-100">
                    {s.category}
                  </span>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-lg border border-emerald-100">
                    {s.covers}
                  </span>
                </div>
                <button
                  onClick={() => toggleFavorite(s.id)}
                  className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all shadow-sm ${
                    favorites.includes(s.id)
                      ? "bg-rose-50 text-rose-500"
                      : "bg-slate-50 text-slate-200 hover:text-rose-500"
                  }`}
                >
                  <i
                    className={`${favorites.includes(s.id) ? "fa-solid" : "fa-regular"} fa-heart text-xl`}
                  ></i>
                </button>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary-600 transition-colors leading-tight mb-2 uppercase tracking-tight">
                  {s.title}
                </h3>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <i className="fa-solid fa-building-columns text-primary-500"></i>{" "}
                  {s.provider}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8 py-6 border-y border-slate-50">
                <GridInfo label="Level" val={s.level} />
                <GridInfo label="Field" val={s.field} />
                <GridInfo label="Value" val={s.amount} />
                <GridInfo label="Location" val={s.location} />
              </div>

              {/* Status and Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 mt-auto">
                <div className="flex flex-wrap gap-2">
                  {isHighComp && (
                    <span className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-widest rounded-lg border border-amber-100">
                      <i className="fa-solid fa-fire animate-pulse"></i> High
                      Competition
                    </span>
                  )}
                  {isClosingSoon && (
                    <span className="bg-rose-50 text-rose-600 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-rose-100 animate-pulse">
                      Closing Soon
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8 pt-8 border-t border-slate-50">
                <button
                  onClick={() =>
                    onNavigate?.("scholarshipDetails", { id: s.id })
                  }
                  className="flex-1 py-4 border-2 border-slate-100 text-slate-400 hover:border-primary-600 hover:text-primary-600 transition-all font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-sm active:scale-95"
                >
                  Details
                </button>
                <button
                  onClick={() =>
                    onNavigate?.("scholarshipApplication", { id: s.id })
                  }
                  className="flex-[1.5] py-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl shadow-slate-900/10 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Apply Now
                  <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const GridInfo: React.FC<{ label: string; val: string }> = ({ label, val }) => (
  <div>
    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-0.5">
      {label}
    </p>
    <p className="text-xs font-black text-slate-800 leading-tight truncate">
      {val}
    </p>
  </div>
);

export default ScholarshipGrid;

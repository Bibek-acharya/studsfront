import React from "react";
import { Resource } from "../../../lib/resources-data";

interface ResourceCardProps {
  resource: Resource;
  onPreview: (id: number) => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onPreview }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-4 flex flex-col h-full hover:shadow-xl hover:border-blue-100 transition-all duration-500 group relative">
      {/* Top Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-rose-50 rounded-lg flex items-center justify-center text-rose-500 shadow-inner group-hover:scale-110 transition-transform shrink-0">
          <i className="fa-solid fa-file-pdf text-lg"></i>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate">
            TRIBHUVAN UNIVERSITY
          </div>
          <div className="mt-0.5">
            <span className="inline-block bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">
              Bachelors
            </span>
          </div>
        </div>
      </div>

      {/* Code and Faculty */}
      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">
        IOE-BCT-101 | CIVIL
      </div>

      {/* Title */}
      <h4 className="text-base font-black text-slate-800 leading-tight mb-3 group-hover:text-blue-600 transition-colors uppercase tracking-tight line-clamp-2">
        Employer Management system project Report
      </h4>

      {/* Stats Row */}
      <div className="flex items-center gap-3 text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">
        <span className="flex items-center gap-1">
          <i className="fa-regular fa-calendar text-slate-300"></i> Year 1
        </span>
        <span className="flex items-center gap-1">
          <i className="fa-regular fa-clock text-slate-300"></i> 2nd Sem
        </span>
      </div>

      {/* Author & Rating */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-50">
        <div className="flex items-center gap-2">
          <img
            src="https://api.dicebear.com/7.x/notionists/svg?seed=Jagdish"
            className="w-8 h-8 rounded-full bg-rose-500"
            alt=""
          />
          <div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-black text-slate-800 uppercase truncate max-w-[70px]">
                Jagdish Dha...
              </span>
              <i className="fa-solid fa-circle-check text-blue-500 text-[6px]"></i>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[9px] font-black text-slate-800">
          <i className="fa-solid fa-star text-amber-400"></i> 4.5{" "}
          <span className="text-slate-300 font-bold">(219)</span>
        </div>
      </div>

      {/* Footer Info & Actions */}
      <div className="flex items-center justify-between mb-4">
        <div
          className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${resource.type === "notes" ? "bg-blue-50 text-blue-600 border-blue-100" : resource.type === "solutions" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"}`}
        >
          {resource.type === "notes"
            ? "Notes"
            : resource.type === "solutions"
              ? "Solutions"
              : "Questions"}
        </div>
        <div className="flex items-center gap-3 text-[8px] font-black text-slate-400 uppercase tracking-widest">
          <span>64 Pages</span>
          <span className="flex items-center gap-1">
            <i className="fa-solid fa-circle text-[3px]"></i> 5.2K Views
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onPreview(resource.id)}
          className="flex-1 py-2.5 px-3 bg-white border border-slate-200 rounded-xl text-[9px] font-black text-slate-800 uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
        >
          <i className="fa-regular fa-eye"></i> Preview
        </button>
        <button className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/10">
          <i className="fa-solid fa-download"></i>
        </button>
      </div>
    </div>
  );
};

export default ResourceCard;

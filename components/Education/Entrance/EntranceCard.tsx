import React from "react";
import { Exam } from "./types";

interface EntranceCardProps {
  exam: Exam;
  onViewDetails: (id: string) => void;
}

const EntranceCard: React.FC<EntranceCardProps> = ({ exam, onViewDetails }) => {
  const isOngoing = exam.status === "Ongoing";

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col animate-fadeInUp">
      <div
        className="relative h-48 sm:h-56 overflow-hidden cursor-pointer"
        onClick={() => onViewDetails(exam.id)}
      >
        <img
          src={exam.imageUrl}
          alt={exam.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <span
            className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${
              isOngoing ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full mr-2 bg-white ${isOngoing ? "animate-pulse" : ""}`}
            />
            {exam.status}
          </span>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1">
        <h3
          className="text-2xl font-black text-slate-900 mb-4 cursor-pointer hover:text-primary-600 transition-colors leading-tight"
          onClick={() => onViewDetails(exam.id)}
        >
          {exam.title}
        </h3>

        <div className="space-y-4 mb-8">
          <div className="flex items-center text-slate-400 gap-3 text-xs font-bold uppercase tracking-widest">
            <i className="fa-solid fa-building-columns text-primary-500 w-4 text-center"></i>
            <span>{exam.university}</span>
          </div>
          <div className="flex items-center text-slate-400 gap-3 text-xs font-bold uppercase tracking-widest">
            <i className="fa-solid fa-layer-group text-primary-500 w-4 text-center"></i>
            <span>{exam.faculty}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-2 border-b border-slate-100 mb-8">
          <div>
            <p className="text-[9px] uppercase font-black text-slate-300 tracking-[0.2em] mb-1">
              Exam Date
            </p>
            <p className="text-sm font-black text-slate-800 uppercase tracking-widest">
              {exam.examDate}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[9px] uppercase font-black text-slate-300 tracking-[0.2em] mb-1">
              Nepali Date
            </p>
            <p className="text-sm font-black text-slate-800 uppercase tracking-widest">
              {exam.nepaliDate}
            </p>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-3">
          <button
            onClick={() => onViewDetails(exam.id)}
            className="flex-1 bg-white border-2 border-slate-100 hover:border-primary-600 hover:text-primary-600 text-slate-400 font-black py-4 rounded-2xl transition-all text-xs uppercase tracking-widest shadow-sm active:scale-95"
          >
            Details
          </button>
          <button className="flex-[1.5] bg-slate-900 hover:bg-black text-white font-black py-4 px-4 rounded-2xl transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center justify-center gap-2 group/btn text-xs uppercase tracking-widest">
            Apply Now
            <i className="fa-solid fa-arrow-right text-[10px] group-hover/btn:translate-x-1 transition-transform"></i>
          </button>
          <button className="w-14 h-14 flex items-center justify-center border border-slate-100 rounded-2xl bg-slate-50 text-slate-300 hover:text-rose-500 hover:bg-white hover:shadow-lg transition-all active:scale-90">
            <i className="fa-regular fa-heart text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntranceCard;

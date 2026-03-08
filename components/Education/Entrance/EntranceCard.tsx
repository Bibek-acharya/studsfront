import React from "react";
import { Exam } from "./types";

interface EntranceCardProps {
  exam: Exam;
  onViewDetails: (id: string) => void;
}

const EntranceCard: React.FC<EntranceCardProps> = ({ exam, onViewDetails }) => {
  const statusClass =
    exam.status === "Ongoing"
      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
      : exam.status === "Upcoming"
        ? "bg-amber-50 text-amber-600 border-amber-100"
        : "bg-rose-50 text-rose-600 border-rose-100";

  const dotClass =
    exam.status === "Ongoing"
      ? "bg-emerald-500"
      : exam.status === "Upcoming"
        ? "bg-amber-500"
        : "bg-rose-500";

  const isUpcoming = exam.status === "Upcoming";

  const applyStyle = exam.university.toLowerCase().includes("ctevt")
    ? "bg-blue-600 hover:bg-blue-700"
    : "bg-[#0f172a] hover:bg-slate-800";

  return (
    <article className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 group flex flex-col">
      <div
        className="relative h-36 sm:h-40 overflow-hidden bg-slate-100"
        onClick={() => onViewDetails(exam.id)}
      >
        <img
          src={exam.imageUrl}
          alt={exam.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2">
          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wide ${statusClass}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`}></span>
            {exam.status}
          </span>
        </div>

        <h3
          className="text-base sm:text-lg font-bold text-slate-800 mb-1 leading-tight line-clamp-2"
          onClick={() => onViewDetails(exam.id)}
        >
          {exam.title}
        </h3>

        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500 mb-3">
          <i className="fa-solid fa-building-columns w-3.5 h-3.5 flex-shrink-0"></i>
          <span className="truncate">{exam.university}</span>
          <span className="text-slate-300">|</span>
          <span className="truncate">{exam.faculty}</span>
        </div>

        <div className="bg-slate-50 rounded-lg p-2.5 flex justify-between items-center mb-4 border border-slate-100 mt-auto">
          <div>
            <p className="text-[9px] text-slate-400 font-medium uppercase tracking-wider mb-0.5">
              Exam Date
            </p>
            <p className="text-xs font-semibold text-slate-700">{exam.examDate}</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-slate-400 font-medium uppercase tracking-wider mb-0.5">
              Nepali Date
            </p>
            <p className="text-xs font-semibold text-slate-700">{exam.nepaliDate}</p>
          </div>
        </div>

        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onViewDetails(exam.id)}
            className="flex-1 py-2 px-3 bg-white border border-slate-200 text-slate-700 font-medium text-xs rounded-lg hover:bg-slate-50 transition-colors"
          >
            Details
          </button>
          <button
            disabled={isUpcoming}
            className={`flex-1 py-2 px-3 text-white font-medium text-xs rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${applyStyle}`}
          >
            {isUpcoming ? "Opens Soon" : "Apply Now"}
          </button>
          <button className="w-9 h-[34px] flex-shrink-0 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-colors">
            <i className="fa-regular fa-heart w-4 h-4"></i>
          </button>
        </div>
      </div>
    </article>
  );
};

export default EntranceCard;

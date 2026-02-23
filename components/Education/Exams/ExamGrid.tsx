import React from "react";
import { useQuery } from "@tanstack/react-query";
import { apiService, EducationExam } from "../../../services/api";

interface ExamGridProps {
  onNavigate?: (view: any, data?: any) => void;
}

const defaultExams: EducationExam[] = [
  {
    id: "neb-class-12",
    title: "NEB Class 12 Annual Examination 2081",
    board: "NEB (National Examination Board)",
    badges: ["BOARD EXAM", "UPCOMING"],
    level: "+2 / Intermediate",
    type: "Board Exam",
    examDate: "Baishakh 14, 2082 (Apr 27, 2025)",
    formDeadline: "Magh 20, 2081 (Feb 3, 2025)",
    fee: "NPR 600",
    highlights: [
      "Official routine published",
      "Form filling active",
      "Admit cards by Chaitra end",
    ],
    description: "Annual final examination for Grade 12 students across Nepal.",
    status: "active",
  },
  {
    id: "ioe-entrance",
    title: "IOE Entrance Examination 2081",
    board: "Institute of Engineering, TU",
    badges: ["ENTRANCE", "POPULAR"],
    level: "Undergraduate (Bachelor)",
    type: "Entrance Exam",
    examDate: "Jestha 2082 (May/June 2025)",
    formDeadline: "Chaitra 2081 (Mar/Apr 2025)",
    fee: "NPR 2000",
    highlights: [
      "BE Computer, Civil, Arch",
      "140 MCQ Questions",
      "Pulchowk, Thapathali seats",
    ],
    description: "Entrance exam for BE programs at IOE constituent campuses.",
    status: "upcoming",
  },
  {
    id: "cee-medical",
    title: "CEE Medical Entrance 2081",
    board: "Institute of Medicine, TU",
    badges: ["ENTRANCE", "COMPETITIVE"],
    level: "Undergraduate (Bachelor)",
    type: "Entrance Exam",
    examDate: "Jestha 2082 (May/June 2025)",
    formDeadline: "Chaitra 2081 (Mar/Apr 2025)",
    fee: "NPR 2500",
    highlights: [
      "MBBS, BDS, BSc Nursing",
      "200 MCQ Questions",
      "IOM, BPKIHS, PAHS seats",
    ],
    description: "Common Entrance Examination for Medical and Health Sciences.",
    status: "upcoming",
  },
  {
    id: "cmat",
    title: "CMAT (Common Management Admission Test)",
    board: "Faculty of Management, TU",
    badges: ["ENTRANCE", "POPULAR"],
    level: "Undergraduate (Bachelor)",
    type: "Entrance Exam",
    examDate: "Jestha 2082 (May/June 2025)",
    formDeadline: "Chaitra 2081 (Mar/Apr 2025)",
    fee: "NPR 1500",
    highlights: ["BBA, BHM programs", "Multiple test centers", "High demand"],
    description: "Entrance for management programs under TU affiliation.",
    status: "upcoming",
  },
];

const ExamGrid: React.FC<ExamGridProps> = ({ onNavigate }) => {
  const { data } = useQuery({
    queryKey: ["education-exams"],
    queryFn: () => apiService.getEducationExams(),
  });

  const exams = data?.data?.exams || defaultExams;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "upcoming":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "result-pending":
        return "bg-blue-50 text-blue-700 border-blue-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Form Filling Active";
      case "upcoming":
        return "Upcoming";
      case "result-pending":
        return "Result Pending";
      default:
        return "Available";
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Result Stats */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
          Active:
        </span>
        <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-[10px] font-black text-slate-600 shadow-sm">
          Entrance Exam{" "}
          <button className="text-slate-300 hover:text-rose-500 transition-colors">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <button className="text-[10px] font-black text-primary-600 hover:underline uppercase tracking-widest">
          Clear All
        </button>
      </div>

      <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
        Showing{" "}
        <span className="text-slate-900 font-black">{exams.length}</span> exams
        matching your filters
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {exams.map((exam, idx) => (
          <div
            key={exam.id}
            className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group animate-fadeInUp"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            {/* Badges Row */}
            <div className="flex flex-wrap gap-2 mb-6">
              {exam.badges.map((b) => (
                <span
                  key={b}
                  className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                    b === "BOARD EXAM"
                      ? "bg-purple-50 text-purple-600 border-purple-100"
                      : b === "ENTRANCE"
                        ? "bg-blue-50 text-blue-600 border-blue-100"
                        : "bg-slate-50 text-slate-400 border-slate-100"
                  }`}
                >
                  {b}
                </span>
              ))}
            </div>

            {/* Title & Stats */}
            <div className="mb-8">
              <h3
                className="text-xl font-black text-slate-900 group-hover:text-primary-600 transition-colors leading-tight mb-2 truncate cursor-pointer"
                onClick={() => onNavigate?.("examDetails", { id: exam.id })}
              >
                {exam.title}
              </h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <i className="fa-solid fa-building-columns text-primary-400"></i>{" "}
                {exam.board}
              </p>
            </div>

            <p className="text-sm text-slate-500 font-medium line-clamp-2 mb-8">
              {exam.description}
            </p>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-6 pb-8 border-b border-slate-50 mb-8">
              <InfoItem
                icon="fa-calendar"
                label="Exam Date"
                val={exam.examDate}
              />
              <InfoItem
                icon="fa-clock"
                label="Deadline"
                val={exam.formDeadline}
              />
              <InfoItem icon="fa-layer-group" label="Type" val={exam.type} />
              <InfoItem icon="fa-wallet" label="Fee" val={exam.fee} />
            </div>

            {/* Highlights Section */}
            <div className="mb-8 flex-grow">
              <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">
                Key Highlights
              </h4>
              <ul className="space-y-3">
                {exam.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center text-[10px] shadow-inner">
                      <i className="fa-solid fa-check"></i>
                    </div>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Status Badge */}
            <div className="mb-8">
              <span
                className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(exam.status)} shadow-sm`}
              >
                {exam.status === "active" && (
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse mr-2" />
                )}
                {getStatusText(exam.status)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => onNavigate?.("examDetails", { id: exam.id })}
                className="flex-1 py-4 bg-white border-2 border-slate-100 hover:border-primary-600 hover:text-primary-600 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all"
              >
                Details
              </button>
              <button className="flex-1 py-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/10 transition-all active:scale-95 flex items-center justify-center gap-2">
                Notify Me
                <i className="fa-regular fa-bell"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-10">
        <button className="px-10 py-4 bg-white border border-slate-200 text-slate-600 font-black text-xs uppercase tracking-widest rounded-full hover:bg-slate-50 transition-all shadow-sm">
          Load More Exams
        </button>
      </div>
    </div>
  );
};

const InfoItem: React.FC<{ icon: string; label: string; val: string }> = ({
  icon,
  label,
  val,
}) => (
  <div className="flex items-start gap-3">
    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-primary-500 text-sm shrink-0 shadow-sm">
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div className="min-w-0">
      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-0.5">
        {label}
      </p>
      <p className="text-xs font-black text-slate-800 leading-tight truncate">
        {val}
      </p>
    </div>
  </div>
);

export default ExamGrid;

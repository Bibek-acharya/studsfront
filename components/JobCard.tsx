import React from "react";

interface Job {
  id: number;
  title: string;
  company: string;
  logo: string;
  logoColor: string;
  location: string;
  type: string;
  salary: string;
  description: string;
}

interface JobCardProps {
  job: Job;
  onAction?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onAction }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group flex flex-col h-full">
      <div className="flex items-start gap-5 mb-5">
        <div className="w-14 h-14 rounded-lg bg-slate-50 border border-gray-100 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
          <i className={`fa-brands ${job.logo} text-3xl ${job.logoColor}`}></i>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
            {job.title}
          </h3>
          <div className="flex items-center gap-2">
            <p className="text-gray-500 font-bold text-xs">{job.company}</p>
            <div className="text-blue-500 text-[10px]">
              <i className="fa-solid fa-circle-check"></i>
            </div>
          </div>
        </div>
        <button className="text-gray-300 hover:text-blue-500 transition-colors">
          <i className="fa-regular fa-bookmark text-lg"></i>
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-slate-50 text-slate-500">
          <i className="fa-solid fa-location-dot text-slate-400"></i>
          {job.location}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-slate-50 text-slate-500">
          <i className="fa-solid fa-clock text-slate-400"></i>
          {job.type}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold bg-green-50 text-green-700 border border-green-100">
          <i className="fa-solid fa-dollar-sign"></i>
          {job.salary}
        </span>
      </div>

      <hr className="border-gray-50 mb-5" />

      <div className="mb-6 flex-grow">
        <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
          Role Overview
        </h4>
        <div className="min-h-[60px]">
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
            {job.description}
          </p>
        </div>
      </div>

      <button
        onClick={onAction}
        className="w-full font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 active:scale-95 text-sm mt-auto"
      >
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
        Quick Apply
      </button>
    </div>
  );
};

export default JobCard;

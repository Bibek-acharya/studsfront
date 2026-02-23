import React from "react";
import { JobListing } from "../../lib/jobs-data";

interface JobDetailHeaderProps {
  job: JobListing;
}

const JobDetailHeader: React.FC<JobDetailHeaderProps> = ({ job }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pt-24 md:pt-32">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section - Main Info */}
          <div className="flex-1">
            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
              <span className="hover:text-primary-600 cursor-pointer">
                Jobs
              </span>
              <i className="fa-solid fa-chevron-right text-[8px]"></i>
              <span className="text-primary-600">{job.title}</span>
            </nav>

            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
              {job.title}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 flex items-center justify-center p-2">
                <img
                  src={
                    job.companyLogo ||
                    "https://ui-avatars.com/api/?name=" + job.companyName
                  }
                  alt={job.companyName}
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <div>
                <div className="font-black text-slate-900 text-lg leading-none mb-2">
                  {job.companyName}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded-md text-xs font-black border border-amber-100 uppercase tracking-widest">
                    <i className="fa-solid fa-star text-[10px]"></i>{" "}
                    {job.companyRating}
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {job.companyReviews.toLocaleString()} reviews
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 py-6 border-y border-slate-50">
              <MetaBlock
                icon="fa-clock"
                label="Experience"
                value={job.experienceLevel}
              />
              <MetaBlock
                icon="fa-briefcase"
                label="Job Type"
                value={job.jobType[0]}
              />
              <MetaBlock
                icon="fa-location-dot"
                label="Location"
                value={job.location}
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {job.jobType.map((type, idx) => (
                <span
                  key={idx}
                  className="px-4 py-1.5 bg-slate-50 text-slate-500 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest"
                >
                  {type}
                </span>
              ))}
            </div>

            <div className="inline-flex items-center gap-3 bg-emerald-50 text-emerald-600 px-5 py-2.5 rounded-2xl border border-emerald-100 shadow-sm">
              <i className="fa-solid fa-money-bill-wave"></i>
              <span className="font-black text-xs uppercase tracking-[0.2em]">
                {job.salary}
              </span>
            </div>
          </div>

          {/* Right Section - Sticky Action Card */}
          <div className="lg:w-80">
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-6 sticky top-28">
              {/* User Info */}
              <div className="text-center pb-6 border-b border-slate-50">
                <div className="relative inline-block mb-4">
                  <img
                    src="https://api.dicebear.com/9.x/avataaars/svg?seed=Jagdish"
                    alt="User"
                    className="w-20 h-20 rounded-2xl mx-auto border-4 border-slate-50 bg-white shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full"></div>
                </div>
                <p className="font-black text-slate-900 text-lg leading-tight">
                  Jagdish Dhami
                </p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                  jagdishdhami2009@gmail.com
                </p>
              </div>

              {/* Eligibility Badge */}
              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-circle-check text-emerald-600"></i>
                  <span className="font-black text-[10px] text-emerald-700 uppercase tracking-widest">
                    Eligible to Apply
                  </span>
                </div>
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>

              {/* Action Buttons */}
              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-primary-500/20 transition-all active:scale-95 text-xs uppercase tracking-widest flex items-center justify-center gap-3">
                Quick Apply
                <i className="fa-solid fa-paper-plane text-[10px]"></i>
              </button>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <MiniStat value={job.openings} label="Openings" />
                <MiniStat value={job.applicantCount + "+"} label="Applicants" />
                <MiniStat value={job.impressions} label="Impression" />
              </div>

              {/* Interaction Buttons */}
              <div className="flex gap-3 pt-6 border-t border-slate-50">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-black text-[10px] uppercase tracking-widest text-slate-500">
                  <i className="fa-regular fa-heart"></i>
                  <span>Save</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-black text-[10px] uppercase tracking-widest text-slate-500">
                  <i className="fa-solid fa-share-nodes"></i>
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetaBlock: React.FC<{ icon: string; label: string; value: string }> = ({
  icon,
  label,
  value,
}) => (
  <div className="flex items-start gap-3">
    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0 shadow-inner">
      <i className={`fa-solid ${icon} text-sm`}></i>
    </div>
    <div>
      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-0.5">
        {label}
      </p>
      <p className="text-sm font-black text-slate-800 leading-tight">{value}</p>
    </div>
  </div>
);

const MiniStat: React.FC<{ value: string | number; label: string }> = ({
  value,
  label,
}) => (
  <div className="bg-slate-50/50 p-2 rounded-xl border border-slate-100">
    <p className="text-sm font-black text-slate-900 tracking-tight">{value}</p>
    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">
      {label}
    </p>
  </div>
);

export default JobDetailHeader;

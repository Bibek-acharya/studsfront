import React from "react";
import { JobListing } from "../../lib/jobs-data";

interface JobDetailContentProps {
  job: JobListing;
  onNavigate: (view: any, data?: any) => void;
}

const JobDetailContent: React.FC<JobDetailContentProps> = ({
  job,
  onNavigate,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content Column */}
        <div className="lg:col-span-8 space-y-10">
          {/* Job Expires Section */}
          <div className="bg-amber-50 rounded-xl p-6 border border-amber-100 shadow-sm flex items-center gap-5">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-amber-500 shadow-sm shrink-0">
              <i className="fa-solid fa-hourglass-half text-xl"></i>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-0.5">
                Application Deadline
              </p>
              <p className="text-base font-black text-amber-900">
                {job.jobExpire}
              </p>
            </div>
          </div>

          {/* Job Highlights */}
          <section className="bg-white rounded-2xl p-10 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight">
              Job Highlights
            </h3>
            <ul className="space-y-5">
              {job.jobHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-4 group">
                  <div className="w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center shrink-0 mt-0.5 border border-primary-100 group-hover:bg-primary-600 transition-colors">
                    <i className="fa-solid fa-check text-[10px] text-primary-600 group-hover:text-white transition-colors"></i>
                  </div>
                  <span className="text-slate-600 font-medium leading-relaxed">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Match Score */}
          <section className="bg-white rounded-2xl p-10 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight">
              Job Match Score
            </h3>
            <div className="flex flex-wrap gap-3">
              {job.matchScore.map((score, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all ${
                    score.status === "active"
                      ? "bg-primary-50 text-primary-600 border-primary-100 shadow-sm"
                      : "bg-slate-50 text-slate-400 border-slate-200 opacity-60"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${score.status === "active" ? "bg-primary-600 animate-pulse" : "bg-slate-300"}`}
                  />
                  <span className="text-xs font-black uppercase tracking-widest">
                    {score.label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Job Description */}
          <section className="bg-white rounded-2xl p-10 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight">
              Job Description
            </h3>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line font-medium text-lg">
              {job.description}
            </p>
          </section>

          {/* Responsibilities */}
          <section className="bg-white rounded-2xl p-10 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight">
              Responsibilities and Duties
            </h3>
            <ul className="space-y-4">
              {job.responsibilities.map((resp, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 group hover:border-primary-100 hover:bg-white transition-all"
                >
                  <span className="text-primary-600 font-black mt-0.5 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                  <span className="text-slate-700 font-medium text-sm leading-relaxed">
                    {resp}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Requirements */}
          <section className="bg-white rounded-2xl p-10 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight">
              Required Experience & Skills
            </h3>
            <ul className="space-y-4">
              {job.requirements.map((req, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-primary-100 hover:bg-white transition-all"
                >
                  <i className="fa-solid fa-circle-check text-emerald-500 mt-1"></i>
                  <span className="text-slate-700 font-medium text-sm leading-relaxed">
                    {req}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Similar Jobs Section */}
          <div className="space-y-8 pt-10">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-4">
              Similar Jobs
              <div className="h-px bg-slate-200 flex-1"></div>
            </h3>
            <div className="grid grid-cols-1 gap-6">
              {job.similarJobs.map((similar) => (
                <div
                  key={similar.id}
                  onClick={() => onNavigate("jobDetails", { id: similar.id })}
                  className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:border-primary-100 transition-all cursor-pointer group"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-lg shrink-0 transition-transform group-hover:scale-105">
                      {similar.company[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-black text-xl text-slate-900 group-hover:text-primary-600 transition-colors">
                          {similar.title}
                        </h4>
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                          {similar.postedDaysAgo} Days Ago
                        </span>
                      </div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                        {similar.company}
                      </p>

                      <div className="flex flex-wrap gap-4 mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <div className="flex items-center gap-2">
                          <i className="fa-solid fa-clock text-slate-200"></i>{" "}
                          {similar.experience}
                        </div>
                        <div className="flex items-center gap-2">
                          <i className="fa-solid fa-location-dot text-slate-200"></i>{" "}
                          {similar.location}
                        </div>
                        <div className="flex items-center gap-1.5 text-amber-500">
                          <i className="fa-solid fa-star"></i> {similar.rating}
                        </div>
                      </div>

                      <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed mb-6">
                        {similar.description}
                      </p>

                      <div className="flex justify-between items-center border-t border-slate-50 pt-6">
                        <button className="text-primary-600 font-black text-[10px] uppercase tracking-widest flex items-center gap-3 group/btn">
                          View Posting{" "}
                          <i className="fa-solid fa-arrow-right transition-transform group-hover/btn:translate-x-2"></i>
                        </button>
                        <button className="w-10 h-10 rounded-xl border border-slate-100 text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all flex items-center justify-center">
                          <i className="fa-regular fa-heart"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Interests Column */}
        <div className="lg:col-span-4 hidden lg:block">
          <div className="bg-white rounded-xl p-10 border border-slate-100 shadow-sm sticky top-28">
            <h3 className="text-xl font-black text-slate-900 mb-10 uppercase tracking-tight leading-tight">
              Interested in?
            </h3>
            <div className="space-y-12">
              {job.similarJobs.slice(0, 3).map((similar) => (
                <div
                  key={similar.id}
                  className="group cursor-pointer"
                  onClick={() => onNavigate("jobDetails", { id: similar.id })}
                >
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm shrink-0">
                      <span className="font-black text-lg">
                        {similar.company[0]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-sm text-slate-900 group-hover:text-primary-600 transition-colors leading-tight mb-2 line-clamp-2">
                        {similar.title}
                      </h4>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                        {similar.company}
                      </p>

                      <div className="flex items-center gap-2 mb-4">
                        <i className="fa-solid fa-star text-amber-400 text-[10px]"></i>
                        <span className="text-[10px] font-black text-slate-400">
                          {similar.rating}
                        </span>
                      </div>

                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          <i className="fa-solid fa-clock opacity-40"></i>{" "}
                          {similar.experience}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          <i className="fa-solid fa-location-dot opacity-40"></i>{" "}
                          {similar.location}
                        </div>
                      </div>

                      <button className="w-full py-2.5 rounded-xl border border-slate-100 text-slate-400 group-hover:border-primary-100 group-hover:text-primary-600 group-hover:bg-primary-50 transition-all font-black text-[10px] uppercase tracking-widest">
                        Save Job
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-10 border-t border-slate-50 text-center">
              <button
                onClick={() => onNavigate("jobsPage")}
                className="text-primary-600 font-black text-[10px] uppercase tracking-widest hover:underline hover:text-primary-800 transition-colors"
              >
                View all vacancies{" "}
                <i className="fa-solid fa-arrow-right-long ml-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailContent;

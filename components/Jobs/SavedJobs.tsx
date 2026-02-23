import React, { useState } from "react";

interface SavedJob {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  icon: string;
  iconBg: string;
  savedAt: string;
}

const SavedJobs: React.FC = () => {
  const [jobs, setJobs] = useState<SavedJob[]>([
    {
      id: 1,
      title: "Senior Product Designer",
      company: "Figma",
      location: "Remote",
      salary: "$140k - $180k",
      type: "Full-time",
      icon: "fa-figma",
      iconBg: "bg-purple-600",
      savedAt: "Saved 2 days ago",
    },
    {
      id: 2,
      title: "UX Researcher",
      company: "Spotify",
      location: "New York, NY",
      salary: "$120k - $150k",
      type: "Contract",
      icon: "fa-spotify",
      iconBg: "bg-green-500",
      savedAt: "Saved 5 hours ago",
    },
    {
      id: 3,
      title: "Frontend Engineer",
      company: "Atlassian",
      location: "Remote",
      salary: "$150k - $200k",
      type: "Full-time",
      icon: "fa-atlassian",
      iconBg: "bg-blue-600",
      savedAt: "Saved 1 week ago",
    },
    {
      id: 4,
      title: "Backend Developer",
      company: "Amazon",
      location: "Pokhara",
      salary: "Negotiable",
      type: "Full-time",
      icon: "fa-amazon",
      iconBg: "bg-orange-500",
      savedAt: "Saved 3 days ago",
    },
  ]);

  const removeJob = (id: number) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 md:px-8 font-jakarta">
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Saved <span className="text-primary-600">Jobs</span>
            </h1>
            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-xl">
              Keep track of opportunities that align with your career goals.
              Manage and apply when you're ready.
            </p>
          </div>
          <div className="px-8 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 group hover:shadow-xl transition-all duration-500">
            <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center text-xl font-black shadow-inner group-hover:scale-110 transition-transform">
              {jobs.length}
            </div>
            <div>
              <p className="text-xs font-black text-slate-300 uppercase tracking-widest">
                Total Saved
              </p>
              <p className="text-sm font-black text-slate-900">
                Active Vacancies
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {jobs.map((job, idx) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden animate-fadeInUp"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 opacity-30 group-hover:scale-110 transition-transform"></div>

                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div
                    className={`w-16 h-16 rounded-2xl ${job.iconBg} flex items-center justify-center text-white text-3xl shadow-xl transition-transform group-hover:scale-110`}
                  >
                    <i className={`fa-brands ${job.icon}`}></i>
                  </div>
                  <button
                    onClick={() => removeJob(job.id)}
                    className="w-10 h-10 rounded-xl bg-slate-50 text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center group/btn"
                  >
                    <i className="fa-solid fa-heart text-xl group-hover/btn:scale-110"></i>
                  </button>
                </div>

                <div className="mb-8 relative z-10">
                  <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-primary-600 transition-colors line-clamp-1">
                    {job.title}
                  </h3>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                    {job.company}
                  </p>
                </div>

                <div className="space-y-4 mb-10 relative z-10">
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <i className="fa-solid fa-location-dot text-slate-200"></i>{" "}
                    {job.location}
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <i className="fa-solid fa-money-bill-wave text-slate-200"></i>{" "}
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <i className="fa-solid fa-clock text-slate-200"></i>{" "}
                    {job.type}
                  </div>
                </div>

                <div className="flex flex-col gap-3 relative z-10">
                  <button className="w-full py-4 bg-primary-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all active:scale-95">
                    Apply Now
                  </button>
                  <p className="text-[10px] font-black text-slate-300 text-center uppercase tracking-widest mt-2">
                    {job.savedAt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-20 text-center border border-slate-100 shadow-sm animate-fadeInUp flex flex-col items-center">
            <div className="relative mb-12">
              <div className="w-48 h-48 bg-rose-50 rounded-full flex items-center justify-center animate-float shadow-inner">
                <i className="fa-regular fa-heart text-7xl text-rose-200"></i>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 bg-white rounded-xl shadow-2xl flex items-center justify-center text-primary-600 border border-primary-50 animate-bounce">
                <i className="fa-solid fa-magnifying-glass text-2xl"></i>
              </div>
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">
              Your heart list is empty
            </h3>
            <p className="text-slate-500 text-lg font-medium max-w-sm mb-12 leading-relaxed">
              Tap the heart icon on any job card to save it here for later.
            </p>
            <button className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all hover:bg-black active:scale-95">
              Discover Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;

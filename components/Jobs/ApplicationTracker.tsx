import React, { useState, useEffect } from "react";

interface JobApplication {
  id: number;
  title: string;
  company: string;
  location: string;
  time: string;
  status: "Viewed" | "Pending" | "Rejected" | "Shortlisted";
  color: string;
}

const ApplicationTracker: React.FC = () => {
  const [isEmpty, setIsEmpty] = useState(false);
  const [stats, setStats] = useState({ total: 12, updates: 3 });
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    icon: string;
  }>({
    show: false,
    message: "",
    icon: "✨",
  });

  const recentJobs: JobApplication[] = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechFlow Systems",
      location: "Remote",
      time: "2h ago",
      status: "Viewed",
      color: "text-green-600 bg-green-50 border-green-100",
    },
    {
      id: 2,
      title: "Lead UI/UX Designer",
      company: "Creative Studio",
      location: "New York, NY",
      time: "5h ago",
      status: "Pending",
      color: "text-yellow-600 bg-yellow-50 border-yellow-100",
    },
    {
      id: 3,
      title: "Product Manager",
      company: "Innovate Inc",
      location: "San Francisco, CA",
      time: "1d ago",
      status: "Rejected",
      color: "text-red-600 bg-red-50 border-red-100",
    },
    {
      id: 4,
      title: "Full Stack Engineer",
      company: "Nebula Corp",
      location: "Austin, TX",
      time: "2d ago",
      status: "Shortlisted",
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
  ];

  const showToast = (message: string, icon: string) => {
    setToast({ show: true, message, icon });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
  };

  const toggleState = () => {
    setIsEmpty(!isEmpty);
    if (!isEmpty) {
      showToast("View: Empty State", "🔄");
    } else {
      showToast("View: Active Dashboard", "📊");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 md:px-8 font-jakarta relative">
      {/* Simulation Toggle */}
      <div className="max-w-5xl mx-auto mb-6 flex justify-end">
        <button
          onClick={toggleState}
          className="group flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200 hover:border-primary-500 transition-all"
        >
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {isEmpty ? "Simulate Populated" : "Simulate Empty"}
          </span>
          <i
            className={`fa-solid ${isEmpty ? "fa-toggle-off text-slate-300" : "fa-toggle-on text-primary-600"} text-xl`}
          ></i>
        </button>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden flex flex-col">
        {/* Header Section */}
        <div className="px-10 pt-10 pb-6 flex justify-between items-center border-b border-slate-50">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Job application status
            </h2>
            <p className="text-sm text-slate-400 font-bold mt-1 uppercase tracking-widest">
              Track and manage your recent applications
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="flex-1 p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT COLUMN: Metrics */}
          <div className="lg:col-span-5 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <MetricCard
                label="Total Applies"
                value={isEmpty ? 0 : stats.total}
                icon="fa-file-lines"
                color="blue"
                pulse={!isEmpty}
              />
              <MetricCard
                label="App Updates"
                value={isEmpty ? 0 : stats.updates}
                icon="fa-bell"
                color="purple"
              />
            </div>

            {/* Premium Banner */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-100 rounded-2xl p-8 relative overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer">
              <div className="flex items-start gap-6 relative z-10">
                <div className="bg-white w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center text-primary-600 shrink-0 border border-blue-50 transition-transform group-hover:scale-110">
                  <i className="fa-solid fa-bolt text-2xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-black text-slate-900 mb-1">
                    Highlight your application
                  </h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed mb-4">
                    Boost visibility by 3x! Let recruiters know you're available
                    immediately.
                  </p>
                  <div className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-primary-600 group-hover:gap-4 transition-all">
                    Activate Now{" "}
                    <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-2"></i>
                  </div>
                </div>
              </div>
              {/* Decorative blob */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-100 rounded-full opacity-40 blur-2xl group-hover:scale-150 transition-all duration-700"></div>
            </div>
          </div>

          {/* RIGHT COLUMN: Activity Feed */}
          <div className="lg:col-span-7 bg-slate-50/50 rounded-2xl border border-slate-100 p-2 min-h-[400px] flex flex-col relative overflow-hidden">
            {isEmpty ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center animate-fadeInUp">
                <div className="w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center mb-8 relative">
                  <div className="absolute inset-0 bg-primary-50 rounded-full animate-ping opacity-20"></div>
                  <i className="fa-solid fa-briefcase text-5xl text-slate-100 relative z-10"></i>
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-3">
                  No active applications
                </h4>
                <p className="text-slate-500 text-sm font-medium max-w-xs mx-auto leading-relaxed mb-8">
                  You haven't applied to any jobs yet. Start your search today
                  to track your progress and manage interviews here.
                </p>
                <button
                  onClick={() => showToast("Redirecting to Jobs...", "🔍")}
                  className="text-primary-600 font-black text-[10px] uppercase tracking-[0.2em] hover:text-primary-800 transition-all flex items-center gap-3"
                >
                  Browse open positions{" "}
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            ) : (
              <div className="h-full flex flex-col p-6 animate-fadeInUp">
                <div className="flex justify-between items-center mb-8">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    Recent Activity
                  </h4>
                  <button className="text-[10px] font-black text-primary-600 hover:text-primary-800 uppercase tracking-widest">
                    View History
                  </button>
                </div>
                <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar pr-1">
                  {recentJobs.map((job) => (
                    <div
                      key={job.id}
                      className="group bg-white p-6 rounded-2xl border border-slate-100 hover:border-primary-200 hover:shadow-xl transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-5">
                          <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 text-sm font-black group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm">
                            {job.company.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-base font-black text-slate-900 group-hover:text-primary-600 transition-colors leading-tight">
                              {job.title}
                            </div>
                            <div className="flex items-center gap-3 text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">
                              <span>{job.company}</span>
                              <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                              <span>{job.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${job.color} shadow-sm`}
                          >
                            {job.status}
                          </span>
                          <div className="text-[10px] font-bold text-slate-300 mt-3 uppercase tracking-widest">
                            {job.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Footer */}
        <div className="bg-white px-10 py-8 border-t border-slate-50 flex flex-col sm:flex-row justify-end gap-5">
          <button className="px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all">
            View recommended jobs
          </button>
          <button className="bg-slate-900 hover:bg-black text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/10 transition-all active:scale-95 flex justify-center items-center gap-3">
            <i className="fa-solid fa-magnifying-glass text-xs"></i>
            Find jobs
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast.show && (
        <div className="fixed bottom-10 right-10 z-[300] bg-slate-900 text-white px-8 py-5 rounded-2xl shadow-2xl flex items-center gap-4 animate-fadeInUp">
          <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center shadow-lg shadow-primary-500/20">
            <span className="text-lg">{toast.icon}</span>
          </div>
          <div>
            <h5 className="font-black text-sm uppercase tracking-widest leading-none mb-1">
              Update
            </h5>
            <p className="text-slate-400 text-xs font-medium">
              {toast.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const MetricCard: React.FC<{
  label: string;
  value: number;
  icon: string;
  color: string;
  pulse?: boolean;
}> = ({ label, value, icon, color, pulse }) => (
  <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group relative overflow-hidden">
    <div
      className={`absolute top-0 right-0 w-20 h-20 bg-${color}-50 rounded-bl-[3rem] -mr-10 -mt-10 transition-transform group-hover:scale-125 duration-700`}
    ></div>
    <div className="flex justify-between items-start mb-6 relative z-10">
      <span
        className={`w-12 h-12 flex items-center justify-center bg-${color}-50 text-${color}-600 rounded-2xl group-hover:bg-${color}-600 group-hover:text-white transition-all shadow-sm`}
      >
        <i className={`fa-solid ${icon} text-xl`}></i>
      </span>
      {pulse && (
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
        </span>
      )}
    </div>
    <div className="text-5xl font-black text-slate-900 mb-1 tracking-tighter">
      {value < 10 ? `0${value}` : value}
    </div>
    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
      {label}
    </div>
  </div>
);

export default ApplicationTracker;

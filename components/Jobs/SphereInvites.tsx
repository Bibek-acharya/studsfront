import React, { useState } from "react";

const SphereInvites: React.FC = () => {
  const [isEmpty, setIsEmpty] = useState(false);

  const invites = [
    {
      id: 1,
      company: "TechFlow Systems",
      logo: "T",
      logoBg: "bg-slate-900",
      time: "2 hours ago",
      salary: "$140k - $160k",
      role: "Senior Frontend Engineer",
      meta: "Remote • React & TypeScript",
    },
    {
      id: 2,
      company: "Orbit UI",
      logo: "O",
      logoBg: "bg-indigo-600",
      time: "5 hours ago",
      salary: "$110k - $130k",
      role: "Product Designer",
      meta: "New York, NY • Hybrid",
    },
    {
      id: 3,
      company: "Forge Creative",
      logo: "F",
      logoBg: "bg-orange-500",
      time: "1 day ago",
      salary: "Contract",
      role: "Design Systems Lead",
      meta: "Remote • 6 Months",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-24 font-jakarta">
      {/* Simulation Toggle */}
      <div className="fixed top-24 right-8 z-[120]">
        <button
          onClick={() => setIsEmpty(!isEmpty)}
          className={`flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-xl border border-slate-200 transition-all hover:scale-105 active:scale-95`}
        >
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Simulate:
          </span>
          <div className="relative inline-flex items-center cursor-pointer">
            <div
              className={`w-10 h-5 rounded-full transition-colors ${isEmpty ? "bg-slate-200" : "bg-primary-600"}`}
            >
              <div
                className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isEmpty ? "left-1" : "left-6"}`}
              ></div>
            </div>
            <span
              className={`ml-3 text-[10px] font-black uppercase tracking-widest ${isEmpty ? "text-slate-400" : "text-primary-600"}`}
            >
              {isEmpty ? "Empty State" : "Invites Received"}
            </span>
          </div>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
              NVites: Your invitation <br /> to{" "}
              <span className="text-primary-600">apply</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              Recruiters have chosen you from a large pool of candidates to
              apply to these jobs.
            </p>
          </div>

          {/* How NVites Work Tooltip */}
          <div className="relative group mb-2">
            <button className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary-600 hover:text-primary-700 transition-colors bg-primary-50 px-6 py-3 rounded-full border border-primary-100 shadow-sm">
              <i className="fa-solid fa-circle-question text-lg"></i>
              <span>How do NVites work?</span>
            </button>

            <div className="absolute right-0 top-full mt-4 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 p-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 pointer-events-none group-hover:pointer-events-auto">
              <h4 className="font-black text-slate-900 mb-6 text-xs uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="bg-primary-50 text-primary-600 rounded-lg p-1.5">
                  <i className="fa-solid fa-bolt text-xs"></i>
                </span>
                The NVite Process
              </h4>
              <ul className="space-y-6">
                <ProcessStep
                  step="1"
                  text="Recruiters actively search the Sphere network for specific skill sets like yours."
                />
                <ProcessStep
                  step="2"
                  text="If you're a match, they send a direct 'NVite' to interview—skipping the pile."
                />
                <ProcessStep
                  step="3"
                  text="You see salary and role details upfront before deciding to accept."
                />
                <ProcessStep
                  step="4"
                  text="Accepting fast-tracks you directly to a chat with the hiring manager."
                />
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden flex flex-col md:grid md:grid-cols-12 min-h-[600px]">
          {/* Left Panel: Visuals */}
          <div className="md:col-span-5 p-12 bg-white relative overflow-hidden flex flex-col items-center justify-center text-center">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary-50 rounded-full blur-[100px] opacity-40 -ml-32 -mt-32"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-[80px] opacity-40 -mr-20 -mb-20"></div>

            <div className="relative z-10 w-full flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] bg-slate-900 text-white mb-12 shadow-xl">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-400"></span>
                </span>
                Sphere Exclusive
              </div>

              {/* Graphic Placeholder */}
              <div className="mb-16 transform scale-125 opacity-90">
                <i className="fa-solid fa-envelope-open-text text-8xl text-primary-600 animate-float"></i>
              </div>

              <div className="w-full space-y-6 text-left max-w-xs">
                <FeatureRow
                  icon="fa-circle-check"
                  color="text-emerald-500"
                  title="Verified Salaries"
                  desc="Know the pay upfront"
                />
                <FeatureRow
                  icon="fa-bolt"
                  color="text-primary-500"
                  title="Fast Track"
                  desc="Skip the application pile"
                />
                <FeatureRow
                  icon="fa-user-tie"
                  color="text-purple-500"
                  title="Direct Access"
                  desc="Talk to hiring managers"
                />
              </div>
            </div>
          </div>

          {/* Right Panel: Content */}
          <div className="md:col-span-7 bg-slate-50/50 p-8 md:p-12 relative border-l border-slate-100">
            {isEmpty ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-fadeInUp">
                <div className="relative mb-10">
                  <div className="w-40 h-40 bg-white rounded-full shadow-2xl flex items-center justify-center animate-float">
                    <i className="fa-regular fa-envelope text-6xl text-slate-100"></i>
                  </div>
                  <div className="absolute -top-4 -right-4 w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center text-white shadow-xl border-4 border-white animate-bounce">
                    <i className="fa-solid fa-bell-slash text-xl"></i>
                  </div>
                </div>

                <h2 className="text-2xl font-black text-slate-900 mb-4">
                  No active invites
                </h2>
                <p className="text-slate-500 text-base mb-12 leading-relaxed max-w-sm font-medium">
                  Your NVite inbox is quiet right now. Enhance your profile
                  visibility and keep your skills updated to get noticed by top
                  recruiters.
                </p>

                <div className="w-full max-w-xs space-y-4">
                  <button className="w-full py-4 bg-primary-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all active:scale-95">
                    Update Profile Visibility
                  </button>
                  <button className="w-full py-3.5 bg-white text-slate-500 border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
                    Browse Open Roles
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col animate-fadeInUp">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">
                      {invites.length} New Invites
                    </h2>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-300 mt-1">
                      Expire in 48 hours
                    </p>
                  </div>
                  <span className="bg-primary-50 text-primary-600 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-primary-100">
                    Active
                  </span>
                </div>

                <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar pb-8">
                  {invites.map((inv) => (
                    <div
                      key={inv.id}
                      className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-5">
                          <div
                            className={`h-14 w-14 ${inv.logoBg} rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-lg transition-transform group-hover:scale-105`}
                          >
                            {inv.logo}
                          </div>
                          <div>
                            <h3 className="text-lg font-black text-slate-900 group-hover:text-primary-600 transition-colors">
                              {inv.company}
                            </h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                              {inv.time}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                          {inv.salary}
                        </span>
                      </div>
                      <div className="mb-8">
                        <p className="text-xl font-black text-slate-800 leading-tight">
                          {inv.role}
                        </p>
                        <p className="text-xs font-bold text-slate-400 mt-2 flex items-center gap-2">
                          <i className="fa-solid fa-location-dot text-slate-200"></i>{" "}
                          {inv.meta}
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <button className="flex-1 bg-primary-50 text-primary-600 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary-600 hover:text-white transition-all">
                          View Details
                        </button>
                        <button className="px-5 py-3 rounded-xl border border-slate-100 text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all">
                          <i className="fa-solid fa-xmark text-lg"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="mt-6 w-full text-center text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-slate-500 transition-colors">
                  View archived invitations
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProcessStep: React.FC<{ step: string; text: string }> = ({
  step,
  text,
}) => (
  <li className="flex items-start gap-4">
    <span className="font-black text-slate-200 text-2xl leading-none select-none">
      {step}
    </span>
    <span className="text-xs font-medium text-slate-500 leading-relaxed">
      {text}
    </span>
  </li>
);

const FeatureRow: React.FC<{
  icon: string;
  color: string;
  title: string;
  desc: string;
}> = ({ icon, color, title, desc }) => (
  <div className="flex items-center gap-5 p-5 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-primary-100 transition-colors group/row cursor-default">
    <div
      className={`bg-white p-3 rounded-xl shadow-sm ${color} transition-transform group-hover/row:scale-110`}
    >
      <i className={`fa-solid ${icon} text-xl`}></i>
    </div>
    <div>
      <p className="text-sm font-black text-slate-900 leading-none mb-1">
        {title}
      </p>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {desc}
      </p>
    </div>
  </div>
);

export default SphereInvites;

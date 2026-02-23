import React, { useState } from "react";

interface JobAlert {
  id: number;
  role: string;
  location: string;
  exp: string;
  frequency: string;
  active: boolean;
}

interface JobMatch {
  title: string;
  company: string;
  location: string;
  matchScore: number;
  icon: string;
}

const JobAlerts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"alerts" | "matches">("alerts");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alerts, setAlerts] = useState<JobAlert[]>([
    {
      id: 171542,
      role: "Frontend Developer",
      location: "Kathmandu / Remote",
      exp: "2-4 years",
      frequency: "Daily",
      active: true,
    },
    {
      id: 299831,
      role: "Product Designer",
      location: "Remote",
      exp: "5+ years",
      frequency: "Weekly",
      active: true,
    },
    {
      id: 344122,
      role: "React Native Engineer",
      location: "Lalitpur, Nepal",
      exp: "3 years",
      frequency: "Daily",
      active: false,
    },
  ]);
  const [newAlert, setNewAlert] = useState({
    role: "",
    location: "",
    exp: "Entry Level",
    frequency: "Daily",
  });

  const toggleAlert = (id: number) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a)),
    );
  };

  const deleteAlert = (id: number) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const saveAlert = () => {
    if (!newAlert.role || !newAlert.location) return;
    const alert: JobAlert = {
      ...newAlert,
      id: Date.now(),
      active: true,
    };
    setAlerts([alert, ...alerts]);
    setIsModalOpen(false);
    setNewAlert({
      role: "",
      location: "",
      exp: "Entry Level",
      frequency: "Daily",
    });
  };

  const activeAlerts = alerts.filter((a) => a.active);
  const matches: JobMatch[] = activeAlerts
    .flatMap((alert) => [
      {
        title: alert.role,
        company: "TechCorp",
        location: alert.location.split("/")[0],
        matchScore: 98,
        icon: "fa-google",
      },
      {
        title: `${alert.role} II`,
        company: "InnoSys",
        location: alert.location.split("/")[0],
        matchScore: 92,
        icon: "fa-microsoft",
      },
    ])
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 md:px-8 font-jakarta">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Job Alerts
            </h1>
            <div className="relative group">
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary-600 bg-white hover:bg-primary-50 border border-slate-200 px-4 py-2 rounded-full transition-all shadow-sm">
                <i className="fa-solid fa-circle-info"></i> How it works
              </button>
              <div className="absolute left-0 top-full mt-4 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">
                  How Alerts Work
                </h4>
                <ul className="space-y-4">
                  <li className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 text-primary-600">
                      <i className="fa-solid fa-sliders text-sm"></i>
                    </div>
                    <div className="text-xs font-medium text-slate-500 leading-relaxed">
                      <span className="font-black text-slate-900 uppercase">
                        Set Preferences
                      </span>
                      <p>
                        Define role, location, and experience for tailored
                        results.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 text-primary-600">
                      <i className="fa-solid fa-bell text-sm"></i>
                    </div>
                    <div className="text-xs font-medium text-slate-500 leading-relaxed">
                      <span className="font-black text-slate-900 uppercase">
                        Smart Matching
                      </span>
                      <p>
                        We scan new postings daily or weekly and notify you
                        instantly.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-3">
            Manage your notifications for new job postings
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div
            className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest shadow-sm transition-all border ${activeAlerts.length > 0 ? "bg-white border-primary-100 text-primary-600" : "bg-slate-100 border-slate-200 text-slate-400"}`}
          >
            {activeAlerts.length} Active
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 md:flex-none bg-primary-600 hover:bg-primary-700 text-white font-black px-8 py-3 rounded-2xl shadow-xl shadow-primary-500/20 transition-all active:scale-95 flex items-center justify-center gap-3 text-xs uppercase tracking-widest"
          >
            <i className="fa-solid fa-plus"></i> New Alert
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden flex flex-col min-h-[500px]">
        <div className="px-10 border-b border-slate-50 flex items-center gap-10 bg-white">
          <TabButton
            active={activeTab === "alerts"}
            onClick={() => setActiveTab("alerts")}
            icon="fa-bell"
            label="My Alerts"
          />
          <TabButton
            active={activeTab === "matches"}
            onClick={() => setActiveTab("matches")}
            icon="fa-briefcase"
            label="Matched Jobs"
            badge={matches.length}
          />
        </div>

        <div className="flex-1 bg-slate-50/30 overflow-y-auto no-scrollbar">
          {activeTab === "alerts" ? (
            alerts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-12 text-center animate-fadeInUp">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-xl relative">
                  <i className="fa-solid fa-bell text-4xl text-slate-100"></i>
                  <div className="absolute top-0 right-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-2.5 h-2.5 bg-red-600 rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">
                  No Job Alerts Yet
                </h3>
                <p className="text-slate-500 text-sm font-medium mb-10 max-w-sm mx-auto leading-relaxed">
                  Create alerts to get notified via email when jobs matching
                  your criteria are posted.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-primary-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.15em] shadow-xl shadow-primary-500/20 active:scale-95 transition-all"
                >
                  Create Your First Alert
                </button>
              </div>
            ) : (
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <tr>
                      <th className="px-10 py-5">Role & Position</th>
                      <th className="px-4 py-5">Location</th>
                      <th className="px-4 py-5">Experience</th>
                      <th className="px-4 py-5">Frequency</th>
                      <th className="px-4 py-5 text-center">Active</th>
                      <th className="px-10 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {alerts.map((alert) => (
                      <tr
                        key={alert.id}
                        className="bg-white hover:bg-primary-50/30 transition-colors group"
                      >
                        <td className="px-10 py-6">
                          <div className="font-black text-slate-900 text-sm">
                            {alert.role}
                          </div>
                          <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-1">
                            ID: #{alert.id.toString().slice(-4)}
                          </div>
                        </td>
                        <td className="px-4 py-6">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                            <i className="fa-solid fa-location-dot text-slate-200"></i>
                            {alert.location}
                          </div>
                        </td>
                        <td className="px-4 py-6">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                            <i className="fa-solid fa-briefcase text-slate-200"></i>
                            {alert.exp}
                          </div>
                        </td>
                        <td className="px-4 py-6">
                          <span
                            className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${alert.frequency === "Daily" ? "bg-primary-50 text-primary-600 border-primary-100" : "bg-slate-50 text-slate-400 border-slate-100"}`}
                          >
                            {alert.frequency}
                          </span>
                        </td>
                        <td className="px-4 py-6">
                          <div className="flex justify-center">
                            <button
                              onClick={() => toggleAlert(alert.id)}
                              className={`w-10 h-5 rounded-full transition-all relative ${alert.active ? "bg-primary-600" : "bg-slate-200"}`}
                            >
                              <div
                                className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${alert.active ? "left-6" : "left-1"}`}
                              ></div>
                            </button>
                          </div>
                        </td>
                        <td className="px-10 py-6 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-slate-300 hover:text-primary-600 hover:bg-white rounded-lg transition-all shadow-sm border border-transparent hover:border-slate-100">
                              <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button
                              onClick={() => deleteAlert(alert.id)}
                              className="p-2 text-slate-300 hover:text-red-500 hover:bg-white rounded-lg transition-all shadow-sm border border-transparent hover:border-slate-100"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            <div className="p-10 space-y-6">
              <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8">
                Found {matches.length} jobs based on your {activeAlerts.length}{" "}
                active alerts
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {matches.map((job, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex justify-between items-center animate-fadeInUp"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center text-2xl text-slate-400 group-hover:text-primary-500 group-hover:bg-primary-50 transition-all">
                        <i className={`fa-brands ${job.icon}`}></i>
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-base leading-tight group-hover:text-primary-600 transition-colors">
                          {job.title}
                        </h4>
                        <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">
                          <span className="text-slate-600">{job.company}</span>
                          <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                          <span>{job.location}</span>
                          <span className="text-emerald-500 font-black">
                            {job.matchScore}% Match
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="px-6 py-2.5 bg-white border border-slate-200 hover:border-primary-500 hover:text-primary-600 text-slate-600 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-95">
                      View Job
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-fadeIn">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative w-full max-w-lg bg-white rounded-2xl p-10 shadow-2xl animate-scaleIn">
            <div className="flex items-start justify-between mb-10">
              <div>
                <h3 className="text-2xl font-black text-slate-900 mb-1">
                  Create Job Alert
                </h3>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                  Tailor your next career move
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-300 hover:text-slate-900 transition-colors"
              >
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>

            <div className="space-y-6">
              <Input
                label="Job Role / Title"
                value={newAlert.role}
                onChange={(v) => setNewAlert({ ...newAlert, role: v })}
                placeholder="e.g. Product Designer"
              />
              <div className="grid grid-cols-2 gap-6">
                <Input
                  label="Location"
                  value={newAlert.location}
                  onChange={(v) => setNewAlert({ ...newAlert, location: v })}
                  placeholder="e.g. Remote"
                />
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                    Experience
                  </label>
                  <select
                    value={newAlert.exp}
                    onChange={(e) =>
                      setNewAlert({ ...newAlert, exp: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-primary-50 focus:border-primary-500 transition-all font-bold text-sm appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%232563EB%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')] bg-[length:1em] bg-[right_1rem_center] bg-no-repeat"
                  >
                    <option>Entry Level</option>
                    <option>1-3 Years</option>
                    <option>3-5 Years</option>
                    <option>5+ Years</option>
                    <option>Senior / Lead</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                  Frequency
                </label>
                <div className="flex gap-4">
                  {["Daily", "Weekly"].map((freq) => (
                    <button
                      key={freq}
                      onClick={() =>
                        setNewAlert({ ...newAlert, frequency: freq })
                      }
                      className={`flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border transition-all ${newAlert.frequency === freq ? "bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-500/20" : "bg-slate-50 text-slate-400 border-slate-200 hover:bg-white hover:border-primary-200"}`}
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={saveAlert}
                className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all hover:bg-black active:scale-95 mt-6"
              >
                Create Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TabButton: React.FC<{
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
  badge?: number;
}> = ({ active, onClick, icon, label, badge }) => (
  <button
    onClick={onClick}
    className={`py-6 text-xs font-black uppercase tracking-widest border-b-4 transition-all flex items-center gap-3 relative ${active ? "text-primary-600 border-primary-600" : "text-slate-400 border-transparent hover:text-slate-600 hover:border-slate-200"}`}
  >
    <i className={`fa-solid ${icon} text-lg`}></i>
    {label}
    {badge !== undefined && (
      <span
        className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${active ? "bg-primary-50 text-primary-600" : "bg-slate-100 text-slate-400"}`}
      >
        {badge}
      </span>
    )}
  </button>
);

const Input: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}> = ({ label, value, onChange, placeholder }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-300">
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-primary-50 focus:border-primary-500 transition-all font-bold text-slate-900 placeholder-slate-300 text-sm"
      placeholder={placeholder}
    />
  </div>
);

export default JobAlerts;

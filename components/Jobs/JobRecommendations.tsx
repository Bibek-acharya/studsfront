import React, { useState, useEffect } from "react";

interface Job {
  id: number;
  title: string;
  company: string;
  rating: number | null;
  reviews?: number;
  experience: string;
  salary: string;
  location: string;
  description: string;
  tags: string[];
  category: string;
  posted: string;
}

interface JobRecommendationsProps {
  onNavigate: (view: any) => void;
}

const jobData: Job[] = [
  {
    id: 1,
    title: "Java Developer",
    company: "Nepal Tech Solutions",
    rating: null,
    experience: "0-1 Yrs",
    salary: "Not disclosed",
    location: "Kathmandu (Remote)",
    description:
      "We are seeking a motivated Java Developer. Candidates need prior self-project or internship experience. Strong understanding of OOPs concepts is required.",
    tags: ["Java", "JDBC", "Spring Boot", "MySQL", "Microservices"],
    category: "profile",
    posted: "1 Day Ago",
  },
  {
    id: 2,
    title: "Software Engineer Trainee",
    company: "Himalayan Infotech",
    rating: 3.1,
    reviews: 218,
    experience: "0-2 Yrs",
    salary: "30k - 45k NPR",
    location: "Lalitpur, Kathmandu",
    description:
      "Looking for 0-2 years of experience in Infrastructure, Development, and Application Support. Great opportunity to start your career.",
    tags: [".Net", "AWS", "SQL", "Java", "ITIL"],
    category: "profile",
    posted: "1 Day Ago",
  },
  {
    id: 3,
    title: "React Frontend Developer",
    company: "Pokhara Systems",
    rating: 4.2,
    reviews: 56,
    experience: "1-3 Yrs",
    salary: "60k - 1.2L NPR",
    location: "Pokhara (Hybrid)",
    description:
      "Join our frontend team to build responsive web applications using React.js and Tailwind CSS.",
    tags: ["React", "Javascript", "Tailwind", "Redux"],
    category: "top_candidate",
    posted: "2 Days Ago",
  },
  {
    id: 4,
    title: "Data Analyst Intern",
    company: "Biratnagar Analytics",
    rating: 3.8,
    reviews: 120,
    experience: "0-1 Yrs",
    salary: "15k - 25k NPR",
    location: "Biratnagar",
    description:
      "Perfect for freshers who love numbers. You will assist in cleaning data and creating visualization dashboards.",
    tags: ["Python", "Excel", "Tableau", "SQL"],
    category: "might_like",
    posted: "4 Hours Ago",
  },
];

const tabs = [
  { id: "profile", label: "Profile", count: 26 },
  { id: "top_candidate", label: "Top Candidate", count: 15 },
  { id: "might_like", label: "You might like", count: 55 },
  { id: "saved", label: "Saved", count: 4 },
];

const JobRecommendations: React.FC<JobRecommendationsProps> = ({
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedJobs, setSelectedJobs] = useState<Set<number>>(new Set());
  const [isEmptyState, setIsEmptyState] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(true);
  const [preferences, setPreferences] = useState({
    role: "Not Set",
    location: "Kathmandu",
    salary: "30,000 NPR",
  });
  const [editModal, setEditModal] = useState<{
    show: boolean;
    key: string | null;
    value: string;
  }>({
    show: false,
    key: null,
    value: "",
  });
  const [jobModal, setJobModal] = useState<Job | null>(null);
  const [toast, setToast] = useState<{ show: boolean; message: string }>({
    show: false,
    message: "",
  });

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const filteredJobs = isEmptyState
    ? []
    : jobData.filter((job) => {
        if (activeTab === "profile")
          return job.category === "profile" || job.id % 2 === 0;
        if (activeTab === "top_candidate")
          return (
            job.category === "top_candidate" || (job.rating && job.rating > 4.0)
          );
        if (activeTab === "might_like") return true;
        if (activeTab === "saved") return job.id === 1;
        return true;
      });

  const toggleSelection = (id: number) => {
    const newSet = new Set(selectedJobs);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      if (newSet.size >= 5) {
        showToast("You can only apply to 5 jobs at once!");
        return;
      }
      newSet.add(id);
    }
    setSelectedJobs(newSet);
  };

  const handleApply = () => {
    showToast(`Successfully applied to ${selectedJobs.size} jobs!`);
    setSelectedJobs(new Set());
  };

  const openEditModal = (key: string) => {
    setEditModal({
      show: true,
      key,
      value:
        (preferences as any)[key] === "Not Set"
          ? ""
          : (preferences as any)[key],
    });
  };

  const savePreference = () => {
    if (editModal.key && editModal.value.trim()) {
      setPreferences((prev) => ({
        ...prev,
        [editModal.key as string]: editModal.value,
      }));
      showToast(`${editModal.key} updated successfully`);
      setEditModal({ show: false, key: null, value: "" });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 font-jakarta relative">
      {/* Demo Control */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Demo Mode:
        </span>
        <button
          onClick={() => setIsEmptyState(!isEmptyState)}
          className={`flex items-center gap-2 text-[10px] font-black px-3 py-1.5 rounded-xl transition-all uppercase tracking-widest ${isEmptyState ? "bg-primary-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
        >
          <i
            className={`fa-solid ${isEmptyState ? "fa-toggle-on" : "fa-toggle-off"} text-lg`}
          ></i>
          <span>Simulate Empty</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Namaste, Job Seeker! 🇳🇵
            </h1>
            <p className="text-slate-500 mt-1 font-bold">
              Top opportunities for you in Nepal.
            </p>
          </div>

          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 md:translate-x-0 md:static md:bottom-auto bg-white border border-slate-200 px-6 py-3 rounded-2xl shadow-2xl md:shadow-sm flex items-center gap-6 z-30 transition-all duration-300 w-[90%] md:w-auto justify-between ring-1 ring-slate-100/50">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
              <span className="text-primary-600">{selectedJobs.size}</span>
              <span>Selected (Max 5)</span>
            </div>
            <button
              disabled={selectedJobs.size === 0}
              onClick={handleApply}
              className={`px-8 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-3 ${selectedJobs.size > 0 ? "bg-primary-600 text-white shadow-xl shadow-primary-500/30 active:scale-95" : "bg-slate-100 text-slate-300 cursor-not-allowed"}`}
            >
              <span>Apply Now</span>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 mb-10 overflow-x-auto no-scrollbar gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-1 py-4 whitespace-nowrap text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === tab.id ? "text-primary-600" : "text-slate-400 hover:text-slate-600"}`}
            >
              {tab.label}{" "}
              <span
                className={`text-[10px] ml-2 px-2 py-0.5 rounded-full ${activeTab === tab.id ? "bg-primary-100 text-primary-600" : "bg-slate-100 text-slate-400"}`}
              >
                {tab.count}
              </span>
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-primary-600 rounded-t-full"></span>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Job Listings */}
          <div className="lg:col-span-8 space-y-6">
            {activeTab === "profile" && !isEmptyState && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-primary-100 animate-fadeInUp flex flex-col sm:flex-row items-center gap-8 shadow-sm">
                <div className="w-16 h-16 bg-white text-primary-600 rounded-2xl flex items-center justify-center text-3xl shadow-sm shrink-0 border border-primary-100">
                  <i className="fa-solid fa-user-shield"></i>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-black text-slate-900 text-xl mb-1">
                    Complete your profile
                  </h3>
                  <p className="text-slate-500 text-sm font-medium">
                    Profiles with skills get 5x more views from Nepali
                    recruiters.
                  </p>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-4 overflow-hidden">
                    <div className="bg-primary-600 h-full w-[60%] rounded-full"></div>
                  </div>
                  <span className="text-[10px] text-primary-600 font-black uppercase tracking-widest mt-2 block">
                    60% Completed
                  </span>
                </div>
                <button className="bg-primary-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all active:scale-95 shrink-0">
                  Complete Now <i className="fa-solid fa-arrow-right ml-2"></i>
                </button>
              </div>
            )}

            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, idx) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary-100 transition-all duration-300 relative group animate-fadeInUp"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <label className="absolute top-7 left-6 cursor-pointer z-10">
                    <input
                      type="checkbox"
                      checked={selectedJobs.has(job.id)}
                      onChange={() => toggleSelection(job.id)}
                      className="hidden"
                    />
                    <div
                      className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${selectedJobs.has(job.id) ? "bg-primary-600 border-primary-600" : "bg-white border-slate-200 hover:border-primary-400"}`}
                    >
                      {selectedJobs.has(job.id) && (
                        <i className="fa-solid fa-check text-[10px] text-white"></i>
                      )}
                    </div>
                  </label>

                  <div className="pl-10">
                    <div className="flex justify-between items-start mb-6">
                      <div
                        onClick={() => setJobModal(job)}
                        className="cursor-pointer"
                      >
                        <h2 className="text-xl font-black text-slate-900 group-hover:text-primary-600 transition-colors">
                          {job.title}
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate("companyDetails");
                            }}
                            className="text-sm font-bold text-slate-500 hover:text-primary-600 transition-colors"
                          >
                            {job.company}
                          </span>
                          {job.rating && (
                            <span className="text-[10px] font-black bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full border border-amber-100 flex items-center gap-1 uppercase tracking-widest">
                              {job.rating}{" "}
                              <i className="fa-solid fa-star text-[8px]"></i>
                            </span>
                          )}
                        </div>
                      </div>
                      <div
                        onClick={() => onNavigate("companyDetails")}
                        className="w-14 h-14 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center text-2xl font-black text-slate-300 group-hover:text-primary-400 group-hover:border-primary-100 transition-all cursor-pointer"
                      >
                        {job.company[0]}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <MetaInfo icon="fa-briefcase" text={job.experience} />
                      <MetaInfo icon="fa-money-bill-wave" text={job.salary} />
                      <MetaInfo icon="fa-location-dot" text={job.location} />
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-6 flex items-start gap-4">
                      <i className="fa-regular fa-file-lines text-primary-400 mt-1"></i>
                      <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed">
                        {job.description}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-slate-50">
                      <div className="flex flex-wrap gap-2">
                        {job.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-100 px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-6 w-full sm:w-auto">
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                          {job.posted}
                        </span>
                        <button
                          onClick={() => setJobModal(job)}
                          className="text-primary-600 font-black text-xs uppercase tracking-widest hover:text-primary-800 transition-all flex items-center gap-2"
                        >
                          View details{" "}
                          <i className="fa-solid fa-chevron-right text-[10px]"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl p-16 text-center border border-slate-100 shadow-sm flex flex-col items-center justify-center min-h-[400px] animate-fadeInUp">
                <div className="relative mb-10">
                  <div className="w-32 h-32 bg-primary-50 rounded-full flex items-center justify-center animate-float">
                    <i
                      className={`fa-solid ${activeTab === "saved" ? "fa-heart text-rose-200" : "fa-layer-group text-primary-200"} text-6xl`}
                    ></i>
                  </div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-primary-600 border border-primary-50 animate-bounce">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">
                  No Jobs Found
                </h3>
                <p className="text-slate-500 font-medium max-w-sm mb-10 leading-relaxed">
                  It's a bit quiet here! We couldn't find any jobs matching your
                  preferences in the{" "}
                  <span className="text-primary-600 font-bold capitalize">
                    {activeTab.replace("_", " ")}
                  </span>{" "}
                  tab.
                </p>
                <button
                  onClick={() =>
                    activeTab === "saved"
                      ? setActiveTab("might_like")
                      : setIsPreferencesOpen(true)
                  }
                  className="bg-primary-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all active:scale-95"
                >
                  {activeTab === "saved"
                    ? "Explore Jobs"
                    : "Update Preferences"}
                </button>
              </div>
            )}
          </div>

          {/* Right: Preferences */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm group">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-black text-slate-900 text-xl">
                  Quick Preferences
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setPreferences({
                        role: "Not Set",
                        location: "Kathmandu",
                        salary: "30,000 NPR",
                      })
                    }
                    className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-300 hover:text-primary-600 transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setIsPreferencesOpen(!isPreferencesOpen)}
                    className="text-slate-300 hover:text-slate-600 transition-colors"
                  >
                    <i
                      className={`fa-solid ${isPreferencesOpen ? "fa-minus" : "fa-plus"}`}
                    ></i>
                  </button>
                </div>
              </div>

              {isPreferencesOpen && (
                <div className="space-y-6 animate-fadeInDown">
                  <PrefItem
                    label="Job Role"
                    value={preferences.role}
                    icon="fa-user-tie"
                    iconColor="text-purple-500"
                    onEdit={() => openEditModal("role")}
                  />
                  <PrefItem
                    label="Location"
                    value={preferences.location}
                    icon="fa-location-dot"
                    iconColor="text-blue-500"
                    onEdit={() => openEditModal("location")}
                  />
                  <PrefItem
                    label="Min Salary"
                    value={preferences.salary}
                    icon="fa-money-bill-wave"
                    iconColor="text-emerald-500"
                    onEdit={() => openEditModal("salary")}
                  />

                  <div className="mt-10 bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-2xl group/promo">
                    <i className="fa-solid fa-rocket absolute -right-6 -bottom-6 text-7xl text-white/5 transform -rotate-12 group-hover/promo:scale-110 group-hover/promo:text-white/10 transition-all duration-500"></i>
                    <h4 className="font-black text-lg mb-1 leading-tight">
                      Boost Profile
                    </h4>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-6">
                      Get 3x more visibility
                    </p>
                    <button className="w-full bg-white text-slate-900 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-slate-50 transition-all active:scale-95">
                      Update Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Preference Modal */}
      {editModal.show && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-fadeIn">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setEditModal({ show: false, key: null, value: "" })}
          ></div>
          <div className="relative w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl animate-scaleIn">
            <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-widest">
              Edit {editModal.key}
            </h3>
            <div className="relative mb-8">
              <input
                autoFocus
                type="text"
                value={editModal.value}
                onChange={(e) =>
                  setEditModal({ ...editModal, value: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-primary-50 focus:border-primary-500 transition-all outline-none font-bold text-slate-900"
                placeholder={`Enter new ${editModal.key}...`}
              />
              <i className="fa-solid fa-pen absolute right-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() =>
                  setEditModal({ show: false, key: null, value: "" })
                }
                className="flex-1 py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={savePreference}
                className="flex-1 bg-primary-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary-500/20 active:scale-95 transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Job Details Modal */}
      {jobModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-fadeIn">
          <div
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            onClick={() => setJobModal(null)}
          ></div>
          <div className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl animate-scaleIn">
            <div className="bg-primary-600 p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              <button
                onClick={() => setJobModal(null)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
              >
                <i className="fa-solid fa-xmark text-2xl"></i>
              </button>
              <div className="flex gap-6 items-center relative z-10">
                <div
                  onClick={() => {
                    setJobModal(null);
                    onNavigate("companyDetails");
                  }}
                  className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-4xl font-black text-primary-600 shadow-xl border border-white/20 cursor-pointer hover:scale-105 transition-transform"
                >
                  {jobModal.company[0]}
                </div>
                <div>
                  <h2 className="text-3xl font-black mb-1">{jobModal.title}</h2>
                  <p
                    onClick={() => {
                      setJobModal(null);
                      onNavigate("companyDetails");
                    }}
                    className="text-primary-100 font-bold uppercase tracking-widest text-xs cursor-pointer hover:underline"
                  >
                    {jobModal.company}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-10 max-h-[60vh] overflow-y-auto no-scrollbar">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 border-b border-slate-50 pb-8">
                <ModalStat label="Experience" val={jobModal.experience} />
                <ModalStat label="Salary" val={jobModal.salary} />
                <ModalStat label="Location" val={jobModal.location} />
                <ModalStat label="Posted" val={jobModal.posted} />
              </div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-4">
                Role Description
              </h4>
              <p className="text-slate-600 font-medium leading-relaxed mb-10">
                {jobModal.description}
              </p>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-4">
                Requirements
              </h4>
              <div className="flex flex-wrap gap-3">
                {jobModal.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-5 py-2 bg-primary-50 text-primary-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-primary-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-10 bg-slate-50 flex justify-end gap-4 border-t border-slate-100">
              <button
                onClick={() => setJobModal(null)}
                className="px-8 py-3 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-slate-600 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setJobModal(null);
                  showToast("Application sent successfully!");
                }}
                className="px-10 py-3 bg-primary-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all active:scale-95"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast.show && (
        <div className="fixed bottom-10 right-10 z-[300] bg-slate-900 text-white px-8 py-5 rounded-2xl shadow-2xl flex items-center gap-4 animate-fadeInUp">
          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <i className="fa-solid fa-check text-white"></i>
          </div>
          <div>
            <h5 className="font-black text-sm uppercase tracking-widest">
              Notification
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

const MetaInfo: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-3 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
    <i className={`fa-solid ${icon} text-slate-300`}></i>
    {text}
  </div>
);

const PrefItem: React.FC<{
  label: string;
  value: string;
  icon: string;
  iconColor: string;
  onEdit: () => void;
}> = ({ label, value, icon, iconColor, onEdit }) => (
  <div className="group/item relative">
    <div className="flex justify-between items-center mb-3">
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
        {label}
      </span>
      <button
        onClick={onEdit}
        className="opacity-0 group-hover/item:opacity-100 transition-all duration-300 text-primary-500 hover:text-primary-700 p-1"
      >
        <i className="fa-solid fa-pen-to-square"></i>
      </button>
    </div>
    <div
      className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover/item:border-primary-200 transition-all cursor-pointer"
      onClick={onEdit}
    >
      <div
        className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm ${iconColor}`}
      >
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <span
        className={`text-sm font-black transition-colors ${value === "Not Set" ? "text-slate-300 italic" : "text-slate-700"}`}
      >
        {value}
      </span>
    </div>
  </div>
);

const ModalStat: React.FC<{ label: string; val: string }> = ({
  label,
  val,
}) => (
  <div>
    <span className="text-[9px] font-black uppercase tracking-widest text-primary-200 block mb-1">
      {label}
    </span>
    <p className="font-black text-slate-800 text-sm">{val}</p>
  </div>
);

export default JobRecommendations;

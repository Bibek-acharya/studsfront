import React, { useState } from "react";
import { College, Program } from "./types";
import CollegeCard from "./CollegeCard";

interface AdmissionDetailsProps {
  college: College;
  relatedColleges: College[];
  onBack: () => void;
  onViewDetails: (college: College) => void;
}

const AdmissionDetails: React.FC<AdmissionDetailsProps> = ({
  college,
  relatedColleges,
  onBack,
  onViewDetails,
}) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "courses" | "eligibility" | "process"
  >("overview");
  const [showModal, setShowModal] = useState(false);

  // Group programs by level dynamically
  // Fix: Explicitly typing the accumulator for correct inference
  const programsByLevel = college.programs.reduce(
    (acc, prog) => {
      if (!acc[prog.level]) acc[prog.level] = [];
      acc[prog.level].push(prog);
      return acc;
    },
    {} as Record<string, Program[]>,
  );

  return (
    <div className="bg-slate-50 min-h-screen pt-24 font-jakarta pb-20">
      <main className="w-full px-4 lg:px-12">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-primary-600 font-black text-[10px] uppercase tracking-widest hover:text-primary-800 mb-8 group transition-all"
        >
          <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1"></i>
          Back to Discover
        </button>

        {/* 1. HERO SECTION */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-12">
          <div className="relative h-48 md:h-64 bg-slate-900 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
              className="w-full h-full object-cover opacity-40"
              alt="Banner"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          </div>

          <div className="px-10 pb-12 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between -mt-16">
              <div className="flex flex-col md:flex-row items-end gap-8 mb-6 md:mb-0">
                <div className="w-40 h-40 bg-white rounded-xl shadow-2xl p-2 flex items-center justify-center border-4 border-white overflow-hidden animate-fadeInUp">
                  <div className="w-full h-full bg-slate-900 rounded-lg flex items-center justify-center text-white text-5xl font-black">
                    {college.logo.includes("http") ? (
                      <img
                        src={college.logo}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      college.name[0]
                    )}
                  </div>
                </div>
                <div className="pb-4 mt-0">
                  <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase">
                    {college.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 mt-4">
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-lg border border-emerald-100 shadow-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Admissions Open 2025
                    </span>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                      <i className="fa-solid fa-location-dot text-primary-500"></i>{" "}
                      {college.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex gap-4 pb-4">
                <button className="px-8 py-4 bg-white border-2 border-slate-100 text-slate-400 font-black text-xs uppercase tracking-widest rounded-xl hover:text-primary-600 hover:border-primary-100 transition-all shadow-sm">
                  Inquiry
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-10 py-4 bg-primary-600 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all active:scale-95 flex items-center gap-3"
                >
                  Apply Now{" "}
                  <i className="fa-solid fa-paper-plane text-[10px]"></i>
                </button>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatCard
                label="Admission Status"
                val="Ongoing"
                color="emerald"
              />
              <StatCard
                label="Board Affiliation"
                val={college.university}
                color="blue"
              />
              <StatCard
                label="Programs Available"
                val={college.programs.length.toString()}
                color="indigo"
              />
              <StatCard label="Verified Listing" val="Yes" color="amber" />
            </div>
          </div>
        </section>

        {/* Tabbed Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="flex border-b border-slate-200 mb-10 overflow-x-auto no-scrollbar gap-10">
              {["overview", "courses", "eligibility", "process"].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t as any)}
                  className={`py-6 whitespace-nowrap text-xs font-black uppercase tracking-[0.2em] relative transition-all ${activeTab === t ? "text-primary-600" : "text-slate-400 hover:text-slate-600"}`}
                >
                  {t}
                  {activeTab === t && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-primary-600 rounded-t-full"></div>
                  )}
                </button>
              ))}
            </div>

            <div className="animate-fadeIn">
              {activeTab === "overview" && (
                <div className="space-y-12">
                  <section>
                    <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">
                      Introduction
                    </h2>
                    <p className="text-lg text-slate-500 font-medium leading-relaxed">
                      {college.description}
                    </p>
                  </section>
                  <section>
                    <h2 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-widest">
                      Campus Facilities
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {college.facilities.map((f) => (
                        <div
                          key={f}
                          className="p-5 rounded-xl bg-white border border-slate-100 shadow-sm flex flex-col items-center gap-3 group hover:border-primary-100 transition-all"
                        >
                          <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-circle-check"></i>
                          </div>
                          <span className="text-xs font-black uppercase tracking-widest text-slate-600">
                            {f}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {activeTab === "courses" && (
                <div className="space-y-12">
                  <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tight">
                    Available Programs
                  </h2>
                  <div className="space-y-10">
                    {Object.entries(programsByLevel).map(([level, progs]) => (
                      <div key={level}>
                        <h3 className="text-xs font-black text-primary-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-600"></div>
                          {level} Programs
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Fix: Explicitly casting progs to Program[] to avoid 'unknown' type error */}
                          {(progs as Program[]).map((p, i) => (
                            <div
                              key={i}
                              className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm flex justify-between items-center group hover:shadow-xl transition-all"
                            >
                              <div>
                                <h3 className="text-lg font-black text-slate-800 group-hover:text-primary-600 transition-colors">
                                  {p.name}
                                </h3>
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">
                                  Admission Cycle: 2025
                                </p>
                              </div>
                              <span
                                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${p.status === "Ongoing" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-slate-50 text-slate-400 border-slate-100"}`}
                              >
                                {p.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "eligibility" && (
                <div className="bg-white p-10 rounded-xl border border-slate-100 shadow-sm">
                  <h2 className="text-2xl font-black text-slate-900 mb-10 uppercase tracking-tight">
                    Admission Eligibility
                  </h2>
                  <div className="space-y-8">
                    <EligibilityRow
                      icon="fa-scroll"
                      title="Academic Qualification"
                      desc="Candidates must have completed their previous level (SEE/+2/Bachelor) with minimum GPA/Grades required by the university."
                    />
                    <EligibilityRow
                      icon="fa-chart-simple"
                      title="Entrance Examination"
                      desc="Candidate must clear the relevant entrance examination (CMAT, IOE, CEE, etc.) and face a personal interview if applicable."
                    />
                    <EligibilityRow
                      icon="fa-file-pen"
                      title="Submission Requirement"
                      desc="Completed application form with all academic transcripts, character certificates, and identification documents."
                    />
                  </div>
                </div>
              )}

              {activeTab === "process" && (
                <div className="space-y-12">
                  <h2 className="text-2xl font-black text-slate-900 mb-10 uppercase tracking-tight">
                    Application Journey
                  </h2>
                  <div className="relative pl-10 space-y-12 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-1 before:bg-slate-100 before:rounded-full">
                    <ProcessStep
                      num="01"
                      title="Submit Inquiry"
                      desc="Click 'Inquiry Now' to let the admission office know you are interested."
                    />
                    <ProcessStep
                      num="02"
                      title="Form & Documents"
                      desc="Fill the formal university application and upload your academic credentials."
                    />
                    <ProcessStep
                      num="03"
                      title="Entrance & Interview"
                      desc="Appear for the written entrance exam and personal interaction with the academic panel."
                    />
                    <ProcessStep
                      num="04"
                      title="Final Enrollment"
                      desc="Confirm your seat by paying the admission fee upon being listed in the merit list."
                      isLast
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Related Admissions */}
            <div className="mt-20">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                  Other Active Admissions
                </h2>
                <button
                  onClick={onBack}
                  className="text-[10px] font-black uppercase tracking-widest text-primary-600 hover:text-primary-800 transition-colors"
                >
                  View All Institutions
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedColleges.map((rel) => (
                  <CollegeCard
                    key={rel.id}
                    college={rel}
                    onViewDetails={onViewDetails}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-28 space-y-8">
              {/* Important Dates */}
              <div className="bg-white p-10 rounded-xl border border-slate-100 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-10 uppercase tracking-tight flex items-center gap-3">
                  <i className="fa-solid fa-calendar-check text-primary-600"></i>{" "}
                  Key Dates
                </h3>
                <div className="space-y-8">
                  <DateRow label="Form Deadline" val="Ongoing" highlight />
                  <DateRow label="Selection Basis" val="Entrance/Merit" />
                  <DateRow label="Orientation" val="September 2025" />
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full mt-10 py-5 bg-primary-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all active:scale-95"
                >
                  Apply for Admission
                </button>
              </div>

              {/* Contact Widget */}
              <div className="bg-slate-900 text-white p-10 rounded-xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                <h3 className="text-xl font-black mb-8 uppercase tracking-widest">
                  Connect
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                      Phone
                    </p>
                    <p className="text-sm font-bold">{college.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                      Email
                    </p>
                    <p className="text-sm font-bold truncate">
                      {college.contactEmail}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                      Official Website
                    </p>
                    <a
                      href={`https://${college.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-bold text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      {college.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Modal Section */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-fadeIn">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="relative w-full max-w-md bg-white rounded-xl p-10 shadow-2xl animate-scaleIn">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors p-2"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center text-3xl shadow-sm mx-auto mb-6">
                <i className="fa-solid fa-user-plus"></i>
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                Start Application
              </h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">
                Fast-track with StudSphere
              </p>
            </div>

            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Application Started!");
                setShowModal(false);
              }}
            >
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2">
                  Program Selection
                </label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-sm outline-none focus:ring-4 focus:ring-primary-50 focus:border-primary-500 transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%232563EB%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')] bg-[length:1.2em] bg-[right_1.5rem_center] bg-no-repeat">
                  {college.programs.map((p) => (
                    <option key={p.name}>
                      {p.name} ({p.level})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  placeholder="98XXXXXXXX"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-sm outline-none focus:ring-4 focus:ring-primary-50 focus:border-primary-500 transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-5 bg-primary-600 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all active:scale-95"
              >
                Proceed to Form
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard: React.FC<{ label: string; val: string; color: string }> = ({
  label,
  val,
  color,
}) => (
  <div className="p-6 rounded-xl bg-white border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-primary-100 transition-all">
    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1 group-hover:text-slate-400 transition-colors">
      {label}
    </p>
    <p className={`text-xl font-black text-${color}-600`}>{val}</p>
  </div>
);

const EligibilityRow: React.FC<{
  icon: string;
  title: string;
  desc: string;
}> = ({ icon, title, desc }) => (
  <div className="flex gap-6 items-start group">
    <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center text-2xl text-slate-400 shrink-0 shadow-inner group-hover:bg-primary-600 group-hover:text-white transition-all">
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div>
      <h4 className="font-black text-slate-900 text-lg leading-tight mb-2 uppercase tracking-tight">
        {title}
      </h4>
      <p className="text-sm font-medium text-slate-500 leading-relaxed">
        {desc}
      </p>
    </div>
  </div>
);

const ProcessStep: React.FC<{
  num: string;
  title: string;
  desc: string;
  isLast?: boolean;
}> = ({ num, title, desc, isLast }) => (
  <div className="relative group">
    <div className="absolute -left-12 top-0 w-8 h-8 rounded-full bg-white border-4 border-primary-600 shadow-xl flex items-center justify-center font-black text-[10px] text-primary-600 z-10 transition-transform group-hover:scale-125">
      {num}
    </div>
    <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm group-hover:shadow-xl transition-all duration-500">
      <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight group-hover:text-primary-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-slate-500 font-medium leading-relaxed">
        {desc}
      </p>
    </div>
  </div>
);

const DateRow: React.FC<{
  label: string;
  val: string;
  highlight?: boolean;
}> = ({ label, val, highlight }) => (
  <div
    className={`flex justify-between items-center p-4 rounded-xl border transition-all ${highlight ? "bg-primary-50 border-primary-100 shadow-sm scale-[1.02]" : "bg-slate-50 border-slate-100"}`}
  >
    <span
      className={`text-[10px] font-black uppercase tracking-widest ${highlight ? "text-primary-600" : "text-slate-400"}`}
    >
      {label}
    </span>
    <span
      className={`text-xs font-black ${highlight ? "text-primary-900" : "text-slate-800"}`}
    >
      {val}
    </span>
  </div>
);

export default AdmissionDetails;

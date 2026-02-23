import React, { useState, useEffect } from "react";

const ResumeChecker: React.FC = () => {
  const [view, setView] = useState<"upload" | "loading" | "results">("upload");
  const [activeTab, setActiveTab] = useState<
    "overview" | "detailed" | "recommendations"
  >("overview");
  const [score, setScore] = useState(0);

  const startAnalysis = () => {
    setView("loading");
    setTimeout(() => {
      setView("results");
      animateScore(82);
    }, 2500);
  };

  const animateScore = (target: number) => {
    let current = 0;
    const timer = setInterval(() => {
      if (current < target) {
        current++;
        setScore(current);
      } else {
        clearInterval(timer);
      }
    }, 20);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 font-jakarta">
      {view === "upload" && (
        <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col items-center animate-fadeInUp">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <i className="fa-solid fa-bolt"></i> Instant Score Analysis
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight mb-8">
              Land Your Dream Job with{" "}
              <span className="text-primary-600">Smart Insights</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Upload your resume to get an instant ATS score and detailed
              feedback on how to stand out to recruiters.
            </p>
          </div>

          <div
            onClick={startAnalysis}
            className="w-full max-w-2xl bg-white rounded-2xl p-16 border-4 border-dashed border-slate-200 text-center cursor-pointer hover:border-primary-500 transition-all group hover:shadow-2xl hover:shadow-primary-500/5"
          >
            <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
              <i className="fa-solid fa-cloud-arrow-up text-4xl text-primary-600"></i>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">
              Drop your resume here
            </h3>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-10">
              Supports PDF, DOC, DOCX (Max 5MB)
            </p>
            <div className="flex justify-center gap-8">
              <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                <i className="fa-solid fa-circle-check text-emerald-500"></i>{" "}
                Secure Analysis
              </div>
              <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                <i className="fa-solid fa-circle-check text-emerald-500"></i>{" "}
                Free Result
              </div>
            </div>
          </div>
        </div>
      )}

      {view === "loading" && (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-10 animate-fadeIn">
          <div className="relative w-32 h-32 mb-10">
            <div className="absolute inset-0 border-8 border-slate-200 rounded-full"></div>
            <div className="absolute inset-0 border-8 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <i className="fa-solid fa-microchip text-3xl text-primary-600"></i>
            </div>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
            Analyzing Document
          </h2>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs animate-pulse">
            Extracting skills and evaluating keywords...
          </p>
        </div>
      )}

      {view === "results" && (
        <div className="max-w-7xl mx-auto px-6 py-12 animate-fadeIn">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12 border-b border-slate-200 pb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-lg uppercase tracking-widest">
                  Analysis Ready
                </span>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                  Your Report
                </h2>
              </div>
              <p className="text-slate-500 font-medium">
                Analyzed:{" "}
                <span className="text-slate-900 font-black">
                  my_resume_v2.pdf
                </span>
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setView("upload")}
                className="px-8 py-4 bg-white border border-slate-200 text-slate-600 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
              >
                New Upload
              </button>
              <button className="px-8 py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl hover:bg-black transition-all active:scale-95">
                Download PDF
              </button>
            </div>
          </div>

          <div className="flex gap-8 border-b border-slate-200 mb-12 overflow-x-auto no-scrollbar">
            <TabBtn
              active={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
              label="Overview"
            />
            <TabBtn
              active={activeTab === "detailed"}
              onClick={() => setActiveTab("detailed")}
              label="Detailed Results"
            />
            <TabBtn
              active={activeTab === "recommendations"}
              onClick={() => setActiveTab("recommendations")}
              label="Recommendations"
            />
          </div>

          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4 bg-white p-12 rounded-2xl shadow-sm border border-slate-100 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-primary-50 rounded-full blur-3xl -ml-16 -mt-16 opacity-40"></div>
                <h3 className="text-xs font-black text-slate-300 uppercase tracking-[0.2em] mb-12">
                  Overall Score
                </h3>
                <div className="relative w-48 h-48 mx-auto mb-10">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      className="text-slate-100"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      className="text-primary-600"
                      strokeDasharray={552.92}
                      strokeDashoffset={552.92 * (1 - score / 100)}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-6xl font-black text-slate-900">
                      {score}
                    </span>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">
                      Points
                    </span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-5 py-2.5 rounded-full font-black text-[10px] border border-emerald-100 uppercase tracking-widest shadow-sm">
                  <i className="fa-solid fa-trophy"></i> Top 10% Candidate
                </div>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <ReportCard
                  type="strength"
                  title="Top Strengths"
                  items={[
                    "Clear Formatting",
                    "Valid Contact Info",
                    "Education Structure",
                  ]}
                />
                <ReportCard
                  type="critical"
                  title="Critical Fixes"
                  items={[
                    "Quantifiable Metrics",
                    "Summary Tailoring",
                    "Complex Tables",
                  ]}
                />
              </div>
            </div>
          )}

          {activeTab === "detailed" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <DetailStat
                label="ATS Compatibility"
                score={45}
                status="FAIL"
                icon="fa-robot"
                color="red"
              />
              <DetailStat
                label="Keyword Match"
                score={62}
                status="WARNING"
                icon="fa-tags"
                color="amber"
              />
              <DetailStat
                label="Experience Section"
                score={78}
                status="PASS"
                icon="fa-briefcase"
                color="emerald"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const TabBtn: React.FC<{
  active: boolean;
  onClick: () => void;
  label: string;
}> = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className={`py-5 text-xs font-black uppercase tracking-widest border-b-4 transition-all whitespace-nowrap ${active ? "text-primary-600 border-primary-600" : "text-slate-400 border-transparent hover:text-slate-600 hover:border-slate-200"}`}
  >
    {label}
  </button>
);

const ReportCard: React.FC<{
  type: "strength" | "critical";
  title: string;
  items: string[];
}> = ({ type, title, items }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
    <h4 className="font-black text-lg text-slate-900 mb-8 flex items-center gap-3 uppercase tracking-tight">
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${type === "strength" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}
      >
        <i
          className={`fa-solid ${type === "strength" ? "fa-check" : "fa-triangle-exclamation"}`}
        ></i>
      </div>
      {title}
    </h4>
    <ul className="space-y-4">
      {items.map((item) => (
        <li
          key={item}
          className={`p-4 rounded-2xl flex items-center gap-4 text-sm font-bold ${type === "strength" ? "bg-slate-50 text-slate-700 border border-slate-100" : "bg-rose-50/30 text-rose-900 border border-rose-100/50"}`}
        >
          <i
            className={`fa-solid ${type === "strength" ? "fa-circle-check text-emerald-500" : "fa-circle-exclamation text-rose-500"} text-lg`}
          ></i>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const DetailStat: React.FC<{
  label: string;
  score: number;
  status: string;
  icon: string;
  color: string;
}> = ({ label, score, status, icon, color }) => (
  <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
    <div className="flex justify-between items-start mb-6">
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all shadow-sm ${
          color === "red"
            ? "bg-rose-50 text-rose-600"
            : color === "amber"
              ? "bg-amber-50 text-amber-600"
              : "bg-emerald-50 text-emerald-600"
        }`}
      >
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <span
        className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
          color === "red"
            ? "bg-rose-100 text-rose-700"
            : color === "amber"
              ? "bg-amber-100 text-amber-700"
              : "bg-emerald-100 text-emerald-700"
        }`}
      >
        {status}
      </span>
    </div>
    <h3 className="font-black text-slate-900 mb-2">{label}</h3>
    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
      <span>Rating</span>
      <span>{score}/100</span>
    </div>
    <div className="w-full bg-slate-50 rounded-full h-2 border border-slate-100">
      <div
        className={`h-full rounded-full transition-all duration-1000 ${
          color === "red"
            ? "bg-rose-500"
            : color === "amber"
              ? "bg-amber-500"
              : "bg-emerald-500"
        }`}
        style={{ width: `${score}%` }}
      ></div>
    </div>
  </div>
);

export default ResumeChecker;

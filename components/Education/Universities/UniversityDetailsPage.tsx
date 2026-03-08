import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "../../../services/api";

interface UniversityDetailsPageProps {
  id: number;
  onNavigate: (view: any, data?: any) => void;
}

const UniversityDetailsPage: React.FC<UniversityDetailsPageProps> = ({
  id,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState("about");
  const [isFavorite, setIsFavorite] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["university", id],
    queryFn: () => apiService.getUniversityById(id),
  });

  const university = data?.data?.university || null;
  const affiliatedColleges = data?.data?.colleges || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading || !university) {
    return (
      <div className="bg-slate-50 min-h-screen pt-20 font-sans">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center text-slate-500 font-bold">
          Loading university details...
        </div>
      </div>
    );
  }

  const shortName =
    university.name
      ?.split(" ")
      .map((s: string) => s[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const website = university.website || "";
  const websiteHref =
    website && !website.startsWith("http") ? `https://${website}` : website;

  return (
    <div className="bg-slate-50 min-h-screen pt-20 font-sans selection:bg-primary-600 selection:text-white">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          className="w-full h-full object-cover"
          alt="Banner"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-600/20 via-black/40 to-black/70"></div>
      </div>

      {/* University Profile Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-row gap-6 md:gap-8 items-end -mt-20">
          <div className="bg-white p-2 rounded-xl shadow-2xl border-4 border-white h-32 w-32 md:h-44 md:w-44 flex-shrink-0 flex items-center justify-center animate-fadeInUp mt-5">
            <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center text-white text-6xl font-black relative overflow-hidden">
              <span className="z-10">{shortName}</span>
              <div className="absolute w-32 h-32 bg-primary-600 rounded-full blur-2xl -top-10 -right-10 opacity-30"></div>
            </div>
          </div>

          <div className="flex-1 pb-4 animate-fadeIn mt-0">
            <h1 className="text-3xl md:text-5xl font-black text-white md:text-slate-900 mb-4 tracking-tight drop-shadow-sm flex items-center gap-4">
              {university.name}
              <i className="fa-solid fa-circle-check text-primary-600 text-3xl"></i>
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-xs font-black uppercase tracking-widest text-slate-400 mt-5">
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-location-dot text-primary-500"></i>
                {university.location}
              </span>
              <span className="bg-amber-50 text-amber-600 px-4 py-1.5 rounded-full border border-amber-100 flex items-center gap-2 shadow-sm">
                <i className="fa-solid fa-star text-[10px]"></i>{" "}
                {university.rating} Rating
              </span>
              <a
                href={websiteHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline font-bold flex items-center gap-2 transition-all"
              >
                {website}{" "}
                <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3 pb-4 w-full md:w-auto">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              ~{(university.collegesCount || 0) * 100}+ Students Enrolled
            </span>
            <div className="flex gap-4 w-full md:w-auto">
              <button
                onClick={() => setActiveTab("colleges")}
                className="flex-1 px-8 py-4 bg-white border-2 border-slate-100 rounded-xl font-black text-xs uppercase tracking-widest text-slate-400 hover:text-primary-600 hover:border-primary-100 transition-all shadow-sm"
              >
                View Colleges
              </button>
              <button
                onClick={() => setActiveTab("programs")}
                className="flex-1 px-8 py-4 bg-primary-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20 active:scale-95"
              >
                Explore Programs
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`shrink-0 w-14 h-14 flex items-center justify-center rounded-xl border-2 transition-all shadow-sm ${isFavorite
                    ? "bg-rose-50 border-rose-100 text-rose-500"
                    : "bg-white border-slate-100 text-slate-300 hover:text-rose-500 hover:border-rose-100"
                  }`}
              >
                <i
                  className={`fa-solid fa-heart ${isFavorite ? "scale-110" : "scale-100"} transition-transform`}
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 sticky top-20 z-40 bg-slate-50/80 backdrop-blur-md border-b border-slate-200">
        <div className="flex overflow-x-auto no-scrollbar gap-10">
          {["about", "colleges", "programs", "statistics", "admission"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-6 whitespace-nowrap text-xs font-black uppercase tracking-[0.2em] relative transition-all ${activeTab === tab
                    ? "text-primary-600"
                    : "text-slate-400 hover:text-slate-600"
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-primary-600 rounded-t-full"></div>
                )}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        {/* TAB: ABOUT */}
        {activeTab === "about" && (
          <div className="space-y-16 animate-fadeIn">
            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-8 border-l-8 border-primary-600 pl-6 uppercase tracking-tight">
                About {university.name}
              </h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-4xl mt-5">
                {university.description}. Established in{" "}
                {university.established}, the university has been a cornerstone
                of higher education in Nepal, providing quality education across
                various disciplines and fostering academic excellence.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AboutCard
                icon="fa-eye"
                title="Vision & Mission"
                desc="To be recognized as the epicenter for modern education, producing competent and globally minded leaders who contribute to society."
                color="blue"
              />
              <AboutCard
                icon="fa-trophy"
                title="Achievements"
                desc="Recognized nationally and internationally for academic excellence, research contributions, and producing skilled professionals."
                color="emerald"
              />
              <AboutCard
                icon="fa-globe"
                title="Global Reach"
                desc="Partnerships with international universities, student exchange programs, and collaboration on research projects worldwide."
                color="purple"
              />
            </div>
          </div>
        )}

        {/* TAB: COLLEGES */}
        {activeTab === "colleges" && (
          <div className="space-y-10 animate-fadeIn">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-widest">
                Affiliated Institutions
              </h2>
              <p className="text-lg text-slate-500 font-medium mt-5">
                Explore the {university.collegesCount}+ colleges and campuses
                affiliated with {university.name}. Click to view detailed
                campus profiles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {affiliatedColleges.map((college) => (
                <div
                  key={college.id}
                  onClick={() =>
                    onNavigate("collegeDetails", { id: college.id })
                  }
                  className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group flex flex-col h-full border-l-8 border-l-primary-600"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="min-w-0">
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-primary-600 transition-colors mb-1 truncate">
                        {college.name}
                      </h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <i className="fa-solid fa-location-dot"></i>{" "}
                        {university.location}
                      </p>
                    </div>
                    <span
                      className={`px-4 py-1.5 rounded-lg font-black text-[10px] uppercase tracking-widest shadow-sm ${college.type === "Public" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-700"}`}
                    >
                      {college.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-8">
                    <span className="flex items-center gap-2">
                      <i className="fa-solid fa-star text-amber-400"></i>{" "}
                      <span className="text-slate-700">{college.rating}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-2">
                      <i className="fa-solid fa-users"></i> {college.reviews} reviews
                    </span>
                    <span>•</span>
                    <span>Affiliated</span>
                  </div>

                  <div className="pt-6 border-t border-slate-50 flex flex-wrap gap-2 mt-auto">
                    {[college.affiliation, college.type].map((p, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-primary-50 text-primary-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-primary-100"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-12">
              <button className="px-12 py-5 bg-primary-600 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary-500/30 hover:bg-primary-700 transition-all active:scale-95">
                View All {university.collegesCount}+ Colleges
              </button>
            </div>
          </div>
        )}

        {/* TAB: PROGRAMS */}
        {activeTab === "programs" && (
          <div className="space-y-12 animate-fadeIn">
            <h2 className="text-3xl font-black text-slate-900 mb-8 border-l-8 border-primary-600 pl-6 uppercase tracking-tight">
              Academic Faculties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  faculty: "Science & Technology",
                  items: [
                    "BSc Computer Science",
                    "BSc Physics",
                    "BSc Chemistry",
                    "MSc IT",
                  ],
                  color: "blue",
                },
                {
                  faculty: "Engineering",
                  items: [
                    "BE Civil",
                    "BE Computer",
                    "BE Electronics",
                    "ME Structural",
                  ],
                  color: "emerald",
                },
                {
                  faculty: "Management",
                  items: ["BBA", "BBS", "MBA", "MBS"],
                  color: "orange",
                },
                {
                  faculty: "Humanities & Social Sciences",
                  items: ["BA", "MA", "MSW", "BSW"],
                  color: "purple",
                },
                {
                  faculty: "Education",
                  items: ["B.Ed", "M.Ed", "MPhil", "PhD"],
                  color: "rose",
                },
                {
                  faculty: "Law",
                  items: ["BA LLB", "LLB", "LLM"],
                  color: "cyan",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-10 rounded-xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group h-full flex flex-col"
                >
                  <h3
                    className={`text-xl font-black mb-8 tracking-tight uppercase border-b border-slate-50 pb-6 group-hover:text-primary-600 transition-colors`}
                  >
                    {item.faculty}
                  </h3>
                  <ul className="space-y-4 flex-grow">
                    {item.items.map((p, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-4 text-sm font-bold text-slate-500"
                      >
                        <i className="fa-solid fa-circle-check text-primary-500/40"></i>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => onNavigate("courseFinder")}
                    className="mt-10 text-[10px] font-black uppercase tracking-widest text-primary-600 hover:underline flex items-center gap-2"
                  >
                    Browse All Courses{" "}
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: STATISTICS */}
        {activeTab === "statistics" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
            <StatBox
              number={university.collegesCount + "+"}
              label="Affiliated Institutions"
            />
            <StatBox
              number={`~${(university.collegesCount || 0) * 100}+`}
              label="Total Active Students"
            />
            <StatBox number={university.established} label="Year Established" />
            <StatBox number="150+" label="Academic Programs" />
            <StatBox number="5,000+" label="Verified Faculty" />
            <StatBox
              number={university.rating + "/5.0"}
              label="Average Student Rating"
            />
          </div>
        )}

        {/* TAB: ADMISSION */}
        {activeTab === "admission" && (
          <div className="max-w-4xl mx-auto space-y-12 animate-fadeIn">
            <div className="bg-white p-12 rounded-xl border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-black text-slate-900 mb-10 uppercase tracking-widest">
                Admission Criteria
              </h3>
              <ul className="space-y-8">
                <li className="flex items-start gap-6">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-inner">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-lg">
                      Academic Qualification
                    </p>
                    <p className="text-slate-500 font-medium mt-1">
                      Completion of 10+2 or equivalent board exam with minimum
                      required GPA/Percentage.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 shadow-inner">
                    <i className="fa-solid fa-file-signature"></i>
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-lg">
                      Entrance Examination
                    </p>
                    <p className="text-slate-500 font-medium mt-1">
                      Must secure a pass mark in the Central Entrance Exam (CEE)
                      or University Specific Test.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 shadow-inner">
                    <i className="fa-solid fa-folder-open"></i>
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-lg">
                      Document Submission
                    </p>
                    <p className="text-slate-500 font-medium mt-1">
                      Verified transcripts, character certificates, and
                      citizenship/identity documents are mandatory.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-primary-50 p-10 rounded-xl border border-primary-100 flex items-start gap-6">
              <i className="fa-solid fa-circle-info text-primary-600 text-2xl mt-1"></i>
              <div>
                <h4 className="font-black text-primary-900 uppercase tracking-widest mb-2">
                  Note for Prospective Students
                </h4>
                <p className="text-primary-700 font-medium leading-relaxed">
                  Admission requirements vary by faculty and specific affiliated
                  colleges. We recommend visiting the college-specific pages to
                  see admission details and requirements.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Reusable Components
const AboutCard: React.FC<{
  icon: string;
  title: string;
  desc: string;
  color: string;
}> = ({ icon, title, desc, color }) => (
  <div className="bg-white p-10 rounded-xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col">
    <div
      className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl mb-10 transition-all group-hover:scale-110 shadow-lg shadow-${color}-500/10 bg-${color}-50 text-${color}-600`}
    >
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight uppercase">
      {title}
    </h3>
    <p className="text-sm font-medium text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

const StatBox: React.FC<{ number: string | number; label: string }> = ({
  number,
  label,
}) => (
  <div className="bg-slate-900 rounded-xl p-12 text-center text-white relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 shadow-2xl">
    <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary-600 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
    <p className="text-5xl font-black mb-4 tracking-tighter bg-gradient-to-r from-white to-primary-400 bg-clip-text text-transparent">
      {number}
    </p>
    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
      {label}
    </p>
  </div>
);

const ContactRow: React.FC<{ icon: string; val: string }> = ({ icon, val }) => (
  <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:border-primary-100 transition-all cursor-pointer group">
    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-slate-400 shadow-sm group-hover:text-primary-600 transition-colors">
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors truncate">
      {val}
    </span>
  </div>
);

export default UniversityDetailsPage;

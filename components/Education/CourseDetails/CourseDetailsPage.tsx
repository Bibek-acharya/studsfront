import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { apiService, EducationCourseDetails } from "../../../services/api";

interface CourseDetailsPageProps {
  onNavigate: (view: any, data?: any) => void;
}

type TabKey = "overview" | "curriculum" | "admissions" | "careers";

const sectionIds: TabKey[] = ["overview", "curriculum", "admissions", "careers"];

const iconByCareer: Record<string, string> = {
  database: "fa-database",
  cpu: "fa-microchip",
  chart: "fa-chart-line",
};

const bgByCareer: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600",
  emerald: "bg-emerald-50 text-emerald-600",
  purple: "bg-purple-50 text-purple-600",
};

const CourseDetailsPage: React.FC<CourseDetailsPageProps> = ({ onNavigate }) => {
  const location = useLocation();
  const routeState = (location.state || {}) as { id?: string | number };
  const courseId = String(routeState.id || "1");

  const [openSemester, setOpenSemester] = useState<number | null>(1);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  const { data, isLoading } = useQuery({
    queryKey: ["education-course-details", courseId],
    queryFn: () => apiService.getEducationCourseDetailsById(courseId),
  });

  const details = data?.data as EducationCourseDetails | undefined;

  const tags = useMemo(() => {
    if (!details) return [];
    return [
      { icon: "fa-clock", label: details.highlightsDuration || "-" },
      { icon: "fa-graduation-cap", label: details.degreeLabel || "-" },
      { icon: "fa-building-columns", label: details.mode || "On-Campus" },
    ];
  }, [details]);

  useEffect(() => {
    const onScroll = () => {
      let current: TabKey = "overview";
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (!element) return;
        const offsetTop = element.offsetTop;
        if (window.scrollY >= offsetTop - 120) {
          current = id;
        }
      });
      setActiveTab(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleTabClick = (tab: TabKey) => {
    const target = document.getElementById(tab);
    if (!target) return;
    const y = target.getBoundingClientRect().top + window.pageYOffset - 90;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  if (isLoading || !details) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-500 font-semibold">
        Loading course details...
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-800 font-sans antialiased">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        <button
          onClick={() => onNavigate("courseFinder")}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors"
        >
          <i className="fa-solid fa-arrow-left"></i> Back to Programs
        </button>

        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            {details.course.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mb-8">
            {tags.map((tag) => (
              <span
                key={tag.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-sm font-medium text-gray-700"
              >
                <i className={`fa-solid ${tag.icon} text-gray-400`}></i>
                {tag.label}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-sm flex items-center gap-2">
              Apply for Admission
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all border border-gray-200 shadow-sm flex items-center gap-2">
              <i className="fa-solid fa-download"></i> Download Brochure
            </button>
          </div>
        </div>

        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
          <nav className="flex gap-8 overflow-x-auto no-scrollbar pt-4">
            <button
              onClick={() => handleTabClick("overview")}
              className={`border-b-2 pb-4 text-sm whitespace-nowrap px-1 transition-colors ${activeTab === "overview" ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-gray-500 hover:text-gray-900 font-medium"}`}
            >
              Overview
            </button>
            <button
              onClick={() => handleTabClick("curriculum")}
              className={`border-b-2 pb-4 text-sm whitespace-nowrap px-1 transition-colors ${activeTab === "curriculum" ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-gray-500 hover:text-gray-900 font-medium"}`}
            >
              Curriculum
            </button>
            <button
              onClick={() => handleTabClick("admissions")}
              className={`border-b-2 pb-4 text-sm whitespace-nowrap px-1 transition-colors ${activeTab === "admissions" ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-gray-500 hover:text-gray-900 font-medium"}`}
            >
              Admissions
            </button>
            <button
              onClick={() => handleTabClick("careers")}
              className={`border-b-2 pb-4 text-sm whitespace-nowrap px-1 transition-colors ${activeTab === "careers" ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-gray-500 hover:text-gray-900 font-medium"}`}
            >
              Careers
            </button>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-20">
            <section id="overview" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <i className="fa-solid fa-circle-info text-blue-600"></i> About the Course
              </h2>
              <div className="text-gray-600 space-y-4 text-sm leading-relaxed max-w-4xl">
                {details.about.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            </section>

            <section id="curriculum" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <i className="fa-solid fa-book text-blue-600"></i> Curriculum
              </h2>
              <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden shadow-sm">
                {details.curriculum.map((semester, index) => {
                  const isOpen = openSemester === semester.semester;
                  return (
                    <div
                      key={semester.semester}
                      className={`border-b border-gray-100 ${index === details.curriculum.length - 1 ? "border-b-0" : ""}`}
                    >
                      <button
                        className="w-full flex justify-between items-center p-5 hover:bg-gray-50 transition-colors"
                        onClick={() =>
                          setOpenSemester(isOpen ? null : semester.semester)
                        }
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-sm">
                            {semester.semester}
                          </div>
                          <div className="text-left">
                            <h4 className="font-bold text-gray-900 text-sm">{semester.title}</h4>
                            <p className="text-xs text-gray-500 mt-0.5 font-medium">{semester.subtitle}</p>
                          </div>
                        </div>
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-100 shadow-sm text-gray-400">
                          <i
                            className={`fa-solid fa-chevron-down text-sm transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                          ></i>
                        </div>
                      </button>

                      {isOpen && (
                        <div className="p-5 pl-[4.5rem] text-sm text-gray-600 border-t border-gray-100 bg-gray-50/50">
                          <ul className="space-y-3">
                            {semester.subjects.map((subject) => (
                              <li key={subject} className="flex items-start gap-2">
                                <i className="fa-solid fa-circle-check text-blue-500 mt-0.5"></i>
                                <span>{subject}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            <section id="admissions" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <i className="fa-solid fa-file-lines text-blue-600"></i> Admission Requirements
              </h2>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                  {details.admissionRequirements.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                      <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-blue-500 shadow-sm">
                        <i className="fa-solid fa-check"></i>
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="careers" className="scroll-mt-24 pb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <i className="fa-solid fa-briefcase text-blue-600"></i> Career Opportunities
              </h2>
              <p className="text-gray-600 mb-8 max-w-4xl leading-relaxed text-sm">
                Graduates of this program are highly sought after in both local and international tech industries.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {details.careerOpportunities.map((career) => (
                  <div
                    key={career.title}
                    className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm flex items-center gap-3"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${bgByCareer[career.color] || "bg-blue-50 text-blue-600"}`}>
                      <i className={`fa-solid ${iconByCareer[career.icon] || "fa-briefcase"} text-xl`}></i>
                    </div>
                    <span className="font-semibold text-sm text-gray-900">{career.title}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="border border-slate-100 shadow-sm bg-white rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-5">Are you looking to joining this Course?</h3>
                <div className="space-y-3">
                  <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm shadow-sm">
                    Get Admission
                  </button>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm shadow-sm">
                    Talk to Counselor
                  </button>
                </div>
              </div>

              <div className="border border-slate-100 shadow-sm bg-white rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Key Highlights</h3>
                <div className="space-y-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-clock text-lg"></i>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Duration</p>
                      <p className="text-sm font-semibold text-gray-900">{details.highlightsDuration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-graduation-cap text-lg"></i>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Degree Level</p>
                      <p className="text-sm font-semibold text-gray-900">{details.highlightsDegreeLevel}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-building text-lg"></i>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Faculty</p>
                      <p className="text-sm font-semibold text-gray-900">{details.highlightsFaculty}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-university text-lg"></i>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">University</p>
                      <p className="text-sm font-semibold text-gray-900">{details.highlightsUniversity}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate("universitiesPage", { courseId: details.course.id, courseTitle: details.course.title, collegesCount: details.offeringCollegesCount })}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm shadow-sm"
                >
                  Explore College
                </button>
              </div>

              <div className="border border-slate-100 shadow-sm bg-white rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Contact & Support</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-envelope text-lg"></i>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">G-Mail</p>
                      <p className="text-sm font-semibold text-gray-900">{details.contact.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-phone text-lg"></i>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Phone Support</p>
                      <p className="text-sm font-semibold text-gray-900">{details.contact.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-16 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Other Programs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {details.otherPrograms.map((program, index) => (
              <div
                key={`${program.id}-${program.title}`}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-blue-200 transition-all group shadow-sm"
              >
                <div className="h-32 bg-slate-50 flex items-center justify-center border-b border-gray-50">
                  <i className={`fa-solid ${index % 3 === 0 ? "fa-code text-blue-500" : index % 3 === 1 ? "fa-desktop text-emerald-500" : "fa-chart-line text-purple-500"} text-5xl group-hover:scale-110 transition-transform`}></i>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 leading-tight">{program.title}</h3>
                  <p className="text-xs text-gray-500 mb-5">{program.duration} • {program.faculty}</p>
                  <button
                    onClick={() => onNavigate("courseDetails", { id: program.id })}
                    className="inline-flex items-center text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors"
                  >
                    View Program Details <i className="fa-solid fa-arrow-right ml-1"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;

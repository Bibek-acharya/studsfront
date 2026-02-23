import React, { useState, useEffect } from "react";

interface ScholarshipHubDetailsPageProps {
  id: string;
  onNavigate: (view: any, data?: any) => void;
}

const ScholarshipHubDetailsPage: React.FC<ScholarshipHubDetailsPageProps> = ({
  id,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "eligibility" | "documents" | "timeline" | "benefits" | "apply"
  >("overview");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scholarshipData = {
    title: "Global Future Leaders Scholarship 2026",
    provider: "Cambridge University, UK",
    location: "Cambridge, UK",
    deadline: "May 15, 2026",
    value: "$30,000 / Year",
    tags: ["Fully Funded", "Masters", "Merit Based"],
    heroImage:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 antialiased font-sans pb-20 pt-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center text-sm text-slate-500">
            <button
              onClick={() => onNavigate("scholarshipMain")}
              className="hover:text-blue-600"
            >
              Scholarship Hub
            </button>
            <i className="fas fa-chevron-right mx-2 text-[10px]"></i>
            <span className="hover:text-blue-600 cursor-pointer">
              International
            </span>
            <i className="fas fa-chevron-right mx-2 text-[10px]"></i>
            <span className="text-slate-900 font-medium">
              {scholarshipData.title}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-green-100 text-green-700 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-green-200">
                  Fully Funded
                </span>
                <span className="bg-blue-100 text-blue-700 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-blue-200">
                  Masters
                </span>
                <span className="bg-purple-100 text-purple-700 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-purple-200">
                  Merit Based
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                {scholarshipData.title}
              </h1>
              <p className="text-slate-500 flex items-center gap-2">
                <i className="fas fa-map-marker-alt text-blue-500"></i> Offered
                by Cambridge University, UK
              </p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors bg-white shadow-sm">
                <i className="fas fa-share-alt"></i> Share
              </button>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors bg-white shadow-sm group ${isSaved ? "bg-blue-50 border-blue-200 text-blue-600" : "text-slate-700 hover:bg-slate-50"}`}
              >
                <i
                  className={`${isSaved ? "fas" : "far"} fa-bookmark group-hover:fill-current`}
                ></i>{" "}
                <span className="save-text">{isSaved ? "Saved" : "Save"}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats Mobile */}
            <div className="lg:hidden bg-white p-4 rounded-xl shadow-sm border border-slate-200 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">
                  Deadline
                </p>
                <p className="text-red-600 font-medium flex items-center gap-1">
                  <i className="far fa-clock"></i> May 15, 2026
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">
                  Value
                </p>
                <p className="text-slate-900 font-medium">$30,000 / Year</p>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-sm group">
              <img
                src={scholarshipData.heroImage}
                alt="University Campus"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded text-xs font-medium">
                    Cambridge, UK
                  </span>
                  <span className="bg-blue-600/90 backdrop-blur-md px-2 py-1 rounded text-xs font-medium">
                    #1 Ranked
                  </span>
                </div>
                <p className="font-medium text-lg">Applications are open now</p>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-slate-200 overflow-x-auto">
              <nav
                className="-mb-px flex space-x-6 min-w-max"
                aria-label="Tabs"
              >
                {(
                  [
                    "overview",
                    "eligibility",
                    "documents",
                    "timeline",
                    "benefits",
                    "apply",
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors capitalize ${
                      activeTab === tab
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 min-h-[400px]">
              {/* Overview Section */}
              {activeTab === "overview" && (
                <div className="animate-fadeIn">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    About the Scholarship
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    The Global Future Leaders Scholarship is designed to support
                    outstanding international students who have demonstrated
                    academic excellence and leadership potential. This
                    prestigious award aims to foster cross-cultural
                    understanding and prepare the next generation of global
                    leaders to tackle the world's most pressing challenges.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    Recipients will join a vibrant community of scholars and
                    gain access to exclusive networking events, mentorship
                    programs, and leadership workshops throughout their academic
                    journey at Cambridge University.
                  </p>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Field of Study
                  </h3>
                  <p className="text-slate-600 mb-4">
                    All Master's degree programs offered at the University,
                    specifically focusing on:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                    <li className="flex items-center gap-2 text-slate-600">
                      <i className="fas fa-check-circle text-green-500"></i>{" "}
                      Computer Science & AI
                    </li>
                    <li className="flex items-center gap-2 text-slate-600">
                      <i className="fas fa-check-circle text-green-500"></i>{" "}
                      Environmental Science
                    </li>
                    <li className="flex items-center gap-2 text-slate-600">
                      <i className="fas fa-check-circle text-green-500"></i>{" "}
                      Public Health
                    </li>
                    <li className="flex items-center gap-2 text-slate-600">
                      <i className="fas fa-check-circle text-green-500"></i>{" "}
                      Business Administration
                    </li>
                  </ul>

                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Selection Process
                  </h3>
                  <div className="relative border-l-2 border-slate-200 ml-3 space-y-8">
                    <div className="ml-6 relative">
                      <span className="absolute -left-[33px] top-1 h-4 w-4 rounded-full bg-white border-4 border-blue-600"></span>
                      <h4 className="font-semibold text-slate-900">
                        Stage 1: Initial Screening
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Applications are reviewed for eligibility and
                        completeness. Incomplete applications are rejected
                        immediately.
                      </p>
                    </div>
                    <div className="ml-6 relative">
                      <span className="absolute -left-[33px] top-1 h-4 w-4 rounded-full bg-white border-4 border-slate-300"></span>
                      <h4 className="font-semibold text-slate-900">
                        Stage 2: Academic Review
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">
                        A panel of professors reviews academic transcripts,
                        research proposals, and recommendation letters.
                      </p>
                    </div>
                    <div className="ml-6 relative">
                      <span className="absolute -left-[33px] top-1 h-4 w-4 rounded-full bg-white border-4 border-slate-300"></span>
                      <h4 className="font-semibold text-slate-900">
                        Stage 3: Interview
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Shortlisted candidates are invited for a virtual
                        interview with the scholarship committee in June.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Eligibility Section */}
              {activeTab === "eligibility" && (
                <div className="animate-fadeIn">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Eligibility Criteria
                  </h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                          1
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">
                          Nationality
                        </h4>
                        <p className="text-slate-600 text-sm">
                          Must be an international student from a non-EU
                          country.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                          2
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">
                          Academic Merit
                        </h4>
                        <p className="text-slate-600 text-sm">
                          Must hold a First Class Honours degree or equivalent
                          GPA (3.7/4.0).
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                          3
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">
                          Language Proficiency
                        </h4>
                        <p className="text-slate-600 text-sm">
                          IELTS score of 7.5 overall or TOEFL iBT score of 110.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    Excluded Regions
                  </h3>
                  <p className="text-sm text-slate-600 mb-2">
                    Citizens of the following countries are not eligible for
                    this specific grant:
                  </p>
                  <ul className="list-disc list-inside text-sm text-slate-600 bg-red-50 p-4 rounded-lg border border-red-100">
                    <li>United Kingdom</li>
                    <li>Australia</li>
                    <li>New Zealand</li>
                    <li>USA (Specific state grants available instead)</li>
                  </ul>
                </div>
              )}

              {/* Documents Section */}
              {activeTab === "documents" && (
                <div className="animate-fadeIn">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Required Documents
                  </h2>
                  <p className="text-slate-600 mb-6">
                    Ensure all documents are in PDF format and do not exceed 5MB
                    each.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Academic Transcripts",
                        desc: "Official copies from all universities attended.",
                      },
                      {
                        title: "CV / Resume",
                        desc: "Updated CV highlighting academic and leadership achievements.",
                      },
                      {
                        title: "Recommendation Letters",
                        desc: "Two academic references on official letterhead.",
                      },
                      {
                        title: "Personal Statement",
                        desc: "Max 1000 words outlining your goals and motivation.",
                      },
                    ].map((doc, idx) => (
                      <div
                        key={idx}
                        className="p-4 border border-slate-200 rounded-xl hover:border-blue-400 transition-all flex items-start gap-3 bg-white cursor-pointer group"
                      >
                        <div className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center bg-white mt-1 group-hover:border-blue-500 transition-colors">
                          <i className="fas fa-check text-[10px] text-blue-500 opacity-0 group-hover:opacity-100"></i>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">
                            {doc.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1">
                            {doc.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Timeline Section */}
              {activeTab === "timeline" && (
                <div className="animate-fadeIn">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    Scholarship Timeline 2026
                  </h2>
                  <div className="space-y-0">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <div className="w-0.5 flex-1 bg-blue-200 h-16"></div>
                      </div>
                      <div className="pb-8">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                          Jan 15, 2026
                        </span>
                        <h4 className="text-lg font-semibold text-slate-900">
                          Applications Open
                        </h4>
                        <p className="text-sm text-slate-500">
                          Online portal opens for submissions.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                        <div className="w-0.5 flex-1 bg-slate-200 h-16"></div>
                      </div>
                      <div className="pb-8">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                          May 15, 2026
                        </span>
                        <h4 className="text-lg font-semibold text-slate-900">
                          Submission Deadline
                        </h4>
                        <p className="text-sm text-slate-500">
                          Portal closes at 11:59 PM GMT.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                        <div className="w-0.5 flex-1 bg-slate-200 h-16"></div>
                      </div>
                      <div className="pb-8">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                          June 2026
                        </span>
                        <h4 className="text-lg font-semibold text-slate-900">
                          Interview Stage
                        </h4>
                        <p className="text-sm text-slate-500">
                          Shortlisted candidates contacted for video interviews.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                          July 30, 2026
                        </span>
                        <h4 className="text-lg font-semibold text-slate-900">
                          Results Announced
                        </h4>
                        <p className="text-sm text-slate-500">
                          Final recipients notified via email.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Benefits Section */}
              {activeTab === "benefits" && (
                <div className="animate-fadeIn">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    Scholarship Value
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 border border-slate-200 rounded-xl hover:border-blue-500 transition-colors group bg-white shadow-sm">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <i className="fas fa-coins text-lg"></i>
                      </div>
                      <h3 className="font-semibold text-lg text-slate-900 mb-2">
                        Tuition Coverage
                      </h3>
                      <p className="text-slate-600 text-sm">
                        100% of tuition fees covered for the duration of the
                        1-year Master's program.
                      </p>
                    </div>
                    <div className="p-6 border border-slate-200 rounded-xl hover:border-blue-500 transition-colors group bg-white shadow-sm">
                      <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600 mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                        <i className="fas fa-home text-lg"></i>
                      </div>
                      <h3 className="font-semibold text-lg text-slate-900 mb-2">
                        Living Stipend
                      </h3>
                      <p className="text-slate-600 text-sm">
                        Monthly living allowance of £1,400 to cover
                        accommodation and expenses.
                      </p>
                    </div>
                    <div className="p-6 border border-slate-200 rounded-xl hover:border-blue-500 transition-colors group bg-white shadow-sm">
                      <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <i className="fas fa-plane text-lg"></i>
                      </div>
                      <h3 className="font-semibold text-lg text-slate-900 mb-2">
                        Travel Grant
                      </h3>
                      <p className="text-slate-600 text-sm">
                        Round-trip economy airfare from home country to the UK.
                      </p>
                    </div>
                    <div className="p-6 border border-slate-200 rounded-xl hover:border-blue-500 transition-colors group bg-white shadow-sm">
                      <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600 mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                        <i className="fas fa-shield-alt text-lg"></i>
                      </div>
                      <h3 className="font-semibold text-lg text-slate-900 mb-2">
                        Health Insurance
                      </h3>
                      <p className="text-slate-600 text-sm">
                        Coverage for the NHS Immigration Health Surcharge.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Apply Section */}
              {activeTab === "apply" && (
                <div className="animate-fadeIn">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    How to Apply
                  </h2>

                  <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-100 shadow-sm transition-all hover:border-blue-200">
                    <h3 className="flex items-center gap-2 font-semibold text-blue-900 mb-3">
                      <i className="fas fa-play-circle text-blue-600"></i> Video
                      Guide: Application Walkthrough
                    </h3>
                    <div className="aspect-video rounded-lg overflow-hidden bg-slate-900 relative group cursor-pointer h-64 border border-blue-200">
                      <img
                        src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                        alt="Video"
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center pl-1 shadow-lg">
                            <i className="fas fa-play text-xl"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-blue-700 mt-3 font-medium italic text-center">
                      Watch our 5-minute step-by-step guide on how to fill out
                      the scholarship application form correctly.
                    </p>
                  </div>

                  <ol className="relative border-l border-slate-200 ml-3 space-y-8">
                    <li className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white shadow-sm">
                        <i className="fas fa-file-alt text-blue-600 text-[10px]"></i>
                      </span>
                      <h3 className="flex items-center mb-1 text-lg font-semibold text-slate-900">
                        Prepare Documents
                      </h3>
                      <p className="mb-4 text-base font-normal text-slate-500">
                        Gather your transcripts, CV, two letters of
                        recommendation, and personal statement (max 1000 words).
                      </p>
                    </li>
                    <li className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white shadow-sm">
                        <i className="fas fa-school text-blue-600 text-[10px]"></i>
                      </span>
                      <h3 className="mb-1 text-lg font-semibold text-slate-900">
                        Apply to the University
                      </h3>
                      <p className="text-base font-normal text-slate-500">
                        Submit your admission application to a Master's program
                        at Cambridge University before April 30th.
                      </p>
                    </li>
                    <li className="ml-6">
                      <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white shadow-sm">
                        <i className="fas fa-paper-plane text-blue-600 text-[10px]"></i>
                      </span>
                      <h3 className="mb-1 text-lg font-semibold text-slate-900">
                        Submit Scholarship Form
                      </h3>
                      <p className="text-base font-normal text-slate-500">
                        Once you have your student ID, complete the separate
                        scholarship application form via the portal.
                      </p>
                    </li>
                  </ol>
                  <div className="mt-8">
                    <a
                      href="#"
                      className="inline-flex items-center justify-center w-full px-5 py-3 text-base font-medium text-white transition-all bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      Go to Official Application Portal
                      <i className="fas fa-external-link-alt ml-2 text-sm"></i>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* FAQ Section */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {[
                  {
                    q: "Is there an application fee?",
                    a: "No, applying for the scholarship itself is free. However, there may be an application fee for the university admission process depending on the department.",
                  },
                  {
                    q: "Can I apply if I am in my final year of Bachelor's?",
                    a: "Yes, you can apply with your provisional transcripts. If selected, the offer will be conditional upon achieving the required final grades.",
                  },
                  {
                    q: "Are part-time courses eligible?",
                    a: "No, this specific scholarship is only available for full-time, on-campus Master's programs.",
                  },
                ].map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className={`w-full px-5 py-4 text-left flex justify-between items-center transition-colors focus:outline-none ${openFaq === idx ? "bg-slate-50" : "hover:bg-slate-50"}`}
                    >
                      <span className="font-semibold text-slate-700">
                        {faq.q}
                      </span>
                      <i
                        className={`fas fa-chevron-down text-slate-400 transform transition-transform duration-200 ${openFaq === idx ? "rotate-180" : ""}`}
                      ></i>
                    </button>
                    <div
                      className={`px-5 text-slate-600 text-sm overflow-hidden transition-all duration-300 ${openFaq === idx ? "pb-4 max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      {faq.a}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-6">
            {/* At a Glance Card */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2 uppercase tracking-wide text-center">
                At a Glance
              </h3>

              <div className="space-y-6 mb-8 mt-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0 shadow-sm">
                    <i className="far fa-calendar-alt text-lg"></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                      Deadline
                    </p>
                    <p className="text-slate-900 font-semibold">
                      {scholarshipData.deadline}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500 shrink-0 shadow-sm">
                    <i className="fas fa-dollar-sign text-lg"></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                      Funding
                    </p>
                    <p className="text-slate-900 font-semibold">
                      Full Tuition + Stipend
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0 shadow-sm">
                    <i className="fas fa-graduation-cap text-lg"></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                      Level
                    </p>
                    <p className="text-slate-900 font-semibold">
                      Master's Degree
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate("scholarshipApplication", { id: id })}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                Apply Now
              </button>
              <p className="text-[10px] text-center text-slate-400 mt-4 font-medium italic">
                Official link from Cambridge University opens in new tab
              </p>
            </div>

            {/* Sidebar Ad 1 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center relative overflow-hidden group cursor-pointer hover:shadow-inner transition-all">
              <div className="absolute top-2 right-2 bg-white/80 backdrop-blur text-[10px] px-2 py-0.5 rounded text-slate-400 border border-slate-200">
                Ad
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-lg flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform">
                  <i className="fas fa-globe"></i>
                </div>
                <h4 className="font-bold text-slate-900 mb-1">
                  Study Abroad Consultant
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  Get expert guidance on your visa and application process.
                </p>
                <button className="text-xs font-semibold text-indigo-600 hover:text-white bg-white border border-indigo-200 px-4 py-2 rounded-full hover:bg-indigo-600 transition-all shadow-sm">
                  Book Free Session
                </button>
              </div>
            </div>

            {/* Related Scholarships */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900">Similar Programs</h3>
                <button className="text-xs text-blue-600 font-bold hover:underline">
                  View All
                </button>
              </div>
              <ul className="space-y-4">
                <li className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="group block cursor-pointer">
                    <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded mb-1 inline-block font-bold">
                      ENDING SOON
                    </span>
                    <h4 className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-relaxed">
                      Chevening Scholarship UK 2026
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <i className="far fa-clock"></i> Deadline: Nov 2025
                    </p>
                  </div>
                </li>
                <li className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="group block cursor-pointer">
                    <h4 className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-relaxed">
                      Fulbright Foreign Student Program USA
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <i className="far fa-clock"></i> Deadline: Oct 2025
                    </p>
                  </div>
                </li>
                <li className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="group block cursor-pointer">
                    <h4 className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-relaxed">
                      Erasmus Mundus Joint Masters
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <i className="far fa-clock"></i> Deadline: Feb 2026
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Sidebar Ad 2 */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative group cursor-pointer h-64">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                alt="Ad"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
                <span className="text-[10px] text-white/70 border border-white/30 px-2 rounded mb-2 uppercase font-bold tracking-widest">
                  Sponsored
                </span>
                <h4 className="text-white font-bold text-xl mb-2">
                  Learn Python in 30 Days
                </h4>
                <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg mt-2 font-bold shadow-lg shadow-blue-900/40">
                  Start Learning
                </button>
              </div>
            </div>

            {/* Campus Life Images Widget */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">
                University Gallery
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <img
                  src="https://images.unsplash.com/photo-1525921429612-e86051f445a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                  alt="Library"
                  className="rounded-lg object-cover h-24 w-full cursor-zoom-in hover:brightness-90 transition-all"
                />
                <img
                  src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                  alt="Students"
                  className="rounded-lg object-cover h-24 w-full cursor-zoom-in hover:brightness-90 transition-all"
                />
                <img
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                  alt="Campus"
                  className="rounded-lg object-cover h-24 w-full cursor-zoom-in hover:brightness-90 transition-all"
                />
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                  alt="Seminar"
                  className="rounded-lg object-cover h-24 w-full cursor-zoom-in hover:brightness-90 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ScholarshipHubDetailsPage;

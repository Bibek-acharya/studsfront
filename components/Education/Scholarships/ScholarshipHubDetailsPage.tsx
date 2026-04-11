import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "../../../services/api";
import ScholarshipApplicationPage from "./ScholarshipApplicationPage";

interface ScholarshipHubDetailsPageProps {
  onNavigate: (view: any, data?: any) => void;
}

type DetailField = {
  title?: string;
  description?: string;
  stage?: string;
  criterion?: string;
  name?: string;
  date?: string;
  event?: string;
  question?: string;
  answer?: string;
};

type ScholarshipDetail = {
  id: number;
  title: string;
  provider: string;
  location: string;
  value: string;
  deadline: string;
  degree_level: string;
  funding_type: string;
  scholarship_type: string;
  description: string;
  image_url: string;
  status: string;
  field_of_study: string[];
  selection_process: DetailField[];
  eligibility_criteria: DetailField[];
  excluded_regions: string[];
  required_documents: DetailField[];
  timeline: DetailField[];
  benefits: DetailField[];
  faqs: DetailField[];
};

const fallbackDetail: ScholarshipDetail = {
  id: 1,
  title: "Global Future Leaders Scholarship 2026",
  provider: "Cambridge University, UK",
  location: "Cambridge, UK",
  value: "$30,000 / Year",
  deadline: "May 15, 2026",
  degree_level: "Masters",
  funding_type: "Fully Funded",
  scholarship_type: "Merit Based",
  description:
    "Designed for high-achieving international students with leadership potential.",
  image_url:
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  status: "OPEN",
  field_of_study: [
    "Computer Science & AI",
    "Environmental Science",
    "Public Health",
    "Business Administration",
  ],
  selection_process: [
    {
      stage: "Stage 1: Initial Screening",
      description:
        "Applications are reviewed for eligibility and completeness. Incomplete applications are rejected immediately.",
    },
    {
      stage: "Stage 2: Academic Review",
      description:
        "A panel of professors reviews academic transcripts, research proposals, and recommendation letters.",
    },
    {
      stage: "Stage 3: Interview",
      description:
        "Shortlisted candidates are invited for a virtual interview with the scholarship committee in June.",
    },
  ],
  eligibility_criteria: [
    {
      criterion: "Nationality",
      description: "Must be an international student from a non-EU country.",
    },
    {
      criterion: "Academic Merit",
      description:
        "Must hold a First Class Honours degree or equivalent GPA (3.7/4.0).",
    },
    {
      criterion: "Language Proficiency",
      description: "IELTS score of 7.5 overall or TOEFL iBT score of 110.",
    },
  ],
  excluded_regions: [
    "United Kingdom",
    "Australia",
    "New Zealand",
    "USA (Specific state grants available instead)",
  ],
  required_documents: [
    {
      name: "Academic Transcripts",
      description: "Official copies from all universities attended.",
    },
    {
      name: "CV / Resume",
      description: "Updated CV highlighting academic and leadership achievements.",
    },
    {
      name: "Recommendation Letters",
      description: "Two academic references on official letterhead.",
    },
    {
      name: "Personal Statement",
      description: "Max 1000 words outlining your goals and motivation.",
    },
  ],
  timeline: [
    { date: "Jan 15, 2026", event: "Applications Open" },
    { date: "May 15, 2026", event: "Submission Deadline" },
    { date: "June 2026", event: "Interview Stage" },
    { date: "July 30, 2026", event: "Results Announced" },
  ],
  benefits: [
    {
      title: "Tuition Coverage",
      description: "100% of tuition fees covered for the duration of the 1-year Master's program.",
    },
    {
      title: "Living Stipend",
      description: "Monthly living allowance to cover accommodation and expenses.",
    },
    {
      title: "Travel Grant",
      description: "Round-trip economy airfare from home country to the host destination.",
    },
    {
      title: "Health Insurance",
      description: "Coverage for student medical and health charges.",
    },
  ],
  faqs: [
    {
      question: "Is there an application fee?",
      answer:
        "No, applying for the scholarship itself is free. Some universities may have separate application charges.",
    },
    {
      question: "Can final year students apply?",
      answer:
        "Yes, final year students can apply with provisional documents.",
    },
    {
      question: "Are part-time courses eligible?",
      answer: "No, this scholarship is available for full-time on-campus programs.",
    },
  ],
};

const ScholarshipHubDetailsPage: React.FC<ScholarshipHubDetailsPageProps> = ({
  onNavigate,
}) => {
  const location = useLocation();
  const routeState = (location.state as any) || {};
  const resolvedId = routeState?.id || "1";

  const [activeTab, setActiveTab] = useState<
    "overview" | "eligibility" | "documents" | "timeline" | "benefits" | "apply"
  >("overview");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy link");
  const shareMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [resolvedId]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!shareMenuRef.current) {
        return;
      }

      if (!shareMenuRef.current.contains(event.target as Node)) {
        setIsShareMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsShareMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const { data } = useQuery({
    queryKey: ["education-scholarship-details", resolvedId],
    queryFn: () => apiService.getEducationScholarshipById(resolvedId),
    enabled: !!resolvedId,
  });

  const { data: similarData } = useQuery({
    queryKey: ["education-scholarship-similar", resolvedId],
    queryFn: () => apiService.getEducationSimilarScholarships(resolvedId),
    enabled: !!resolvedId,
  });

  const scholarshipData = useMemo<ScholarshipDetail>(() => {
    const api = (data?.data as unknown as Partial<ScholarshipDetail>) || {};
    return {
      ...fallbackDetail,
      ...api,
      field_of_study: api.field_of_study?.length ? api.field_of_study : fallbackDetail.field_of_study,
      selection_process: api.selection_process?.length ? api.selection_process : fallbackDetail.selection_process,
      eligibility_criteria: api.eligibility_criteria?.length
        ? api.eligibility_criteria
        : fallbackDetail.eligibility_criteria,
      excluded_regions: api.excluded_regions?.length ? api.excluded_regions : fallbackDetail.excluded_regions,
      required_documents: api.required_documents?.length
        ? api.required_documents
        : fallbackDetail.required_documents,
      timeline: api.timeline?.length ? api.timeline : fallbackDetail.timeline,
      benefits: api.benefits?.length ? api.benefits : fallbackDetail.benefits,
      faqs: api.faqs?.length ? api.faqs : fallbackDetail.faqs,
    };
  }, [data]);

  const similarScholarships = useMemo(() => {
    return (similarData?.data?.scholarships || []).slice(0, 3);
  }, [similarData]);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return window.location.href;
  }, [resolvedId]);

  const shareText = useMemo(() => {
    return `${scholarshipData.title} by ${scholarshipData.provider}`;
  }, [scholarshipData.provider, scholarshipData.title]);

  const encodedShareUrl = encodeURIComponent(shareUrl);
  const encodedShareText = encodeURIComponent(shareText);

  const shareTargets = [
    {
      label: "Facebook",
      icon: "fa-facebook-f",
      iconClass: "fa-brands",
      color: "bg-blue-50 text-blue-600",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`,
    },
    {
      label: "X",
      icon: "fa-x-twitter",
      iconClass: "fa-brands",
      color: "bg-slate-100 text-slate-900",
      href: `https://twitter.com/intent/tweet?url=${encodedShareUrl}&text=${encodedShareText}`,
    },
    {
      label: "LinkedIn",
      icon: "fa-linkedin-in",
      iconClass: "fa-brands",
      color: "bg-blue-50 text-blue-700",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedShareUrl}`,
    },
    {
      label: "WhatsApp",
      icon: "fa-whatsapp",
      iconClass: "fa-brands",
      color: "bg-green-50 text-green-600",
      href: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
    },
    {
      label: "Telegram",
      icon: "fa-telegram",
      iconClass: "fa-brands",
      color: "bg-cyan-50 text-cyan-600",
      href: `https://t.me/share/url?url=${encodedShareUrl}&text=${encodedShareText}`,
    },
    {
      label: "Email",
      icon: "fa-envelope",
      iconClass: "fa-solid",
      color: "bg-amber-50 text-amber-600",
      href: `mailto:?subject=${encodedShareText}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`,
    },
  ];

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        textArea.setAttribute("readonly", "true");
        textArea.style.position = "absolute";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopyLabel("Copied!");
      window.setTimeout(() => setCopyLabel("Copy link"), 2000);
    } catch {
      setCopyLabel("Copy failed");
      window.setTimeout(() => setCopyLabel("Copy link"), 2000);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 antialiased font-sans pb-12 pt-16">
      <main className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="bg-green-100 text-green-700 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-green-200">
                  {scholarshipData.funding_type || "Fully Funded"}
                </span>
                <span className="bg-blue-100 text-blue-700 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-blue-200">
                  {scholarshipData.degree_level || "Masters"}
                </span>
                <span className="bg-purple-100 text-purple-700 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-purple-200">
                  {scholarshipData.scholarship_type || "Merit Based"}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{scholarshipData.title}</h1>
              <p className="text-slate-500 flex items-center gap-2">
                <i className="fa-solid fa-map-pin w-4 h-4"></i> Offered by {scholarshipData.provider}
              </p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <div className="relative" ref={shareMenuRef}>
                <button
                  onClick={() => setIsShareMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors bg-white shadow-sm"
                >
                  <i className="fa-solid fa-share-nodes w-4 h-4"></i> Share
                </button>

                {isShareMenuOpen && (
                  <div className="absolute right-0 top-full mt-3 w-72 rounded-2xl border border-slate-200 bg-white shadow-2xl p-3 z-30">
                    <p className="px-2 pb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      Share Scholarship
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {shareTargets.map((target) => (
                        <a
                          key={target.label}
                          href={target.href}
                          target={target.label === "Email" ? undefined : "_blank"}
                          rel={target.label === "Email" ? undefined : "noreferrer"}
                          className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <span className={`flex h-9 w-9 items-center justify-center rounded-full ${target.color}`}>
                            <i className={`${target.iconClass} ${target.icon}`}></i>
                          </span>
                          <span>{target.label}</span>
                        </a>
                      ))}
                    </div>
                    <button
                      onClick={handleCopyLink}
                      className="mt-2 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                        <i className="fa-solid fa-link"></i>
                      </span>
                      <span>{copyLabel}</span>
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={() => setIsSaved((prev) => !prev)}
                className={`flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg transition-colors bg-white shadow-sm ${
                  isSaved ? "text-blue-700 bg-blue-50 border-blue-200" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <i className={`fa-${isSaved ? "solid" : "regular"} fa-bookmark w-4 h-4`}></i>
                <span>{isSaved ? "Saved" : "Save"}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="lg:hidden bg-white p-4 rounded-xl shadow-sm border border-slate-200 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">Deadline</p>
                <p className="text-red-600 font-medium flex items-center gap-1">
                  <i className="fa-regular fa-clock w-3 h-3"></i> {scholarshipData.deadline}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">Value</p>
                <p className="text-slate-900 font-medium">{scholarshipData.value}</p>
              </div>
            </div>

            <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-sm group">
              <img
                src={scholarshipData.image_url || fallbackDetail.image_url}
                alt="Scholarship"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded text-xs font-medium">
                    {scholarshipData.location}
                  </span>
                  <span className="bg-blue-600/90 backdrop-blur-md px-2 py-1 rounded text-xs font-medium">
                    #1 Ranked
                  </span>
                </div>
                <p className="font-medium text-lg">Applications are open now</p>
              </div>
            </div>

            <div className="border-b border-slate-200 overflow-x-auto">
              <nav className="-mb-px flex space-x-6 min-w-max" aria-label="Tabs">
                {(["overview", "eligibility", "documents", "timeline", "benefits", "apply"] as const).map((tab) => (
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

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 min-h-[400px]">
              {activeTab === "overview" && (
                <div className="fade-in">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">About the Scholarship</h2>
                  <p className="text-slate-600 leading-relaxed mb-6">{scholarshipData.description}</p>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">Field of Study</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                    {scholarshipData.field_of_study?.map((field, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-slate-600">
                        <i className="fa-solid fa-circle-check w-4 h-4 text-green-500"></i> {field}
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-bold text-slate-900 mb-4">Selection Process</h3>
                  <div className="relative border-l-2 border-slate-200 ml-3 space-y-8">
                    {(scholarshipData.selection_process || []).map((step, idx) => (
                      <div className="ml-6 relative" key={idx}>
                        <span
                          className={`absolute -left-[33px] top-1 h-4 w-4 rounded-full bg-white border-4 ${
                            idx === 0 ? "border-blue-600" : "border-slate-300"
                          }`}
                        ></span>
                        <h4 className="font-semibold text-slate-900">{step.stage || step.title}</h4>
                        <p className="text-sm text-slate-600 mt-1">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "eligibility" && (
                <div className="fade-in">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Eligibility Criteria</h2>
                  <div className="space-y-4 mb-6">
                    {(scholarshipData.eligibility_criteria || []).map((item, idx) => (
                      <div key={idx} className="flex gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                            {idx + 1}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{item.criterion || item.title}</h4>
                          <p className="text-slate-600 text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-3">Excluded Regions</h3>
                  <ul className="list-disc list-inside text-sm text-slate-600 bg-red-50 p-4 rounded-lg border border-red-100">
                    {(scholarshipData.excluded_regions || []).map((region, idx) => (
                      <li key={idx}>{region}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "documents" && (
                <div className="fade-in">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Required Documents</h2>
                  <p className="text-slate-600 mb-6">Ensure all documents are in PDF format and do not exceed 5MB each.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(scholarshipData.required_documents || []).map((doc, idx) => (
                      <div
                        key={idx}
                        className="p-4 border border-slate-200 rounded-xl hover:border-blue-400 transition-all flex items-start gap-3 h-full"
                      >
                        <div className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center bg-white mt-0.5">
                          <i className="fa-solid fa-check w-3 h-3 text-blue-500"></i>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">{doc.name || doc.title}</h4>
                          <p className="text-xs text-slate-500 mt-1">{doc.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "timeline" && (
                <div className="fade-in">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Scholarship Timeline</h2>
                  <div className="space-y-0">
                    {(scholarshipData.timeline || []).map((item, idx) => (
                      <div className="flex gap-4" key={idx}>
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full ${idx === 0 ? "bg-blue-600" : "bg-slate-300"}`}></div>
                          {idx !== scholarshipData.timeline.length - 1 && (
                            <div className={`w-0.5 flex-1 h-16 ${idx === 0 ? "bg-blue-200" : "bg-slate-200"}`}></div>
                          )}
                        </div>
                        <div className={idx === scholarshipData.timeline.length - 1 ? "" : "pb-8"}>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{item.date}</span>
                          <h4 className="text-lg font-semibold text-slate-900">{item.event || item.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "benefits" && (
                <div className="fade-in">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Scholarship Value</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(scholarshipData.benefits || []).map((benefit, idx) => (
                      <div key={idx} className="p-6 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors">
                        <h3 className="font-semibold text-lg text-slate-900 mb-2">{benefit.title}</h3>
                        <p className="text-slate-600 text-sm">{benefit.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "apply" && (
                <div className="fade-in">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">How to Apply</h2>
                  <ol className="relative border-l border-slate-200 ml-3 space-y-8">
                    <li className="ml-6">
                      <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                        <i className="fa-solid fa-file-lines w-3 h-3 text-blue-600"></i>
                      </span>
                      <h3 className="mb-1 text-lg font-semibold text-slate-900">Prepare Documents</h3>
                      <p className="text-base font-normal text-slate-500">
                        Gather transcripts, CV, recommendation letters, and your personal statement.
                      </p>
                    </li>
                    <li className="ml-6">
                      <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                        <i className="fa-solid fa-building-columns w-3 h-3 text-blue-600"></i>
                      </span>
                      <h3 className="mb-1 text-lg font-semibold text-slate-900">Apply to Institution</h3>
                      <p className="text-base font-normal text-slate-500">
                        Submit your institution admission as required by the scholarship provider.
                      </p>
                    </li>
                    <li className="ml-6">
                      <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                        <i className="fa-solid fa-paper-plane w-3 h-3 text-blue-600"></i>
                      </span>
                      <h3 className="mb-1 text-lg font-semibold text-slate-900">Submit Inquiry/Application</h3>
                      <p className="text-base font-normal text-slate-500">
                        Complete the scholarship inquiry form and proceed with application steps.
                      </p>
                    </li>
                  </ol>
                  <div className="mt-8">
                    <button
                      onClick={() => setIsApplicationModalOpen(true)}
                      className="inline-flex items-center justify-center w-full px-5 py-3 text-base font-medium text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700"
                    >
                      Open Application Form
                      <i className="fa-solid fa-arrow-right w-5 h-5 ml-2"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {(scholarshipData.faqs || []).map((faq, idx) => (
                  <div className="border border-slate-200 rounded-lg" key={idx}>
                    <button
                      onClick={() => setOpenFaq((prev) => (prev === idx ? null : idx))}
                      className="w-full px-5 py-4 text-left flex justify-between items-center"
                    >
                      <span className="font-medium text-slate-700">{faq.question}</span>
                      <i
                        className={`fa-solid fa-chevron-down w-5 h-5 text-slate-400 transition-transform ${
                          openFaq === idx ? "rotate-180" : ""
                        }`}
                      ></i>
                    </button>
                    {openFaq === idx && <div className="px-5 pb-4 text-slate-600 text-sm">{faq.answer}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">At a Glance</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                    <i className="fa-solid fa-calendar w-5 h-5"></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">Deadline</p>
                    <p className="text-slate-900 font-medium">{scholarshipData.deadline}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500 shrink-0">
                    <i className="fa-solid fa-dollar-sign w-5 h-5"></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">Value</p>
                    <p className="text-slate-900 font-medium">{scholarshipData.value}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                    <i className="fa-solid fa-graduation-cap w-5 h-5"></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">Provider</p>
                    <p className="text-slate-900 font-medium">{scholarshipData.provider}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                    <i className="fa-solid fa-graduation-cap w-5 h-5"></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">Level</p>
                    <p className="text-slate-900 font-medium">{scholarshipData.degree_level}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsApplicationModalOpen(true)}
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Apply Now
              </button>
              <p className="text-xs text-center text-slate-400 mt-3">Complete application in 5 minutes</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900">Similar Scholarships</h3>
                <button className="text-xs text-blue-600 font-medium hover:underline" onClick={() => onNavigate("scholarshipCategory")}>View All</button>
              </div>
              <ul className="space-y-4">
                {similarScholarships.length > 0 ? (
                  similarScholarships.map((item, idx) => (
                    <li key={item.id} className={idx !== similarScholarships.length - 1 ? "pb-4 border-b border-slate-100" : ""}>
                      <button className="text-left group" onClick={() => onNavigate("scholarshipHubDetails", { id: String(item.id) })}>
                        {item.status === "CLOSING SOON" && (
                          <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded mb-1 inline-block">Ending Soon</span>
                        )}
                        <h4 className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">{item.title}</h4>
                        <p className="text-xs text-slate-500 mt-1">Deadline: {item.deadline}</p>
                      </button>
                    </li>
                  ))
                ) : (
                  <li>
                    <p className="text-sm text-slate-500">No similar scholarships available yet.</p>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </main>

      {isApplicationModalOpen && (
        <ScholarshipApplicationPage
          onClose={() => setIsApplicationModalOpen(false)}
          scholarshipId={String(scholarshipData.id)}
          scholarshipName={scholarshipData.title}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
};

export default ScholarshipHubDetailsPage;

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "../../../services/api";

// Enhanced data structure to match the new high-fidelity design
const examData: { [key: string]: any } = {
  "ioe-entrance": {
    title: "IOE Entrance Examination 2081",
    shortTitle: "IOE B.E./B.Arch",
    board: "Institute of Engineering, TU",
    location: "Chakupat, Lalitpur",
    badges: ["IOE / TU Affiliated", "Applications Open"],
    examDate: "Falgun 25, 2081 (Mar 09, 2025)",
    deadline: "Falgun 10, 2081",
    overview:
      "The gateway to Pulchowk Campus and other constituent engineering colleges. Get details on syllabus, shifts, and admit cards.",
    weightage: [
      { label: "Mathematics", marks: 50, color: "bg-brand-500", width: "35%" },
      { label: "Physics", marks: 45, color: "bg-blue-500", width: "32%" },
      { label: "Chemistry", marks: 25, color: "bg-teal-500", width: "18%" },
      {
        label: "English & Aptitude",
        marks: 20,
        color: "bg-purple-500",
        width: "15%",
      },
    ],
    timeline: [
      {
        event: "Application Opens",
        bs: "Magh 20, 2081",
        ad: "Feb 02, 2025",
        status: "Active",
        statusColor: "bg-green-100 text-green-700",
      },
      {
        event: "Deadline (Regular)",
        bs: "Falgun 10, 2081",
        ad: "Feb 22, 2025",
        status: "Closing Soon",
        statusColor: "bg-yellow-100 text-yellow-700",
      },
      {
        event: "Entrance Exam Start",
        bs: "Falgun 25, 2081",
        ad: "Mar 09, 2025",
        status: "Upcoming",
        statusColor: "bg-slate-100 text-slate-600",
      },
    ],
    notices: [
      {
        id: 1,
        title: "Call for Applications: BE/B.Arch Entrance 2081",
        month: "Magh",
        date: "20",
        source: "Exam Board, Chakupat",
        time: "2 days ago",
        urgent: true,
      },
      {
        id: 2,
        title: "Update on Mathematics Syllabus (Vector & 3D)",
        month: "Poush",
        date: "05",
        source: "Syllabus Committee",
        time: "Jan 05, 2025",
        urgent: false,
      },
    ],
    faqs: [
      {
        q: "Is there negative marking?",
        a: "Yes. For every incorrect answer, 10% of the marks assigned to that question will be deducted.",
      },
      {
        q: "Can I apply if my Grade 12 result is pending?",
        a: "Yes. Students awaiting results can apply, but you must submit your transcript during the college admission process if you pass.",
      },
    ],
  },
  "neb-class-12": {
    title: "NEB Class 12 Board Examination 2081",
    shortTitle: "NEB Class 12",
    board: "National Examination Board",
    location: "Sanothimi, Bhaktapur",
    badges: ["National Board", "Forms Active"],
    examDate: "Baishakh 14, 2082",
    deadline: "Magh 20, 2081",
    overview:
      "The final gateway for secondary education in Nepal. Mandatory for higher studies.",
    weightage: [
      { label: "Theory", marks: 75, color: "bg-brand-500", width: "75%" },
      { label: "Practical", marks: 25, color: "bg-emerald-500", width: "25%" },
    ],
    timeline: [
      {
        event: "Form Submission",
        bs: "Magh 05, 2081",
        ad: "Jan 18, 2025",
        status: "Active",
        statusColor: "bg-green-100 text-green-700",
      },
      {
        event: "Exam Date",
        bs: "Baishakh 14, 2082",
        ad: "Apr 27, 2025",
        status: "Scheduled",
        statusColor: "bg-amber-100 text-amber-700",
      },
    ],
    notices: [
      {
        id: 1,
        title: "Official Routine: Grade 12 Annual Exam 2081",
        month: "Magh",
        date: "02",
        source: "NEB Office",
        time: "5 days ago",
        urgent: true,
      },
    ],
    faqs: [
      {
        q: "What is the pass criteria?",
        a: "Minimum 35% in theory and 40% in practical for each subject individually.",
      },
    ],
  },
};

interface ExamDetailsPageProps {
  id: string;
  onNavigate: (view: any, data?: any) => void;
}

const ExamDetailsPage: React.FC<ExamDetailsPageProps> = ({
  id,
  onNavigate,
}) => {
  const [pdfModal, setPdfModal] = useState({
    open: false,
    title: "",
    loading: false,
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { data } = useQuery({
    queryKey: ["education-exam", id],
    queryFn: () => apiService.getEducationExamById(id),
  });

  const currentExam = data?.data || examData[id] || examData["ioe-entrance"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const openViewer = (title: string) => {
    setPdfModal({ open: true, title, loading: true });
    setTimeout(() => setPdfModal((prev) => ({ ...prev, loading: false })), 800);
  };

  return (
    <div className="bg-slate-50 min-h-screen font-jakarta pt-20 pb-20">
      {/* PDF Modal */}
      {pdfModal.open && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 md:p-8 overflow-hidden">
          <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeInUp">
            <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-red-100 rounded-xl text-red-600 flex items-center justify-center">
                  <i className="fa-solid fa-file-pdf"></i>
                </div>
                <div>
                  <h3 className="font-black text-slate-800 text-sm md:text-base">
                    {pdfModal.title}
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Official Document Preview
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-primary-600 transition">
                  <i className="fa-solid fa-download"></i>
                </button>
                <button
                  onClick={() => setPdfModal({ ...pdfModal, open: false })}
                  className="p-2 text-slate-400 hover:text-red-500 transition ml-2"
                >
                  <i className="fa-solid fa-xmark text-lg"></i>
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-500 overflow-y-auto p-4 md:p-12 flex justify-center relative no-scrollbar">
              {pdfModal.loading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                  <div className="flex flex-col items-center gap-3">
                    <i className="fa-solid fa-circle-notch fa-spin text-primary-600 text-3xl"></i>
                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest">
                      Loading...
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-white w-full max-w-3xl min-h-[1000px] shadow-lg p-12 md:p-20 relative rounded-sm">
                  <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 opacity-60">
                      <i className="fa-solid fa-building-columns text-4xl text-slate-900"></i>
                    </div>
                    <h2 className="text-2xl font-black uppercase text-slate-900 tracking-tight">
                      {currentExam.board}
                    </h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">
                      {currentExam.location}
                    </p>
                    <div className="w-24 h-1 bg-slate-200 mx-auto mt-6"></div>
                  </div>
                  <div className="prose prose-slate max-w-none text-justify text-sm leading-relaxed text-slate-700">
                    <p className="font-black text-center mb-8 uppercase">
                      Notice for Entrance Examination 2081
                    </p>
                    <p className="mb-4">
                      It is hereby notified that the Entrance Examination for
                      admission in {currentExam.title} for the academic year
                      2081/82 will be held as per the official schedule.
                    </p>
                    <p className="mb-4">
                      <strong>1. Eligibility:</strong> Students who have passed
                      +2 Science or Diploma in Engineering with minimum grades
                      required by the board.
                    </p>
                    <p className="mb-4">
                      <strong>2. Mode of Exam:</strong> Computer Based Test
                      (CBT).
                    </p>
                    <p className="mb-8">
                      <strong>3. Fee:</strong> NRs. 2,000/- (Two Thousand Only).
                    </p>
                    <div className="mt-20 flex justify-end">
                      <div className="text-center">
                        <p className="font-black text-slate-900">
                          Member Secretary
                        </p>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">
                          Entrance Board
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 overflow-hidden">
          <span
            onClick={() => onNavigate("home")}
            className="hover:text-primary-600 cursor-pointer whitespace-nowrap"
          >
            Home
          </span>
          <i className="fa-solid fa-chevron-right text-[8px] text-slate-300"></i>
          <span
            onClick={() => onNavigate("entranceDiscovery")}
            className="hover:text-primary-600 cursor-pointer whitespace-nowrap"
          >
            Entrance
          </span>
          <i className="fa-solid fa-chevron-right text-[8px] text-slate-300"></i>
          <span className="text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md border border-primary-100 truncate">
            {currentExam.shortTitle}
          </span>
        </nav>

        {/* 1. HERO SECTION */}
        <section className="relative bg-slate-900 rounded-2xl shadow-2xl overflow-hidden mb-12 group p-8 md:p-16">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary-600 blur-[100px] opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-600 blur-[100px] opacity-20"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <div className="max-w-2xl space-y-6">
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.15em] text-primary-300">
                  <i className="fa-solid fa-graduation-cap text-amber-400"></i>{" "}
                  {currentExam.badges[0]}
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/20 border border-primary-500/30 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.15em] text-primary-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
                  {currentExam.badges[1]}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter">
                {currentExam.title.split(" 2081")[0]} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-white to-primary-400">
                  Examination 2081
                </span>
              </h1>

              <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
                {currentExam.overview}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => openViewer("Call for Applications")}
                  className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center gap-3"
                >
                  <span>View Notice</span>{" "}
                  <i className="fa-solid fa-arrow-right text-primary-600"></i>
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all backdrop-blur-md border border-white/10 flex items-center gap-3">
                  <i className="fa-solid fa-book"></i> Syllabus
                </button>
              </div>
            </div>

            <div className="hidden lg:flex w-72 h-72 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md items-center justify-center group-hover:scale-105 transition-transform duration-700 relative">
              <i className="fa-solid fa-file-contract text-[100px] text-white/10"></i>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-[10px] font-black text-primary-400 uppercase tracking-widest mb-1">
                    Fee
                  </p>
                  <p className="text-3xl font-black text-white uppercase">
                    Rs. 2k
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Notices Section */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between md:items-center gap-4 bg-slate-50/50">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center text-xl shadow-inner">
                    <i className="fa-solid fa-bullhorn"></i>
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">
                      Entrance Notices
                    </h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                      {currentExam.board}
                    </p>
                  </div>
                </div>
                <span className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 shadow-sm flex items-center gap-2">
                  <i className="fa-solid fa-circle-check"></i> Official Source
                </span>
              </div>

              <div className="divide-y divide-slate-50">
                {currentExam.notices.map((n: any) => (
                  <div
                    key={n.id}
                    className="p-8 hover:bg-slate-50/50 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-600 transform -translate-x-full group-hover:translate-x-0 transition-transform"></div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                      <div className="flex gap-6">
                        <div
                          onClick={() => openViewer(n.title)}
                          className="h-14 w-14 bg-rose-50 text-rose-600 border border-rose-100 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform cursor-pointer"
                        >
                          <span className="text-[10px] font-black uppercase leading-none mb-1">
                            {n.month}
                          </span>
                          <span className="text-lg font-black leading-none">
                            {n.date}
                          </span>
                        </div>
                        <div>
                          <h3
                            onClick={() => openViewer(n.title)}
                            className="font-black text-slate-800 text-lg group-hover:text-primary-600 transition-colors cursor-pointer leading-tight mb-2"
                          >
                            {n.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <span className="flex items-center gap-2">
                              <i className="fa-solid fa-building text-slate-300"></i>{" "}
                              {n.source}
                            </span>
                            <span className="flex items-center gap-2">
                              <i className="fa-regular fa-clock text-slate-300"></i>{" "}
                              {n.time}
                            </span>
                            {n.urgent && (
                              <span className="bg-rose-100 text-rose-600 px-2 py-0.5 rounded border border-rose-200">
                                Urgent
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => openViewer(n.title)}
                        className="px-6 py-2.5 bg-white border border-slate-200 text-slate-500 hover:text-primary-600 hover:border-primary-100 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-sm"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Structure Section */}
            <section className="bg-white rounded-2xl p-10 border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16"></div>
              <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tight flex items-center gap-4">
                <div className="w-2 h-8 bg-primary-600 rounded-full"></div>
                Entrance Structure (CBT)
              </h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="text-slate-500 font-medium leading-relaxed space-y-4">
                  <p>
                    The {currentExam.shortTitle} examination is a{" "}
                    <strong>Computer Based Test (CBT)</strong> of 2 hours
                    duration. It consists of multiple-choice questions carrying
                    a total of 140 marks.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <i className="fa-solid fa-circle-minus text-rose-500"></i>{" "}
                      Negative Marking: 10% deduction
                    </li>
                    <li className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <i className="fa-solid fa-calculator text-primary-500"></i>{" "}
                      Calculators: Non-programmable allowed
                    </li>
                    <li className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <i className="fa-solid fa-clock text-primary-500"></i>{" "}
                      Duration: 2 Hours (120 Mins)
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
                    Marks Weightage
                  </h4>
                  <div className="space-y-5">
                    {currentExam.weightage.map((item: any) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-700 mb-2 px-1">
                          <span>{item.label}</span>
                          <span className="text-primary-600">
                            {item.marks} Marks
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                            style={{ width: item.width }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Timeline Section */}
            <section className="bg-white rounded-2xl p-10 border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-10 uppercase tracking-tight flex items-center gap-4">
                <div className="w-2 h-8 bg-primary-600 rounded-full"></div>
                Important Dates 2081
              </h2>
              <div className="overflow-x-auto no-scrollbar rounded-xl border border-slate-50">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <tr>
                      <th className="px-8 py-5">Event Milestone</th>
                      <th className="px-8 py-5 text-primary-600">
                        Date (B.S.)
                      </th>
                      <th className="px-8 py-5">Date (A.D.)</th>
                      <th className="px-8 py-5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 font-bold text-sm">
                    {currentExam.timeline.map((row: any, i: number) => (
                      <tr
                        key={i}
                        className="hover:bg-slate-50/50 transition-colors group"
                      >
                        <td
                          className={`px-8 py-6 text-slate-800 ${i === 0 ? "border-l-4 border-primary-600 pl-7" : ""}`}
                        >
                          {row.event}
                        </td>
                        <td className="px-8 py-6 text-slate-900 font-black">
                          {row.bs}
                        </td>
                        <td className="px-8 py-6 text-slate-400 uppercase tracking-widest text-xs">
                          {row.ad}
                        </td>
                        <td className="px-8 py-6 text-center">
                          <span
                            className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${row.statusColor} shadow-sm`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Application Process */}
            <section className="bg-white rounded-2xl p-10 border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16"></div>
              <h2 className="text-2xl font-black text-slate-900 mb-12 uppercase tracking-tight flex items-center gap-4">
                <div className="w-2 h-8 bg-primary-600 rounded-full"></div>
                Application Journey
              </h2>
              <div className="relative pl-6 space-y-12 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                <ProcessStep
                  step="1"
                  title="Online Registration"
                  desc="Visit entrance.ioe.edu.np. Upload Grade 12 marksheet and a recent digital photo."
                />
                <ProcessStep
                  step="2"
                  title="Payment Submission"
                  desc="Pay the fee of Rs. 2,000 via Siddhartha Bank (ConnectIPS/eSewa/Khalti)."
                />
                <ProcessStep
                  step="3"
                  title="Admit Card Retrieval"
                  desc="After verification (approx 3 days), download your color Admit Card online."
                />
              </div>
            </section>

            {/* FAQ */}
            <section className="space-y-6">
              <h2 className="text-2xl font-black text-slate-900 text-center mb-12 uppercase tracking-widest">
                Queries & Support
              </h2>
              <div className="space-y-4 max-w-3xl mx-auto">
                {currentExam.faqs.map((faq: any, idx: number) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-8 text-left flex justify-between items-center transition-colors hover:bg-slate-50"
                    >
                      <span className="font-black text-slate-800 text-sm uppercase tracking-widest">
                        {faq.q}
                      </span>
                      <i
                        className={`fa-solid fa-chevron-down text-slate-300 transition-transform duration-500 ${openFaq === idx ? "rotate-180 text-primary-600" : ""}`}
                      ></i>
                    </button>
                    {openFaq === idx && (
                      <div className="p-8 border-t border-slate-50 animate-fadeInDown">
                        <p className="text-slate-500 font-medium leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-28 space-y-8">
              {/* Quick Summary */}
              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm group">
                <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight flex items-center gap-3">
                  <i className="fa-solid fa-bolt text-primary-600"></i> Quick
                  Summary
                </h3>
                <div className="space-y-4">
                  <SummaryRow label="Exam Name" val={currentExam.shortTitle} />
                  <SummaryRow label="Eligibility" val="Science Graduate" />
                  <SummaryRow label="Frequency" val="Annual" />
                  <SummaryRow label="Board" val={currentExam.board} />
                </div>
              </div>

              {/* Quick Downloads */}
              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight flex items-center gap-3">
                  <i className="fa-solid fa-download text-primary-600"></i>{" "}
                  Resources
                </h3>
                <div className="space-y-3">
                  <DownloadItem title="Past Questions (2080)" size="2.4 MB" />
                  <DownloadItem title="Model Questions Set A" size="1.1 MB" />
                  <DownloadItem title="Official Grid 2081" size="0.8 MB" />
                </div>
              </div>

              {/* Help Widget */}
              <div className="bg-slate-900 rounded-2xl p-10 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-600/20 rounded-full blur-2xl -mr-12 -mt-12"></div>
                <h3 className="text-2xl font-black mb-8 tracking-tight">
                  Need Help?
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary-400 shadow-inner shrink-0">
                      <i className="fa-solid fa-phone"></i>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                        Board Support
                      </p>
                      <p className="text-sm font-bold">01-5520628</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary-400 shadow-inner shrink-0">
                      <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                        Institutional Email
                      </p>
                      <p className="text-sm font-bold truncate">
                        entrance@ioe.edu.np
                      </p>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-10 py-4 bg-primary-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-primary-950/20 hover:bg-primary-500 transition-all active:scale-95">
                  Chat with Counselor
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Global Newsletter/CTA */}
      <section className="mt-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-primary-600 rounded-2xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl group/final">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px] opacity-30 group-hover/final:scale-110 transition-transform duration-1000"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
              Never miss an <span className="text-primary-200">update</span>
            </h2>
            <p className="text-primary-100 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              Join 50k+ students getting instant alerts for result publication,
              entrance routines, and exam tips.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="bg-white text-primary-600 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-3">
                Get SMS Alerts{" "}
                <i className="fa-solid fa-bell animate-pulse"></i>
              </button>
              <button className="bg-primary-950/40 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest backdrop-blur-md border border-white/20 hover:bg-primary-950/60 transition-all">
                Official Portal
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProcessStep: React.FC<{ step: string; title: string; desc: string }> = ({
  step,
  title,
  desc,
}) => (
  <div className="relative group">
    <div className="absolute -left-10 top-1 w-8 h-8 rounded-full bg-white border-4 border-primary-600 shadow-xl flex items-center justify-center font-black text-[10px] text-primary-600 z-10 transition-transform group-hover:scale-125">
      {step}
    </div>
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm group-hover:shadow-xl transition-all duration-500">
      <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight group-hover:text-primary-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-slate-500 font-medium leading-relaxed">
        {desc}
      </p>
    </div>
  </div>
);

const SummaryRow: React.FC<{ label: string; val: string }> = ({
  label,
  val,
}) => (
  <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white transition-all">
    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
      {label}
    </span>
    <span className="text-xs font-black text-slate-800">{val}</span>
  </div>
);

const DownloadItem: React.FC<{ title: string; size: string }> = ({
  title,
  size,
}) => (
  <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary-200 hover:bg-white hover:shadow-md transition-all group/dl text-left">
    <div>
      <p className="text-sm font-black text-slate-700 group-hover/dl:text-primary-600 transition-colors">
        {title}
      </p>
      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
        PDF • {size}
      </p>
    </div>
    <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover/dl:text-primary-600 group-hover/dl:border-primary-100 transition-all shadow-sm">
      <i className="fa-solid fa-file-arrow-down"></i>
    </div>
  </button>
);

export default ExamDetailsPage;

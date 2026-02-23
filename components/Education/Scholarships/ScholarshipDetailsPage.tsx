import React, { useState, useEffect } from "react";
import {
  getScholarshipById,
  getAllScholarships,
} from "../../../lib/scholarships-data";

interface ScholarshipDetailsPageProps {
  id: string;
  onNavigate: (view: any, data?: any) => void;
}

const ScholarshipDetailsPage: React.FC<ScholarshipDetailsPageProps> = ({
  id,
  onNavigate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scholarship = getScholarshipById(id) || getAllScholarships()[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="bg-gray-50 min-h-screen font-sans antialiased pb-20 pt-20">
      {/* Redesigned Hero Section (Plain Background & Centered) */}
      <header className="relative bg-blue-600 text-white overflow-hidden min-h-[500px] flex items-center">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-20">
          <div className="flex flex-col items-center text-center mx-auto max-w-4xl space-y-8 animate-fadeInUp">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-500/50 border border-blue-400 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
              </span>
              Scholarship Open
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              {scholarship.title} for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400 uppercase">
                Deserving Students
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-blue-100 leading-relaxed">
              Unlock your academic potential with support from{" "}
              <span className="font-bold text-white">
                {scholarship.provider}
              </span>
              . Focus on your studies without worrying about{" "}
              {scholarship.covers.toLowerCase()} costs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 rounded-xl font-bold text-lg shadow-xl shadow-blue-900/20 transition-all duration-200 transform hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Apply for Scholarship{" "}
                  <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </span>
              </button>
              <a
                href="#eligibility"
                className="px-8 py-4 bg-blue-700/50 hover:bg-blue-700 border border-blue-400 text-white rounded-xl font-semibold text-lg backdrop-blur-sm transition-all duration-200 flex items-center justify-center gap-2"
              >
                <i className="fa-regular fa-circle-check"></i> Check Eligibility
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="pt-4 flex items-center justify-center gap-6 text-sm text-blue-100 border-t border-blue-500/30 w-full max-w-lg">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-blue-600 object-cover"
                    src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i + 15}`}
                    alt="Student"
                  />
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-blue-600 bg-blue-800 flex items-center justify-center text-xs font-bold text-white">
                  5k+
                </div>
              </div>
              <p>
                Join <span className="text-white font-bold">5,000+</span>{" "}
                students supported across the nation.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-jakarta">
        {/* Overview Section */}
        <section
          id="overview"
          className="grid md:grid-cols-12 gap-8 items-center pt-8"
        >
          <div className="md:col-span-7">
            <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3 uppercase tracking-tight">
              <span className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl shadow-sm">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              Scholarship Overview
            </h2>
            <div className="prose prose-lg text-slate-600 font-medium">
              <p className="mb-6 leading-relaxed">
                This prestigious program by{" "}
                <span className="text-primary-600 font-black">
                  {scholarship.provider}
                </span>{" "}
                is designed to support academically capable but financially
                disadvantaged students. The goal is to ensure that no talented
                student is deprived of education due to financial constraints.
              </p>
              <p className="leading-relaxed">
                The scholarship focuses on{" "}
                <span className="font-black text-blue-600 uppercase tracking-wide">
                  Equal Access to Education
                </span>
                , especially for students from remote, marginalized, and
                underprivileged communities pursuing{" "}
                <span className="text-slate-900 font-bold">
                  {scholarship.field}
                </span>{" "}
                at the{" "}
                <span className="text-slate-900 font-bold">
                  {scholarship.level}
                </span>{" "}
                level.
              </p>
            </div>
          </div>
          <div className="md:col-span-5 bg-blue-50 rounded-2xl p-10 border border-blue-100 shadow-inner relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full blur-2xl -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
            <h3 className="font-black text-gray-900 mb-6 text-lg uppercase tracking-widest">
              Key Highlights
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <i className="fa-solid fa-check-circle text-green-500 text-lg"></i>
                <span className="text-slate-700 font-bold">
                  Supports remote & marginalized students
                </span>
              </li>
              <li className="flex items-start gap-4">
                <i className="fa-solid fa-check-circle text-green-500 text-lg"></i>
                <span className="text-slate-700 font-bold">
                  Merit and Need-based selection
                </span>
              </li>
              <li className="flex items-start gap-4">
                <i className="fa-solid fa-check-circle text-green-500 text-lg"></i>
                <span className="text-slate-700 font-bold">
                  Award Value: {scholarship.amount}
                </span>
              </li>
              <li className="flex items-start gap-4">
                <i className="fa-solid fa-check-circle text-green-500 text-lg"></i>
                <span className="text-slate-700 font-bold">
                  Category: {scholarship.category}
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
              Scholarship Benefits
            </h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
              What selected students will receive
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <BenefitCard
              icon="fa-money-bill-wave"
              color="blue"
              title="100% Tuition Fee"
              desc="Full coverage of college/university tuition fees for the entire duration."
            />
            <BenefitCard
              icon="fa-bed"
              color="orange"
              title="Accommodation"
              desc="Free lodging facilities or monthly stipend for accommodation nearby."
            />
            <BenefitCard
              icon="fa-utensils"
              color="green"
              title="Daily Meals"
              desc="Nutritious meals provided daily or a food allowance included."
            />
            <BenefitCard
              icon="fa-book-open"
              color="purple"
              title="Study Materials"
              desc="Books, stationery, and exam fees fully covered by the program."
            />
            <BenefitCard
              icon="fa-user-tie"
              color="pink"
              title="Mentorship"
              desc="Regular guidance from industry experts and career counseling sessions."
            />
            <BenefitCard
              icon="fa-briefcase"
              color="teal"
              title="Skill Development"
              desc="Access to exclusive internships, workshops, and soft-skills training."
            />
          </div>
        </section>

        {/* Eligibility & Documents Grid */}
        <div className="grid md:grid-cols-2 gap-10" id="eligibility">
          {/* Eligibility */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 animate-fadeInUp">
            <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-4 uppercase tracking-tight">
              <i className="fa-solid fa-clipboard-check text-blue-600"></i>{" "}
              Eligibility Criteria
            </h2>
            <ul className="space-y-6">
              <EligibilityItem text="Be a permanent resident and citizen of the country." />
              <EligibilityItem
                text={`Have completed ${scholarship.level === "Bachelor" ? "SEE / +2" : "Undergraduate"} with high honors.`}
              />
              <EligibilityItem text="Come from a verified financially disadvantaged background." />
              <EligibilityItem text="Show strong academic potential (minimum GPA 3.2)." />
              <EligibilityItem text="Be willing to contribute back to the student community." />
            </ul>
          </div>

          {/* Documents */}
          <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-10 group">
            <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-4 uppercase tracking-tight">
              <i className="fa-solid fa-file-lines text-amber-500"></i> Required
              Documents
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <DocumentBadge
                icon="fa-certificate"
                label="Academic Transcripts"
              />
              <DocumentBadge icon="fa-id-card" label="Citizenship Copy" />
              <DocumentBadge icon="fa-image" label="Passport Photos" />
              <DocumentBadge
                icon="fa-file-invoice-dollar"
                label="Income Verification"
              />
              <div className="sm:col-span-2">
                <DocumentBadge
                  icon="fa-pen-nib"
                  label="Personal Statement / Motivation Letter"
                />
              </div>
            </div>
            <div className="mt-10 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm opacity-60 group-hover:opacity-100 transition-opacity">
              <p className="text-xs font-bold text-slate-500 leading-relaxed uppercase tracking-widest">
                <i className="fa-solid fa-circle-info mr-2 text-primary-500"></i>
                All documents must be scanned in high resolution (PDF/JPG) for
                the online portal.
              </p>
            </div>
          </div>
        </div>

        {/* Selection Process Timeline */}
        <section id="process" className="py-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
              Selection Process
            </h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
              Follow these steps to secure your funding
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto pl-10 space-y-12 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            <TimelineStep
              num="1"
              title="Online Application"
              desc="Complete the digital form and upload scanned copies of required documents via StudSphere ID."
            />
            <TimelineStep
              num="2"
              title="Document Verification"
              desc="Our academic board verifies the authenticity of your submitted academic and financial files."
            />
            <TimelineStep
              num="3"
              title="Written Exam (If Applicable)"
              desc="Depending on the course, you may sit for an aptitude test or subject-specific evaluation."
            />
            <TimelineStep
              num="4"
              title="Final Interview"
              desc="A personal interaction to assess your motivation, long-term goals, and background."
            />
            <TimelineStep
              num="5"
              title="Award Announcement"
              desc="Successful candidates are notified and official scholarship letters are issued."
              isLast
            />
          </div>
        </section>

        {/* Institutions & Important Dates */}
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-slate-900 rounded-2xl p-12 text-white relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 opacity-10 text-[10rem] -mr-12 -mt-12 transition-transform group-hover:scale-110 duration-700 pointer-events-none">
              <i className="fa-solid fa-building-columns"></i>
            </div>
            <h3 className="text-3xl font-black mb-6 relative z-10 uppercase tracking-tight">
              Available Institutions
            </h3>
            <p className="mb-8 text-slate-400 text-lg font-medium relative z-10">
              This grant is valid across our network of top-tier educational
              bodies in Nepal and abroad.
            </p>
            <ul className="space-y-4 mb-10 relative z-10">
              <li className="flex items-center gap-4 font-bold text-slate-200">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-primary-400 shadow-inner">
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </div>
                Government & Private Colleges
              </li>
              <li className="flex items-center gap-4 font-bold text-slate-200">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-primary-400 shadow-inner">
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </div>
                All Constituent Universities
              </li>
              <li className="flex items-center gap-4 font-bold text-slate-200">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-primary-400 shadow-inner">
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </div>
                Partner Training Centers
              </li>
            </ul>
            <button
              onClick={() => onNavigate("findCollege")}
              className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl active:scale-95 relative z-10"
            >
              View Partner Colleges
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12">
            <h3 className="text-3xl font-black text-gray-900 mb-10 uppercase tracking-tight flex items-center gap-4">
              <i className="fa-solid fa-calendar-days text-blue-600"></i>{" "}
              Important Dates
            </h3>
            <div className="space-y-6">
              <DateRow
                label="Application Opens"
                date="Jan 15, 2025"
                color="text-emerald-600"
                bg="bg-emerald-50"
              />
              <DateRow
                label="Deadline"
                date="Feb 28, 2025"
                color="text-rose-600"
                bg="bg-rose-50"
              />
              <DateRow
                label="Exam / Interview"
                date="March 10-15"
                color="text-slate-800"
                bg="bg-slate-50"
              />
              <DateRow
                label="Final Result"
                date="March 20, 2025"
                color="text-slate-800"
                bg="bg-slate-50"
                last
              />
            </div>
            <div className="mt-10 pt-8 border-t border-slate-50">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest text-center">
                Dates are subject to board approval.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Apply Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 animate-fadeIn">
          <div
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 animate-scaleIn">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                Start Application
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-300 hover:text-slate-900 p-2 transition-colors"
              >
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            <p className="text-slate-500 font-medium text-base mb-10 leading-relaxed">
              You are about to start your scholarship application for{" "}
              <span className="font-bold text-slate-900">Session 2025</span>.
              Please ensure you have your documents ready for high-speed upload.
            </p>
            <div className="space-y-4">
              <button className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary-500/20 transition-all active:scale-95">
                Continue with StudSphere ID
              </button>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-300">
                <div className="flex-1 h-px bg-slate-100"></div>
                or
                <div className="flex-1 h-px bg-slate-100"></div>
              </div>
              <button className="w-full py-4 bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4">
                <img
                  src="https://www.google.com/favicon.ico"
                  className="w-4 h-4"
                  alt="Google"
                />
                Continue with Google
              </button>
            </div>
            <p className="text-[10px] font-black text-center text-slate-400 mt-10 uppercase tracking-widest">
              By continuing, you agree to our{" "}
              <a href="#" className="underline">
                Terms & Conditions
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Internal Helper Components
const BenefitCard: React.FC<{
  icon: string;
  color: string;
  title: string;
  desc: string;
}> = ({ icon, color, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-primary-100 transition-all duration-500 group flex flex-col h-full">
    <div
      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-8 transition-all group-hover:scale-110 shadow-sm
      ${
        color === "blue"
          ? "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
          : color === "orange"
            ? "bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white"
            : color === "green"
              ? "bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white"
              : color === "purple"
                ? "bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white"
                : color === "pink"
                  ? "bg-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white"
                  : "bg-teal-100 text-teal-600 group-hover:bg-teal-600 group-hover:text-white"
      }`}
    >
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <h3 className="font-black text-slate-900 text-lg mb-3 uppercase tracking-tight">
      {title}
    </h3>
    <p className="text-slate-500 text-sm font-medium leading-relaxed">{desc}</p>
  </div>
);

const EligibilityItem: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-start gap-4 group">
    <div className="mt-1 w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] shrink-0 shadow-inner group-hover:bg-emerald-500 group-hover:text-white transition-all">
      <i className="fa-solid fa-check"></i>
    </div>
    <span className="text-slate-600 font-bold text-base group-hover:text-slate-900 transition-colors leading-relaxed">
      {text}
    </span>
  </li>
);

const DocumentBadge: React.FC<{ icon: string; label: string }> = ({
  icon,
  label,
}) => (
  <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 hover:border-primary-300 transition-all group cursor-default">
    <i
      className={`fa-solid ${icon} text-slate-300 group-hover:text-primary-600 text-xl transition-colors`}
    ></i>
    <span className="text-xs font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-900">
      {label}
    </span>
  </div>
);

const TimelineStep: React.FC<{
  num: string;
  title: string;
  desc: string;
  isLast?: boolean;
}> = ({ num, title, desc, isLast }) => (
  <div className="relative group">
    <div className="absolute -left-[43px] top-1 w-10 h-10 rounded-full bg-white border-4 border-primary-600 shadow-xl flex items-center justify-center font-black text-sm text-primary-600 z-10 transition-transform group-hover:scale-125">
      {num === "5" ? <i className="fa-solid fa-flag-checkered"></i> : num}
    </div>
    <div
      className={`bg-white p-8 rounded-2xl border border-slate-100 shadow-sm group-hover:shadow-xl transition-all duration-500 transform group-hover:translate-x-2 ${num === "5" ? "border-l-8 border-l-emerald-500" : "border-l-8 border-l-primary-600"}`}
    >
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
  date: string;
  color: string;
  bg: string;
  last?: boolean;
}> = ({ label, date, color, bg, last }) => (
  <div
    className={`flex items-center justify-between py-4 ${!last ? "border-b border-slate-50" : ""}`}
  >
    <span className="text-slate-500 font-black text-sm uppercase tracking-widest">
      {label}
    </span>
    <span
      className={`font-black text-sm uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm border ${bg} ${color} border-current opacity-80`}
    >
      {date}
    </span>
  </div>
);

export default ScholarshipDetailsPage;

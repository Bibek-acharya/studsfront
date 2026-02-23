import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiService, EducationCourse } from "../../../services/api";

interface CourseDetailsPageProps {
  id: number;
  onNavigate: (view: any) => void;
}

const CourseDetailsPage: React.FC<CourseDetailsPageProps> = ({
  id,
  onNavigate,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const defaultCourse: EducationCourse & { faculty: string } = {
    title: "Bachelor in Information Technology",
    shortTitle: "BIT",
    description:
      "Build a strong foundation in software development, networking, databases, and modern IT systems. A comprehensive program designed to prepare you for a successful global tech career.",
    id: String(id),
    colleges: 15,
    affiliation: "TU Affiliated",
    badges: ["Top Choice"],
    field: "IT / Computing",
    estFee: "NPR 6L - 10L",
    highlights: ["Internship", "Projects"],
    careerPath: "Software Engineer, Analyst",
    duration: "4 Years (8 Semesters)",
    level: "Bachelor",
    faculty: "Science / Management",
    location: "Available in Nepal",
    govtFee: "NPR 3,50,000",
    privateFee: "NPR 8,50,000 - 12,00,000",
  };

  const { data } = useQuery({
    queryKey: ["education-course", String(id)],
    queryFn: () => apiService.getEducationCourseById(String(id)),
  });

  const course = {
    ...defaultCourse,
    ...(data?.data || {}),
    faculty: defaultCourse.faculty,
  };

  const learningTopics = [
    {
      icon: "fa-code",
      title: "Programming",
      subtitle: "C, C++, Java, Python",
      color: "blue",
    },
    {
      icon: "fa-globe",
      title: "Web Development",
      subtitle: "HTML, CSS, JS, React",
      color: "emerald",
    },
    {
      icon: "fa-database",
      title: "Database Mgmt",
      subtitle: "SQL, NoSQL, Normalization",
      color: "indigo",
    },
    {
      icon: "fa-network-wired",
      title: "Networks & Security",
      subtitle: "Protocols, Cyber Security",
      color: "purple",
    },
    {
      icon: "fa-cloud",
      title: "Cloud & Tech",
      subtitle: "AWS, IoT, AI Basics",
      color: "orange",
    },
    {
      icon: "fa-microchip",
      title: "Software Eng",
      subtitle: "SDLC, Agile, Testing",
      color: "pink",
    },
  ];

  const courseStructure = [
    {
      title: "Semester 1–2",
      description:
        "Fundamentals of IT, Programming Basics, Mathematics, Communication Skills.",
    },
    {
      title: "Semester 3–4",
      description:
        "Object-Oriented Programming, Data Structures, DBMS, Web Technologies.",
    },
    {
      title: "Semester 5–6",
      description:
        "Software Engineering, Networking, Operating Systems, Electives.",
    },
    {
      title: "Semester 7–8",
      description: "Advanced Electives, Internship, Final Year Project.",
      isLast: true,
    },
  ];

  const universities = [
    { name: "Tribhuvan University", abbr: "TU" },
    { name: "Pokhara University", abbr: "PU" },
    { name: "Purbanchal University", abbr: "PPU" },
    { name: "Kathmandu University", abbr: "KU" },
  ];

  const eligibilityCriteria = [
    "Completed +2 (Science or Management)",
    "Minimum GPA as per university rules",
    "Mathematics preferred (varies by university)",
  ];

  const careerOptions = [
    "Software Developer",
    "Web Developer",
    "System Analyst",
    "Network Admin",
    "Database Admin",
    "Startup Founder",
  ];

  const faqs = [
    {
      question: "Is BIT good for the future?",
      answer:
        "Yes, IT is one of the fastest-growing fields with global demand. Graduates can explore careers internationally in various tech sectors.",
    },
    {
      question: "Can management students apply?",
      answer:
        "Yes, many universities accept management students, though some may require a minimum grade in specific subjects.",
    },
    {
      question: "Is internship compulsory?",
      answer:
        "Yes, most universities include a mandatory internship component in the final semesters to ensure students are job-ready.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-jakarta -mt-20">
      {/* Hero Section */}
      <header className="relative bg-white border-b border-slate-100 overflow-hidden pt-16 md:pt-20">
        <div className="absolute top-0 right-0 -mr-20 -mt-2 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-50 rounded-full blur-3xl opacity-50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">
              <span
                onClick={() => onNavigate("courseFinder")}
                className="hover:text-primary-600 cursor-pointer transition-colors"
              >
                Course Finder
              </span>
              <i className="fa-solid fa-chevron-right text-[8px]"></i>
              <span className="text-primary-600">Course Details</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-widest mb-8 border border-primary-100">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-600 animate-pulse"></span>
              Admissions Open for 2025
            </div>

            <h1 className="text-4xl lg:text-6xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
              Bachelor in{" "}
              <span className="bg-gradient-to-r from-primary-600 to-emerald-500 bg-clip-text text-transparent">
                {course.title}
              </span>{" "}
              ({course.shortTitle})
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed mb-10 font-medium max-w-2xl">
              {course.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-3 bg-primary-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20 transform hover:-translate-y-0.5 active:scale-95">
                Apply Now <i className="fa-solid fa-arrow-right"></i>
              </button>
              <button className="flex items-center gap-3 bg-white text-slate-700 border border-slate-200 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95">
                <i className="fa-solid fa-download"></i> Download Syllabus
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-16">
            {/* About Section */}
            <section id="overview" className="scroll-mt-24">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 text-lg">
                  <i className="fa-solid fa-book-open"></i>
                </div>
                About the Course
              </h2>
              <div className="space-y-4 text-slate-500 font-medium leading-relaxed text-lg">
                <p>
                  The Bachelor in Information Technology (BIT) program is
                  designed to develop skilled IT professionals with practical
                  and theoretical knowledge. The course focuses on programming,
                  system analysis, networking, databases, and emerging
                  technologies.
                </p>
                <p>
                  Students gain hands-on experience through projects, labs, and
                  internships, making them industry-ready after graduation. It
                  bridges the gap between traditional computer science theory
                  and modern practical application.
                </p>
              </div>
            </section>

            {/* Learning Topics Grid */}
            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tight">
                What You Will Learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {learningTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex items-start gap-5 group"
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-primary-600 group-hover:text-white flex items-center justify-center text-xl transition-all`}
                    >
                      <i className={`fa-solid ${topic.icon}`}></i>
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 text-lg mb-1">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">
                        {topic.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Structure Timeline */}
            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tight">
                Course Structure
              </h2>
              <div className="space-y-4 pl-4">
                {courseStructure.map((item, index) => (
                  <div key={index} className="flex group">
                    <div className="flex flex-col items-center mr-8">
                      <div
                        className={`w-4 h-4 ${item.isLast ? "bg-emerald-500" : "bg-primary-600"} rounded-full mt-2 ring-4 ring-white shadow-lg`}
                      ></div>
                      {!item.isLast && (
                        <div className="w-0.5 bg-slate-200 h-full my-2"></div>
                      )}
                    </div>
                    <div className={item.isLast ? "pb-2" : "pb-12"}>
                      <h3 className="text-xl font-black text-slate-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 font-medium leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Universities Card */}
            <section className="bg-primary-600 rounded-2xl p-10 md:p-12 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-black mb-8 tracking-tight leading-tight">
                  Universities Offering This Course
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {universities.map((uni, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all cursor-default"
                    >
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-black text-primary-600 text-sm">
                        {uni.abbr}
                      </div>
                      <span className="font-bold text-white text-sm">
                        {uni.name}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-10 text-center">
                  <button
                    onClick={() => onNavigate("findCollege")}
                    className="text-white font-black text-[10px] uppercase tracking-[0.2em] border-b-2 border-white/30 hover:border-white transition-all pb-1"
                  >
                    View All Colleges Offering BIT{" "}
                    <i className="fa-solid fa-arrow-right-long ml-2"></i>
                  </button>
                </div>
              </div>
            </section>

            {/* Eligibility & Careers */}
            <div className="grid md:grid-cols-2 gap-10">
              <section className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm">
                <h2 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-widest">
                  Eligibility
                </h2>
                <ul className="space-y-4">
                  {eligibilityCriteria.map((c, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <i className="fa-solid fa-circle-check text-emerald-500 text-lg mt-0.5"></i>
                      <span className="text-slate-500 font-bold text-sm leading-relaxed">
                        {c}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm">
                <h2 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-widest">
                  Careers
                </h2>
                <div className="flex flex-wrap gap-2">
                  {careerOptions.map((career, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-slate-50 text-slate-500 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-50 hover:text-primary-600 hover:border-primary-100 transition-all cursor-default"
                    >
                      {career}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            {/* Internship Banner */}
            <section className="bg-slate-900 text-white p-10 md:p-16 rounded-2xl relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/20 rounded-full blur-[100px] -mr-48 -mt-48"></div>
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-black mb-6 tracking-tight">
                    Internship & Practical Exposure
                  </h2>
                  <p className="text-slate-400 font-medium leading-relaxed mb-8">
                    Gain industry experience before you graduate through our
                    network of 200+ tech partners.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-primary-400">
                        <i className="fa-solid fa-briefcase"></i>
                      </div>
                      <span className="font-bold text-sm">
                        Mandatory Industrial Internship
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-primary-400">
                        <i className="fa-solid fa-users"></i>
                      </div>
                      <span className="font-bold text-sm">
                        Industry Led Workshops
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-400 mb-4">
                    Partner Spotlight
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-900 font-black">
                      TF
                    </div>
                    <div>
                      <p className="font-black text-lg">TechFlow Systems</p>
                      <p className="text-xs text-slate-500">
                        Official Internship Partner
                      </p>
                    </div>
                  </div>
                  <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">
                    View All Partners
                  </button>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-10 uppercase tracking-tight text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4 max-w-3xl mx-auto">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() =>
                        setOpenFaq(openFaq === index ? null : index)
                      }
                      className="w-full px-8 py-6 text-left flex justify-between items-center transition-colors hover:bg-slate-50"
                    >
                      <span className="font-black text-slate-800 text-sm uppercase tracking-widest">
                        {faq.question}
                      </span>
                      <i
                        className={`fa-solid fa-chevron-down text-slate-300 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`}
                      ></i>
                    </button>
                    {openFaq === index && (
                      <div className="px-8 pb-8 text-slate-500 font-medium leading-relaxed animate-fadeInDown">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column (Sidebar) */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-28 space-y-8">
              {/* Key Highlights Card */}
              <div className="bg-white rounded-2xl p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100">
                <h3 className="text-xl font-black text-slate-900 mb-10 uppercase tracking-widest border-b border-slate-50 pb-6">
                  Key Highlights
                </h3>
                <ul className="space-y-8">
                  <HighlightItem
                    icon="fa-clock"
                    color="blue"
                    label="Duration"
                    val={course.duration}
                  />
                  <HighlightItem
                    icon="fa-graduation-cap"
                    color="emerald"
                    label="Level"
                    val={course.level}
                  />
                  <HighlightItem
                    icon="fa-layer-group"
                    color="indigo"
                    label="Faculty"
                    val={course.faculty}
                  />
                  <HighlightItem
                    icon="fa-location-dot"
                    color="orange"
                    label="Location"
                    val={course.location}
                  />
                </ul>
                <div className="mt-12 space-y-4">
                  <button className="w-full py-5 bg-primary-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all active:scale-95">
                    Apply Now
                  </button>
                  <button className="w-full py-5 bg-white border-2 border-primary-600 text-primary-600 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-primary-50 transition-all active:scale-95">
                    Download Brochure
                  </button>
                </div>
              </div>

              {/* Fee Structure Card */}
              <div className="bg-slate-900 text-white rounded-2xl p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                <h3 className="text-xl font-black mb-8 uppercase tracking-widest">
                  Fee Structure
                </h3>
                <div className="space-y-8">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                      Government Colleges
                    </p>
                    <p className="text-2xl font-black text-primary-400">
                      {course.govtFee}
                    </p>
                  </div>
                  <div className="h-px bg-white/5"></div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                      Private Colleges
                    </p>
                    <p className="text-2xl font-black text-emerald-400">
                      {course.privateFee}
                    </p>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 font-bold uppercase mt-10 tracking-widest">
                  *Estimated total course fee. Varies by college.
                </p>
              </div>

              {/* Why Card */}
              <div className="bg-gradient-to-br from-primary-600 to-indigo-700 rounded-2xl p-10 text-white shadow-xl">
                <h3 className="text-xl font-black mb-8 uppercase tracking-widest">
                  Why Choose BIT?
                </h3>
                <ul className="space-y-4">
                  <BenefitRow text="High demand in job market" />
                  <BenefitRow text="Global career opportunities" />
                  <BenefitRow text="Tech enthusiast friendly" />
                  <BenefitRow text="Foundation for Masters" />
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

const HighlightItem: React.FC<{
  icon: string;
  color: string;
  label: string;
  val: string;
}> = ({ icon, color, label, val }) => (
  <li className="flex items-center gap-5">
    <div
      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl bg-slate-50 text-slate-400 shadow-inner shrink-0`}
    >
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-0.5">
        {label}
      </p>
      <p className="text-sm font-black text-slate-800 leading-tight">{val}</p>
    </div>
  </li>
);

const BenefitRow: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-center gap-3 text-sm font-bold">
    <i className="fa-solid fa-circle-check text-primary-300"></i>
    {text}
  </li>
);

export default CourseDetailsPage;

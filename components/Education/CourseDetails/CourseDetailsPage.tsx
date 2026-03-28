import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { apiService, EducationCourseDetails } from "../../../services/api";
import { 
  ArrowLeft, Clock, GraduationCap, Building, LayoutGrid, Info, 
  ClipboardCheck, UserPlus, BookOpen, Coins, Award, FileText, 
  Star, Trophy, ArrowRight, FileCheck2, Download, AlertCircle, 
  Briefcase, CheckCircle2, ChevronRight, Mail, Phone, ExternalLink
} from "lucide-react";

interface CourseDetailsPageProps {
  onNavigate: (view: any, data?: any) => void;
}

type TabKey = "overview" | "eligibility" | "admission" | "courses" | "fee" | "scholarships" | "model-questions";

const sectionIds: TabKey[] = [
  "overview", "eligibility", "admission", "courses", "fee", "scholarships", "model-questions"
];

const iconByCareer: Record<string, any> = {
  database: Briefcase,
  cpu: Briefcase,
  chart: Briefcase,
};

const bgByCareer: Record<string, string> = {
  blue: "bg-blue-100 text-blue-800",
  emerald: "bg-emerald-100 text-emerald-800",
  purple: "bg-purple-100 text-purple-800",
};

const CourseDetailsPage: React.FC<CourseDetailsPageProps> = ({ onNavigate }) => {
  const location = useLocation();
  const routeState = (location.state || {}) as { id?: string | number };
  const courseId = String(routeState.id || "1");

  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  const { data, isLoading } = useQuery({
    queryKey: ["education-course-details", courseId],
    queryFn: () => apiService.getEducationCourseDetailsById(courseId),
  });

  const details = data?.data as EducationCourseDetails | undefined;

  const tags = useMemo(() => {
    if (!details) return [];
    return [
      { icon: Clock, label: details.highlightsDuration || "-" },
      { icon: GraduationCap, label: details.degreeLabel || "-" },
      { icon: Building, label: details.mode || "On-Campus" },
    ];
  }, [details]);

  const handleTabClick = (tab: TabKey) => {
    setActiveTab(tab);
    const target = document.getElementById(tab);
    if (!target) return;
    const y = target.getBoundingClientRect().top + window.pageYOffset - 120;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => {
      let current: TabKey = "overview";
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        const offsetTop = element.offsetTop;
        if (window.scrollY >= offsetTop - 150) {
          current = id;
        }
      }
      setActiveTab(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isLoading || !details) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-500 font-semibold">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          Loading details...
        </div>
      </div>
    );
  }

  // Assuming API provides videoUrl inside 'course' or 'contact' object
  // If not, it falls back to undefined
  const videoUrl = (details as any).videoUrl || (details.course as any).videoUrl;

  return (
    <div className="bg-white text-gray-900 antialiased selection:bg-blue-100 selection:text-blue-900 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* Top Navigation */}
        <button
          onClick={() => onNavigate("courseFinder")}
          className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors mb-6 text-sm font-medium group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Programs
        </button>

        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
            {details.course.title}
          </h1>

          <div className="flex flex-wrap gap-3 mb-8">
            {tags.map((tag, idx) => {
              const Icon = tag.icon;
              return (
                <div key={idx} className="inline-flex items-center px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                  <Icon className="w-4 h-4 mr-2 text-gray-500" />
                  {tag.label}
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-sm transition-all focus:ring-4 focus:ring-blue-100 outline-none cursor-pointer">
              View Admissions
            </button>
            <button 
              onClick={() => onNavigate("universitiesPage", { courseId: details.course.id, courseTitle: details.course.title, collegesCount: details.offeringCollegesCount })}
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold flex items-center shadow-sm transition-all focus:ring-4 focus:ring-gray-100 outline-none cursor-pointer"
            >
              <LayoutGrid className="w-4 h-4 mr-2 text-gray-600" />
              Explore All Colleges
            </button>
          </div>
        </header>

        {/* Sticky Tab Navigation */}
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md relative mb-12 border-b border-gray-200">
          <nav className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] space-x-8 text-gray-500 font-medium whitespace-nowrap">
            {[
              { id: "overview", label: "Overview" },
              { id: "eligibility", label: "Eligibility" },
              { id: "admission", label: "Admission" },
              { id: "courses", label: "Courses" },
              { id: "fee", label: "Program Fee" },
              { id: "scholarships", label: "Scholarships" },
              { id: "model-questions", label: "Model Questions" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id as TabKey)}
                className={`pb-4 -mb-px transition-colors hover:text-gray-900 border-b-2 outline-none ${activeTab === tab.id ? 'text-gray-900 border-blue-600' : 'border-transparent'}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-2 min-h-[60vh] space-y-16">
            
            <section id="overview" className="scroll-mt-32">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Info className="w-6 h-6 mr-3 text-blue-600" />
                Overview
              </h2>

              {/* Dynamic Video */}
              {videoUrl && (
                <div className="mb-8 aspect-video rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-gray-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 z-0">Loading Video...</div>
                  <iframe 
                    src={videoUrl} 
                    title={`${details.course.title} Overview Video`} 
                    className="w-full h-full relative z-10" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen>
                  </iframe>
                </div>
              )}
              
              <div className="prose prose-lg text-gray-600 space-y-6 max-w-none">
                {details.about.map((para, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: para }}></p>
                ))}
              </div>
            </section>

            <section id="eligibility" className="scroll-mt-32">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <ClipboardCheck className="w-6 h-6 mr-3 text-blue-600" />
                Eligibility Criteria
              </h2>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
                <p className="text-gray-800 font-medium mb-2">Applicants must meet the following criteria to be eligible for {details.course.title}:</p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2 mt-4">
                  {details.admissionRequirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="admission" className="scroll-mt-32">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <UserPlus className="w-6 h-6 mr-3 text-blue-600" />
                Admission Process
              </h2>

              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 mb-8 text-gray-700 leading-relaxed">
                The admission process for this program typically opens around shortly after major board results are announced. Many colleges might have independent timelines. Check the currently open colleges via <span className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer underline underline-offset-2">Admissions Portal</span>.
              </div>

              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">1</div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">Application Form</h3>
                    <p className="text-gray-600 mt-2 leading-relaxed">Most institutions evaluate application profiles holistically. Find forms for your target institutions either primarily on their website or directly physically on-campus.</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">2</div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">Entrance Examination & Interview</h3>
                    <p className="text-gray-600 mt-2 leading-relaxed">If there are competitive entrance exams required to score passing merit to be admitted, detailed notices are generally published individually by colleges or standard examination boards.</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="courses" className="scroll-mt-32">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-3 text-blue-600" />
                Course Structure & Curriculums
              </h2>
              
              <p className="text-gray-600 mb-6">
                Explore the detailed breakdown of all semesters and subject curriculum for this program below.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {details.curriculum.map((semester, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="bg-blue-50 border-b border-gray-200 px-6 py-4">
                      <h4 className="font-bold text-blue-900">{semester.title}</h4>
                      {semester.subtitle && <p className="text-xs text-blue-700 mt-0.5">{semester.subtitle}</p>}
                    </div>
                    <ul className="divide-y divide-gray-100 text-gray-600 text-sm flex-1">
                      {semester.subjects.map((sub, i) => (
                        <li key={i} className="px-6 py-3.5 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span className="font-medium text-gray-800">{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Careers extracted dynamically */}
              {details.careerOpportunities && details.careerOpportunities.length > 0 && (
                <div className="mt-8 border-t border-gray-100 pt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-5 border-b pb-2">Career Opportunities focusing</h3>
                  <div className="flex flex-wrap gap-4">
                    {details.careerOpportunities.map((c, i) => (
                       <span key={i} className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 ${bgByCareer[c.color] || "bg-gray-100 text-gray-800"}`}>
                          <Briefcase className="w-4 h-4" />
                          {c.title}
                       </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            <section id="fee" className="scroll-mt-32">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Coins className="w-6 h-6 mr-3 text-blue-600" />
                Fee Structure
              </h2>
              <p className="text-gray-600 mb-6">Based on top affiliated colleges, here is a general estimated fee structure breakdown for standard programs. This depends entirely on individual college infrastructure.</p>
              
              <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-900">
                      <th className="py-4 px-6 font-semibold border-b border-gray-200">Particulars</th>
                      <th className="py-4 px-6 font-semibold border-b border-gray-200 text-right">Amount (NPR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-600">
                    <tr><td className="py-4 px-6">Admission Fees (One-time)</td><td className="py-4 px-6 text-right">~ 25,000+</td></tr>
                    <tr><td className="py-4 px-6">Course Tuition Fee (Semester Setup)</td><td className="py-4 px-6 text-right">~ 40,000 - 80,000+</td></tr>
                    <tr><td className="py-4 px-6">Laboratory & Practical (Annual)</td><td className="py-4 px-6 text-right">~ 10,000</td></tr>
                    <tr><td className="py-4 px-6">Library & Extra-curricular (Annual)</td><td className="py-4 px-6 text-right">~ 5,000</td></tr>
                    <tr className="bg-gray-50 font-bold text-gray-900">
                      <td className="py-4 px-6">Total Estimated First Year Fee</td>
                      <td className="py-4 px-6 text-right">100,000 - 250,000+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="scholarships" className="scroll-mt-32">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="w-6 h-6 mr-3 text-blue-600" />
                Scholarships & Financial Aid
              </h2>
              
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 mb-8">
                <p className="text-indigo-900 font-medium">
                  Many colleges provide scholarships based on <strong className="font-bold">board GPA exams</strong>, <strong className="font-bold">government quotas</strong>, <strong className="font-bold">extracurricular activities</strong>, and based on the <strong className="font-bold">college entrance examination</strong> scores.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h3 className="font-bold text-yellow-900 text-lg mb-2 flex items-center"><Star className="w-5 h-5 mr-2" /> Merit Scholarship</h3>
                  <p className="text-gray-700 text-sm">Students achieving exceptional grades continuously are highly likely to receive up to 100% waiver depending on college criteria.</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="font-bold text-blue-900 text-lg mb-2 flex items-center"><Trophy className="w-5 h-5 mr-2" /> Entrance Topper Award</h3>
                  <p className="text-gray-700 text-sm">Top performers in a specific college's entrance examination generally receive full or partial scholarships.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                <div className="mb-4 sm:mb-0 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-gray-900">Looking for Scholarships?</h3>
                  <p className="text-gray-600 text-sm mt-1">Here you can find the many scholarship programs available tailored to you.</p>
                </div>
                <button className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-100 whitespace-nowrap outline-none cursor-pointer">
                  Scholarship Finder
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </section>

            <section id="model-questions" className="scroll-mt-32">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-blue-600" />
                Model Questions
              </h2>
              <p className="text-gray-600 mb-6">Download sample exam papers and previous board exam model questions to help with your preparation.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="#" className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors group cursor-pointer transition-all duration-200">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileCheck2 className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Semester Exam Set 1</h3>
                    <p className="text-xs text-gray-500 mt-1">PDF • 2.4 MB</p>
                  </div>
                  <Download className="w-5 h-5 ml-auto text-gray-400 group-hover:text-blue-600" />
                </a>
                
                <a href="#" className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors group cursor-pointer transition-all duration-200">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileCheck2 className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Entrance Past Papers</h3>
                    <p className="text-xs text-gray-500 mt-1">PDF • 5.1 MB</p>
                  </div>
                  <Download className="w-5 h-5 ml-auto text-gray-400 group-hover:text-blue-600" />
                </a>
              </div>
            </section>
          </div>

          {/* Right Column: Interactive Sidebar (Dynamic Highlights + Ads) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              
              {/* Dynamic Highlights & Contact */}
              <div className="border border-gray-200 shadow-sm bg-white rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Key Highlights</h3>
                <div className="space-y-5 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Duration</p>
                      <p className="text-sm font-semibold text-gray-900">{details.highlightsDuration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Degree Level</p>
                      <p className="text-sm font-semibold text-gray-900">{details.highlightsDegreeLevel}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center shrink-0">
                      <Building className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Faculty</p>
                      <p className="text-sm font-semibold text-gray-900">{details.highlightsFaculty}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-sm font-bold text-gray-900 mb-4">Support</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <p className="text-sm text-gray-700 font-medium">{details.contact.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <p className="text-sm text-gray-700 font-medium">{details.contact.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Static Prototype Ad Banners */}
              <a href="#" className="block relative w-full h-32 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-200 transition-all group">
                <div className="absolute right-[-20%] top-[-50%] w-64 h-64 bg-red-600 rounded-full group-hover:scale-105 transition-transform duration-500"></div>
                <div className="relative z-10 h-full flex flex-col justify-center p-5 w-2/3">
                  <h3 className="font-black text-2xl text-red-700 leading-none tracking-tighter italic">NCMT<br/><span className="text-gray-800 text-sm tracking-widest not-italic">COLLEGE</span></h3>
                  <p className="text-[10px] text-red-600 font-bold mt-2 leading-tight">Affiliated to<br/>Lincoln University College</p>
                </div>
              </a>

              <a href="#" className="block relative w-full h-32 bg-slate-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-200 transition-all flex flex-col items-center justify-center p-4">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)", backgroundSize: "10px 10px" }}></div>
                <div className="relative z-10 text-center">
                  <div className="flex justify-center mb-1">
                    <div className="relative flex items-center justify-center">
                      <span className="text-blue-800 font-black text-4xl">M</span>
                      <span className="absolute text-red-700 font-black text-4xl ml-2 opacity-80 mix-blend-multiply">M</span>
                    </div>
                  </div>
                  <p className="text-[9px] text-gray-400 font-bold tracking-widest">1990</p>
                  <h4 className="font-serif text-red-800 font-bold text-[11px] tracking-widest mt-1 uppercase">The New Summit</h4>
                  <p className="text-blue-800 text-[10px] font-semibold tracking-wider">SECONDARY SCHOOL</p>
                </div>
              </a>

              <a href="#" className="block relative w-full h-32 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-200 transition-all flex group">
                <div className="w-[45%] p-3 flex flex-col justify-center z-10 bg-white">
                  <div className="flex items-start gap-1 mb-2">
                    <GraduationCap className="w-4 h-4 text-yellow-500 shrink-0" />
                    <span className="text-[8px] font-bold text-gray-600 leading-tight">Bagmati University<br/><span className="text-[7px]">JANAMAITRI CAMPUS</span></span>
                  </div>
                  <h4 className="font-bold text-blue-900 text-xs">Entrance Date:</h4>
                  <p className="font-black text-blue-900 text-lg leading-tight">14th MARCH</p>
                </div>
                <div className="w-[55%] bg-[#3b82f6] relative flex flex-col justify-center items-center overflow-hidden">
                  <div className="absolute inset-0 bg-[#4ade80]" style={{ clipPath: "ellipse(150% 100% at 100% 50%)" }}></div>
                  <div className="absolute left-0 top-[-20%] bottom-[-20%] w-8 bg-blue-900" style={{ borderRadius: "0 50% 50% 0 / 0 50% 50% 0", transform: "scaleY(1.2)" }}></div>
                  <div className="relative z-10 text-center pl-4 group-hover:scale-105 transition-transform">
                    <span className="bg-yellow-400 text-blue-900 text-[10px] font-black px-2 py-0.5 rounded shadow-sm">ADMISSION OPEN</span>
                    <h3 className="text-white font-black text-3xl mt-1 tracking-tighter" style={{ textShadow: "2px 2px 0 #1e3a8a, -1px -1px 0 #1e3a8a, 1px -1px 0 #1e3a8a, -1px 1px 0 #1e3a8a, 1px 1px 0 #1e3a8a" }}>LL.B</h3>
                    <p className="text-white font-bold text-sm mt-0.5" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>3 Years</p>
                  </div>
                </div>
              </a>

              <a href="#" className="block relative w-full h-32 bg-[#111] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex group">
                <div className="w-[55%] p-4 flex flex-col justify-center z-10">
                  <h3 className="font-bold text-yellow-500 text-xl leading-none mb-1">Bachelors</h3>
                  <p className="text-yellow-100 text-sm leading-tight mb-3">Admission<br/>Portal</p>
                  <span className="bg-yellow-500 text-black text-[10px] font-bold px-3 py-1.5 rounded-sm w-max inline-block hover:bg-yellow-400 transition-colors">Apply Now</span>
                </div>
                <div className="w-[45%] bg-yellow-500 relative" style={{ clipPath: "polygon(25% 0, 100% 0, 100% 100%, 0% 100%)" }}>
                  <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=300&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 mix-blend-multiply group-hover:scale-110 group-hover:opacity-80 transition-all duration-500" alt="Graduation" />
                </div>
              </a>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;

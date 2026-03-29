import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { apiService } from "../../../services/api";
import { 
  BadgeCheck, MapPin, Star, ArrowUpRight, Building2, Download, Share2, 
  Play, MessageSquareQuote, Video, Eye, Target, Gem, Landmark, Users, 
  Layers, Globe2, Award, Info, PhoneCall, Mail, Phone, Globe, ChevronDown,
  Cpu, Stethoscope, TreePine, BookOpen, Briefcase, Scale, Heart, FileDown, Book, GraduationCap, ScrollText, HelpCircle, ChevronRight, Clock, Newspaper, Scroll, Image as ImageIcon
} from "lucide-react";

interface UniversityDetailsPageProps {
  id?: number;
  onNavigate: (view: any, data?: any) => void;
}

type TabKey =
  | "about"
  | "courses"
  | "institutes"
  | "admissions"
  | "offered"
  | "scholarship"
  | "events"
  | "news"
  | "download"
  | "gallery"
  | "review";

type LevelFilter = "all" | "+2" | "Bachelor" | "Master";

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "about", label: "About" },
  { key: "courses", label: "Courses & Fees" },
  { key: "institutes", label: "Institute / Faculties" },
  { key: "admissions", label: "Admissions" },
  { key: "offered", label: "Offered Program" },
  { key: "scholarship", label: "Scholarship" },
  { key: "events", label: "Events" },
  { key: "news", label: "News & Notices" },
  { key: "download", label: "Download" },
  { key: "gallery", label: "Gallery" },
  { key: "review", label: "Review" },
];

const UniversityDetailsPage: React.FC<UniversityDetailsPageProps> = ({ id, onNavigate }) => {
  const location = useLocation();
  const routeId = Number((location.state as { id?: number | string } | null)?.id);
  const resolvedId = Number.isFinite(routeId) && routeId > 0 ? routeId : id;

  const [activeTab, setActiveTab] = useState<TabKey>("about");
  const [coursesFilter, setCoursesFilter] = useState<LevelFilter>("all");
  const [programFilter, setProgramFilter] = useState<LevelFilter>("all");
  const [scholarshipFilter, setScholarshipFilter] = useState<LevelFilter>("all");
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

  const { data, isLoading, isError } = useQuery({
    queryKey: ["university-details", resolvedId],
    queryFn: () => apiService.getUniversityById(resolvedId as number),
    enabled: !!resolvedId,
  });

  const university = data?.data?.university;
  const affiliatedColleges = data?.data?.colleges || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [resolvedId, activeTab]);

  const initials = useMemo(() => {
    const name = university?.name || "University";
    return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  }, [university?.name]);

  const website = university?.website || "WWW.Studsphere.Com";
  const websiteHref = website.startsWith("http") ? website : `https://${website}`;

  // Data Parsers
  const parsedAbout = useMemo(() => {
    try {
      if (typeof university?.about === 'string') return JSON.parse(university.about);
      return university?.about || {};
    } catch { return {}; }
  }, [university?.about]);

  const parsedCourses = useMemo(() => {
    try {
      const c = typeof university?.courses === 'string' ? JSON.parse(university.courses) : university?.courses || [];
      return Array.isArray(c) ? c : [];
    } catch { return []; }
  }, [university?.courses]);

  const parsedScholarships = useMemo(() => {
    try {
      const s = typeof university?.scholarships === 'string' ? JSON.parse(university.scholarships) : university?.scholarships || [];
      return Array.isArray(s) ? s : [];
    } catch { return []; }
  }, [university?.scholarships]);

  const parsedOfferedPrograms = useMemo(() => {
    try {
      const p = typeof university?.programs === 'string' ? JSON.parse(university.programs) : university?.programs || [];
      return Array.isArray(p) ? p : [];
    } catch { return []; }
  }, [university?.programs]);

  const parsedEvents = useMemo(() => {
    try {
      const eVs = typeof university?.events === 'string' ? JSON.parse(university.events) : university?.events || [];
      return Array.isArray(eVs) ? eVs.map((e: any) => ({
        day: e.date?.split('-')[2] || "01",
        month: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][parseInt(e.date?.split('-')[1] || "1") - 1] || "JAN",
        title: e.heading,
        time: e.time || "All Day",
        body: e.desc || `Type: ${e.type} | Venue: ${e.venue}`
      })) : [];
    } catch { return []; }
  }, [university?.events]);

  const parsedNews = useMemo(() => {
    try {
      const nWs = typeof university?.news === 'string' ? JSON.parse(university.news) : university?.news || [];
      return Array.isArray(nWs) ? nWs.map((n: any, idx: number) => ({
        id: `news-${idx}`,
        tag: n.type || "News",
        tagClass: n.type === "Notice" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600",
        image: n.image || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80",
        title: n.heading,
        excerpt: n.excerpt || n.desc || "",
        body: n.body || n.desc || "",
        tags: [n.type, "University News"].filter(Boolean),
        time: n.date || "Recently"
      })) : [];
    } catch { return []; }
  }, [university?.news]);

  const parsedDownloads = useMemo(() => {
    try {
      const d = typeof university?.downloads === 'string' ? JSON.parse(university.downloads) : university?.downloads || [];
      return Array.isArray(d) ? d : [];
    } catch { return []; }
  }, [university?.downloads]);

  const parsedGallery = useMemo(() => {
    try {
      const g = typeof university?.gallery === 'string' ? JSON.parse(university.gallery) : university?.gallery || [];
      return Array.isArray(g) ? g : [];
    } catch { return []; }
  }, [university?.gallery]);

  const parsedFaculties = useMemo(() => {
    try {
      const f = typeof university?.faculties === 'string' ? JSON.parse(university.faculties) : university?.faculties || [];
      return Array.isArray(f) ? f : [];
    } catch { return []; }
  }, [university?.faculties]);

  const parsedReviews = useMemo(() => {
    try {
      const r = typeof university?.reviews === 'string' ? JSON.parse(university.reviews) : university?.reviews || [];
      return Array.isArray(r) ? r : [];
    } catch { return []; }
  }, [university?.reviews]);

  const parsedAdmissions = useMemo(() => {
    try {
      const a = typeof university?.admissions === 'string' ? JSON.parse(university.admissions) : university?.admissions || [];
      return Array.isArray(a) ? a : [];
    } catch { return []; }
  }, [university?.admissions]);

  const parsedQuick = useMemo(() => {
    try {
      return typeof university?.quick === 'string' ? JSON.parse(university.quick) : university?.quick || {};
    } catch { return {}; }
  }, [university?.quick]);

  const parsedOverview = useMemo(() => {
    try {
      return typeof university?.overview === 'string' ? JSON.parse(university.overview) : university?.overview || [];
    } catch { return []; }
  }, [university?.overview]);

  const parsedContact = useMemo(() => {
    try {
      return typeof university?.contact === 'string' ? JSON.parse(university.contact) : university?.contact || {};
    } catch { return {}; }
  }, [university?.contact]);

  const parsedLeadership = useMemo(() => {
    try {
      return typeof university?.leadership === 'string' ? JSON.parse(university.leadership) : university?.leadership || [];
    } catch { return []; }
  }, [university?.leadership]);

  const toggleDropdown = (key: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!resolvedId) return <StatusState text="University not selected." tone="default" />;
  if (isLoading) return <StatusState text="Loading university details..." tone="default" />;
  if (isError || !university) return <StatusState text="Failed to load university details." tone="error" />;

  return (
    <div className="w-full bg-white min-h-screen font-['Inter',sans-serif]">
      {/* Main Container */}
      <div className="w-full overflow-hidden">
        
        {/* Hero Section / Banner Area */}
        <div className={`relative w-full h-64 md:h-80 lg:h-96 ${!university.cover ? 'bg-[#1a65f5]' : ''}`}>
          {university.cover && (
            <img 
              src={university.cover} 
              alt={university.name} 
              className="w-full h-full object-cover" 
            />
          )}

          {/* Info Tooltip Icon */}
          <div className="absolute top-3 right-3 md:top-4 md:right-4 z-30 group">
            <div className="cursor-help bg-black/30 group-hover:bg-black/50 text-white/90 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold transition-colors">
              <Info className="w-4 h-4" />
            </div>
            {/* Tooltip Content */}
            <div className="absolute hidden group-hover:block right-0 top-6 pt-2 w-64 md:w-72 z-40">
              <div className="p-3 bg-gray-900 text-white text-xs leading-relaxed rounded-lg shadow-xl border border-gray-700">
                Note: All information and images on this page are sourced from the respective university’s official website and public references. If you find any errors or outdated details, please <button onClick={() => alert("Report Feature Coming Soon")} className="text-blue-400 hover:text-blue-300 underline whitespace-nowrap">Report here</button>.
              </div>
            </div>
          </div>

          {/* Image Attribution */}
          <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 bg-black/40 px-2 py-1 rounded text-white/80 text-[10px] tracking-wide z-10">
            Image Courtesy: Official University Website
          </div>
        </div>

        {/* Profile Content Section */}
        <div className="px-6 md:px-12 lg:px-24 xl:px-32 pb-8 relative flex flex-col md:flex-row">
            
          {/* Logo Box */}
          <div className="absolute left-6 md:left-12 lg:left-24 xl:left-32 -top-16 md:-top-20 border-4 border-white rounded-lg bg-[#1a65f5] w-32 h-32 md:w-40 md:h-40 flex items-center justify-center shadow-sm z-10 overflow-hidden">
            {university.logo ? (
              <img src={university.logo} alt={university.name} className="w-full h-full object-contain p-2 bg-white" />
            ) : (
              <span className="text-white text-5xl md:text-6xl font-medium tracking-wide">{initials}</span>
            )}
          </div>

          {/* Spacer for Absolute Logo (Desktop only) */}
          <div className="w-32 md:w-40 flex-shrink-0 mr-8 hidden md:block" />

          {/* Main Info and Actions */}
          <div className="pt-20 md:pt-6 flex-1 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-0">
                
            {/* Text Information */}
            <div className="flex flex-col gap-2">
                    
              {/* Title Row */}
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">{university.name}</h1>
                <BadgeCheck className="w-6 h-6 text-[#1a65f5]" />
              </div>

              {/* Location Row */}
              <div className="flex items-center gap-1.5 text-gray-500 font-medium text-sm md:text-base">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{university.location}</span>
              </div>

              {/* Ratings and Link Row */}
              <div className="flex flex-wrap items-center gap-4 mt-1 text-sm md:text-base">
                {/* Rating */}
                <div className="flex items-center gap-1.5 font-bold">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="text-gray-900">{Number(university.rating || 0).toFixed(1)}</span>
                  <span className="text-gray-500 font-medium">(6012 Reviews)</span>
                </div>
                        
                {/* Website Link */}
                <a 
                  href={websiteHref} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1 font-semibold text-[#1a65f5] hover:underline uppercase text-sm"
                >
                  {website}
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <button 
                onClick={() => setActiveTab("institutes")}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#1a65f5] hover:bg-[#1554d4] text-white px-5 py-2.5 rounded-lg font-medium transition-colors duration-200 shadow-sm"
              >
                <Building2 className="w-5 h-5" />
                View Affiliated Colleges
              </button>

              <button 
                onClick={() => {
                  const doc = parsedDownloads.find(d => d.name?.toLowerCase().includes('prospectus') || d.title?.toLowerCase().includes('prospectus')) || parsedDownloads[0];
                  if (doc?.file) window.open(doc.file, '_blank');
                  else alert("Prospectus not available.");
                }}
                className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-lg font-medium transition-colors duration-200 shadow-sm"
              >
                <Download className="w-5 h-5 text-gray-500" />
                Prospectus
              </button>

              <button className="flex items-center justify-center bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 p-2.5 rounded-lg transition-colors duration-200 shadow-sm" aria-label="Share">
                <Share2 className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-t border-b border-gray-100 px-6 md:px-12 lg:px-24 xl:px-32 overflow-x-auto no-scrollbar bg-white sticky top-0 z-40 shadow-sm shadow-gray-100/50">
        <nav className="flex space-x-8 whitespace-nowrap">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`border-b-2 py-4 text-[15px] transition-colors ${
                activeTab === tab.key ? "border-blue-600 text-gray-900 font-bold" : "border-transparent text-gray-500 hover:text-gray-900 font-semibold"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="px-6 md:px-12 lg:px-24 xl:px-32 py-8 md:py-12 bg-[#fafbfc]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-14">
          <div className="lg:col-span-2">
            
            {/* About Tab */}
            {activeTab === "about" && (
              <div className="space-y-10">
                {/* Media Intro */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8">
                  <div className="relative w-full h-[240px] md:h-[300px] rounded-[24px] overflow-hidden group cursor-pointer shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop" 
                      alt="University Message" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center z-10">
                      <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center pl-1 shadow-[0_8px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-7 h-7 text-blue-600 fill-blue-600" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/30 to-transparent flex flex-col justify-end p-6 md:p-8 z-20">
                      <h3 className="font-bold text-white text-[19px] md:text-[21px] mb-1.5 flex items-center gap-2.5">
                        <MessageSquareQuote className="w-5 h-5 text-blue-400" /> VC's Message
                      </h3>
                      <p className="text-[14px] text-gray-200 line-clamp-1">Listen to our Vice-Chancellor's welcome</p>
                    </div>
                  </div>
                  <div className="relative w-full h-[240px] md:h-[300px] rounded-[24px] overflow-hidden group cursor-pointer shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop" 
                      alt="Campus Tour" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center z-10">
                      <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center pl-1 shadow-[0_8px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-7 h-7 text-blue-600 fill-blue-600" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/30 to-transparent flex flex-col justify-end p-6 md:p-8 z-20">
                      <h3 className="font-bold text-white text-[19px] md:text-[21px] mb-1.5 flex items-center gap-2.5">
                        <Video className="w-5 h-5 text-blue-400" /> Campus Tour
                      </h3>
                      <p className="text-[14px] text-gray-200 line-clamp-1">Explore our beautiful university campus</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="prose prose-slate max-w-none text-gray-600 text-[15px] md:text-[16px] leading-[1.8]">
                  {parsedAbout.desc ? (
                    <div dangerouslySetInnerHTML={{ __html: parsedAbout.desc }} />
                  ) : (
                    <div className="space-y-4">
                      <p className="text-lg font-medium text-gray-800">Welcome to {university.name}.</p>
                      <p>{university.description || "No description provided."}</p>
                    </div>
                  )}
                </div>

                {/* Vision, Mission, Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#f4f7fb] p-8 rounded-[20px]">
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100/80 flex items-center justify-center text-blue-600"><Eye className="w-5 h-5" /></div>
                      <h3 className="font-bold text-gray-900 text-[16px]">Our Vision</h3>
                    </div>
                    <p className="text-[14.5px] text-gray-600 leading-[1.7]">{parsedAbout.vision || "To be a leading center of higher learning globally recognized for excellence."}</p>
                  </div>
                  <div className="bg-[#f0fdf4] p-8 rounded-[20px]">
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="w-10 h-10 rounded-full bg-green-100/80 flex items-center justify-center text-green-600"><Target className="w-5 h-5" /></div>
                      <h3 className="font-bold text-gray-900 text-[16px]">Our Mission</h3>
                    </div>
                    <p className="text-[14.5px] text-gray-600 leading-[1.7]">{parsedAbout.mission || "To provide affordable, quality higher education that empowers individuals."}</p>
                  </div>
                  <div className="bg-[#fef2f2] p-8 rounded-[20px]">
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500"><Gem className="w-5 h-5" /></div>
                      <h3 className="font-bold text-gray-900 text-[16px]">Core Values</h3>
                    </div>
                    <p className="text-[14.5px] text-gray-600 leading-[1.7]">{parsedAbout.values || "Excellence, Inclusivity, Integrity, Innovation, and Social Responsibility."}</p>
                  </div>
                </div>

                {/* Overview Table */}
                <div className="bg-white border border-gray-100 rounded-[20px] shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 bg-[#f8fafc]">
                    <h3 className="text-[16px] font-bold text-gray-900 flex items-center gap-2"><Landmark className="w-5 h-5 text-blue-600" /> University Overview</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {parsedOverview.length > 0 ? parsedOverview.map((item: any, idx: number) => (
                      <div key={idx} className="flex flex-col sm:flex-row p-4 hover:bg-gray-50 transition-colors">
                        <div className="w-full sm:w-1/3 font-semibold text-gray-800 text-[14px]">{item.label}</div>
                        <div className="w-full sm:w-2/3 text-gray-600 text-[14px]">{item.value}</div>
                      </div>
                    )) : (
                      <>
                        <div className="flex flex-col sm:flex-row p-4 hover:bg-gray-50 transition-colors"><div className="w-full sm:w-1/3 font-semibold text-gray-800 text-[14px]">Location</div><div className="w-full sm:w-2/3 text-gray-600 text-[14px]">{university.location}</div></div>
                        <div className="flex flex-col sm:flex-row p-4 hover:bg-gray-50 transition-colors"><div className="w-full sm:w-1/3 font-semibold text-gray-800 text-[14px]">Type</div><div className="w-full sm:w-2/3 text-gray-600 text-[14px]">Public / Non-profit</div></div>
                      </>
                    )}
                  </div>
                </div>

                {/* Leadership Table */}
                <div className="bg-white border border-gray-100 rounded-[20px] shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 bg-[#f8fafc]">
                    <h3 className="text-[16px] font-bold text-gray-900 flex items-center gap-2"><Users className="w-5 h-5 text-blue-600" /> Leadership & Administration</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[14px] text-gray-600">
                      <thead className="bg-gray-50/50 text-[13px] text-gray-800 uppercase tracking-wider border-b border-gray-100">
                        <tr>
                          <th className="px-6 py-4 font-bold">Position</th>
                          <th className="px-6 py-4 font-bold">Role</th>
                          <th className="px-6 py-4 font-bold">Current Holder</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {parsedLeadership.length > 0 ? parsedLeadership.map((lead: any, idx: number) => (
                          <tr key={idx}>
                            <td className="px-6 py-4 font-bold text-gray-900">{lead.position}</td>
                            <td className="px-6 py-4">{lead.role}</td>
                            <td className="px-6 py-4 font-semibold">{lead.holder}</td>
                          </tr>
                        )) : (
                          <tr><td colSpan={3} className="px-6 py-4 text-center">No leadership data available.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Structure & Innovations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0"><Layers className="w-5 h-5 text-blue-600" /></div>
                    <div><h4 className="text-[15px] font-bold text-gray-900">Academic Excellence</h4><p className="text-[14px] text-gray-600 mt-1">Dedicated to providing world-class education and research opportunities.</p></div>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0"><Globe2 className="w-5 h-5 text-emerald-600" /></div>
                    <div><h4 className="text-[15px] font-bold text-gray-900">Global Connectivity</h4><p className="text-[14px] text-gray-600 mt-1">Partnerships with leading international universities and organizations.</p></div>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0"><Award className="w-5 h-5 text-amber-600" /></div>
                  <div><h4 className="text-[15px] font-bold text-gray-900">Accreditations</h4><p className="text-[14px] text-gray-600 mt-1">Fully accredited and recognized as a center of higher learning excellence.</p></div>
                </div>
              </div>
            )}

            {/* Courses Tab */}
            {activeTab === "courses" && (
              <div className="border border-gray-100 bg-white rounded-[20px] overflow-hidden shadow-sm">
                <div className="bg-[#f4f8fc] px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-blue-600 text-[14px] font-semibold tracking-wide">Courses & fees – filter by level</p>
                  <div className="flex gap-2 text-xs font-medium">
                    {["all", "Bachelor", "Master"].map((level) => (
                      <button
                        key={level}
                        onClick={() => setCoursesFilter(level as LevelFilter)}
                        className={`px-4 py-1.5 rounded-full transition-all ${
                          coursesFilter === level
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[700px]">
                    <div className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-gray-100 bg-white items-center">
                      <div className="col-span-4 text-[13px] font-bold text-gray-800 uppercase tracking-wider">COURSE NAME</div>
                      <div className="col-span-2 text-[13px] font-bold text-gray-800 uppercase tracking-wider">DURATION</div>
                      <div className="col-span-3 text-[13px] font-bold text-gray-800 uppercase tracking-wider">FEES / YEAR</div>
                      <div className="col-span-3 text-[13px] font-bold text-gray-800 uppercase tracking-wider">ELIGIBILITY</div>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {parsedCourses.filter(c => coursesFilter === 'all' || c.level === coursesFilter).map((course, idx) => (
                        <div key={idx} className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-gray-50/50 transition-colors items-center">
                          <div className="col-span-4 pr-4">
                            <h4 className="font-bold text-gray-900 text-[15.5px]">{course.title}</h4>
                            <p className="text-[12px] text-gray-500 mt-1">{course.subtitle || "Academic Program"}</p>
                          </div>
                          <div className="col-span-2">
                            <h4 className="font-bold text-gray-900 text-[15.5px]">{course.duration}</h4>
                            <p className="text-[12px] text-gray-500 mt-1">Full Time</p>
                          </div>
                          <div className="col-span-3">
                            <h4 className="font-bold text-[#2563eb] text-[15.5px]">{course.fee}</h4>
                            <p className="text-[12px] text-gray-500 mt-1">/ Year</p>
                          </div>
                          <div className="col-span-3">
                            <p className="text-[12.5px] text-gray-600 mb-2 font-medium">{course.eligibility || "Standard Criteria"}</p>
                            <span className="inline-block bg-[#eafaef] text-[#16a34a] text-[11px] font-bold px-2.5 py-1 rounded">Available</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Institutes Tab */}
            {activeTab === "institutes" && (
              <div className="space-y-10">
                <div>
                  <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0"><Building2 className="w-5 h-5 text-blue-600" /></div>
                    <div><h3 className="text-[18px] font-bold text-gray-900">Institutes & Faculties</h3><p className="text-[13px] text-gray-500 mt-0.5">Constituent campus and departments</p></div>
                  </div>
                  <div className="grid grid-cols-1 gap-5">
                    {parsedFaculties.length > 0 ? parsedFaculties.map((f: any, idx: number) => (
                      <div key={idx} className="bg-white p-5 rounded-[16px] border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleDropdown(f.title)}>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                              {idx % 2 === 0 ? <Cpu className="w-5 h-5 text-blue-600" /> : <Stethoscope className="w-5 h-5 text-blue-600" />}
                            </div>
                            <h4 className="text-[16px] font-bold text-gray-900">{f.title}</h4>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openDropdowns[f.title] ? 'rotate-180' : ''}`} />
                        </div>
                        {openDropdowns[f.title] && (
                          <div className="mt-6">
                            <table className="w-full text-[13px] border-collapse">
                              <thead>
                                <tr className="bg-gray-50/50">
                                  <th className="p-2 border-b text-left font-bold text-gray-800">SN</th>
                                  <th className="p-2 border-b text-left font-bold text-gray-800">Program / Department</th>
                                  <th className="p-2 border-b text-left font-bold text-gray-800">Level</th>
                                </tr>
                              </thead>
                              <tbody>
                                {f.items?.map((item: string, i: number) => (
                                  <tr key={i}>
                                    <td className="p-2 border-b text-gray-600">{i + 1}</td>
                                    <td className="p-2 border-b text-gray-700 font-medium">{item}</td>
                                    <td className="p-2 border-b text-gray-600">Standard</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )) : (
                      <div className="py-10 text-center bg-white border border-dashed rounded-2xl text-gray-400">No faculty data available.</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Offered Tab */}
            {activeTab === "offered" && (
              <div className="border border-gray-100 rounded-[20px] overflow-hidden shadow-sm bg-white">
                <div className="bg-[#f4f8fc] px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-blue-600 text-[14px] font-semibold tracking-wide">Programs offered – filter by level</p>
                  <div className="flex gap-2 text-xs font-medium">
                    {["all", "+2", "Bachelor", "Master"].map((level) => (
                      <button
                        key={level}
                        onClick={() => setProgramFilter(level as LevelFilter)}
                        className={`px-4 py-1.5 rounded-full transition-all ${
                          programFilter === level
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[700px]">
                    <div className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-gray-100 bg-white items-center">
                      <div className="col-span-4 text-[13px] font-bold text-gray-800 uppercase tracking-wider">PROGRAM NAME</div>
                      <div className="col-span-2 text-[13px] font-bold text-gray-800 uppercase tracking-wider">LEVEL</div>
                      <div className="col-span-3 text-[13px] font-bold text-gray-800 uppercase tracking-wider">STATUS</div>
                      <div className="col-span-3 text-[13px] font-bold text-gray-800 uppercase tracking-wider">ACTION</div>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {parsedOfferedPrograms.filter(p => programFilter === 'all' || p.level === programFilter).map((prog, idx) => (
                        <div key={idx} className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-gray-50/50 transition-colors items-center">
                          <div className="col-span-4"><h4 className="font-bold text-gray-900 text-[15.5px]">{prog.name}</h4></div>
                          <div className="col-span-2"><span className="text-[14px] text-gray-600">{prog.level}</span></div>
                          <div className="col-span-3">
                            <span className={`px-3 py-1.5 rounded-md text-[12px] font-bold tracking-wide ${
                              prog.status === 'Ongoing' ? 'bg-[#ecfdf5] text-[#10b981]' : 'bg-[#fef2f2] text-[#ef4444]'
                            }`}>
                              {prog.status}
                            </span>
                          </div>
                          <div className="col-span-3"><button className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold px-4 py-2 rounded-lg transition-colors">View Details</button></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Scholarship Tab */}
            {activeTab === "scholarship" && (
              <div className="border border-gray-100 rounded-[20px] overflow-hidden shadow-sm bg-white">
                <div className="bg-[#f4f8fc] px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-blue-600 text-[14px] font-semibold tracking-wide">Scholarship opportunities – filter by level</p>
                  <div className="flex gap-2 text-xs font-medium">
                    {["all", "+2", "Bachelor", "Master"].map((level) => (
                      <button
                        key={level}
                        onClick={() => setScholarshipFilter(level as LevelFilter)}
                        className={`px-4 py-1.5 rounded-full transition-all ${
                          scholarshipFilter === level
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[800px]">
                    <div className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-gray-100 bg-white items-center">
                      <div className="col-span-2 text-[13px] font-bold text-gray-800 uppercase tracking-wider">PROGRAM</div>
                      <div className="col-span-2 text-[13px] font-bold text-gray-800 uppercase tracking-wider">SCHOLARSHIP</div>
                      <div className="col-span-2 text-[13px] font-bold text-gray-800 uppercase tracking-wider">BENEFIT</div>
                      <div className="col-span-3 text-[13px] font-bold text-gray-800 uppercase tracking-wider">FOR WHOM</div>
                      <div className="col-span-3 text-right"></div>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {parsedScholarships.filter(s => scholarshipFilter === 'all' || s.level === scholarshipFilter).map((s, idx) => (
                        <div key={idx} className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-gray-50/50 transition-colors items-center">
                          <div className="col-span-2"><h4 className="font-bold text-gray-900 text-[14px]">{s.program}</h4></div>
                          <div className="col-span-2"><h4 className="font-bold text-gray-900 text-[14px]">{s.title}</h4></div>
                          <div className="col-span-2"><span className="text-[13px] font-medium text-green-600">{s.benefit}</span></div>
                          <div className="col-span-3"><span className="text-[13px] text-gray-600">{s.audience}</span></div>
                          <div className="col-span-3 text-right"><button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2 rounded-lg transition-colors">Get Scholarship</button></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Events Tab */}
            {activeTab === "events" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {parsedEvents.length > 0 ? parsedEvents.map((evt, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 rounded-xl p-3 text-center min-w-[70px]">
                        <span className="block text-2xl font-black text-blue-600">{evt.day}</span>
                        <span className="text-xs font-bold text-blue-500 uppercase">{evt.month}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-[16px] mb-1">{evt.title}</h4>
                        <p className="text-[13px] text-gray-500 mb-2 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {evt.time}
                        </p>
                        <p className="text-[13px] text-gray-600 line-clamp-2">{evt.body}</p>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full py-10 text-center bg-white border border-dashed rounded-2xl text-gray-400">No events scheduled.</div>
                )}
              </div>
            )}

            {/* News Tab */}
            {activeTab === "news" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {parsedNews.length > 0 ? parsedNews.map((card, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-2xl bg-white shadow-sm flex flex-col hover:shadow-md transition-shadow overflow-hidden">
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="mb-4">
                        <span className={`inline-block px-3.5 py-1 rounded-full text-[12px] font-bold ${card.tagClass}`}>
                          {card.tag}
                        </span>
                      </div>
                      <div className="w-full h-[140px] mb-4 rounded-xl overflow-hidden shrink-0">
                        <img 
                          src={card.image} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                          alt="News" 
                        />
                      </div>
                      <h3 className="font-bold text-gray-900 text-[17px] mb-2 leading-tight">{card.title}</h3>
                      <p className="text-[13.5px] text-gray-500 mb-2 line-clamp-2">{card.excerpt}</p>
                    </div>
                    <div className="px-5 py-4 border-t border-gray-50 flex items-center justify-between mt-auto bg-white">
                      <div className="flex items-center text-gray-400 gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span className="text-[12.5px] font-medium">{card.time}</span>
                      </div>
                      <button 
                        onClick={() => onNavigate("newsDetails", { id: card.id, article: card })}
                        className="flex items-center text-blue-600 hover:text-blue-700 text-[13px] font-bold transition-colors"
                      >
                        Read more <ChevronRight className="w-4 h-4 ml-0.5" />
                      </button>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full py-10 text-center bg-white border border-dashed rounded-2xl text-gray-400">No news updates available.</div>
                )}
              </div>
            )}

            {/* Download Tab */}
            {activeTab === "download" && (
              <div className="space-y-6">
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-[20px] mb-5 flex items-center gap-3 border-b border-gray-100 pb-3">
                    <Download className="w-6 h-6 text-blue-600" /> Brochures & Forms
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {parsedDownloads.length > 0 ? parsedDownloads.map((dl: any, idx: number) => (
                      <div key={idx} className="bg-[#f8fafc] rounded-xl p-5 flex items-start gap-3 border border-gray-100 hover:border-blue-200 transition-all group">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                          <Book className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-[15px]">{dl.name || dl.title}</h4>
                          <p className="text-[12px] text-gray-500 mb-2">PDF · Updated Recently</p>
                          <button 
                            onClick={() => dl.file && window.open(dl.file, '_blank')}
                            className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-[13px] font-bold transition-colors"
                          >
                            <FileDown className="w-4 h-4" /> Download PDF
                          </button>
                        </div>
                      </div>
                    )) : (
                      <div className="col-span-full py-10 text-center text-gray-400">No documents listed for download.</div>
                    )}
                  </div>
                  <div className="mt-8 p-5 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-blue-600" />
                      <span className="text-[14px] text-gray-700">Need more documents? Request and we'll email you.</span>
                    </div>
                    <button className="bg-white border border-blue-200 hover:bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-2 rounded-lg transition-colors">Request</button>
                  </div>
                </div>
              </div>
            )}

            {/* Gallery Tab */}
            {activeTab === "gallery" && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {parsedGallery.length > 0 ? parsedGallery.map((img: string, idx: number) => (
                  <div key={idx} className="aspect-[16/10] rounded-xl overflow-hidden shadow-sm group">
                    <img 
                      src={img} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      alt="Gallery" 
                    />
                  </div>
                )) : (
                  <div className="col-span-full py-10 text-center bg-white border border-dashed rounded-2xl text-gray-400">Gallery is empty.</div>
                )}
              </div>
            )}

            {/* Admissions Tab */}
            {activeTab === "admissions" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {parsedAdmissions.length > 0 ? parsedAdmissions.map((adm: any, idx: number) => (
                  <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col hover:shadow-md transition-shadow">
                    <div className="h-[180px] w-full relative">
                      <img src={adm.image || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80"} className="w-full h-full object-cover" alt="Course" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="mb-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide ${
                          adm.status === 'Ongoing' ? 'bg-[#ecfdf5] text-[#10b981]' : 'bg-[#fef2f2] text-[#ef4444]'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${adm.status === 'Ongoing' ? 'bg-[#10b981]' : 'bg-[#ef4444]'}`}></div> {adm.status}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-[17px] mb-2 leading-tight">{adm.title}</h3>
                      <div className="flex items-center gap-2 text-[12.5px] text-gray-500 font-medium mb-5">
                        <Building2 className="w-4 h-4 text-blue-500" />
                        <span>{adm.faculty || "Main Campus"}</span>
                      </div>
                      <div className="bg-[#f8fafc] border border-gray-100 rounded-xl p-4 flex justify-between items-center mb-5">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Start</span>
                          </div>
                          <p className="font-bold text-gray-900 text-[13px]">{adm.start || "TBA"}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-1.5 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">DEADLINE</span>
                          </div>
                          <p className="font-bold text-gray-900 text-[13px]">{adm.deadline}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-auto">
                        <button className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-2.5 rounded-xl text-[13.5px] transition-colors">Details</button>
                        <button className="flex-[1.5] bg-[#111827] hover:bg-black text-white font-bold py-2.5 rounded-xl text-[13.5px] transition-colors">Apply Now</button>
                        <button className="w-[42px] h-[42px] border border-gray-200 hover:bg-gray-50 rounded-xl flex items-center justify-center shrink-0 transition-colors">
                          <Heart className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full py-10 text-center bg-white border border-dashed rounded-2xl text-gray-400">No active admissions announced.</div>
                )}
              </div>
            )}

            {/* Review Tab */}
            {activeTab === "review" && (
              <div className="space-y-8">
                <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center">
                  <div className="text-center md:text-left flex-shrink-0">
                    <h2 className="text-5xl font-bold text-gray-900 mb-2">{Number(university.rating || 0).toFixed(1)}</h2>
                    <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                       {[...Array(5)].map((_, i) => (
                         <Star key={i} className={`w-5 h-5 ${i < Math.floor(university.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                       ))}
                    </div>
                    <p className="text-[13px] text-gray-500 font-medium">Based on 12,024 reviews</p>
                  </div>
                  <div className="w-full space-y-2">
                    {[
                      { label: "5 Star", width: "80%", color: "bg-green-500" },
                      { label: "4 Star", width: "15%", color: "bg-blue-500" },
                      { label: "3 Star", width: "3%", color: "bg-yellow-500" },
                      { label: "2 Star", width: "1%", color: "bg-orange-500" },
                      { label: "1 Star", width: "1%", color: "bg-red-500" },
                    ].map((row, idx) => (
                      <div key={idx} className="flex items-center text-[13px] font-medium text-gray-600">
                        <span className="w-12">{row.label}</span>
                        <div className="mx-3 h-2 flex-grow rounded-full bg-gray-100 overflow-hidden">
                          <div className={`h-full rounded-full ${row.color}`} style={{ width: row.width }}></div>
                        </div>
                        <span className="w-10 text-right">{row.width}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {parsedReviews.length > 0 ? parsedReviews.map((rev: any, idx: number) => (
                    <div key={idx} className="bg-[#fafafa] p-6 rounded-xl border border-gray-100">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-[14px]">
                            {rev.user?.[0] || 'U'}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-[15px]">{rev.user}</h4>
                            <p className="text-[12px] text-gray-500">{rev.program || "Student"}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                             <Star key={i} className={`w-3.5 h-3.5 ${i < (rev.rating || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-[14px] text-gray-600 leading-relaxed">{rev.comment}</p>
                    </div>
                  )) : (
                    <div className="py-10 text-center text-gray-400">No reviews yet. Be the first to review!</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-[17px] mb-5 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-500" /> Quick Facts
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Established", value: university.established || "N/A" },
                  { label: "Founder", value: university.founder || "N/A" },
                  { label: "Location", value: university.location || "N/A" },
                  { label: "University Type", value: university.type || "N/A" },
                  { label: "Chancellor", value: university.chancellor || "N/A" },
                  { label: "Vice-Chancellor", value: university.vice_chancellor || "N/A" },
                  { label: "Campus Size", value: parsedQuick.size || "N/A" },
                  { label: "Total Students", value: university.students || "N/A" },
                  { label: "Teaching Staff", value: parsedQuick.teachingStaff || "N/A" },
                  { label: "Non-Teaching Staff", value: parsedQuick.nonTeachingStaff || "N/A" },
                  { label: "Constituent Campuses", value: parsedQuick.constituentCampuses || "N/A" },
                  { label: "Affiliated Colleges", value: parsedQuick.affiliatedColleges || "N/A" },
                  { label: "Central Departments", value: parsedQuick.centralDepartments || "N/A" },
                  { label: "Research Centers", value: parsedQuick.researchCenters || "N/A" },
                  { label: "International Collaborations", value: parsedQuick.intlCollabs || "N/A" },
                ].map((fact, idx, array) => (
                  <div key={idx} className={`flex justify-between items-center ${idx !== array.length - 1 ? 'border-b border-gray-50 pb-3' : ''}`}>
                    <span className="text-[13.5px] text-gray-500">{fact.label}</span>
                    <span className="text-[13.5px] font-bold text-gray-800 text-right ml-2">{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1e293b] rounded-[20px] p-6 shadow-sm text-white">
              <h3 className="font-bold text-white text-[17px] mb-5 flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-blue-400" /> Contact Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <p className="text-[13.5px] text-gray-300 leading-relaxed">{university.location}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <p className="text-[13.5px] text-gray-300">{parsedContact.email || "info@university.edu"}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <p className="text-[13.5px] text-gray-300">{parsedContact.phone || "N/A"}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <p className="text-[13.5px] text-gray-300">{website}</p>
                </div>
              </div>
              <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-[13.5px] transition-colors shadow-sm">
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components
const StatusState: React.FC<{ text: string; tone: "default" | "error" }> = ({ text, tone }) => (
  <div className="flex min-h-[400px] w-full items-center justify-center bg-gray-50 p-8 rounded-2xl border-2 border-dashed border-gray-200">
    <div className="text-center">
      <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${tone === 'error' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
        <Info className="w-8 h-8" />
      </div>
      <p className="text-lg font-bold text-gray-900">{text}</p>
      <p className="mt-2 text-sm text-gray-500 font-medium">Please check back later or refresh the page.</p>
    </div>
  </div>
);

export default UniversityDetailsPage;

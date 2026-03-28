import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { apiService } from "../../../services/api";

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
    <div className="w-full bg-white">
      {/* Cover Image */}
      <div 
        className="h-[220px] w-full bg-cover bg-center md:h-[360px]" 
        style={{ backgroundImage: `url('${university.cover || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80"}')` }} 
      />

      {/* Header Info */}
      <div className="relative bg-white pb-8 px-6 md:px-12 lg:px-24 xl:px-32">
        <div className="absolute left-6 -top-4 z-10 h-[120px] w-[120px] rounded-xl border border-gray-100 bg-white p-2 shadow-xl md:left-12 md:h-[150px] md:w-[150px] lg:left-24 xl:left-32">
          {university.logo ? (
            <img src={university.logo} alt={university.name} className="h-full w-full object-contain" />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-[#0f172a] text-[36px] font-extrabold text-white">{initials}</div>
          )}
        </div>

        <div className="flex flex-col items-start justify-between pt-20 lg:ml-[180px] lg:flex-row lg:items-end lg:pt-6">
          <div className="w-full space-y-3 lg:w-auto">
            <h1 className="text-[24px] font-bold text-gray-900 md:text-3xl flex items-center gap-2">
              {university.name}
              <i className="fa-solid fa-circle-check text-blue-500 text-xl"></i>
            </h1>
            <div className="flex items-center gap-4 text-gray-500 font-medium text-[15px]">
               <span className="flex items-center gap-1.5"><i className="fa-solid fa-location-dot"></i> {university.location}</span>
               <span className="flex items-center gap-1.5"><i className="fa-solid fa-star text-blue-500"></i> {Number(university.rating || 0).toFixed(1)}</span>
            </div>
            <a href={websiteHref} target="_blank" rel="noreferrer" className="text-blue-600 font-bold uppercase tracking-wide text-xs flex items-center gap-1">
               {website} <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>

          <div className="mt-8 flex w-full items-center gap-3 lg:mt-0 lg:w-auto">
            <button className="flex-1 lg:flex-none rounded-xl bg-blue-600 px-6 py-3 text-white font-bold transition-colors hover:bg-blue-700" onClick={() => setActiveTab("institutes")}>
              Affiliated Colleges
            </button>
            <button 
              className="rounded-xl border border-gray-200 bg-white px-5 py-3 font-bold text-gray-700 hover:bg-gray-50"
              onClick={() => {
                if (parsedDownloads[0]?.file) window.open(parsedDownloads[0].file, '_blank');
                else alert("Prospectus not available.");
              }}
            >
              Prospectus
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-[106px] z-40 border-y border-gray-100 bg-white px-6 md:px-12 lg:px-24 xl:px-32 flex overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`border-b-2 py-4 px-3 text-[15px] font-bold transition-colors whitespace-nowrap ${
              activeTab === tab.key ? "border-blue-600 text-gray-900" : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-[#fafbfc] px-6 py-10 md:px-12 lg:px-24 xl:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            
            {/* About Tab */}
            {activeTab === "about" && (
              <div className="space-y-10">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                   {parsedAbout.yt1 && <div className="aspect-video rounded-xl overflow-hidden shadow-sm"><iframe className="w-full h-full" src={parsedAbout.yt1.replace("watch?v=", "embed/")}></iframe></div>}
                   {parsedAbout.yt2 && <div className="aspect-video rounded-xl overflow-hidden shadow-sm"><iframe className="w-full h-full" src={parsedAbout.yt2.replace("watch?v=", "embed/")}></iframe></div>}
                </div>
                <div className="prose prose-slate max-w-none text-gray-600 leading-relaxed">
                  {parsedAbout.desc ? (
                    <div dangerouslySetInnerHTML={{ __html: parsedAbout.desc }} />
                  ) : (
                    <p>{university.description || "No description provided."}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InfoPanel title="Vision" body={parsedAbout.vision || "Educational excellence."} panelClass="bg-blue-50" icon="fa-eye" iconClass="text-blue-600" />
                  <InfoPanel title="Mission" body={parsedAbout.mission || "Quality learning."} panelClass="bg-green-50" icon="fa-bullseye" iconClass="text-green-600" />
                  <InfoPanel title="Values" body={parsedAbout.values || "Integrity & Innovation."} panelClass="bg-red-50" icon="fa-gem" iconClass="text-red-500" />
                </div>
              </div>
            )}

            {/* Courses Tab */}
            {activeTab === "courses" && (
              <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-gray-900 font-bold">Available Courses</span>
                  <FilterPills active={coursesFilter} onChange={setCoursesFilter} options={["all", "Bachelor", "Master"]} />
                </div>
                <div className="p-6">
                  {parsedCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {parsedCourses.filter(c => coursesFilter === 'all' || c.level === coursesFilter).map((course, idx) => (
                        <div key={idx} className="p-6 rounded-2xl border border-gray-100 transition-hover hover:bg-slate-50">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{course.title}</h3>
                          <p className="text-gray-500 text-sm mb-4">{course.subtitle || "Academic Program"}</p>
                          <div className="flex items-center justify-between border-t pt-4">
                             <div><span className="text-xs uppercase font-bold text-gray-400">Fee</span><p className="text-blue-600 font-bold">{course.fee}</p></div>
                             <div><span className="text-xs uppercase font-bold text-gray-400 text-right block">Duration</span><p className="font-bold">{course.duration}</p></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : <EmptyState icon="fa-graduation-cap" text="No courses listed." />}
                </div>
              </div>
            )}

            {/* Institutes Tab */}
            {activeTab === "institutes" && (
              <div className="space-y-4">
                {parsedFaculties.length > 0 ? parsedFaculties.map((f: any, idx: number) => (
                  <div key={idx} className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm">
                    <button onClick={() => toggleDropdown(f.title)} className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3"><div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600"><i className={`fa-solid ${f.icon || 'fa-building-columns'}`}></i></div><span className="font-bold text-gray-900">{f.title}</span></div>
                      <i className={`fa-solid fa-chevron-down transition-transform ${openDropdowns[f.title] ? 'rotate-180' : ''}`}></i>
                    </button>
                    {openDropdowns[f.title] && (
                      <div className="p-6 border-t border-gray-50 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {f.items?.map((item: string, i: number) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 font-medium text-gray-700">
                             <div className="h-2 w-2 rounded-full bg-blue-400"></div> {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )) : <EmptyState icon="fa-sitemap" text="No faculty data." />}
              </div>
            )}

            {/* Offered Tab */}
            {activeTab === "offered" && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                 {parsedOfferedPrograms.length > 0 ? parsedOfferedPrograms.filter(p => programFilter === 'all' || p.level === programFilter).map((prog: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-5 rounded-2xl border border-gray-100 bg-white shadow-sm hover:bg-slate-50">
                      <div><h4 className="font-bold text-gray-900">{prog.name}</h4><span className="text-[12px] font-bold text-gray-400 uppercase">{prog.level}</span></div>
                      <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase ${prog.status === 'Ongoing' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{prog.status}</span>
                    </div>
                 )) : <div className="col-span-full"><EmptyState icon="fa-list-check" text="No programs listed." /></div>}
               </div>
            )}

            {/* Scholarship Tab */}
            {activeTab === "scholarship" && (
              <div className="space-y-4">
                 {parsedScholarships.length > 0 ? parsedScholarships.map((s, idx) => (
                    <div key={idx} className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50">
                       <div className="flex-1 text-gray-900">
                          <h3 className="font-bold text-lg">{s.title}</h3>
                          <p className="text-gray-500 font-medium text-sm">Program: {s.program} | Target: {s.audience}</p>
                       </div>
                       <div className="bg-emerald-50 px-5 py-3 rounded-xl text-center min-w-[140px]">
                          <span className="block text-[10px] font-bold text-emerald-600 uppercase">Value</span>
                          <span className="text-emerald-700 font-black text-lg">{s.benefit}</span>
                       </div>
                    </div>
                 )) : <EmptyState icon="fa-hand-holding-dollar" text="No scholarships." />}
              </div>
            )}

            {/* Events Tab */}
            {activeTab === "events" && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {parsedEvents.length > 0 ? parsedEvents.map((evt, idx) => (
                    <div key={idx} className="flex gap-4 p-5 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                       <div className="h-16 w-16 rounded-2xl bg-blue-50 flex flex-col items-center justify-center shrink-0">
                          <span className="text-xl font-black text-gray-900 leading-none">{evt.day}</span>
                          <span className="text-[10px] font-bold text-blue-600 mt-1">{evt.month}</span>
                       </div>
                       <div>
                          <h3 className="font-bold text-gray-900 mb-1">{evt.title}</h3>
                          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2 font-medium"><i className="fa-regular fa-clock"></i> {evt.time}</div>
                          <p className="text-sm text-gray-500 line-clamp-2">{evt.body}</p>
                       </div>
                    </div>
                 )) : <div className="col-span-full"><EmptyState icon="fa-calendar-days" text="No upcoming events." /></div>}
               </div>
            )}

            {/* News Tab */}
            {activeTab === "news" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {parsedNews.length > 0 ? parsedNews.map((card, idx) => (
                    <div key={idx} className="flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                       <div className="relative h-48 overflow-hidden">
                          <img src={card.image} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" alt="News" />
                          <span className={`absolute top-4 left-4 px-3 py-1 rounded-lg text-[11px] font-bold ${card.tagClass}`}>{card.tag}</span>
                       </div>
                       <div className="p-5 flex-1">
                          <h3 className="font-bold text-gray-900 mb-2 leading-tight">{card.title}</h3>
                          <p className="text-sm text-gray-500 line-clamp-2 mb-4 font-medium">{card.excerpt}</p>
                          <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                             <span className="text-xs text-gray-400 font-medium"><i className="fa-regular fa-clock mr-1"></i> {card.time}</span>
                             <button onClick={() => onNavigate("newsDetails", { id: card.id, article: card })} className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">Read more <i className="fa-solid fa-chevron-right text-[10px]"></i></button>
                          </div>
                       </div>
                    </div>
                 )) : <div className="col-span-full"><EmptyState icon="fa-newspaper" text="No news found." /></div>}
              </div>
            )}

            {/* Download Tab */}
            {activeTab === "download" && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {parsedDownloads.length > 0 ? parsedDownloads.map((dl: any, idx: number) => (
                    <div key={idx} className="p-5 rounded-2xl border border-gray-100 bg-white flex items-center justify-between hover:bg-slate-50 transition-colors">
                       <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-xl"><i className="fa-solid fa-file-pdf"></i></div>
                          <div><h4 className="font-bold text-gray-900">{dl.name || dl.title}</h4><span className="text-xs text-gray-400">{dl.date || "Updated Recently"}</span></div>
                       </div>
                       <button onClick={() => dl.file && window.open(dl.file, '_blank')} className="text-orange-600 font-black text-xs uppercase tracking-widest hover:underline">Download</button>
                    </div>
                 )) : <div className="col-span-full"><EmptyState icon="fa-file-arrow-down" text="No documents available." /></div>}
               </div>
            )}

            {/* Gallery Tab */}
            {activeTab === "gallery" && (
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                 {parsedGallery.length > 0 ? parsedGallery.map((img: string, idx: number) => (
                    <div key={idx} className="aspect-square rounded-2xl overflow-hidden group relative">
                       <img src={img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Gallery" />
                       <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-all"></div>
                    </div>
                 )) : <div className="col-span-full"><EmptyState icon="fa-image" text="Gallery is empty." /></div>}
               </div>
            )}

            {/* Admissions Tab */}
            {activeTab === "admissions" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {parsedAdmissions.length > 0 ? parsedAdmissions.map((adm: any, idx: number) => (
                    <div key={idx} className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                       <img src={adm.image || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80"} className="h-40 w-full object-cover" alt="Admissions" />
                       <div className="p-5">
                          <div className="flex justify-between items-start mb-2">
                             <h4 className="font-bold text-gray-900 leading-tight">{adm.title}</h4>
                             <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase">{adm.status}</span>
                          </div>
                          <p className="text-sm text-gray-500 mb-4 font-medium">{adm.faculty}</p>
                          <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                             <span>Deadline</span>
                             <span className="text-red-500">{adm.deadline}</span>
                          </div>
                       </div>
                    </div>
                 )) : <div className="col-span-full"><EmptyState icon="fa-scroll" text="No admissions announced." /></div>}
              </div>
            )}

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
               <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">Contact Details</h3>
               <div className="space-y-4 text-sm font-medium text-gray-600">
                  <div className="flex gap-3"><i className="fa-solid fa-map-pin mt-1 text-blue-500"></i> {university.location}</div>
                  <div className="flex gap-3"><i className="fa-solid fa-phone mt-1 text-blue-500"></i> {parsedContact.phone || "N/A"}</div>
                  <div className="flex gap-3"><i className="fa-solid fa-envelope mt-1 text-blue-500"></i> {parsedContact.email || "N/A"}</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components
const InfoPanel: React.FC<{ title: string; body: string; panelClass: string; icon: string; iconClass: string }> = ({ title, body, panelClass, icon, iconClass }) => (
  <div className={`p-6 rounded-2xl ${panelClass} border border-white/40 shadow-sm`}>
    <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ${iconClass}`}><i className={`fa-solid ${icon}`}></i></div>
    <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
    <p className="text-[13px] text-gray-600 font-medium leading-relaxed">{body}</p>
  </div>
);

const FeatureCallout: React.FC<{ title: string; body: string; cardClass: string; icon: string; iconClass: string }> = ({ title, body, cardClass, icon, iconClass }) => (
  <div className={`p-6 rounded-2xl border ${cardClass} flex gap-4`}>
     <div className={`h-11 w-11 shrink-0 rounded-xl flex items-center justify-center ${iconClass}`}><i className={`fa-solid ${icon}`}></i></div>
     <div><h4 className="font-bold text-gray-900">{title}</h4><p className="text-sm text-gray-600 font-medium">{body}</p></div>
  </div>
);

const FilterPills: React.FC<{ active: string; onChange: (v: any) => void; options: string[] }> = ({ active, onChange, options }) => (
  <div className="flex gap-2">
    {options.map((opt) => (
      <button key={opt} onClick={() => onChange(opt)} className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors ${active === opt ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>{opt}</button>
    ))}
  </div>
);

const EmptyState: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <div className="py-12 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
    <i className={`fa-solid ${icon} text-4xl text-gray-300 mb-4 block`}></i>
    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">{text}</p>
  </div>
);

const OverviewRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between px-6 py-4 text-sm font-medium">
    <span className="text-gray-500">{label}</span>
    <span className="text-gray-900 font-bold">{value}</span>
  </div>
);

const AdminRow: React.FC<{ position: string; role: string; holder: string }> = ({ position, role, holder }) => (
  <tr>
    <td className="px-6 py-4"><span className="font-bold text-gray-900">{position}</span></td>
    <td className="px-6 py-4">{role}</td>
    <td className="px-6 py-4 font-bold text-blue-600">{holder}</td>
  </tr>
);

const StatusState: React.FC<{ text: string; tone: "default" | "error" }> = ({ text, tone }) => (
  <div className="flex min-h-[400px] w-full items-center justify-center bg-gray-50 p-8 rounded-2xl border-2 border-dashed border-gray-200">
    <div className="text-center">
      <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${tone === 'error' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
        <i className={`fa-solid ${tone === 'error' ? 'fa-triangle-exclamation' : 'fa-circle-info'} text-2xl`}></i>
      </div>
      <p className="text-lg font-bold text-gray-900">{text}</p>
      <p className="mt-2 text-sm text-gray-500 font-medium">Please check back later or refresh the page.</p>
    </div>
  </div>
);

export default UniversityDetailsPage;

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

const courses = [
  {
    title: "B.Tech Computer Science",
    subtitle: "AI, Data Science",
    duration: "4 Year",
    format: "Full Time",
    fee: "Rs. 4,50,000",
    eligibility: "10+2 with 75% (PCM)",
    seats: "120 Seats",
    level: "Bachelor" as LevelFilter,
  },
  {
    title: "BBA Finance",
    subtitle: "Finance, Accounting",
    duration: "3 Year",
    format: "Full Time",
    fee: "Rs. 2,80,000",
    eligibility: "10+2 with 60%",
    seats: "90 Seats",
    level: "Bachelor" as LevelFilter,
  },
  {
    title: "B.Sc. CSIT",
    subtitle: "Computing",
    duration: "4 Year",
    format: "Semester",
    fee: "Rs. 3,20,000",
    eligibility: "10+2 with 65%",
    seats: "100 Seats",
    level: "Bachelor" as LevelFilter,
  },
  {
    title: "MBA Financial Mgt",
    subtitle: "Finance",
    duration: "2 Year",
    format: "Full Time",
    fee: "Rs. 3,50,000",
    eligibility: "Bachelor's Degree (Min 50%)",
    seats: "60 Seats",
    level: "Master" as LevelFilter,
  },
  {
    title: "M.Sc. Data Science",
    subtitle: "ML & AI",
    duration: "2 Year",
    format: "Full Time",
    fee: "Rs. 3,00,000",
    eligibility: "B.Sc. CSIT / related",
    seats: "40 Seats",
    level: "Master" as LevelFilter,
  },
  {
    title: "MA Sociology",
    subtitle: "Anthropology",
    duration: "2 Year",
    format: "Yearly",
    fee: "Rs. 1,20,000",
    eligibility: "Bachelor's degree",
    seats: "80 Seats",
    level: "Master" as LevelFilter,
  },
];

const offeredPrograms = [
  { name: "Science (Biology)", level: "+2" as LevelFilter, status: "Ongoing" },
  { name: "Science (Math)", level: "+2" as LevelFilter, status: "Ongoing" },
  { name: "B.Sc. CSIT", level: "Bachelor" as LevelFilter, status: "Ongoing" },
  { name: "BBA", level: "Bachelor" as LevelFilter, status: "Closed" },
  { name: "MBA", level: "Master" as LevelFilter, status: "Ongoing" },
  { name: "M.Sc. Data Science", level: "Master" as LevelFilter, status: "Closed" },
];

const scholarships = [
  { program: "+2 Science", title: "Merit Scholarship", benefit: "Up to 100% waiver", audience: "Top 5% in SEE", level: "+2" as LevelFilter },
  { program: "+2 Management", title: "Need-Based Grant", benefit: "Variable", audience: "Low income families", level: "+2" as LevelFilter },
  { program: "B.Sc. CSIT", title: "Merit Scholarship", benefit: "Up to 100% waiver", audience: "60%+ in +2", level: "Bachelor" as LevelFilter },
  { program: "BBA", title: "Sports Excellence", benefit: "Fee reduction", audience: "State/national players", level: "Bachelor" as LevelFilter },
  { program: "MBA", title: "Merit Scholarship", benefit: "50% waiver", audience: "70% in Bachelor", level: "Master" as LevelFilter },
];

const newsCards = [
  {
    tag: "Exam",
    tagClass: "bg-orange-50 text-orange-500",
    title: "JEE Main 2025: Registration Process Extended.",
    body: "NTA extends JEE Main 2025 registration deadline due to high volume of applications.",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=800&auto=format&fit=crop",
    time: "2 days ago",
  },
  {
    tag: "Admission",
    tagClass: "bg-blue-50 text-blue-500",
    title: "UG Admissions 2025 Open",
    body: "Apply now for all bachelor programs. Last date extended.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop",
    time: "5 days ago",
  },
  {
    tag: "Scholarship",
    tagClass: "bg-green-50 text-green-600",
    title: "Merit Scholarship 2025 Application Open",
    body: "Apply for merit-based scholarships for outstanding students.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
    time: "1 week ago",
  },
];

const eventCards = [
  {
    day: "15",
    month: "MAY",
    color: "bg-blue-50 text-blue-600",
    monthColor: "text-blue-500",
    title: "International Conference on AI",
    time: "10:00 AM - 4:00 PM",
    body: "Central Library Auditorium. Keynote by Prof. Yoshua Bengio.",
  },
  {
    day: "22",
    month: "JUN",
    color: "bg-green-50 text-green-600",
    monthColor: "text-green-500",
    title: "Alumni Meet 2025",
    time: "5:00 PM onwards",
    body: "University Guest House. Registration open.",
  },
  {
    day: "05",
    month: "JUL",
    color: "bg-purple-50 text-purple-600",
    monthColor: "text-purple-500",
    title: "Research Symposium 2025",
    time: "9:00 AM - 3:00 PM",
    body: "Present your research. Prizes for best papers.",
  },
  {
    day: "12",
    month: "AUG",
    color: "bg-amber-50 text-amber-600",
    monthColor: "text-amber-500",
    title: "Career Fair 2025",
    time: "10:00 AM - 5:00 PM",
    body: "50+ top companies participating. Register now.",
  },
];

const downloads = [
  {
    title: "General Prospectus 2025",
    meta: "PDF, 12 MB · Updated Feb 2025",
    icon: "fa-book",
    color: "bg-blue-100 text-blue-600",
    linkColor: "text-blue-600 hover:text-blue-700",
    action: "Download PDF",
  },
  {
    title: "Course Guide (Bachelor)",
    meta: "PDF, 8.5 MB · Updated Jan 2025",
    icon: "fa-graduation-cap",
    color: "bg-green-100 text-green-600",
    linkColor: "text-green-600 hover:text-green-700",
    action: "Download",
  },
  {
    title: "Scholarship Application Form",
    meta: "DOCX, 2.1 MB",
    icon: "fa-scroll",
    color: "bg-purple-100 text-purple-600",
    linkColor: "text-purple-600 hover:text-purple-700",
    action: "Download",
  },
  {
    title: "International Student Guide",
    meta: "PDF, 5.3 MB",
    icon: "fa-landmark",
    color: "bg-amber-100 text-amber-600",
    linkColor: "text-amber-600 hover:text-amber-700",
    action: "Download",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555438848-18e874ce2ab2?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541829070764-84a5d30cb270?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=500&auto=format&fit=crop",
];

const instituteSections = [
  {
    key: "inst-eng-drop",
    icon: "fa-microchip",
    title: "Institute of Engineering",
    items: ["Department of Architecture", "Civil Engineering", "Electronics & Computer", "Mechanical Engineering"],
  },
  {
    key: "inst-med-drop",
    icon: "fa-stethoscope",
    title: "Institute of Medicine",
    items: ["MBBS", "Nursing", "Public Health", "Dental Surgery"],
  },
  {
    key: "inst-for-drop",
    icon: "fa-tree",
    title: "Institute of Forestry",
    items: ["Forestry", "Natural Resources"],
  },
];

const facultySections = [
  {
    key: "fac-humanities-drop",
    icon: "fa-users",
    title: "Faculty of Humanities",
    items: ["Sociology", "English", "History", "Economics", "Psychology"],
  },
  {
    key: "fac-law-drop",
    icon: "fa-scale-balanced",
    title: "Faculty of Law",
    items: ["LL.B.", "LL.M.", "Constitutional Law", "International Law"],
  },
];

const UniversityDetailsPage: React.FC<UniversityDetailsPageProps> = ({ id, onNavigate }) => {
  const location = useLocation();
  const routeId = Number((location.state as { id?: number | string } | null)?.id);
  const resolvedId = Number.isFinite(routeId) && routeId > 0 ? routeId : id;

  const [activeTab, setActiveTab] = useState<TabKey>("about");
  const [coursesFilter, setCoursesFilter] = useState<LevelFilter>("all");
  const [programFilter, setProgramFilter] = useState<LevelFilter>("all");
  const [scholarshipFilter, setScholarshipFilter] = useState<LevelFilter>("all");
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    "institutes-master-drop": true,
    "fac-management-drop": true,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["university-details", resolvedId],
    queryFn: () => apiService.getUniversityById(resolvedId as number),
    enabled: !!resolvedId,
  });

  const university = data?.data?.university;
  const affiliatedColleges = data?.data?.colleges || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [resolvedId]);

  const initials = useMemo(() => {
    const name = university?.name || "University";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [university?.name]);

  const website = university?.website || "WWW.Studsphere.Com";
  const websiteHref = website.startsWith("http") ? website : `https://${website}`;

  const courseRows = coursesFilter === "all" ? courses : courses.filter((row) => row.level === coursesFilter);
  const programRows = programFilter === "all" ? offeredPrograms : offeredPrograms.filter((row) => row.level === programFilter);
  const scholarshipRows = scholarshipFilter === "all" ? scholarships : scholarships.filter((row) => row.level === scholarshipFilter);

  const affiliatedTableRows = useMemo(() => {
    const sampleAddresses = [
      ["Biratnagar", "Morang", "BSW-48, PGDCP-33, MSW-33"],
      ["Kathmandu", "Kathmandu", "BA (Hon.)-100, MA (Eng.)-100"],
      ["Kathmandu", "Kathmandu", "BAMCJ-25, MAMCJ-25, MDC-25"],
      ["Kathmandu", "Kathmandu", "BSW-48, MSW-33"],
      ["Kathmandu", "Kathmandu", "BID-96"],
      ["Karfok", "Ilam", "B.A.-40"],
      ["Kathmandu", "Kathmandu", "BMT-48, MMT-33"],
      ["Kathmandu", "Kathmandu", "BLAS-25"],
      ["Biratnagar", "Morang", "M. Sc. PRD-33"],
      ["Kathmandu", "Kathmandu", "MAMCJ-33"],
      ["Kathmandu", "Kathmandu", "MAMCJ-40"],
      ["Kathmandu", "Kathmandu", "MDS-33"],
      ["Kathmandu", "Kathmandu", "MA (Sociology/Anthropology)-50"],
    ];

    return affiliatedColleges.slice(0, 13).map((college, index) => {
      const sample = sampleAddresses[index] || [university?.location || "Kathmandu", "Kathmandu", `${college.affiliation || "General"}-50`];
      return {
        sn: index + 1,
        college: college.name,
        address: sample[0],
        district: sample[1],
        programs: sample[2],
      };
    });
  }, [affiliatedColleges, university?.location]);

  if (!resolvedId) {
    return <StatusState text="University not selected." tone="default" />;
  }

  if (isLoading) {
    return <StatusState text="Loading university details..." tone="default" />;
  }

  if (isError || !university) {
    return <StatusState text="Failed to load university details." tone="error" />;
  }

  const toggleDropdown = (key: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full bg-white">
      <div
        className="h-[220px] w-full bg-cover bg-center md:h-[360px]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      <div className="relative bg-white">
        <div className="relative px-6 pb-8 md:px-12 lg:px-24 xl:px-32">
          <div className="absolute left-6 -top-2 z-10 flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white p-2 shadow-[0_4px_20px_-3px_rgba(0,0,0,0.1)] md:left-12 md:-top-4 md:h-[150px] md:w-[150px] lg:left-24 xl:left-32">
            {university.logo ? (
              <img src={university.logo} alt={university.name} className="h-full w-full object-contain" />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-[#0f172a] text-[36px] font-extrabold text-white md:text-[46px]">
                {initials}
              </div>
            )}
          </div>

          <div className="flex flex-col items-start justify-between pt-20 lg:ml-[180px] lg:flex-row lg:items-end lg:pt-6">
            <div className="w-full space-y-3 lg:w-auto">
              <div className="flex items-center gap-2">
                <h1 className="text-[24px] font-bold tracking-tight text-gray-900 md:text-3xl">
                  {university.name}
                </h1>
                <i className="fa-solid fa-circle-check text-blue-500"></i>
              </div>

              <div className="flex flex-col gap-4 text-[14px] font-medium text-gray-600 sm:flex-row sm:items-center md:text-[15px]">
                <div className="flex items-center gap-1.5">
                  <i className="fa-solid fa-location-dot text-gray-500"></i>
                  <span>{university.location}</span>
                </div>
              </div>

              <div className="flex flex-col gap-5 pt-1 text-[14px] font-medium sm:flex-row sm:items-center">
                <div className="flex items-center gap-1.5">
                  <i className="fa-solid fa-star text-blue-500"></i>
                  <span className="font-bold text-gray-900">{Number(university.rating || 0).toFixed(1)}</span>
                  <span className="text-gray-500">({(affiliatedColleges.length || 12) * 1002} Reviews)</span>
                </div>
                <a
                  href={websiteHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[13px] font-bold uppercase tracking-wide text-blue-600 transition-colors hover:text-blue-700"
                >
                  {website.toUpperCase()}
                  <i className="fa-solid fa-arrow-up-right-from-square text-[11px]"></i>
                </a>
              </div>
            </div>

            <div className="mt-8 flex w-full items-center gap-3 lg:mt-0 lg:w-auto">
              <button
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-[15px] font-semibold text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-700 lg:flex-none"
                onClick={() => setActiveTab("institutes")}
              >
                <i className="fa-solid fa-building"></i>
                View Affiliated Colleges
              </button>
              <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-[15px] font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50">
                <i className="fa-solid fa-download"></i>
                Prospectus
              </button>
              <button className="flex items-center justify-center rounded-xl border border-gray-200 bg-white p-3 text-gray-700 shadow-sm transition-colors hover:bg-gray-50">
                <i className="fa-solid fa-share-nodes"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="sticky top-[106px] z-40 overflow-x-auto border-y border-gray-100 bg-white px-6 shadow-sm shadow-gray-100/50 no-scrollbar md:px-12 lg:px-24 xl:px-32">
          <nav className="flex space-x-8 whitespace-nowrap">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`border-b-2 py-4 text-[15px] transition-colors ${
                  activeTab === tab.key
                    ? "border-blue-600 font-bold text-gray-900"
                    : "border-transparent font-semibold text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-1 gap-10 bg-[#fafbfc] px-6 py-8 md:gap-14 md:px-12 md:py-12 lg:grid-cols-3 lg:px-24 xl:px-32">
          <div className="lg:col-span-2">
            {activeTab === "about" && (
              <div className="space-y-10">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
                  <MediaCard title="VC's Message" icon="fa-comment-dots" image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop" />
                  <MediaCard title="Campus Tour" icon="fa-video" image="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop" />
                </div>

                <div className="space-y-6 text-[15px] leading-[1.8] text-gray-600 md:text-[16px]">
                  <p className="text-lg font-medium text-gray-800">
                    Welcome to {university.name} - the pioneer of higher education in Nepal.
                  </p>
                  <p>
                    Established in {university.established || "1959"}, <strong className="font-bold text-gray-900">{university.name}</strong> is one of Nepal's oldest and largest universities. With a central campus in {university.location} and numerous constituent and affiliated colleges across the country, it has been a cornerstone of academic excellence for decades.
                  </p>
                  <p>
                    The university comprises multiple institutes, faculties, central departments, and over <strong className="text-gray-900">{university.collegesCount || affiliatedColleges.length}+ affiliated colleges</strong>. It offers a broad range of programs from intermediate to PhD levels in humanities, management, science, technology, medicine, engineering, forestry, and agriculture.
                  </p>
                  <p>
                    Our mission is to produce socially responsible, skilled, and research-oriented graduates who can contribute to national development through quality education and international collaboration.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <InfoPanel title="Our Vision" body="To be a leading center of higher learning globally recognized for excellence in research, teaching, and contribution to society's progress." panelClass="bg-[#f4f7fb]" iconClass="bg-blue-100/80 text-blue-600" icon="fa-eye" />
                  <InfoPanel title="Our Mission" body="To provide affordable, quality higher education that empowers individuals and cultivates intellectual growth across diverse communities." panelClass="bg-[#f0fdf4]" iconClass="bg-green-100/80 text-green-600" icon="fa-bullseye" />
                  <InfoPanel title="Core Values" body="Excellence, Inclusivity, Integrity, Innovation, and Social Responsibility." panelClass="bg-[#fef2f2]" iconClass="bg-red-50 text-red-500" icon="fa-gem" />
                </div>

                <div className="overflow-hidden rounded-[20px] border border-gray-100 bg-white shadow-sm">
                  <div className="border-b border-gray-100 bg-[#f8fafc] px-6 py-4">
                    <h3 className="flex items-center gap-2 text-[16px] font-bold text-gray-900">
                      <i className="fa-solid fa-landmark text-blue-600"></i> University Overview
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    <OverviewRow label="Established" value={String(university.established || "1959")} />
                    <OverviewRow label="Location" value={`${university.location} (Central Campus)`} />
                    <OverviewRow label="Type" value={university.type || "Public / Non-profit / Autonomous"} />
                    <OverviewRow label="Affiliated Colleges" value={String(university.collegesCount || affiliatedColleges.length)} />
                    <OverviewRow label="Programs" value={String(university.programsCount || 150)} />
                    <OverviewRow label="International Collaborations" value="200+ universities worldwide" />
                  </div>
                </div>

                <div className="overflow-hidden rounded-[20px] border border-gray-100 bg-white shadow-sm">
                  <div className="border-b border-gray-100 bg-[#f8fafc] px-6 py-4">
                    <h3 className="flex items-center gap-2 text-[16px] font-bold text-gray-900">
                      <i className="fa-solid fa-users text-blue-600"></i> Leadership & Administration
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[14px] text-gray-600">
                      <thead className="border-b border-gray-100 bg-gray-50/50 text-[13px] uppercase tracking-wider text-gray-800">
                        <tr>
                          <th className="px-6 py-4 font-bold">Position</th>
                          <th className="px-6 py-4 font-bold">Role</th>
                          <th className="px-6 py-4 font-bold">Current Holder</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <AdminRow position="Chancellor" role="Ceremonial head (Prime Minister)" holder="Rt. Hon'ble Prime Minister" />
                        <AdminRow position="Vice Chancellor" role="Chief Executive" holder="Prof. Dr. Dharma Kant Baskota" />
                        <AdminRow position="Rector" role="Academic affairs" holder="Prof. Dr. Khadga K.C." />
                        <AdminRow position="Registrar" role="Administration & finance" holder="Prof. Dr. Kedar Prasad Rijal" />
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FeatureCallout title="Semester System" body="Implemented at master's level, expanding to undergraduate for timely completion." cardClass="bg-blue-50 border-blue-100" iconClass="bg-blue-100 text-blue-600" icon="fa-layer-group" />
                  <FeatureCallout title="Global Ties" body="Partnerships with 200+ universities for research and exchange." cardClass="bg-emerald-50 border-emerald-100" iconClass="bg-emerald-100 text-emerald-600" icon="fa-globe" />
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                    <i className="fa-solid fa-award"></i>
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-gray-900">Commitment to Excellence</h4>
                    <p className="mt-1 text-[14px] text-gray-600">
                      Aims to be a global center for quality education, fostering peace and learning.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "courses" && (
              <div className="overflow-hidden rounded-[20px] border border-gray-100 bg-white shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 bg-[#f4f8fc] px-6 py-4">
                  <p className="text-[14px] font-semibold tracking-wide text-blue-600">Courses & fees - filter by level</p>
                  <FilterPills active={coursesFilter} onChange={setCoursesFilter} options={["all", "Bachelor", "Master"]} />
                </div>
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[700px]">
                    <div className="grid grid-cols-12 items-center gap-4 border-b border-gray-100 bg-white px-6 py-5">
                      <div className="col-span-4 text-[13px] font-bold uppercase tracking-wider text-gray-800">COURSES NAME</div>
                      <div className="col-span-2 text-[13px] font-bold uppercase tracking-wider text-gray-800">DURATION</div>
                      <div className="col-span-3 text-[13px] font-bold uppercase tracking-wider text-gray-800">FEES / YEAR</div>
                      <div className="col-span-3 text-[13px] font-bold uppercase tracking-wider text-gray-800">ELIGIBILITY & SEAT</div>
                    </div>
                    {courseRows.map((course) => (
                      <div key={course.title} className="grid grid-cols-12 items-center gap-4 border-b border-gray-100 px-6 py-5 transition-colors hover:bg-gray-50/50">
                        <div className="col-span-4 pr-4">
                          <h4 className="text-[15.5px] font-bold text-gray-900">{course.title}</h4>
                          <p className="mt-1 text-[12px] text-gray-500">{course.subtitle}</p>
                        </div>
                        <div className="col-span-2">
                          <h4 className="text-[15.5px] font-bold text-gray-900">{course.duration}</h4>
                          <p className="mt-1 text-[12px] text-gray-500">{course.format}</p>
                        </div>
                        <div className="col-span-3">
                          <h4 className="text-[15.5px] font-bold text-[#2563eb]">{course.fee}</h4>
                          <p className="mt-1 text-[12px] text-gray-500">/ Year</p>
                        </div>
                        <div className="col-span-3">
                          <p className="mb-2 text-[12.5px] font-medium text-gray-600">{course.eligibility}</p>
                          <span className="inline-block rounded bg-[#eafaef] px-2.5 py-1 text-[11px] font-bold text-[#16a34a]">{course.seats}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "institutes" && (
              <div className="space-y-10">
                <div>
                  <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                      <i className="fa-solid fa-building text-blue-600"></i>
                    </div>
                    <div>
                      <h3 className="text-[18px] font-bold text-gray-900">Institutes & Affiliated Colleges</h3>
                      <p className="mt-0.5 text-[13px] text-gray-500">Constituent and affiliated campuses</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-5">
                    <DropdownCard
                      title="Affiliated Colleges (Faculty of Humanities & Social Sciences)"
                      icon="fa-building-columns"
                      isOpen={!!openDropdowns["institutes-master-drop"]}
                      onToggle={() => toggleDropdown("institutes-master-drop")}
                    >
                      <table className="w-full border-collapse text-[13px]">
                        <thead>
                          <tr>
                            <ProgTh>SN</ProgTh>
                            <ProgTh>College</ProgTh>
                            <ProgTh>Address</ProgTh>
                            <ProgTh>District</ProgTh>
                            <ProgTh>Approved Programs/Quotas</ProgTh>
                          </tr>
                        </thead>
                        <tbody>
                          {affiliatedTableRows.map((row) => (
                            <tr key={row.sn}>
                              <ProgTd>{row.sn}</ProgTd>
                              <ProgTd>{row.college}</ProgTd>
                              <ProgTd>{row.address}</ProgTd>
                              <ProgTd>{row.district}</ProgTd>
                              <ProgTd>{row.programs}</ProgTd>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </DropdownCard>

                    {instituteSections.map((section) => (
                      <DropdownCard
                        key={section.key}
                        title={section.title}
                        icon={section.icon}
                        isOpen={!!openDropdowns[section.key]}
                        onToggle={() => toggleDropdown(section.key)}
                        compact
                      >
                        <div className="space-y-1 pl-2 text-sm text-gray-600">
                          {section.items.map((item) => (
                            <p key={item}>• {item}</p>
                          ))}
                        </div>
                      </DropdownCard>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
                      <i className="fa-solid fa-book-open text-green-600"></i>
                    </div>
                    <div>
                      <h3 className="text-[18px] font-bold text-gray-900">Faculties</h3>
                      <p className="mt-0.5 text-[13px] text-gray-500">Programs under each faculty</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-5">
                    <DropdownCard
                      title="Faculty of Management"
                      icon="fa-briefcase"
                      iconBg="bg-green-50"
                      iconText="text-green-600"
                      isOpen={!!openDropdowns["fac-management-drop"]}
                      onToggle={() => toggleDropdown("fac-management-drop")}
                    >
                      <table className="w-full border-collapse text-[13px]">
                        <thead>
                          <tr>
                            <ProgTh>SN</ProgTh>
                            <ProgTh>Programs</ProgTh>
                            <ProgTh>Duration</ProgTh>
                            <ProgTh>Year/Semester</ProgTh>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            ["1", "Bachelor of Arts (BA)", "4 Years", "Yearly"],
                            ["2", "Bachelor of Arts (BA Honours)", "4 Years", "Yearly"],
                            ["3", "Bachelor of Social Work (BSW)", "4 Years/8 Semesters", "Semester"],
                            ["4", "Bachelor of Mass Communication & Journalism (BAMCJ)", "4 Years/8 Semesters", "Semester"],
                            ["5", "Bachelor of Media Technology (BMT)", "4 Years/8 Semesters", "Semester"],
                            ["6", "Bachelor of Liberal Arts & Science (BLAS)", "4 Years/8 Semesters", "Semester"],
                            ["7", "Bachelor of Interior Design (BID)", "4 Years/8 Semesters", "Semester"],
                            ["8", "Master of Journalism & Mass Communication (MAMCJ)", "2 Years/4 Semesters", "Semester"],
                          ].map((row) => (
                            <tr key={row[0]}>
                              <ProgTd>{row[0]}</ProgTd>
                              <ProgTd>{row[1]}</ProgTd>
                              <ProgTd>{row[2]}</ProgTd>
                              <ProgTd>{row[3]}</ProgTd>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </DropdownCard>

                    {facultySections.map((section) => (
                      <DropdownCard
                        key={section.key}
                        title={section.title}
                        icon={section.icon}
                        iconBg="bg-green-50"
                        iconText="text-green-600"
                        isOpen={!!openDropdowns[section.key]}
                        onToggle={() => toggleDropdown(section.key)}
                        compact
                      >
                        <div className="space-y-1 pl-2 text-sm text-gray-600">
                          {section.items.map((item) => (
                            <p key={item}>• {item}</p>
                          ))}
                        </div>
                      </DropdownCard>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "admissions" && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <AdmissionCard title="Bachelor In Information Technology" status="Ongoing" statusClass="bg-[#ecfdf5] text-[#10b981]" image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" faculty="Faculty of Science" admissionOpen="20th Dec, 2025" deadline="20th Dec, 2025" darkButton />
                <AdmissionCard title="Master of Business Administration" status="Closed" statusClass="bg-[#fef2f2] text-[#ef4444]" image="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2070&auto=format&fit=crop" faculty="Faculty of Mgt" admissionOpen="1st Aug, 2025" deadline="30th Sep, 2025" />
              </div>
            )}

            {activeTab === "offered" && (
              <div className="overflow-hidden rounded-[20px] border border-gray-100 bg-white shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 bg-[#f4f8fc] px-6 py-4">
                  <p className="text-[14px] font-semibold tracking-wide text-blue-600">Programs offered - filter by level</p>
                  <FilterPills active={programFilter} onChange={setProgramFilter} options={["all", "+2", "Bachelor", "Master"]} />
                </div>
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[700px]">
                    <div className="grid grid-cols-12 items-center gap-4 border-b border-gray-100 bg-white px-6 py-5">
                      <div className="col-span-4 text-[13px] font-bold uppercase tracking-wider text-gray-800">PROGRAM NAME</div>
                      <div className="col-span-2 text-[13px] font-bold uppercase tracking-wider text-gray-800">LEVEL</div>
                      <div className="col-span-3 text-[13px] font-bold uppercase tracking-wider text-gray-800">STATUS</div>
                      <div className="col-span-3 text-[13px] font-bold uppercase tracking-wider text-gray-800">ACTION</div>
                    </div>
                    {programRows.map((program) => (
                      <div key={`${program.level}-${program.name}`} className="grid grid-cols-12 items-center gap-4 border-b border-gray-100 px-6 py-5 transition-colors hover:bg-gray-50/50">
                        <div className="col-span-4"><h4 className="text-[15.5px] font-bold text-gray-900">{program.name}</h4></div>
                        <div className="col-span-2"><span className="text-[14px] text-gray-600">{program.level}</span></div>
                        <div className="col-span-3">
                          <span className={`rounded-md px-3 py-1.5 text-[12px] font-bold tracking-wide ${program.status === "Ongoing" ? "bg-[#ecfdf5] text-[#10b981]" : "bg-[#fef2f2] text-[#ef4444]"}`}>
                            {program.status}
                          </span>
                        </div>
                        <div className="col-span-3">
                          <button className="rounded-lg bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700 transition-colors hover:bg-blue-100">View Details</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "scholarship" && (
              <div className="overflow-hidden rounded-[20px] border border-gray-100 bg-white shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 bg-[#f4f8fc] px-6 py-4">
                  <p className="text-[14px] font-semibold tracking-wide text-blue-600">Scholarship opportunities - filter by level</p>
                  <FilterPills active={scholarshipFilter} onChange={setScholarshipFilter} options={["all", "+2", "Bachelor", "Master"]} />
                </div>
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[800px]">
                    <div className="grid grid-cols-12 items-center gap-4 border-b border-gray-100 bg-white px-6 py-5">
                      <div className="col-span-2 text-[13px] font-bold uppercase tracking-wider text-gray-800">PROGRAM</div>
                      <div className="col-span-2 text-[13px] font-bold uppercase tracking-wider text-gray-800">SCHOLARSHIP</div>
                      <div className="col-span-2 text-[13px] font-bold uppercase tracking-wider text-gray-800">BENEFIT</div>
                      <div className="col-span-3 text-[13px] font-bold uppercase tracking-wider text-gray-800">FOR WHOM</div>
                      <div className="col-span-3 text-[13px] font-bold uppercase tracking-wider text-gray-800"></div>
                    </div>
                    {scholarshipRows.map((item) => (
                      <div key={`${item.program}-${item.title}`} className="grid grid-cols-12 items-center gap-4 border-b border-gray-100 px-6 py-5 transition-colors hover:bg-gray-50/50">
                        <div className="col-span-2"><h4 className="text-[14px] font-bold text-gray-900">{item.program}</h4></div>
                        <div className="col-span-2"><h4 className="text-[14px] font-bold text-gray-900">{item.title}</h4></div>
                        <div className="col-span-2"><span className="text-[13px] font-medium text-green-600">{item.benefit}</span></div>
                        <div className="col-span-3"><span className="text-[13px] text-gray-600">{item.audience}</span></div>
                        <div className="col-span-3"><button className="rounded-lg bg-blue-600 px-5 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-700">Get Scholarship</button></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "events" && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {eventCards.map((event) => (
                  <div key={event.title} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-[2px] hover:shadow-md">
                    <div className="flex items-start gap-4">
                      <div className={`min-w-[70px] rounded-xl p-3 text-center ${event.color}`}>
                        <span className="block text-2xl font-black">{event.day}</span>
                        <span className={`text-xs font-bold ${event.monthColor}`}>{event.month}</span>
                      </div>
                      <div>
                        <h4 className="mb-1 text-[16px] font-bold text-gray-900">{event.title}</h4>
                        <p className="mb-2 flex items-center gap-1 text-[13px] text-gray-500"><i className="fa-regular fa-clock text-[12px]"></i> {event.time}</p>
                        <p className="text-[13px] text-gray-600">{event.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "news" && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {newsCards.map((card) => (
                  <div key={card.title} className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-4"><span className={`inline-block rounded-full px-3.5 py-1 text-[12px] font-bold ${card.tagClass}`}>{card.tag}</span></div>
                      <div className="mb-4 h-[140px] w-full overflow-hidden rounded-xl shrink-0">
                        <img src={card.image} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" alt={card.title} />
                      </div>
                      <h3 className="mb-2 text-[17px] font-bold leading-tight text-gray-900">{card.title}</h3>
                      <p className="mb-2 line-clamp-2 text-[13.5px] text-gray-500">{card.body}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between border-t border-gray-50 bg-white px-5 py-4">
                      <div className="flex items-center gap-1.5 text-gray-400"><i className="fa-regular fa-clock"></i><span className="text-[12.5px] font-medium">{card.time}</span></div>
                      <button className="flex items-center text-[13px] font-bold text-blue-600 transition-colors hover:text-blue-700">Read more <i className="fa-solid fa-chevron-right ml-1 text-[11px]"></i></button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "download" && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-3 text-[20px] font-bold text-gray-900">
                    <i className="fa-solid fa-download text-blue-600"></i> Brochures & Forms
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {downloads.map((item) => (
                      <div key={item.title} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-[#f8fafc] p-5 transition-all hover:-translate-y-[3px] hover:border-blue-200 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${item.color}`}>
                          <i className={`fa-solid ${item.icon}`}></i>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-[15px] font-bold text-gray-900">{item.title}</h4>
                          <p className="mb-2 text-[12px] text-gray-500">{item.meta}</p>
                          <button className={`flex items-center gap-1.5 text-[13px] font-bold transition-colors ${item.linkColor}`}>
                            <i className="fa-solid fa-file-arrow-down"></i> {item.action}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50/50 p-5">
                    <div className="flex items-center gap-3">
                      <i className="fa-regular fa-circle-question text-blue-600"></i>
                      <span className="text-[14px] text-gray-700">Need more documents? Request and we'll email you.</span>
                    </div>
                    <button className="rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50">Request</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "gallery" && (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {galleryImages.map((image) => (
                  <div key={image} className="aspect-[16/10] overflow-hidden rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                    <img src={image} alt="Gallery" className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
                  </div>
                ))}
              </div>
            )}

            {activeTab === "review" && (
              <div>
                <div className="mb-6 flex flex-col items-center gap-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:flex-row md:p-8">
                  <div className="shrink-0 text-center md:text-left">
                    <h2 className="mb-2 text-5xl font-bold text-gray-900">4.8</h2>
                    <div className="mb-2 flex items-center justify-center gap-1 md:justify-start">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <i key={index} className="fa-solid fa-star text-yellow-400"></i>
                      ))}
                      <i className="fa-solid fa-star-half-stroke text-yellow-400"></i>
                    </div>
                    <p className="text-[13px] font-medium text-gray-500">Based on 12,024 reviews</p>
                  </div>
                  <div className="w-full space-y-2">
                    <RatingBar label="5 Star" value="80%" width="80%" color="bg-green-500" />
                    <RatingBar label="4 Star" value="15%" width="15%" color="bg-blue-500" />
                    <RatingBar label="3 Star" value="3%" width="3%" color="bg-yellow-500" />
                    <RatingBar label="2 Star" value="1%" width="1%" color="bg-orange-500" />
                    <RatingBar label="1 Star" value="1%" width="1%" color="bg-red-500" />
                  </div>
                </div>

                <ReviewCard initials="AK" initialsClass="bg-blue-100 text-blue-600" name="Aarav Kumar" program="B.Tech Computer Science" rating={5} body="The university has an amazing infrastructure with top-notch labs for Data Science. The faculties are extremely helpful and the placement cell is very active. I got placed in a top MNC right after my final semester." />
                <ReviewCard initials="SP" initialsClass="bg-green-100 text-green-600" name="Sita Paudel" program="MA Sociology" rating={4} body="Great environment for research in social sciences. The central library has an extensive collection. Hostel facilities are decent." className="mt-4" />
              </div>
            )}
          </div>

          <div className="space-y-6 lg:col-span-1">
            <div className="rounded-[20px] border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="mb-5 flex items-center gap-2 text-[17px] font-bold text-gray-900">
                <i className="fa-solid fa-circle-info text-blue-500"></i> Quick Facts
              </h3>
              <div className="space-y-4">
                <FactRow label="Established" value={String(university.established || "1959")} />
                <FactRow label="University Type" value={university.type || "Public"} />
                <FactRow label="Campus Size" value="154+ Hectares" />
                <FactRow label="Total Students" value="400,000+" />
                <FactRow label="Constituent Campuses" value={String(university.collegesCount || 64)} noBorder />
              </div>
            </div>

            <div className="rounded-[20px] bg-[#1e293b] p-6 text-white shadow-sm">
              <h3 className="mb-5 flex items-center gap-2 text-[17px] font-bold text-white">
                <i className="fa-solid fa-phone-volume text-blue-400"></i> Contact Info
              </h3>
              <div className="space-y-4">
                <ContactRow icon="fa-location-dot" text={`${university.location}, Nepal`} />
                <ContactRow icon="fa-envelope" text="info@tribhuvan.edu.np" />
                <ContactRow icon="fa-phone" text="+977-1-4330437" />
                <ContactRow icon="fa-globe" text={website} />
              </div>
              <button className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-[13.5px] font-bold text-white shadow-sm transition-colors hover:bg-blue-700">Get Directions</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusState: React.FC<{ text: string; tone: "default" | "error" }> = ({ text, tone }) => (
  <div className="min-h-screen bg-[#fafbfc] px-6 py-24 text-center">
    <p className={`text-[15px] font-semibold ${tone === "error" ? "text-red-600" : "text-gray-600"}`}>{text}</p>
  </div>
);

const MediaCard: React.FC<{ title: string; icon: string; image: string }> = ({ title, icon, image }) => (
  <div className="group relative h-[240px] w-full cursor-pointer overflow-hidden rounded-[24px] shadow-sm md:h-[300px]">
    <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 transition-colors duration-300 group-hover:bg-black/40">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 pl-1 shadow-[0_8px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
        <i className="fa-solid fa-play text-blue-600"></i>
      </div>
    </div>
    <div className="absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/30 to-transparent p-6 md:p-8">
      <h3 className="mb-1.5 flex items-center gap-2.5 text-[19px] font-bold text-white md:text-[21px]">
        <i className={`fa-solid ${icon} text-blue-400`}></i> {title}
      </h3>
      <p className="line-clamp-1 text-[14px] text-gray-200">{title === "VC's Message" ? "Listen to our Vice-Chancellor's welcome" : "Explore our beautiful university campus"}</p>
    </div>
  </div>
);

const InfoPanel: React.FC<{
  title: string;
  body: string;
  panelClass: string;
  iconClass: string;
  icon: string;
}> = ({ title, body, panelClass, iconClass, icon }) => (
  <div className={`${panelClass} rounded-[20px] p-8`}>
    <div className="mb-4 flex items-center gap-3.5">
      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconClass}`}>
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <h3 className="text-[16px] font-bold text-gray-900">{title}</h3>
    </div>
    <p className="text-[14.5px] leading-[1.7] text-gray-600">{body}</p>
  </div>
);

const OverviewRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col p-4 transition-colors hover:bg-gray-50 sm:flex-row">
    <div className="w-full text-[14px] font-semibold text-gray-800 sm:w-1/3">{label}</div>
    <div className="w-full text-[14px] text-gray-600 sm:w-2/3">{value}</div>
  </div>
);

const AdminRow: React.FC<{ position: string; role: string; holder: string }> = ({ position, role, holder }) => (
  <tr>
    <td className="px-6 py-4 font-bold text-gray-900">{position}</td>
    <td className="px-6 py-4">{role}</td>
    <td className="px-6 py-4 font-semibold">{holder}</td>
  </tr>
);

const FeatureCallout: React.FC<{
  title: string;
  body: string;
  cardClass: string;
  iconClass: string;
  icon: string;
}> = ({ title, body, cardClass, iconClass, icon }) => (
  <div className={`flex items-start gap-4 rounded-xl border p-5 ${cardClass}`}>
    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconClass}`}>
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div>
      <h4 className="text-[15px] font-bold text-gray-900">{title}</h4>
      <p className="mt-1 text-[14px] text-gray-600">{body}</p>
    </div>
  </div>
);

const FilterPills: React.FC<{
  active: LevelFilter;
  onChange: (value: LevelFilter) => void;
  options: LevelFilter[];
}> = ({ active, onChange, options }) => (
  <div className="flex gap-2 text-xs font-medium">
    {options.map((option) => (
      <button
        key={option}
        onClick={() => onChange(option)}
        className={`rounded-full px-4 py-1.5 ${
          active === option
            ? "bg-blue-600 text-white shadow-sm"
            : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        {option}
      </button>
    ))}
  </div>
);

const DropdownCard: React.FC<{
  title: string;
  icon: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  compact?: boolean;
  iconBg?: string;
  iconText?: string;
}> = ({
  title,
  icon,
  isOpen,
  onToggle,
  children,
  compact = false,
  iconBg = "bg-blue-50",
  iconText = "text-blue-600",
}) => (
  <div className="rounded-[16px] border border-gray-100 bg-white p-5 shadow-sm">
    <div className="flex cursor-pointer items-center justify-between" onClick={onToggle}>
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBg}`}>
          <i className={`fa-solid ${icon} ${iconText}`}></i>
        </div>
        <h4 className={`${compact ? "text-[15px]" : "text-[17px]"} font-bold text-gray-900`}>{title}</h4>
      </div>
      <i className={`fa-solid ${isOpen ? "fa-chevron-up" : "fa-chevron-down"} text-gray-500`}></i>
    </div>
    {isOpen && <div className={`${compact ? "mt-4" : "mt-6"}`}>{children}</div>}
  </div>
);

const ProgTh: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <th className="border-b border-[#e2e8f0] bg-[#f8fafc] px-2 py-[10px] text-left font-semibold text-[#1e293b]">{children}</th>
);

const ProgTd: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <td className="border-b border-[#f1f5f9] px-2 py-2 text-[#334155]">{children}</td>
);

const AdmissionCard: React.FC<{
  title: string;
  status: string;
  statusClass: string;
  image: string;
  faculty: string;
  admissionOpen: string;
  deadline: string;
  darkButton?: boolean;
}> = ({ title, status, statusClass, image, faculty, admissionOpen, deadline, darkButton = false }) => (
  <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
    <div className="relative h-[180px] w-full">
      <img src={image} className="h-full w-full object-cover" alt={title} />
    </div>
    <div className="flex flex-1 flex-col p-5">
      <div className="mb-3">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide ${statusClass}`}>
          <div className={`h-1.5 w-1.5 rounded-full ${status === "Ongoing" ? "bg-[#10b981]" : "bg-[#ef4444]"}`}></div>
          {status}
        </span>
      </div>
      <h3 className="mb-2 text-[17px] font-bold leading-tight text-gray-900">{title}</h3>
      <div className="mb-5 flex items-center gap-2 text-[12.5px] font-medium text-gray-500">
        <i className="fa-solid fa-building text-blue-500"></i>
        <span>Main Campus</span>
        <span className="text-gray-300">|</span>
        <span>{faculty}</span>
      </div>
      <div className="mb-5 flex items-center justify-between rounded-xl border border-gray-100 bg-[#f8fafc] p-4">
        <div>
          <div className="mb-1 flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div><span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Admission open</span></div>
          <p className="text-[13px] font-bold text-gray-900">{admissionOpen}</p>
        </div>
        <div className="text-right">
          <div className="mb-1 flex items-center justify-end gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-red-500"></div><span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">DEADLINE</span></div>
          <p className="text-[13px] font-bold text-gray-900">{deadline}</p>
        </div>
      </div>
      <div className="mt-auto flex items-center gap-3">
        <button className="flex-1 rounded-xl border border-gray-200 py-2.5 text-[13.5px] font-bold text-gray-700 transition-colors hover:bg-gray-50">Details</button>
        <button className={`flex-[1.5] rounded-xl py-2.5 text-[13.5px] font-bold text-white transition-colors ${darkButton ? "bg-[#111827] hover:bg-black" : "bg-blue-600 hover:bg-blue-700"}`}>Apply Now</button>
        <button className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl border border-gray-200 transition-colors hover:bg-gray-50">
          <i className="fa-regular fa-heart text-gray-600"></i>
        </button>
      </div>
    </div>
  </div>
);

const RatingBar: React.FC<{ label: string; value: string; width: string; color: string }> = ({ label, value, width, color }) => (
  <div className="flex items-center text-[13px] font-medium text-gray-600">
    <span className="w-12">{label}</span>
    <div className="mx-3 h-2 flex-grow rounded bg-[#f1f5f9]">
      <div className={`h-full rounded ${color}`} style={{ width }}></div>
    </div>
    <span className="w-10 text-right">{value}</span>
  </div>
);

const ReviewCard: React.FC<{
  initials: string;
  initialsClass: string;
  name: string;
  program: string;
  rating: number;
  body: string;
  className?: string;
}> = ({ initials, initialsClass, name, program, rating, body, className = "" }) => (
  <div className={`rounded-lg border border-gray-100 bg-[#fafafa] p-6 ${className}`}>
    <div className="mb-4 flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full text-[14px] font-bold ${initialsClass}`}>{initials}</div>
        <div>
          <h4 className="text-[15px] font-bold text-gray-900">{name}</h4>
          <p className="text-[12px] text-gray-500">{program}</p>
        </div>
      </div>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <i key={index} className={`${index < rating ? "fa-solid" : "fa-regular"} fa-star text-[12px] text-yellow-400`}></i>
        ))}
      </div>
    </div>
    <p className="text-[14px] leading-relaxed text-gray-600">{body}</p>
  </div>
);

const FactRow: React.FC<{ label: string; value: string; noBorder?: boolean }> = ({ label, value, noBorder }) => (
  <div className={`flex items-center justify-between ${noBorder ? "" : "border-b border-gray-50 pb-3"}`}>
    <span className="text-[13.5px] text-gray-500">{label}</span>
    <span className="text-[13.5px] font-bold text-gray-800">{value}</span>
  </div>
);

const ContactRow: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-3">
    <i className={`fa-solid ${icon} text-gray-400`}></i>
    <p className="text-[13.5px] text-gray-300">{text}</p>
  </div>
);

export default UniversityDetailsPage;

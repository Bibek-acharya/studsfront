import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiService, EducationCourse } from "../../../services/api";

interface CourseFinderPageProps {
  onNavigate: (view: any, data?: any) => void;
}

type FeeRangeOption = {
  key: string;
  label: string;
  min: number;
  max: number;
};

type CourseCard = {
  id: string;
  title: string;
  level: string;
  duration: string;
  stream: string;
  affiliation: string;
  eligibility: string;
  entrance: string;
  career: string;
  feeRaw: number;
  feeDisplay: string;
  status: "Admission Open" | "Entrance Ongoing" | "Closed";
  image: string;
  colorTheme: "blue" | "purple" | "emerald" | "orange";
};

const fallbackImages = [
  "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
];

const themes = {
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-700",
    hover: "group-hover:text-purple-600",
    btn: "bg-purple-600",
    btnHover: "hover:bg-purple-700",
    ring: "focus:ring-purple-200",
  },
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    hover: "group-hover:text-blue-600",
    btn: "bg-blue-600",
    btnHover: "hover:bg-blue-700",
    ring: "focus:ring-blue-200",
  },
  emerald: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    hover: "group-hover:text-emerald-600",
    btn: "bg-emerald-600",
    btnHover: "hover:bg-emerald-700",
    ring: "focus:ring-emerald-200",
  },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-700",
    hover: "group-hover:text-orange-600",
    btn: "bg-orange-600",
    btnHover: "hover:bg-orange-700",
    ring: "focus:ring-orange-200",
  },
} as const;

const statusDots: Record<CourseCard["status"], string> = {
  "Admission Open": "bg-green-500",
  "Entrance Ongoing": "bg-yellow-500",
  Closed: "bg-red-500",
};

const streamMapping: Record<string, string[]> = {
  "+2 (NEB)": ["Science", "Management", "Humanities", "Education", "Law"],
  Bachelor: [
    "Science",
    "Management",
    "IT / Computer Science",
    "Engineering",
    "Medical",
    "Law",
    "Humanities",
    "Education",
  ],
  Master: [
    "Science",
    "Management",
    "IT / Computer Science",
    "Engineering",
    "Medical",
    "Law",
    "Humanities",
    "Education",
  ],
  Diploma: ["Engineering", "Medical", "IT / Computer Science"],
};

const feeRangeOptions: FeeRangeOption[] = [
  { key: "below1", label: "Below 1 Lakh", min: 0, max: 100000 },
  { key: "1to3", label: "1–3 Lakhs", min: 100000, max: 300000 },
  { key: "3to6", label: "3–6 Lakhs", min: 300000, max: 600000 },
  { key: "6plus", label: "6+ Lakhs", min: 600000, max: Number.MAX_SAFE_INTEGER },
];

const levelOptions = ["+2 (NEB)", "Bachelor", "Master", "Diploma"];
const streamOptions = [
  "Science",
  "Management",
  "IT / Computer Science",
  "Engineering",
  "Medical",
  "Law",
  "Humanities",
  "Education",
];

const parseFee = (value?: string) => {
  if (!value) return 0;
  const text = value.toLowerCase().replace(/,/g, " ");
  const numbers = Array.from(text.matchAll(/\d+(?:\.\d+)?/g)).map((match) => Number(match[0]));
  if (numbers.length === 0) return 0;
  const hasLakh = /lakh|lac|l\b/.test(text);
  const hasK = /k\b/.test(text);
  const multiplier = hasLakh ? 100000 : hasK ? 1000 : 1;
  return Math.max(...numbers) * multiplier;
};

const detectStatus = (course: EducationCourse): CourseCard["status"] => {
  const token = [course.badges?.join(" "), course.highlights?.join(" "), course.description]
    .join(" ")
    .toLowerCase();

  if (token.includes("closed")) return "Closed";
  if (token.includes("entrance") || token.includes("ongoing")) return "Entrance Ongoing";
  return "Admission Open";
};

const detectLevel = (level: string): string => {
  const text = level.toLowerCase();
  if (text.includes("+2") || text.includes("higher") || text.includes("intermediate")) return "+2 (NEB)";
  if (text.includes("master")) return "Master";
  if (text.includes("diploma") || text.includes("ctevt")) return "Diploma";
  return "Bachelor";
};

const detectStream = (field: string): string => {
  const text = field.toLowerCase();
  if (text.includes("it") || text.includes("computer") || text.includes("software") || text.includes("data")) {
    return "IT / Computer Science";
  }
  if (text.includes("engineering")) return "Engineering";
  if (text.includes("medical") || text.includes("health") || text.includes("nursing")) return "Medical";
  if (text.includes("manage") || text.includes("business") || text.includes("commerce")) return "Management";
  if (text.includes("law")) return "Law";
  if (text.includes("education")) return "Education";
  if (text.includes("human")) return "Humanities";
  return "Science";
};

const getThemeByIndex = (index: number): CourseCard["colorTheme"] => {
  const list: CourseCard["colorTheme"][] = ["purple", "blue", "emerald", "orange", "blue", "purple"];
  return list[index % list.length];
};

const mapCourseToCard = (course: EducationCourse, index: number): CourseCard => {
  const highlights = Array.isArray(course.highlights) ? course.highlights : [];
  const entranceHighlight = highlights.find((item) => item.toLowerCase().includes("entrance"));
  const eligibilityHighlight = highlights.find((item) => item.toLowerCase().includes("eligib"));

  return {
    id: String(course.id || index + 1),
    title: course.title || "Course Program",
    level: detectLevel(course.level || ""),
    duration: course.duration || "-",
    stream: detectStream(course.field || ""),
    affiliation: course.affiliation || "Not specified",
    eligibility: eligibilityHighlight || "As per institution criteria",
    entrance: entranceHighlight || "As per college requirements",
    career: course.careerPath || "Academic and professional pathways",
    feeRaw: parseFee(course.estFee || course.privateFee || course.govtFee),
    feeDisplay: course.estFee || course.privateFee || course.govtFee || "N/A",
    status: detectStatus(course),
    image: fallbackImages[index % fallbackImages.length],
    colorTheme: getThemeByIndex(index),
  };
};

const CourseFinderPage: React.FC<CourseFinderPageProps> = ({ onNavigate }) => {
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedStreams, setSelectedStreams] = useState<string[]>([]);
  const [selectedAffiliations, setSelectedAffiliations] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedFeeRanges, setSelectedFeeRanges] = useState<string[]>([]);

  const [globalSearch, setGlobalSearch] = useState("");
  const [streamSearch, setStreamSearch] = useState("");
  const [affiliationSearch, setAffiliationSearch] = useState("");

  const [openSections, setOpenSections] = useState({
    level: true,
    stream: true,
    affiliation: false,
    fee: false,
    status: false,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["education-courses"],
    queryFn: () => apiService.getEducationCourses(),
  });

  const mappedCourses = useMemo(() => {
    const courses = (data?.data?.courses || []) as EducationCourse[];
    return courses.map(mapCourseToCard);
  }, [data]);

  const affiliations = useMemo(() => {
    return Array.from(new Set<string>(mappedCourses.map((item) => item.affiliation))).sort((a, b) =>
      a.localeCompare(b),
    );
  }, [mappedCourses]);

  const maxFeeBound = useMemo(() => {
    const max = mappedCourses.reduce((acc, item) => Math.max(acc, item.feeRaw), 1000000);
    return max > 0 ? Math.max(max, 1000000) : 1000000;
  }, [mappedCourses]);

  const [maxFee, setMaxFee] = useState(1000000);

  React.useEffect(() => {
    setMaxFee(maxFeeBound);
  }, [maxFeeBound]);

  const validStreams = useMemo(() => {
    if (selectedLevels.length === 0) return new Set(streamOptions);
    const union = new Set<string>();
    selectedLevels.forEach((level) => {
      (streamMapping[level] || []).forEach((stream) => union.add(stream));
    });
    return union;
  }, [selectedLevels]);

  React.useEffect(() => {
    setSelectedStreams((prev) => prev.filter((stream) => validStreams.has(stream)));
  }, [validStreams]);

  const filteredAffiliations = useMemo(() => {
    const term = affiliationSearch.trim().toLowerCase();
    if (!term) return affiliations;
    return affiliations.filter((name) => name.toLowerCase().includes(term));
  }, [affiliationSearch, affiliations]);

  const filteredStreams = useMemo(() => {
    const term = streamSearch.trim().toLowerCase();
    return streamOptions.filter((stream) => {
      if (!validStreams.has(stream)) return false;
      return !term || stream.toLowerCase().includes(term);
    });
  }, [streamSearch, validStreams]);

  const filteredCourses = useMemo(() => {
    const q = globalSearch.trim().toLowerCase();

    return mappedCourses.filter((course) => {
      if (q) {
        const hit =
          course.title.toLowerCase().includes(q) ||
          course.career.toLowerCase().includes(q) ||
          course.affiliation.toLowerCase().includes(q);
        if (!hit) return false;
      }

      if (selectedLevels.length > 0 && !selectedLevels.includes(course.level)) return false;
      if (selectedStreams.length > 0 && !selectedStreams.includes(course.stream)) return false;
      if (selectedAffiliations.length > 0 && !selectedAffiliations.includes(course.affiliation)) return false;
      if (selectedStatuses.length > 0 && !selectedStatuses.includes(course.status)) return false;

      if (course.feeRaw > maxFee) return false;

      if (selectedFeeRanges.length > 0) {
        const matched = feeRangeOptions
          .filter((range) => selectedFeeRanges.includes(range.key))
          .some((range) => course.feeRaw >= range.min && course.feeRaw <= range.max);
        if (!matched) return false;
      }

      return true;
    });
  }, [
    mappedCourses,
    globalSearch,
    selectedLevels,
    selectedStreams,
    selectedAffiliations,
    selectedStatuses,
    selectedFeeRanges,
    maxFee,
  ]);

  const formatLakhLabel = (value: number) => {
    if (value >= maxFeeBound) return `${(maxFeeBound / 100000).toFixed(1)}+ Lakhs`;
    return `${(value / 100000).toFixed(1)} Lakhs`;
  };

  const toggleArray = (
    value: string,
    selected: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const clearAllFilters = () => {
    setSelectedLevels([]);
    setSelectedStreams([]);
    setSelectedAffiliations([]);
    setSelectedStatuses([]);
    setSelectedFeeRanges([]);
    setGlobalSearch("");
    setStreamSearch("");
    setAffiliationSearch("");
    setMaxFee(maxFeeBound);
  };

  const activeFilterPills = [
    ...selectedLevels.map((value) => ({ label: value, remove: () => setSelectedLevels((prev) => prev.filter((v) => v !== value)) })),
    ...selectedStreams.map((value) => ({ label: value, remove: () => setSelectedStreams((prev) => prev.filter((v) => v !== value)) })),
    ...selectedAffiliations.map((value) => ({ label: value, remove: () => setSelectedAffiliations((prev) => prev.filter((v) => v !== value)) })),
    ...selectedStatuses.map((value) => ({ label: value, remove: () => setSelectedStatuses((prev) => prev.filter((v) => v !== value)) })),
    ...selectedFeeRanges.map((value) => {
      const found = feeRangeOptions.find((range) => range.key === value);
      return {
        label: found?.label || value,
        remove: () => setSelectedFeeRanges((prev) => prev.filter((v) => v !== value)),
      };
    }),
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 px-6">
        <div className="max-w-[1400px] mx-auto bg-white border border-gray-200 rounded-lg p-10 text-center text-gray-500 font-medium">
          Loading courses...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 pt-24">
      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <main className="max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row gap-8 items-start">
        <aside className="w-full lg:w-[300px] flex-shrink-0 bg-white rounded-lg border border-gray-200 h-fit sticky top-24">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white rounded-t-lg z-10">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <i className="fa-solid fa-sliders"></i> Filters
            </h3>
            <button
              onClick={clearAllFilters}
              className="text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors"
            >
              Clear All
            </button>
          </div>

          <div className="px-5 pb-6">
            <FilterAccordion
              title="Education Level"
              isOpen={openSections.level}
              onToggle={() => setOpenSections((prev) => ({ ...prev, level: !prev.level }))}
            >
              {levelOptions.map((level) => (
                <CheckboxItem
                  key={level}
                  label={level}
                  checked={selectedLevels.includes(level)}
                  onChange={() => toggleArray(level, selectedLevels, setSelectedLevels)}
                />
              ))}
            </FilterAccordion>

            <FilterAccordion
              title="Field of Study"
              isOpen={openSections.stream}
              onToggle={() => setOpenSections((prev) => ({ ...prev, stream: !prev.stream }))}
            >
              <div className="relative mb-3">
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  value={streamSearch}
                  onChange={(e) => setStreamSearch(e.target.value)}
                  placeholder="Search fields..."
                  className="w-full bg-gray-50 border border-gray-200 text-sm font-medium rounded-md pl-9 pr-3 h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              {filteredStreams.map((stream) => (
                <CheckboxItem
                  key={stream}
                  label={stream}
                  checked={selectedStreams.includes(stream)}
                  onChange={() => toggleArray(stream, selectedStreams, setSelectedStreams)}
                />
              ))}
            </FilterAccordion>

            <FilterAccordion
              title="Affiliation / University"
              isOpen={openSections.affiliation}
              onToggle={() => setOpenSections((prev) => ({ ...prev, affiliation: !prev.affiliation }))}
            >
              <div className="relative mb-3">
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  value={affiliationSearch}
                  onChange={(e) => setAffiliationSearch(e.target.value)}
                  placeholder="Search university..."
                  className="w-full bg-gray-50 border border-gray-200 text-sm font-medium rounded-md pl-9 pr-3 h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              {filteredAffiliations.map((affiliation) => (
                <CheckboxItem
                  key={affiliation}
                  label={affiliation}
                  checked={selectedAffiliations.includes(affiliation)}
                  onChange={() => toggleArray(affiliation, selectedAffiliations, setSelectedAffiliations)}
                />
              ))}
            </FilterAccordion>

            <FilterAccordion
              title="Fee Range"
              isOpen={openSections.fee}
              onToggle={() => setOpenSections((prev) => ({ ...prev, fee: !prev.fee }))}
            >
              <div className="px-1 space-y-4">
                <div className="flex justify-between text-xs text-gray-500 font-medium mb-2">
                  <span>Max Fee</span>
                  <span className="text-blue-600 font-bold">{formatLakhLabel(maxFee)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={maxFeeBound}
                  step={50000}
                  value={maxFee}
                  onChange={(e) => setMaxFee(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="h-px bg-gray-100 my-2"></div>

              {feeRangeOptions.map((range) => (
                <CheckboxItem
                  key={range.key}
                  label={range.label}
                  checked={selectedFeeRanges.includes(range.key)}
                  onChange={() => toggleArray(range.key, selectedFeeRanges, setSelectedFeeRanges)}
                />
              ))}
            </FilterAccordion>

            <FilterAccordion
              title="Admission Status"
              isOpen={openSections.status}
              onToggle={() => setOpenSections((prev) => ({ ...prev, status: !prev.status }))}
            >
              {(["Admission Open", "Entrance Ongoing", "Closed"] as const).map((status) => (
                <CheckboxItem
                  key={status}
                  label={status}
                  checked={selectedStatuses.includes(status)}
                  onChange={() => toggleArray(status, selectedStatuses, setSelectedStatuses)}
                />
              ))}
            </FilterAccordion>
          </div>
        </aside>

        <section className="flex-1 w-full min-w-0 flex flex-col">
          <div className="mb-5 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-5">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Showing {filteredCourses.length.toLocaleString()} Colleges
              </h1>
              <p className="mt-1 text-sm text-gray-500 font-medium">
                Explore and compare the best colleges tailored for you.
              </p>
            </div>

            <div className="relative w-full md:w-80 shrink-0">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
              <input
                type="text"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Search colleges, degrees..."
                className="w-full bg-white border border-gray-300 text-sm rounded-md pl-10 pr-4 h-11 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium"
              />
            </div>
          </div>

          <div className="mb-5 min-h-[32px]">
            {(activeFilterPills.length > 0 || maxFee < maxFeeBound) && (
              <div className="flex-wrap items-center gap-2 flex">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-1">
                  Active Filters:
                </span>

                <div className="flex flex-wrap gap-2">
                  {activeFilterPills.map((pill, index) => (
                    <button
                      key={`${pill.label}-${index}`}
                      onClick={pill.remove}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors"
                    >
                      {pill.label}
                      <i className="fa-solid fa-xmark text-[10px]"></i>
                    </button>
                  ))}

                  {maxFee < maxFeeBound && (
                    <button
                      onClick={() => setMaxFee(maxFeeBound)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors"
                    >
                      Max: Rs. {formatLakhLabel(maxFee)}
                      <i className="fa-solid fa-xmark text-[10px]"></i>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {filteredCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-lg border border-gray-200 border-dashed">
              <i className="fa-solid fa-magnifying-glass text-4xl text-gray-300 mb-3"></i>
              <h3 className="text-lg font-bold text-gray-900 mb-1">No colleges found</h3>
              <p className="text-sm text-gray-500 font-medium max-w-sm">
                Try adjusting your filters, clearing search terms, or removing tags to see more results.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-4 px-5 h-11 bg-blue-50 text-blue-700 rounded-md text-sm font-bold hover:bg-blue-100 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredCourses.map((course) => {
                const theme = themes[course.colorTheme];
                return (
                  <article
                    key={course.id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col group"
                  >
                    <div className="h-32 relative overflow-hidden bg-gray-200 shrink-0 border-b border-gray-100">
                      <img src={course.image} alt={course.title} className="w-full h-full object-cover" />

                      <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1.5 border border-gray-200">
                        <span className={`w-1.5 h-1.5 rounded-full ${statusDots[course.status]}`}></span>
                        <span className="text-[10px] font-bold text-gray-800 uppercase tracking-wide">
                          {course.status}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex justify-between items-center mb-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${theme.bg} ${theme.text}`}>
                          {course.level}
                        </span>
                        <div className="flex items-center text-gray-500 text-[11px] font-bold gap-1">
                          <i className="fa-regular fa-clock text-sm"></i>
                          <span>{course.duration}</span>
                        </div>
                      </div>

                      <h3
                        className={`text-base font-bold text-gray-900 mb-3 ${theme.hover} transition-colors line-clamp-2 leading-snug`}
                      >
                        {course.title}
                      </h3>

                      <div className="space-y-1.5 mb-5 text-xs font-medium text-gray-600 flex-1">
                        <div className="flex items-start gap-2">
                          <i className="fa-solid fa-building-columns text-gray-400 text-sm shrink-0 mt-[2px]"></i>
                          <p className="truncate" title={course.affiliation}>
                            <span className="font-bold text-gray-800">Affiliation:</span> {course.affiliation}
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <i className="fa-solid fa-graduation-cap text-gray-400 text-sm shrink-0 mt-[2px]"></i>
                          <p className="truncate" title={course.eligibility}>
                            <span className="font-bold text-gray-800">Eligibility:</span> {course.eligibility}
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <i className="fa-solid fa-clipboard-list text-gray-400 text-sm shrink-0 mt-[2px]"></i>
                          <p className="truncate" title={course.entrance}>
                            <span className="font-bold text-gray-800">Entrance:</span> {course.entrance}
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <i className="fa-solid fa-money-bill-wave text-gray-400 text-sm shrink-0 mt-[2px]"></i>
                          <p>
                            <span className="font-bold text-gray-800">Est. Fee:</span>{" "}
                            <span className="text-green-600 font-bold">{course.feeDisplay}</span>
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <i className="fa-solid fa-briefcase text-gray-400 text-sm shrink-0 mt-[2px]"></i>
                          <p className="truncate" title={course.career}>
                            <span className="font-bold text-gray-800">Career:</span> {course.career}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-100">
                        <button
                          onClick={() => onNavigate("courseDetails", { id: course.id })}
                          className="flex-1 h-10 border border-gray-300 rounded-md text-gray-700 font-bold text-xs hover:bg-gray-50 focus:ring-2 focus:ring-gray-100 outline-none transition-colors"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => onNavigate("courseDetails", { id: course.id })}
                          className={`flex-1 h-10 ${theme.btn} rounded-md text-white font-bold text-xs ${theme.btnHover} focus:ring-2 ${theme.ring} outline-none transition-colors`}
                        >
                          Apply
                        </button>
                        <button className="w-10 h-10 shrink-0 flex items-center justify-center border border-gray-300 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors outline-none focus:ring-2 focus:ring-red-100">
                          <i className="fa-regular fa-heart text-base"></i>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

const FilterAccordion: React.FC<{
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}> = ({ title, isOpen, onToggle, children }) => (
  <div className="py-4 border-b border-gray-100 last:border-b-0">
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center text-left font-semibold text-gray-800 focus:outline-none group"
    >
      {title}
      <i
        className={`fa-solid fa-caret-down text-gray-400 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
      ></i>
    </button>
    {isOpen && <div className="mt-4 space-y-3">{children}</div>}
  </div>
);

const CheckboxItem: React.FC<{ label: string; checked: boolean; onChange: () => void }> = ({
  label,
  checked,
  onChange,
}) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-[1.15em] h-[1.15em] rounded-[2px] border border-slate-300 text-blue-600 focus:ring-blue-500"
    />
    <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">{label}</span>
  </label>
);

export default CourseFinderPage;

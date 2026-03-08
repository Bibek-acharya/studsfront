import React, { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { apiService } from "../../../services/api";

interface Scholarship {
  id: number;
  title: string;
  provider: string;
  logoText: string;
  logoBg: string;
  location: string;
  type: string;
  amount: string;
  deadline: string;
  status: "OPEN" | "CLOSING SOON" | "CLOSED" | "SOON";
  category: string;
  image: string;
  tags: string[];
}

const defaultScholarshipList: Scholarship[] = [
  {
    id: 1,
    title: "Future Tech Leaders Grant",
    provider: "TechFoundation Global",
    logoText: "TG",
    logoBg: "bg-blue-600",
    location: "San Francisco, CA",
    type: "Merit-Based",
    amount: "$15,000",
    deadline: "Oct 15, 2024",
    status: "OPEN",
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
    tags: ["Technology", "GPA 3.5+"],
  },
  {
    id: 2,
    title: "Women in STEM Initiative",
    provider: "Global Science Alliance",
    logoText: "GS",
    logoBg: "bg-pink-600",
    location: "London, UK",
    type: "Full Tuition",
    amount: "$25,000",
    deadline: "Mar 01, 2024",
    status: "CLOSING SOON",
    category: "Science",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop",
    tags: ["Science", "Female Undergrad"],
  },
  {
    id: 3,
    title: "Community Arts Fund",
    provider: "National Arts Council",
    logoText: "NA",
    logoBg: "bg-purple-600",
    location: "New York, NY",
    type: "Grant",
    amount: "$5,000",
    deadline: "Jan 15, 2024",
    status: "CLOSED",
    category: "Arts",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop",
    tags: ["Arts", "Portfolio Required"],
  },
  {
    id: 4,
    title: "Global Health Fellowship",
    provider: "World Health Init.",
    logoText: "WH",
    logoBg: "bg-red-600",
    location: "Geneva, CH",
    type: "Fellowship",
    amount: "$30,000",
    deadline: "May 20, 2024",
    status: "OPEN",
    category: "Medical",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
    tags: ["Medical", "Post-Grad"],
  },
  {
    id: 5,
    title: "Sustainable Agriculture Grant",
    provider: "AgriFuture Labs",
    logoText: "AG",
    logoBg: "bg-green-700",
    location: "Chitwan, NP",
    type: "Research",
    amount: "Rs. 5 Lakhs",
    deadline: "Apr 10, 2024",
    status: "OPEN",
    category: "Agriculture",
    image:
      "https://images.unsplash.com/photo-1625246333131-ea87c974c958?q=80&w=2070&auto=format&fit=crop",
    tags: ["Agriculture", "Innovation"],
  },
  {
    id: 6,
    title: "Legal Justice Scholarship",
    provider: "Law & Justice Foundation",
    logoText: "LJ",
    logoBg: "bg-yellow-700",
    location: "Kathmandu, NP",
    type: "Need-Based",
    amount: "Full Tuition",
    deadline: "Feb 28, 2024",
    status: "SOON",
    category: "Law",
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2070&auto=format&fit=crop",
    tags: ["Law", "LLB/LLM"],
  },
];

const defaultCategories = [
  { id: "college", name: "College Based", count: 150 },
  { id: "school", name: "School Based", count: 85 },
  { id: "institutional", name: "Institutional", count: 210 },
  { id: "entrance", name: "Entrance", count: 45 },
  { id: "ngo", name: "NGO / INGO", count: 60 },
  { id: "merit", name: "Merit Based", count: 340 },
  { id: "need", name: "Need Based", count: 190 },
  { id: "research", name: "Research", count: 55 },
];

interface ScholarshipCategoryPageProps {
  onNavigate: (view: any, data?: any) => void;
}

const categoryAliases: Record<string, string[]> = {
  college: ["college", "college-based", "college based"],
  school: ["school", "school-based", "school based"],
  institutional: ["institutional", "institutional merit", "merit"],
  need: ["need", "institutional need", "need based", "need-based"],
  entrance: ["entrance"],
  ngo: ["ngo", "ingo", "ngo / ingo", "ngo/ingo"],
  departmental: ["departmental", "department"],
  "fee-waiver": ["fee-waiver", "fee waiver", "waiver", "tuition waiver"],
  research: ["research"],
};

const resolveCategoryId = (rawCategory?: string): string | null => {
  if (!rawCategory) return null;
  const normalized = rawCategory.trim().toLowerCase();
  if (!normalized) return null;

  if (categoryAliases[normalized]) {
    return normalized;
  }

  for (const [id, aliases] of Object.entries(categoryAliases)) {
    if (aliases.some((alias) => normalized === alias || normalized.includes(alias))) {
      return id;
    }
  }

  return null;
};

const ScholarshipCategoryPage: React.FC<ScholarshipCategoryPageProps> = ({
  onNavigate,
}) => {
  const location = useLocation();
  const preselectedCategory = useMemo(
    () => resolveCategoryId((location.state as { category?: string } | null)?.category),
    [location.state],
  );

  const [selectedCategory, setSelectedCategory] = useState(preselectedCategory || "college");
  const [likedScholarships, setLikedScholarships] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [locationSearch, setLocationSearch] = useState("");
  const [sortBy, setSortBy] = useState("deadline");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (preselectedCategory) {
      setSelectedCategory(preselectedCategory);
    }
  }, [preselectedCategory]);

  const toggleSelection = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  };

  const resetFilters = () => {
    setSelectedTypes([]);
    setSelectedLocations([]);
    setSelectedLevels([]);
    setLocationSearch("");
    setSortBy("deadline");
    setSelectedCategory("college");
  };

  const { data: scholarshipsResponse } = useQuery({
    queryKey: [
      "education-scholarships",
      selectedCategory,
      selectedTypes,
      selectedLocations,
      selectedLevels,
      sortBy,
    ],
    queryFn: () =>
      apiService.getEducationScholarships({
        category: selectedCategory,
        type: selectedTypes.join(","),
        location: selectedLocations.join(","),
        level: selectedLevels.join(","),
        sort: sortBy,
      }),
  });

  const scholarshipList = useMemo(() => {
    if (!scholarshipsResponse?.data?.scholarships?.length) {
      return defaultScholarshipList;
    }

    return scholarshipsResponse.data.scholarships.map((scholarship: any) => ({
      id: scholarship.id,
      title: scholarship.title,
      provider: scholarship.provider,
      logoText: scholarship.logoText || scholarship.initials || "SC",
      logoBg: scholarship.logoBg || scholarship.logoColor || "bg-blue-600",
      location: scholarship.location || "Nepal",
      type: scholarship.type || scholarship.funding_type || "Scholarship",
      amount: scholarship.amount || scholarship.value || "TBD",
      deadline: scholarship.deadline || "TBD",
      status: scholarship.status || "OPEN",
      category: scholarship.category || scholarship.scholarship_type || "General",
      image:
        scholarship.image ||
        scholarship.image_url ||
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
      tags:
        scholarship.tags ||
        [
          scholarship.category || scholarship.scholarship_type || "General",
          scholarship.degree_level || scholarship.eligibility || "All Levels",
        ],
    })) as Scholarship[];
  }, [scholarshipsResponse]);

  const categories =
    scholarshipsResponse?.data?.categories?.length
      ? scholarshipsResponse.data.categories.map((category: any) => ({
          id: category.id,
          name: category.name || category.title,
          count: category.count || 0,
        }))
      : defaultCategories;

  const scholarshipTypes = [
    "Fully Funded",
    "Partial Tuition",
    "Fee Waiver",
    "Need Based",
    "Merit Scholarship",
    "Grant",
  ];

  const availableLocations = useMemo(() => {
    const unique = Array.from(new Set(scholarshipList.map((s) => s.location))).filter(Boolean);
    return unique.sort();
  }, [scholarshipList]);

  const filteredLocations = useMemo(() => {
    if (!locationSearch.trim()) return availableLocations;
    const q = locationSearch.toLowerCase();
    return availableLocations.filter((location) => location.toLowerCase().includes(q));
  }, [availableLocations, locationSearch]);

  const displayedScholarships = useMemo(() => {
    let list = [...scholarshipList];

    if (selectedTypes.length) {
      list = list.filter((item) =>
        selectedTypes.some((type) => item.type.toLowerCase().includes(type.toLowerCase())),
      );
    }

    if (selectedLocations.length) {
      list = list.filter((item) =>
        selectedLocations.some((location) =>
          item.location.toLowerCase().includes(location.toLowerCase()),
        ),
      );
    }

    if (selectedLevels.length) {
      list = list.filter((item) =>
        selectedLevels.some((level) =>
          item.tags.some((tag) => tag.toLowerCase().includes(level.toLowerCase())),
        ),
      );
    }

    return list;
  }, [scholarshipList, selectedTypes, selectedLocations, selectedLevels]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 240;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const toggleLike = (id: number) => {
    setLikedScholarships((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900 pt-20">
      {/* HERO SECTION: CAROUSEL */}
      <div className="w-full max-w-[1400px] mx-auto mt-8 md:mt-12 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 pl-1 tracking-tight">
          Scholarships actively opening
        </h2>

        <div className="relative py-8 group/carousel">
          {/* The Background Strip */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-32 bg-[#F0F6FF] rounded-xl"></div>

          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-700 w-10 h-10 rounded-full shadow-md border border-gray-100 flex items-center justify-center transition-all md:opacity-0 md:group-hover/carousel:opacity-100 transform hover:scale-105 active:scale-95"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-700 w-10 h-10 rounded-full shadow-md border border-gray-100 flex items-center justify-center transition-all md:opacity-0 md:group-hover/carousel:opacity-100 transform hover:scale-105 active:scale-95"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>

          {/* Scrollable Track */}
          <div
            ref={scrollContainerRef}
            className="relative z-10 flex gap-4 md:gap-5 overflow-x-auto no-scrollbar scroll-smooth px-4 md:px-12 py-3"
          >
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-none w-44 md:w-52 bg-white rounded-lg px-5 py-4 shadow-sm cursor-pointer flex flex-col justify-center h-24 relative overflow-hidden transition-all duration-300 border-2 ${
                  selectedCategory === cat.id
                    ? "border-blue-600 shadow-lg"
                    : "border-gray-100 hover:border-blue-200 hover:shadow-md"
                }`}
              >
                {selectedCategory === cat.id && (
                  <div className="absolute top-2 right-2 text-blue-600 animate-fadeIn">
                    <i className="fa-solid fa-circle-check text-xl bg-white rounded-full"></i>
                  </div>
                )}
                <h3
                  className={`text-base md:text-lg font-bold mb-1 leading-tight transition-colors ${
                    selectedCategory === cat.id
                      ? "text-gray-900"
                      : "text-gray-700"
                  }`}
                >
                  {cat.name}
                </h3>
                <p className="text-blue-600 font-bold text-xs flex items-center">
                  {cat.count} Openings{" "}
                  <i className="fa-solid fa-chevron-right text-[10px] ml-1"></i>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN LISTING SECTION */}
      <div className="w-full max-w-[1400px] mx-auto mt-8 px-4 pb-16">
        <div className="flex flex-col md:flex-row gap-6">
          {/* LEFT COLUMN: FILTERS */}
          <aside className="w-full md:w-1/4 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-24">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <h3 className="font-bold text-lg text-gray-900">Filters</h3>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full cursor-pointer hover:bg-blue-100 transition-colors"
                >
                  Reset
                </button>
              </div>

              {/* Scholarship Type */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3 text-sm">
                  Scholarship Type
                </h4>
                <div className="space-y-2">
                  {[
                    "Fully Funded",
                    "Partial Tuition",
                    "Fee Waiver",
                    "Need Based",
                  ].map((type) => (
                    <label
                      key={type}
                      className="flex items-center space-x-3 cursor-pointer group"
                    >
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(type)}
                          onChange={() => toggleSelection(type, setSelectedTypes)}
                          className="peer appearance-none w-4 h-4 border border-gray-300 rounded checked:bg-blue-600 checked:border-blue-600 transition-all"
                        />
                        <i className="fa-solid fa-check absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5 top-0.5 text-[10px]"></i>
                      </div>
                      <span className="text-gray-600 text-sm group-hover:text-blue-600 transition-colors">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3 text-sm">
                  Location
                </h4>
                <div className="relative mb-3">
                  <input
                    type="text"
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    placeholder="Search city..."
                    className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 transition-all"
                  />
                  <i className="fa-solid fa-magnifying-glass w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5"></i>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto no-scrollbar">
                  {filteredLocations.map((city) => (
                    <label
                      key={city}
                      className="flex items-center space-x-3 cursor-pointer group"
                    >
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedLocations.includes(city)}
                          onChange={() =>
                            toggleSelection(city, setSelectedLocations)
                          }
                          className="peer appearance-none w-4 h-4 border border-gray-300 rounded checked:bg-blue-600 checked:border-blue-600 transition-all"
                        />
                        <i className="fa-solid fa-check absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5 top-0.5 text-[10px]"></i>
                      </div>
                      <span className="text-gray-600 text-sm group-hover:text-blue-600 transition-colors">
                        {city}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Level of Study */}
              <div>
                <button className="flex justify-between items-center w-full text-left font-semibold text-gray-800 text-sm hover:text-blue-600 transition-colors mb-3">
                  <span>Level of Study</span>
                  <i className="fa-solid fa-chevron-down text-gray-500 text-xs"></i>
                </button>
                <div className="space-y-2">
                  {["Plus Two (+2)", "Bachelors", "Masters", "PhD"].map(
                    (level) => (
                      <label
                        key={level}
                        className="flex items-center space-x-3 cursor-pointer group"
                      >
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedLevels.includes(level)}
                            onChange={() =>
                              toggleSelection(level, setSelectedLevels)
                            }
                            className="peer appearance-none w-4 h-4 border border-gray-300 rounded checked:bg-blue-600 checked:border-blue-600 transition-all"
                          />
                          <i className="fa-solid fa-check absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5 top-0.5 text-[10px]"></i>
                        </div>
                        <span className="text-gray-600 text-sm group-hover:text-blue-600 transition-colors">
                          {level}
                        </span>
                      </label>
                    ),
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: LISTING */}
          <main className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-gray-600 font-medium">
                Showing <span className="font-bold text-gray-900">{displayedScholarships.length}</span>{" "}
                scholarships
              </h3>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border-none bg-transparent font-medium text-gray-900 focus:ring-0 cursor-pointer p-0 pr-2"
                >
                  <option value="deadline">Deadline (Soonest)</option>
                  <option value="latest">Latest Posted</option>
                  <option value="title">Alphabetical</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {displayedScholarships.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full group border border-slate-100 hover:border-blue-500/20"
                >
                  <div className="h-56 w-full bg-gray-100 relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block bg-white/95 backdrop-blur-md text-slate-800 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.1em] shadow-lg">
                        {item.type}
                      </span>
                    </div>
                  </div>

                  <div className="p-7 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-2xl ${item.logoBg} flex items-center justify-center text-white text-sm font-black shadow-lg`}
                        >
                          {item.logoText}
                        </div>
                        <div>
                          <h5 className="font-black text-base text-slate-900 flex items-center gap-2 leading-tight uppercase tracking-tight">
                            {item.provider}
                            <i className="fa-solid fa-circle-check text-primary-500 text-xs"></i>
                          </h5>
                          <p className="text-[10px] text-slate-400 mt-1 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                            <i className="fa-solid fa-location-dot"></i>{" "}
                            {item.location}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          item.status === "OPEN"
                            ? "bg-emerald-50 text-emerald-600"
                            : item.status === "CLOSING SOON"
                              ? "bg-orange-50 text-orange-600"
                              : item.status === "SOON"
                                ? "bg-blue-50 text-blue-600"
                                : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            item.status === "OPEN"
                              ? "bg-green-500"
                              : item.status === "CLOSING SOON"
                                ? "bg-orange-500"
                                : item.status === "SOON"
                                  ? "bg-blue-500"
                                  : "bg-gray-400"
                          }`}
                        />
                        {item.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-5 leading-tight uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg uppercase tracking-widest border border-blue-100/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-slate-50 mt-auto">
                      <div>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1.5">
                          Award
                        </p>
                        <p className="text-2xl font-black text-blue-600 tracking-tighter">
                          {item.amount}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1.5">
                          Deadline
                        </p>
                        <p className="text-sm font-black text-slate-900 uppercase tracking-tight mt-1">
                          {item.deadline}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-auto">
                      <button
                        onClick={() =>
                          onNavigate("scholarshipHubDetails", {
                            id: item.id.toString(),
                          })
                        }
                        className="flex-1 py-4 rounded-xl bg-slate-50 text-[11px] font-black text-slate-700 hover:bg-slate-100 transition-all uppercase tracking-widest"
                      >
                        Details
                      </button>
                      <button
                        onClick={() =>
                          onNavigate("scholarshipInquiry", {
                            id: item.id.toString(),
                            scholarshipName: item.title,
                            scholarshipType: item.type,
                          })
                        }
                        className="flex-1 py-4 rounded-xl bg-slate-900 text-[11px] font-black text-white hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 uppercase tracking-widest"
                      >
                        Apply Now
                      </button>
                      <button
                        onClick={() => toggleLike(item.id)}
                        className={`p-4 rounded-2xl transition-all ${
                          likedScholarships.includes(item.id)
                            ? "bg-red-50 text-red-500 shadow-inner"
                            : "bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500"
                        }`}
                      >
                        <i
                          className={`${likedScholarships.includes(item.id) ? "fa-solid" : "fa-regular"} fa-heart text-base`}
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-10 flex justify-center items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 transition-all">
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white font-semibold shadow-md">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-all">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-all">
                3
              </button>
              <span className="text-gray-400 px-1">...</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-all">
                8
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 transition-all">
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </main>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ScholarshipCategoryPage;

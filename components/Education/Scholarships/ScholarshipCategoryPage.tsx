import React, { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { apiService } from "../../../services/api";
import ScholarshipListCard, { ScholarshipCardItem } from "./ScholarshipListCard";
import ScholarshipApplicationPage from "./ScholarshipApplicationPage";

interface ScholarshipCategoryPageProps {
  onNavigate: (view: any, data?: any) => void;
}

type ApplicationSelection = {
  id: string;
  scholarshipName: string;
  scholarshipType: string;
};

type CategoryItem = {
  id: string;
  name: string;
  count: number;
};

const defaultCategories: CategoryItem[] = [
  { id: "college", name: "College Based", count: 150 },
  { id: "school", name: "School Based", count: 85 },
  { id: "institutional", name: "Institutional", count: 210 },
  { id: "entrance", name: "Entrance", count: 45 },
  { id: "ngo", name: "NGO / INGO", count: 60 },
  { id: "merit", name: "Merit Based", count: 340 },
  { id: "need", name: "Need Based", count: 190 },
  { id: "research", name: "Research", count: 55 },
];

const fallbackScholarships: ScholarshipCardItem[] = [
  {
    id: 1,
    title: "National IT Excellence Scholarship (BSc. CSIT)",
    provider: "Tribhuvan University, Nepal",
    type: "Merit-Based",
    status: "OPEN",
    amount: "100% Tuition",
    location: "Bagmati",
    eligibility: "Bachelor (+2 Sci: 2.8+ GPA)",
    deadline: "Aug 15, 2026",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    verified: true,
  },
  {
    id: 2,
    title: "Women in Engineering Tech Grant",
    provider: "Kathmandu University",
    type: "Female Only",
    status: "CLOSING SOON",
    amount: "Rs. 50k + Hostel",
    location: "Kavre, Bagmati",
    eligibility: "Bachelor (Female, 3.0+ GPA)",
    deadline: "This Friday",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    verified: true,
  },
  {
    id: 3,
    title: "MEXT Japan: Tech & Research",
    provider: "Embassy of Japan in Nepal",
    type: "Fully Funded",
    status: "OPEN",
    amount: "Airfare + Living",
    location: "Japan (Various)",
    eligibility: "Master/PhD (Science)",
    deadline: "Sep 30, 2026",
    image:
      "https://mcm.edu.ph/wp-content/uploads/2024/09/Scholarships-in-the-Philippines-1024x597.jpg",
    verified: true,
  },
];

const featuredCollegeScholarships = [
  {
    id: 101,
    college: "Kathmandu Model College",
    location: "Bagbazar, Kathmandu",
    title: "National IT Excellence Scholarship (BSc. CSIT)",
    description:
      "Up to 100% tuition waiver for outstanding tech students based on merit and entrance performance.",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    buttonClass: "bg-[#2563eb] hover:bg-blue-700",
  },
  {
    id: 102,
    college: "Islington College",
    location: "Kamalpokhari, Kathmandu",
    title: "National IT Excellence Scholarship (BSc. CSIT)",
    description:
      "Exclusive financial aid packages for innovative minds demonstrating exceptional programming potential.",
    image:
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    buttonClass: "bg-[#10b981] hover:bg-emerald-600",
  },
  {
    id: 103,
    college: "Global College of Mgmt",
    location: "Baneshwor, Kathmandu",
    title: "National IT Excellence Scholarship (BSc. CSIT)",
    description:
      "Empowering future IT leaders with comprehensive grants and need-based educational funding.",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    buttonClass: "bg-[#a855f7] hover:bg-purple-600",
  },
  {
    id: 104,
    college: "Softwarica College",
    location: "Dillibazar, Kathmandu",
    title: "National IT Excellence Scholarship (BSc. CSIT)",
    description:
      "Special merit-based awards encouraging top-tier students to pursue advanced computing degrees.",
    image:
      "https://images.unsplash.com/photo-1592284988358-1f547c8d9fb8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    buttonClass: "bg-[#f97316] hover:bg-orange-600",
  },
];

const categoryAliases: Record<string, string[]> = {
  college: ["college", "college-based", "college based"],
  school: ["school", "school-based", "school based"],
  institutional: ["institutional", "institutional merit", "merit"],
  need: ["need", "institutional need", "need based", "need-based"],
  entrance: ["entrance"],
  ngo: ["ngo", "ingo", "ngo / ingo", "ngo/ingo"],
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

const ScholarshipsCategoryPage: React.FC<ScholarshipCategoryPageProps> = ({ onNavigate }) => {
  const location = useLocation();
  const preselectedCategory = useMemo(
    () => resolveCategoryId((location.state as { category?: string } | null)?.category),
    [location.state],
  );

  const [selectedCategory, setSelectedCategory] = useState(preselectedCategory || "college");
  const [bookmarkedScholarships, setBookmarkedScholarships] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Closing Soonest");

  const [selectedEducationLevels, setSelectedEducationLevels] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedFundingTypes, setSelectedFundingTypes] = useState<string[]>([]);
  const [selectedProviderTypes, setSelectedProviderTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedDeadlines, setSelectedDeadlines] = useState<string[]>([]);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [applicationSelection, setApplicationSelection] = useState<ApplicationSelection | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (preselectedCategory) {
      setSelectedCategory(preselectedCategory);
    }
  }, [preselectedCategory]);

  const { data: scholarshipsResponse } = useQuery({
    queryKey: [
      "education-scholarships",
      selectedCategory,
      sortBy,
      selectedEducationLevels,
      selectedFields,
      selectedFundingTypes,
      selectedProviderTypes,
      selectedLocations,
      selectedDeadlines,
    ],
    queryFn: () =>
      apiService.getEducationScholarships({
        category: selectedCategory,
        sort:
          sortBy === "Closing Soonest"
            ? "deadline"
            : sortBy === "Newest First"
              ? "latest"
              : "amount",
        type: selectedFundingTypes.join(","),
        location: selectedLocations.join(","),
        level: selectedEducationLevels.join(","),
      }),
  });

  const categories: CategoryItem[] =
    scholarshipsResponse?.data?.categories?.length
      ? scholarshipsResponse.data.categories.map((category: any) => ({
          id: String(category.id || category.name || "general").toLowerCase().replace(/\s+/g, "-"),
          name: category.name || category.title || "General",
          count: Number(category.count || 0),
        }))
      : defaultCategories;

  const mappedScholarships = useMemo<ScholarshipCardItem[]>(() => {
    const list = scholarshipsResponse?.data?.scholarships;
    if (!list?.length) {
      return fallbackScholarships;
    }

    return list.map((item: any, index: number) => ({
      id: item.id || index + 1,
      title: item.title || "Scholarship Opportunity",
      provider: item.provider || item.organization || "Scholarship Provider",
      type: item.type || item.funding_type || item.category || "Scholarship",
      status: item.status || "OPEN",
      amount: item.amount || item.value || "TBD",
      location: item.location || "Nepal",
      eligibility: item.eligibility || item.degree_level || "All eligible students",
      deadline: item.deadline || "TBD",
      image:
        item.image ||
        item.image_url ||
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop",
      verified: item.verified !== false,
    }));
  }, [scholarshipsResponse]);

  const filteredScholarships = useMemo(() => {
    let list = [...mappedScholarships];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.provider.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q),
      );
    }

    if (verifiedOnly) {
      list = list.filter((item) => item.verified !== false);
    }

    if (selectedFundingTypes.length) {
      list = list.filter((item) =>
        selectedFundingTypes.some((type) =>
          item.type.toLowerCase().includes(type.toLowerCase()),
        ),
      );
    }

    if (selectedLocations.length) {
      list = list.filter((item) =>
        selectedLocations.some((loc) => item.location.toLowerCase().includes(loc.toLowerCase())),
      );
    }

    if (selectedDeadlines.length) {
      list = list.filter((item) =>
        selectedDeadlines.some((d) => item.status.toLowerCase().includes(d.toLowerCase())),
      );
    }

    if (sortBy === "Closing Soonest") {
      list.sort((a, b) => {
        const ad = Date.parse(a.deadline);
        const bd = Date.parse(b.deadline);
        if (Number.isNaN(ad) && Number.isNaN(bd)) return 0;
        if (Number.isNaN(ad)) return 1;
        if (Number.isNaN(bd)) return -1;
        return ad - bd;
      });
    } else if (sortBy === "Highest Value") {
      list.sort((a, b) => extractAmount(b.amount) - extractAmount(a.amount));
    }

    return list;
  }, [
    mappedScholarships,
    searchQuery,
    verifiedOnly,
    selectedFundingTypes,
    selectedLocations,
    selectedDeadlines,
    sortBy,
  ]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setVerifiedOnly(false);
    setSortBy("Closing Soonest");
    setSelectedEducationLevels([]);
    setSelectedFields([]);
    setSelectedFundingTypes([]);
    setSelectedProviderTypes([]);
    setSelectedLocations([]);
    setSelectedDeadlines([]);
  };

  const toggleMultiSelect = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  const toggleBookmark = (id: number) => {
    setBookmarkedScholarships((prev) =>
      prev.includes(id) ? prev.filter((entry) => entry !== id) : [...prev, id],
    );
  };

  const scrollCategories = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const amount = 260;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const openApplicationModal = (selection: ApplicationSelection) => {
    setApplicationSelection(selection);
    setIsApplicationModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-20 text-gray-900">
      <style>{`
        details > summary::-webkit-details-marker { display: none; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .scholarship-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .scholarship-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <div className="mx-auto mt-8 w-full max-w-[90rem] px-4 lg:mt-12 lg:px-8">
        <h2 className="mb-6 pl-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          Scholarships actively opening
        </h2>

        <div className="group/carousel relative py-6">
          <div className="absolute left-0 right-0 top-1/2 z-0 mx-2 h-32 -translate-y-1/2 rounded-2xl border border-blue-100/50 bg-blue-50/80 md:mx-4"></div>

          <button
            onClick={() => scrollCategories("left")}
            className="absolute -left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-600 shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all hover:scale-105 hover:bg-slate-50 active:scale-95 md:left-2 md:opacity-0 md:group-hover/carousel:opacity-100"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            onClick={() => scrollCategories("right")}
            className="absolute -right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-600 shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all hover:scale-105 hover:bg-slate-50 active:scale-95 md:right-2 md:opacity-0 md:group-hover/carousel:opacity-100"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>

          <div
            ref={scrollContainerRef}
            className="no-scrollbar relative z-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 py-4 md:gap-5 md:px-12"
          >
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`snap-center relative flex h-28 w-48 flex-none cursor-pointer flex-col justify-center rounded-2xl bg-white px-4 py-3 transition-all duration-300 hover:-translate-y-1 md:w-56 md:px-5 ${
                  selectedCategory === cat.id
                    ? "border-2 border-blue-600 shadow-lg"
                    : "border border-slate-200 shadow-sm hover:border-blue-200 hover:shadow-lg"
                }`}
              >
                {selectedCategory === cat.id && (
                  <div className="absolute right-2.5 top-2.5 rounded-full bg-blue-50 p-0.5 text-blue-600">
                    <i className="fa-solid fa-circle-check text-base"></i>
                  </div>
                )}
                <h3 className="mt-1 pr-6 text-sm font-bold leading-tight text-slate-900 md:text-base">
                  {cat.name}
                </h3>
                <p className="mt-1 flex items-center text-xs font-semibold text-blue-600 md:text-sm">
                  {cat.count} Openings
                  <i className="fa-solid fa-chevron-right ml-1 text-[10px]"></i>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[90rem] flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
        <aside className="w-full flex-shrink-0 lg:w-72">
          <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="rounded-t-xl border-b border-gray-100 bg-white p-4">
              <h3 className="mb-3 text-lg font-bold text-gray-900">Filters</h3>

              <div className="relative">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search scholarships..."
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-sm text-gray-400"></i>
              </div>

              <label className="mt-4 flex cursor-pointer items-center justify-between rounded-lg border border-blue-100 bg-blue-50/50 p-2.5">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-blue-800">
                  <i className="fa-solid fa-circle-check text-sm text-[#1877F2]"></i>
                  Verified Partners Only
                </span>
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600"
                />
              </label>
            </div>

            <div className="p-4">
              <FilterSection title="Education Level" defaultOpen>
                {[
                  "SEE / +2",
                  "Bachelor",
                  "Master",
                  "PhD",
                  "Diploma / CTEVT",
                  "Short Courses",
                  "Other",
                ].map((item) => (
                  <CheckboxItem
                    key={item}
                    label={item}
                    checked={selectedEducationLevels.includes(item)}
                    onChange={() => toggleMultiSelect(item, setSelectedEducationLevels)}
                  />
                ))}
              </FilterSection>

              <FilterSection title="Field of Study">
                {[
                  "Science",
                  "Management / Business",
                  "Humanities",
                  "Education",
                  "Engineering",
                  "IT / Computer Science",
                  "Medical / Nursing",
                  "Agriculture",
                  "Law",
                  "Any Field",
                ].map((item) => (
                  <CheckboxItem
                    key={item}
                    label={item}
                    checked={selectedFields.includes(item)}
                    onChange={() => toggleMultiSelect(item, setSelectedFields)}
                  />
                ))}
              </FilterSection>

              <FilterSection title="Scholarship Funding">
                {[
                  "Merit-Based",
                  "Need-Based",
                  "Fully Funded",
                  "Partial Funding",
                  "Tuition Only",
                  "Living Expenses Included",
                ].map((item) => (
                  <CheckboxItem
                    key={item}
                    label={item}
                    checked={selectedFundingTypes.includes(item)}
                    onChange={() => toggleMultiSelect(item, setSelectedFundingTypes)}
                  />
                ))}
              </FilterSection>

              <FilterSection title="Provider Type">
                {[
                  "Government of Nepal",
                  "Nepal University / College",
                  "Private College Scholarship",
                  "Foreign Government",
                  "Foreign NGO / INGO",
                ].map((item) => (
                  <CheckboxItem
                    key={item}
                    label={item}
                    checked={selectedProviderTypes.includes(item)}
                    onChange={() => toggleMultiSelect(item, setSelectedProviderTypes)}
                  />
                ))}
              </FilterSection>

              <FilterSection title="Location (Nepal)">
                {["Bagmati", "Madhesh", "Gandaki", "Lumbini", "Karnali", "Sudurpashchim"].map((item) => (
                  <CheckboxItem
                    key={item}
                    label={item}
                    checked={selectedLocations.includes(item)}
                    onChange={() => toggleMultiSelect(item, setSelectedLocations)}
                  />
                ))}
              </FilterSection>

              <FilterSection title="Deadline">
                {[
                  "OPEN",
                  "CLOSING SOON",
                  "THIS MONTH",
                  "UPCOMING",
                ].map((item) => (
                  <CheckboxItem
                    key={item}
                    label={item}
                    checked={selectedDeadlines.includes(item)}
                    onChange={() => toggleMultiSelect(item, setSelectedDeadlines)}
                  />
                ))}
              </FilterSection>
            </div>

            <div className="rounded-b-xl border-t border-gray-100 bg-white p-4">
              <button
                onClick={clearAllFilters}
                className="w-full rounded-lg bg-gray-100 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-200"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h1 className="leading-tight text-2xl font-bold text-gray-900">
                Scholarships in IT & Engineering
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Showing {filteredScholarships.length} results matching your criteria
              </p>
            </div>
            <div className="hidden gap-2 text-sm sm:flex">
              <span className="text-gray-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="cursor-pointer bg-transparent font-medium focus:outline-none"
              >
                <option>Closing Soonest</option>
                <option>Newest First</option>
                <option>Highest Value</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredScholarships.map((item) => (
              <ScholarshipListCard
                key={item.id}
                item={item}
                isBookmarked={bookmarkedScholarships.includes(item.id)}
                onToggleBookmark={toggleBookmark}
                onDetails={(id) => onNavigate("scholarshipHubDetails", { id: id.toString() })}
                onApply={(id, title, type) =>
                  openApplicationModal({
                    id: id.toString(),
                    scholarshipName: title,
                    scholarshipType: type,
                  })
                }
              />
            ))}
          </div>

          <div className="mt-8 w-full rounded-[20px] bg-[#f4f7fe] p-6 shadow-sm md:p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="mb-1.5 text-[22px] font-bold text-[#1e293b]">
                  Featured College Scholarships
                </h2>
                <p className="text-[15px] text-gray-600">
                  Admissions Open for 2026 Intake. Apply directly for scholarships.
                </p>
              </div>
              <div className="hidden sm:block">
                <span className="rounded-full border border-blue-100 bg-white px-4 py-1.5 text-[13px] font-medium text-[#3b82f6]">
                  Promoted
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {featuredCollegeScholarships.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative h-36">
                    <img src={item.image} alt={item.college} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-3 left-4 flex items-center">
                      <h3 className="text-[15px] font-bold leading-tight text-white drop-shadow-md">
                        {item.college}
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-grow flex-col p-4">
                    <div className="mb-2 flex items-center gap-1.5 text-[13px] text-gray-500">
                      <i className="fa-solid fa-location-dot text-[13px] text-red-400"></i>
                      {item.location}
                    </div>
                    <h4 className="mb-1.5 text-[14px] font-bold leading-snug text-gray-900">
                      {item.title}
                    </h4>
                    <p className="line-clamp-2 mb-5 text-[12px] leading-relaxed text-gray-600">
                      {item.description}
                    </p>
                    <button
                      onClick={() =>
                        openApplicationModal({
                          id: item.id.toString(),
                          scholarshipName: item.title,
                          scholarshipType: "College Scholarship",
                        })
                      }
                      className={`mt-auto w-full rounded-lg py-2 text-[14px] font-medium text-white transition-colors ${item.buttonClass}`}
                    >
                      Apply for Scholarship
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {isApplicationModalOpen && applicationSelection && (
        <ScholarshipApplicationPage
          onClose={() => setIsApplicationModalOpen(false)}
          scholarshipId={applicationSelection.id}
          scholarshipName={applicationSelection.scholarshipName}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
};

const FilterSection: React.FC<{
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}> = ({ title, defaultOpen = false, children }) => (
  <details className="group mb-4 border-b border-gray-100 pb-4" open={defaultOpen}>
    <summary className="flex list-none cursor-pointer items-center justify-between text-sm font-semibold text-gray-800">
      {title}
      <span className="transition group-open:rotate-180">
        <i className="fa-solid fa-chevron-down text-xs text-gray-500"></i>
      </span>
    </summary>
    <div className="space-y-2 pt-3">{children}</div>
  </details>
);

const CheckboxItem: React.FC<{
  label: string;
  checked: boolean;
  onChange: () => void;
}> = ({ label, checked, onChange }) => (
  <label className="flex cursor-pointer items-center gap-2">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 rounded border-gray-300 text-blue-600"
    />
    <span className="text-sm text-gray-600">{label}</span>
  </label>
);

const extractAmount = (amount: string) => {
  const numeric = amount.replace(/[^\d.]/g, "");
  return Number(numeric) || 0;
};

export default ScholarshipsCategoryPage;

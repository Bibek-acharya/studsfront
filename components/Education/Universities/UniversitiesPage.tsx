import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import UniversityCard from "./UniversityCard";
import Pagination from "./Pagination";
import AffiliationTab from "./AffiliationTab";
import CollegeListItem from "./CollegeListItem";
import CollegesAndCoursesPage from "../CourseFinder/CollegesAndCoursesPage";
import { FilterState, University, College } from "./types";
import { apiService } from "../../../services/api";

interface UniversitiesPageProps {
  onNavigate: (view: any, data?: any) => void;
}

interface CourseCollegesRouteState {
  courseId?: string;
  courseTitle?: string;
  collegesCount?: number;
}

const UniversitiesPage: React.FC<UniversitiesPageProps> = ({ onNavigate }) => {
  const location = useLocation();
  const routeState = (location.state || {}) as CourseCollegesRouteState;
  const selectedCourse = routeState.courseTitle
    ? {
        id: routeState.courseId,
        title: routeState.courseTitle,
        collegesCount:
          typeof routeState.collegesCount === "number"
            ? routeState.collegesCount
            : undefined,
      }
    : null;

  const [view, setView] = useState<"discovery" | "colleges">("discovery");
  const [selectedUniId, setSelectedUniId] = useState<number>(1);
  const [filters, setFilters] = useState<FilterState>({
    affiliation: [],
    searchQuery: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [collegePage, setCollegePage] = useState(1);
  const [collegeToClaim, setCollegeToClaim] = useState<College | null>(null);
  const itemsPerPage = 9;
  const collegesPerPage = 21;

  const { data: universitiesResponse } = useQuery({
    queryKey: ["universities", filters.searchQuery],
    queryFn: () =>
      apiService.getUniversities({
        search: filters.searchQuery || undefined,
      }),
  });

  const { data: selectedUniversityResponse } = useQuery({
    queryKey: ["university", selectedUniId],
    queryFn: () => apiService.getUniversityById(selectedUniId),
    enabled: view === "colleges" && !!selectedUniId,
  });

  const universities = (universitiesResponse?.data?.universities || []) as University[];
  const colleges = (selectedUniversityResponse?.data?.colleges || []) as College[];

  const handleAffiliationToggle = (val: string) => {
    setFilters((prev) => ({
      ...prev,
      affiliation: prev.affiliation.includes(val)
        ? prev.affiliation.filter((i) => i !== val)
        : [...prev.affiliation, val],
    }));
  };

  const resetFilters = () => {
    setFilters({ affiliation: [], searchQuery: "" });
    setCurrentPage(1);
  };

  const goToColleges = (uniId: number) => {
    setSelectedUniId(uniId);
    setView("colleges");
  };

  useEffect(() => {
    if (selectedCourse) {
      setView("colleges");
    }
  }, [selectedCourse]);

  useEffect(() => {
    if (universities.length > 0 && !universities.find((uni) => uni.id === selectedUniId)) {
      setSelectedUniId(universities[0].id);
    }
  }, [universities, selectedUniId]);

  const filteredUniversities = useMemo(() => {
    const items = universities.filter((uni) => {
      const matchesSearch = uni.name
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase());
      return matchesSearch;
    });

    return items;
  }, [universities, filters.searchQuery]);

  const totalPages = Math.ceil(filteredUniversities.length / itemsPerPage);

  const paginatedUniversities = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUniversities.slice(startIndex, endIndex);
  }, [filteredUniversities, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters.searchQuery, filters.affiliation]);

  const filteredColleges = useMemo(() => {
    return colleges.filter((college) => college.universityId === selectedUniId);
  }, [colleges, selectedUniId]);

  const collegesTotalPages = Math.max(
    1,
    Math.ceil(filteredColleges.length / collegesPerPage),
  );

  const paginatedColleges = useMemo(() => {
    const start = (collegePage - 1) * collegesPerPage;
    return filteredColleges.slice(start, start + collegesPerPage);
  }, [filteredColleges, collegePage]);

  const topColleges = paginatedColleges.slice(0, 12);
  const bottomColleges = paginatedColleges.slice(12, 21);

  const collegesResultCount =
    selectedCourse?.collegesCount ?? filteredColleges.length;

  const featuredAds = [
    {
      badge: "Advertisement",
      title: "Study in Australia 🇦🇺",
      desc: "Apply now for the upcoming 2024 intake. Free counseling.",
      cta: "Apply Now",
      cardClass: "from-[#0F172A] to-[#1E293B] border border-gray-800",
      ctaClass: "bg-blue-600 hover:bg-blue-500 text-white",
      badgeClass: "text-blue-400",
      descClass: "text-gray-400",
    },
    {
      badge: "Featured",
      title: "Up to 50% Scholarships 🎓",
      desc: "Merit-based scholarships available for top students.",
      cta: "Learn More",
      cardClass: "from-[#1D4ED8] to-[#2563EB]",
      ctaClass: "bg-white text-blue-700 hover:bg-gray-50",
      badgeClass: "text-blue-200",
      descClass: "text-blue-100/80",
    },
    {
      badge: "Trending",
      title: "IT Careers in UK 🇬🇧",
      desc: "Top universities with 2 years of post-study work visa.",
      cta: "Explore",
      cardClass: "from-[#065F46] to-[#047857]",
      ctaClass: "bg-white text-green-800 hover:bg-gray-50",
      badgeClass: "text-green-300",
      descClass: "text-green-100/80",
    },
    {
      badge: "Event",
      title: "Global Education Fair",
      desc: "Meet 50+ universities in person this weekend.",
      cta: "Register Free",
      cardClass: "from-[#7C3AED] to-[#6D28D9]",
      ctaClass: "bg-white text-purple-700 hover:bg-gray-50",
      badgeClass: "text-purple-300",
      descClass: "text-purple-100/80",
    },
  ];

  if (view === "colleges" && selectedCourse) {
    return (
      <CollegesAndCoursesPage
        selectedCourse={selectedCourse}
        onBack={() => setView("discovery")}
      />
    );
  }

  if (view === "colleges") {
    const selectedUniversity =
      filteredUniversities.find((uni) => uni.id === selectedUniId) ||
      filteredUniversities[0];

    const selectedUniversityCards =
      filteredUniversities.length > 0
        ? filteredUniversities
        : selectedUniversity
          ? [selectedUniversity]
          : [];

    return (
      <div className="bg-white pb-12 text-gray-900 antialiased">
        <main className="mx-auto max-w-350 p-4 md:p-6 lg:p-8">
          <h1 className="text-[22px] font-bold tracking-tight text-gray-900">
            Affiliated Colleges
          </h1>

          <div className="mt-4 rounded-[16px] bg-[#F2F6FE] p-6">
            <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-2">
              {selectedUniversityCards.map((uni) => (
                <AffiliationTab
                  key={uni.id}
                  university={uni}
                  isActive={selectedUniId === uni.id}
                  onClick={() => {
                    setSelectedUniId(uni.id);
                    setCollegePage(1);
                  }}
                />
              ))}
            </div>
          </div>

          <div className="mb-4 mt-8">
            <p className="text-[13px] font-medium tracking-wide text-gray-600">
              Showing {collegesResultCount} results for colleges and courses
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {topColleges.map((college) => (
              <CollegeListItem
                key={college.id}
                college={college}
                onNavigate={onNavigate}
                onClaim={() => setCollegeToClaim(college)}
              />
            ))}
          </div>

          <div className="mb-6 mt-16">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[18px] font-bold tracking-tight text-gray-900">
                Featured Opportunities
              </h2>
            </div>

            <div className="relative w-full rounded-[16px]">
              <div className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth">
                {featuredAds.map((ad) => (
                  <div
                    key={ad.title}
                    className={`group h-[158px] w-full shrink-0 snap-start cursor-pointer items-center justify-between rounded-[16px] bg-gradient-to-br p-7 shadow-sm md:w-[calc(50%-12px)] ${ad.cardClass} flex`}
                  >
                    <div className="pr-4 text-white">
                      <span
                        className={`mb-1.5 block text-[11px] font-bold uppercase tracking-widest ${ad.badgeClass}`}
                      >
                        {ad.badge}
                      </span>
                      <h3 className="line-clamp-1 mb-1.5 text-[20px] font-bold transition-colors group-hover:text-blue-300 lg:text-[22px]">
                        {ad.title}
                      </h3>
                      <p className={`line-clamp-2 text-[13px] lg:text-[14px] ${ad.descClass}`}>
                        {ad.desc}
                      </p>
                    </div>
                    <div className="hidden shrink-0 sm:block">
                      <button className={`rounded-lg px-5 py-2.5 text-sm font-semibold shadow-lg transition-all lg:px-6 ${ad.ctaClass}`}>
                        {ad.cta}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {bottomColleges.map((college) => (
              <CollegeListItem
                key={`bottom-${college.id}`}
                college={college}
                onNavigate={onNavigate}
                onClaim={() => setCollegeToClaim(college)}
              />
            ))}
          </div>

          <div className="mb-6 mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => setCollegePage((prev) => Math.max(1, prev - 1))}
              disabled={collegePage === 1}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition-colors disabled:cursor-not-allowed disabled:bg-gray-50"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            {Array.from({ length: collegesTotalPages }, (_, index) => index + 1)
              .slice(0, 4)
              .map((page) => (
                <button
                  key={page}
                  onClick={() => setCollegePage(page)}
                  className={`h-10 w-10 rounded-lg border font-medium transition-colors ${
                    collegePage === page
                      ? "border-blue-600 bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)]"
                      : "border-gray-200 text-gray-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  {page}
                </button>
              ))}

            {collegesTotalPages > 5 && (
              <span className="flex h-10 w-10 items-center justify-center font-bold tracking-widest text-gray-400">
                ...
              </span>
            )}

            {collegesTotalPages > 4 && (
              <button
                onClick={() => setCollegePage(collegesTotalPages)}
                className="h-10 w-10 rounded-lg border border-gray-200 font-medium text-gray-700 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                {collegesTotalPages}
              </button>
            )}

            <button
              onClick={() =>
                setCollegePage((prev) => Math.min(collegesTotalPages, prev + 1))
              }
              disabled={collegePage === collegesTotalPages}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>

          <ClaimCollegeModal college={collegeToClaim} onClose={() => setCollegeToClaim(null)} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f9fafb] text-gray-800 antialiased p-4 md:p-8 font-sans">
      <div className="max-w-350 mx-auto flex flex-col lg:flex-row gap-8 items-start">
        <Sidebar
          affiliationFilters={filters.affiliation}
          onFilterChange={handleAffiliationToggle}
          onRemoveFilter={handleAffiliationToggle}
          onReset={resetFilters}
          nepalUniversityCount={universities.length}
          foreignAffiliatedCount={0}
        />

        <main className="flex-1 w-full">
          <div className="text-[14px] font-bold text-gray-800 mb-6">
            Showing {filteredUniversities.length} results for Scholarship
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {paginatedUniversities.map((uni) => (
              <div
                key={uni.id}
                onClick={() => goToColleges(uni.id)}
                className="cursor-pointer"
              >
                <UniversityCard
                  university={uni}
                  onNavigate={onNavigate}
                  onShowColleges={goToColleges}
                />
              </div>
            ))}
          </div>

          <div className="mt-10 mb-8 flex justify-center items-center gap-2">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

const ClaimCollegeModal: React.FC<{
  college: College | null;
  onClose: () => void;
}> = ({ college, onClose }) => {
  const [institutionName, setInstitutionName] = useState(college?.name || "");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [email, setEmail] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  useEffect(() => {
    if (college) {
      setInstitutionName(college.name);
      setRegistrationNumber("");
      setEmail("");
      setContactPerson("");
      setContactNumber("");
    }
  }, [college]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Claim request submitted successfully! Our team will verify and grant you access.");
    onClose();
  };

  const isOpen = college !== null;

  return (
    <div className={`fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`} onClick={onClose}>
      <div className={`mx-4 flex max-h-[90vh] w-full max-w-md flex-col rounded-[20px] bg-white shadow-2xl transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`} onClick={e => e.stopPropagation()}>
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-6 py-5">
          <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <i className="fa-solid fa-building-shield text-[20px] text-[#2563eb]"></i>
            Claim Institution
          </h3>
          <button type="button" onClick={onClose} className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700">
            <i className="fa-solid fa-xmark text-[20px]"></i>
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5">
          <div className="mb-5 flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 p-3.5">
            <i className="fa-solid fa-circle-info mt-0.5 shrink-0 text-[18px] text-blue-600"></i>
            <p className="line-height-extra text-[13px] text-blue-800">
              Provide official details to claim <span className="font-bold text-blue-700">{college?.name}</span>. Upon verification, you will receive full control over this profile.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="College name"
              required
              value={institutionName}
              onChange={(event) => setInstitutionName(event.target.value)}
              className="w-full px-4 py-3 bg-[#EEF2F6] border border-[#D5DCE8] rounded-xl focus:bg-white focus:border-[#2D68FE] outline-none text-[14px] shadow-sm"
            />
            <input
              type="text"
              placeholder="Institution registration number"
              required
              value={registrationNumber}
              onChange={(event) => setRegistrationNumber(event.target.value)}
              className="w-full px-4 py-3 bg-[#EEF2F6] border border-[#D5DCE8] rounded-xl focus:bg-white focus:border-[#2D68FE] outline-none text-[14px] shadow-sm"
            />
            <input
              type="email"
              placeholder="Work email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-4 py-3 bg-[#EEF2F6] border border-[#D5DCE8] rounded-xl focus:bg-white focus:border-[#2D68FE] outline-none text-[14px] shadow-sm"
            />
            <input
              type="text"
              placeholder="Contact Person Full Name"
              required
              value={contactPerson}
              onChange={(event) => setContactPerson(event.target.value)}
              className="w-full px-4 py-3 bg-[#EEF2F6] border border-[#D5DCE8] rounded-xl focus:bg-white focus:border-[#2D68FE] outline-none text-[14px] shadow-sm"
            />
            <input
              type="tel"
              placeholder="Contact Number"
              required
              value={contactNumber}
              onChange={(event) => setContactNumber(event.target.value)}
              className="w-full px-4 py-3 bg-[#EEF2F6] border border-[#D5DCE8] rounded-xl focus:bg-white focus:border-[#2D68FE] outline-none text-[14px] shadow-sm"
            />
            <div className="mt-8 flex flex-col justify-end gap-3 sm:flex-row pt-4">
              <button type="button" onClick={onClose} className="w-full rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-[14px] font-bold text-gray-600 transition-colors hover:bg-gray-50 sm:w-auto">
                Cancel
              </button>
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-6 py-2.5 text-[14px] font-bold text-white shadow-[0_4px_12px_rgb(37,99,235,0.2)] transition-all hover:-translate-y-0.5 hover:bg-blue-700 sm:w-auto">
                Submit Claim Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UniversitiesPage;

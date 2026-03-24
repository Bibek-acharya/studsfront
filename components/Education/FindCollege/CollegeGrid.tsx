import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { College, apiService } from "../../../services/api";
import { CollegeFilters, DEFAULT_COLLEGE_FILTERS } from "./FindCollegePage";
import { BadgeCheckIcon, LockIcon } from "lucide-react";

interface CollegeGridProps {
  filters: CollegeFilters;
  setFilters: React.Dispatch<React.SetStateAction<CollegeFilters>>;
  onNavigate: (view: any, data?: any) => void;
}

type ActiveFilterTag =
  {
    key: Exclude<keyof CollegeFilters, "search">;
    label: string;
    value: string;
  };

const SEARCHABLE_FILTER_KEYS: Array<keyof CollegeFilters> = [
  "academic",
  "stream",
];

const FILTER_KEYS_FOR_TAGS: Array<Exclude<keyof CollegeFilters, "search" | "feeMax" | "sortBy">> = [
  "academic",
  "program",
  "course",
  "province",
  "district",
  "type",
  "university",
  "courseDuration",
  "quick",
  "stream",
  "location",
  "facilities",
  "feeRange",
  "duration",
  "popularity",
];

const CollegeGrid: React.FC<CollegeGridProps> = ({ filters, setFilters, onNavigate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [savedColleges, setSavedColleges] = useState<number[]>([]);
  const [selectedForInquiry, setSelectedForInquiry] = useState<number[]>([]);
  const [isQuickInquiryMode, setIsQuickInquiryMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [collegeToClaim, setCollegeToClaim] = useState<College | null>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const searchTerms = useMemo(
    () => [filters.search, ...SEARCHABLE_FILTER_KEYS.flatMap((key) => filters[key])]
      .map((value) => value.trim())
      .filter(Boolean),
    [filters],
  );

  const activeTags = useMemo<ActiveFilterTag[]>(() => {
    const tags: ActiveFilterTag[] = [];

    FILTER_KEYS_FOR_TAGS.forEach((key) => {
      filters[key].forEach((value) => {
        tags.push({ key, label: value, value });
      });
    });

    return tags;
  }, [filters]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["colleges", currentPage, filters, isQuickInquiryMode],
    queryFn: () => {
      const params: any = {
        page: currentPage,
        pageSize: 12,
        sort: "rating",
        order: "DESC",
      };

      if (filters.quick.includes("Verified") || isQuickInquiryMode) params.verified = true;
      if (
        filters.popularity.includes("Most Enrolled") ||
        filters.popularity.includes("Recommended")
      ) {
        params.popular = true;
      }
      if (filters.type.length > 0) params.type = filters.type.join(",");

      if (searchTerms.length > 0) params.search = searchTerms.join(" ");

      return apiService.getColleges(params);
    },
    placeholderData: (previousData) => previousData,
  });

  const colleges = data?.data?.colleges || [];
  const totalResults = data?.data?.pagination?.total || 0;
  const totalPages = data?.data?.pagination?.totalPages || 1;

  const removeFilter = (tag: ActiveFilterTag) => {
    setFilters((prev) => {
      return {
        ...prev,
        [tag.key]: prev[tag.key].filter((item) => item !== tag.value),
      };
    });
  };

  const resetAll = () => {
    setFilters(DEFAULT_COLLEGE_FILTERS);
  };

  const toggleSavedCollege = (collegeId: number) => {
    setSavedColleges((prev) =>
      prev.includes(collegeId)
        ? prev.filter((id) => id !== collegeId)
        : [...prev, collegeId],
    );
  };

  const toggleSelection = (collegeId: number) => {
    setSelectedForInquiry((prev) => {
      if (prev.includes(collegeId)) return prev.filter((id) => id !== collegeId);
      if (prev.length >= 5) {
        console.warn("You can select up to 5 colleges for Quick Inquiry.");
        return prev;
      }
      return [...prev, collegeId];
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setIsQuickInquiryMode(true);
      const toSelect = colleges.filter(c => c.verified).slice(0, 5).map(c => c.id);
      setSelectedForInquiry(toSelect);
    } else {
      setSelectedForInquiry([]);
    }
  };

  useEffect(() => {
    if (selectedForInquiry.length > 0) {
      setIsQuickInquiryMode(true);
    }
  }, [selectedForInquiry]);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Success! Your inquiry has been sent to the selected colleges.");
    setIsModalOpen(false);
    setInquiryMessage("");
    setSelectedForInquiry([]);
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-700 font-semibold">{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-col justify-start">
            <h1 className="mb-3 text-base font-bold text-gray-900">
              Showing {totalResults.toLocaleString()} Colleges
            </h1>

            {isLoading && (
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[12px] font-medium text-blue-700">
                <svg className="h-3.5 w-3.5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating results...
              </div>
            )}
            
            {isQuickInquiryMode && (
              <label className="group mt-auto flex cursor-pointer items-center gap-2.5">
                <div className="relative flex h-[20px] w-[20px] items-center justify-center">
                  <input 
                    type="checkbox" 
                    checked={selectedForInquiry.length > 0}
                    onChange={handleSelectAll}
                    className="peer sr-only"
                  />
                  <div className="absolute inset-0 rounded-[4px] border-[1.5px] border-slate-300 bg-white transition-colors group-hover:border-slate-400 peer-checked:border-[#2563eb] peer-checked:bg-[#2563eb]"></div>
                  <svg className="pointer-events-none absolute z-10 h-3.5 w-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex items-baseline gap-1.5 text-[14px]">
                  <span className="font-semibold text-slate-900">Select all</span>
                  <span className="hidden text-[12.5px] text-slate-500 sm:inline">(upto 5 quick inquiry colleges)</span>
                </div>
              </label>
            )}
          </div>

          <div className="mt-2 flex w-full shrink-0 flex-col gap-3 sm:mt-0 sm:w-[320px] sm:items-end">
            <div className="relative w-full">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400"></i>
              <input
                type="text"
                value={filters.search}
                onChange={(event) =>
                  setFilters((prev) => ({ ...prev, search: event.target.value }))
                }
                placeholder="Search colleges, locations, courses..."
                className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm transition-all placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              />
            </div>

            <label className="group flex cursor-pointer items-center gap-2">
              <span className="text-[13px] font-semibold text-slate-800">Quick Inquiry</span>
              <div className="relative inline-flex cursor-pointer items-center">
                <input 
                  type="checkbox" 
                  checked={isQuickInquiryMode}
                  onChange={(e) => {
                    setIsQuickInquiryMode(e.target.checked);
                    if (!e.target.checked) setSelectedForInquiry([]);
                  }}
                  className="peer sr-only"
                />
                <div className="peer h-[20px] w-[34px] rounded-full bg-slate-300 transition-all after:absolute after:left-[2px] after:top-[2px] after:h-[16px] after:w-[16px] after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#2563eb] peer-checked:after:translate-x-[14px] peer-checked:after:border-white peer-focus:outline-none"></div>
              </div>
            </label>
          </div>
        </div>

        {activeTags.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-gray-200 pt-4">
            <span className="mr-1 shrink-0 text-[13px] font-semibold text-gray-600">
              Filters Applied:
            </span>
            {activeTags.map((tag) => (
              <button
                key={`${tag.key}-${tag.value}`}
                type="button"
                onClick={() => removeFilter(tag)}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[12px] font-medium text-[#2563eb] transition-colors hover:bg-blue-100"
              >
                {tag.label}
                <i className="fa-solid fa-xmark text-[11px] text-blue-500"></i>
              </button>
            ))}
            <button
              type="button"
              onClick={resetAll}
              className="ml-2 shrink-0 text-[13px] font-semibold text-red-500 transition-colors hover:text-red-700 hover:underline"
            >
              Reset All
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3" id="card-grid">
        {isLoading && colleges.length === 0 && (
          <div className="col-span-1 rounded-[16px] border border-gray-100 bg-white py-16 text-center text-gray-500 shadow-[0_2px_15px_rgb(0,0,0,0.04)] md:col-span-2 xl:col-span-3">
            Loading colleges...
          </div>
        )}

        {colleges.map((college: College) => (
          <ProgramCard
            key={college.id}
            college={college}
            isSaved={savedColleges.includes(college.id)}
            isSelected={selectedForInquiry.includes(college.id)}
            isQuickInquiryMode={isQuickInquiryMode}
            onNavigate={onNavigate}
            onToggleSaved={() => toggleSavedCollege(college.id)}
            onToggleSelection={() => toggleSelection(college.id)}
            onClaim={() => setCollegeToClaim(college)}
          />
        ))}

        {!isLoading && colleges.length === 0 && (
          <div className="col-span-1 rounded-[16px] border border-gray-100 bg-white py-16 text-center text-gray-500 shadow-[0_2px_15px_rgb(0,0,0,0.04)] md:col-span-2 xl:col-span-3">
            No colleges found matching your filters.
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mb-2 mt-10 flex items-center justify-center gap-1 sm:gap-2">
            <button
              className="flex items-center gap-1 rounded-[8px] border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-400 transition-colors disabled:cursor-not-allowed"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              <i className="fa-solid fa-chevron-left text-xs"></i>
              <span className="hidden sm:inline">Prev</span>
            </button>

            {[1, 2, 3].filter((page) => page <= totalPages).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-9 w-9 items-center justify-center rounded-[8px] text-sm font-medium transition-colors ${
                    page === currentPage
                      ? "bg-[#2563eb] text-white shadow-sm hover:bg-blue-700"
                      : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
            ))}

            {totalPages > 4 && (
              <span className="flex h-9 w-9 select-none items-center justify-center text-gray-400">
                ...
              </span>
            )}

            {totalPages > 4 && (
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={`flex h-9 w-9 items-center justify-center rounded-[8px] text-sm font-medium transition-colors ${
                    currentPage === totalPages
                      ? "bg-[#2563eb] text-white shadow-sm"
                      : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {totalPages}
                </button>
              )}

            <button
              className="flex items-center gap-1 rounded-[8px] border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            >
              <span className="hidden sm:inline">Next</span>
              <i className="fa-solid fa-chevron-right text-xs"></i>
            </button>
        </div>
      )}

      {/* Bottom Action Bar */}
      <div className={`fixed bottom-0 left-0 z-40 flex w-full transform justify-center border-t border-slate-200 bg-white px-4 py-4 shadow-[0_-4px_15px_rgb(0,0,0,0.05)] transition-transform duration-300 sm:px-6 ${selectedForInquiry.length > 0 ? "translate-y-0" : "translate-y-full"}`}>
        <div className="flex w-full max-w-[1400px] items-center justify-end gap-4 sm:gap-6">
          <button onClick={() => setSelectedForInquiry([])} className="cursor-pointer border-none bg-transparent text-[14px] font-semibold text-[#2563eb] hover:underline sm:text-[15px]">
            Clear Selection
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 rounded-full bg-[#2563eb] px-5 py-2.5 text-[14px] font-semibold text-white shadow-md transition-colors hover:bg-blue-800 sm:px-6 sm:text-[15px]">
            Quick Inquiry <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[12px] font-bold text-[#2563eb]">{selectedForInquiry.length}</span>
          </button>
        </div>
      </div>

      {/* Quick Inquiry Modal */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${isModalOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`} onClick={() => setIsModalOpen(false)}>
        <div className={`mx-4 flex max-h-[90vh] w-full max-w-lg flex-col rounded-[20px] bg-white shadow-2xl transition-transform duration-300 ${isModalOpen ? 'scale-100' : 'scale-95'}`} onClick={e => e.stopPropagation()}>
          <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-6 py-5">
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <i className="fa-solid fa-paper-plane text-[20px] text-[#2563eb]"></i>
              Send Quick Inquiry
            </h3>
            <button onClick={() => setIsModalOpen(false)} className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700">
              <i className="fa-solid fa-xmark text-[20px]"></i>
            </button>
          </div>
          <div className="overflow-y-auto px-6 py-5">
            <div className="mb-5 flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 p-3.5">
              <i className="fa-solid fa-circle-info mt-0.5 shrink-0 text-[18px] text-blue-600"></i>
              <p className="line-height-extra text-[13px] text-blue-800">
                You are sending this inquiry to <span className="text-[14px] font-bold text-blue-700">{selectedForInquiry.length}</span> selected college(s). They will get back to you with the requested information.
              </p>
            </div>
            <form onSubmit={handleInquirySubmit}>
              <div className="mb-5">
                <label htmlFor="inquiryMessage" className="mb-2 block text-[14px] font-bold text-gray-800">Your Question / Message <span className="text-red-500">*</span></label>
                <textarea 
                  id="inquiryMessage" 
                  required 
                  rows={4} 
                  value={inquiryMessage}
                  onChange={e => setInquiryMessage(e.target.value)}
                  className="w-full resize-none rounded-[12px] border border-gray-200 bg-gray-50 px-4 py-3 text-[14px] text-gray-800 shadow-sm transition-all focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]" 
                  placeholder="E.g., What are the admission requirements, fee structures, and scholarship options for the upcoming intake?">
                </textarea>
              </div>
              <div className="mt-8 flex flex-col justify-end gap-3 sm:flex-row">
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-full rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-[14px] font-bold text-gray-600 transition-colors hover:bg-gray-50 sm:w-auto">
                  Cancel
                </button>
                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-6 py-2.5 text-[14px] font-bold text-white shadow-[0_4px_12px_rgb(37,99,235,0.2)] transition-all hover:-translate-y-0.5 hover:bg-blue-700 sm:w-auto">
                  Send Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ClaimCollegeModal college={collegeToClaim} onClose={() => setCollegeToClaim(null)} />
    </>
  );
};

const ProgramCard: React.FC<{
  college: College;
  isSaved: boolean;
  isSelected: boolean;
  isQuickInquiryMode: boolean;
  onNavigate: (view: any, data?: any) => void;
  onToggleSaved: () => void;
  onToggleSelection: () => void;
  onClaim: () => void;
}> = ({ college, isSaved, isSelected, isQuickInquiryMode, onNavigate, onToggleSaved, onToggleSelection, onClaim }) => {
  const description =
    (typeof college.description === "string" && college.description.trim()) ||
    "Explore academics, facilities, and counselling support for this college.";

  return (
    <div className="flex h-full cursor-pointer flex-col rounded-[16px] border border-gray-100 bg-white p-2.5 shadow-[0_2px_15px_rgb(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-1">
      <div
        onClick={() => onNavigate("collegeDetails", { id: college.id })}
        className="group relative h-[140px] shrink-0 overflow-hidden rounded-[12px] text-left"
      >
        <img
          src={college.image_url || "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop"}
          alt={college.name}
          className="w-full h-full object-cover"
        />
        {college.verified && (
          <label 
            className={`absolute right-2 top-2 z-10 cursor-pointer transition-opacity duration-300 ${isQuickInquiryMode || isSelected ? 'opacity-100 pointer-events-auto' : 'pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex h-6 w-6 items-center justify-center">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={onToggleSelection}
                className="peer sr-only"
              />
              <div className="absolute inset-0 rounded-[6px] border-[1.5px] border-slate-300 bg-white/90 shadow-sm backdrop-blur-sm transition-colors hover:border-slate-400 peer-checked:border-[#2563eb] peer-checked:bg-[#2563eb]"></div>
              <svg className="pointer-events-none absolute z-10 h-4 w-4 text-white opacity-0 transition-opacity peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </label>
        )}
      </div>

      <div className="flex flex-1 flex-col px-1.5 pb-1 pt-3">
        <div className="flex items-center justify-between">
          <div className="flex w-full items-center gap-1.5">
            <button
              type="button"
              onClick={() => onNavigate("collegeDetails", { id: college.id })}
              className="truncate text-left text-[15px] font-bold text-gray-900 transition-colors hover:text-[#2563eb]"
              title={college.name}
            >
              {college.name}
            </button>
            {college.verified && (
              <BadgeCheckIcon className="text-white fill-blue-500" size={16}/>
)}
          </div>
        </div>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[11.5px] font-medium leading-none text-gray-500">
          <div className="flex items-center gap-1 text-gray-700">
            <i className="fa-solid fa-star text-[12px] text-[#f59e0b]"></i>
            <span className="font-bold">{Number(college.rating || 0).toFixed(1)}</span>
          </div>
          <div className="h-3 w-px bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <i className="fa-regular fa-building text-[12px] text-gray-400"></i>
            {college.type || "College"}
          </div>
          <div className="h-3 w-px bg-gray-300"></div>
          <div className="flex max-w-[90px] items-center gap-1 truncate">
            <i className="fa-solid fa-location-dot shrink-0 text-[12px] text-gray-400"></i>
            <span className="truncate">{college.location || "Kathmandu"}</span>
          </div>
          <div className="mt-1.5 flex w-full items-start gap-1 text-gray-600">
            <i className="fa-solid fa-award mt-[2px] shrink-0 text-[12px] text-gray-400"></i>
            <span className="leading-tight">
              {college.affiliation || "NEB, Tribhuvan University, Purbanchal University"}
            </span>
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-[11.5px] leading-relaxed text-gray-600">
          {description}
        </p>

        <div className="mt-auto pt-4">
          <div className="mb-2.5 border-t-2 border-dotted border-gray-200"></div>

          {!college.verified && (
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="text-[11px] text-gray-500">Is this your college?</span>
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClaim();
                }} 
                className="text-[11px] font-semibold text-[#2563eb] hover:underline"
              >
                Claim now
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={(e) => {
              if (college.verified) {
                onNavigate("bookCounselling", { collegeId: college.id });
              } else {
                e.stopPropagation();
              }
            }}
            className="mb-1.5 flex h-[36px] w-full items-center justify-center truncate rounded-[4px] bg-[#2563eb] px-1 text-[11.5px] font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            {!college.verified && <LockIcon className="mr-1.5" size={14} />}
            Get counselling
          </button>

          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => onNavigate("campusForum", { collegeId: college.id, collegeName: college.name })}
              className="flex flex-1 items-center justify-center gap-1 rounded-[4px] border border-gray-200 bg-white px-1 text-[11px] font-bold text-gray-800 transition-colors hover:bg-gray-50 h-[32px]"
            >
              <i className="fa-regular fa-message text-[12px] text-gray-500"></i>
              <span className="truncate">Ask a question</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate("compareColleges", { collegeName: college.name })}
              className="flex h-[32px] flex-1 items-center justify-center truncate rounded-[4px] bg-yellow-500 px-1 text-[11.5px] font-bold text-white shadow-sm transition-colors hover:bg-yellow-600"
            >
              Compare now
            </button>
            <button
              type="button"
              onClick={onToggleSaved}
              className="group flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[4px] border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50"
              aria-label={isSaved ? "Remove from saved colleges" : "Save college"}
            >
              <i className={`fa-${isSaved ? "solid" : "regular"} fa-heart text-[14px] transition-colors ${isSaved ? "text-red-500" : "group-hover:text-red-500"}`}></i>
            </button>
          </div>
        </div>
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

export default CollegeGrid;

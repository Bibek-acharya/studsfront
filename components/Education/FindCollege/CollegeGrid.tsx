import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { College, apiService } from "../../../services/api";
import { CollegeFilters } from "./FindCollegePage";

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

const FILTER_KEYS_FOR_TAGS: Array<Exclude<keyof CollegeFilters, "search">> = [
  "quick",
  "academic",
  "stream",
  "location",
  "type",
  "facilities",
  "feeRange",
  "duration",
  "popularity",
];

const CollegeGrid: React.FC<CollegeGridProps> = ({ filters, setFilters, onNavigate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [savedColleges, setSavedColleges] = useState<number[]>([]);

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
    queryKey: ["colleges", currentPage, filters],
    queryFn: () => {
      const params: any = {
        page: currentPage,
        pageSize: 12,
        sort: "rating",
        order: "DESC",
      };

      if (filters.quick.includes("Verified")) params.verified = true;
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
    setFilters({
      type: [],
      location: [],
      search: "",
      quick: [],
      academic: [],
      stream: [],
      facilities: [],
      feeRange: [],
      duration: [],
      popularity: [],
    });
  };

  const toggleSavedCollege = (collegeId: number) => {
    setSavedColleges((prev) =>
      prev.includes(collegeId)
        ? prev.filter((id) => id !== collegeId)
        : [...prev, collegeId],
    );
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
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Showing {totalResults.toLocaleString()} Colleges
            </h1>
            <p className="mt-1 text-[13px] text-gray-500">
              Explore and compare the best colleges tailored for you.
            </p>
          </div>

          {isLoading && (
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[12px] font-medium text-blue-700">
              <svg className="h-3.5 w-3.5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Updating results...
            </div>
          )}

          <div className="relative w-full shrink-0 sm:w-[320px]">
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
            onNavigate={onNavigate}
            onToggleSaved={() => toggleSavedCollege(college.id)}
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
    </>
  );
};

const ProgramCard: React.FC<{
  college: College;
  isSaved: boolean;
  onNavigate: (view: any, data?: any) => void;
  onToggleSaved: () => void;
}> = ({ college, isSaved, onNavigate, onToggleSaved }) => {
  const description =
    (typeof college.description === "string" && college.description.trim()) ||
    "Explore academics, facilities, and counselling support for this college.";

  return (
    <div className="flex h-full cursor-pointer flex-col rounded-[16px] border border-gray-100 bg-white p-2.5 shadow-[0_2px_15px_rgb(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-1">
      <button
        type="button"
        onClick={() => onNavigate("collegeDetails", { id: college.id })}
        className="relative h-[140px] shrink-0 overflow-hidden rounded-[12px] text-left"
      >
        <img
          src={college.image_url || "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop"}
          alt={college.name}
          className="w-full h-full object-cover"
        />
      </button>

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
              <i className="fa-solid fa-circle-check shrink-0 text-[14px] text-[#0866ff]"></i>
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

          <button
            type="button"
            onClick={() => onNavigate("bookCounselling", { collegeId: college.id })}
            className="mb-1.5 flex h-[36px] w-full items-center justify-center truncate rounded-[4px] bg-[#2563eb] px-1 text-[11.5px] font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
          >
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

export default CollegeGrid;

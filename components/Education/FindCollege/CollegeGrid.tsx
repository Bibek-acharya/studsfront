import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "../../../services/api";
import { CollegeFilters } from "./FindCollegePage";

interface CollegeGridProps {
  filters: CollegeFilters;
  setFilters: React.Dispatch<React.SetStateAction<CollegeFilters>>;
  onNavigate: (view: any, data?: any) => void;
}

const CollegeGrid: React.FC<CollegeGridProps> = ({ filters, setFilters, onNavigate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["colleges", currentPage, sortBy, filters],
    queryFn: () => {
      // Determine correct order for sort
      let order = "DESC";
      if (sortBy === "name") order = "ASC";

      // Build filter params
      const params: any = {
        page: currentPage,
        pageSize: 18,
        sort: sortBy,
        order: order,
      };

      if (filters.verified) params.verified = true;
      if (filters.popular) params.popular = true;
      if (!filters.nationalWide && filters.location) params.location = filters.location;

      if (filters.type.length > 0) params.type = filters.type.join(",");

      const searchTerms = [
        filters.search,
        ...filters.academic,
        ...filters.stream,
      ]
        .map((value) => value.trim())
        .filter(Boolean);

      if (searchTerms.length > 0) {
        params.search = searchTerms.join(" ");
      }

      return apiService.getColleges(params);
    }
  });

  const colleges = data?.data?.colleges || [];
  const totalResults = data?.data?.pagination?.total || 0;
  const totalPages = data?.data?.pagination?.totalPages || 1;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-slate-600 font-semibold">Loading colleges...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-700 font-semibold">{(error as Error).message}</p>
      </div>
    );
  }

  const activeFiltersCount =
    (filters.verified ? 1 : 0) +
    (filters.popular ? 1 : 0) +
    (filters.location ? 1 : 0) +
    (filters.search ? 1 : 0) +
    (filters.nationalWide ? 1 : 0) +
    filters.type.length +
    filters.academic.length +
    filters.stream.length;

  return (
    <>
      <style>{`
        .card {
            background: white;
            border-radius: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
            width: 100%;
            padding: 1.25rem;
            border: 1px solid #edf2f7;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .verified-badge {
            background-color: #e6fffa;
            color: #2d6a4f;
            padding: 2px 10px;
            border-radius: 20px;
            font-size: 0.7rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .popular-badge {
            background-color: #fffaf0;
            color: #c05621;
            padding: 2px 10px;
            border-radius: 20px;
            font-size: 0.7rem;
            font-weight: 600;
        }

        .college-name:hover {
            color: #2563eb;
            cursor: pointer;
        }

        .programs-container {
            width: 100%;
        }

        .program-row {
            background-color: #f7fafc;
            border-radius: 6px;
            padding: 8px 12px;
            margin-bottom: 6px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .program-tag {
            background-color: #edf2f7;
            color: #a0aec0;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 0.6rem;
            font-weight: 600;
        }

        .btn-common {
            border-radius: 6px;
            transition: all 0.2s;
        }

        .btn-inquiry {
            background-color: #2563eb;
            color: white;
        }

        .btn-inquiry:hover {
            background-color: #1d4ed8;
        }

        .btn-outline {
            border: 1px solid #e2e8f0;
            color: #4a5568;
        }
        
        .btn-outline:hover {
            background-color: #f8fafc;
        }

        .dashed-line {
            border-top: 1px dashed #e2e8f0;
            margin: 1rem 0;
        }

        .visit-link {
            color: #2563eb;
            font-weight: 600;
            text-decoration: none;
        }
        
        .visit-link:hover {
            text-decoration: underline;
        }
      `}</style>

      {/* Active Filters & Result Count */}
      <div className="mb-6">
        <div className="flex items-center flex-wrap gap-2 text-sm mb-3">
          <span className="font-bold text-slate-500 mr-2">Active :</span>

          {filters.verified && (
            <ActiveFilter label="Verified" onRemove={() => setFilters(p => ({ ...p, verified: false }))} />
          )}
          {filters.popular && (
            <ActiveFilter label="Popular" onRemove={() => setFilters(p => ({ ...p, popular: false }))} />
          )}
          {filters.location && (
            <ActiveFilter label={filters.location} onRemove={() => setFilters(p => ({ ...p, location: "" }))} />
          )}
          {filters.search && (
            <ActiveFilter label={`Search: ${filters.search}`} onRemove={() => setFilters(p => ({ ...p, search: "" }))} />
          )}
          {filters.nationalWide && (
            <ActiveFilter label="National Wide" onRemove={() => setFilters(p => ({ ...p, nationalWide: false }))} />
          )}
          {filters.academic.map((level) => (
            <ActiveFilter key={level} label={level} onRemove={() => setFilters((p) => ({ ...p, academic: p.academic.filter((v) => v !== level) }))} />
          ))}
          {filters.stream.map((streamVal) => (
            <ActiveFilter key={streamVal} label={streamVal} onRemove={() => setFilters((p) => ({ ...p, stream: p.stream.filter((v) => v !== streamVal) }))} />
          ))}
          {filters.type.map(t => (
            <ActiveFilter key={t} label={t} onRemove={() => setFilters(p => ({ ...p, type: p.type.filter(typ => typ !== t) }))} />
          ))}

          {activeFiltersCount === 0 && (
            <span className="text-slate-400 text-xs italic">No active filters</span>
          )}

          {activeFiltersCount > 0 && (
            <button
              onClick={() =>
                setFilters({
                  verified: false,
                  popular: false,
                  type: [],
                  location: "",
                  search: "",
                  academic: [],
                  stream: [],
                  nationalWide: false,
                })
              }
              
              className="text-blue-500 hover:text-blue-600 text-sm font-medium ml-2 transition"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="flex justify-between items-center text-slate-800 text-[15px]">
          <div>
            Showing {totalResults} results <span className="font-semibold"></span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            Sort by:
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent border-none focus:ring-0 text-slate-900 font-bold cursor-pointer"
            >
              <option value="rating">Highest Rating</option>
              <option value="name">Name (A-Z)</option>
              <option value="reviews">Most Popular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid displaying cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" id="cards-container">
        {colleges.map((college) => (
          <CollegeCard
            key={college.id}
            college={college}
            onNavigate={onNavigate}
          />
        ))}

        {colleges.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-500">
            No colleges found matching the selected filters.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 mb-8 flex justify-center items-center gap-2">
          <button
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-slate-400 bg-white hover:bg-slate-50 hover:text-slate-600 transition disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            // Simple pagination logic, showing first 5 pages for brevity or centered around current
            let pageNum = i + 1;
            if (totalPages > 5 && currentPage > 3) {
              pageNum = currentPage - 3 + i;
              if (pageNum > totalPages) pageNum = totalPages - 5 + i + 1;
            }
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-10 h-10 rounded-lg font-semibold text-sm transition ${pageNum === currentPage
                  ? "bg-blue-600 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
              >
                {pageNum}
              </button>
            );
          })}

          {(totalPages > 5 && currentPage < totalPages - 2) && (
            <span className="w-10 h-10 flex items-center justify-center text-slate-400 font-medium">...</span>
          )}

          <button
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-slate-500 bg-white hover:bg-slate-50 hover:text-slate-600 transition disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      )}
    </>
  );
};

const CollegeCard: React.FC<{
  college: any;
  onNavigate: (v: any, data?: any) => void;
}> = ({ college, onNavigate }) => {
  const featuredPrograms = Array.isArray(college?.featured_programs)
    ? college.featured_programs
    : Array.isArray(college?.programs_list)
      ? college.programs_list
      : typeof college?.programs_list === "string"
        ? college.programs_list
          .split(",")
          .map((program: string) => program.trim())
          .filter(Boolean)
        : ["Computer Science", "Information Technology", "Business Administration"];

  return (
    <div className="card">
      <div className="flex gap-3">
        <div className={`w-14 h-14 rounded-md flex items-center justify-center flex-shrink-0 bg-blue-600 text-white font-bold text-xl overflow-hidden`}>
          {college.image_url ? (
            <img src={college.image_url} alt={college.name} className="w-full h-full object-cover" />
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="6" width="12" height="12" rx="1.5" fill="white" />
              <rect x="9" y="9" width="3" height="3" fill="#2563eb" />
            </svg>
          )}
        </div>
        <div className="flex-grow min-w-0">
          <h2
            onClick={() => onNavigate("collegeDetails", { id: college.id })}
            className="font-bold text-base text-slate-800 leading-tight college-name transition-colors truncate"
            title={college.name}
          >
            {college.name}
          </h2>
          <div className="flex items-center text-slate-500 text-[11px] mt-1 truncate">
            <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
            {college.location}
          </div>
          <div className="flex items-center gap-2 mt-2 text-[10px] font-semibold flex-wrap">
            <span className="flex items-center text-blue-600">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              {college.rating || 0} / 5.0
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center text-slate-500 uppercase">{college.affiliation || "N/A"}</span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center text-slate-500">{college.type || "N/A"}</span>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            {college.verified && (
              <span className="verified-badge">
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                Verified
              </span>
            )}
            {college.popular && (
              <span className="popular-badge">Popular</span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-slate-400 font-semibold text-xs">Program Offered</h3>
          <span className="text-blue-500 font-semibold text-xs">{featuredPrograms.length || college.programs || 0} Programs</span>
        </div>
        <div className="programs-container">
          {featuredPrograms.slice(0, 3).map((program, idx) => (
            <div key={idx} className="program-row">
              <span className="text-slate-600 font-semibold text-[11px] truncate mr-2" title={program}>{program}</span>
              <span className="program-tag shrink-0">Bachelor</span>
            </div>
          ))}
        </div>
        <div className="w-full text-left mt-3">
          <p className="text-slate-400 text-[10px] font-medium">
            {college.programs && college.programs > 3 ? `${college.programs}+ programs` : `More programs`}
            <button onClick={() => onNavigate("collegeDetails", { id: college.id })} className="visit-link ml-1">visit from here</button>
          </p>
        </div>
      </div>
      <div className="dashed-line"></div>
      <div className="mt-auto flex gap-2">
        <button
          onClick={() => onNavigate("collegeDetails", { id: college.id })}
          className="flex-1 py-2.5 px-1 font-bold text-[10px] btn-common btn-outline"
        >
          Book Counselling
        </button>
        <button className="flex-[1.4] py-2.5 px-1 font-bold text-[10px] btn-common btn-inquiry">Ask a question?</button>
        <button className="p-2.5 btn-common btn-outline flex items-center justify-center hover:text-rose-500 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
        </button>
      </div>
    </div>
  );
};

const ActiveFilter: React.FC<{ label: string; onRemove: () => void }> = ({ label, onRemove }) => (
  <span className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full font-medium text-xs shadow-sm">
    {label}
    <button onClick={onRemove} className="text-slate-400 hover:text-slate-600 focus:outline-none ml-1">
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
  </span>
);

export default CollegeGrid;

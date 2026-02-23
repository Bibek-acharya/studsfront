import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import UniversitiesHero from "./UniversitiesHero";
import Sidebar from "./Sidebar";
import UniversityCard from "./UniversityCard";
import Pagination from "./Pagination";
import AffiliationTab from "./AffiliationTab";
import CollegeListItem from "./CollegeListItem";
import { FilterState, University, College } from "./types";
import { apiService } from "../../../services/api";

interface UniversitiesPageProps {
  onNavigate: (view: any, data?: any) => void;
}

const UniversitiesPage: React.FC<UniversitiesPageProps> = ({ onNavigate }) => {
  const [view, setView] = useState<"discovery" | "colleges">("discovery");
  const [selectedUniId, setSelectedUniId] = useState<number>(1);
  const [filters, setFilters] = useState<FilterState>({
    affiliation: ["Nepal University"],
    searchQuery: "",
  });

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

  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const resetFilters = () => {
    setFilters({ affiliation: ["Nepal University"], searchQuery: "" });
  };

  const goToColleges = (uniId: number) => {
    setSelectedUniId(uniId);
    setView("colleges");
  };

  useEffect(() => {
    if (universities.length > 0 && !universities.find((uni) => uni.id === selectedUniId)) {
      setSelectedUniId(universities[0].id);
    }
  }, [universities, selectedUniId]);

  const filteredUniversities = useMemo(() => {
    return universities.filter((uni) => {
      const matchesSearch = uni.name
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [universities, filters.searchQuery]);

  const filteredColleges = useMemo(() => {
    return colleges.filter((college) => college.universityId === selectedUniId);
  }, [colleges, selectedUniId]);

  if (view === "colleges") {
    return (
      <div className="min-h-screen w-full bg-[#fdfdfd] flex flex-col pt-0 font-jakarta">
        <header className="px-6 py-6 max-w-7xl mx-auto w-full">
          <button
            onClick={() => setView("discovery")}
            className="flex items-center gap-2 text-slate-500 hover:text-primary-600 font-black text-[10px] uppercase tracking-widest mb-6 transition-colors group"
          >
            <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1"></i>
            <span>Back to Discovery</span>
          </button>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Affiliated Colleges
          </h1>
        </header>

        <div className="w-full bg-primary-50/40 border-y border-primary-50 py-10 px-6">
          <div className="max-w-7xl mx-auto overflow-x-auto pb-4 no-scrollbar">
            <div className="flex gap-4 min-w-max">
              {filteredUniversities.map((uni) => (
                <AffiliationTab
                  key={uni.id}
                  university={uni}
                  isActive={selectedUniId === uni.id}
                  onClick={() => setSelectedUniId(uni.id)}
                />
              ))}
            </div>
          </div>
        </div>

        <main className="flex-1 container mx-auto px-6 py-12 max-w-7xl">
          <div className="mb-10">
            <p className="text-slate-400 font-black text-xs uppercase tracking-widest">
              Showing{" "}
              <span className="text-primary-600">
                {filteredColleges.length * 5}
              </span>{" "}
              results for colleges and courses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 5 }).map((_, repeat) => (
              <React.Fragment key={repeat}>
                {filteredColleges.map((college) => (
                  <CollegeListItem
                    key={`${college.id}-${repeat}`}
                    college={college}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Pagination />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-50 pt-0 font-jakarta">
      <UniversitiesHero onSearch={handleSearch} />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-7xl">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
          <aside className="lg:col-span-3">
            <Sidebar
              affiliationFilters={filters.affiliation}
              onFilterChange={handleAffiliationToggle}
              onReset={resetFilters}
            />
          </aside>

          <div className="lg:col-span-9">
            <div className="mb-10 space-y-6">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest">
                  Active :
                </span>
                {filters.affiliation.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-700 shadow-sm"
                  >
                    {f}
                    <button
                      onClick={() => handleAffiliationToggle(f)}
                      className="text-slate-300 hover:text-rose-500 transition-colors"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                ))}
              </div>
              <h4 className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                Showing{" "}
                <span className="text-slate-900 font-black">
                  {filteredUniversities.length}
                </span>{" "}
                results for{" "}
                <span className="text-primary-600 font-black">
                  {filters.searchQuery || "Scholarship"}
                </span>
              </h4>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {filteredUniversities.map((uni) => (
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

            <div className="mt-16 flex justify-center">
              <Pagination />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UniversitiesPage;

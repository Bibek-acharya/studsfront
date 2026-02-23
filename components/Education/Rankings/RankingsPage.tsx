import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { COLLEGES, MAX_SELECTION } from "./Constants";
import { SortOption, FilterOption, College } from "./types";
import CollegeCard from "./CollegeCard";
import ComparisonModal from "./ComparisonModal";
import { SearchIcon, FilterIcon, CloseIcon } from "./Icons";
import { apiService } from "../../../services/api";

interface RankingsPageProps {
  onNavigate: (view: any) => void;
}

const RankingsPage: React.FC<RankingsPageProps> = ({ onNavigate }) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");
  const [sortBy, setSortBy] = useState<SortOption>("RANK_DESC");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["education-rankings"],
    queryFn: () => apiService.getEducationRankings(),
  });

  const colleges = (data?.data?.colleges as College[]) || COLLEGES;

  const toggleCompare = (id: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      }
      if (prev.length >= MAX_SELECTION) {
        alert(`You can only compare up to ${MAX_SELECTION} colleges at once.`);
        return prev;
      }
      return [...prev, id];
    });
  };

  const filteredAndSortedColleges = useMemo(() => {
    let result = [...colleges];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    // Filter
    if (activeFilter !== "All") {
      result = result.filter((c) => c.tags.includes(activeFilter));
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "RANK_DESC":
          return a.rank - b.rank;
        case "YEAR_DESC":
          return parseInt(b.stats.year) - parseInt(a.stats.year);
        case "RATING_DESC":
          return b.stats.rating - a.stats.rating;
        default:
          return 0;
      }
    });

    return result;
  }, [searchQuery, activeFilter, sortBy]);

  const selectedColleges = useMemo(
    () => colleges.filter((c) => selectedIds.includes(c.id)),
    [selectedIds, colleges],
  );

  return (
    <div className="min-h-screen bg-slate-50 font-jakarta">
      {/* Consistent Hero Section */}
      <section className="relative w-full overflow-hidden min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000&auto=format&fit=crop"
            alt="Ranking Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Curved Blue Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1440 600"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="rgba(37, 99, 235, 0.85)"
              d="M0,0 L0,600 L1200,1300 Q1100,1200 1200,800 Q1000,0 500,0 Z"
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 w-full animate-fadeInUp text-center lg:text-left">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black uppercase tracking-widest mb-8 shadow-xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              Updated for 2026 Intake
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tighter">
              Gold Standard <br />
              <span className="text-white">
                College Rankings
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Data-driven insights on faculty excellence, academic quality, and
              student satisfaction across all major campuses.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="relative max-w-2xl mb-8 group mx-auto lg:mx-0"
            >
              <div className="flex items-center bg-white rounded-full shadow-2xl overflow-hidden p-1.5 border border-white/20">
                <div className="pl-6 text-slate-400">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Find colleges, courses, or locations..."
                  className="flex-1 py-4 px-4 text-slate-800 text-lg border-0 outline-none placeholder-slate-400 font-bold"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 font-black rounded-full transition-all active:scale-95 uppercase tracking-widest text-xs">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div className="sticky top-14 md:top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm py-3 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 border-r border-slate-100 pr-4 shrink-0">
              <div className="p-2 bg-primary-50 rounded-xl text-primary-600">
                <FilterIcon />
              </div>
            </div>

            {(
              [
                "All",
                "Science & Tech",
                "Management",
                "Medical",
                "Humanities",
              ] as FilterOption[]
            ).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all
                  ${
                    activeFilter === filter
                      ? "bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-500/20"
                      : "bg-white border-slate-200 text-slate-400 hover:bg-slate-50"
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest hidden sm:block">
              Sort by
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-[10px] font-black text-slate-600 uppercase tracking-widest focus:ring-4 focus:ring-primary-50 outline-none cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')] bg-[length:1em] bg-[right_0.75rem_center] bg-no-repeat pr-10"
            >
              <option value="RANK_DESC">🏆 Rank High</option>
              <option value="YEAR_DESC">📅 Heritage</option>
              <option value="RATING_DESC">⭐ Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
          {/* List Section */}
          <div className="lg:col-span-8 space-y-10">
            <h2 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
              Institutions Found{" "}
              <span className="text-primary-600 ml-2">
                {filteredAndSortedColleges.length}
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredAndSortedColleges.map((college) => (
                <CollegeCard
                  key={college.id}
                  college={college}
                  isSelected={selectedIds.includes(college.id)}
                  onToggleCompare={toggleCompare}
                />
              ))}
            </div>

            {filteredAndSortedColleges.length === 0 && (
              <div className="py-24 text-center bg-white rounded-2xl border border-slate-200 border-dashed">
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                  No results found.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilter("All");
                  }}
                  className="mt-4 text-primary-600 font-black text-xs uppercase tracking-widest hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}

            <div className="mt-12 flex justify-center">
              <button className="px-12 py-4 bg-white border border-slate-200 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
                Load More Colleges
              </button>
            </div>
          </div>

          {/* Sidebar Comparison */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-44 space-y-6">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-50 bg-slate-50/50">
                  <h3 className="font-black text-slate-800 flex items-center gap-3">
                    <i className="fa-solid fa-code-compare text-primary-600"></i>
                    Compare Tool
                  </h3>
                  <p className="text-xs text-slate-500 mt-2">
                    Select up to 3 colleges to compare.
                  </p>
                </div>

                <div className="p-6 space-y-3 min-h-[160px]">
                  {selectedIds.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 opacity-40 grayscale">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                        <i className="fa-solid fa-plus text-slate-300"></i>
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Add colleges to compare
                      </p>
                    </div>
                  ) : (
                    selectedColleges.map((c) => (
                      <div
                        key={c.id}
                        className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 shadow-sm animate-fadeInUp group hover:border-primary-100"
                      >
                        <div className="flex items-center gap-4 overflow-hidden">
                          <div
                            className={`w-10 h-10 rounded-xl ${c.color} flex items-center justify-center text-white text-xs font-black shrink-0 shadow-md`}
                          >
                            {c.logo}
                          </div>
                          <span className="text-xs font-black text-slate-700 truncate uppercase tracking-widest">
                            {c.name}
                          </span>
                        </div>
                        <button
                          onClick={() => toggleCompare(c.id)}
                          className="text-slate-300 hover:text-rose-500 transition"
                        >
                          <CloseIcon />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50/30">
                  <button
                    disabled={selectedIds.length < 2}
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-4 bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-slate-900/10 hover:bg-black disabled:opacity-30 transition-all"
                  >
                    {selectedIds.length < 2
                      ? `Add ${2 - selectedIds.length} more`
                      : `Compare (${selectedIds.length})`}
                  </button>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-primary-600 to-indigo-700 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                <div className="relative z-10">
                  <span className="text-[10px] font-black text-primary-100 uppercase tracking-widest mb-4 block">
                    Spotlight
                  </span>
                  <h4 className="text-xl font-black mb-4 leading-tight">
                    Faculty Spotlight 2025
                  </h4>
                  <p className="text-primary-50 text-sm font-medium mb-8 opacity-80">
                    Meet the professors and educators leading Nepal's academic
                    growth.
                  </p>
                  <button className="bg-white text-primary-600 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">
                    View Profiles
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile Comparison Floating Bar */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-10 left-6 right-6 z-[100] lg:hidden transform translate-y-0 transition-transform duration-500 animate-fadeInUp">
          <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl p-6 flex items-center justify-between border border-white/10">
            <div className="flex flex-col">
              <span className="text-sm font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>{selectedIds.length} Selected</span>
              </span>
              <span className="text-xs text-slate-400">
                Compare side-by-side
              </span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3 bg-primary-600 hover:bg-primary-500 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-primary-500/30"
            >
              Analyze
            </button>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      <ComparisonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedColleges={selectedColleges}
      />
    </div>
  );
};

export default RankingsPage;

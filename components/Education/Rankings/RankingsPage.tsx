import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { COLLEGES, MAX_SELECTION } from "./Constants";
import { SortOption, College } from "./types";
import { apiService } from "../../../services/api";

interface RankingsPageProps {
  onNavigate: (view: any, data?: any) => void;
}

const RankingsPage: React.FC<RankingsPageProps> = ({ onNavigate }) => {
  const [selectedLevel, setSelectedLevel] = useState<"Bachelor" | "Master">(
    "Bachelor",
  );
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("RANK_DESC");
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 8;

  const coursesByLevel: Record<"Bachelor" | "Master", string[]> = {
    Bachelor: [
      "BSc. CSIT",
      "BCA",
      "BIT",
      "BBM",
      "BBA",
      "BBS",
      "BE Civil",
      "BE Computer",
      "BHM",
    ],
    Master: ["MSc. CSIT", "MBA", "MBS", "MCA", "MA Economics"],
  };

  const { data } = useQuery({
    queryKey: ["education-rankings"],
    queryFn: () => apiService.getEducationRankings(),
  });

  const colleges = useMemo(() => {
    const incoming = (data?.data?.colleges as any[]) || [];
    if (!incoming.length) return COLLEGES;

    return incoming.map((college, index) => ({
      id: Number(college.id ?? index + 1),
      name: college.name || "Unknown College",
      location: college.location || "Kathmandu, Nepal",
      rank: Number(college.rank ?? index + 1),
      color: college.color || "bg-blue-600",
      logo:
        typeof college.logo === "string" && college.logo.length
          ? college.logo
          : (college.name || "C")
              .split(" ")
              .slice(0, 2)
              .map((word: string) => word[0])
              .join("")
              .toUpperCase(),
      stats: {
        year: String(college?.stats?.year || college.established || "1998"),
        rating: Number(college?.stats?.rating || college.rating || 4.5),
      },
      tags: Array.isArray(college.tags) && college.tags.length
        ? college.tags
        : ["Science & Tech"],
      image_url: college.image_url,
      website: college.website,
      reviews: Number(college.reviews || 208),
      verified: college.verified !== false,
    }));
  }, [data]);

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
  }, [colleges, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedColleges.length / PAGE_SIZE));

  const paginatedColleges = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredAndSortedColleges.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredAndSortedColleges, currentPage]);

  const selectedColleges = useMemo(
    () => colleges.filter((c) => selectedIds.includes(c.id)),
    [selectedIds, colleges],
  );

  const pageNumbers = useMemo(() => {
    const numbers: (number | "...")[] = [1];
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage > 3) numbers.push("...");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let page = start; page <= end; page += 1) {
      numbers.push(page);
    }
    if (currentPage < totalPages - 2) numbers.push("...");
    if (totalPages > 1) numbers.push(totalPages);
    return numbers;
  }, [currentPage, totalPages]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative group">
              <button className="flex items-center gap-3 rounded-lg bg-blue-600 px-6 py-2 text-sm font-bold text-white shadow-md shadow-blue-100 transition-all">
                <span>{selectedLevel}</span>
                <i className="fa-solid fa-chevron-down text-[10px]"></i>
              </button>
              <div className="invisible absolute left-0 top-full z-50 mt-2 w-48 rounded-xl border border-slate-100 bg-white py-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                {(["Bachelor", "Master"] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => {
                      setSelectedLevel(level);
                      setSelectedCourse(`All ${level} Courses`);
                    }}
                    className="block w-full px-4 py-2 text-left text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-600"
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-6 py-2 text-sm font-semibold text-slate-600 transition-all hover:border-blue-600 hover:text-blue-600">
                <span>{selectedCourse}</span>
                <i className="fa-solid fa-filter text-[10px]"></i>
              </button>
              <div className="invisible absolute left-0 top-full z-50 mt-2 max-h-64 w-56 overflow-y-auto rounded-xl border border-slate-100 bg-white py-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <button
                  onClick={() => setSelectedCourse(`All ${selectedLevel} Courses`)}
                  className="block w-full px-4 py-2 text-left text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-600"
                >
                  {`All ${selectedLevel} Courses`}
                </button>
                {coursesByLevel[selectedLevel].map((course) => (
                  <button
                    key={course}
                    onClick={() => setSelectedCourse(course)}
                    className="block w-full px-4 py-2 text-left text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-600"
                  >
                    {course}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-sm font-medium text-slate-400">
            Sort by:
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortOption)}
              className="ml-2 cursor-pointer border-none bg-transparent font-bold text-slate-900 outline-none hover:text-blue-600"
            >
              <option value="RANK_DESC">Rank High-Low</option>
              <option value="YEAR_DESC">Year New-Old</option>
              <option value="RATING_DESC">Rating High-Low</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row">
          <div className="flex-grow space-y-6">
            {paginatedColleges.map((college: any) => (
              <div
                key={college.id}
                className="relative flex flex-col items-center gap-8 rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_25px_-5px_rgb(0_0_0_/_0.05),0_8px_10px_-6px_rgb(0_0_0_/_0.05)] md:flex-row md:p-6"
              >
                <div className="relative flex-shrink-0">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-white p-1.5 shadow-sm md:h-24 md:w-24">
                    {college.image_url ? (
                      <img src={college.image_url} alt="Logo" className="h-full w-full object-contain" />
                    ) : (
                      <div className={`flex h-full w-full items-center justify-center rounded-lg text-white ${college.color}`}>
                        <span className="text-sm font-bold">{college.logo}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-grow text-center md:text-left">
                  <div className="mb-1.5 flex items-center justify-center gap-2 md:justify-start">
                    <h3 className="text-lg font-bold leading-tight text-slate-900">{college.name}</h3>
                    {college.verified && (
                      <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#1877F2] text-[8px] text-white">
                        <i className="fa-solid fa-check"></i>
                      </div>
                    )}
                  </div>

                  <div className="mb-3 flex items-center justify-center gap-2 text-xs font-medium text-slate-400 md:justify-start">
                    <i className="fa-solid fa-location-dot text-slate-400"></i>
                    <span>{college.location}</span>
                  </div>

                  <div className="mb-4 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                    <span className="rounded border border-blue-100 bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600">
                      Rank # {college.rank}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <i className="fa-solid fa-star text-[10px] text-blue-500"></i>
                        <span className="text-xs font-bold text-slate-700">{college.stats.rating.toFixed(1)}</span>
                      </div>
                      <div className="mx-1 h-3 w-px bg-slate-300"></div>
                      <span className="text-[10px] font-medium text-slate-400">{college.reviews || 208} reviews</span>
                    </div>
                  </div>

                  <div className="inline-flex cursor-pointer items-center gap-1.5 text-[11px] font-bold uppercase tracking-tight text-blue-600 hover:underline">
                    {(college.website || "WWW.Studisphere.Com").toUpperCase()}
                    <i className="fa-solid fa-arrow-right -rotate-45 text-[10px]"></i>
                  </div>
                </div>

                <div className="flex w-full flex-shrink-0 flex-col gap-2 md:w-36">
                  <button
                    onClick={() => onNavigate("collegeDetails", { id: college.id })}
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition-all hover:bg-slate-50"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => toggleCompare(college.id)}
                    className={`w-full rounded-lg px-4 py-2.5 text-xs font-bold text-white transition-all ${selectedIds.includes(college.id) ? "bg-blue-600 hover:bg-blue-700" : "bg-slate-900 hover:bg-slate-800"}`}
                  >
                    {selectedIds.includes(college.id) ? "Selected" : "Compare"}
                  </button>
                </div>
              </div>
            ))}

            {paginatedColleges.length === 0 && (
              <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-400">
                No colleges found.
              </div>
            )}

            <div className="mb-12 mt-16 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] border border-slate-200 bg-white text-slate-500 transition-all hover:bg-slate-50"
                disabled={currentPage === 1}
              >
                <i className="fa-solid fa-chevron-left text-[12px] text-slate-400"></i>
              </button>

              {pageNumbers.map((page, index) =>
                page === "..." ? (
                  <div key={`ellipsis-${index}`} className="px-2 text-sm font-bold text-slate-400">...</div>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-[42px] w-[42px] items-center justify-center rounded-[10px] border text-sm font-semibold transition-all ${
                      currentPage === page
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] border border-slate-200 bg-white text-slate-500 transition-all hover:bg-slate-50"
                disabled={currentPage === totalPages}
              >
                <i className="fa-solid fa-chevron-right text-[12px] text-slate-400"></i>
              </button>
            </div>
          </div>

          <div className="lg:w-80 lg:flex-shrink-0">
            <div className="lg:sticky lg:top-6">
              <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50">
                <div className="mb-2 flex items-center gap-3">
                  <i className="fa-solid fa-filter text-sm text-blue-600"></i>
                  <span className="font-extrabold tracking-tight text-slate-900">Compare</span>
                </div>
                <p className="mb-8 text-xs font-medium text-slate-400">Select 2 colleges to compare</p>

                {selectedColleges.length === 0 ? (
                  <div className="group mb-8 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-100 p-10 transition-all hover:border-blue-200 hover:bg-blue-50/30">
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-300 transition-all group-hover:bg-blue-600 group-hover:text-white">
                      <i className="fa-solid fa-plus text-xs"></i>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Add college to compare</span>
                  </div>
                ) : (
                  <div className="mb-8 space-y-2">
                    {selectedColleges.map((college) => (
                      <div key={college.id} className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2">
                        <span className="line-clamp-1 text-xs font-semibold text-slate-600">{college.name}</span>
                        <button
                          onClick={() => toggleCompare(college.id)}
                          className="text-slate-300 transition-colors hover:text-rose-500"
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() =>
                    onNavigate("compareCollegesResult", {
                      college1: selectedColleges[0],
                      college2: selectedColleges[1],
                    })
                  }
                  disabled={selectedIds.length !== 2}
                  className="w-full rounded-lg bg-blue-600 py-3.5 font-bold text-white transition-all active:scale-[0.98] hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Start Comparison
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default RankingsPage;

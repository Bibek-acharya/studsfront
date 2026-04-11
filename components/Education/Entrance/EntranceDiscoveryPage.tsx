import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import EntranceSidebar from "./EntranceSidebar";
import EntranceCard from "./EntranceCard";
import { MOCK_EXAMS } from "./Constants";
import { apiService } from "../../../services/api";
import { Exam } from "./types";

interface EntranceDiscoveryPageProps {
  onNavigate: (view: any, data?: any) => void;
}

const FILTER_GROUPS = [
  "quick",
  "academicLevel",
  "stream",
  "programName",
  "location",
  "collegeType",
  "university",
  "admissionStatus",
  "applicationType",
  "date",
  "popularity",
] as const;

type FilterGroup = (typeof FILTER_GROUPS)[number];

type EntranceFilterState = Record<FilterGroup, string[]>;

const INITIAL_FILTERS: EntranceFilterState = {
  quick: [],
  academicLevel: [],
  stream: [],
  programName: [],
  location: [],
  collegeType: [],
  university: [],
  admissionStatus: [],
  applicationType: [],
  date: [],
  popularity: [],
};

const EntranceDiscoveryPage: React.FC<EntranceDiscoveryPageProps> = ({
  onNavigate,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [selectedFilters, setSelectedFilters] =
    useState<EntranceFilterState>(INITIAL_FILTERS);
  const [searchValues, setSearchValues] = useState({
    stream: "",
    programName: "",
    collegeType: "",
    university: "",
  });
  const [locationValues, setLocationValues] = useState({
    province: "All Provinces",
    district: "District",
  });

  const { data } = useQuery({
    queryKey: ["education-exams"],
    queryFn: () => apiService.getEducationExams(),
  });

  const exams: Exam[] =
    data?.data?.exams?.map((exam) => {
      const mappedStatus: Exam["status"] =
        exam.status === "active"
          ? "Ongoing"
          : exam.status === "upcoming"
            ? "Upcoming"
            : "Closing Soon";

      return {
        id: exam.id,
        title: exam.title,
        university: exam.board,
        faculty: exam.type,
        status: mappedStatus,
        examDate: exam.examDate,
        nepaliDate: exam.formDeadline,
        imageUrl:
          "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
      };
    }) || MOCK_EXAMS;

  const handleToggleFilter = (group: string, value: string) => {
    const key = group as FilterGroup;
    setSelectedFilters((prev) => {
      const hasValue = prev[key].includes(value);
      const nextValues = hasValue
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value];
      return { ...prev, [key]: nextValues };
    });
    setCurrentPage(1);
  };

  const handleSearchChange = (
    field: "stream" | "programName" | "collegeType" | "university",
    value: string,
  ) => {
    setSearchValues((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const handleLocationChange = (field: "province" | "district", value: string) => {
    setLocationValues((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const resetAllFilters = () => {
    setSelectedFilters(INITIAL_FILTERS);
    setSearchValues({
      stream: "",
      programName: "",
      collegeType: "",
      university: "",
    });
    setLocationValues({ province: "All Provinces", district: "District" });
    setCurrentPage(1);
  };

  const matchAny = (
    selected: string[],
    predicate: (value: string) => boolean,
  ) => selected.length === 0 || selected.some(predicate);

  const inferAcademicLevel = (exam: Exam) => {
    const text = `${exam.title} ${exam.faculty}`.toLowerCase();
    if (/\+2|higher secondary|intermediate|class 12|neb/.test(text)) {
      return "+2 / Higher Secondary";
    }
    if (/master|mba|mbs|msc|ma/.test(text)) {
      return "Master";
    }
    if (/diploma|ctevt|pcl/.test(text)) {
      return "Diploma / CTEVT";
    }
    if (/bachelor|bsc|bba|be|entrance|cmat|cee/.test(text)) {
      return "Bachelor";
    }
    return "Other";
  };

  const matchesUniversityOption = (exam: Exam, option: string) => {
    const uni = exam.university.toLowerCase();
    if (option === "TU") return uni.includes("tribhuvan") || /\btu\b/.test(uni);
    if (option === "PU") return uni.includes("purbanchal") || /\bpu\b/.test(uni);
    if (option === "KU") return uni.includes("kathmandu") || /\bku\b/.test(uni);
    return uni.includes(option.toLowerCase());
  };

  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      const searchable = `${exam.title} ${exam.university} ${exam.faculty} ${exam.status}`.toLowerCase();

      const quickMatches = matchAny(selectedFilters.quick, (value) => {
        if (value === "Verified") return true;
        if (value === "New") {
          return /2026|2082|2025|2081/.test(`${exam.examDate} ${exam.nepaliDate}`);
        }
        if (value === "Closing") return exam.status === "Closing Soon";
        return true;
      });

      const levelMatches = matchAny(
        selectedFilters.academicLevel,
        (value) => inferAcademicLevel(exam) === value,
      );

      const streamMatches = matchAny(
        selectedFilters.stream,
        (value) => searchable.includes(value.toLowerCase()),
      );

      const programMatches = matchAny(
        selectedFilters.programName,
        (value) => searchable.includes(value.toLowerCase()),
      );

      const locationMatches = matchAny(selectedFilters.location, (value) => {
        if (value === "National Wide") return true;
        return false;
      });

      const collegeTypeMatches = matchAny(selectedFilters.collegeType, (value) => {
        const uni = exam.university.toLowerCase();
        if (value === "CTEVT / Gov. Training Center") return uni.includes("ctevt");
        if (value === "University-affiliated (TU, KU, PU, Purbanchal)") {
          return uni.includes("university") || /\btu\b|\bku\b|\bpu\b/.test(uni);
        }
        if (value === "Government College") {
          return uni.includes("tribhuvan") || uni.includes("commission") || uni.includes("ctevt");
        }
        if (value === "Private College") return uni.includes("kathmandu");
        if (value === "Community") return uni.includes("community");
        return false;
      });

      const universityMatches = matchAny(
        selectedFilters.university,
        (value) => matchesUniversityOption(exam, value),
      );

      const statusMatches = matchAny(selectedFilters.admissionStatus, (value) => {
        if (value === "Open") return exam.status === "Ongoing";
        if (value === "Closing soon") return exam.status === "Closing Soon";
        if (value === "Upcoming") return exam.status === "Upcoming";
        return false;
      });

      const applicationTypeMatches = matchAny(selectedFilters.applicationType, (value) => {
        if (value === "Online") return true;
        if (value === "Offline") return false;
        return true;
      });

      const dateMatches = matchAny(selectedFilters.date, (value) => {
        if (value === "Online") return true;
        if (value === "Offline") return false;
        return true;
      });

      const popularityMatches = matchAny(selectedFilters.popularity, (value) => {
        if (value === "Most Enrolled") return /entrance|common|cee|cmat/.test(searchable);
        if (value === "Trending Programs") return exam.status === "Upcoming";
        return true;
      });

      const streamSearchMatches =
        searchValues.stream.trim().length === 0 ||
        searchable.includes(searchValues.stream.trim().toLowerCase());

      const programSearchMatches =
        searchValues.programName.trim().length === 0 ||
        searchable.includes(searchValues.programName.trim().toLowerCase());

      const collegeTypeSearchMatches =
        searchValues.collegeType.trim().length === 0 ||
        searchable.includes(searchValues.collegeType.trim().toLowerCase());

      const universitySearchMatches =
        searchValues.university.trim().length === 0 ||
        exam.university.toLowerCase().includes(searchValues.university.trim().toLowerCase());

      const provinceMatches =
        locationValues.province === "All Provinces" || locationValues.province === "Bagmati";
      const districtMatches =
        locationValues.district === "District" || locationValues.district === "Kathmandu";

      return (
        quickMatches &&
        levelMatches &&
        streamMatches &&
        programMatches &&
        locationMatches &&
        collegeTypeMatches &&
        universityMatches &&
        statusMatches &&
        applicationTypeMatches &&
        dateMatches &&
        popularityMatches &&
        streamSearchMatches &&
        programSearchMatches &&
        collegeTypeSearchMatches &&
        universitySearchMatches &&
        provinceMatches &&
        districtMatches
      );
    });
  }, [
    exams,
    selectedFilters,
    searchValues,
    locationValues.province,
    locationValues.district,
  ]);

  const activeChips = useMemo(() => {
    const chips: Array<{ key: FilterGroup; value: string; label: string }> = [];
    FILTER_GROUPS.forEach((group) => {
      selectedFilters[group].forEach((value) => {
        chips.push({ key: group, value, label: value });
      });
    });
    return chips;
  }, [selectedFilters]);

  const itemsPerPage = 3;
  const totalPages = Math.max(1, Math.ceil(filteredExams.length / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const pagedExams = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredExams.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredExams, currentPage]);

  const moreExams = useMemo(() => {
    const sliced = filteredExams.slice(3, 6);
    if (sliced.length === 3) return sliced;
    return filteredExams.slice(0, 3);
  }, [filteredExams]);

  const handleViewDetails = (id: string) => {
    onNavigate("examDetails", { id });
  };

  return (
    <div className="bg-slate-50 text-slate-800 antialiased min-h-screen">
      <div className="max-w-350 mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-6">
        <EntranceSidebar
          onReset={resetAllFilters}
          selectedFilters={selectedFilters}
          searchValues={searchValues}
          locationValues={locationValues}
          onToggleFilter={handleToggleFilter}
          onSearchChange={handleSearchChange}
          onLocationChange={handleLocationChange}
        />

        <main className="flex-grow flex flex-col min-w-0">
          <div className="mb-5 flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-slate-500 font-medium">Active:</span>
              {activeChips.slice(0, 4).map((chip) => (
                <ActiveFilterChip
                  key={`${chip.key}-${chip.value}`}
                  label={chip.label}
                  onRemove={() => handleToggleFilter(chip.key, chip.value)}
                />
              ))}
              <button
                onClick={resetAllFilters}
                className="text-blue-600 hover:text-blue-800 text-xs font-medium ml-2 underline decoration-blue-300 underline-offset-2"
              >
                Clear All
              </button>
            </div>

            <div className="text-sm text-slate-500">
              Showing <span className="font-semibold text-slate-800">{filteredExams.length}</span> results for colleges and courses
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 mb-8">
            {pagedExams.map((exam) => (
              <EntranceCard key={exam.id} exam={exam} onViewDetails={handleViewDetails} />
            ))}
          </div>

          <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-sm group mb-8">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop"
              alt="University Campus Banner"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {[0, 1, 2].map((dot) => (
                <button
                  key={dot}
                  onClick={() => setBannerIndex(dot)}
                  className={`w-8 h-1.5 rounded-full transition-all ${bannerIndex === dot ? "bg-blue-500" : "bg-white/70 hover:bg-white"}`}
                ></button>
              ))}
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-800 mb-4">More Entrance Exams</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 mb-8">
            {moreExams.map((exam) => (
              <EntranceCard key={`more-${exam.id}`} exam={exam} onViewDetails={handleViewDetails} />
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 mb-10">
            <PageBtn
              icon="fa-chevron-left"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            />
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
              <PageBtn key={page} label={String(page)} active={page === currentPage} onClick={() => setCurrentPage(page)} />
            ))}
            <PageBtn
              icon="fa-chevron-right"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

const ActiveFilterChip: React.FC<{ label: string; onRemove: () => void }> = ({ label, onRemove }) => (
  <div className="inline-flex items-center bg-white border border-slate-200 px-4 py-2 rounded-xl text-[10px] font-black text-slate-600 shadow-sm transition-all hover:border-primary-100">
    {label}
    <button onClick={onRemove} className="ml-3 text-slate-300 hover:text-rose-500 transition-colors">
      <i className="fa-solid fa-xmark"></i>
    </button>
  </div>
);

const PageBtn: React.FC<{
  label?: string;
  icon?: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}> = ({ label, icon, active, disabled, onClick }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-colors border ${
      active
        ? "bg-blue-600 text-white border-blue-600 shadow-sm hover:bg-blue-700"
        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
    }`}
  >
    {icon ? <i className={`fa-solid ${icon}`}></i> : label}
  </button>
);

export default EntranceDiscoveryPage;

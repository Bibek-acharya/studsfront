import React from "react";
import { CollegeFilters, DEFAULT_COLLEGE_FILTERS } from "./FindCollegePage";

interface FilterSidebarProps {
  filters: CollegeFilters;
  setFilters: React.Dispatch<React.SetStateAction<CollegeFilters>>;
}

type ArrayFilterKey = Exclude<keyof CollegeFilters, "search">;

type FilterOption = {
  label: string;
  value?: string;
  count?: string;
  note?: string;
};

const QUICK_FILTERS: FilterOption[] = [
  { label: "Verified" },
  { label: "New" },
  { label: "Closing" },
];

const ACADEMIC_LEVELS: FilterOption[] = [
  { label: "+2 / Higher Secondary", count: "3200" },
  { label: "Bachelor", count: "200" },
  { label: "Master", count: "200" },
  { label: "Diploma / CTEVT", count: "200" },
  { label: "Other", value: "Other Program", count: "200" },
];

const STREAM_OPTIONS: FilterOption[] = [
  { label: "Science", count: "300" },
  { label: "Management", count: "200" },
  { label: "Medical", count: "300" },
  { label: "Computer Science", count: "300" },
];

const LOCATION_OPTIONS: FilterOption[] = [
  { label: "All Provinces" },
  { label: "Bagmati Province" },
  { label: "Koshi Province" },
  { label: "Gandaki Province" },
  { label: "National Wide" },
];

const COLLEGE_TYPE_OPTIONS: FilterOption[] = [
  { label: "Government College", value: "Public", count: "300" },
  { label: "Private College", value: "Private", count: "200" },
  {
    label: "University-affiliated",
    value: "Affiliated",
    note: "(TU, KU, PU, Purbanchal)",
    count: "200",
  },
  { label: "Community", count: "200" },
  { label: "CTEVT / Gov. Center", value: "CTEVT", count: "300" },
];

const FACILITY_OPTIONS: FilterOption[] = [
  { label: "Hostel" },
  { label: "Library" },
  { label: "Computer Lab" },
  { label: "Canteen" },
  { label: "Play Ground" },
];

const FEE_RANGE_OPTIONS: FilterOption[] = [
  { label: "Free / Government Funded", value: "Government Funded" },
  { label: "Under NPR 50,000", value: "Under 50k" },
  { label: "NPR 50,000 - 1,00,000", value: "50k - 1 Lakh" },
  { label: "NPR 1,00,000 - 2,00,000", value: "1 - 2 Lakhs" },
  { label: "Above NPR 2,00,000", value: "Above 2 Lakhs" },
];

const DURATION_OPTIONS: FilterOption[] = [
  { label: "< 1 month" },
  { label: "1-3 months" },
  { label: "3-6 months" },
  { label: "6 mo - 1 yr" },
  { label: "1-2 years" },
  { label: "3-4 years" },
  { label: "4+ years" },
];

const POPULARITY_OPTIONS: FilterOption[] = [
  { label: "Most Enrolled" },
  { label: "Trending Programs" },
  { label: "Recommended" },
  { label: "New Programs" },
];

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters }) => {
  const toggleValue = (key: ArrayFilterKey, value: string) => {
    setFilters((prev) => {
      const currentValues = prev[key];
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      return {
        ...prev,
        [key]: nextValues,
      };
    });
  };

  const clearAll = () => {
    setFilters(DEFAULT_COLLEGE_FILTERS);
  };

  return (
    <>
      <aside className="h-fit rounded-[16px] border border-gray-100 bg-white p-5 shadow-[0_2px_15px_rgb(0,0,0,0.04)] lg:sticky lg:top-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <i className="fa-solid fa-filter text-[#2563eb]"></i>
            Filters
          </h2>
          <button
            type="button"
            onClick={clearAll}
            className="text-xs font-semibold text-[#2563eb] transition-colors hover:text-blue-700"
          >
            Reset
          </button>
        </div>

        <div className="space-y-4 divide-y divide-gray-100">
          <div className="pb-4">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Quick Filters</h3>
            <div className="space-y-2.5">
              {QUICK_FILTERS.map((option) => (
                <Checkbox
                  key={option.label}
                  label={option.label}
                  checked={filters.quick.includes(option.label)}
                  onChange={() => toggleValue("quick", option.label)}
                />
              ))}
            </div>
          </div>

          <FilterSection title="Academic Level / Program" defaultOpen>
            {ACADEMIC_LEVELS.map((option) => (
              <Checkbox
                key={option.label}
                label={option.label}
                checked={filters.academic.includes(option.value || option.label)}
                onChange={() => toggleValue("academic", option.value || option.label)}
                count={option.count}
              />
            ))}
          </FilterSection>

          <FilterSection title="Stream / Faculty" defaultOpen>
            {STREAM_OPTIONS.map((option) => (
              <Checkbox
                key={option.label}
                label={option.label}
                checked={filters.stream.includes(option.label)}
                onChange={() => toggleValue("stream", option.label)}
                count={option.count}
              />
            ))}
          </FilterSection>

          <FilterSection title="Location">
            {LOCATION_OPTIONS.map((option) => (
              <Checkbox
                key={option.label}
                label={option.label}
                checked={filters.location.includes(option.label)}
                onChange={() => toggleValue("location", option.label)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Colleges Type">
            {COLLEGE_TYPE_OPTIONS.map((option) => (
              <Checkbox
                key={option.label}
                label={option.label}
                note={option.note}
                checked={filters.type.includes(option.value || option.label)}
                onChange={() => toggleValue("type", option.value || option.label)}
                count={option.count}
              />
            ))}
          </FilterSection>

          <FilterSection title="Facilities / Amenities">
            <div className="grid grid-cols-2 gap-2.5">
              {FACILITY_OPTIONS.map((option) => (
                <CompactCheckbox
                  key={option.label}
                  label={option.label}
                  checked={filters.facilities.includes(option.label)}
                  onChange={() => toggleValue("facilities", option.label)}
                />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Total Fee Range (NPR)">
            {FEE_RANGE_OPTIONS.map((option) => (
              <Checkbox
                key={option.label}
                label={option.label}
                checked={filters.feeRange.includes(option.value || option.label)}
                onChange={() => toggleValue("feeRange", option.value || option.label)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Course Duration">
            <div className="grid grid-cols-2 gap-2.5">
              {DURATION_OPTIONS.map((option) => (
                <CompactCheckbox
                  key={option.label}
                  label={option.label}
                  checked={filters.duration.includes(option.label)}
                  onChange={() => toggleValue("duration", option.label)}
                />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Popularity">
            {POPULARITY_OPTIONS.map((option) => (
              <Checkbox
                key={option.label}
                label={option.label}
                checked={filters.popularity.includes(option.label)}
                onChange={() => toggleValue("popularity", option.label)}
              />
            ))}
          </FilterSection>
        </div>
      </aside>

      <style>{`
        input[type="checkbox"] {
          accent-color: #2563eb;
          cursor: pointer;
        }

        details > summary {
          list-style: none;
        }

        details > summary::-webkit-details-marker {
          display: none;
        }
      `}</style>
    </>
  );
};

const FilterSection: React.FC<{
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}> = ({ title, defaultOpen = false, children }) => (
  <details className="group py-4" open={defaultOpen}>
    <summary className="flex cursor-pointer select-none items-center justify-between text-sm font-semibold text-gray-900">
      <span>{title}</span>
      <i className="fa-solid fa-chevron-down text-xs text-gray-400 transition-transform duration-200 group-open:rotate-180"></i>
    </summary>
    <div className="mt-3.5 space-y-2.5">{children}</div>
  </details>
);

const Checkbox: React.FC<{
  label: string;
  checked: boolean;
  onChange: () => void;
  count?: string;
  note?: string;
}> = ({ label, checked, onChange, count, note }) => (
  <label className="group/item flex cursor-pointer items-center gap-3">
    <input checked={checked} onChange={onChange} type="checkbox" className="h-4 w-4 rounded border-gray-300" />
    <span className="text-[13px] text-gray-600 transition-colors group-hover/item:text-gray-900">
      {label}
      {note && <span className="block text-[11px] text-gray-400">{note}</span>}
    </span>
    {count && (
      <span className="ml-auto rounded-md bg-gray-50 px-1.5 py-0.5 text-[11px] font-medium text-gray-400">
        {count}
      </span>
    )}
  </label>
);

const CompactCheckbox: React.FC<{
  label: string;
  checked: boolean;
  onChange: () => void;
}> = ({ label, checked, onChange }) => (
  <label className="group/item flex cursor-pointer items-center gap-2">
    <input checked={checked} onChange={onChange} type="checkbox" className="h-4 w-4 rounded border-gray-300" />
    <span className="text-[13px] text-gray-600 transition-colors group-hover/item:text-gray-900">{label}</span>
  </label>
);

export default FilterSidebar;
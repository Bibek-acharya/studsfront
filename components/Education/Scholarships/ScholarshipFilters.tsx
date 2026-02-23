import React, { useState } from "react";

// Added interface for FilterSection props to clearly define requirements and satisfy TypeScript's check for 'children'
interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

// Moved FilterSection outside of the main component to follow React best practices and ensure correct JSX prop recognition
const FilterSection: React.FC<FilterSectionProps> = ({ title, children }) => {
  return (
    <div className="border-b border-slate-100 last:border-0 pb-2">
      <div className="w-full flex items-center justify-between py-4 text-left">
        <span className="text-sm font-black uppercase tracking-widest text-slate-700">
          {title}
        </span>
      </div>
      <div className="pb-4 space-y-3">{children}</div>
    </div>
  );
};

const ScholarshipFilters: React.FC = () => {
  const [filters, setFilters] = useState({
    quickFilters: [] as string[],
    category: [] as string[],
    level: [] as string[],
    fieldOfStudy: [] as string[],
    fieldSearch: "",
    scholarshipType: [] as string[],
    amount: [] as string[],
    minAmount: "",
    maxAmount: "",
    benefits: [] as string[],
    location: "all",
    locationFilters: [] as string[],
    availability: [] as string[],
    deadline: [] as string[],
    providerType: [] as string[],
    providerSearch: "",
    applicationMode: [] as string[],
  });

  const toggleFilter = (category: keyof typeof filters, value: string) => {
    const current = filters[category];
    if (Array.isArray(current)) {
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      setFilters({ ...filters, [category]: updated });
    }
  };

  const resetFilters = () => {
    setFilters({
      quickFilters: [],
      category: [],
      level: [],
      fieldOfStudy: [],
      fieldSearch: "",
      scholarshipType: [],
      amount: [],
      minAmount: "",
      maxAmount: "",
      benefits: [],
      location: "all",
      locationFilters: [],
      availability: [],
      deadline: [],
      providerType: [],
      providerSearch: "",
      applicationMode: [],
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm sticky top-28 font-jakarta">
      {/* Header */}
      <div className="flex items-center justify-between p-8 border-b border-slate-50 bg-slate-50/30">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-filter text-primary-600"></i>
          <h2 className="font-black text-xl text-slate-900 tracking-tight">
            Filters
          </h2>
        </div>
        <button
          onClick={resetFilters}
          className="text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-primary-600 transition flex items-center gap-1"
        >
          <i className="fa-solid fa-rotate-right text-xs"></i>
          Reset
        </button>
      </div>

      <div className="p-6 space-y-1">
        {/* Quick Filters */}
        <div className="pb-6 border-b border-slate-50">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">
            QUICK SEARCH
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Verified", icon: "fa-circle-check", color: "emerald" },
              { label: "New", icon: "fa-bolt", color: "blue" },
              { label: "Closing", icon: "fa-clock", color: "rose" },
            ].map((filter) => (
              <button
                key={filter.label}
                onClick={() => toggleFilter("quickFilters", filter.label)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border ${
                  filters.quickFilters.includes(filter.label)
                    ? `bg-${filter.color}-50 text-${filter.color}-700 border-${filter.color}-100 shadow-sm`
                    : "bg-white text-slate-400 border-slate-100 hover:border-primary-100"
                }`}
              >
                <i className={`fa-solid ${filter.icon}`}></i>
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scholarship Category */}
        <FilterSection title="Category">
          {[
            "Merit-based",
            "Need-based",
            "Talent-based",
            "Reserved/Quota",
            "Research/Innovation",
          ].map((cat) => (
            <CheckboxLabel
              key={cat}
              label={cat}
              checked={filters.category.includes(cat)}
              onChange={() => toggleFilter("category", cat)}
            />
          ))}
        </FilterSection>

        {/* Academic Level */}
        <FilterSection title="Level">
          {["+ 2 / High School", "Bachelor", "Master"].map((level) => (
            <CheckboxLabel
              key={level}
              label={level}
              checked={filters.level.includes(level)}
              onChange={() => toggleFilter("level", level)}
            />
          ))}
        </FilterSection>

        {/* Field of Study */}
        <FilterSection title="Field of study">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Filter Fields..."
              value={filters.fieldSearch}
              onChange={(e) =>
                setFilters({ ...filters, fieldSearch: e.target.value })
              }
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold outline-none focus:border-primary-500 transition-all"
            />
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-[10px]"></i>
          </div>
          {[
            "Engineering",
            "IT / Computing",
            "Management",
            "Medical & Health",
          ].map((field) => (
            <CheckboxLabel
              key={field}
              label={field}
              checked={filters.fieldOfStudy.includes(field)}
              onChange={() => toggleFilter("fieldOfStudy", field)}
            />
          ))}
        </FilterSection>

        {/* Scholarship Amount */}
        <FilterSection title="Amount Range">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <input
              type="number"
              placeholder="MIN"
              value={filters.minAmount}
              onChange={(e) =>
                setFilters({ ...filters, minAmount: e.target.value })
              }
              className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold outline-none focus:border-primary-500 transition-all"
            />
            <input
              type="number"
              placeholder="MAX"
              value={filters.maxAmount}
              onChange={(e) =>
                setFilters({ ...filters, maxAmount: e.target.value })
              }
              className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold outline-none focus:border-primary-500 transition-all"
            />
          </div>
          {["Full Scholarship", "Partial (50%+)", "Entrance Based"].map(
            (amount) => (
              <CheckboxLabel
                key={amount}
                label={amount}
                checked={filters.amount.includes(amount)}
                onChange={() => toggleFilter("amount", amount)}
              />
            ),
          )}
        </FilterSection>

        {/* Provider Type */}
        <FilterSection title="Provider Type">
          {[
            "University",
            "Government",
            "Corporate CSR",
            "Private Foundation",
          ].map((provider) => (
            <CheckboxLabel
              key={provider}
              label={provider}
              checked={filters.providerType.includes(provider)}
              onChange={() => toggleFilter("providerType", provider)}
            />
          ))}
        </FilterSection>
      </div>
    </div>
  );
};

const CheckboxLabel: React.FC<{
  label: string;
  checked: boolean;
  onChange: () => void;
}> = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <div className="relative flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer appearance-none w-5 h-5 border-2 border-slate-200 rounded-lg checked:bg-primary-600 checked:border-primary-600 transition-all cursor-pointer"
      />
      <i className="fa-solid fa-check absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[10px] opacity-0 peer-checked:opacity-100 transition-opacity"></i>
    </div>
    <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">
      {label}
    </span>
  </label>
);

export default ScholarshipFilters;

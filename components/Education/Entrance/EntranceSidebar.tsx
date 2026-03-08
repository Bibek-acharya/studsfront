import React, { useState } from "react";

interface EntranceSidebarProps {
  onReset: () => void;
  selectedFilters: Record<string, string[]>;
  searchValues: {
    stream: string;
    programName: string;
    collegeType: string;
    university: string;
  };
  locationValues: {
    province: string;
    district: string;
  };
  onToggleFilter: (group: string, value: string) => void;
  onSearchChange: (
    field: "stream" | "programName" | "collegeType" | "university",
    value: string,
  ) => void;
  onLocationChange: (field: "province" | "district", value: string) => void;
}

const EntranceSidebar: React.FC<EntranceSidebarProps> = ({
  onReset,
  selectedFilters,
  searchValues,
  locationValues,
  onToggleFilter,
  onSearchChange,
  onLocationChange,
}) => {
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set([
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
    ]),
  );

  const toggleSection = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <aside className="w-full md:w-80 flex-shrink-0 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white z-10">
        <div className="flex items-center gap-2 text-slate-800 font-semibold text-lg">
          <i className="fa-solid fa-filter w-5 h-5 text-blue-600"></i>
          Filters
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors"
        >
          <i className="fa-solid fa-rotate-left w-4 h-4"></i>
          Reset
        </button>
      </div>

      <div className="p-5 flex-grow">
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Quick Filters
          </h3>
          <div className="flex flex-wrap gap-2">
            <QuickBadge
              icon="fa-shield-halved"
              color="bg-emerald-50 text-emerald-600"
              label="Verified"
              active={selectedFilters.quick.includes("Verified")}
              onClick={() => onToggleFilter("quick", "Verified")}
            />
            <QuickBadge
              icon="fa-bolt"
              color="bg-blue-50 text-blue-600"
              label="New"
              active={selectedFilters.quick.includes("New")}
              onClick={() => onToggleFilter("quick", "New")}
            />
            <QuickBadge
              icon="fa-clock"
              color="bg-rose-50 text-rose-600"
              label="Closing"
              active={selectedFilters.quick.includes("Closing")}
              onClick={() => onToggleFilter("quick", "Closing")}
            />
          </div>
        </div>

        <hr className="border-slate-100 mb-6" />

        <div className="space-y-4">
          <FilterGroup id="academicLevel" title="Academic Level / Program" isOpen={openSections.has("academicLevel")} onToggle={toggleSection}>
            <CheckboxOption label="+2 / Higher Secondary" checked={selectedFilters.academicLevel.includes("+2 / Higher Secondary")} onChange={() => onToggleFilter("academicLevel", "+2 / Higher Secondary")} />
            <CheckboxOption label="Bachelor" checked={selectedFilters.academicLevel.includes("Bachelor")} onChange={() => onToggleFilter("academicLevel", "Bachelor")} />
            <CheckboxOption label="Master" checked={selectedFilters.academicLevel.includes("Master")} onChange={() => onToggleFilter("academicLevel", "Master")} />
            <CheckboxOption label="Diploma / CTEVT" checked={selectedFilters.academicLevel.includes("Diploma / CTEVT")} onChange={() => onToggleFilter("academicLevel", "Diploma / CTEVT")} />
            <CheckboxOption label="Other" checked={selectedFilters.academicLevel.includes("Other")} onChange={() => onToggleFilter("academicLevel", "Other")} />
          </FilterGroup>

          <hr className="border-slate-100" />

          <FilterGroup id="stream" title="Stream / Faculty" isOpen={openSections.has("stream")} onToggle={toggleSection}>
            <SearchInput placeholder="Filter Fields..." value={searchValues.stream} onChange={(value) => onSearchChange("stream", value)} />
            <CheckboxOption label="Science" checked={selectedFilters.stream.includes("Science")} onChange={() => onToggleFilter("stream", "Science")} />
            <CheckboxOption label="Management" checked={selectedFilters.stream.includes("Management")} onChange={() => onToggleFilter("stream", "Management")} />
            <CheckboxOption label="Medical" checked={selectedFilters.stream.includes("Medical")} onChange={() => onToggleFilter("stream", "Medical")} />
            <CheckboxOption label="Computer Science" checked={selectedFilters.stream.includes("Computer Science")} onChange={() => onToggleFilter("stream", "Computer Science")} />
          </FilterGroup>

          <hr className="border-slate-100" />

          <FilterGroup id="programName" title="Program Name" isOpen={openSections.has("programName")} onToggle={toggleSection}>
            <SearchInput placeholder="Eg. Bcsit" value={searchValues.programName} onChange={(value) => onSearchChange("programName", value)} />
            <CheckboxOption label="Science" checked={selectedFilters.programName.includes("Science")} onChange={() => onToggleFilter("programName", "Science")} />
            <CheckboxOption label="Management" checked={selectedFilters.programName.includes("Management")} onChange={() => onToggleFilter("programName", "Management")} />
            <CheckboxOption label="Medical" checked={selectedFilters.programName.includes("Medical")} onChange={() => onToggleFilter("programName", "Medical")} />
            <CheckboxOption label="Computer Science" checked={selectedFilters.programName.includes("Computer Science")} onChange={() => onToggleFilter("programName", "Computer Science")} />
          </FilterGroup>

          <hr className="border-slate-100" />

          <FilterGroup id="location" title="Location" isOpen={openSections.has("location")} onToggle={toggleSection}>
            <select value={locationValues.province} onChange={(e) => onLocationChange("province", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-md py-2 px-3 text-sm text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>All Provinces</option>
              <option>Bagmati</option>
              <option>Gandaki</option>
            </select>
            <select value={locationValues.district} onChange={(e) => onLocationChange("district", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-md py-2 px-3 text-sm text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>District</option>
              <option>Kathmandu</option>
              <option>Lalitpur</option>
            </select>
            <CheckboxOption label="National Wide" checked={selectedFilters.location.includes("National Wide")} onChange={() => onToggleFilter("location", "National Wide")} />
          </FilterGroup>

          <hr className="border-slate-100" />

          <FilterGroup id="collegeType" title="Colleges Type" isOpen={openSections.has("collegeType")} onToggle={toggleSection}>
            <SearchInput placeholder="Filter Fields..." value={searchValues.collegeType} onChange={(value) => onSearchChange("collegeType", value)} />
            <CheckboxOption label="Government College" checked={selectedFilters.collegeType.includes("Government College")} onChange={() => onToggleFilter("collegeType", "Government College")} />
            <CheckboxOption label="Private College" checked={selectedFilters.collegeType.includes("Private College")} onChange={() => onToggleFilter("collegeType", "Private College")} />
            <CheckboxOption label="University-affiliated (TU, KU, PU, Purbanchal)" checked={selectedFilters.collegeType.includes("University-affiliated (TU, KU, PU, Purbanchal)")} onChange={() => onToggleFilter("collegeType", "University-affiliated (TU, KU, PU, Purbanchal)")} />
            <CheckboxOption label="Community" checked={selectedFilters.collegeType.includes("Community")} onChange={() => onToggleFilter("collegeType", "Community")} />
            <CheckboxOption label="CTEVT / Gov. Training Center" checked={selectedFilters.collegeType.includes("CTEVT / Gov. Training Center")} onChange={() => onToggleFilter("collegeType", "CTEVT / Gov. Training Center")} />
          </FilterGroup>

          <hr className="border-slate-100" />

          <FilterGroup id="university" title="University" isOpen={openSections.has("university")} onToggle={toggleSection}>
            <SearchInput placeholder="Filter Fields..." value={searchValues.university} onChange={(value) => onSearchChange("university", value)} />
            <CheckboxOption label="TU" checked={selectedFilters.university.includes("TU")} onChange={() => onToggleFilter("university", "TU")} />
            <CheckboxOption label="PU" checked={selectedFilters.university.includes("PU")} onChange={() => onToggleFilter("university", "PU")} />
            <CheckboxOption label="KU" checked={selectedFilters.university.includes("KU")} onChange={() => onToggleFilter("university", "KU")} />
          </FilterGroup>

          <hr className="border-slate-100" />

          <FilterGroup id="admissionStatus" title="Admission Status" isOpen={openSections.has("admissionStatus")} onToggle={toggleSection}>
            <CheckboxOption label="Open" checked={selectedFilters.admissionStatus.includes("Open")} onChange={() => onToggleFilter("admissionStatus", "Open")} />
            <CheckboxOption label="Closing soon" checked={selectedFilters.admissionStatus.includes("Closing soon")} onChange={() => onToggleFilter("admissionStatus", "Closing soon")} />
            <CheckboxOption label="Upcoming" checked={selectedFilters.admissionStatus.includes("Upcoming")} onChange={() => onToggleFilter("admissionStatus", "Upcoming")} />
          </FilterGroup>

          <hr className="border-slate-100" />

          <FilterGroup id="applicationType" title="Application Type" isOpen={openSections.has("applicationType")} onToggle={toggleSection}>
            <CheckboxOption label="Online" checked={selectedFilters.applicationType.includes("Online")} onChange={() => onToggleFilter("applicationType", "Online")} />
            <CheckboxOption label="Offline" checked={selectedFilters.applicationType.includes("Offline")} onChange={() => onToggleFilter("applicationType", "Offline")} />
          </FilterGroup>

          <hr className="border-slate-100" />

          <FilterGroup id="date" title="Date" isOpen={openSections.has("date")} onToggle={toggleSection}>
            <CheckboxOption label="Online" checked={selectedFilters.date.includes("Online")} onChange={() => onToggleFilter("date", "Online")} />
            <CheckboxOption label="Offline" checked={selectedFilters.date.includes("Offline")} onChange={() => onToggleFilter("date", "Offline")} />
          </FilterGroup>

          <hr className="border-slate-100" />

          <FilterGroup id="popularity" title="Popularity" isOpen={openSections.has("popularity")} onToggle={toggleSection}>
            <CheckboxOption label="Most Enrolled" checked={selectedFilters.popularity.includes("Most Enrolled")} onChange={() => onToggleFilter("popularity", "Most Enrolled")} />
            <CheckboxOption label="Trending Programs" checked={selectedFilters.popularity.includes("Trending Programs")} onChange={() => onToggleFilter("popularity", "Trending Programs")} />
          </FilterGroup>
        </div>
      </div>
    </aside>
  );
};

const FilterGroup: React.FC<{
  id: string;
  title: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}> = ({ id, title, isOpen, onToggle, children }) => (
  <div>
    <button
      onClick={() => onToggle(id)}
      className="w-full flex items-center justify-between py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
    >
      <span>{title}</span>
      <i
        className={`fa-solid fa-chevron-down w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
      ></i>
    </button>
    {isOpen && <div className="mt-2 space-y-2.5">{children}</div>}
  </div>
);

const CheckboxOption: React.FC<{
  label: string;
  count?: number;
  checked: boolean;
  onChange: () => void;
}> = ({ label, count, checked, onChange }) => (
  <label className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer hover:text-slate-900 group">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
    />
    <span className="group-hover:translate-x-0.5 transition-transform">{label}</span>
    {count !== undefined && (
      <span className="ml-auto text-[10px] font-bold bg-[#eff4ff] text-[#3b82f6] px-2 py-0.5 rounded-full">
        +{count}
      </span>
    )}
  </label>
);

const SearchInput: React.FC<{
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ placeholder, value, onChange }) => (
  <div className="relative">
    <i className="fa-solid fa-magnifying-glass w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-slate-50 border border-slate-200 rounded-md py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-slate-400"
    />
  </div>
);

const QuickBadge: React.FC<{
  icon: string;
  color: string;
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ icon, color, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-medium transition-colors hover:brightness-95 ${color} ${active ? "ring-1 ring-offset-1 ring-current" : ""}`}
  >
    <i className={`fa-solid ${icon} w-3.5 h-3.5`}></i>
    {label}
  </button>
);

export default EntranceSidebar;

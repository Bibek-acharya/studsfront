import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "../../../services/api";
import { CollegeFilters } from "./FindCollegePage";

interface FilterSidebarProps {
  filters: CollegeFilters;
  setFilters: React.Dispatch<React.SetStateAction<CollegeFilters>>;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters }) => {
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(["academic", "stream", "location", "type"])
  );

  const toggleSection = (id: string) => {
    const newSet = new Set(openSections);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setOpenSections(newSet);
  };

  const toggleType = (typeVal: string) => {
    setFilters(prev => {
      const types = prev.type.includes(typeVal)
        ? prev.type.filter(t => t !== typeVal)
        : [...prev.type, typeVal];
      return { ...prev, type: types };
    });
  };

  const toggleAcademic = (value: string) => {
    setFilters((prev) => {
      const academic = prev.academic.includes(value)
        ? prev.academic.filter((item) => item !== value)
        : [...prev.academic, value];
      return { ...prev, academic };
    });
  };

  const toggleStream = (value: string) => {
    setFilters((prev) => {
      const stream = prev.stream.includes(value)
        ? prev.stream.filter((item) => item !== value)
        : [...prev.stream, value];
      return { ...prev, stream };
    });
  };

  const { data: publicCountData } = useQuery({
    queryKey: ["college-count-public"],
    queryFn: () =>
      apiService.getColleges({ page: 1, pageSize: 1, type: "Public" }),
  });

  const { data: privateCountData } = useQuery({
    queryKey: ["college-count-private"],
    queryFn: () =>
      apiService.getColleges({ page: 1, pageSize: 1, type: "Private" }),
  });

  const publicCount = publicCountData?.data?.pagination?.total ?? 0;
  const privateCount = privateCountData?.data?.pagination?.total ?? 0;

  return (
    <>
      {/* Quick Filters Header */}
      <div className="mb-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          Quick Filters
        </h3>
        <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-100">
          <button
            onClick={() => setFilters(p => ({ ...p, verified: !p.verified }))}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md border transition ${filters.verified
                ? "bg-green-200 text-green-800 border-green-300"
                : "bg-green-50 text-green-700 border-green-100 hover:bg-green-100"
              }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Verified
          </button>
          <button
            onClick={() => setFilters(p => ({ ...p, popular: !p.popular }))}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md border transition ${filters.popular
                ? "bg-amber-200 text-amber-800 border-amber-300"
                : "bg-orange-50 text-orange-700 border-orange-100 hover:bg-orange-100"
              }`}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            Popular
          </button>
        </div>
      </div>

      {/* Filter Categories Container */}
      <div className="space-y-1">

        {/* Academic Level */}
        <CollapsibleSection id="academic" title="Academic Level / Program" isOpen={openSections.has("academic")} onToggle={toggleSection}>
          <FilterCheckbox label="+2 / Higher Secondary" checked={filters.academic.includes("+2")} onChange={() => toggleAcademic("+2")} />
          <FilterCheckbox label="Bachelor" checked={filters.academic.includes("Bachelor")} onChange={() => toggleAcademic("Bachelor")} />
          <FilterCheckbox label="Master" checked={filters.academic.includes("Master")} onChange={() => toggleAcademic("Master")} />
          <FilterCheckbox label="Diploma / CTEVT" checked={filters.academic.includes("Diploma") || filters.academic.includes("CTEVT")} onChange={() => toggleAcademic("CTEVT")} />
          <FilterCheckbox label="Other" checked={filters.academic.includes("Other")} onChange={() => toggleAcademic("Other")} />
        </CollapsibleSection>

        {/* Stream / Faculty */}
        <CollapsibleSection id="stream" title="Stream / Faculty" isOpen={openSections.has("stream")} onToggle={toggleSection}>
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 mb-3">
            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input
              type="text"
              value={filters.search}
              onChange={(event) =>
                setFilters((prev) => ({ ...prev, search: event.target.value }))
              }
              placeholder="Filter Fields..."
              className="bg-transparent border-none text-xs w-full ml-2 text-slate-600 focus:outline-none placeholder-slate-400"
            />
          </div>
          <FilterCheckbox label="Science" checked={filters.stream.includes("Science")} onChange={() => toggleStream("Science")} />
          <FilterCheckbox label="Management" checked={filters.stream.includes("Management")} onChange={() => toggleStream("Management")} />
          <FilterCheckbox label="Medical" checked={filters.stream.includes("Medical")} onChange={() => toggleStream("Medical")} />
          <FilterCheckbox label="Computer Science" checked={filters.stream.includes("Computer Science")} onChange={() => toggleStream("Computer Science")} />
        </CollapsibleSection>

        {/* Location */}
        <CollapsibleSection id="location" title="Location" isOpen={openSections.has("location")} onToggle={toggleSection}>
          <select
            className="w-full text-sm text-slate-600 bg-white border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-blue-400 mb-3"
            value={filters.location}
            onChange={(e) => setFilters(p => ({ ...p, location: e.target.value === "All Provinces" ? "" : e.target.value }))}
          >
            <option value="">All Provinces</option>
            <option value="Bagmati Province">Bagmati Province</option>
            <option value="Koshi Province">Koshi Province</option>
            <option value="Gandaki Province">Gandaki Province</option>
            <option value="Lumbini Province">Lumbini Province</option>
          </select>
          <FilterCheckbox
            label="National Wide"
            checked={filters.nationalWide}
            onChange={() =>
              setFilters((prev) => ({
                ...prev,
                nationalWide: !prev.nationalWide,
                location: !prev.nationalWide ? "" : prev.location,
              }))
            }
          />
        </CollapsibleSection>

        {/* Colleges Type */}
        <CollapsibleSection id="type" title="Colleges Type" isOpen={openSections.has("type")} onToggle={toggleSection}>
          <FilterCheckbox label="Government College" sublabel={`${publicCount} Colleges`} checked={filters.type.includes("Public")} onChange={() => toggleType("Public")} />
          <FilterCheckbox label="Private College" sublabel={`${privateCount} Colleges`} checked={filters.type.includes("Private")} onChange={() => toggleType("Private")} />
          <FilterCheckbox label="University-affiliated" checked={filters.type.includes("Affiliated")} onChange={() => toggleType("Affiliated")} />
          <FilterCheckbox label="Community" checked={filters.type.includes("Community")} onChange={() => toggleType("Community")} />
          <FilterCheckbox label="CTEVT / Gov. Training Center" checked={filters.type.includes("CTEVT")} onChange={() => toggleType("CTEVT")} />
        </CollapsibleSection>

        {/* Total Fee Range */}
        <CollapsibleSection id="fee" title="Total Fee Range (NPR)" isOpen={openSections.has("fee")} onToggle={toggleSection}>
          <FilterCheckbox label="Free / Government Funded" />
          <FilterCheckbox label="Under NPR 50,000" />
          <FilterCheckbox label="NPR 50,000 - 1,00,000" />
          <FilterCheckbox label="NPR 1,00,000 - 2,00,000" />
          <FilterCheckbox label="Above NPR 2,00,000" />
        </CollapsibleSection>

      </div>

      <style>{`
        .filter-checkbox {
            appearance: none;
            width: 16px;
            height: 16px;
            border: 1px solid #cbd5e1;
            border-radius: 4px;
            outline: none;
            cursor: pointer;
            position: relative;
            background-color: white;
            flex-shrink: 0;
        }
        .filter-checkbox:checked {
            background-color: #2563eb;
            border-color: #2563eb;
        }
        .filter-checkbox:checked::after {
            content: '';
            position: absolute;
            top: 2px;
            left: 5px;
            width: 4px;
            height: 8px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }
      `}</style>
    </>
  );
};

const CollapsibleSection: React.FC<{
  id: string;
  title: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}> = ({ id, title, isOpen, onToggle, children }) => (
  <div className="border-b border-slate-100 pb-2 pt-1">
    <button
      onClick={() => onToggle(id)}
      className="flex justify-between items-center w-full py-3 text-sm font-bold text-slate-700 hover:text-blue-600 outline-none"
    >
      <span>{title}</span>
      <svg className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? "" : "-rotate-90"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
    </button>
    <div className={`space-y-2.5 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[1000px] opacity-100 pb-2" : "max-h-0 opacity-0"}`}>
      {children}
    </div>
  </div>
);

const FilterCheckbox: React.FC<{
  label: string;
  sublabel?: string;
  checked?: boolean;
  onChange?: () => void;
}> = ({ label, sublabel, checked, onChange }) => (
  <label className="flex items-center cursor-pointer group">
    <input type="checkbox" className="filter-checkbox" checked={checked} onChange={onChange} />
    <span className="ml-2.5 text-sm text-slate-600 group-hover:text-slate-900 leading-tight">
      {label}
    </span>
    {sublabel && (
      <span className="ml-auto text-[10px] font-semibold bg-blue-50 text-blue-500 px-2 py-0.5 rounded">
        {sublabel}
      </span>
    )}
  </label>
);

export default FilterSidebar;

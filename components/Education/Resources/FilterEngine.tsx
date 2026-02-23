import React, { useState } from "react";
import { ACADEMIC_DATA } from "../../../lib/resources-data";

interface FilterEngineProps {
  onFilterChange: (filters: any) => void;
  onReset: () => void;
}

const FilterEngine: React.FC<FilterEngineProps> = ({
  onFilterChange,
  onReset,
}) => {
  const [filters, setFilters] = useState({
    university: "",
    level: "",
    faculty: "",
    program: "",
    year: "",
    semester: "",
  });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    const newFilters = { ...filters, [id]: value };

    if (id === "university") {
      newFilters.level = "";
      newFilters.faculty = "";
      newFilters.program = "";
    } else if (id === "level") {
      newFilters.faculty = "";
      newFilters.program = "";
    }

    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const universityLevels = filters.university
    ? Object.keys(ACADEMIC_DATA[filters.university] || {})
    : [];
  const levelFaculties =
    filters.university && filters.level
      ? Object.keys(ACADEMIC_DATA[filters.university][filters.level] || {})
      : [];
  const facultyPrograms =
    filters.university && filters.level && filters.faculty
      ? ACADEMIC_DATA[filters.university][filters.level][filters.faculty]
      : [];

  return (
    <div
      id="filter-section"
      className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-fadeInUp"
    >
      <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
        <h3 className="font-black text-slate-800 flex items-center gap-3 text-sm uppercase tracking-tight">
          <i className="fa-solid fa-sliders text-primary-600"></i> Smart Search
        </h3>
        <button
          onClick={() => {
            setFilters({
              university: "",
              level: "",
              faculty: "",
              program: "",
              year: "",
              semester: "",
            });
            onReset();
          }}
          className="text-[10px] font-black text-slate-400 hover:text-rose-500 transition-colors flex items-center gap-2 uppercase tracking-widest"
        >
          <i className="fa-solid fa-rotate-left text-xs"></i> Reset
        </button>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FilterSelect
            id="university"
            label="University"
            value={filters.university}
            onChange={handleSelectChange}
            options={Object.keys(ACADEMIC_DATA)}
          />
          <FilterSelect
            id="level"
            label="Level"
            value={filters.level}
            onChange={handleSelectChange}
            options={universityLevels}
            disabled={!filters.university}
          />
          <FilterSelect
            id="faculty"
            label="Faculty"
            value={filters.faculty}
            onChange={handleSelectChange}
            options={levelFaculties}
            disabled={!filters.level}
          />
          <FilterSelect
            id="program"
            label="Program"
            value={filters.program}
            onChange={handleSelectChange}
            options={facultyPrograms}
            disabled={!filters.faculty}
          />
        </div>
      </div>
    </div>
  );
};

const FilterSelect: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: any;
  options: string[];
  disabled?: boolean;
}> = ({ id, label, value, onChange, options, disabled }) => (
  <div
    className={`space-y-2 transition-opacity ${disabled ? "opacity-40 pointer-events-none" : "opacity-100"}`}
  >
    <label className="text-[10px] uppercase font-black text-slate-300 tracking-[0.2em]">
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-700 outline-none focus:ring-4 focus:ring-primary-50 focus:border-primary-500 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%23cbd5e1%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')] bg-[length:1em] bg-[right_1.25rem_center] bg-no-repeat transition-all"
    >
      <option value="">Choose {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default FilterEngine;

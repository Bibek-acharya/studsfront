import React, { useState } from "react";

const CourseFilters: React.FC = () => {
  const [openSections, setOpenSections] = useState({
    academicLevel: true,
    fieldOfStudy: true,
    location: true,
    feeRange: false,
    scholarship: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden font-jakarta">
      <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-filter text-primary-600"></i>
          <h3 className="font-black text-xl text-slate-900 tracking-tight">
            Filters
          </h3>
        </div>
        <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary-600 transition-colors">
          <i className="fa-solid fa-rotate-left mr-1"></i> Reset
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Filters */}
        <div className="pb-4">
          <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">
            Quick Links
          </h4>
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-black uppercase tracking-wider hover:shadow-sm transition-all">
              Verified
            </button>
            <button className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-black uppercase tracking-wider hover:shadow-sm transition-all">
              Trending
            </button>
            <button className="px-3 py-1.5 rounded-full bg-rose-50 text-rose-600 border border-rose-100 text-[10px] font-black uppercase tracking-wider hover:shadow-sm transition-all">
              Closing
            </button>
          </div>
        </div>

        {/* Academic Level */}
        <CollapsibleSection
          title="Academic Level"
          isOpen={true}
          onToggle={() => {}}
        >
          <FilterCheck id="plus2" label="+2 / Higher Secondary" />
          <FilterCheck id="bachelor" label="Bachelor" checked />
          <FilterCheck id="master" label="Master" />
        </CollapsibleSection>

        {/* Field of Study */}
        <CollapsibleSection
          title="Field of Study"
          isOpen={true}
          onToggle={() => {}}
        >
          <FilterCheck id="it" label="IT & Computer Science" checked />
          <FilterCheck id="engineering" label="Engineering" />
          <FilterCheck id="management" label="Management" />
          <FilterCheck id="medical" label="Medicine & Health" />
        </CollapsibleSection>

        {/* Location */}
        <CollapsibleSection title="Location" isOpen={true} onToggle={() => {}}>
          <div className="space-y-4">
            <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary-100 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')] bg-[length:1em] bg-[right_1rem_center] bg-no-repeat">
              <option>All Provinces</option>
              <option>Bagmati Province</option>
              <option>Gandaki Province</option>
              <option>Lumbini Province</option>
            </select>
            <FilterCheck id="anywhere" label="National Wide" />
          </div>
        </CollapsibleSection>

        {/* Fee Range */}
        <CollapsibleSection
          title="Total Fee Range"
          isOpen={true}
          onToggle={() => {}}
        >
          <FilterCheck id="free" label="Free / Funded" />
          <FilterCheck id="under50" label="Under NPR 50,000" />
          <FilterCheck id="midRange" label="NPR 50k – 2.0L" />
          <FilterCheck id="highRange" label="Above NPR 2.0L" />
        </CollapsibleSection>

        {/* Scholarship */}
        <CollapsibleSection
          title="Scholarship Availability"
          isOpen={true}
          onToggle={() => {}}
        >
          <FilterCheck id="sch-avail" label="Scholarship Available" />
          <FilterCheck id="sch-govt" label="Government Quota" />
          <FilterCheck id="sch-college" label="Merit Based" />
        </CollapsibleSection>
      </div>
    </div>
  );
};

const CollapsibleSection: React.FC<{
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}> = ({ title, isOpen, onToggle, children }) => (
  <div className="border-b border-slate-50 last:border-0 pb-4">
    <button
      onClick={onToggle}
      className="flex justify-between items-center w-full py-2 group"
    >
      <span
        className={`text-[11px] font-black uppercase tracking-[0.15em] transition-colors ${isOpen ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"}`}
      >
        {title}
      </span>
      <i
        className={`fa-solid fa-chevron-down text-[10px] text-slate-300 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      ></i>
    </button>
    {isOpen && (
      <div className="pt-4 space-y-3 animate-fadeInDown">{children}</div>
    )}
  </div>
);

const FilterCheck: React.FC<{
  id: string;
  label: string;
  checked?: boolean;
}> = ({ id, label, checked }) => (
  <label htmlFor={id} className="flex items-center gap-3 group cursor-pointer">
    <div className="relative flex items-center">
      <input
        id={id}
        type="checkbox"
        defaultChecked={checked}
        className="peer appearance-none w-5 h-5 border-2 border-slate-200 rounded-lg checked:bg-primary-600 checked:border-primary-600 transition-all cursor-pointer"
      />
      <i className="fa-solid fa-check absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[10px] opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></i>
    </div>
    <span className="text-xs font-bold text-slate-500 group-hover:text-slate-800 transition-colors">
      {label}
    </span>
  </label>
);

export default CourseFilters;

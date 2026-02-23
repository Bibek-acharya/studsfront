import React, { useState } from "react";

const ExamFilters: React.FC = () => {
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(["examType", "examLevel"]),
  );

  const toggleSection = (id: string) => {
    const newSet = new Set(openSections);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setOpenSections(newSet);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden sticky top-28">
      <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-filter text-primary-600"></i>
          <h3 className="font-black text-xl text-slate-900 tracking-tight">
            Filters
          </h3>
        </div>
        <button className="text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-primary-600 transition-colors">
          Reset
        </button>
      </div>

      <div className="p-6 space-y-8">
        {/* Quick Filters */}
        <div>
          <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">
            Quick Filters
          </h4>
          <div className="flex flex-wrap gap-2">
            <FilterBadge
              icon="fa-clock"
              color="bg-emerald-50 text-emerald-600"
              label="Upcoming"
            />
            <FilterBadge
              icon="fa-file-signature"
              color="bg-blue-50 text-blue-600"
              label="Active"
            />
            <FilterBadge
              icon="fa-fire"
              color="bg-rose-50 text-rose-600"
              label="Popular"
            />
          </div>
        </div>

        {/* Collapsible Sections */}
        <div className="space-y-4">
          <CollapsibleSection
            id="examType"
            title="Exam Type"
            isOpen={openSections.has("examType")}
            onToggle={toggleSection}
          >
            <FilterOption label="Entrance Exam" />
            <FilterOption label="Board Exam" />
            <FilterOption label="Competitive Exam" />
            <FilterOption label="Aptitude Test" />
          </CollapsibleSection>

          <CollapsibleSection
            id="examLevel"
            title="Exam Level"
            isOpen={openSections.has("examLevel")}
            onToggle={toggleSection}
          >
            <FilterOption label="High School (Class 10)" />
            <FilterOption label="+2 / Intermediate" />
            <FilterOption label="Undergraduate (Bachelor)" />
            <FilterOption label="Postgraduate (Master)" />
          </CollapsibleSection>

          <CollapsibleSection
            id="examBoard"
            title="Exam Board"
            isOpen={openSections.has("examBoard")}
            onToggle={toggleSection}
          >
            <FilterOption label="NEB" />
            <FilterOption label="TU" />
            <FilterOption label="KU" />
            <FilterOption label="PU" />
            <FilterOption label="CTEVT" />
            <FilterOption label="Loksewa Aayog" />
          </CollapsibleSection>

          <CollapsibleSection
            id="field"
            title="Field of Study"
            isOpen={openSections.has("field")}
            onToggle={toggleSection}
          >
            <FilterOption label="Engineering" />
            <FilterOption label="Medical & Health" />
            <FilterOption label="Management" />
            <FilterOption label="Law" />
            <FilterOption label="Education" />
          </CollapsibleSection>
        </div>

        <button className="w-full py-4 bg-primary-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary-500/10 hover:bg-primary-700 active:scale-95 transition-all">
          Apply Filter
        </button>
      </div>
    </div>
  );
};

const FilterBadge: React.FC<{ icon: string; color: string; label: string }> = ({
  icon,
  color,
  label,
}) => (
  <div
    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-100 text-[10px] font-black uppercase tracking-wider cursor-pointer hover:shadow-sm transition-all ${color}`}
  >
    <i className={`fa-solid ${icon}`}></i>
    {label}
  </div>
);

const CollapsibleSection: React.FC<{
  id: string;
  title: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}> = ({ id, title, isOpen, onToggle, children }) => (
  <div className="border-b border-slate-50 last:border-0 pb-2">
    <button
      onClick={() => onToggle(id)}
      className="flex justify-between items-center w-full py-2 group"
    >
      <span
        className={`text-sm font-black uppercase tracking-widest transition-colors ${isOpen ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"}`}
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

const FilterOption: React.FC<{ label: string }> = ({ label }) => (
  <label className="flex items-center group cursor-pointer gap-3">
    <input
      type="checkbox"
      className="w-5 h-5 rounded border-2 border-slate-200 text-primary-600 focus:ring-primary-500 transition-all cursor-pointer"
    />
    <span className="text-xs font-bold text-slate-500 group-hover:text-slate-800 transition-colors">
      {label}
    </span>
  </label>
);

export default ExamFilters;

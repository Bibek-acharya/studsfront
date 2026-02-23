import React, { useState } from "react";

const FilterSidebar: React.FC = () => {
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(["academic", "stream"]),
  );

  const toggleSection = (id: string) => {
    const newSet = new Set(openSections);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setOpenSections(newSet);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden font-jakarta">
      <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-sliders text-primary-600"></i>
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
            Quick Search
          </h4>
          <div className="flex flex-wrap gap-2">
            <FilterBadge
              icon="fa-circle-check"
              color="bg-emerald-50 text-emerald-600"
              label="Verified"
            />
            <FilterBadge
              icon="fa-bolt"
              color="bg-blue-50 text-blue-600"
              label="New"
            />
            <FilterBadge
              icon="fa-hourglass-half"
              color="bg-rose-50 text-rose-600"
              label="Closing"
            />
          </div>
        </div>

        {/* Collapsible Sections */}
        <div className="space-y-4">
          <CollapsibleSection
            id="academic"
            title="Academic Level"
            isOpen={true}
            onToggle={() => {}}
          >
            <FilterOption label="+2 / High School" count="210" />
            <FilterOption label="Bachelor" count="540" />
            <FilterOption label="Master" count="120" />
            <FilterOption label="Diploma" count="85" />
          </CollapsibleSection>

          <CollapsibleSection
            id="stream"
            title="Stream / Faculty"
            isOpen={true}
            onToggle={() => {}}
          >
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search Faculty..."
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 pl-9 pr-4 text-xs font-bold outline-none focus:border-primary-500 transition-all"
              />
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-[10px]"></i>
            </div>
            <FilterOption label="Science" count="150" />
            <FilterOption label="Management" count="200" />
            <FilterOption label="IT & Computing" count="180" />
            <FilterOption label="Humanities" count="70" />
          </CollapsibleSection>

          <CollapsibleSection
            id="location"
            title="Location"
            isOpen={true}
            onToggle={() => {}}
          >
            <select className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-primary-50 font-bold text-xs appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%23cbd5e1%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')] bg-[length:1em] bg-[right_1rem_center] bg-no-repeat">
              <option>All Provinces</option>
              <option>Bagmati Province</option>
              <option>Gandaki Province</option>
            </select>
          </CollapsibleSection>

          <CollapsibleSection
            id="type"
            title="College Type"
            isOpen={true}
            onToggle={() => {}}
          >
            <FilterOption label="Government" count="45" />
            <FilterOption label="Private" count="320" />
            <FilterOption label="University Affiliated" count="180" />
          </CollapsibleSection>

          <CollapsibleSection
            id="fee"
            title="Total Fee Range"
            isOpen={true}
            onToggle={() => {}}
          >
            <FilterOption label="Free / Funded" />
            <FilterOption label="Under 1 Lakh" />
            <FilterOption label="1L - 3L NPR" />
            <FilterOption label="Above 3 Lakh" />
          </CollapsibleSection>
        </div>
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

const FilterOption: React.FC<{ label: string; count?: string }> = ({
  label,
  count,
}) => (
  <label className="flex items-center justify-between group cursor-pointer">
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        className="w-5 h-5 rounded border-2 border-slate-200 text-primary-600 focus:ring-primary-500 transition-all cursor-pointer"
      />
      <span className="text-xs font-bold text-slate-500 group-hover:text-slate-800 transition-colors">
        {label}
      </span>
    </div>
    {count && (
      <span className="text-[10px] font-black text-primary-600 bg-primary-50 px-2 py-0.5 rounded-lg border border-primary-100">
        {count}
      </span>
    )}
  </label>
);

export default FilterSidebar;

import React from "react";

interface SidebarProps {
  affiliationFilters: string[];
  onFilterChange: (affiliation: string) => void;
  onReset: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  affiliationFilters,
  onFilterChange,
  onReset,
}) => {
  return (
    <div className="w-full bg-white rounded-2xl p-8 shadow-sm border border-slate-100 h-fit sticky top-28 font-jakarta overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary-50 rounded-bl-3xl -mr-12 -mt-12 transition-transform group-hover:scale-110"></div>

      <div className="flex items-center justify-between mb-10 relative z-10">
        <div className="flex items-center gap-3 text-slate-900 font-black text-xl tracking-tight">
          <i className="fa-solid fa-filter text-primary-600"></i>
          <span>Filters</span>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-slate-300 hover:text-primary-600 transition-colors text-[10px] font-black uppercase tracking-widest"
        >
          <i className="fa-solid fa-rotate-left"></i>
          <span>Reset</span>
        </button>
      </div>

      <div className="mb-6 relative z-10">
        <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-6">
          Affiliation Board
        </h3>
        <div className="space-y-6">
          <FilterCheckbox
            label="Nepal University"
            count="+3,200 Colleges"
            checked={affiliationFilters.includes("Nepal University")}
            onChange={() => onFilterChange("Nepal University")}
          />
          <FilterCheckbox
            label="Foreign Affiliated"
            count="200 Colleges"
            checked={affiliationFilters.includes(
              "Foreign Affiliated University",
            )}
            onChange={() => onFilterChange("Foreign Affiliated University")}
          />
        </div>
      </div>
    </div>
  );
};

const FilterCheckbox: React.FC<{
  label: string;
  count: string;
  checked: boolean;
  onChange: () => void;
}> = ({ label, count, checked, onChange }) => (
  <label className="flex items-center cursor-pointer group/item">
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />
      <div className="w-6 h-6 border-2 border-slate-200 rounded-lg peer-checked:bg-primary-600 peer-checked:border-primary-600 transition-all flex items-center justify-center">
        <i className="fa-solid fa-check text-white text-[10px] opacity-0 peer-checked:opacity-100 transition-opacity"></i>
      </div>
    </div>
    <div className="ml-4">
      <span className="block text-sm font-black text-slate-600 group-hover/item:text-slate-900 transition-colors">
        {label}
      </span>
      <span className="text-[9px] font-black text-primary-500 bg-primary-50 px-2 py-0.5 rounded-lg border border-primary-100 uppercase tracking-widest inline-block mt-1">
        {count}
      </span>
    </div>
  </label>
);

export default Sidebar;

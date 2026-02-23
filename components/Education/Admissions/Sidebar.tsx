import React, { useState } from "react";

const SidebarFilters: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden font-jakarta">
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
        {/* Quick Search */}
        <div>
          <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">
            Quick Search
          </h4>
          <div className="flex flex-wrap gap-2">
            <QuickBadge
              icon="fa-circle-check"
              color="bg-emerald-50 text-emerald-600"
              label="Verified"
            />
            <QuickBadge
              icon="fa-bolt"
              color="bg-blue-50 text-blue-600"
              label="New"
            />
            <QuickBadge
              icon="fa-clock"
              color="bg-rose-50 text-rose-600"
              label="Closing"
            />
          </div>
        </div>

        <FilterGroup title="Academic Level / Program">
          <CheckboxOption label="+2 / High School" count={210} />
          <CheckboxOption label="Bachelor" count={540} checked />
          <CheckboxOption label="Master" count={120} />
          <CheckboxOption label="Diploma / CTEVT" count={85} />
        </FilterGroup>

        <FilterGroup title="Stream / Faculty">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Filter Fields..."
              className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold outline-none focus:border-primary-500 transition-all"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300">
              <i className="fa-solid fa-magnifying-glass text-[10px]"></i>
            </div>
          </div>
          <CheckboxOption label="Science" count={150} />
          <CheckboxOption label="Management" count={200} />
          <CheckboxOption label="Medical" count={65} />
          <CheckboxOption label="Computer Science" count={180} />
        </FilterGroup>

        <FilterGroup title="Location">
          <select className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-primary-50 font-bold text-xs appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%23cbd5e1%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')] bg-[length:1em] bg-[right_1rem_center] bg-no-repeat mb-4">
            <option>All Provinces</option>
          </select>
          <CheckboxOption label="National Wide" />
        </FilterGroup>
      </div>
    </div>
  );
};

const FilterGroup: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="border-b border-slate-50 last:border-0 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 group"
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
};

const CheckboxOption: React.FC<{
  label: string;
  count?: number;
  checked?: boolean;
}> = ({ label, count, checked }) => (
  <label className="flex items-center group cursor-pointer justify-between">
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        defaultChecked={checked}
        className="w-5 h-5 rounded border-2 border-slate-200 text-primary-600 focus:ring-primary-500 transition-all cursor-pointer"
      />
      <span className="text-xs font-bold text-slate-500 group-hover:text-slate-800 transition-colors">
        {label}
      </span>
    </div>
    {count !== undefined && (
      <span className="text-[10px] font-black text-primary-600 bg-primary-50 px-2 py-0.5 rounded-lg border border-primary-100">
        +{count}
      </span>
    )}
  </label>
);

const QuickBadge: React.FC<{ icon: string; color: string; label: string }> = ({
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

export default SidebarFilters;

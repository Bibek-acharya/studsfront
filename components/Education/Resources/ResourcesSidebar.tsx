import React, { useState } from "react";

const ResourcesSidebar: React.FC = () => {
  return (
    <div className="space-y-6 sticky top-28">
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-filter text-blue-600"></i>
            <h3 className="font-black text-slate-900 text-sm uppercase tracking-tight">
              Filters
            </h3>
          </div>
          <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">
            <i className="fa-solid fa-rotate-right"></i> Reset
          </button>
        </div>

        <div className="divide-y divide-slate-50">
          <FilterSection title="University/Board" defaultOpen={true}>
            <div className="relative mb-4">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-xs"></i>
              <input
                type="text"
                placeholder="Filter Fields..."
                className="w-full bg-slate-50 border border-slate-100 rounded-lg py-2 pl-9 pr-4 text-xs font-medium outline-none focus:ring-1 focus:ring-blue-500/20"
              />
            </div>
            <div className="space-y-2">
              <Checkbox label="TU" />
              <Checkbox label="pu" />
              <Checkbox label="KU" />
            </div>
          </FilterSection>

          <FilterSection title="Academic Level / Program" defaultOpen={true}>
            <div className="space-y-2">
              <Checkbox label="+2 / Higher Secondary" />
              <Checkbox label="Bachelor" checked />
              <Checkbox label="Master" />
              <Checkbox label="Diploma / CTEVT" />
              <Checkbox label="Other" />
            </div>
          </FilterSection>

          <FilterSection title="Stream / Faculty">
            <div className="relative mb-4">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-xs"></i>
              <input
                type="text"
                placeholder="Filter Fields..."
                className="w-full bg-slate-50 border border-slate-100 rounded-lg py-2 pl-9 pr-4 text-xs font-medium outline-none focus:ring-1 focus:ring-blue-500/20"
              />
            </div>
            <div className="space-y-2">
              <Checkbox label="Science" />
              <Checkbox label="Management" />
              <Checkbox label="Medical" />
              <Checkbox label="Computer Science" />
            </div>
          </FilterSection>

          <FilterSection title="Program Name">
            <div className="relative mb-4">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-xs"></i>
              <input
                type="text"
                placeholder="Eg. Bcsit"
                className="w-full bg-slate-50 border border-slate-100 rounded-lg py-2 pl-9 pr-4 text-xs font-medium outline-none focus:ring-1 focus:ring-blue-500/20"
              />
            </div>
            <div className="space-y-2">
              <Checkbox label="Science" />
              <Checkbox label="Management" />
              <Checkbox label="Medical" />
              <Checkbox label="Computer Science" />
            </div>
          </FilterSection>

          <FilterSection title="Year">
            <div className="space-y-2">
              <Checkbox label="1 st Year" />
              <Checkbox label="1 st Year" />
              <Checkbox label="1 st Year" />
              <Checkbox label="1 st Year" />
            </div>
          </FilterSection>

          <FilterSection title="Semester">
            <div className="grid grid-cols-2 gap-2">
              <Checkbox label="1 Semester" />
              <Checkbox label="1 Semester" />
              <Checkbox label="1 Semester" />
              <Checkbox label="1 Semester" />
              <Checkbox label="1 Semester" />
              <Checkbox label="1 Semester" />
              <Checkbox label="1 Semester" />
              <Checkbox label="1 Semester" />
            </div>
          </FilterSection>

          <FilterSection title="Subject">
            <div className="space-y-2">
              <Checkbox label="Open" />
              <Checkbox label="Closing soon" />
              <Checkbox label="Upcoming" />
            </div>
          </FilterSection>

          <FilterSection title="Select Resources">
            <div className="space-y-2">
              <Checkbox label="Notes & Summary" />
              <Checkbox label="Syllabus" />
              <Checkbox label="Books & Pdf" />
              <Checkbox label="Solutions" />
              <Checkbox label="Study Guides" />
            </div>
          </FilterSection>
        </div>
      </div>

      {/* Top Contributors */}
      <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
        <h3 className="font-black text-slate-900 text-sm uppercase tracking-tight mb-6 flex items-center gap-2">
          <i className="fa-solid fa-trophy text-amber-500"></i> TOP CONTRIBUTORS
        </h3>

        <div className="space-y-3">
          <ContributorCard
            name="Jagdish Dhami"
            uploads="156"
            downloads="5.2k"
            rank={1}
          />
          <ContributorCard
            name="Jagdish Dhami"
            uploads="156"
            downloads="5.2k"
            rank={1}
            isSilver
          />
          <ContributorCard
            name="Jagdish Dhami"
            uploads="156"
            downloads="5.2k"
            rank={1}
            isBronze
          />
        </div>
      </div>
    </div>
  );
};

const FilterSection: React.FC<{
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="p-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-slate-800 font-black text-xs uppercase tracking-tight hover:text-blue-600 transition-colors mb-4"
      >
        {title}
        <i
          className={`fa-solid fa-chevron-down text-[10px] transition-transform ${isOpen ? "rotate-180" : ""}`}
        ></i>
      </button>
      {isOpen && <div className="animate-fadeIn">{children}</div>}
    </div>
  );
};

const Checkbox: React.FC<{ label: string; checked?: boolean }> = ({
  label,
  checked = false,
}) => (
  <label className="flex items-center gap-3 group cursor-pointer">
    <div
      className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${checked ? "bg-blue-600 border-blue-600" : "bg-white border-slate-200 group-hover:border-blue-400"}`}
    >
      {checked && <i className="fa-solid fa-check text-white text-[10px]"></i>}
    </div>
    <span
      className={`text-xs font-medium uppercase tracking-tight ${checked ? "text-slate-800 font-bold" : "text-slate-500"}`}
    >
      {label}
    </span>
  </label>
);

const ContributorCard: React.FC<{
  name: string;
  uploads: string;
  downloads: string;
  rank: number;
  isSilver?: boolean;
  isBronze?: boolean;
}> = ({ name, uploads, downloads, rank, isSilver, isBronze }) => (
  <div className="flex items-center gap-3 group cursor-pointer p-1.5 rounded-xl hover:bg-slate-50 transition-colors">
    <div className="relative shrink-0">
      <img
        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}-${isSilver ? "2" : isBronze ? "3" : "1"}`}
        className="w-10 h-10 rounded-full bg-slate-100 object-cover border-2 border-white shadow-sm"
        alt=""
      />
      <div
        className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black text-white border-2 border-white shadow-lg ${isSilver ? "bg-slate-300" : isBronze ? "bg-orange-400" : "bg-amber-400"}`}
      >
        {rank}
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[13px] font-black text-slate-800 truncate uppercase tracking-tight group-hover:text-blue-600 transition-colors">
        {name}
      </div>
      <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5 whitespace-nowrap">
        {uploads} <span className="lowercase">up</span>{" "}
        <span className="mx-0.5">•</span> {downloads}{" "}
        <span className="lowercase">dn</span>
      </div>
    </div>
  </div>
);

export default ResourcesSidebar;

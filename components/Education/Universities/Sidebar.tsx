import React from "react";

interface SidebarProps {
  affiliationFilters: string[];
  onFilterChange: (affiliation: string) => void;
  onRemoveFilter: (affiliation: string) => void;
  onReset: () => void;
  nepalUniversityCount: number;
  foreignAffiliatedCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  affiliationFilters,
  onFilterChange,
  onRemoveFilter,
  onReset,
  nepalUniversityCount,
  foreignAffiliatedCount,
}) => {
  return (
    <aside className="w-full lg:w-[280px] flex-shrink-0 bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.02)]">
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500 font-medium">Active :</span>
          <button
            onClick={onReset}
            className="text-[#3b82f6] hover:text-blue-800 font-medium text-xs ml-auto"
          >
            Clear All
          </button>
        </div>

        {affiliationFilters.length > 0 ? (
          affiliationFilters.map((filter) => (
            <div
              key={filter}
              className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 pl-3 pr-1 py-1 rounded-full text-gray-700 font-semibold text-xs w-fit"
            >
              {filter}
              <button
                onClick={() => onRemoveFilter(filter)}
                className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-700 transition-colors"
              >
                <i className="fa-solid fa-xmark text-[10px]"></i>
              </button>
            </div>
          ))
        ) : (
          <span className="text-xs text-gray-400 font-medium">No active filters</span>
        )}
      </div>

      <hr className="border-gray-100 mb-6" />

      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2 font-bold text-lg text-gray-900">
          <i className="fa-solid fa-filter text-[#1a56db] text-base"></i>
          Filters
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-bold text-sm text-gray-800">Affiliation</span>

          <FilterCheckbox
            label="Nepal University"
            count={nepalUniversityCount}
            checked={affiliationFilters.includes("Nepal University")}
            onChange={() => onFilterChange("Nepal University")}
          />

          <FilterCheckbox
            label="Foreign Affiliated"
            count={foreignAffiliatedCount}
            checked={affiliationFilters.includes("Foreign Affiliated")}
            onChange={() => onFilterChange("Foreign Affiliated")}
          />
        </div>
      </div>
    </aside>
  );
};

const FilterCheckbox: React.FC<{
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
}> = ({ label, count, checked, onChange }) => (
  <label className="flex items-center cursor-pointer group">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-[1.15em] h-[1.15em] rounded border border-gray-300 accent-[#1a56db] cursor-pointer"
    />
    <span className="ml-3 text-sm text-gray-600 font-medium group-hover:text-gray-900">
      {label}
    </span>
    <span className="ml-auto text-[10px] font-bold bg-[#eff4ff] text-[#3b82f6] px-2 py-0.5 rounded-full">
      {count}
    </span>
  </label>
);

export default Sidebar;

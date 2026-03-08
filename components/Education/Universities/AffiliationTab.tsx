import React from "react";
import { University } from "./types";

interface AffiliationTabProps {
  university: University;
  isActive: boolean;
  onClick: () => void;
}

const AffiliationTab: React.FC<AffiliationTabProps> = ({
  university,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative min-w-[240px] flex-shrink-0 rounded-xl p-5 text-left transition-all duration-200 ${
        isActive
          ? "border-2 border-[#3B82F6] bg-white shadow-[0_2px_6px_rgba(59,130,246,0.12)]"
          : "border-2 border-transparent bg-white hover:border-gray-100 hover:shadow-md"
      }`}
    >
      {isActive && (
        <div className="absolute right-4 top-4 text-[#3B82F6]">
          <i className="fa-solid fa-circle-check text-base"></i>
        </div>
      )}

      <h3 className="mb-1.5 text-[16px] font-bold text-gray-900">
        {university.name}
      </h3>

      <div className="flex items-center text-[13px] font-medium text-[#3B82F6]">
        <span>{university.collegesCount.toLocaleString()} colleges</span>
        <i className="fa-solid fa-chevron-right ml-1 mt-0.5 text-[11px]"></i>
      </div>
    </button>
  );
};

export default AffiliationTab;

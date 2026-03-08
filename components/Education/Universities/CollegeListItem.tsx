import React from "react";
import { College } from "./types";

interface CollegeListItemProps {
  college: College;
  onClick?: () => void;
}

const CollegeListItem: React.FC<CollegeListItemProps> = ({ college, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group flex cursor-pointer items-center justify-between rounded-[16px] border border-[#E5E7EB] bg-white p-5 transition-all duration-300 hover:border-blue-300 hover:shadow-[0_4px_20px_-4px_rgba(59,130,246,0.12)]"
    >
      <div className="flex items-center gap-4">
        <div className="h-[68px] w-[68px] flex-shrink-0 overflow-hidden rounded-[14px] border border-gray-200 bg-white p-1 shadow-sm">
        <img
          src={college.logo}
          alt="Logo"
          className="w-full h-full object-contain"
        />
      </div>

        <div className="flex flex-col">
          <h3 className="mb-1.5 text-[17px] font-bold leading-tight text-gray-900 transition-colors group-hover:text-[#3B82F6]">
          {college.name}
        </h3>

          <div className="mb-3 flex items-center">
            <div className="flex items-center gap-1">
              <i className="fa-solid fa-star text-sm text-[#F59E0B]"></i>
              <span className="mt-0.5 text-[13px] font-bold text-gray-800">
              {college.rating}
            </span>
            </div>

            <div className="mx-2.5 h-3.5 w-px bg-gray-300"></div>

            <span className="mt-0.5 text-[12px] font-medium text-gray-500">
              {college.reviews} reviews
            </span>
          </div>

          <div className="flex gap-2">
            <span className="rounded-full border border-gray-100 bg-gray-50 px-3 py-1 text-[11px] font-medium text-gray-600 transition-colors group-hover:border-blue-100 group-hover:bg-blue-50 group-hover:text-blue-600">
            {college.affiliation}
          </span>
            <span className="rounded-full border border-gray-100 bg-gray-50 px-3 py-1 text-[11px] font-medium text-gray-600 transition-colors group-hover:border-blue-100 group-hover:bg-blue-50 group-hover:text-blue-600">
            {college.type}
          </span>
          </div>
        </div>
      </div>

      <div className="pr-1">
        <i className="fa-solid fa-chevron-right text-gray-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#3B82F6]"></i>
      </div>
    </div>
  );
};

export default CollegeListItem;

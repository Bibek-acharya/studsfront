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
      className="flex cursor-pointer flex-col rounded-[16px] border border-gray-100 bg-white p-2.5 shadow-[0_2px_15px_rgb(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative h-[140px] overflow-hidden rounded-[12px]">
        <div className="absolute left-2 top-2 z-20 rounded-[4px] bg-[#0866FF] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
          Featured
        </div>

        <img
          src={college.logo}
          alt={college.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-grow flex-col px-1.5 pb-1 pt-3">
        <div className="flex items-center gap-1.5">
          <h3 className="truncate text-[15px] font-bold text-gray-900 transition-colors hover:text-[#2563eb]">
            {college.name}
          </h3>
          <span className="text-xs text-[#0866FF]">✔</span>
        </div>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[11.5px] font-medium leading-none text-gray-500">
          <div className="flex items-center gap-1 text-gray-700">
            <span className="text-[#f59e0b]">★</span>
            <span className="font-bold">{college.rating}</span>
          </div>
          <div className="h-3 w-[1px] bg-gray-300"></div>
          <div>{college.type}</div>
          <div className="h-3 w-[1px] bg-gray-300"></div>
          <div className="truncate">{college.affiliation}</div>
          <div className="h-3 w-[1px] bg-gray-300"></div>
          <div>{college.reviews} reviews</div>
        </div>

        <hr className="my-2.5 border-gray-100" />

        <div className="mb-2 flex items-center justify-between">
          <h4 className="text-[12px] font-semibold text-gray-500">Affiliation & Info</h4>
          <span className="text-[11px] font-bold text-[#2563eb]">College</span>
        </div>

        <div className="mb-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="mr-2 truncate text-[11.5px] font-semibold text-gray-800 transition-colors hover:text-[#2563eb]">
              {college.affiliation}
            </span>
            <span className="flex shrink-0 items-center text-[9px] font-bold text-emerald-600">
              <span className="mr-1 h-1 w-1 rounded-full bg-emerald-500"></span> Ongoing
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="mr-2 truncate text-[11.5px] font-semibold text-gray-800 transition-colors hover:text-[#2563eb]">
              {college.type}
            </span>
            <span className="flex shrink-0 items-center text-[9px] font-bold text-emerald-600">
              <span className="mr-1 h-1 w-1 rounded-full bg-emerald-500"></span> Active
            </span>
          </div>
        </div>

        <div className="mb-3">
          <button
            onClick={(event) => event.stopPropagation()}
            className="inline-flex items-center text-[11.5px] font-semibold text-[#2563eb] hover:underline"
          >
            View details <span className="ml-0.5">›</span>
          </button>
        </div>

        <div className="mt-auto">
          <div className="mb-2.5 border-t-2 border-dotted border-gray-200"></div>
          <div className="flex gap-2">
            <button
              onClick={(event) => event.stopPropagation()}
              className="flex-[1.2] whitespace-nowrap rounded-[4px] border border-gray-200 bg-white px-1 py-1.5 text-[11px] font-bold text-gray-800 transition-colors hover:bg-gray-50 sm:text-[12px]"
            >
              Get Counselling
            </button>
            <button
              onClick={(event) => event.stopPropagation()}
              className="flex-1 whitespace-nowrap rounded-[4px] bg-[#2563eb] px-1 py-1.5 text-[11px] font-bold text-white shadow-sm transition-colors hover:bg-blue-700 sm:text-[12px]"
            >
              Apply Now
            </button>
            <button
              onClick={(event) => event.stopPropagation()}
              className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[4px] border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50"
            >
              ♡
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeListItem;

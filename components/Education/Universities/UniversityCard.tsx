import React, { useState } from "react";
import { University } from "./types";

interface UniversityCardProps {
  university: University;
  onNavigate?: (view: any, data?: any) => void;
  onShowColleges?: (uniId: number) => void;
}

const UniversityCard: React.FC<UniversityCardProps> = ({
  university,
  onNavigate,
  onShowColleges,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const popularTags = university.popularPrograms?.slice(0, 4) || [];
  const logoLabel = university.name
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <article className="bg-white border border-gray-100 rounded-2xl p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.02)] hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <header className="flex gap-3 items-start">
        <div className="w-12 h-12 rounded-xl bg-[#2b6cb0] flex items-center justify-center flex-shrink-0 shadow-sm text-white font-bold text-xs overflow-hidden">
          {university.logo ? (
            <img
              src={university.logo}
              alt={university.name}
              className="w-full h-full object-cover"
            />
          ) : (
            logoLabel
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-base text-gray-900 leading-tight mb-1 truncate">
            {university.name}
          </h2>
          <div className="flex items-center text-[11px] text-gray-500 gap-1.5 mb-1.5 font-medium truncate">
            <i className="fa-solid fa-location-dot text-gray-600"></i>
            <span className="truncate">{university.location}</span>
          </div>

          <div className="flex items-center text-[11px] text-gray-500 gap-1.5 mb-2.5">
            <span className="flex items-center gap-1 text-gray-800 font-bold">
              <i className="fa-solid fa-star text-[#3b82f6]"></i>
              {Number(university.rating || 0).toFixed(1)}
            </span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1 font-medium truncate">
              <i className="fa-solid fa-building text-gray-500"></i>
              {university.type}
            </span>
          </div>

          <div className="flex gap-1.5 flex-wrap">
            <span className="bg-[#e6f4ea] text-[#1e8e3e] text-[9px] font-bold px-1.5 py-0.5 rounded-md flex items-center">
              Rank # {university.rank}
            </span>
            <span className="bg-[#fef0db] text-[#e67c00] text-[9px] font-bold px-1.5 py-0.5 rounded-md flex items-center">
              Popular
            </span>
          </div>
        </div>
      </header>

      <div className="my-4 py-3 flex gap-2 border-y border-dashed border-gray-200">
        <div className="flex flex-1 items-center justify-center gap-2 sm:gap-3 border-r border-dashed border-gray-200 pr-2">
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 flex-shrink-0">
            <i className="fa-solid fa-book-open text-gray-500 text-xs"></i>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[14px] text-gray-900 leading-tight">
              {university.programsCount}
            </span>
            <span className="text-[10px] text-gray-500 font-medium">Programs</span>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center gap-2 sm:gap-3 pl-2">
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 flex-shrink-0">
            <i className="fa-solid fa-building-columns text-gray-500 text-xs"></i>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[14px] text-gray-900 leading-tight">
              {university.collegesCount}
            </span>
            <span className="text-[10px] text-gray-500 font-medium">Colleges</span>
          </div>
        </div>
      </div>

      <div className="mb-5 flex-grow">
        <span className="text-[10px] text-[#8ea5d9] mb-2 block font-semibold uppercase tracking-wider">
          Popular
        </span>
        <div className="flex flex-wrap gap-1.5 items-center">
          {popularTags.map((program, idx) => (
            <span
              key={idx}
              className="text-[10px] bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full text-gray-500 font-medium whitespace-nowrap"
            >
              {program}
            </span>
          ))}
          <span className="text-[10px] text-gray-400 font-medium py-1 px-1 whitespace-nowrap">
            +More
          </span>
        </div>
      </div>

      <footer className="flex gap-2 mt-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate?.("universityDetails", { id: university.id });
          }}
          className="flex-1 bg-white border border-gray-200 rounded-lg py-3 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
        >
          Details
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onShowColleges?.(university.id);
          }}
          className="flex-[1.2] bg-[#111827] text-white hover:bg-gray-800 rounded-lg py-3 text-[13px] font-semibold transition-colors shadow-sm"
        >
          View Colleges
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className={`w-11 h-11 bg-white border rounded-lg flex items-center justify-center flex-shrink-0 transition-all shadow-sm ${
            isFavorite
              ? "border-red-200 text-red-500"
              : "border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-red-500 hover:border-red-200"
          }`}
        >
          <i className="fa-regular fa-heart"></i>
        </button>
      </footer>
    </article>
  );
};

export default UniversityCard;

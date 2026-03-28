import React, { useState } from "react";
import { BadgeCheckIcon, LockIcon } from "lucide-react";
import { College } from "./types";

interface CollegeListItemProps {
  college: College;
  onNavigate: (view: any, data?: any) => void;
  onClaim?: () => void;
}

const CollegeListItem: React.FC<CollegeListItemProps> = ({ 
  college, 
  onNavigate,
  onClaim 
}) => {
  const [isSaved, setIsSaved] = useState(false);

  const description =
    (typeof (college as any).description === "string" && (college as any).description.trim()) ||
    "Explore academics, facilities, and counselling support for this college.";

  const image = college.logo || (college as any).image_url || "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop";
  const isVerified = (college as any).verified ?? true; // Default to true if not specified for list items? Or false? 
  // Looking at the old code, it had a hardcoded checkmark span.

  return (
    <div className="flex h-full cursor-pointer flex-col rounded-[16px] border border-gray-100 bg-white p-2.5 shadow-[0_2px_15px_rgb(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-1">
      <div
        onClick={() => onNavigate("collegeDetails", { id: college.id })}
        className="group relative h-[140px] shrink-0 overflow-hidden rounded-[12px] text-left"
      >
        <img
          src={image}
          alt={college.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col px-1.5 pb-1 pt-3">
        <div className="flex items-center justify-between">
          <div className="flex w-full items-center gap-1.5">
            <button
              type="button"
              onClick={() => onNavigate("collegeDetails", { id: college.id })}
              className="truncate text-left text-[15px] font-bold text-gray-900 transition-colors hover:text-[#2563eb]"
              title={college.name}
            >
              {college.name}
            </button>
            {isVerified && (
              <BadgeCheckIcon className="text-white fill-blue-500" size={16}/>
            )}
          </div>
        </div>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[11.5px] font-medium leading-none text-gray-500">
          <div className="flex items-center gap-1 text-gray-700">
            <i className="fa-solid fa-star text-[12px] text-[#f59e0b]"></i>
            <span className="font-bold">{Number(college.rating || 0).toFixed(1)}</span>
          </div>
          <div className="h-3 w-px bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <i className="fa-regular fa-building text-[12px] text-gray-400"></i>
            {college.type || "College"}
          </div>
          <div className="h-3 w-px bg-gray-300"></div>
          <div className="flex max-w-[90px] items-center gap-1 truncate">
            <i className="fa-solid fa-location-dot shrink-0 text-[12px] text-gray-400"></i>
            <span className="truncate">{(college as any).location || "Kathmandu"}</span>
          </div>
          <div className="mt-1.5 flex w-full items-start gap-1 text-gray-600">
            <i className="fa-solid fa-award mt-[2px] shrink-0 text-[12px] text-gray-400"></i>
            <span className="leading-tight">
              {college.affiliation || "University Affiliated"}
            </span>
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-[11.5px] leading-relaxed text-gray-600">
          {description}
        </p>

        <div className="mt-auto pt-4">
          <div className="mb-2.5 border-t-2 border-dotted border-gray-200"></div>

          {!isVerified && (
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="text-[11px] text-gray-500">Is this your college?</span>
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClaim?.();
                }} 
                className="text-[11px] font-semibold text-[#2563eb] hover:underline"
              >
                Claim now
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={(e) => {
              if (isVerified) {
                onNavigate("bookCounselling", { collegeId: college.id });
              } else {
                e.stopPropagation();
              }
            }}
            className="mb-1.5 flex h-[36px] w-full items-center justify-center truncate rounded-[4px] bg-[#2563eb] px-1 text-[11.5px] font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            {!isVerified && <LockIcon className="mr-1.5" size={14} />}
            Get counselling
          </button>

          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => onNavigate("campusForum", { collegeId: college.id, collegeName: college.name })}
              className="flex flex-1 items-center justify-center gap-1 rounded-[4px] border border-gray-200 bg-white px-1 text-[11px] font-bold text-gray-800 transition-colors hover:bg-gray-50 h-[32px]"
            >
              <i className="fa-regular fa-message text-[12px] text-gray-500"></i>
              <span className="truncate">Ask a question</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate("compareColleges", { collegeName: college.name })}
              className="flex h-[32px] flex-1 items-center justify-center truncate rounded-[4px] bg-yellow-500 px-1 text-[11.5px] font-bold text-white shadow-sm transition-colors hover:bg-yellow-600"
            >
              Compare now
            </button>
            <button
              type="button"
              onClick={() => setIsSaved(!isSaved)}
              className="group flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[4px] border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50"
              aria-label={isSaved ? "Remove from saved colleges" : "Save college"}
            >
              <i className={`fa-${isSaved ? "solid" : "regular"} fa-heart text-[14px] transition-colors ${isSaved ? "text-red-500" : "group-hover:text-red-500"}`}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeListItem;

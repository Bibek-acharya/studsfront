import React from "react";

export interface ScholarshipCardItem {
  id: number;
  title: string;
  provider: string;
  type: string;
  status: "OPEN" | "CLOSING SOON" | "CLOSED" | "SOON" | string;
  amount: string;
  location: string;
  eligibility: string;
  deadline: string;
  image: string;
  verified?: boolean;
}

interface ScholarshipListCardProps {
  item: ScholarshipCardItem;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
  onDetails: (id: number) => void;
  onApply: (id: number, title: string, type: string) => void;
}

const ScholarshipListCard: React.FC<ScholarshipListCardProps> = ({
  item,
  isBookmarked,
  onToggleBookmark,
  onDetails,
  onApply,
}) => {
  const normalizedStatus = item.status?.toUpperCase() || "OPEN";

  return (
    <div className="scholarship-card flex h-full w-full flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]">
      <div className="relative mb-3 h-28 w-full shrink-0 overflow-hidden rounded-lg group">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      <div className="mb-2 flex shrink-0 flex-wrap items-center gap-1.5">
        <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700">
          {item.type}
        </span>
        <span
          className={`flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold ${
            normalizedStatus === "OPEN"
              ? "bg-green-50 text-green-700"
              : normalizedStatus === "CLOSING SOON"
                ? "bg-yellow-50 text-yellow-700"
                : normalizedStatus === "SOON"
                  ? "bg-blue-50 text-blue-700"
                  : "bg-gray-100 text-gray-600"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              normalizedStatus === "OPEN"
                ? "bg-green-500"
                : normalizedStatus === "CLOSING SOON"
                  ? "bg-yellow-500"
                  : normalizedStatus === "SOON"
                    ? "bg-blue-500"
                    : "bg-gray-400"
            }`}
          ></span>
          {normalizedStatus}
        </span>
      </div>

      <div className="mb-3 shrink-0">
        <h2 className="line-clamp-2 mb-0.5 text-base font-bold leading-snug text-gray-900" title={item.title}>
          {item.title}
        </h2>
        <div className="flex items-center gap-1 text-xs font-medium text-gray-500">
          <span>{item.provider}</span>
          {item.verified !== false && (
            <i className="fa-solid fa-circle-check text-[13px] text-[#1877F2]"></i>
          )}
        </div>
      </div>

      <div className="mb-4 grid flex-1 grid-cols-2 gap-2 rounded-lg border border-gray-100 bg-gray-50/80 p-2.5 text-xs text-gray-600">
        <InfoRow icon="fa-money-bill-wave" text={item.amount} className="col-span-2 xl:col-span-1" />
        <InfoRow icon="fa-location-dot" text={item.location} className="col-span-2 xl:col-span-1" />
        <InfoRow icon="fa-graduation-cap" text={item.eligibility} className="col-span-2" />
        <InfoRow icon="fa-calendar-days" text={`Ends: ${item.deadline}`} className="col-span-2 text-red-600" iconClassName="text-red-400" />
      </div>

      <div className="mt-auto flex shrink-0 gap-1.5 pt-1">
        <button
          onClick={() => onDetails(item.id)}
          className="flex-1 rounded-lg border border-gray-300 bg-white px-2 py-2 text-center text-[13px] font-medium text-gray-700 transition-all hover:bg-gray-50 focus:ring-2 focus:ring-gray-100"
        >
          Details
        </button>
        <button
          onClick={() => onApply(item.id, item.title, item.type)}
          className="flex-1 rounded-lg bg-blue-600 px-2 py-2 text-center text-[13px] font-medium text-white shadow-sm transition-all hover:bg-blue-700 focus:ring-2 focus:ring-blue-200"
        >
          Apply
        </button>
        <button
          onClick={() => onToggleBookmark(item.id)}
          className={`flex items-center justify-center rounded-lg border px-2.5 py-2 transition-all focus:outline-none focus:ring-2 focus:ring-gray-100 ${
            isBookmarked
              ? "border-yellow-300 bg-yellow-50 text-yellow-500"
              : "border-gray-300 bg-white text-gray-400 hover:bg-gray-50 hover:text-gray-600"
          }`}
          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark scholarship"}
        >
          <i className={`fa-${isBookmarked ? "solid" : "regular"} fa-bookmark text-sm`}></i>
        </button>
      </div>
    </div>
  );
};

const InfoRow: React.FC<{
  icon: string;
  text: string;
  className?: string;
  iconClassName?: string;
}> = ({ icon, text, className = "", iconClassName = "text-gray-400" }) => (
  <div className={`flex items-center gap-1.5 ${className}`}>
    <i className={`fa-solid ${icon} w-4 shrink-0 text-[13px] ${iconClassName}`}></i>
    <span className="truncate font-medium text-gray-800">{text}</span>
  </div>
);

export default ScholarshipListCard;

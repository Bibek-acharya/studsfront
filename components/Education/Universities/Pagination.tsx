import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors"
      >
        <i className="fa-solid fa-chevron-left text-xs"></i>
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        if (page === currentPage) {
          return (
            <button
              key={page}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#1a56db] text-white font-semibold text-sm shadow-sm transition-transform scale-105"
            >
              {page}
            </button>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-[#1a56db] font-semibold text-sm transition-colors"
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors"
      >
        <i className="fa-solid fa-chevron-right text-xs"></i>
      </button>
    </div>
  );
};

export default Pagination;

import { useRef } from "react";

const RecommendedForYouSection = ({ onNavigate }: any) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollByCard = (direction: -1 | 1) => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const card = container.querySelector("[data-recommended-card]") as HTMLDivElement | null;
    const amount = card ? card.offsetWidth + 24 : 364;

    container.scrollBy({
      left: amount * direction,
      behavior: "smooth",
    });
  };

  return (
  <div className="max-w-[1400px] mx-auto w-full mt-16">
  {/* Header Section */}
  <div className="flex items-end justify-between mb-8">
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
        Recommended Colleges for You
      </h2>
      <p className="text-gray-500 mt-2 text-base md:text-lg">
        Top institutions curated specifically for your career goals
      </p>
    </div>
    {/* Navigation Arrows */}
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => scrollByCard(-1)}
        aria-label="Previous recommended colleges"
        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm active:scale-95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => scrollByCard(1)}
        aria-label="Next recommended colleges"
        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm active:scale-95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  </div>
  {/* Scrollable Cards Container */}
  <div
    ref={containerRef}
    className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-8"
  >
    {/* Card 1: KIST */}
    <div data-recommended-card className="min-w-[340px] snap-start bg-white rounded-2xl border border-gray-100 shadow-sm p-5 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 shrink-0 rounded-xl border border-gray-100 overflow-hidden bg-white flex items-center justify-center p-1.5 shadow-sm">
          <img
            src="https://kist.edu.np/resources/assets/img/logo_small.jpg"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-1.5 mb-1">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
              KIST College
            </h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#3B82F6"
              className="w-4 h-4 shrink-0"
            >
              <path
                fillRule="evenodd"
                d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex items-center gap-1.5 mb-2.5 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={12}
              height={12}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx={12} cy={10} r={3} />
            </svg>
            <p className="text-xs truncate">Kamalpokhari, Kathmandu</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded border border-green-100 whitespace-nowrap">
              98% Match
            </span>
            <span className="bg-gray-50 text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded border border-gray-100 whitespace-nowrap">
              Private
            </span>
            {/* Rating */}
            <div className="flex items-center gap-0.5 bg-yellow-50 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded border border-yellow-100 whitespace-nowrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={10}
                height={10}
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-yellow-500"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              4.5
            </div>
          </div>
        </div>
      </div>
      <div className="my-4 border-t border-gray-50" />
      <div className="space-y-3 mb-5 flex-1">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <span className="text-xs font-medium text-gray-700">
            NEB Affiliation
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <span className="text-xs font-medium text-gray-700">
            Science, Management
          </span>
        </div>
      </div>
      <div className="flex gap-2 items-center mt-auto">
        <button className="bg-blue-600 text-white text-xs font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap shadow-sm">
          View Detail
        </button>
        <button className="flex-1 bg-white border border-gray-200 text-gray-700 text-xs font-semibold py-2 px-3 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-1.5 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </svg>
          Ask Question
        </button>
        <button className="fav-btn w-9 h-9 shrink-0 bg-white border border-gray-200 text-gray-400 rounded-lg hover:text-red-500 hover:border-red-100 flex items-center justify-center transition-all shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
      </div>
    </div>
    {/* Card 2: Trinity */}
    <div className="min-w-[340px] snap-start bg-white rounded-2xl border border-gray-100 shadow-sm p-5 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 shrink-0 rounded-xl border border-gray-100 overflow-hidden bg-white flex items-center justify-center p-1.5 shadow-sm">
          <img
            src="https://ui-avatars.com/api/?name=TC&background=0284C7&color=fff&size=128"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-1.5 mb-1">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
              Trinity Int'l
            </h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#3B82F6"
              className="w-4 h-4 shrink-0"
            >
              <path
                fillRule="evenodd"
                d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex items-center gap-1.5 mb-2.5 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={12}
              height={12}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx={12} cy={10} r={3} />
            </svg>
            <p className="text-xs truncate">Dillibazar, Kathmandu</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded border border-green-100 whitespace-nowrap">
              92% Match
            </span>
            <span className="bg-gray-50 text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded border border-gray-100 whitespace-nowrap">
              Private
            </span>
            {/* Rating */}
            <div className="flex items-center gap-0.5 bg-yellow-50 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded border border-yellow-100 whitespace-nowrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={10}
                height={10}
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-yellow-500"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              4.2
            </div>
          </div>
        </div>
      </div>
      <div className="my-4 border-t border-gray-50" />
      <div className="space-y-3 mb-5 flex-1">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <span className="text-xs font-medium text-gray-700">
            NEB / Cambridge A Levels
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <span className="text-xs font-medium text-gray-700">
            Science, Humanities
          </span>
        </div>
      </div>
      <div className="flex gap-2 items-center mt-auto">
        <button className="bg-blue-600 text-white text-xs font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap shadow-sm">
          View Detail
        </button>
        <button className="flex-1 bg-white border border-gray-200 text-gray-700 text-xs font-semibold py-2 px-3 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-1.5 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </svg>
          Ask Question
        </button>
        <button className="fav-btn w-9 h-9 shrink-0 bg-white border border-gray-200 text-gray-400 rounded-lg hover:text-red-500 hover:border-red-100 flex items-center justify-center transition-all shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
      </div>
    </div>
    {/* Card 3: St. Xavier's */}
    <div className="min-w-[340px] snap-start bg-white rounded-2xl border border-gray-100 shadow-sm p-5 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 shrink-0 rounded-xl border border-gray-100 overflow-hidden bg-white flex items-center justify-center p-1.5 shadow-sm">
          <img
            src="https://ui-avatars.com/api/?name=SX&background=DC2626&color=fff&size=128"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-1.5 mb-1">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
              St. Xavier's
            </h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#3B82F6"
              className="w-4 h-4 shrink-0"
            >
              <path
                fillRule="evenodd"
                d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex items-center gap-1.5 mb-2.5 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={12}
              height={12}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx={12} cy={10} r={3} />
            </svg>
            <p className="text-xs truncate">Maitighar, Kathmandu</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded border border-green-100 whitespace-nowrap">
              85% Match
            </span>
            <span className="bg-gray-50 text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded border border-gray-100 whitespace-nowrap">
              Jesuit
            </span>
            {/* Rating */}
            <div className="flex items-center gap-0.5 bg-yellow-50 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded border border-yellow-100 whitespace-nowrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={10}
                height={10}
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-yellow-500"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              4.7
            </div>
          </div>
        </div>
      </div>
      <div className="my-4 border-t border-gray-50" />
      <div className="space-y-3 mb-5 flex-1">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <span className="text-xs font-medium text-gray-700">NEB / T.U.</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <span className="text-xs font-medium text-gray-700">
            Pure Science, Management
          </span>
        </div>
      </div>
      <div className="flex gap-2 items-center mt-auto">
        <button className="bg-blue-600 text-white text-xs font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap shadow-sm">
          View Detail
        </button>
        <button className="flex-1 bg-white border border-gray-200 text-gray-700 text-xs font-semibold py-2 px-3 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-1.5 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </svg>
          Ask Question
        </button>
        <button className="fav-btn w-9 h-9 shrink-0 bg-white border border-gray-200 text-gray-400 rounded-lg hover:text-red-500 hover:border-red-100 flex items-center justify-center transition-all shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
      </div>
    </div>
    {/* Card 4: Kathmandu College */}
    <div className="min-w-[340px] snap-start bg-white rounded-2xl border border-gray-100 shadow-sm p-5 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 shrink-0 rounded-xl border border-gray-100 overflow-hidden bg-white flex items-center justify-center p-1.5 shadow-sm">
          <img
            src="https://ui-avatars.com/api/?name=KCM&background=1E293B&color=fff&size=128"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-1.5 mb-1">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
              KCM College
            </h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#3B82F6"
              className="w-4 h-4 shrink-0"
            >
              <path
                fillRule="evenodd"
                d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex items-center gap-1.5 mb-2.5 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={12}
              height={12}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx={12} cy={10} r={3} />
            </svg>
            <p className="text-xs truncate">Gwarko, Lalitpur</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded border border-green-100 whitespace-nowrap">
              79% Match
            </span>
            <span className="bg-gray-50 text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded border border-gray-100 whitespace-nowrap">
              Private
            </span>
            {/* Rating */}
            <div className="flex items-center gap-0.5 bg-yellow-50 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded border border-yellow-100 whitespace-nowrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={10}
                height={10}
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-yellow-500"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              4.4
            </div>
          </div>
        </div>
      </div>
      <div className="my-4 border-t border-gray-50" />
      <div className="space-y-3 mb-5 flex-1">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <span className="text-xs font-medium text-gray-700">
            Kathmandu University
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <span className="text-xs font-medium text-gray-700">
            BBA, Management
          </span>
        </div>
      </div>
      <div className="flex gap-2 items-center mt-auto">
        <button className="bg-blue-600 text-white text-xs font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap shadow-sm">
          View Detail
        </button>
        <button className="flex-1 bg-white border border-gray-200 text-gray-700 text-xs font-semibold py-2 px-3 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-1.5 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </svg>
          Ask Question
        </button>
        <button className="fav-btn w-9 h-9 shrink-0 bg-white border border-gray-200 text-gray-400 rounded-lg hover:text-red-500 hover:border-red-100 flex items-center justify-center transition-all shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
      </div>
    </div>
    {/* Card 5: Call to Action (Try College Recommender) */}
    <div className="min-w-[340px] snap-start bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl border border-transparent shadow-sm p-6 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      <div className="w-16 h-16 shrink-0 rounded-full bg-white/20 flex items-center justify-center mb-4 text-white backdrop-blur-sm border border-white/30 relative z-10 shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={28}
          height={28}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          <path d="M5 3v4" />
          <path d="M19 17v4" />
          <path d="M3 5h4" />
          <path d="M17 19h4" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-white mb-2 relative z-10">
        Not finding the right fit?
      </h3>
      <p className="text-blue-100 text-sm mb-6 relative z-10">
        Discover more colleges perfectly tailored to your specific preferences,
        grades, and academic goals.
      </p>
      <button className="bg-white text-blue-600 font-bold py-2.5 px-6 rounded-xl hover:bg-blue-50 transition-colors shadow-md w-full flex items-center justify-center gap-2 relative z-10">
        Try College Recommender
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</div>

);
};


export default RecommendedForYouSection;
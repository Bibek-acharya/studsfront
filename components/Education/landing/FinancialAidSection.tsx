import React, { useState, useEffect } from "react";
import { apiService } from "../../../services/api";

const FinancialAidSection = ({ onNavigate }: any) => {
  const [scholarships, setScholarships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await apiService.getEducationScholarships();
        if (res.success && res.data?.scholarships) {
          setScholarships(res.data.scholarships.slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to fetch scholarships", err);
      } finally {
        setLoading(false);
      }
    };
    fetchScholarships();
  }, []);

  if (loading) return null;
  if (scholarships.length === 0) return null;

  return (
 <div className="max-w-[1400px] mx-auto w-full mt-16">
  {/* ========================================== */}
  {/* FINANCIAL AID SECTION                      */}
  {/* ========================================== */}
  {/* Heading Section */}
  <div className="mt-20 mb-10 text-center">
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
      Featured Financial Aid
    </h2>
    <p className="text-gray-500 mt-3 text-sm md:text-base max-w-xl mx-auto">
      Discover scholarships, grants, and financial support options to fund your
      academic journey.
    </p>
  </div>
  {/* Grid Container for Financial Aid (Matching 4-card layout size) */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {scholarships.map((scholarship, index) => (
      <div key={scholarship.id || index} className="scholarship-card bg-white rounded-xl shadow-[0_2px_15px_rgb(0,0,0,0.04)] p-4 w-full border border-gray-100 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
        <div className="w-full h-28 mb-3 rounded-lg overflow-hidden relative group shrink-0 bg-gray-100">
          <img
            src={scholarship.image_url || scholarship.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"}
            alt="Scholarship img"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        <div className="flex items-center gap-1.5 mb-2 flex-wrap shrink-0">
          <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            {scholarship.type || "Merit-Based"}
          </span>
          <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> {scholarship.status || "Open"}
          </span>
        </div>
        <div className="mb-3 shrink-0">
          <h2
            className="text-base font-bold text-gray-900 leading-snug mb-0.5 line-clamp-2"
            title={scholarship.title}
          >
            {scholarship.title}
          </h2>
          <div className="flex items-center gap-1 text-gray-500 text-xs font-medium">
            <span className="truncate">{scholarship.provider || "University"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3.5 h-3.5 text-[#0866FF]"
            >
              <path
                fillRule="evenodd"
                d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4 bg-gray-50/80 p-2.5 rounded-lg border border-gray-100 flex-1 content-start">
          <div className="flex items-center gap-1.5 col-span-2 xl:col-span-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 text-gray-400 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium text-gray-800 truncate">
              {scholarship.amount || "100% Tuition"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2 xl:col-span-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 text-gray-400 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <span className="font-medium text-gray-800 truncate">{scholarship.location || "Nepal"}</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 text-gray-400 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.628 48.628 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
              />
            </svg>
            <span className="font-medium text-gray-800 truncate">
              {scholarship.eligibility || "+2 Science"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 text-red-400 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
            <span className="font-medium text-red-600">Ends: {scholarship.deadline || "TBD"}</span>
          </div>
        </div>
        <div className="flex gap-1.5 mt-auto pt-1 shrink-0">
          <button onClick={() => onNavigate("scholarshipDetails", scholarship)} className="flex-1 px-2 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-100 transition-all text-[13px] text-center">
            Details
          </button>
          <button className="flex-1 px-2 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-200 transition-all text-[13px] text-center shadow-sm">
            Apply
          </button>
          <button className="bookmark-btn flex items-center justify-center px-2.5 py-2 bg-white border border-gray-300 text-gray-400 hover:text-red-500 hover:bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 group-hover:fill-red-50"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default FinancialAidSection;

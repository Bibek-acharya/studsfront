import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface CollegeComparisonResultPageProps {
    onNavigate: (view: any, data?: any) => void;
}

const CollegeComparisonResultPage: React.FC<CollegeComparisonResultPageProps> = ({ onNavigate }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as { college1?: any; college2?: any } | null;

    const c1Text = state?.college1?.name || (typeof state?.college1 === 'string' ? state.college1 : "Pulchowk Campus");
    const c2Text = state?.college2?.name || (typeof state?.college2 === 'string' ? state.college2 : "Kathmandu University");

    const [activeTab, setActiveTab] = useState("Academic Quality");

    const tabs = [
        "Academic Quality",
        "Infrastructure & Facilities",
        "Fee Structure & Scholarships",
        "Location & Accessibility",
        "Result & Reputation",
        "Career Support & Opportunities",
        "Student Life & Environment",
        "Course & Stream Options"
    ];

    return (
        <div className="bg-[#ffffff] min-h-screen w-full font-sans pb-16 pt-6">
            <style>{`
        /* Avoid overriding global body if not needed, isolate to container */
        .comparison-container {
            font-family: 'Inter', sans-serif;
        }

        /* Utility to hide scrollbars for specific containers like the tabs */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        
        /* Tab specific styling to achieve the exact folder-tab overlap effect */
        .tab-btn {
            position: relative;
            bottom: -1px; /* Overlap the bottom border */
        }
        .tab-active {
            border-top: 2px solid #3b82f6 !important; /* Blue top border */
            border-left: 1px solid #e5e7eb !important;
            border-right: 1px solid #e5e7eb !important;
            border-bottom: 1px solid #ffffff !important;
            background-color: #f8fafc;
            color: #1e293b !important;
            font-weight: 600 !important;
        }
      `}</style>

            <div className="max-w-[1100px] mx-auto px-4 comparison-container">

                {/* Header Area */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-[#1e293b]">Compare {c1Text} vs {c2Text}</h1>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                        Share
                    </button>
                </div>

                {/* Comparison Cards Container */}
                <div className="border border-gray-200 rounded-xl flex flex-col relative bg-white shadow-sm">

                    {/* VS Badge (Absolutely positioned in the center of the top half) */}
                    <div className="absolute left-1/2 top-[110px] -translate-x-1/2 -translate-y-1/2 bg-[#1e293b] text-white text-[11px] font-bold rounded-full w-8 h-8 flex items-center justify-center border-[3px] border-white z-10 hidden md:flex">
                        VS
                    </div>

                    {/* Top Section: Company Info */}
                    <div className="flex flex-col md:flex-row">

                        {/* College 1 Card */}
                        <div className="flex-1 p-6 md:border-r border-b md:border-b-0 border-gray-200 relative">
                            <div className="flex justify-between items-start">
                                <div className="flex gap-4">
                                    {/* Logo Box */}
                                    <div className="w-20 h-20 rounded-xl border border-gray-200 p-1 flex-shrink-0">
                                        <div className="w-full h-full rounded-full bg-gradient-to-b from-blue-700 via-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl uppercase">
                                            {c1Text.substring(0, 2)}
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="text-[22px] font-bold text-blue-600 leading-tight mb-2 hover:underline cursor-pointer">{c1Text}</h2>

                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="bg-[#5cb85c] text-white flex items-center gap-1 px-1.5 py-0.5 rounded text-sm font-bold">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                </svg>
                                                4.5
                                            </div>
                                            <span className="text-sm text-gray-500">(1,240 Reviews)</span>
                                        </div>

                                        <div className="bg-blue-50 border border-blue-100 rounded-md px-2.5 py-1.5 flex items-center gap-2 w-fit">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                                <polyline points="2 17 12 22 22 17"></polyline>
                                                <polyline points="2 12 12 17 22 12"></polyline>
                                            </svg>
                                            <span className="text-[13px] text-blue-700 font-medium">Top Ranked <span className="text-blue-500 font-normal">Engineering Campus</span></span>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 20h9"></path>
                                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* College 2 Card */}
                        <div className="flex-1 p-6">
                            <div className="flex justify-between items-start">
                                <div className="flex gap-4">
                                    {/* Logo Box */}
                                    <div className="w-20 h-20 rounded-xl border border-gray-200 flex items-center justify-center p-2 flex-shrink-0 bg-white">
                                        <div className="w-full h-full rounded-full bg-gradient-to-b from-red-600 via-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-xl uppercase">
                                            {c2Text.substring(0, 2)}
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="text-[22px] font-bold text-blue-600 leading-tight mb-2 hover:underline cursor-pointer">{c2Text}</h2>

                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="bg-[#5cb85c] text-white flex items-center gap-1 px-1.5 py-0.5 rounded text-sm font-bold">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                </svg>
                                                4.6
                                            </div>
                                            <span className="text-sm text-gray-500">(980 Reviews)</span>
                                        </div>

                                        <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-md px-2.5 py-1.5 flex items-center gap-2 w-fit">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                                                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                                            </svg>
                                            <span className="text-[13px] text-[#16a34a] font-medium">Top Rated <span className="text-gray-500 font-normal">for Research & IT</span></span>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 20h9"></path>
                                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section: Dropdown Selectors */}
                    <div className="flex flex-col md:flex-row border-t border-gray-200">

                        {/* College 1 Selectors */}
                        <div className="flex-1 flex md:border-r border-b md:border-b-0 border-gray-200">
                            <div className="flex-1 flex items-center justify-between p-4 border-r border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
                                <div className="flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                                    </svg>
                                    <span className="text-[14px] text-gray-700">All Programs</span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </div>

                            <div className="flex-1 flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                                <div className="flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                    <span className="text-[14px] text-gray-700">Nepal</span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </div>
                        </div>

                        {/* College 2 Selectors */}
                        <div className="flex-1 flex">
                            <div className="flex-1 flex items-center justify-between p-4 border-r border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
                                <div className="flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                                    </svg>
                                    <span className="text-[14px] text-gray-700">All Programs</span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </div>

                            <div className="flex-1 flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                                <div className="flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                    <span className="text-[14px] text-gray-700">Nepal</span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="mt-6 border-b border-gray-200 w-full overflow-x-auto scrollbar-hide">
                    <ul className="flex min-w-max">
                        {tabs.map((tab) => (
                            <li
                                key={tab}
                                className={`tab-btn px-5 py-3.5 text-sm cursor-pointer whitespace-nowrap border-t-2 border-l border-r border-b ${activeTab === tab ? "tab-active" : "border-transparent border-b-transparent text-gray-600 hover:text-gray-900 font-medium"}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Academic Quality Content Section (Using standard sub points) */}
                <div className="mt-8">
                    <div className="flex items-center gap-2 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                        </svg>
                        <h2 className="text-[20px] font-bold text-[#1e293b]">{activeTab}</h2>
                    </div>

                    {activeTab === "Academic Quality" ? (
                        <div className="border border-gray-200 rounded-xl bg-[#f8fafc] flex flex-col">
                            {/* Sub-point 1: University affiliation */}
                            <div className="p-6 border-b border-gray-200 last:border-b-0 flex flex-col md:flex-row md:items-center">
                                <div className="text-[15px] font-semibold text-[#64748b] mb-4 md:mb-0 md:w-1/3">University Affiliation</div>
                                <div className="flex md:w-2/3 flex-col sm:flex-row gap-4 sm:gap-0">
                                    <div className="flex-1 flex items-center gap-2">
                                        <div className="bg-blue-500 text-white p-0.5 rounded-sm shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                        </div>
                                        <span className="font-bold text-[17px] text-[#1e293b] underline decoration-gray-400 underline-offset-4">Tribhuvan University (TU)</span>
                                    </div>
                                    <div className="flex-1 flex items-center gap-2">
                                        <div className="bg-blue-500 text-white p-0.5 rounded-sm shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                        </div>
                                        <span className="font-bold text-[17px] text-[#1e293b] underline decoration-gray-400 underline-offset-4">Autonomous (KU)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Sub-point 2: Faculty qualification */}
                            <div className="p-6 border-b border-gray-200 last:border-b-0 flex flex-col md:flex-row md:items-center">
                                <div className="text-[15px] font-semibold text-[#64748b] mb-4 md:mb-0 md:w-1/3">Faculty Qualification</div>
                                <div className="flex md:w-2/3 flex-col sm:flex-row gap-4 sm:gap-0">
                                    <div className="flex-1 flex items-center gap-2 flex-wrap">
                                        <div className="bg-[#5cb85c] text-white p-0.5 rounded-sm shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                        </div>
                                        <span className="font-bold text-[17px] text-[#1e293b] underline decoration-gray-400 underline-offset-4">4.6</span>
                                        <span className="text-sm text-gray-500 ml-1">Highly Experienced</span>
                                    </div>
                                    <div className="flex-1 flex items-center gap-2 flex-wrap">
                                        <div className="bg-[#5cb85c] text-white p-0.5 rounded-sm shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                        </div>
                                        <span className="font-bold text-[17px] text-[#1e293b] underline decoration-gray-400 underline-offset-4">4.5</span>
                                        <span className="text-sm text-gray-500 ml-1">Research Oriented</span>
                                    </div>
                                </div>
                            </div>

                            {/* Sub-point 3: Pass rate / board results */}
                            <div className="p-6 border-b border-gray-200 last:border-b-0 flex flex-col md:flex-row md:items-center">
                                <div className="text-[15px] font-semibold text-[#64748b] mb-4 md:mb-0 md:w-1/3">Pass Rate / Board Results</div>
                                <div className="flex md:w-2/3 flex-col sm:flex-row gap-4 sm:gap-0">
                                    <div className="flex-1 flex items-center gap-2">
                                        <div className="bg-yellow-500 text-white p-0.5 rounded-sm shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                        </div>
                                        <span className="font-bold text-[17px] text-[#1e293b] underline decoration-gray-400 underline-offset-4">88%</span>
                                    </div>
                                    <div className="flex-1 flex items-center gap-2 flex-wrap">
                                        <div className="bg-[#5cb85c] text-white p-0.5 rounded-sm shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                        </div>
                                        <span className="font-bold text-[17px] text-[#1e293b] underline decoration-gray-400 underline-offset-4">94%</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                                            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                                            <path d="M4 22h16"></path>
                                            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                                            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                                            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Sub-point 4: Teaching method */}
                            <div className="p-6 border-b border-gray-200 last:border-b-0 flex flex-col md:flex-row md:items-center">
                                <div className="text-[15px] font-semibold text-[#64748b] mb-4 md:mb-0 md:w-1/3">Teaching Method</div>
                                <div className="flex md:w-2/3 flex-col sm:flex-row gap-4 sm:gap-0">
                                    <div className="flex-1 flex items-center gap-2">
                                        <div className="bg-gray-400 text-white p-0.5 rounded-sm shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                        </div>
                                        <span className="font-bold text-[17px] text-[#1e293b] underline decoration-gray-400 underline-offset-4">Theoretical</span>
                                    </div>
                                    <div className="flex-1 flex items-center gap-2">
                                        <div className="bg-[#5cb85c] text-white p-0.5 rounded-sm shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                        </div>
                                        <span className="font-bold text-[17px] text-[#1e293b] underline decoration-gray-400 underline-offset-4">Practical Focus</span>
                                    </div>
                                </div>
                            </div>

                            {/* Sub-point 5: Extra academic support */}
                            <div className="p-6 border-b border-gray-200 last:border-b-0 flex flex-col md:flex-row md:items-center">
                                <div className="text-[15px] font-semibold text-[#64748b] mb-4 md:mb-0 md:w-1/3">Extra Academic Support</div>
                                <div className="flex md:w-2/3 flex-col sm:flex-row gap-4 sm:gap-0">
                                    <div className="flex-1 flex items-center gap-2 flex-wrap">
                                        <div className="bg-yellow-500 text-white p-0.5 rounded-sm shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                        </div>
                                        <span className="font-bold text-[17px] text-[#1e293b] underline decoration-gray-400 underline-offset-4">3.2</span>
                                        <span className="text-sm text-gray-500 ml-1">Self-study</span>
                                    </div>
                                    <div className="flex-1 flex items-center gap-2 flex-wrap">
                                        <div className="bg-[#5cb85c] text-white p-0.5 rounded-sm shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                        </div>
                                        <span className="font-bold text-[17px] text-[#1e293b] underline decoration-gray-400 underline-offset-4">4.1</span>
                                        <span className="text-sm text-gray-500 ml-1">Structured</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ) : (
                        <div className="border border-gray-200 rounded-xl bg-[#f8fafc] flex flex-col items-center justify-center p-12 text-gray-500">
                            <p className="font-medium text-lg">Details for {activeTab} are pending available data.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default CollegeComparisonResultPage;

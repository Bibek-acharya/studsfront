import React, { useState } from "react";
import Testimonials from "../Testimonials";

interface JobsPageProps {
  onNavigate: (view: any, data?: any) => void;
}

const JobsPage: React.FC<JobsPageProps> = ({ onNavigate }) => {
  const [showAllCategories, setShowAllCategories] = useState(false);

  const categories = [
    {
      icon: "fa-briefcase",
      title: "Business",
      count: "1.2k",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: "fa-code",
      title: "Technology",
      count: "850",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: "fa-graduation-cap",
      title: "Education",
      count: "420",
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      icon: "fa-heart-pulse",
      title: "Healthcare",
      count: "2.1k",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: "fa-bell-concierge",
      title: "Hospitality",
      count: "350",
      color: "bg-red-50 text-red-600",
    },
    {
      icon: "fa-helmet-safety",
      title: "Engineering",
      count: "560",
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      icon: "fa-tags",
      title: "Retail & FMCG",
      count: "980",
      color: "bg-pink-50 text-pink-600",
    },
    {
      icon: "fa-rocket",
      title: "Startup",
      count: "140",
      color: "bg-cyan-50 text-cyan-600",
    },
    {
      icon: "fa-bullhorn",
      title: "Marketing",
      count: "320",
      color: "bg-orange-50 text-orange-600",
    },
    {
      icon: "fa-landmark",
      title: "Finance",
      count: "210",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: "fa-pen-nib",
      title: "Content Writing",
      count: "180",
      color: "bg-rose-50 text-rose-600",
    },
    {
      icon: "fa-headset",
      title: "Customer Support",
      count: "450",
      color: "bg-sky-50 text-sky-600",
    },
    {
      icon: "fa-truck",
      title: "Logistics",
      count: "120",
      color: "bg-amber-50 text-amber-600",
    },
    {
      icon: "fa-palette",
      title: "Design",
      count: "290",
      color: "bg-violet-50 text-violet-600",
    },
    {
      icon: "fa-users",
      title: "Human Resources",
      count: "150",
      color: "bg-teal-50 text-teal-600",
    },
    {
      icon: "fa-money-bill-trend-up",
      title: "Sales",
      count: "880",
      color: "bg-lime-50 text-lime-600",
    },
  ];

  const displayedCategories = showAllCategories
    ? categories
    : categories.slice(0, 8);

  return (
    <div className="bg-slate-50 min-h-screen pt-[60px]">
      {/* Search Hero Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Panel: Search Card */}
          <div className="w-full">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 relative overflow-hidden max-w-xl mx-auto lg:mx-0">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-primary-50 z-0"></div>
              <div className="relative z-10">
                <h1 className="text-4xl font-black text-gray-900 mb-2 leading-tight">
                  Find Your{" "}
                  <span className="text-primary-600">Expected Job</span>
                </h1>
                <p className="text-gray-500 mb-8 text-lg font-medium">
                  Discover opportunities that match your skills and ambitions.
                </p>

                <form
                  className="space-y-5"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                      Search Keywords
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition font-medium"
                        placeholder="Job title, keywords, or company"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                        Location
                      </label>
                      <select className="block w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition font-medium appearance-none cursor-pointer">
                        <option>Any Location</option>
                        <option>Remote</option>
                        <option>Kathmandu</option>
                        <option>Lalitpur</option>
                        <option>Pokhara</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                        Job Type
                      </label>
                      <select className="block w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition font-medium appearance-none cursor-pointer">
                        <option>All Types</option>
                        <option>Full Time</option>
                        <option>Part Time</option>
                        <option>Freelance</option>
                        <option>Internship</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => onNavigate("jobFeed")}
                      className="flex-1 bg-primary-600 text-white font-black py-4 px-6 rounded-xl shadow-lg hover:bg-primary-700 hover:shadow-xl transition flex justify-center items-center gap-2"
                    >
                      <i className="fa-solid fa-search"></i> Find Job
                    </button>
                    <button
                      onClick={() => onNavigate("employerZone")}
                      className="flex-1 bg-white text-primary-600 border-2 border-primary-100 font-black py-4 px-6 rounded-xl hover:bg-primary-50 transition flex justify-center items-center gap-2"
                    >
                      <i className="fa-solid fa-plus"></i> Post Job
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Panel: SVG Illustration */}
          <div className="hidden lg:flex justify-center items-center relative">
            <div className="absolute w-[500px] h-[500px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
            <svg
              width="500"
              height="400"
              viewBox="0 0 500 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10 drop-shadow-2xl"
            >
              <defs>
                <filter
                  id="shadow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feDropShadow
                    dx="0"
                    dy="10"
                    stdDeviation="15"
                    floodColor="#1e3a8a"
                    floodOpacity="0.15"
                  />
                </filter>
                <linearGradient id="paperGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#f8fafc" />
                </linearGradient>
              </defs>

              <circle cx="250" cy="200" r="180" fill="#eff6ff" opacity="0.5" />
              <circle cx="400" cy="80" r="20" fill="#3b82f6" opacity="0.1" />
              <circle cx="50" cy="350" r="15" fill="#3b82f6" opacity="0.2" />

              <g filter="url(#shadow)" transform="translate(130, 60)">
                <rect
                  x="0"
                  y="0"
                  width="240"
                  height="320"
                  rx="12"
                  fill="url(#paperGradient)"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
                <circle cx="48" cy="48" r="24" fill="#dbeafe" />
                <rect
                  x="88"
                  y="32"
                  width="100"
                  height="12"
                  rx="6"
                  fill="#1e293b"
                  opacity="0.8"
                />
                <rect
                  x="88"
                  y="52"
                  width="60"
                  height="8"
                  rx="4"
                  fill="#94a3b8"
                />
                <rect
                  x="24"
                  y="96"
                  width="192"
                  height="4"
                  rx="2"
                  fill="#e2e8f0"
                />
                <rect
                  x="24"
                  y="112"
                  width="180"
                  height="4"
                  rx="2"
                  fill="#e2e8f0"
                />
                <rect
                  x="24"
                  y="128"
                  width="160"
                  height="4"
                  rx="2"
                  fill="#e2e8f0"
                />
                <rect
                  x="24"
                  y="160"
                  width="80"
                  height="8"
                  rx="4"
                  fill="#3b82f6"
                  opacity="0.8"
                />
                <rect
                  x="24"
                  y="184"
                  width="192"
                  height="4"
                  rx="2"
                  fill="#e2e8f0"
                />
                <rect
                  x="24"
                  y="200"
                  width="140"
                  height="4"
                  rx="2"
                  fill="#e2e8f0"
                />
                <rect
                  x="24"
                  y="240"
                  width="50"
                  height="20"
                  rx="10"
                  fill="#f1f5f9"
                />
                <rect
                  x="84"
                  y="240"
                  width="60"
                  height="20"
                  rx="10"
                  fill="#f1f5f9"
                />
                <rect
                  x="154"
                  y="240"
                  width="40"
                  height="20"
                  rx="10"
                  fill="#f1f5f9"
                />
                <circle
                  cx="210"
                  cy="30"
                  r="16"
                  fill="#22c55e"
                  stroke="white"
                  strokeWidth="2"
                />
                <path
                  d="M204 30 L208 34 L216 26"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              <g transform="translate(320, 250)">
                <rect
                  x="0"
                  y="0"
                  width="100"
                  height="120"
                  rx="10"
                  fill="white"
                  filter="url(#shadow)"
                />
                <circle cx="30" cy="30" r="15" fill="#fcd34d" />
                <rect
                  x="55"
                  y="20"
                  width="30"
                  height="8"
                  rx="4"
                  fill="#cbd5e1"
                />
                <rect
                  x="55"
                  y="32"
                  width="20"
                  height="8"
                  rx="4"
                  fill="#cbd5e1"
                />
                <rect
                  x="15"
                  y="60"
                  width="70"
                  height="4"
                  rx="2"
                  fill="#e2e8f0"
                />
                <rect
                  x="15"
                  y="72"
                  width="60"
                  height="4"
                  rx="2"
                  fill="#e2e8f0"
                />
                <g transform="translate(-40, -40)">
                  <circle
                    cx="40"
                    cy="40"
                    r="28"
                    fill="#ffffff"
                    stroke="#3b82f6"
                    strokeWidth="8"
                  />
                  <circle cx="40" cy="40" r="22" fill="#dbeafe" opacity="0.5" />
                  <line
                    x1="60"
                    y1="60"
                    x2="85"
                    y2="85"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="bg-white py-12 border-y border-gray-100 overflow-hidden">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-1">
            Top Companies Listing On Studsphere
          </h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
            Find jobs that fit your career aspirations
          </p>
        </div>
        <div className="relative w-full flex overflow-hidden group">
          <div className="flex animate-scroll gap-20 whitespace-nowrap px-10 items-center opacity-50 grayscale hover:grayscale-0 hover:pause transition-all duration-500">
            <MarqueeLogo
              onClick={() => onNavigate("companyDetails")}
              icon="fa-google"
              name="Google"
            />
            <MarqueeLogo
              onClick={() => onNavigate("companyDetails")}
              icon="fa-microsoft"
              name="Microsoft"
            />
            <MarqueeLogo
              onClick={() => onNavigate("companyDetails")}
              icon="fa-amazon"
              name="Amazon"
            />
            <MarqueeLogo
              onClick={() => onNavigate("companyDetails")}
              icon="fa-spotify"
              name="Spotify"
            />
            <MarqueeLogo
              onClick={() => onNavigate("companyDetails")}
              icon="fa-airbnb"
              name="Airbnb"
            />
            <MarqueeLogo
              onClick={() => onNavigate("companyDetails")}
              icon="fa-meta"
              name="Meta"
            />
            <MarqueeLogo
              onClick={() => onNavigate("companyDetails")}
              icon="fa-uber"
              name="Uber"
            />
            <MarqueeLogo
              onClick={() => onNavigate("companyDetails")}
              icon="fa-apple"
              name="Apple"
            />
            <MarqueeLogo
              onClick={() => onNavigate("companyDetails")}
              icon="fa-linkedin"
              name="LinkedIn"
            />
            {/* Duplicate for loop */}
            <MarqueeLogo
              onClick={() => onNavigate("companyDetails")}
              icon="fa-google"
              name="Google"
            />
            <MarqueeLogo
              onClick={() => onNavigate("companyDetails")}
              icon="fa-microsoft"
              name="Microsoft"
            />
            <MarqueeLogo
              onClick={() => onNavigate("companyDetails")}
              icon="fa-amazon"
              name="Amazon"
            />
            <MarqueeLogo
              onClick={() => onNavigate("companyDetails")}
              icon="fa-spotify"
              name="Spotify"
            />
            <MarqueeLogo
              onClick={() => onNavigate("companyDetails")}
              icon="fa-airbnb"
              name="Airbnb"
            />
          </div>
        </div>
      </section>

      {/* Recommended Jobs */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            Jobs You May Be Interested In
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
            Personalized opportunities selected by our AI based on your profile.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <JobSimpleCard
            onClick={() => onNavigate("jobDetails", { id: 1 })}
            onCompanyClick={() => onNavigate("companyDetails")}
            title="Senior Software Engineer"
            company="StudSphere Education"
            location="Kathmandu"
            exp="5-10 Yrs"
            icon="fa-graduation-cap"
            iconColor="text-primary-600"
            time="10h ago"
          />
          <JobSimpleCard
            onClick={() => onNavigate("jobDetails", { id: 101 })}
            onCompanyClick={() => onNavigate("companyDetails")}
            title="Java Developer"
            company="Nepal Tech Solutions"
            location="Lalitpur"
            exp="0-1 Yrs"
            icon="fa-code"
            iconColor="text-red-500"
            time="1d ago"
          />
          <JobSimpleCard
            onClick={() => onNavigate("jobDetails", { id: 1 })}
            onCompanyClick={() => onNavigate("companyDetails")}
            title="DevOps Engineer"
            company="Amazon"
            location="Pokhara"
            exp="2-4 Yrs"
            icon="fa-amazon"
            iconColor="text-orange-500"
            time="2h ago"
          />
          <JobSimpleCard
            onClick={() => onNavigate("jobDetails", { id: 1 })}
            onCompanyClick={() => onNavigate("companyDetails")}
            title="Product Manager"
            company="Airbnb"
            location="Remote"
            exp="6-9 Yrs"
            icon="fa-airbnb"
            iconColor="text-red-400"
            time="5h ago"
          />
        </div>
        <div className="text-center mt-12">
          <button className="px-8 py-3 rounded-full bg-white border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 hover:text-primary-600 transition-all shadow-sm">
            View All Jobs
          </button>
        </div>
      </section>

      {/* Hiring Now Sections */}
      <section className="bg-white py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Top Companies Hiring Now
            </h2>
            <p className="text-gray-500 text-lg font-medium">
              Explore job opportunities across various sectors.
            </p>
          </div>
          <div className="flex overflow-x-auto gap-6 pb-10 no-scrollbar">
            <HiringCategoryCard
              onClick={() => onNavigate("companiesPage")}
              title="MNCs"
              count="1.5k+"
              icons={["fa-google", "fa-microsoft", "fa-amazon"]}
              extra="+1k"
            />
            <HiringCategoryCard
              onClick={() => onNavigate("companiesPage")}
              title="Unicorns"
              count="500+"
              icons={["fa-airbnb", "fa-uber", "fa-spotify"]}
              extra="+200"
            />
            <HiringCategoryCard
              onClick={() => onNavigate("companiesPage")}
              title="Internet"
              count="800+"
              icons={["fa-facebook", "fa-linkedin", "fa-twitter"]}
              extra="+500"
            />
            <HiringCategoryCard
              onClick={() => onNavigate("companiesPage")}
              title="Edtech"
              count="150+"
              textIcons={["U", "C", "B"]}
              extra="+100"
            />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Explore by Category
            </h2>
            <p className="text-gray-500 text-lg font-medium">
              Browse jobs by category to find the perfect role for your skills.
            </p>
          </div>
          <div
            className={`transition-all duration-700 rounded-3xl ${
              showAllCategories
                ? "max-h-[420px] overflow-y-auto py-4 pr-4 bg-white/20 backdrop-blur-sm shadow-inner p-6"
                : "max-h-full"
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(showAllCategories ? categories : categories.slice(0, 8)).map(
                (cat, i) => (
                  <CategoryCard
                    key={i}
                    icon={cat.icon}
                    title={cat.title}
                    count={cat.count}
                    color={cat.color}
                    onClick={() => onNavigate("jobFeed")}
                  />
                ),
              )}
            </div>
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="px-8 py-3 rounded-full bg-white border border-gray-100 text-gray-600 font-bold hover:bg-gray-50 hover:text-primary-600 transition-all shadow-sm flex items-center gap-2 mx-auto"
            >
              {showAllCategories ? (
                <>
                  Show Less <i className="fa-solid fa-chevron-up text-xs"></i>
                </>
              ) : (
                <>
                  View all categories{" "}
                  <i className="fa-solid fa-chevron-down text-xs"></i>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="bg-white py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Featured Companies Actively Hiring
            </h2>
            <p className="text-gray-500 text-lg font-medium mx-auto max-w-2xl">
              Master the skills that matter with mentor-led courses designed to
              help you succeed.
            </p>
          </div>
          <div className="flex overflow-x-auto gap-8 pb-10 no-scrollbar justify-start">
            <FeaturedCompanyCard
              name="Google"
              rating="4.8"
              reviews="2.4k"
              description="Personalizing experience with advanced tech solutions."
              icon="fa-google"
              color="bg-indigo-50 text-indigo-600"
              onClick={() => onNavigate("companyDetails")}
            />
            <FeaturedCompanyCard
              name="Spotify"
              rating="4.7"
              reviews="1.8k"
              description="Connecting people through the power of music."
              icon="fa-spotify"
              color="bg-green-50 text-green-600"
              onClick={() => onNavigate("companyDetails")}
            />
            <FeaturedCompanyCard
              name="Amazon"
              rating="4.6"
              reviews="5k+"
              description="Building the future of commerce and cloud computing."
              icon="fa-amazon"
              color="bg-orange-50 text-orange-600"
              onClick={() => onNavigate("companyDetails")}
            />
            <FeaturedCompanyCard
              name="LinkedIn"
              rating="4.9"
              reviews="3.2k"
              description="Creating economic opportunity for every workforce member."
              icon="fa-linkedin"
              color="bg-blue-50 text-blue-600"
              onClick={() => onNavigate("companyDetails")}
            />
          </div>
          <div className="text-center mt-12">
            <button className="px-8 py-3 rounded-full bg-white border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 hover:text-primary-600 transition-all shadow-sm">
              View All Companies
            </button>
          </div>
        </div>
      </section>

      {/* Sponsored Companies */}
      <section className="bg-gray-50 py-20 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Sponsored Companies
            </h2>
          </div>
          {/* Scrollable Filters */}
          <div className="flex overflow-x-auto gap-3 pb-8 no-scrollbar justify-start md:justify-center">
            {[
              "All",
              "IT Services",
              "Technology",
              "Healthcare",
              "BFSI",
              "Manufacturing",
              "BPM",
              "+ More",
            ].map((f, i) => (
              <button
                key={i}
                className={`px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all whitespace-nowrap shadow-sm ${
                  i === 0
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-500 border border-gray-100 hover:border-gray-900 hover:text-gray-900"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SponsoredCompanyCard
              name="TCS"
              rating="4.7"
              reviews="40k"
              tags={["IT Services", "MNC"]}
              icon="fa-code"
              color="bg-blue-50 text-blue-600"
              onClick={() => onNavigate("companyDetails")}
            />
            <SponsoredCompanyCard
              name="Infosys"
              rating="4.6"
              reviews="35k"
              tags={["Technology", "Global"]}
              icon="fa-laptop-code"
              color="bg-indigo-50 text-indigo-600"
              onClick={() => onNavigate("companyDetails")}
            />
            <SponsoredCompanyCard
              name="HDFC Bank"
              rating="4.5"
              reviews="25k"
              tags={["BFSI", "Banking"]}
              icon="fa-building-columns"
              color="bg-red-50 text-red-600"
              onClick={() => onNavigate("companyDetails")}
            />
            <SponsoredCompanyCard
              name="Apollo"
              rating="4.8"
              reviews="15k"
              tags={["Healthcare", "Hospital"]}
              icon="fa-heart-pulse"
              color="bg-green-50 text-green-600"
              onClick={() => onNavigate("companyDetails")}
            />
            <SponsoredCompanyCard
              name="Tata Steel"
              rating="4.6"
              reviews="18k"
              tags={["Manufacturing", "Steel"]}
              icon="fa-industry"
              color="bg-orange-50 text-orange-600"
              onClick={() => onNavigate("companyDetails")}
            />
            <SponsoredCompanyCard
              name="Wipro"
              rating="4.4"
              reviews="30k"
              tags={["BPM", "IT"]}
              icon="fa-headset"
              color="bg-purple-50 text-purple-600"
              onClick={() => onNavigate("companyDetails")}
            />
            <SponsoredCompanyCard
              name="Samsung"
              rating="4.8"
              reviews="12k"
              tags={["Technology", "Hardware"]}
              icon="fa-microchip"
              color="bg-cyan-50 text-cyan-600"
              onClick={() => onNavigate("companyDetails")}
            />
            <SponsoredCompanyCard
              name="Accenture"
              rating="4.7"
              reviews="50k"
              tags={["Consulting", "Global"]}
              icon="fa-chart-line"
              color="bg-pink-50 text-pink-600"
              onClick={() => onNavigate("companyDetails")}
            />
          </div>
        </div>
      </section>

      {/* Popular Roles Section */}
      <section className="bg-white py-20 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Illustration Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-[2rem] p-10 flex flex-col justify-between relative overflow-hidden h-full">
              <div className="relative z-10">
                <h2 className="text-3xl font-black text-gray-900 mb-4">
                  Discover jobs across popular roles
                </h2>
                <p className="text-gray-600 font-bold mb-8 leading-relaxed">
                  Select a role and we'll show you relevant jobs for it!
                </p>
              </div>
              <div className="relative z-10 flex justify-center py-10 scale-125">
                <svg
                  width="200"
                  height="180"
                  viewBox="0 0 200 180"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="100" cy="80" r="60" fill="white" opacity="0.6" />
                  <circle cx="100" cy="80" r="45" fill="#e0e7ff" />
                  <circle cx="100" cy="65" r="15" fill="#4f46e5" />
                  <path
                    d="M80 100 Q100 130 120 100 V120 H80 V100"
                    fill="#4f46e5"
                  />
                  <g transform="translate(130, 30)">
                    <circle
                      cx="15"
                      cy="15"
                      r="12"
                      fill="white"
                      stroke="#6366f1"
                      strokeWidth="3"
                    />
                    <path
                      d="M24 24 L32 32"
                      stroke="#6366f1"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </g>
                </svg>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-xl -mr-16 -mt-16"></div>
            </div>

            {/* Roles Grid */}
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PopularRoleCard
                  title="Full Stack Developer"
                  count="23.4k+"
                  onClick={() => onNavigate("jobFeed")}
                />
                <PopularRoleCard
                  title="Mobile App Developer"
                  count="12.1k+"
                  onClick={() => onNavigate("jobFeed")}
                />
                <PopularRoleCard
                  title="Data Scientist"
                  count="8.5k+"
                  onClick={() => onNavigate("jobFeed")}
                />
                <PopularRoleCard
                  title="Digital Marketer"
                  count="15.2k+"
                  onClick={() => onNavigate("jobFeed")}
                />
                <PopularRoleCard
                  title="Product Manager"
                  count="5.9k+"
                  onClick={() => onNavigate("jobFeed")}
                />
                <PopularRoleCard
                  title="UI/UX Designer"
                  count="9.3k+"
                  onClick={() => onNavigate("jobFeed")}
                />
              </div>
              <div className="flex justify-center gap-2">
                <span className="w-8 h-2 rounded-full bg-primary-600"></span>
                <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                <span className="w-2 h-2 rounded-full bg-gray-200"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Services */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl p-10 md:p-16 border border-gray-100 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50 rounded-full blur-[100px] opacity-30 -mr-32 -mt-32"></div>
          <div className="w-24 h-24 bg-orange-100 rounded-2xl flex items-center justify-center shrink-0 border border-orange-200">
            <i className="fa-solid fa-rocket text-4xl text-orange-500"></i>
          </div>
          <div className="flex-1 relative z-10">
            <span className="inline-block px-4 py-1 bg-orange-50 text-orange-600 border border-orange-100 text-xs font-black uppercase rounded-full mb-4 tracking-widest">
              Studsphere Fastforward
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Accelerate your job search
            </h2>
            <p className="text-gray-500 text-lg font-medium leading-relaxed mb-8">
              Premium services like AI Resume writing and priority status to
              help you get hired 3x faster.
            </p>
            <div className="flex flex-wrap gap-4">
              <Pill icon="fa-pen-nib" text="Resume Writing" />
              <Pill icon="fa-crown" text="Priority Applicant" />
              <Pill icon="fa-eye" text="Profile Display" />
            </div>
          </div>
          <div className="shrink-0 relative z-10">
            <button className="px-10 py-4 bg-orange-500 text-white font-black rounded-2xl shadow-xl shadow-orange-500/20 hover:bg-orange-600 transition-all active:scale-95">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Blogs / Insights */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            Latest Insights
          </h2>
          <p className="text-gray-500 text-lg font-medium">
            Expert guidance on design, technology, and career trends.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <BlogCard
            cat="Design"
            date="Oct 24"
            title="Art of Minimalist UI"
            img="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=400"
          />
          <BlogCard
            cat="Technology"
            date="Nov 12"
            title="React Server Components"
            img="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400"
          />
          <BlogCard
            cat="Productivity"
            date="Dec 05"
            title="Mastering Deep Work"
            img="https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&q=80&w=400"
          />
        </div>
      </section>
    </div>
  );
};

const PopularRoleCard: React.FC<{
  title: string;
  count: string;
  onClick?: () => void;
}> = ({ title, count, onClick }) => (
  <div
    onClick={onClick}
    className="border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary-500 cursor-pointer transition-all group flex justify-between items-center bg-white"
  >
    <div>
      <h3 className="font-black text-gray-900 text-lg group-hover:text-primary-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm font-bold text-gray-500 mt-1">{count} Jobs</p>
    </div>
    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary-600 group-hover:text-white transition-all">
      <i className="fa-solid fa-arrow-right text-sm"></i>
    </div>
  </div>
);

const FeaturedCompanyCard: React.FC<{
  name: string;
  rating: string;
  reviews: string;
  description: string;
  icon: string;
  color: string;
  onClick?: () => void;
}> = ({ name, rating, reviews, description, icon, color, onClick }) => (
  <div
    onClick={onClick}
    className="min-w-[280px] w-[280px] bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group cursor-pointer hover:-translate-y-1"
  >
    <div
      className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${color}`}
    >
      <i className={`fa-brands ${icon} text-2xl`}></i>
    </div>
    <h3 className="font-bold text-xl text-gray-900 mb-1">{name}</h3>
    <div className="flex items-center gap-1 text-sm text-yellow-400 mb-3">
      <i className="fa-solid fa-star"></i>
      <span className="font-bold text-gray-800">{rating}</span>
      <span className="text-gray-400">({reviews})</span>
    </div>
    <p className="text-gray-500 text-sm mb-6 leading-relaxed">{description}</p>
    <button className="w-full py-2.5 rounded-full border border-gray-100 text-gray-600 font-bold hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all duration-300 shadow-sm">
      View Jobs
    </button>
  </div>
);

const SponsoredCompanyCard: React.FC<{
  name: string;
  rating: string;
  reviews: string;
  tags: string[];
  icon: string;
  color: string;
  onClick?: () => void;
}> = ({ name, rating, reviews, tags, icon, color, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center cursor-pointer group"
  >
    <div
      className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors group-hover:scale-110 ${color}`}
    >
      <i className={`fa-solid ${icon} text-2xl`}></i>
    </div>
    <h3 className="font-bold text-lg text-gray-900 mb-1">{name}</h3>
    <div className="flex items-center gap-1 text-sm text-yellow-400 mb-3">
      <i className="fa-solid fa-star"></i>
      <span className="font-bold text-gray-800">{rating}</span>
      <span className="text-gray-400 text-xs">({reviews})</span>
    </div>
    <div className="flex flex-wrap gap-2 justify-center mt-auto">
      {tags.map((tag, i) => (
        <span
          key={i}
          className="px-3 py-1 rounded-full bg-gray-50 text-[10px] font-bold text-gray-600 border border-gray-100 uppercase tracking-widest"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const MarqueeLogo: React.FC<{
  icon: string;
  name: string;
  onClick?: () => void;
}> = ({ icon, name, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 text-3xl font-black text-gray-700 cursor-pointer hover:text-primary-600 transition-colors"
  >
    <i className={`fa-brands ${icon}`}></i> {name}
  </div>
);

const JobSimpleCard: React.FC<{
  title: string;
  company: string;
  location: string;
  exp: string;
  icon: string;
  iconColor: string;
  time: string;
  rating?: string;
  onClick?: () => void;
  onCompanyClick?: () => void;
}> = ({
  title,
  company,
  location,
  exp,
  icon,
  iconColor,
  time,
  rating = "4.5",
  onClick,
  onCompanyClick,
}) => (
  <div
    onClick={onClick}
    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer hover:-translate-y-1"
  >
    <div className="flex justify-between mb-6">
      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-gray-100">
        <i className={`fa-brands ${icon} text-2xl ${iconColor}`}></i>
      </div>
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
        {time}
      </span>
    </div>
    <h3 className="font-black text-lg text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
      {title}
    </h3>
    <div className="flex items-center gap-2 mb-6">
      <p
        onClick={(e) => {
          e.stopPropagation();
          onCompanyClick?.();
        }}
        className="text-sm font-bold text-gray-500 hover:text-primary-600 transition-colors"
      >
        {company}
      </p>
      <div className="flex items-center gap-1 text-[10px] font-black text-yellow-500">
        <i className="fa-solid fa-star"></i> {rating}
      </div>
    </div>
    <div className="flex justify-between items-center text-xs font-bold text-gray-400 border-t border-gray-50 pt-4">
      <div className="flex items-center gap-1.5">
        <i className="fa-solid fa-location-dot"></i> {location}
      </div>
      <div className="flex items-center gap-1.5">
        <i className="fa-solid fa-briefcase"></i> {exp}
      </div>
    </div>
  </div>
);

const HiringCategoryCard: React.FC<{
  title: string;
  count: string;
  icons?: string[];
  textIcons?: string[];
  extra: string;
  onClick?: () => void;
}> = ({ title, count, icons, textIcons, extra, onClick }) => (
  <div
    onClick={onClick}
    className="min-w-[300px] bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
  >
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-xl font-black text-gray-900 group-hover:text-primary-600 transition-colors">
        {title}
      </h3>
      <i className="fa-solid fa-chevron-right text-gray-300 text-sm group-hover:text-primary-600 group-hover:translate-x-1 transition-all"></i>
    </div>
    <p className="text-sm font-bold text-gray-500 mb-8">
      {count} Companies Hiring
    </p>
    <div className="flex gap-2">
      {icons?.map((icon, i) => (
        <div
          key={i}
          className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-xl text-gray-600"
        >
          <i className={`fa-brands ${icon}`}></i>
        </div>
      ))}
      {textIcons?.map((t, i) => (
        <div
          key={i}
          className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center font-black text-primary-600"
        >
          {t}
        </div>
      ))}
      <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-xs font-black text-gray-400">
        {extra}
      </div>
    </div>
  </div>
);

const CategoryCard: React.FC<{
  icon: string;
  title: string;
  count: string;
  color: string;
  onClick?: () => void;
}> = ({ icon, title, count, color, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex items-center gap-5"
  >
    <div
      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all group-hover:scale-110 ${color}`}
    >
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div className="flex-1">
      <h3 className="font-black text-gray-900 group-hover:text-primary-600 transition-colors">
        {title}
      </h3>
      <span className="text-xs font-bold text-gray-400">{count} Jobs Open</span>
    </div>
    <i className="fa-solid fa-arrow-right -rotate-45 text-gray-200 group-hover:rotate-0 group-hover:text-primary-600 transition-all"></i>
  </div>
);

const Pill: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-gray-100 bg-gray-50 font-bold text-gray-700 text-sm hover:bg-white hover:border-orange-200 transition-all cursor-pointer">
    <i className={`fa-solid ${icon} text-orange-500`}></i> {text}
  </div>
);

const BlogCard: React.FC<{
  cat: string;
  date: string;
  title: string;
  img: string;
}> = ({ cat, date, title, img }) => (
  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer">
    <div className="h-56 overflow-hidden relative">
      <img
        src={img}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        alt={title}
      />
      <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-primary-600 shadow-sm border border-gray-100">
        {cat}
      </span>
    </div>
    <div className="p-8">
      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
        {date} • 5 min read
      </div>
      <h3 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-primary-600 transition-colors mb-6">
        {title}
      </h3>
      <div className="flex justify-between items-center border-t border-gray-50 pt-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-100"></div>
          <span className="text-xs font-bold text-gray-600">Expert Team</span>
        </div>
        <i className="fa-solid fa-arrow-right text-gray-200 group-hover:text-primary-600 transition-colors"></i>
      </div>
    </div>
  </div>
);

export default JobsPage;

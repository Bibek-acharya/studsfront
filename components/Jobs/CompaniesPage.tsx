import React, { useState, useRef, useEffect } from "react";

interface Company {
  id: number;
  name: string;
  rating: number;
  reviews: string;
  industries: string[];
  logoText: string;
  logoBg: string;
  logoColor: string;
}

interface CompaniesPageProps {
  onNavigate?: (view: any) => void;
}

const companies: Company[] = [
  {
    id: 1,
    name: "eSewa",
    rating: 4.7,
    reviews: "1.2k",
    industries: ["FinTech", "Digital Wallet"],
    logoText: "e",
    logoBg: "bg-green-50",
    logoColor: "text-green-600",
  },
  {
    id: 2,
    name: "Yatri Motorcycles",
    rating: 4.8,
    reviews: "850",
    industries: ["Automotive", "EV"],
    logoText: "Y",
    logoBg: "bg-slate-900",
    logoColor: "text-white",
  },
  {
    id: 3,
    name: "Daraz",
    rating: 4.5,
    reviews: "2.5k",
    industries: ["E-commerce", "MNC"],
    logoText: "D",
    logoBg: "bg-orange-50",
    logoColor: "text-orange-500",
  },
  {
    id: 4,
    name: "Leapfrog Technology",
    rating: 4.9,
    reviews: "450",
    industries: ["Software", "US MNC"],
    logoText: "L",
    logoBg: "bg-blue-50",
    logoColor: "text-blue-600",
  },
  {
    id: 5,
    name: "WorldLink",
    rating: 4.3,
    reviews: "3.1k",
    industries: ["ISP", "Internet"],
    logoText: "W",
    logoBg: "bg-green-600",
    logoColor: "text-white",
  },
  {
    id: 6,
    name: "Pathao",
    rating: 4.6,
    reviews: "1.8k",
    industries: ["Ride-sharing", "Logistics"],
    logoText: "P",
    logoBg: "bg-red-500",
    logoColor: "text-white",
  },
  {
    id: 7,
    name: "Verisk Nepal",
    rating: 4.8,
    reviews: "720",
    industries: ["Data Analytics", "IT"],
    logoText: "V",
    logoBg: "bg-indigo-900",
    logoColor: "text-white",
  },
  {
    id: 8,
    name: "Khalti",
    rating: 4.5,
    reviews: "980",
    industries: ["FinTech", "Startup"],
    logoText: "K",
    logoBg: "bg-purple-600",
    logoColor: "text-white",
  },
  {
    id: 9,
    name: "Studsphere",
    rating: 4.2,
    reviews: "150",
    industries: ["EdTech", "Startup"],
    logoText: "S",
    logoBg: "bg-teal-50",
    logoColor: "text-teal-600",
  },
];

const categories = [
  { label: "FMCG & Retail", count: 170 },
  { label: "Startups", count: 760 },
  { label: "Edtech", count: 163 },
  { label: "Healthcare", count: 674 },
  { label: "Unicorns", count: 93, selected: true },
  { label: "Fintech", count: 412 },
  { label: "Internet", count: 800 },
];

const CompaniesPage: React.FC<CompaniesPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState("Unicorns");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left" ? scrollLeft - 300 : scrollLeft + 300;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 font-jakarta pb-20">
      {/* HERO SECTION: CAROUSEL */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
        <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">
          {activeCategory} actively hiring
        </h2>

        <div className="relative py-8 group">
          {/* The Background Strip */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-32 bg-primary-50 rounded-xl border border-primary-100/50"></div>

          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white border border-slate-100 rounded-full shadow-xl flex items-center justify-center text-slate-400 hover:text-primary-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white border border-slate-100 rounded-full shadow-xl flex items-center justify-center text-slate-400 hover:text-primary-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>

          <div
            ref={scrollRef}
            className="relative z-10 flex gap-6 overflow-x-auto no-scrollbar scroll-smooth py-4 px-2"
          >
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`flex-none w-56 h-28 rounded-xl border p-6 text-left transition-all duration-500 relative overflow-hidden group/cat ${
                  activeCategory === cat.label
                    ? "bg-white border-primary-600 shadow-2xl shadow-primary-500/20 ring-4 ring-primary-50"
                    : "bg-white border-slate-100 shadow-sm hover:shadow-xl hover:border-primary-200"
                }`}
              >
                {activeCategory === cat.label && (
                  <div className="absolute top-4 right-4 text-primary-600 animate-fadeIn">
                    <i className="fa-solid fa-circle-check text-xl"></i>
                  </div>
                )}
                <h3 className="text-lg font-black text-slate-900 mb-1 leading-tight group-hover/cat:text-primary-600 transition-colors">
                  {cat.label}
                </h3>
                <p className={`font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-colors ${
                  activeCategory === cat.label ? "text-primary-600" : "text-slate-400 group-hover/cat:text-primary-600"
                }`}>
                  {cat.count} Companies{" "}
                  <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </p>
                
                {/* Decorative background element for active card */}
                {activeCategory === cat.label && (
                  <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-primary-50 rounded-full blur-2xl opacity-50"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3 space-y-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 sticky top-28">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-50">
                <h3 className="font-black text-xl text-slate-900 tracking-tight">
                  All Filters
                </h3>
                <span className="text-[10px] font-black text-primary-600 bg-primary-50 px-3 py-1 rounded-full border border-primary-100 uppercase tracking-widest">
                  Applied (0)
                </span>
              </div>

              <div className="space-y-10">
                <FilterSection title="Company Type">
                  <Checkbox label="Startup" />
                  <Checkbox label="Corporate" />
                  <Checkbox label="Foreign MNC" />
                  <Checkbox label="Nepali MNC" />
                </FilterSection>

                <FilterSection title="Location">
                  <div className="relative mb-6">
                    <i className="fa-solid fa-location-dot absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-sm"></i>
                    <input
                      type="text"
                      placeholder="Search city..."
                      className="w-full bg-slate-50/50 border border-slate-100 rounded-xl py-3.5 pl-12 pr-4 text-xs font-bold outline-none focus:ring-4 focus:ring-primary-100/30 focus:border-primary-500 transition-all placeholder:text-slate-300 shadow-sm"
                    />
                  </div>
                  <div className="space-y-3 max-h-48 overflow-y-auto no-scrollbar pr-2">
                    <Checkbox label="Kathmandu" checked />
                    <Checkbox label="Lalitpur" />
                    <Checkbox label="Pokhara" />
                    <Checkbox label="Biratnagar" />
                    <Checkbox label="Chitwan" />
                  </div>
                </FilterSection>

                <div className="pt-4 border-t border-slate-50">
                  <button className="flex justify-between items-center w-full font-black text-[10px] uppercase tracking-[0.25em] text-slate-400 hover:text-primary-600 transition-all group">
                    View More Industry{" "}
                    <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                      <i className="fa-solid fa-chevron-down text-[8px]"></i>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Listing */}
          <main className="lg:col-span-9">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                Showing{" "}
                <span className="text-slate-900 font-black">
                  {companies.length}
                </span>{" "}
                Companies
              </h3>
              <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400">
                Sort by:
                <select className="bg-transparent text-slate-900 border-none focus:ring-0 cursor-pointer font-black">
                  <option>Recommended</option>
                  <option>Highest Rated</option>
                  <option>Most Reviews</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {companies.map((company, idx) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  index={idx}
                  onClick={() => onNavigate?.("companyDetails")}
                />
              ))}

              {/* PROMO BANNER */}
              <div className="md:col-span-2 bg-gradient-to-br from-primary-600 to-indigo-800 rounded-2xl p-10 text-white relative overflow-hidden shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-8 my-4 group/promo animate-fadeInUp animate-delay-300">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] -mr-40 -mt-40 transition-transform duration-1000 group-hover/promo:scale-150"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400/20 rounded-full blur-[80px] -ml-32 -mb-32 transition-transform duration-1000 group-hover/promo:scale-125"></div>
                
                <div className="relative z-10 text-center sm:text-left">
                  <h4 className="text-2xl font-black mb-3 tracking-tight">
                    Create your job profile for free!
                  </h4>
                  <p className="text-primary-100/90 font-bold uppercase tracking-[0.2em] text-[10px] max-w-md mx-auto sm:mx-0">
                    Explore top jobs & career insights applied by your peers on Studsphere.
                  </p>
                </div>
                <button className="relative z-10 px-10 py-4 bg-white text-primary-600 font-black rounded-xl text-[10px] uppercase tracking-[0.25em] shadow-xl hover:bg-slate-50 transition-all active:scale-95 whitespace-nowrap group-hover/promo:translate-x-1 duration-300">
                  Register now <i className="fa-solid fa-arrow-right ml-2 text-[8px]"></i>
                </button>
              </div>
            </div>

            {/* Pagination */}
            <div className="mt-16 flex justify-center items-center gap-3">
              <PageBtn disabled icon="fa-chevron-left" />
              <PageBtn active label="1" />
              <PageBtn label="2" />
              <PageBtn label="3" />
              <PageBtn icon="fa-chevron-right" />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

const CompanyCard: React.FC<{
  company: Company;
  index: number;
  onClick: () => void;
}> = ({ company, index, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-2xl hover:border-primary-100 transition-all duration-700 group cursor-pointer animate-fadeInUp relative overflow-hidden h-full"
    style={{ animationDelay: `${index * 0.05}s` }}
  >
    {/* Subtle gradient glow on hover */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -mr-16 -mt-16"></div>

    <div className="flex items-center justify-between gap-6 relative z-10">
      <div className="flex items-center gap-6">
        <div
          className={`w-[72px] h-[72px] rounded-xl ${company.logoBg} flex items-center justify-center border border-slate-200/50 shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
        >
          <span className={`${company.logoColor} font-black text-3xl`}>
            {company.logoText}
          </span>
        </div>
        <div className="space-y-3">
          <h4 className="font-black text-xl text-slate-900 group-hover:text-primary-600 transition-colors leading-tight">
            {company.name}
          </h4>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full font-black text-[10px] border border-emerald-100 uppercase tracking-widest shadow-sm">
              {company.rating} <i className="fa-solid fa-star text-[8px]"></i>
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
              {company.reviews} <span className="text-[8px] opacity-60">Reviews</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {company.industries.map((ind) => (
              <span
                key={ind}
                className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-500 text-[9px] font-black uppercase tracking-[0.15em] border border-slate-100 group-hover:border-primary-100 group-hover:bg-primary-50 group-hover:text-primary-600 transition-all duration-300"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-primary-600 group-hover:text-white group-hover:rotate-[360deg] transition-all duration-700 shrink-0 border border-slate-100 group-hover:border-primary-600 shadow-sm">
        <i className="fa-solid fa-chevron-right text-xs"></i>
      </div>
    </div>
  </div>
);

const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="space-y-5">
    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] font-jakarta pl-1">
      {title}
    </h4>
    <div className="space-y-4">{children}</div>
  </div>
);

const Checkbox: React.FC<{ label: string; checked?: boolean }> = ({
  label,
  checked,
}) => (
  <label className="flex items-center gap-4 cursor-pointer group/check">
    <div className="relative">
      <input
        type="checkbox"
        defaultChecked={checked}
        className="peer appearance-none w-6 h-6 border-[3px] border-slate-100 rounded-lg checked:bg-primary-600 checked:border-primary-600 transition-all cursor-pointer shadow-sm group-hover/check:border-primary-200"
      />
      <i className="fa-solid fa-check absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[10px] opacity-0 peer-checked:opacity-100 transition-opacity"></i>
    </div>
    <span className="text-xs font-black text-slate-500 group-hover/check:text-primary-600 uppercase tracking-widest transition-colors pl-1">
      {label}
    </span>
  </label>
);

const PageBtn: React.FC<{
  label?: string;
  icon?: string;
  active?: boolean;
  disabled?: boolean;
}> = ({ label, icon, active, disabled }) => (
  <button
    disabled={disabled}
    className={`w-14 h-14 rounded-xl flex items-center justify-center font-black text-xs uppercase tracking-widest transition-all border-2 ${
      active
        ? "bg-primary-600 text-white border-primary-600 shadow-2xl shadow-primary-500/30"
        : "bg-white text-slate-400 border-slate-100 hover:border-primary-200 hover:text-primary-600 disabled:opacity-30 disabled:cursor-not-allowed shadow-xl shadow-slate-200/20 active:scale-95"
    }`}
  >
    {icon ? <i className={`fa-solid ${icon}`}></i> : label}
  </button>
);

export default CompaniesPage;

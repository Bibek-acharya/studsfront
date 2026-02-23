import React, { useState, useEffect } from "react";

interface EducationNavbarProps {
  onNavigate: (view: any, data?: any) => void;
  user?: { name: string; email: string; role: string } | null;
}

const EducationNavbar: React.FC<EducationNavbarProps> = ({
  onNavigate,
  user,
}) => {
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isScholarshipOpen, setIsScholarshipOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeAll = () => {
    setIsExploreOpen(false);
    setIsScholarshipOpen(false);
    setIsMoreOpen(false);
  };

  return (
    <nav
      className={`bg-white border-b border-gray-200 sticky top-0 z-[110] font-jakarta transition-all duration-300 ${isScrolled ? "py-2 shadow-md" : "py-3"}`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between gap-4 h-14">
          {/* Logo Section */}
          <div className="shrink-0 flex items-center">
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center gap-2 focus:outline-none transition-transform hover:scale-105"
            >
              <img
                src="/logo-blue.png"
                alt="StudSphere Logo"
                className="h-10 w-auto"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8 flex-1 justify-center">
            {/* Explore Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  closeAll();
                  setIsExploreOpen(!isExploreOpen);
                }}
                className="text-slate-700 hover:text-primary-600 font-bold text-sm flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 transition-all focus:outline-none"
              >
                Explore tools and Academics
                <i
                  className={`fa-solid fa-chevron-down text-[10px] transition-transform ${isExploreOpen ? "rotate-180" : ""}`}
                ></i>
              </button>

              {isExploreOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-[800px] bg-white border border-slate-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-[120] flex p-8 gap-10 animate-fadeInDown">
                  {/* OUR TOOLSET */}
                  <div className="flex-1">
                    <div className="font-black text-slate-400 mb-6 text-[10px] uppercase tracking-[0.2em]">
                      OUR TOOLSET
                    </div>
                    <ul className="space-y-4">
                      <ToolItem
                        onClick={() => {
                          onNavigate("findCollege");
                          closeAll();
                        }}
                        icon="fa-university"
                        color="bg-blue-50 text-blue-500"
                        title="Find College"
                        desc="Discover Your Perfect College"
                      />
                      <ToolItem
                        onClick={() => {
                          onNavigate("courseFinder");
                          closeAll();
                        }}
                        icon="fa-book"
                        color="bg-primary-50 text-primary-600"
                        title="Course Finder"
                        desc="Find programs that match you"
                      />
                      <ToolItem
                        onClick={() => {
                          onNavigate("examsPage");
                          closeAll();
                        }}
                        icon="fa-file-lines"
                        color="bg-yellow-50 text-yellow-600"
                        title="Exams"
                        desc="Key entrance info"
                      />
                      <ToolItem
                        onClick={() => {
                          onNavigate("campusForum");
                          closeAll();
                        }}
                        icon="fa-comments"
                        color="bg-yellow-50 text-yellow-600"
                        title="Campus Forum"
                        desc="Connect with students"
                      />
                    </ul>
                  </div>

                  {/* Explore Academics */}
                  <div className="flex-1">
                    <div className="font-black text-slate-400 mb-6 text-[10px] uppercase tracking-[0.2em]">
                      Explore Academics
                    </div>
                    <ul className="space-y-4">
                      <ToolItem
                        onClick={() => {
                          onNavigate("universitiesPage");
                          closeAll();
                        }}
                        icon="fa-building-columns"
                        color="bg-emerald-50 text-emerald-500"
                        title="Universities"
                        desc="Broad database of institutions"
                      />
                      <ToolItem
                        onClick={() => {
                          onNavigate("rankingsPage");
                          closeAll();
                        }}
                        icon="fa-trophy"
                        color="bg-gray-50 text-amber-500"
                        title="Rankings"
                        desc="Top schools globally"
                      />
                      <ToolItem
                        onClick={() => {
                          onNavigate("admissionsDiscovery");
                          closeAll();
                        }}
                        icon="fa-door-open"
                        color="bg-rose-50 text-rose-500"
                        title="Admissions"
                        desc="Active enrollment news"
                      />
                      <ToolItem
                        onClick={() => {
                          onNavigate("entranceDiscovery");
                          closeAll();
                        }}
                        icon="fa-key"
                        color="bg-blue-50 text-blue-500"
                        title="Entrance"
                        desc="Exam dates and syllabus"
                      />
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Scholarship Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  closeAll();
                  setIsScholarshipOpen(!isScholarshipOpen);
                }}
                className="text-primary-600 hover:text-primary-700 font-bold text-sm flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-primary-50 transition-all focus:outline-none"
              >
                Scholarship
                <i
                  className={`fa-solid fa-chevron-down text-[10px] transition-transform ${isScholarshipOpen ? "rotate-180" : ""}`}
                ></i>
              </button>

              {isScholarshipOpen && (
                <div className="absolute left-0 mt-3 w-80 bg-white border border-slate-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-[120] p-4 animate-fadeInDown">
                  <div className="font-black text-slate-400 mb-4 text-[10px] uppercase tracking-[0.2em] px-4">
                    Scholarship Options
                  </div>
                  <ul className="space-y-1">
                    <ToolItem
                      onClick={() => {
                        onNavigate("scholarshipMain");
                        closeAll();
                      }}
                      icon="fa-home"
                      color="bg-primary-50 text-primary-600"
                      title="Scholarship Hub"
                      desc="Scholarship Landing Page"
                    />
                    <ToolItem
                      onClick={() => {
                        onNavigate("scholarshipFinder");
                        closeAll();
                      }}
                      icon="fa-search-dollar"
                      color="bg-slate-50 text-slate-600"
                      title="Scholarship Finder"
                      desc="Find matches for you"
                    />
                    <ToolItem
                      onClick={() => {
                        onNavigate("scholarshipFinder");
                        closeAll();
                      }}
                      icon="fa-file-signature"
                      color="bg-slate-50 text-slate-600"
                      title="Apply for Scholarship"
                      desc="Start application process"
                    />
                  </ul>
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate("studyResources")}
              className="text-slate-700 hover:text-primary-600 font-bold text-sm px-3 py-2 rounded-xl hover:bg-slate-50 transition-all"
            >
              Study Resources
            </button>

            {/* More Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  closeAll();
                  setIsMoreOpen(!isMoreOpen);
                }}
                className="text-slate-700 hover:text-primary-600 font-bold text-sm flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 transition-all focus:outline-none"
              >
                More
                <i
                  className={`fa-solid fa-chevron-down text-[10px] transition-transform ${isMoreOpen ? "rotate-180" : ""}`}
                ></i>
              </button>

              {isMoreOpen && (
                <div className="absolute left-0 mt-3 w-56 bg-white border border-slate-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-[120] p-2 animate-fadeInDown">
                  <ul className="space-y-1">
                    <MoreItem
                      icon="fa-newspaper"
                      color="bg-blue-50 text-blue-500"
                      label="News"
                      onClick={() => {
                        onNavigate("newsPage");
                        closeAll();
                      }}
                    />
                    <MoreItem
                      icon="fa-blog"
                      color="bg-rose-50 text-rose-500"
                      label="Blogs"
                      onClick={() => {
                        onNavigate("blogPage");
                        closeAll();
                      }}
                    />
                    <MoreItem
                      icon="fa-calendar-day"
                      color="bg-yellow-50 text-yellow-600"
                      label="Events"
                      onClick={() => {
                        onNavigate("eventsPage");
                        closeAll();
                      }}
                    />
                    <MoreItem
                      icon="fa-envelope"
                      color="bg-emerald-50 text-emerald-500"
                      label="Contact Us"
                      onClick={() => {
                        onNavigate("contact");
                        closeAll();
                      }}
                    />
                    {user?.role === "admin" && (
                      <MoreItem
                        icon="fa-shield-halved"
                        color="bg-purple-50 text-purple-500"
                        label="Admin Colleges"
                        onClick={() => {
                          onNavigate("adminColleges");
                          closeAll();
                        }}
                      />
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            {user ? (
              <>
                <button className="relative p-2.5 hover:bg-slate-50 rounded-full transition-all text-slate-600 hover:text-primary-600 group">
                  <i className="fa-regular fa-bell text-xl"></i>
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white group-hover:scale-110 transition-transform"></span>
                </button>

                <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border-2 border-emerald-500 shadow-sm cursor-pointer hover:scale-105 transition-transform">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </>
            ) : (
              <button
                onClick={() => onNavigate("login")}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95"
              >
                Login
              </button>
            )}

            <button
              onClick={() => onNavigate("institutionZone")}
              className="text-slate-700 font-black text-xs uppercase tracking-widest hover:text-emerald-600 flex items-center gap-2 group transition-all"
            >
              Institutions Zone
              <i className="fa-solid fa-chevron-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
            </button>
            {user?.role === "admin" && (
              <button
                onClick={() => onNavigate("adminColleges")}
                className="text-purple-600 font-black text-xs uppercase tracking-widest hover:text-purple-700 flex items-center gap-2 group transition-all"
              >
                Admin Colleges
                <i className="fa-solid fa-chevron-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-xl text-slate-600"
          >
            <i
              className={`fa-solid ${isMobileOpen ? "fa-xmark" : "fa-bars"} text-2xl`}
            ></i>
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <div
          className={`fixed inset-y-0 right-0 w-[300px] bg-white z-[200] p-6 flex flex-col gap-6 transform transition-transform duration-300 ease-in-out md:hidden border-l border-slate-100 shadow-2xl ${isMobileOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex justify-between items-center mb-6">
            <img src="/logo-blue.png" alt="StudSphere" className="h-8 w-auto" />
            <button
              onClick={() => setIsMobileOpen(false)}
              className="text-slate-400 hover:text-primary-600 p-2"
            >
              <i className="fa-solid fa-xmark text-2xl"></i>
            </button>
          </div>

          <div className="flex flex-col gap-6 overflow-y-auto no-scrollbar pb-10">
            <div>
              <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-4">
                Explore
              </p>
              <button
                onClick={() => {
                  onNavigate("home");
                  setIsMobileOpen(false);
                }}
                className="block w-full text-left text-slate-800 font-bold text-lg hover:text-primary-600 transition-colors"
              >
                StudSphere for Students
              </button>
              <button
                onClick={() => {
                  onNavigate("findCollege");
                  setIsMobileOpen(false);
                }}
                className="block w-full text-left text-slate-600 font-bold text-sm mt-4 hover:text-primary-600 pl-4"
              >
                Find College
              </button>
              <button
                onClick={() => {
                  onNavigate("courseFinder");
                  setIsMobileOpen(false);
                }}
                className="block w-full text-left text-slate-600 font-bold text-sm mt-4 hover:text-primary-600 pl-4"
              >
                Course Finder
              </button>
              <button
                onClick={() => {
                  onNavigate("examsPage");
                  setIsMobileOpen(false);
                }}
                className="block w-full text-left text-slate-600 font-bold text-sm mt-4 hover:text-primary-600 pl-4"
              >
                Exams
              </button>
              <button
                onClick={() => {
                  onNavigate("universitiesPage");
                  setIsMobileOpen(false);
                }}
                className="block w-full text-left text-slate-600 font-bold text-sm mt-4 hover:text-primary-600 pl-4"
              >
                Universities
              </button>
              <button
                onClick={() => {
                  onNavigate("rankingsPage");
                  setIsMobileOpen(false);
                }}
                className="block w-full text-left text-slate-600 font-bold text-sm mt-4 hover:text-primary-600 pl-4"
              >
                Rankings
              </button>
              <button
                onClick={() => {
                  onNavigate("admissionsDiscovery");
                  setIsMobileOpen(false);
                }}
                className="block w-full text-left text-slate-600 font-bold text-sm mt-4 hover:text-primary-600 pl-4"
              >
                Admissions
              </button>
              <button
                onClick={() => {
                  onNavigate("entranceDiscovery");
                  setIsMobileOpen(false);
                }}
                className="block w-full text-left text-slate-600 font-bold text-sm mt-4 hover:text-primary-600 pl-4"
              >
                Entrance
              </button>
              <button
                onClick={() => {
                  onNavigate("campusForum");
                  setIsMobileOpen(false);
                }}
                className="block w-full text-left text-slate-600 font-bold text-sm mt-4 hover:text-primary-600 pl-4"
              >
                Campus Forum
              </button>
              {user?.role === "admin" && (
                <button
                  onClick={() => {
                    onNavigate("adminColleges");
                    setIsMobileOpen(false);
                  }}
                  className="block w-full text-left text-purple-600 font-bold text-sm mt-4 hover:text-purple-700 pl-4"
                >
                  Admin Colleges
                </button>
              )}
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setIsScholarshipOpen(!isScholarshipOpen)}
                className="flex items-center justify-between w-full text-primary-600 font-black text-lg uppercase tracking-tight"
              >
                Scholarship
                <i
                  className={`fa-solid fa-chevron-${isScholarshipOpen ? "up" : "down"} text-sm`}
                ></i>
              </button>
              {isScholarshipOpen && (
                <div className="pl-4 space-y-4 animate-fadeInDown">
                  <ToolItem
                    onClick={() => {
                      onNavigate("scholarshipFinder");
                      setIsMobileOpen(false);
                    }}
                    icon="fa-search-dollar"
                    color="bg-slate-50 text-slate-600"
                    title="Scholarship Finder"
                    desc="Find matches for you"
                  />
                  <ToolItem
                    onClick={() => {
                      onNavigate("scholarshipFinder");
                      setIsMobileOpen(false);
                    }}
                    icon="fa-file-signature"
                    color="bg-primary-50 text-primary-600"
                    title="Apply for Scholarship"
                    desc="Start application process"
                  />
                </div>
              )}
            </div>

            <button
              onClick={() => {
                onNavigate("studyResources");
                setIsMobileOpen(false);
              }}
              className="block w-full text-left text-slate-800 font-bold text-lg hover:text-primary-600 transition-colors"
            >
              Study Resources
            </button>

            <div className="space-y-4 border-t border-slate-50 pt-8">
              <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">
                More Resources
              </p>
              <div className="grid grid-cols-2 gap-4">
                <MoreItem
                  icon="fa-newspaper"
                  color="bg-blue-50 text-blue-500"
                  label="News"
                  onClick={() => {
                    onNavigate("newsPage");
                    setIsMobileOpen(false);
                  }}
                />
                <MoreItem
                  icon="fa-blog"
                  color="bg-rose-50 text-rose-500"
                  label="Blogs"
                  onClick={() => {
                    onNavigate("blogPage");
                    setIsMobileOpen(false);
                  }}
                />
                <MoreItem
                  icon="fa-calendar-day"
                  color="bg-yellow-50 text-yellow-600"
                  label="Events"
                  onClick={() => {
                    onNavigate("eventsPage");
                    setIsMobileOpen(false);
                  }}
                />
                <MoreItem
                  icon="fa-envelope"
                  color="bg-emerald-50 text-emerald-500"
                  label="Contact"
                  onClick={() => {
                    onNavigate("contact");
                    setIsMobileOpen(false);
                  }}
                />
              </div>
            </div>

            <div className="pt-8 border-t border-slate-50">
              {user ? (
                <div className="flex items-center gap-4">
                  <button className="relative w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                    <i className="fa-regular fa-bell text-xl"></i>
                    <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                  </button>
                  <div className="flex-1 bg-slate-50 p-3 rounded-2xl flex items-center gap-3 font-jakarta">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                      className="w-10 h-10 rounded-xl bg-white border border-slate-200"
                      alt=""
                    />
                    <div>
                      <p className="font-black text-sm text-slate-800 leading-none mb-1">
                        {user.name}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {user.role}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onNavigate("login");
                    setIsMobileOpen(false);
                  }}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl active:scale-95"
                >
                  Login to your account
                </button>
              )}
            </div>

            <button
              onClick={() => {
                onNavigate("institutionZone");
                setIsMobileOpen(false);
              }}
              className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl active:scale-95"
            >
              Institutions Zone ›
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[150] md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Overlay click to close desktop dropdowns */}
      {(isExploreOpen || isScholarshipOpen || isMoreOpen) && (
        <div
          className="fixed inset-0 z-[100] bg-transparent"
          onClick={closeAll}
        ></div>
      )}
    </nav>
  );
};

const ToolItem: React.FC<{
  icon: string;
  color: string;
  title: string;
  desc: string;
  onClick?: () => void;
}> = ({ icon, color, title, desc, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-all group w-full text-left font-jakarta"
  >
    <div
      className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0 transition-all shadow-sm ${color} group-hover:scale-110`}
    >
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div className="min-w-0 font-jakarta">
      <p className="text-xs font-black text-slate-900 leading-none mb-1">
        {title}
      </p>
      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate">
        {desc}
      </p>
    </div>
  </button>
);

const MoreItem: React.FC<{
  icon: string;
  color: string;
  label: string;
  onClick?: () => void;
}> = ({ icon, color, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all group w-full text-left font-jakarta"
  >
    <div
      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 ${color}`}
    >
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <span className="text-xs font-black text-slate-700 group-hover:text-primary-600 transition-colors uppercase tracking-widest">
      {label}
    </span>
  </button>
);

export default EducationNavbar;

import React, { useState, useEffect } from "react";

interface NavbarProps {
  onNavigate?: (view: any) => void;
  currentView?:
    | "home"
    | "about"
    | "contact"
    | "rewards"
    | "rewardStore"
    | "partner"
    | "advertise"
    | "services"
    | "jobsPage"
    | "educationPage"
    | "newsPage"
    | "blogPage"
    | "eventsPage"
    | "scholarshipMain"
    | "scholarshipFinder";
  user?: { name: string; email: string; role: string } | null;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  currentView,
  user,
  onLogout,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest("#profile-container") &&
        !target.closest("#notif-container")
      ) {
        setIsProfileOpen(false);
        setIsNotifOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navClass =
    isScrolled || currentView !== "home"
      ? "bg-slate-900/95 backdrop-blur-md shadow-lg py-3"
      : "bg-transparent py-5";

  const isActive = (view: string) => currentView === view;

  // Check if "More" dropdown items are active
  const isMoreActive = [
    "contact",
    "rewards",
    "rewardStore",
    "services",
    "partner",
    "advertise",
  ].some((view) => currentView === view);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${navClass}`}
    >
      <div className="w-full px-6 md:px-12 flex justify-between items-center relative">
        {/* Logo */}
        <button
          onClick={() => onNavigate?.("home")}
          className="flex items-center gap-2 focus:outline-none transition-transform hover:scale-105"
        >
          <img
            src="/logo-blue.png"
            alt="StudSphere Logo"
            className="h-10 w-auto"
          />
        </button>

        {/* Center Links (Desktop) */}
        <div className="hidden lg:flex space-x-8 items-center">
          {/* Mega Menu Trigger Container (Always shown) */}
          <div className="relative group">
            <button className="font-medium text-gray-200 hover:text-blue-300 transition flex items-center gap-1 focus:outline-none py-2">
              Explore
              <i className="fa-solid fa-chevron-down text-[10px] transition-transform group-hover:rotate-180"></i>
            </button>

            <div className="fixed top-[72px] left-0 w-full bg-white shadow-2xl border-y border-gray-100 opacity-0 invisible translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 transform origin-top overflow-hidden">
              <div className="max-w-7xl mx-auto p-6 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_240px] gap-6">
                  {/* Card 1: Education */}
                  <button
                    onClick={() => onNavigate?.("educationPage")}
                    className="group/card relative h-56 overflow-hidden rounded-2xl cursor-pointer text-left shadow-lg border border-transparent hover:border-blue-500/30 transition-all"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1523050335392-495619989da1?auto=format&fit=crop&w=800&q=80"
                      alt="Education"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <h3 className="text-lg font-bold mb-1 text-white uppercase tracking-tight">
                        StudSphere Education
                      </h3>
                      <p className="text-[10px] text-white/70 font-black uppercase tracking-widest">
                        Colleges, Universities & Resources
                      </p>
                    </div>
                  </button>

                  {/* Card 2: Job */}
                  <button
                    onClick={() => onNavigate?.("jobsPage")}
                    className="group/card relative h-56 overflow-hidden rounded-lg cursor-pointer text-left shadow-lg border border-transparent hover:border-blue-500/30 transition-all"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
                      alt="Jobs"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <h3 className="text-lg font-bold mb-1 text-white uppercase tracking-tight">
                        StudSphere for Job
                      </h3>
                      <p className="text-[10px] text-white/70 font-black uppercase tracking-widest">
                        Connect with top employers
                      </p>
                    </div>
                  </button>

                  {/* Card 3: Scholarship */}
                  <button
                    onClick={() => onNavigate?.("scholarshipMain")}
                    className="group/card relative h-56 overflow-hidden rounded-lg cursor-pointer text-left shadow-lg border border-transparent hover:border-blue-500/30 transition-all"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1523240682740-8f563509fa0a?auto=format&fit=crop&w=800&q=80"
                      alt="Scholarship"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <h3 className="text-lg font-bold mb-1 text-white uppercase tracking-tight">
                        StudSphere for Scholarship
                      </h3>
                      <p className="text-[10px] text-white/70 font-black uppercase tracking-widest">
                        Unlock your academic potential
                      </p>
                    </div>
                  </button>

                  {/* Side Options */}
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => onNavigate?.("institutionZone")}
                      className="flex-1 group/mini relative overflow-hidden rounded-lg cursor-pointer text-left shadow-sm border border-transparent hover:border-emerald-500/40 transition-all active:scale-95"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80"
                        alt="Institutions"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/mini:scale-110 opacity-60"
                      />
                      <div className="absolute inset-0 bg-black/60" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-xs font-bold text-white uppercase tracking-tight">
                          Institutions Zone
                        </h3>
                      </div>
                    </button>
                    <button
                      onClick={() => onNavigate?.("employerZone")}
                      className="flex-1 group/mini relative overflow-hidden rounded-lg cursor-pointer text-left shadow-sm border border-transparent hover:border-blue-500/40 transition-all active:scale-95"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80"
                        alt="Employers"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/mini:scale-110 opacity-60"
                      />
                      <div className="absolute inset-0 bg-black/60" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-xs font-bold text-white uppercase tracking-tight">
                          Employer Zone
                        </h3>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate?.("about")}
            className={`font-medium transition ${isActive("about") ? "text-blue-400" : "text-gray-200 hover:text-blue-300"}`}
          >
            About Us
          </button>

          {/* More Dropdown */}
          <div className="relative group">
            <button
              className={`font-medium transition flex items-center gap-1 focus:outline-none py-2 ${isMoreActive ? "text-blue-400" : "text-gray-200 hover:text-blue-300"}`}
            >
              More
              <i className="fa-solid fa-chevron-down text-[10px] transition-transform group-hover:rotate-180"></i>
            </button>
            <div className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 transform origin-top-left overflow-hidden mt-2">
              <div className="py-2">
                <button
                  onClick={() => onNavigate?.("services")}
                  className={`w-full text-left flex items-center gap-3 px-5 py-3 hover:bg-blue-50 transition text-sm font-bold ${isActive("services") ? "text-blue-600 bg-blue-50" : "text-slate-700"}`}
                >
                  <i className="fa-solid fa-gears text-blue-500 w-5"></i> Our
                  Services
                </button>
                <button
                  onClick={() => onNavigate?.("rewards")}
                  className={`w-full text-left flex items-center gap-3 px-5 py-3 hover:bg-blue-50 transition text-sm font-bold ${isActive("rewards") || isActive("rewardStore") ? "text-blue-600 bg-blue-50" : "text-slate-700"}`}
                >
                  <i className="fa-solid fa-award text-blue-500 w-5"></i> Reward
                  Ecosystem
                </button>
                <button
                  onClick={() => onNavigate?.("partner")}
                  className={`w-full text-left flex items-center gap-3 px-5 py-3 hover:bg-blue-50 transition text-sm font-bold ${isActive("partner") ? "text-blue-600 bg-blue-50" : "text-slate-700"}`}
                >
                  <i className="fa-solid fa-handshake text-blue-500 w-5"></i>{" "}
                  Partner with Us
                </button>
                <button
                  onClick={() => onNavigate?.("advertise")}
                  className={`w-full text-left flex items-center gap-3 px-5 py-3 hover:bg-blue-50 transition text-sm font-bold ${isActive("advertise") ? "text-blue-600 bg-blue-50" : "text-slate-700"}`}
                >
                  <i className="fa-solid fa-rectangle-ad text-blue-500 w-5"></i>{" "}
                  Advertise with Us
                </button>
                <button
                  onClick={() => onNavigate?.("contact")}
                  className={`w-full text-left flex items-center gap-3 px-5 py-3 hover:bg-blue-50 transition text-sm font-bold ${isActive("contact") ? "text-blue-600 bg-blue-50" : "text-slate-700"}`}
                >
                  <i className="fa-solid fa-envelope text-blue-500 w-5"></i>{" "}
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-5">
          {user ? (
            <div className="flex items-center gap-3 md:gap-5">
              {/* Notification Dropdown */}
              <div className="relative" id="notif-container">
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="w-10 h-10 flex items-center justify-center text-gray-200 hover:text-blue-300 transition relative rounded-full hover:bg-white/10 focus:outline-none"
                >
                  <i className="fa-regular fa-bell text-xl"></i>
                  <span className="absolute top-2 right-2.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-slate-900 transform translate-x-1 -translate-y-1">
                    3
                  </span>
                </button>

                {isNotifOpen && (
                  <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transform origin-top-right transition-all z-[110]">
                    <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0">
                      <h3 className="font-bold text-gray-800">Notifications</h3>
                      <button className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline">
                        Mark all read
                      </button>
                    </div>

                    <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                      <div className="px-5 py-4 flex gap-4 hover:bg-gray-50 transition border-b border-gray-50 bg-blue-50/30">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                          <i className="fa-solid fa-briefcase"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-800">
                            <span className="font-semibold">
                              New Job Alert:
                            </span>{" "}
                            UX Designer role matches your profile.
                          </p>
                          <p className="text-xs text-blue-600 font-medium mt-1">
                            2 mins ago
                          </p>
                        </div>
                      </div>
                      <div className="px-5 py-4 flex gap-4 hover:bg-gray-50 transition border-b border-gray-50">
                        <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                          <i className="fa-solid fa-file-circle-check"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Your application for{" "}
                            <span className="font-medium text-gray-800">
                              Stem 2024
                            </span>{" "}
                            has been received.
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Yesterday
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onNavigate?.("newsPage")}
                      className="w-full bg-gray-50 px-4 py-3 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-gray-100 transition flex items-center justify-center gap-2 border-t border-gray-100"
                    >
                      View all notifications{" "}
                      <i className="fa-solid fa-arrow-right text-xs"></i>
                    </button>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative" id="profile-container">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 focus:outline-none hover:bg-white/10 p-1.5 md:pr-3 rounded-full transition border border-transparent hover:border-white/20"
                >
                  <div className="relative">
                    <img
                      src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${user.name}`}
                      className="w-9 h-9 rounded-full bg-gray-200 border-2 border-blue-400/30"
                      alt="Avatar"
                    />
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-slate-900 bg-green-500"></span>
                  </div>
                  <div className="hidden lg:flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-white">
                      {user.name}
                    </span>
                    <i className="fa-solid fa-chevron-down text-[10px] text-gray-400"></i>
                  </div>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transform origin-top-right z-[110]">
                    <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <p className="text-base font-bold text-gray-800">
                          {user.name}
                        </p>
                        <i className="fa-solid fa-circle-check text-blue-500 text-xs"></i>
                      </div>
                      <p className="text-xs text-gray-500 truncate mb-3">
                        {user.email}
                      </p>

                      <button
                        onClick={() => onNavigate?.("rewards")}
                        className="w-full flex items-center gap-2 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 text-amber-800 px-3 py-1.5 rounded-lg hover:shadow-sm hover:from-amber-100 transition group/reward"
                      >
                        <i className="fa-solid fa-gem text-amber-500 animate-pulse"></i>
                        <div className="flex flex-col items-start leading-none">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 text-left">
                            Rewards
                          </span>
                          <span className="text-sm font-bold">2,450 Pts</span>
                        </div>
                        <i className="fa-solid fa-chevron-right text-xs text-amber-400 ml-auto transition-transform group-hover/reward:translate-x-1"></i>
                      </button>
                    </div>

                    <div className="py-2">
                      <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 mt-1">
                        Dashboards
                      </p>
                      <button
                        onClick={() => {
                          onNavigate?.("studentDashboard");
                          setIsProfileOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition group ${isActive("studentDashboard") ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}`}
                      >
                        <i className="fa-solid fa-user-graduate w-5 text-gray-400 group-hover:text-blue-600"></i>{" "}
                        Student Dashboard
                      </button>
                      <button
                        onClick={() => {
                          onNavigate?.("educationPage");
                          setIsProfileOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition group ${isActive("educationPage") ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}`}
                      >
                        <i className="fa-solid fa-graduation-cap w-5 text-gray-400 group-hover:text-blue-600"></i>{" "}
                        Education Dashboard
                      </button>
                      <button
                        onClick={() => {
                          onNavigate?.("jobFeed");
                          setIsProfileOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition group ${isActive("jobFeed") ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}`}
                      >
                        <i className="fa-solid fa-briefcase w-5 text-gray-400 group-hover:text-blue-600"></i>{" "}
                        Jobs Dashboard
                      </button>
                      <button
                        onClick={() => {
                          onNavigate?.("scholarshipMain");
                          setIsProfileOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition group ${isActive("scholarshipMain") ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}`}
                      >
                        <i className="fa-solid fa-medal w-5 text-gray-400 group-hover:text-blue-600"></i>{" "}
                        Scholarship Dashboard
                      </button>
                    </div>

                    <div className="border-t border-gray-100 my-1"></div>

                    <div className="py-2">
                      <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 mt-1">
                        Account
                      </p>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition group">
                        <i className="fa-regular fa-user w-5 text-gray-400 group-hover:text-blue-600"></i>{" "}
                        Profile
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition group">
                        <i className="fa-solid fa-gear w-5 text-gray-400 group-hover:text-blue-600"></i>{" "}
                        Settings
                      </button>
                    </div>

                    <div className="border-t border-gray-100 my-1"></div>

                    <div className="p-2">
                      <button
                        onClick={() => {
                          onLogout?.();
                          setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
                      >
                        <i className="fa-solid fa-arrow-right-from-bracket w-5"></i>{" "}
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate?.("login")}
                className="hidden sm:block text-gray-200 hover:text-white font-bold text-sm px-4 py-2 transition"
              >
                Log in
              </button>
              <button
                onClick={() => onNavigate?.("signup")}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition shadow-lg shadow-blue-500/20 active:scale-95"
              >
                Sign Up
              </button>
            </div>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-2xl text-white ml-2 p-2 focus:outline-none"
          >
            <i
              className={`fa-solid ${isMobileMenuOpen ? "fa-xmark" : "fa-bars"}`}
            ></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-[280px] bg-slate-900 z-[200] p-6 flex flex-col gap-4 transform transition-transform duration-300 ease-in-out lg:hidden border-l border-white/10 shadow-2xl ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-6">
          <img src="/logo-blue.png" alt="StudSphere" className="h-8 w-auto" />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white hover:text-blue-400 p-2"
          >
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
        </div>

        <div className="flex flex-col gap-2 overflow-y-auto pb-10">
          {user && (
            <div className="flex items-center gap-4 px-4 py-4 mb-2 bg-white/5 rounded-xl border border-white/10">
              <div className="relative shrink-0">
                <img
                  src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${user.name}`}
                  alt="User"
                  className="w-14 h-14 rounded-full bg-blue-400"
                />
                <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full ring-2 ring-slate-900 bg-green-500"></span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="font-bold text-white text-lg leading-tight">
                    {user.name}
                  </p>
                  <i className="fa-solid fa-circle-check text-blue-400 text-xs"></i>
                </div>
                <button
                  onClick={() => {
                    onNavigate?.("rewards");
                    setIsMobileMenuOpen(false);
                  }}
                  className="mt-1 flex items-center gap-1.5 text-xs text-amber-400 font-bold hover:text-amber-300 transition"
                >
                  <i className="fa-solid fa-gem text-amber-500"></i>
                  <span>2,450 Points</span>
                  <i className="fa-solid fa-arrow-right text-[10px] ml-1 opacity-50"></i>
                </button>
              </div>
            </div>
          )}

          <button
            onClick={() => {
              onNavigate?.("home");
              setIsMobileMenuOpen(false);
            }}
            className="text-left text-lg font-bold flex items-center gap-3 py-2 text-white"
          >
            <i className="fa-solid fa-house text-blue-400 w-6"></i> Home
          </button>
          <button
            onClick={() => {
              onNavigate?.("studentDashboard");
              setIsMobileMenuOpen(false);
            }}
            className="text-left text-lg font-bold flex items-center gap-3 py-2 text-white"
          >
            <i className="fa-solid fa-user-graduate text-blue-400 w-6"></i>{" "}
            Student Dashboard
          </button>
          <button
            onClick={() => {
              onNavigate?.("educationPage");
              setIsMobileMenuOpen(false);
            }}
            className="text-left text-lg font-bold flex items-center gap-3 py-2 text-white"
          >
            <i className="fa-solid fa-graduation-cap text-blue-400 w-6"></i>{" "}
            Education
          </button>
          <button
            onClick={() => {
              onNavigate?.("jobsPage");
              setIsMobileMenuOpen(false);
            }}
            className="text-left text-lg font-bold flex items-center gap-3 py-2"
          >
            <i className="fa-solid fa-briefcase text-blue-400 w-6"></i> Jobs
          </button>
          <button
            onClick={() => {
              onNavigate?.("scholarshipMain");
              setIsMobileMenuOpen(false);
            }}
            className="text-left text-lg font-bold flex items-center gap-3 py-2"
          >
            <i className="fa-solid fa-medal text-blue-400 w-6"></i> Scholarships
          </button>
          <button
            onClick={() => {
              onNavigate?.("about");
              setIsMobileMenuOpen(false);
            }}
            className="text-left text-lg font-bold flex items-center gap-3 py-2"
          >
            <i className="fa-solid fa-circle-info text-blue-400 w-6"></i> About
            Us
          </button>

          <hr className="border-white/10 my-2" />

          {user && (
            <>
              <button
                onClick={() => {
                  onLogout?.();
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-lg font-bold text-red-400 flex items-center gap-3 py-2"
              >
                <i className="fa-solid fa-arrow-right-from-bracket w-6"></i>{" "}
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[150] lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;

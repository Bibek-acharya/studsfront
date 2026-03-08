import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface EducationNavbarProps {
  onNavigate: (view: any, data?: any) => void;
  user?: {
    first_name: string;
    last_name: string;
    email: string;
    role: string;
  } | null;
  onLogout?: () => void;
}

const EducationNavbar: React.FC<EducationNavbarProps> = ({
  onNavigate,
  user,
  onLogout,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 16);

      if (currentScrollY > lastScrollY.current && currentScrollY > 110) {
        setIsVisible(false);
        setActiveMenu(null);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".menu-anchor")) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const initials = useMemo(() => {
    if (!user) return "SS";
    const first = user.first_name?.charAt(0) || "S";
    const last = user.last_name?.charAt(0) || "S";
    return `${first}${last}`.toUpperCase();
  }, [user]);

  const profileLabel = useMemo(() => {
    if (!user) return "Student";
    if (user.role === "admin") return "Admin";
    return "Student";
  }, [user]);

  return (
    <header
      className={`fixed left-0 top-0 z-[110] w-full bg-white shadow-sm transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full border-b border-gray-200 px-4 py-3">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4">
          <Link
            to="/"
            className="flex cursor-pointer items-center"
            onClick={() => setActiveMenu(null)}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path d="M16 2L29.8564 10V22L16 30L2.14359 22V10L16 2Z" fill="#E8F0FE" />
              <path d="M16 2L29.8564 10L16 18L2.14359 10L16 2Z" fill="#3B82F6" />
              <path d="M2.14359 10L16 18V30L2.14359 22V10Z" fill="#2563EB" />
              <path d="M29.8564 10L16 18V30L29.8564 22V10Z" fill="#1D4ED8" />
            </svg>
            <span className="text-[22px] font-bold tracking-tight text-[#1a1a1a]">
              Studsphere
            </span>
          </Link>

          <div className="mx-8 hidden max-w-[600px] flex-1 md:block">
            <div
              className={`relative flex h-11 items-center rounded-full border bg-white px-4 transition-all duration-200 ${
                isScrolled
                  ? "border-blue-200 shadow-sm"
                  : "border-gray-300 hover:border-blue-300"
              }`}
            >
              <i className="fa-solid fa-magnifying-glass min-w-[18px] text-gray-400"></i>
              <div className="relative mx-3 flex h-full flex-1 items-center overflow-hidden">
                {!searchQuery && (
                  <div className="pointer-events-none absolute left-0 top-0 z-0 flex h-full w-full items-center text-[15px] text-gray-400">
                    <span>Search&nbsp;</span>
                    <div className="relative inline-block h-[20px] overflow-hidden align-bottom">
                      <div className="sliding-text flex flex-col leading-[20px]">
                        <span className="h-[20px]">Community</span>
                        <span className="h-[20px]">Scholarships</span>
                        <span className="h-[20px]">Colleges</span>
                        <span className="h-[20px]">Courses</span>
                        <span className="h-[20px]">Community</span>
                      </div>
                    </div>
                  </div>
                )}
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="relative z-10 h-full w-full bg-transparent text-[15px] text-gray-700 outline-none"
                  placeholder=" "
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("writeReview")}
              className="hidden items-center gap-1.5 rounded-full bg-[#4264f5] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#3350c7] sm:flex"
            >
              <i className="fa-solid fa-plus text-sm"></i>
              Write a Review
            </button>

            <div className="relative menu-anchor">
              <button
                onClick={() =>
                  setActiveMenu((prev) =>
                    prev === "notification-menu" ? null : "notification-menu",
                  )
                }
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:bg-gray-50"
              >
                <i className="fa-regular fa-bell"></i>
                <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500"></span>
              </button>

              {activeMenu === "notification-menu" && (
                <div className="absolute right-0 z-50 mt-3 w-[340px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                  <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                    <span className="text-[15px] font-semibold text-gray-800">Notifications</span>
                    <span className="cursor-pointer text-xs font-medium text-[#4264f5] hover:underline">
                      Mark all as read
                    </span>
                  </div>
                  <div className="custom-scrollbar max-h-[360px] overflow-y-auto">
                    <NotificationItem
                      icon="fa-thumbs-up"
                      color="bg-blue-100 text-blue-600"
                      text="Your review for Harvard University was approved and is now live!"
                      time="2 mins ago"
                      unread
                    />
                    <NotificationItem
                      icon="fa-circle-check"
                      color="bg-green-100 text-green-600"
                      text="Successfully enrolled in Advanced Computer Science Masterclass."
                      time="1 hour ago"
                      unread
                    />
                    <NotificationItem
                      icon="fa-reply"
                      color="bg-purple-100 text-purple-600"
                      text="Sarah Jenkins replied to your comment in the Campus Feed."
                      time="4 hours ago"
                    />
                  </div>
                  <div className="border-t border-gray-100 pb-1 pt-2 text-center">
                    <button className="text-[13px] font-medium text-[#4264f5] hover:underline">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="ml-1 flex items-center gap-3 border-l border-gray-200 pl-4">
              {!user ? (
                <div className="hidden items-center gap-3 sm:flex">
                  <button
                    onClick={() => onNavigate("login")}
                    className="text-[15px] font-medium text-gray-700 transition-colors hover:text-[#4264f5]"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => onNavigate("signup")}
                    className="rounded-full bg-[#4264f5] px-5 py-2 text-[14px] font-medium text-white shadow-sm transition-colors hover:bg-[#3350c7]"
                  >
                    Register
                  </button>
                </div>
              ) : (
                <div className="relative menu-anchor">
                  <button
                    onClick={() =>
                      setActiveMenu((prev) =>
                        prev === "profile-menu" ? null : "profile-menu",
                      )
                    }
                    className="group flex items-center gap-2"
                  >
                    <div className="relative">
                      <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-[15px] font-bold text-white shadow-sm ring-2 ring-white ring-offset-1 transition-all duration-200 group-hover:ring-blue-100">
                        <span>{initials}</span>
                      </div>
                      <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500"></div>
                    </div>

                    <div className="mr-1 hidden text-left sm:flex sm:flex-col">
                      <span className="text-[13px] font-bold leading-tight text-gray-800">
                        {user.first_name} {user.last_name}
                      </span>
                      <span className="mt-0.5 text-[11px] font-medium leading-tight text-gray-500">
                        {profileLabel}
                      </span>
                    </div>

                    <i className="fa-solid fa-chevron-down text-xs text-gray-400 transition-transform duration-200 group-hover:text-[#4264f5]"></i>
                  </button>

                  {activeMenu === "profile-menu" && (
                    <div className="absolute right-0 z-50 mt-3 w-56 rounded-xl border border-gray-100 bg-white py-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]">
                      <div className="absolute -top-1.5 right-6 h-3 w-3 rotate-45 border-l border-t border-gray-100 bg-white"></div>
                      <div className="mb-1 border-b border-gray-100 px-4 py-3 sm:hidden">
                        <span className="block text-sm font-bold text-gray-800">
                          {user.first_name} {user.last_name}
                        </span>
                        <span className="mt-0.5 block text-xs text-gray-500">
                          {user.email}
                        </span>
                      </div>
                      <button className="menu-item">
                        <i className="fa-regular fa-user"></i>
                        My Profile
                      </button>
                      <button className="menu-item">
                        <i className="fa-regular fa-bookmark"></i>
                        Saved Colleges
                      </button>
                      <button
                        onClick={() => onNavigate("studentDashboard")}
                        className="menu-item"
                      >
                        <i className="fa-solid fa-chart-line"></i>
                        Dashboard
                      </button>
                      <button className="menu-item">
                        <i className="fa-solid fa-gear"></i>
                        Settings
                      </button>

                      <div className="mx-2 my-1 h-px bg-gray-100"></div>

                      <button
                        onClick={onLogout}
                        className="menu-item text-red-600 hover:bg-red-50"
                      >
                        <i className="fa-solid fa-arrow-right-from-bracket !bg-red-50 !text-red-500"></i>
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              className="flex h-10 w-10 items-center justify-center text-xl text-gray-600 md:hidden"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              <i className={`fa-solid ${isMobileOpen ? "fa-xmark" : "fa-bars"}`}></i>
            </button>
          </div>
        </div>
      </div>

      <div className="relative w-full border-b border-gray-200 bg-[#f9fafc] px-4">
        <div className="mx-auto flex h-[46px] w-full max-w-[1400px] items-center gap-4">
          <nav className="no-scrollbar flex h-full min-w-0 flex-1 items-center gap-x-5 overflow-x-auto whitespace-nowrap pr-2 text-[14px] font-medium text-[#212529] md:overflow-visible md:gap-x-7 lg:gap-x-8 lg:text-[15px]">
            <NavItem onClick={() => onNavigate("findCollege")}>Find College</NavItem>

            <DesktopDropdown label="Tools">
              <DropdownCard
                icon="fa-shuffle"
                color="text-blue-500"
                title="Compare College"
                desc="Compare multiple colleges side-by-side based on fees, ranking, and placement."
                onClick={() => onNavigate("compareColleges")}
              />
              <DropdownCard
                icon="fa-compass"
                color="text-green-500"
                title="Course Finder"
                desc="Discover the perfect academic course tailored to your skills and career goals."
                onClick={() => onNavigate("courseFinder")}
              />
              <DropdownCard
                icon="fa-headset"
                color="text-emerald-500"
                title="Get Counselling?"
                desc="Get expert counselling to choose your ideal college and course."
                onClick={() => onNavigate("bookCounselling")}
              />
              <DropdownCard
                icon="fa-award"
                color="text-yellow-500"
                title="Scholarship Finder"
                desc="Discover scholarships tailored to your academic profile and financial needs."
                onClick={() => onNavigate("scholarshipFinderTool")}
              />
              <DropdownCard
                icon="fa-wand-magic-sparkles"
                color="text-teal-500"
                title="College Recommender"
                desc="Get personalized college recommendations based on your preferences."
                onClick={() => onNavigate("collegeRecommenderTool")}
              />
            </DesktopDropdown>

            <DesktopDropdown label="Scholarships">
              <DropdownCard
                icon="fa-graduation-cap"
                color="text-yellow-500"
                title="Find Scholarship"
                desc="Browse available scholarships to fund your education."
                onClick={() => onNavigate("scholarshipFinder")}
              />
              <DropdownCard
                icon="fa-building-ngo"
                color="text-indigo-500"
                title="Scholarship Provider"
                desc="List and manage scholarship programs with us."
                onClick={() => onNavigate("scholarshipMain")}
              />
            </DesktopDropdown>

            <NavItem onClick={() => onNavigate("campusForum")}>Campus Feed</NavItem>

            <DesktopDropdown label="Admission">
              <DropdownCard
                icon="fa-school"
                color="text-blue-500"
                title="High School (+2)"
                desc="Explore top high schools for Science, Management, and Humanities."
                onClick={() => onNavigate("admissionsDiscovery")}
              />
              <DropdownCard
                icon="fa-user-graduate"
                color="text-purple-600"
                title="Bachelor Degrees"
                desc="Find undergraduate programs including B.Tech, B.Sc, BBA, and more."
                onClick={() => onNavigate("admissionsDiscovery")}
              />
              <DropdownCard
                icon="fa-book-open"
                color="text-pink-600"
                title="Master Degrees"
                desc="Advance your career with postgraduate degrees like MBA and M.Tech."
                onClick={() => onNavigate("admissionsDiscovery")}
              />
            </DesktopDropdown>

            <NavItem onClick={() => onNavigate("entranceDiscovery")}>Entrance</NavItem>
            <NavItem onClick={() => onNavigate("universitiesPage")}>Universities</NavItem>

            <NavItem onClick={() => onNavigate("rankingsPage")}>
              Rankings
              <div className="pointer-events-none relative ml-2 flex items-center">
                <span className="rounded bg-gradient-to-r from-[#e36a95] to-[#f4737a] px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white shadow-sm">
                  2082
                </span>
                <i className="fa-solid fa-sparkles sparkle absolute -right-1 -top-2 text-[10px] text-[#e36a95]"></i>
                <i className="fa-solid fa-sparkles sparkle absolute -right-3 -top-3 text-[8px] text-[#f4737a]" style={{ animationDelay: "0.5s" }}></i>
              </div>
            </NavItem>

            <DesktopDropdown label="More" alignRight>
              <DropdownCard
                icon="fa-newspaper"
                color="text-blue-500"
                title="News"
                desc="Stay updated with the latest educational news."
                onClick={() => onNavigate("newsPage")}
              />
              <DropdownCard
                icon="fa-pen"
                color="text-green-500"
                title="Blogs"
                desc="Read insights, study tips, and campus experiences."
                onClick={() => onNavigate("blogPage")}
              />
              <DropdownCard
                icon="fa-calendar-days"
                color="text-orange-500"
                title="Events"
                desc="Join upcoming webinars, fairs, and campus events."
                onClick={() => onNavigate("eventsPage")}
              />
              <DropdownCard
                icon="fa-envelope"
                color="text-purple-600"
                title="Contact Us"
                desc="Reach out to our support team for any assistance."
                onClick={() => onNavigate("educationPage")}
              />
            </DesktopDropdown>
          </nav>

          {!user && (
            <button
              onClick={() => onNavigate("institutionZone")}
              className="hidden h-full shrink-0 items-center gap-2 border-l border-gray-200 pl-6 text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a] transition-colors hover:text-blue-600 lg:flex"
            >
              Institution Zone
              <i className="fa-solid fa-chevron-right text-[10px]"></i>
            </button>
          )}
        </div>
      </div>

      <div
        className={`fixed inset-y-0 right-0 z-[200] flex w-[300px] transform flex-col border-l border-slate-50 bg-white shadow-[-10px_0_40px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-in-out md:hidden ${
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-50 p-6">
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <path d="M16 2L29.8564 10V22L16 30L2.14359 22V10L16 2Z" fill="#3B82F6" />
            </svg>
            <span className="font-black uppercase tracking-tighter text-gray-900">Studsphere</span>
          </div>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-gray-400"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="no-scrollbar flex-1 space-y-6 overflow-y-auto p-6">
          <MobileSection title="Quick Explore">
            <MobileItem label="Find College" onClick={() => routeAndClose(onNavigate, setIsMobileOpen, "findCollege")} icon="fa-building-columns" />
            <MobileItem label="Campus Feed" onClick={() => routeAndClose(onNavigate, setIsMobileOpen, "campusForum")} icon="fa-comments" />
            <MobileItem label="Scholarships" onClick={() => routeAndClose(onNavigate, setIsMobileOpen, "scholarshipMain")} icon="fa-hand-holding-dollar" />
            <MobileItem label="Write Review" onClick={() => routeAndClose(onNavigate, setIsMobileOpen, "writeReview")} icon="fa-pen-to-square" />
          </MobileSection>

          <MobileSection title="Tools">
            <MobileItem label="Compare College" onClick={() => routeAndClose(onNavigate, setIsMobileOpen, "compareColleges")} icon="fa-shuffle" />
            <MobileItem label="Course Finder" onClick={() => routeAndClose(onNavigate, setIsMobileOpen, "courseFinder")} icon="fa-compass" />
            <MobileItem label="Counselling" onClick={() => routeAndClose(onNavigate, setIsMobileOpen, "bookCounselling")} icon="fa-headset" />
            <MobileItem label="Scholarship Finder" onClick={() => routeAndClose(onNavigate, setIsMobileOpen, "scholarshipFinderTool")} icon="fa-award" />
            <MobileItem label="College Recommender" onClick={() => routeAndClose(onNavigate, setIsMobileOpen, "collegeRecommenderTool")} icon="fa-wand-magic-sparkles" />
            <MobileItem label="Resources" onClick={() => routeAndClose(onNavigate, setIsMobileOpen, "studyResources")} icon="fa-book" />
          </MobileSection>

          {!user && (
            <div className="border-t border-gray-50 pt-6">
              <button
                onClick={() => routeAndClose(onNavigate, setIsMobileOpen, "institutionZone")}
                className="w-full rounded-2xl bg-slate-900 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-xl"
              >
                Institutions Zone ›
              </button>
            </div>
          )}
        </div>
      </div>

      {isMobileOpen && (
        <div
          className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </header>
  );
};

const routeAndClose = (
  onNavigate: (view: any, data?: any) => void,
  setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>,
  route: string,
) => {
  onNavigate(route);
  setIsMobileOpen(false);
};

const NavItem: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({
  children,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="flex h-full shrink-0 items-center transition-colors hover:text-[#4264f5]"
  >
    {children}
  </button>
);

const DesktopDropdown: React.FC<{
  label: string;
  children: React.ReactNode;
  alignRight?: boolean;
}> = ({ label, children, alignRight = false }) => (
  <div className="group relative h-full shrink-0">
    <div className="flex h-full cursor-pointer items-center transition-colors hover:text-[#4264f5]">
      <span>{label}</span>
      <i className="fa-solid fa-chevron-down ml-1 text-[12px] opacity-70 transition-transform duration-200 group-hover:-rotate-180 group-hover:opacity-100"></i>
    </div>
    <div
      className={`invisible absolute top-[46px] z-50 mt-1 translate-y-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${
        alignRight ? "right-0" : "left-0"
      }`}
    >
      <div className="relative w-[400px] whitespace-normal rounded-xl border border-gray-100 bg-white p-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]">
        <div
          className={`absolute -top-1.5 h-3 w-3 rotate-45 border-l border-t border-gray-100 bg-white ${
            alignRight ? "right-6" : "left-6"
          }`}
        ></div>
        <div className="relative z-10 flex flex-col gap-1 whitespace-normal">{children}</div>
      </div>
    </div>
  </div>
);

const DropdownCard: React.FC<{
  icon: string;
  color: string;
  title: string;
  desc: string;
  onClick?: () => void;
}> = ({ icon, color, title, desc, onClick }) => (
  <button
    onClick={onClick}
      className="group/card flex w-full min-w-0 items-start rounded-xl border border-transparent p-3 text-left whitespace-normal transition-colors hover:border-blue-100 hover:bg-blue-50/50"
  >
    <div
      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 transition-colors group-hover/card:bg-white ${color}`}
    >
      <i className={`fa-solid ${icon} text-lg`}></i>
    </div>
    <div className="ml-4 min-w-0 flex-1">
      <h4 className="break-words text-[15px] font-bold leading-tight text-gray-900">{title}</h4>
      <p className="mt-1 break-words text-[13px] leading-relaxed text-gray-500">{desc}</p>
    </div>
  </button>
);

const NotificationItem: React.FC<{
  icon: string;
  color: string;
  text: string;
  time: string;
  unread?: boolean;
}> = ({ icon, color, text, time, unread }) => (
  <button
    className={`flex w-full items-start gap-3 border-b border-gray-50 px-4 py-3 text-left transition-colors hover:bg-gray-50 ${
      unread ? "bg-blue-50/30" : ""
    }`}
  >
    <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${color}`}>
      <i className={`fa-solid ${icon} text-sm`}></i>
    </div>
    <div className="flex-1">
      <p className="text-[13px] leading-snug text-gray-800">{text}</p>
      <span className="mt-1 block text-[11px] text-gray-500">{time}</span>
    </div>
    {unread && <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#4264f5]"></div>}
  </button>
);

const MobileSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="space-y-4">
    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
      {title}
    </p>
    <div className="space-y-2">{children}</div>
  </div>
);

const MobileItem: React.FC<{ label: string; onClick: () => void; icon: string }> = ({
  label,
  onClick,
  icon,
}) => (
  <button
    onClick={onClick}
    className="group flex w-full items-center gap-4 rounded-2xl bg-slate-50 p-4 transition-colors hover:bg-slate-100"
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-100 bg-white text-blue-500 shadow-sm transition-transform group-hover:scale-110">
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <span className="text-xs font-bold uppercase tracking-widest text-gray-700">
      {label}
    </span>
  </button>
);

export default EducationNavbar;

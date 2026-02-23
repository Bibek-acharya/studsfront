import React, { useState, useEffect } from "react";

interface JobNavbarProps {
  onNavigate: (view: any) => void;
  user?: { name: string; email: string; role: string } | null;
}

const JobNavbar: React.FC<JobNavbarProps> = ({ onNavigate, user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-[110] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Section */}
          <div
            onClick={() => onNavigate("home")}
            className="flex-shrink-0 flex items-center gap-3 cursor-pointer group"
          >
            <img
              src="/logo-blue.png"
              alt="StudSphere"
              className="h-10 w-auto group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col border-l border-slate-200 pl-3">
              <span className="text-[10px] font-black text-primary-600 uppercase tracking-[0.2em] leading-none">
                Jobs
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center h-full">
            {/* Job Feed */}
            <button
              onClick={() => onNavigate("jobFeed")}
              className="relative flex items-center h-full text-gray-600 hover:text-primary-600 font-bold text-sm transition duration-150 border-b-2 border-transparent hover:border-primary-600"
            >
              Job Feed
              <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-black rounded-full">
                Live
              </span>
            </button>

            {/* Jobs Dropdown */}
            <div className="relative group h-full flex items-center">
              <button
                onClick={() => onNavigate("jobsPage")}
                className="text-gray-600 group-hover:text-primary-600 font-bold text-sm transition duration-150 flex items-center gap-1 focus:outline-none h-full border-b-2 border-transparent group-hover:border-primary-600"
              >
                Jobs
                <i className="fa-solid fa-chevron-down text-[10px] ml-1 transition-transform duration-200 group-hover:rotate-180"></i>
              </button>
              <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 p-2 cursor-default">
                <div className="flex flex-col gap-1">
                  <DropdownLink
                    onClick={() => onNavigate("jobRecommendations")}
                    label="Recommended Jobs"
                    badge="1 New"
                  />
                  <DropdownLink
                    onClick={() => onNavigate("sphereInvites")}
                    label="Sphere Invites"
                    badge="1 New"
                  />
                  <DropdownLink
                    onClick={() => onNavigate("applicationTracker")}
                    label="Application Tracker"
                  />
                  <DropdownLink
                    onClick={() => onNavigate("jobAlerts")}
                    label="Job Alert"
                    badge="10 New"
                  />
                </div>
              </div>
            </div>

            {/* Companies Mega Menu */}
            <div className="relative group h-full flex items-center">
              <button
                onClick={() => onNavigate("companiesPage")}
                className="text-gray-600 group-hover:text-primary-600 font-bold text-sm transition duration-150 flex items-center gap-1 focus:outline-none h-full border-b-2 border-transparent group-hover:border-primary-600"
              >
                Companies
                <i className="fa-solid fa-chevron-down text-[10px] ml-1 transition-transform duration-200 group-hover:rotate-180"></i>
              </button>
              <div className="absolute top-full left-[-50px] w-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 p-8 cursor-default">
                <div className="grid grid-cols-2 gap-8 relative">
                  <div className="space-y-4">
                    <h3 className="text-gray-900 font-black text-xs uppercase tracking-widest border-b border-gray-100 pb-2">
                      Explore Categories
                    </h3>
                    <ul className="space-y-2">
                      <MegaLink
                        onClick={() => onNavigate("companiesPage")}
                        label="Unicorn"
                      />
                      <MegaLink
                        onClick={() => onNavigate("companiesPage")}
                        label="MNC"
                      />
                      <MegaLink
                        onClick={() => onNavigate("companiesPage")}
                        label="Startup"
                      />
                      <MegaLink
                        onClick={() => onNavigate("companiesPage")}
                        label="Internet"
                      />
                      <MegaLink
                        onClick={() => onNavigate("companiesPage")}
                        label="Product Based"
                      />
                    </ul>
                  </div>
                  <div className="absolute left-1/2 top-4 bottom-4 w-px bg-gray-100"></div>
                  <div className="space-y-4 pl-4">
                    <h3 className="text-gray-900 font-black text-xs uppercase tracking-widest border-b border-gray-100 pb-2">
                      Explore Collection
                    </h3>
                    <ul className="space-y-2">
                      <MegaLink
                        onClick={() => onNavigate("companiesPage")}
                        label="Top Companies"
                      />
                      <MegaLink
                        onClick={() => onNavigate("companiesPage")}
                        label="IT Companies"
                      />
                      <MegaLink
                        onClick={() => onNavigate("companiesPage")}
                        label="Fintech Companies"
                      />
                      <MegaLink
                        onClick={() => onNavigate("companiesPage")}
                        label="Sponsored Companies"
                      />
                      <MegaLink
                        onClick={() => onNavigate("companiesPage")}
                        label="Featured Companies"
                      />
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Resume Tools Mega Menu */}
            <div className="relative group h-full flex items-center">
              <button className="text-gray-600 group-hover:text-primary-600 font-bold text-sm transition duration-150 flex items-center gap-1 focus:outline-none h-full border-b-2 border-transparent group-hover:border-primary-600">
                Resume Tools
                <i className="fa-solid fa-chevron-down text-[10px] ml-1 transition-transform duration-200 group-hover:rotate-180"></i>
              </button>
              <div className="absolute top-full right-[-100px] w-[750px] bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 z-50 p-8 grid grid-cols-12 gap-8 cursor-default">
                <div className="col-span-7 flex flex-col gap-3">
                  <ToolLink
                    onClick={() => onNavigate("resumeBuilder")}
                    icon="fa-file-pen"
                    color="blue"
                    title="AI Resume Builder"
                    desc="Create your best resume using AI algorithms"
                  />
                  <ToolLink
                    onClick={() => onNavigate("resumeChecker")}
                    icon="fa-check-double"
                    color="green"
                    title="AI Resume Checker"
                    desc="Get instant resume feedback & score"
                  />
                  <ToolLink
                    onClick={() => onNavigate("coverLetterBuilder")}
                    icon="fa-wand-magic-sparkles"
                    color="purple"
                    title="AI Cover Letter Gen"
                    desc="Stand out and get hired faster"
                  />
                  <ToolLink
                    onClick={() => onNavigate("careerBlogs")}
                    icon="fa-book-open"
                    color="orange"
                    title="Career Blogs"
                    desc="Guidance for securing your dream job"
                  />
                </div>
                <div className="col-span-5 bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden group/media relative h-full min-h-[250px]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover/media:scale-105"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=400')",
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 group-hover/media:bg-primary-600 group-hover/media:scale-110 transition-all duration-300">
                      <i className="fa-solid fa-play text-white text-xs"></i>
                    </div>
                    <h4 className="font-bold text-lg mb-1 leading-tight">
                      How to score 90+ on your resume?
                    </h4>
                    <p className="text-xs text-gray-300 mb-4 opacity-90">
                      Expert tips for 2025 hiring trends
                    </p>
                    <button className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm transition-all border border-white/10">
                      Watch Video{" "}
                      <i className="fa-solid fa-arrow-right ml-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Notification */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2.5 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-all duration-200 focus:outline-none"
              >
                <i className="fa-regular fa-bell text-xl"></i>
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 h-4 w-4 bg-red-500 text-[10px] font-black text-white flex items-center justify-center rounded-full border-2 border-white animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotifOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsNotifOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform origin-top-right transition-all duration-200 z-50 animate-fadeInUp">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                      <h3 className="text-sm font-black uppercase tracking-widest text-gray-800">
                        Notifications
                      </h3>
                      <button
                        onClick={() => setUnreadCount(0)}
                        className="text-[10px] font-black uppercase tracking-widest text-primary-600 hover:text-primary-800 transition-colors"
                      >
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-[24rem] overflow-y-auto no-scrollbar">
                      <NotifItem
                        icon="fa-comment-alt"
                        color="blue"
                        title="New Message"
                        desc="Sarah sent you a message regarding the project timeline."
                        time="2 min ago"
                        unread
                      />
                      <NotifItem
                        icon="fa-check-circle"
                        color="green"
                        title="System Update"
                        desc="Your profile has been verified successfully."
                        time="1 hour ago"
                        unread
                      />
                      <NotifItem
                        icon="fa-exclamation-triangle"
                        color="yellow"
                        title="Deadline Reminder"
                        desc="Complete your application for Google before 6 PM."
                        time="Yesterday"
                      />
                    </div>
                    <div className="bg-gray-50 p-2 text-center border-t border-gray-100">
                      <button className="text-[10px] font-black uppercase tracking-widest text-primary-600 hover:text-primary-800 transition-colors py-2 block w-full rounded hover:bg-primary-50">
                        View all notifications
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => onNavigate("login")}
                className="text-gray-600 hover:text-primary-600 font-bold text-sm transition"
              >
                Login
              </button>
              <button
                onClick={() => onNavigate("signup")}
                className="px-6 py-2.5 rounded-full bg-primary-600 text-white font-bold text-sm shadow-lg shadow-primary-500/20 hover:bg-primary-700 hover:shadow-xl transition duration-200"
              >
                Register
              </button>
              <span className="h-6 w-px bg-gray-200"></span>
              <button
                onClick={() => onNavigate("employerZone")}
                className="text-gray-500 hover:text-gray-800 font-bold text-[10px] uppercase tracking-widest"
              >
                Employer Zone
              </button>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none p-2"
            >
              <i
                className={`fa-solid ${isMobileMenuOpen ? "fa-xmark" : "fa-bars"} text-2xl`}
              ></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-[280px] bg-white z-[200] p-6 flex flex-col gap-4 transform transition-transform duration-300 ease-in-out md:hidden border-l border-gray-100 shadow-2xl ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-6">
          <img src="/logo-blue.png" alt="StudSphere" className="h-8 w-auto" />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-500 hover:text-primary-600 p-2"
          >
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
        </div>

        <div className="flex flex-col gap-1 overflow-y-auto pb-10">
          <button
            onClick={() => {
              onNavigate("jobFeed");
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-3 rounded-xl hover:bg-primary-50 font-bold text-gray-700 transition-colors"
          >
            Job Feed
          </button>
          <button
            onClick={() => {
              onNavigate("jobsPage");
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-3 rounded-xl hover:bg-primary-50 font-bold text-gray-700 transition-colors"
          >
            Jobs
          </button>
          <button
            onClick={() => {
              onNavigate("companiesPage");
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-3 rounded-xl hover:bg-primary-50 font-bold text-gray-700 transition-colors"
          >
            Companies
          </button>
          <button className="block w-full text-left px-4 py-3 rounded-xl hover:bg-primary-50 font-bold text-gray-700 transition-colors">
            Resume Tools
          </button>

          <hr className="border-gray-100 my-2" />

          {!user ? (
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => {
                  onNavigate("login");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-50 border border-gray-100 transition-all"
              >
                Login
              </button>
              <button
                onClick={() => {
                  onNavigate("signup");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl font-bold bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/20 transition-all"
              >
                Register
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                {user.name[0]}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          )}

          <button
            onClick={() => {
              onNavigate("employerZone");
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-center py-4 mt-4 text-[10px] font-black uppercase tracking-[0.2em] bg-slate-900 text-white rounded-xl shadow-lg hover:bg-black transition-all"
          >
            Employer Zone
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[150] md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
};

const DropdownLink: React.FC<{
  label: string;
  badge?: string;
  active?: boolean;
  onClick?: () => void;
}> = ({ label, badge, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors w-full text-left ${active ? "bg-primary-50 text-primary-600" : "hover:bg-gray-50 text-gray-700 hover:text-primary-600"}`}
  >
    <span className="font-bold text-sm">{label}</span>
    {badge && (
      <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-black rounded-full">
        {badge}
      </span>
    )}
  </button>
);

const MegaLink: React.FC<{ label: string; onClick?: () => void }> = ({
  label,
  onClick,
}) => (
  <li>
    <button
      onClick={onClick}
      className="text-gray-500 hover:text-primary-600 text-sm font-bold transition-colors block py-1 w-full text-left"
    >
      {label}
    </button>
  </li>
);

const ToolLink: React.FC<{
  icon: string;
  color: string;
  title: string;
  desc: string;
  onClick?: () => void;
}> = ({ icon, color, title, desc, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all group/item text-left w-full"
  >
    <div
      className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-xl transition-all shadow-sm ${
        color === "blue"
          ? "bg-blue-50 text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white"
          : color === "green"
            ? "bg-green-50 text-green-600 group-hover/item:bg-green-600 group-hover/item:text-white"
            : color === "purple"
              ? "bg-purple-50 text-purple-600 group-hover/item:bg-purple-600 group-hover/item:text-white"
              : "bg-orange-50 text-orange-600 group-hover/item:bg-orange-600 group-hover/item:text-white"
      }`}
    >
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div>
      <h4 className="font-black text-gray-900 text-sm transition-colors">
        {title}
      </h4>
      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</p>
    </div>
  </button>
);

const NotifItem: React.FC<{
  icon: string;
  color: string;
  title: string;
  desc: string;
  time: string;
  unread?: boolean;
}> = ({ icon, color, title, desc, time, unread }) => (
  <div
    className={`relative group border-b border-gray-50 hover:bg-gray-50 transition-colors duration-150 cursor-pointer p-5 ${unread ? "bg-primary-50/30" : "bg-white opacity-80"}`}
  >
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            color === "blue"
              ? "bg-blue-100 text-blue-600"
              : color === "green"
                ? "bg-green-100 text-green-600"
                : "bg-yellow-100 text-yellow-600"
          }`}
        >
          <i className={`fas ${icon}`}></i>
        </div>
      </div>
      <div className="flex-1">
        <p className="text-sm font-black text-gray-900 leading-none mb-1">
          {title}
        </p>
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
          {desc}
        </p>
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2">
          {time}
        </p>
      </div>
      {unread && (
        <span className="w-2 h-2 bg-blue-600 rounded-full self-center"></span>
      )}
    </div>
  </div>
);

export default JobNavbar;

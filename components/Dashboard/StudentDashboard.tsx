import React, { useState, useEffect, useMemo } from "react";

// --- Configuration & Data for Calendar ---
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const EVENT_TYPES = {
  exam: {
    label: "Exams",
    color: "#fca5a5",
    bg: "bg-red-100",
    text: "text-red-700",
  },
  deadline: {
    label: "Deadlines",
    color: "#fdba74",
    bg: "bg-orange-100",
    text: "text-orange-700",
  },
  assignment: {
    label: "Assignments",
    color: "#86efac",
    bg: "bg-green-100",
    text: "text-green-700",
  },
  interview: {
    label: "Interviews",
    color: "#d8b4fe",
    bg: "bg-purple-100",
    text: "text-purple-700",
  },
  fee: {
    label: "Fees",
    color: "#fde047",
    bg: "bg-yellow-100",
    text: "text-yellow-700",
  },
};

const INITIAL_EVENTS = [
  {
    id: 1,
    title: "TU Entrance",
    date: new Date(new Date().setDate(new Date().getDate() + 2))
      .toISOString()
      .split("T")[0],
    type: "exam" as keyof typeof EVENT_TYPES,
    time: "10:00 - 12:00",
  },
  {
    id: 2,
    title: "Scholarship Form",
    date: new Date(new Date().setDate(new Date().getDate() + 5))
      .toISOString()
      .split("T")[0],
    type: "deadline" as keyof typeof EVENT_TYPES,
    time: "All Day",
  },
  {
    id: 3,
    title: "Physics Report",
    date: new Date(new Date().setDate(new Date().getDate() + 8))
      .toISOString()
      .split("T")[0],
    type: "assignment" as keyof typeof EVENT_TYPES,
    time: "14:00",
  },
  {
    id: 4,
    title: "Semester Fee",
    date: new Date(new Date().setDate(new Date().getDate() + 12))
      .toISOString()
      .split("T")[0],
    type: "fee" as keyof typeof EVENT_TYPES,
    time: "Before 5PM",
  },
  {
    id: 5,
    title: "College Interview",
    date: new Date(new Date().setDate(new Date().getDate() + 15))
      .toISOString()
      .split("T")[0],
    type: "interview" as keyof typeof EVENT_TYPES,
    time: "09:30",
  },
];

const INITIAL_CHECKLIST = [
  { id: 1, text: "Citizenship Copy", checked: true },
  { id: 2, text: "SEE Marksheet", checked: true },
  { id: 3, text: "+2 Transcript", checked: false },
  { id: 4, text: "Photos (PP Size)", checked: false },
];

interface StudentDashboardProps {
  onLogout?: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isNewAppModalOpen, setIsNewAppModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isBookSessionModalOpen, setIsBookSessionModalOpen] = useState(false);
  const [isCounselorProfileModalOpen, setIsCounselorProfileModalOpen] =
    useState(false);
  const [isUploadNotesModalOpen, setIsUploadNotesModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  // Modal data states
  const [replyData, setReplyData] = useState({
    college: "",
    message: "",
    date: "",
  });
  const [statusData, setStatusData] = useState({ college: "" });
  const [detailsData, setDetailsData] = useState({
    title: "",
    colleges: "",
    status: "",
    date: "",
    message: "",
  });
  const [toast, setToast] = useState<{
    title: string;
    msg: string;
    show: boolean;
  }>({ title: "", msg: "", show: false });

  // Calendar & Profile States
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("studSphereEvents");
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });
  const [checklist, setChecklist] = useState(() => {
    const saved = localStorage.getItem("studSphereChecklist");
    return saved ? JSON.parse(saved) : INITIAL_CHECKLIST;
  });
  const [activeFilters, setActiveFilters] = useState(Object.keys(EVENT_TYPES));
  const [calendarView, setCalendarView] = useState<"month" | "week" | "day">(
    "month",
  );
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "exam" as keyof typeof EVENT_TYPES,
    date: "",
    time: "",
  });

  const [profileTab, setProfileTab] = useState("personal");
  const [settingsTab, setSettingsTab] = useState("password");
  const [counsellingTab, setCounsellingTab] = useState("upcoming");
  const [bookmarkFilter, setBookmarkFilter] = useState("all");

  // Notifications state
  useEffect(() => {
    localStorage.setItem("studSphereEvents", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem("studSphereChecklist", JSON.stringify(checklist));
  }, [checklist]);

  const showToast = (title: string, msg: string) => {
    setToast({ title, msg, show: true });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
  };

  const filteredEvents = useMemo(() => {
    return events.filter((e: any) => activeFilters.includes(e.type));
  }, [events, activeFilters]);

  const upcomingEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    return events
      .filter((e: any) => {
        const eDate = new Date(e.date);
        return eDate >= today && eDate <= nextWeek;
      })
      .sort(
        (a: any, b: any) =>
          new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
  }, [events]);

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (calendarView === "month") newDate.setMonth(newDate.getMonth() - 1);
    if (calendarView === "week") newDate.setDate(newDate.getDate() - 7);
    if (calendarView === "day") newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (calendarView === "month") newDate.setMonth(newDate.getMonth() + 1);
    if (calendarView === "week") newDate.setDate(newDate.getDate() + 7);
    if (calendarView === "day") newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const toggleFilter = (type: string) => {
    setActiveFilters((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const toggleChecklist = (id: number) => {
    setChecklist(
      checklist.map((i: any) =>
        i.id === id ? { ...i, checked: !i.checked } : i,
      ),
    );
  };

  const handleDateClick = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setNewEvent({ title: "", type: "exam", date: dateStr, time: "09:00" });
    setIsEventModalOpen(true);
  };

  const addEvent = () => {
    if (!newEvent.title) return;
    setEvents([...events, { ...newEvent, id: Date.now() }]);
    setIsEventModalOpen(false);
  };

  // SphereInvites data
  const [invites, setInvites] = useState([
    {
      id: 1,
      college: "Tribhuvan University",
      logo: "TU",
      type: "scholarship",
      title: "Merit Based Scholarship 2026",
      description:
        "Full tuition waiver for top 5% scorers in entrance examination. Apply early to secure your spot.",
      amount: "100% Waiver",
      deadline: "2026-03-15",
      location: "Kirtipur, Kathmandu",
      tags: ["High Priority", "Merit"],
      priority: true,
      status: "sent",
    },
    {
      id: 2,
      college: "Kathmandu University",
      logo: "KU",
      type: "admission",
      title: "B.Sc. Computer Science Admission",
      description:
        "Admissions open for the upcoming intake. Based on your profile, you are eligible for direct interview.",
      amount: null,
      deadline: "2026-04-01",
      location: "Dhulikhel",
      tags: ["Direct Interview"],
      priority: false,
      status: "saved",
    },
    {
      id: 3,
      college: "Islington College",
      logo: "IC",
      type: "event",
      title: "AI & Future Tech Webinar",
      description:
        "Join industry experts from UK to discuss the future of AI in Nepal. Free participation certification.",
      amount: "Free Entry",
      deadline: "2026-02-28",
      location: "Online (Zoom)",
      tags: ["Webinar", "Certificate"],
      priority: false,
      status: "sent",
    },
    {
      id: 4,
      college: "British College",
      logo: "BC",
      type: "scholarship",
      title: "Women in Tech Grant",
      description:
        "Exclusive grant for female students pursuing IT degrees. Covers 50% of tuition fees for 4 years.",
      amount: "50% Grant",
      deadline: "2026-03-10",
      location: "Thapathali, Kathmandu",
      tags: ["Diversity", "IT"],
      priority: false,
      status: "sent",
    },
  ]);
  const [inviteFilter, setInviteFilter] = useState("all");

  const handleInviteAction = (id: number, action: string) => {
    setInvites((prev) =>
      prev.map((inv) => {
        if (inv.id === id) {
          if (action === "accept") {
            showToast("Invitation Accepted!", "College has been notified.");
            return { ...inv, status: "accepted" };
          }
          if (action === "decline") {
            showToast("Invitation Declined", "Removed from your list.");
            return { ...inv, status: "rejected" };
          }
          if (action === "save") {
            const newStatus = inv.status === "saved" ? "sent" : "saved";
            showToast(
              newStatus === "saved" ? "Saved for Later" : "Removed from Saved",
              "",
            );
            return { ...inv, status: newStatus };
          }
        }
        return inv;
      }),
    );
  };

  const filteredInvites = invites.filter((inv) => {
    if (inv.status === "rejected") return false;
    if (inviteFilter === "all") return true;
    return inv.type === inviteFilter;
  });

  const inviteStats = {
    total: invites.filter((i) => i.status !== "rejected").length,
    accepted: invites.filter((i) => i.status === "accepted").length,
    saved: invites.filter((i) => i.status === "saved").length,
  };

  return (
    <div className="bg-slate-50 text-slate-800 antialiased font-sans h-screen flex overflow-hidden w-full fixed inset-0 z-[200]">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white z-[60] shadow-sm h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="font-bold text-lg text-slate-800">StudSphere</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-slate-600 hover:text-blue-600 focus:outline-none"
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-[70] md:hidden backdrop-blur-sm transition-opacity"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-[80] w-64 bg-white border-r border-slate-200 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 flex flex-col h-full shadow-xl md:shadow-none`}
      >
        <div className="h-20 flex items-center px-8 border-b border-slate-100 hidden md:flex">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold mr-3 shadow-lg shadow-blue-500/30">
              S
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">
              StudSphere
            </span>
          </a>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 mt-16 md:mt-0 flex flex-col">
          {[
            { id: "dashboard", icon: "fas fa-th-large", label: "Dashboard" },
            { id: "chat", icon: "fas fa-comment-dots", label: "Messages" },
            {
              id: "calendar",
              icon: "fas fa-calendar-alt",
              label: "My Calendar",
            },
            {
              id: "sphereinvites",
              icon: "fas fa-envelope-open-text",
              label: "SphereInvites",
            },
            { id: "counselling", icon: "fas fa-user-md", label: "Counselling" },
            { id: "profile", icon: "fas fa-user-circle", label: "My Profile" },
            { id: "bookmarks", icon: "fas fa-bookmark", label: "Bookmarks" },
            {
              id: "notifications",
              icon: "fas fa-bell",
              label: "Notifications",
              badge: true,
            },
            // {
            //   id: "resources",
            //   icon: "fas fa-book-open",
            //   label: "Study Resources",
            // },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors w-full text-left ${activeTab === item.id ? "bg-blue-200 text-blue-600 " : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"}`}
            >
              <div className="relative">
                <i className={`${item.icon} w-6`}></i>
                {item.badge && (
                  <span className="absolute -top-1 left-3 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                )}
              </div>
              {item.label}
            </button>
          ))}

          <div className="mt-auto"></div>

          {/* <div className="px-2 py-4 mb-2">
            <div className="bg-gradient-to-br from-indigo-600 to-blue-500 rounded-xl p-4 text-white text-center shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <i className="fas fa-briefcase text-4xl transform rotate-12"></i>
              </div>
              <h4 className="font-bold text-sm mb-1 relative z-10">
                Need a Job?
              </h4>
              <p className="text-[10px] text-blue-100 mb-3 relative z-10">
                Find internships & freelance gigs matched to your skills.
              </p>
              <button className="bg-white text-indigo-600 text-xs font-bold px-4 py-2 rounded-lg w-full hover:bg-blue-50 transition-colors shadow-sm relative z-10">
                Search Now
              </button>
            </div>
          </div> */}

          <div className="pt-2 border-t border-slate-100 ">
            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-4">
              Settings
            </p>
            <button
              onClick={() => {
                setActiveTab("settings");
                setIsSidebarOpen(false);
              }}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors w-full text-left ${activeTab === "settings" ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600" : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"}`}
            >
              <i className="fas fa-cog w-6"></i>
              Settings & Privacy
            </button>
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg text-red-500 hover:bg-red-50 transition-colors text-left"
            >
              <i className="fas fa-sign-out-alt w-6"></i>
              Logout
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
              alt="User"
              className="w-10 h-10 rounded-full bg-white shadow-sm"
            />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-slate-700 truncate">
                Alex Student
              </p>
              <p className="text-xs text-slate-500 truncate">
                alex@university.edu
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto h-full pt-16 md:pt-0 bg-slate-50/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full flex flex-col">
          {/* SECTION: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                    Welcome back, Alex! 👋
                  </h1>
                  <p className="text-slate-500 mt-1">
                    Here's what's happening with your applications today.
                  </p>
                </div>
                <div className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm border border-slate-100 min-w-[200px]">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="currentColor"
                        stroke-width="4"
                        fill="transparent"
                        className="text-slate-100"
                      />
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="currentColor"
                        stroke-width="4"
                        fill="transparent"
                        strokeDasharray="125.6"
                        strokeDashoffset="2.51"
                        className="text-emerald-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-800">
                      98%
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Alex Student
                    </p>
                    <p className="text-xs text-slate-500">
                      alex@university.edu
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-4 mb-8 text-white shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
                    <i className="fas fa-video"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">
                      Upcoming Session: Dr. Emily Smith
                    </h4>
                    <p className="text-xs text-blue-100">
                      Starts in 15 minutes • Career Guidance
                    </p>
                  </div>
                </div>
                <button className="bg-white text-blue-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors">
                  Join Now
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all"
                  onClick={() => setIsFeedbackModalOpen(true)}
                >
                  <div className="absolute -right-6 -bottom-6 text-white opacity-10 text-9xl transform rotate-12 group-hover:scale-110 transition-transform">
                    <i className="fas fa-university"></i>
                  </div>
                  <h3 className="text-xl font-bold relative z-10">
                    Review Your Colleges
                  </h3>
                  <p className="text-purple-100 text-sm mt-2 relative z-10 max-w-[80%]">
                    Share your campus experience and help juniors make better
                    decisions.
                  </p>
                  <button className="mt-4 bg-white text-purple-600 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-purple-50 transition-colors relative z-10">
                    Write a Review
                  </button>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white shadow-lg relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
                  <div className="absolute -right-6 -bottom-6 text-white opacity-10 text-9xl transform rotate-12 group-hover:scale-110 transition-transform">
                    <i className="fas fa-question-circle"></i>
                  </div>
                  <h3 className="text-xl font-bold relative z-10">
                    Ask Your Doubts
                  </h3>
                  <p className="text-orange-100 text-sm mt-2 relative z-10 max-w-[80%]">
                    Stuck on a problem? Connect with experts and get answers
                    instantly.
                  </p>
                  <button className="mt-4 bg-white text-orange-600 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-orange-50 transition-colors relative z-10">
                    Ask Now
                  </button>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8 flex items-start gap-3">
                <i className="fas fa-exclamation-triangle text-yellow-500 mt-1"></i>
                <div>
                  <h4 className="text-sm font-bold text-yellow-800">
                    Complete your documents
                  </h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Your application for{" "}
                    <span className="font-semibold">MIT Computer Science</span>{" "}
                    is missing a recommendation letter. Upload it before Friday.
                  </p>
                </div>
                <button className="ml-auto text-sm text-yellow-800 font-semibold hover:underline">
                  View
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    label: "Active Applications",
                    val: "4",
                    icon: "fas fa-paper-plane",
                    color: "blue",
                    trend: "+ 1",
                    trendMsg: "updated this week",
                  },
                  {
                    label: "Upcoming Deadlines",
                    val: "2",
                    icon: "fas fa-clock",
                    color: "orange",
                    trend: "Urgent:",
                    trendMsg: "Physics Scholarship (2 days)",
                  },
                  {
                    label: "Saved Colleges",
                    val: "12",
                    icon: "fas fa-heart",
                    color: "purple",
                    trend: "New:",
                    trendMsg: "Stanford opened admissions",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-500">
                          {stat.label}
                        </p>
                        <h3 className="text-3xl font-bold text-slate-800 mt-2">
                          {stat.val}
                        </h3>
                      </div>
                      <div
                        className={`w-10 h-10 rounded-lg bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-500`}
                      >
                        <i className={stat.icon}></i>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs text-slate-400">
                      <span
                        className={`text-${stat.color}-500 font-medium mr-1`}
                      >
                        {stat.trend}
                      </span>
                      <span>{stat.trendMsg}</span>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  {
                    icon: "fas fa-balance-scale",
                    label: "Compare Colleges",
                    color: "indigo",
                  },
                  {
                    icon: "fas fa-search-location",
                    label: "Course Finder",
                    color: "green",
                  },
                  {
                    icon: "fas fa-award",
                    label: "Scholarships",
                    color: "yellow",
                  },
                  {
                    icon: "fas fa-crystal-ball",
                    label: "College Predictor",
                    color: "pink",
                  },
                ].map((act, i) => (
                  <button
                    key={i}
                    className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:border-blue-500 hover:shadow-md transition-all group"
                  >
                    <div
                      className={`w-10 h-10 bg-${act.color}-50 text-${act.color}-600 rounded-full flex items-center justify-center mb-2 mx-auto group-hover:bg-${act.color}-600 group-hover:text-white transition-colors`}
                    >
                      <i className={act.icon}></i>
                    </div>
                    <p className="text-sm font-semibold text-slate-700">
                      {act.label}
                    </p>
                  </button>
                ))}
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-4">
                Recommended For You
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    name: "Harvard University",
                    loc: "Cambridge, MA",
                    match: "95%",
                    img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                  },
                  {
                    name: "Stanford University",
                    loc: "Stanford, CA",
                    match: "92%",
                    img: "https://images.unsplash.com/photo-1621640786029-22ad59695d7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                  },
                  {
                    name: "Yale University",
                    loc: "New Haven, CT",
                    match: "88%",
                    img: "https://images.unsplash.com/photo-1592280771884-477c029375e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                  },
                ].map((col, i) => (
                  <div
                    key={i}
                    className="bg-white p-4 rounded-xl shadow-sm border border-slate-200"
                  >
                    <div
                      className="h-32 rounded-lg bg-gray-200 mb-3 bg-cover bg-center"
                      style={{ backgroundImage: `url('${col.img}')` }}
                    ></div>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">
                      Match: {col.match}
                    </span>
                    <h4 className="font-bold text-slate-800 mt-2">
                      {col.name}
                    </h4>
                    <p className="text-xs text-slate-500 mb-3">{col.loc}</p>
                    <button className="text-sm text-blue-600 font-semibold hover:underline">
                      View Details
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                  <i className="fas fa-quote-left text-blue-500 mr-2"></i> What
                  Students Say
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      name: "Felix Brown",
                      school: "MIT '26",
                      text: '"StudSphere helped me organize my entire application process. I wouldn\'t have made the deadlines without it!"',
                      seed: "Felix",
                      stars: 5,
                    },
                    {
                      name: "Sarah Lee",
                      school: "Stanford '25",
                      text: '"The scholarship recommendations were spot on. I found funding I didn\'t even know existed."',
                      seed: "Sarah",
                      stars: 5,
                    },
                    {
                      name: "John Doe",
                      school: "Applicant",
                      text: '"The resource library is a goldmine for entrance exam prep. Highly recommended notes!"',
                      seed: "John",
                      stars: 4.5,
                    },
                  ].map((test, i) => (
                    <div
                      key={i}
                      className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
                    >
                      <div className="flex items-center mb-4">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${test.seed}`}
                          className="w-10 h-10 rounded-full bg-slate-100"
                          alt="Avatar"
                        />
                        <div className="ml-3">
                          <p className="text-sm font-bold text-slate-800">
                            {test.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {test.school}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 italic">
                        {test.text}
                      </p>
                      <div className="mt-3 text-yellow-400 text-xs">
                        {[...Array(Math.floor(test.stars))].map((_, j) => (
                          <i key={j} className="fas fa-star"></i>
                        ))}
                        {test.stars % 1 !== 0 && (
                          <i className="fas fa-star-half-alt"></i>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION: MY APPLICATIONS / INQUIRIES */}
          {activeTab === "applications" && (
            <div className="animate-fadeIn">
              <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-slate-800">
                  Inquiries & Applications
                </h2>
                <div className="flex flex-wrap gap-2 w-full xl:w-auto">
                  <div className="relative">
                    <i className="fas fa-calendar absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                    <input
                      type="date"
                      className="pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 outline-none focus:border-blue-500"
                    />
                  </div>
                  <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 outline-none focus:border-blue-500">
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="received">Received</option>
                    <option value="accepted">Accepted</option>
                    <option value="recent">Recently Applied</option>
                  </select>
                  <button
                    onClick={() => setIsNewAppModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm shadow-blue-500/30 ml-auto"
                  >
                    <i className="fas fa-paper-plane mr-1"></i> New Inquiry
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between h-full hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-bold">
                      M
                    </div>
                    <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded border border-blue-100 font-medium">
                      Received
                    </span>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-bold text-slate-800 text-lg">MIT</h3>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                      Admission Inquiry: Computer Science Program Details
                      regarding Fall 2026 intake.
                    </p>
                    <span className="text-xs text-slate-400 mt-2 block">
                      <i className="far fa-clock mr-1"></i> Feb 12, 2026
                    </span>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setReplyData({
                          college: "Massachusetts Institute of Technology",
                          message:
                            "Dear Alex, Thank you for your interest in our CS program. Our admission cycle begins on Sept 1st. Please check our website for prerequisites.",
                          date: "Feb 12, 2026",
                        });
                        setIsReplyModalOpen(true);
                      }}
                      className="w-full px-3 py-2 text-xs font-bold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      View Reply
                    </button>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between h-full hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded bg-red-100 text-red-600 flex items-center justify-center text-xl font-bold">
                      S
                    </div>
                    <span className="text-xs px-2 py-0.5 bg-yellow-50 text-yellow-600 rounded border border-yellow-100 font-medium">
                      Pending
                    </span>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-bold text-slate-800 text-lg">
                      Stanford University
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      Scholarship Application Form for Undergraduate Merit
                      Scholarship.
                    </p>
                    <span className="text-xs text-slate-400 mt-2 block">
                      <i className="far fa-clock mr-1"></i> Feb 15, 2026
                    </span>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setStatusData({ college: "Stanford University" });
                        setIsStatusModalOpen(true);
                      }}
                      className="w-full px-3 py-2 text-xs font-bold text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      Track Status
                    </button>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between h-full hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded bg-gray-100 text-gray-600 flex items-center justify-center text-xl font-bold">
                      <i className="fas fa-university"></i>
                    </div>
                    <span className="text-xs px-2 py-0.5 bg-green-50 text-green-600 rounded border border-green-100 font-medium">
                      Sent
                    </span>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-bold text-slate-800 text-lg">
                      General Inquiry
                    </h3>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                      Yale University, Princeton University - International
                      applicant queries.
                    </p>
                    <span className="text-xs text-slate-400 mt-2 block">
                      <i className="far fa-clock mr-1"></i> Feb 10, 2026
                    </span>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setDetailsData({
                          title: "General Inquiry (Multiple Colleges)",
                          colleges: "Yale University, Princeton University",
                          status: "Sent",
                          date: "Feb 10, 2026",
                          message:
                            "I am interested in applying for the Fall 2026 semester. Could you please provide information regarding scholarship deadlines for international applicants?",
                        });
                        setIsDetailsModalOpen(true);
                      }}
                      className="w-full px-3 py-2 text-xs font-bold text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: CHAT */}
          {activeTab === "chat" && (
            <div className="animate-fadeIn h-[calc(100vh-140px)]">
              <div className="flex h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="w-80 border-r border-slate-100 flex flex-col bg-slate-50">
                  <div className="p-4 border-b border-slate-100">
                    <input
                      type="text"
                      placeholder="Search messages..."
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="overflow-y-auto flex-1">
                    <div className="p-3 hover:bg-white cursor-pointer transition-colors border-l-4 border-blue-500 bg-white">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=DrSmith"
                            className="w-10 h-10 rounded-full bg-slate-200"
                          />
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <h4 className="text-sm font-bold text-slate-800 truncate">
                              Dr. Emily Smith
                            </h4>
                            <span className="text-[10px] text-slate-400">
                              10:30 AM
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 truncate">
                            Don't forget to bring your transcript.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col bg-white">
                  <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white z-10">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=DrSmith"
                        className="w-10 h-10 rounded-full bg-slate-200"
                      />
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">
                          Dr. Emily Smith
                        </h4>
                        <p className="text-xs text-green-500 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>{" "}
                          Online
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 text-slate-400">
                      <button className="hover:text-blue-600">
                        <i className="fas fa-phone"></i>
                      </button>
                      <button className="hover:text-blue-600">
                        <i className="fas fa-video"></i>
                      </button>
                      <button className="hover:text-blue-600">
                        <i className="fas fa-info-circle"></i>
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                    <div className="flex justify-center">
                      <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                        Today
                      </span>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <div className="bg-blue-600 text-white p-3 rounded-l-xl rounded-tr-xl text-sm max-w-[70%] shadow-sm">
                        Hi Dr. Smith, looking forward to our session today.
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=DrSmith"
                        className="w-8 h-8 rounded-full bg-slate-200 self-end"
                      />
                      <div className="bg-white border border-slate-200 text-slate-700 p-3 rounded-r-xl rounded-tl-xl text-sm max-w-[70%] shadow-sm">
                        Hello Alex! Yes, please be ready at 10:00 AM. Don't
                        forget to bring your transcript.
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-slate-100 bg-white">
                    <div className="flex gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                        <i className="fas fa-paperclip"></i>
                      </button>
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                      <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                        <i className="fas fa-paper-plane"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: CALENDAR */}
          {activeTab === "calendar" && (
            <div className="animate-fadeIn h-full overflow-hidden">
              <div className="flex h-full w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="w-80 flex-shrink-0 border-r border-slate-100 p-6 flex flex-col h-full bg-white z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm shadow-md">
                      <i className="fas fa-calendar-check"></i>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-800">
                      StudSphere
                    </h1>
                  </div>

                  <button
                    onClick={() => {
                      setNewEvent({
                        ...newEvent,
                        date: new Date().toISOString().split("T")[0],
                        time: "09:00",
                      });
                      setIsEventModalOpen(true);
                    }}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 mb-8"
                  >
                    <i className="fas fa-plus"></i> Add Note
                  </button>

                  <div className="overflow-y-auto pr-2 space-y-8 flex-1">
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex justify-between items-center">
                        My Calendars
                        <button
                          onClick={() =>
                            setActiveFilters(Object.keys(EVENT_TYPES))
                          }
                          className="text-blue-500 hover:text-blue-600 text-[10px]"
                        >
                          Show All
                        </button>
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(EVENT_TYPES).map(([key, val]) => (
                          <label
                            key={key}
                            className="flex items-center gap-3 cursor-pointer group"
                          >
                            <input
                              type="checkbox"
                              checked={activeFilters.includes(key)}
                              onChange={() => toggleFilter(key)}
                              className="sr-only"
                            />
                            <div
                              className={`w-5 h-5 rounded border border-slate-200 flex items-center justify-center transition-colors ${activeFilters.includes(key) ? "bg-current border-transparent" : ""}`}
                              style={{ color: val.color }}
                            >
                              {activeFilters.includes(key) && (
                                <i className="fas fa-check text-white text-xs"></i>
                              )}
                            </div>
                            <span
                              className={`text-sm font-medium transition-colors ${activeFilters.includes(key) ? "text-slate-700" : "text-slate-400"}`}
                            >
                              {val.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="h-px bg-slate-100 w-full"></div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                        Upcoming (7 Days)
                      </h3>
                      {upcomingEvents.length === 0 ? (
                        <p className="text-xs text-slate-400 italic">
                          No upcoming events.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {upcomingEvents.slice(0, 3).map((evt: any) => (
                            <div
                              key={evt.id}
                              className="flex items-start gap-3"
                            >
                              <div className="w-10 h-10 rounded-lg bg-slate-50 flex flex-col items-center justify-center text-xs border border-slate-100 flex-shrink-0">
                                <span className="font-bold text-slate-700">
                                  {new Date(evt.date).getDate()}
                                </span>
                                <span className="text-[10px] text-slate-400 uppercase">
                                  {new Date(evt.date).toLocaleDateString(
                                    "en-US",
                                    { weekday: "short" },
                                  )}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-700 truncate">
                                  {evt.title}
                                </p>
                                <p className="text-xs text-slate-500">
                                  {evt.time}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                        Tasks / Docs
                      </h3>
                      <div className="space-y-2">
                        {checklist.map((item: any) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 group p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                            onClick={() => toggleChecklist(item.id)}
                          >
                            <div
                              className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${item.checked ? "bg-emerald-500 border-emerald-500" : "border-slate-300"}`}
                            >
                              {item.checked && (
                                <i className="fas fa-check text-white text-[10px]"></i>
                              )}
                            </div>
                            <span
                              className={`text-sm ${item.checked ? "text-slate-400 line-through" : "text-slate-600"}`}
                            >
                              {item.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-slate-500 hover:text-slate-800 cursor-pointer transition">
                      <i className="fas fa-plug"></i>
                      <span className="text-sm font-medium">Connect Apps</span>
                      <span className="ml-auto bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded font-bold">
                        2
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
                  <header className="h-20 px-8 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-20">
                    <div className="flex items-center gap-6">
                      <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
                        {MONTHS[currentDate.getMonth()]}{" "}
                        <span className="text-slate-300 font-normal">
                          {currentDate.getFullYear()}
                        </span>
                      </h2>
                      <div className="flex bg-slate-50 rounded-lg p-1 border border-slate-100">
                        <button
                          onClick={handlePrev}
                          className="w-8 h-8 flex items-center justify-center rounded-md text-slate-500 hover:bg-white hover:shadow-sm transition"
                        >
                          <i className="fas fa-chevron-left text-xs"></i>
                        </button>
                        <button
                          onClick={handleNext}
                          className="w-8 h-8 flex items-center justify-center rounded-md text-slate-500 hover:bg-white hover:shadow-sm transition"
                        >
                          <i className="fas fa-chevron-right text-xs"></i>
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="bg-slate-50 p-1 rounded-lg border border-slate-100 flex text-sm font-medium text-slate-500">
                        {(["month", "week", "day"] as const).map((v) => (
                          <button
                            key={v}
                            onClick={() => setCalendarView(v)}
                            className={`px-4 py-1.5 rounded-md transition ${calendarView === v ? "bg-white text-slate-800 shadow-sm" : "hover:text-slate-700"}`}
                          >
                            {v.charAt(0).toUpperCase() + v.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </header>
                  <div className="flex-1 overflow-y-auto">
                    {calendarView === "month" && (
                      <>
                        <div className="grid grid-cols-7 border-b border-slate-100 sticky top-0 bg-white z-10">
                          {DAYS.map((day) => (
                            <div
                              key={day}
                              className="py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-widest"
                            >
                              {day}
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 min-h-full border-l border-t border-slate-50">
                          {(() => {
                            const daysInMonth = new Date(
                              currentDate.getFullYear(),
                              currentDate.getMonth() + 1,
                              0,
                            ).getDate();
                            const firstDayOfMonth = new Date(
                              currentDate.getFullYear(),
                              currentDate.getMonth(),
                              1,
                            ).getDay();
                            const adjustedFirstDay =
                              firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
                            const blanks = Array(adjustedFirstDay).fill(null);
                            const days = Array(daysInMonth)
                              .fill(null)
                              .map((_, i) => i + 1);
                            const totalSlots = [...blanks, ...days];
                            while (totalSlots.length % 7 !== 0)
                              totalSlots.push(null);

                            return totalSlots.map((day, index) => {
                              if (!day)
                                return (
                                  <div
                                    key={`empty-${index}`}
                                    className="calendar-cell bg-slate-50/20 border-r border-b border-slate-50 min-h-[120px]"
                                  ></div>
                                );
                              const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                              const dayEvents = filteredEvents.filter(
                                (e: any) => e.date === dateStr,
                              );
                              const isToday =
                                new Date().toDateString() ===
                                new Date(
                                  currentDate.getFullYear(),
                                  currentDate.getMonth(),
                                  day,
                                ).toDateString();
                              return (
                                <div
                                  key={day}
                                  onClick={() => handleDateClick(day)}
                                  className="relative p-2 group cursor-pointer flex flex-col gap-1 border-r border-b border-slate-100 min-h-[120px] hover:bg-slate-50 transition-colors"
                                >
                                  <div className="flex justify-between items-start">
                                    <span
                                      className={`text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full ${isToday ? "bg-blue-600 text-white shadow-md" : "text-slate-500"}`}
                                    >
                                      {day}
                                    </span>
                                    <button className="opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs hover:bg-blue-100">
                                      <i className="fas fa-plus"></i>
                                    </button>
                                  </div>
                                  <div className="flex flex-col gap-1 mt-1">
                                    {dayEvents.map((evt: any) => (
                                      <div
                                        key={evt.id}
                                        className={`${EVENT_TYPES[evt.type as keyof typeof EVENT_TYPES].bg} ${EVENT_TYPES[evt.type as keyof typeof EVENT_TYPES].text} px-2 py-1 rounded text-[10px] font-bold truncate border-l-2`}
                                        style={{
                                          borderColor:
                                            EVENT_TYPES[
                                              evt.type as keyof typeof EVENT_TYPES
                                            ].color,
                                        }}
                                      >
                                        {evt.title}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            });
                          })()}
                        </div>
                      </>
                    )}
                    {calendarView === "week" && (
                      <div className="flex flex-col p-4">
                        {/* Simple week list for brevity in this massive component */}
                        <p className="text-slate-500 italic text-center p-10">
                          Week View Grid Implementation...
                        </p>
                      </div>
                    )}
                    {calendarView === "day" && (
                      <div className="p-8">
                        <h3 className="text-2xl font-bold mb-4">
                          {currentDate.toDateString()}
                        </h3>
                        {filteredEvents
                          .filter(
                            (e: any) =>
                              e.date ===
                              currentDate.toISOString().split("T")[0],
                          )
                          .map((evt: any) => (
                            <div
                              key={evt.id}
                              className="p-4 mb-2 bg-blue-50 rounded-lg flex justify-between items-center"
                            >
                              <div>
                                <p className="font-bold">{evt.title}</p>
                                <p className="text-xs text-slate-500">
                                  {evt.time}
                                </p>
                              </div>
                              <span className="text-xs font-bold uppercase p-1 rounded bg-blue-200 text-blue-800">
                                {evt.type}
                              </span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: SPHEREINVITES */}
          {activeTab === "sphereinvites" && (
            <div className="animate-fadeIn">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <i className="fas fa-envelope-open-text text-blue-600"></i>{" "}
                    SphereInvites
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Exclusive opportunities matched to your profile.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-xl">
                    <i className="fas fa-inbox"></i>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {inviteStats.total}
                    </p>
                    <p className="text-xs text-gray-500 font-medium uppercase">
                      Total Invites
                    </p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-green-50 flex items-center justify-center text-green-600 text-xl">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {inviteStats.accepted}
                    </p>
                    <p className="text-xs text-gray-500 font-medium uppercase">
                      Accepted
                    </p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 text-xl">
                    <i className="fas fa-bookmark"></i>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {inviteStats.saved}
                    </p>
                    <p className="text-xs text-gray-500 font-medium uppercase">
                      Saved
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-5 rounded-xl shadow-md text-white flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute right-[-10px] top-[-10px] opacity-10 text-9xl">
                    <i className="fas fa-bolt"></i>
                  </div>
                  <p className="text-sm font-medium opacity-90">
                    Profile Match Score
                  </p>
                  <div className="flex items-end gap-2 mt-1">
                    <p className="text-2xl font-bold">Excellent</p>
                    <i className="fas fa-arrow-trend-up mb-1 text-green-300"></i>
                  </div>
                  <div className="w-full bg-white/20 h-1.5 rounded-full mt-3">
                    <div
                      className="bg-white h-1.5 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div className="flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm overflow-x-auto scroll-hide">
                  {["all", "scholarship", "admission", "event"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setInviteFilter(f)}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${inviteFilter === f ? "bg-blue-50 text-blue-600 shadow-sm" : "text-gray-600 hover:text-blue-600"}`}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}{" "}
                      {f === "all" ? "Invites" : ""}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInvites.length === 0 ? (
                  <div className="col-span-full py-20 text-center">
                    <i className="far fa-folder-open text-4xl text-gray-300 mb-4"></i>
                    <p className="text-gray-500">No invites found.</p>
                  </div>
                ) : (
                  filteredInvites.map((inv) => (
                    <div
                      key={inv.id}
                      className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition-all relative ${inv.status === "accepted" ? "ring-2 ring-green-500" : ""}`}
                    >
                      {inv.priority && (
                        <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10">
                          URGENT
                        </div>
                      )}
                      {inv.status === "saved" && (
                        <div className="absolute top-0 right-8 text-blue-600 text-lg z-10">
                          <i className="fa-solid fa-bookmark"></i>
                        </div>
                      )}
                      <div className="p-5 flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gray-50 flex items-center justify-center font-bold text-gray-700 border border-gray-200">
                              {inv.logo}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-gray-900">
                                {inv.college}
                              </h4>
                              <p className="text-xs text-gray-500">
                                <i className="fas fa-location-dot mr-1"></i>
                                {inv.location}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 text-blue-700 mb-2 underline decoration-2 decoration-blue-200 underline-offset-2`}
                          >
                            {inv.type}
                          </span>
                          <h3 className="text-lg font-bold text-gray-800 mb-2 leading-snug">
                            {inv.title}
                          </h3>
                          <p className="text-xs text-gray-500 line-clamp-2">
                            {inv.description}
                          </p>
                        </div>
                        {inv.amount && (
                          <div className="bg-gray-50 rounded-lg p-2 mb-3 flex items-center gap-2 border border-gray-100 text-sm font-bold text-gray-700">
                            <i className="fas fa-gift text-blue-600"></i>
                            {inv.amount}
                          </div>
                        )}
                        <div className="flex items-center gap-3 text-[10px] mt-auto border-t border-gray-50 pt-3 text-gray-500">
                          <span className="bg-gray-50 px-2 py-1 rounded">
                            <i className="far fa-clock mr-1"></i>3 days left
                          </span>
                          <span className="bg-gray-50 px-2 py-1 rounded">
                            <i className="fas fa-tag mr-1"></i>
                            {inv.tags[0]}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 border-t border-gray-100 grid grid-cols-2 gap-3">
                        {inv.status === "accepted" ? (
                          <button className="col-span-2 py-2 bg-green-500 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                            <i className="fas fa-check"></i> Offer Accepted
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() =>
                                handleInviteAction(inv.id, "decline")
                              }
                              className="py-2 text-gray-600 hover:bg-gray-200 rounded-lg text-sm font-bold bg-white border border-gray-200"
                            >
                              Decline
                            </button>
                            <button
                              onClick={() =>
                                handleInviteAction(inv.id, "accept")
                              }
                              className="py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition-all transform active:scale-95"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleInviteAction(inv.id, "save")}
                              className="col-span-2 text-center text-[11px] text-blue-600 font-bold hover:underline"
                            >
                              {inv.status === "saved"
                                ? "Remove from Saved"
                                : "Save for Later"}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* SECTION: COUNSELLING */}
          {activeTab === "counselling" && (
            <div className="animate-fadeIn">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Counselling & Mentorship
                  </h2>
                  <p className="text-slate-500 mt-1">
                    Expert guidance for your academic and personal growth.
                  </p>
                </div>
                <button
                  onClick={() => setIsBookSessionModalOpen(true)}
                  className="bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-600 shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
                >
                  <i className="fas fa-calendar-plus"></i> Book Session
                </button>
              </div>
              <div className="border-b border-slate-200 mb-6">
                <nav className="flex gap-6 overflow-x-auto no-scrollbar">
                  {["booked", "upcoming", "past", "explore"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setCounsellingTab(t)}
                      className={`pb-3 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${counsellingTab === t ? "border-blue-500 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
                    >
                      {t.charAt(0).toUpperCase() +
                        t.slice(1).replace("booked", "New Requests")}
                    </button>
                  ))}
                </nav>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {counsellingTab === "upcoming" && (
                  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>
                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=DrSmith"
                            className="h-12 w-12 rounded-full bg-slate-100 border border-slate-200"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">
                            Dr. Emily Smith
                          </h4>
                          <p className="text-xs text-slate-500">
                            Global Career Institute
                          </p>
                        </div>
                      </div>
                      <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                        Confirmed
                      </span>
                    </div>
                    <div className="mb-5 relative z-10 text-xs text-slate-500 space-y-1">
                      <p className="font-bold text-slate-400 uppercase tracking-wide">
                        Session Time
                      </p>
                      <p className="text-sm font-bold text-slate-800">
                        Feb 24, 2026
                      </p>
                      <p>10:00 AM - 11:00 AM</p>
                    </div>
                    <button className="w-full py-2.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 relative z-10 shadow-lg shadow-blue-200">
                      <i className="fas fa-video"></i> Join Google Meet
                    </button>
                  </div>
                )}
                {counsellingTab === "explore" && (
                  <div className="col-span-full italic text-center p-10 text-slate-400">
                    Counselor discovery list implementation...
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION: MY PROFILE */}
          {activeTab === "profile" && (
            <div className="animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
                    <div className="relative inline-block">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                        className="w-24 h-24 rounded-full mx-auto border-4 border-slate-50 shadow-sm"
                        alt="Profile"
                      />
                      <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full text-xs border-2 border-white">
                        <i className="fas fa-camera"></i>
                      </button>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mt-4">
                      Alex Student
                    </h2>
                    <p className="text-sm text-slate-500">
                      Aspiring Computer Scientist
                    </p>
                    <div className="mt-6 text-left">
                      <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                        <span>Profile Strength</span>
                        <span>75%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mt-6 font-semibold text-slate-700 flex flex-col gap-2">
                    <h4 className="text-xs uppercase text-slate-400">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Python", "Leadership", "Public Speaking"].map((s) => (
                        <span
                          key={s}
                          className="px-2 py-1 bg-slate-100 text-[10px] rounded"
                        >
                          {s}
                        </span>
                      ))}
                      <button className="px-2 py-1 border border-dashed border-slate-300 text-[10px] rounded text-slate-400 hover:text-blue-500">
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 min-h-[500px]">
                    <nav className="flex px-6 border-b border-slate-100 gap-6 overflow-x-auto no-scrollbar">
                      {["personal", "education", "preferred", "documents"].map(
                        (t) => (
                          <button
                            key={t}
                            onClick={() => setProfileTab(t)}
                            className={`py-4 text-sm font-medium transition-colors border-b-2 ${profileTab === t ? "border-blue-500 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
                          >
                            {t.charAt(0).toUpperCase() +
                              t
                                .slice(1)
                                .replace("preferred", "Preferred Study")}
                          </button>
                        ),
                      )}
                    </nav>
                    <div className="p-6">
                      {profileTab === "personal" && (
                        <div className="space-y-6">
                          <h3 className="font-bold text-lg">
                            Personal Information
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                              <label className="text-xs font-bold text-slate-400 uppercase">
                                Full Name
                              </label>
                              <input
                                className="p-2 bg-slate-50 border rounded text-sm"
                                defaultValue="Alex Student"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-xs font-bold text-slate-400 uppercase">
                                Email
                              </label>
                              <input
                                className="p-2 bg-slate-50 border rounded text-sm"
                                defaultValue="alex@university.edu"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-xs font-bold text-slate-400 uppercase">
                                Phone
                              </label>
                              <input
                                className="p-2 bg-slate-50 border rounded text-sm"
                                defaultValue="+1 (555) 123-4567"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-xs font-bold text-slate-400 uppercase">
                                DOB
                              </label>
                              <input
                                type="date"
                                className="p-2 bg-slate-50 border rounded text-sm"
                                defaultValue="2002-05-15"
                              />
                            </div>
                          </div>
                          <button className="px-6 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700">
                            Save Changes
                          </button>
                        </div>
                      )}
                      {profileTab === "documents" && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 border rounded-xl flex items-center gap-4 bg-white hover:border-blue-200 transition-colors cursor-pointer group">
                              <div className="w-10 h-10 bg-red-50 text-red-500 rounded flex items-center justify-center text-xl">
                                <i className="fas fa-file-pdf"></i>
                              </div>
                              <div className="flex-1 overflow-hidden">
                                <p className="font-bold text-sm truncate">
                                  Resume_2024.pdf
                                </p>
                                <p className="text-[10px] text-slate-400">
                                  2.4 MB • July 12
                                </p>
                              </div>
                              <i className="fas fa-download text-slate-300 group-hover:text-blue-500"></i>
                            </div>
                          </div>
                          <div className="p-10 border-2 border-dashed border-slate-200 rounded-2xl text-center bg-slate-50 hover:bg-white transition-colors cursor-pointer">
                            <i className="fas fa-cloud-upload-alt text-3xl text-slate-300 mb-2"></i>
                            <p className="text-sm font-bold text-slate-500">
                              Add New Document
                            </p>
                            <p className="text-[10px] text-slate-400">
                              PDF, JPG, PNG up to 10MB
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: BOOKMARKS */}
          {activeTab === "bookmarks" && (
            <div className="animate-fadeIn">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-slate-800">
                  Saved Items
                </h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    "all",
                    "college",
                    "admission",
                    "entrance",
                    "course",
                    "note",
                  ].map((c) => (
                    <button
                      key={c}
                      onClick={() => setBookmarkFilter(c)}
                      className={`px-4 py-1.5 rounded-full border text-xs font-bold transition-all ${bookmarkFilter === c ? "bg-slate-800 border-slate-800 text-white shadow-md" : "bg-white border-slate-200 text-slate-600 hover:border-blue-500 hover:text-blue-500"}`}
                    >
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    type: "college",
                    name: "Yale University",
                    loc: "New Haven, CT",
                    color: "blue",
                    img: "https://images.unsplash.com/photo-1592280771884-477c029375e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                  },
                  {
                    type: "admission",
                    name: "Future Leaders Award",
                    loc: "$10,000 / Year",
                    color: "orange",
                    img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                  },
                  {
                    type: "note",
                    name: "Organic Chemistry",
                    loc: "Prof. Wilson's Notes",
                    color: "purple",
                    icon: "fas fa-sticky-note",
                  },
                ]
                  .filter(
                    (i) =>
                      bookmarkFilter === "all" || i.type === bookmarkFilter,
                  )
                  .map((item, i) => (
                    <div
                      key={i}
                      className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all"
                    >
                      {item.img ? (
                        <div
                          className="h-32 rounded-lg bg-gray-200 mb-4 bg-cover bg-center"
                          style={{ backgroundImage: `url('${item.img}')` }}
                        ></div>
                      ) : (
                        <div className="h-32 rounded-lg bg-purple-50 mb-4 flex items-center justify-center text-purple-400 text-4xl">
                          <i className={item.icon}></i>
                        </div>
                      )}
                      <span
                        className={`text-[10px] font-bold text-${item.color}-600 bg-${item.color}-50 px-2 py-0.5 rounded uppercase`}
                      >
                        {item.type}
                      </span>
                      <h3 className="font-bold text-slate-800 mt-2">
                        {item.name}
                      </h3>
                      <p className="text-sm text-slate-500 mb-3">{item.loc}</p>
                      <button className="w-full py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                        Action
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* SECTION: NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold mb-6">Notifications</h2>
              <div className="bg-white rounded-2xl overflow-hidden border divide-y divide-slate-100 shadow-sm">
                {[
                  {
                    type: "deadline",
                    title: "Application Deadline Approaching",
                    msg: "Physics Scholarship deadline is in 2 days. Submit your essay now.",
                    time: "2 hours ago",
                    color: "red",
                    icon: "fas fa-exclamation",
                  },
                  {
                    type: "info",
                    title: "New Document Requested",
                    msg: "Stanford requested an additional transcript for your application.",
                    time: "1 day ago",
                    color: "blue",
                    icon: "fas fa-info",
                  },
                  {
                    type: "success",
                    title: "Application Submitted",
                    msg: "Your application to Yale University has been successfully submitted.",
                    time: "3 days ago",
                    color: "green",
                    icon: "fas fa-check",
                  },
                ].map((notif, i) => (
                  <div
                    key={i}
                    className={`p-6 flex gap-4 hover:bg-slate-50 transition-colors border-l-4 border-${notif.color}-500 bg-white`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full bg-${notif.color}-50 text-${notif.color}-500 flex items-center justify-center shrink-0`}
                    >
                      <i className={notif.icon}></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-slate-800">
                          {notif.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">
                          {notif.time}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {notif.msg}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: STUDY RESOURCES */}
          {activeTab === "resources" && (
            <div className="animate-fadeIn">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Learn & Earn</h2>
                <div className="bg-yellow-400 px-4 py-1.5 rounded-full font-bold text-sm text-yellow-900 shadow-sm">
                  <i className="fas fa-coins mr-2"></i>1,250 Points
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="col-span-1 bg-blue-600 rounded-2xl p-6 text-white text-center shadow-lg shadow-blue-200">
                  <i className="fas fa-cloud-upload-alt text-4xl mb-4 opacity-80"></i>
                  <h3 className="text-lg font-bold">Contribute Notes</h3>
                  <p className="text-blue-100 text-xs mb-6">
                    Earn up to 50 points per quality upload.
                  </p>
                  <button
                    onClick={() => setIsUploadNotesModalOpen(true)}
                    className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50"
                  >
                    Upload Now
                  </button>
                </div>
                <div className="col-span-2 bg-white rounded-2xl border p-6 shadow-sm overflow-hidden flex flex-col justify-center">
                  <h4 className="text-xs uppercase font-bold text-slate-400 mb-4">
                    Top Contributors
                  </h4>
                  <div className="flex gap-4">
                    {["Annie P.", "Bob L.", "Cathy S."].map((name, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 aspect-square justify-center shrink-0"
                      >
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
                          className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                        />
                        <p className="text-[10px] font-bold truncate w-full text-center">
                          {name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: SETTINGS */}
          {activeTab === "settings" && (
            <div className="animate-fadeIn">
              <div className="grid grid-cols-4 gap-8">
                <div className="col-span-1 bg-white p-6 rounded-2xl border flex flex-col gap-1 h-fit sticky top-0 shadow-sm">
                  <h3 className="font-bold text-lg mb-4">Settings</h3>
                  {["password", "privacy", "terms"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setSettingsTab(t)}
                      className={`px-4 py-3 rounded-xl text-sm font-bold text-left transition-colors ${settingsTab === t ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100" : "text-slate-500 hover:bg-slate-50"}`}
                    >
                      {t.charAt(0).toUpperCase() +
                        t
                          .slice(1)
                          .replace("password", "Security & Password")
                          .replace("privacy", "Privacy Policy")
                          .replace("terms", "Terms & Rules")}
                    </button>
                  ))}
                </div>
                <div className="col-span-3 bg-white p-8 rounded-2xl border shadow-sm min-h-[500px]">
                  {settingsTab === "password" && (
                    <div className="max-w-md space-y-6">
                      <h3 className="text-xl font-bold mb-8">
                        Security & Password
                      </h3>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-400 uppercase">
                          Current Password
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="p-3 bg-slate-50 border rounded-xl"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-400 uppercase">
                          New Password
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="p-3 bg-slate-50 border rounded-xl"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-400 uppercase">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="p-3 bg-slate-50 border rounded-xl"
                        />
                      </div>
                      <button className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-md">
                        Update Password
                      </button>
                      <div className="pt-8 border-t flex items-center justify-between">
                        <div>
                          <p className="font-bold">Two-Factor Authentication</p>
                          <p className="text-xs text-slate-400">
                            Protects your account from unauthorized access.
                          </p>
                        </div>
                        <div className="w-12 h-6 bg-slate-200 rounded-full p-1 cursor-pointer relative">
                          <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* MODALS */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsLogoutModalOpen(false)}
          ></div>
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full relative z-[301] text-center transform animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-inner">
              <i className="fas fa-power-off"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">Logging Out?</h3>
            <p className="text-slate-500 text-sm mb-8">
              Are you sure you want to end your current session?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 py-3 font-bold text-slate-600 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsLogoutModalOpen(false);
                  onLogout?.();
                }}
                className="flex-1 py-3 font-bold text-white bg-red-500 rounded-xl hover:bg-red-600 shadow-lg shadow-red-200 transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast System */}
      {toast.show && (
        <div className="fixed bottom-10 right-10 z-[1000] bg-slate-900 text-white p-5 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-right duration-500">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shrink-0">
            <i className="fas fa-check"></i>
          </div>
          <div>
            <p className="font-bold text-sm leading-none mb-1">{toast.title}</p>
            <p className="text-[10px] text-slate-400">{toast.msg}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;

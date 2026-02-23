import React, { useState, useEffect } from "react";

interface JobFeedPageProps {
  onNavigate: (view: any) => void;
}

interface Post {
  id: number;
  author: string;
  authorAvatar: string;
  authorTitle: string;
  authorStatus?: string | null;
  isVerified: boolean;
  time: string;
  type: "job" | "poll" | "update";
  content: string;
  image?: string;
  jobDetails?: {
    title: string;
    location: string;
    type: string;
    salary: string;
    tags: string[];
  };
  pollData?: {
    totalVotes: number;
    options: { text: string; votes: number }[];
    votedOption?: number | null;
  };
  likes: number;
  comments: number;
  shares: number;
  likedByMe: boolean;
}

const JobFeedPage: React.FC<JobFeedPageProps> = ({ onNavigate }) => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "CloudTech Nepal",
      authorAvatar: "https://api.dicebear.com/7.x/identicon/svg?seed=CloudTech",
      authorTitle: "Leading IT Solutions in Lalitpur",
      authorStatus: "Hiring",
      isVerified: true,
      time: "2h ago",
      type: "job",
      content:
        "We are expanding our team! Looking for a passionate React Developer to join our office in Jhamsikhel. Great culture and benefits.",
      jobDetails: {
        title: "Senior React Developer",
        location: "Jhamsikhel, Lalitpur",
        type: "Full-time",
        salary: "NPR 80k - 120k",
        tags: ["Remote Friendly", "Urgent"],
      },
      likes: 145,
      comments: 32,
      shares: 12,
      likedByMe: false,
    },
    {
      id: 2,
      author: "Sita Sharma",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sita",
      authorTitle: "HR Manager at Himalayan Bank",
      isVerified: false,
      time: "45m ago",
      type: "poll",
      content:
        "What is the most important factor for you when choosing a new job in Nepal right now?",
      pollData: {
        totalVotes: 1240,
        options: [
          { text: "High Salary 💰", votes: 600 },
          { text: "Work Life Balance ⚖️", votes: 400 },
          { text: "Remote Work Options 🏠", votes: 140 },
          { text: "Brand Reputation 🏢", votes: 100 },
        ],
      },
      likes: 89,
      comments: 104,
      shares: 5,
      likedByMe: false,
    },
    {
      id: 3,
      author: "WorldLink Communications",
      authorAvatar: "https://api.dicebear.com/7.x/identicon/svg?seed=WorldLink",
      authorTitle: "Internet Service Provider",
      authorStatus: "Active",
      isVerified: true,
      time: "3h ago",
      type: "update",
      content:
        "We are proud to announce that we've connected 50 new remote villages in Karnali Province this month! Internet for all. 🌐🇳🇵 #DigitalNepal #Connectivity",
      image:
        "https://images.unsplash.com/photo-1544654032-901d89851722?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 892,
      comments: 120,
      shares: 230,
      likedByMe: false,
    },
  ]);

  const [postInput, setPostInput] = useState("");

  const toggleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            likedByMe: !p.likedByMe,
            likes: p.likedByMe ? p.likes - 1 : p.likes + 1,
          };
        }
        return p;
      }),
    );
  };

  const handlePostSubmit = () => {
    if (!postInput.trim()) return;
    const newPost: Post = {
      id: Date.now(),
      author: "Aarav Shrestha",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav",
      authorTitle: "Senior Frontend Developer",
      authorStatus: "Open to Work",
      isVerified: false,
      time: "Just now",
      type: "update",
      content: postInput,
      likes: 0,
      comments: 0,
      shares: 0,
      likedByMe: false,
    };
    setPosts([newPost, ...posts]);
    setPostInput("");
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 font-jakarta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* LEFT SIDEBAR */}
          <div className="hidden md:block md:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden relative group cursor-pointer transition-all hover:shadow-md">
              <div className="h-20 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
              <div className="px-5 pb-5">
                <div className="relative -mt-10 mb-3 flex justify-between items-end">
                  <img
                    className="h-20 w-20 rounded-2xl border-4 border-white shadow-md bg-white object-cover"
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav"
                    alt="User"
                  />
                  <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded-full border border-green-200 uppercase tracking-widest">
                    Open to Work
                  </span>
                </div>
                <h2 className="text-lg font-black text-slate-900 leading-tight">
                  Aarav Shrestha
                </h2>
                <p className="text-sm text-slate-500 font-bold mb-3">
                  Senior Frontend Developer
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-purple-50 text-purple-600 text-[10px] font-black uppercase rounded-md border border-purple-100">
                    Freelancing
                  </span>
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-md border border-blue-100">
                    Remote
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-100 text-sm font-bold">
                  <span className="text-slate-400">Profile Views</span>
                  <span className="text-slate-800">1,240</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-28">
              <nav className="space-y-1 mb-6">
                <SidebarNavLink icon="fa-home" label="Feed" active />
                <SidebarNavLink
                  icon="fa-briefcase"
                  label="Find Jobs"
                  onClick={() => onNavigate("jobsPage")}
                />
                <SidebarNavLink
                  icon="fa-building"
                  label="Companies"
                  onClick={() => onNavigate("companiesPage")}
                />
              </nav>

              <div className="mb-6">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-2">
                  Job Categories
                </h3>
                <div className="space-y-1">
                  <CategoryLink
                    label="Development"
                    count={120}
                    icon="fa-code"
                  />
                  <CategoryLink label="Design" count={45} icon="fa-pen-nib" />
                  <CategoryLink
                    label="Marketing"
                    count={32}
                    icon="fa-bullhorn"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-2">
                  Work Status
                </h3>
                <div className="space-y-3">
                  <StatusToggle
                    label="Open to Work"
                    sub="Actively looking"
                    color="green"
                    active
                  />
                  <StatusToggle
                    label="Freelancing"
                    sub="Available for gigs"
                    color="purple"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CENTER FEED */}
          <div className="col-span-1 md:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex gap-4 mb-4">
                <img
                  className="h-12 w-12 rounded-2xl object-cover border border-slate-200"
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav"
                  alt="User"
                />
                <div className="flex-grow">
                  <input
                    type="text"
                    placeholder="What's on your mind, Aarav?"
                    value={postInput}
                    onChange={(e) => setPostInput(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100 border-none rounded-2xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition text-slate-700 font-medium"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="flex gap-2">
                  <WidgetAction
                    icon="fa-image"
                    label="Photo"
                    color="text-green-500"
                  />
                  <WidgetAction
                    icon="fa-briefcase"
                    label="Job"
                    color="text-blue-500"
                  />
                  <WidgetAction
                    icon="fa-poll"
                    label="Poll"
                    color="text-orange-500"
                  />
                </div>
                <button
                  onClick={handlePostSubmit}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-2.5 rounded-xl font-black text-sm transition shadow-lg shadow-primary-500/20 active:scale-95"
                >
                  Post
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {posts.map((post) => (
                <FeedPost
                  key={post.id}
                  post={post}
                  onLike={() => toggleLike(post.id)}
                  onCompanyClick={() => onNavigate("companyDetails")}
                />
              ))}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="hidden md:block md:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-black text-slate-900 mb-6 flex items-center gap-3">
                <i className="fas fa-fire text-orange-500"></i> Trending Jobs
              </h3>
              <div className="space-y-5">
                <TrendingItem
                  onClick={() => onNavigate("companyDetails")}
                  title="UI/UX Designer"
                  company="eSewa"
                  location="Kathmandu"
                  applicants="140+"
                  icon="fa-pen-nib"
                />
                <TrendingItem
                  onClick={() => onNavigate("companyDetails")}
                  title="Python Developer"
                  company="Fusemachines"
                  location="Kamaladi"
                  applicants="85"
                  icon="fa-code"
                />
                <TrendingItem
                  onClick={() => onNavigate("companyDetails")}
                  title="Digital Marketing"
                  company="Daraz Nepal"
                  location="Thapathali"
                  applicants="200+"
                  icon="fa-bullhorn"
                />
              </div>
              <button
                onClick={() => onNavigate("jobsPage")}
                className="w-full mt-6 text-xs font-black uppercase tracking-widest text-primary-600 hover:underline text-left"
              >
                View all trends
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-black text-slate-900 mb-6 flex items-center gap-3">
                <i className="fas fa-building text-blue-500"></i> Top Hiring
              </h3>
              <div className="space-y-4">
                <TopHiringItem
                  onClick={() => onNavigate("companyDetails")}
                  name="Verisk Nepal"
                  type="IT Services"
                  jobs={12}
                  logo="https://api.dicebear.com/7.x/identicon/svg?seed=Verisk"
                />
                <TopHiringItem
                  onClick={() => onNavigate("companyDetails")}
                  name="Leapfrog"
                  type="Software"
                  jobs={8}
                  logo="https://api.dicebear.com/7.x/identicon/svg?seed=Leapfrog"
                />
                <TopHiringItem
                  onClick={() => onNavigate("companyDetails")}
                  name="F1Soft"
                  type="FinTech"
                  jobs={15}
                  logo="https://api.dicebear.com/7.x/identicon/svg?seed=F1Soft"
                />
              </div>
              <button
                onClick={() => onNavigate("companiesPage")}
                className="w-full mt-6 text-xs font-black uppercase tracking-widest text-primary-600 hover:underline text-left"
              >
                View all companies
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarNavLink: React.FC<{
  icon: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-4 w-full p-3 rounded-2xl transition-all font-bold ${active ? "bg-primary-50 text-primary-600 border border-primary-100" : "text-slate-500 hover:bg-slate-50"}`}
  >
    <div
      className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-sm ${active ? "bg-white text-primary-600" : "bg-slate-50 text-slate-400"}`}
    >
      <i className={`fas ${icon}`}></i>
    </div>
    <span>{label}</span>
  </button>
);

const CategoryLink: React.FC<{
  label: string;
  count: number;
  icon: string;
}> = ({ label, count, icon }) => (
  <button className="flex items-center justify-between group w-full p-2.5 rounded-xl hover:bg-slate-50 transition">
    <div className="flex items-center gap-3 text-sm font-bold text-slate-600 group-hover:text-primary-600">
      <i
        className={`fas ${icon} w-4 text-center text-slate-400 group-hover:text-primary-500`}
      ></i>{" "}
      {label}
    </div>
    <span className="text-[10px] font-black bg-slate-100 text-slate-500 py-0.5 px-2 rounded-full group-hover:bg-primary-100 group-hover:text-primary-600">
      {count}
    </span>
  </button>
);

const StatusToggle: React.FC<{
  label: string;
  sub: string;
  color: string;
  active?: boolean;
}> = ({ label, sub, color, active }) => (
  <button
    className={`flex items-center justify-between w-full p-3.5 border rounded-2xl transition-all ${active ? `border-${color}-200 bg-${color}-50/50` : "border-slate-100 hover:border-slate-200"}`}
  >
    <div className="flex items-center gap-4 text-left">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${active ? `bg-${color}-100 text-${color}-600` : "bg-slate-100 text-slate-400"}`}
      >
        <i
          className={`fas ${active ? "fa-check" : "fa-circle"} text-[10px]`}
        ></i>
      </div>
      <div>
        <p className="text-sm font-black text-slate-800">{label}</p>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {sub}
        </p>
      </div>
    </div>
    {active && (
      <div
        className={`w-2 h-2 rounded-full bg-${color}-500 shadow-[0_0_8px_rgba(0,0,0,0.2)] animate-pulse`}
      ></div>
    )}
  </button>
);

const WidgetAction: React.FC<{
  icon: string;
  label: string;
  color: string;
}> = ({ icon, label, color }) => (
  <button className="flex items-center gap-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-xl transition text-sm font-bold">
    <i className={`fas ${icon} ${color} text-lg`}></i> {label}
  </button>
);

const FeedPost: React.FC<{
  post: Post;
  onLike: () => void;
  onCompanyClick?: () => void;
}> = ({ post, onLike, onCompanyClick }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 transition hover:shadow-md">
    <div className="flex justify-between items-start mb-6">
      <div className="flex gap-4">
        <img
          src={post.authorAvatar}
          onClick={onCompanyClick}
          className="h-12 w-12 rounded-2xl border border-slate-100 object-cover cursor-pointer"
          alt=""
        />
        <div>
          <h3
            onClick={onCompanyClick}
            className="font-black text-slate-900 text-sm hover:text-primary-600 transition flex items-center gap-2 cursor-pointer"
          >
            {post.author}{" "}
            {post.isVerified && (
              <i className="fas fa-check-circle text-primary-500"></i>
            )}
            {post.authorStatus && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-600 border border-green-100 font-black uppercase tracking-widest">
                {post.authorStatus}
              </span>
            )}
          </h3>
          <p className="text-xs text-slate-400 font-bold leading-none mt-1">
            {post.authorTitle}
          </p>
          <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest mt-2">
            {post.time} • Global
          </p>
        </div>
      </div>
      <button className="text-slate-300 hover:text-slate-600 transition p-2">
        <i className="fas fa-ellipsis-h"></i>
      </button>
    </div>

    <p className="text-sm text-slate-700 mb-6 font-medium leading-relaxed whitespace-pre-line">
      {post.content}
    </p>

    {post.type === "job" && post.jobDetails && (
      <div className="border border-slate-100 rounded-2xl p-6 bg-slate-50/50 mb-6 group cursor-pointer hover:border-primary-200 transition-all relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary-100 rounded-full -mr-12 -mt-12 opacity-40 group-hover:scale-110 transition-transform"></div>
        <div className="flex items-start gap-5 relative z-10">
          <div
            onClick={(e) => {
              e.stopPropagation();
              onCompanyClick?.();
            }}
            className="w-14 h-14 bg-white rounded-2xl border border-slate-100 flex items-center justify-center p-3 shadow-sm hover:scale-105 transition-transform"
          >
            <img
              src={post.authorAvatar}
              className="w-full h-full object-contain"
              alt=""
            />
          </div>
          <div className="flex-1">
            <h4 className="font-black text-slate-900 text-lg group-hover:text-primary-600 transition">
              {post.jobDetails.title}
            </h4>
            <p
              onClick={(e) => {
                e.stopPropagation();
                onCompanyClick?.();
              }}
              className="text-xs font-bold text-slate-500 mb-4 hover:text-primary-600 transition"
            >
              {post.author}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white border border-slate-100 px-3 py-1 rounded-full text-[10px] font-black uppercase text-slate-400 tracking-widest">
                <i className="fas fa-map-marker-alt text-red-400 mr-2"></i>
                {post.jobDetails.location}
              </span>
              <span className="bg-white border border-slate-100 px-3 py-1 rounded-full text-[10px] font-black uppercase text-slate-400 tracking-widest">
                <i className="fas fa-clock text-blue-400 mr-2"></i>
                {post.jobDetails.type}
              </span>
              <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                {post.jobDetails.salary}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-5 border-t border-slate-100 flex justify-end relative z-10">
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-2.5 rounded-2xl text-xs font-black uppercase tracking-[0.15em] shadow-lg shadow-primary-500/20 active:scale-95 transition-all">
            Apply Now
          </button>
        </div>
      </div>
    )}

    {post.type === "poll" && post.pollData && (
      <div className="space-y-3 mb-6">
        {post.pollData.options.map((opt, idx) => {
          const percent = post.pollData
            ? Math.round((opt.votes / post.pollData.totalVotes) * 100)
            : 0;
          return (
            <div key={idx} className="relative cursor-pointer group">
              <div className="flex justify-between text-[11px] font-black uppercase tracking-widest mb-1.5 px-1 relative z-10">
                <span className="text-slate-700">{opt.text}</span>
                <span className="text-slate-400 font-mono">{percent}%</span>
              </div>
              <div className="h-10 w-full bg-slate-50 rounded-xl border border-slate-100 overflow-hidden relative">
                <div
                  className="h-full bg-primary-100 group-hover:bg-primary-200 transition-all border-r border-primary-200"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mt-4 text-right">
          {post.pollData.totalVotes.toLocaleString()} votes • {post.time} left
        </div>
      </div>
    )}

    {post.image && (
      <div className="rounded-2xl overflow-hidden border border-slate-100 mb-6 shadow-sm">
        <img
          src={post.image}
          className="w-full h-auto object-cover max-h-96"
          alt=""
        />
      </div>
    )}

    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-4 mb-4">
      <div className="flex items-center gap-3">
        <div className="flex -space-x-1">
          <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center border-2 border-white shadow-sm">
            <i className="fas fa-thumbs-up text-white text-[8px]"></i>
          </div>
          <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center border-2 border-white shadow-sm">
            <i className="fas fa-heart text-white text-[8px]"></i>
          </div>
        </div>
        <span className="hover:text-primary-600 cursor-pointer">
          {post.likes} Reactions
        </span>
      </div>
      <div className="space-x-4">
        <span className="hover:text-primary-600 cursor-pointer">
          {post.comments} Comments
        </span>
        <span className="hover:text-primary-600 cursor-pointer">
          {post.shares} Reposts
        </span>
      </div>
    </div>

    <div className="grid grid-cols-4 gap-2">
      <ActionBtn
        active={post.likedByMe}
        onClick={onLike}
        icon={post.likedByMe ? "fas fa-thumbs-up" : "far fa-thumbs-up"}
        label="Like"
        activeColor="text-primary-600"
      />
      <ActionBtn icon="far fa-comment-dots" label="Comment" />
      <ActionBtn icon="fas fa-retweet" label="Repost" />
      <ActionBtn icon="far fa-paper-plane" label="Send" />
    </div>
  </div>
);

const ActionBtn: React.FC<{
  icon: string;
  label: string;
  active?: boolean;
  activeColor?: string;
  onClick?: () => void;
}> = ({ icon, label, active, activeColor, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 justify-center py-3 rounded-2xl hover:bg-slate-50 transition-all font-bold text-xs ${active ? activeColor : "text-slate-500"}`}
  >
    <i className={`${icon} text-lg`}></i> <span>{label}</span>
  </button>
);

const TrendingItem: React.FC<{
  title: string;
  company: string;
  location: string;
  applicants: string;
  icon: string;
  onClick?: () => void;
}> = ({ title, company, location, applicants, icon, onClick }) => (
  <div
    onClick={onClick}
    className="group cursor-pointer flex items-start gap-4 pb-4 border-b border-slate-50 last:border-0 last:pb-0"
  >
    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-primary-600 transition-all shadow-sm">
      <i className={`fas ${icon}`}></i>
    </div>
    <div className="flex-1">
      <h4 className="font-black text-sm text-slate-800 group-hover:text-primary-600 transition truncate">
        {title}
      </h4>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
        {company} • {location}
      </p>
      <p className="text-[10px] text-primary-500 font-black uppercase tracking-widest mt-2 flex items-center gap-1">
        <i className="fas fa-users text-[8px]"></i> {applicants} applied
      </p>
    </div>
  </div>
);

const TopHiringItem: React.FC<{
  name: string;
  type: string;
  jobs: number;
  logo: string;
  onClick?: () => void;
}> = ({ name, type, jobs, logo, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-4 cursor-pointer p-2 -mx-2 rounded-2xl hover:bg-slate-50 transition-all group"
  >
    <div className="w-11 h-11 rounded-xl border border-slate-100 bg-white p-2 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform">
      <img src={logo} className="w-full h-full object-contain" alt="" />
    </div>
    <div className="flex-1">
      <h4 className="font-black text-sm text-slate-800 group-hover:text-primary-600 transition truncate">
        {name}
      </h4>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {type}
      </p>
    </div>
    <span className="bg-green-50 text-green-600 text-[10px] font-black px-3 py-1 rounded-full border border-green-100">
      {jobs} Jobs
    </span>
  </div>
);

export default JobFeedPage;

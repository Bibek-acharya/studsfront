import React, { useState, useEffect } from "react";

interface Achievement {
  icon: string;
  title: string;
  desc: string;
  color: string;
}

interface Leader {
  name: string;
  role: string;
  desc: string;
  img: string;
}

interface Review {
  id: number;
  title: string;
  author: string;
  role: string;
  date: string;
  rating: number;
  content: string;
  pros: string;
  cons: string;
}

interface CompanyData {
  id: string;
  name: string;
  logo: string;
  banner: string;
  rating: number;
  reviewsCount: string;
  followers: string;
  website: string;
  description: string;
  tags: string[];
  founded: string;
  headquarters: string;
  size: string;
  industry: string;
  type: string;
  achievements: Achievement[];
  jobsCount: number;
  leaders: Leader[];
  reviews: Review[];
  media: string[];
}

interface CompanyDetailsPageProps {
  onNavigate: (view: any) => void;
}

const mockCompany: CompanyData = {
  id: "ss-pvt-ltd",
  name: "StudSphere Pvt Ltd",
  logo: "SS",
  banner:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
  rating: 4.5,
  reviewsCount: "1.2k",
  followers: "85,400",
  website: "www.studsphere.com",
  description:
    "StudSphere is a global leader in educational technology, dedicated to democratizing access to high-quality learning. Founded in 2020, we have grown from a small startup to a major player in the EdTech space, serving millions of students worldwide. Our mission is to make learning engaging, accessible, and effective for everyone, everywhere. We leverage AI-driven insights to personalize education and bridge the gap between traditional schooling and modern industry requirements. At StudSphere, we believe that education is the most powerful weapon which you can use to change the world.",
  tags: ["EdTech", "E-Learning", "SaaS", "Startup"],
  founded: "2020",
  headquarters: "San Francisco, CA",
  size: "501-1000",
  industry: "EdTech",
  type: "Private",
  achievements: [
    {
      icon: "fa-trophy",
      title: "EdTech Startup of the Year 2024",
      desc: "Recognized by TechCrunch for innovation in AI learning.",
      color: "text-yellow-600 bg-yellow-100",
    },
    {
      icon: "fa-arrow-trend-up",
      title: "Series B Funding Secured",
      desc: "Raised $50M to expand global operations and R&D.",
      color: "text-green-600 bg-green-100",
    },
    {
      icon: "fa-users-viewfinder",
      title: "5 Million Active Learners",
      desc: "Reached a major milestone of active monthly users across 50 countries.",
      color: "text-blue-600 bg-blue-100",
    },
    {
      icon: "fa-medal",
      title: "Best Place to Work 2023",
      desc: "Awarded by Glassdoor for outstanding company culture.",
      color: "text-purple-600 bg-purple-100",
    },
  ],
  jobsCount: 84,
  leaders: [
    {
      name: "Alex Chen",
      role: "CEO & Co-Founder",
      desc: "Ex-Google, Stanford Alum. Visionary leader focused on AI in education.",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Priya Sharma",
      role: "CTO & Co-Founder",
      desc: "Tech veteran with 15 years in scalable systems. Previously VP Eng at EdCorp.",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    },
  ],
  reviews: [
    {
      id: 1,
      title: "Great place for early career!",
      author: "Software Engineer",
      role: "Current Employee",
      date: "2 weeks ago",
      rating: 5,
      content:
        "The mentorship here is amazing. Seniors are always willing to help. The pace is fast, but you learn a lot.",
      pros: "Learning curve, transparent culture, unlimited snacks, flexible timings.",
      cons: "Sometimes long hours during release cycles.",
    },
    {
      id: 2,
      title: "Good benefits, decent pay",
      author: "Product Manager",
      role: "Former Employee",
      date: "1 month ago",
      rating: 4,
      content:
        "Healthcare is top notch. Remote work policy is very flexible. Management listens to feedback.",
      pros: "Health insurance, Work from home, diverse team.",
      cons: "Middle management bureaucracy.",
    },
  ],
  media: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=800&auto=format&fit=crop",
  ],
};

const CompanyDetailsPage: React.FC<CompanyDetailsPageProps> = ({
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isFollowed, setIsFollowed] = useState(false);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "jobs", label: `Jobs`, badge: mockCompany.jobsCount },
    { id: "departments", label: "Departments" },
    { id: "culture", label: "Culture & Benefits" },
    { id: "reviews", label: "Reviews" },
    { id: "leadership", label: "Leadership" },
    { id: "media", label: "Media" },
    { id: "insights", label: "Insights" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <div className="bg-white min-h-screen pt-24 font-jakarta">
      {/* Banner */}
      <div className="h-48 md:h-64 w-full relative overflow-hidden">
        <img
          src={mockCompany.banner}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-4 right-4 sm:right-10 flex gap-3">
          <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <i className="fa-solid fa-trophy text-yellow-300"></i> Best
            Education 2024
          </div>
          <div className="hidden sm:flex bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest items-center gap-2">
            <i className="fa-solid fa-medal text-yellow-300"></i> Top Employer
          </div>
        </div>
      </div>

      {/* Header Info */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-4 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 items-end pb-8">
          <div className="bg-white p-2 rounded-2xl h-32 w-32 md:h-40 md:w-40 shadow-xl border border-slate-100 flex-shrink-0 relative overflow-hidden">
            <div className="h-full w-full bg-slate-900 rounded-2xl flex items-center justify-center text-white text-4xl font-black relative overflow-hidden">
              <span className="z-10">{mockCompany.logo}</span>
              <div className="absolute w-24 h-24 bg-primary-600 rounded-full blur-2xl -top-10 -right-10 opacity-40"></div>
            </div>
            <div className="absolute bottom-2 right-2 h-6 w-6 bg-emerald-500 border-4 border-white rounded-full"></div>
          </div>

          <div className="flex-1 pb-2 pt-4">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight pt-2">
                {mockCompany.name}
              </h1>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg"
                className="w-6 h-6"
                alt="Verified"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-400 mt-2">
              <div className="flex items-center gap-2 text-amber-500">
                <span className="text-slate-900 text-sm">
                  {mockCompany.rating}
                </span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fa-solid fa-star ${i < 4 ? "text-amber-400" : "text-slate-200"}`}
                    ></i>
                  ))}
                </div>
              </div>
              <span className="text-slate-200">|</span>
              <button
                onClick={() => setActiveTab("reviews")}
                className="hover:text-primary-600 transition-colors"
              >
                {mockCompany.reviewsCount} Reviews
              </button>
              <span className="text-slate-200">|</span>
              <a
                href="#"
                className="flex items-center gap-2 hover:text-primary-600 transition-colors"
              >
                <i className="fa-solid fa-globe"></i> {mockCompany.website}
              </a>
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
              {mockCompany.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 bg-slate-50 text-slate-500 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-end gap-3 pb-2 w-full md:w-auto">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {mockCompany.followers} Followers
            </span>
            <button
              onClick={() => setIsFollowed(!isFollowed)}
              className={`w-full md:w-44 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 ${
                isFollowed
                  ? "bg-white border-2 border-primary-600 text-primary-600 shadow-primary-600/5"
                  : "bg-primary-600 text-white shadow-primary-500/20 hover:bg-primary-700"
              }`}
            >
              <i
                className={`fa-solid ${isFollowed ? "fa-check" : "fa-plus"}`}
              ></i>
              {isFollowed ? "Following" : "Follow"}
            </button>
          </div>
        </div>

        {/* Tab Nav */}
        <div className="flex border-b border-slate-100 overflow-x-auto no-scrollbar gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-6 whitespace-nowrap text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === tab.id ? "text-primary-600" : "text-slate-400 hover:text-slate-600"}`}
            >
              {tab.label}{" "}
              {tab.badge && (
                <span
                  className={`ml-2 px-2 py-0.5 rounded-lg text-[10px] ${activeTab === tab.id ? "bg-primary-50 text-primary-600" : "bg-slate-50 text-slate-400"}`}
                >
                  {tab.badge}
                </span>
              )}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary-600 rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="py-12">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-fadeIn">
              <div className="lg:col-span-8 space-y-10">
                <section className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm">
                  <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">
                    About StudSphere
                  </h2>
                  <div
                    className={`text-slate-500 font-medium leading-relaxed mb-6 transition-all ${isAboutExpanded ? "" : "line-clamp-3"}`}
                  >
                    {mockCompany.description}
                  </div>
                  <button
                    onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                    className="text-primary-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:underline"
                  >
                    {isAboutExpanded ? "Read Less" : "Read More"}{" "}
                    <i
                      className={`fa-solid fa-chevron-${isAboutExpanded ? "up" : "down"} text-[10px]`}
                    ></i>
                  </button>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12 pt-10 border-t border-slate-50">
                    <MetaBlock
                      icon="fa-calendar"
                      label="Founded"
                      val={mockCompany.founded}
                      color="blue"
                    />
                    <MetaBlock
                      icon="fa-map-location-dot"
                      label="Headquarters"
                      val={mockCompany.headquarters}
                      color="rose"
                    />
                    <MetaBlock
                      icon="fa-users"
                      label="Size"
                      val={mockCompany.size}
                      color="indigo"
                    />
                    <MetaBlock
                      icon="fa-layer-group"
                      label="Industry"
                      val={mockCompany.industry}
                      color="emerald"
                    />
                    <MetaBlock
                      icon="fa-building"
                      label="Type"
                      val={mockCompany.type}
                      color="orange"
                    />
                  </div>
                </section>

                <section className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm">
                  <h2 className="text-xl font-black text-slate-900 mb-8 tracking-tight uppercase">
                    Key Achievements
                  </h2>
                  <div className="space-y-6">
                    {mockCompany.achievements.map((item, i) => (
                      <div
                        key={i}
                        className="flex gap-6 p-4 rounded-2xl hover:bg-slate-50 transition-colors group"
                      >
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-sm ${item.color}`}
                        >
                          <i className={`fa-solid ${item.icon}`}></i>
                        </div>
                        <div>
                          <h3 className="font-black text-slate-900 text-lg leading-tight group-hover:text-primary-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm font-medium text-slate-400 mt-2">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="lg:col-span-4 space-y-8">
                <div className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-black text-slate-900 text-lg mb-8 tracking-tight uppercase">
                    Contact Info
                  </h3>
                  <div className="space-y-4">
                    <ContactRow
                      icon="fa-envelope"
                      val="contact@studsphere.com"
                    />
                    <ContactRow icon="fa-globe" val="studsphere.com" />
                    <ContactRow icon="fa-location-dot" val="Kathmandu, Nepal" />
                  </div>
                  <div className="flex gap-3 mt-10 justify-center">
                    {["linkedin-in", "twitter", "instagram"].map((s) => (
                      <button
                        key={s}
                        className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:bg-primary-600 hover:text-white transition-all"
                      >
                        <i className={`fa-brands fa-${s}`}></i>
                      </button>
                    ))}
                  </div>
                  <button className="w-full mt-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-black transition-all active:scale-95">
                    Request a Call
                  </button>
                </div>

                <div className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-video shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                    className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border-2 border-white/50 group-hover:scale-110 transition-transform">
                      <i className="fa-solid fa-play ml-1"></i>
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white font-black text-sm uppercase tracking-widest">
                      Life at StudSphere
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "jobs" && (
            <div className="animate-fadeIn">
              <div className="flex flex-col lg:flex-row gap-10">
                <div className="w-full lg:w-72 shrink-0">
                  <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm sticky top-28">
                    <h3 className="font-black text-slate-900 mb-8 uppercase tracking-widest text-xs">
                      Filter Jobs
                    </h3>
                    <div className="space-y-8">
                      <FilterGroup
                        label="Department"
                        options={[
                          "Engineering",
                          "Product",
                          "Design",
                          "Marketing",
                        ]}
                      />
                      <FilterGroup
                        label="Location"
                        options={["Remote", "Kathmandu", "Pokhara"]}
                      />
                      <FilterGroup
                        label="Experience"
                        options={["Entry Level", "Mid-Senior", "Executive"]}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-1 space-y-6">
                  <JobDetailCard
                    featured
                    title="Senior Frontend Engineer"
                    meta="Remote • Full-time • 2 days ago"
                    salary="$120k - $160k"
                    tags={["React", "TypeScript", "Tailwind"]}
                  />
                  <JobDetailCard
                    title="Product Designer"
                    meta="Kathmandu • Full-time • 5 hrs ago"
                    salary="Competitive"
                    tags={["Figma", "UX Research"]}
                  />
                  <JobDetailCard
                    title="Backend Developer (Node.js)"
                    meta="Remote • Contract • 1 day ago"
                    salary="$80k - $110k"
                    tags={["Node.js", "PostgreSQL", "AWS"]}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "departments" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
              <DeptCard
                icon="fa-code"
                name="Engineering"
                count={42}
                desc="Building the core platform, AI engines, and mobile apps."
              />
              <DeptCard
                icon="fa-pen-nib"
                name="Product & Design"
                count={12}
                desc="Crafting intuitive and engaging user experiences."
              />
              <DeptCard
                icon="fa-chart-line"
                name="Sales & Marketing"
                count={18}
                desc="Taking our mission to the global market."
              />
              <DeptCard
                icon="fa-database"
                name="Data Science"
                count={8}
                desc="AI, Machine Learning, and heavy Analytics."
              />
            </div>
          )}

          {activeTab === "culture" && (
            <div className="space-y-16 animate-fadeIn">
              <div className="bg-slate-900 rounded-2xl p-8 md:p-16 relative overflow-hidden shadow-2xl text-white">
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary-600/20 rounded-full blur-[100px] -mr-40 -mt-40 transition-transform duration-700"></div>
                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                  <div className="flex-1 space-y-8">
                    <div className="inline-block px-5 py-1.5 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-300 font-black text-[10px] uppercase tracking-[0.2em]">
                      Our Philosophy
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
                      Work Your Way.
                      <br />
                      Live Your Life.
                    </h2>
                    <p className="text-slate-300 text-lg max-w-xl font-medium leading-relaxed">
                      We don't count hours, we count impact. Choose where and
                      how you work best. Our remote-first culture is built on
                      trust, autonomy, and asynchronous collaboration.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                      <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-xl border border-white/10 backdrop-blur-md">
                        <div className="bg-emerald-500 h-2 w-2 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                        <span className="font-black text-[10px] uppercase tracking-widest text-white">
                          100% Remote Friendly
                        </span>
                      </div>
                      <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-xl border border-white/10 backdrop-blur-md">
                        <div className="bg-primary-500 h-2 w-2 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                        <span className="font-black text-[10px] uppercase tracking-widest text-white">
                          Global Hubs
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2">
                    <div className="relative">
                      <div className="absolute -inset-4 bg-primary-600/20 blur-2xl rounded-3xl"></div>
                      <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                        className="rounded-2xl shadow-2xl relative z-10 border border-white/10 transform rotate-1 hover:rotate-0 transition-transform duration-700"
                        alt="Workspace"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                  Beyond the Paycheck
                </h3>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                  We take care of our people
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 text-left">
                  <BenefitCard
                    icon="fa-heart-pulse"
                    color="rose"
                    title="Health & Wellness"
                    desc="Premium medical, dental, and vision insurance for you and your dependents."
                  />
                  <BenefitCard
                    icon="fa-clock"
                    color="blue"
                    title="Flexible Freedom"
                    desc="Asynchronous work environment. Set your own schedule that fits your life."
                  />
                  <BenefitCard
                    icon="fa-book-open"
                    color="amber"
                    title="Growth Budget"
                    desc="$2,000 annual stipend for courses, books, and conferences."
                  />
                  <BenefitCard
                    icon="fa-baby"
                    color="purple"
                    title="Family Support"
                    desc="16 weeks paid parental leave for all new parents (moms & dads)."
                  />
                  <BenefitCard
                    icon="fa-sack-dollar"
                    color="emerald"
                    title="Equity & 401k"
                    desc="Competitive stock options and 401k matching program."
                  />
                  <BenefitCard
                    icon="fa-laptop"
                    color="orange"
                    title="Home Office"
                    desc="$1,000 setup budget + monthly internet stipend."
                  />
                  <BenefitCard
                    icon="fa-plane"
                    color="pink"
                    title="Team Retreats"
                    desc="Annual all-company retreats to exotic locations."
                  />
                  <BenefitCard
                    icon="fa-paw"
                    color="teal"
                    title="Pet Friendly"
                    desc="Pet insurance support and paw-ternity leave."
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="animate-fadeIn flex flex-col lg:grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit space-y-8">
                <div className="bg-white p-10 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50">
                  <h3 className="font-black text-slate-900 text-lg mb-8 uppercase tracking-widest">
                    Employee Rating
                  </h3>
                  <div className="flex items-center gap-6 mb-10">
                    <div className="text-6xl font-black text-slate-900 leading-none">
                      4.5
                    </div>
                    <div>
                      <div className="text-amber-400 text-xl flex gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fa-solid ${i < 4 ? "fa-star" : "fa-star-half-stroke"}`}
                          ></i>
                        ))}
                      </div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {mockCompany.reviewsCount} Verified Reviews
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <ProgressBlock label="Work-Life Balance" val={96} />
                    <ProgressBlock label="Salary & Benefits" val={90} />
                    <ProgressBlock label="Career Growth" val={84} />
                    <ProgressBlock label="Management" val={80} />
                  </div>

                  <button className="w-full mt-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-black transition-all active:scale-95">
                    Write a Review
                  </button>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-6">
                {mockCompany.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="font-black text-slate-900 text-xl mb-1 group-hover:text-primary-600 transition-colors">
                          {rev.title}
                        </h4>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {rev.role} • {rev.author} • {rev.date}
                        </p>
                      </div>
                      <div className="flex text-amber-400 gap-1">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fa-solid fa-star ${i < rev.rating ? "text-amber-400" : "text-slate-100"}`}
                          ></i>
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-500 font-medium leading-relaxed mb-6">
                      "{rev.content}"
                    </p>
                    <div className="bg-slate-50/50 border border-slate-100 p-6 rounded-2xl space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs shrink-0">
                          <i className="fa-solid fa-check"></i>
                        </div>
                        <div className="text-sm">
                          <span className="font-black text-slate-900 uppercase tracking-widest text-[10px]">
                            Pros:
                          </span>
                          <span className="ml-2 font-medium text-slate-500">
                            {rev.pros}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-xs shrink-0">
                          <i className="fa-solid fa-xmark"></i>
                        </div>
                        <div className="text-sm">
                          <span className="font-black text-slate-900 uppercase tracking-widest text-[10px]">
                            Cons:
                          </span>
                          <span className="ml-2 font-medium text-slate-500">
                            {rev.cons}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full py-6 text-primary-600 font-black text-xs uppercase tracking-[0.2em] border border-primary-100 bg-primary-50/20 rounded-2xl hover:bg-primary-50 transition-all">
                  View all {mockCompany.reviewsCount} reviews
                </button>
              </div>
            </div>
          )}

          {activeTab === "leadership" && (
            <div className="animate-fadeIn">
              <h3 className="text-3xl font-black text-slate-900 mb-10 tracking-tight uppercase">
                Meet the Founders
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mockCompany.leaders.map((leader, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm shadow-slate-200/50 group hover:shadow-2xl hover:border-primary-100 transition-all duration-700"
                  >
                    <div className="h-64 bg-slate-900 relative overflow-hidden">
                      <img
                        src={leader.img}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-90 group-hover:opacity-100"
                        alt={leader.name}
                      />
                      <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent">
                        <h4 className="text-white font-black text-2xl tracking-tight leading-tight">
                          {leader.name}
                        </h4>
                        <p className="text-primary-400 font-black text-[10px] uppercase tracking-widest mt-1">
                          {leader.role}
                        </p>
                      </div>
                    </div>
                    <div className="p-8">
                      <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8">
                        {leader.desc}
                      </p>
                      <a
                        href="#"
                        className="inline-flex items-center gap-3 text-primary-600 font-black text-[10px] uppercase tracking-widest hover:translate-x-1 transition-transform"
                      >
                        <i className="fa-brands fa-linkedin text-lg"></i>
                        LinkedIn Profile
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "media" && (
            <div className="animate-fadeIn">
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {mockCompany.media.map((img, i) => (
                  <div
                    key={i}
                    className="break-inside-avoid rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 group relative cursor-zoom-in"
                  >
                    <img src={img} className="w-full" alt={`Media ${i}`} />
                    <div className="absolute inset-0 bg-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "insights" && (
            <div className="animate-fadeIn space-y-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <InsightStats label="Avg Hiring Time" val="12 days" color="primary" />
                <InsightStats label="Offer Acceptance" val="85%" color="emerald" />
                <InsightStats label="Avg Tenure" val="3.5 yrs" color="purple" />
                <InsightStats label="Internal Promotions" val="40%" color="orange" />
              </div>

              <div className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-black text-slate-900 text-lg mb-8 uppercase tracking-widest">
                  Top Skills We Are Hiring For
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "React.js",
                    "Python",
                    "Machine Learning",
                    "Kubernetes",
                    "Product Strategy",
                    "UX Research",
                    "GoLang",
                    "AWS",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-5 py-2.5 bg-slate-50 text-slate-500 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-primary-100 hover:bg-primary-50 hover:text-primary-600 transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary-600 to-indigo-800 p-12 rounded-[2rem] text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="max-w-2xl text-center md:text-left">
                    <h3 className="text-3xl font-black mb-4 tracking-tight">
                      Career Growth at StudSphere
                    </h3>
                    <p className="text-primary-100 font-medium text-lg opacity-90 leading-relaxed">
                      We prioritize internal mobility. 40% of our leadership
                      roles are filled internally. Join as an engineer, grow
                      into an architect or manager. We invest in your long-term success.
                    </p>
                  </div>
                  <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl text-[10px] uppercase tracking-[0.25em] shadow-xl hover:bg-primary-50 transition-all active:scale-95 whitespace-nowrap">
                    View Career Paths
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "faq" && (
            <div className="animate-fadeIn max-w-4xl mx-auto space-y-4">
              <h3 className="text-3xl font-black text-slate-900 mb-10 tracking-tight uppercase text-center">
                Frequently Asked Questions
              </h3>
              {[
                {
                  q: "What is the hiring process like?",
                  a: "Typically involves 3-4 rounds: Recruiter Screen, Technical/Role Screen, Onsite (Virtual) Loop, and Cultural Fit interview. Process takes 2-3 weeks.",
                },
                {
                  q: "Do you sponsor visas?",
                  a: "Yes, for specific technical roles and senior leadership positions, we offer visa sponsorship and relocation assistance depending on the location.",
                },
                {
                  q: "What is the remote work policy?",
                  a: "We are remote-first! You can work from anywhere within the country of employment. We also have optional office hubs for collaboration in key cities.",
                },
                {
                  q: "Do you provide relocation assistance?",
                  a: "Yes, for roles that require a presence in one of our main hubs, we provide a comprehensive relocation package including travel and temporary stay.",
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  <button className="w-full text-left p-6 font-black text-slate-900 flex justify-between items-center group">
                    <span className="text-sm uppercase tracking-widest">{faq.q}</span>
                    <i className="fa-solid fa-chevron-down text-slate-300 group-hover:text-primary-600 transition-colors"></i>
                  </button>
                  <div className="px-6 pb-6 pt-0 text-sm font-medium text-slate-500 leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <section className="bg-slate-900 rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl mb-12 group/fcta">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] -mr-48 -mb-48 transition-transform duration-1000 group-hover/fcta:scale-110"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight">
              Ready to <span className="text-primary-400">level up</span> your career?
            </h2>
            <p className="text-primary-100/60 text-lg mb-12 max-w-2xl mx-auto font-black uppercase tracking-[0.2em] text-[10px]">
              Join the core team building the future of intelligence at Studsphere.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button
                onClick={() => onNavigate("jobsPage")}
                className="px-12 py-5 bg-primary-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-primary-950/20 hover:bg-primary-500 transition-all active:scale-95 group"
              >
                Join Now <i className="fa-solid fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform"></i>
              </button>
              <button
                onClick={() => onNavigate("jobsPage")}
                className="px-12 py-5 bg-white/5 text-white border border-white/10 backdrop-blur-xl font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] hover:bg-white/10 transition-all active:scale-95"
              >
                Learn More
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const MetaBlock: React.FC<{
  icon: string;
  label: string;
  val: string;
  color: string;
}> = ({ icon, label, val, color }) => (
  <div className="flex items-center gap-4">
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg shadow-sm border ${
        color === "blue" ? "bg-blue-50 text-blue-600 border-blue-100" :
        color === "rose" ? "bg-rose-50 text-rose-600 border-rose-100" :
        color === "indigo" ? "bg-indigo-50 text-indigo-600 border-indigo-100" :
        color === "emerald" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
        "bg-orange-50 text-orange-600 border-orange-100"
      }`}
    >
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-0.5">
        {label}
      </p>
      <p className="text-sm font-black text-slate-800">{val}</p>
    </div>
  </div>
);

const BenefitCard: React.FC<{
  icon: string;
  color: string;
  title: string;
  desc: string;
}> = ({ icon, color, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all group">
    <div
      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl mb-6 shadow-sm border ${
        color === "rose"
          ? "bg-rose-50 text-rose-500 border-rose-100"
          : color === "blue"
            ? "bg-blue-50 text-blue-500 border-blue-100"
            : color === "amber"
              ? "bg-amber-50 text-amber-600 border-amber-100"
              : color === "purple"
                ? "bg-purple-50 text-purple-500 border-purple-100"
                : color === "emerald"
                  ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                  : color === "orange"
                    ? "bg-orange-50 text-orange-500 border-orange-100"
                    : color === "pink"
                      ? "bg-pink-50 text-pink-500 border-pink-100"
                      : "bg-teal-50 text-teal-600 border-teal-100"
      }`}
    >
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <h4 className="font-black text-slate-900 text-lg mb-2 uppercase tracking-tight group-hover:text-primary-600 transition-colors">
      {title}
    </h4>
    <p className="text-xs font-medium text-slate-400 leading-relaxed uppercase tracking-wider">
      {desc}
    </p>
  </div>
);

const ProgressBlock: React.FC<{ label: string; val: number }> = ({
  label,
  val,
}) => (
  <div>
    <div className="flex justify-between text-[10px] font-black text-slate-900 uppercase tracking-widest mb-2">
      <span>{label}</span>
      <span>{val / 10} / 10</span>
    </div>
    <div className="h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
      <div
        className="h-full bg-primary-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.3)] transition-all duration-1000"
        style={{ width: `${val}%` }}
      ></div>
    </div>
  </div>
);

const InsightStats: React.FC<{ label: string; val: string; color: string }> = ({
  label,
  val,
  color,
}) => (
  <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center shadow-sm hover:shadow-xl transition-all duration-500">
    <div
      className={`text-2xl font-black mb-1 leading-none ${
        color === "primary"
          ? "text-primary-600"
          : color === "emerald"
            ? "text-emerald-600"
            : color === "purple"
              ? "text-purple-600"
              : "text-orange-600"
      }`}
    >
      {val}
    </div>
    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
      {label}
    </div>
  </div>
);

const ContactRow: React.FC<{ icon: string; val: string }> = ({ icon, val }) => (
  <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-primary-100 transition-all cursor-pointer group">
    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm group-hover:text-primary-600 transition-colors">
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">
      {val}
    </span>
  </div>
);

const FilterGroup: React.FC<{ label: string; options: string[] }> = ({
  label,
  options,
}) => (
  <div>
    <label className="block text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">
      {label}
    </label>
    <div className="space-y-3">
      {options.map((opt) => (
        <label
          key={opt}
          className="flex items-center gap-4 cursor-pointer group/opt"
        >
          <input
            type="checkbox"
            className="w-5 h-5 rounded border-2 border-slate-200 text-primary-600 focus:ring-primary-500"
          />
          <span className="text-sm font-bold text-slate-500 group-hover/opt:text-primary-600 transition-colors">
            {opt}
          </span>
        </label>
      ))}
    </div>
  </div>
);

const JobDetailCard: React.FC<{
  featured?: boolean;
  title: string;
  meta: string;
  salary: string;
  tags: string[];
}> = ({ featured, title, meta, salary, tags }) => (
  <div
    className={`bg-white p-8 rounded-2xl border transition-all duration-300 group hover:shadow-2xl relative overflow-hidden ${featured ? "border-amber-200 shadow-xl" : "border-slate-100 shadow-sm"}`}
  >
    {featured && (
      <div className="absolute top-0 right-0 bg-amber-200 px-4 py-1.5 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2">
        <i className="fa-solid fa-bolt"></i> Featured
      </div>
    )}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div className="flex gap-6 items-center">
        <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg">
          S
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-900 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">
            {meta}
          </p>
        </div>
      </div>
      <button className="bg-primary-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all active:scale-95">
        Apply Now
      </button>
    </div>
    <div className="mt-8 pt-6 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="px-4 py-1.5 bg-primary-50 text-primary-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-primary-100"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100">
        <i className="fa-solid fa-money-bill-wave"></i> {salary}
      </div>
    </div>
  </div>
);

const DeptCard: React.FC<{
  icon: string;
  name: string;
  count: number;
  desc: string;
}> = ({ icon, name, count, desc }) => (
  <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-2xl hover:border-primary-100 transition-all duration-500 group cursor-pointer flex flex-col">
    <div className="flex justify-between items-start mb-8">
      <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:bg-primary-600 group-hover:text-white transition-all">
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <span className="bg-slate-50 text-slate-400 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest group-hover:bg-primary-50 group-hover:text-primary-600 transition-all">
        {count} Vacancies
      </span>
    </div>
    <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
      {name}
    </h3>
    <p className="text-sm font-medium text-slate-500 leading-relaxed flex-grow">
      {desc}
    </p>
    <div className="mt-8 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary-600 opacity-0 group-hover:opacity-100 transition-all">
      Browse Jobs <i className="fa-solid fa-arrow-right"></i>
    </div>
  </div>
);

export default CompanyDetailsPage;

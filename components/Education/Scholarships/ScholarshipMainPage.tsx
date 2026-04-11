import React, { useMemo, useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "../../../services/api";
import ScholarshipListCard from "./ScholarshipListCard";
import ScholarshipApplicationPage from "./ScholarshipApplicationPage";
import TestimonialsSection from "../landing/TestimonialsSection";

interface Scholarship {
  id: number;
  title: string;
  provider: string;
  logoColor: string;
  initials: string;
  location: string;
  type: string;
  amount: string;
  deadline: string;
  status: string;
  category: string;
  description: string;
  image: string;
  eligibility: string;
}

const defaultScholarships: Scholarship[] = [
  {
    id: 1,
    title: "Future Tech Leaders Grant",
    provider: "TechFoundation Global",
    logoColor: "bg-blue-600",
    initials: "TG",
    location: "San Francisco, CA",
    type: "MERIT-BASED",
    amount: "$15,000",
    deadline: "Oct 15, 2024",
    status: "OPEN",
    category: "Technology",
    description:
      "Supports outstanding undergraduate students pursuing degrees in Computer Science, Engineering, or Data Science.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
    eligibility: "GPA 3.5+",
  },
  {
    id: 2,
    title: "Women in STEM Initiative",
    provider: "Global Science Alliance",
    logoColor: "bg-pink-600",
    initials: "GS",
    location: "London, UK",
    type: "FULL TUITION",
    amount: "$25,000",
    deadline: "Mar 01, 2024",
    status: "CLOSING SOON",
    category: "Science",
    description:
      "Dedicated to empowering women in science and mathematics. This scholarship covers full tuition for one academic year.",
    image:
      "https://images.unsplash.com/photo-1573166368361-3f5231646f25?q=80&w=2069&auto=format&fit=crop",
    eligibility: "Female Undergrad",
  },
  {
    id: 3,
    title: "Community Arts Fund",
    provider: "National Arts Council",
    logoColor: "bg-purple-600",
    initials: "NA",
    location: "New York, NY",
    type: "GRANT",
    amount: "$5,000",
    deadline: "Jan 15, 2024",
    status: "CLOSED",
    category: "Arts",
    description:
      "For students demonstrating exceptional talent in visual or performing arts who have contributed significantly.",
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2080&auto=format&fit=crop",
    eligibility: "Portfolio Required",
  },
  {
    id: 4,
    title: "Global Business Merit",
    provider: "Enterprise Corp",
    logoColor: "bg-emerald-600",
    initials: "EC",
    location: "Remote / Online",
    type: "MERIT-BASED",
    amount: "$10,000",
    deadline: "Nov 30, 2024",
    status: "OPEN",
    category: "Business",
    description:
      "Awarded to MBA students with a strong track record of entrepreneurial spirit and business leadership.",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop",
    eligibility: "MBA Students",
  },
  {
    id: 5,
    title: "Medical Research Fellow",
    provider: "HealthFirst Institute",
    logoColor: "bg-red-600",
    initials: "HF",
    location: "Boston, MA",
    type: "FELLOWSHIP",
    amount: "$50,000",
    deadline: "Feb 28, 2024",
    status: "CLOSING SOON",
    category: "Medicine",
    description:
      "A prestigious grant for postgraduate students conducting breakthrough research in immunology.",
    image:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1932&auto=format&fit=crop",
    eligibility: "PhD Candidates",
  },
  {
    id: 6,
    title: "Athletic Excellence Award",
    provider: "Sports United",
    logoColor: "bg-orange-600",
    initials: "SU",
    location: "Chicago, IL",
    type: "PERFORMANCE",
    amount: "$8,000",
    deadline: "Sep 01, 2024",
    status: "OPEN",
    category: "Sports",
    description:
      "Recognizing student-athletes who balance high performance in sports with academic excellence.",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop",
    eligibility: "Varsity Athletes",
  },
];

interface ScholarshipMainPageProps {
  onNavigate: (view: any, data?: any) => void;
}

type ApplicationSelection = {
  id: string;
  scholarshipName: string;
  scholarshipType: string;
};

const scholarshipLogoPalette = [
  "bg-blue-600",
  "bg-pink-600",
  "bg-emerald-600",
  "bg-purple-600",
  "bg-orange-600",
  "bg-red-600",
  "bg-cyan-600",
  "bg-indigo-600",
];

const categoryColorClasses: Record<string, { text: string; badge: string }> = {
  blue: { text: "text-blue-600", badge: "bg-blue-50 text-blue-700" },
  indigo: { text: "text-indigo-600", badge: "bg-indigo-50 text-indigo-700" },
  emerald: { text: "text-emerald-600", badge: "bg-emerald-50 text-emerald-700" },
  amber: { text: "text-amber-600", badge: "bg-amber-50 text-amber-700" },
  purple: { text: "text-purple-600", badge: "bg-purple-50 text-purple-700" },
  rose: { text: "text-rose-600", badge: "bg-rose-50 text-rose-700" },
  cyan: { text: "text-cyan-600", badge: "bg-cyan-50 text-cyan-700" },
  teal: { text: "text-teal-600", badge: "bg-teal-50 text-teal-700" },
};

const toInitials = (value: string) => {
  const parts = value
    .split(" ")
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length === 0) return "SS";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
};

const formatDeadline = (value?: string) => {
  if (!value) return "TBD";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const inferStatus = (value?: string) => {
  if (value) return value;
  return "OPEN";
};

const defaultCategories = [
  {
    id: "college",
    title: "College-Based",
    subtitle: "12 Scholarships Open",
    desc: "Direct aid from universities for enrolled students.",
    icon: "fa-building-columns",
    color: "blue",
  },
  {
    id: "school",
    title: "School-Based",
    subtitle: "25 Scholarships Open",
    desc: "For students excelling in secondary education.",
    icon: "fa-graduation-cap",
    color: "indigo",
  },
  {
    id: "institutional",
    title: "Institutional Merit",
    subtitle: "50+ Awards Available",
    desc: "Awarded to students with outstanding academic achievements.",
    icon: "fa-medal",
    color: "emerald",
  },
  {
    id: "need",
    title: "Institutional Need",
    subtitle: "100+ Grants Open",
    desc: "Financial aid for students demonstrating significant financial need.",
    icon: "fa-hand-holding-heart",
    color: "amber",
  },
  {
    id: "entrance",
    title: "Entrance",
    subtitle: "10 Top Ranker Awards",
    desc: "Scholarships for top rankers in IOE, IOM, and exams.",
    icon: "fa-pencil",
    color: "purple",
  },
  {
    id: "ngo",
    title: "NGO / INGO",
    subtitle: "8 Partner Programs",
    desc: "Supported by international and national organizations.",
    icon: "fa-globe",
    color: "rose",
  },
  {
    id: "departmental",
    title: "Departmental",
    subtitle: "45 Specific Grants",
    desc: "Specific to faculties like Engineering, Medicine, and IT.",
    icon: "fa-laptop-code",
    color: "cyan",
  },
  {
    id: "fee-waiver",
    title: "Fee Waiver",
    subtitle: "Financial Aid Available",
    desc: "Full or partial tuition fee waivers for deserving candidates.",
    icon: "fa-file-invoice-dollar",
    color: "teal",
  },
];

const ScholarshipMainPage: React.FC<ScholarshipMainPageProps> = ({
  onNavigate,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedScholarship, setSelectedScholarship] =
    useState<Scholarship | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [applicationSelection, setApplicationSelection] = useState<ApplicationSelection | null>(null);
  const [likedScholarships, setLikedScholarships] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: scholarshipsResponse } = useQuery({
    queryKey: ["education-scholarships"],
    queryFn: () => apiService.getEducationScholarships(),
  });

  const scholarships = useMemo<Scholarship[]>(() => {
    const apiScholarships = scholarshipsResponse?.data?.scholarships as
      | Record<string, any>[]
      | undefined;

    if (!apiScholarships?.length) {
      return defaultScholarships;
    }

    return apiScholarships.map((item, index) => {
      const fallbackTitle = item?.title || "Scholarship Opportunity";
      const fallbackProvider = item?.provider || "Scholarship Provider";
      return {
        id: Number(item?.id) || index + 1,
        title: fallbackTitle,
        provider: fallbackProvider,
        logoColor: item?.logoColor || scholarshipLogoPalette[index % scholarshipLogoPalette.length],
        initials: item?.initials || toInitials(fallbackProvider),
        location: item?.location || "Nepal",
        type: item?.type || item?.funding_type || "MERIT-BASED",
        amount: item?.amount || item?.value || "TBD",
        deadline: formatDeadline(item?.deadline),
        status: inferStatus(item?.status),
        category: item?.category || item?.scholarship_type || "General",
        description: item?.description || "Scholarship details are available.",
        image:
          item?.image ||
          item?.image_url ||
          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
        eligibility: item?.eligibility || item?.degree_level || "Eligible students",
      };
    });
  }, [scholarshipsResponse]);

  const categories = useMemo(() => {
    const apiCategories = scholarshipsResponse?.data?.categories;
    if (!apiCategories?.length) {
      return defaultCategories;
    }

    return apiCategories.map((category: any) => ({
      id: category.id,
      title: category.title || category.name,
      subtitle: category.subtitle || `${category.count}+ Scholarships Open`,
      desc: category.desc || "Scholarship opportunities available.",
      icon: category.icon || "fa-medal",
      color: category.color || "blue",
    }));
  }, [scholarshipsResponse]);

  const heroSlides = [
    {
      img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop",
      title: "Find Your Perfect College",
      desc: "Discover top-rated institutions, compare admission criteria, and apply to your dream program—all in one place.",
    },
    {
      img: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop",
      title: "Find Your Perfect College",
      desc: "Discover top-rated institutions, compare admission criteria, and apply to your dream program—all in one place.",
    },
    {
      img: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=1974&auto=format&fit=crop",
      title: "Find Your Perfect College",
      desc: "Discover top-rated institutions, compare admission criteria, and apply to your dream program—all in one place.",
    },
    {
      img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
      title: "Find Your Perfect College",
      desc: "Discover top-rated institutions, compare admission criteria, and apply to your dream program—all in one place.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    onNavigate("scholarshipCategory", { query: searchQuery });
  };

  const openCategoryModal = (category: any) => {
    onNavigate("scholarshipCategory", { category: category.id || category.title });
  };

  const openDetails = (scholarship: Scholarship) => {
    onNavigate("scholarshipHubDetails", { id: scholarship.id.toString() });
  };

  const toggleLike = (id: number) => {
    setLikedScholarships((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const openApplicationModal = (selection: ApplicationSelection) => {
    setApplicationSelection(selection);
    setIsApplicationModalOpen(true);
  };

  return (
    <div className="w-full text-slate-600 bg-slate-50 font-inter min-h-screen pt-10">
      {/* Hero Section */}
      <div className="w-full flex justify-center p-4 sm:p-8">
        <div className="relative w-full max-w-350 aspect-[16/10] sm:aspect-[16/8] min-h-[500px] bg-slate-800 rounded-2xl shadow-2xl flex flex-col justify-center items-center text-center overflow-hidden group">
          {/* Slider Track */}
          <div className="absolute inset-0 z-0">
            <div
              className="flex h-full w-full transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {heroSlides.map((slide, index) => (
                <div key={index} className="min-w-full h-full relative">
                  <img
                    src={slide.img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="z-10 w-full max-w-3xl flex flex-col items-center gap-6 translate-y-[-20px] px-4">
            <div className="space-y-4">
              <h1 className="text-white text-4xl md:text-5xl font-bold tracking-tight drop-shadow-md">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-gray-100 text-lg font-normal max-w-xl mx-auto leading-relaxed drop-shadow-sm">
                {heroSlides[currentSlide].desc}
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full max-w-2xl mt-4 relative group z-20">
              <div className="bg-white rounded-2xl flex items-center p-2 pl-4 h-[68px] shadow-2xl transition-transform duration-200 focus-within:scale-[1.01]">
                <div className="text-gray-400 mr-3">
                  <i className="fa-solid fa-search text-xl"></i>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-slate-900 font-bold text-base h-full placeholder-gray-400"
                  placeholder="Search by college name, location & program..."
                />
                <button
                  onClick={handleSearch}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-black py-3 px-8 rounded-xl h-[52px] ml-2 transition-all duration-200 shadow-xl shadow-primary-600/30 uppercase tracking-widest text-xs"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Recent Searches */}
            <div className="text-sm text-gray-300 mt-2 drop-shadow-sm">
              <span className="font-normal">Recent Searches:</span>
              {[
                "Harvard University",
                "Stanford University",
                "MIT",
                "Yale University",
              ].map((term, i) => (
                <React.Fragment key={term}>
                  <span
                    className="text-white font-semibold ml-1 cursor-pointer hover:underline hover:text-blue-200"
                    onClick={() => {
                      setSearchQuery(term);
                      handleSearch();
                    }}
                  >
                    {term}
                  </span>
                  {i < 3 && <span className="text-white">, </span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 z-20">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                className={`transition-all duration-300 shadow-sm rounded-full ${currentSlide === i ? "w-8 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/50 hover:bg-white"}`}
                onClick={() => setCurrentSlide(i)}
              />
            ))}
          </div>

          <button className="absolute z-20 bottom-8 right-8 bg-white text-primary-600 font-black text-[10px] py-3 px-6 rounded-full shadow-2xl flex items-center gap-2 hover:bg-gray-50 transition-all transform hover:-translate-y-1 uppercase tracking-widest">
            College Website
            <i className="fa-solid fa-external-link text-[10px]"></i>
          </button>
        </div>
      </div>

      {/* Partners Section */}
      <div className="w-full mb-12 overflow-hidden py-12 relative max-w-350 mx-auto">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <div className="text-center mb-10 px-4">
          <h3 className="text-3xl font-bold text-slate-900 mb-3 uppercase tracking-tight">
            Our Partners
          </h3>
          <p className="text-slate-500 text-sm">
            Trusted by leading educational institutions and organizations
            worldwide.
          </p>
        </div>

        <div className="relative w-full flex overflow-x-hidden group">
          <div className="flex gap-16 whitespace-nowrap py-4 items-center animate-scroll">
            {/* Logos - simple text-based SVG logos for placeholder */}
            {[1, 2].map((group) => (
              <React.Fragment key={group}>
                <div className="h-8 flex items-center cursor-pointer text-[#FF4F00] font-black text-2xl tracking-tighter">
                  zapier
                </div>
                <div className="h-8 flex items-center cursor-pointer text-[#1DB954] font-black text-2xl tracking-tighter italic">
                  Spotify
                </div>
                <div className="h-8 flex items-center cursor-pointer text-[#2D8CFF] font-black text-2xl tracking-tighter">
                  zoom
                </div>
                <div className="h-8 flex items-center cursor-pointer text-black font-black text-2xl tracking-tighter flex items-center gap-1">
                  amazon <span className="text-[#FF9900]">smile</span>
                </div>
                <div className="h-8 flex items-center cursor-pointer text-[#FF0000] font-black text-2xl tracking-tighter">
                  Adobe
                </div>
                <div className="h-8 flex items-center cursor-pointer text-[#E50914] font-black text-2xl tracking-tighter">
                  NETFLIX
                </div>
                <div className="h-8 flex items-center cursor-pointer text-[#4285F4] font-black text-2xl tracking-tighter">
                  Google
                </div>
                <div className="h-8 flex items-center cursor-pointer text-[#E24329] font-black text-2xl tracking-tighter">
                  GitLab
                </div>
                <div className="h-8 flex items-center cursor-pointer text-black font-black text-2xl tracking-tighter">
                  Notion
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="w-full bg-white py-16 px-4 md:px-8 lg:px-16 font-inter relative z-10 border-y border-slate-100">
        <div className="max-w-350 w-full mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Scholarship Categories
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Browse our funding categories to find the perfect aid for your
              academic journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="group bg-slate-50 p-7 rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer flex items-center border border-slate-100 hover:border-primary-500/20"
                onClick={() => openCategoryModal(cat)}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-white shadow-sm group-hover:bg-primary-600 group-hover:text-white transition-all duration-500 shrink-0 ${
                    categoryColorClasses[cat.color]?.text || "text-blue-600"
                  }`}
                >
                  <i className={`fa-solid ${cat.icon} text-2xl`}></i>
                </div>
                <div className="ml-5 flex-grow">
                  <h3 className="font-black text-slate-900 text-base group-hover:text-primary-600 transition-colors tracking-tight">
                    {cat.title}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-black tracking-[0.12em]">
                    {cat.subtitle}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-300 group-hover:bg-primary-600 group-hover:text-white shadow-sm transition-all duration-500">
                  <i className="fa-solid fa-arrow-right -rotate-45 group-hover:rotate-0 transition-transform"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Scholarships */}
      <main
        className="max-w-350 w-full mx-auto px-4 sm:px-6 lg:px-8 py-20"
        id="scholarship-grid"
      >
        <div className="mb-14 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 uppercase tracking-tight">
            Featured Scholarships
          </h2>
          <p className="text-slate-500 mt-3 text-lg">
            Find and apply for financial aid opportunities worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {scholarships.slice(0, 8).map((item) => (
            <ScholarshipListCard
              key={item.id}
              item={{
                id: item.id,
                title: item.title,
                provider: item.provider,
                type: item.type,
                status: item.status,
                amount: item.amount,
                location: item.location,
                eligibility: item.eligibility,
                deadline: item.deadline,
                image: item.image,
                verified: true,
              }}
              isBookmarked={likedScholarships.includes(item.id)}
              onToggleBookmark={toggleLike}
              onDetails={() => openDetails(item)}
              onApply={(id, title, type) =>
                openApplicationModal({
                  id: id.toString(),
                  scholarshipName: title,
                  scholarshipType: type,
                })
              }
            />
          ))}
        </div>
      </main>

   
      <section className="w-full bg-white py-16 relative overflow-hidden border-y border-slate-100">
        <TestimonialsSection />
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl w-full mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-black text-slate-900  tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "How do I apply for scholarships?",
              a: "Applying is simple! First, create a free account and complete your student profile. Once logged in, browse the scholarships that match your criteria. Click the 'Apply Now' button on any scholarship card to view specific requirements.",
            },
            {
              q: "Is UniPath totally free for students?",
              a: "Yes! Searching and applying for scholarships is completely free for students. We believe education should be accessible to everyone.",
            },
            {
              q: "Is there a limit to how many I can apply for?",
              a: "Absolutely not. There is no limit to the number of scholarships you can apply for through UniPath. In fact, we encourage you to apply to as many as you are eligible for.",
            },
            {
              q: "When and how are winners announced?",
              a: "Each scholarship has its own specific timeline set by the provider. Generally, winners are announced 1-3 months after the application deadline.",
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="group bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all duration-500 open:shadow-[0_40px_80px_rgba(0,0,0,0.06)] open:bg-white"
            >
              <summary className="flex justify-between items-center font-black cursor-pointer list-none p-5 text-slate-800 text-base hover:bg-slate-50 transition-colors  tracking-tight select-none">
                <span className="group-open:text-primary-600 transition-colors">
                  {faq.q}
                </span>
                <span className="transition-transform duration-700 group-open:rotate-180 bg-slate-100 rounded-xl p-3 text-slate-400 group-open:text-primary-600 group-open:bg-primary-50">
                  <i className="fa-solid fa-chevron-down text-base"></i>
                </span>
              </summary>
              <div className="text-slate-500 px-5 pb-6 pt-1 leading-relaxed font-medium text-sm">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Category Modal */}
      {isCategoryModalOpen && selectedCategory && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl"
            onClick={() => setIsCategoryModalOpen(false)}
          />
          <div className="bg-white w-full max-w-xl rounded-2xl p-16 relative z-10 shadow-2xl animate-in zoom-in-95 duration-500 border border-white/20">
            <button
              onClick={() => setIsCategoryModalOpen(false)}
              className="absolute top-10 right-10 text-slate-400 hover:text-slate-900 transition-all bg-slate-50 p-4 rounded-2xl"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
            <div className="text-center">
              <div
                className={`w-24 h-24 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-10 shadow-inner ${
                  categoryColorClasses[selectedCategory.color]?.text || "text-blue-600"
                }`}
              >
                <i className={`fa-solid ${selectedCategory.icon} text-4xl`}></i>
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-3 uppercase tracking-tight">
                {selectedCategory.title}
              </h3>
              <span
                className={`inline-block px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 ${
                  categoryColorClasses[selectedCategory.color]?.badge || "bg-blue-50 text-blue-700"
                }`}
              >
                {selectedCategory.subtitle}
              </span>
              <p className="text-slate-500 mb-10 text-lg font-medium leading-relaxed">
                {selectedCategory.desc}
              </p>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className={`w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 uppercase tracking-[0.2em] active:scale-95`}
              >
                View Opportunities
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {isDetailsModalOpen && selectedScholarship && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl"
            onClick={() => setIsDetailsModalOpen(false)}
          />
          <div className="bg-white w-full max-w-3xl rounded-2xl overflow-hidden relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-700 border border-white/20">
            <div className="relative h-80">
              <img
                src={selectedScholarship.image}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="absolute top-10 right-10 text-slate-400 hover:text-slate-900 transition-all bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl"
              >
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>

            <div className="px-10 pb-12 -mt-10 relative">
              <div className="flex gap-5 items-end mb-8">
                <div
                  className={`w-20 h-20 rounded-2xl ${selectedScholarship.logoColor} text-white flex items-center justify-center text-2xl font-black shadow-2xl border-4 border-white`}
                >
                  {selectedScholarship.initials}
                </div>
                <div className="mb-2">
                  <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight leading-none mb-2">
                    {selectedScholarship.title}
                  </h3>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                    {selectedScholarship.provider}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-10">
                <span className="px-4 py-2 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full uppercase tracking-widest">
                  {selectedScholarship.status}
                </span>
                <span className="px-4 py-2 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full uppercase tracking-widest">
                  {selectedScholarship.type}
                </span>
                <span className="px-4 py-2 bg-slate-50 text-slate-500 text-[10px] font-black rounded-full uppercase tracking-widest">
                  {selectedScholarship.category}
                </span>
              </div>

              <p className="text-slate-500 mb-10 leading-relaxed text-lg font-medium">
                {selectedScholarship.description}
              </p>

              <div className="grid grid-cols-2 gap-6 mb-12 bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <div>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">
                    Award Amount
                  </p>
                  <p className="text-3xl font-black text-blue-600 tracking-tighter">
                    {selectedScholarship.amount}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">
                    Deadline
                  </p>
                  <p className="text-xl font-black text-slate-900 uppercase tracking-tight">
                    {selectedScholarship.deadline}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">
                    Eligibility
                  </p>
                  <p className="text-lg font-bold text-slate-700 uppercase tracking-tight">
                    {selectedScholarship.eligibility}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">
                    Location
                  </p>
                  <p className="text-lg font-bold text-slate-700 uppercase tracking-tight">
                    {selectedScholarship.location}
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <button
                  onClick={() =>
                    openApplicationModal({
                      id: selectedScholarship.id.toString(),
                      scholarshipName: selectedScholarship.title,
                      scholarshipType: selectedScholarship.type,
                    })
                  }
                  className="flex-[2] bg-primary-600 text-white font-black py-6 rounded-2xl hover:bg-primary-700 transition-all shadow-[0_25px_50px_rgba(37,99,235,0.3)] uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 active:scale-95"
                >
                  Secure Scholarship{" "}
                  <i className="fa-solid fa-arrow-up-right-from-square text-sm"></i>
                </button>
                <button
                  onClick={() => setIsDetailsModalOpen(false)}
                  className="flex-1 bg-slate-100 text-slate-400 font-black py-6 rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-[0.3em] text-xs active:scale-95"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isApplicationModalOpen && applicationSelection && (
        <ScholarshipApplicationPage
          onClose={() => setIsApplicationModalOpen(false)}
          scholarshipId={applicationSelection.id}
          scholarshipName={applicationSelection.scholarshipName}
          onNavigate={onNavigate}
        />
      )}

      {/* Newsletter (Already implemented in Footer but I can add a specific one or just rely on footer) */}

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          display: flex;
          width: 200%;
          animation: scroll 40s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ScholarshipMainPage;

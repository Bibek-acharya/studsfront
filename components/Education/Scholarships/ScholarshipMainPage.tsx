import React, { useMemo, useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "../../../services/api";

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

const defaultCategories = [
  {
    title: "College-Based",
    subtitle: "12 Scholarships Open",
    desc: "Direct aid from universities for enrolled students.",
    icon: "fa-building-columns",
    color: "blue",
  },
  {
    title: "School-Based",
    subtitle: "25 Scholarships Open",
    desc: "For students excelling in secondary education.",
    icon: "fa-graduation-cap",
    color: "indigo",
  },
  {
    title: "Institutional Merit",
    subtitle: "50+ Awards Available",
    desc: "Awarded to students with outstanding academic achievements.",
    icon: "fa-medal",
    color: "emerald",
  },
  {
    title: "Institutional Need",
    subtitle: "100+ Grants Open",
    desc: "Financial aid for students demonstrating significant financial need.",
    icon: "fa-hand-holding-heart",
    color: "amber",
  },
  {
    title: "Entrance",
    subtitle: "10 Top Ranker Awards",
    desc: "Scholarships for top rankers in IOE, IOM, and exams.",
    icon: "fa-pencil",
    color: "purple",
  },
  {
    title: "NGO / INGO",
    subtitle: "8 Partner Programs",
    desc: "Supported by international and national organizations.",
    icon: "fa-globe",
    color: "rose",
  },
  {
    title: "Departmental",
    subtitle: "45 Specific Grants",
    desc: "Specific to faculties like Engineering, Medicine, and IT.",
    icon: "fa-laptop-code",
    color: "cyan",
  },
  {
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
  const [likedScholarships, setLikedScholarships] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: scholarshipsResponse } = useQuery({
    queryKey: ["education-scholarships"],
    queryFn: () => apiService.getEducationScholarships(),
  });

  const scholarships =
    (scholarshipsResponse?.data?.scholarships as Scholarship[]) ||
    defaultScholarships;

  const categories = useMemo(() => {
    const apiCategories = scholarshipsResponse?.data?.categories;
    if (!apiCategories?.length) {
      return defaultCategories;
    }

    return apiCategories.map((category: any) => ({
      title: category.title || category.name,
      subtitle: category.subtitle || `${category.count}+ Scholarships Open`,
      desc: category.desc || "Scholarship opportunities available.",
      icon: category.icon || "fa-medal",
      color: category.color || "blue",
    }));
  }, [scholarshipsResponse]);

  const testimonialsRef = useRef<HTMLDivElement>(null);

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
    onNavigate("scholarshipCategory", { category: category.title });
  };

  const openDetails = (scholarship: Scholarship) => {
    onNavigate("scholarshipHubDetails", { id: scholarship.id.toString() });
  };

  const toggleLike = (id: number) => {
    setLikedScholarships((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const scrollTestimonials = (direction: "left" | "right") => {
    if (testimonialsRef.current) {
      const scrollAmount = 450;
      testimonialsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full text-slate-600 bg-slate-50 font-inter min-h-screen pt-20">
      {/* Hero Section */}
      <div className="w-full flex justify-center p-4 sm:p-8">
        <div className="relative w-full max-w-[1400px] aspect-[16/10] sm:aspect-[16/8] min-h-[500px] bg-slate-800 rounded-2xl shadow-2xl flex flex-col justify-center items-center text-center overflow-hidden group">
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
      <div className="w-full mb-12 overflow-hidden py-12 relative max-w-[1400px] mx-auto">
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
        <div className="max-w-[95%] xl:max-w-[90rem] mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 uppercase tracking-tight">
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
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-${cat.color}-600 bg-white shadow-sm group-hover:bg-primary-600 group-hover:text-white transition-all duration-500 shrink-0`}
                >
                  <i className={`fa-solid ${cat.icon} text-2xl`}></i>
                </div>
                <div className="ml-5 flex-grow">
                  <h3 className="font-black text-slate-900 text-base group-hover:text-primary-600 transition-colors uppercase tracking-tight">
                    {cat.title}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
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
        className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-20"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scholarships.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full group border border-slate-100 hover:border-blue-500/20"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute top-5 left-5">
                  <span className="inline-block bg-white/95 backdrop-blur-md text-slate-800 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.1em] shadow-lg">
                    {item.type}
                  </span>
                </div>
              </div>

              <div className="p-7 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-5">
                  <div className="flex gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl ${item.logoColor} text-white flex items-center justify-center text-sm font-black shadow-lg shadow-${item.logoColor.split("-")[1]}-200/50`}
                    >
                      {item.initials}
                    </div>
                    <div>
                      <h4 className="font-black text-base text-slate-900 flex items-center gap-2 leading-tight uppercase tracking-tight">
                        {item.provider}
                        <i className="fa-solid fa-circle-check text-primary-500 text-xs"></i>
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-1 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                        <i className="fa-solid fa-location-dot"></i>{" "}
                        {item.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${item.status === "OPEN" ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${item.status === "OPEN" ? "bg-emerald-500" : "bg-orange-500"}`}
                      />
                      {item.status}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-5 leading-tight uppercase tracking-tight">
                  {item.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-3 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg uppercase tracking-widest border border-blue-100/50">
                    {item.category}
                  </span>
                  <span className="px-3 py-1.5 bg-slate-50 text-slate-500 text-[10px] font-black rounded-lg uppercase tracking-widest border border-slate-100">
                    {item.eligibility}
                  </span>
                </div>

                <div className="flex justify-between items-end mt-auto mb-8 pt-6 border-t border-slate-50">
                  <div>
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1.5">
                      Award Amount
                    </p>
                    <p className="text-2xl font-black text-blue-600 tracking-tighter">
                      {item.amount}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1.5">
                      Deadline
                    </p>
                    <p className="text-sm font-black text-slate-900 uppercase tracking-tight">
                      {item.deadline}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => openDetails(item)}
                    className="flex-1 py-4 rounded-xl bg-slate-50 text-[11px] font-black text-slate-700 hover:bg-slate-100 transition-all uppercase tracking-widest"
                  >
                    Details
                  </button>
                  <button
                    onClick={() =>
                      onNavigate("scholarshipApplication", {
                        id: item.id.toString(),
                      })
                    }
                    className="flex-2 py-4 px-6 rounded-xl bg-slate-900 text-[11px] font-black text-white hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 uppercase tracking-widest"
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => toggleLike(item.id)}
                    className={`p-4.5 rounded-2xl transition-all ${likedScholarships.includes(item.id) ? "bg-red-50 text-red-500 shadow-inner" : "bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500"}`}
                  >
                    <i
                      className={`fa-solid fa-star text-lg ${likedScholarships.includes(item.id) ? "text-red-500" : ""}`}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Promotional Ads */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-2xl h-full min-h-[260px] flex flex-col justify-center p-10 group">
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                alt=""
                className="w-full h-full object-cover opacity-20 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
            <div className="relative z-10">
              <span className="inline-block py-1.5 px-4 rounded-full bg-white/20 border border-white/30 text-[10px] font-black uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
                UniPath+ Premium
              </span>
              <h3 className="text-3xl font-black mb-3 leading-tight uppercase tracking-tight">
                Unlock Exclusive Grants
              </h3>
              <p className="text-blue-50 text-lg mb-8 max-w-md font-medium">
                Get priority matching and see scholarships before anyone else.
              </p>
              <button className="bg-white text-blue-600 font-black py-4 px-10 rounded-2xl shadow-xl hover:bg-blue-50 transition-all text-sm uppercase tracking-widest active:scale-95">
                Start Free Trial
              </button>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-violet-600 to-fuchsia-700 text-white shadow-2xl h-full min-h-[260px] flex flex-col justify-center p-10 group">
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80"
                alt=""
                className="w-full h-full object-cover opacity-20 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
            <div className="relative z-10">
              <span className="inline-block py-1.5 px-4 rounded-full bg-white/20 border border-white/30 text-[10px] font-black uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
                Expert Service
              </span>
              <h3 className="text-3xl font-black mb-3 leading-tight uppercase tracking-tight">
                Expert Essay Reviews
              </h3>
              <p className="text-violet-50 text-lg mb-8 max-w-md font-medium">
                Have a former admissions officer review your scholarship essay
                today.
              </p>
              <button className="bg-white text-violet-600 font-black py-4 px-10 rounded-2xl shadow-xl hover:bg-violet-50 transition-all text-sm uppercase tracking-widest active:scale-95">
                Get Reviewed
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="w-full bg-white py-16 relative overflow-hidden border-y border-slate-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-8 text-center md:text-left">
            <div className="max-w-2xl">
              <span className="text-blue-600 font-black tracking-[0.2em] uppercase text-xs mb-3 block">
                Success Stories
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight">
                What students say
              </h2>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => scrollTestimonials("left")}
                className="p-2.5 rounded-full bg-slate-50 hover:bg-white text-slate-700 transition-all shadow-md border border-slate-100 hover:shadow-xl group"
              >
                <i className="fa-solid fa-arrow-left text-base group-hover:-translate-x-1 transition-transform"></i>
              </button>
              <button
                onClick={() => scrollTestimonials("right")}
                className="p-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-lg group"
              >
                <i className="fa-solid fa-arrow-right text-base group-hover:translate-x-1 transition-transform"></i>
              </button>
            </div>
          </div>

          <div
            ref={testimonialsRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-8 px-2"
          >
            {[
              {
                name: "Sarah Jenkins",
                school: "Stanford University",
                text: "The AI matching is a game-changer. I was struggling to find grants relevant to my niche in Marine Biology, but UniPath found three perfect matches instantly.",
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
                color: "blue",
              },
              {
                name: "David Chen",
                school: "MIT",
                text: "I didn't think I qualified for any scholarships until I used this platform. The filtering system is incredible and saved me weeks of tedious research.",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
                color: "emerald",
              },
              {
                name: "Emily Watson",
                school: "Yale University",
                text: "The application tracking dashboard helped me organize deadlines for 15 different applications. I landed a full-ride scholarship thanks to staying organized!",
                img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
                color: "amber",
              },
              {
                name: "Aisha Patel",
                school: "Oxford University",
                text: "As an international student, funding was my biggest worry. UniPath connected me with global grants I had never heard of. Highly recommended!",
                img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=150&q=80",
                color: "rose",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="min-w-[320px] md:min-w-[400px] bg-slate-50 rounded-2xl p-8 snap-center flex flex-col border border-slate-100 transition-all duration-700 hover:shadow-xl hover:bg-white group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div
                    className={`w-12 h-12 bg-${t.color}-50 rounded-xl flex items-center justify-center text-${t.color}-500 shadow-sm shadow-${t.color}-500/10`}
                  >
                    <i className="fa-solid fa-quote-left text-xl opacity-40"></i>
                  </div>
                  <div className="flex gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <i key={s} className="fa-solid fa-star text-xs"></i>
                    ))}
                  </div>
                </div>
                <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8 flex-grow italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-slate-200/60">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-12 h-12 rounded-xl object-cover shadow-md border-2 border-white"
                  />
                  <div>
                    <h4 className="font-black text-base text-slate-900 uppercase tracking-tight">
                      {t.name}
                    </h4>
                    <p className="text-[9px] text-blue-600 font-black uppercase tracking-[0.2em]">
                      {t.school}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <span className="text-blue-600 font-black tracking-[0.3em] uppercase text-xs mb-3 block">
            Help Center
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight">
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
              <summary className="flex justify-between items-center font-black cursor-pointer list-none p-6 text-slate-800 text-lg hover:bg-slate-50 transition-colors uppercase tracking-tight select-none">
                <span className="group-open:text-primary-600 transition-colors">
                  {faq.q}
                </span>
                <span className="transition-transform duration-700 group-open:rotate-180 bg-slate-100 rounded-xl p-3 text-slate-400 group-open:text-primary-600 group-open:bg-primary-50">
                  <i className="fa-solid fa-chevron-down text-base"></i>
                </span>
              </summary>
              <div className="text-slate-500 px-6 pb-8 pt-1 leading-relaxed font-medium text-base">
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
                className={`w-24 h-24 rounded-2xl bg-slate-50 flex items-center justify-center text-${selectedCategory.color}-600 mx-auto mb-10 shadow-inner`}
              >
                <i className={`fa-solid ${selectedCategory.icon} text-4xl`}></i>
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-3 uppercase tracking-tight">
                {selectedCategory.title}
              </h3>
              <span
                className={`inline-block px-4 py-2 bg-${selectedCategory.color}-50 text-${selectedCategory.color}-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-6`}
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
                    onNavigate("scholarshipApplication", {
                      id: selectedScholarship.id.toString(),
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

      {/* Newsletter (Already implemented in Footer but I can add a specific one or just rely on footer) */}

      <style jsx>{`
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

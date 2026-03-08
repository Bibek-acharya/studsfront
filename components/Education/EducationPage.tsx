import React, { useState, useEffect } from "react";
import { getAllNews } from "../../lib/news-data";
import { apiService } from "../../services/api";

interface EducationPageProps {
  onNavigate: (view: any, data?: any) => void;
}

interface CollegeLinkData {
  text: string;
  url: string;
}


interface University {
  id: string;
  name: string;
  shortName: string;
}

interface Category {
  id: string;
  title: string;
  count: string;
  totalColleges: number;
  universities: University[];
}

interface Program {
  id: number;
  name: string;
  degree_type: string;
}

interface Facility {
  id: number;
  name: string;
}

interface College {
  id: number;
  name: string;
  location: string;
  rating: number;
  university: string;
  type: string;
  is_verified: boolean;
  is_popular: boolean;
  status: string;
}



const EducationPage: React.FC<EducationPageProps> = ({ onNavigate }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // Background Slider Images
  const images = [
    "https://media.edusanjal.com/uploads/NEC-pic.jpg",
    "https://wms.edigitalnepal.com/wms/files/ws-post-images/1721376755536_a3e7eaa1-89bd-4e71-a2aa-d6d170b26387.jpg",
    "https://wms.edigitalnepal.com/wms/files/ws-post-images/1746680157939_e86a10b4-e740-496b-bb7c-21ddbd5fd681.jpg",
    "https://media.collegeinfonepal.com/information_category/Top-BCA-College-in-Nepal.jpg",
    "https://apexcollege.edu.np/images/homepage/university/uni-photo-new-new.png",
  ];

  const collegeLinksData: CollegeLinkData[] = [
    { text: "collegeinfo.org", url: "https://www.collegeboard.org/" },
    { text: "techuniversity.edu", url: "https://web.mit.edu/" },
    { text: "businessschool.com", url: "https://www.wharton.upenn.edu/" },
    { text: "medicalacademy.org", url: "https://www.hopkinsmedicine.org/" },
    { text: "artscollege.edu", url: "https://www.risd.edu/" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      alert(`Searching for: ${searchTerm}`);
    }
  };

  const currentCollegeLink = collegeLinksData[currentImageIndex];
  const displayText = currentCollegeLink?.text.startsWith("www.")
    ? currentCollegeLink.text.substring(4)
    : currentCollegeLink?.text;

  return (
    <div className="bg-white min-h-screen font-sans text-slate-900">
      <style>{`
        @keyframes fade-in-up-delay-2 {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up-delay-2 {
          animation: fade-in-up-delay-2 1s ease-out 0.6s both;
        }
      `}</style>

      {/* Education Hero Section */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center p-4 w-[1400px] mx-auto">
        <div className="relative h-full w-full flex flex-col items-center justify-center rounded-2xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 z-0">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`College Campus ${index + 1}`}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                style={{ filter: "brightness(0.65)" }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
          </div>

          <div className="relative z-20 text-center max-w-4xl mx-auto p-8 animate-fadeInUp -translate-y-[50px]">
            <h1 className="text-3xl md:text-5xl lg:text-6xl leading-[1.1] font-black mb-8 text-white tracking-tighter uppercase">
              Find Your Perfect College
            </h1>
            <p className="text-base md:text-lg text-white/90 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Discover and compare colleges with our free search tool. Get
              insights on admissions, programs, and student reviews to build
              your ideal college list.
            </p>

            <form
              onSubmit={handleSearch}
              className="relative max-w-2xl mx-auto mb-10 group"
            >
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <i className="fa-solid fa-magnifying-glass text-xl"></i>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by college name, location, or program..."
                className="w-full py-6 pl-16 pr-36 rounded-full border border-white/20 bg-white/98 backdrop-blur-xl text-lg text-slate-800 shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all placeholder:text-slate-400 font-bold"
              />
              <button
                type="submit"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-blue-600 text-white py-4 px-8 rounded-full font-black text-sm uppercase tracking-widest shadow-xl hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all"
              >
                Search
              </button>
            </form>

            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <span className="text-white/60 text-sm font-bold uppercase tracking-widest self-center">
                Your recent visit:
              </span>
              <button className="text-white hover:text-blue-300 text-sm font-bold underline transition-colors">
                BIT Colleges
              </button>
              <button
                onClick={() => onNavigate("scholarshipFinder")}
                className="text-white hover:text-blue-300 text-sm font-bold underline transition-colors"
              >
                Scholarships
              </button>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-30">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-500 ${index === currentImageIndex ? "w-10 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]" : "w-2.5 bg-white/40 hover:bg-white/60"}`}
              />
            ))}
          </div>

          {currentCollegeLink && (
            <div className="absolute bottom-[90px] right-10 z-30 bg-white/10 backdrop-blur-md border border-white/20 py-3.5 px-8 rounded-2xl shadow-2xl transition-all hover:-translate-y-2 hover:bg-white/20 animate-fadeIn cursor-pointer">
              <a
                href={currentCollegeLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white text-sm font-black tracking-widest uppercase"
              >
                <i className="fa-solid fa-link text-blue-400"></i>
                {displayText}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Success Section - Smarter Tools */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-emerald-50 text-emerald-700 font-black py-2 px-6 rounded-full text-xs uppercase tracking-widest mb-6 border border-emerald-100">
            Smart Academics
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight uppercase">
            Smarter Tools, Greater Success
          </h2>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-16 leading-relaxed font-medium">
            Smart tools & insights to guide your education journey.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureLinkCard
              title="College Finder"
              description="Find the perfect college that matches your preferences"
              icon="fa-magnifying-glass"
              iconBg="bg-[#22c55e]"
              onClick={() => onNavigate("findCollege")}
            />
            <FeatureLinkCard
              title="Scholarship Finder"
              description="Discover scholarships and financial aid opportunities"
              icon="fa-arrow-trend-up"
              iconBg="bg-[#eab308]"
              onClick={() => onNavigate("scholarshipFinder")}
            />
            <FeatureLinkCard
              title="Courses Finder"
              description="Helps you find the right courses for your career goals"
              icon="fa-book-open"
              iconBg="bg-[#ef4444]"
              onClick={() => onNavigate("courseFinder")}
            />
            <FeatureLinkCard
              title="College Rankings"
              description="View rankings of top colleges and universities"
              icon="fa-ranking-star"
              iconBg="bg-blue-600"
              onClick={() => onNavigate("rankingsPage")}
            />
          </div>
        </div>
      </section>

      {/* Event Showcase Section */}
      <EventShowcase />

      {/* Course Section - Right Course Right College */}
      <CourseSection onNavigate={onNavigate} />

      {/* Featured Colleges Section */}
      <FeaturedColleges onNavigate={onNavigate} />

      {/* Ads Section */}
      <AdsSection />

      {/* Featured Financial Aid Section */}
      <FinancialAidSection onNavigate={onNavigate} />

      {/* Exam Announcements Section */}
      <ExamAnnouncements onNavigate={onNavigate} />

      {/* Latest News Section */}
      <LatestNews onNavigate={onNavigate} />

      {/* Testimonials Section */}
      <TestimonialsSection />
    </div>
  );
};

// Sub-components

const AdsSection: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <button
            onClick={() => window.open("https://studsphere.com", "_blank")}
            className="block rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group"
          >
            <img
              src="https://images.unsplash.com/photo-1523240682740-8f563509fa0a?q=80&w=1200&auto=format&fit=crop"
              alt="Advertisement 1"
              className="w-full h-44 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </button>

          <button
            onClick={() => window.open("https://studsphere.com", "_blank")}
            className="block rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group"
          >
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop"
              alt="Advertisement 2"
              className="w-full h-44 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

const FinancialAidSection: React.FC<{
  onNavigate: (v: any, d?: any) => void;
}> = ({ onNavigate }) => {
  const [scholarships, setScholarships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await apiService.getEducationScholarships();
        if (response.success && response.data?.scholarships) {
          setScholarships(response.data.scholarships);
        }
      } catch (error) {
        console.error("Error fetching scholarships:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchScholarships();
  }, []);

  if (loading) return <div className="py-24 text-center">Loading financial aid...</div>;

  return (
    <section className="py-24 bg-slate-50/50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter uppercase">
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Financial Aid
              </span>
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Your guide to the best academic opportunities in Nepal and beyond.
            </p>
          </div>
          <button
            onClick={() => onNavigate("scholarships")}
            className="flex items-center gap-4 px-10 py-5 bg-white border-2 border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-primary-600 hover:border-primary-100 transition-all shadow-sm active:scale-95 group"
          >
            View All Financial Aid
            <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1.5 transition-transform"></i>
          </button>
        </div>

        <div className="overflow-x-auto no-scrollbar pb-12 cursor-grab active:cursor-grabbing">
          <div className="flex gap-8 w-max px-4">
            {scholarships.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-2xl p-6 md:p-10 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col relative overflow-hidden w-[450px]"
              >
                {/* Badges */}
                <div className="flex justify-between items-center mb-10">
                  <span className="px-5 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-indigo-100/50">
                    {s.category}
                  </span>
                  <span className="px-5 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100/50">
                    {s.discount}
                  </span>
                </div>

                {/* Header */}
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-2xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-all duration-500">
                    <i className={`fa-solid ${s.icon}`}></i>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl font-black text-slate-900 mb-1.5 leading-tight group-hover:text-blue-600 transition-colors uppercase truncate">
                      {s.title}
                    </h3>
                    <p className="text-sm font-bold text-slate-400 capitalize truncate">
                      {s.provider}
                    </p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-y-10 mb-10 py-10 border-y border-slate-50">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
                      level
                    </p>
                    <p className="text-base font-black text-slate-800 tracking-tight">
                      {s.level}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
                      field
                    </p>
                    <p className="text-base font-black text-slate-800 tracking-tight">
                      {s.field}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
                      covers
                    </p>
                    <p className="text-base font-black text-slate-800 tracking-tight">
                      {s.covers}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
                      location
                    </p>
                    <p className="text-base font-black text-slate-800 tracking-tight">
                      {s.location}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center gap-4 mt-auto">
                  <button className="flex-1 py-5 bg-primary-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20 active:scale-95 group/btn flex items-center justify-center gap-2.5">
                    Apply Now
                    <i className="fa-solid fa-paper-plane text-[10px] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"></i>
                  </button>
                  <button className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-300 hover:text-rose-500 hover:bg-rose-50 border-2 border-transparent hover:border-rose-100 transition-all flex items-center justify-center text-xl group/heart">
                    <i className="fa-regular fa-heart group-hover/heart:scale-110 transition-transform"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ExamAnnouncements: React.FC<{
  onNavigate: (v: any, d?: any) => void;
}> = ({ onNavigate }) => {
  const [examCards, setExamCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await apiService.getEducationExams();
        if (response.success && response.data?.exams) {
          setExamCards(response.data.exams);
        }
      } catch (error) {
        console.error("Error fetching exams:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  if (loading) return <div className="py-24 text-center">Loading entrance exams...</div>;

  return (
    <section className="w-full py-24 bg-slate-50/50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight uppercase">
            Entrance Announcements
          </h2>
          <p className="text-xl text-slate-500 font-medium max-w-3xl mx-auto">
            Your guide to the best academic opportunities in Nepal and beyond.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {examCards.map((exam) => (
            <div
              key={exam.id}
              className="bg-white rounded-2xl overflow-hidden flex flex-col border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2"
            >
              {/* Card Image */}
              <div className="relative w-full h-56 overflow-hidden">
                <img
                  src={exam.imageUrl}
                  alt={exam.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
              </div>

              {/* Card Content */}
              <div className="p-8 flex flex-col flex-1">
                {/* Status Badge */}
                <div className="mb-6">
                  {exam.status === "ongoing" ? (
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-widest border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Ongoing
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs font-black uppercase tracking-widest border border-rose-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      Closed
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight leading-tight group-hover:text-primary-600 transition-colors uppercase">
                  {exam.title}
                </h3>

                {/* University Info */}
                <div className="flex items-start gap-3 mb-8 text-sm font-bold text-slate-400 uppercase tracking-widest">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 text-primary-600">
                    <i className="fa-solid fa-building-columns"></i>
                  </div>
                  <div className="pt-1">
                    <span className="text-slate-700 font-black">
                      {exam.university}
                    </span>
                    <div className="mt-1 text-[10px] text-slate-300">
                      <i className="fa-solid fa-layer-group mr-1.5"></i>
                      {exam.faculty}
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div className="flex justify-between mb-10 pt-6 border-t border-slate-50">
                  <div>
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">
                      Exam Date
                    </p>
                    <p className="text-sm font-black text-slate-900 uppercase tracking-widest">
                      {exam.examDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">
                      Nepali Date
                    </p>
                    <p className="text-sm font-black text-slate-900 uppercase tracking-widest">
                      {exam.nepaliDate}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 mt-auto">
                  <button className="flex-1 py-4 border-2 border-slate-100 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:border-primary-600 hover:text-primary-600 transition-all">
                    Details
                  </button>
                  <button className="flex-[1.5] py-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-950/10 active:scale-95 transition-all flex items-center justify-center gap-2 group/btn">
                    Apply Now
                    <i className="fa-solid fa-arrow-right text-[10px] group-hover/btn:translate-x-1 transition-transform"></i>
                  </button>
                  <button className="w-12 h-12 rounded-xl bg-slate-50 text-slate-300 hover:text-rose-500 border border-slate-100 flex items-center justify-center transition-all">
                    <i className="fa-regular fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-20 text-center">
          <button
            onClick={() => onNavigate("entranceAnnouncements")}
            className="group inline-flex items-center gap-4 px-12 py-5 bg-white border-2 border-slate-100 rounded-2xl text-sm font-black text-slate-900 uppercase tracking-[0.2em] hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm hover:shadow-xl active:scale-95"
          >
            Explore All Entrance Exams
            <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-2 transition-transform"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

const LatestNews: React.FC<{ onNavigate: (v: any, d?: any) => void }> = ({
  onNavigate,
}) => {
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await apiService.getEducationNews();
        if (response.success && response.data?.news) {
          setNewsItems(response.data.news);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) return <div className="py-24 text-center">Loading news...</div>;


  const categoryColors = {
    Academic: "bg-orange-50 text-orange-700 border-orange-100",
    Tech: "bg-blue-50 text-blue-700 border-blue-100",
    Jobs: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Policy: "bg-purple-50 text-purple-700 border-purple-100",
  };

  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 uppercase">
            News & Stories
          </h2>
          <p className="text-xl text-slate-500 font-medium max-w-3xl mx-auto">
            Stay updated with the central pulse of Nepali academics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group flex flex-col cursor-pointer"
              onClick={() => onNavigate("newsDetails", { id: item.id })}
            >
              <div className="p-6 pb-4">
                <span
                  className={`inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${categoryColors[item.category as keyof typeof categoryColors]}`}
                >
                  {item.category}
                </span>
              </div>

              <div className="relative h-48 w-full px-6">
                <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-sm group-hover:shadow-md transition-all">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
                </div>
              </div>

              <div className="p-8 pt-6 flex flex-col flex-1">
                <h3 className="font-black text-xl text-slate-900 mb-4 leading-tight group-hover:text-primary-600 transition-colors uppercase">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium line-clamp-3">
                  {item.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                    <i className="fa-regular fa-clock"></i>
                    <span>{item.date}</span>
                  </div>
                  <button className="text-primary-600 hover:text-primary-800 font-black text-xs uppercase tracking-widest flex items-center gap-2 group/link">
                    Read More
                    <i className="fa-solid fa-arrow-right-long transition-transform group-hover/link:translate-x-1"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={() => onNavigate("newsPage")}
            className="px-12 py-5 bg-white border-2 border-slate-100 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:text-primary-600 hover:border-primary-600 transition-all active:scale-95 shadow-sm"
          >
            Explore All News
          </button>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: "Sarah Jenkins",
      role: "Product Designer @ Spotify",
      class: "Class of 2023",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      text: "Studsphere's mentorship program was a game-changer. My mentor helped me refine my portfolio, which directly led to my offer at Spotify.",
    },
    {
      name: "David Chen",
      role: "Software Engineer @ Google",
      class: "Class of 2022",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150",
      text: "The AI resume builder and mock interview tools gave me the confidence I needed. I landed multiple offers within weeks of using the platform.",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Lead @ Airbnb",
      class: "Class of 2021",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
      text: "Finding a job that aligns with my values was hard until I found Studsphere. The company insights helped me choose the right culture.",
    },
  ];

  return (
    <section className="w-full bg-slate-50 py-16 md:py-24 border-t border-slate-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="text-left">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight uppercase">
              Success Stories
            </h2>
            <p className="text-lg text-slate-500 font-medium max-w-3xl">
              Hear from students and educators who have transformed their lives
              with StudSphere.
            </p>
          </div>
          <button
            onClick={() => window.open("/testimonials", "_self")}
            className="flex items-center gap-4 px-10 py-5 bg-white border-2 border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-primary-600 hover:border-primary-100 transition-all shadow-sm active:scale-95 group"
          >
            All Stories
            <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1.5 transition-transform"></i>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 relative group overflow-hidden animate-fadeInUp flex flex-col items-start text-left"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="absolute top-6 right-8 text-primary-100/50 text-7xl font-serif select-none transition-colors group-hover:text-primary-100">
                "
              </div>

              <div className="flex flex-col items-start gap-4 mb-6 relative z-10">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-100 p-0.5 shadow-md group-hover:border-primary-400 transition-colors">
                  <img
                    src={review.img}
                    alt={review.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-lg leading-tight uppercase">
                    {review.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                    {review.role}
                  </p>
                </div>
              </div>

              <p className="text-slate-600 italic text-base leading-relaxed mb-8 relative z-10">
                "{review.text}"
              </p>

              <button className="mt-auto inline-flex items-center text-primary-600 text-[10px] font-black uppercase tracking-widest hover:text-primary-800 transition-colors gap-3 group/link relative z-10">
                <i className="fa-brands fa-linkedin text-xl"></i>
                View Profile
                <i className="fa-solid fa-arrow-right text-[10px] transition-transform group-hover/link:translate-x-1"></i>
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16 gap-3">
          <span className="w-10 h-2 rounded-full bg-primary-600 cursor-pointer shadow-lg shadow-primary-500/30"></span>
          <span className="w-2 h-2 rounded-full bg-slate-200 cursor-pointer hover:bg-slate-300 transition-all"></span>
          <span className="w-2 h-2 rounded-full bg-slate-200 cursor-pointer hover:bg-slate-300 transition-all"></span>
        </div>
      </div>
    </section>
  );
};

const FeatureLinkCard: React.FC<{
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  onClick: () => void;
}> = ({ title, description, icon, iconBg, onClick }) => (
  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 text-left flex flex-col justify-between border border-slate-100 group">
    <div>
      <div
        className={`w-16 h-16 ${iconBg} rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}
      >
        <i className={`fa-solid ${icon} text-white text-2xl`}></i>
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-primary-600 transition-colors uppercase">
        {title}
      </h3>
      <p className="text-slate-500 leading-relaxed mb-8 font-medium">
        {description}
      </p>
    </div>
    <button
      onClick={onClick}
      className={`w-full py-4 px-6 ${iconBg} text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 hover:opacity-90 hover:shadow-xl active:scale-95 text-center border-0 shadow-lg`}
    >
      Explore Now
    </button>
  </div>
);

const EventShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiService.getEducationEvents();
        if (response.success && response.data?.events) {
          setEvents(response.data.events);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % events.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [events.length]);

  if (loading) return <div className="py-24 text-center">Loading events...</div>;
  if (events.length === 0) return null;

  const avatars = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneesh",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  ];

  const currentEvent = events[currentIndex];

  return (
    <div className="w-full bg-slate-50/50 py-16 md:py-24 relative overflow-hidden border-y border-slate-100">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 items-center">
          {/* Left Side - Event Image */}
          <div className="relative group animate-fadeInUp">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
              <div className="relative aspect-[4/3] bg-slate-200">
                <img
                  src={currentEvent.image}
                  alt={currentEvent.title}
                  className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Event Details */}
          <div className="text-left space-y-6 md:space-y-8 animate-fadeIn">
            {currentEvent.trending && (
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-5 py-2 rounded-full border border-emerald-100 shadow-sm">
                <i className="fa-solid fa-arrow-trend-up text-sm"></i>
                <span className="font-black text-[10px] uppercase tracking-widest">
                  Trending Now
                </span>
              </div>
            )}

            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight uppercase">
              {currentEvent.title}
            </h2>

            <div className="flex flex-col sm:flex-row sm:items-center gap-6 text-slate-500">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary-600 border border-slate-100">
                  <i className="fa-solid fa-calendar"></i>
                </div>
                <span className="font-bold text-sm uppercase tracking-widest">
                  {currentEvent.date}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary-600 border border-slate-100">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <span className="font-bold text-sm uppercase tracking-widest">
                  {currentEvent.location}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8 pt-4">
              <button className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white px-10 py-5 text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary-500/20 transition-all active:scale-95">
                Apply Now →
              </button>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {avatars.map((avatar, index) => (
                    <div
                      key={index}
                      className="w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-lg"
                    >
                      <img
                        src={avatar}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-slate-900 text-lg leading-none">
                    {currentEvent.interested}+
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Interested
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-3 mt-16">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-500 rounded-full h-2.5 ${index === currentIndex
                ? "bg-primary-600 w-12"
                : "bg-slate-200 w-2.5 hover:bg-primary-200"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Fixed: Added optional second argument to onNavigate prop type to resolve argument mismatch error
const CourseSection: React.FC<{ onNavigate: (v: any, d?: any) => void }> = ({
  onNavigate,
}) => {
  const categories: Category[] = [
    {
      id: "science-technology",
      title: "Science & Technology",
      count: "2k+",
      totalColleges: 2000,
      universities: [
        { id: "tu", name: "Tribhuvan University", shortName: "TU" },
        { id: "ku", name: "Kathmandu University", shortName: "KU" },
        { id: "pu", name: "Pokhara University", shortName: "PU" },
        { id: "ppu", name: "Purbanchal University", shortName: "PPU" },
      ],
    },
    {
      id: "engineering",
      title: "Engineering",
      count: "1.8k+",
      totalColleges: 1800,
      universities: [
        { id: "tu", name: "Tribhuvan University", shortName: "TU" },
        { id: "ku", name: "Kathmandu University", shortName: "KU" },
        { id: "pu", name: "Pokhara University", shortName: "PU" },
        { id: "ppu", name: "Purbanchal University", shortName: "PPU" },
      ],
    },
    {
      id: "management-business",
      title: "Management",
      count: "2.2k+",
      totalColleges: 2200,
      universities: [
        { id: "tu", name: "Tribhuvan University", shortName: "TU" },
        { id: "ku", name: "Kathmandu University", shortName: "KU" },
        { id: "pu", name: "Pokhara University", shortName: "PU" },
        { id: "ppu", name: "Purbanchal University", shortName: "PPU" },
      ],
    },
    {
      id: "health-medical",
      title: "Medical",
      count: "1.5k+",
      totalColleges: 1500,
      universities: [
        { id: "tu", name: "Tribhuvan University", shortName: "TU" },
        { id: "ku", name: "Kathmandu University", shortName: "KU" },
        { id: "bpkihs", name: "B.P. Koirala Institute", shortName: "BPKIHS" },
        { id: "patan", name: "Patan Academy", shortName: "PAHS" },
      ],
    },
    {
      id: "business",
      title: "Law",
      count: "800+",
      totalColleges: 1900,
      universities: [
        { id: "tu", name: "Tribhuvan University", shortName: "TU" },
        { id: "ku", name: "Kathmandu University", shortName: "KU" },
        { id: "pu", name: "Pokhara University", shortName: "PU" },
        { id: "ppu", name: "Purbanchal University", shortName: "PPU" },
      ],
    },
  ];

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            Top Universities & Institutions
          </h2>
          <p className="text-gray-500 text-lg font-medium">
            Explore academic opportunities across various sectors.
          </p>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-10 no-scrollbar">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => onNavigate("findCollege")}
              className="min-w-[300px] bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">
                  {category.title}
                </h3>
                <i className="fa-solid fa-chevron-right text-gray-300 text-sm group-hover:text-blue-600 group-hover:translate-x-1 transition-all"></i>
              </div>
              <p className="text-sm font-bold text-gray-500 mb-8">
                {category.count} Institutions
              </p>
              <div className="flex gap-2">
                {category.universities.slice(0, 3).map((uni, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center font-black text-blue-600 text-[10px]"
                  >
                    {uni.shortName}
                  </div>
                ))}
                {category.universities.length > 3 && (
                  <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-xs font-black text-gray-400">
                    +{category.universities.length - 3}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Fixed: Added optional second argument to onNavigate prop type to resolve argument mismatch error
const FeaturedColleges: React.FC<{ onNavigate: (v: any, d?: any) => void }> = ({
  onNavigate,
}) => {
  const [selectedDegree, setSelectedDegree] = useState<string>("Bachelor");
  const [selectedProgramOption, setSelectedProgramOption] =
    useState<string>("");
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await apiService.getColleges({ popular: true });
        if (response.success && response.data?.colleges) {
          setColleges(response.data.colleges);
        }
      } catch (error) {
        console.error("Error fetching colleges:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchColleges();
  }, []);

  const programOptions: Record<string, string[]> = {
    Plus2: ["Humanities", "Science", "Education", "Management"],
    Bachelor: ["BBA", "BSc", "BSc.CIT", "BBM", "BTTM", "BE", "BCA"],
    Master: ["MBA", "MBA IT", "ME"],
  };

  const filteredColleges = colleges.filter((college) => {
    const programs = Array.isArray(college.programs_list) ? college.programs_list : [];
    if (programs.length === 0) return true; // Show if no programs list for filtering

    const hasMatchingProgram = programs.some((program: any) => {
      const degreeMatch = program.degree_type === selectedDegree || program.level === selectedDegree;
      const programMatch =
        !selectedProgramOption ||
        program.name
          .toLowerCase()
          .includes(selectedProgramOption.toLowerCase());
      return degreeMatch && programMatch;
    });
    return hasMatchingProgram;
  });

  if (loading) return <div className="py-24 text-center">Loading featured colleges...</div>;

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="text-left">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight uppercase">
              Featured Colleges
            </h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl">
              Your guide to the best academic opportunities in Nepal and beyond.
            </p>
          </div>
          <button
            onClick={() => onNavigate("findCollege")}
            className="flex items-center gap-4 px-10 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-primary-600 hover:border-primary-100 transition-all shadow-sm active:scale-95 group"
          >
            View All Colleges
            <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1.5 transition-transform"></i>
          </button>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative min-w-[160px]">
              <select
                value={selectedDegree}
                onChange={(e) => {
                  setSelectedDegree(e.target.value);
                  setSelectedProgramOption("");
                }}
                className="w-full h-14 pl-6 pr-10 bg-primary-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest outline-none border-none appearance-none cursor-pointer hover:bg-primary-700 transition-colors shadow-xl shadow-primary-500/20"
              >
                <option value="Plus2">+2</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Master">Master</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-white/70 text-[10px] pointer-events-none"></i>
            </div>

            <div className="relative min-w-[220px]">
              <select
                value={selectedProgramOption}
                onChange={(e) => setSelectedProgramOption(e.target.value)}
                className="w-full h-14 pl-6 pr-12 bg-white border-2 border-slate-100 text-slate-700 rounded-2xl font-bold text-[10px] uppercase tracking-widest outline-none appearance-none cursor-pointer hover:border-primary-100 transition-all shadow-sm"
              >
                <option value="">
                  {selectedDegree === "Plus2"
                    ? "Select Stream"
                    : "Select Program"}
                </option>
                {(programOptions[selectedDegree] || []).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <i className="fa-solid fa-chevron-down absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 text-[10px] pointer-events-none"></i>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="overflow-x-auto no-scrollbar pb-12 cursor-grab active:cursor-grabbing">
          <div className="flex gap-8 w-max px-4">
            {filteredColleges.map((college) => (
              <div key={college.id} className="w-[500px]">
                <CollegeFeaturedCard
                  college={college}
                  onNavigate={onNavigate}
                />
              </div>
            ))}

            {filteredColleges.length === 0 && (
              <div className="w-[1000px] py-32 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                  <i className="fa-solid fa-magnifying-glass text-slate-200 text-4xl"></i>
                </div>
                <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-sm">
                  No colleges found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Fixed: Added optional second argument to onNavigate prop type to resolve argument mismatch error
const CollegeFeaturedCard: React.FC<{
  college: any;
  onNavigate: (v: any, d?: any) => void;
}> = ({ college, onNavigate }) => {
  const programs = Array.isArray(college.programs_list) ? college.programs_list : [];
  const amenities = Array.isArray(college.amenities) ? college.amenities : [];

  return (
    <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary-100 transition-all duration-500 relative group flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 shrink-0 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-500">
            {college.image_url ? (
              <img src={college.image_url} alt={college.name} className="w-full h-full object-cover rounded-2xl" />
            ) : (
              <i className="fa-solid fa-building text-3xl text-white"></i>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-black text-slate-900 leading-tight mb-2 truncate group-hover:text-primary-600 transition-colors uppercase">
              {college.name}
            </h3>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              <i className="fa-solid fa-location-dot text-primary-400"></i>
              <span className="truncate">{college.location}</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <div className="flex items-center gap-1.5 text-amber-500">
                <i className="fa-solid fa-star"></i>
                <span className="text-slate-900">{college.rating} / 5.0</span>
              </div>
              <span className="text-slate-100">|</span>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-graduation-cap text-primary-400"></i>
                <span>{college.university?.name || college.affiliation}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-8">
        {college.verified && (
          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <i className="fa-solid fa-circle-check"></i> Verified
          </span>
        )}
        {college.popular && (
          <span className="px-3 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-lg text-[10px] font-black uppercase tracking-widest">
            Popular
          </span>
        )}
      </div>

      {/* Programs */}
      <div className="mb-8 pt-8 border-t border-slate-50">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
            Featured Programs
          </h4>
          <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest">
            {programs.length} Programs
          </span>
        </div>
        <div className="space-y-2">
          {programs.slice(0, 3).map((program: any, idx: number) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                onNavigate("findCollege");
              }}
              className="w-full flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-primary-50 hover:border-primary-100 transition-all group/item"
            >
              <span className="text-sm font-bold text-slate-700 group-hover/item:text-primary-600 uppercase">
                {program.name}
              </span>
              <span className="px-2.5 py-1 bg-white rounded-lg text-[9px] font-black uppercase text-slate-400 border border-slate-100 group-hover/item:text-primary-400">
                {program.degree_type || program.level}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-10 pt-8 border-t border-slate-50">
        <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">
          Facilities
        </h4>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {amenities.slice(0, 4).map((facility: string, idx: number) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest"
            >
              <i className="fa-solid fa-circle-check text-primary-500"></i>
              {facility}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-auto pt-8 border-t border-slate-50 flex items-center gap-3">
        <button
          onClick={() => onNavigate("collegeDetails", { id: college.id })}
          className="flex-1 py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-primary-600 transition-colors"
        >
          Details
        </button>
        <button className="flex-[2] py-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:bg-black transition-all active:scale-95 group/btn flex items-center justify-center gap-2">
          {college.status === "Ongoing" ? "Inquiry Now" : "Apply Now"}
          <i className="fa-solid fa-arrow-right text-[10px] group-hover/btn:translate-x-1 transition-transform"></i>
        </button>
        <button className="w-12 h-12 rounded-xl bg-slate-50 text-slate-300 hover:text-rose-500 transition-all flex items-center justify-center text-xl">
          <i className="fa-regular fa-heart"></i>
        </button>
      </div>
    </div>
  );
};

export default EducationPage;

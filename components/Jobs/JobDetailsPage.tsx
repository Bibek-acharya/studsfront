import React, { useEffect } from "react";
import { getJobById } from "../../lib/jobs-data";
import JobDetailHeader from "./JobDetailHeader";
import JobDetailContent from "./JobDetailContent";
import Testimonials from "../Testimonials";

interface JobDetailsPageProps {
  id: number;
  onNavigate: (view: any, data?: any) => void;
}

const JobDetailsPage: React.FC<JobDetailsPageProps> = ({ id, onNavigate }) => {
  const job = getJobById(id) || getJobById(1); // Default to ID 1 if not found

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!job) {
    return (
      <div className="pt-32 pb-20 flex flex-col items-center justify-center min-h-[60vh] bg-slate-50 font-jakarta">
        <div className="bg-white p-12 rounded-xl shadow-xl text-center max-w-md border border-slate-100">
          <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center text-4xl mx-auto mb-8">
            <i className="fa-solid fa-circle-exclamation"></i>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">
            Job Not Found
          </h2>
          <p className="text-slate-500 font-medium mb-10">
            The job posting you are looking for might have been removed or
            expired.
          </p>
          <button
            onClick={() => onNavigate("jobsPage")}
            className="w-full py-4 bg-primary-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-primary-700 transition-all"
          >
            Return to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full bg-slate-50 min-h-screen font-jakarta">
      <JobDetailHeader job={job} />
      <JobDetailContent job={job} onNavigate={onNavigate} />

      {/* Featured Companies */}
      <section className="bg-white py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Featured Companies Actively Hiring
            </h2>
            <p className="text-gray-500 text-lg font-medium mx-auto max-w-2xl">
              Master the skills that matter with mentor-led courses designed to
              help you succeed.
            </p>
          </div>
          <div className="flex overflow-x-auto gap-8 pb-10 no-scrollbar justify-start">
            <FeaturedCompanyCard
              name="Google"
              rating="4.8"
              reviews="2.4k"
              description="Personalizing experience with advanced tech solutions."
              icon="fa-google"
              color="bg-indigo-50 text-indigo-600"
              onClick={() => onNavigate("companyDetails")}
            />
            <FeaturedCompanyCard
              name="Spotify"
              rating="4.7"
              reviews="1.8k"
              description="Connecting people through the power of music."
              icon="fa-spotify"
              color="bg-green-50 text-green-600"
              onClick={() => onNavigate("companyDetails")}
            />
            <FeaturedCompanyCard
              name="Amazon"
              rating="4.6"
              reviews="5k+"
              description="Building the future of commerce and cloud computing."
              icon="fa-amazon"
              color="bg-orange-50 text-orange-600"
              onClick={() => onNavigate("companyDetails")}
            />
            <FeaturedCompanyCard
              name="LinkedIn"
              rating="4.9"
              reviews="3.2k"
              description="Creating economic opportunity for every workforce member."
              icon="fa-linkedin"
              color="bg-blue-50 text-blue-600"
              onClick={() => onNavigate("companyDetails")}
            />
          </div>
        </div>
      </section>

      {/* Sponsored Companies */}
      <section className="bg-gray-50 py-20 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Sponsored Companies
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SponsoredCompanyCard
              name="TCS"
              rating="4.7"
              reviews="40k"
              tags={["IT Services", "MNC"]}
              icon="fa-code"
              color="bg-blue-50 text-blue-600"
              onClick={() => onNavigate("companyDetails")}
            />
            <SponsoredCompanyCard
              name="Infosys"
              rating="4.6"
              reviews="35k"
              tags={["Technology", "Global"]}
              icon="fa-laptop-code"
              color="bg-indigo-50 text-indigo-600"
              onClick={() => onNavigate("companyDetails")}
            />
            <SponsoredCompanyCard
              name="HDFC Bank"
              rating="4.5"
              reviews="25k"
              tags={["BFSI", "Banking"]}
              icon="fa-building-columns"
              color="bg-red-50 text-red-600"
              onClick={() => onNavigate("companyDetails")}
            />
            <SponsoredCompanyCard
              name="Apollo"
              rating="4.8"
              reviews="15k"
              tags={["Healthcare", "Hospital"]}
              icon="fa-heart-pulse"
              color="bg-green-50 text-green-600"
              onClick={() => onNavigate("companyDetails")}
            />
          </div>
        </div>
      </section>

      {/* Premium Services */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl p-10 md:p-16 border border-gray-100 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50 rounded-full blur-[100px] opacity-30 -mr-32 -mt-32"></div>
          <div className="w-24 h-24 bg-orange-100 rounded-2xl flex items-center justify-center shrink-0 border border-orange-200">
            <i className="fa-solid fa-rocket text-4xl text-orange-500"></i>
          </div>
          <div className="flex-1 relative z-10">
            <span className="inline-block px-4 py-1 bg-orange-50 text-orange-600 border border-orange-100 text-xs font-black uppercase rounded-full mb-4 tracking-widest">
              Studsphere Fastforward
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Accelerate your job search
            </h2>
            <p className="text-gray-500 text-lg font-medium leading-relaxed mb-8">
              Premium services like AI Resume writing and priority status to
              help you get hired 3x faster.
            </p>
            <div className="flex flex-wrap gap-4">
              <Pill icon="fa-pen-nib" text="Resume Writing" />
              <Pill icon="fa-crown" text="Priority Applicant" />
              <Pill icon="fa-eye" text="Profile Display" />
            </div>
          </div>
          <div className="shrink-0 relative z-10">
            <button className="px-10 py-4 bg-orange-500 text-white font-black rounded-2xl shadow-xl shadow-orange-500/20 hover:bg-orange-600 transition-all active:scale-95">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Blogs / Insights */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            Latest Insights
          </h2>
          <p className="text-gray-500 text-lg font-medium">
            Expert guidance on design, technology, and career trends.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <BlogCard
            cat="Design"
            date="Oct 24"
            title="Art of Minimalist UI"
            img="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=400"
          />
          <BlogCard
            cat="Technology"
            date="Nov 12"
            title="React Server Components"
            img="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400"
          />
          <BlogCard
            cat="Productivity"
            date="Dec 05"
            title="Mastering Deep Work"
            img="https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&q=80&w=400"
          />
        </div>
      </section>
    </main>
  );
};

const FeaturedCompanyCard: React.FC<{
  name: string;
  rating: string;
  reviews: string;
  description: string;
  icon: string;
  color: string;
  onClick?: () => void;
}> = ({ name, rating, reviews, description, icon, color, onClick }) => (
  <div
    onClick={onClick}
    className="min-w-[280px] w-[280px] bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group cursor-pointer hover:-translate-y-1"
  >
    <div
      className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${color}`}
    >
      <i className={`fa-brands ${icon} text-2xl`}></i>
    </div>
    <h3 className="font-bold text-xl text-gray-900 mb-1">{name}</h3>
    <div className="flex items-center gap-1 text-sm text-yellow-400 mb-3">
      <i className="fa-solid fa-star"></i>
      <span className="font-bold text-gray-800">{rating}</span>
      <span className="text-gray-400">({reviews})</span>
    </div>
    <p className="text-gray-500 text-sm mb-6 leading-relaxed">{description}</p>
    <button className="w-full py-2.5 rounded-full border border-gray-100 text-gray-600 font-bold hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all duration-300 shadow-sm">
      View Jobs
    </button>
  </div>
);

const SponsoredCompanyCard: React.FC<{
  name: string;
  rating: string;
  reviews: string;
  tags: string[];
  icon: string;
  color: string;
  onClick?: () => void;
}> = ({ name, rating, reviews, tags, icon, color, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center cursor-pointer group"
  >
    <div
      className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors group-hover:scale-110 ${color}`}
    >
      <i className={`fa-solid ${icon} text-2xl`}></i>
    </div>
    <h3 className="font-bold text-lg text-gray-900 mb-1">{name}</h3>
    <div className="flex items-center gap-1 text-sm text-yellow-400 mb-3">
      <i className="fa-solid fa-star"></i>
      <span className="font-bold text-gray-800">{rating}</span>
      <span className="text-gray-400 text-xs">({reviews})</span>
    </div>
    <div className="flex flex-wrap gap-2 justify-center mt-auto">
      {tags.map((tag, i) => (
        <span
          key={i}
          className="px-3 py-1 rounded-full bg-gray-50 text-[10px] font-bold text-gray-600 border border-gray-100 uppercase tracking-widest"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const Pill: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-gray-100 bg-gray-50 font-bold text-gray-700 text-sm hover:bg-white hover:border-orange-200 transition-all cursor-pointer">
    <i className={`fa-solid ${icon} text-orange-500`}></i> {text}
  </div>
);

const BlogCard: React.FC<{
  cat: string;
  date: string;
  title: string;
  img: string;
}> = ({ cat, date, title, img }) => (
  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer">
    <div className="h-56 overflow-hidden relative">
      <img
        src={img}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        alt={title}
      />
      <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-primary-600 shadow-sm border border-gray-100">
        {cat}
      </span>
    </div>
    <div className="p-8">
      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
        {date} • 5 min read
      </div>
      <h3 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-primary-600 transition-colors mb-6">
        {title}
      </h3>
      <div className="flex justify-between items-center border-t border-gray-50 pt-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-100"></div>
          <span className="text-xs font-bold text-gray-600">Expert Team</span>
        </div>
        <i className="fa-solid fa-arrow-right text-gray-200 group-hover:text-primary-600 transition-colors"></i>
      </div>
    </div>
  </div>
);

export default JobDetailsPage;

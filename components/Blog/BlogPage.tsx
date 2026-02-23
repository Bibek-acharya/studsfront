import React, { useState, useMemo } from "react";
import { getAllBlogs, BlogPost } from "../../lib/blogs-data";

interface BlogPageProps {
  onNavigate: (view: any, data?: any) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const blogs = getAllBlogs();

  const categories = ["All", "Career Advice", "Study Tips", "Student Life"];

  const filteredBlogs = useMemo(() => {
    if (activeCategory === "All") return blogs;
    return blogs.filter((b) => b.category === activeCategory);
  }, [activeCategory, blogs]);

  return (
    <div className="bg-white min-h-screen pt-24 font-jakarta pb-20">
      {/* Featured Blog Hero */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div
          onClick={() => onNavigate("blogDetails", { id: blogs[0].id })}
          className="relative h-[450px] md:h-[600px] rounded-2xl overflow-hidden group cursor-pointer shadow-2xl animate-fadeInUp"
        >
          <img
            src={blogs[0].image}
            className="w-full h-full object-cover brightness-[0.4] transition-transform duration-[2000ms] group-hover:scale-105"
            alt="Featured Post"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>

          <div className="absolute bottom-0 left-0 p-8 md:p-20 w-full md:w-3/4">
            <span className="inline-block px-5 py-2 rounded-xl bg-primary-600 text-white text-[10px] font-black uppercase tracking-widest mb-8 shadow-xl">
              Featured Post
            </span>
            <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter uppercase mb-8 group-hover:text-primary-400 transition-colors">
              {blogs[0].title}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed mb-10 max-w-2xl">
              {blogs[0].excerpt}
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <img
                  src={`https://api.dicebear.com/7.x/notionists/svg?seed=${blogs[0].authorAvatar}`}
                  className="w-12 h-12 rounded-full border-2 border-white/20 bg-white/10"
                  alt=""
                />
                <div className="text-left leading-none">
                  <p className="text-sm font-black text-white uppercase tracking-widest mb-1">
                    {blogs[0].author}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    {blogs[0].authorTitle}
                  </p>
                </div>
              </div>
              <div className="h-10 w-px bg-white/10"></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {blogs[0].readTime} Read
              </span>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filtering Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white border-slate-900 shadow-xl"
                    : "bg-white border-slate-100 text-slate-400 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
              Sort by
            </span>
            <select className="bg-slate-50 border border-slate-100 rounded-xl px-5 py-2.5 text-[10px] font-black text-slate-600 uppercase tracking-widest outline-none focus:ring-4 focus:ring-primary-50 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%23cbd5e1%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')] bg-[length:1em] bg-[right_1rem_center] bg-no-repeat pr-12">
              <option>Newest First</option>
              <option>Most Popular</option>
              <option>Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredBlogs.map((blog, idx) => (
            <div
              key={blog.id}
              onClick={() => onNavigate("blogDetails", { id: blog.id })}
              className="group cursor-pointer animate-fadeInUp"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-8 shadow-sm hover:shadow-2xl transition-all duration-700">
                <img
                  src={blog.image}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={blog.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 rounded-xl bg-white/95 backdrop-blur-sm text-primary-600 text-[10px] font-black uppercase tracking-widest border border-slate-100 shadow-lg">
                    {blog.category}
                  </span>
                </div>
              </div>
              <div className="px-2">
                <div className="flex items-center gap-3 text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">
                  <span>{blog.date}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                  <span>{blog.readTime} Read</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary-600 transition-colors leading-tight mb-4 uppercase tracking-tight">
                  {blog.title}
                </h3>
                <p className="text-slate-500 font-medium text-base leading-relaxed mb-8 line-clamp-3">
                  {blog.excerpt}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://api.dicebear.com/7.x/notionists/svg?seed=${blog.authorAvatar}`}
                      className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 shadow-sm"
                      alt=""
                    />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      {blog.author}
                    </span>
                  </div>
                  <i className="fa-solid fa-arrow-right -rotate-45 text-slate-200 group-hover:rotate-0 group-hover:text-primary-600 transition-all duration-300"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Banner */}
        <section className="mt-32 relative overflow-hidden rounded-2xl bg-primary-600 p-12 md:p-24 text-center text-white shadow-[0_30px_70px_rgba(37,99,235,0.4)] group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-[100px] -mr-32 -mt-32 transition-transform group-hover:scale-110 duration-1000"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-900 opacity-20 rounded-full blur-[80px] -ml-24 -mb-24"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase leading-tight">
              Master your career with weekly insights.
            </h2>
            <p className="text-lg text-primary-100 font-medium mb-12 opacity-80 uppercase tracking-widest">
              Join 15,000+ students on their journey to excellence.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your Email Address"
                className="flex-1 px-8 py-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-primary-100/50 outline-none focus:bg-white/20 transition-all font-bold text-sm"
                required
              />
              <button className="px-12 py-5 bg-white text-primary-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-all active:scale-95">
                Subscribe Now
              </button>
            </form>
            <p className="mt-8 text-[9px] font-black text-primary-200 uppercase tracking-[0.3em] opacity-60">
              No spam. Only high-value content.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogPage;

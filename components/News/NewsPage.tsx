import React, { useState, useMemo } from "react";
import { getAllNews, NewsArticle } from "../../lib/news-data";

interface NewsPageProps {
  onNavigate: (view: any, data?: any) => void;
}

const NewsPage: React.FC<NewsPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const allNews = getAllNews();
  const featuredNews = allNews[0];

  const categories = ["All", "Academic", "Tech", "Jobs", "Policy"];

  const filteredNews = useMemo(() => {
    if (activeCategory === "All") return allNews;
    return allNews.filter((n) => n.category === activeCategory);
  }, [activeCategory, allNews]);

  return (
    <div className="bg-white min-h-screen pt-24 font-jakarta pb-20">
      {/* Featured News Hero - Mirrors BlogPage style */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div
          onClick={() => onNavigate("newsDetails", { id: featuredNews.id })}
          className="relative h-[450px] md:h-[600px] rounded-2xl overflow-hidden group cursor-pointer shadow-2xl animate-fadeInUp"
        >
          <img
            src={featuredNews.image}
            className="w-full h-full object-cover brightness-[0.4] transition-transform duration-[2000ms] group-hover:scale-105"
            alt="Featured News"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>

          <div className="absolute bottom-0 left-0 p-8 md:p-20 w-full md:w-4/5">
            <span className="inline-block px-5 py-2 rounded-xl bg-primary-600 text-white text-[10px] font-black uppercase tracking-widest mb-8 shadow-xl">
              Latest Top Story
            </span>
            <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter uppercase mb-8 group-hover:text-primary-400 transition-colors">
              {featuredNews.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed mb-10 max-w-2xl line-clamp-2">
              {featuredNews.excerpt}
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center text-white text-xl">
                  <i className="fa-solid fa-feather"></i>
                </div>
                <div className="text-left leading-none">
                  <p className="text-sm font-black text-white uppercase tracking-widest mb-1">
                    {featuredNews.author}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    StudSphere News Desk
                  </p>
                </div>
              </div>
              <div className="h-10 w-px bg-white/10"></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {featuredNews.readTime} Read
              </span>
              <div className="h-10 w-px bg-white/10 hidden sm:block"></div>
              <span className="hidden sm:inline-block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {featuredNews.date}
              </span>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Tabs */}
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
            </select>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredNews.map((article, idx) => (
            <article
              key={article.id}
              onClick={() => onNavigate("newsDetails", { id: article.id })}
              className="group cursor-pointer animate-fadeInUp"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-8 shadow-sm hover:shadow-2xl transition-all duration-700">
                <img
                  src={article.image}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={article.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 rounded-xl bg-white/95 backdrop-blur-sm text-primary-600 text-[10px] font-black uppercase tracking-widest border border-slate-100 shadow-lg">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="px-2 flex flex-col h-full">
                <div className="flex items-center gap-3 text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">
                  <span>{article.date}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                  <span>{article.readTime} Read</span>
                </div>

                <h2 className="text-2xl font-black text-slate-900 group-hover:text-primary-600 transition-colors leading-tight mb-4 uppercase tracking-tight line-clamp-2">
                  {article.title}
                </h2>

                <p className="text-slate-500 font-medium text-base leading-relaxed mb-8 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-primary-600 text-xs shadow-sm">
                      <i className="fa-solid fa-feather"></i>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {article.author}
                    </span>
                  </div>
                  <i className="fa-solid fa-arrow-right -rotate-45 text-slate-200 group-hover:rotate-0 group-hover:text-primary-600 transition-all duration-300"></i>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="py-24 text-center bg-white rounded-2xl border border-dashed border-slate-200 animate-fadeIn">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-200">
              <i className="fa-solid fa-newspaper text-5xl"></i>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">
              No news found
            </h3>
            <p className="text-slate-500 font-medium">
              Try another category or check back later for more updates.
            </p>
          </div>
        )}

        {/* Global Newsletter - Integrated directly as in Blog page */}
        <section className="mt-32 relative overflow-hidden rounded-2xl bg-primary-600 p-12 md:p-24 text-center text-white shadow-[0_30px_70px_rgba(37,99,235,0.4)] group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-[100px] -mr-32 -mt-32 transition-transform group-hover:scale-110 duration-1000"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-900 opacity-20 rounded-full blur-[80px] -ml-24 -mb-24"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase leading-tight">
              Never miss an academic update.
            </h2>
            <p className="text-lg text-primary-100 font-medium mb-12 opacity-80 uppercase tracking-widest">
              Join 50,000+ students staying ahead of the curve.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter Your Email"
                className="flex-1 px-8 py-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-primary-100/50 outline-none focus:bg-white/20 transition-all font-bold text-sm"
                required
              />
              <button className="px-12 py-5 bg-white text-primary-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-all active:scale-95">
                Subscribe Now
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NewsPage;

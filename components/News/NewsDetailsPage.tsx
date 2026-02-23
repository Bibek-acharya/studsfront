import React, { useEffect } from "react";
import { getNewsById, getRelatedNews } from "../../lib/news-data";

interface NewsDetailsPageProps {
  id: string;
  onNavigate: (view: any, data?: any) => void;
}

const NewsDetailsPage: React.FC<NewsDetailsPageProps> = ({
  id,
  onNavigate,
}) => {
  const article = getNewsById(id);
  const related = article ? getRelatedNews(id, article.category) : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article)
    return <div className="pt-32 text-center">Article not found.</div>;

  return (
    <div className="bg-white min-h-screen pt-24 font-jakarta pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-10 overflow-hidden">
          <span
            onClick={() => onNavigate("home")}
            className="hover:text-primary-600 cursor-pointer whitespace-nowrap transition-colors"
          >
            Home
          </span>
          <i className="fa-solid fa-chevron-right text-[8px] text-slate-300"></i>
          <span
            onClick={() => onNavigate("newsPage")}
            className="hover:text-primary-600 cursor-pointer whitespace-nowrap transition-colors"
          >
            News
          </span>
          <i className="fa-solid fa-chevron-right text-[8px] text-slate-300"></i>
          <span className="text-primary-600 truncate">{article.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Article Content */}
          <article className="lg:col-span-8 animate-fadeIn">
            <header className="mb-12">
              <span className="inline-block px-5 py-2 rounded-xl bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-widest mb-8 border border-primary-100 shadow-sm">
                {article.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight uppercase mb-10">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-8 py-8 border-y border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-xl font-black shadow-lg">
                    {article.author[0]}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-black text-slate-900 uppercase tracking-widest">
                      {article.author}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      Academics Editor
                    </p>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-10 bg-slate-100"></div>
                <div className="flex flex-col">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">
                    Published on
                  </p>
                  <p className="text-xs font-black text-slate-700">
                    {article.date}
                  </p>
                </div>
                <div className="hidden sm:block w-px h-10 bg-slate-100"></div>
                <div className="flex flex-col">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">
                    Source
                  </p>
                  <p className="text-xs font-black text-slate-700 uppercase tracking-widest">
                    {article.source}
                  </p>
                </div>
              </div>
            </header>

            <div className="w-full aspect-[21/10] rounded-2xl overflow-hidden shadow-2xl mb-16 border border-slate-100 group">
              <img
                src={article.image}
                className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                alt={article.title}
              />
            </div>

            <div className="prose prose-lg max-w-none prose-slate">
              <p className="text-xl md:text-2xl font-bold text-slate-700 leading-relaxed mb-12 border-l-8 border-primary-600 pl-8">
                {article.excerpt}
              </p>
              <div className="text-slate-600 space-y-6 leading-relaxed text-lg font-medium whitespace-pre-line">
                {article.content}
              </div>

              <div className="bg-slate-50 rounded-2xl p-10 md:p-12 my-16 border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-full blur-3xl opacity-40 -mr-16 -mt-16"></div>
                <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">
                  Key Takeaways
                </h3>
                <ul className="space-y-5">
                  {article.tags.map((tag) => (
                    <li key={tag} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                        <i className="fa-solid fa-check text-xs"></i>
                      </div>
                      <span className="text-slate-700 font-bold">
                        Important development regarding {tag} in the current
                        session.
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3 mt-12 pt-12 border-t border-slate-100">
                {article.tags.map((t) => (
                  <span
                    key={t}
                    className="px-5 py-2 bg-slate-50 text-slate-400 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-primary-600 hover:border-primary-100 transition-all cursor-default"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Sharing */}
            <div className="mt-20 p-10 bg-slate-900 rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group/share">
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary-600 rounded-full blur-[100px] opacity-20 -ml-32 -mt-32 transition-transform group-hover/share:scale-110 duration-700"></div>
              <div className="relative z-10 text-center md:text-left">
                <h4 className="text-2xl font-black mb-2 tracking-tight">
                  Share this update
                </h4>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                  Help your classmates stay informed
                </p>
              </div>
              <div className="flex gap-4 relative z-10">
                {["facebook-f", "linkedin-in", "twitter", "whatsapp"].map(
                  (s) => (
                    <button
                      key={s}
                      className="w-14 h-14 rounded-2xl bg-white/10 hover:bg-primary-600 border border-white/10 flex items-center justify-center text-xl transition-all hover:-translate-y-1 active:scale-90"
                    >
                      <i className={`fa-brands fa-${s}`}></i>
                    </button>
                  ),
                )}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-10">
            <div className="sticky top-28 space-y-10">
              {/* Related News */}
              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm overflow-hidden group">
                <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight flex items-center gap-3">
                  <i className="fa-solid fa-bolt text-primary-600"></i> Related
                  News
                </h3>
                <div className="space-y-10">
                  {related.length > 0 ? (
                    related.map((rel) => (
                      <div
                        key={rel.id}
                        onClick={() =>
                          onNavigate("newsDetails", { id: rel.id })
                        }
                        className="group/item cursor-pointer"
                      >
                        <div className="flex items-start gap-5">
                          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                            <img
                              src={rel.image}
                              className="w-full h-full object-cover transition-transform group-hover/item:scale-110"
                              alt=""
                            />
                          </div>
                          <div>
                            <h4 className="font-black text-sm text-slate-800 group-hover/item:text-primary-600 transition-colors leading-tight mb-2 uppercase tracking-tight">
                              {rel.title}
                            </h4>
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                              {rel.date}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 font-medium text-sm">
                      No related news in this category.
                    </p>
                  )}
                </div>
                <button
                  onClick={() => onNavigate("newsPage")}
                  className="w-full mt-10 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary-600 transition-all"
                >
                  Browse all news
                </button>
              </div>

              {/* Advertisement Card */}
              <div className="bg-primary-50 rounded-2xl p-10 border border-primary-100 shadow-sm relative overflow-hidden group/ad">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <span className="text-[9px] font-black text-primary-600 bg-white px-2 py-0.5 rounded-md uppercase tracking-widest shadow-sm mb-6 inline-block">
                    Flash Education
                  </span>
                  <h4 className="text-2xl font-black text-slate-900 leading-tight mb-4 tracking-tight">
                    Level up with Verified Resources
                  </h4>
                  <p className="text-slate-500 text-sm font-medium mb-10 leading-relaxed">
                    Join 5,000+ students and get access to handwritten notes,
                    past papers, and expert guides.
                  </p>
                  <button
                    onClick={() => onNavigate("studyResources")}
                    className="w-full py-4 bg-primary-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all active:scale-95"
                  >
                    Explore Resources
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailsPage;

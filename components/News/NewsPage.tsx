import React, { useMemo, useState } from "react";
import { getAllNews, NewsArticle } from "../../lib/news-data";
import { apiService } from "../../services/api";
import { useEffect } from "react";

interface NewsPageProps {
  onNavigate: (view: any, data?: any) => void;
}

type NewsCategoryFilter =
  | "All News"
  | "Admission"
  | "Scholarship"
  | "Exams"
  | "Notice"
  | "Events"
  | "Achievements"
  | "Others";

const categoryPills: NewsCategoryFilter[] = [
  "All News",
  "Admission",
  "Scholarship",
  "Exams",
  "Notice",
  "Events",
  "Achievements",
  "Others",
];

const mapNewsToUiCategory = (article: NewsArticle): NewsCategoryFilter => {
  if (article.category === "Academic") return "Admission";
  if (article.category === "Policy") return "Notice";
  if (article.category === "Tech") return "Exams";
  if (article.category === "Jobs") return "Others";
  return "Others";
};

const categoryBadgeClass = (category: NewsCategoryFilter) => {
  if (category === "Exams") return "bg-orange-100 text-orange-700";
  if (category === "Admission") return "bg-blue-100 text-blue-700";
  if (category === "Scholarship") return "bg-emerald-100 text-emerald-700";
  if (category === "Notice") return "bg-violet-100 text-violet-700";
  if (category === "Events") return "bg-pink-100 text-pink-700";
  if (category === "Achievements") return "bg-amber-100 text-amber-700";
  return "bg-slate-100 text-slate-700";
};

const NewsPage: React.FC<NewsPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<NewsCategoryFilter>("All News");
  const [sortBy, setSortBy] = useState<"Newest First" | "Oldest First">("Newest First");
  const [dynamicNews, setDynamicNews] = useState<NewsArticle[]>([]);

  const staticNews = getAllNews();

  useEffect(() => {
    const fetchUniNews = async () => {
      try {
        const res = await apiService.getUniversities();
        if (res.success && res.data?.universities) {
          const allUniNews: NewsArticle[] = [];
          res.data.universities.forEach(uni => {
            try {
              const nWs = typeof uni.news === 'string' ? JSON.parse(uni.news) : uni.news || [];
              if (Array.isArray(nWs)) {
                nWs.forEach((n: any, idx: number) => {
                  allUniNews.push({
                    id: `uni-${uni.id}-${idx}`,
                    category: n.type === "Notice" ? "Policy" : "Academic",
                    title: n.heading,
                    excerpt: n.excerpt || n.desc || "",
                    content: n.body || n.desc || "",
                    image: n.image || uni.logo || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80",
                    author: uni.name,
                    date: n.date || "Recently",
                    readTime: "3 min",
                    source: uni.name,
                    tags: [uni.name, n.type].filter(Boolean) as string[]
                  });
                });
              }
            } catch (err) {
              console.error("Error parsing news for university:", uni.name, err);
            }
          });
          setDynamicNews(allUniNews);
        }
      } catch (err) {
        console.error("Error fetching university news:", err);
      }
    };
    fetchUniNews();
  }, []);

  const allNews = useMemo(() => [...staticNews, ...dynamicNews], [staticNews, dynamicNews]);
  const featuredNews = allNews[0];

  const processedNews = useMemo(() => {
    const filtered =
      activeCategory === "All News"
        ? allNews
        : allNews.filter((article) => mapNewsToUiCategory(article) === activeCategory);

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "Newest First") {
        return b.id.localeCompare(a.id, undefined, { numeric: true, sensitivity: 'base' });
      }
      return a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' });
    });

    return sorted;
  }, [activeCategory, allNews, sortBy]);

  return (
    <main className="max-w-350 mx-auto py-10 space-y-14 bg-gray-50 min-h-screen text-slate-800">
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-5">Browse by category</h2>
        <div className="flex items-center gap-3 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categoryPills.map((pill) => {
            const isActive = activeCategory === pill;
            return (
              <button
                key={pill}
                onClick={() => setActiveCategory(pill)}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all shadow-sm ${
                  isActive
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-white border border-gray-200 text-slate-700 hover:bg-gray-50 hover:border-gray-300"
                }`}
              >
                {pill}
              </button>
            );
          })}
        </div>
      </section>

      {featuredNews && (
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-5">Featured Story of the Week</h2>
          <div
            onClick={() => onNavigate("newsDetails", { id: featuredNews.id })}
            className="relative w-full h-[450px] sm:h-[400px] rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
          >
            <img
              src={featuredNews.image}
              alt={featuredNews.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent"></div>

            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 w-full">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Featured
                    </span>
                    <div className="flex items-center text-gray-300 text-sm font-medium">
                      <i className="fa-regular fa-clock mr-1.5 opacity-80"></i>
                      90 days ago
                    </div>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight tracking-tight">
                    {featuredNews.title}
                  </h3>
                  <p className="text-gray-200 text-base sm:text-lg font-medium line-clamp-2">
                    {featuredNews.excerpt}
                  </p>
                </div>

                <button className="w-full sm:w-auto bg-white text-slate-900 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 shadow-sm whitespace-nowrap">
                  Read Full Story
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Latest News & stories</h2>
          <div className="flex items-center text-sm font-medium text-slate-600">
            <span className="mr-2">Sort by:</span>
            <label className="flex items-center gap-1 bg-white border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as "Newest First" | "Oldest First")}
                className="bg-transparent outline-none"
              >
                <option>Newest First</option>
                <option>Oldest First</option>
              </select>
              <i className="fa-solid fa-chevron-down text-xs ml-1 text-gray-400"></i>
            </label>
          </div>
        </div>

        <div id="news-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processedNews.map((item) => {
            const uiCategory = mapNewsToUiCategory(item);

            return (
              <article
                key={item.id}
                onClick={() => onNavigate("newsDetails", { id: item.id, article: item })}
                className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
              >
                <div className="mb-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${categoryBadgeClass(
                      uiCategory,
                    )}`}
                  >
                    {uiCategory}
                  </span>
                </div>

                <div className="rounded-xl overflow-hidden aspect-[16/10] mb-5 bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                <h3 className="font-bold text-lg text-slate-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm mb-5 flex-grow line-clamp-2 leading-relaxed">
                  {item.excerpt}
                </p>

                <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-sm mt-auto">
                  <span className="text-slate-400 flex items-center font-medium">
                    <i className="fa-regular fa-clock mr-1.5"></i> 90 Days ago
                  </span>
                  <span className="text-blue-600 font-semibold flex items-center group-hover:translate-x-1 transition-transform duration-200">
                    View Details <i className="fa-solid fa-chevron-right text-xs ml-1"></i>
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {processedNews.length === 0 && (
          <div className="text-center py-10 text-slate-500 bg-white border border-gray-200 rounded-2xl mt-6">
            No news available for this category.
          </div>
        )}
      </section>

      <div className="flex justify-center items-center space-x-2 pt-8">
        <button className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 text-slate-500 bg-white shadow-sm opacity-50" disabled>
          <i className="fa-solid fa-chevron-left text-xs"></i>
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-md bg-blue-600 text-white font-medium shadow-sm transition-colors">
          1
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 text-slate-600 hover:bg-gray-50 transition-colors bg-white shadow-sm font-medium">
          2
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 text-slate-600 hover:bg-gray-50 transition-colors bg-white shadow-sm font-medium">
          3
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 text-slate-600 hover:bg-gray-50 hover:text-slate-800 transition-colors bg-white shadow-sm">
          <i className="fa-solid fa-chevron-right text-xs"></i>
        </button>
      </div>
    </main>
  );
};

export default NewsPage;

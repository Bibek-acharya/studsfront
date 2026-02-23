import React, { useEffect } from "react";
import { getBlogById, getRelatedBlogs } from "../../lib/blogs-data";

interface BlogDetailsPageProps {
  id: string;
  onNavigate: (view: any, data?: any) => void;
}

const BlogDetailsPage: React.FC<BlogDetailsPageProps> = ({
  id,
  onNavigate,
}) => {
  const blog = getBlogById(id);
  const related = blog ? getRelatedBlogs(id, blog.category) : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!blog)
    return <div className="pt-32 text-center">Blog post not found.</div>;

  return (
    <div className="bg-white min-h-screen pt-24 font-jakarta pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Navigation / Header */}
        <button
          onClick={() => onNavigate("blogPage")}
          className="flex items-center gap-3 text-slate-400 hover:text-primary-600 transition-all font-black text-[10px] uppercase tracking-widest mb-12 group"
        >
          <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1"></i>
          <span>Back to Articles</span>
        </button>

        <header className="text-center mb-16">
          <span className="inline-block px-5 py-2 rounded-xl bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-8 border border-slate-100">
            {blog.category}
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tighter uppercase mb-12">
            {blog.title}
          </h1>

          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex items-center gap-4">
              <img
                src={`https://api.dicebear.com/7.x/notionists/svg?seed=${blog.authorAvatar}`}
                className="w-14 h-14 rounded-2xl border-2 border-slate-50 bg-slate-50 shadow-sm"
                alt=""
              />
              <div className="text-left">
                <p className="text-sm font-black text-slate-900 uppercase tracking-widest">
                  {blog.author}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  {blog.authorTitle}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] pt-4 border-t border-slate-50 w-full justify-center">
              <span>{blog.date}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
              <span>{blog.readTime} Read Time</span>
            </div>
          </div>
        </header>

        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl mb-20 border border-slate-100">
          <img
            src={blog.image}
            className="w-full h-full object-cover"
            alt={blog.title}
          />
        </div>

        {/* Article Body */}
        <article className="prose prose-lg max-w-none prose-slate animate-fadeIn">
          <p className="text-2xl font-bold text-slate-700 leading-relaxed mb-12 italic border-l-8 border-primary-600 pl-8">
            "{blog.excerpt}"
          </p>

          <div className="text-slate-600 space-y-8 leading-relaxed text-lg font-medium whitespace-pre-line">
            {blog.content}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.{" "}
            </p>

            <h3 className="text-3xl font-black text-slate-900 mt-16 mb-8 tracking-tight uppercase">
              Why This Matters for Your Career
            </h3>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. At StudSphere, we
              believe that providing students with actionable insights is the
              first step towards bridging the skill gap in Nepal's tech and
              academic ecosystems.
            </p>

            <blockquote className="bg-slate-50 p-10 rounded-2xl border border-slate-100 my-12 relative overflow-hidden">
              <i className="fa-solid fa-quote-left absolute top-8 left-10 text-primary-100 text-6xl"></i>
              <p className="relative z-10 text-xl font-bold text-slate-800 leading-relaxed italic">
                "Success in the professional world isn't just about what you
                know; it's about how you adapt your knowledge to solve
                real-world problems."
              </p>
              <footer className="mt-6 text-xs font-black uppercase tracking-widest text-primary-600">
                — The StudSphere Mentorship Team
              </footer>
            </blockquote>

            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mt-20 pt-10 border-t border-slate-50">
            {blog.tags.map((t) => (
              <span
                key={t}
                className="px-5 py-2 bg-slate-50 text-slate-400 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-primary-600 hover:border-primary-100 transition-all cursor-default"
              >
                #{t}
              </span>
            ))}
          </div>
        </article>

        {/* Related Section */}
        <section className="mt-32 pt-20 border-t border-slate-100">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
              More like this
            </h2>
            <button
              onClick={() => onNavigate("blogPage")}
              className="text-[10px] font-black uppercase tracking-widest text-primary-600 hover:underline flex items-center gap-2"
            >
              View all articles <i className="fa-solid fa-arrow-right-long"></i>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {related.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onNavigate("blogDetails", { id: rel.id })}
                className="bg-slate-50 p-8 rounded-2xl hover:bg-white hover:shadow-2xl transition-all duration-500 group cursor-pointer border border-transparent hover:border-slate-100"
              >
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                    <img
                      src={rel.image}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      alt=""
                    />
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-primary-600 uppercase tracking-widest mb-2 block">
                      {rel.category}
                    </span>
                    <h3 className="font-black text-slate-900 text-lg group-hover:text-primary-600 transition-colors leading-tight uppercase tracking-tight line-clamp-2">
                      {rel.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comments Placeholder */}
        <section className="mt-32 bg-slate-50 rounded-2xl p-10 md:p-16 border border-slate-100 text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl text-slate-200">
            <i className="fa-solid fa-comments text-4xl"></i>
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">
            Discussion
          </h3>
          <p className="text-slate-500 font-medium mb-10 max-w-sm mx-auto">
            Have a question or thought on this article? Join the discussion on
            our Campus Forum.
          </p>
          <button
            onClick={() => onNavigate("campusForum")}
            className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-black transition-all active:scale-95"
          >
            Go to Forum
          </button>
        </section>
      </div>
    </div>
  );
};

export default BlogDetailsPage;

import React, { useState } from "react";

const blogPosts = [
  {
    tag: "Career Strategy",
    title: "Mastering the Art of Remote Interviews in 2024",
    excerpt:
      "Learn the psychological triggers and technical setups that top tech companies look for.",
    author: "Sarah Jenkins",
    date: "March 12, 2024",
    readTime: "8 min read",
    color: "bg-blue-600",
    authorImg: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    tag: "Resume Tips",
    title: "Is Your Resume ATS-Proof? 5 Signs It's Getting Rejected",
    excerpt:
      "The hidden algorithms behind applicant tracking systems and how to beat them.",
    author: "Marcus Chen",
    date: "March 10, 2024",
    readTime: "5 min read",
    color: "bg-emerald-600",
    authorImg: "https://i.pravatar.cc/150?u=marcus",
  },
  {
    tag: "Productivity",
    title: "The 3-3-3 Rule for Job Seekers: Stop the Burnout",
    excerpt:
      "How a structured daily routine can triple your application-to-interview ratio.",
    author: "Elena Rodriguez",
    date: "March 08, 2024",
    readTime: "6 min read",
    color: "bg-amber-600",
    authorImg: "https://i.pravatar.cc/150?u=elena",
  },
];

const CareerBlogs: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-jakarta text-slate-900 pt-20">
      <style>{`
                .glass-card {
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
                .dot-grid {
                    background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
                    background-size: 30px 30px;
                }
                .blog-card:hover .blog-image {
                    transform: scale(1.05);
                }
            `}</style>

      {/* Blog Header */}
      <div className="relative py-24 overflow-hidden border-b border-slate-100 dot-grid">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-100/50 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-4 block">
            Insights & Expertise
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight uppercase tracking-tight mb-8">
            The Career <br /> <span className="text-blue-600">Blueprint.</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Data-driven guides and expert stories to help you navigate the
            modern workforce and secure the position you deserve.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {[
              "All Articles",
              "Resume Building",
              "Interview Mastery",
              "Negotiation",
              "Tech Trends",
            ].map((cat, i) => (
              <button
                key={i}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? "bg-slate-900 text-white shadow-xl" : "bg-white text-slate-500 border border-slate-100 hover:border-blue-200"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100 group cursor-pointer">
          <div className="grid lg:grid-cols-2">
            <div className="relative overflow-hidden h-80 lg:h-auto">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=2000"
                className="w-full h-full object-cover blog-image transition-transform duration-700"
                alt="Featured"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              <div className="absolute bottom-10 left-10">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest">
                  Editor's Choice
                </span>
              </div>
            </div>
            <div className="p-12 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span>March 15, 2024</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                <span>12 Min Read</span>
              </div>
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                How GPT-4 is Changing the Landscape of Recruitment.
              </h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                Beyond just writing resumes—discover how AI is being used by
                top-tier recruiters to find, vet, and hire talent in record
                time.
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                <img
                  src="https://i.pravatar.cc/150?u=admin"
                  className="w-12 h-12 rounded-2xl border-2 border-white shadow-sm"
                  alt="Author"
                />
                <div>
                  <div className="font-black text-slate-900 uppercase tracking-tight text-sm">
                    Alexander Grant
                  </div>
                  <div className="text-[10px] font-black text-slate-400 tracking-widest uppercase">
                    Senior Tech Analyst
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Feed */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h3 className="text-3xl font-black uppercase tracking-tight text-slate-900">
              Latest Updates
            </h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">
              New content added weekly
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:gap-4 transition-all">
            View All Posts <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogPosts.map((post, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 border border-slate-100 shadow-sm">
                <img
                  src={`https://images.unsplash.com/photo-${1580000000000 + idx}?auto=format&fit=crop&q=80&w=1000`}
                  className="w-full h-full object-cover blog-image transition-transform duration-700"
                  alt={post.title}
                />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-slate-900/80 to-transparent">
                  <span
                    className={`${post.color} text-white px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest`}
                  >
                    {post.tag}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                  <span>{post.readTime}</span>
                </div>
                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors leading-tight">
                  {post.title}
                </h4>
                <p className="text-slate-500 font-medium leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 pt-4">
                  <img
                    src={post.authorImg}
                    className="w-8 h-8 rounded-xl border border-white shadow-sm"
                    alt={post.author}
                  />
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight">
                    {post.author}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Grid */}
      <div className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="inline-flex items-center justify-center p-4 bg-white rounded-3xl shadow-sm border border-slate-100 mb-4">
              <i className="fa-solid fa-paper-plane text-2xl text-blue-600"></i>
            </div>
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">
              Stay Ahead of the Curve.
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              Get the latest career strategies and industry insights delivered
              to your inbox every Tuesday.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your work email"
                className="flex-grow px-8 py-5 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:border-blue-600 font-medium transition-all"
              />
              <button className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all active:scale-95 whitespace-nowrap">
                Subscribe Free
              </button>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              No spam, just value. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Footer lite */}
      <div className="bg-white py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black">
              S
            </div>
            <span className="text-lg font-black uppercase tracking-tighter">
              StudSphere - Blog
            </span>
          </div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            © 2024 StudSphere Future Bridge. All rights reserved.
          </div>
          <div className="flex gap-6">
            <i className="fa-brands fa-linkedin-in text-slate-400 hover:text-blue-600 transition-colors"></i>
            <i className="fa-brands fa-twitter text-slate-400 hover:text-blue-600 transition-colors"></i>
            <i className="fa-brands fa-instagram text-slate-400 hover:text-blue-600 transition-colors"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerBlogs;

import React, { useState } from "react";
import ForumHero from "./ForumHero";
import ForumSidebar from "./ForumSidebar";
import PostCard from "./PostCard";
import TrendingSidebar from "./TrendingSidebar";

interface CampusForumPageProps {
  onNavigate: (view: any) => void;
}

const CampusForumPage: React.FC<CampusForumPageProps> = ({ onNavigate }) => {
  const [activeCommunity, setActiveCommunity] = useState("Home Feed");

  return (
    <div className="min-h-screen bg-slate-50 font-jakarta selection:bg-primary-600 selection:text-white">
      <ForumHero />

      <div className="w-full px-4 lg:px-12 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar - Full Navigation */}
          <aside className="hidden lg:block lg:col-span-2 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar">
            <ForumSidebar
              activeCommunity={activeCommunity}
              onSelect={setActiveCommunity}
            />
          </aside>

          {/* Center Feed */}
          <main className="col-span-1 lg:col-span-7 space-y-6">
            {/* Post Input Component - Matches Screenshot 3 */}
            <div className="bg-white rounded-[2rem] shadow-sm p-6 border border-slate-100 transition-all hover:shadow-lg mb-6">
              <div className="flex gap-6 mb-6">
                <img
                  src="https://api.dicebear.com/7.x/notionists/svg?seed=Jagdish"
                  alt="User"
                  className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 shadow-inner"
                />
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Ask a questions here........"
                    className="w-full bg-slate-50 hover:bg-slate-100 text-slate-500 py-4 px-8 rounded-xl text-lg border-0 outline-none transition-all font-medium"
                  />
                </div>
              </div>
              <div className="flex items-center gap-10">
                <button className="flex items-center gap-3 text-[#2563EB] font-black text-sm uppercase tracking-widest hover:opacity-80 transition-all">
                  <i className="fa-solid fa-link text-xl"></i>
                  Link
                </button>
                <button className="flex items-center gap-3 text-[#2563EB] font-black text-sm uppercase tracking-widest hover:opacity-80 transition-all">
                  <i className="fa-solid fa-bars-staggered text-xl"></i>
                  Latest
                </button>
              </div>
            </div>

            {/* Main Discussions */}
            <div className="space-y-8">
              <PostCard
                author="Jagdish Dhami"
                category="Scholarship"
                time="2 hrs ago"
                title="Best resources for studying Data Structure in C for TU?"
                content="I'm struggling with linked lists and trees in Data Structure (BIM 4th Sem, TU). Can anyone recommend the best Nepali authors or online courses that explain these topics clearly based on the TU syllabus?"
                upvotes={45}
                answers={12}
                avatar="https://api.dicebear.com/7.x/notionists/svg?seed=Jagdish"
              />

              <PostCard
                author="Jagdish Dhami"
                category="Academics"
                time="2 hrs ago"
                title="Best resources for studying Data Structure in C for TU?"
                content="I'm struggling with linked lists and trees in Data Structure (BIM 4th Sem, TU). Can anyone recommend the best Nepali authors or online courses that explain these topics clearly based on the TU syllabus?"
                upvotes={45}
                answers={12}
                avatar="https://api.dicebear.com/7.x/notionists/svg?seed=Jagdish"
              />

              {/* Poll Card placeholder from Screenshot 3 */}
              <div className="bg-white rounded-[2rem] shadow-sm p-8 border border-slate-100">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src="https://api.dicebear.com/7.x/notionists/svg?seed=Jagdish"
                    alt="User"
                    className="w-14 h-14 rounded-full"
                  />
                  <div>
                    <h4 className="font-black text-slate-900">Jagdish Dhami</h4>
                    <div className="flex items-center gap-2">
                      <span className="bg-slate-100 px-3 py-1 rounded text-[10px] font-black uppercase text-slate-500">
                        Academics
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        • 2 hrs ago
                      </span>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-6">
                  Best resources for studying Data Structure in C for TU?
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="w-full p-4 bg-slate-50 rounded-xl font-black text-slate-700 border border-slate-100">
                    Jagdish
                  </div>
                  <div className="w-full p-4 bg-slate-50 rounded-xl font-black text-slate-700 border border-slate-100">
                    Jagdish
                  </div>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
                    <span>0 Votes</span>
                    <span>•</span>
                    <span>1 day left</span>
                  </div>
                  <div className="flex gap-6 text-slate-400">
                    <i className="fa-regular fa-heart text-xl hover:text-rose-500 cursor-pointer"></i>
                    <i className="fa-solid fa-share-nodes text-xl hover:text-blue-500 cursor-pointer"></i>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24">
            <TrendingSidebar />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CampusForumPage;

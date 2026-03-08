import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService, ForumPost } from "../../../services/api";
import { useAuth } from "../../../services/AuthContext";
import ForumHero from "./ForumHero";
import ForumSidebar from "./ForumSidebar";
import PostCard from "./PostCard";
import TrendingSidebar from "./TrendingSidebar";

interface CampusForumPageProps {
  onNavigate: (view: any) => void;
}

const CampusForumPage: React.FC<CampusForumPageProps> = ({ onNavigate }) => {
  const [activeCommunity, setActiveCommunity] = useState("Home Feed");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: posts, isLoading, error } = useQuery<ForumPost[]>({
    queryKey: ["forumPosts", activeCommunity],
    queryFn: () =>
      apiService.getForumPosts(
        activeCommunity === "Home Feed" ? "" : activeCommunity,
        apiService.getToken() || undefined,
      ),
  });

  const createPostMutation = useMutation({
    mutationFn: (data: { category: string; title: string; content: string }) => {
      const token = apiService.getToken();
      if (!token) throw new Error("Not authenticated");
      return apiService.createForumPost(token, data);
    },
    onSuccess: () => {
      setPostTitle("");
      setPostContent("");
      queryClient.invalidateQueries({ queryKey: ["forumPosts"] });
    },
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim()) return;
    if (!user) {
      onNavigate("login");
      return;
    }

    createPostMutation.mutate({
      category: activeCommunity === "Home Feed" ? "General" : activeCommunity,
      title: postTitle,
      content: postContent || "No content provided.",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary-600 selection:text-white">
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
            {/* Post Input Component */}
            <div className="bg-white rounded-[2rem] shadow-sm p-6 border border-slate-100 transition-all hover:shadow-lg mb-6">
              <form onSubmit={handleCreatePost}>
                <div className="flex gap-6 mb-6">
                  <img
                    src={user ? `https://api.dicebear.com/7.x/notionists/svg?seed=${user.email}` : "https://api.dicebear.com/7.x/notionists/svg?seed=Guest"}
                    alt="User"
                    className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 shadow-inner"
                  />
                  <div className="flex-1 space-y-4">
                    <input
                      type="text"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      placeholder="Post title..."
                      className="w-full bg-slate-50 hover:bg-slate-100 text-slate-900 py-3 px-6 rounded-xl text-lg border-0 outline-none transition-all font-bold"
                    />
                    <textarea
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      placeholder="What's on your mind?"
                      className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 py-4 px-6 rounded-xl text-base border-0 outline-none transition-all font-medium min-h-[120px] resize-none"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-10">
                    <button type="button" className="flex items-center gap-3 text-[#2563EB] font-black text-sm uppercase tracking-widest hover:opacity-80 transition-all">
                      <i className="fa-solid fa-link text-xl"></i>
                      Link
                    </button>
                    <button type="button" className="flex items-center gap-3 text-[#2563EB] font-black text-sm uppercase tracking-widest hover:opacity-80 transition-all">
                      <i className="fa-solid fa-bars-staggered text-xl"></i>
                      Latest
                    </button>
                  </div>
                  {postTitle.trim() && (
                    <button
                      type="submit"
                      disabled={createPostMutation.isPending}
                      className="bg-[#2563EB] text-white px-6 py-2 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-blue-700 transition-all disabled:opacity-50"
                    >
                      {createPostMutation.isPending ? "Posting..." : "Post"}
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Main Discussions */}
            <div className="space-y-8">
              {isLoading && (
                <div className="flex justify-center py-20">
                  <i className="fa-solid fa-spinner animate-spin text-4xl text-blue-500"></i>
                </div>
              )}

              {error && (
                <div className="bg-red-50 text-red-600 p-8 rounded-2xl text-center font-bold">
                  Failed to load posts. Please try again.
                </div>
              )}

              {posts?.map((post) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  author={`${post.user.first_name} ${post.user.last_name}`}
                  category={post.category}
                  time={new Date(post.created_at).toLocaleDateString()}
                  title={post.title}
                  content={post.content}
                  upvotes={post.upvotes}
                  answers={post.comment_count}
                  isLiked={post.is_liked}
                  isDisliked={post.is_disliked}
                  isSaved={post.is_saved}
                  downvotes={post.downvotes}
                  userId={post.user_id}
                  avatar={`https://api.dicebear.com/7.x/notionists/svg?seed=${post.user.email}`}
                />
              ))}

              {!isLoading && posts?.length === 0 && (
                <div className="bg-white p-12 rounded-3xl text-center border border-dashed border-slate-200">
                  <p className="text-slate-400 font-bold uppercase tracking-widest">No discussions found in this category.</p>
                </div>
              )}
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


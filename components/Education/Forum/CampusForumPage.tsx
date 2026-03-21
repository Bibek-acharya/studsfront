import React, { useEffect, useRef, useState } from "react";
import { apiService, ForumPost, ForumCommunity, ForumComment } from "../../../services/api";

interface CampusForumPageProps {
  onNavigate: (view: any) => void;
}

const CampusForumPage: React.FC<CampusForumPageProps> = ({ onNavigate }) => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [communities, setCommunities] = useState<ForumCommunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCommunityId, setSelectedCommunityId] = useState<number | null>(null);
  
  // Comments State
  const [openComments, setOpenComments] = useState<Record<number, boolean>>({});
  const [commentsMap, setCommentsMap] = useState<Record<number, ForumComment[]>>({});
  const [totalCommentsMap, setTotalCommentsMap] = useState<Record<number, number>>({});
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
  const [isCommentsLoading, setIsCommentsLoading] = useState<Record<number, boolean>>({});
  const [replyingTo, setReplyingTo] = useState<Record<number, ForumComment | null>>({});

  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  
  // Create Post State
  const [modalCommunityId, setModalCommunityId] = useState<number>(0);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [isPollEnabled, setIsPollEnabled] = useState(false);
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  const user = apiService.getUser();
  const isAuthenticated = apiService.isAuthenticated();

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [selectedCommunityId]);

  const fetchInitialData = async () => {
    try {
      const fetchedCommunities = await apiService.getForumCommunities();
      setCommunities(fetchedCommunities || []);
    } catch (error) {
      console.error("Failed to fetch forum communities:", error);
    }
  };

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const token = apiService.getToken() || undefined;
      const fetchedPosts = await apiService.getForumPosts(undefined, token, selectedCommunityId || undefined);
      setPosts(fetchedPosts || []);
    } catch (error) {
      console.error("Failed to fetch forum posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleComments = async (postId: number) => {
    const isOpening = !openComments[postId];
    setOpenComments((prev) => ({ ...prev, [postId]: isOpening }));

    if (isOpening && (!commentsMap[postId] || commentsMap[postId].length === 0)) {
      fetchComments(postId, 10, 0);
    }
  };

  const fetchComments = async (postId: number, limit: number, offset: number) => {
    setIsCommentsLoading(prev => ({ ...prev, [postId]: true }));
    try {
      const data = await apiService.getForumPostComments(postId, limit, offset);
      setCommentsMap(prev => ({ 
        ...prev, 
        [postId]: offset === 0 ? data.comments : [...(prev[postId] || []), ...data.comments] 
      }));
      setTotalCommentsMap(prev => ({ ...prev, [postId]: data.total_count }));
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setIsCommentsLoading(prev => ({ ...prev, [postId]: false }));
    }
  };

  const handleLoadMoreComments = (postId: number) => {
    const currentCount = commentsMap[postId]?.length || 0;
    fetchComments(postId, 10, currentCount);
  };

  const handleCommentSubmit = async (postId: number) => {
    if (!isAuthenticated) {
      alert("Please login to comment");
      onNavigate('login');
      return;
    }
    const content = commentInputs[postId]?.trim();
    if (!content) return;

    const parentId = replyingTo[postId]?.id;

    try {
      const newComment = await apiService.createForumComment(apiService.getToken()!, postId, { 
        content: parentId ? `@${replyingTo[postId]?.user.first_name} ${content}` : content,
        parent_id: parentId 
      });

      setCommentsMap(prev => ({
        ...prev,
        [postId]: [newComment, ...(prev[postId] || [])]
      }));
      setCommentInputs(prev => ({ ...prev, [postId]: "" }));
      setReplyingTo(prev => ({ ...prev, [postId]: null }));
      
      // Update post comment count locally
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, comment_count: p.comment_count + 1 } : p));
      setTotalCommentsMap(prev => ({ ...prev, [postId]: (prev[postId] || 0) + 1 }));
    } catch (error) {
      alert("Failed to add comment");
    }
  };

  const handlePollVote = async (postId: number, optionIdx: number) => {
    if (!isAuthenticated) {
      alert("Please login to vote");
      onNavigate('login');
      return;
    }

    try {
      const updatedPost = await apiService.voteForumPoll(apiService.getToken()!, postId, optionIdx);
      setPosts((prev) => prev.map((post) => (post.id === postId ? updatedPost : post)));
    } catch (error) {
      console.error("Failed to vote:", error);
      alert("Failed to vote. You might have already voted.");
    }
  };

  const toggleDropdown = (postId: number) => {
    setOpenDropdown((prev) => (prev === postId ? null : postId));
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedImage(file);
  };

  const handleVideoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedVideo(file);
  };

  const handlePollOptionChange = (index: number, value: string) => {
    setPollOptions((prev) => prev.map((option, idx) => (idx === index ? value : option)));
  };

  const addPollOption = () => {
    setPollOptions((prev) => (prev.length >= 4 ? prev : [...prev, ""]));
  };

  const handlePostSubmit = async () => {
    if (!isAuthenticated) {
      alert("Please login to post");
      onNavigate('login');
      return;
    }

    if (!modalCommunityId || !modalTitle.trim()) return;

    try {
      const pollItems = isPollEnabled
        ? pollOptions.map((option) => option.trim()).filter(Boolean)
        : [];

      const newPost = await apiService.createForumPost(apiService.getToken()!, {
        community_id: modalCommunityId,
        category: "General",
        title: modalTitle.trim(),
        content: modalContent.trim(),
        poll_options: pollItems.length > 1 ? pollItems : undefined,
        is_poll: pollItems.length > 1,
        image_url: selectedImage ? "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80" : undefined,
      });

      setPosts((prev) => [newPost, ...prev]);
      resetModal();
      setIsCreatePostModalOpen(false);
    } catch (error) {
      alert("Failed to create post. Please try again.");
    }
  };

  const resetModal = () => {
    setModalCommunityId(0);
    setModalTitle("");
    setModalContent("");
    setIsPollEnabled(false);
    setPollOptions(["", ""]);
    setSelectedImage(null);
    setSelectedVideo(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  const handleLike = async (postId: number) => {
    if (!isAuthenticated) return alert("Please login to like posts");
    try {
      const updatedPost = await apiService.likeForumPost(apiService.getToken()!, postId);
      setPosts(prev => prev.map(p => p.id === postId ? { 
        ...p, 
        upvotes: updatedPost.upvotes, 
        downvotes: updatedPost.downvotes, 
        is_liked: updatedPost.is_liked, 
        is_disliked: updatedPost.is_disliked 
      } : p));
    } catch (error) {
      console.error("Like failed:", error);
    }
  };

  const handleDislike = async (postId: number) => {
    if (!isAuthenticated) return alert("Please login to dislike posts");
    try {
      const updatedPost = await apiService.dislikeForumPost(apiService.getToken()!, postId);
      setPosts(prev => prev.map(p => p.id === postId ? { 
        ...p, 
        upvotes: updatedPost.upvotes, 
        downvotes: updatedPost.downvotes, 
        is_liked: updatedPost.is_liked, 
        is_disliked: updatedPost.is_disliked 
      } : p));
    } catch (error) {
      console.error("Dislike failed:", error);
    }
  };

  const handleCreatePostClick = () => {
    if (!isAuthenticated) {
      alert("Please login to create a post");
      onNavigate('login');
      return;
    }
    setIsCreatePostModalOpen(true);
  };

  useEffect(() => {
    if (!isCreatePostModalOpen) return;
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCreatePostModalOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isCreatePostModalOpen]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1a1a1a] antialiased">
      <div className="mx-auto flex w-full max-w-[1400px] justify-center gap-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* Left Sidebar */}
        <div className="sticky top-6 hidden h-fit w-[280px] shrink-0 space-y-6 lg:block">
          <div className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-5 text-center shadow-sm transition hover:shadow-md">
            <div className="relative mb-3 h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-md">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=256&q=80"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="text-lg font-bold text-gray-900">{user ? `${user.first_name} ${user.last_name}` : "Guest User"}</h2>
            <p className="text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-widest">{user?.role || "STUDENT"}</p>
            {!isAuthenticated && (
              <button 
                onClick={() => onNavigate('login')}
                className="mt-1 text-sm font-bold text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline"
              >
                Login / Register
              </button>
            )}
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black uppercase tracking-[0.1em] text-gray-400">
                Student Communities
              </h3>
              {selectedCommunityId && (
                <button 
                  onClick={() => setSelectedCommunityId(null)}
                  className="text-[10px] font-black text-blue-600 hover:underline"
                >
                  CLEAR
                </button>
              )}
            </div>
            <div className="space-y-1">
              {communities.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => setSelectedCommunityId(item.id)}
                  className={`flex w-full items-center gap-3 rounded-lg p-2 transition ${selectedCommunityId === item.id ? "bg-blue-50" : "hover:bg-gray-50"}`}
                >
                  <div className={`h-9 w-9 shrink-0 ${item.bg_color || "bg-gray-100"} flex items-center justify-center overflow-hidden rounded-lg text-lg`}>
                    {item.emoji}
                  </div>
                  <span className={`text-[13px] font-bold ${selectedCommunityId === item.id ? "text-blue-600" : "text-gray-600"}`}>
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Feed */}
        <div className="w-full max-w-[600px] space-y-4">
          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <span className="shrink-0 text-2xl">🎓</span>
              <input
                type="text"
                placeholder="Ask anonymously about courses, colleges, or entrance exams..."
                readOnly
                onClick={handleCreatePostClick}
                className="w-full cursor-pointer border-none bg-transparent text-sm font-medium text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>
            <div className="flex items-center gap-1 border-t border-gray-100 pt-3">
              <button onClick={handleCreatePostClick} className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-bold text-gray-500 transition hover:bg-gray-50 hover:text-blue-600">
                <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 7h.01M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
                Image
              </button>
              <button onClick={handleCreatePostClick} className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-bold text-gray-500 transition hover:bg-gray-50 hover:text-purple-600">
                <svg className="h-4 w-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3v18h18" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V9m4 8V5m4 12v-6" />
                </svg>
                Poll
              </button>
              <button onClick={handleCreatePostClick} className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-bold text-gray-500 transition hover:bg-gray-50 hover:text-red-600">
                <svg className="h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m-6 4h5a2 2 0 002-2V8a2 2 0 00-2-2H9a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Video
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5 transition hover:border-gray-200 overflow-hidden">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${post.community?.bg_color || "bg-blue-600"} text-xs font-bold text-white`}>
                      {post.community?.emoji || "✨"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-[13px] font-black text-gray-900 uppercase tracking-wide">{post.community?.name || "General"}</h3>
                        <span className="text-[11px] font-bold text-gray-400 tracking-tight">• {new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="mt-0.5 text-[11px] font-bold text-gray-500">{post.user.first_name} {post.user.last_name}</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <button onClick={() => toggleDropdown(post.id)} className="rounded-full p-1.5 text-gray-400 transition hover:bg-gray-100">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="5" r="1.6" fill="currentColor" />
                        <circle cx="12" cy="12" r="1.6" fill="currentColor" />
                        <circle cx="12" cy="19" r="1.6" fill="currentColor" />
                      </svg>
                    </button>

                    {openDropdown === post.id && (
                      <div className="absolute right-0 z-50 mt-1 w-56 rounded-xl border border-gray-100 bg-white py-2 shadow-lg ring-1 ring-black/5">
                        <button className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-bold text-gray-700 transition hover:bg-gray-50">Share via...</button>
                        <button className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-bold text-gray-700 transition hover:bg-gray-50">Not interested</button>
                        <button className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-bold text-red-600 transition hover:bg-red-50">Report</button>
                      </div>
                    )}
                  </div>
                </div>

                <h2 className="mb-2 text-base font-black leading-tight text-gray-900">{post.title}</h2>
                {post.content && <p className="mb-3 text-[14px] leading-relaxed text-gray-600">{post.content}</p>}

                {post.image_url && (
                  <div className="relative mb-3 h-48 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 md:h-64 shadow-inner">
                    <img src={post.image_url} alt="Post content" className="h-full w-full object-cover" />
                  </div>
                )}

                {post.is_poll && post.poll_options && (
                  <div className="mb-3 space-y-2">
                    {JSON.parse(post.poll_options).map((option: string, index: number) => {
                      const hasVoted = post.voted_option != null;
                      const votes = post.poll_results?.[index] || 0;
                      const percentage = post.total_votes ? Math.round((votes / post.total_votes) * 100) : 0;
                      const isSelected = post.voted_option === index;

                      return (
                        <div 
                          key={`${post.id}-poll-${index}`} 
                          onClick={() => (!isSelected) && handlePollVote(post.id, index)}
                          className={`relative cursor-pointer overflow-hidden rounded-xl border transition-all duration-300 ${
                            hasVoted 
                              ? isSelected ? "border-blue-500 bg-blue-50" : "border-gray-100 bg-white"
                              : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                          } p-3`}
                        >
                          {hasVoted && (
                            <div 
                              className={`absolute left-0 top-0 bottom-0 transition-all duration-1000 ease-out ${isSelected ? "bg-blue-100" : "bg-gray-100"}`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          )}
                          <div className="relative z-10 flex justify-between text-sm font-bold text-gray-700">
                            <div className="flex items-center gap-2">
                              <span>{option}</span>
                              {isSelected && (
                                <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            {hasVoted && <span>{percentage}%</span>}
                          </div>
                        </div>
                      );
                    })}
                    {post.total_votes != null && (
                       <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest">{post.total_votes} total votes</p>
                    )}
                  </div>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-2 pb-1">
                  <div className="flex items-center rounded-full bg-[#F2F4F7]">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 rounded-l-full px-3.5 py-1.5 text-[13px] font-black transition ${post.is_liked ? "text-indigo-600 bg-indigo-50" : "text-[#5C607A] hover:bg-gray-200"}`}
                    >
                      <svg className={`h-4 w-4 ${post.is_liked ? "fill-current" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
                      </svg>
                      {post.upvotes}
                    </button>
                    <div className="h-4 w-px bg-gray-300"></div>
                    <button 
                      onClick={() => handleDislike(post.id)}
                      className={`rounded-r-full px-3.5 py-1.5 transition ${post.is_disliked ? "text-red-600 bg-red-50" : "text-[#5C607A] hover:bg-gray-200"}`}
                    >
                      <svg className={`h-4 w-4 ${post.is_disliked ? "fill-current" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  <button 
                    onClick={() => toggleComments(post.id)}
                    className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-black transition ${openComments[post.id] ? "bg-blue-50 text-blue-600" : "bg-[#F2F4F7] text-[#5C607A] hover:bg-gray-200"}`}
                  >
                    <svg className={`h-4 w-4 ${openComments[post.id] ? "text-blue-600" : "text-[#7A809D]"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z" />
                    </svg>
                    {post.comment_count} {post.comment_count === 1 ? 'Comment' : 'Comments'}
                  </button>
                </div>

                {/* Comment Section */}
                {openComments[post.id] && (
                  <div className="mt-4 border-t border-gray-100 pt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    
                    {/* Responding to indicator */}
                    {replyingTo[post.id] && (
                      <div className="flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2 text-[11px] font-bold text-blue-600">
                        <span>Replying to {replyingTo[post.id]?.user.first_name}</span>
                        <button onClick={() => setReplyingTo(prev => ({...prev, [post.id]: null}))}>✕</button>
                      </div>
                    )}

                    {/* Comment Input */}
                    <div className="flex gap-3">
                      <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-100">
                        <img
                          src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&q=80"}
                          className="h-full w-full object-cover"
                          alt="Your avatar"
                        />
                      </div>
                      <div className="relative flex-1">
                        <textarea
                          value={commentInputs[post.id] || ""}
                          onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleCommentSubmit(post.id);
                            }
                          }}
                          placeholder={replyingTo[post.id] ? "Write a reply..." : "Write a comment..."}
                          className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 outline-none focus:border-blue-200 focus:bg-white transition"
                          rows={1}
                        />
                        <button 
                          disabled={!(commentInputs[post.id]?.trim())}
                          onClick={() => handleCommentSubmit(post.id)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 disabled:text-gray-300 transition hover:scale-110"
                        >
                          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                            <path d="M2.01 21L23 12L2.01 3L2 10l15 2l-15 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-3">
                      {(commentsMap[post.id] || []).map((comment) => (
                        <div key={comment.id} className={`flex gap-3 items-start group ${comment.parent_id ? "ml-10" : ""}`}>
                          <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-slate-100 border border-white shadow-sm">
                            <img
                              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=64&q=80"
                              className="h-full w-full object-cover"
                              alt={comment.user.first_name}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="rounded-2xl bg-gray-50 px-4 py-2.5 transition group-hover:bg-gray-100/70">
                              <div className="flex items-center justify-between mb-0.5">
                                <h4 className="text-[12px] font-black text-gray-900 leading-none">{comment.user.first_name} {comment.user.last_name}</h4>
                                <span className="text-[10px] font-bold text-gray-400">{new Date(comment.created_at).toLocaleDateString()}</span>
                              </div>
                              <p className="text-[13px] font-medium leading-normal text-gray-700">
                                {comment.content}
                              </p>
                            </div>
                            <div className="mt-1 flex gap-4 pl-2">
                               <button 
                                 onClick={() => setReplyingTo(prev => ({...prev, [post.id]: comment}))}
                                 className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition"
                               >
                                 Reply
                               </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {isCommentsLoading[post.id] && (
                        <div className="flex justify-center py-2">
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                        </div>
                      )}

                      {/* Load More Button */}
                      {(totalCommentsMap[post.id] || 0) > (commentsMap[post.id]?.length || 0) && !isCommentsLoading[post.id] && (
                        <button 
                          onClick={() => handleLoadMoreComments(post.id)}
                          className="w-full rounded-xl bg-slate-50 border border-slate-100 py-2 text-center text-xs font-black uppercase tracking-widest text-blue-600 transition hover:bg-blue-50"
                        >
                          Show More Comments ({(totalCommentsMap[post.id] || 0) - (commentsMap[post.id]?.length || 0)} more)
                        </button>
                      )}

                      {(commentsMap[post.id] || []).length === 0 && !isCommentsLoading[post.id] && (
                        <p className="text-center text-[11px] font-bold text-gray-400 py-2">No comments yet. Start the conversation!</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Right Sidebar */}
        <div className="sticky top-6 hidden h-fit w-[300px] shrink-0 space-y-6 xl:block">
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-xl text-orange-500">🔥</span>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Trending Discussions</h3>
            </div>
            <div className="space-y-4">
              {[
                { title: "When are the TU BSc.CSIT 4th sem results coming out?", cat: "TU UPDATES", replies: 62 },
                { title: "Best YouTube channels or resources for CEE Physics prep?", cat: "MEDICAL PREP", replies: 34 }
              ].map((item, idx) => (
                <div key={idx}>
                  <h4 className="cursor-pointer text-sm font-bold leading-snug text-gray-800 transition hover:text-blue-600">
                    {item.title}
                  </h4>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] font-black text-blue-600/70">{item.cat}</span>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{item.replies} Replies</div>
                  </div>
                  {idx === 0 && <div className="mt-4 h-px bg-gray-50"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>

      {/* Create Post Modal */}
      {isCreatePostModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-3"
          onClick={() => setIsCreatePostModalOpen(false)}
        >
          <div
            className="relative h-[80vh] w-full max-w-[620px] overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <button
                onClick={() => setIsCreatePostModalOpen(false)}
                className="flex items-center gap-2 text-gray-900 group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 group-hover:bg-slate-100 transition">
                  <span className="text-lg">←</span>
                </div>
                <span className="text-xl font-black tracking-tight">Create Post</span>
              </button>
              <button
                onClick={handlePostSubmit}
                disabled={!modalCommunityId || !modalTitle.trim()}
                className={`rounded-full px-7 py-2.5 text-sm font-black uppercase tracking-widest transition-all ${
                  modalCommunityId && modalTitle.trim()
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 active:scale-95"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                Post
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Target Community</label>
                <div className="relative">
                  <select
                    value={modalCommunityId}
                    onChange={(event) => setModalCommunityId(Number(event.target.value))}
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-slate-50 px-5 py-3.5 text-base font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  >
                    <option value={0}>Choose where to post...</option>
                    {communities.map(c => (
                      <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.117l3.71-3.886a.75.75 0 111.08 1.04l-4.25 4.453a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <input
                value={modalTitle}
                onChange={(event) => setModalTitle(event.target.value)}
                placeholder="Title of your post"
                className="w-full border-b border-transparent bg-transparent text-2xl font-black text-gray-900 outline-none placeholder:text-gray-300 focus:placeholder:text-gray-200"
              />

              <textarea
                value={modalContent}
                onChange={(event) => setModalContent(event.target.value)}
                placeholder="What's on your mind? Share thoughts, ask questions or seek advice anonymously..."
                className="min-h-[120px] w-full resize-none border-none bg-transparent text-lg font-medium leading-relaxed text-gray-600 outline-none placeholder:text-gray-300"
              />

              {isPollEnabled && (
                <div className="rounded-2xl border border-purple-100 bg-purple-50/50 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-black uppercase tracking-widest text-purple-600">Poll Options</p>
                    <button onClick={() => setIsPollEnabled(false)} className="text-[10px] font-bold text-purple-400 hover:text-purple-600">REMOVE POLL</button>
                  </div>
                  <div className="space-y-3">
                    {pollOptions.map((option, index) => (
                      <input
                        key={`poll-option-${index}`}
                        value={option}
                        onChange={(event) => handlePollOptionChange(index, event.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="w-full rounded-xl border border-purple-100 bg-white px-4 py-3 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                      />
                    ))}
                  </div>
                  {pollOptions.length < 4 && (
                    <button
                      onClick={addPollOption}
                      className="mt-2 text-xs font-black text-purple-600 hover:text-purple-700 flex items-center gap-1"
                    >
                      <span className="text-lg">+</span> Add option
                    </button>
                  )}
                </div>
              )}

              {(selectedImage || selectedVideo) && (
                <div className="space-y-2">
                  {selectedImage && (
                    <div className="flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700">
                      <span>Image: {selectedImage.name}</span>
                      <button onClick={() => setSelectedImage(null)}>✕</button>
                    </div>
                  )}
                  {selectedVideo && (
                    <div className="flex items-center justify-between rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                      <span>Video: {selectedVideo.name}</span>
                      <button onClick={() => setSelectedVideo(null)}>✕</button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 bg-white px-8 py-6">
              <div className="flex items-center justify-center gap-12">
                {[
                  { label: "Image", icon: "🖼️", bg: "bg-blue-50", text: "text-blue-600" },
                  { label: "Poll", icon: "📊", bg: "bg-purple-50", text: "text-purple-600" },
                  { label: "Video", icon: "🎥", bg: "bg-red-50", text: "text-red-600" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      if (item.label === "Image") imageInputRef.current?.click();
                      if (item.label === "Video") videoInputRef.current?.click();
                      if (item.label === "Poll") setIsPollEnabled((prev) => !prev);
                    }}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl ${item.bg} ${item.text} transition-all group-hover:scale-110 active:scale-95 ${item.label === "Poll" && isPollEnabled ? "ring-2 ring-purple-600 ring-offset-4" : ""}`}
                    >
                      {item.icon}
                    </div>
                    <span className="text-xs font-black text-gray-400 group-hover:text-gray-600 uppercase tracking-widest">{item.label}</span>
                  </button>
                ))}
              </div>

              <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
              <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={handleVideoSelect} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampusForumPage;

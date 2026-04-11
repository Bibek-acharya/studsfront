import React, { useEffect, useRef, useState } from "react";
import { apiService, ForumPost, ForumCommunity, ForumComment } from "../../../services/api";

interface CampusForumPageProps {
  onNavigate: (view: any) => void;
}

// ─── Image URL helpers ─────────────────────────────────────────────────────────

function parseImageUrls(rawUrl?: string): string[] {
  if (!rawUrl) return [];
  if (rawUrl.startsWith("[")) {
    try {
      const arr = JSON.parse(rawUrl);
      if (Array.isArray(arr)) return arr.filter(Boolean);
    } catch {
      // fall through
    }
  }
  return [rawUrl];
}

function formatRelativeTime(dateStr?: string): string {
  if (!dateStr) return "now";
  const date = new Date(dateStr);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSecs = Math.floor(diffInMs / 1000);

  if (diffInSecs < 60) return "now";

  const mins = Math.floor(diffInSecs / 60);
  if (mins < 60) return `${mins}m`;

  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo`;

  const years = Math.floor(days / 365);
  return `${years}y`;
}

// ─── LinkedIn-style image grid ────────────────────────────────────────────────

const ImageGrid: React.FC<{ urls: string[] }> = ({ urls }) => {
  if (urls.length === 0) return null;

  if (urls.length === 1) {
    return (
      <div className="mb-3 overflow-hidden rounded-xl border border-gray-100">
        <img src={urls[0]} alt="Post" className="w-full max-h-80 object-cover" />
      </div>
    );
  }

  if (urls.length === 2) {
    return (
      <div className="mb-3 grid grid-cols-2 gap-1 overflow-hidden rounded-xl">
        {urls.map((u, i) => (
          <img key={i} src={u} alt={`Post ${i + 1}`} className="h-52 w-full object-cover" />
        ))}
      </div>
    );
  }

  if (urls.length === 3) {
    return (
      <div className="mb-3 grid grid-cols-[1fr_1fr] gap-1 overflow-hidden rounded-xl h-52">
        <img src={urls[0]} alt="Post 1" className="h-full w-full object-cover row-span-2" />
        <img src={urls[1]} alt="Post 2" className="h-[102px] w-full object-cover" />
        <img src={urls[2]} alt="Post 3" className="h-[102px] w-full object-cover" />
      </div>
    );
  }

  // 4+ images
  const visible = urls.slice(0, 4);
  const extra = urls.length - 4;
  return (
    <div className="mb-3 grid grid-cols-2 gap-1 overflow-hidden rounded-xl">
      {visible.map((u, i) => (
        <div key={i} className="relative h-36">
          <img src={u} alt={`Post ${i + 1}`} className="h-full w-full object-cover" />
          {i === 3 && extra > 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="text-2xl font-black text-white">+{extra}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ─── Comment Thread Component ─────────────────────────────────────────────────

interface CommentItemProps {
  comment: ForumComment;
  postId: number;
  depth?: number;
  onReply: (comment: ForumComment) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, postId, depth = 0, onReply }) => {
  const [showReplies, setShowReplies] = useState(false);
  const replyCount = comment.replies?.length || 0;

  return (
    <div className="flex gap-2.5 items-start">
      <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-slate-100 border border-white shadow-sm">
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user.first_name}`}
          className="h-full w-full object-cover"
          alt={comment.user.first_name}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="rounded-2xl bg-gray-50 px-4 py-2.5 group">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[12px] font-black text-gray-900 leading-none">
              {comment.user.first_name} {comment.user.last_name}
            </span>
            <span className="text-[10px] font-bold text-gray-400">
              {formatRelativeTime(comment.createdAt || comment.created_at)}
            </span>
          </div>
          <p className="text-[13px] font-medium leading-relaxed text-gray-700">{comment.content}</p>
        </div>

        <div className="mt-1.5 flex items-center gap-4 pl-2">
          <button
            onClick={() => onReply(comment)}
            className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition"
          >
            Reply
          </button>
          {replyCount > 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-700 transition"
            >
              <svg
                className={`h-3 w-3 transition-transform duration-200 ${showReplies ? "rotate-90" : ""}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
              {showReplies ? "Hide" : "View"} {replyCount} {replyCount === 1 ? "Reply" : "Replies"}
            </button>
          )}
        </div>

        {showReplies && replyCount > 0 && (
          <div className="mt-3 space-y-3 border-l-2 border-gray-100 pl-4">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                postId={postId}
                depth={depth + 1}
                onReply={onReply}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Community Header for Detail View ──────────────────────────────────────────

const CommunityHeader: React.FC<{
  community: ForumCommunity;
  onJoin: (id: number) => void;
  onShare: (id: number) => void;
  onInvite: (id: number) => void;
  isLoading: boolean;
  onBack?: () => void;
}> = ({ community, onJoin, onShare, onInvite, isLoading, onBack }) => {
  return (
    <header className="bg-white w-full border-b border-gray-100 pt-10 pb-8 px-4 sm:px-8 lg:px-12 mb-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Top Section: Logo/Icon */}
        <div className="mb-5 flex items-center justify-between">
          <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white flex items-center justify-center text-4xl">
            {community.emoji || "🎓"}
          </div>
          {onBack && (
             <button onClick={onBack} className="flex items-center gap-2 text-[#5468ff] font-bold text-sm hover:underline transition">
               <span className="text-lg">←</span> Back to Global Feed
             </button>
          )}
        </div>

        {/* Info and Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-[32px] font-bold text-[#0f1d3a] tracking-tight">{community.name}</h1>
            <p className="text-[15px] text-gray-500 flex items-center gap-2">
              <span>🚀</span> {community.description || "The heart of tech enthusiasts & community discussions."}
            </p>
            <p className="text-[13px] text-gray-400 font-medium mt-1">
              {community.member_count ?? 0} members <span className="mx-1">•</span> {community.post_count ?? 0} posts
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onJoin(community.id)}
              disabled={isLoading}
              className={`px-8 py-2.5 rounded-full font-bold text-[14px] transition-all duration-200 shadow-sm active:scale-95 flex items-center gap-2 ${
                community.is_member
                  ? "bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 group"
                  : "bg-[#5468ff] hover:bg-[#4355eb] text-white"
              }`}
            >
              {isLoading ? "..." : community.is_member ? "Leave Community" : "Join Community"}
            </button>
            <button
              onClick={() => onInvite(community.id)}
              className="bg-white border-[1.5px] border-[#5468ff] text-[#5468ff] hover:bg-[#f4f6ff] px-6 py-2.5 rounded-full font-bold text-[14px] transition-all duration-200 active:scale-95"
            >
              Invite Friends
            </button>
            <button
              onClick={() => onShare(community.id)}
              className="bg-white border-[1.5px] border-[#5468ff] text-[#5468ff] hover:bg-[#f4f6ff] w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// ─── Post Item for Community Detail ──────────────────────────────────────────

const CommunityPostItem: React.FC<{
  post: ForumPost;
  user: any;
  onActionClick: (id: number) => void;
  onShare: (id: number) => void;
  onReport: (id: number) => void;
  onEdit: (post: ForumPost) => void;
  onDelete: (id: number) => void;
}> = ({ post, user, onActionClick, onShare, onReport, onEdit, onDelete }) => {
  const imageUrls = parseImageUrls(post.image_url);
  return (
    <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-5 hover:border-blue-100 transition">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-[14px] shadow-sm uppercase">
            {post.user?.first_name?.charAt(0) || "U"}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#0f1d3a] text-[15px]">{post.user?.first_name} {post.user?.last_name}</span>
              {/* Verified Badge */}
              <svg className="w-4 h-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 11.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-400 text-[13px]">• {formatRelativeTime(post.CreatedAt || post.created_at)}</span>
            </div>
            <div className="text-gray-400 text-[13px]">
               {post.user?.role || "Student"} @ <span className="text-[#5468ff] font-medium">Community Member</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button className="border-[1.5px] border-[#5468ff] text-[#5468ff] hover:bg-[#f4f6ff] px-4 py-1.5 rounded-full text-[13px] font-bold transition-colors">
              Follow
           </button>
           <button onClick={() => onActionClick(post.id)} className="text-gray-400 hover:text-gray-600 p-1">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
           </button>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-[18px] font-bold text-[#0f1d3a] leading-snug">{post.title}</h2>
        <p className="mt-2 text-[#334155] text-[15px] leading-relaxed line-clamp-4">{post.content}</p>
      </div>

      <div className="mt-4">
        <ImageGrid urls={imageUrls} />
        {post.video_url && (
           <div className="mt-3 overflow-hidden rounded-xl border border-gray-100">
             <video src={post.video_url} controls className="w-full max-h-80 object-cover bg-black" />
           </div>
        )}
      </div>

      <div className="mt-5 flex items-center gap-3 flex-wrap">
        <div className="flex items-center bg-[#f4f6ff] rounded-full border border-[#e0e7ff] overflow-hidden">
          <button className="flex items-center gap-1.5 px-4 py-2 text-[#5468ff] hover:bg-blue-100/50 transition font-bold text-[14px]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
            Upvote
          </button>
          <div className="w-[1px] h-4 bg-blue-200"></div>
          <button className="px-3 py-2 text-gray-400 hover:bg-gray-100 transition">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </button>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-[#f8fafc] hover:bg-gray-100 border border-[#e2e8f0] rounded-full text-gray-600 transition font-bold text-[14px]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          Comment
        </button>

        <button onClick={() => onShare(post.id)} className="flex items-center gap-2 px-4 py-2 bg-[#f8fafc] hover:bg-gray-100 border border-[#e2e8f0] rounded-full text-gray-600 transition font-bold text-[14px]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          Share
        </button>
      </div>
    </div>
  );
};

// ─── Join Button ───────────────────────────────────────────────────────────────

interface JoinButtonProps {
  communityId: number;
  isMember: boolean;
  isLoading: boolean;
  onToggle: (communityId: number) => void;
  size?: "sm" | "md";
}

const JoinButton: React.FC<JoinButtonProps> = ({ communityId, isMember, isLoading, onToggle, size = "sm" }) => {
  const base = size === "sm"
    ? "rounded-full border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest transition-all "
    : "rounded-full border px-4 py-1.5 text-xs font-black uppercase tracking-widest transition-all ";

  const cls = isMember
    ? base + "border-gray-300 text-gray-500 hover:border-red-300 hover:text-red-500 hover:bg-red-50"
    : base + "border-blue-500 text-blue-600 bg-blue-50 hover:bg-blue-100";

  return (
    <button
      onClick={(e) => { e.stopPropagation(); onToggle(communityId); }}
      disabled={isLoading}
      className={cls + " disabled:opacity-50"}
    >
      {isLoading ? "..." : isMember ? "Joined" : "Join"}
    </button>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────

const CampusForumPage: React.FC<CampusForumPageProps> = ({ onNavigate }) => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [communities, setCommunities] = useState<ForumCommunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCommunityId, setSelectedCommunityId] = useState<number | null>(null);

  // Comments state
  const [openComments, setOpenComments] = useState<Record<number, boolean>>({});
  const [commentsMap, setCommentsMap] = useState<Record<number, ForumComment[]>>({});
  const [totalCommentsMap, setTotalCommentsMap] = useState<Record<number, number>>({});
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
  const [isCommentsLoading, setIsCommentsLoading] = useState<Record<number, boolean>>({});
  const [replyingTo, setReplyingTo] = useState<Record<number, ForumComment | null>>({});

  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  // Community membership
  const [joinLoading, setJoinLoading] = useState<Record<number, boolean>>({});

  // Create Post State
  const [modalCommunityId, setModalCommunityId] = useState<number>(0);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [isPollEnabled, setIsPollEnabled] = useState(false);
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoPreviews, setVideoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Post actions state ────────────────────────────────────────────────────
  const [hiddenPostIds, setHiddenPostIds] = useState<Set<number>>(new Set());
  const [sharePostId, setSharePostId] = useState<number | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteCommunityId, setInviteCommunityId] = useState<number | null>(null);
  const [inviteCopySuccess, setInviteCopySuccess] = useState(false);
  const [reportPostId, setReportPostId] = useState<number | null>(null);
  const [reportReason, setReportReason] = useState("");
  const [reportOther, setReportOther] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  // Edit
  const [editPostId, setEditPostId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [isEditSubmitting, setIsEditSubmitting] = useState(false);
  // Confirm Leave
  const [confirmLeaveId, setConfirmLeaveId] = useState<number | null>(null);

  // Delete confirm
  const [deletePostId, setDeletePostId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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
      const token = apiService.getToken() || undefined;
      const fetched = await apiService.getForumCommunities(token);
      setCommunities(fetched || []);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const token = apiService.getToken() || undefined;
      const fetched = await apiService.getForumPosts(undefined, token, selectedCommunityId || undefined);
      setPosts(fetched || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Post actions ──────────────────────────────────────────────────────────

  const handleNotInterested = (postId: number) => {
    setHiddenPostIds((prev) => new Set([...prev, postId]));
    setOpenDropdown(null);
  };

  const handleOpenShare = (postId: number) => {
    setSharePostId(postId);
    setOpenDropdown(null);
    setCopySuccess(false);
  };

  const handleOpenReport = (postId: number) => {
    setReportPostId(postId);
    setOpenDropdown(null);
    setReportReason("");
    setReportOther("");
    setReportSubmitted(false);
  };

  const handleCopyLink = (postId: number) => {
    const url = `${window.location.origin}${window.location.pathname}?post=${postId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    });
  };

  const getShareUrl = (postId: number) =>
    encodeURIComponent(`${window.location.origin}${window.location.pathname}?post=${postId}`);

  const handleReportSubmit = () => {
    if (!reportReason) return;
    setReportSubmitted(true);
    setTimeout(() => setReportPostId(null), 1800);
  };

  // ── Edit / Delete handlers ─────────────────────────────────────────────

  const handleOpenEdit = (post: ForumPost) => {
    setEditPostId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
    setOpenDropdown(null);
  };

  const handleEditSubmit = async () => {
    if (!editPostId || !editTitle.trim()) return;
    setIsEditSubmitting(true);
    try {
      const updated = await apiService.updateForumPost(apiService.getToken()!, editPostId, {
        title: editTitle.trim(),
        content: editContent.trim(),
      });
      setPosts((p) => p.map((post) => (post.id === editPostId ? { ...post, ...updated } : post)));
      setEditPostId(null);
    } catch (e) {
      alert('Failed to update post.');
    } finally {
      setIsEditSubmitting(false);
    }
  };

  const handleOpenDelete = (postId: number) => {
    setDeletePostId(postId);
    setOpenDropdown(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deletePostId) return;
    setIsDeleting(true);
    try {
      await apiService.deleteForumPost(apiService.getToken()!, deletePostId);
      setPosts((p) => p.filter((post) => post.id !== deletePostId));
      setDeletePostId(null);
    } catch (e) {
      alert('Failed to delete post.');
    } finally {
      setIsDeleting(false);
    }
  };

  // ── Community Join/Leave ───────────────────────────────────────────────────

  const handleJoinToggle = async (communityId: number) => {
    if (!isAuthenticated) {
      alert("Please login to join communities");
      onNavigate("login");
      return;
    }

    const comm = communities.find(c => c.id === communityId);
    if (comm?.is_member && confirmLeaveId === null) {
      setConfirmLeaveId(communityId);
      return;
    }

    setConfirmLeaveId(null);
    setJoinLoading((p) => ({ ...p, [communityId]: true }));
    try {
      const updated = await apiService.joinForumCommunity(apiService.getToken()!, communityId);
      setCommunities((prev) =>
        prev.map((c) =>
          c.id === communityId
            ? { ...c, is_member: updated.is_member, member_count: updated.member_count }
            : c
        )
      );
    } catch (e) {
      alert("Failed to update membership.");
    } finally {
      setJoinLoading((p) => ({ ...p, [communityId]: false }));
    }
  };

  const isMemberOf = (communityId: number) => {
    return communities.find((c) => c.id === communityId)?.is_member ?? false;
  };

  // ── Comments ──────────────────────────────────────────────────────────────

  const toggleComments = async (postId: number) => {
    const opening = !openComments[postId];
    setOpenComments((p) => ({ ...p, [postId]: opening }));
    if (opening && !commentsMap[postId]?.length) {
      fetchComments(postId, 10, 0);
    }
  };

  const fetchComments = async (postId: number, limit: number, offset: number) => {
    setIsCommentsLoading((p) => ({ ...p, [postId]: true }));
    try {
      const data = await apiService.getForumPostComments(postId, limit, offset);
      setCommentsMap((p) => ({
        ...p,
        [postId]: offset === 0 ? data.comments : [...(p[postId] || []), ...data.comments],
      }));
      setTotalCommentsMap((p) => ({ ...p, [postId]: data.total_count }));
    } catch (e) {
      console.error(e);
    } finally {
      setIsCommentsLoading((p) => ({ ...p, [postId]: false }));
    }
  };

  const handleLoadMoreComments = (postId: number) => {
    fetchComments(postId, 10, commentsMap[postId]?.length || 0);
  };

  const handleSetReply = (postId: number, comment: ForumComment) => {
    setReplyingTo((p) => ({ ...p, [postId]: comment }));
    document.getElementById(`comment-input-${postId}`)?.focus();
  };

  const handleCommentSubmit = async (postId: number) => {
    if (!isAuthenticated) {
      alert("Please login to comment");
      onNavigate("login");
      return;
    }
    const content = commentInputs[postId]?.trim();
    if (!content) return;

    const parentComment = replyingTo[postId];
    const parentId = parentComment?.id;

    try {
      const newComment = await apiService.createForumComment(apiService.getToken()!, postId, {
        content,
        parent_id: parentId,
      });

      if (parentId) {
        setCommentsMap((prev) => {
          const updated = (prev[postId] || []).map((c) => {
            if (c.id === parentId) {
              return { ...c, replies: [...(c.replies || []), newComment] };
            }
            return c;
          });
          return { ...prev, [postId]: updated };
        });
      } else {
        setCommentsMap((p) => ({
          ...p,
          [postId]: [...(p[postId] || []), { ...newComment, replies: [] }],
        }));
        setTotalCommentsMap((p) => ({ ...p, [postId]: (p[postId] || 0) + 1 }));
      }

      setCommentInputs((p) => ({ ...p, [postId]: "" }));
      setReplyingTo((p) => ({ ...p, [postId]: null }));
      setPosts((p) =>
        p.map((post) => (post.id === postId ? { ...post, comment_count: post.comment_count + 1 } : post))
      );
    } catch (e) {
      alert("Failed to add comment.");
    }
  };

  // ── Poll ──────────────────────────────────────────────────────────────────

  const handlePollVote = async (postId: number, optionIdx: number) => {
    if (!isAuthenticated) {
      alert("Please login to vote");
      onNavigate("login");
      return;
    }
    try {
      const updated = await apiService.voteForumPoll(apiService.getToken()!, postId, optionIdx);
      setPosts((p) => p.map((post) => (post.id === postId ? updated : post)));
    } catch (e) {
      console.error(e);
      alert("Failed to cast vote.");
    }
  };

  // ── Like / Dislike ────────────────────────────────────────────────────────

  const handleLike = async (postId: number) => {
    if (!isAuthenticated) return alert("Please login to like posts");
    try {
      const updated = await apiService.likeForumPost(apiService.getToken()!, postId);
      setPosts((p) =>
        p.map((post) =>
          post.id === postId
            ? { ...post, upvotes: updated.upvotes, downvotes: updated.downvotes, is_liked: updated.is_liked, is_disliked: updated.is_disliked }
            : post
        )
      );
    } catch (e) { console.error(e); }
  };

  const handleDislike = async (postId: number) => {
    if (!isAuthenticated) return alert("Please login to dislike posts");
    try {
      const updated = await apiService.dislikeForumPost(apiService.getToken()!, postId);
      setPosts((p) =>
        p.map((post) =>
          post.id === postId
            ? { ...post, upvotes: updated.upvotes, downvotes: updated.downvotes, is_liked: updated.is_liked, is_disliked: updated.is_disliked }
            : post
        )
      );
    } catch (e) { console.error(e); }
  };

  // ── Create Post ───────────────────────────────────────────────────────────

  const handleCreatePostClick = () => {
    if (!isAuthenticated) { alert("Please login to create a post"); onNavigate("login"); return; }
    // Pre-select community if one is chosen
    if (selectedCommunityId && isMemberOf(selectedCommunityId)) {
      setModalCommunityId(selectedCommunityId);
    }
    setIsCreatePostModalOpen(true);
  };

  const resetModal = () => {
    setModalCommunityId(0); setModalTitle(""); setModalContent("");
    setIsPollEnabled(false); setPollOptions(["", ""]);
    setSelectedImages([]); setSelectedVideo(null);
    setImagePreviews([]); setVideoPreview(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  const handleImagesChange = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files).slice(0, 4); // max 4 images
    setSelectedImages(arr);
    setImagePreviews(arr.map((f) => URL.createObjectURL(f)));
  };

  const handleVideoChange = (file: File | null) => {
    setSelectedVideo(file);
    setVideoPreview(file ? URL.createObjectURL(file) : null);
  };

  const handlePostSubmit = async () => {
    if (!isAuthenticated) { alert("Please login"); return; }
    if (!modalCommunityId || !modalTitle.trim()) return;

    // Ensure user is a member of the selected community
    if (!isMemberOf(modalCommunityId)) {
      alert("You must join this community before posting.");
      return;
    }

    setIsSubmitting(true);
    try {
      const token = apiService.getToken()!;
      let imageUrlValue: string | undefined;
      let videoUrlValue: string | undefined;

      // Upload images
      if (selectedImages.length > 0) {
        const urls = await apiService.uploadForumMedia(token, selectedImages);
        imageUrlValue = urls.length === 1 ? urls[0] : JSON.stringify(urls);
      }

      // Upload video
      if (selectedVideo) {
        const urls = await apiService.uploadForumMedia(token, [selectedVideo]);
        videoUrlValue = urls[0];
      }

      const pollItems = isPollEnabled ? pollOptions.map((o) => o.trim()).filter(Boolean) : [];
      const newPost = await apiService.createForumPost(token, {
        community_id: modalCommunityId,
        category: "General",
        title: modalTitle.trim(),
        content: modalContent.trim(),
        poll_options: pollItems.length > 1 ? pollItems : undefined,
        is_poll: pollItems.length > 1,
        image_url: imageUrlValue,
        video_url: videoUrlValue,
      });
      setPosts((p) => [newPost, ...p]);
      resetModal();
      setIsCreatePostModalOpen(false);
    } catch (e) {
      alert("Failed to create post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isCreatePostModalOpen) return;
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setIsCreatePostModalOpen(false); };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleEsc); document.body.style.overflow = ""; };
  }, [isCreatePostModalOpen]);

  // ── Selected community info ────────────────────────────────────────────────

  const selectedCommunity = communities.find((c) => c.id === selectedCommunityId);
  const canPostInFeed = !selectedCommunityId || isMemberOf(selectedCommunityId);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 text-[#1a1a1a] antialiased pb-12">
      {/* Community Detail Header */}
      {selectedCommunity && (
        <CommunityHeader
          community={selectedCommunity}
          onJoin={handleJoinToggle}
          onShare={(id) => { setSharePostId(id); setCopySuccess(false); }}
          onInvite={(id) => { setInviteCommunityId(id); setIsInviteModalOpen(true); setInviteCopySuccess(false); }}
          isLoading={!!joinLoading[selectedCommunity.id]}
          onBack={() => setSelectedCommunityId(null)}
        />
      )}

      <div className={`mx-auto w-full gap-8 px-4 ${selectedCommunity ? "max-w-[1200px] grid grid-cols-1 lg:grid-cols-3 py-4" : "max-w-350 flex justify-center py-6"}`}>
        
        {/* Left Sidebar - Hidden in Community View to match prototype exactly */}
        {!selectedCommunity && (
          <div className="sticky top-6 hidden shrink-0 space-y-6 lg:block w-[280px]">
             <div className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-5 text-center shadow-sm">
              <div className="relative mb-3 h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-md">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=256&q=80" alt="Profile" className="h-full w-full object-cover" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">{user ? `${user.first_name} ${user.last_name}` : "Guest User"}</h2>
              <p className="text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-widest">{user?.role || "STUDENT"}</p>
              {!isAuthenticated && (
                <button onClick={() => onNavigate("login")} className="mt-1 text-sm font-bold text-blue-600 hover:underline">
                  Login / Register
                </button>
              )}
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-black uppercase tracking-[0.1em] text-gray-400">Student Communities</h3>
                {selectedCommunityId && (
                  <button onClick={() => setSelectedCommunityId(null)} className="text-[10px] font-black text-blue-600 hover:underline">CLEAR</button>
                )}
              </div>
              <div className="space-y-1">
                {communities.map((item) => (
                  <div key={item.id} className={`flex w-full items-center gap-2 rounded-lg p-2 transition cursor-pointer ${selectedCommunityId === item.id ? "bg-blue-50" : "hover:bg-gray-50"}`}
                    onClick={() => setSelectedCommunityId(item.id)}>
                    <div className={`h-9 w-9 shrink-0 ${item.bg_color || "bg-gray-100"} flex items-center justify-center rounded-lg text-lg`}>{item.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <span className={`block text-[13px] font-bold truncate ${selectedCommunityId === item.id ? "text-blue-600" : "text-gray-600"}`}>{item.name}</span>
                      {item.member_count !== undefined && (
                        <span className="text-[10px] text-gray-400">{item.member_count} members</span>
                      )}
                    </div>
                    <JoinButton
                      communityId={item.id}
                      isMember={!!item.is_member}
                      isLoading={!!joinLoading[item.id]}
                      onToggle={handleJoinToggle}
                      size="sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Feed Area */}
        <div className={`w-full flex-1 space-y-4 ${selectedCommunity ? "lg:col-span-2 max-w-[800px]" : "max-w-[600px]"}`}>

          {/* Community banner when filtered */}
          {selectedCommunity && (
             <div className="lg:hidden mb-4">
                <div className={`flex items-center justify-between rounded-xl p-4 bg-white border border-gray-100`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{selectedCommunity.emoji}</span>
                    <div>
                      <p className="font-bold text-gray-900">{selectedCommunity.name}</p>
                      <p className="text-[11px] text-gray-500">{selectedCommunity.member_count ?? 0} members</p>
                    </div>
                  </div>
                  <JoinButton
                    communityId={selectedCommunity.id}
                    isMember={!!selectedCommunity.is_member}
                    isLoading={!!joinLoading[selectedCommunity.id]}
                    onToggle={handleJoinToggle}
                    size="md"
                  />
                </div>
             </div>
          )}

          {/* Quick compose bar */}
          {canPostInFeed ? (
            <div className={`rounded-xl border shadow-sm p-4 ${selectedCommunity ? "bg-white border-gray-200" : "bg-white border-gray-100"}`}>
              <div className="mb-4 flex items-center gap-3" onClick={handleCreatePostClick}>
                <span className="text-2xl leading-none">🎓</span>
                <div className="text-[#8e98a8] text-[15px] flex-1 cursor-pointer">
                   {selectedCommunity ? `Ask anonymously in ${selectedCommunity.name}...` : "Ask about courses, colleges, or exams..."}
                </div>
              </div>
              <div className="flex items-center gap-1 border-t border-gray-50 pt-3">
                {[
                  { label: "Image", color: "text-[#3b82f6]", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 7h.01M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /> },
                  { label: "Poll", color: "text-[#a855f7]", icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3v18h18" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V9m4 8V5m4 12v-6" /></> },
                  { label: "Video", color: "text-[#ef4444]", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m-6 4h5a2 2 0 002-2V8a2 2 0 00-2-2H9a2 2 0 00-2 2v8a2 2 0 002 2z" /> },
                ].map((b) => (
                  <button key={b.label} onClick={handleCreatePostClick} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[14px] font-bold text-gray-600 transition hover:bg-gray-50`}>
                    <svg className={`h-5 w-5 ${b.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">{b.icon}</svg>
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Not a member — show join CTA */
            selectedCommunityId && (
              <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-blue-200 bg-blue-50/60 py-8 text-center px-6">
                <span className="text-3xl">{selectedCommunity?.emoji || "🔒"}</span>
                <p className="text-sm font-bold text-gray-700">Join <strong>{selectedCommunity?.name}</strong> to start contributing</p>
                <JoinButton
                  communityId={selectedCommunityId}
                  isMember={false}
                  isLoading={!!joinLoading[selectedCommunityId]}
                  onToggle={handleJoinToggle}
                  size="md"
                />
              </div>
            )
          )}

          {/* Posts */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
          ) : posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-12 text-center">
              <span className="mb-3 text-4xl">🌵</span>
              <p className="text-lg font-bold text-gray-400">No posts yet in this community.</p>
              <button onClick={handleCreatePostClick} className="mt-4 text-sm font-black text-blue-600 hover:underline">Be the first to post!</button>
            </div>
          ) : (
            posts.filter((p) => !hiddenPostIds.has(p.id)).map((post) => {
              if (selectedCommunity) {
                return (
                  <CommunityPostItem
                    key={post.id}
                    post={post}
                    user={user}
                    onActionClick={setOpenDropdown}
                    onShare={handleOpenShare}
                    onReport={handleOpenReport}
                    onEdit={handleOpenEdit}
                    onDelete={handleOpenDelete}
                  />
                )
              }

              const imageUrls = parseImageUrls(post.image_url);
              const postCommunityId = post.community_id ?? post.community?.id;
              const isPostCommunityMember = postCommunityId ? isMemberOf(postCommunityId) : true;

              return (
                <div key={post.id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5 overflow-hidden hover:border-gray-200 transition">

                  {/* Post Header */}
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${post.community?.bg_color || "bg-blue-600"} text-lg`}>
                        {post.community?.emoji || "✨"}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-black text-gray-900 uppercase tracking-wide">{post.community?.name || "General"}</span>
                          {/* Join button beside community name - only if NOT joined */}
                          {postCommunityId && !isPostCommunityMember && (
                            <JoinButton
                              communityId={postCommunityId}
                              isMember={isPostCommunityMember}
                              isLoading={!!joinLoading[postCommunityId]}
                              onToggle={handleJoinToggle}
                              size="sm"
                            />
                          )}
                          <span className="text-[11px] font-bold text-gray-400">• {formatRelativeTime(post.CreatedAt || post.created_at)}</span>
                        </div>
                        <p className="text-[11px] font-bold text-gray-500">{post.user?.first_name} {post.user?.last_name}</p>
                      </div>
                    </div>
                    <div className="relative">
                      <button onClick={() => setOpenDropdown((p) => (p === post.id ? null : post.id))} className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 transition">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="5" r="1.6" fill="currentColor" /><circle cx="12" cy="12" r="1.6" fill="currentColor" /><circle cx="12" cy="19" r="1.6" fill="currentColor" />
                        </svg>
                      </button>
                      {openDropdown === post.id && (
                        <div className="absolute right-0 z-50 mt-1 w-56 rounded-xl border border-gray-100 bg-white py-2 shadow-xl" onClick={(e) => e.stopPropagation()}>
                          {/* Author-only actions */}
                          {isAuthenticated && user && post.user_id === user.id && (
                            <>
                              <button
                                onClick={() => handleOpenEdit(post)}
                                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-bold text-gray-700 hover:bg-gray-50 transition"
                              >
                                <svg className="h-4 w-4 text-indigo-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit post
                              </button>
                              <button
                                onClick={() => handleOpenDelete(post.id)}
                                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-bold text-red-600 hover:bg-red-50 transition"
                              >
                                <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete post
                              </button>
                              <div className="my-1 h-px bg-gray-100" />
                            </>
                          )}
                          <button
                            onClick={() => handleOpenShare(post.id)}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-bold text-gray-700 hover:bg-gray-50 transition"
                          >
                            <svg className="h-4 w-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            Share via...
                          </button>
                          <button
                            onClick={() => handleNotInterested(post.id)}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-bold text-gray-700 hover:bg-gray-50 transition"
                          >
                            <svg className="h-4 w-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                            Not interested
                          </button>
                          <div className="my-1 h-px bg-gray-100" />
                          <button
                            onClick={() => handleOpenReport(post.id)}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-bold text-red-600 hover:bg-red-50 transition"
                          >
                            <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            Report post
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <h2 className="mb-2 text-base font-black leading-tight text-gray-900">{post.title}</h2>
                  {post.content && <p className="mb-3 text-[14px] leading-relaxed text-gray-600">{post.content}</p>}

                  {/* Image grid */}
                  <ImageGrid urls={imageUrls} />

                  {/* Video */}
                  {post.video_url && (
                    <div className="mb-3 overflow-hidden rounded-xl border border-gray-100">
                      <video
                        src={post.video_url}
                        controls
                        className="w-full max-h-80 object-cover bg-black"
                      />
                    </div>
                  )}

                  {/* Poll */}
                  {post.is_poll && post.poll_options && (() => {
                    const options: string[] = JSON.parse(post.poll_options);
                    const hasVoted = post.voted_option != null;
                    return (
                      <div className="mb-3 space-y-2">
                        {options.map((option, index) => {
                          const votes = post.poll_results?.[index] || 0;
                          const pct = post.total_votes ? Math.round((votes / post.total_votes) * 100) : 0;
                          const isSelected = post.voted_option === index;
                          return (
                            <div
                              key={`${post.id}-p${index}`}
                              onClick={() => !isSelected && handlePollVote(post.id, index)}
                              className={`relative cursor-pointer overflow-hidden rounded-xl border p-3 transition-all duration-300 ${hasVoted
                                  ? isSelected ? "border-blue-500 bg-blue-50" : "border-gray-100 bg-white"
                                  : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                                }`}
                            >
                              {hasVoted && (
                                <div
                                  className={`absolute left-0 top-0 bottom-0 transition-all duration-700 ease-out ${isSelected ? "bg-blue-100" : "bg-gray-100"}`}
                                  style={{ width: `${pct}%` }}
                                />
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
                                {hasVoted && <span>{pct}%</span>}
                              </div>
                            </div>
                          );
                        })}
                        {post.total_votes != null && (
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{post.total_votes} votes · Click to change your vote</p>
                        )}
                      </div>
                    );
                  })()}

                  {/* Action bar */}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <div className="flex items-center rounded-full bg-[#F2F4F7]">
                      <button onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-1.5 rounded-l-full px-3.5 py-1.5 text-[13px] font-black transition ${post.is_liked ? "text-indigo-600 bg-indigo-50" : "text-[#5C607A] hover:bg-gray-200"}`}>
                        <svg className={`h-4 w-4 ${post.is_liked ? "fill-current" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
                        </svg>
                        {post.upvotes}
                      </button>
                      <div className="h-4 w-px bg-gray-300" />
                      <button onClick={() => handleDislike(post.id)}
                        className={`rounded-r-full px-3.5 py-1.5 transition ${post.is_disliked ? "text-red-600 bg-red-50" : "text-[#5C607A] hover:bg-gray-200"}`}>
                        <svg className={`h-4 w-4 ${post.is_disliked ? "fill-current" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>

                    <button onClick={() => toggleComments(post.id)}
                      className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-black transition ${openComments[post.id] ? "bg-blue-50 text-blue-600" : "bg-[#F2F4F7] text-[#5C607A] hover:bg-gray-200"}`}>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z" />
                      </svg>
                      {post.comment_count} {post.comment_count === 1 ? "Comment" : "Comments"}
                    </button>
                  </div>

                  {/* Comments Section */}
                  {openComments[post.id] && (
                    <div className="mt-4 border-t border-gray-100 pt-4 space-y-4">

                      {replyingTo[post.id] && (
                        <div className="flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2 text-[11px] font-bold text-blue-600">
                          <span>↩ Replying to <strong>{replyingTo[post.id]?.user.first_name}</strong></span>
                          <button onClick={() => setReplyingTo((p) => ({ ...p, [post.id]: null }))}>✕ Cancel</button>
                        </div>
                      )}

                      <div className="flex gap-3">
                        <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-100">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.first_name || "guest"}`} className="h-full w-full object-cover" alt="You" />
                        </div>
                        <div className="relative flex-1">
                          <textarea
                            id={`comment-input-${post.id}`}
                            value={commentInputs[post.id] || ""}
                            onChange={(e) => setCommentInputs((p) => ({ ...p, [post.id]: e.target.value }))}
                            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleCommentSubmit(post.id); } }}
                            placeholder={replyingTo[post.id] ? `Reply to ${replyingTo[post.id]?.user.first_name}…` : "Write a comment…"}
                            className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-2 pr-10 text-sm font-medium text-gray-700 outline-none focus:border-blue-200 focus:bg-white transition"
                            rows={1}
                          />
                          <button
                            disabled={!commentInputs[post.id]?.trim()}
                            onClick={() => handleCommentSubmit(post.id)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 disabled:text-gray-300 transition hover:scale-110"
                          >
                            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M2.01 21L23 12L2.01 3L2 10l15 2l-15 2z" /></svg>
                          </button>
                        </div>
                      </div>


                      <div className="space-y-4">
                        {isCommentsLoading[post.id] && (
                          <div className="flex justify-center py-4">
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                          </div>
                        )}

                        {!isCommentsLoading[post.id] && (commentsMap[post.id] || []).length === 0 && (
                          <p className="text-center text-[11px] font-bold text-gray-400 py-2">No comments yet. Start the conversation!</p>
                        )}

                        {(commentsMap[post.id] || []).map((comment) => (
                          <CommentItem
                            key={comment.id}
                            comment={comment}
                            postId={post.id}
                            onReply={(c) => handleSetReply(post.id, c)}
                          />
                        ))}

                        {(totalCommentsMap[post.id] || 0) > (commentsMap[post.id]?.length || 0) && !isCommentsLoading[post.id] && (
                          <button
                            onClick={() => handleLoadMoreComments(post.id)}
                            className="w-full rounded-xl border border-slate-100 bg-slate-50 py-2 text-center text-xs font-black uppercase tracking-widest text-blue-600 hover:bg-blue-50 transition"
                          >
                            Show More Comments ({(totalCommentsMap[post.id] || 0) - (commentsMap[post.id]?.length || 0)} more)
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Right Sidebar */}
        <div className={`sticky top-6 hidden h-fit shrink-0 space-y-6 lg:block ${selectedCommunity ? "w-[320px]" : "w-[300px]"}`}>
           {selectedCommunity ? (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                  <h3 className="text-[16px] font-bold text-[#0f1d3a] mb-4 flex items-center gap-2">
                    <span>🔥</span> Trending {selectedCommunity.name}
                  </h3>
                  <div className="flex flex-col gap-4">
                    {[
                      { title: `What are the best resources for ${selectedCommunity.name}?`, replies: 42, time: "3 hrs ago" },
                      { title: `How to manage time for ${selectedCommunity.name} exam?`, replies: 28, time: "5 hrs ago" },
                      { title: `Discussion about recent ${selectedCommunity.name} curriculum`, replies: 15, time: "1 day ago" },
                    ].map((item, idx) => (
                      <div key={idx} className="group cursor-pointer border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                        <h4 className="text-[14px] font-bold text-[#334155] group-hover:text-[#5468ff] transition-colors leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-[12px] text-gray-400 mt-1.5 flex items-center gap-1">
                          {item.replies} replies <span>•</span> {item.time}
                        </p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-5 py-2.5 text-[14px] font-bold text-[#5468ff] bg-[#f4f6ff] hover:bg-[#e0e7ff] rounded-lg transition-colors">
                    View all trends
                  </button>
                </div>

                {/* News & Events Section for Community */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <h3 className="text-[16px] font-bold text-[#0f1d3a] mb-4 flex items-center gap-2">
                    <span>📅</span> News & Events
                  </h3>
                  <div className="flex flex-col gap-4">
                    {[
                      { title: "Scholarship applications open for 2026 intake", date: "April 15", type: "NEWS" },
                      { title: "Inter-college Science Fair - registration active", date: "May 10", type: "EVENT" },
                      { title: "Guest lecture on AI & future of Education", date: "March 30", type: "EVENT" },
                    ].map((item, idx) => (
                      <div key={idx} className="group cursor-pointer border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-1.5">
                           <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${item.type === 'NEWS' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                             {item.type}
                           </span>
                           <span className="text-[10px] text-gray-400 font-bold">{item.date}</span>
                        </div>
                        <h4 className="text-[13px] font-bold text-gray-700 group-hover:text-[#5468ff] transition-colors leading-snug">
                          {item.title}
                        </h4>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-5 py-2.5 text-[13px] font-bold text-gray-400 hover:text-gray-600 border border-gray-100 rounded-lg transition-colors">
                    View academic calendar
                  </button>
                </div>
              </div>
           ) : (
             <div className="space-y-6">
               <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                 <div className="mb-4 flex items-center gap-2">
                   <span className="text-xl">🔥</span>
                   <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Trending Discussions</h3>
                 </div>
                 <div className="space-y-4">
                   {[
                     { title: "When are the TU BSc.CSIT 4th sem results coming?", cat: "TU UPDATES", replies: 62 },
                     { title: "Best YouTube channels for CEE Physics prep?", cat: "MEDICAL PREP", replies: 34 },
                   ].map((item, idx) => (
                     <div key={idx}>
                       <h4 className="cursor-pointer text-sm font-bold leading-snug text-gray-800 hover:text-blue-600 transition">{item.title}</h4>
                       <div className="mt-2 flex items-center justify-between">
                         <span className="text-[10px] font-black text-blue-600/70">{item.cat}</span>
                         <span className="text-[10px] font-bold text-gray-400">{item.replies} Replies</span>
                       </div>
                       {idx === 0 && <div className="mt-4 h-px bg-gray-50" />}
                     </div>
                   ))}
                 </div>
               </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <h3 className="text-[14px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span>📅</span> News & Events
                  </h3>
                  <div className="flex flex-col gap-4">
                    {[
                      { title: "CUET 2026 dates announced", date: "April 15", type: "NEWS" },
                      { title: "StudentHack 2026 - Hackathon", date: "May 10", type: "EVENT" },
                    ].map((item, idx) => (
                      <div key={idx} className="group cursor-pointer">
                        <div className="flex items-center justify-between mb-1">
                           <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${item.type === 'NEWS' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                             {item.type}
                           </span>
                           <span className="text-[10px] text-gray-400 font-bold">{item.date}</span>
                        </div>
                        <h4 className="text-[13px] font-bold text-gray-700 group-hover:text-blue-600 transition-colors leading-snug">
                          {item.title}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
           )}
        </div>
      </div>

      {/* Create Post Modal */}
      {isCreatePostModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center mt-20 justify-center bg-black/50 backdrop-blur-sm px-3" onClick={() => setIsCreatePostModalOpen(false)}>
          <div className="relative h-[75vh] w-full max-w-[620px] overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <button onClick={() => setIsCreatePostModalOpen(false)} className="flex items-center gap-2 text-gray-900 group">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 group-hover:bg-slate-100 transition"><span className="text-lg">←</span></div>
                <span className="text-xl font-black tracking-tight">Create Post</span>
              </button>
              <button onClick={handlePostSubmit} disabled={!modalCommunityId || !modalTitle.trim() || isSubmitting}
                className={`rounded-full px-7 py-2.5 text-sm font-black uppercase tracking-widest transition-all ${modalCommunityId && modalTitle.trim() && !isSubmitting ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 active:scale-95" : "bg-gray-100 text-gray-400"}`}>
                {isSubmitting ? "Posting..." : "Post"}
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6">
              {/* Community selector (only joined communities) */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Target Community</label>
                <div className="relative">
                  <select value={modalCommunityId} onChange={(e) => setModalCommunityId(Number(e.target.value))}
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-slate-50 px-5 py-3.5 text-base font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition">
                    <option value={0}>Choose where to post...</option>
                    {communities.filter((c) => c.is_member).map((c) => (
                      <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.117l3.71-3.886a.75.75 0 111.08 1.04l-4.25 4.453a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
                  </div>
                </div>
                {communities.filter((c) => c.is_member).length === 0 && (
                  <p className="mt-2 text-xs text-orange-500 font-bold">⚠ You haven't joined any communities yet. Join one from the sidebar to post.</p>
                )}
              </div>

              <input value={modalTitle} onChange={(e) => setModalTitle(e.target.value)} placeholder="Title of your post"
                className="w-full border-b border-transparent bg-transparent text-2xl font-black text-gray-900 outline-none placeholder:text-gray-300" />
              <textarea value={modalContent} onChange={(e) => setModalContent(e.target.value)}
                placeholder="Share thoughts, ask questions or seek advice..."
                className="min-h-[100px] w-full resize-none border-none bg-transparent text-lg font-medium leading-relaxed text-gray-600 outline-none placeholder:text-gray-300" />

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{imagePreviews.length} Image{imagePreviews.length > 1 ? "s" : ""}</span>
                    <button onClick={() => { setSelectedImages([]); setImagePreviews([]); if (imageInputRef.current) imageInputRef.current.value = ""; }}
                      className="text-[10px] font-bold text-red-400 hover:text-red-600">Remove</button>
                  </div>
                  <ImageGrid urls={imagePreviews} />
                </div>
              )}

              {/* Video Preview */}
              {videoPreviews && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Video</span>
                    <button onClick={() => { setSelectedVideo(null); setVideoPreview(null); if (videoInputRef.current) videoInputRef.current.value = ""; }}
                      className="text-[10px] font-bold text-red-400 hover:text-red-600">Remove</button>
                  </div>
                  <video src={videoPreviews} controls className="w-full rounded-xl max-h-52 bg-black" />
                </div>
              )}

              {/* Poll */}
              {isPollEnabled && (
                <div className="rounded-2xl border border-purple-100 bg-purple-50/50 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-black uppercase tracking-widest text-purple-600">Poll Options</p>
                    <button onClick={() => setIsPollEnabled(false)} className="text-[10px] font-bold text-purple-400 hover:text-purple-600">REMOVE POLL</button>
                  </div>
                  <div className="space-y-3">
                    {pollOptions.map((option, index) => (
                      <input key={index} value={option} onChange={(e) => setPollOptions((p) => p.map((o, i) => (i === index ? e.target.value : o)))}
                        placeholder={`Option ${index + 1}`}
                        className="w-full rounded-xl border border-purple-100 bg-white px-4 py-3 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500" />
                    ))}
                  </div>
                  {pollOptions.length < 4 && (
                    <button onClick={() => setPollOptions((p) => [...p, ""])} className="text-xs font-black text-purple-600 flex items-center gap-1">
                      <span className="text-lg">+</span> Add option
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-100 bg-white px-8 py-5">
              <div className="flex items-center justify-center gap-12">
                {[
                  { label: "Image", icon: "🖼️", bg: "bg-blue-50", text: "text-blue-600" },
                  { label: "Poll", icon: "📊", bg: "bg-purple-50", text: "text-purple-600" },
                  { label: "Video", icon: "🎥", bg: "bg-red-50", text: "text-red-600" },
                ].map((item) => (
                  <button key={item.label} onClick={() => {
                    if (item.label === "Image") imageInputRef.current?.click();
                    if (item.label === "Video") videoInputRef.current?.click();
                    if (item.label === "Poll") setIsPollEnabled((p) => !p);
                  }} className="flex flex-col items-center gap-2 group">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl ${item.bg} ${item.text} transition-all group-hover:scale-110 active:scale-95 ${item.label === "Poll" && isPollEnabled ? "ring-2 ring-purple-600 ring-offset-4" : ""}`}>{item.icon}</div>
                    <span className="text-xs font-black text-gray-400 group-hover:text-gray-600 uppercase tracking-widest">{item.label}</span>
                  </button>
                ))}
              </div>
              <input ref={imageInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleImagesChange(e.target.files)} />
              <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={(e) => handleVideoChange(e.target.files?.[0] || null)} />
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Post Modal ───────────────────────────────────────────────── */}
      {editPostId !== null && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={() => setEditPostId(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
              <h3 className="text-lg font-black text-gray-900">Edit Post</h3>
              <button onClick={() => setEditPostId(null)} className="rounded-full p-1.5 hover:bg-gray-100 transition">
                <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-6 space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Title</label>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base font-bold text-gray-900 outline-none focus:border-blue-400 focus:bg-white transition"
                  placeholder="Post title"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Content</label>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 outline-none focus:border-blue-400 focus:bg-white transition resize-none"
                  placeholder="What's on your mind?"
                  rows={5}
                />
              </div>
            </div>
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => setEditPostId(null)}
                className="flex-1 rounded-2xl border border-gray-200 py-3 text-sm font-black text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                disabled={!editTitle.trim() || isEditSubmitting}
                className="flex-1 rounded-2xl bg-blue-600 py-3 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700 active:scale-[0.98] disabled:opacity-40"
              >
                {isEditSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ───────────────────────────────────────────── */}
      {deletePostId !== null && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={() => setDeletePostId(null)}
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-white shadow-2xl p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mx-auto mb-4">
              <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">Delete Post?</h3>
            <p className="text-sm text-gray-500 mb-6">This action cannot be undone. The post will be permanently removed.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeletePostId(null)}
                className="flex-1 rounded-2xl border border-gray-200 py-3 text-sm font-black text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="flex-1 rounded-2xl bg-red-600 py-3 text-sm font-black text-white shadow-lg shadow-red-500/20 transition hover:bg-red-700 active:scale-[0.98] disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Share Modal ─────────────────────────────────────────────────── */}
      {sharePostId !== null && (
      <div
        className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm px-4"
        onClick={() => setSharePostId(null)}
      >
        <div
          className="w-full max-w-sm rounded-3xl bg-white shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
            <h3 className="text-lg font-black text-gray-900">Share Post</h3>
            <button onClick={() => setSharePostId(null)} className="rounded-full p-1.5 hover:bg-gray-100 transition">
              <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Copy link */}
          <div className="px-6 py-4">
            <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-3">Post Link</p>
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5">
              <span className="flex-1 truncate text-xs font-medium text-gray-600">
                {`${window.location.origin}${window.location.pathname}?post=${sharePostId}`}
              </span>
              <button
                onClick={() => handleCopyLink(sharePostId)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-[11px] font-black uppercase tracking-widest transition ${copySuccess
                  ? 'bg-green-100 text-green-600'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
              >
                {copySuccess ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Platform buttons */}
          <div className="px-6 pb-6">
            <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-3">Share On</p>
            <div className="grid grid-cols-4 gap-3">
              {[
                {
                  name: 'WhatsApp', emoji: '💬',
                  color: 'bg-green-50 text-green-600',
                  href: `https://api.whatsapp.com/send?text=${getShareUrl(sharePostId)}`,
                },
                {
                  name: 'Twitter', emoji: '𝕏',
                  color: 'bg-gray-50 text-gray-900',
                  href: `https://twitter.com/intent/tweet?url=${getShareUrl(sharePostId)}`,
                },
                {
                  name: 'Facebook', emoji: '📘',
                  color: 'bg-blue-50 text-blue-700',
                  href: `https://www.facebook.com/sharer/sharer.php?u=${getShareUrl(sharePostId)}`,
                },
                {
                  name: 'Telegram', emoji: '✈️',
                  color: 'bg-sky-50 text-sky-600',
                  href: `https://t.me/share/url?url=${getShareUrl(sharePostId)}`,
                },
              ].map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${p.color} text-2xl transition-all group-hover:scale-110`}>
                    {p.emoji}
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 group-hover:text-gray-700">{p.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }


      {confirmLeaveId !== null && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="w-full max-w-sm rounded-[32px] bg-white shadow-2xl overflow-hidden p-8 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6">👋</div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Leave Community?</h3>
            <p className="text-gray-500 text-sm font-medium mb-8">
              Are you sure you want to leave <strong>{communities.find(c => c.id === confirmLeaveId)?.name}</strong>? You can rejoin at any time.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => handleJoinToggle(confirmLeaveId)}
                className="w-full py-4 rounded-xl bg-red-600 text-sm font-black text-white hover:bg-red-700 active:scale-95 shadow-lg shadow-red-500/20 transition-all uppercase tracking-widest"
              >
                Yes, Leave
              </button>
              <button 
                onClick={() => setConfirmLeaveId(null)}
                className="w-full py-4 text-sm font-black text-gray-400 hover:text-gray-600 uppercase tracking-widest transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isInviteModalOpen && inviteCommunityId !== null && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4" onClick={() => setIsInviteModalOpen(false)}>
          <div className="w-full max-w-sm rounded-[32px] bg-white shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6">🤝</div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Invite Friends</h3>
              <p className="text-gray-500 text-sm font-medium mb-8">Share this community with your friends and grow together!</p>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="flex-1 truncate text-xs font-bold text-gray-400">
                    {`${window.location.origin}${window.location.pathname}?community=${inviteCommunityId}`}
                  </span>
                  <button 
                    onClick={() => {
                      const url = `${window.location.origin}${window.location.pathname}?community=${inviteCommunityId}`;
                      navigator.clipboard.writeText(url);
                      setInviteCopySuccess(true);
                      setTimeout(() => setInviteCopySuccess(false), 2000);
                    }}
                    className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${inviteCopySuccess ? 'bg-green-100 text-green-600' : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'}`}
                  >
                    {inviteCopySuccess ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
                <button onClick={() => setIsInviteModalOpen(false)} className="w-full py-4 text-sm font-black text-gray-400 hover:text-gray-600 uppercase tracking-widest transition">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {reportPostId !== null && (
        <div
          className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          onClick={() => setReportPostId(null)}
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {!reportSubmitted ? (
              <>
                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
                  <h3 className="text-lg font-black text-gray-900">Report Post</h3>
                  <button onClick={() => setReportPostId(null)} className="rounded-full p-1.5 hover:bg-gray-100 transition">
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Reason list */}
                <div className="px-6 py-4">
                  <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-3">Why are you reporting this?</p>
                  <div className="space-y-2">
                    {[
                      'Spam or misleading',
                      'Harassment or bullying',
                      'Hate speech or discrimination',
                      'False information',
                      'Inappropriate content',
                      'Other',
                    ].map((reason) => (
                      <button
                        key={reason}
                        onClick={() => setReportReason(reason)}
                        className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-bold transition ${
                          reportReason === reason
                            ? 'border-red-400 bg-red-50 text-red-700'
                            : 'border-gray-100 bg-gray-50 text-gray-700 hover:border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <span>{reason}</span>
                        {reportReason === reason && (
                          <svg className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Additional details */}
                  {reportReason === 'Other' && (
                    <textarea
                      value={reportOther}
                      onChange={(e) => setReportOther(e.target.value)}
                      placeholder="Describe the issue..."
                      className="mt-3 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 outline-none focus:border-red-300 focus:bg-white transition resize-none"
                      rows={3}
                    />
                  )}
                </div>

                {/* Submit */}
                <div className="px-6 pb-6">
                  <button
                    onClick={handleReportSubmit}
                    disabled={!reportReason || (reportReason === 'Other' && !reportOther.trim())}
                    className="w-full rounded-2xl bg-red-600 py-3.5 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-red-500/20 transition hover:bg-red-700 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Submit Report
                  </button>
                </div>
              </>
            ) : (
              /* Success state */
              <div className="flex flex-col items-center gap-3 px-8 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-8 w-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-black text-gray-900">Report Submitted</h3>
                <p className="text-sm text-gray-500">Thank you for helping keep our community safe. We'll review this post.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CampusForumPage;

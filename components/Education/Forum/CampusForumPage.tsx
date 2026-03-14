import React, { useEffect, useRef, useState } from "react";

interface CampusForumPageProps {
  onNavigate: (view: any) => void;
}

interface UserFeedPost {
  id: number;
  community: string;
  title: string;
  content: string;
  imageUrl?: string;
  videoName?: string;
  pollOptions?: string[];
}

const CampusForumPage: React.FC<CampusForumPageProps> = () => {
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({
    "comment-section-1": false,
  });
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [modalCommunity, setModalCommunity] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [isPollEnabled, setIsPollEnabled] = useState(false);
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [userPosts, setUserPosts] = useState<UserFeedPost[]>([]);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  const toggleComments = (sectionId: string) => {
    setOpenComments((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const toggleDropdown = (dropdownId: string) => {
    setOpenDropdown((prev) => (prev === dropdownId ? null : dropdownId));
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

  const handlePostSubmit = () => {
    const pollItems = isPollEnabled
      ? pollOptions.map((option) => option.trim()).filter(Boolean)
      : [];

    const newPost: UserFeedPost = {
      id: Date.now(),
      community: modalCommunity,
      title: modalTitle.trim(),
      content: modalContent.trim(),
      imageUrl: selectedImage ? URL.createObjectURL(selectedImage) : undefined,
      videoName: selectedVideo?.name,
      pollOptions: pollItems.length > 1 ? pollItems : undefined,
    };

    setUserPosts((prev) => [newPost, ...prev]);

    setModalCommunity("");
    setModalTitle("");
    setModalContent("");
    setIsPollEnabled(false);
    setPollOptions(["", ""]);
    setSelectedImage(null);
    setSelectedVideo(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (videoInputRef.current) videoInputRef.current.value = "";
    setIsCreatePostModalOpen(false);
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
        <div className="sticky top-6 hidden h-fit w-[280px] shrink-0 space-y-6 lg:block">
          <div className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-5 text-center shadow-sm">
            <div className="relative mb-3 h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-md">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Jagdish Dhami</h2>
            <a href="#" className="mt-1 text-sm font-medium text-blue-600 hover:underline">
              Complete Your Profile
            </a>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900">
              Student Communities
            </h3>
            <div className="space-y-4">
              {[
                { emoji: "📐", bg: "bg-orange-100", label: "IOE Engineering Prep" },
                { emoji: "💻", bg: "bg-blue-100", label: "IT (CSIT/BCA/BIT)" },
                { emoji: "🩺", bg: "bg-green-100", label: "CEE Medical Prep" },
                { emoji: "🏛️", bg: "bg-purple-100", label: "Kathmandu University" },
                { emoji: "🎒", bg: "bg-yellow-100", label: "Tribhuvan University" },
              ].map((item) => (
                <a key={item.label} href="#" className="group flex items-center gap-3">
                  <div className={`h-10 w-10 shrink-0 ${item.bg} flex items-center justify-center overflow-hidden rounded-lg text-xl`}>
                    {item.emoji}
                  </div>
                  <span className="text-sm font-medium text-gray-700 transition group-hover:text-blue-600">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
            <a href="#" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline">
              View all colleges
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        <div className="w-full max-w-[600px] space-y-4">
          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <span className="shrink-0 text-2xl">🎓</span>
              <input
                type="text"
                placeholder="Ask anonymously about courses, colleges, or entrance exams..."
                readOnly
                onClick={() => setIsCreatePostModalOpen(true)}
                className="w-full border-none bg-transparent text-sm font-medium text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>
            <div className="flex items-center gap-4 border-t border-gray-100 pt-3">
              <button onClick={() => setIsCreatePostModalOpen(true)} className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-blue-600">
                <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 7h.01M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
                Image
              </button>
              <button onClick={() => setIsCreatePostModalOpen(true)} className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-purple-600">
                <svg className="h-4 w-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3v18h18" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V9m4 8V5m4 12v-6" />
                </svg>
                Poll
              </button>
              <button onClick={() => setIsCreatePostModalOpen(true)} className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-red-600">
                <svg className="h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m-6 4h5a2 2 0 002-2V8a2 2 0 00-2-2H9a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Video
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-4 pb-5 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Trending in Education
            </h3>
            <div className="hide-scrollbar flex snap-x gap-4 overflow-x-auto pb-2">
              <div className="flex min-w-[240px] snap-start cursor-pointer flex-col justify-between rounded-xl border border-gray-200 p-4 transition hover:shadow-md">
                <div>
                  <span className="mb-2 inline-block rounded bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600">
                    Exam Update
                  </span>
                  <div className="flex gap-2">
                    <h4 className="text-sm font-bold leading-snug text-gray-900">
                      TU publishes BBS 1st year routine
                    </h4>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-gray-100 text-xl">
                      📅
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-start gap-2 rounded-lg border border-gray-100 bg-gray-50 p-2">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-200 text-[10px]">
                    😭
                  </div>
                  <p className="line-clamp-2 text-xs text-gray-600">
                    Only 2 weeks left and I haven't even bought the syllabus...
                  </p>
                </div>
              </div>

              <div className="relative flex min-w-[240px] snap-start cursor-pointer flex-col justify-between overflow-hidden rounded-xl border border-gray-200 p-4 transition hover:shadow-md">
                <div>
                  <span className="mb-2 inline-block rounded bg-orange-50 px-2 py-1 text-[10px] font-bold text-orange-600">
                    Discussion
                  </span>
                  <div className="flex gap-2">
                    <h4 className="text-sm font-bold leading-snug text-gray-900">
                      Is taking a drop year for IOE worth it?
                    </h4>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-gray-100 text-xl">
                      ⏳
                    </div>
                  </div>
                </div>
                <div className="relative z-10 mt-4 flex items-start gap-2 rounded-lg border border-gray-100 bg-gray-50 p-2">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-200 text-[10px]">
                    🧠
                  </div>
                  <p className="line-clamp-2 text-xs text-gray-600">
                    Honestly, the mental pressure isn't worth saving the fee.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {userPosts.map((post) => (
            <div key={post.id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
                    YOU
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-gray-900">{post.community}</h3>
                      <span className="text-xs font-medium text-gray-400">• now</span>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500">anonymous_user • Just posted</p>
                  </div>
                </div>
              </div>

              <h2 className="mb-2 text-base font-bold text-gray-900">{post.title}</h2>
              {post.content && <p className="mb-3 text-sm leading-relaxed text-gray-700">{post.content}</p>}

              {post.imageUrl && (
                <div className="relative mb-3 h-48 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 md:h-64">
                  <img src={post.imageUrl} alt="Uploaded" className="h-full w-full object-cover" />
                </div>
              )}

              {post.videoName && (
                <div className="mb-3 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                  Video attached: {post.videoName}
                </div>
              )}

              {post.pollOptions && post.pollOptions.length > 1 && (
                <div className="mb-3 space-y-2">
                  {post.pollOptions.map((option, index) => (
                    <div key={`${post.id}-poll-${index}`} className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700">
                      {option}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <div className="flex items-center rounded-full bg-[#F2F4F7]">
                  <button className="flex items-center gap-1.5 rounded-l-full px-3.5 py-1.5 text-[13px] font-semibold text-[#5C607A] transition hover:bg-gray-200">
                    <svg className="h-4 w-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                    </svg>
                    0
                  </button>
                  <div className="h-4 w-px bg-gray-300"></div>
                  <button className="rounded-r-full px-3.5 py-1.5 text-[#5C607A] transition hover:bg-gray-200">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                <button className="flex items-center gap-1.5 rounded-full bg-[#F2F4F7] px-4 py-1.5 text-[13px] font-semibold text-[#5C607A] transition hover:bg-gray-200">
                  <svg className="h-4 w-4 text-[#7A809D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z" />
                  </svg>
                  0 Comment
                </button>
              </div>
            </div>
          ))}

          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-600 font-bold text-white">
                  ENG
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="cursor-pointer text-sm font-bold text-gray-900 hover:underline">Engineering & IOE</h3>
                    <span className="text-xs font-medium text-gray-400">• 1d</span>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500">ioe_dreamer • Class 12 Graduate</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="rounded-full border border-blue-600 px-3 py-1 text-xs font-semibold text-blue-600 transition hover:bg-blue-50">
                  Join
                </button>

                <div className="relative">
                  <button onClick={() => toggleDropdown("post-options-1")} className="rounded-full p-1.5 text-gray-400 transition hover:bg-gray-100">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="5" r="1.6" fill="currentColor" />
                      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
                      <circle cx="12" cy="19" r="1.6" fill="currentColor" />
                    </svg>
                  </button>

                  {openDropdown === "post-options-1" && (
                    <div className="absolute right-0 z-50 mt-1 w-56 rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
                      <button className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[15px] font-medium text-gray-700 transition hover:bg-gray-50">
                        Share via...
                      </button>
                      <button className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[15px] font-medium text-gray-700 transition hover:bg-gray-50">
                        Not interested
                      </button>
                      <button className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[15px] font-medium text-red-600 transition hover:bg-red-50">
                        Report
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <h2 className="mb-2 text-base font-bold text-gray-900">Private college vs Drop Year for Computer Engineering?</h2>
            <p className="mb-3 text-sm leading-relaxed text-gray-700">
              I scored decent in my +2 but my IOE entrance rank is around 3200. I really want to study at Pulchowk or Thapathali, but my family is suggesting I just enroll in a private affiliated college and not waste a year. Has anyone here taken a drop year for IOE? Is the mental pressure worth it? Need genuine advice. <span className="cursor-pointer text-gray-400 hover:underline">more</span>
            </p>

            <div className="relative h-48 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 md:h-64">
              <img
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80"
                alt="Study notes"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <div className="flex items-center rounded-full bg-[#F2F4F7]">
                <button className="flex items-center gap-1.5 rounded-l-full px-3.5 py-1.5 text-[13px] font-semibold text-[#5C607A] transition hover:bg-gray-200">
                  <svg className="h-4 w-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                  </svg>
                  214
                </button>
                <div className="h-4 w-px bg-gray-300"></div>
                <button className="rounded-r-full px-3.5 py-1.5 text-[#5C607A] transition hover:bg-gray-200">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              <button
                onClick={() => toggleComments("comment-section-1")}
                className="flex items-center gap-1.5 rounded-full bg-[#F2F4F7] px-4 py-1.5 text-[13px] font-semibold text-[#5C607A] transition hover:bg-gray-200"
              >
                <svg className="h-4 w-4 text-[#7A809D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z" />
                </svg>
                89 Comment
              </button>

              <button className="flex items-center gap-1.5 rounded-full bg-[#F2F4F7] px-4 py-1.5 text-[13px] font-semibold text-[#5C607A] transition hover:bg-gray-200">
                <svg className="h-4 w-4 text-[#7A809D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" />
                </svg>
                Repost
              </button>

              <button className="flex items-center gap-1.5 rounded-full bg-[#F2F4F7] px-4 py-1.5 text-[13px] font-semibold text-[#5C607A] transition hover:bg-gray-200">
                <svg className="h-4 w-4 text-[#7A809D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C9.886 12.511 11.354 12 13 12c3.866 0 7 2.686 7 6M5 12a7 7 0 017-7c1.646 0 3.114.511 4.316 1.342M15 6l3-3m0 0l3 3m-3-3v9" />
                </svg>
                Share
              </button>
            </div>

            {openComments["comment-section-1"] && (
              <div className="mt-4 border-t border-gray-100 pt-4">
                <div className="mb-6 flex items-center gap-3">
                  <span className="shrink-0 text-2xl">✍️</span>
                  <div className="flex flex-1 items-center justify-between rounded-full border border-gray-300 bg-white px-4 py-2">
                    <input
                      type="text"
                      placeholder="Add a comment anonymously"
                      className="w-full bg-transparent text-sm font-medium text-gray-700 placeholder-gray-400 outline-none"
                    />
                    <div className="shrink-0 text-gray-400">
                      GIF
                    </div>
                  </div>
                </div>

                <div className="mb-5 flex items-center justify-between text-sm">
                  <h3 className="font-semibold text-gray-800">Comments</h3>
                  <button className="flex items-center gap-1 font-semibold text-gray-600 transition hover:text-gray-900">
                    Popularity
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="relative">
                    <div className="relative z-10 flex gap-3 bg-white">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-100 text-sm">🍇</div>
                      <div className="flex-1">
                        <div className="group/btn flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-1.5 text-sm">
                              <span className="font-semibold text-[#1B1F3B]">senior_dai</span>
                              <span className="text-xs font-medium text-gray-400">1d</span>
                            </div>
                            <div className="mt-0.5 text-xs font-medium text-[#5C607A]">BCT 3rd Year, Pulchowk</div>
                          </div>
                        </div>
                        <p className="mt-1.5 text-[15px] text-[#1B1F3B]">
                          I took a drop year. Unless you are extremely disciplined and okay with studying 8+ hours a day while your friends are enjoying their first semesters, do not do it.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white">
                  ACA
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="cursor-pointer text-sm font-bold text-gray-900 hover:underline">Academics</h3>
                    <span className="text-xs font-medium text-gray-400">• 3h</span>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500">confused_fresher • High School Student</p>
                </div>
              </div>

              <div className="relative">
                <button onClick={() => toggleDropdown("post-options-2")} className="rounded-full p-1.5 text-gray-400 transition hover:bg-gray-100">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="5" r="1.6" fill="currentColor" />
                    <circle cx="12" cy="12" r="1.6" fill="currentColor" />
                    <circle cx="12" cy="19" r="1.6" fill="currentColor" />
                  </svg>
                </button>

                {openDropdown === "post-options-2" && (
                  <div className="absolute right-0 z-50 mt-1 w-56 rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
                    <button className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[15px] font-medium text-gray-700 transition hover:bg-gray-50">
                      Share via...
                    </button>
                    <button className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[15px] font-medium text-gray-700 transition hover:bg-gray-50">
                      Not interested
                    </button>
                    <button className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[15px] font-medium text-red-600 transition hover:bg-red-50">
                      Report
                    </button>
                  </div>
                )}
              </div>
            </div>

            <h2 className="mb-2 text-base font-bold text-gray-900">Which IT course is currently the best in Nepal?</h2>
            <p className="mb-4 text-sm text-gray-700">
              Considering job prospects, syllabus freshness, and overall value. Pls vote based on your actual experience studying in Nepal!
            </p>

            <div className="space-y-2">
              {[
                { label: "BSc. CSIT (TU / PU)", pct: "45%", width: "w-[45%]" },
                { label: "BCA (TU / PoU)", pct: "30%", width: "w-[30%]" },
                { label: "BIT (TU / Foreign Affiliated)", pct: "15%", width: "w-[15%]" },
                { label: "BIM / BBA-IT", pct: "10%", width: "w-[10%]" },
              ].map((option) => (
                <div key={option.label} className="relative cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-3 transition hover:bg-gray-100">
                  <div className={`absolute bottom-0 left-0 top-0 z-0 rounded-l-lg bg-blue-100 ${option.width}`}></div>
                  <div className="relative z-10 flex justify-between text-sm font-medium text-gray-700">
                    <span>{option.label}</span>
                    <span>{option.pct}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs font-medium text-gray-500">1,248 votes · 2 days left</div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <div className="flex items-center rounded-full bg-[#F2F4F7]">
                <button className="flex items-center gap-1.5 rounded-l-full px-3.5 py-1.5 text-[13px] font-semibold text-[#5C607A] transition hover:bg-gray-200">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                  </svg>
                  89
                </button>
                <div className="h-4 w-px bg-gray-300"></div>
                <button className="rounded-r-full px-3.5 py-1.5 text-[#5C607A] transition hover:bg-gray-200">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              <button className="flex items-center gap-1.5 rounded-full bg-[#F2F4F7] px-4 py-1.5 text-[13px] font-semibold text-[#5C607A] transition hover:bg-gray-200">
                <svg className="h-4 w-4 text-[#7A809D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z" />
                </svg>
                124 Comment
              </button>

              <button className="flex items-center gap-1.5 rounded-full bg-[#F2F4F7] px-4 py-1.5 text-[13px] font-semibold text-[#5C607A] transition hover:bg-gray-200">
                <svg className="h-4 w-4 text-[#7A809D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" />
                </svg>
                Repost
              </button>

              <button className="flex items-center gap-1.5 rounded-full bg-[#F2F4F7] px-4 py-1.5 text-[13px] font-semibold text-[#5C607A] transition hover:bg-gray-200">
                <svg className="h-4 w-4 text-[#7A809D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C9.886 12.511 11.354 12 13 12c3.866 0 7 2.686 7 6M5 12a7 7 0 017-7c1.646 0 3.114.511 4.316 1.342M15 6l3-3m0 0l3 3m-3-3v9" />
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>

        <div className="sticky top-6 hidden h-fit w-[300px] shrink-0 space-y-6 xl:block">
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-xl text-orange-500">🔥</span>
              <h3 className="text-sm font-bold text-gray-900">Trending Discussions</h3>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="cursor-pointer text-sm font-bold leading-snug text-gray-800 transition hover:text-blue-600">
                  When are the TU BSc.CSIT 4th sem results coming out?
                </h4>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">TU UPDATES</span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">62 Replies</div>
                </div>
              </div>
              <div className="h-px bg-gray-100"></div>
              <div>
                <h4 className="cursor-pointer text-sm font-bold leading-snug text-gray-800 transition hover:text-blue-600">
                  Best YouTube channels or resources for CEE Physics prep?
                </h4>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">MEDICAL PREP</span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">34 Replies</div>
                </div>
              </div>
            </div>
            <button className="mt-4 w-full rounded-lg py-2 text-center text-xs font-bold uppercase tracking-wider text-blue-600 transition hover:bg-blue-50">
              VIEW ALL DISCUSSIONS
            </button>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10m2 10H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-sm font-bold text-gray-900">Upcoming Events</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="min-w-[3rem] rounded-lg border border-blue-100 bg-blue-50 p-2 text-center">
                  <div className="text-[10px] font-bold uppercase text-blue-600">MAY</div>
                  <div className="mt-0.5 text-lg font-bold leading-none text-blue-900">15</div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800">KU IT Meet 2024</h4>
                  <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">Kathmandu University, Dhulikhel</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="min-w-[3rem] rounded-lg border border-orange-100 bg-orange-50 p-2 text-center">
                  <div className="text-[10px] font-bold uppercase text-orange-600">JUN</div>
                  <div className="mt-0.5 text-lg font-bold leading-none text-orange-900">10</div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800">Locust Hackathon</h4>
                  <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">Pulchowk Campus, Lalitpur</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {isCreatePostModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 px-3"
          onClick={() => setIsCreatePostModalOpen(false)}
        >
          <div
            className="relative h-[60vh] w-full max-w-[620px] overflow-hidden rounded-2xl bg-white"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
              <button
                onClick={() => setIsCreatePostModalOpen(false)}
                className="flex items-center gap-2 text-[#1f2340]"
              >
                <span className="text-lg leading-none">←</span>
                <span className="text-xl font-bold">Create Post</span>
              </button>
              <button
                onClick={handlePostSubmit}
                disabled={!modalCommunity || !modalTitle.trim()}
                className={`rounded-full px-5 py-2 text-lg font-bold ${
                  modalCommunity && modalTitle.trim()
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                Post
              </button>
            </div>

            <div className="h-[calc(100%-85px)] overflow-y-auto px-6 pb-36 pt-6">
              <div className="relative mb-8">
                <select
                  value={modalCommunity}
                  onChange={(event) => setModalCommunity(event.target.value)}
                  className="w-full appearance-none rounded-lg border border-gray-300 px-5 py-4 text-xl font-medium text-[#5a6793] outline-none"
                >
                  <option value="">Select a community</option>
                  <option value="Engineering & IOE">Engineering & IOE</option>
                  <option value="Academics">Academics</option>
                  <option value="IT (CSIT/BCA/BIT)">IT (CSIT/BCA/BIT)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#5a6793]">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.117l3.71-3.886a.75.75 0 111.08 1.04l-4.25 4.453a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <input
                value={modalTitle}
                onChange={(event) => setModalTitle(event.target.value)}
                placeholder="Title of the post"
                className="mb-5 w-full border-none bg-transparent text-2xl font-bold text-[#8f9ac2] outline-none placeholder:text-[#8f9ac2]"
              />

              <textarea
                value={modalContent}
                onChange={(event) => setModalContent(event.target.value)}
                placeholder="Share thoughts, ask questions or seek advice anonymously (optional)"
                className="min-h-[80px] w-full resize-none border-none bg-transparent text-xl leading-[1.4] text-[#8f9ac2] outline-none placeholder:text-[#8f9ac2]"
              />

              {isPollEnabled && (
                <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="mb-3 text-sm font-semibold text-gray-700">Poll options</p>
                  <div className="space-y-2">
                    {pollOptions.map((option, index) => (
                      <input
                        key={`poll-option-${index}`}
                        value={option}
                        onChange={(event) => handlePollOptionChange(index, event.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500"
                      />
                    ))}
                  </div>
                  {pollOptions.length < 4 && (
                    <button
                      onClick={addPollOption}
                      className="mt-3 text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      + Add option
                    </button>
                  )}
                </div>
              )}

              {(selectedImage || selectedVideo) && (
                <div className="mt-4 space-y-2">
                  {selectedImage && (
                    <div className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700">
                      Image selected: {selectedImage.name}
                    </div>
                  )}
                  {selectedVideo && (
                    <div className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                      Video selected: {selectedVideo.name}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="absolute inset-x-0 bottom-0 border-t border-gray-100 bg-white px-8 pb-7 pt-5">
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { label: "Image", icon: "🖼️", bg: "bg-[#d7edf8]", text: "text-[#1696d2]" },
                  { label: "Poll", icon: "📊", bg: "bg-[#eadcfb]", text: "text-[#9556d6]" },
                  { label: "Video", icon: "▶", bg: "bg-[#f7e1e4]", text: "text-[#e33b3b]" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      if (item.label === "Image") imageInputRef.current?.click();
                      if (item.label === "Video") videoInputRef.current?.click();
                      if (item.label === "Poll") setIsPollEnabled((prev) => !prev);
                    }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-full text-2xl ${item.bg} ${item.text} ${item.label === "Poll" && isPollEnabled ? "ring-2 ring-[#9556d6] ring-offset-2" : ""}`}
                    >
                      {item.icon}
                    </div>
                    <span className="text-base font-semibold text-[#566487]">{item.label}</span>
                  </button>
                ))}
              </div>

              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleVideoSelect}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampusForumPage;

import { useRef } from "react";

const newsData = [
  {
    badgeText: "Exam",
    badgeColorClass: "bg-orange-50 text-orange-600",
    imgSrc:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
    title: "JEE Main 2025: Registration Process Extended.",
    description:
      "NTA extends JEE Main 2025 registration deadline due to high volume of applications. NTA extends JEE Main 2025 registration deadline due to high volume of applications.",
    timeAgo: "2 Days ago",
  },
  {
    badgeText: "Admission",
    badgeColorClass: "bg-blue-50 text-blue-600",
    imgSrc:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
    title: "Harvard University Opens Fall Admissions.",
    description:
      "The admissions portal for Fall 2025 is now live. Prospective international and domestic students can begin submitting their early action applications.",
    timeAgo: "5 Days ago",
  },
  {
    badgeText: "Scholarship",
    badgeColorClass: "bg-purple-50 text-purple-600",
    imgSrc:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
    title: "Global Excellence Scholarship 2025.",
    description:
      "Applications are now open for the Global Excellence Scholarship, offering full tuition coverage for outstanding international students pursuing STEM degrees.",
    timeAgo: "1 Week ago",
  },
  {
    badgeText: "Notice",
    badgeColorClass: "bg-emerald-50 text-emerald-600",
    imgSrc:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
    title: "Top Universities Announce Open Day 2025.",
    description:
      "Join us for an exclusive look into campus life. Several top-tier universities have jointly announced their open day schedules for prospective students.",
    timeAgo: "2 Weeks ago",
  },
  {
    badgeText: "Exam",
    badgeColorClass: "bg-orange-50 text-orange-600",
    imgSrc:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
    title: "NEET UG 2025 Pattern Changes Announced.",
    description:
      "The medical entrance examination board has released new guidelines and structural changes for the upcoming NEET UG 2025 examinations.",
    timeAgo: "3 Weeks ago",
  },
  {
    badgeText: "Notice",
    badgeColorClass: "bg-emerald-50 text-emerald-600",
    imgSrc:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
    title: "International Student Visa Update.",
    description:
      "New policies regarding post-study work visas have been published. Check out how these changes might impact your international study plans.",
    timeAgo: "1 Month ago",
  },
  {
    badgeText: "Admission",
    badgeColorClass: "bg-blue-50 text-blue-600",
    imgSrc:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
    title: "Oxford University Interview Dates Released.",
    description:
      "Shortlisted candidates for undergraduate programs will receive their interview invitations starting next week via the official university portal.",
    timeAgo: "45 Days ago",
  },
  {
    badgeText: "Scholarship",
    badgeColorClass: "bg-purple-50 text-purple-600",
    imgSrc:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
    title: "Women in Tech Scholarship Winners.",
    description:
      "Meet the brilliant minds who secured the 2024 Women in Technology full-ride scholarships across top engineering colleges nationwide.",
    timeAgo: "60 Days ago",
  },
];

const NewsStoriesSection = ({ onNavigate }: any) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollByWidth = (direction: -1 | 1) => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    container.scrollBy({
      left: container.clientWidth * direction,
      behavior: "smooth",
    });
  };

  return (
    <section className="max-w-[1380px] mx-auto relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div className="text-left max-w-2xl">
          <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-3 block">
            Latest Updates
          </span>
          <h2 className="text-4xl md:text-[42px] font-extrabold text-slate-900 mb-4 tracking-tight">
            Latest News &amp; Stories
          </h2>
          <p className="text-gray-500 text-[17px] leading-relaxed">
            Your guide to the best academic opportunities in Nepal and beyond.
          </p>
        </div>

        <div className="flex gap-4 md:pb-2">
          <button
            type="button"
            onClick={() => scrollByWidth(-1)}
            className="w-[50px] h-[50px] rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all focus:outline-none shadow-sm"
            aria-label="Previous"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollByWidth(1)}
            className="w-[50px] h-[50px] rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all focus:outline-none shadow-sm"
            aria-label="Next"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar mt-10 pb-8 px-2 -mx-2 scroll-smooth"
      >
        {newsData.map((card, index) => (
          <article
            key={`${card.title}-${index}`}
            className="flex-none w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] snap-start bg-white rounded-3xl border border-gray-100 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.05),0_8px_12px_-6px_rgba(0,0,0,0.01)] flex flex-col h-auto shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
          >
            <div className="mb-3">
              <span
                className={`inline-block px-3 py-1 text-[11px] font-bold rounded-full ${card.badgeColorClass}`}
              >
                {card.badgeText}
              </span>
            </div>

            <div className="relative w-full h-40 mb-4 rounded-2xl overflow-hidden shrink-0">
              <img
                src={card.imgSrc}
                alt={card.title}
                className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>

            <div className="flex flex-col flex-grow px-1">
              <h3 className="text-[17px] leading-snug font-bold text-[#4965F6] mb-2 line-clamp-2">
                {card.title}
              </h3>

              <p className="text-gray-500 text-[13px] leading-relaxed mb-6 line-clamp-4 flex-grow">
                {card.description}
              </p>

              <div className="flex items-center justify-between text-[12px] font-semibold text-gray-400 mt-auto pt-4 border-t border-gray-50">
                <div className="flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={13}
                    height={13}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx={12} cy={12} r={10} />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{card.timeAgo}</span>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate("newsPage", card)}
                  className="text-[#4965F6] hover:text-blue-800 flex items-center gap-1 font-bold group transition-colors"
                >
                  View Details
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={14}
                    height={14}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          type="button"
          onClick={() => onNavigate("newsPage")}
          className="inline-flex items-center gap-1 font-bold text-gray-900 hover:text-gray-600 transition-colors text-sm"
        >
          View All
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default NewsStoriesSection;
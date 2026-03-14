import { useRef } from "react";

const events = [
  {
    closeText: "Entry closes by 10 Mar",
    tag: "Tech Fest",
    iconColor: "text-[#c8d82d]",
    title: "KU IT Meet 2026",
    location: "Kathmandu University",
    chips: ["Software Dev", "AI & ML"],
    schedule: "15 Mar, 09:00 AM",
    enrolled: "342 Enrolled",
    bottomPill: "Prize Pool",
    bottomPillClass: "bg-[#f5f3ff] text-[#7c3aed]",
  },
  {
    closeText: "Entry closes by 20 Mar",
    tag: "Exhibition",
    iconColor: "text-blue-500",
    title: "Locus Tech Festival",
    location: "Pulchowk Campus, IOE",
    chips: ["Hardware", "Robotics"],
    schedule: "22 Mar, 10:00 AM",
    enrolled: "510 Enrolled",
    bottomPill: "Certificate",
    bottomPillClass: "bg-[#f0fdf4] text-[#16a34a]",
  },
  {
    closeText: "Entry closes by 2 Apr",
    tag: "Competition",
    iconColor: "text-red-500",
    title: "Deerwalk Appathon",
    location: "DWIT College",
    chips: ["App Development", "UI / UX"],
    schedule: "5 Apr, 08:30 AM",
    enrolled: "215 Enrolled",
    bottomPill: "Internship",
    bottomPillClass: "bg-[#fff7ed] text-[#ea580c]",
  },
  {
    closeText: "Entry closes by 10 Apr",
    tag: "Hiring Challenge",
    iconColor: "text-teal-600",
    title: "Islington Innovation",
    location: "Islington College",
    chips: ["Cybersecurity", "Cloud Config"],
    schedule: "12 Apr, 11:00 AM",
    enrolled: "420 Enrolled",
    bottomPill: "Job offer",
    bottomPillClass: "bg-[#f5f3ff] text-[#7c3aed]",
  },
];

const CampusEventsSection = ({ onNavigate }: any) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const scrollSlider = (direction: -1 | 1) => {
    const slider = sliderRef.current;
    if (!slider) {
      return;
    }

    slider.scrollBy({
      left: 380 * direction,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto mt-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Top College Events
          </h2>
          <p className="text-gray-500 mt-1.5 text-base">
            Discover the best hackathons, tech fests, and challenges across
            Nepal.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => scrollSlider(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 shadow-sm transition-all focus:outline-none"
            aria-label="Previous events"
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
            onClick={() => scrollSlider(1)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 shadow-sm transition-all focus:outline-none"
            aria-label="Next events"
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
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto no-scrollbar snap-x pb-6"
      >
        {events.map((event, index) => (
          <div
            key={`${event.title}-${index}`}
            className="ticket-card w-full sm:w-[350px] shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="bg-[#10373e] h-[100px] p-5 rounded-t-[15px] relative">
              <span className="text-white font-bold text-[17px] tracking-wide block">
                {event.closeText}
              </span>
              <div className="absolute top-0 right-[-1px] bg-[#f1f5f9] text-[#475569] text-xs font-bold px-3 py-1.5 top-badge border-l border-b border-[#e2e8f0]">
                {event.tag}
              </div>
            </div>

            <div className="p-5 flex-1 bg-white">
              <div className="flex gap-4 items-start">
                <div className="w-[52px] h-[52px] bg-white border border-gray-100 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                  <svg
                    className={`w-7 h-7 ${event.iconColor}`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M22 2L2 8l7 4 3 10 10-20z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-gray-900 leading-snug">
                    {event.title}
                  </h3>
                  <p className="text-gray-500 text-[14px] mt-0.5">
                    {event.location}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mt-5 overflow-hidden">
                {event.chips.map((chip) => (
                  <span
                    key={chip}
                    className="px-3 py-1 rounded-full border border-gray-200 text-[13px] text-gray-600 font-medium whitespace-nowrap"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-5 text-[13px] text-gray-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width={18} height={18} x={3} y={4} rx={2} ry={2} />
                    <line x1={16} x2={16} y1={2} y2={6} />
                    <line x1={8} x2={8} y1={2} y2={6} />
                    <line x1={3} x2={21} y1={10} y2={10} />
                  </svg>
                  {event.schedule}
                </div>
                <div className="flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx={12} cy={7} r={4} />
                  </svg>
                  {event.enrolled}
                </div>
              </div>
            </div>

            <div className="relative flex items-center h-8 bg-white">
              <div className="ticket-cutout-left" />
              <div className="ticket-cutout-right" />
              <div className="w-full h-px border-t-[1.5px] border-dashed border-gray-200 mx-5" />
            </div>

            <div className="p-5 pt-2 flex justify-between items-center bg-white rounded-b-[15px]">
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-bold ${event.bottomPillClass}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width={20} height={14} x={2} y={7} rx={2} ry={2} />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                {event.bottomPill}
              </div>

              <button
                type="button"
                onClick={() => onNavigate("events", event)}
                className="text-[#2563eb] text-[14.5px] font-bold hover:underline"
              >
                View details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampusEventsSection;
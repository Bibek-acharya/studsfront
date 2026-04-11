import React, { useMemo, useState } from "react";
import { getAllEvents } from "../../lib/events-data";

interface EventsPageProps {
  onNavigate: (view: any, data?: any) => void;
}

type EventFilter =
  | "All News"
  | "Feast & Concert"
  | "Seminar & Workshop"
  | "Career Fairs"
  | "Hackthons"
  | "Cultural Programs"
  | "Achievements"
  | "Others";

const filterPills: EventFilter[] = [
  "All News",
  "Feast & Concert",
  "Seminar & Workshop",
  "Career Fairs",
  "Hackthons",
  "Cultural Programs",
  "Achievements",
  "Others",
];

const mapCategory = (category: string): EventFilter => {
  if (category === "Workshop" || category === "Seminar") return "Seminar & Workshop";
  if (category === "Job Fair") return "Career Fairs";
  if (category === "Hackathon") return "Hackthons";
  return "Others";
};

const badgeClass = (filter: EventFilter) => {
  if (filter === "Seminar & Workshop") return "bg-[#00c2a8]";
  if (filter === "Career Fairs") return "bg-orange-500";
  if (filter === "Hackthons") return "bg-blue-500";
  return "bg-blue-500";
};

const registerButtonClass = (filter: EventFilter) => {
  if (filter === "Career Fairs") return "bg-[#0f172a] hover:bg-black";
  return "bg-blue-500 hover:bg-blue-600";
};

const EventsPage: React.FC<EventsPageProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState<EventFilter>("All News");
  const [sortBy, setSortBy] = useState<"Newest First" | "Oldest First" | "Popular">("Newest First");

  const allEvents = getAllEvents();
  const featured = allEvents[0];

  const visibleEvents = useMemo(() => {
    const filtered =
      activeFilter === "All News"
        ? allEvents
        : allEvents.filter((event) => mapCategory(event.category) === activeFilter);

    return [...filtered].sort((a, b) => {
      if (sortBy === "Newest First") return Number(b.id) - Number(a.id);
      if (sortBy === "Oldest First") return Number(a.id) - Number(b.id);
      return b.interestedCount - a.interestedCount;
    });
  }, [activeFilter, allEvents, sortBy]);

  return (
    <div className="bg-white text-gray-900 antialiased min-h-screen max-w-350 mx-auto py-8">
      <div className=" mx-auto py-8">
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Browse by category</h2>
          <div className="flex flex-wrap gap-2 text-sm font-semibold items-center">
            {filterPills.map((pill) => {
              const isActive = activeFilter === pill;
              return (
                <button
                  key={pill}
                  onClick={() => setActiveFilter(pill)}
                  className={`px-4 py-2 rounded-full transition ${
                    isActive
                      ? "bg-blue-500 text-white shadow-sm"
                      : "text-gray-700 hover:text-black hover:bg-gray-100"
                  }`}
                >
                  {pill}
                </button>
              );
            })}
          </div>
        </section>

        {featured && (
          <section className="mb-14">
            <h2 className="text-xl font-bold mb-4">Featured Story of the Week</h2>
            <div
              onClick={() => onNavigate("eventDetails", { id: featured.id })}
              className="relative rounded-2xl overflow-hidden h-[360px] group shadow-sm cursor-pointer"
            >
              <img src={featured.image} alt={featured.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="text-white max-w-3xl">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                      Featured
                    </span>
                    <span className="flex items-center text-sm text-gray-200 font-medium">
                      <i className="fa-regular fa-clock mr-1.5 opacity-80"></i> 90 days ago
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{featured.title}</h3>
                  <p className="text-gray-200 text-base font-medium line-clamp-2">{featured.excerpt}</p>
                </div>
                <button className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition whitespace-nowrap shadow-sm">
                  Read Full Story
                </button>
              </div>
            </div>
          </section>
        )}

        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-bold">Latest Events</h2>
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-3 font-semibold">Sort by:</span>
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as "Newest First" | "Oldest First" | "Popular")
                }
                className="border border-gray-300 rounded-md px-3 py-1.5 bg-white text-gray-800 font-semibold outline-none focus:border-blue-500 shadow-sm cursor-pointer"
              >
                <option>Newest First</option>
                <option>Oldest First</option>
                <option>Popular</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleEvents.map((event) => {
              const mapped = mapCategory(event.category);
              return (
                <article
                  key={event.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                >
                  <img src={event.image} alt={event.title} className="h-48 w-full object-cover" />
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-3">
                      <span
                        className={`${badgeClass(mapped)} text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider`}
                      >
                        {mapped}
                      </span>
                      <span className="flex items-center text-xs text-gray-500 font-semibold">
                        <i className="fa-regular fa-calendar mr-1.5"></i> Oct 25 , 2024
                      </span>
                    </div>

                    <button
                      onClick={() => onNavigate("eventDetails", { id: event.id })}
                      className={`font-bold text-lg mb-3 leading-tight text-left hover:underline ${
                        mapped === "Seminar & Workshop" ? "text-blue-500" : "text-gray-900"
                      }`}
                    >
                      {event.title}
                    </button>

                    <div className="flex items-center text-xs text-gray-600 mb-2 font-semibold">
                      <i className="fa-regular fa-building mr-2 text-gray-500"></i> {event.organizer}
                    </div>
                    <div className="flex items-center text-xs text-gray-600 mb-3 font-semibold">
                      <i className="fa-solid fa-location-dot mr-2 text-gray-500"></i> {event.location}
                    </div>

                    <p className="text-xs text-gray-500 mb-5 line-clamp-3 leading-relaxed font-medium">{event.excerpt}</p>

                    <div className="mt-auto flex gap-2">
                      <button
                        onClick={() => onNavigate("eventDetails", { id: event.id })}
                        className="flex-1 bg-white border border-gray-300 text-gray-700 text-sm font-bold py-2 rounded-lg hover:bg-gray-50 transition"
                      >
                        Details
                      </button>
                      <button className={`flex-1 text-white text-sm font-bold py-2 rounded-lg transition ${registerButtonClass(mapped)}`}>
                        Register Now
                      </button>
                      <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 transition">
                        <i className="fa-regular fa-heart"></i>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {visibleEvents.length === 0 && (
            <div className="text-center py-10 text-slate-500 bg-white border border-gray-200 rounded-2xl mt-6">
              No events available for this category.
            </div>
          )}

          <div className="flex justify-center mt-12 mb-8 space-x-2">
            <button className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-md bg-white text-gray-500 hover:bg-gray-50 transition shadow-sm">
              <i className="fa-solid fa-chevron-left text-xs"></i>
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-md bg-blue-500 text-white font-bold shadow-sm">1</button>
            <button className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 font-bold transition shadow-sm">2</button>
            <button className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 font-bold transition shadow-sm">3</button>
            <button className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-md bg-white text-gray-500 hover:bg-gray-50 transition shadow-sm">
              <i className="fa-solid fa-chevron-right text-xs"></i>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EventsPage;

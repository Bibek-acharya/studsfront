import React, { useState, useMemo } from "react";
import { getAllEvents, StudEvent } from "../../lib/events-data";

interface EventsPageProps {
  onNavigate: (view: any, data?: any) => void;
}

const EventsPage: React.FC<EventsPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const allEvents = getAllEvents();

  const categories = ["All", "Workshop", "Seminar", "Job Fair", "Hackathon"];

  const filteredEvents = useMemo(() => {
    if (activeCategory === "All") return allEvents;
    return allEvents.filter((e) => e.category === activeCategory);
  }, [activeCategory, allEvents]);

  return (
    <div className="bg-slate-50 min-h-screen pt-24 font-jakarta pb-20">
      {/* Dynamic Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="bg-slate-900 rounded-3xl p-10 md:p-20 text-white relative overflow-hidden shadow-2xl group border border-white/5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600 rounded-full blur-[120px] opacity-20 transition-transform group-hover:scale-110 duration-1000"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600 rounded-full blur-[100px] opacity-10"></div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-primary-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-xl">
                Community Events
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8 tracking-tighter uppercase">
                Shape your future at{" "}
                <span className="text-primary-400 underline decoration-white/20">
                  Nepal's Top
                </span>{" "}
                Tech Events.
              </h1>
              <p className="text-lg text-slate-400 font-medium leading-relaxed mb-10 max-w-lg">
                From hands-on hackathons to career-defining job fairs, join
                thousands of students building their professional path.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-10 py-4 bg-primary-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all active:scale-95">
                  Explore All
                </button>
                <button className="px-10 py-4 bg-white/10 text-white border border-white/20 backdrop-blur-md rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">
                  Host an Event
                </button>
              </div>
            </div>
            <div className="hidden lg:block relative group/img">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl rotate-3 group-hover/img:rotate-0 transition-transform duration-700 aspect-[4/3]">
                <img
                  src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  className="w-full h-full object-cover brightness-75"
                  alt=""
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-2xl animate-float">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2">
                  Next Big Event
                </p>
                <p className="text-slate-900 font-black text-sm">
                  AI Workshop 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filter Bar */}
        <div className="flex items-center justify-between gap-8 mb-16 flex-wrap">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white border-slate-900 shadow-xl"
                    : "bg-white border-slate-100 text-slate-400 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-xl border border-slate-100 shadow-sm text-xs font-black uppercase tracking-widest text-slate-400">
            <i className="fa-solid fa-calendar-day text-primary-600"></i>
            Sort by:{" "}
            <select className="bg-transparent border-none focus:ring-0 text-slate-900 p-0 ml-1 font-black cursor-pointer appearance-none">
              <option>Upcoming</option>
              <option>Popular</option>
            </select>
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredEvents.map((event, idx) => (
            <div
              key={event.id}
              onClick={() => onNavigate("eventDetails", { id: event.id })}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-pointer flex flex-col h-full animate-fadeInUp"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                <img
                  src={event.image}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={event.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <span className="px-4 py-1.5 rounded-lg bg-white/95 backdrop-blur-md text-primary-600 text-[10px] font-black uppercase tracking-widest border border-slate-100 shadow-lg">
                    {event.category}
                  </span>
                </div>
                {event.isOnline && (
                  <div className="absolute bottom-6 left-6 px-4 py-1.5 rounded-lg bg-primary-600 text-white text-[10px] font-black uppercase tracking-widest shadow-xl">
                    <i className="fa-solid fa-video mr-2"></i> Online Session
                  </div>
                )}
              </div>

              <div className="p-10 flex flex-col flex-1">
                <div className="flex items-center justify-between text-[10px] font-black text-slate-300 uppercase tracking-widest mb-6">
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-calendar text-primary-600"></i>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary-600">
                    <i className="fa-solid fa-ticket"></i>
                    <span>{event.registrationFee}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary-600 transition-colors leading-tight mb-4 uppercase tracking-tight line-clamp-2">
                  {event.title}
                </h3>

                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 line-clamp-3">
                  {event.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm"
                        >
                          <img
                            src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i + idx}`}
                            alt=""
                          />
                        </div>
                      ))}
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {event.interestedCount}+ Interested
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-primary-600 font-black text-[10px] uppercase tracking-widest hover:text-primary-800 transition-colors">
                    View Details
                    <i className="fa-solid fa-arrow-right-long"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="py-24 text-center bg-white rounded-3xl border border-dashed border-slate-200 animate-fadeIn">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-200">
              <i className="fa-solid fa-calendar-xmark text-5xl"></i>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">
              No events found
            </h3>
            <p className="text-slate-500 font-medium">
              Try another category or check back later for more updates.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

// Fixed: Added missing default export
export default EventsPage;

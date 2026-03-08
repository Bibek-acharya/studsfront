import React, { useEffect } from "react";
import { getEventById, getRelatedEvents } from "../../lib/events-data";

interface EventDetailsPageProps {
  id: string;
  onNavigate: (view: any, data?: any) => void;
}

const EventDetailsPage: React.FC<EventDetailsPageProps> = ({
  id,
  onNavigate,
}) => {
  const event = getEventById(id);
  const related = event ? getRelatedEvents(id, event.category) : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!event)
    return (
      <div className="pt-32 text-center font-black uppercase text-slate-400">
        Event not found.
      </div>
    );

  return (
    <div className="bg-white min-h-screen pt-24 font-sans pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-10 overflow-hidden">
          <span
            onClick={() => onNavigate("home")}
            className="hover:text-primary-600 cursor-pointer whitespace-nowrap"
          >
            Home
          </span>
          <i className="fa-solid fa-chevron-right text-[8px] text-slate-300"></i>
          <span
            onClick={() => onNavigate("eventsPage")}
            className="hover:text-primary-600 cursor-pointer whitespace-nowrap"
          >
            Events
          </span>
          <i className="fa-solid fa-chevron-right text-[8px] text-slate-300"></i>
          <span className="text-primary-600 truncate">{event.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-12">
            <header className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <span className="px-5 py-2 rounded-lg bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-widest border border-primary-100 shadow-sm">
                  {event.category}
                </span>
                {event.isOnline && (
                  <span className="px-5 py-2 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                    <i className="fa-solid fa-globe mr-2"></i> Online session
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tighter uppercase">
                {event.title}
              </h1>
              <p className="text-xl md:text-2xl font-bold text-slate-400 italic leading-relaxed">
                "{event.excerpt}"
              </p>
            </header>

            <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-slate-100 group relative">
              <img
                src={event.image}
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                alt={event.title}
              />
              <div className="absolute bottom-10 left-10 flex gap-4">
                <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl flex flex-col items-center justify-center min-w-[100px] border border-white/20">
                  <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-1">
                    {event.date.split(" ")[0]}
                  </span>
                  <span className="text-3xl font-black text-slate-900 leading-none">
                    {event.date.split(" ")[1].replace(",", "")}
                  </span>
                </div>
              </div>
            </div>

            <section className="space-y-8">
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 uppercase tracking-tight">
                Event Description
              </h2>
              <div className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium whitespace-pre-line space-y-6">
                {event.description}
              </div>
            </section>

            <section className="bg-slate-50 rounded-2xl p-10 md:p-16 border border-slate-100">
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 uppercase tracking-tight mb-12">
                Meet the Speakers
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {event.speakers.map((speaker, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-xl border-4 border-white shrink-0 transition-transform group-hover:scale-105">
                      <img
                        src={`https://api.dicebear.com/7.x/notionists/svg?seed=${speaker.avatar}`}
                        className="w-full h-full object-cover bg-primary-100"
                        alt={speaker.name}
                      />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900 leading-tight uppercase tracking-tight group-hover:text-primary-600 transition-colors">
                        {speaker.name}
                      </h4>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                        {speaker.role}
                      </p>
                      <div className="flex gap-3 mt-4">
                        <button className="w-8 h-8 rounded-lg bg-white border border-slate-100 text-slate-300 hover:text-primary-600 transition-all flex items-center justify-center text-xs shadow-sm">
                          <i className="fa-brands fa-linkedin-in"></i>
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-white border border-slate-100 text-slate-300 hover:text-primary-600 transition-all flex items-center justify-center text-xs shadow-sm">
                          <i className="fa-brands fa-twitter"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="flex flex-wrap gap-3 pt-10 border-t border-slate-50">
              {event.tags.map((t) => (
                <span
                  key={t}
                  className="px-5 py-2 bg-slate-50 text-slate-400 border border-slate-100 rounded-lg text-[10px] font-black uppercase tracking-widest hover:text-primary-600 transition-all"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Right Sidebar Sidebar */}
          <aside className="lg:col-span-4 space-y-10">
            <div className="sticky top-28 space-y-10">
              {/* Event Ticket Card */}
              <div className="bg-white rounded-2xl p-10 border-2 border-primary-600 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/10 rounded-full blur-2xl -mr-16 -mt-16"></div>

                <div className="text-center mb-10">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4">
                    Registration Fee
                  </p>
                  <h3 className="text-5xl font-black text-slate-900 leading-none uppercase tracking-tighter">
                    {event.registrationFee}
                  </h3>
                </div>

                <div className="space-y-8 mb-12">
                  <DetailRow
                    icon="fa-calendar-check"
                    label="Date"
                    val={event.date}
                  />
                  <DetailRow icon="fa-clock" label="Time" val={event.time} />
                  <DetailRow
                    icon="fa-location-dot"
                    label="Location"
                    val={event.location}
                  />
                  <DetailRow
                    icon="fa-shield-halved"
                    label="Organizer"
                    val={event.organizer}
                  />
                </div>

                <div className="pt-8 border-t border-dashed border-slate-100 space-y-4">
                  <button className="w-full py-5 bg-primary-600 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary-500/30 hover:bg-primary-700 transition-all active:scale-95">
                    Book My Spot Now
                  </button>
                  <p className="text-[9px] font-black text-center text-slate-300 uppercase tracking-widest">
                    Limited spots available. RSVP by Feb 10.
                  </p>
                </div>
              </div>

              {/* Social Proof */}
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                  {event.interestedCount} People are going
                </h4>
                <div className="flex -space-x-4 mb-4">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-xl border-4 border-white bg-slate-200 overflow-hidden shadow-sm"
                    >
                      <img
                        src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i + 40}`}
                        alt=""
                      />
                    </div>
                  ))}
                </div>
                <button className="text-primary-600 font-black text-[10px] uppercase tracking-widest hover:underline">
                  Invite your classmates →
                </button>
              </div>

              {/* Related Events Small List */}
              <div className="space-y-6">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] pl-2">
                  Similar Events
                </h3>
                {related.length > 0 ? (
                  related.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onNavigate("eventDetails", { id: rel.id })}
                      className="bg-white p-5 rounded-xl border border-slate-100 hover:shadow-xl transition-all cursor-pointer group flex items-center gap-5"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                        <img
                          src={rel.image}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                          alt=""
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-black text-slate-900 truncate uppercase tracking-tight leading-tight group-hover:text-primary-600 transition-colors">
                          {rel.title}
                        </h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-widest">
                          {rel.date}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest pl-2">
                    No related events found.
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const DetailRow: React.FC<{ icon: string; label: string; val: string }> = ({
  icon,
  label,
  val,
}) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-primary-600 shadow-inner shrink-0">
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div className="min-w-0">
      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-0.5">
        {label}
      </p>
      <p className="text-sm font-black text-slate-800 leading-tight uppercase truncate">
        {val}
      </p>
    </div>
  </div>
);

export default EventDetailsPage;

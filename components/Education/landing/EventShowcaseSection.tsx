import React, { useEffect, useState } from "react";

const eventSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
    alt: "AI Conference Event",
    badgeIcon: "ph-trend-up",
    badgeClass: "bg-green-50 border-green-100 text-green-700",
    badgeIconClass: "text-green-600",
    badgeText: "Trending",
    title: "Learn today, lead tomorrow — your AI journey starts here!",
    date: "Sat,15 Nov",
    location: "Sallaghari,Bhaktpur",
    interested: "100+ Interested",
    avatars: [33, 47, 12],
  },
  {
    image:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&q=80&w=1200",
    alt: "Tech Workshop",
    badgeIcon: "ph-star",
    badgeClass: "bg-purple-50 border-purple-100 text-purple-700",
    badgeIconClass: "text-purple-600",
    badgeText: "Featured",
    title: "Master Machine Learning — Build intelligent systems today!",
    date: "Sun,23 Nov",
    location: "Kathmandu, Nepal",
    interested: "85+ Interested",
    avatars: [5, 9],
  },
  {
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200",
    alt: "Networking Event",
    badgeIcon: "ph-users",
    badgeClass: "bg-blue-50 border-blue-100 text-blue-700",
    badgeIconClass: "text-blue-600",
    badgeText: "Networking",
    title: "Connect with Visionaries — Expand your tech network!",
    date: "Fri,05 Dec",
    location: "Patan, Lalitpur",
    interested: "200+ Interested",
    avatars: [60, 32, 11],
  },
];

const EventShowcaseSection = ({ onNavigate }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % eventSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + eventSlides.length) % eventSlides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % eventSlides.length);
  };

  return (
    <section className="relative w-full max-w-[1380px] mx-auto md:px-10">
      <button
        type="button"
        onClick={previousSlide}
        className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-center text-gray-700 hover:text-blue-600 hover:scale-105 transition-all"
        aria-label="Previous event"
      >
        <i className="ph-bold ph-caret-left text-lg" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-center text-gray-700 hover:text-blue-600 hover:scale-105 transition-all"
        aria-label="Next event"
      >
        <i className="ph-bold ph-caret-right text-lg" />
      </button>

      <div className="overflow-hidden w-full no-scrollbar rounded-3xl" id="carouselWrapper">
        <div
          className="flex transition-transform duration-500 ease-in-out w-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {eventSlides.map((slide, index) => (
            <div
              key={index}
              className="w-full shrink-0 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 px-6 md:px-12"
            >
              <div className="w-full lg:w-[55%]">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-[300px] md:h-[420px] object-cover rounded-[2rem] shadow-sm"
                />
              </div>

              <div className="w-full lg:w-[45%] flex flex-col items-start pr-0 lg:pr-10">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 ${slide.badgeClass}`}
                >
                  <i className={`ph-bold ${slide.badgeIcon} ${slide.badgeIconClass}`} />
                  <span className="font-medium text-sm">{slide.badgeText}</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.2] mb-6 tracking-tight">
                  {slide.title}
                </h1>

                <div className="flex flex-wrap items-center gap-3 text-gray-700 font-medium text-sm md:text-base mb-8">
                  <div className="flex items-center gap-1.5">
                    <i className="ph ph-calendar-blank text-lg" />
                    <span>{slide.date}</span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <div className="flex items-center gap-1.5">
                    <i className="ph-fill ph-map-pin text-lg text-gray-900" />
                    <span>{slide.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <button
                    type="button"
                    onClick={() => onNavigate("events", slide)}
                    className="inline-flex items-center justify-center bg-[#1a66ff] hover:bg-blue-700 text-white font-semibold py-3.5 px-8 rounded-xl transition-colors shadow-sm shadow-blue-500/30"
                  >
                    Apply Now
                  </button>

                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-3">
                      {slide.avatars.map((avatarId) => (
                        <img
                          key={avatarId}
                          className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                          src={`https://i.pravatar.cc/100?img=${avatarId}`}
                          alt="Interested user"
                        />
                      ))}
                    </div>
                    <span className="text-gray-900 font-medium text-sm">
                      {slide.interested}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 mt-8 md:mt-12 mb-16">
        {eventSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentSlide(index)}
            className={
              currentSlide === index
                ? "w-3 h-3 rounded-full bg-[#1a66ff] transition-all duration-300"
                : "w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-all duration-300"
            }
            aria-label={`Go to event slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default EventShowcaseSection;
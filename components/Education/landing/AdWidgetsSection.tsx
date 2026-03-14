import React, { useMemo, useState } from "react";

const adWidgets = [
  [
    {
      title: "Premium Audio Setup",
      description:
        "Experience sound like never before with our new wireless headphones.",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Smart Home Hub",
      description: "Control your entire home with a single tap. Now 20% off.",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Vintage Camera Collection",
      description: "Capture memories in classic style. Limited stock available.",
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
  ],
  [
    {
      title: "Smart Watches",
      description: "Track your fitness goals with precision.",
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Luxury Getaways",
      description: "Book your dream vacation today and save.",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Pro Laptops",
      description: "Unleash your productivity anywhere.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
  ],
];

const AdWidgetCard: React.FC<{ slides: any[] }> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const activeSlide = useMemo(() => slides[currentSlide], [slides, currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="carousel-widget relative w-[680px] max-w-full h-[280px] bg-white rounded-2xl shadow-2xl overflow-hidden group">
      <div className="absolute top-4 right-4 z-10 bg-black/40 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded">
        Ad
      </div>

      <div className="w-full h-full flex-shrink-0 snap-start relative">
        <img
          src={activeSlide.image}
          alt={activeSlide.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
          <h2 className="text-white text-3xl font-bold mb-2">{activeSlide.title}</h2>
          <p className="text-gray-300 text-lg">{activeSlide.description}</p>
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setCurrentSlide(index)}
            className={
              currentSlide === index
                ? "w-8 h-2.5 rounded-full bg-white transition-all duration-300"
                : "w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white/80 transition-all duration-300"
            }
          />
        ))}
      </div>

      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white backdrop-blur-sm text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white backdrop-blur-sm text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

const AdWidgetsSection = () => (
  <div className="flex flex-row flex-wrap justify-center gap-8 w-full max-w-[1500px] mx-auto">
    {adWidgets.map((slides, index) => (
      <AdWidgetCard key={index} slides={slides} />
    ))}
  </div>
);

export default AdWidgetsSection;
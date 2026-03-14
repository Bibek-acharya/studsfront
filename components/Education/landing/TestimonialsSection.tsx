import { useRef } from "react";

const testimonials = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Software Engineering, Class of '24",
    image:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=c0aede",
    rating: 5,
    quote:
      "The hands-on projects and mentorship completely changed my trajectory. I secured a job at a top tech firm before I even graduated. The curriculum is challenging but incredibly rewarding.",
  },
  {
    id: 2,
    name: "Samantha Lee",
    role: "UX/UI Design Bootcamp",
    image:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam&backgroundColor=ffdfbf",
    rating: 5,
    quote:
      "I came in with zero design experience. The instructors guided me through every step, from user research to high-fidelity prototyping. Now I'm a product designer and loving it!",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Business Administration",
    image:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus&backgroundColor=b6e3f4",
    rating: 4,
    quote:
      "The networking opportunities here are unparalleled. I connected with industry leaders and found my co-founder during a campus hackathon. Highly recommend the entrepreneurship track.",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "Data Science Masters",
    image:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena&backgroundColor=ffd5dc",
    rating: 5,
    quote:
      "The deep dive into machine learning algorithms was exactly what I needed. The facilities are state-of-the-art, and the professors are genuinely invested in your success.",
  },
  {
    id: 5,
    name: "David Chen",
    role: "Digital Marketing",
    image:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=c0aede",
    rating: 5,
    quote:
      "Learning how to run actual ad campaigns with real budgets gave me the practical experience employers look for. I felt completely prepared for the workforce on day one.",
  },
  {
    id: 6,
    name: "Aisha Patel",
    role: "Graphic Design",
    image:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha&backgroundColor=ffdfbf",
    rating: 4,
    quote:
      "The studio environment fosters so much creativity. Getting daily critiques from peers and professors helped me refine my eye and build a portfolio I'm truly proud of.",
  },
  {
    id: 7,
    name: "James Wilson",
    role: "Cybersecurity Bootcamp",
    image:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=James&backgroundColor=d1fae5",
    rating: 5,
    quote:
      "The practical labs and real-world attack simulations gave me the confidence to ace my interviews. I am now working as a Junior Penetration Tester and couldn't be happier.",
  },
];

const TestimonialsSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollByCard = (direction: -1 | 1) => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const card = container.querySelector("[data-testimonial-card]") as
      | HTMLDivElement
      | null;
    const amount = card ? card.offsetWidth + 24 : 350;

    container.scrollBy({
      left: amount * direction,
      behavior: "smooth",
    });
  };

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <h2 className="text-indigo-600 font-semibold tracking-wide uppercase text-sm mb-2">
            Success Stories
          </h2>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
            What Our Students Say
          </h1>
          <p className="text-lg text-slate-600">
            Discover how our programs have transformed the careers and lives of
            students from around the globe.
          </p>
        </div>

        <div className="flex gap-3 pb-2 hidden sm:flex">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            className="p-3 rounded-full border border-slate-200 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="Previous Testimonials"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            className="p-3 rounded-full border border-slate-200 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="Next Testimonials"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar"
      >
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            data-testimonial-card
            className="testimonial-card relative shrink-0 w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] snap-start bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col h-auto"
          >
            <div className="absolute top-4 right-6 text-indigo-100 opacity-60 pointer-events-none">
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4z" />
              </svg>
            </div>

            <div className="flex items-center gap-4 mb-6 relative z-10">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-14 h-14 rounded-full border-2 border-indigo-100 bg-white object-cover"
              />
              <div>
                <h3 className="font-bold text-slate-900">{testimonial.name}</h3>
                <p className="text-xs font-medium text-indigo-600 mt-0.5">
                  {testimonial.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 mb-4 relative z-10">
              {Array.from({ length: 5 }, (_, index) => (
                <svg
                  key={index}
                  className={`w-5 h-5 ${
                    index < testimonial.rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <blockquote className="text-slate-600 leading-relaxed flex-grow relative z-10">
              "{testimonial.quote}"
            </blockquote>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-4 sm:hidden">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          className="p-3 rounded-full border border-slate-200 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          aria-label="Previous Testimonials"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          className="p-3 rounded-full border border-slate-200 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          aria-label="Next Testimonials"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TestimonialsSection;
import React, { useState } from "react";

const services = [
  {
    id: 1,
    title: "Hackathons",
    description:
      "Competitive coding challenges where students build real projects.",
    image:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
    color: "bg-blue-200",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    title: "Codecamps",
    description:
      "Short, intensive training sessions on programming and development.",
    image:
      "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800",
    color: "bg-pink-200",
    iconColor: "text-pink-600",
  },
  {
    id: 3,
    title: "Bootcamps",
    description:
      "Fast-paced learning programs on tech, design, business, and skills.",
    image:
      "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800",
    color: "bg-orange-200",
    iconColor: "text-orange-600",
  },
  {
    id: 4,
    title: "Workshops",
    description:
      "Interactive sessions focused on specific skill mastery and career growth.",
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
    color: "bg-purple-300",
    iconColor: "text-purple-600",
  },
  {
    id: 5,
    title: "Networking",
    description:
      "Curated events connecting students with industry leaders and alumni.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    color: "bg-emerald-200",
    iconColor: "text-emerald-600",
  },
  {
    id: 6,
    title: "Summit",
    description:
      "Large scale conferences discussing the future of education and tech.",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    color: "bg-rose-300",
    iconColor: "text-rose-600",
  },
];

const ServicesPage: React.FC = () => {
  const [audience, setAudience] = useState("students");

  return (
    <div className="min-h-screen bg-white font-jakarta">
      {/* Header Section */}
      <div className="pt-24 md:pt-32 pb-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-black mb-3">
            Our Services
          </h1>
          <nav className="text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <span className="text-gray-500">Home</span>
            <span className="text-gray-300">/</span>
            <span className="text-blue-600">Our Services</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        {/* Audience Selector */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            Services we provide for :
          </h2>
          <div className="relative min-w-[200px]">
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full h-14 pl-6 pr-12 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all font-bold text-lg appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%232563EB%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')] bg-[length:1em] bg-[right_1rem_center] bg-no-repeat cursor-pointer"
            >
              <option value="students">Students</option>
              <option value="professionals">Professionals</option>
              <option value="businesses">Businesses</option>
            </select>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {services.map((service) => (
            <div key={service.id} className="group cursor-pointer">
              <div className="relative aspect-[4/3] mb-8 overflow-visible">
                <div className="absolute inset-0 overflow-hidden rounded-2xl image-notch-mask">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
                </div>

                <div
                  className={`absolute bottom-0 right-0 w-16 h-16 ${service.color} rounded-full flex items-center justify-center shadow-xl border-4 border-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-45 z-10`}
                >
                  <i
                    className={`fa-solid fa-arrow-up-right-from-square ${service.iconColor} text-xl`}
                  ></i>
                </div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-3">
                {service.title}
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;

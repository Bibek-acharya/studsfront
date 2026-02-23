import React from "react";

const logos = [
  { icon: "fa-google", color: "text-red-500" },
  { icon: "fa-microsoft", color: "text-blue-500" },
  { icon: "fa-amazon", color: "text-orange-500" },
  { icon: "fa-apple", color: "text-slate-900" },
  { icon: "fa-linkedin", color: "text-blue-700" },
  { icon: "fa-slack", color: "text-purple-500" },
  { icon: "fa-university", color: "text-indigo-600" },
  { icon: "fa-github", color: "text-slate-800" },
];

const Partners: React.FC = () => {
  return (
    <section className="py-20 bg-white border-y border-slate-100 overflow-hidden">
      <div className="w-full text-center mb-16 px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Trusted Partners
        </h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
          Collaborating with world-class universities and industry leaders to
          bridge the skill gap and create global opportunities.
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Masking gradients */}
        <div className="absolute top-0 left-0 h-full w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute top-0 right-0 h-full w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10"></div>

        <div className="flex w-fit animate-marquee whitespace-nowrap gap-8 md:gap-12 px-6">
          {[...logos, ...logos, ...logos].map((logo, idx) => (
            <div
              key={idx}
              className="group w-40 h-24 md:w-56 md:h-32 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <i
                className={`fab ${logo.icon} text-4xl md:text-5xl text-slate-400 group-hover:${logo.color} transition-colors`}
              ></i>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;

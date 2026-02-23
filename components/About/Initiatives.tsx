import React from "react";

interface InitiativeItemProps {
  title: string;
  desc: string;
  img: string;
  colorClass: string;
  iconColor: string;
}

const InitiativeCard: React.FC<InitiativeItemProps> = ({
  title,
  desc,
  img,
  colorClass,
  iconColor,
}) => {
  return (
    <div className="initiative-card group flex flex-col cursor-pointer">
      <div className="relative mb-8 bg-white rounded-2xl">
        <div className="aspect-[4/3] shadow-sm bg-slate-200 rounded-2xl overflow-hidden image-notch-mask">
          <img
            src={img}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <button
          className={`absolute bottom-0 right-0 w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-4 border-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-45 ${colorClass}`}
          aria-label="View more"
        >
          <i className="fa-solid fa-arrow-right text-2xl"></i>
        </button>
      </div>
      <div className="px-4">
        <h3
          className={`text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 transition-colors ${iconColor}`}
        >
          {title}
        </h3>
        <p className="text-sm md:text-lg text-slate-600 leading-relaxed font-medium">
          {desc}
        </p>
      </div>
    </div>
  );
};

const Initiatives: React.FC = () => {
  const data = [
    {
      title: "Our Vision",
      desc: "Building a collaborative ecosystem where students and professionals co-create the future.",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      colorClass: "bg-pastel-blue",
      iconColor: "group-hover:text-blue-600",
    },
    {
      title: "Leadership Summit",
      desc: "Empowering the next generation of leaders through impactful public speaking and global networking.",
      img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
      colorClass: "bg-pastel-pink",
      iconColor: "group-hover:text-pink-600",
    },
    {
      title: "Skill Workshops",
      desc: "Hands-on sessions focused on bridging the gap between academic theory and practical industry skills.",
      img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
      colorClass: "bg-pastel-yellow",
      iconColor: "group-hover:text-yellow-600",
    },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto w-full">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Our Initiatives
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-lg font-medium">
          Discover how we are shaping the future through collaboration,
          leadership, and hands-on learning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-20">
        {data.map((item, i) => (
          <InitiativeCard key={i} {...item} />
        ))}
      </div>

      <div className="flex justify-center">
        <button className="flex items-center gap-3 px-10 py-5 bg-slate-900 hover:bg-black text-white rounded-full font-bold transition-all shadow-xl hover:shadow-2xl active:scale-95 group">
          View All Initiatives
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
            <i className="fa-solid fa-arrow-right text-sm"></i>
          </div>
        </button>
      </div>
    </section>
  );
};

export default Initiatives;

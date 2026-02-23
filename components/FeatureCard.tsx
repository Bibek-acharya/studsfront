
import React from 'react';

interface Feature {
  title: string;
  desc: string;
  img: string;
}

const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => {
  return (
    <div className="group cursor-pointer">
      <div className="overflow-hidden rounded-xl mb-8 shadow-2xl shadow-blue-900/5 h-80 border border-slate-50 relative">
        <img 
          src={feature.img} 
          alt={feature.title} 
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      <div className="px-2">
        <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
        <p className="text-slate-500 leading-relaxed text-lg">
          {feature.desc}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;

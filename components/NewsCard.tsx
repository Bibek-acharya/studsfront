
import React from 'react';

interface NewsItem {
  id: string;
  category: string;
  catColor: string;
  title: string;
  desc: string;
  img: string;
  time: string;
}

interface NewsCardProps {
  item: NewsItem;
  onClick?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ item, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-8 flex flex-col hover:shadow-2xl transition-all duration-500 border border-slate-100 group cursor-pointer h-full"
    >
      <div className="mb-6">
        <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${item.catColor}`}>
          {item.category}
        </span>
      </div>
      <div className="w-full aspect-video rounded-xl overflow-hidden border border-slate-50 mb-8 relative">
        <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={item.title} />
      </div>
      <div className="flex-grow">
        <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors uppercase tracking-tight">{item.title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium line-clamp-3">{item.desc}</p>
      </div>
      <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
          <i className="fa-regular fa-clock"></i>
          {item.time}
        </div>
        <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest hover:text-blue-800 transition-colors">
          View Details
          <i className="fa-solid fa-arrow-right-long"></i>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;


import React from 'react';
import SectionHeader from './SectionHeader';
import NewsCard from './NewsCard';

interface NewsSectionProps {
  onNavigate?: (view: any, data?: any) => void;
}

const newsItems = [
  {
    id: '1',
    category: 'News',
    catColor: 'bg-blue-100 text-blue-700',
    title: 'NEB Class 12 Examination Routine 2081 Released',
    desc: 'The National Examination Board (NEB) has officially published the examination schedule for the Grade 12 annual examinations.',
    img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800',
    time: '2 days ago'
  },
  {
    id: '2',
    category: 'Tech',
    catColor: 'bg-purple-100 text-purple-700',
    title: 'AI Integration in Nepali Higher Education',
    desc: 'Top universities in Nepal are starting to integrate AI-driven tools into their curriculum and admission processes.',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800',
    time: '5 days ago'
  },
  {
    id: '3',
    category: 'Jobs',
    catColor: 'bg-green-100 text-green-700',
    title: 'Tech Industry Hiring Trends in Nepal: 2025 Report',
    desc: 'Explore which skills are most in demand for the upcoming year as the local IT sector continues to expand.',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800',
    time: '1 week ago'
  }
];

const NewsSection: React.FC<NewsSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 bg-slate-50 px-6">
      <div className="w-full px-6 lg:px-12">
        <SectionHeader 
          title="Latest News & Stories" 
          description="Stay updated with the latest trends in the job market, success stories, and expert career advice."
          align="center"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {newsItems.map((item, idx) => (
            <NewsCard 
              key={idx} 
              item={item} 
              onClick={() => onNavigate?.('newsDetails', { id: item.id })} 
            />
          ))}
        </div>
        <div className="mt-16 text-center">
           <button 
             onClick={() => onNavigate?.('newsPage')}
             className="px-10 py-4 bg-white border-2 border-slate-100 hover:border-primary-600 hover:text-primary-600 transition-all font-black text-xs uppercase tracking-widest rounded-2xl shadow-sm active:scale-95"
           >
             Explore All News
           </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;

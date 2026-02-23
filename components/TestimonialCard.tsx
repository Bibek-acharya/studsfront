
import React from 'react';

interface Testimonial {
  name: string;
  role: string;
  class: string;
  img: string;
  text: string;
}

const TestimonialCard: React.FC<{ review: Testimonial }> = ({ review }) => {
  return (
    <div className="bg-white rounded-xl p-10 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 relative group overflow-hidden">
      <div className="absolute top-8 right-10 text-blue-100/30 text-7xl font-serif">"</div>
      
      <div className="flex items-center gap-5 mb-8">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-100 p-0.5">
          <img src={review.img} alt={review.name} className="w-full h-full object-cover rounded-full" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-lg">{review.name}</h4>
          <p className="text-xs text-gray-500 font-medium mb-1">{review.role}</p>
          <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest">{review.class}</span>
        </div>
      </div>
      
      <p className="text-gray-600 italic text-lg leading-relaxed mb-10 relative z-10">
        "{review.text}"
      </p>
      
      <a href="#" className="inline-flex items-center text-blue-600 text-sm font-bold hover:text-blue-800 transition-colors gap-2 group/link">
        <i className="fa-brands fa-linkedin text-xl"></i> 
        View Profile
        <i className="fa-solid fa-arrow-right text-xs transition-transform group-hover/link:translate-x-1"></i>
      </a>
    </div>
  );
};

export default TestimonialCard;

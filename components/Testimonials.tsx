
import React from 'react';
import SectionHeader from './SectionHeader';
import TestimonialCard from './TestimonialCard';

const reviews = [
  {
    name: 'Sarah Jenkins',
    role: 'Product Designer @ Spotify',
    class: 'Class of 2023',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    text: "Studsphere's mentorship program was a game-changer. My mentor helped me refine my portfolio, which directly led to my offer at Spotify."
  },
  {
    name: 'David Chen',
    role: 'Software Engineer @ Google',
    class: 'Class of 2022',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    text: "The AI resume builder and mock interview tools gave me the confidence I needed. I landed multiple offers within weeks of using the platform."
  },
  {
    name: 'Emily Rodriguez',
    role: 'Marketing Lead @ Airbnb',
    class: 'Class of 2021',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    text: "Finding a job that aligns with my values was hard until I found Studsphere. The company insights helped me choose the right culture."
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="w-full bg-white py-24 border-t border-gray-100">
      <div className="w-full px-6 lg:px-12">
        <SectionHeader 
          title="Success Stories" 
          description="Hear from students and educators who have transformed their lives with StudSphere."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {reviews.map((r, idx) => (
            <TestimonialCard key={idx} review={r} />
          ))}
        </div>

        <div className="flex justify-center mt-16 gap-3">
          <span className="w-10 h-2.5 rounded-full bg-blue-600 cursor-pointer shadow-lg shadow-blue-500/30"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-gray-200 cursor-pointer hover:bg-gray-300 transition-all"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-gray-200 cursor-pointer hover:bg-gray-300 transition-all"></span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

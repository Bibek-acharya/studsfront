
import React from 'react';
import SectionHeader from './SectionHeader';
import FeatureCard from './FeatureCard';

const featureData = [
  {
    title: 'Smart Resume Builder',
    desc: 'Create professional, ATS-friendly resumes in minutes with our AI-powered builder. Get real-time feedback on your content to increase your chances of getting hired.',
    img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Mock Interview Practice',
    desc: 'Prepare for your big day with our realistic mock interview simulator. Practice common industry-specific questions and receive AI-generated tips to build confidence.',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Direct Recruiter Chat',
    desc: 'Skip the inbox abyss and connect directly with hiring managers. Our messaging platform allows for verified communication and building meaningful relationships.',
    img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop'
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-24 md:py-32 px-6 bg-white">
      <div className="w-full px-6 lg:px-12">
        <SectionHeader 
          title="Our Features" 
          description="Everything you need to land your dream job, built right into one powerful platform designed for your professional success."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {featureData.map((f, i) => (
            <FeatureCard key={i} feature={f} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

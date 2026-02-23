import React from "react";
import Hero from "../Hero";
import FeaturedArticle from "../FeaturedArticle";
import Partners from "../Partners";
import PlatformSection from "../PlatformSection";
import Admissions from "../Admissions";
import JobGrid from "../JobGrid";
import Features from "../Features";
import NewsSection from "../NewsSection";
import Testimonials from "../Testimonials";

interface HomeViewProps {
  onNavigate: (view: any, data?: any) => void;
  user: { name: string; email: string; role: string } | null;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate, user }) => {
  return (
    <>
      <Hero
        onStart={() =>
          onNavigate(
            user
              ? user.role === "job_seeker"
                ? "jobFeed"
                : "educationPage"
              : "signup",
          )
        }
      />

      <FeaturedArticle onNavigate={onNavigate} />

      <Partners />

      <div id="education">
        <PlatformSection
          type="education"
          title="Discover the Right University for You"
          description="Access a database of over 5,000 universities worldwide. Filter by scholarship availability, location, and course specialization to find your perfect academic match."
          bullets={[
            "Global Scholarship Aggregator",
            "AI-Powered Course Recommendations",
            "Direct Application Portals",
          ]}
          imageUrl="https://republicaimg.nagariknewscdn.com/shared/web/uploads/media/education-student-enrollment_20200301102001.jpg"
          buttonText="Find Colleges"
          buttonIcon="fa-search"
          onAction={() => onNavigate("findCollege")}
        />
      </div>

      <Admissions />

      <div id="jobs">
        <PlatformSection
          type="job"
          title="Land Your Dream Job with Confidence"
          description="Bridging the gap between graduation and employment. We connect you directly with employers looking for fresh talent and skills you've just mastered."
          bullets={[
            "Direct Employer Connections",
            "Verified Resume Database",
            "Skill Assessment Badges",
          ]}
          imageUrl="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80"
          buttonText="Find a Job"
          buttonIcon="fa-briefcase"
          reverse
          bgColor="bg-slate-50"
          onAction={() => onNavigate("jobsPage")}
        />
      </div>

      <JobGrid onNavigate={onNavigate} />

      <Features />

      <NewsSection onNavigate={onNavigate} />

      <Testimonials />
    </>
  );
};

export default HomeView;

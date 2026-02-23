import React, { useEffect } from "react";
import PhotoGrid from "./PhotoGrid";
import Founders from "./Founders";
import MissionVision from "./MissionVision";
import Stats from "./Stats";
import Initiatives from "./Initiatives";

const AboutPage: React.FC = () => {
  useEffect(() => {
    // Re-initialize Lucide icons when component mounts
    if ((window as any).lucide) {
      (window as any).lucide.createIcons();
    }

    // Observer for reveal animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document
      .querySelectorAll(".scroll-reveal, .animate-fadeInUp")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pt-24 md:pt-32 pb-20 bg-white min-h-screen">
      <main className="flex-grow flex flex-col items-center overflow-x-hidden">
        {/* Photo Grid Section: Matched to landing page styling */}
        <section className="w-full flex justify-center mb-16 md:mb-24">
          <div className="w-full max-w-[1400px] px-4">
            <PhotoGrid />
          </div>
        </section>

        {/* Other sections remain centered within standard container */}
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex flex-col items-center">
          <Founders />
          <MissionVision />
          <Stats />
          <Initiatives />
        </div>
      </main>
    </div>
  );
};

export default AboutPage;

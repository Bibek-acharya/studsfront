import React, { useState, useEffect, useRef } from "react";

const useCounter = (target: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStarted(true);
        }
      },
      { threshold: 0.5 },
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isStarted) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isStarted, target, duration]);

  return { count, elementRef };
};

const StatItem: React.FC<{
  target: number;
  label: string;
  icon: string;
  colorClass: string;
  bgColorClass: string;
}> = ({ target, label, icon, colorClass, bgColorClass }) => {
  const { count, elementRef } = useCounter(target);
  return (
    <div
      ref={elementRef}
      className="bg-white p-8 md:p-10 rounded-2xl text-center shadow-sm hover:shadow-xl transition-all duration-500 group"
    >
      <div
        className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 ${bgColorClass} ${colorClass} rounded-xl mb-6 group-hover:scale-110 transition-transform`}
      >
        <i className={`fa-solid ${icon} text-2xl md:text-3xl`}></i>
      </div>
      <div className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2">
        {count.toLocaleString()}+
      </div>
      <p className="text-slate-500 text-sm md:text-lg font-bold tracking-tight">
        {label}
      </p>
    </div>
  );
};

const Stats: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 w-full mb-20 md:mb-24">
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Numbers that tell our story
        </h2>
        <p className="text-sm md:text-lg text-slate-500 font-medium">
          Growing impact across the nation
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
        <StatItem
          target={50000}
          label="Students Empowered"
          icon="fa-users"
          colorClass="text-blue-600"
          bgColorClass="bg-blue-50"
        />
        <StatItem
          target={75}
          label="Partner Schools"
          icon="fa-school"
          colorClass="text-pink-600"
          bgColorClass="bg-pink-50"
        />
        <StatItem
          target={25}
          label="Districts Covered"
          icon="fa-map-location-dot"
          colorClass="text-yellow-600"
          bgColorClass="bg-yellow-50"
        />
        <StatItem
          target={150}
          label="Mentors & Experts"
          icon="fa-award"
          colorClass="text-purple-600"
          bgColorClass="bg-purple-50"
        />
      </div>
    </section>
  );
};

export default Stats;

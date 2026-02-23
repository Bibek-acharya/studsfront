import React from "react";
import SectionHeader from "./SectionHeader";
import JobCard from "./JobCard";

interface JobGridProps {
  onNavigate?: (view: any, data?: any) => void;
}

const jobs = [
  {
    id: 1,
    title: "Senior Product Designer",
    company: "Figma",
    logo: "fa-figma",
    logoColor: "text-purple-600",
    location: "San Francisco",
    type: "Full-time",
    salary: "140k - 180k",
    description:
      "We are looking for a visionary designer to lead our core design systems. You will collaborate with engineering to build scalable UI components.",
  },
  {
    id: 2,
    title: "UX Researcher",
    company: "Spotify",
    logo: "fa-spotify",
    logoColor: "text-green-500",
    location: "New York",
    type: "Contract",
    salary: "120k - 150k",
    description:
      "Join our research team to uncover user insights that shape the future of audio streaming. You will conduct qualitative and quantitative studies.",
  },
  {
    id: 3,
    title: "Frontend Engineer",
    company: "Atlassian",
    logo: "fa-atlassian",
    logoColor: "text-blue-600",
    location: "Remote",
    type: "Full-time",
    salary: "150k - 200k",
    description:
      "Help us build the next generation of project management tools. You will work on high-performance React components and real-time sync engines.",
  },
];

const JobGrid: React.FC<JobGridProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 bg-slate-50 px-4">
      <div className="w-full px-6 lg:px-12">
        <SectionHeader
          title="Jobs you may be interested in"
          description="Personalized recommendations based on your skills and academic background."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onAction={() => onNavigate?.("jobDetails", { id: job.id })}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobGrid;

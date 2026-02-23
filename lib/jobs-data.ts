
export interface SimilarJob {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  rating: number;
  reviews: number;
  experience: string;
  location: string;
  description: string;
  postedDaysAgo: number;
}

export interface JobListing {
  id: number;
  title: string;
  companyName: string;
  companyLogo: string;
  companyRating: number;
  companyReviews: number;
  location: string;
  experienceLevel: string;
  jobType: string[];
  salary: string;
  openings: number;
  applicantCount: number;
  impressions: number;
  jobExpire: string;
  jobHighlights: string[];
  matchScore: { label: string; status: 'active' | 'inactive' }[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  similarJobs: SimilarJob[];
}

const jobs: JobListing[] = [
  {
    id: 1,
    title: "Senior Software Engineer (Full Stack)",
    companyName: "StudSphere Education",
    companyLogo: "https://ui-avatars.com/api/?name=SS&background=0D1117&color=fff",
    companyRating: 4.8,
    companyReviews: 1240,
    location: "Kathmandu, Nepal (Remote)",
    experienceLevel: "5-8 Years",
    jobType: ["Full-time", "Permanent"],
    salary: "$120,000 - $160,000",
    openings: 2,
    applicantCount: 45,
    impressions: 1200,
    jobExpire: "15 Days Remaining",
    jobHighlights: [
      "Work with cutting-edge AI and EdTech solutions",
      "Fully remote culture with global collaboration",
      "Competitive equity and bonus structure",
      "Opportunity to lead high-impact engineering teams"
    ],
    matchScore: [
      { label: "React & TypeScript", status: "active" },
      { label: "Node.js & GraphQL", status: "active" },
      { label: "Cloud Infrastructure (AWS/GCP)", status: "inactive" },
      { label: "EdTech Experience", status: "active" }
    ],
    description: `We are looking for a Senior Full Stack Engineer who is passionate about building products that empower students worldwide. You will be responsible for the end-to-end development of our core learning platform, ensuring scalability, performance, and a seamless user experience.\n\nYou will join a remote-first team of dedicated professionals who value trust, autonomy, and continuous learning.`,
    responsibilities: [
      "Design and implement scalable web applications using React and Node.js.",
      "Collaborate with product managers and designers to translate requirements into technical specifications.",
      "Optimize application for maximum speed and scalability.",
      "Mentor junior engineers and promote best practices in software development.",
      "Participate in code reviews and contribute to the overall technical roadmap."
    ],
    requirements: [
      "Strong proficiency in JavaScript/TypeScript and modern frontend frameworks like React.",
      "Experience building backend services with Node.js and REST/GraphQL APIs.",
      "Familiarity with databases like PostgreSQL and Redis.",
      "Knowledge of cloud technologies and CI/CD pipelines.",
      "Excellent communication skills and the ability to work in a fast-paced environment."
    ],
    similarJobs: [
      {
        id: 2,
        title: "Frontend Lead",
        company: "TechFlow Nepal",
        companyLogo: "https://ui-avatars.com/api/?name=TF&background=blue&color=fff",
        rating: 4.2,
        reviews: 85,
        experience: "6+ Years",
        location: "Lalitpur",
        description: "Leading the UI efforts for Nepal's biggest logistics platform.",
        postedDaysAgo: 2
      },
      {
        id: 3,
        title: "Senior Backend Engineer",
        company: "Nebula Corp",
        companyLogo: "https://ui-avatars.com/api/?name=NC&background=purple&color=fff",
        rating: 4.5,
        reviews: 210,
        experience: "4-7 Years",
        location: "Remote",
        description: "Join our core infrastructure team building high-performance systems.",
        postedDaysAgo: 5
      },
      {
        id: 4,
        title: "Staff Product Designer",
        company: "Orbit UI",
        companyLogo: "https://ui-avatars.com/api/?name=OU&background=orange&color=fff",
        rating: 4.9,
        reviews: 156,
        experience: "8+ Years",
        location: "Hybrid (Kathmandu)",
        description: "Scale our design systems across multiple product lines.",
        postedDaysAgo: 1
      }
    ]
  },
  {
    id: 101,
    title: "Java Developer",
    companyName: "Nepal Tech Solutions",
    companyLogo: "https://ui-avatars.com/api/?name=NT&background=red&color=fff",
    companyRating: 3.9,
    companyReviews: 120,
    location: "Kathmandu (Remote)",
    experienceLevel: "0-1 Yrs",
    jobType: ["Full-time"],
    salary: "Not disclosed",
    openings: 5,
    applicantCount: 150,
    impressions: 4500,
    jobExpire: "20 Days Remaining",
    jobHighlights: [
      "Training provided for freshers",
      "Opportunity to work on enterprise Java applications",
      "Supportive team environment"
    ],
    matchScore: [
      { label: "Java 8+", status: "active" },
      { label: "Spring Boot", status: "inactive" },
      { label: "SQL Knowledge", status: "active" }
    ],
    description: "Seeking motivated entry-level developers to join our Java excellence center.",
    responsibilities: ["Code maintenance", "Bug fixing", "Small feature dev"],
    requirements: ["Bachelor's in CS", "Internship experience preferred"],
    similarJobs: []
  }
];

export const getJobById = (id: number): JobListing | undefined => {
  return jobs.find(job => job.id === id);
};

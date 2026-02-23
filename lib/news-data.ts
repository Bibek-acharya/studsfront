
export interface NewsArticle {
  id: string;
  category: "Academic" | "Tech" | "Jobs" | "Policy";
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  source: string;
  tags: string[];
}

const newsArticles: NewsArticle[] = [
  {
    id: "1",
    category: "Academic",
    title: "NEB Class 12 Examination Routine 2081 Released",
    excerpt: "The National Examination Board (NEB) has officially published the examination schedule for the Grade 12 annual examinations.",
    content: "The National Examination Board (NEB) of Nepal has officially announced the routine for the Class 12 board examinations for the academic year 2081/82. The exams are scheduled to begin on Baishakh 14, 2082. \n\nThis year, approximately 500,000 students across the country are expected to appear for the exams. The board has instructed all regional offices and schools to complete the necessary preparations, including internal evaluations, before the commencement of the final exams. Students are advised to visit the official NEB portal to download the detailed routine for their respective streams.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200",
    author: "Academics Desk",
    date: "Jan 22, 2025",
    readTime: "4 min",
    source: "NEB Official",
    tags: ["NEB", "Exam", "Class12", "Routine"]
  },
  {
    id: "2",
    category: "Tech",
    title: "AI Integration in Nepali Higher Education",
    excerpt: "Top universities in Nepal are starting to integrate AI-driven tools into their curriculum and admission processes.",
    content: "A new wave of digital transformation is hitting the educational landscape of Nepal. Major institutions like Tribhuvan University and Kathmandu University are actively exploring ways to incorporate Artificial Intelligence (AI) into their teaching methodologies. \n\nFrom automated grading systems to personalized learning tracks, the integration of technology aims to improve the quality of education and better prepare students for the global market. Furthermore, AI is being used to streamline the entrance examination process, making it more efficient and transparent for thousands of applicants.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200",
    author: "Tech Reporter",
    date: "Jan 18, 2025",
    readTime: "6 min",
    source: "StudSphere Tech",
    tags: ["AI", "Education", "TechTrends", "Nepal"]
  },
  {
    id: "3",
    category: "Jobs",
    title: "Tech Industry Hiring Trends in Nepal: 2025 Report",
    excerpt: "Explore which skills are most in demand for the upcoming year as the local IT sector continues to expand.",
    content: "The IT sector in Nepal is showing no signs of slowing down. A recent industry report highlights a 25% increase in demand for Software Engineers, particularly those with expertise in React, Node.js, and Cloud Computing. \n\nInternational outsourcing firms based in Kathmandu are looking for talent that combines technical skills with strong communication. Additionally, roles in Data Science and UI/UX Design are becoming increasingly popular as startups scale their digital presence. This news comes as a relief to recent graduates who are entering a competitive but vibrant job market.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200",
    author: "Career Desk",
    date: "Jan 15, 2025",
    readTime: "5 min",
    source: "Job Tracker",
    tags: ["Hiring", "IT", "Career", "NepalJobs"]
  },
  {
    id: "4",
    category: "Policy",
    title: "New Government Policy for Research Grants",
    excerpt: "The Ministry of Education introduces a new initiative to support academic research and innovation in local universities.",
    content: "In an effort to boost local innovation, the Ministry of Education has announced a significant policy shift regarding research grants. A dedicated fund of NPR 500 Million has been set aside for the upcoming fiscal year to support research projects in Science, Technology, and Medicine. \n\nQualified professors and students from constituent and affiliated colleges can now apply for these grants through a transparent online portal. The policy aims to reduce the dependency on foreign research and foster a culture of evidence-based academic growth within the country.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200",
    author: "Policy Analyst",
    date: "Jan 10, 2025",
    readTime: "7 min",
    source: "MoE Nepal",
    tags: ["Policy", "Research", "Grants", "Innovation"]
  }
];

export const getAllNews = (): NewsArticle[] => newsArticles;

export const getNewsById = (id: string): NewsArticle | undefined => 
  newsArticles.find(n => n.id === id);

export const getRelatedNews = (id: string, category: string): NewsArticle[] => 
  newsArticles.filter(n => n.id !== id && n.category === category).slice(0, 3);

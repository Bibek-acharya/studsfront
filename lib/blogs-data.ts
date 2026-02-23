
export interface BlogPost {
  id: string;
  category: "Career Advice" | "Study Tips" | "Student Life";
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorTitle: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    category: "Career Advice",
    title: "How to Land Your First Tech Internship",
    excerpt: "A comprehensive guide for students entering the IT market in Nepal. From portfolio building to interview prep.",
    content: "Landing your first internship can feel like a daunting task, especially when everyone seems to require 'experience'. However, in the tech world, your projects and problem-solving skills often speak louder than a formal job history. \n\nStart by building a solid GitHub profile. Contribute to open-source projects or build something that solves a local problem—like an e-library for your college or a simple budgeting app. When it comes to interviews, focus on your fundamentals: Data Structures, Algorithms, and your ability to explain your code. Remember, an internship is a learning opportunity, so showing curiosity and a willingness to grow is just as important as your technical stack.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200",
    author: "Sita Sharma",
    authorTitle: "Tech Lead @ StudSphere",
    authorAvatar: "Sita",
    date: "Jan 21, 2025",
    readTime: "6 min",
    tags: ["Internship", "Career", "IT", "Students"]
  },
  {
    id: "2",
    category: "Study Tips",
    title: "Mastering the CEE: 5 Strategies for Success",
    excerpt: "Preparation tips from top-ranked students who cleared the Common Entrance Exam for Medical studies.",
    content: "The CEE is one of the most competitive exams in Nepal. Success requires more than just hard work—it requires a strategy. \n\n1. Consistent Revision: Don't wait for the last month. Review your notes daily. \n2. Solve Past Papers: Familiarize yourself with the question pattern and time management. \n3. Focus on Physics & Chemistry: While biology is crucial, many students find the calculations in physics and chemistry challenging. Mastering these can give you a significant edge. \n4. Join a Mock Test Series: Regular testing helps you identify your weak areas under pressure. \n5. Take Care of Your Health: A tired mind cannot retain information. Ensure you get 7 hours of sleep and maintain a healthy diet.",
    image: "https://images.unsplash.com/photo-1454165833767-1316b344249a?q=80&w=1200",
    author: "Dr. Rohan Das",
    authorTitle: "Education Expert",
    authorAvatar: "Rohan",
    date: "Jan 19, 2025",
    readTime: "8 min",
    tags: ["CEE", "Medical", "Preparation", "StudyTips"]
  },
  {
    id: "3",
    category: "Student Life",
    title: "Life at Pulchowk Campus: What to Expect",
    excerpt: "A sneak peek into the daily life, clubs, and challenges of being an engineering student at IOE.",
    content: "Being a student at Pulchowk Campus is a mix of intense academic pressure and vibrant creative freedom. From the long hours in the drawing hall to the late-night discussions at the local chiya pasals, the environment is designed to push you to your limits. \n\nThe campus is more than just lectures. Joining clubs like ASIS or the Robotics Club allows you to apply what you've learned in the classroom to real-world projects. It's about finding the balance between completing your lab reports and participating in the annual sports meet. The friendships you forge here often last a lifetime, as you all struggle and grow through the rigorous four-year journey together.",
    image: "https://images.unsplash.com/photo-1523050335392-495619989da1?q=80&w=1200",
    author: "Anish Tamang",
    authorTitle: "BE Civil @ IOE",
    authorAvatar: "Anish",
    date: "Jan 14, 2025",
    readTime: "5 min",
    tags: ["IOE", "StudentLife", "Pulchowk", "Engineering"]
  }
];

export const getAllBlogs = (): BlogPost[] => blogPosts;

export const getBlogById = (id: string): BlogPost | undefined => 
  blogPosts.find(b => b.id === id);

export const getRelatedBlogs = (id: string, category: string): BlogPost[] => 
  blogPosts.filter(b => b.id !== id && b.category === category).slice(0, 3);

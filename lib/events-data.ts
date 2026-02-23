
export interface EventSpeaker {
  name: string;
  role: string;
  avatar: string;
}

export interface StudEvent {
  id: string;
  category: "Workshop" | "Seminar" | "Job Fair" | "Hackathon";
  title: string;
  excerpt: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  isOnline: boolean;
  registrationFee: string;
  interestedCount: number;
  speakers: EventSpeaker[];
  tags: string[];
}

const events: StudEvent[] = [
  {
    id: "1",
    category: "Workshop",
    title: "AI Journey Starts Here: Machine Learning for Beginners",
    excerpt: "Get hands-on experience with Python and ML fundamentals in this intensive one-day session.",
    description: "Join us for an immersive workshop where we bridge the gap between theoretical data science and practical application. Whether you are a CS student or a tech enthusiast, this session covers everything from basic data pre-processing to building your first predictive model using Scikit-Learn. \n\nParticipants will receive a certificate of completion and access to exclusive StudSphere ML resources. Don't miss this chance to kickstart your AI career.",
    image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1200",
    date: "Feb 15, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Sallaghari, Bhaktapur",
    organizer: "StudSphere Tech Lab",
    isOnline: false,
    registrationFee: "NPR 500",
    interestedCount: 240,
    speakers: [
      { name: "Anish Tamang", role: "AI Researcher @ TechNepal", avatar: "Felix" },
      { name: "Sarah Johnson", role: "Senior Developer @ Google", avatar: "Sarah" }
    ],
    tags: ["AI", "Python", "MachineLearning", "SkillDevelopment"]
  },
  {
    id: "2",
    category: "Job Fair",
    title: "Nepal Tech Expo & Career Fair 2025",
    excerpt: "Connect with 50+ top tech employers in Nepal. Bring your resume and land your dream job.",
    description: "The biggest career fair of the year is here. StudSphere is partnering with major IT firms to bring recruitment right to your doorstep. This event features on-the-spot interviews, resume review clinics, and networking sessions with HR leads from top companies like eSewa, F1Soft, and Leapfrog.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200",
    date: "Mar 10, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Pragati Shikshya Sadan, Kathmandu",
    organizer: "Nepal IT Council",
    isOnline: false,
    registrationFee: "Free",
    interestedCount: 1500,
    speakers: [
      { name: "Manisha K.C.", role: "HR Lead @ Verisk", avatar: "Aneeka" }
    ],
    tags: ["Networking", "Hiring", "CareerFair", "NepalTech"]
  },
  {
    id: "3",
    category: "Seminar",
    title: "Study Abroad: Scholarships in USA & Europe",
    excerpt: "Expert guidance on GRE/TOEFL/IELTS and full-ride scholarship opportunities for 2025.",
    description: "Thinking about global education? This seminar breaks down the complex process of applying to international universities. Learn how to write a winning SOP, secure funding, and navigate visa requirements from consultants and students currently studying abroad.",
    image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1200",
    date: "Feb 28, 2025",
    time: "1:00 PM - 3:00 PM",
    location: "Virtual (StudSphere Live)",
    organizer: "Global Ed Consultants",
    isOnline: true,
    registrationFee: "Free",
    interestedCount: 890,
    speakers: [
      { name: "Dr. Rohan Das", role: "Education Consultant", avatar: "Rohan" }
    ],
    tags: ["StudyAbroad", "Scholarships", "IELTS", "USA"]
  }
];

export const getAllEvents = (): StudEvent[] => events;

export const getEventById = (id: string): StudEvent | undefined => 
  events.find(e => e.id === id);

export const getRelatedEvents = (id: string, category: string): StudEvent[] => 
  events.filter(e => e.id !== id && e.category === category).slice(0, 3);

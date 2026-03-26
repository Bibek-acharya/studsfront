export type AdmissionLevel = "high-school" | "alevel" | "diploma" | "bachelor" | "master";

export interface ProgramInfo {
  name: string;
  status: "Closing Soon" | "Opening Soon" | "Seats Available";
}

export interface AdmissionCardData {
  id: string;
  name: string;
  rating: number;
  type: string;
  location: string;
  province: string;
  district: string;
  city: string;
  fee: number;
  website: string;
  featured: boolean;
  affiliation: string;
  programs: string[] | ProgramInfo[];
  imageUrls: string[];
  logo?: string;
  facilities?: string[];
  scholarships?: string[];
  tag?: { text: string; color: string };
  title?: string;
}

const cardTags = [
  { text: 'Featured', color: 'bg-[#0d6efd]' },
  { text: 'Filling Fast', color: 'bg-red-500' },
  { text: 'Limited Seats', color: 'bg-orange-500' },
  { text: 'High Demand', color: 'bg-rose-500' },
  { text: 'Scholarship Available', color: 'bg-emerald-500' },
  { text: 'Recommended', color: 'bg-purple-500' },
  { text: 'Up to 100% Scholarship', color: 'bg-green-600' },
  { text: 'SEE Scholarship', color: 'bg-teal-500' },
  { text: 'Popular Choice', color: 'bg-amber-500' },
  { text: 'Best for Science', color: 'bg-indigo-500' }
];

const generateMockCards = (level: string, count: number): AdmissionCardData[] => {
  const baseColleges = [
    { name: "KIST College", location: "Kamalpokhari, Kathmandu", logo: "https://kist.edu.np/resources/assets/img/logo_small.jpg" },
    { name: "St. Xavier's", location: "Maitighar, Kathmandu", logo: "https://scontent.fktm8-1.fna.fbcdn.net/v/t39.30808-1/280665714_383838423778508_4848383838383838383_n.jpg" },
    { name: "Global College", location: "Mid-Baneshwor, Kathmandu", logo: "https://globalcollege.edu.np/wp-content/uploads/2021/06/GCC-Logo.png" },
    { name: "Islington College", location: "Kamalpokhari, Kathmandu", logo: "https://islington.edu.np/wp-content/uploads/2021/04/Islington-College-Logo.png" },
    { name: "The British College", location: "Thapathali, Kathmandu", logo: "https://thebritishcollege.edu.np/public/frontend/images/logo.png" },
    { name: "Prasadi Academy", location: "Manbhawan, Lalitpur", logo: "https://prasadi.edu.np/wp-content/themes/prasadi/images/logo.png" },
    { name: "Trinity International", location: "Dillibazar, Kathmandu", logo: "https://trinity.edu.np/wp-content/uploads/2021/06/trinity-logo.png" },
    { name: "Prime College", location: "Khushibu, Kathmandu", logo: "https://prime.edu.np/wp-content/uploads/2021/04/prime-logo.png" },
    { name: "Texas International", location: "Chabahil, Kathmandu", logo: "https://texasintl.edu.np/wp-content/uploads/2021/04/texas-logo.png" },
    { name: "Orchid International", location: "Bijayachowk, Kathmandu", logo: "https://orchid.edu.np/wp-content/uploads/2021/04/orchid-logo.png" }
  ];

  return Array.from({ length: count }).map((_, i) => {
    const base = baseColleges[i % baseColleges.length];
    const programsList = level === "high-school" ? ["Science", "Management", "Humanities"] :
                        level === "alevel" ? ["A-Level Science", "A-Level Non-Science"] :
                        level === "diploma" ? ["Diploma in Civil", "Diploma in Computer"] :
                        level === "bachelor" ? ["BIT (Hons)", "BBA", "BSc Computing"] :
                        ["MBA", "EMBA", "MPhil"];
    
    return {
      id: `${level}-${i}`,
      name: `${base.name} - ${i + 1}`,
      rating: parseFloat((4 + Math.random()).toFixed(1)),
      type: i % 2 === 0 ? "Private College" : "Community College",
      location: base.location,
      province: "Bagmati",
      district: level === "high-school" && i > 3 ? "Lalitpur" : "Kathmandu",
      city: level === "high-school" && i > 3 ? "Lalitpur Metropolitan" : "Kathmandu Metropolitan",
      fee: 50000 + (Math.random() * 500000),
      website: `www.${base.name.toLowerCase().replace(/[^a-z]/g, '')}${i+1}.edu.np`,
      featured: i < 3,
      affiliation: i % 2 === 0 ? "NEB" : "TU",
      programs: programsList,
      facilities: ["Digital Library", "Sports Complex", "Wi-Fi Campus"],
      scholarships: ["Merit Scholarship", "Entrance Scholarship"],
      imageUrls: [
        `https://images.unsplash.com/photo-${1500000000000 + (i * 100000)}?auto=format&fit=crop&w=600&q=70`,
        `https://images.unsplash.com/photo-${1510000000000 + (i * 100000)}?auto=format&fit=crop&w=600&q=70`
      ],
      logo: base.logo,
      tag: cardTags[i % cardTags.length],
      title: `${level.toUpperCase()} Admission Open for ${programsList[0]} at ${base.name}`
    };
  });
};

export const cardsByLevel: Record<AdmissionLevel, AdmissionCardData[]> = {
  "high-school": generateMockCards("high-school", 10),
  "alevel": generateMockCards("alevel", 8),
  "diploma": generateMockCards("diploma", 8),
  "bachelor": generateMockCards("bachelor", 12),
  "master": generateMockCards("master", 8),
};

export const levelMeta = {
  "high-school": {
    subtitle: "Ongoing admission for 2026 intake",
    searchPlaceholder: "Search +2 colleges...",
    featuredTitle: "Featured +2 Colleges",
  },
  alevel: {
    subtitle: "Discover Cambridge internationally recognized degrees",
    searchPlaceholder: "Search A-Level colleges...",
    featuredTitle: "Featured A-Level Colleges",
  },
  diploma: {
    subtitle: "Technical and vocational education intake",
    searchPlaceholder: "Search CTEVT colleges...",
    featuredTitle: "Featured Technical Institutions",
  },
  bachelor: {
    subtitle: "Undergraduate programs across Nepal",
    searchPlaceholder: "Search bachelor colleges...",
    featuredTitle: "Featured Bachelor Programs",
  },
  master: {
    subtitle: "Postgraduate programs and EMBA",
    searchPlaceholder: "Search master colleges...",
    featuredTitle: "Featured Master Institutions",
  },
};

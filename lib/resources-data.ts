
export type ResourceType = 'all' | 'notes' | 'syllabus' | 'books' | 'solutions' | 'guides';

export interface Resource {
  id: number;
  type: ResourceType;
  title: string;
  author: string;
  date: string;
  downloads: string;
  views: string;
  rating: number;
  icon: string;
  color: string;
  bg: string;
  content: {
    fileType: string;
    file_size?: string;
    previewUrl?: string;
    description?: string;
    summary?: string;
    details?: string;
  };
}

export const ACADEMIC_DATA: Record<string, any> = {
  TU: {
    Bachelor: {
      "Science & Tech": ["BSc CSIT", "BIT", "BCA", "BSc Physics"],
      Management: ["BBA", "BBS", "BIM", "BHM"],
      Engineering: ["BE Civil", "BE Computer", "BE Electronics"]
    },
    Master: {
      "Science & Tech": ["MSc CSIT", "MIT"],
      Management: ["MBA", "MBS"]
    }
  },
  KU: {
    Bachelor: {
      Engineering: ["BE Computer", "BE Civil", "BE Mechanical"],
      Management: ["BBA", "BHTM"]
    }
  },
  NEB: {
    "Class 12": {
      Science: ["Physics", "Chemistry", "Biology", "Math"],
      Management: ["Accountancy", "Economics", "Business Studies"]
    },
    "Class 11": {
      Science: ["Physics", "Chemistry", "Biology", "Math"],
      Management: ["Accountancy", "Economics", "Business Studies"]
    }
  }
};

export const SUBJECTS_DB = [
  "C Programming", "Data Structures", "Database Management", "Microprocessor", "Digital Logic", "Calculus", "Physics I", "Sociology", "Management", "Software Engineering"
];

export const RESOURCE_DATA: Resource[] = [
  {
    id: 1,
    type: 'notes',
    title: 'Unit 1: Introduction to C Programming - Handwritten Notes',
    author: 'Sita Sharma',
    date: '2 Oct 2024',
    downloads: '1.2k',
    views: '4.5k',
    rating: 4.8,
    icon: 'fa-file-lines',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    content: {
      fileType: 'PDF',
      file_size: '2.4 MB',
      previewUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      summary: 'Complete handwritten notes for Unit 1 Introduction to C. Covers basic syntax, variables, data types and control structures with examples.'
    }
  },
  {
    id: 2,
    type: 'syllabus',
    title: 'BSc CSIT 4th Semester Official Syllabus (TU)',
    author: 'Admin',
    date: '15 Sep 2024',
    downloads: '850',
    views: '2.1k',
    rating: 4.5,
    icon: 'fa-book',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    content: {
      fileType: 'PDF',
      file_size: '0.8 MB',
      description: 'Official TU syllabus for 4th semester including Theory of Computation, Computer Networks, and OS.'
    }
  },
  {
    id: 3,
    type: 'books',
    title: 'Modern Database Management Systems - 12th Ed',
    author: 'Himalayan Library',
    date: '10 Aug 2024',
    downloads: '3.4k',
    views: '12k',
    rating: 4.9,
    icon: 'fa-book-open',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    content: {
      fileType: 'PDF',
      file_size: '45 MB',
      details: 'Comprehensive textbook for DBMS, widely used in Bachelor level courses across Nepal.'
    }
  },
  {
    id: 4,
    type: 'solutions',
    title: 'Discrete Structure - Old Question Solutions (2075-2080)',
    author: 'Anish Tamang',
    date: '20 Oct 2024',
    downloads: '2.1k',
    views: '8.4k',
    rating: 4.7,
    icon: 'fa-check-double',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    content: {
      fileType: 'PDF',
      file_size: '5.2 MB',
      summary: 'Step-by-step solutions for TU past questions for Discrete Structures.'
    }
  }
];

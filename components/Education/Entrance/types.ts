
export interface Exam {
  id: string;
  title: string;
  university: string;
  faculty: string;
  status: 'Ongoing' | 'Upcoming' | 'Closed';
  examDate: string;
  nepaliDate: string;
  imageUrl: string;
}

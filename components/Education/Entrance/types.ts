
export interface Exam {
  id: string;
  title: string;
  university: string;
  faculty: string;
  status: 'Ongoing' | 'Upcoming' | 'Closing Soon' | 'Closed';
  examDate: string;
  nepaliDate: string;
  imageUrl: string;
}

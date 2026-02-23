
export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  level: string;
  field: string;
  covers: string;
  location: string;
  amount: string;
  status: 'open' | 'closed';
  category: string;
}

const scholarships: Scholarship[] = [
  {
    id: '1',
    title: 'TU Merit Scholarship',
    provider: 'Tribhuvan University',
    level: 'Bachelor',
    field: 'Engineering',
    covers: 'Full Tuition',
    location: 'Kathmandu',
    amount: 'NPR 8,00,000',
    status: 'open',
    category: 'Merit-based'
  },
  {
    id: '2',
    title: 'KUSMS Medical Excellence',
    provider: 'Kathmandu University',
    level: 'Bachelor',
    field: 'Medicine & Health',
    covers: '50% Off',
    location: 'Dhulikhel',
    amount: 'NPR 25,00,000',
    status: 'open',
    category: 'Merit-based'
  },
  {
    id: '3',
    title: 'Govt. Quota Technical Aid',
    provider: 'Ministry of Education',
    level: 'Diploma',
    field: 'Science & Tech',
    covers: 'Full Funding',
    location: 'National',
    amount: 'NPR 2,50,000',
    status: 'open',
    category: 'Reserved/Quota'
  },
  {
    id: '4',
    title: 'Corporate Tech Grant',
    provider: 'Nepal Telecom (NTC)',
    level: 'Bachelor',
    field: 'IT / Computing',
    covers: 'NPR 1L Per Year',
    location: 'Remote',
    amount: 'NPR 4,00,000',
    status: 'open',
    category: 'Research/Innovation'
  }
];

export const getAllScholarships = (): Scholarship[] => {
  return scholarships;
};

export const getScholarshipById = (id: string): Scholarship | undefined => {
  return scholarships.find(s => s.id === id);
};

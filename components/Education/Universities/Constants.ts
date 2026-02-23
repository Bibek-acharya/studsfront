
import { University, College } from './types';

export const MOCK_UNIVERSITIES: University[] = [
  {
    id: 1,
    name: 'Tribhuvan University',
    logo: 'https://ui-avatars.com/api/?name=TU&background=0A61EF&color=fff',
    location: 'Kirtipur, Kathmandu',
    rating: 4.5,
    type: 'Public',
    rank: 1,
    isPopular: true,
    programsCount: 150,
    collegesCount: 1100,
    popularPrograms: ['BSc CSIT', 'MBBS', 'BBA', 'BE Civil']
  },
  {
    id: 2,
    name: 'Kathmandu University',
    logo: 'https://ui-avatars.com/api/?name=KU&background=0284c7&color=fff',
    location: 'Dhulikhel, Kavre',
    rating: 4.8,
    type: 'Private',
    rank: 2,
    isPopular: true,
    programsCount: 85,
    collegesCount: 12,
    popularPrograms: ['BCA', 'BBA', 'BE Computer']
  },
  {
    id: 3,
    name: 'Pokhara University',
    logo: 'https://ui-avatars.com/api/?name=PU&background=ca8a04&color=fff',
    location: 'Lekhnath, Pokhara',
    rating: 4.2,
    type: 'Public',
    rank: 3,
    isPopular: false,
    programsCount: 65,
    collegesCount: 58,
    popularPrograms: ['MBA', 'BBA', 'BPH']
  },
  {
    id: 4,
    name: 'Purbanchal University',
    logo: 'https://ui-avatars.com/api/?name=PPU&background=db2777&color=fff',
    location: 'Biratnagar, Morang',
    rating: 4.0,
    type: 'Public',
    rank: 4,
    isPopular: false,
    programsCount: 72,
    collegesCount: 124,
    popularPrograms: ['BIT', 'BSc Nursing', 'BEd']
  }
];

export const MOCK_COLLEGES: College[] = [
  {
    id: 1,
    universityId: 1,
    name: 'Amrit Science Campus (ASCOL)',
    logo: 'https://ui-avatars.com/api/?name=AS&background=f1f5f9&color=64748b',
    rating: 4.2,
    reviews: 850,
    affiliation: 'TU Affiliated',
    type: 'Public'
  },
  {
    id: 2,
    universityId: 1,
    name: 'Padma Kanya Multiple Campus',
    logo: 'https://ui-avatars.com/api/?name=PK&background=f1f5f9&color=64748b',
    rating: 4.0,
    reviews: 620,
    affiliation: 'TU Affiliated',
    type: 'Public'
  },
  {
    id: 3,
    universityId: 1,
    name: 'St. Xaviers College',
    logo: 'https://ui-avatars.com/api/?name=SX&background=f1f5f9&color=64748b',
    rating: 4.9,
    reviews: 1200,
    affiliation: 'TU Affiliated',
    type: 'Private'
  },
  {
    id: 4,
    universityId: 2,
    name: 'KUSMS',
    logo: 'https://ui-avatars.com/api/?name=MS&background=f1f5f9&color=64748b',
    rating: 4.7,
    reviews: 340,
    affiliation: 'KU Constituent',
    type: 'Private'
  }
];

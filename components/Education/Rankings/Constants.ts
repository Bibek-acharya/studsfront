
import { College } from './types';

export const MAX_SELECTION = 3;

export const COLLEGES: College[] = [
  {
    id: 1,
    name: "Pulchowk Engineering Campus",
    location: "Lalitpur",
    rank: 1,
    color: "bg-rose-600",
    logo: "P",
    stats: { year: "1972", rating: 4.8 },
    tags: ["Science & Tech"]
  },
  {
    id: 2,
    name: "Kathmandu University (SOE)",
    location: "Dhulikhel",
    rank: 2,
    color: "bg-blue-600",
    logo: "KU",
    stats: { year: "1994", rating: 4.7 },
    tags: ["Science & Tech", "Management"]
  },
  {
    id: 3,
    name: "Maharajgunj Medical Campus",
    location: "Kathmandu",
    rank: 3,
    color: "bg-emerald-600",
    logo: "M",
    stats: { year: "1972", rating: 4.9 },
    tags: ["Medical"]
  },
  {
    id: 4,
    name: "St. Xaviers College",
    location: "Maitighar",
    rank: 4,
    color: "bg-indigo-600",
    logo: "SX",
    stats: { year: "1988", rating: 4.6 },
    tags: ["Science & Tech", "Humanities"]
  },
  {
    id: 5,
    name: "Apex College",
    location: "Baneshwor",
    rank: 5,
    color: "bg-orange-600",
    logo: "A",
    stats: { year: "2000", rating: 4.4 },
    tags: ["Management"]
  },
  {
    id: 6,
    name: "Islington College",
    location: "Kamalpokhari",
    rank: 6,
    color: "bg-cyan-600",
    logo: "I",
    stats: { year: "1996", rating: 4.5 },
    tags: ["Science & Tech", "Management"]
  }
];

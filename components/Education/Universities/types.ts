
export interface University {
  id: number;
  name: string;
  logo: string;
  location: string;
  rating: number;
  type: string;
  rank: number;
  isPopular: boolean;
  programsCount: number;
  collegesCount: number;
  popularPrograms: string[];
  description?: string;
  established?: string;
  website?: string;
}

export interface College {
  id: number;
  universityId: number;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  affiliation: string;
  type: string;
}

export interface FilterState {
  affiliation: string[];
  searchQuery: string;
}

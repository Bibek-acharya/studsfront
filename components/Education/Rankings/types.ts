
export type FilterOption = 'All' | 'Science & Tech' | 'Management' | 'Medical' | 'Humanities';
export type SortOption = 'RANK_DESC' | 'YEAR_DESC' | 'RATING_DESC';

export interface CollegeStats {
  year: string;
  rating: number;
}

export interface College {
  id: number;
  name: string;
  location: string;
  rank: number;
  color: string;
  logo: string;
  stats: CollegeStats;
  tags: string[];
}

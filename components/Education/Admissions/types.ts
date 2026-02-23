
export interface Program {
  name: string;
  level: string;
  status: 'Ongoing' | 'Closed';
}

export interface College {
  id: string;
  name: string;
  location: string;
  logo: string;
  rating: number;
  university: string;
  description: string;
  facilities: string[];
  programs: Program[];
  phoneNumber: string;
  contactEmail: string;
  website: string;
}

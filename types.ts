
export interface NavLink {
  label: string;
  href: string;
  isDropdown?: boolean;
  sublinks?: { label: string; href: string; desc?: string }[];
}

export interface JobCardProps {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  verified?: boolean;
}

export interface AdmissionCardProps {
  id: string;
  university: string;
  location: string;
  rating: number;
  affiliation: string;
  type: string;
  programs: { name: string; level: string; status: 'Ongoing' | 'Closed' }[];
  colorTheme: string;
  icon: string;
}

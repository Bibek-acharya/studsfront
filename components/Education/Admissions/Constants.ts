import React from 'react';
import { College } from './types';

// Fix: Converted JSX to React.createElement to resolve TypeScript errors in a .ts file
export const STAR_ICON = React.createElement('svg', {
  className: "w-3.5 h-3.5 text-amber-400",
  fill: "currentColor",
  viewBox: "0 0 20 20"
}, React.createElement('path', {
  d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
}));

// Fix: Converted JSX to React.createElement to resolve TypeScript errors in a .ts file
export const HEART_ICON = React.createElement('svg', {
  className: "w-5 h-5",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
}, React.createElement('path', {
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "2",
  d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
}));

export const COLLEGES: College[] = [
  {
    id: "1",
    name: "Goldenagete International College",
    location: "Kamal Pokhari, Kathmandu",
    logo: "https://ui-avatars.com/api/?name=GIC&background=0A61EF&color=fff",
    rating: 4.8,
    university: "TU",
    description: "A premier institution focused on excellence in Management and Technology. We foster an environment that encourages innovation and leadership among our students.",
    facilities: ["IT Lab", "Library", "Cafeteria", "Sports"],
    programs: [
      { name: "BBA", level: "Bachelor", status: "Ongoing" },
      { name: "BSc CSIT", level: "Bachelor", status: "Ongoing" },
      { name: "MBA", level: "Master", status: "Closed" }
    ],
    phoneNumber: "01-4433221",
    contactEmail: "admission@goldenagete.edu.np",
    website: "goldenagete.edu.np"
  },
  {
    id: "2",
    name: "KIST College & SS",
    location: "Kamalpokhari, Kathmandu",
    logo: "https://ui-avatars.com/api/?name=KIST&background=2563EB&color=fff",
    rating: 4.5,
    university: "TU",
    description: "KIST offers top-notch facilities and a dedicated faculty team for Science and Management students, aiming to produce globally competent graduates.",
    facilities: ["E-Library", "Physics Lab", "Hostel"],
    programs: [
      { name: "BIT", level: "Bachelor", status: "Ongoing" },
      { name: "BIM", level: "Bachelor", status: "Ongoing" },
      { name: "MBS", level: "Master", status: "Ongoing" }
    ],
    phoneNumber: "01-4422334",
    contactEmail: "info@kist.edu.np",
    website: "kist.edu.np"
  },
  {
    id: "3",
    name: "St. Xavier's College",
    location: "Maitighar, Kathmandu",
    logo: "https://ui-avatars.com/api/?name=SX&background=0f172a&color=fff",
    rating: 4.9,
    university: "TU",
    description: "Renowned for its academic rigour and Jesuit values, St. Xavier's remains one of the most sought-after colleges in Nepal for higher secondary and undergraduate studies.",
    facilities: ["Research Center", "Auditorium", "Chapel"],
    programs: [
      { name: "BSc Physics", level: "Bachelor", status: "Ongoing" },
      { name: "BSc Microbiology", level: "Bachelor", status: "Ongoing" },
      { name: "BA", level: "Bachelor", status: "Ongoing" }
    ],
    phoneNumber: "01-4221311",
    contactEmail: "sxm@sxc.edu.np",
    website: "sxc.edu.np"
  }
];
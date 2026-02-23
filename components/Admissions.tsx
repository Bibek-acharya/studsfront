import React from "react";
import SectionHeader from "./SectionHeader";
import AdmissionCard from "./AdmissionCard";
import { AdmissionCardProps } from "../types";

const admissionData: AdmissionCardProps[] = [
  {
    id: "1",
    university: "Tech University",
    location: "Kathmandu, Nepal",
    rating: 4.2,
    affiliation: "TU Affiliated",
    type: "Private",
    programs: [
      {
        name: "BE Computer Engineering",
        level: "Bachelor Level",
        status: "Ongoing",
      },
      {
        name: "BCA (Applications)",
        level: "Bachelor Level",
        status: "Ongoing",
      },
      {
        name: "BE Civil Engineering",
        level: "Bachelor Level",
        status: "Closed",
      },
    ],
    colorTheme: "blue",
    icon: "fa-graduation-cap",
  },
  {
    id: "2",
    university: "City Management College",
    location: "Lalitpur, Nepal",
    rating: 4.0,
    affiliation: "PU Affiliated",
    type: "Public",
    programs: [
      { name: "BBA (Management)", level: "Bachelor Level", status: "Ongoing" },
      { name: "MBA", level: "Masters Level", status: "Closed" },
    ],
    colorTheme: "purple",
    icon: "fa-building-columns",
  },
  {
    id: "3",
    university: "National Science College",
    location: "Bhaktapur, Nepal",
    rating: 4.5,
    affiliation: "KU Affiliated",
    type: "Private",
    programs: [
      { name: "BSc Physics", level: "Bachelor Level", status: "Ongoing" },
      { name: "BSc Chemistry", level: "Bachelor Level", status: "Closed" },
    ],
    colorTheme: "teal",
    icon: "fa-flask",
  },
];

const Admissions: React.FC = () => {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="w-full px-6 lg:px-12">
        <SectionHeader
          title="Admissions That Meet Your Interest"
          description="Explore current enrollment opportunities at top-tier institutions affiliated with major universities."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {admissionData.map((uni) => (
            <AdmissionCard key={uni.id} uni={uni} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Admissions;

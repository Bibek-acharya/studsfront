import React from "react";
import ScholarshipMainPage from "./ScholarshipMainPage";

interface ScholarshipFinderPageProps {
  onNavigate: (view: any, data?: any) => void;
}

const ScholarshipFinderPage: React.FC<ScholarshipFinderPageProps> = ({ onNavigate }) => {
  // Use the full prototype-matched scholarship landing experience for the dropdown route.
  return <ScholarshipMainPage onNavigate={onNavigate} />;
};

export default ScholarshipFinderPage;

import React, { useState, useEffect } from "react";
import { apiService } from "../../services/api";
import HeroSection from "./landing/HeroSection";
import SmarterToolsSection from "./landing/SmarterTools";
import EventShowcaseSection from "./landing/EventShowcaseSection";
import CourseCategoriesSection from "./landing/CourseCategoriesSection";
import FeaturedInstitutionsSection from "./landing/FeaturedInstitutionsSection";
import RecommendedForYouSection from "./landing/RecommendedForYouSection";
import FinancialAidSection from "./landing/FinancialAidSection";
import ExamAnnouncementsSection from "./landing/ExamAnnouncementsSection";
import NewsStoriesSection from "./landing/NewsStoriesSection";
import AdWidgetsSection from "./landing/AdWidgetsSection";
import CampusEventsSection from "./landing/CampusEventsSection";
import TestimonialsSection from "./landing/TestimonialsSection";

interface EducationPageProps {
  onNavigate: (view: any, data?: any) => void;
}

const EducationPage: React.FC<EducationPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-screen font-sans text-[#111827] antialiased">
      <HeroSection onNavigate={onNavigate} />
      <SmarterToolsSection onNavigate={onNavigate} />
      <EventShowcaseSection onNavigate={onNavigate} />
      <CourseCategoriesSection onNavigate={onNavigate} />
      <FeaturedInstitutionsSection onNavigate={onNavigate} />
      <RecommendedForYouSection onNavigate={onNavigate} />

      <FinancialAidSection onNavigate={onNavigate} />
      <ExamAnnouncementsSection onNavigate={onNavigate} />
      <NewsStoriesSection onNavigate={onNavigate} />
      <AdWidgetsSection />
      <CampusEventsSection onNavigate={onNavigate} />
      <TestimonialsSection onNavigate={onNavigate} />
    </div>
  );
};

export default EducationPage;

import React, { lazy, Suspense, useState } from "react";
import { useAuth } from "./services/AuthContext";
import Navbar from "./components/Navbar";
import JobNavbar from "./components/Jobs/JobNavbar";
import HomeView from "./components/Home/HomeView";
import Footer from "./components/Footer";
import EducationNavbar from "./components/Education/EducationNavbar";

const AboutPage = lazy(() => import("./components/About/AboutPage"));
const OnboardingFlow = lazy(
  () => import("./components/Onboarding/OnboardingFlow"),
);
const AuthContainer = lazy(() => import("./components/Auth/AuthContainer"));
const ContactPage = lazy(() => import("./components/Contact/ContactPage"));
const RewardsPage = lazy(() => import("./components/Rewards/RewardsPage"));
const RewardStore = lazy(() => import("./components/Rewards/RewardStore"));
const PartnerPage = lazy(() => import("./components/Partner/PartnerPage"));
const AdvertisePage = lazy(() => import("./components/Advertise/AdvertisePage"));
const ServicesPage = lazy(() => import("./components/Services/ServicesPage"));
const JobsPage = lazy(() => import("./components/Jobs/JobsPage"));
const JobFeedPage = lazy(() => import("./components/Jobs/JobFeedPage"));
const JobRecommendations = lazy(
  () => import("./components/Jobs/JobRecommendations"),
);
const SphereInvites = lazy(() => import("./components/Jobs/SphereInvites"));
const ApplicationTracker = lazy(
  () => import("./components/Jobs/ApplicationTracker"),
);
const JobAlerts = lazy(() => import("./components/Jobs/JobAlerts"));
const SavedJobs = lazy(() => import("./components/Jobs/SavedJobs"));
const CompaniesPage = lazy(() => import("./components/Jobs/CompaniesPage"));
const CompanyDetailsPage = lazy(
  () => import("./components/Jobs/CompanyDetailsPage"),
);
const JobDetailsPage = lazy(() => import("./components/Jobs/JobDetailsPage"));
const ResumeBuilder = lazy(() => import("./components/Resume/ResumeBuilder"));
const ResumeChecker = lazy(() => import("./components/Resume/ResumeChecker"));
const CoverLetterBuilder = lazy(
  () => import("./components/Resume/CoverLetterBuilder"),
);
const CareerBlogs = lazy(() => import("./components/Resume/CareerBlogs"));
const EmployerZone = lazy(() => import("./components/Partner/EmployerZone"));
const InstitutionZone = lazy(
  () => import("./components/Partner/InstitutionZone"),
);
const EducationPage = lazy(() => import("./components/Education/EducationPage"));
const AdminCollegesPage = lazy(
  () => import("./components/Education/Admin/AdminCollegesPage"),
);
const FindCollegePage = lazy(
  () => import("./components/Education/FindCollege/FindCollegePage"),
);
const CourseFinderPage = lazy(
  () => import("./components/Education/CourseFinder/CourseFinderPage"),
);
const CourseDetailsPage = lazy(
  () => import("./components/Education/CourseDetails/CourseDetailsPage"),
);
const CollegeDetailsPage = lazy(
  () => import("./components/Education/FindCollege/CollegeDetailsPage"),
);
const ExamsPage = lazy(() => import("./components/Education/Exams/ExamsPage"));
const ExamDetailsPage = lazy(
  () => import("./components/Education/Exams/ExamDetailsPage"),
);
const UniversitiesPage = lazy(
  () => import("./components/Education/Universities/UniversitiesPage"),
);
const UniversityDetailsPage = lazy(
  () => import("./components/Education/Universities/UniversityDetailsPage"),
);
const RankingsPage = lazy(
  () => import("./components/Education/Rankings/RankingsPage"),
);
const AdmissionsDiscoveryPage = lazy(
  () => import("./components/Education/Admissions/AdmissionsDiscoveryPage"),
);
const EntranceDiscoveryPage = lazy(
  () => import("./components/Education/Entrance/EntranceDiscoveryPage"),
);
const CampusForumPage = lazy(
  () => import("./components/Education/Forum/CampusForumPage"),
);
const ScholarshipMainPage = lazy(
  () => import("./components/Education/Scholarships/ScholarshipMainPage"),
);
const ScholarshipHubDetailsPage = lazy(
  () => import("./components/Education/Scholarships/ScholarshipHubDetailsPage"),
);
const ScholarshipCategoryPage = lazy(
  () => import("./components/Education/Scholarships/ScholarshipCategoryPage"),
);
const ScholarshipInquiryForm = lazy(
  () => import("./components/Education/Scholarships/ScholarshipInquiryForm"),
);
const ScholarshipApplicationPage = lazy(
  () => import("./components/Education/Scholarships/ScholarshipApplicationPage"),
);
const ScholarshipFinderPage = lazy(
  () => import("./components/Education/Scholarships/ScholarshipFinderPage"),
);
const ScholarshipDetailsPage = lazy(
  () => import("./components/Education/Scholarships/ScholarshipDetailsPage"),
);
const ResourcesPage = lazy(
  () => import("./components/Education/Resources/ResourcesPage"),
);
const NewsPage = lazy(() => import("./components/News/NewsPage"));
const NewsDetailsPage = lazy(() => import("./components/News/NewsDetailsPage"));
const BlogPage = lazy(() => import("./components/Blog/BlogPage"));
const BlogDetailsPage = lazy(() => import("./components/Blog/BlogDetailsPage"));
const EventsPage = lazy(() => import("./components/Events/EventsPage"));
const EventDetailsPage = lazy(
  () => import("./components/Events/EventDetailsPage"),
);
const StudentDashboard = lazy(
  () => import("./components/Dashboard/StudentDashboard"),
);

type currentView =
  | "home"
  | "about"
  | "onboarding"
  | "login"
  | "signup"
  | "contact"
  | "rewards"
  | "rewardStore"
  | "partner"
  | "advertise"
  | "services"
  | "jobsPage"
  | "jobFeed"
  | "jobRecommendations"
  | "sphereInvites"
  | "applicationTracker"
  | "jobAlerts"
  | "savedJobs"
  | "companiesPage"
  | "companyDetails"
  | "jobDetails"
  | "resumeBuilder"
  | "resumeChecker"
  | "coverLetterBuilder"
  | "careerBlogs"
  | "employerZone"
  | "institutionZone"
  | "educationPage"
  | "adminColleges"
  | "findCollege"
  | "courseFinder"
  | "courseDetails"
  | "collegeDetails"
  | "examsPage"
  | "examDetails"
  | "universitiesPage"
  | "universityDetails"
  | "rankingsPage"
  | "admissionsDiscovery"
  | "entranceDiscovery"
  | "campusForum"
  | "scholarshipMain"
  | "scholarshipHubDetails"
  | "scholarshipCategory"
  | "scholarshipInquiry"
  | "scholarshipApplication"
  | "scholarshipsPage"
  | "scholarshipDetails"
  | "resourcesPage"
  | "newsPage"
  | "newsDetails"
  | "blogPage"
  | "blogDetails"
  | "eventsPage"
  | "eventDetails"
  | "studentDashboard"
  | "scholarshipFinder"
  | "studyResources";

const App: React.FC = () => {
  const { user, logout } = useAuth();
  const [currentView, setCurrentView] = useState<
    | "home"
    | "about"
    | "onboarding"
    | "login"
    | "signup"
    | "contact"
    | "rewards"
    | "rewardStore"
    | "partner"
    | "advertise"
    | "services"
    | "jobsPage"
    | "jobFeed"
    | "jobRecommendations"
    | "sphereInvites"
    | "applicationTracker"
    | "jobAlerts"
    | "savedJobs"
    | "companiesPage"
    | "companyDetails"
    | "jobDetails"
    | "resumeBuilder"
    | "resumeChecker"
    | "coverLetterBuilder"
    | "careerBlogs"
    | "employerZone"
    | "institutionZone"
    | "educationPage"
    | "adminColleges"
    | "findCollege"
    | "courseFinder"
    | "courseDetails"
    | "collegeDetails"
    | "examsPage"
    | "examDetails"
    | "universitiesPage"
    | "universityDetails"
    | "rankingsPage"
    | "admissionsDiscovery"
    | "entranceDiscovery"
    | "campusForum"
    | "scholarshipMain"
    | "scholarshipHubDetails"
    | "scholarshipCategory"
    | "scholarshipInquiry"
    | "scholarshipApplication"
    | "scholarshipFinder"
    | "scholarshipDetails"
    | "studyResources"
    | "newsPage"
    | "newsDetails"
    | "blogPage"
    | "blogDetails"
    | "eventsPage"
    | "eventDetails"
  >("home");
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [selectedCollegeId, setSelectedCollegeId] = useState<number | null>(
    null,
  );
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [selectedUniversityId, setSelectedUniversityId] = useState<
    number | null
  >(null);
  const [selectedScholarshipId, setSelectedScholarshipId] = useState<
    string | null
  >(null);
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const navigateTo = (view: any, data?: any) => {
    if (view === "jobDetails" && data) setSelectedJobId(data.id);
    if (view === "courseDetails" && data) setSelectedCourseId(data.id);
    if (view === "collegeDetails" && data) setSelectedCollegeId(data.id);
    if (view === "examDetails" && data) setSelectedExamId(data.id);
    if (view === "universityDetails" && data) setSelectedUniversityId(data.id);
    if (view === "scholarshipDetails" && data)
      setSelectedScholarshipId(data.id);
    if (view === "scholarshipHubDetails" && data)
      setSelectedScholarshipId(data.id);
    if (view === "scholarshipInquiry" && data)
      setSelectedScholarshipId(data.id);
    if (view === "scholarshipApplication" && data)
      setSelectedScholarshipId(data.id);
    if (view === "newsDetails" && data) setSelectedNewsId(data.id);
    if (view === "blogDetails" && data) setSelectedBlogId(data.id);
    if (view === "eventDetails" && data) setSelectedEventId(data.id);
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleLoginSuccess = () => {
    navigateTo("home");
  };

  const handleSignupSuccess = () => {
    navigateTo("onboarding");
  };

  const handleLogout = () => {
    logout();
    navigateTo("home");
  };

  const userData = user
    ? {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        role: user.role,
      }
    : null;

  const isAuthView = currentView === "login" || currentView === "signup";
  const isJobView = [
    "jobsPage",
    "jobFeed",
    "jobRecommendations",
    "sphereInvites",
    "applicationTracker",
    "jobAlerts",
    "savedJobs",
    "companiesPage",
    "companyDetails",
    "jobDetails",
    "resumeBuilder",
    "resumeChecker",
    "coverLetterBuilder",
    "careerBlogs",
    "employerZone",
  ].includes(currentView);
  const isEducationView = [
    "educationPage",
    "adminColleges",
    "institutionZone",
    "findCollege",
    "courseFinder",
    "courseDetails",
    "collegeDetails",
    "examsPage",
    "examDetails",
    "universitiesPage",
    "universityDetails",
    "rankingsPage",
    "admissionsDiscovery",
    "entranceDiscovery",
    "campusForum",
    "scholarshipMain",
    "scholarshipHubDetails",
    "scholarshipCategory",
    "scholarshipInquiry",
    "scholarshipFinder",
    "scholarshipDetails",
    "studyResources",
    "newsPage",
    "newsDetails",
    "blogPage",
    "blogDetails",
    "eventsPage",
    "eventDetails",
  ].includes(currentView);

  const routeFallback = (
    <div className="min-h-[40vh] flex items-center justify-center text-slate-500 font-semibold">
      Loading...
    </div>
  );

  return (
    <div
      className={`min-h-screen font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden ${currentView !== "home" ? "bg-slate-50" : "bg-white"}`}
    >
      {!isAuthView &&
        currentView !== "onboarding" &&
        currentView !== "studentDashboard" && (
          <>
            {isJobView ? (
              <JobNavbar onNavigate={navigateTo} user={user} />
            ) : isEducationView ? (
              <EducationNavbar onNavigate={navigateTo} user={user} />
            ) : (
              <Navbar
                onNavigate={navigateTo}
                currentView={currentView as any}
                user={user}
                onLogout={handleLogout}
              />
            )}
          </>
        )}

      <Suspense fallback={routeFallback}>
        {currentView === "studentDashboard" && (
          <StudentDashboard onLogout={handleLogout} />
        )}

        {currentView === "home" && (
          <HomeView onNavigate={navigateTo} user={userData} />
        )}

        {currentView === "educationPage" && (
          <EducationPage onNavigate={navigateTo} />
        )}
        {currentView === "adminColleges" && (
          <AdminCollegesPage onNavigate={navigateTo} />
        )}
        {currentView === "findCollege" && (
          <FindCollegePage onNavigate={navigateTo} />
        )}
        {currentView === "courseFinder" && (
          <CourseFinderPage onNavigate={navigateTo} />
        )}
        {currentView === "courseDetails" && (
          <CourseDetailsPage
            id={selectedCourseId || 1}
            onNavigate={navigateTo}
          />
        )}
        {currentView === "collegeDetails" && (
          <CollegeDetailsPage
            id={selectedCollegeId || 1}
            onNavigate={navigateTo}
          />
        )}
        {currentView === "examsPage" && <ExamsPage onNavigate={navigateTo} />}
        {currentView === "examDetails" && (
          <ExamDetailsPage
            id={selectedExamId || "neb-class-12"}
            onNavigate={navigateTo}
          />
        )}
        {currentView === "universitiesPage" && (
          <UniversitiesPage onNavigate={navigateTo} />
        )}
        {currentView === "universityDetails" && (
          <UniversityDetailsPage
            id={selectedUniversityId || 1}
            onNavigate={navigateTo}
          />
        )}
        {currentView === "rankingsPage" && (
          <RankingsPage onNavigate={navigateTo} />
        )}
        {currentView === "admissionsDiscovery" && (
          <AdmissionsDiscoveryPage onNavigate={navigateTo} />
        )}
        {currentView === "entranceDiscovery" && (
          <EntranceDiscoveryPage onNavigate={navigateTo} />
        )}
        {currentView === "campusForum" && (
          <CampusForumPage onNavigate={navigateTo} />
        )}
        {currentView === "scholarshipMain" && (
          <ScholarshipMainPage onNavigate={navigateTo} />
        )}
        {currentView === "scholarshipHubDetails" && (
          <ScholarshipHubDetailsPage
            id={selectedScholarshipId || "1"}
            onNavigate={navigateTo}
          />
        )}
        {currentView === "scholarshipCategory" && (
          <ScholarshipCategoryPage onNavigate={navigateTo} />
        )}
        {currentView === "scholarshipInquiry" && (
          <ScholarshipInquiryForm
            scholarshipName={
              selectedScholarshipId
                ? "Scholarship ID: " + selectedScholarshipId
                : undefined
            }
            onClose={() => navigateTo("scholarshipMain")}
          />
        )}
        {currentView === "scholarshipApplication" && (
          <ScholarshipApplicationPage
            scholarshipId={selectedScholarshipId}
            onNavigate={navigateTo}
          />
        )}
        {currentView === "scholarshipFinder" && (
          <ScholarshipFinderPage onNavigate={navigateTo} />
        )}
        {currentView === "scholarshipDetails" && (
          <ScholarshipDetailsPage
            id={selectedScholarshipId || "1"}
            onNavigate={navigateTo}
          />
        )}
        {currentView === "studyResources" && (
          <ResourcesPage onNavigate={navigateTo} />
        )}

        {currentView === "newsPage" && <NewsPage onNavigate={navigateTo} />}
        {currentView === "newsDetails" && (
          <NewsDetailsPage
            id={selectedNewsId || "1"}
            onNavigate={navigateTo}
          />
        )}
        {currentView === "blogPage" && <BlogPage onNavigate={navigateTo} />}
        {currentView === "blogDetails" && (
          <BlogDetailsPage
            id={selectedBlogId || "1"}
            onNavigate={navigateTo}
          />
        )}

        {currentView === "eventsPage" && <EventsPage onNavigate={navigateTo} />}
        {currentView === "eventDetails" && (
          <EventDetailsPage
            id={selectedEventId || "1"}
            onNavigate={navigateTo}
          />
        )}

        {currentView === "about" && <AboutPage />}
        {currentView === "contact" && <ContactPage />}
        {currentView === "rewards" && <RewardsPage />}
        {currentView === "rewardStore" && <RewardStore />}
        {currentView === "partner" && <PartnerPage />}
        {currentView === "advertise" && <AdvertisePage />}
        {currentView === "services" && <ServicesPage />}
        {currentView === "jobsPage" && <JobsPage onNavigate={navigateTo} />}
        {currentView === "jobFeed" && <JobFeedPage onNavigate={navigateTo} />}
        {currentView === "jobRecommendations" && (
          <JobRecommendations onNavigate={navigateTo} />
        )}
        {currentView === "sphereInvites" && <SphereInvites />}
        {currentView === "applicationTracker" && <ApplicationTracker />}
        {currentView === "jobAlerts" && <JobAlerts />}
        {currentView === "savedJobs" && <SavedJobs />}
        {currentView === "companiesPage" && (
          <CompaniesPage onNavigate={navigateTo} />
        )}
        {currentView === "companyDetails" && (
          <CompanyDetailsPage onNavigate={navigateTo} />
        )}
        {currentView === "jobDetails" && (
          <JobDetailsPage id={selectedJobId || 1} onNavigate={navigateTo} />
        )}
        {currentView === "resumeBuilder" && <ResumeBuilder />}
        {currentView === "resumeChecker" && <ResumeChecker />}
        {currentView === "coverLetterBuilder" && <CoverLetterBuilder />}
        {currentView === "careerBlogs" && <CareerBlogs />}
        {currentView === "employerZone" && <EmployerZone />}
        {currentView === "institutionZone" && <InstitutionZone />}

        {currentView === "onboarding" && (
          <div className="min-h-[100dvh] flex items-center justify-center bg-slate-50 p-4">
            <OnboardingFlow
              initialRole={user?.role as any}
              onComplete={() => navigateTo("home")}
            />
          </div>
        )}

        {isAuthView && (
          <AuthContainer
            type={currentView as "login" | "signup"}
            onSwitch={() =>
              navigateTo(currentView === "login" ? "signup" : "login")
            }
            onSuccess={
              currentView === "login"
                ? handleLoginSuccess
                : handleSignupSuccess
            }
            onClose={() => navigateTo("home")}
          />
        )}
      </Suspense>

      {!isAuthView &&
        currentView !== "onboarding" &&
        currentView !== "studentDashboard" &&
        currentView !== "scholarshipApplication" && (
          <Footer onNavigate={navigateTo} />
        )}
    </div>
  );
};

export default App;

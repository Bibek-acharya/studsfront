import EducationNavbar from "./components/Education/EducationNavbar";
import React, { lazy, Suspense, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./services/AuthContext";
import Footer from "./components/Footer";

// ScrollToTop component to reset scroll on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const EducationPage = lazy(
  () => import("./components/Education/EducationPage"),
);
const AdminCollegesPage = lazy(
  () => import("./components/Education/Admin/AdminCollegesPage"),
);
const SuperAdminDashboardPage = lazy(
  () => import("./components/Education/Admin/SuperAdminDashboardPage"),
);
const FindCollegePage = lazy(
  () => import("./components/Education/FindCollege/FindCollegePage"),
);
const SearchPage = lazy(() =>
  import("./components/Education/SearchPage").then((module) => ({
    default: module.SearchPage,
  })),
);
const CompareCollegesPage = lazy(
  () => import("./components/Education/CompareColleges/CompareCollegesPage"),
);
const CollegeComparisonResultPage = lazy(
  () =>
    import("./components/Education/CompareColleges/CollegeComparisonResultPage"),
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
const BookCounsellingPage = lazy(
  () => import("./components/Education/Counselling/BookCounsellingPage"),
);
const WriteReviewPage = lazy(
  () => import("./components/Education/Reviews/WriteReviewPage"),
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
  () =>
    import("./components/Education/Scholarships/ScholarshipApplicationPage"),
);
const ScholarshipFinderPage = lazy(
  () => import("./components/Education/Scholarships/ScholarshipFinderPage"),
);
const ScholarshipFinderToolPage = lazy(
  () => import("./components/Education/Tools/ScholarshipFinderToolPage"),
);
const CollegeRecommenderToolPage = lazy(
  () => import("./components/Education/Tools/CollegeRecommenderToolPage"),
);
const CollegeQuizPage = lazy(
  () => import("./components/Education/Tools/CollegeQuizPage"),
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
const InstitutionZone = lazy(
  () => import("./components/Partner/InstitutionZone"),
);
const InstitutionDashboard = lazy(
  () => import("./components/Partner/InstitutionDashboard"),
);
const ScholarshipProviderZone = lazy(
  () => import("./components/Partner/ScholarshipProviderZone"),
);
const ScholarshipProviderDashboard = lazy(
  () =>
    import("./components/Education/ScholarshipProvider/ScholarshipProviderDashboard"),
);
const AuthContainer = lazy(() => import("./components/Auth/AuthContainer"));
const OnboardingFlow = lazy(
  () => import("./components/Onboarding/OnboardingFlow"),
);
const AboutPage = lazy(() => import("./components/About/AboutPage"));
const ContactPage = lazy(() => import("./components/Contact/ContactPage"));

const GoogleCallbackHandler = lazy(
  () => import("./components/Auth/GoogleCallbackHandler"),
);
const SuperAdminLoginPage = lazy(
  () => import("./components/Auth/SuperAdminLoginPage"),
);

const App: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const routeFallback = (
    <div className="min-h-[40vh] flex items-center justify-center text-slate-500 font-semibold">
      Loading...
    </div>
  );

  const isAdminUser = user?.role === "admin" || user?.role === "super_admin";
  const hideNavFooter = [
    "/login",
    "/signup",
    "/onboarding",
    "/studentDashboard",
    "/auth/google-callback",
    "/institutionZone",
    "/institutionDashboard",
    "/scholarshipProviderZone",
    "/scholarshipProviderDashboard",
    "/admin",
  ].some((path) => location.pathname.startsWith(path));

  return (
    <div className="min-h-screen font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden bg-white">
      <ScrollToTop />
      {!hideNavFooter && (
        <EducationNavbar
          onNavigate={(view, data) =>
            navigate(view === "educationPage" ? "/" : `/${view}`, {
              state: data,
            })
          }
          user={user}
          onLogout={handleLogout}
        />
      )}

      <div className={!hideNavFooter ? "pt-[106px] md:pt-[110px]" : ""}>
        <Suspense fallback={routeFallback}>
          <Routes>
            {/* Main Education Page */}
            <Route
              path="/"
              element={
                <EducationPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />

            {/* Auth & Onboarding */}
            <Route
              path="/login"
              element={
                <AuthContainer
                  type="login"
                  onAuthSuccess={() => navigate("/")}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <AuthContainer
                  type="signup"
                  onAuthSuccess={() => navigate("/")}
                />
              }
            />
            <Route path="/admin" element={<SuperAdminLoginPage />} />
            <Route
              path="/admin/dashboard"
              element={
                isAdminUser ? (
                  <SuperAdminDashboardPage />
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route
              path="/onboarding"
              element={<OnboardingFlow onComplete={() => navigate("/")} />}
            />
            <Route
              path="/auth/google-callback"
              element={<GoogleCallbackHandler />}
            />
            <Route
              path="/studentDashboard"
              element={<StudentDashboard onLogout={handleLogout} />}
            />

            {/* Core Education Pages */}
            <Route
              path="/educationPage"
              element={
                <EducationPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/findCollege"
              element={
                <FindCollegePage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route path="/search" element={<SearchPage />} />
            <Route
              path="/compareColleges"
              element={
                <CompareCollegesPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/compareCollegesResult"
              element={
                <CollegeComparisonResultPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/collegeDetails"
              element={
                <CollegeDetailsPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/courseFinder"
              element={
                <CourseFinderPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/courseDetails"
              element={
                <CourseDetailsPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />

            {/* Exams & Universities */}
            <Route
              path="/examsPage"
              element={
                <ExamsPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/examDetails"
              element={
                <ExamDetailsPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/universitiesPage"
              element={
                <UniversitiesPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/universityDetails"
              element={
                <UniversityDetailsPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/rankingsPage"
              element={
                <RankingsPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />

            {/* Scholarships */}
            <Route
              path="/scholarshipMain"
              element={
                <ScholarshipMainPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/scholarshipFinder"
              element={
                <ScholarshipFinderPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/scholarshipFinderTool"
              element={
                <ScholarshipFinderToolPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/collegeRecommenderTool"
              element={
                <CollegeRecommenderToolPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/collegeQuiz"
              element={
                <CollegeQuizPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/scholarshipDetails"
              element={
                <ScholarshipDetailsPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/scholarshipHubDetails"
              element={
                <ScholarshipHubDetailsPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/scholarshipCategory"
              element={
                <ScholarshipCategoryPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/scholarshipInquiry"
              element={
                <ScholarshipInquiryForm
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/scholarshipApplication"
              element={
                <ScholarshipApplicationPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />

            {/* Others */}
            <Route
              path="/admissionsDiscovery"
              element={
                <AdmissionsDiscoveryPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/entranceDiscovery"
              element={
                <EntranceDiscoveryPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/campusForum"
              element={
                <CampusForumPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/bookCounselling"
              element={
                user ? (
                  <BookCounsellingPage
                    onNavigate={(view, data) =>
                      navigate(`/${view}`, { state: data })
                    }
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/writeReview"
              element={
                user ? (
                  <WriteReviewPage
                    onNavigate={(view, data) =>
                      navigate(`/${view}`, { state: data })
                    }
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/studyResources"
              element={
                <ResourcesPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/newsPage"
              element={
                <NewsPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/newsDetails"
              element={
                <NewsDetailsPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/blogPage"
              element={
                <BlogPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/blogDetails"
              element={
                <BlogDetailsPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/eventsPage"
              element={
                <EventsPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/eventDetails"
              element={
                <EventDetailsPage
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/institutionZone"
              element={
                <InstitutionZone
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/institutionDashboard"
              element={<InstitutionDashboard />}
            />
            <Route
              path="/scholarshipProviderZone"
              element={
                <ScholarshipProviderZone
                  onNavigate={(view, data) =>
                    navigate(`/${view}`, { state: data })
                  }
                />
              }
            />
            <Route
              path="/scholarshipProviderDashboard"
              element={<ScholarshipProviderDashboard />}
            />
            <Route
              path="/adminColleges"
              element={
                isAdminUser ? (
                  <AdminCollegesPage
                    onNavigate={(view, data) =>
                      navigate(`/${view}`, { state: data })
                    }
                  />
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </div>

      {!hideNavFooter && <Footer onNavigate={(view) => navigate(`/${view}`)} />}
    </div>
  );
};

export default App;

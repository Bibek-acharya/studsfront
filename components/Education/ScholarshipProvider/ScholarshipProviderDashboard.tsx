import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../../services/api';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import DashboardOverview from './DashboardOverview';
import OrganizationProfile from './OrganizationProfile';
import CreateScholarship from './CreateScholarship';
import ManageScholarships from './ManageScholarships';
import ApplicationsDirectory from './ApplicationsDirectory';
import StudentEvaluation from './StudentEvaluation';
import Interviews from './Interviews';
import Messages from './Messages';
import Analytics from './Analytics';
import Settings from './Settings';

const ScholarshipProviderDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('sec-dashboard');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [providerUser, setProviderUser] = useState<any>(null);

  useEffect(() => {
    const token = apiService.getScholarshipProviderToken();
    const user = apiService.getScholarshipProviderUser();

    if (!token || !user) {
      navigate('/scholarshipProviderZone');
      return;
    }

    setProviderUser(user);
  }, [navigate]);

  const handleLogout = () => {
    apiService.scholarshipProviderLogout();
    navigate('/scholarshipProviderZone');
  };

  if (!providerUser) return null;

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const navigateTo = (section: string) => {
    setActiveTab(section);
    setSelectedStudentId(null);
    setIsSidebarOpen(false); // Close mobile sidebar on navigation
  };

  const handleReviewStudent = (id: string) => {
    setSelectedStudentId(id);
    setActiveTab('sec-student-profile');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'sec-dashboard':
        return <DashboardOverview />;
      case 'sec-org-profile':
        return <OrganizationProfile />;
      case 'sec-create-scholarship':
        return <CreateScholarship />;
      case 'sec-manage-scholarships':
        return <ManageScholarships onNavigate={navigateTo} />;
      case 'sec-applications':
        return <ApplicationsDirectory onReviewStudent={handleReviewStudent} />;
      case 'sec-student-profile':
        return <StudentEvaluation onBack={() => setActiveTab('sec-applications')} />;
      case 'sec-interviews':
        return <Interviews />;
      case 'sec-messages':
        return <Messages />;
      case 'sec-reports':
        return <Analytics />;
      case 'sec-settings':
        return <Settings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 antialiased overflow-hidden font-sans text-slate-800 selection:bg-blue-100 selection:text-blue-900 w-full relative">
      <DashboardSidebar 
        isMobileOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        activeTab={activeTab} 
        onNavigate={navigateTo} 
        handleLogout={handleLogout}
        providerUser={providerUser}
      />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50 w-full">
        <DashboardHeader toggleSidebar={toggleSidebar} activeTab={activeTab} />

        <main className="flex-1 overflow-y-auto relative custom-scrollbar p-0 sm:p-8 max-w-[1600px] w-full mx-auto pb-24" id="main-content">
          <div className="p-4 sm:p-0">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ScholarshipProviderDashboard;

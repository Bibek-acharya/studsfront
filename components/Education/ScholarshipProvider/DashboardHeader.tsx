import React from 'react';

interface HeaderProps {
  toggleSidebar: () => void;
  activeTab: string;
}

const DashboardHeader = ({ toggleSidebar, activeTab }: HeaderProps) => {
  const getHeaderInfo = () => {
    switch(activeTab) {
      case 'sec-dashboard': return { title: 'Dashboard Overview', subtitle: "Welcome back, here's what's happening today." };
      case 'sec-org-profile': return { title: 'Organization Profile', subtitle: "Manage your institution's public identity." };
      case 'sec-create-scholarship': return { title: 'Create Opportunity', subtitle: "Launch a new scholarship program for students." };
      case 'sec-manage-scholarships': return { title: 'Manage Scholarships', subtitle: "Monitor and evaluate all active scholarship programs." };
      case 'sec-applications': return { title: 'Applications Directory', subtitle: "Review and manage all student submissions." };
      case 'sec-student-profile': return { title: 'Applicant File', subtitle: "Detailed evaluation of student submission." };
      case 'sec-interviews': return { title: 'Interviews & Schedules', subtitle: "Track and manage upcoming candidate interviews." };
      case 'sec-reports': return { title: 'Analytics & Reports', subtitle: "Detailed insights and downloadable data sets." };
      case 'sec-settings': return { title: 'System Preferences', subtitle: "Configure your dashboard and notification settings." };
      case 'sec-messages': return { title: 'Messages / Chat', subtitle: "Communicate directly with interested candidates." };
      default: return { title: 'Dashboard', subtitle: 'Manage your organization data.' };
    }
  };

  const { title, subtitle } = getHeaderInfo();

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 z-30 shadow-sm shrink-0">
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-slate-500 hover:text-primary-600 focus:outline-none bg-slate-50 p-2 rounded-lg"
          onClick={toggleSidebar}
        >
          <i className="fa-solid fa-bars text-xl"></i>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 hidden sm:block">{title}</h1>
          <p className="text-sm text-slate-500 hidden sm:block mt-0.5">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative hidden lg:block">
          <i className="fa-solid fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
          <input
            type="text"
            placeholder="Search students, ID, programs..."
            className="pl-11 pr-4 py-2.5 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-72 bg-slate-50 transition-all shadow-inner"
          />
        </div>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-5">
          <button className="relative p-2.5 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors">
            <i className="fa-solid fa-envelope text-xl"></i>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-danger rounded-full border-2 border-white"></span>
          </button>
          <button className="relative p-2.5 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors">
            <i className="fa-solid fa-bell text-xl"></i>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-danger rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

import React from "react";

const SuperAdminDashboardPage: React.FC = () => {
  return (
    <div className="h-screen w-full bg-slate-100">
      <iframe
        src="/super-admin-university-cms.html"
        title="Super Admin Dashboard"
        className="h-full w-full border-0"
      />
    </div>
  );
};

export default SuperAdminDashboardPage;

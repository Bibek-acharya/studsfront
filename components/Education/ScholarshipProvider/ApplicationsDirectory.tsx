import React, { useState } from 'react';

interface Application {
  id: string;
  name: string;
  email: string;
  img: string;
  gender: string;
  province: string;
  program: string;
  gpa: string;
  date: string;
  status: string;
  scholarship: string;
}

interface ApplicationsDirectoryProps {
  onReviewStudent: (id: string) => void;
}

const ApplicationsDirectory = ({ onReviewStudent }: ApplicationsDirectoryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock Data
  const applications: Application[] = [
    { id: 'APP-1154', name: 'Aarav Sharma', email: 'aarav.sharma@example.com', img: '1', gender: 'Male', province: 'Bagmati', program: 'Computer Science', gpa: '3.85', date: '2026-03-21', status: 'Pending Review', scholarship: 'Women in STEM Excellence' },
    { id: 'APP-1153', name: 'Sita Thapa', email: 'sita.thapa@example.com', img: '2', gender: 'Female', province: 'Gandaki', program: 'Nursing', gpa: '3.92', date: '2026-03-20', status: 'Under Review', scholarship: 'Rural Development Fund' },
    { id: 'APP-1152', name: 'David Rai', email: 'david.rai@example.com', img: '3', gender: 'Male', province: 'Lumbini', program: 'Software Engineering', gpa: '3.70', date: '2026-03-20', status: 'Shortlisted', scholarship: 'Women in STEM Excellence' },
    { id: 'APP-1151', name: 'Fatima Ali', email: 'fatima.ali@example.com', img: '4', gender: 'Female', province: 'Koshi', program: 'Medicine', gpa: '3.95', date: '2026-03-19', status: 'Interview Scheduled', scholarship: 'Merit Undergrad' },
    { id: 'APP-1150', name: 'Ramesh Gurung', email: 'ramesh.gurung@example.com', img: '5', gender: 'Male', province: 'Madhesh', program: 'Civil Eng.', gpa: '3.45', date: '2026-03-18', status: 'Selected', scholarship: 'Rural Development Fund' },
    { id: 'APP-1149', name: 'Priya Shrestha', email: 'priya.sh@example.com', img: '6', gender: 'Female', province: 'Bagmati', program: 'Business Admin', gpa: '3.65', date: '2026-03-17', status: 'Rejected', scholarship: 'Global IT Innovators' },
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Pending Review': return 'bg-slate-100 text-slate-600';
      case 'Under Review': return 'bg-blue-100 text-blue-700';
      case 'Shortlisted': return 'bg-yellow-100 text-yellow-700';
      case 'Interview Scheduled': return 'bg-purple-100 text-purple-700';
      case 'Selected': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <section className="fade-in h-full flex flex-col">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Applications Directory</h2>
          <p className="text-sm text-slate-500 mt-1">Review, filter, and manage all student submissions in one place.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-bold text-sm shadow-sm transition">
            <i className="fa-solid fa-filter mr-2"></i> Advanced Filters
          </button>
          <button className="px-4 py-2 bg-success text-white rounded-lg hover:bg-green-600 font-bold text-sm shadow-sm shadow-green-500/20 transition">
            <i className="fa-solid fa-download mr-2"></i> Export Data
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col flex-1 overflow-hidden min-h-[500px]">
        {/* Toolbar Filters */}
        <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            <div className="relative w-full lg:w-64">
              <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="text"
                placeholder="Search by name, ID, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
              />
            </div>
            <select className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-primary-500 shadow-sm flex-1 lg:flex-none">
              <option value="All">All Programs</option>
              <option value="CS">Computer Science</option>
              <option value="SE">Software Engineering</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-primary-500 shadow-sm flex-1 lg:flex-none"
            >
              <option value="All">All Statuses</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Under Review">Under Review</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* The Table */}
        <div className="flex-1 overflow-auto relative">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead className="bg-slate-100 text-slate-500 text-xs uppercase font-extrabold sticky top-0 z-10 tracking-wider">
              <tr>
                <th className="py-4 px-5 w-10 border-b border-slate-200">
                  <input type="checkbox" className="rounded border-slate-300 text-primary-600 focus:ring-primary-500 w-4 h-4 cursor-pointer" />
                </th>
                <th className="py-4 px-5 border-b border-slate-200">Applicant ID & Name</th>
                <th className="py-4 px-5 border-b border-slate-200">Demographics</th>
                <th className="py-4 px-5 border-b border-slate-200">Intended Program</th>
                <th className="py-4 px-5 border-b border-slate-200 text-center">Academic (GPA)</th>
                <th className="py-4 px-5 border-b border-slate-200">Applied On</th>
                <th className="py-4 px-5 border-b border-slate-200">Current Status</th>
                <th className="py-4 px-5 border-b border-slate-200 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm bg-white">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 transition border-b border-slate-100 group">
                  <td className="py-4 px-5"><input type="checkbox" className="rounded border-slate-300 w-4 h-4 cursor-pointer" /></td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <img src={`https://i.pravatar.cc/150?img=${app.img}`} className="w-10 h-10 rounded-full shadow-sm" alt="Student" />
                      <div>
                        <p className="font-extrabold text-slate-800 leading-tight">{app.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 tracking-tighter uppercase">{app.id} • {app.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <p className="font-bold text-slate-700">{app.province}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{app.gender}</p>
                  </td>
                  <td className="py-4 px-5">
                    <p className="font-bold text-slate-700">{app.program}</p>
                    <p className="text-[10px] font-bold text-primary-600 uppercase tracking-tighter truncate max-w-[150px]">{app.scholarship}</p>
                  </td>
                  <td className="py-4 px-5 text-center">
                    <span className="bg-primary-50 text-primary-700 px-3 py-1.5 rounded-lg font-black text-xs border border-primary-100 shadow-sm">{app.gpa}</span>
                  </td>
                  <td className="py-4 px-5 text-slate-600 font-bold">{app.date}</td>
                  <td className="py-4 px-5">
                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter ${getStatusClass(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => onReviewStudent(app.id)}
                      className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-primary-600 hover:text-white transition-all font-bold text-xs shadow-sm border border-slate-200"
                    >
                      Review File
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-center text-sm gap-4">
          <div className="text-slate-500 font-medium">
            Showing <span className="text-slate-800 font-bold">1</span> to <span className="text-slate-800 font-bold">6</span> of <span className="text-slate-800 font-bold">150</span> entries
          </div>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-50"><i className="fa-solid fa-chevron-left"></i></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-600 text-white font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-50"><i className="fa-solid fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationsDirectory;

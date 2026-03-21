import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardOverview = () => {
  // Mock Stats similar to prototype
  const stats = {
    totalApps: 154,
    activeSchs: 4,
    shortlisted: 28,
    selected: 12,
  };

  const acceptanceRate = ((stats.selected / stats.totalApps) * 100).toFixed(1);

  // Bar Chart Data: Applicants by Program
  const barData = {
    labels: ['Computer Science', 'Software Engineering', 'Nursing', 'Civil Eng.', 'Business Admin', 'Medicine', 'Data Science'],
    datasets: [
      {
        label: 'Applicants',
        data: [42, 35, 28, 11, 15, 8, 12],
        backgroundColor: '#3b82f6',
        borderRadius: 8,
      },
    ],
  };

  // Doughnut Chart Data: Pipeline Status
  const doughnutData = {
    labels: ['Pending', 'Reviewing', 'Shortlisted', 'Interviewing', 'Selected', 'Rejected'],
    datasets: [
      {
        data: [45, 30, 20, 15, 12, 32],
        backgroundColor: [
          '#cbd5e1', // Pending
          '#3b82f6', // Reviewing
          '#f59e0b', // Shortlisted
          '#6366f1', // Interviewing
          '#10b981', // Selected
          '#ef4444', // Rejected
        ],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const doughnutOptions = {
    cutout: '75%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const recentApplications = [
    { id: 'APP-1154', name: 'Aarav Sharma', program: 'Computer Science', gpa: '3.85', img: '1', date: 'Just now' },
    { id: 'APP-1153', name: 'Sita Thapa', program: 'Nursing', gpa: '3.92', img: '2', date: '2 hours ago' },
    { id: 'APP-1152', name: 'David Rai', program: 'Software Engineering', gpa: '3.70', img: '3', date: '5 hours ago' },
    { id: 'APP-1151', name: 'Fatima Ali', program: 'Medicine', gpa: '3.95', img: '4', date: 'Yesterday' },
    { id: 'APP-1150', name: 'Ramesh Gurung', program: 'Civil Eng.', gpa: '3.45', img: '5', date: '1 day ago' },
  ];

  return (
    <section className="fade-in">
      {/* Top KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full z-0 group-hover:scale-110 transition-transform"></div>
          <div className="relative z-10">
            <span className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1 block">Total Applications</span>
            <div className="flex items-end gap-3 mt-2">
              <span className="text-4xl font-black text-slate-800">{stats.totalApps}</span>
              <span className="text-xs font-bold text-success bg-green-50 px-2 py-1 rounded mb-1">
                <i className="fa-solid fa-arrow-up"></i> 14%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-50 rounded-full z-0 group-hover:scale-110 transition-transform"></div>
          <div className="relative z-10">
            <span className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1 block">Active Scholarships</span>
            <div className="flex items-end gap-3 mt-2">
              <span className="text-4xl font-black text-slate-800">{stats.activeSchs}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-yellow-50 rounded-full z-0 group-hover:scale-110 transition-transform"></div>
          <div className="relative z-10">
            <span className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1 block">Shortlisted Candidates</span>
            <div className="flex items-end gap-3 mt-2">
              <span className="text-4xl font-black text-warning">{stats.shortlisted}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-50 rounded-full z-0 group-hover:scale-110 transition-transform"></div>
          <div className="relative z-10">
            <span className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1 block">Final Selected</span>
            <div className="flex items-end gap-3 mt-2">
              <span className="text-4xl font-black text-success">{stats.selected}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hidden xl:block">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-50 rounded-full z-0 group-hover:scale-110 transition-transform"></div>
          <div className="relative z-10">
            <span className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1 block">Acceptance Rate</span>
            <div className="flex items-end gap-3 mt-2">
              <span className="text-4xl font-black text-danger">{acceptanceRate}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm xl:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Application Demand by Program</h3>
              <p className="text-sm text-slate-500">Total applicants categorized by their intended field of study.</p>
            </div>
            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg"><i className="fa-solid fa-download"></i></button>
          </div>
          <div className="flex-1 relative min-h-[300px] w-full">
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                  y: { beginAtZero: true, grid: { display: false } },
                  x: { grid: { display: false } }
                }
              }}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="mb-4 text-center">
            <h3 className="text-lg font-bold text-slate-800">Current Pipeline Status</h3>
            <p className="text-sm text-slate-500">Breakdown of all active applications</p>
          </div>
          <div className="relative flex-1 w-full min-h-[250px] flex justify-center items-center">
            <Doughnut data={doughnutData} options={doughnutOptions} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-4">
              <span className="text-3xl font-black text-slate-800">{stats.totalApps}</span>
              <span className="text-xs text-slate-500 font-medium">Total Apps</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {doughnutData.labels.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: doughnutData.datasets[0].backgroundColor[i] }}></div>
                <span className="text-slate-600 font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newest Applications */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Newest Applications</h3>
            <p className="text-xs text-slate-500 mt-1">Latest students seeking opportunities</p>
          </div>
          <button className="text-sm font-semibold text-primary-600 hover:text-primary-800 bg-primary-50 px-3 py-1.5 rounded-lg transition">View All Directory</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white text-slate-400 text-xs uppercase font-bold border-b border-slate-100">
              <tr>
                <th className="py-3 px-6">Applicant Info</th>
                <th className="py-3 px-6">Applied For</th>
                <th className="py-3 px-6">GPA</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {recentApplications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 group transition">
                  <td className="py-3 px-6">
                    <div className="flex items-center gap-3">
                      <img src={`https://i.pravatar.cc/150?img=${app.img}`} className="w-10 h-10 rounded-full object-cover shadow-sm border border-slate-100" />
                      <div>
                        <p className="font-bold text-slate-800">{app.name}</p>
                        <p className="text-[10px] text-slate-500 flex items-center gap-1 uppercase font-bold tracking-tighter">
                          ID: {app.id} • <span className="text-primary-600 italic font-medium lowercase">{app.date}</span>
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-slate-600 font-medium">{app.program}</td>
                  <td className="py-3 px-6">
                    <span className="bg-primary-50 text-primary-700 px-2 py-1 rounded font-black text-xs">{app.gpa}</span>
                  </td>
                  <td className="py-3 px-6 text-right">
                    <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-primary-600 hover:text-white transition flex items-center justify-center mx-auto lg:ml-auto">
                      <i className="fa-solid fa-chevron-right"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default DashboardOverview;

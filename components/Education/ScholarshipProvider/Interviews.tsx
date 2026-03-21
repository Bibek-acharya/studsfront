import React from 'react';

const Interviews = () => {
  const interviews = [
    { id: 1, date: 'Mar 24, 2026', time: '10:00 AM', applicant: 'Aarav Sharma', program: 'Women in STEM Excellence', status: 'Upcoming', img: '1' },
    { id: 2, date: 'Mar 25, 2026', time: '02:30 PM', applicant: 'Sita Thapa', program: 'Rural Development Fund', status: 'Upcoming', img: '2' },
    { id: 3, date: 'Mar 20, 2026', time: '11:00 AM', applicant: 'David Rai', program: 'Global IT Innovators', status: 'Completed', img: '3' },
    { id: 4, date: 'Mar 19, 2026', time: '09:00 AM', applicant: 'Fatima Ali', program: 'Merit Undergrad', status: 'Completed', img: '4' },
  ];

  return (
    <section className="fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Interview Command Center</h2>
          <p className="text-sm text-slate-500 mt-1">Schedule, conduct, and review applicant interviews.</p>
        </div>
        <button className="px-5 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-bold text-sm shadow-lg shadow-primary-500/20 transition flex items-center">
          <i className="fa-solid fa-calendar-plus mr-2"></i> Schedule New Interview
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Mini Calendar & Filters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 border-b pb-2">Filter Schedule</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-1 block tracking-wider">Date Range</label>
                <input type="date" className="w-full border border-slate-300 rounded-lg p-2 text-sm outline-none focus:border-primary-500 mb-2 font-medium" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-1 block tracking-wider">Status</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary-600 border-slate-300 focus:ring-primary-500" /> Upcoming
                  </label>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary-600 border-slate-300 focus:ring-primary-500" /> Completed
                  </label>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded text-primary-600 border-slate-300 focus:ring-primary-500" /> Canceled
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main List */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[500px]">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="font-black text-slate-800 uppercase tracking-tighter text-sm">All Scheduled Interviews</h3>
            <div className="relative w-full md:w-64">
              <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input type="text" placeholder="Search applicant..." className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm outline-none shadow-sm font-medium" />
            </div>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-white text-[10px] uppercase text-slate-400 font-black sticky top-0 border-b border-slate-100 shadow-sm tracking-widest">
                <tr>
                  <th className="py-4 px-6 border-b border-slate-200">Date & Time</th>
                  <th className="py-4 px-6 border-b border-slate-200">Candidate</th>
                  <th className="py-4 px-6 border-b border-slate-200">Program</th>
                  <th className="py-4 px-6 border-b border-slate-200">Status</th>
                  <th className="py-4 px-6 border-b border-slate-200 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium bg-white">
                {interviews.map(iv => (
                  <tr key={iv.id} className="hover:bg-slate-50 transition border-b border-slate-100 group">
                    <td className="py-4 px-6">
                      <p className="font-black text-slate-800">{iv.date}</p>
                      <p className="text-xs text-primary-600 font-bold lowercase">{iv.time}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img src={`https://i.pravatar.cc/150?img=${iv.img}`} className="w-9 h-9 rounded-full shadow-sm" alt="Student" />
                        <span className="font-extrabold text-slate-700">{iv.applicant}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-500 font-bold italic">{iv.program}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                        iv.status === 'Upcoming' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                      }`}>
                        {iv.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                       <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-primary-600 hover:text-white transition-all font-black text-[10px] uppercase shadow-sm border border-slate-200">
                        Join Call
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Interviews;

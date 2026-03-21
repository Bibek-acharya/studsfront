import React from 'react';

interface ManageScholarshipsProps {
  onNavigate: (section: string) => void;
}

const ManageScholarships = ({ onNavigate }: ManageScholarshipsProps) => {
  const scholarships = [
    {
      id: 1,
      title: 'Women in STEM Excellence 2026',
      type: 'Full Ride',
      amount: '$12,000 /yr',
      deadline: '15 May 2026',
      status: 'Active',
      applicants: 42,
      seats: 50,
      banner: 'https://images.unsplash.com/photo-1581092921461-7d657d022194?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      title: 'Global IT Innovators Grant',
      type: 'Partial',
      amount: '$5,000 once',
      deadline: '30 Apr 2026',
      status: 'Active',
      applicants: 156,
      seats: 25,
      banner: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      title: 'Rural Development Fund',
      type: 'Need-Based',
      amount: '$8,000 /yr',
      deadline: '10 Jun 2026',
      status: 'Active',
      applicants: 89,
      seats: 100,
      banner: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section className="fade-in max-w-7xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Scholarship Portfolio</h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">Manage active, closed, and drafted programs.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white border border-slate-200 rounded-lg p-1 hidden md:flex shadow-sm">
            <button className="px-3 py-1.5 rounded bg-slate-100 text-slate-800 shadow-sm text-xs font-black uppercase tracking-widest"><i className="fa-solid fa-grip mr-1"></i> Grid</button>
            <button className="px-3 py-1.5 rounded text-slate-400 hover:text-slate-800 text-xs font-black uppercase tracking-widest transition-colors"><i className="fa-solid fa-list mr-1"></i> List</button>
          </div>
          <button 
            onClick={() => onNavigate('sec-create-scholarship')}
            className="px-5 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-black text-xs uppercase tracking-widest shadow-lg shadow-primary-500/20 transition flex items-center border border-primary-500"
          >
            <i className="fa-solid fa-plus mr-2"></i> Create New
          </button>
        </div>
      </div>
      
      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input 
            type="text" 
            placeholder="Search portfolio..." 
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary-500 focus:bg-white transition shadow-inner placeholder:font-medium" 
          />
        </div>
        <select className="border border-slate-200 bg-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-500 font-bold shadow-sm cursor-pointer">
          <option>All Statuses</option>
          <option>Active</option>
          <option>Closed</option>
          <option>Draft</option>
        </select>
        <select className="border border-slate-200 bg-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-500 font-bold shadow-sm cursor-pointer">
          <option>Sort: Newest First</option>
          <option>Sort: Closing Soon</option>
          <option>Sort: Most Applicants</option>
        </select>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {scholarships.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group hover:shadow-xl hover:border-primary-200 transition-all duration-300 transform hover:-translate-y-1">
            <div className="h-40 relative">
              <img src={s.banner} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="Banner" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-white/90 backdrop-blur text-primary-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter shadow-sm border border-white">
                  {s.type}
                </span>
                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter shadow-sm border border-white ${
                  s.status === 'Active' ? 'bg-green-500/90 text-white' : 'bg-slate-500/90 text-white'
                }`}>
                  {s.status}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-black leading-tight drop-shadow-md">{s.title}</h3>
              </div>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100 shadow-inner">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Deadline</p>
                  <p className="text-xs font-bold text-slate-700">{s.deadline}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Amount</p>
                  <p className="text-xs font-black text-primary-600">{s.amount}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                  <span>Applications received</span>
                  <span className="text-slate-800 font-black">{s.applicants} / {s.seats}</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div 
                    className="h-full bg-primary-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all duration-500 ease-out" 
                    style={{ width: `${(s.applicants / s.seats) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button className="flex-1 py-2.5 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-colors font-black text-[10px] uppercase tracking-widest shadow-lg">Manage</button>
                <button className="px-3 py-2.5 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200 transition-colors shadow-sm"><i className="fa-solid fa-ellipsis-vertical"></i></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ManageScholarships;

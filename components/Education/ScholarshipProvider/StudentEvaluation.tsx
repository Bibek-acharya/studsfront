import React, { useState } from 'react';

interface StudentEvaluationProps {
  onBack: () => void;
}

const StudentEvaluation = ({ onBack }: StudentEvaluationProps) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [score, setScore] = useState(75);
  const [notes, setNotes] = useState([
    { id: 1, author: 'Reviewer A', text: 'Strong academic record, especially in math.', date: '2 days ago' },
    { id: 2, author: 'Principal', text: 'Recommend for interview.', date: '1 day ago' }
  ]);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const note = {
      id: Date.now(),
      author: 'You',
      text: newNote,
      date: 'Just now'
    };
    setNotes([note, ...notes]);
    setNewNote('');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <div className="space-y-10 fade-in">
            <div>
              <h4 className="text-sm font-black text-slate-300 uppercase tracking-widest mb-5 flex items-center gap-4">
                Demographics & Contact <div className="h-px bg-slate-100 flex-1"></div>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 mb-1">Email Address</p>
                  <p className="font-semibold text-slate-800 break-all">aarav.sharma@example.com</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 mb-1">Phone Number</p>
                  <p className="font-semibold text-slate-800">+977 9801234567</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 mb-1">Date of Birth (Age)</p>
                  <p className="font-semibold text-slate-800">14 May 2004 (21 Yrs)</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 mb-1">Gender</p>
                  <p className="font-semibold text-slate-800">Male</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 lg:col-span-2">
                  <p className="text-xs font-bold text-slate-400 mb-1">Permanent Address</p>
                  <p className="font-semibold text-slate-800">Putalisadak, Kathmandu, Bagmati, Nepal</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-black text-slate-300 uppercase tracking-widest mb-6 flex items-center gap-4">
                Educational Background <div className="h-px bg-slate-100 flex-1"></div>
              </h4>
              <div className="relative pl-6 border-l-2 border-slate-200 space-y-8">
                <div className="relative">
                  <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-primary-600 border-4 border-white shadow-sm"></div>
                  <p className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">Higher Secondary (+2)</p>
                  <h5 className="font-black text-slate-800">St. Xavier's College, Kathmandu</h5>
                  <p className="text-sm text-slate-500 font-medium">Science Stream • Grade 11 & 12 • 2022-2024</p>
                  <p className="mt-2 inline-block px-3 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-black">GPA: 3.85 / 4.0</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-slate-300 border-4 border-white shadow-sm"></div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Secondary (SEE)</p>
                  <h5 className="font-bold text-slate-700">Shree Public School, Janakpur</h5>
                  <p className="text-sm text-slate-500 font-medium">Class 10 • 2022</p>
                  <p className="mt-2 inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">GPA: 3.90 / 4.0</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'financial':
        return (
          <div className="space-y-10 fade-in">
             <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-2xl border border-red-100 flex flex-col md:flex-row gap-6 items-center">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-red-500 text-3xl shadow-sm shrink-0"><i className="fa-solid fa-chart-pie"></i></div>
                <div className="flex-1 text-center md:text-left">
                  <p className="text-sm font-bold text-red-400 uppercase tracking-wider mb-1">Total Annual Family Income</p>
                  <h3 className="text-3xl font-black text-slate-800 mb-2">NPR 1,50,000</h3>
                  <div className="flex items-center gap-2 text-sm font-bold text-green-600 bg-green-50 w-fit px-3 py-1 rounded-lg border border-green-200 mx-auto md:ml-0">
                    <i className="fa-solid fa-check-circle"></i> Low Income Verified
                  </div>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                 <h4 className="font-black text-slate-800 text-lg border-b pb-2">Family Information</h4>
                 <div className="space-y-3">
                   <div className="flex justify-between text-sm"><span className="text-slate-500 font-bold uppercase text-[10px]">Father's Occupation</span><span className="font-bold text-slate-800">Farmer</span></div>
                   <div className="flex justify-between text-sm"><span className="text-slate-500 font-bold uppercase text-[10px]">Mother's Occupation</span><span className="font-bold text-slate-800">Homemaker</span></div>
                   <div className="flex justify-between text-sm"><span className="text-slate-500 font-bold uppercase text-[10px]">Total Dependents</span><span className="font-bold text-slate-800">4 Members</span></div>
                 </div>
               </div>
               <div className="space-y-4">
                 <h4 className="font-black text-slate-800 text-lg border-b pb-2">Verified Documents</h4>
                 <div className="space-y-2">
                   <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-sm">
                     <div className="flex items-center gap-3">
                       <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><i className="fa-solid fa-file-invoice"></i></div>
                       <span className="text-xs font-bold text-slate-700">Income_Certificate.pdf</span>
                     </div>
                     <button className="text-primary-600 hover:text-primary-800 font-black text-[10px] uppercase">View</button>
                   </div>
                   <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-sm">
                     <div className="flex items-center gap-3">
                       <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><i className="fa-solid fa-home"></i></div>
                       <span className="text-xs font-bold text-slate-700">Land_Ownership_Docs.jpg</span>
                     </div>
                     <button className="text-primary-600 hover:text-primary-800 font-black text-[10px] uppercase">View</button>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        );
      case 'documents':
        return (
          <div className="space-y-6 fade-in">
            <h4 className="text-lg font-black text-slate-800">Supporting Documents</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {['Academic_Transcript.pdf', 'Character_Certificate.pdf', 'Citizenship_Copy.jpg', 'Recommendation_Letter.pdf'].map(doc => (
                <div key={doc} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition text-center group cursor-pointer">
                  <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-50 group-hover:text-primary-600 transition">
                    <i className="fa-solid fa-file-lines text-2xl"></i>
                  </div>
                  <p className="text-xs font-bold text-slate-700 truncate mb-2">{doc}</p>
                  <div className="flex gap-2 justify-center">
                    <button className="px-3 py-1 text-[10px] font-black uppercase bg-primary-50 text-primary-600 rounded-lg">View</button>
                    <button className="px-3 py-1 text-[10px] font-black uppercase bg-slate-50 text-slate-500 rounded-lg"><i className="fa-solid fa-download"></i></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'essay':
        return (
          <div className="space-y-6 fade-in">
            <h4 className="text-lg font-black text-slate-800">Personal Essay & Motivation</h4>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 italic text-slate-700 leading-relaxed font-serif shadow-inner">
              "Starting from a small village in Bagmati, I've always been fascinated by how technology can solve rural problems. My goal is to study Computer Science and build applications that help farmers track their crop health using satellite imagery. This scholarship is not just financial support for me; it's the key to making my dream of a 'Digital Rural Nepal' a reality..."
              <p className="mt-6 text-sm font-sans font-bold text-slate-400 uppercase tracking-widest">— Written by Aarav Sharma</p>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="fade-in max-w-7xl mx-auto space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition text-slate-600"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div>
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
              Applicant File: <span className="text-slate-500 font-mono font-medium text-lg">APP-1154</span>
            </h2>
            <p className="text-sm text-slate-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[300px] md:max-w-none">Applied for: Women in STEM Excellence 2026</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-4 py-2 border border-slate-300 text-slate-700 bg-white rounded-lg hover:bg-slate-50 font-bold text-sm shadow-sm flex items-center justify-center gap-2">
            <i className="fa-regular fa-comment-dots text-primary-500"></i> Message
          </button>
          <div className="h-8 w-px bg-slate-300 mx-1 hidden md:block self-center"></div>
          <select className="flex-1 md:flex-none border border-slate-300 rounded-lg px-4 py-2 text-sm font-bold bg-white shadow-sm outline-none cursor-pointer focus:border-primary-500">
            <option value="Pending Review">Pending Review</option>
            <option value="Under Review">Under Review</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="Selected">Selected (Final)</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
        {/* Left Sidebar */}
        <div className="space-y-6 xl:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary-600 to-blue-400"></div>
            <img src="https://i.pravatar.cc/150?img=1" className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-white shadow-lg relative z-10 object-cover bg-white" alt="Profile" />
            <h3 className="text-2xl font-black text-slate-800">Aarav Sharma</h3>
            <p className="text-sm font-bold text-primary-600 mb-2">Computer Science</p>
            <div className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter mb-6 border bg-slate-100 text-slate-600">Pending Review</div>
            
            <div className="grid grid-cols-2 gap-3 text-left mb-6">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Academic Score</p>
                <p className="font-black text-slate-800 text-xl">3.85</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Date Applied</p>
                <p className="font-bold text-slate-800 text-xs mt-1 uppercase tracking-tighter">21 MAR 2026</p>
              </div>
            </div>

            <button className="w-full py-2.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-xl hover:bg-indigo-100 text-sm font-extrabold transition flex items-center justify-center gap-2 shadow-sm">
              <i className="fa-solid fa-video text-xs"></i> Schedule Interview
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 bg-slate-800 text-white flex justify-between items-center">
              <h4 className="font-bold text-sm flex items-center gap-2"><i className="fa-solid fa-clipboard-user text-primary-400"></i> Reviewer Panel</h4>
              <i className="fa-solid fa-lock text-slate-400 text-xs"></i>
            </div>
            <div className="p-5 bg-slate-50 space-y-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider">Evaluation Score</label>
                  <span className="text-xs font-black text-primary-600">{score}/100</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={score}
                  onChange={(e) => setScore(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>

              <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                {notes.map(note => (
                  <div key={note.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-black text-primary-600 uppercase">{note.author}</span>
                      <span className="text-[10px] text-slate-400 font-bold">{note.date}</span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">{note.text}</p>
                  </div>
                ))}
              </div>

              <div className="relative">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={2}
                  className="w-full border border-slate-300 rounded-xl p-3 pr-10 text-xs focus:border-primary-500 outline-none shadow-sm placeholder-slate-400"
                  placeholder="Add an internal evaluation note..."
                ></textarea>
                <button
                  onClick={handleAddNote}
                  className="absolute bottom-2 right-2 w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center hover:bg-primary-700 shadow-sm transition"
                >
                  <i className="fa-solid fa-paper-plane text-[10px]"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Tabs */}
        <div className="xl:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[700px]">
          <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50/80 backdrop-blur sticky top-0 z-10 no-scrollbar">
            {[
              { id: 'personal', label: 'Personal & Academic', icon: 'fa-id-card' },
              { id: 'financial', label: 'Financial Background', icon: 'fa-sack-dollar' },
              { id: 'documents', label: 'Documents & Uploads', icon: 'fa-folder-open', badge: 4 },
              { id: 'essay', label: 'Personal Essay', icon: 'fa-pen-nib' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border-b-2 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600 bg-white'
                    : 'border-transparent text-slate-500 hover:text-primary-600'
                }`}
              >
                <i className={`${tab.icon.startsWith('fa-regular') ? 'fa-regular' : 'fa-solid'} ${tab.icon}`}></i>
                {tab.label}
                {tab.badge && <span className="ml-1 bg-danger text-white text-[10px] px-1.5 py-0.5 rounded-full">{tab.badge}</span>}
              </button>
            ))}
          </div>

          <div className="p-8 flex-1 bg-white">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentEvaluation;

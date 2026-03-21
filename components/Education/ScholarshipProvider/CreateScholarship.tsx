import React from 'react';

const CreateScholarship = () => {
  return (
    <section className="fade-in max-w-5xl mx-auto pb-20">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-primary-900 to-primary-700 p-8 text-white flex justify-between items-end">
          <div>
            <span className="bg-white/20 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block border border-white/10">Scholarship Builder</span>
            <h2 className="text-3xl font-black mb-1">Launch New Opportunity</h2>
            <p className="text-primary-100 font-medium opacity-90">Design your scholarship criteria, funding, and application requirements.</p>
          </div>
          <div className="hidden md:block">
            <i className="fa-solid fa-rocket text-6xl text-white/20"></i>
          </div>
        </div>

        <form className="p-8 space-y-10">
          {/* Section: General */}
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-5 pb-2 border-b border-slate-200 flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center text-sm font-black"><i className="fa-solid fa-1"></i></div> General Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-0 md:pl-10">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight">Official Scholarship Title <span className="text-danger">*</span></label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. NextGen Innovators Tech Scholarship 2026" 
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-primary-500 focus:ring-0 outline-none text-lg font-bold transition placeholder:font-normal placeholder:text-slate-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight">Scholarship Category</label>
                <select className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary-500 transition bg-white appearance-none cursor-pointer font-bold text-slate-800 shadow-sm">
                  <option value="Full Ride">Full Ride (100% Covered)</option>
                  <option value="Partial">Partial Scholarship (Fixed Amount)</option>
                  <option value="Merit-Based">Merit-Based Award</option>
                  <option value="Need-Based">Financial Need-Based</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight">Target Education Level</label>
                <select className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary-500 transition bg-white appearance-none cursor-pointer font-bold text-slate-800 shadow-sm">
                  <option>+2 / High School / A-Levels</option>
                  <option selected>Bachelor's Degree (Undergrad)</option>
                  <option>Master's Degree (Postgrad)</option>
                  <option>Ph.D. / Research</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight">Eligible Academic Programs <span className="text-slate-400 font-normal lowercase">(Comma separated, leave blank for 'Any')</span></label>
                <input 
                  type="text" 
                  placeholder="e.g. Computer Science, Software Engineering, IT, AI" 
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-primary-500 outline-none transition font-medium shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Section: Funding & Capacity */}
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-5 pb-2 border-b border-slate-200 flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center text-sm font-black"><i className="fa-solid fa-2"></i></div> Funding & Timeline
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pl-0 md:pl-10">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight">Financial Value</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-black">NPR</span>
                  <input 
                    type="text" 
                    placeholder="e.g. 50,000 / yr" 
                    className="w-full border-2 border-slate-200 rounded-xl pl-14 pr-4 py-3 outline-none focus:border-green-500 transition font-bold shadow-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight">Available Quota (Seats) <span className="text-danger">*</span></label>
                <input 
                  type="number" 
                  required 
                  min="1" 
                  placeholder="e.g. 50" 
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-green-500 transition font-bold shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight">Application Deadline <span className="text-danger">*</span></label>
                <input 
                  type="date" 
                  required 
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-danger transition font-bold shadow-sm"
                />
              </div>
              
              <div className="md:col-span-3 bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-2 shadow-inner">
                <label className="block text-sm font-black text-slate-800 mb-4 uppercase tracking-wider">What expenses are covered?</label>
                <div className="flex flex-wrap gap-6">
                  {['Tuition Fees', 'Hostel / Accommodation', 'Food / Living Stipend', 'Books & Laptop', 'Travel Allowance'].map(item => (
                    <label key={item} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500 cursor-pointer" />
                      <span className="font-bold text-slate-600 group-hover:text-primary-600 transition text-sm">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section: Details & Docs */}
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-5 pb-2 border-b border-slate-200 flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-sm font-black"><i className="fa-solid fa-3"></i></div> Requirements & Content
            </h3>
            <div className="space-y-6 pl-0 md:pl-10">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight">Comprehensive Description</label>
                <div className="border-2 border-b-0 border-slate-200 rounded-t-xl bg-slate-50 p-2 flex gap-2">
                  <button type="button" className="p-2 hover:bg-white rounded-lg text-slate-600 transition hover:shadow-sm"><i className="fa-solid fa-bold"></i></button>
                  <button type="button" className="p-2 hover:bg-white rounded-lg text-slate-600 transition hover:shadow-sm"><i className="fa-solid fa-italic"></i></button>
                  <button type="button" className="p-2 hover:bg-white rounded-lg text-slate-600 transition hover:shadow-sm"><i className="fa-solid fa-list-ul"></i></button>
                  <button type="button" className="p-2 hover:bg-white rounded-lg text-slate-600 transition hover:shadow-sm"><i className="fa-solid fa-link"></i></button>
                </div>
                <textarea 
                  rows={5} 
                  placeholder="Write a compelling description explaining the purpose, benefits, and exact expectations of the scholars..." 
                  className="w-full border-2 border-slate-200 rounded-b-xl px-4 py-3 outline-none focus:border-purple-500 transition font-medium shadow-sm leading-relaxed"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight">Eligibility & Criteria (Markdown Supported)</label>
                <textarea 
                  rows={3} 
                  placeholder="- Minimum 3.5 GPA out of 4.0&#10;- Must be a citizen of a developing nation&#10;- Demonstrated financial need..." 
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500 transition font-mono text-sm shadow-sm"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-tight">Mandatory Documents from Applicant</label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-inner">
                  {[
                    { label: 'Academic Transcripts', disabled: true, checked: true },
                    { label: 'Govt. ID / Citizenship', disabled: true, checked: true },
                    { label: 'Recommendation Letters' },
                    { label: 'Personal Essay / SOP' },
                    { label: 'Income Certificate' },
                    { label: 'Portfolio Link' }
                  ].map(doc => (
                    <label key={doc.label} className="flex items-center gap-2 cursor-pointer group bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                      <input 
                        type="checkbox" 
                        defaultChecked={doc.checked} 
                        disabled={doc.disabled} 
                        className={`w-4 h-4 rounded text-primary-600 ${doc.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} 
                      />
                      <span className={`font-bold text-xs uppercase tracking-tighter ${doc.disabled ? 'text-slate-400' : 'text-slate-700 group-hover:text-primary-600 transition'}`}>
                        {doc.label} {doc.disabled && '(Req)'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight">Promotional Banner Image</label>
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-10 text-center hover:bg-slate-50 hover:border-primary-400 transition-all cursor-pointer group bg-white shadow-sm">
                  <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-50 group-hover:text-primary-500 transition group-hover:scale-110">
                    <i className="fa-solid fa-cloud-arrow-up text-2xl"></i>
                  </div>
                  <p className="text-lg font-black text-slate-800">Drag and drop your banner image here</p>
                  <p className="text-sm text-slate-500 mt-1 mb-4">or <span className="text-primary-600 hover:underline font-bold">browse your files</span></p>
                  <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase bg-slate-100 inline-block px-4 py-1.5 rounded-full">Recommended: 1200x400px, PNG/JPG, Max 5MB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-8 border-t border-slate-200 flex flex-col-reverse sm:flex-row justify-end gap-4 bg-slate-50/50 -mx-8 -mb-8 p-8">
            <button type="button" className="px-8 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-bold transition shadow-sm">Cancel</button>
            <button type="button" className="px-8 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-900 font-bold shadow-lg transition">Save as Draft</button>
            <button type="submit" className="px-8 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-black shadow-lg shadow-primary-500/30 transition transform hover:-translate-y-0.5 text-lg flex items-center justify-center gap-3">
              <i className="fa-solid fa-paper-plane"></i> Publish Scholarship
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateScholarship;

import React, { useState } from 'react';

const OrganizationProfile = () => {
  const [formData, setFormData] = useState({
    legalName: 'Global Education Foundation',
    entityType: 'Educational Foundation',
    estYear: '2005',
    regNum: 'REG-99283-NP',
    taxId: '300123456',
    tagline: 'Empowering underprivileged brilliant minds through accessible higher education globally.',
    description: 'The Global Education Foundation (GEF) works tirelessly to bridge the socio-economic gap in education. By partnering with top universities and providing comprehensive full-ride and partial scholarships, we target meritorious students from marginalized communities who exhibit extraordinary potential but lack financial resources. Since 2005, we have funded over 5,000 scholars across 12 countries.',
    focusArea: 'STEM Education, Women Empowerment, Rural Development, Tech Innovation',
    email: 'contact@globaledu.org',
    phone: '+977 1-4455667',
    website: 'https://globaledu.org',
    address: 'Thapathali, Kathmandu\nBagmati Province\nNepal 44600'
  });

  return (
    <section className="fade-in max-w-6xl mx-auto pb-20">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div className="h-64 bg-slate-800 relative group">
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1600" 
            className="w-full h-full object-cover opacity-80" 
            alt="Cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <button className="absolute bottom-6 right-6 bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-sm font-bold shadow-lg hover:bg-white text-slate-700 transition opacity-0 group-hover:opacity-100">
            <i className="fa-solid fa-camera mr-2"></i> Update Cover Image
          </button>
        </div>
        
        <div className="px-6 sm:px-10 pb-10 relative">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end -mt-16 mb-8 gap-4">
            <div className="relative group">
              <img 
                src="https://ui-avatars.com/api/?name=Global+Foundation&background=2563eb&color=fff&size=200" 
                className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl bg-white object-cover" 
                alt="Logo" 
              />
              <button className="absolute -bottom-3 -right-3 bg-slate-800 text-white p-2.5 rounded-full hover:bg-slate-900 shadow-lg border-2 border-white transition transform hover:scale-105">
                <i className="fa-solid fa-pen text-sm"></i>
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="px-5 py-2.5 border-2 border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-300 font-bold text-sm transition shadow-sm">
                <i className="fa-solid fa-eye mr-2"></i> View Public Page
              </button>
              <button className="px-5 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-bold text-sm shadow-lg shadow-primary-500/30 transition transform hover:-translate-y-0.5">
                <i className="fa-solid fa-floppy-disk mr-2"></i> Save Changes
              </button>
            </div>
          </div>

          <form>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
              <div className="xl:col-span-2 space-y-8">
                {/* Core Info */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <i className="fa-solid fa-building text-primary-500"></i> Core Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Organization Legal Name</label>
                      <input 
                        type="text" 
                        value={formData.legalName} 
                        onChange={(e) => setFormData({...formData, legalName: e.target.value})}
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition bg-white shadow-sm font-medium" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Entity Type</label>
                      <select 
                        value={formData.entityType}
                        onChange={(e) => setFormData({...formData, entityType: e.target.value})}
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none bg-white shadow-sm font-medium cursor-pointer"
                      >
                        <option>Non-Governmental Organization (NGO)</option>
                        <option>Educational Foundation</option>
                        <option>Corporate CSR</option>
                        <option>Government Body</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Establishment Year</label>
                      <input 
                        type="number" 
                        value={formData.estYear} 
                        onChange={(e) => setFormData({...formData, estYear: e.target.value})}
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white shadow-sm outline-none font-medium" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Govt. Registration Number</label>
                      <input 
                        type="text" 
                        value={formData.regNum} 
                        onChange={(e) => setFormData({...formData, regNum: e.target.value})}
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white shadow-sm outline-none font-medium" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Tax ID / PAN</label>
                      <input 
                        type="text" 
                        value={formData.taxId} 
                        onChange={(e) => setFormData({...formData, taxId: e.target.value})}
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white shadow-sm outline-none font-medium" 
                      />
                    </div>
                  </div>
                </div>
                
                {/* Mission */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <i className="fa-solid fa-bullseye text-primary-500"></i> Mission & Vision
                  </h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Short Mission Statement (Tagline)</label>
                      <textarea 
                        rows={2} 
                        value={formData.tagline}
                        onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white shadow-sm outline-none font-medium"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Detailed Organization Description</label>
                      <textarea 
                        rows={5} 
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white shadow-sm outline-none font-medium leading-relaxed"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Primary Areas of Focus (Tags)</label>
                      <input 
                        type="text" 
                        value={formData.focusArea} 
                        onChange={(e) => setFormData({...formData, focusArea: e.target.value})}
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white shadow-sm outline-none font-medium" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar Inputs */}
              <div className="space-y-6">
                {/* Contact Card */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary-50 rounded-bl-full -z-0"></div>
                  <h3 className="text-base font-bold mb-5 text-slate-800 uppercase tracking-widest relative z-10">Contact Details</h3>
                  <div className="space-y-4 relative z-10">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Official Email</label>
                      <div className="relative">
                        <i className="fa-solid fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                        <input 
                          type="email" 
                          value={formData.email} 
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:border-primary-500 outline-none font-medium" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Support Phone</label>
                      <div className="relative">
                        <i className="fa-solid fa-phone absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                        <input 
                          type="text" 
                          value={formData.phone} 
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:border-primary-500 outline-none font-medium" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Website</label>
                      <div className="relative">
                        <i className="fa-solid fa-globe absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                        <input 
                          type="text" 
                          value={formData.website} 
                          onChange={(e) => setFormData({...formData, website: e.target.value})}
                          className="w-full border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:border-primary-500 outline-none font-medium" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Headquarters Address</label>
                      <textarea 
                        rows={3} 
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-primary-500 outline-none font-medium"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Social Links Card */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="text-base font-bold mb-5 text-slate-800 uppercase tracking-widest">Social Presence</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-blue-100 text-blue-700 flex items-center justify-center shrink-0"><i className="fa-brands fa-linkedin-in"></i></div>
                      <input type="text" placeholder="LinkedIn URL" defaultValue="linkedin.com/company/gef" className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 font-medium" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><i className="fa-brands fa-facebook-f"></i></div>
                      <input type="text" placeholder="Facebook URL" defaultValue="facebook.com/gef" className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 font-medium" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-sky-50 text-sky-500 flex items-center justify-center shrink-0"><i className="fa-brands fa-twitter"></i></div>
                      <input type="text" placeholder="Twitter URL" defaultValue="twitter.com/gef_global" className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-sky-500 font-medium" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OrganizationProfile;

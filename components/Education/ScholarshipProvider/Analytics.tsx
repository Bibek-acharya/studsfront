import React from 'react';

const Analytics = () => {
  const steps = [
    { label: 'Total Apps', value: '154', icon: 'fa-table-list', bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700' },
    { label: 'Under Review', value: '45', icon: 'fa-magnifying-glass', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-primary-600' },
    { label: 'Shortlisted', value: '28', icon: 'fa-star', bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-warning' },
    { label: 'Selected', value: '12', icon: 'fa-check-circle', bg: 'bg-green-50', border: 'border-green-400', text: 'text-success', large: true }
  ];

  return (
    <section className="fade-in max-w-7xl mx-auto pb-20">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-800">Analytics & Data Export</h2>
        <p className="text-sm text-slate-500 mt-1 font-medium">Deep insights and report generation for stakeholders.</p>
      </div>

      {/* Complex Funnel Area */}
      <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm mb-8 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-slate-200 via-primary-400 to-green-400"></div>
        <h3 className="font-black text-slate-800 mb-12 text-xl text-center uppercase tracking-widest">Application Funnel Conversion</h3>
        
        <div className="flex flex-col md:flex-row items-center justify-between text-center max-w-5xl mx-auto relative px-4">
          {/* Horizontal connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-20 right-20 h-1.5 bg-slate-100 -z-10 -translate-y-1/2 rounded-full"></div>
          
          {steps.map((step, index) => (
            <React.Fragment key={step.label}>
              <div className="flex flex-col items-center mb-10 md:mb-0 group">
                <div className={`w-28 h-28 rounded-3xl ${step.bg} flex flex-col items-center justify-center border-4 ${step.border} shadow-sm relative z-10 transition-transform group-hover:scale-110 duration-300 ${step.large ? 'scale-125 shadow-xl md:mx-6' : ''}`}>
                  <span className={`text-3xl font-black ${step.text}`}>{step.value}</span>
                  <i className={`fa-solid ${step.icon} text-[10px] mt-1 opacity-40`}></i>
                </div>
                <span className={`text-[10px] font-black mt-6 uppercase tracking-widest ${step.large ? 'text-green-700 bg-green-100 px-4 py-1.5 rounded-full' : 'text-slate-500'}`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="text-slate-200 text-2xl hidden md:block transform transition-transform group-hover:translate-x-2">
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Export Reports Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { 
            title: 'Master Applicant List', 
            desc: 'A complete raw data dump of all applicants, their demographic data, GPA, and current pipeline status.', 
            icon: 'fa-table-list', 
            color: 'emerald', 
            action: 'Download CSV (.csv)' 
          },
          { 
            title: 'Financial Needs Report', 
            desc: 'Anonymized report detailing the average family income, dependents, and financial need statements for audit.', 
            icon: 'fa-file-invoice-dollar', 
            color: 'rose', 
            action: 'Generate PDF (.pdf)' 
          },
          { 
            title: 'Diversity & Demographics', 
            desc: 'Breakdown by gender, province, and rural vs. urban background to ensure equitable distribution.', 
            icon: 'fa-earth-asia', 
            color: 'indigo', 
            isMulti: true 
          }
        ].map(report => (
          <div key={report.title} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group flex flex-col items-center text-center">
            <div className={`w-20 h-20 bg-${report.color}-50 text-${report.color}-600 rounded-3xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
              <i className={`fa-solid ${report.icon}`}></i>
            </div>
            <h3 className="font-black text-xl text-slate-800 mb-3 uppercase tracking-tighter">{report.title}</h3>
            <p className="text-sm text-slate-500 mb-8 flex-1 leading-relaxed font-medium">{report.desc}</p>
            
            {report.isMulti ? (
              <div className="grid grid-cols-2 gap-3 w-full">
                <button className="py-4 bg-slate-50 text-slate-700 rounded-2xl hover:bg-slate-100 font-black text-xs uppercase transition shadow-sm border border-slate-100"><i className="fa-solid fa-file-csv mr-2"></i> CSV</button>
                <button className="py-4 bg-slate-50 text-slate-700 rounded-2xl hover:bg-slate-100 font-black text-xs uppercase transition shadow-sm border border-slate-100"><i className="fa-solid fa-file-powerpoint mr-2"></i> PPT</button>
              </div>
            ) : (
              <button className={`w-full py-4 bg-${report.color}-600 text-white rounded-2xl hover:shadow-lg transition-all font-black text-xs uppercase tracking-widest shadow-md shadow-${report.color}-500/20 flex items-center justify-center gap-2`}>
                <i className={`fa-solid ${report.action.includes('CSV') ? 'fa-file-csv' : 'fa-file-pdf'}`}></i> {report.action}
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Analytics;

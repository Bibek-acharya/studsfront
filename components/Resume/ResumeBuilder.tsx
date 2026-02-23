import React, { useState } from "react";

const ResumeBuilder: React.FC = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-white font-jakarta text-slate-900 pt-20">
      <style>{`
            .bg-grid {
                background-size: 40px 40px;
                background-image: radial-gradient(circle, #e2e8f0 1px, transparent 1px);
            }
            .gradient-text {
                background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .step-line::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 100%;
                width: 100%;
                height: 2px;
                background: #e2e8f0;
                z-index: -1;
            }
            @keyframes slideIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-slide {
                animation: slideIn 0.6s ease forwards;
            }
            `}</style>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-grid">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 -skew-x-12 transform translate-x-20 z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide">
              <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                  v2.0 is now live
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tighter uppercase gradient-text">
                The job-winning <br />
                <span className="text-blue-600 relative">
                  free resume
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="8"
                    viewBox="0 0 100 8"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 7 C 20 0, 80 0, 100 7"
                      stroke="#2563eb"
                      strokeWidth="4"
                      fill="none"
                    />
                  </svg>
                </span>{" "}
                builder.
              </h1>

              <p className="text-xl text-slate-500 font-medium max-w-lg leading-relaxed">
                Build a professional, recruiter-vetted resume in minutes with
                our AI-powered templates. No formatting stress, just career
                growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-slate-800 transform hover:-translate-y-1 transition-all">
                  Create My Resume Now
                </button>
                <button className="bg-white text-slate-900 border-2 border-slate-100 px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  <i className="fa-solid fa-play text-blue-600"></i> View
                  Templates
                </button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-black text-slate-900 uppercase">
                    38k+
                  </div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Resumes Created
                  </div>
                </div>
                <div className="h-10 w-[1px] bg-slate-200"></div>
                <div>
                  <div className="text-3xl font-black text-slate-900 uppercase">
                    4.9/5
                  </div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    User Rating
                  </div>
                </div>
              </div>
            </div>

            <div
              className="relative animate-slide"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="absolute -inset-4 bg-blue-100/30 rounded-[2rem] blur-2xl -z-10 rotate-3"></div>
              <div className="bg-white rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden relative group">
                <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Editor Mode
                  </div>
                </div>
                <div className="aspect-[4/5] bg-white p-8 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <div className="w-48 h-6 bg-slate-900 rounded"></div>
                      <div className="w-32 h-3 bg-blue-600 rounded"></div>
                    </div>
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl"></div>
                  </div>
                  <div className="space-y-3 pt-4">
                    <div className="w-full h-2 bg-slate-100 rounded-full"></div>
                    <div className="w-full h-2 bg-slate-100 rounded-full"></div>
                    <div className="w-2/3 h-2 bg-slate-100 rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="space-y-2">
                      <div className="w-full h-20 bg-slate-50 rounded-xl border border-dashed border-slate-200"></div>
                      <div className="w-1/2 h-2 bg-slate-200 rounded"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-20 bg-slate-50 rounded-xl border border-dashed border-slate-200"></div>
                      <div className="w-1/2 h-2 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[80%] p-4 rounded-2xl flex items-center justify-between shadow-xl border border-white/50 bg-white/80 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-900 uppercase tracking-tight">
                        ATS Friendly
                      </div>
                      <div className="text-[8px] font-black text-green-600 uppercase">
                        Score: 98/100
                      </div>
                    </div>
                  </div>
                  <i className="fa-solid fa-wand-magic-sparkles text-blue-600 animate-pulse"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Recruiter Certified",
                desc: "Templates designed with input from top recruiters.",
                icon: "fa-shield-check",
                color: "bg-blue-50",
              },
              {
                title: "ATS Optimized",
                desc: "Engineered to pass every parsing bot and filter.",
                icon: "fa-robot",
                color: "bg-indigo-50",
              },
              {
                title: "AI Assistant",
                desc: "Smart suggestions for every section of your resume.",
                icon: "fa-sparkles",
                color: "bg-purple-50",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-3xl hover:bg-slate-50 transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 ${feature.color} text-slate-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <i className={`fa-solid ${feature.icon} text-xl`}></i>
                </div>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it Works - Modern Steps */}
      <div className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tight gradient-text">
              3 Simple Steps
            </h2>
            <p className="mt-4 text-slate-500 font-black text-[10px] tracking-[0.3em] uppercase">
              to your dream career
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
              {
                step: "01",
                title: "Pick a Template",
                desc: "Choose from our library of professional designs.",
              },
              {
                step: "02",
                title: "Fill Info",
                desc: "Add your details or import from LinkedIn.",
              },
              {
                step: "03",
                title: "Download PDF",
                desc: "Export your high-quality resume and apply.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center"
              >
                <div className="text-4xl font-black text-blue-100 mb-6">
                  {item.step}
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-slate-500 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Stats/CTA Section */}
      <div className="py-24 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden text-center lg:text-left">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 space-y-8">
                <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight uppercase tracking-tighter">
                  Ready to get <br />
                  <span className="text-blue-400 italic underline decoration-wavy underline-offset-8">
                    noticed?
                  </span>
                </h2>
                <p className="text-slate-400 font-medium text-lg max-w-lg">
                  Join thousands of users who have landed jobs at Google, Meta,
                  and Netflix using our platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-slate-50 transition-all active:scale-95">
                    Build My Resume
                  </button>
                </div>
              </div>
              <div className="flex-shrink-0 grid grid-cols-2 gap-4">
                <div className="p-6 bg-slate-800 rounded-3xl border border-slate-700 text-center">
                  <div className="text-3xl font-black text-white mb-1">94%</div>
                  <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-tight">
                    Increased <br /> Interviews
                  </div>
                </div>
                <div className="p-6 bg-slate-800 rounded-3xl border border-slate-700 text-center translate-y-8">
                  <div className="text-3xl font-black text-white mb-1">15m</div>
                  <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-tight">
                    Avg Build <br /> Time
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer-lite */}
      <div className="bg-slate-50 py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black">
              S
            </div>
            <span className="text-lg font-black uppercase tracking-tighter">
              StudSphere
            </span>
          </div>
          <div className="flex gap-8">
            <a
              href="#"
              className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900"
            >
              Support
            </a>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 cursor-pointer transition-all">
              <i className="fa-brands fa-twitter"></i>
            </div>
            <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 cursor-pointer transition-all">
              <i className="fa-brands fa-linkedin-in"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;

import React, { useState } from "react";

const CoverLetterBuilder: React.FC = () => {
  const [activeCard, setActiveCard] = useState(1);

  const rotateTemplates = (dir: "next" | "prev") => {
    if (dir === "next") {
      setActiveCard((prev) => (prev + 1) % 3);
    } else {
      setActiveCard((prev) => (prev - 1 + 3) % 3);
    }
  };

  return (
    <div className="min-h-screen bg-white font-jakarta text-slate-900 overflow-x-hidden pt-20">
      <style>{`
        .dot-pattern {
            background-image: radial-gradient(#93C5FD 2px, transparent 2px);
            background-size: 24px 24px;
        }
        .macbook-screen {
            background: #111827;
            border-radius: 8px 8px 0 0;
            box-shadow: inset 0 0 0 2px #374151;
            position: relative;
            overflow: hidden;
        }
        .macbook-base {
            background: #E2E8F0;
            border-radius: 0 0 12px 12px;
            position: relative;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .macbook-base::before {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 120px;
            height: 8px;
            background: #94A3B8;
            border-radius: 0 0 6px 6px;
        }
        .glass-panel {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.6);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
        }
        .pattern-waves {
            background-image: repeating-radial-gradient(circle at 0 0, transparent 0, transparent 10px, rgba(37, 99, 235, 0.05) 10px, rgba(37, 99, 235, 0.05) 20px);
        }
        .pattern-hex {
            background-image: linear-gradient(30deg, #F8FAFC 12%, transparent 12.5%, transparent 87%, #F8FAFC 87.5%, #F8FAFC), linear-gradient(150deg, #F8FAFC 12%, transparent 12.5%, transparent 87%, #F8FAFC 87.5%, #F8FAFC), linear-gradient(30deg, #F8FAFC 12%, transparent 12.5%, transparent 87%, #F8FAFC 87.5%, #F8FAFC), linear-gradient(150deg, #F8FAFC 12%, transparent 12.5%, transparent 87%, #F8FAFC 87.5%, #F8FAFC), linear-gradient(60deg, rgba(37, 99, 235, 0.05) 25%, transparent 25.5%, transparent 75%, rgba(37, 99, 235, 0.05) 75%, rgba(37, 99, 235, 0.05)), linear-gradient(60deg, rgba(37, 99, 235, 0.05) 25%, transparent 25.5%, transparent 75%, rgba(37, 99, 235, 0.05) 75%, rgba(37, 99, 235, 0.05));
            background-size: 20px 35px;
        }
        .pattern-lines {
            background: repeating-linear-gradient(45deg, #F8FAFC, #F8FAFC 10px, #E2E8F0 10px, #E2E8F0 20px);
        }
        .wavy-bg {
            background-image: url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23059669' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
        }
        .mesh-gradient {
            background-color: #F8FAFC;
            background-image: 
                radial-gradient(at 0% 0%, hsla(217,91%,95%,1) 0, transparent 50%), 
                radial-gradient(at 50% 0%, hsla(225,100%,98%,1) 0, transparent 50%), 
                radial-gradient(at 100% 0%, hsla(217,91%,95%,1) 0, transparent 50%);
        }
      `}</style>

      {/* Main Hero Section */}
      <main className="flex-grow flex items-center relative mesh-gradient">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl mix-blend-multiply"></div>
          <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-slate-100/50 rounded-full blur-3xl mix-blend-multiply"></div>
          <div className="absolute top-20 left-1/2 w-64 h-64 dot-pattern opacity-20 rounded-full"></div>
          <div className="absolute bottom-32 left-10 w-4 h-4 bg-blue-600/20 rounded-full"></div>
          <div className="absolute top-32 right-[40%] w-3 h-3 bg-blue-300 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10 py-12 lg:py-24">
          <div className="space-y-8 animate-fadeInUp text-center lg:text-left">
            <nav className="flex items-center justify-center lg:justify-start space-x-2 text-sm text-slate-500 font-medium">
              <a href="#" className="hover:text-blue-600 transition-colors">
                Home
              </a>
              <i className="fa-solid fa-chevron-right text-xs text-slate-300"></i>
              <span className="text-blue-600">Online Cover Letter Builder</span>
            </nav>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight uppercase">
              Write a cover letter that{" "}
              <span className="relative inline-block text-blue-600 italic">
                gets you hired
                <svg
                  className="absolute w-full h-3 -bottom-1 left-0 text-blue-600 opacity-30"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
              </span>
              .
            </h1>

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              Stop staring at a blank page. Just answer a few simple questions
              and our builder will format a professional cover letter for you in
              minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-6 justify-center lg:justify-start">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-[0.2em] px-10 py-5 rounded-xl shadow-xl shadow-blue-500/20 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-3 group">
                Build My Cover Letter Now
                <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <div className="flex -space-x-2">
                <img
                  src="https://i.pravatar.cc/100?img=1"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-slate-50"
                />
                <img
                  src="https://i.pravatar.cc/100?img=5"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-slate-50"
                />
                <img
                  src="https://i.pravatar.cc/100?img=8"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-slate-50"
                />
                <div className="w-10 h-10 rounded-full border-2 border-slate-50 bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                  +5k
                </div>
              </div>
              <div className="text-left">
                <div className="flex text-yellow-400 text-sm mb-0.5">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Excellent – 5,038 Reviews
                </p>
              </div>
            </div>
          </div>

          <div className="relative mt-12 lg:mt-0 perspective-1000">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/60 rounded-full blur-3xl -z-10"></div>

            <div className="relative z-10 w-full max-w-[600px] mx-auto animate-float">
              <div className="macbook-screen aspect-[16/10] bg-white border-[12px] border-slate-800 shadow-2xl overflow-hidden relative group cursor-default">
                <div className="h-8 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <div className="mx-auto w-1/3 h-4 bg-slate-200 rounded-md"></div>
                </div>

                <div className="flex h-full">
                  <div className="w-1/5 bg-slate-50 border-r border-slate-100 p-3 space-y-3 hidden sm:block">
                    <div className="w-full h-8 bg-blue-600/10 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="w-3/4 h-2 bg-slate-200 rounded"></div>
                      <div className="w-1/2 h-2 bg-slate-200 rounded"></div>
                      <div className="w-full h-2 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                  <div className="flex-1 bg-slate-100 p-4 sm:p-6 overflow-hidden">
                    <div className="bg-white w-full h-full shadow-sm rounded p-6 sm:p-8 space-y-4 transform transition-transform group-hover:scale-[1.02] duration-500 origin-top">
                      <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                        <div className="space-y-2">
                          <div className="w-32 h-4 bg-slate-800 rounded"></div>
                          <div className="w-24 h-3 bg-blue-600 rounded"></div>
                        </div>
                        <div className="w-10 h-10 rounded bg-slate-100"></div>
                      </div>
                      <div className="space-y-2.5 pt-2">
                        <div className="w-full h-2 bg-slate-200 rounded"></div>
                        <div className="w-full h-2 bg-slate-200 rounded"></div>
                        <div className="w-11/12 h-2 bg-slate-200 rounded"></div>
                        <div className="w-full h-2 bg-slate-200 rounded"></div>
                      </div>
                      <div className="pt-4">
                        <div className="w-20 h-3 bg-slate-300 rounded mb-2"></div>
                        <div className="w-32 h-2 bg-slate-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="macbook-base h-4 w-full shadow-xl"></div>
            </div>

            <div className="absolute -bottom-6 -right-4 sm:-right-8 w-1/3 min-w-[140px] max-w-[200px] animate-float-delayed z-20">
              <div className="bg-slate-900 p-2 rounded-xl shadow-2xl text-center">
                <div className="bg-white rounded-lg overflow-hidden aspect-[3/4] p-3 space-y-2">
                  <div className="flex justify-between items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100"></div>
                    <div className="w-12 h-2 bg-slate-100 rounded"></div>
                  </div>
                  <div className="w-full h-20 bg-slate-50 rounded border border-dashed border-slate-200 flex items-center justify-center">
                    <i className="fa-solid fa-plus text-slate-300"></i>
                  </div>
                  <button className="mt-2 w-full h-6 bg-blue-600 rounded text-[8px] text-white flex items-center justify-center font-black uppercase tracking-widest">
                    APPLY
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute top-10 -left-4 sm:-left-12 glass-panel p-4 rounded-xl z-30 w-48 animate-float">
              <div className="flex items-center justify-between mb-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                <span>Templates</span>
                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="aspect-[3/4] bg-white border-2 border-blue-600 rounded shadow-sm p-1 cursor-pointer transition-transform hover:scale-105">
                  <div className="w-full h-1 bg-slate-200 mb-1"></div>
                  <div className="w-full h-full bg-slate-50"></div>
                </div>
                <div className="aspect-[3/4] bg-white border border-slate-200 rounded p-1 opacity-60 cursor-pointer transition-transform hover:scale-105">
                  <div className="w-full h-1 bg-slate-200 mb-1"></div>
                  <div className="w-full h-full bg-slate-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Template Selection Section */}
      <section className="py-24 relative overflow-hidden" id="templates">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-3 block">
              Step 1
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight uppercase tracking-tight">
              Choose a design.
            </h2>
            <p className="mt-4 text-slate-500 font-medium">
              Select a template that matches your industry and personality.
            </p>
          </div>

          <div className="relative flex items-center justify-center gap-4 md:gap-12 perspective-1000 py-4">
            <button
              onClick={() => rotateTemplates("prev")}
              className="absolute left-0 lg:left-20 z-30 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:scale-110 transition-all"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            {[0, 1, 2].map((i) => {
              const isActive = i === activeCard;
              const isHiddenOnMobile = !isActive;
              return (
                (isActive || window.innerWidth > 768) && (
                  <div
                    key={i}
                    className={`template-card h-[420px] bg-white rounded-2xl overflow-hidden relative transition-all duration-500 z-10 select-none
                  ${isActive ? "w-72 border-4 border-blue-600 shadow-2xl scale-100 z-20" : "w-64 border border-slate-100 shadow-xl scale-90 opacity-40 blur-[1px]"}
                  ${isHiddenOnMobile ? "hidden md:block" : ""}`}
                  >
                    {isActive && (
                      <div className="absolute top-3 right-3 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md z-10">
                        <i className="fa-solid fa-check"></i>
                      </div>
                    )}
                    <div
                      className={`h-24 w-full ${i === 0 ? "pattern-lines" : i === 1 ? "pattern-waves" : "pattern-hex"}`}
                    ></div>
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-center justify-center -mt-12 mb-3">
                        <img
                          src={`https://i.pravatar.cc/100?img=${i + 20}`}
                          className="w-20 h-20 rounded-full border-4 border-white shadow-md"
                          alt=""
                        />
                      </div>
                      <div className="text-center mb-5">
                        <h3 className="font-black text-slate-900 uppercase tracking-tight">
                          {i === 1
                            ? "Sarah Jenkins"
                            : i === 0
                              ? "James Wilson"
                              : "Michael Chen"}
                        </h3>
                        <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">
                          {i === 1
                            ? "Senior Designer"
                            : i === 0
                              ? "Project Manager"
                              : "Software Engineer"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-slate-100 w-full rounded"></div>
                        <div className="h-2 bg-slate-100 w-full rounded"></div>
                        <div className="h-2 bg-slate-100 w-3/4 rounded"></div>
                      </div>
                    </div>
                  </div>
                )
              );
            })}

            <button
              onClick={() => rotateTemplates("next")}
              className="absolute right-0 lg:right-20 z-30 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:scale-110 transition-all"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>

          <div className="text-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-[0.2em] px-10 py-5 rounded-xl shadow-xl shadow-blue-500/20 transition-all transform hover:-translate-y-1 active:scale-95 inline-flex items-center gap-3">
              Use This Template
              <i className="fa-solid fa-pen-nib"></i>
            </button>
            <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
              Free to try • No credit card required
            </p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-slate-50/50" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-3 block">
              Process
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight leading-tight">
              Professional results.
            </h2>
            <p className="mt-4 text-slate-500 font-medium leading-relaxed">
              Our AI-powered engine takes the stress out of writing your perfect
              cover letter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-12 left-[10%] w-[80%] h-0.5 border-t-2 border-dashed border-blue-200 -z-0"></div>
            {[
              {
                id: 1,
                title: "Fill details",
                desc: "Enter your experience.",
                icon: "fa-user-pen",
              },
              {
                id: 2,
                title: "AI writes",
                desc: "GPT-4 creates content.",
                icon: "fa-wand-magic",
              },
              {
                id: 3,
                title: "Customize",
                desc: "Tweak fonts & colors.",
                icon: "fa-palette",
              },
              {
                id: 4,
                title: "Download",
                desc: "Export as PDF/Word.",
                icon: "fa-download",
              },
            ].map((step) => (
              <div key={step.id} className="relative group">
                <div className="bg-white rounded-2xl shadow-xl p-8 h-full border border-white hover:border-blue-100 transition-all hover:shadow-2xl hover:-translate-y-1 relative z-10 text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-black flex items-center justify-center absolute -top-6 left-1/2 -translate-x-1/2 border-4 border-slate-50">
                    {step.id}
                  </div>
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4">
                    <i className={`fa-solid ${step.icon} text-2xl`}></i>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <button className="bg-slate-900 hover:bg-slate-800 text-white font-black text-[10px] uppercase tracking-[0.2em] px-12 py-6 rounded-2xl shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-3 mx-auto">
              Ready to create? Start Now
              <i className="fa-solid fa-rocket text-yellow-400"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">
              Loved by Seekers
            </h2>
            <p className="mt-4 text-slate-500 font-medium">
              Join thousands of professionals who landed their dream jobs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-xl border border-slate-50"
              >
                <div className="flex text-yellow-400 mb-4 text-xs">
                  {[...Array(5)].map((_, j) => (
                    <i key={j} className="fa-solid fa-star"></i>
                  ))}
                </div>
                <p className="text-slate-600 mb-6 italic font-medium leading-relaxed">
                  "This tool generated a perfect cover letter in seconds, and I
                  got the interview! The templates are stunning."
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/100?img=${i + 40}`}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                    alt=""
                  />
                  <div>
                    <div className="font-black text-slate-900 text-xs uppercase tracking-tight">
                      {i === 1 ? "Emily R." : i === 2 ? "David K." : "Sarah L."}
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      {i === 1
                        ? "Marketing"
                        : i === 2
                          ? "Engineer"
                          : "Designer"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Banner */}
      <section className="py-20 bg-[#A7F3D0] relative overflow-hidden wavy-bg">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between min-h-[350px]">
          <div className="md:w-1/2 relative z-20 mb-10 md:mb-0 text-center md:text-left">
            <div className="absolute -left-12 -top-12 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center animate-float hidden md:flex">
              <i className="fa-solid fa-face-smile text-3xl text-blue-600"></i>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 uppercase tracking-tighter leading-none">
              Your Dream Job <br /> Awaits.
            </h2>
            <p className="text-lg text-emerald-900 mb-10 font-black uppercase tracking-widest">
              Create a standout profile today.
            </p>
            <button className="bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] py-5 px-10 rounded-xl shadow-2xl hover:bg-slate-800 transition-all active:scale-95">
              Get Started Free
            </button>
          </div>

          <div className="md:w-1/2 flex items-end justify-center relative h-64">
            <div className="relative w-80 h-full">
              {/* Simplified flat vector chars with icons */}
              <div className="absolute bottom-0 right-0 w-32 h-48 bg-yellow-400 rounded-t-3xl animate-float-delayed flex flex-col items-center justify-center border-4 border-slate-900">
                <i className="fa-solid fa-user-tie text-5xl text-slate-900"></i>
                <div className="absolute -left-10 top-10 bg-white p-3 rounded-lg shadow-xl border-2 border-slate-900 -rotate-12">
                  <i className="fa-solid fa-file-invoice text-blue-600"></i>
                </div>
              </div>
              <div className="absolute bottom-0 left-10 w-28 h-40 bg-blue-600 rounded-t-3xl animate-float flex flex-col items-center justify-center border-4 border-slate-900">
                <i className="fa-solid fa-user-graduate text-5xl text-white"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoverLetterBuilder;

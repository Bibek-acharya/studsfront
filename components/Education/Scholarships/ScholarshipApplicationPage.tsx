import React, { useState, useEffect } from "react";

interface ScholarshipApplicationPageProps {
  onNavigate: (view: string, data?: any) => void;
  scholarshipId?: string | null;
}

const ScholarshipApplicationPage: React.FC<ScholarshipApplicationPageProps> = ({
  onNavigate,
  scholarshipId,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const totalSteps = 5;
  const stepTitles = [
    "Personal Info",
    "Background",
    "Documents",
    "Payment",
    "Review",
  ];

  // Scroll to top on step change
  useEffect(() => {
    const container = document.getElementById("form-scroll-container");
    if (container) container.scrollTop = 0;
  }, [currentStep]);

  const nextStep = () => {
    if (currentStep === 4 && paymentMethod && paymentMethod !== "ips") {
      setIsRedirecting(true);
      setTimeout(() => {
        setIsRedirecting(false);
        setCurrentStep((prev) => prev + 1);
      }, 2000);
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      submitApplication();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const submitApplication = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // Success modal/alert logic
      alert(
        "Application submitted successfully! Our committee will review your documents and reach out via email.",
      );
      onNavigate("scholarshipMain");
    }, 2000);
  };

  const renderStepIcon = (step: number) => {
    if (step < currentStep)
      return <i className="fa-solid fa-check text-sm"></i>;
    if (step === 1) return <i className="fa-solid fa-user text-sm"></i>;
    return <span className="text-xs font-bold">{step}</span>;
  };

  return (
    <div className="fixed inset-0 z-[60] bg-slate-100 flex items-center justify-center p-0 md:p-4 font-sans animate-in fade-in duration-300">
      {/* Redirection Overlay */}
      {isRedirecting && (
        <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <h3 className="text-xl font-bold text-slate-800">
            Redirecting to Payment Gateway...
          </h3>
          <p className="text-slate-500 mt-2">
            Please do not close this window.
          </p>
        </div>
      )}

      {/* The Main Application Container */}
      <div className="relative w-full max-w-7xl h-full md:h-[90vh] bg-white md:rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white">
        {/* Close Button Mobile/Desktop */}
        <button
          onClick={() => onNavigate("scholarshipMain")}
          className="absolute top-6 right-6 z-[100] w-12 h-12 bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 border border-slate-100 shadow-xl transition-all hover:rotate-90 active:scale-95 group"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        {/* Sidebar Navigation */}
        <div className="hidden md:flex w-[350px] bg-slate-50 border-r border-slate-100 flex-col relative h-full">
          {/* Decorative Gradient Overlay */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          {/* Sidebar Header */}
          <div className="p-8 pb-10 relative z-10 shrink-0">
            <div className="flex items-center gap-3 mb-10 text-blue-700">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-blue-100 ring-4 ring-blue-50/50">
                <i className="fa-solid fa-graduation-cap text-2xl text-blue-600"></i>
              </div>
              <span className="font-extrabold text-2xl tracking-tighter text-slate-900">
                ScholarHub
              </span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 leading-[1.1] tracking-tight">
              Complete your
              <br />
              application
            </h2>
            <p className="text-slate-400 text-sm mt-3 font-medium">
              Follow the steps to submit your profile.
            </p>
          </div>

          {/* Wizard Steps */}
          <div className="flex-1 px-8 py-2 overflow-y-auto relative scrollbar-hide">
            <div className="space-y-0 relative">
              {stepTitles.map((title, index) => {
                const stepNum = index + 1;
                const isActive = stepNum === currentStep;
                const isCompleted = stepNum < currentStep;

                return (
                  <div
                    key={stepNum}
                    className="relative pb-10 flex gap-5 group"
                  >
                    {stepNum !== totalSteps && (
                      <div
                        className={`absolute left-[17px] top-10 bottom-[-10px] w-[2px] rounded-full transition-all duration-500 ${isCompleted ? "bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.3)]" : "bg-slate-200"}`}
                      />
                    )}
                    <button
                      onClick={() => isCompleted && setCurrentStep(stepNum)}
                      disabled={!isCompleted && !isActive}
                      className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 shrink-0 ${
                        isActive
                          ? "bg-blue-600 text-white shadow-xl shadow-blue-600/30 ring-4 ring-blue-100 scale-110"
                          : isCompleted
                            ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
                            : "bg-white border-2 border-slate-200 text-slate-400 group-hover:border-slate-300"
                      }`}
                    >
                      {renderStepIcon(stepNum)}
                    </button>
                    <div className="pt-0.5">
                      <p
                        className={`text-[13px] font-black uppercase tracking-widest transition-colors ${isActive ? "text-slate-900" : "text-slate-400"}`}
                      >
                        {title}
                      </p>
                      <p className="text-[11px] text-slate-400 font-bold mt-0.5 opacity-60">
                        {stepNum === 1 && "Personal details"}
                        {stepNum === 2 && "Education history"}
                        {stepNum === 3 && "Verified documents"}
                        {stepNum === 4 && "Application fee"}
                        {stepNum === 5 && "Final verification"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Need Help Box */}
          <div className="p-8 mt-auto relative z-10 shrink-0">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4 ring-1 ring-slate-100/50">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <i className="fa-solid fa-headset"></i>
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Need Assistance?
                </p>
                <p className="text-[10px] text-slate-400 font-bold leading-relaxed mt-1">
                  Our support agents are available 24/7 to help you move
                  forward.
                </p>
                <button className="text-[10px] text-blue-600 font-black uppercase tracking-widest mt-2 flex items-center gap-1.5 hover:gap-2 transition-all">
                  Contact Support{" "}
                  <i className="fa-solid fa-arrow-right-long"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col bg-white relative h-full overflow-hidden">
          {/* Mobile UI */}
          <div className="md:hidden flex flex-col shrink-0 border-b border-slate-100">
            <div className="flex items-center justify-between p-5 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                  <i className="fa-solid fa-graduation-cap text-lg"></i>
                </div>
                <span className="font-black text-lg tracking-tighter text-slate-900">
                  ScholarHub
                </span>
              </div>
              <button
                onClick={() =>
                  onNavigate("scholarshipHubDetails", { id: scholarshipId })
                }
                className="w-10 h-10 flex items-center justify-center text-slate-400 bg-slate-50 rounded-full"
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
            <div className="px-5 pb-5">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                <span>Step {currentStep} of 5</span>
                <span className="text-blue-600">
                  {stepTitles[currentStep - 1]}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden ring-1 ring-slate-200/50">
                <div
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Desktop Close Button */}
          <button
            onClick={() =>
              onNavigate("scholarshipHubDetails", { id: scholarshipId })
            }
            className="hidden md:flex absolute top-8 right-8 z-20 w-12 h-12 bg-white hover:bg-slate-50 rounded-2xl items-center justify-center text-slate-400 hover:text-slate-600 border border-slate-100 shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            <i className="fa-solid fa-times text-lg"></i>
          </button>

          {/* Form Content */}
          <div
            id="form-scroll-container"
            className="flex-1 overflow-y-auto p-6 md:p-16 scrollbar-hide"
          >
            <div className="max-w-xl mx-auto">
              {/* STEP 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                      Personal Information
                    </h3>
                    <p className="text-slate-400 font-bold mt-2 text-sm">
                      Please provide your legal identity details for
                      verification.
                    </p>
                  </div>

                  <div className="space-y-8">
                    {/* Avatar Upload */}
                    <div className="flex items-center gap-6 p-1">
                      <div className="relative w-24 h-24 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center group cursor-pointer overflow-hidden hover:border-blue-500 hover:bg-blue-50 transition-all">
                        <i className="fa-solid fa-camera text-slate-300 group-hover:text-blue-500 transition-colors text-2xl group-hover:scale-110"></i>
                        <input
                          type="file"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          title="Upload Photo"
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-black text-slate-900 uppercase tracking-wider">
                          Profile Photo
                        </p>
                        <p className="text-[11px] text-slate-400 font-bold leading-relaxed">
                          Official photograph will be used for your scholarship
                          identification card.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 ml-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-600 focus:bg-white bg-slate-50/50 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
                          placeholder="e.g. Sarah"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 ml-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-600 focus:bg-white bg-slate-50/50 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
                          placeholder="e.g. Connor"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 ml-1">
                        Email Address
                      </label>
                      <div className="relative group">
                        <i className="fa-solid fa-envelope absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors"></i>
                        <input
                          type="email"
                          className="w-full pl-13 pr-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-600 focus:bg-white bg-slate-50/50 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
                          placeholder="name@domain.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 ml-1">
                          Phone Number
                        </label>
                        <div className="relative group">
                          <i className="fa-solid fa-phone absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors"></i>
                          <input
                            type="tel"
                            className="w-full pl-13 pr-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-600 focus:bg-white bg-slate-50/50 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
                            placeholder="+977 980..."
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 ml-1">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-600 focus:bg-white bg-slate-50/50 outline-none transition-all font-bold text-slate-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Academic Background */}
              {currentStep === 2 && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                      Academic Background
                    </h3>
                    <p className="text-slate-400 font-bold mt-2 text-sm">
                      Tell us about your previous educational achievements.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-600/20 flex gap-4 items-start border border-blue-500/50">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
                        <i className="fa-solid fa-lightbulb"></i>
                      </div>
                      <p className="text-[13px] font-bold leading-relaxed opacity-90">
                        Please include your most recent institution first. Your
                        GPA or percentage will be verified against original
                        transcripts.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 ml-1">
                        Institution Name
                      </label>
                      <div className="relative group">
                        <i className="fa-solid fa-school-flag absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors"></i>
                        <input
                          type="text"
                          className="w-full pl-13 pr-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-600 focus:bg-white bg-slate-50/50 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
                          placeholder="e.g. Kathmandu University"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 ml-1">
                          Degree Level
                        </label>
                        <div className="relative">
                          <select className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-600 focus:bg-white bg-slate-50/50 outline-none transition-all font-bold text-slate-900 appearance-none">
                            <option>SEE / O Levels</option>
                            <option>+2 / A Levels</option>
                            <option selected>Bachelor's Degree</option>
                            <option>Master's Degree</option>
                            <option>PhD / Research</option>
                          </select>
                          <i className="fa-solid fa-caret-down absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"></i>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 ml-1">
                          Field of Study
                        </label>
                        <input
                          type="text"
                          className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-600 focus:bg-white bg-slate-50/50 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
                          placeholder="e.g. Data Science"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      <div className="col-span-1 space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 ml-1">
                          Grade Point (GPA)
                        </label>
                        <input
                          type="text"
                          className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-600 focus:bg-white bg-slate-50/50 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
                          placeholder="3.90"
                        />
                      </div>
                      <div className="col-span-1 md:col-span-2 space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 ml-1">
                          Expected Graduation
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-600 focus:bg-white bg-slate-50/50 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
                            placeholder="2027"
                          />
                          <i className="fa-solid fa-calendar-alt absolute right-6 top-1/2 -translate-y-1/2 text-slate-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Upload Documents */}
              {currentStep === 3 && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                      Upload Documents
                    </h3>
                    <p className="text-slate-400 font-bold mt-2 text-sm">
                      Attach digital copies of your academic records.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        title: "Academic Transcript",
                        icon: "fa-file-lines",
                        req: true,
                        desc: "Submit your latest character and mark-sheet certificates.",
                        color: "blue",
                      },
                      {
                        title: "Recommendation Letter",
                        icon: "fa-certificate",
                        req: false,
                        desc: "A letter from your recently graduated school principal/dean.",
                        color: "indigo",
                      },
                    ].map((doc, i) => (
                      <div
                        key={i}
                        className="group relative bg-slate-50/50 rounded-2xl p-8 border-2 border-slate-100 hover:border-blue-600 hover:bg-white transition-all"
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex gap-4 items-center">
                            <div
                              className={`w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 transition-transform group-hover:scale-110`}
                            >
                              <i className={`fa-solid ${doc.icon} text-lg`}></i>
                            </div>
                            <div>
                              <h4 className="font-black text-slate-900 uppercase tracking-wider text-[13px]">
                                {doc.title}
                              </h4>
                              <p className="text-[11px] text-slate-400 font-bold mt-1 max-w-[200px] leading-relaxed">
                                {doc.desc}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-[0.1em] ${doc.req ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"}`}
                          >
                            {doc.req ? "Mandatory" : "Optional"}
                          </span>
                        </div>

                        <div className="border-2 border-dashed border-slate-200 rounded-2xl h-36 flex flex-col items-center justify-center cursor-pointer group-hover:bg-blue-50/30 group-hover:border-blue-400/50 transition-all">
                          <input
                            type="file"
                            className="hidden"
                            id={`doc-upload-${i}`}
                          />
                          <label
                            htmlFor={`doc-upload-${i}`}
                            className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
                          >
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-blue-500 shadow-sm border border-slate-100 mb-3 group-hover:bg-blue-500 group-hover:text-white transition-all">
                              <i className="fa-solid fa-cloud-arrow-up"></i>
                            </div>
                            <p className="text-[13px] font-black text-slate-700 tracking-tight">
                              Select PDF / JPEG file
                            </p>
                            <p className="text-[10px] text-slate-400 font-bold mt-1 italic">
                              Maximum file size: 12MB
                            </p>
                          </label>
                        </div>
                      </div>
                    ))}

                    <div className="space-y-4 pt-4">
                      <label className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 ml-1">
                        Scholarship Motivation Statement
                      </label>
                      <textarea
                        className="w-full px-6 py-6 rounded-2xl border-2 border-slate-100 focus:border-blue-600 focus:bg-white bg-slate-50/50 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300 resize-none leading-relaxed"
                        rows={5}
                        placeholder="Explain in 200 words why you are the ideal candidate for this scholarship..."
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Payment */}
              {currentStep === 4 && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                      Payment Gateway
                    </h3>
                    <p className="text-slate-400 font-bold mt-2 text-sm">
                      Securely pay the mandatory <b>NPR 500.00</b> processing
                      fee.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        {
                          id: "esewa",
                          name: "eSewa Wallet",
                          icon: "fa-wallet",
                          color: "#60bb46",
                          light: "#effcf0",
                        },
                        {
                          id: "khalti",
                          name: "Khalti Pay",
                          icon: "fa-bolt-lightning",
                          color: "#5c2d91",
                          light: "#f5f0ff",
                        },
                        {
                          id: "ime",
                          name: "IME Pay App",
                          icon: "fa-credit-card",
                          color: "#ed1821",
                          light: "#fff1f1",
                        },
                        {
                          id: "ips",
                          name: "ConnectIPS",
                          icon: "fa-landmark",
                          color: "#2563eb",
                          light: "#f0f5ff",
                        },
                      ].map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`p-6 rounded-2xl border-2 text-left transition-all relative group overflow-hidden ${
                            paymentMethod === method.id
                              ? "border-blue-600 bg-blue-50/50 ring-4 ring-blue-50"
                              : "border-slate-50 bg-slate-50/30 hover:border-slate-200 hover:bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-5">
                            <div
                              className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-sm"
                              style={{ backgroundColor: method.light }}
                            >
                              <i
                                className={`fa-solid ${method.icon} text-2xl`}
                                style={{ color: method.color }}
                              ></i>
                            </div>
                            <span className="font-black text-slate-900 uppercase tracking-widest text-[13px]">
                              {method.name}
                            </span>
                          </div>
                          {paymentMethod === method.id && (
                            <div className="absolute top-4 right-4 text-blue-600 animate-in zoom-in duration-300">
                              <i className="fa-solid fa-circle-check text-xl"></i>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="p-8 rounded-2xl border-2 border-slate-100 bg-slate-50/30">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                          Transaction Summary
                        </span>
                        <span className="text-[11px] font-black uppercase text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                          Secure SSL
                        </span>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between font-black text-slate-500 text-sm">
                          <span>Processing Fee</span>
                          <span>NPR 485.44</span>
                        </div>
                        <div className="flex justify-between font-black text-slate-500 text-sm">
                          <span>Service Charge</span>
                          <span>NPR 14.56</span>
                        </div>
                        <div className="pt-4 border-t border-slate-200 flex justify-between font-black text-slate-900 text-2xl tracking-tighter">
                          <span>Total Payable</span>
                          <span>NPR 500.00</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 p-5 rounded-2xl bg-orange-50/50 border border-orange-100">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                        <i className="fa-solid fa-shield-halved"></i>
                      </div>
                      <p className="text-[11px] font-bold text-orange-800 leading-relaxed">
                        ScholarHub uses military-grade encryption for all
                        payments. We do not store your credit card or wallet pin
                        information. 100% Secure Transaction.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Final Review */}
              {currentStep === 5 && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl shadow-xl shadow-green-500/10 ring-8 ring-green-50/50 rotate-[-5deg]">
                      <i className="fa-solid fa-file-signature"></i>
                    </div>
                    <h3 className="text-4xl font-black text-slate-900 tracking-tight">
                      Review & Sign
                    </h3>
                    <p className="text-slate-400 font-bold mt-2 px-10">
                      You're one step away from finishing your application
                      journey.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border-2 border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/50">
                    <div className="p-8 flex justify-between items-center border-b-2 border-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
                          <i className="fa-solid fa-list-check"></i>
                        </div>
                        <h4 className="font-black text-slate-900 uppercase tracking-widest text-[13px]">
                          Submission Summary
                        </h4>
                      </div>
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-all"
                      >
                        Modify
                      </button>
                    </div>

                    <div className="p-10 space-y-6">
                      <div className="flex justify-between items-center group">
                        <span className="text-[11px] font-black uppercase text-slate-400 tracking-widest">
                          Full Name
                        </span>
                        <span className="text-sm font-black text-slate-900 uppercase">
                          Sarah Jane Connor
                        </span>
                      </div>
                      <div className="h-px bg-slate-50 w-full"></div>
                      <div className="flex justify-between items-center group">
                        <span className="text-[11px] font-black uppercase text-slate-400 tracking-widest">
                          Scholarship Ref
                        </span>
                        <span className="text-sm font-black text-blue-600">
                          #{scholarshipId || "SCH-BR-2026-092"}
                        </span>
                      </div>
                      <div className="h-px bg-slate-50 w-full"></div>
                      <div className="flex justify-between items-center group">
                        <span className="text-[11px] font-black uppercase text-slate-400 tracking-widest">
                          Payment Method
                        </span>
                        <span className="flex items-center gap-2 text-sm font-black text-green-600">
                          <i className="fa-solid fa-circle-check"></i> Verified{" "}
                          {paymentMethod.toUpperCase()}
                        </span>
                      </div>
                      <div className="h-px bg-slate-50 w-full"></div>
                      <div className="flex justify-between items-center group">
                        <span className="text-[11px] font-black uppercase text-slate-400 tracking-widest">
                          Documents
                        </span>
                        <div className="flex gap-2">
                          <div
                            className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs"
                            title="Transcript"
                          >
                            <i className="fa-solid fa-file-pdf"></i>
                          </div>
                          <div
                            className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs"
                            title="ID Card"
                          >
                            <i className="fa-solid fa-id-card"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-8 bg-slate-50 border-t-2 border-slate-200/50">
                      <label className="flex items-start gap-4 cursor-pointer">
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            className="w-6 h-6 rounded-xl border-2 border-slate-200 text-blue-600 focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer"
                          />
                        </div>
                        <span className="text-[11px] text-slate-500 font-bold leading-relaxed select-none">
                          I hereby declare that all information provided in this
                          application is accurate and true. I understand that
                          StudSphere reserves the right to cancel my application
                          if any fraud or misrepresentation is detected at any
                          stage.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Fixed Footer Actions */}
          <div className="p-8 md:px-16 border-t border-slate-100 flex justify-between items-center bg-white z-20 shrink-0">
            <button
              onClick={prevStep}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[12px] uppercase tracking-widest transition-all ${
                currentStep === 1
                  ? "invisible"
                  : "text-slate-400 hover:text-slate-900 hover:bg-slate-50 animate-in fade-in"
              }`}
            >
              <i className="fa-solid fa-arrow-left-long"></i> Back Step
            </button>

            <button
              onClick={nextStep}
              disabled={isSubmitting || (currentStep === 4 && !paymentMethod)}
              className={`group flex items-center gap-4 px-10 py-4.5 rounded-2xl font-black text-[13px] uppercase tracking-[0.1em] shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 disabled:grayscale disabled:opacity-50 disabled:transform-none ${
                currentStep === totalSteps
                  ? "bg-green-600 shadow-green-600/30 text-white"
                  : currentStep === 4 && !paymentMethod
                    ? "bg-slate-200 text-slate-400 shadow-none"
                    : "bg-blue-600 shadow-blue-600/30 text-white"
              }`}
            >
              {isSubmitting ? (
                <>
                  Finalizing...{" "}
                  <i className="fa-solid fa-spinner animate-spin ml-2"></i>
                </>
              ) : currentStep === totalSteps ? (
                <>
                  Submit Final Application{" "}
                  <i className="fa-solid fa-paper-plane text-sm transition-transform group-hover:translate-x-1"></i>
                </>
              ) : currentStep === 4 &&
                paymentMethod &&
                paymentMethod !== "ips" ? (
                <>
                  Connect {paymentMethod.toUpperCase()} Wallet{" "}
                  <i className="fa-solid fa-arrow-up-right-from-square text-xs ml-1 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"></i>
                </>
              ) : (
                <>
                  Next Step{" "}
                  <i className="fa-solid fa-arrow-right-long text-sm transition-transform group-hover:translate-x-1"></i>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipApplicationPage;

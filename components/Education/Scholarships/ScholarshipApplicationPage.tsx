import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

interface ScholarshipApplicationPageProps {
  onNavigate?: (view: string, data?: any) => void;
  scholarshipId?: string | null;
  scholarshipName?: string;
  onClose?: () => void;
}

type PaymentMethod = "" | "esewa" | "khalti" | "ime" | "manual";

const totalSteps = 5;
const stepTitles = ["Personal Info", "Background", "Documents", "Payment", "Review"];

const ScholarshipApplicationPage: React.FC<ScholarshipApplicationPageProps> = ({
  onNavigate,
  scholarshipId,
  scholarshipName,
  onClose,
}) => {
  const location = useLocation();
  const routeState = (location.state as any) || {};

  const resolvedScholarshipId = scholarshipId ?? routeState?.id ?? null;
  const resolvedScholarshipName =
    scholarshipName ?? routeState?.scholarshipName ?? routeState?.title ?? "Scholarship Application";

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("Unpaid");

  const [fullName, setFullName] = useState({ firstName: "", lastName: "" });
  const [email, setEmail] = useState("");
  const [education, setEducation] = useState("Bachelor's in CS");

  const stepProgress = useMemo(() => Math.round((currentStep / totalSteps) * 100), [currentStep]);

  useEffect(() => {
    const container = document.getElementById("scholarship-application-scroll");
    if (container) {
      container.scrollTop = 0;
    }
  }, [currentStep]);

  const closeModal = () => {
    if (onClose) {
      onClose();
      return;
    }

    if (!onNavigate) return;

    const returnTo = routeState?.returnTo || "scholarshipHubDetails";
    const returnPayload = routeState?.returnToData || (resolvedScholarshipId ? { id: String(resolvedScholarshipId) } : undefined);
    onNavigate(returnTo, returnPayload);
  };

  const selectPayment = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
  };

  const submitForm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      closeModal();
    }, 1400);
  };

  const handleNext = () => {
    if (currentStep === 4) {
      if (!selectedPaymentMethod) {
        return;
      }

      if (selectedPaymentMethod !== "manual") {
        setIsRedirecting(true);
        setTimeout(() => {
          setIsRedirecting(false);
          setPaymentStatus(`Paid via ${selectedPaymentMethod.toUpperCase()}`);
          setCurrentStep(5);
        }, 1800);
        return;
      }

      setPaymentStatus("Voucher Uploaded");
    }

    if (currentStep === totalSteps) {
      submitForm();
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const goToStep = (step: number) => {
    if (step < 1 || step > totalSteps) return;
    setCurrentStep(step);
  };

  const renderStepCircle = (step: number) => {
    const isComplete = step < currentStep;
    const isActive = step === currentStep;

    if (isComplete) {
      return (
        <div className="relative z-10 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shadow-sm shrink-0">
          <i className="fa-solid fa-check text-xs"></i>
        </div>
      );
    }

    if (isActive && step === 1) {
      return (
        <div className="relative z-10 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/30 shrink-0">
          <i className="fa-solid fa-user text-xs"></i>
        </div>
      );
    }

    if (isActive) {
      return (
        <div className="relative z-10 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/30 shrink-0">
          <span className="text-xs font-bold">{step}</span>
        </div>
      );
    }

    return (
      <div className="relative z-10 w-8 h-8 rounded-full bg-white border-2 border-slate-300 text-slate-400 flex items-center justify-center shrink-0">
        <span className="text-xs font-bold">{step}</span>
      </div>
    );
  };

  const paymentButtonLabel = useMemo(() => {
    if (currentStep === totalSteps) return "Submit Application";
    if (currentStep === 4 && selectedPaymentMethod && selectedPaymentMethod !== "manual") {
      const names = { esewa: "eSewa", khalti: "Khalti", ime: "IME Pay", manual: "Bank Voucher" } as const;
      return `Pay with ${names[selectedPaymentMethod]}`;
    }
    return "Next Step";
  }, [currentStep, selectedPaymentMethod]);

  const summaryName = `${fullName.firstName || "Sarah"} ${fullName.lastName || "Connor"}`;

  return (
    <div className="fixed inset-0 z-[120] bg-black/45 backdrop-blur-[2px] flex items-center justify-center p-4">
      {isRedirecting && (
        <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <h3 className="text-xl font-bold text-slate-800">Redirecting to Payment Gateway...</h3>
          <p className="text-slate-500 mt-2">Please do not close this window.</p>
        </div>
      )}

      <div className="relative w-full max-w-6xl h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        <div className="hidden md:flex w-1/3 bg-slate-50 border-r border-slate-200 flex-col relative h-full">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <div className="p-8 pb-4 relative z-10 shrink-0">
            <div className="flex items-center gap-3 mb-6 text-blue-700">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-blue-100">
                <i className="fa-solid fa-graduation-cap text-blue-600"></i>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">ScholarHub</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 leading-tight">Complete your<br />application</h2>
            <p className="text-slate-500 text-sm mt-2">Track your progress via the steps below.</p>
          </div>

          <div className="flex-1 px-8 py-2 overflow-y-auto relative">
            <div className="space-y-0">
              {stepTitles.map((title, index) => {
                const step = index + 1;
                const isCurrent = step === currentStep;

                return (
                  <button
                    key={title}
                    type="button"
                    onClick={() => goToStep(step)}
                    className="step-item relative w-full text-left pb-8 flex gap-4 group"
                  >
                    {step !== totalSteps && (
                      <div
                        className={`absolute left-[15px] top-9 bottom-[-10px] w-[2px] ${step <= currentStep ? "bg-blue-600" : "bg-slate-200"}`}
                      ></div>
                    )}
                    {renderStepCircle(step)}
                    <div className="pt-1">
                      <p className={`text-sm transition-colors ${isCurrent ? "font-bold text-slate-900" : "font-medium text-slate-500"}`}>
                        {title}
                      </p>
                      <p className="text-xs text-slate-400">
                        {step === 1 && "Basic details & contact"}
                        {step === 2 && "Education & history"}
                        {step === 3 && "Upload transcripts"}
                        {step === 4 && "Secure gateway"}
                        {step === 5 && "Final check"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-8 mt-auto relative z-10 shrink-0">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-blue-100/50 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <i className="fa-solid fa-life-ring"></i>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Need Help?</p>
                <button type="button" className="text-[11px] text-blue-600 font-medium hover:underline">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-white relative h-full overflow-hidden">
          <button
            onClick={closeModal}
            className="hidden md:flex absolute top-6 right-6 z-20 w-10 h-10 bg-white hover:bg-slate-50 rounded-full items-center justify-center text-slate-400 hover:text-slate-600 border border-slate-100 shadow-sm transition-colors"
            title="Close"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-100 bg-white z-20 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm">
                <i className="fa-solid fa-graduation-cap text-xs"></i>
              </div>
              <span className="font-bold text-slate-800">ScholarHub</span>
            </div>
            <button onClick={closeModal} className="w-8 h-8 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="md:hidden bg-slate-50 px-4 py-2 border-b border-slate-100 shrink-0">
            <div className="flex justify-between text-xs font-medium text-slate-500 mb-2">
              <span>Step {currentStep} of 5</span>
              <span>{stepTitles[currentStep - 1]}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" style={{ width: `${stepProgress}%` }}></div>
            </div>
          </div>

          <div id="scholarship-application-scroll" className="flex-1 overflow-y-auto p-6 md:p-12">
            <form className="max-w-2xl mx-auto space-y-8 pb-4" onSubmit={(e) => e.preventDefault()}>
              {currentStep === 1 && (
                <div>
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-slate-900">Personal Information</h3>
                    <p className="text-slate-500 mt-1">Please provide your legal identification details.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-5">
                      <div className="relative w-20 h-20 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center group cursor-pointer overflow-hidden hover:border-blue-500 transition-colors">
                        <i className="fa-solid fa-camera text-slate-400 group-hover:text-blue-500"></i>
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" title="Upload profile" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">Profile Photo</p>
                        <p className="text-xs text-slate-500 mt-1">Recommended 400x400px</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-2">First Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                          placeholder="e.g., Sarah"
                          value={fullName.firstName}
                          onChange={(e) => setFullName((prev) => ({ ...prev, firstName: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-2">Last Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                          placeholder="e.g., Connor"
                          value={fullName.lastName}
                          onChange={(e) => setFullName((prev) => ({ ...prev, lastName: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">Email Address</label>
                      <div className="relative">
                        <i className="fa-regular fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                        <input
                          type="email"
                          className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                          placeholder="sarah@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-2">Phone Number</label>
                        <div className="relative">
                          <i className="fa-solid fa-phone absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                          <input
                            type="tel"
                            className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                            placeholder="+977 98..."
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-2">Date of Birth</label>
                        <input
                          type="date"
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-600 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-slate-900">Academic Background</h3>
                    <p className="text-slate-500 mt-1">Tell us about your educational history.</p>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3">
                      <i className="fa-solid fa-circle-info text-blue-600 mt-0.5"></i>
                      <p className="text-sm text-blue-800">Please include your most recent institution first. GPA should be converted to a 4.0 scale.</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">Institution Name</label>
                      <div className="relative">
                        <i className="fa-solid fa-school absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                        <input type="text" className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" placeholder="University or College" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-2">Degree Level</label>
                        <select
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                          onChange={(e) => setEducation(`${e.target.value} in CS`)}
                        >
                          <option>High School Diploma</option>
                          <option>Bachelor's Degree</option>
                          <option>Master's Degree</option>
                          <option>PhD</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-2">Field of Study</label>
                        <input type="text" className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" placeholder="Computer Science" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-slate-900">Upload Documents</h3>
                    <p className="text-slate-500 mt-1">Upload your required files for verification.</p>
                  </div>
                  <div className="space-y-5">
                    {["Academic Transcript", "Letter of Recommendation"].map((label, index) => (
                      <div key={label} className="p-5 border border-slate-200 rounded-xl bg-slate-50/50">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-slate-800">{label}</h4>
                            <p className="text-xs text-slate-500 mt-1">PDF or DOCX upload.</p>
                          </div>
                          <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-1 rounded font-medium">
                            {index === 0 ? "REQUIRED" : "OPTIONAL"}
                          </span>
                        </div>
                        <div className="relative h-28 rounded-lg border-2 border-dashed border-slate-300 bg-white hover:bg-blue-50 hover:border-blue-300 transition-colors flex items-center justify-center text-center cursor-pointer">
                          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" title={label} />
                          <div>
                            <i className="fa-solid fa-cloud-arrow-up text-blue-500"></i>
                            <p className="text-sm text-slate-600 mt-2">Click to upload or drag & drop</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div>
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-slate-900">Payment Gateway</h3>
                    <p className="text-slate-500 mt-1">Select a secure payment method to pay the <b>NPR 500.00</b> application fee.</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-3">Select Wallet / Gateway</label>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { key: "esewa", label: "eSewa", icon: "fa-wallet" },
                          { key: "khalti", label: "Khalti", icon: "fa-bolt" },
                          { key: "ime", label: "IME Pay", icon: "fa-credit-card" },
                          { key: "manual", label: "Bank Voucher", icon: "fa-receipt" },
                        ].map((method) => {
                          const isSelected = selectedPaymentMethod === method.key;
                          return (
                            <button
                              key={method.key}
                              type="button"
                              onClick={() => selectPayment(method.key as PaymentMethod)}
                              className={`rounded-xl p-4 border-2 transition-all relative bg-white hover:-translate-y-0.5 ${
                                isSelected ? "border-blue-600 bg-blue-50 shadow" : "border-slate-200 hover:border-slate-300"
                              }`}
                            >
                              <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                                  <i className={`fa-solid ${method.icon} text-slate-700`}></i>
                                </div>
                                <span className="font-bold text-slate-700 text-sm">{method.label}</span>
                              </div>
                              {isSelected && <i className="fa-solid fa-circle-check absolute top-2 right-2 text-blue-600"></i>}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {selectedPaymentMethod === "manual" && (
                      <div className="space-y-4 pt-4 border-t border-slate-100">
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-xs text-yellow-800">
                          <strong>Bank Details:</strong><br />
                          Bank: Nabil Bank Ltd.<br />
                          Account: 02100100234<br />
                          Name: ScholarHub Inc.
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-600 mb-2">Voucher Number</label>
                          <input type="text" className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" placeholder="Enter Reference No." />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div>
                  <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5 text-green-600 ring-8 ring-green-50/50">
                      <i className="fa-solid fa-check text-2xl"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">All Set!</h3>
                    <p className="text-slate-500 mt-2 max-w-sm mx-auto">Review your details before submitting this application.</p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                      <h4 className="font-bold text-slate-800">Application Summary</h4>
                      <button type="button" onClick={() => goToStep(1)} className="text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wide">
                        Edit
                      </button>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between"><span className="text-sm text-slate-500">Scholarship</span><span className="text-sm font-semibold text-slate-900">{resolvedScholarshipName}</span></div>
                      <div className="flex justify-between"><span className="text-sm text-slate-500">Applicant</span><span className="text-sm font-semibold text-slate-900">{summaryName}</span></div>
                      <div className="flex justify-between"><span className="text-sm text-slate-500">Email</span><span className="text-sm font-semibold text-slate-900">{email || "sarah@example.com"}</span></div>
                      <div className="flex justify-between"><span className="text-sm text-slate-500">Education</span><span className="text-sm font-semibold text-slate-900">{education}</span></div>
                      <div className="flex justify-between"><span className="text-sm text-slate-500">Payment Status</span><span className="text-sm font-semibold text-slate-900">{paymentStatus}</span></div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="bg-white p-5 md:px-10 border-t border-slate-100 flex justify-between items-center z-10 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              className={`text-slate-500 hover:text-slate-800 font-semibold text-sm px-6 py-2 rounded-lg transition-colors ${currentStep === 1 ? "invisible" : "visible"}`}
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting || (currentStep === 4 && !selectedPaymentMethod)}
              className={`font-semibold text-sm px-8 py-2.5 rounded-lg shadow-lg transition-all flex items-center gap-2 ${
                currentStep === totalSteps
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              } disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none`}
            >
              {isSubmitting ? (
                <>
                  Processing...
                  <i className="fa-solid fa-spinner animate-spin text-xs"></i>
                </>
              ) : (
                <>
                  {paymentButtonLabel}
                  <i className={`fa-solid ${currentStep === totalSteps ? "fa-paper-plane" : "fa-arrow-right"} text-xs`}></i>
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

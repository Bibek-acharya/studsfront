import React, { useState, useEffect } from "react";
import SignupView from "./SignupView";
import LoginView from "./LoginView";
import OtpView from "./OtpView";
import ForgotPasswordView from "./ForgotPasswordView";

interface AuthContainerProps {
  type: "login" | "signup";
  onSwitch: () => void;
  onSuccess: () => void;
  onClose: () => void;
}

const AuthContainer: React.FC<AuthContainerProps> = ({
  type,
  onSwitch,
  onSuccess,
  onClose,
}) => {
  const [phase, setPhase] = useState<"form" | "otp" | "forgotPassword">(
    type === "signup" ? "form" : "form",
  );
  const [tempUserData, setTempUserData] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselItems = [
    {
      title: "Your bridge to a brighter future",
      description:
        "Connecting you to top-tier academic and professional opportunities worldwide.",
    },
    {
      title: "Access world-class career tools",
      description:
        "Build a professional resume, prepare for exams, and find your next big opportunity.",
    },
    {
      title: "Skills for the Modern Workforce",
      description:
        "Bridging the gap between graduation and employment with direct employer connections.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSignupData = (data: any) => {
    onSuccess({
      name: data.fullName,
      email: data.email,
      role: data.userType,
    });
  };

  const handleForgotPassword = (email: string) => {
    setTempUserData({ email });
   // In the future, this can be updated to verify OTP if needed
    onSuccess();
  };

  const handleOtpVerified = () => {
    if (phase === "otp" && tempUserData?.email && !tempUserData?.fullName) {
      // It was forgot password flow
      alert("Password reset success! Please login with your new password.");
      setPhase("form");
      return;
    }

    if (tempUserData) {
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex bg-white font-sans overflow-hidden">
      {/* LEFT PANEL: CONTENT */}
      <section className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto relative no-scrollbar">
        <button
          onClick={onClose}
          className="absolute top-8 left-8 text-slate-400 hover:text-slate-900 transition flex items-center gap-2 text-sm font-semibold group"
        >
          <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1"></i>{" "}
          Back to Site
        </button>

        <div className="w-full max-w-[480px]">
          {phase === "forgotPassword" ? (
            <ForgotPasswordView
              onBack={() => setPhase("form")}
              onSubmit={handleForgotPassword}
            />
          ) : type === "login" ? (
            <LoginView
              onSwitch={onSwitch}
              onSuccess={onSuccess}
              onForgotPassword={() => setPhase("forgotPassword")}
            />
          ) : phase === "form" ? (
            <SignupView
              onSwitch={onSwitch}
              onSignup={handleSignupData}
              onForgotPassword={() => setPhase("forgotPassword")}
            />
          ) : (
            <OtpView
              identifier={tempUserData?.email || tempUserData?.phone || ""}
              type={tempUserData?.email ? "email" : "phone"}
              onVerified={handleOtpVerified}
            />
          )}
        </div>
      </section>

      {/* RIGHT PANEL: ILLUSTRATION */}
      <section className="hidden lg:flex flex-1 bg-primary-600 flex-col justify-center items-center p-12 relative overflow-hidden text-white">
        <div className="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] rounded-full bg-white/10 blur-[80px]"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[150px] h-[150px] rounded-2xl bg-white/10 rotate-45 blur-[40px]"></div>

        <div className="relative z-10 text-center max-w-[450px]">
          <div className="mb-12">
            <svg
              className="w-full max-w-[400px] h-auto drop-shadow-2xl mx-auto"
              viewBox="0 0 400 300"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="200" cy="150" r="130" fill="white" opacity="0.1" />
              <rect
                x="50"
                y="80"
                width="30"
                height="30"
                rx="4"
                fill="#F59E0B"
                opacity="0.5"
                className="animate-float"
              />
              <circle
                cx="350"
                cy="200"
                r="20"
                fill="#F59E0B"
                opacity="0.5"
                className="animate-float"
                style={{ animationDelay: "1s" }}
              />

              <path
                d="M140,280 C140,220 260,220 260,280 L260,300 L140,300 Z"
                fill="#1E40AF"
              />
              <rect x="185" y="190" width="30" height="40" fill="#FDBA74" />
              <circle cx="200" cy="160" r="45" fill="#FDBA74" />
              <path
                d="M150,150 C150,100 250,100 250,150 C250,180 240,160 200,160 C160,160 150,180 150,150 Z"
                fill="#1E293B"
              />

              <rect
                x="220"
                y="230"
                width="60"
                height="40"
                rx="4"
                fill="white"
                transform="rotate(-10 220 230)"
              />
              <rect
                x="225"
                y="235"
                width="50"
                height="30"
                rx="2"
                fill="#E2E8F0"
                transform="rotate(-10 220 230)"
              />
              <circle cx="215" cy="240" r="12" fill="#FDBA74" />

              <path
                d="M280,100 L290,90 L310,110 L280,100 Z"
                fill="#F59E0B"
                className="animate-float"
              />
            </svg>
          </div>

          <div className="h-[200px] flex flex-col justify-center transition-all duration-500">
            <h2 className="text-3xl font-bold mb-6 leading-tight animate-fadeIn">
              {carouselItems[currentSlide].title}
            </h2>
            <p className="text-lg opacity-90 leading-relaxed mb-8 h-[60px] animate-fadeIn">
              {carouselItems[currentSlide].description}
            </p>
          </div>

          <div className="flex gap-2 justify-center">
            {carouselItems.map((_, idx) => (
              <span
                key={idx}
                className={`transition-all duration-300 rounded-full h-2 ${idx === currentSlide ? "w-8 bg-white" : "w-2 bg-white/40"}`}
              ></span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthContainer;

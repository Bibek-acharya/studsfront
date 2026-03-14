import React, { useState } from "react";
import SignupView from "./SignupView";
import LoginView from "./LoginView";
import OtpView from "./OtpView";
import ForgotPasswordView from "./ForgotPasswordView";

interface AuthContainerProps {
  type: "login" | "signup";
  onAuthSuccess: () => void;
  onClose?: () => void;
}

const AuthContainer: React.FC<AuthContainerProps> = ({
  type,
  onAuthSuccess,
  onClose,
}) => {
  const [view, setView] = useState<"login" | "signup">(type);
  const [phase, setPhase] = useState<"form" | "otp" | "forgotPassword">("form");
  const [pendingEmail, setPendingEmail] = useState<string>("");

  const handleSignupSuccess = (email: string) => {
    setPendingEmail(email);
    setPhase("otp");
  };

  const handleOtpVerified = () => {
    onAuthSuccess();
  };

  const handleOtpBack = () => {
    setPhase("form");
    setPendingEmail("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-8 font-sans antialiased">
      <div className="bg-white w-full max-w-[450px] relative rounded-2xl shadow-2xl overflow-hidden">
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors focus:outline-none"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <div className="p-6 sm:p-8 lg:p-10 overflow-y-auto no-scrollbar" style={{ maxHeight: '95vh' }}>
          {phase === "forgotPassword" ? (
            <ForgotPasswordView
              onBack={() => setPhase("form")}
              onSubmit={(email: string) => {
                setPendingEmail(email);
                setPhase("otp");
              }}
            />
          ) : phase === "otp" ? (
            <OtpView
              identifier={pendingEmail}
              type="email"
              onVerified={handleOtpVerified}
              onBack={handleOtpBack}
            />
          ) : view === "login" ? (
            <LoginView
              onSwitch={() => setView("signup")}
              onSuccess={onAuthSuccess}
              onForgotPassword={() => setPhase("forgotPassword")}
            />
          ) : (
            <SignupView
              onSwitch={() => setView("login")}
              onSignupSuccess={handleSignupSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;

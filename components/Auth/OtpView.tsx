import React, { useState, useRef, useEffect } from "react";

interface OtpViewProps {
  identifier: string;
  type?: "phone" | "email";
  onVerified: () => void;
}

const OtpView: React.FC<OtpViewProps> = ({
  identifier,
  type = "phone",
  onVerified,
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (val: string, index: number) => {
    if (!/^[0-9]?$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some((v) => !v)) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onVerified();
    }, 1500);
  };

  return (
    <div className="animate-fadeInUp text-center">
      <div className="inline-flex items-center gap-2 mb-10">
        <img src="/logo-blue.png" alt="StudSphere" className="h-10 w-auto" />
      </div>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {type === "phone" ? "Verify Phone" : "Verify Email"}
        </h1>
        <p className="text-slate-500 font-medium">
          We've sent a 6-digit code to{" "}
          <strong className="text-slate-900">
            {type === "phone"
              ? `+977 ${identifier.slice(0, 3)}...${identifier.slice(-3)}`
              : identifier}
          </strong>
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-8">
        <div className="flex justify-between gap-2 max-w-[340px] mx-auto">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              // Fix: Wrapped assignment in braces to return void and satisfy Ref type
              ref={(el) => {
                inputsRef.current[idx] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="w-12 h-14 bg-slate-50 border border-slate-200 rounded-xl text-center text-2xl font-bold focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading || otp.some((v) => !v)}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-bold rounded-xl shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {loading ? (
            <i className="fa-solid fa-spinner animate-spin"></i>
          ) : (
            "Verify & Continue"
          )}
        </button>

        <div className="space-y-4">
          <p className="text-sm text-slate-500 font-medium">
            Didn't receive the code?{" "}
            <button
              type="button"
              className="text-blue-600 font-bold hover:underline"
            >
              Resend
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default OtpView;

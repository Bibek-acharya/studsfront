import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../services/AuthContext";
import { apiService } from "../../services/api";

interface OtpViewProps {
  identifier: string;
  type?: "phone" | "email";
  onVerified: () => void;
  onBack?: () => void;
}

const OtpView: React.FC<OtpViewProps> = ({
  identifier,
  type = "phone",
  onVerified,
  onBack,
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const { verifyOTP } = useAuth();

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (val: string, index: number) => {
    if (!/^[0-9]?$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    setError("");

    if (val && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some((v) => !v)) return;

    setLoading(true);
    setError("");
    try {
      await verifyOTP(identifier, otp.join(""));
      onVerified();
    } catch (err: any) {
      setError(err.message || "Invalid or expired code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError("");
    setSuccess("");
    try {
      await apiService.sendOTP(identifier);
      setSuccess("New code sent to your email!");
      setOtp(["", "", "", "", "", ""]);
      inputsRef.current[0]?.focus();
    } catch (err: any) {
      setError(err.message || "Failed to resend code.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="animate-fadeInUp text-center">
      <div className="inline-flex items-center gap-2 mb-8">
        <img src="/logo-blue.png" alt="StudSphere" className="h-10 w-auto" />
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {type === "phone" ? "Verify Phone" : "Verify Email"}
        </h1>
        <p className="text-slate-500 font-medium text-sm">
          We've sent a 6-digit code to{" "}
          <strong className="text-slate-900">
            {type === "phone"
              ? `+977 ${identifier.slice(0, 3)}...${identifier.slice(-3)}`
              : identifier}
          </strong>
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-bold uppercase tracking-wider">
          <i className="fa-solid fa-circle-exclamation mr-2"></i>
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 text-xs font-bold uppercase tracking-wider">
          <i className="fa-solid fa-circle-check mr-2"></i>
          {success}
        </div>
      )}

      <form onSubmit={handleVerify} className="space-y-8">
        <div className="flex justify-between gap-2 max-w-[340px] mx-auto">
          {otp.map((digit, idx) => (
            <input
              key={idx}
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

        <div className="space-y-4">
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

          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="w-full py-4 bg-white border border-slate-200 text-slate-500 font-bold rounded-xl hover:bg-slate-50 transition-all text-sm"
            >
              Change Email
            </button>
          )}
        </div>

        <div className="space-y-4">
          <p className="text-sm text-slate-500 font-medium">
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="text-blue-600 font-bold hover:underline disabled:opacity-50"
            >
              {resending ? "Sending..." : "Resend Code"}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default OtpView;

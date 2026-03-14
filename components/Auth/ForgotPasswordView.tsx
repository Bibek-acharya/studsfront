import React, { useState } from "react";
import { apiService } from "../../services/api";

interface ForgotPasswordViewProps {
  onBack: () => void;
  onSubmit: (email: string) => void;
}

const ForgotPasswordView: React.FC<ForgotPasswordViewProps> = ({
  onBack,
  onSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiService.sendOTP(email);
      onSubmit(email);
    } catch (err: any) {
      setError(err.message || "Failed to send reset code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[360px] mx-auto flex flex-col py-4">
      {/* Back */}
      <button
        onClick={onBack}
        className="mb-6 text-gray-500 hover:text-gray-800 self-start flex items-center text-sm font-medium transition-colors focus:outline-none"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Login
      </button>

      {/* Logo */}
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-blue-600 text-white w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <span className="text-lg font-bold tracking-tight text-gray-900">StudSphere</span>
      </div>

      <h1 className="text-xl font-bold text-gray-900 mb-1">Reset Password</h1>
      <p className="text-gray-500 text-sm mb-6">
        Enter your email and we'll send you a 6-digit code to reset your password.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          </div>
          <input
            type="email"
            placeholder="Email Address"
            required
            disabled={loading}
            className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors placeholder:text-gray-400 disabled:bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg py-2.5 transition-colors duration-200 mt-2 shadow-md shadow-blue-600/30 flex items-center justify-center gap-2"
        >
          {loading ? (
            <i className="fa-solid fa-spinner animate-spin"></i>
          ) : (
            "Send Reset Code"
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordView;

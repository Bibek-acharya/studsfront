import React, { useState } from "react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending code
    setTimeout(() => {
      setLoading(false);
      onSubmit(email);
    }, 1500);
  };

  return (
    <div className="animate-fadeInUp">
      <div className="flex items-center gap-2 text-2xl font-bold text-blue-600 mb-0 mt-4">
        <i className="fa-solid fa-layer-group"></i>
        <span>StudSphere</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-[5px]">
          Reset Password
        </h1>
        <p className="text-slate-500 font-medium">
          Enter your email address and we'll send you a 6-digit code to reset
          your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@mail.com"
            required
            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none font-medium text-slate-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold rounded-lg shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
        >
          {loading ? (
            <i className="fa-solid fa-spinner animate-spin"></i>
          ) : (
            "Send Reset Code"
          )}
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full text-center text-sm font-bold text-slate-500 hover:text-blue-600 transition uppercase tracking-widest"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordView;

import React, { useState } from "react";
import { useAuth } from '../../services/AuthContext';

interface LoginViewProps {
  onSwitch: () => void;
  onSuccess: (user: { name: string; email: string; role: string }) => void;
  onForgotPassword: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({
  onSwitch,
  onSuccess,
  onForgotPassword,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      onSuccess({
        name: email.split('@')[0],
        email: email,
        role: "student",
      });
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fadeInUp">
      <div className="flex items-center gap-2 mb-6">
        <img src="/logo-blue.png" alt="StudSphere" className="h-10 w-auto" />
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-[5px]">
          Welcome Back
        </h1>
        <p className="text-slate-500 font-medium">
          New to StudSphere?{" "}
          <button
            onClick={onSwitch}
            className="text-blue-600 font-bold hover:underline"
          >
            Create Account
          </button>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium text-sm">{error}</p>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">
            Email Address
          </label>
          <input
            type="email"

            placeholder="example@mail.com"

            required
            disabled={loading}
            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none font-medium text-slate-900 disabled:bg-slate-100"
            value={email}

            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">
            Password
          </label>
          <input
            type="password"

            placeholder="Enter your password"

            required
            disabled={loading}
            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none font-medium text-slate-900 disabled:bg-slate-100"
            value={password}

            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-end mt-1.5">
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-wide"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold rounded-lg shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
        >
          {loading ? (
            <i className="fa-solid fa-spinner animate-spin"></i>
          ) : (
            "Sign In"
          )}
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest mt-10">
            <span className="bg-white px-4 text-slate-400">
              or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button
            type="button"
            onClick={() => window.location.href = `http://localhost:8080/api/v1/auth/google`}
            className="flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all font-bold text-sm text-slate-700"
          >
            <i className="fa-brands fa-google text-lg"></i>
            Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginView;

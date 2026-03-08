import React, { useState } from "react";
import { useAuth } from '../../services/AuthContext';

interface SignupViewProps {
  onSwitch: () => void;
  onSignupSuccess: (email: string) => void;
}

const SignupView: React.FC<SignupViewProps> = ({ onSwitch, onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    educationLevel: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    upper: false,
    number: false,
  });
  const { register } = useAuth();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (id === "password") {
      setPasswordCriteria({
        length: value.length >= 8,
        upper: /[A-Z]/.test(value),
        number: /[0-9]/.test(value),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!passwordCriteria.length || !passwordCriteria.upper || !passwordCriteria.number) {
      setError("Please meet all password requirements");
      return;
    }

    setLoading(true);

    try {
      const [firstName, ...lastNameParts] = formData.fullName.trim().split(' ');
      const lastName = lastNameParts.join(' ') || firstName;

      const res = await register(
        formData.email,
        formData.password,
        firstName,
        lastName,
        'student',
        formData.educationLevel
      );

      if (res?.requires_otp) {
        onSignupSuccess(formData.email);
        return;
      }

      // If we're here, it means we're verified or it was a direct register success
      // In either case, current session should be logged in via AuthContext register()
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fadeInUp">
      <div className="flex items-center gap-2 mb-4 mt-4">
        <img src="/logo-blue.png" alt="StudSphere" className="h-10 w-auto" />
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-[5px]">
          Create Account
        </h1>
        <p className="text-slate-500 font-medium">
          Already have an account?{" "}
          <button
            onClick={onSwitch}
            className="text-blue-600 font-bold hover:underline"
          >
            Log In
          </button>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium text-sm">{error}</p>
          </div>
        )}

        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Jagdis Dhami"
            required
            disabled={loading}
            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none font-medium text-slate-900 disabled:bg-slate-100"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="example@mail.com"
            required
            disabled={loading}
            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none font-medium text-slate-900 disabled:bg-slate-100"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        {/* Education Level */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Education Level</label>
          <select
            id="educationLevel"
            required
            disabled={loading}
            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none font-medium text-slate-900 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%232563EB%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')] bg-[length:1em] bg-[right_1rem_center] bg-no-repeat disabled:bg-slate-100"
            value={formData.educationLevel}
            onChange={handleInputChange}
          >
            <option value="" disabled>Select your level</option>
            <option value="+2">+2 / High School</option>
            <option value="bachelors">Bachelor's Degree</option>
            <option value="masters">Master's Degree</option>
            <option value="phd">PhD / Doctorate</option>
          </select>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Create a strong password"
              required
              disabled={loading}
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none font-medium text-slate-900 pr-12 disabled:bg-slate-100"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition disabled:opacity-50"
            >
              <i className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
          </div>

          <div className="mt-3 space-y-1">
            {!passwordCriteria.length && (
              <Criteria text="At least 8 characters" valid={passwordCriteria.length} />
            )}
            {!passwordCriteria.upper && (
              <Criteria text="At least one uppercase letter" valid={passwordCriteria.upper} />
            )}
            {!passwordCriteria.number && (
              <Criteria text="At least one number" valid={passwordCriteria.number} />
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold rounded-xl shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
        >
          {loading ? (
            <><i className="fa-solid fa-spinner animate-spin"></i> Creating account...</>
          ) : (
            <>Create Account <i className="fa-solid fa-arrow-right text-sm"></i></>
          )}
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest">
            <span className="bg-white px-4 text-slate-400">or join with</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => window.location.href = `http://localhost:8080/api/v1/auth/google`}
          className="w-full flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-bold text-sm text-slate-700"
        >
          <i className="fa-brands fa-google text-lg"></i>
          Continue with Google
        </button>

        <p className="text-xs text-slate-400 text-center leading-relaxed">
          By creating an account, you agree to our{" "}
          <a href="/terms" className="text-blue-600 font-bold hover:underline">Terms of Service</a>{" "}
          and{" "}
          <a href="/privacy" className="text-blue-600 font-bold hover:underline">Privacy Policy</a>.
        </p>
      </form>
    </div>
  );
};

const Criteria: React.FC<{ text: string; valid: boolean }> = ({ text, valid }) => (
  <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide transition-colors ${valid ? "text-green-600" : "text-slate-400"}`}>
    <i className={`fa-solid ${valid ? "fa-circle-check" : "fa-circle-info"}`}></i>{" "}
    {text}
  </div>
);

export default SignupView;

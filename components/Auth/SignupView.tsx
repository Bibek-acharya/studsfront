import React, { useState, useRef, useEffect } from "react";
import { useAuth } from '../../services/AuthContext';

interface SignupViewProps {
  onSwitch: () => void;
  onSignupSuccess: (email: string) => void;
}

const SignupView: React.FC<SignupViewProps> = ({ onSwitch, onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    educationLevel: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { register } = useAuth();

  const studyLevels = [
    { value: "see", label: "SEE" },
    { value: "plus2", label: "+2" },
    { value: "bachelor", label: "Bachelor" },
    { value: "master", label: "Master" },
  ];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.educationLevel) {
      setError("Please select a study level.");
      return;
    }
    if (!agreedToTerms) {
      setError("Please agree to the Terms & Conditions.");
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
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[360px] mx-auto flex flex-col py-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-blue-600 text-white w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <span className="text-lg font-bold tracking-tight text-gray-900">StudSphere</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-1">Create an Account</h1>
      <p className="text-gray-500 text-sm mb-6">Enter your details to register.</p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        {/* Full Name */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            required
            disabled={loading}
            className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors placeholder:text-gray-400 disabled:bg-gray-50"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </div>

        {/* Email */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            disabled={loading}
            className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors placeholder:text-gray-400 disabled:bg-gray-50"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div className="absolute inset-y-0 left-[2.4rem] flex items-center pointer-events-none">
            <span className="text-sm font-medium text-gray-600">+977 -</span>
          </div>
          <input
            type="tel"
            name="phone"
            placeholder="98XXXXXXXX"
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit number"
            disabled={loading}
            className="w-full pl-[5.5rem] pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors placeholder:text-gray-400 disabled:bg-gray-50"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        {/* Study Level Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
          </div>
          <button
            type="button"
            onClick={() => !loading && setDropdownOpen(!dropdownOpen)}
            disabled={loading}
            className={`w-full pl-11 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm text-left focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors bg-white disabled:bg-gray-50 ${formData.educationLevel ? 'text-gray-900' : 'text-gray-400'}`}
          >
            {formData.educationLevel
              ? studyLevels.find(l => l.value === formData.educationLevel)?.label
              : "Select Study Level"}
          </button>
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
            <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {dropdownOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden">
              <ul className="py-1">
                {studyLevels.map((level) => (
                  <li
                    key={level.value}
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, educationLevel: level.value }));
                      setDropdownOpen(false);
                    }}
                    className="px-4 py-2.5 pl-11 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 cursor-pointer transition-colors"
                  >
                    {level.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}"
              title="Must contain at least one uppercase letter, one special character, and be at least 8 characters long."
              required
              disabled={loading}
              className="w-full pl-11 pr-11 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors placeholder:text-gray-400 disabled:bg-gray-50"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-[11px] text-gray-500 mt-1.5 ml-1">Must be 8+ chars with 1 uppercase &amp; 1 special character.</p>
        </div>

        {/* Terms */}
        <div className="flex items-center mt-1 mb-2">
          <label className="flex items-center cursor-pointer">
            <div className="relative flex items-center justify-center w-4 h-4 mr-2 flex-shrink-0">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="peer appearance-none w-4 h-4 border border-gray-300 rounded bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 transition-all cursor-pointer"
              />
              <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-xs text-gray-500 select-none">
              I agree to the{" "}
              <a href="/terms" className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                Terms &amp; Conditions
              </a>
            </span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white font-medium rounded-lg py-2.5 transition-colors duration-200 shadow-md flex items-center justify-center gap-2"
        >
          {loading ? (
            <i className="fa-solid fa-spinner animate-spin"></i>
          ) : (
            "Sign up"
          )}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-5">
        Already have an account?{" "}
        <button onClick={onSwitch} className="font-medium text-blue-600 hover:underline">
          Log in
        </button>
      </p>
    </div>
  );
};

export default SignupView;

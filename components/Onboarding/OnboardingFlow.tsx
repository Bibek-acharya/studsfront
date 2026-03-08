import React, { useState, useEffect } from "react";
import { useAuth } from '../../services/AuthContext';
import { useSavePreferencesMutation } from '../../services/query-hooks';

interface OnboardingFlowProps {
  onComplete: () => void;
  initialRole?: Role;
}

type Role = "student" | "job_seeker";
type Phase = "role" | "welcome" | "decision" | "flow" | "success";

const studentData = {
  welcome: {
    title: "Welcome to StudSphere",
    subtext: "Your academic journey, reimagined. Let's tailor your experience.",
    cta: "Get Started",
  },
  decision: {
    question: "What brings you here?",
    options: [
      {
        id: "studying",
        label: "I am currently studying",
        sub: "Manage my academics",
        icon: "fa-user-graduate",
        targetFlow: "flowA",
      },
      {
        id: "searching",
        label: "Searching for a college",
        sub: "Explore institutions",
        icon: "fa-magnifying-glass",
        targetFlow: "flowB",
      },
    ],
  },
  flowA: [
    {
      id: 'education_level',
      question: "Current Education Level",
      subtitle: "Where are you in your journey?",
      type: 'single',
      options: [
        { id: 'plus2', label: '+2 / High School', icon: 'fa-school' },
        { id: 'bachelors', label: "Bachelor's Degree", icon: 'fa-graduation-cap' },
        { id: 'masters', label: "Master's Degree", icon: 'fa-user-tie' }
      ]
    },
    {
      id: 'field_of_study',
      question: "Field of Study",
      subtitle: "What is your major focus?",
      type: 'single',
      options: [
        { id: 'science', label: 'Science & Technology', icon: 'fa-atom' },
        { id: 'management', label: 'Business & Management', icon: 'fa-briefcase' },
        { id: 'it', label: 'IT & Computing', icon: 'fa-laptop-code' },
        { id: 'humanities', label: 'Arts & Humanities', icon: 'fa-palette' },
        { id: 'other', label: 'Other', icon: 'fa-layer-group' }
      ]
    },
    {
      id: 'institution',
      question: "Your Institution",
      subtitle: "Enter the name of your college.",
      type: 'text',
      placeholder: "e.g. Kathmandu University"
    },
    {
      id: 'interests',
      question: "Your Interests",
      type: 'multi',
      subtitle: "Select all that apply.",
      options: [
        { id: 'notes', label: 'Study Resources', icon: 'fa-book-open' },
        { id: 'online_class', label: 'Live Classes', icon: 'fa-video' },
        { id: 'exam_prep', label: 'Exam Prep', icon: 'fa-list-check' },
        { id: 'guidance', label: 'Career Counseling', icon: 'fa-compass' },
        { id: 'internships', label: 'Internships', icon: 'fa-handshake' },
        { id: 'scholarships', label: 'Scholarships', icon: 'fa-award' }
      ]
    }
  ],
  flowB: [
    {
      id: 'target_level',
      question: "Target Level",
      subtitle: "What are you planning to study?",
      type: 'single',
      options: [
        { id: 'plus2', label: '+2 / High School', icon: 'fa-school' },
        { id: 'bachelors', label: "Bachelor's Degree", icon: 'fa-graduation-cap' },
        { id: 'masters', label: "Master's Degree", icon: 'fa-user-tie' }
      ]
    },
    {
      id: 'preferred_location',
      question: "Preferred Location",
      subtitle: "Narrow down your search area.",
      type: 'single',
      options: [
        { id: 'bagmati', label: 'Bagmati Province', icon: 'fa-map-location-dot' },
        { id: 'any', label: 'Anywhere in Nepal', icon: 'fa-earth-asia' },
        { id: 'other_prov', label: 'Other Provinces', icon: 'fa-map' }
      ]
    }
  ]
};

const jobSeekerData = {
  welcome: {
    title: "Welcome to StudSphere",
    subtext:
      "Accelerate your career. Let's find the perfect opportunity for you.",
    cta: "Start Profile",
  },
  decision: {
    question: "Which describes you?",
    options: [
      {
        id: "fresher",
        label: "I am a Fresher",
        sub: "Looking for first job/internship",
        icon: "fa-seedling",
        targetFlow: "flowFresher",
      },
      {
        id: "experienced",
        label: "I am Experienced",
        sub: "Looking for better opportunities",
        icon: "fa-briefcase",
        targetFlow: "flowExperienced",
      },
    ],
  },
  flowFresher: [
    {
      id: 'highest_qualification',
      question: "Highest Qualification",
      subtitle: "What is your latest degree?",
      type: 'single',
      options: [
        { id: 'bachelors', label: "Bachelor's Degree", icon: 'fa-graduation-cap' },
        { id: 'masters', label: "Master's Degree", icon: 'fa-user-graduate' },
        { id: 'plus2', label: '+2 / High School', icon: 'fa-school' }
      ]
    },
    {
      id: 'key_skills',
      question: "Key Skills",
      type: 'multi',
      subtitle: "Select skills you possess.",
      options: [
        { id: 'communication', label: 'Communication', icon: 'fa-comments' },
        { id: 'coding', label: 'Coding / Programming', icon: 'fa-code' },
        { id: 'design', label: 'Design / Creative', icon: 'fa-pen-nib' },
        { id: 'analysis', label: 'Data Analysis', icon: 'fa-chart-bar' }
      ]
    }
  ],
  flowExperienced: [
    {
      id: 'years_of_experience',
      question: "Years of Experience",
      subtitle: "How long have you been working?",
      type: 'single',
      options: [
        { id: '1-2', label: '1-2 Years', icon: 'fa-seedling' },
        { id: '3-5', label: '3-5 Years', icon: 'fa-tree' },
        { id: '5plus', label: '5+ Years', icon: 'fa-mountain' }
      ]
    },
    {
      id: 'current_job_role',
      question: "Current Job Role",
      subtitle: "What is your current designation?",
      type: 'text',
      placeholder: "e.g. Senior Developer"
    }
  ]
};

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const { token } = useAuth();
  const [role, setRole] = useState<Role | null>(null);
  const [phase, setPhase] = useState<Phase>('role');
  const [activeFlow, setActiveFlow] = useState<any[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const savePreferencesMutation = useSavePreferencesMutation();
  const [flowKey, setFlowKey] = useState('');

  const triggerAnimation = (callback: () => void) => {
    setIsAnimating(true);
    setTimeout(() => {
      callback();
      setIsAnimating(false);
    }, 300);
  };

  const handleRoleSelect = (selectedRole: Role) => {
    triggerAnimation(() => {
      setRole(selectedRole);
      setPhase("welcome");
    });
  };

  const handlePhaseWelcome = () => {
    triggerAnimation(() => setPhase("decision"));
  };

  const handleDecision = (flow: string) => {
    const data = role === 'student' ? (studentData as any)[flow] : (jobSeekerData as any)[flow];
    triggerAnimation(() => {
      setFlowKey(flow);
      setActiveFlow(data);
      setPhase("flow");
      setStepIndex(0);
    });
  };

  const handleNextStep = () => {
    if (stepIndex < activeFlow.length - 1) {
      triggerAnimation(() => setStepIndex((prev) => prev + 1));
    } else {
      triggerAnimation(() => setPhase("success"));
    }
  };

  const goBack = () => {
    triggerAnimation(() => {
      if (phase === "welcome") setPhase("role");
      else if (phase === "decision") setPhase("welcome");
      else if (phase === "flow") {
        if (stepIndex === 0) setPhase("decision");
        else setStepIndex((prev) => prev - 1);
      } else if (phase === "success") setPhase("flow");
    });
  };

  const progress =
    phase === "role"
      ? 5
      : phase === "welcome"
        ? 10
        : phase === "decision"
          ? 20
          : phase === "flow"
            ? 20 + ((stepIndex + 1) / activeFlow.length) * 80
            : 100;

  const accentColor = role === "student" ? "indigo" : "emerald";
  const accentHex = role === "student" ? "#6366f1" : "#10b981";

  return (
    <div className="w-full max-w-[420px] bg-white rounded-[24px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.08),0_8px_20px_-5px_rgba(0,0,0,0.02)] border border-slate-100 relative min-h-[480px] flex flex-col overflow-hidden font-sans">
      {/* Top Nav */}
      <div className="h-14 flex items-center justify-between px-6 pt-2">
        <button
          onClick={goBack}
          className={`w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-all ${phase === "role" ? "opacity-0 pointer-events-none" : ""}`}
        >
          <i className="fa-solid fa-chevron-left text-xs"></i>
        </button>
        <div className="flex items-center gap-1.5 opacity-60">
          <img src="/logo-blue.png" alt="StudSphere" className="h-4 w-auto" />
        </div>
        <button
          onClick={() => window.location.reload()}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
        >
          <i className="fa-solid fa-rotate-right text-xs"></i>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="px-6 mt-2 mb-2">
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${accentHex} 0%, #A855F7 100%)`,
            }}
          ></div>
        </div>
      </div>

      <div
        className={`flex-1 px-6 pb-8 flex flex-col justify-center transition-all duration-300 ${isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
      >
        {phase === "role" && (
          <>
            <div className="text-center mb-8 pt-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-slate-900 text-white mb-5 shadow-lg">
                <i className="fa-solid fa-layer-group text-xl"></i>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">
                Select Your Role
              </h1>
              <p className="text-slate-500 text-sm font-medium">
                To personalize your experience.
              </p>
            </div>
            <div className="space-y-3">
              <RoleButton
                icon="fa-graduation-cap"
                title="I am a Student"
                sub="Looking for colleges & guidance"
                color="indigo"
                onClick={() => handleRoleSelect("student")}
              />
              <RoleButton
                icon="fa-briefcase"
                title="I am a Job Seeker"
                sub="Looking for jobs & internships"
                color="emerald"
                onClick={() => handleRoleSelect("job_seeker")}
              />
            </div>
          </>
        )}

        {phase === "welcome" && role && (
          <div className="flex flex-col items-center text-center pt-6">
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${role === "student" ? "from-indigo-600 to-purple-500" : "from-emerald-500 to-teal-600"} flex items-center justify-center text-white shadow-xl mb-6`}
            >
              <i
                className={`fa-solid ${role === "student" ? "fa-hand-sparkles" : "fa-rocket"} text-2xl`}
              ></i>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">
              {role === "student"
                ? studentData.welcome.title
                : jobSeekerData.welcome.title}
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-[280px] font-medium">
              {role === "student"
                ? studentData.welcome.subtext
                : jobSeekerData.welcome.subtext}
            </p>
            <button
              onClick={handlePhaseWelcome}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 group"
            >
              {role === "student"
                ? studentData.welcome.cta
                : jobSeekerData.welcome.cta}
              <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform text-xs"></i>
            </button>
          </div>
        )}

        {phase === "decision" && role && (
          <>
            <div className="mb-6">
              <span className={`text-[10px] font-bold ${accentColor === 'indigo' ? 'text-indigo-600' : 'text-emerald-600'} tracking-widest uppercase mb-1 block`}>Step 01</span>
              <h3 className="text-xl font-bold text-slate-900">
                {role === "student"
                  ? studentData.decision.question
                  : jobSeekerData.decision.question}
              </h3>
            </div>
            <div className="space-y-3">
              {(role === "student"
                ? studentData.decision.options
                : jobSeekerData.decision.options
              ).map((opt: any) => (
                <button
                  key={opt.id}
                  onClick={() => handleDecision(opt.targetFlow)}
                  className="w-full text-left p-4 rounded-xl border border-slate-100 bg-white hover:shadow-md transition-all flex items-center group"
                  style={{ borderColor: 'rgb(226, 232, 240)' }}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 group-hover:text-white transition-colors`} style={{ backgroundColor: accentColor === 'indigo' ? '#e0e7ff' : '#f0fdf4', color: accentColor === 'indigo' ? '#4f46e5' : '#059669' }}>
                    <i className={`fa-solid ${opt.icon} text-lg`}></i>
                  </div>
                  <div className="flex-1">
                    <span className="block text-base font-bold text-slate-900">
                      {opt.label}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {opt.sub}
                    </span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-xs text-slate-300 group-hover:text-indigo-600"></i>
                </button>
              ))}
            </div>
          </>
        )}

        {phase === "flow" && activeFlow.length > 0 && (
          <div className="flex flex-col h-full">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] font-bold ${accentColor === 'indigo' ? 'text-indigo-600' : 'text-emerald-600'} tracking-widest uppercase`}>Question 0{stepIndex + 1}</span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">of 0{activeFlow.length}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1.5">
                {activeFlow[stepIndex].question}
              </h3>
              <p className="text-slate-500 text-sm font-medium">
                {activeFlow[stepIndex].subtitle || "Select the best option."}
              </p>
            </div>

            <div className="space-y-2.5 flex-grow">
              {activeFlow[stepIndex].type === 'single' && activeFlow[stepIndex].options.map((opt: any) => (
                <OptionItem
                  key={opt.id}
                  icon={opt.icon}
                  label={opt.label}
                  selected={answers[activeFlow[stepIndex].id] === opt.id}
                  accent={accentColor}
                  accentHex={accentHex}
                  onClick={() => setAnswers(prev => ({ ...prev, [activeFlow[stepIndex].id]: opt.id }))}
                />
              ))}
              {activeFlow[stepIndex].type === 'multi' && activeFlow[stepIndex].options.map((opt: any) => (
                <OptionItem
                  key={opt.id}
                  icon={opt.icon}
                  label={opt.label}
                  multi
                  selected={(answers[activeFlow[stepIndex].id] || []).includes(opt.id)}
                  accent={accentColor}
                  accentHex={accentHex}
                  onClick={() => {
                    const current = answers[activeFlow[stepIndex].id] || [];
                    const next = current.includes(opt.id) ? current.filter((i: any) => i !== opt.id) : [...current, opt.id];
                    setAnswers(prev => ({ ...prev, [activeFlow[stepIndex].id]: next }));
                  }}
                />
              ))}
              {activeFlow[stepIndex].type === 'text' && (
                <div className="relative group mt-2">
                  <div className="relative bg-white rounded-xl">
                    <input
                      type="text"
                      placeholder={activeFlow[stepIndex].placeholder}
                      value={answers[activeFlow[stepIndex].id] || ''}
                      onChange={(e) => setAnswers(prev => ({ ...prev, [activeFlow[stepIndex].id]: e.target.value }))}
                      className="w-full p-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-50 transition-all text-slate-800 placeholder-slate-400 text-sm font-medium"
                      style={{ borderColor: 'rgb(226, 232, 240)' }}
                    />
                    <i className="fa-solid fa-pen absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8">
              <button
                onClick={handleNextStep}
                disabled={
                  !answers[activeFlow[stepIndex].id] ||
                  (activeFlow[stepIndex].type === "multi" &&
                    answers[activeFlow[stepIndex].id].length === 0)
                }
                className="w-full py-3.5 bg-slate-900 disabled:bg-slate-100 disabled:text-slate-400 text-white rounded-xl font-semibold text-sm shadow-md transition-all active:scale-95"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {phase === "success" && (
          <div className="text-center py-8">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                <p className="text-red-700 font-medium text-sm">{error}</p>
              </div>
            )}
            <div className="relative inline-block mb-6">
              <div
                className={`relative w-20 h-20 rounded-full ${role === "student" ? "bg-emerald-500 shadow-emerald-200" : "bg-blue-600 shadow-blue-200"} text-white flex items-center justify-center shadow-lg`}
              >
                <i className="fa-solid fa-check text-3xl"></i>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              You’re All Set!
            </h2>
            <p className="text-slate-500 text-sm mb-8 max-w-[240px] mx-auto font-medium">
              {role === "student"
                ? "We've personalized your StudSphere dashboard based on your goals."
                : "We've curated a list of jobs and internships just for you."}
            </p>
            <button
              onClick={async () => {
                if (!token) {
                  setError('Authentication token not found');
                  return;
                }

                setIsSaving(true);
                setError('');

                try {
                  await savePreferencesMutation.mutateAsync({
                    token,
                    preferences: {
                      preference_role: role || 'student',
                      preference_flow: flowKey,
                      preferences: answers,
                    },
                  });

                  onComplete();
                } catch (err: any) {
                  setError(err.message || 'Failed to save preferences');
                  setIsSaving(false);
                }
              }}
              disabled={isSaving}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white rounded-xl font-semibold text-sm shadow-lg mb-4 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <i className="fa-solid fa-spinner animate-spin"></i>
                  Saving...
                </>
              ) : (
                'Go to Dashboard'
              )}
            </button>
            <button
              onClick={() => window.location.reload()}
              className="text-slate-400 text-sm font-medium hover:text-slate-600 transition-colors"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const RoleButton: React.FC<{ icon: string, title: string, sub: string, color: string, onClick: () => void }> = ({ icon, title, sub, color, onClick }) => {
  const colorBg = color === 'indigo' ? '#e0e7ff' : '#f0fdf4';
  const colorText = color === 'indigo' ? '#4f46e5' : '#059669';

  return (
    <button onClick={onClick} className="w-full group flex items-center p-4 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-all text-left active:scale-95">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-4 group-hover:text-white transition-colors" style={{ backgroundColor: colorBg, color: colorText }}>
        <i className={`fa-solid ${icon} text-lg`}></i>
      </div>
      <div className="flex-1">
        <span className="block text-base font-bold text-slate-900 mb-0.5">{title}</span>
        <span className="text-xs text-slate-500 font-medium">{sub}</span>
      </div>
      <i className="fa-solid fa-arrow-right text-slate-300 group-hover:translate-x-1 transition-all"></i>
    </button>
  );
};

const OptionItem: React.FC<{ icon?: string, label: string, selected: boolean, multi?: boolean, accent: string, accentHex: string, onClick: () => void }> = ({ icon, label, selected, multi, accent, accentHex, onClick }) => {
  const selectedBg = accent === 'indigo' ? '#e0e7ff' : '#f0fdf4';
  const selectedBorder = accent === 'indigo' ? '#6366f1' : '#10b981';
  const selectedText = accent === 'indigo' ? '#4f46e5' : '#059669';
  const iconBg = accent === 'indigo' ? '#e0e7ff' : '#f0fdf4';

  return (
    <label

      onClick={onClick}
      className={`cursor-pointer w-full flex items-center p-3.5 rounded-xl border group relative transition-all active:scale-[0.98] border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50`}
      style={selected ? { backgroundColor: selectedBg, borderColor: selectedBorder } : {}}
    >
      {icon && (
        <div className="w-8 h-8 rounded flex items-center justify-center mr-3.5 transition-colors text-sm" style={{ backgroundColor: selected ? iconBg : '#f8fafc', color: selected ? selectedText : '#6b7280' }}>
          <i className={`fa-solid ${icon}`}></i>
        </div>
      )}
      <span
        className={`font-semibold text-sm flex-1 transition-colors ${selected ? "text-slate-900" : "text-slate-700"}`}
      >
        {label}
      </span>

      {multi ? (
        <div className="w-5 h-5 rounded border flex items-center justify-center text-white text-[10px] transition-all" style={{ backgroundColor: selected ? selectedBorder : '#ffffff', borderColor: selected ? selectedBorder : '#d1d5db' }}>
          <i className={`fa-solid fa-check transition-opacity ${selected ? 'opacity-100' : 'opacity-0'}`}></i>
        </div>
      ) : (
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] transition-all transform"
          style={{ backgroundColor: selected ? accentHex : 'transparent', transform: selected ? 'scale(1)' : 'scale(0.75)', opacity: selected ? 1 : 0 }}
        >
          <i className="fa-solid fa-check"></i>
        </div>
      )}
    </label>
  );
};

export default OnboardingFlow;

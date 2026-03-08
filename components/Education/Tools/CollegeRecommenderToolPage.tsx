import React, { useMemo, useState } from "react";
import {
  apiService,
  CollegeRecommendation,
  CollegeRecommenderPayload,
} from "../../../services/api";

interface CollegeRecommenderToolPageProps {
  onNavigate: (view: any, data?: any) => void;
}

const stepLabels = [
  "Student Type",
  "Location",
  "Field",
  "Program",
  "Budget",
  "Career Goal",
  "Study Style",
  "Campus Life",
  "Scholarship",
  "Final Notes",
];

const goals = [
  "Government Job",
  "Tech Career",
  "Business / Startup",
  "Healthcare",
  "Research / Academia",
  "Creative Industries",
];

const programs = ["Bachelor", "Master", "Diploma", "A-Level", "+2"];

const styles = ["Practical", "Research", "Balanced", "Flexible"];

const fields = [
  "Science",
  "Management",
  "Humanities",
  "IT / Computing",
  "Engineering",
  "Medical",
  "Law",
  "Design",
];

const activities = ["Sports", "Clubs", "Hackathons", "Cultural Events", "Quiet Campus", "Networking"];

const cities = ["Kathmandu", "Pokhara", "Lalitpur", "Bhaktapur", "Chitwan", "Butwal", "Biratnagar", "Any in Nepal"];

const studentTypeOptions = [
  {
    value: "academic",
    title: "Academic Topper",
    description: "I want strong academics, tough competition, and high GPA results.",
    icon: "fa-book-open",
  },
  {
    value: "campus",
    title: "Campus Life Lover",
    description: "I want fun events, clubs, networking, and active college life.",
    icon: "fa-music",
  },
  {
    value: "career",
    title: "Career-Focused Planner",
    description: "I care about internships, job placement, and future salary.",
    icon: "fa-briefcase",
  },
  {
    value: "balanced",
    title: "Balanced Explorer",
    description: "I want academics + social life + extracurricular activities.",
    icon: "fa-shield-halved",
  },
];

const CollegeRecommenderToolPage: React.FC<CollegeRecommenderToolPageProps> = ({
  onNavigate,
}) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CollegeRecommendation[]>([]);

  const [form, setForm] = useState({
    current_level: "",
    grade_or_score: "",
    preferred_locations: [],
    preferred_field: "",
    preferred_program: "",
    max_budget: "",
    career_goal: "",
    study_style: "",
    campus_preferences: [],
    needs_scholarship: "",
    notes: "",
  });

  const canContinue = useMemo(() => {
    if (step === 1) return !!form.current_level;
    if (step === 2) return (form.preferred_locations || []).length > 0;
    if (step === 3) return !!form.preferred_field;
    if (step === 4) return !!form.preferred_program;
    if (step === 5) return !!form.max_budget;
    if (step === 6) return !!form.career_goal;
    if (step === 7) return !!form.study_style;
    if (step === 9) return !!form.needs_scholarship;
    return true;
  }, [form, step]);

  const toggleMulti = (key: "preferred_locations" | "campus_preferences", value: string) => {
    const current = form[key] || [];
    const exists = current.includes(value);
    setForm((prev) => ({
      ...prev,
      [key]: exists ? current.filter((item) => item !== value) : [...current, value],
    }));
  };

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const payload: CollegeRecommenderPayload = {
        student_type: form.current_level,
        program_interest:
          [form.preferred_program, form.preferred_field].filter(Boolean).join(" - ") ||
          form.preferred_field,
        preferred_location: (form.preferred_locations || []).join(", "),
        budget_preference: form.max_budget,
        campus_life_priority: (form.campus_preferences || []).join(", "),
        career_goal: form.career_goal,
        need_scholarship: form.needs_scholarship.toLowerCase().startsWith("yes"),
        preferred_mode: form.study_style,
        college_type: form.preferred_field,
        final_priority: form.notes,
      };

      const res = await apiService.getCollegeRecommenderRecommendations(payload);
      setResults(res.data?.recommendations || []);
      setStep(11);
    } finally {
      setLoading(false);
    }
  };

  if (step === 1) {
    return (
      <div className="flex min-h-screen flex-col bg-white text-slate-800 md:flex-row">
        <div className="hidden min-h-screen items-center justify-center overflow-hidden border-r border-blue-100 bg-blue-50 p-8 md:flex md:w-5/12 lg:w-[40%]">
          <div className="relative flex w-full max-w-md aspect-[4/3] items-center justify-center overflow-hidden">
            <img
              src="https://static.vecteezy.com/system/resources/previews/028/534/745/non_2x/finding-direction-flat-style-design-illustration-stock-illustration-vector.jpg"
              alt="Student illustration"
              className="absolute h-[130%] w-[130%] max-w-none object-cover pb-4 mix-blend-darken"
            />
          </div>
        </div>

        <div className="flex min-h-screen w-full flex-col justify-center p-6 md:w-7/12 md:p-12 lg:w-[60%] lg:px-24 xl:px-32">
          <div className="mx-auto w-full max-w-2xl">
            <div className="mb-10 flex items-center">
              <button
                onClick={() => onNavigate("educationPage")}
                className="mr-4 rounded-full p-1 text-slate-500 transition-colors hover:bg-blue-50 hover:text-blue-600"
              >
                <i className="fa-solid fa-chevron-left text-lg"></i>
              </button>
              <div className="h-2 flex-1 overflow-hidden rounded-full border border-blue-200 bg-blue-100">
                <div className="h-full w-[15%] rounded-full bg-blue-600"></div>
              </div>
            </div>

            <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Which type of student are you?
            </h1>
            <p className="mb-8 text-lg font-medium text-slate-500">Select what matches you best:</p>

            <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
              {studentTypeOptions.map((option) => {
                const selected = form.current_level === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => setForm((prev) => ({ ...prev, current_level: option.value }))}
                    className={`group relative flex h-full flex-col rounded-xl border-2 p-5 text-left transition-all duration-200 ${
                      selected
                        ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
                        : "border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/50"
                    }`}
                  >
                    <div
                      className={`absolute right-5 top-5 flex h-5 w-5 items-center justify-center rounded border-2 ${
                        selected ? "border-blue-600 bg-blue-600" : "border-slate-300"
                      }`}
                    >
                      {selected && <i className="fa-solid fa-check text-[10px] text-white"></i>}
                    </div>

                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-transform group-hover:scale-110">
                      <i className={`fa-solid ${option.icon} text-xl`}></i>
                    </div>

                    <h3 className="mb-2 text-lg font-bold text-slate-800">{option.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-500">{option.description}</p>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!form.current_level}
              className={`w-full min-w-[120px] rounded-lg px-8 py-3 font-semibold transition-all duration-300 sm:w-auto ${
                form.current_level
                  ? "cursor-pointer bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg"
                  : "cursor-not-allowed bg-slate-300 text-slate-50"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 11) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-sky-50 px-6 py-10 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">Tool Result</p>
              <h1 className="text-3xl font-black text-slate-900 md:text-4xl">
                Best matched colleges for you
              </h1>
            </div>
            <button
              onClick={() => setStep(10)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-700"
            >
              Refine Answers
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {results.map((item) => (
              <article
                key={item.id}
                className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold leading-tight text-slate-900">{item.name}</h3>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                    {item.match_score}/10 Match
                  </span>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="rounded bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white">{item.location}</span>
                  <span className="rounded bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                    {item.type || "Institution"}
                  </span>
                </div>

                <p className="mb-5 text-sm text-slate-600">
                  {item.description || "This college aligns with your program, budget, and study preferences."}
                </p>

                <ul className="mb-5 space-y-1 text-xs text-slate-600">
                  {item.reasons?.slice(0, 3).map((reason, idx) => (
                    <li key={idx}>• {reason}</li>
                  ))}
                </ul>

                <button
                  onClick={() => onNavigate("collegeProfile", { id: item.id })}
                  className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-slate-800"
                >
                  View College Profile
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f6ff] text-slate-800">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 lg:flex-row lg:px-12">
        <aside className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm lg:w-[300px]">
          <h2 className="mb-4 text-lg font-black text-slate-900">College Recommender</h2>
          <p className="mb-6 text-sm text-slate-500">Step {step} of 10</p>
          <div className="space-y-2">
            {stepLabels.map((label, idx) => {
              const number = idx + 1;
              const active = number === step;
              const done = number < step;
              return (
                <div
                  key={label}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                    active
                      ? "bg-blue-50 text-blue-700"
                      : done
                      ? "text-emerald-700"
                      : "text-slate-500"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      active
                        ? "bg-blue-600 text-white"
                        : done
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {number}
                  </span>
                  <span>{label}</span>
                </div>
              );
            })}
          </div>
        </aside>

        <main className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <h1 className="mb-1 text-2xl font-black text-slate-900 md:text-3xl">{stepLabels[step - 1]}</h1>
          <p className="mb-8 text-slate-500">Answer accurately to get Nepal-focused college recommendations.</p>

          {step === 2 && (
            <div>
              <label className="mb-2 block font-semibold">Preferred Locations</label>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => toggleMulti("preferred_locations", city)}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                      form.preferred_locations?.includes(city)
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-300 text-slate-600"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <label className="mb-2 block font-semibold">Preferred Field</label>
              <div className="flex flex-wrap gap-3">
                {fields.map((field) => (
                  <button
                    key={field}
                    onClick={() => setForm((prev) => ({ ...prev, preferred_field: field }))}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                      form.preferred_field === field
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                        : "border-slate-300 text-slate-700"
                    }`}
                  >
                    {field}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <label className="mb-2 block font-semibold">Preferred Program</label>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                {programs.map((program) => (
                  <button
                    key={program}
                    onClick={() => setForm((prev) => ({ ...prev, preferred_program: program }))}
                    className={`rounded-lg border px-4 py-2 text-sm font-semibold ${
                      form.preferred_program === program
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-300 text-slate-700"
                    }`}
                  >
                    {program}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <label className="mb-2 block font-semibold">Max Yearly Budget (NPR)</label>
              <input
                value={form.max_budget}
                onChange={(e) => setForm((prev) => ({ ...prev, max_budget: e.target.value }))}
                placeholder="e.g. 400000"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>
          )}

          {step === 6 && (
            <div>
              <label className="mb-2 block font-semibold">Career Goal</label>
              <div className="flex flex-wrap gap-3">
                {goals.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => setForm((prev) => ({ ...prev, career_goal: goal }))}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                      form.career_goal === goal
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-300 text-slate-700"
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 7 && (
            <div>
              <label className="mb-2 block font-semibold">Study Style</label>
              <div className="grid grid-cols-2 gap-3">
                {styles.map((style) => (
                  <button
                    key={style}
                    onClick={() => setForm((prev) => ({ ...prev, study_style: style }))}
                    className={`rounded-lg border px-4 py-2 text-sm font-semibold ${
                      form.study_style === style
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-300 text-slate-700"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 8 && (
            <div>
              <label className="mb-2 block font-semibold">Campus Life Preferences</label>
              <div className="flex flex-wrap gap-3">
                {activities.map((activity) => (
                  <button
                    key={activity}
                    onClick={() => toggleMulti("campus_preferences", activity)}
                    className={`rounded-full border px-4 py-2 text-sm ${
                      form.campus_preferences?.includes(activity)
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                        : "border-slate-300 text-slate-700"
                    }`}
                  >
                    {activity}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 9 && (
            <div>
              <label className="mb-2 block font-semibold">Do you need scholarship support?</label>
              <div className="flex gap-3">
                {[
                  "Yes - essential",
                  "Yes - preferred",
                  "No",
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => setForm((prev) => ({ ...prev, needs_scholarship: option }))}
                    className={`rounded-lg border px-4 py-2 text-sm font-semibold ${
                      form.needs_scholarship === option
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-300 text-slate-700"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 10 && (
            <div>
              <label className="mb-2 block font-semibold">Anything else we should consider?</label>
              <textarea
                rows={6}
                value={form.notes}
                onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Example: I prefer colleges with internship opportunities and easy transportation."
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>
          )}

          <div className="mt-10 flex items-center justify-between gap-3">
            <button
              onClick={() => setStep((prev) => Math.max(1, prev - 1))}
              disabled={step === 1}
              className="rounded-lg border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>

            {step < 10 ? (
              <button
                onClick={() => setStep((prev) => Math.min(10, prev + 1))}
                disabled={!canContinue}
                className="rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={fetchRecommendations}
                disabled={loading}
                className="rounded-lg bg-slate-900 px-8 py-2.5 font-bold text-white"
              >
                {loading ? "Generating..." : "Get Recommendations"}
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CollegeRecommenderToolPage;

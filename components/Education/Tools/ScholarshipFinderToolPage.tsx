import React, { useMemo, useState } from "react";
import {
  apiService,
  ScholarshipFinderRecommendation,
  ScholarshipFinderToolPayload,
} from "../../../services/api";

interface ScholarshipFinderToolPageProps {
  onNavigate: (view: any, data?: any) => void;
}

const stepTitles = [
  "Education Journey",
  "Study Destination",
  "Financial Preference",
  "Academic Interests",
  "Experience & Achievements",
];

const ScholarshipFinderToolPage: React.FC<ScholarshipFinderToolPageProps> = ({
  onNavigate,
}) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ScholarshipFinderRecommendation[]>([]);

  const [payload, setPayload] = useState<ScholarshipFinderToolPayload>({
    education_level: "",
    study_mode: "",
    academic_score: "",
    target_country: "Nepal",
    need_type: "",
    skills: [],
    achievements: [],
    involvements: [],
  });

  const educationLevels = [
    "SEE Completed",
    "Class 11",
    "Class 12",
    "+2 Completed",
    "Bachelor Running",
    "Bachelor Completed",
    "Master Running",
    "Planning to Study Abroad",
  ];

  const studyModes = ["Full-time", "Part-time", "Either", "Not sure"];
  const countries = ["Nepal", "India", "Australia", "USA", "UK", "Canada"];
  const needs = [
    "Maximum funding (full scholarship)",
    "Partial scholarship is fine",
    "Need-based support",
    "Merit-based scholarship",
  ];
  const skills = ["Sports", "Music", "Debate", "Coding", "Leadership", "Social Service", "Research", "Arts"];
  const achievements = [
    "SEE Board Topper",
    "+2 Distinction",
    "National Competition Winner",
    "Olympiad Participant",
    "Published Research",
    "None",
  ];
  const involvements = [
    "Community Service",
    "NGO Work",
    "Student Clubs",
    "Entrepreneurship",
    "Family Business",
    "None",
  ];

  const canProceed = useMemo(() => {
    if (step === 1) {
      return !!payload.education_level && !!payload.study_mode;
    }
    if (step === 2) {
      return !!payload.target_country;
    }
    if (step === 3) {
      return !!payload.need_type;
    }
    return true;
  }, [payload, step]);

  const handleToggleArray = (
    key: "skills" | "achievements" | "involvements",
    value: string,
  ) => {
    const current = payload[key] || [];
    const exists = current.includes(value);
    setPayload((prev) => ({
      ...prev,
      [key]: exists ? current.filter((item) => item !== value) : [...current, value],
    }));
  };

  const handleShowResults = async () => {
    setLoading(true);
    try {
      const res = await apiService.getScholarshipFinderRecommendations(payload);
      setResults(res.data?.recommendations || []);
      setStep(6);
    } finally {
      setLoading(false);
    }
  };

  if (step === 6) {
    return (
      <div className="min-h-screen bg-stone-50 px-6 py-10 text-gray-900 antialiased pb-32 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-8">
            <div className="mb-4 flex items-center text-sm font-medium text-gray-500">
              <button className="hover:text-blue-600" onClick={() => setStep(5)}>
                Scholarship Finder
              </button>
              <span className="mx-2">/</span>
              <span className="text-gray-900">AI Recommendations</span>
            </div>
            <h1 className="mb-3 text-[2rem] font-bold leading-tight text-gray-900 md:text-[2.5rem]">
              Scholarships that fit you best
            </h1>
            <p className="max-w-4xl text-[1.05rem] leading-relaxed text-gray-600">
              These recommendations are personalized for Nepal-based students based on your profile and preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {results.map((item) => (
              <div
                key={item.id}
                className="group relative flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:shadow-lg"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="text-[1.05rem] font-bold leading-snug text-gray-900 transition-colors group-hover:text-blue-700">
                    {item.title}
                  </h3>
                  <span className="rounded bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700">
                    {item.match_score}/10
                  </span>
                </div>

                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white">
                    {item.provider || "Provider"}
                  </span>
                  <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-blue-700">
                    {item.funding_type || "Support"}
                  </span>
                </div>

                <p className="mb-5 flex-grow text-sm text-gray-600">{item.description || "Scholarship details available."}</p>

                <div className="mb-3 space-y-1">
                  {item.reasons?.slice(0, 2).map((reason, idx) => (
                    <p key={idx} className="text-xs text-emerald-700">• {reason}</p>
                  ))}
                </div>

                <div className="mt-auto flex items-end justify-between border-t border-gray-100 pt-4">
                  <div>
                    <span className="mb-1 block text-[0.7rem] font-bold uppercase tracking-wider text-gray-400">
                      Location
                    </span>
                    <span className="text-sm font-semibold text-blue-600">{item.location || "Nepal"}</span>
                  </div>
                  <button
                    onClick={() => onNavigate("scholarshipDetails", { id: item.id })}
                    className="rounded-lg bg-blue-600 px-3.5 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-slate-50 text-slate-800 flex">
      <main className="mx-auto flex h-full w-full max-w-7xl flex-col lg:flex-row">
        <div className="flex w-full flex-col justify-center p-8 md:p-16 lg:w-1/2 lg:p-24">
          <div className="mb-10 flex items-center space-x-2 text-sm font-semibold">
            {stepTitles.map((_, idx) => (
              <React.Fragment key={idx}>
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full ${
                    idx + 1 <= step
                      ? "bg-blue-600 text-white shadow-md"
                      : "border-2 border-slate-300 bg-white text-slate-400"
                  }`}
                >
                  {idx + 1}
                </div>
                {idx < stepTitles.length - 1 && (
                  <div className={`h-[2px] w-4 ${idx + 1 < step ? "bg-blue-600" : "bg-slate-300"}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>

          <h1 className="mb-2 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
            {stepTitles[step - 1]}
          </h1>
          <p className="mb-8 text-slate-500">
            {step < 5
              ? "Answer a few questions to personalize scholarships for Nepal-based students."
              : "Optional, but helps improve recommendation quality."}
          </p>

          <div className="max-w-md space-y-6">
            {step === 1 && (
              <>
                <div>
                  <label className="mb-2 block font-semibold text-slate-800">
                    Current Education Level
                  </label>
                  <select
                    value={payload.education_level}
                    onChange={(e) =>
                      setPayload((prev) => ({ ...prev, education_level: e.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select your education level</option>
                    {educationLevels.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-slate-800">Study Mode Preference</label>
                  <div className="flex flex-wrap gap-3">
                    {studyModes.map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setPayload((prev) => ({ ...prev, study_mode: mode }))}
                        className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                          payload.study_mode === mode
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-slate-300 bg-white text-slate-600 hover:border-blue-400"
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-slate-800">Academic Score</label>
                  <input
                    value={payload.academic_score}
                    onChange={(e) =>
                      setPayload((prev) => ({ ...prev, academic_score: e.target.value }))
                    }
                    placeholder="e.g. 3.8 GPA or 85%"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <div>
                <label className="mb-2 block font-semibold text-slate-800">Where do you want to study?</label>
                <div className="grid grid-cols-2 gap-3">
                  {countries.map((country) => (
                    <button
                      key={country}
                      type="button"
                      onClick={() =>
                        setPayload((prev) => ({ ...prev, target_country: country }))
                      }
                      className={`rounded-xl border px-4 py-3 text-left font-medium transition-all ${
                        payload.target_country === country
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-slate-300 bg-white text-slate-700 hover:border-blue-400"
                      }`}
                    >
                      {country}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <label className="mb-2 block font-semibold text-slate-800">Financial Preference</label>
                <div className="space-y-3">
                  {needs.map((need) => (
                    <button
                      key={need}
                      type="button"
                      onClick={() => setPayload((prev) => ({ ...prev, need_type: need }))}
                      className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all ${
                        payload.need_type === need
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-slate-300 bg-white text-slate-700 hover:border-blue-400"
                      }`}
                    >
                      {need}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <label className="mb-2 block font-semibold text-slate-800">Talents / Skills</label>
                <div className="flex flex-wrap gap-2">
                  {skills.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleToggleArray("skills", item)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium ${
                        payload.skills?.includes(item)
                          ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                          : "border-slate-300 text-slate-600"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <>
                <div>
                  <label className="mb-2 block font-semibold text-slate-800">Achievements</label>
                  <div className="flex flex-wrap gap-2">
                    {achievements.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleToggleArray("achievements", item)}
                        className={`rounded-full border px-4 py-2 text-sm font-medium ${
                          payload.achievements?.includes(item)
                            ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                            : "border-slate-300 text-slate-600"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-slate-800">Involvements</label>
                  <div className="flex flex-wrap gap-2">
                    {involvements.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleToggleArray("involvements", item)}
                        className={`rounded-full border px-4 py-2 text-sm font-medium ${
                          payload.involvements?.includes(item)
                            ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                            : "border-slate-300 text-slate-600"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="flex items-center gap-3 pt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((prev) => Math.max(1, prev - 1))}
                  className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700"
                >
                  Back
                </button>
              )}

              {step < 5 ? (
                <button
                  type="button"
                  disabled={!canProceed}
                  onClick={() => setStep((prev) => Math.min(5, prev + 1))}
                  className={`flex items-center gap-2 rounded-xl px-8 py-3 font-semibold transition-all ${
                    canProceed
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "cursor-not-allowed bg-slate-300 text-slate-500"
                  }`}
                >
                  Next <i className="fa-solid fa-arrow-right"></i>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleShowResults}
                  disabled={loading}
                  className="rounded-xl bg-gray-900 px-8 py-3.5 font-semibold text-white transition-all hover:bg-gray-800"
                >
                  {loading ? "Generating..." : "Show results"}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="hidden w-1/2 items-center justify-center p-12 lg:flex">
          <img
            src={
              step < 5
                ? "https://img.pikbest.com/origin/09/27/02/00ApIkbEsTaG6.png!sw800"
                : "https://cdni.iconscout.com/illustration/premium/thumb/achievement-illustration-svg-download-png-6983258.png"
            }
            alt="Scholarship Finder"
            className="h-auto w-full max-w-lg object-contain mix-blend-multiply"
          />
        </div>
      </main>
    </div>
  );
};

export default ScholarshipFinderToolPage;

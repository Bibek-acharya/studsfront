import React, { useState } from "react";

interface CollegeQuizPageProps {
  onNavigate: (view: string, data?: any) => void;
}

const levelsOfStudy = [
  {
    id: "plus-two",
    title: "+2 / High School",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 stroke-slate-900 fill-none stroke-[1.5] stroke-linecap-round stroke-linejoin-round mb-3">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        <path d="M8 7h8" />
        <path d="M8 11h8" />
      </svg>
    ),
  },
  {
    id: "a-level",
    title: "A Levels",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 stroke-slate-900 fill-none stroke-[1.5] stroke-linecap-round stroke-linejoin-round mb-3">
        <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M3 15h6" />
        <path d="M3 18h6" />
        <path d="M3 12h6" />
      </svg>
    ),
  },
  {
    id: "diploma",
    title: "Diploma",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 stroke-slate-900 fill-none stroke-[1.5] stroke-linecap-round stroke-linejoin-round mb-3">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    id: "bachelor",
    title: "Bachelor's",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 stroke-slate-900 fill-none stroke-[1.5] stroke-linecap-round stroke-linejoin-round mb-3">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    id: "master",
    title: "Master's",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 stroke-slate-900 fill-none stroke-[1.5] stroke-linecap-round stroke-linejoin-round mb-3">
        <circle cx="12" cy="8" r="4" />
        <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      </svg>
    ),
  },
];

const preferencesGroups = [
  {
    category: "Column 1",
    items: [
      { id: "academics", label: "Academics" },
      { id: "diversity", label: "Diversity" },
      { id: "athletics", label: "Athletics/Extracurriculars" },
      { id: "value", label: "Value / Affordability" },
      { id: "campus", label: "Campus Facilities" },
      { id: "party", label: "Social Scene" },
    ],
  },
  {
    category: "Column 2",
    items: [
      { id: "professors", label: "Faculty / Professors" },
      { id: "dorms", label: "Hostels / Dorms" },
      { id: "studentlife", label: "Student Life" },
      { id: "localarea", label: "Local Area" },
      { id: "food", label: "Canteen / Food" },
      { id: "safety", label: "Safety" },
    ],
  },
];

const CollegeQuizPage: React.FC<CollegeQuizPageProps> = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [districts] = useState([
    "Kathmandu", "Lalitpur", "Bhaktapur", "Kaski", "Morang", "Sunsari", "Chitwan", "Rupandehi", "Jhapa"
  ]); // Sample districts
  const [locationInput, setLocationInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const [data, setData] = useState({
    levelOfStudy: "",
    location: "",
    gpa: "",
    preferences: {
      academics: 0,
      diversity: 0,
      athletics: 0,
      value: 0,
      campus: 0,
      party: 0,
      professors: 70,
      dorms: 0,
      studentlife: 0,
      localarea: 0,
      food: 0,
      safety: 0,
    } as Record<string, number>,
  });

  const updatePreference = (id: string, value: number) => {
    setData((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, [id]: value },
    }));
  };

  const handleLocationSelect = (district: string) => {
    setData(prev => ({ ...prev, location: district }));
    setLocationInput(district);
    setShowSuggestions(false);
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
    else {
      // Finish quiz
      onNavigate("collegeRecommenderTool"); // or handle results
    }
  };

  const filteredDistricts = districts.filter(d => d.toLowerCase().includes(locationInput.toLowerCase()));

  return (
    <div className="min-h-[85vh] bg-transparent flex flex-col items-center py-16 px-5 font-sans">
      
      {/* Step 1: Level of Study */}
      {step === 1 && (
        <div className="max-w-[800px] w-full text-center animate-fade-in-up">
          <p className="font-semibold text-sm uppercase tracking-[0.15em] text-slate-500 mb-2">Level of Study</p>
          <h2 className="text-[2rem] md:text-[3.2rem] font-medium tracking-tight text-slate-900 mb-5 leading-tight">What program are you looking for?</h2>
          <p className="text-[1.1rem] text-slate-500 mb-10">Select the level of degree you want to pursue.</p>
          
          <div className="flex flex-wrap justify-center gap-5 w-full mb-10">
            {levelsOfStudy.map((level) => (
              <div 
                key={level.id}
                onClick={() => setData({ ...data, levelOfStudy: level.id })}
                className={`flex-1 min-w-[150px] bg-transparent border rounded p-[30px_20px] flex flex-col items-center justify-center gap-[15px] cursor-pointer transition-all duration-200 ${
                  data.levelOfStudy === level.id 
                    ? "border-blue-600 border-2 bg-blue-50 py-[29px] px-[19px]" 
                    : "border-slate-300 hover:border-blue-600 hover:bg-slate-50"
                }`}
              >
                {level.icon}
                <span className="text-[1.2rem] font-bold text-slate-900 tracking-[0.05em] text-center">{level.title}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-[15px] w-full">
            <button 
              onClick={nextStep}
              disabled={!data.levelOfStudy}
              className="bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white border-none py-[18px] px-[36px] rounded-[50px] text-[1.1rem] font-semibold cursor-pointer transition-all duration-300 w-full max-w-[400px] hover:-translate-y-[3px] hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
          <p className="mt-[40px] font-medium uppercase text-[0.85rem] tracking-[0.1em] text-slate-500">Step 1 of 4</p>
        </div>
      )}

      {/* Step 2: Location */}
      {step === 2 && (
        <div className="max-w-[600px] w-full text-center animate-fade-in-up">
          <p className="font-semibold text-sm uppercase tracking-[0.15em] text-slate-500 mb-2">Location</p>
          <h2 className="text-[2.2rem] md:text-[3.2rem] font-medium tracking-tight text-slate-900 mb-5 leading-tight">Where do you want to go to school?</h2>
          <p className="text-[1.1rem] text-slate-500 mb-10">Add the districts or cities in Nepal you're interested in.</p>
          
          <div className="w-full mb-[30px] relative">
            <div className="relative w-full">
              <input 
                type="text" 
                value={locationInput}
                onChange={(e) => {
                  setLocationInput(e.target.value);
                  setShowSuggestions(true);
                  if(!e.target.value) setData({...data, location: ""});
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full p-[16px_24px] border border-slate-300 rounded-lg text-[1.1rem] outline-none transition-colors duration-200 focus:border-blue-600 focus:rounded-t-lg focus:rounded-b-none"
                placeholder="Enter a district (e.g. Kathmandu, Pokhara)" 
              />
              {showSuggestions && locationInput && filteredDistricts.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-t-0 border-blue-600 rounded-b-lg max-h-[220px] overflow-y-auto z-[100] text-left shadow-lg">
                  {filteredDistricts.map(d => (
                    <div 
                      key={d} 
                      onClick={() => handleLocationSelect(d)}
                      className="p-[12px_24px] cursor-pointer text-[1.05rem] text-slate-900 border-b border-slate-100 last:border-b-0 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {d}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-[15px] w-full">
            <button 
              onClick={nextStep}
              disabled={!data.location && !locationInput}
              className="bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white border-none py-[18px] px-[36px] rounded-[50px] text-[1.1rem] font-semibold cursor-pointer transition-all duration-300 w-full max-w-[400px] hover:-translate-y-[3px] hover:bg-blue-700 disabled:hover:translate-y-0"
            >
              Continue
            </button>
            <button onClick={() => { setData({...data, location: "National"}); nextStep(); }} className="mt-[20px] text-blue-600 font-semibold text-[0.95rem] cursor-pointer hover:underline bg-transparent border-none">
              Skip to search nationally
            </button>
          </div>
          <p className="mt-[40px] font-medium uppercase text-[0.85rem] tracking-[0.1em] text-slate-500">Step 2 of 4</p>
        </div>
      )}

      {/* Step 3: Academics */}
      {step === 3 && (
        <div className="max-w-[600px] w-full text-center animate-fade-in-up">
          <p className="font-semibold text-sm uppercase tracking-[0.15em] text-slate-500 mb-2">Academics</p>
          <h2 className="text-[2.2rem] md:text-[3.2rem] font-medium tracking-tight text-slate-900 mb-5 leading-tight">What is your previous GPA?</h2>
          <p className="text-[1.1rem] text-slate-500 mb-10">Enter your GPA out of 4.0 from your most recent degree.</p>
          
          <div className="w-full mb-[30px]">
            <input 
              type="number" 
              step="0.1" min="0" max="4.0"
              value={data.gpa}
              onChange={(e) => setData({...data, gpa: e.target.value})}
              className="w-full p-[16px_24px] border border-slate-300 rounded-lg text-[1.1rem] outline-none transition-colors duration-200 focus:border-blue-600"
              placeholder="e.g. 3.5"
            />
          </div>

          <div className="flex flex-col items-center gap-[15px] w-full">
            <button 
              onClick={nextStep}
              disabled={!data.gpa}
              className="bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white border-none py-[18px] px-[36px] rounded-[50px] text-[1.1rem] font-semibold cursor-pointer transition-all duration-300 w-full max-w-[400px] hover:-translate-y-[3px] hover:bg-blue-700 disabled:hover:translate-y-0"
            >
              Continue
            </button>
            <button onClick={() => { setData({...data, gpa: "Skip"}); nextStep(); }} className="mt-[20px] text-blue-600 font-semibold text-[0.95rem] cursor-pointer hover:underline bg-transparent border-none">
              I'm not sure
            </button>
          </div>
          <p className="mt-[40px] font-medium uppercase text-[0.85rem] tracking-[0.1em] text-slate-500">Step 3 of 4</p>
        </div>
      )}

      {/* Step 4: Preferences */}
      {step === 4 && (
        <div className="w-full max-w-[850px] relative animate-fade-in-up">
          <button onClick={() => setStep(3)} className="absolute top-0 left-0 bg-transparent border-none text-blue-600 font-bold text-[1.1rem] cursor-pointer hover:underline hidden md:block">
            &lt; Back
          </button>
          <div className="text-center md:pt-0 pt-10">
            <button onClick={() => setStep(3)} className="block md:hidden mb-5 bg-transparent border-none text-blue-600 font-bold text-[1.1rem] cursor-pointer hover:underline mx-auto">
              &lt; Back
            </button>
            <p className="font-semibold text-sm uppercase tracking-[0.15em] text-slate-500 mb-2">Preferences</p>
            <h2 className="text-[2.2rem] md:text-[3.2rem] font-medium tracking-tight text-slate-900 mb-5 leading-tight">What's most important?</h2>
            <p className="text-[1.1rem] text-slate-500 mb-10">For best results, set 3 to 5 priorities.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-7 md:gap-x-20 gap-x-5 mt-[40px] text-left">
            {preferencesGroups.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-[35px]">
                <div className="flex justify-between text-[0.8rem] font-bold text-slate-900 tracking-[0.08em] -mb-[15px]">
                  <span>NOT IMPORTANT</span>
                  <span>VERY IMPORTANT</span>
                </div>
                {col.items.map((pref) => {
                  const val = data.preferences[pref.id];
                  const isActive = val > 0;
                  return (
                    <div key={pref.id} className="flex flex-col gap-[12px]">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-[1.1rem] text-slate-900 flex items-center gap-[8px]">
                          {pref.label} 
                          <span title="Information about this factor" className="w-[16px] h-[16px] border-[1.5px] border-slate-900 rounded-full inline-flex items-center justify-center text-[11px] font-bold cursor-help">?</span>
                        </span>
                        {isActive && (
                          <button onClick={() => updatePreference(pref.id, 0)} className="text-[0.75rem] text-slate-500 cursor-pointer flex items-center gap-[4px] bg-slate-100 border-none p-[4px_8px] rounded font-semibold hover:bg-slate-200 hover:text-slate-900">
                            × Clear filter
                          </button>
                        )}
                      </div>
                      <input 
                        type="range" 
                        min="0" max="100" 
                        value={val}
                        onChange={(e) => updatePreference(pref.id, Number(e.target.value))}
                        style={{ "--value": `${val}%` } as React.CSSProperties}
                        className="w-full h-[6px] rounded-[3px] outline-none m-0 appearance-none bg-blue-200 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[20px] [&::-webkit-slider-thumb]:h-[20px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:shadow-[0_1px_3px_rgba(0,0,0,0.3)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-runnable-track]:h-[6px] [&::-webkit-slider-runnable-track]:bg-transparent"
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-[15px] w-full mt-[50px]">
            <button 
              onClick={nextStep}
              className="bg-blue-600 text-white border-none py-[18px] px-[36px] rounded-[50px] text-[1.1rem] font-semibold cursor-pointer transition-all duration-300 w-full max-w-[400px] hover:-translate-y-[3px] hover:bg-blue-700"
            >
              Get Results
            </button>
          </div>
        </div>
      )}

      {/* Tailwind styling for the custom range input via arbitrary values */}
      <style>{`
        input[type=range] {
          background: linear-gradient(to right, #2563eb var(--value, 0%), #bfdbfe var(--value, 0%));
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default CollegeQuizPage;

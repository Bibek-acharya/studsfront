import React, { useState, useEffect } from "react";

const RewardsPage: React.FC = () => {
  const [currentPoints, setCurrentPoints] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [partialTasks, setPartialTasks] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<{
    show: boolean;
    points: number;
    title: string;
    message?: string;
    isWarning?: boolean;
  }>({
    show: false,
    points: 0,
    title: "",
    message: "",
    isWarning: false,
  });

  useEffect(() => {
    // Animation logic for scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const showToast = (
    points: number,
    title: string,
    message?: string,
    isWarning: boolean = false,
  ) => {
    setToast({ show: true, points, title, message, isWarning });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleTaskClick = (
    id: string,
    points: number,
    isMultiStep: boolean = false,
    isBigWin: boolean = false,
  ) => {
    if (completedTasks.has(id)) return;

    if (isMultiStep && !partialTasks.has(id)) {
      setPartialTasks((prev) => new Set(prev).add(id));
      showToast(
        0,
        "Profile Incomplete",
        "Finish your profile to earn points!",
        true,
      );
      return;
    }

    // Mark completed
    setCompletedTasks((prev) => new Set(prev).add(id));
    setPartialTasks((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });

    // Animate points
    setCurrentPoints((prev) => prev + points);
    showToast(points, isBigWin ? "Massive Win!" : "Points Earned!");

    if (isBigWin) {
      // Logic for confetti would go here in a full app using canvas-confetti
      console.log("Confetti triggered!");
    }
  };

  return (
    <div className="relative pt-24 pb-20 overflow-hidden font-jakarta bg-slate-50 min-h-screen">
      {/* Background Mesh (Styled via inline CSS for accuracy) */}
      <div
        className="fixed inset-0 z-[-1] opacity-40 pointer-events-none"
        style={{
          background: `
          radial-gradient(at 0% 0%, rgba(79, 70, 229, 0.15) 0px, transparent 50%),
          radial-gradient(at 100% 0%, rgba(236, 72, 153, 0.15) 0px, transparent 50%),
          radial-gradient(at 100% 100%, rgba(59, 130, 246, 0.15) 0px, transparent 50%),
          radial-gradient(at 0% 100%, rgba(16, 185, 129, 0.15) 0px, transparent 50%)
        `,
          backgroundSize: "150% 150%",
        }}
      ></div>

      {/* Hero */}
      <header className="relative pt-10 pb-20 text-center container mx-auto px-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/50 text-indigo-700 text-sm font-semibold mb-8 shadow-sm backdrop-blur-sm animate-bounce">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Earn Real Rewards for Your Growth
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
          Build Reputation. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            Unlock Your Future.
          </span>
        </h1>

        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Turn your academic achievements, community contributions, and
          verifications into{" "}
          <span className="text-indigo-600 font-bold">tangible rewards</span>{" "}
          and career opportunities.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-900/20 hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 group">
            <span>Start Earning</span>
            <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </button>
          <div className="px-8 py-4 bg-white/80 text-slate-700 border border-white/50 rounded-2xl font-bold shadow-lg flex items-center gap-2">
            <i className="fa-solid fa-coins text-amber-500"></i>
            Points:{" "}
            <span className="text-indigo-600 font-bold text-xl">
              {currentPoints.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto reveal opacity-0 transition-all duration-1000 translate-y-10 [&.active]:opacity-100 [&.active]:translate-y-0">
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
            <div className="text-2xl font-bold text-indigo-600">12.5k</div>
            <div className="text-xs font-semibold text-slate-500 uppercase">
              Active Students
            </div>
          </div>
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
            <div className="text-2xl font-bold text-pink-600">₹1.2Cr</div>
            <div className="text-xs font-semibold text-slate-500 uppercase">
              Scholarships
            </div>
          </div>
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
            <div className="text-2xl font-bold text-emerald-600">850+</div>
            <div className="text-xs font-semibold text-slate-500 uppercase">
              Partner Colleges
            </div>
          </div>
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
            <div className="text-2xl font-bold text-amber-600">4.8/5</div>
            <div className="text-xs font-semibold text-slate-500 uppercase">
              Trust Score
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 pb-20 space-y-24">
        {/* Foundation & Daily */}
        <section className="reveal opacity-0 transition-all duration-1000 translate-y-10 [&.active]:opacity-100 [&.active]:translate-y-0">
          <div className="flex items-end justify-between mb-8 border-b border-slate-200/50 pb-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 border-b-4 border-indigo-600 inline-block pb-1">
                Foundation & Daily
              </h2>
              <p className="text-slate-500 mt-2">
                Build your trust score and keep the streak alive.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RewardCard
              title="Onboarding & Trust"
              subtitle="Max Onboarding ≈ 130 pts"
              gradient="from-emerald-500 to-teal-600"
              icon="fa-shield-alt"
              tasks={[
                { id: "t1", label: "Sign up + Email Verify", points: 5 },
                {
                  id: "t2",
                  label: "Complete Full Profile",
                  points: 20,
                  isMultiStep: true,
                },
                { id: "t3", label: "Upload Certificates", points: 20 },
                { id: "t4", label: "Upload Resume", points: 20 },
                { id: "t5", label: "Phone Verification", points: 20 },
                { id: "t6", label: "College Verification", points: 50 },
              ]}
              completedTasks={completedTasks}
              partialTasks={partialTasks}
              onTaskClick={handleTaskClick}
            />
            <RewardCard
              title="Daily Engagement"
              subtitle="Consistent efforts pay off."
              gradient="from-orange-500 to-amber-500"
              icon="fa-fire"
              tasks={[
                { id: "t7", label: "Daily Login", points: 1 },
                { id: "t8", label: "Daily Task", points: 5 },
                { id: "t9", label: "7-Day Streak", points: 50 },
                { id: "t10", label: "30-Day Streak", points: 300 },
              ]}
              completedTasks={completedTasks}
              partialTasks={partialTasks}
              onTaskClick={handleTaskClick}
            />
          </div>
        </section>

        {/* Admissions & Academic */}
        <section className="reveal opacity-0 transition-all duration-1000 translate-y-10 [&.active]:opacity-100 [&.active]:translate-y-0">
          <div className="flex items-end justify-between mb-8 border-b border-slate-200/50 pb-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 border-b-4 border-cyan-600 inline-block pb-1">
                Core Academic Journey
              </h2>
              <p className="text-slate-500 mt-2">
                From discovery to enrollment and funding.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <RewardCard
              title="Discovery"
              subtitle="Explore your options."
              gradient="from-cyan-500 to-sky-600"
              icon="fa-search-location"
              tasks={[
                { id: "t11", label: "Save College/Course", points: 2 },
                { id: "t12", label: "Compare Colleges", points: 5 },
                { id: "t13", label: "Download Brochure", points: 5 },
                { id: "t14", label: "Attend Open Day", points: 30 },
              ]}
              completedTasks={completedTasks}
              partialTasks={partialTasks}
              onTaskClick={handleTaskClick}
            />
            <RewardCard
              title="Admissions"
              subtitle="High value milestones."
              gradient="from-indigo-600 to-blue-700"
              icon="fa-file-contract"
              isPremium
              tasks={[
                { id: "t15", label: "Submit Application", points: 80 },
                { id: "t16", label: "Upload All Documents", points: 40 },
                { id: "t17", label: "Receive Offer Letter", points: 200 },
                { id: "t18", label: "Accept Offer", points: 300 },
                {
                  id: "t19",
                  label: "Enroll via StudSphere",
                  points: 1200,
                  isBigWin: true,
                },
              ]}
              completedTasks={completedTasks}
              partialTasks={partialTasks}
              onTaskClick={handleTaskClick}
            />
            <RewardCard
              title="Scholarships"
              subtitle="Fund your future."
              gradient="from-amber-400 to-yellow-600"
              icon="fa-award"
              tasks={[
                { id: "t20", label: "View Scholarship", points: 1 },
                { id: "t21", label: "Apply", points: 40 },
                { id: "t22", label: "Shortlisted", points: 200 },
                { id: "t23", label: "Awarded", points: 2000, isBigWin: true },
              ]}
              completedTasks={completedTasks}
              partialTasks={partialTasks}
              onTaskClick={handleTaskClick}
            />
          </div>
        </section>

        {/* Leaderboard */}
        <section className="reveal opacity-0 transition-all duration-1000 translate-y-10 [&.active]:opacity-100 [&.active]:translate-y-0">
          <div className="bg-slate-900 rounded-2xl p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-[100px] opacity-20"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600 rounded-full blur-[100px] opacity-20"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/50 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">
                  Top Performers
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Rise to the Top
                </h2>
                <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                  Compete with students across the nation. Top 3 students every
                  month get exclusive internship opportunities and merch.
                </p>

                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                    Your Ranking
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/20">
                        ME
                      </div>
                      <div>
                        <div className="font-bold text-2xl">#1,402</div>
                        <div className="text-sm text-slate-500">Top 15%</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-3xl text-indigo-400">
                        {currentPoints.toLocaleString()}
                      </div>
                      <div className="text-xs text-slate-500 uppercase font-bold tracking-widest">
                        Points
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <LeaderboardItem
                  rank={1}
                  name="Priya Sharma"
                  score="84,500"
                  seed="Felix"
                  color="yellow"
                  status="Elite Scholar"
                />
                <LeaderboardItem
                  rank={2}
                  name="Aneesh K."
                  score="72,200"
                  seed="Aneesh"
                  color="slate"
                  status="IIT Bombay"
                />
                <LeaderboardItem
                  rank={3}
                  name="Sarah Jenkins"
                  score="68,950"
                  seed="Sarah"
                  color="orange"
                  status="Verified Pro"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed bottom-8 right-8 z-[300] animate-fadeInUp flex items-center gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-2xl min-w-[320px] transition-all`}
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden shrink-0 bg-gradient-to-br ${toast.isWarning ? "from-orange-400 to-red-500" : "from-green-400 to-emerald-600"}`}
          >
            <i
              className={`fas ${toast.isWarning ? "fa-exclamation" : "fa-check"} text-white text-xl`}
            ></i>
          </div>
          <div>
            <h4 className="font-bold text-white">{toast.title}</h4>
            <p className="text-slate-400 text-sm">
              {toast.message || (
                <>
                  You got{" "}
                  <span className="text-emerald-400 font-bold">
                    +{toast.points}
                  </span>{" "}
                  points{" "}
                  <i className="fa-solid fa-star text-xs text-emerald-400 ml-1"></i>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const RewardCard: React.FC<{
  title: string;
  subtitle: string;
  gradient: string;
  icon: string;
  tasks: any[];
  completedTasks: Set<string>;
  partialTasks: Set<string>;
  isPremium?: boolean;
  onTaskClick: (
    id: string,
    points: number,
    isMultiStep?: boolean,
    isBigWin?: boolean,
  ) => void;
}> = ({
  title,
  subtitle,
  gradient,
  icon,
  tasks,
  completedTasks,
  partialTasks,
  isPremium,
  onTaskClick,
}) => (
  <div
    className={`bg-white rounded-2xl p-2 border transition-all h-full flex flex-col ${isPremium ? "border-indigo-200 shadow-xl" : "border-slate-100 shadow-sm"}`}
  >
    <div
      className={`bg-gradient-to-br ${gradient} p-8 rounded-xl shadow-lg relative overflow-hidden mb-2`}
    >
      {isPremium && (
        <span className="absolute top-4 right-6 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
          Core Value
        </span>
      )}
      <h3 className="font-bold text-white text-2xl flex items-center gap-3">
        <i className={`fas ${icon}`}></i> {title}
      </h3>
      <p className="text-white/80 text-sm mt-2">{subtitle}</p>
    </div>
    <div className="p-4 space-y-3 flex-grow">
      {tasks.map((task) => {
        const isDone = completedTasks.has(task.id);
        const isPart = partialTasks.has(task.id);
        return (
          <button
            key={task.id}
            onClick={() =>
              onTaskClick(task.id, task.points, task.isMultiStep, task.isBigWin)
            }
            className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all group relative overflow-hidden ${
              isDone
                ? "bg-emerald-50 border-emerald-100 cursor-default"
                : "bg-slate-50/50 border-slate-100 hover:bg-white hover:border-indigo-100 hover:shadow-md"
            }`}
          >
            {isPart && (
              <div className="absolute left-0 top-0 h-full bg-emerald-100 w-1/2 transition-all"></div>
            )}
            <span
              className={`text-sm font-bold transition-colors relative z-10 ${isDone ? "text-emerald-700" : "text-slate-700"}`}
            >
              {task.label}
            </span>
            <div
              className={`relative z-10 text-xs font-bold px-3 py-1 rounded-full border transition-all ${
                isDone
                  ? "bg-emerald-500 text-white border-emerald-400"
                  : isPart
                    ? "bg-orange-100 text-orange-600 border-orange-200"
                    : "bg-white text-indigo-600 border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white"
              }`}
            >
              {isDone ? (
                <i className="fa-solid fa-check"></i>
              ) : isPart ? (
                "50%"
              ) : (
                `+${task.points}`
              )}
            </div>
          </button>
        );
      })}
    </div>
  </div>
);

const LeaderboardItem: React.FC<{
  rank: number;
  name: string;
  score: string;
  seed: string;
  color: string;
  status: string;
}> = ({ rank, name, score, seed, color, status }) => {
  const isGold = rank === 1;
  return (
    <div
      className={`flex items-center justify-between p-5 rounded-2xl transition-all border group hover:scale-[1.02] ${
        isGold
          ? "bg-gradient-to-r from-yellow-500/10 to-slate-800/50 border-yellow-500/30 shadow-xl shadow-yellow-500/5"
          : "bg-slate-800/50 border-slate-700"
      }`}
    >
      <div className="flex items-center gap-5">
        <div
          className={`w-8 text-center font-bold text-xl ${isGold ? "text-yellow-500" : "text-slate-400"}`}
        >
          {rank}
        </div>
        <img
          src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}`}
          className={`w-14 h-14 rounded-2xl bg-white/5 border-2 ${isGold ? "border-yellow-500" : "border-slate-700"}`}
          alt={name}
        />
        <div>
          <div className="font-bold text-lg">{name}</div>
          <div
            className={`text-xs font-bold uppercase tracking-wider ${isGold ? "text-yellow-500" : "text-slate-500"}`}
          >
            {status}
          </div>
        </div>
      </div>
      <div
        className={`text-xl font-bold ${isGold ? "text-yellow-400" : "text-white"}`}
      >
        {score}{" "}
        <span className="text-[10px] text-slate-500 uppercase tracking-widest ml-1">
          pts
        </span>
      </div>
    </div>
  );
};

export default RewardsPage;

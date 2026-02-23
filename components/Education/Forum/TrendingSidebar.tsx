import React from "react";

const TrendingSidebar: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Latest University Notices */}
      <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 overflow-hidden group hover:shadow-lg transition-all duration-500 pb-4">
        <div className="bg-white p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-black text-slate-900 text-xl tracking-tight">
            Latest University Notice
          </h3>
          <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></div>
        </div>
        <div className="space-y-0 px-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-4 transition-colors border-b border-slate-50 last:border-0"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="bg-[#EEF2FF] text-[#2563EB] px-3 py-1 rounded-md text-sm font-bold">
                  Scholarship
                </span>
                <span className="text-sm font-bold text-slate-400">8m ago</span>
              </div>
              <p className="text-sm leading-snug">
                <span className="font-black text-slate-900">
                  Studsphere Team
                </span>{" "}
                <span className="text-slate-500 font-bold ml-1 text-base">
                  New features added-explore the updated dashboard.
                </span>
              </p>
            </div>
          ))}
        </div>
        <div className="px-4 mt-2">
          <button className="w-full text-center py-4 text-base font-black text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl transition-all shadow-xl shadow-blue-500/10 active:scale-95">
            Finds More News
          </button>
        </div>
      </div>
    </div>
  );
};

const NoticeItem: React.FC<{
  board: string;
  color: string;
  time: string;
  title: string;
}> = ({ board, color, time, title }) => (
  <a href="#" className="block p-5 hover:bg-slate-50 transition-colors group">
    <div className="flex items-center justify-between mb-2">
      <span
        className={`text-[9px] font-black px-2 py-0.5 rounded-md border uppercase tracking-widest ${color}`}
      >
        {board}
      </span>
      <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
        {time}
      </span>
    </div>
    <p className="text-xs text-slate-700 font-bold leading-relaxed group-hover:text-primary-600 transition-colors">
      {title}
    </p>
  </a>
);

const ContributorItem: React.FC<{
  name: string;
  rep: string;
  seed: string;
  crown: string;
  isFollowing?: boolean;
}> = ({ name, rep, seed, crown, isFollowing }) => (
  <div className="flex items-center gap-4 group">
    <div className="relative">
      <img
        src={`https://api.dicebear.com/7.x/notionists/svg?seed=${seed}`}
        className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm"
        alt=""
      />
      <div className={`absolute -top-1.5 -left-1.5 ${crown} drop-shadow-md`}>
        <i className="fa-solid fa-crown text-sm"></i>
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="font-black text-xs text-slate-800 truncate uppercase tracking-tight">
        {name}
      </h4>
      <div className="flex items-center gap-2 mt-1">
        <i className="fa-solid fa-star text-amber-400 text-[10px]"></i>
        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
          {rep} Rep
        </span>
      </div>
    </div>
    <button
      className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${isFollowing ? "bg-slate-100 text-slate-500 hover:bg-slate-200" : "bg-primary-50 text-primary-600 hover:bg-primary-600 hover:text-white border border-primary-100"}`}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  </div>
);

export default TrendingSidebar;

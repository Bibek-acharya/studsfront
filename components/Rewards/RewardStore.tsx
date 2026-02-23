import React, { useState } from "react";

interface Voucher {
  id: number;
  title: string;
  description: string;
  cost: number;
  category: string;
  icon: string;
  gradient: string;
  badge?: string;
  locked?: boolean;
}

const vouchers: Voucher[] = [
  {
    id: 1,
    title: "Udemy Course - 50% Off",
    description:
      "Upgrade your skills with 50% off on any web dev or design course.",
    cost: 500,
    category: "Education",
    icon: "fa-brands fa-udemy",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    id: 2,
    title: "Campus Meal Deal",
    description:
      "Get one free full-course meal at the central campus cafeteria.",
    cost: 800,
    category: "Food",
    icon: "fa-solid fa-burger",
    gradient: "from-orange-400 to-red-500",
    badge: "Popular",
  },
  {
    id: 3,
    title: "Weekend Hiking Pass",
    description:
      'All-access pass for the "Valley View" trail, including gear rental.',
    cost: 1500,
    category: "Valley Trips",
    icon: "fa-solid fa-mountain-sun",
    gradient: "from-emerald-400 to-teal-600",
    badge: "New",
  },
  {
    id: 4,
    title: "Spotify Premium",
    description: "1-month ad-free music subscription code delivered instantly.",
    cost: 2000,
    category: "Entertainment",
    icon: "fa-brands fa-spotify",
    gradient: "from-cyan-400 to-blue-500",
    badge: "Best Value",
  },
  {
    id: 5,
    title: "Tech Bundle",
    description: "Wireless Mouse, Pad & USB-C Hub Essential Pack.",
    cost: 5000,
    category: "Tech",
    icon: "fa-solid fa-laptop-code",
    gradient: "from-gray-700 to-gray-900",
    locked: true,
  },
  {
    id: 6,
    title: "$50 Amazon Card",
    description: "Digital gift card valid for all Amazon US purchases.",
    cost: 8000,
    category: "Shopping",
    icon: "fa-brands fa-amazon",
    gradient: "from-yellow-400 to-orange-500",
    locked: true,
  },
];

const categories = [
  "All Rewards",
  "Education",
  "Food & Dining",
  "Valley Trips",
  "Tech & Gadgets",
];

const RewardStore: React.FC = () => {
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [claimedIds, setClaimedIds] = useState<Set<number>>(new Set());
  const [activeCategory, setActiveCategory] = useState("All Rewards");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [claimPhase, setClaimPhase] = useState<"initial" | "success">(
    "initial",
  );
  const [showToast, setShowToast] = useState(false);

  const handleRedeemClick = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setClaimPhase("initial");
    setIsModalOpen(true);
  };

  const handleClaim = () => {
    if (selectedVoucher) {
      setClaimPhase("success");
      setClaimedIds((prev) => new Set(prev).add(selectedVoucher.id));
    }
  };

  const handleDownload = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setIsModalOpen(false);
    }, 2000);
  };

  return (
    <div className="pt-24 pb-12 container mx-auto px-6 md:px-12 bg-gray-50 min-h-screen font-sans">
      {/* Hero Section */}
      <div className="relative w-full mb-12 group overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 shadow-2xl p-8 md:p-10 text-white">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-30 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex-1 w-full">
            <div className="inline-flex items-center gap-2 bg-blue-800/50 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-blue-400/30 text-blue-200">
              <i className="fa-solid fa-user-astronaut"></i> StudSphere Basic
              Tier
            </div>

            <div className="flex items-baseline gap-3 mb-2">
              <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white">
                2,450
              </h1>
              <span className="text-xl md:text-2xl font-medium text-blue-200/80">
                Redeemable Points
              </span>
            </div>

            <div className="mt-8 mb-6 bg-black/20 rounded-2xl p-5 border border-white/5 backdrop-blur-sm">
              <div className="flex justify-between text-xs font-bold text-blue-200 mb-3 uppercase tracking-wide">
                <span>Current Progress</span>
                <span>Silver Tier (5,000 Pts)</span>
              </div>
              <div className="relative h-4 bg-gray-900/50 rounded-full w-full border border-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 rounded-full"
                  style={{ width: "49%" }}
                ></div>
              </div>
              <p className="text-blue-200/70 text-xs mt-3 text-right">
                You need 2,550 more points to level up!
              </p>
            </div>

            <p className="text-blue-100 text-sm font-medium flex items-center gap-2">
              <i className="fa-solid fa-fire text-orange-400 animate-pulse"></i>{" "}
              Gain more points to unlock exclusive premium rewards.
            </p>
          </div>

          <div className="shrink-0 relative group perspective-1000 mx-auto md:mx-0">
            <div className="w-56 h-56 rounded-full bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center relative shadow-[0_0_40px_rgba(0,0,0,0.2)]">
              <i className="fa-solid fa-trophy text-7xl text-amber-300 drop-shadow-[0_10px_20px_rgba(217,119,6,0.5)] transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500"></i>
            </div>
            <div className="absolute -top-4 -right-4 text-yellow-300 text-xl animate-bounce">
              ✨
            </div>
            <div
              className="absolute bottom-4 -left-4 text-yellow-300 text-lg animate-bounce"
              style={{ animationDelay: "0.3s" }}
            >
              ✨
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-6 mb-2 no-scrollbar px-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition transform hover:-translate-y-0.5 whitespace-nowrap ${
              activeCategory === cat
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "bg-white text-gray-600 border border-gray-100 shadow-sm hover:shadow-md"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Vouchers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {vouchers.map((v) => {
          const isClaimed = claimedIds.has(v.id);
          return (
            <div
              key={v.id}
              className={`bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden group transition-all duration-300 ${!v.locked ? "hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1" : "grayscale opacity-70"} ${isClaimed ? "opacity-75 grayscale-[0.5]" : ""}`}
            >
              <div
                className={`h-40 bg-gradient-to-br ${v.gradient} flex items-center justify-center text-white relative overflow-hidden`}
              >
                <i
                  className={`${v.icon} text-6xl opacity-90 transform group-hover:scale-110 transition-transform duration-500`}
                ></i>
                {v.badge && (
                  <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                    {v.badge}
                  </span>
                )}
                {v.locked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/40">
                    <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg">
                      <i className="fa-solid fa-lock text-gray-600"></i>
                      <span className="text-xs font-bold text-gray-600 uppercase">
                        Locked
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col h-[calc(100%-10rem)]">
                <div className="mb-4">
                  <h3 className="font-bold text-gray-800 text-xl leading-tight">
                    {v.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                    {v.description}
                  </p>
                </div>

                {v.locked ? (
                  <div className="space-y-3 mt-auto">
                    <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      <span>2,450 / {v.cost.toLocaleString()} Pts</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-amber-500 h-2 rounded-full"
                        style={{ width: `${(2450 / v.cost) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                        Cost
                      </span>
                      <div className="text-amber-600 font-bold flex items-center gap-1.5 text-lg">
                        <i className="fa-solid fa-gem text-sm"></i>{" "}
                        <span>{v.cost.toLocaleString()}</span>
                      </div>
                    </div>
                    <button
                      disabled={isClaimed}
                      onClick={() => handleRedeemClick(v)}
                      className={`px-6 py-2.5 rounded-xl font-bold text-sm transition shadow-lg transform hover:scale-105 active:scale-95 ${
                        isClaimed
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                          : "bg-gray-900 hover:bg-black text-white"
                      }`}
                    >
                      {isClaimed ? "Claimed" : "Redeem"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Ticket Modal */}
      {isModalOpen && selectedVoucher && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fadeIn">
          <div
            className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div
            className={`relative w-full max-w-[320px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 transform ${claimPhase === "success" ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}
          >
            {/* Side Notches */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 rounded-full ${claimPhase === "success" ? "bg-slate-900" : "bg-slate-900"}`}
            ></div>
            <div
              className={`absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 rounded-full ${claimPhase === "success" ? "bg-slate-900" : "bg-slate-900"}`}
            ></div>

            {/* Header */}
            <div
              className={`p-6 text-center text-white transition-colors duration-500 ${claimPhase === "success" ? "bg-emerald-600" : "bg-blue-600"}`}
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm border border-white/30">
                <i
                  className={`fa-solid ${claimPhase === "success" ? "fa-check" : "fa-ticket"} text-xl`}
                ></i>
              </div>
              <h2 className="text-xl font-black uppercase tracking-widest">
                {claimPhase === "success" ? "Success" : "Confirm"}
              </h2>
              <p className="text-white/70 text-xs mt-1">
                {claimPhase === "success" ? "Voucher Ready" : "Redeem Points"}
              </p>
            </div>

            {/* Body */}
            <div className="p-8 text-center">
              <div className="mb-6">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                  Points Value
                </span>
                <div
                  className={`text-4xl font-black flex items-center justify-center gap-2 ${claimPhase === "success" ? "text-white" : "text-slate-900"}`}
                >
                  <i className="fa-solid fa-gem text-amber-500 text-2xl"></i>
                  {selectedVoucher.cost.toLocaleString()}
                </div>
              </div>

              <div className="space-y-4 border-t border-dashed border-gray-200 py-6 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Item</span>
                  <span className="font-bold truncate max-w-[150px]">
                    {selectedVoucher.title}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Ref ID</span>
                  <span
                    className={`px-2 py-0.5 rounded font-mono text-xs ${claimPhase === "success" ? "bg-slate-800 text-slate-300" : "bg-gray-100 text-gray-600"}`}
                  >
                    T-4892
                  </span>
                </div>
              </div>

              <div className="h-px w-full border-t-2 border-dashed border-gray-200 my-4"></div>

              {/* QR and Button */}
              <div
                className={`mt-2 p-4 rounded-2xl border ${claimPhase === "success" ? "bg-white border-white" : "bg-gray-50 border-gray-100"}`}
              >
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=StudSphereRedeem-${selectedVoucher.id}`}
                  alt="QR"
                  className="w-24 h-24 mx-auto mb-2 opacity-90 mix-blend-multiply"
                />
              </div>

              <div className="mt-8 space-y-3">
                {claimPhase === "initial" ? (
                  <button
                    onClick={handleClaim}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-black transition-all active:scale-95 shadow-xl"
                  >
                    Claim Reward
                  </button>
                ) : (
                  <button
                    onClick={handleDownload}
                    className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-700 transition-all active:scale-95 shadow-xl flex items-center justify-center gap-2"
                  >
                    <i className="fa-solid fa-arrow-down animate-bounce"></i>{" "}
                    Download Receipt
                  </button>
                )}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-2 text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-slate-200 transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] bg-slate-900 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 animate-fadeInUp">
          <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
            <i className="fa-solid fa-check text-xs"></i>
          </div>
          <span className="font-bold">Receipt saved to downloads!</span>
        </div>
      )}
    </div>
  );
};

export default RewardStore;

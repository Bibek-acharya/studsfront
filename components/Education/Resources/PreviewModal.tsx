import React from "react";
import { Resource } from "../../../lib/resources-data";

interface PreviewModalProps {
  resource: Resource | null;
  onClose: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ resource, onClose }) => {
  if (!resource) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 animate-fadeIn">
      <div
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col h-[90vh] animate-scaleIn">
        {/* Header */}
        <div className="bg-primary-600 px-8 py-6 text-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24"></div>
          <div className="relative z-10 flex items-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl">
              <i className={`fa-solid ${resource.icon} text-xl`}></i>
            </div>
            <div>
              <h3 className="font-black text-xl md:text-2xl tracking-tight leading-tight uppercase">
                {resource.title}
              </h3>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-200 mt-1">
                Verified Community Resource
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/10 flex items-center justify-center active:scale-90 relative z-10"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <div className="p-8 md:p-12 overflow-y-auto no-scrollbar grow bg-slate-50/50">
          {/* Metadata Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <MetaBadge
              icon="fa-star"
              label="Rating"
              val={`${resource.rating}/5.0`}
              color="amber"
            />
            <MetaBadge
              icon="fa-download"
              label="Downloads"
              val={resource.downloads}
              color="emerald"
            />
            <MetaBadge
              icon="fa-eye"
              label="Views"
              val={resource.views}
              color="blue"
            />
            <MetaBadge
              icon="fa-user-astronaut"
              label="Uploader"
              val={resource.author}
              color="purple"
            />
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left: Info */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-6">
                  Resource Summary
                </h4>
                <p className="text-slate-500 font-medium leading-relaxed mb-8">
                  {resource.content.summary ||
                    resource.content.description ||
                    "No summary provided. This verified study material covers key exam topics with clear explanations and diagrams."}
                </p>
                <div className="space-y-4 pt-8 border-t border-slate-50">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                    <span className="text-slate-300">File Type</span>
                    <span className="text-slate-700">
                      {resource.content.fileType}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                    <span className="text-slate-300">File Size</span>
                    <span className="text-slate-700">
                      {resource.content.file_size || "1.2 MB"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary-600 rounded-full blur-2xl opacity-40"></div>
                <h4 className="text-[10px] font-black text-primary-400 uppercase tracking-[0.2em] mb-6">
                  Reputation Points
                </h4>
                <p className="text-sm font-medium mb-8 leading-relaxed">
                  Download this resource and earn{" "}
                  <span className="text-primary-400 font-black">+10 Pts</span>{" "}
                  to level up your tier.
                </p>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-primary-500 w-3/4 rounded-full"></div>
                </div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                  Progress to Silver Tier
                </span>
              </div>
            </div>

            {/* Right: Preview (Mockup) */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xl h-[500px] flex flex-col relative group">
                <div className="bg-slate-100 p-4 border-b border-slate-200 flex justify-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                    <i className="fa-solid fa-magnifying-glass-plus text-xs text-slate-400"></i>
                  </div>
                  <div className="w-24 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-600 uppercase shadow-sm">
                    Page 1/12
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                    <i className="fa-solid fa-magnifying-glass-minus text-xs text-slate-400"></i>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-12 bg-slate-200/30 flex flex-col items-center gap-10 no-scrollbar">
                  <div className="w-full max-w-[500px] bg-white aspect-[1/1.414] shadow-2xl border border-slate-100 p-12 relative">
                    <div className="h-4 bg-slate-50 w-2/3 mb-10 rounded"></div>
                    <div className="space-y-4">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 bg-slate-50 rounded w-${i % 3 === 0 ? "full" : i % 3 === 1 ? "5/6" : "3/4"}`}
                        ></div>
                      ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent flex items-center justify-center p-8 text-center flex-col gap-6">
                      <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-2xl animate-bounce">
                        <i className="fa-solid fa-lock text-xl"></i>
                      </div>
                      <p className="text-slate-800 font-black uppercase text-xs tracking-widest">
                        Full Preview requires download
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white p-8 px-12 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-8 shrink-0">
          <div className="flex items-center gap-6">
            <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-colors flex items-center gap-3">
              <i className="fa-solid fa-flag text-xs"></i> Report Issue
            </button>
            <div className="w-px h-6 bg-slate-100"></div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">
              Ref ID: SS-RES-0{resource.id}92
            </p>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-8 py-4 bg-white border-2 border-slate-100 text-slate-400 font-black text-xs uppercase tracking-widest rounded-2xl hover:text-slate-600 transition-all"
            >
              Close
            </button>
            <button className="flex-1 sm:flex-none px-12 py-4 bg-primary-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary-500/30 hover:bg-primary-700 transition-all active:scale-95 flex items-center justify-center gap-3">
              <i className="fa-solid fa-download"></i> Download Full File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetaBadge: React.FC<{
  icon: string;
  label: string;
  val: string;
  color: string;
}> = ({ icon, label, val, color }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 group">
    <div
      className={`w-10 h-10 rounded-xl bg-${color}-50 text-${color}-600 flex items-center justify-center text-sm shadow-inner group-hover:scale-110 transition-transform`}
    >
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div>
      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-0.5">
        {label}
      </p>
      <p className="text-sm font-black text-slate-800 uppercase tracking-tight">
        {val}
      </p>
    </div>
  </div>
);

export default PreviewModal;

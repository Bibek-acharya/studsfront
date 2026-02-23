import React, { useState } from "react";

interface UploadModalProps {
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-fadeIn">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl animate-scaleIn overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-100 p-10 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-full blur-3xl opacity-30 -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <h3 className="font-black text-2xl text-slate-900 uppercase tracking-tight">
              Upload Material
            </h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
              Help others & earn reputation
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 bg-white rounded-2xl text-slate-300 hover:text-rose-500 transition-all shadow-sm border border-slate-100 flex items-center justify-center relative z-10"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <div className="p-10 space-y-10">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            className={`border-4 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer group relative overflow-hidden ${
              dragActive
                ? "border-primary-600 bg-primary-50"
                : "border-slate-100 bg-slate-50/50 hover:border-primary-200"
            }`}
          >
            <div className="w-16 h-16 bg-white shadow-xl rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary-600 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-cloud-arrow-up text-3xl"></i>
            </div>
            <p className="text-lg font-black text-slate-800 uppercase tracking-tight">
              Drop your file here
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">
              PDF, DOCX, JPG (Max 10MB)
            </p>
            <div className="absolute inset-0 opacity-0 cursor-pointer">
              <input type="file" className="w-full h-full" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                Resource Title
              </label>
              <input
                type="text"
                placeholder="e.g., Engineering Physics Chapter 1 Notes"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-primary-50 focus:border-primary-500 transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                  Category
                </label>
                <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest outline-none appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%23cbd5e1%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')] bg-[length:1.2em] bg-[right_1.25rem_center] bg-no-repeat transition-all">
                  <option>Notes</option>
                  <option>Syllabus</option>
                  <option>Old Questions</option>
                  <option>Solutions</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                  Academic Level
                </label>
                <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest outline-none appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%23cbd5e1%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')] bg-[length:1.2em] bg-[right_1.25rem_center] bg-no-repeat transition-all">
                  <option>Bachelors</option>
                  <option>Masters</option>
                  <option>+2 (NEB)</option>
                  <option>School (SEE)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-10 flex flex-col sm:flex-row justify-end gap-5 border-t border-slate-100 shrink-0">
          <button
            onClick={onClose}
            className="px-10 py-4 bg-white border-2 border-slate-200 text-slate-400 font-black text-xs uppercase tracking-widest rounded-2xl hover:text-slate-600 transition-all"
          >
            Cancel
          </button>
          <button className="px-12 py-4 bg-primary-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.15em] shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all active:scale-95 flex items-center justify-center gap-3">
            Confirm & Upload{" "}
            <i className="fa-solid fa-paper-plane text-[10px]"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;

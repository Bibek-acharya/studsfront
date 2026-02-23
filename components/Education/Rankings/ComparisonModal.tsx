import React from "react";
import { College } from "./types";
import { CloseIcon } from "./Icons";

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedColleges: College[];
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  selectedColleges,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-8 animate-fadeIn">
      <div
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-scaleIn">
        <div className="p-8 md:p-12 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
              Institution Comparison
            </h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">
              Side-by-side analysis of selected campuses
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 rounded-2xl bg-white text-slate-300 hover:text-rose-500 hover:rotate-90 transition-all flex items-center justify-center shadow-sm"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-x-auto p-8 md:p-12 no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-6 px-4 w-1/4"></th>
                {selectedColleges.map((c) => (
                  <th key={c.id} className="py-6 px-4">
                    <div className="flex flex-col items-center text-center">
                      <div
                        className={`w-20 h-20 rounded-2xl ${c.color} flex items-center justify-center text-white text-3xl font-black shadow-xl mb-6`}
                      >
                        {c.logo}
                      </div>
                      <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight leading-tight">
                        {c.name}
                      </h3>
                      <span className="text-[10px] font-black text-primary-600 bg-primary-50 px-3 py-1 rounded-full border border-primary-100 uppercase mt-3">
                        Rank #{c.rank}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm font-bold text-slate-600">
              <ComparisonRow
                label="Location"
                values={selectedColleges.map((c) => c.location)}
              />
              <ComparisonRow
                label="Est. Year"
                values={selectedColleges.map((c) => c.stats.year)}
              />
              <ComparisonRow
                label="Rating"
                values={selectedColleges.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-center gap-2 text-amber-500"
                  >
                    <i className="fa-solid fa-star"></i>
                    <span className="text-slate-900 font-black">
                      {c.stats.rating}
                    </span>
                  </div>
                ))}
              />
              <ComparisonRow
                label="Streams"
                values={selectedColleges.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-wrap justify-center gap-1.5"
                  >
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[8px] font-black bg-slate-50 border border-slate-100 px-2 py-0.5 rounded uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ))}
              />
            </tbody>
          </table>
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-center gap-6">
          <button
            onClick={onClose}
            className="px-10 py-4 bg-white border border-slate-200 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:text-slate-600 transition-all"
          >
            Close Window
          </button>
          <button className="px-10 py-4 bg-primary-600 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl shadow-primary-500/20 hover:bg-primary-700 active:scale-95 transition-all">
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

const ComparisonRow: React.FC<{ label: string; values: any[] }> = ({
  label,
  values,
}) => (
  <tr className="border-b border-slate-50 group">
    <td className="py-6 px-4">
      <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] group-hover:text-primary-600 transition-colors">
        {label}
      </span>
    </td>
    {values.map((v, i) => (
      <td key={i} className="py-6 px-4 text-center">
        {typeof v === "string" ? (
          <span className="text-slate-700 uppercase tracking-widest text-xs">
            {v}
          </span>
        ) : (
          v
        )}
      </td>
    ))}
  </tr>
);

export default ComparisonModal;

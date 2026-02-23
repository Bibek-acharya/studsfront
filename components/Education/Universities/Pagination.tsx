
import React from 'react';

const Pagination: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <button disabled className="w-12 h-12 rounded-2xl flex items-center justify-center border border-slate-100 text-slate-200 transition-all opacity-40 cursor-not-allowed">
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button className="w-12 h-12 rounded-2xl flex items-center justify-center border border-primary-600 bg-primary-600 text-white font-black text-sm shadow-xl shadow-primary-500/20">
        1
      </button>
      <button className="w-12 h-12 rounded-2xl flex items-center justify-center border border-slate-100 bg-white text-slate-400 hover:border-primary-100 hover:text-primary-600 transition-all font-black text-sm shadow-sm">
        2
      </button>
      <button className="w-12 h-12 rounded-2xl flex items-center justify-center border border-slate-100 bg-white text-slate-400 hover:border-primary-100 hover:text-primary-600 transition-all font-black text-sm shadow-sm">
        3
      </button>
      <span className="text-slate-300 font-bold px-2">...</span>
      <button className="w-12 h-12 rounded-2xl flex items-center justify-center border border-slate-100 bg-white text-slate-400 hover:border-primary-100 hover:text-primary-600 transition-all font-black text-sm shadow-sm">
        12
      </button>
      <button className="w-12 h-12 rounded-2xl flex items-center justify-center border border-slate-100 bg-white text-slate-400 hover:border-primary-100 hover:text-primary-600 transition-all shadow-sm hover:shadow-lg">
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default Pagination;

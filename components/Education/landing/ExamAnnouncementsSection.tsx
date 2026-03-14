const ExamAnnouncementsSection = ({ onNavigate }: any) => (
<main className="max-w-[1380px] mx-auto py-12 md:py-16">
  {/* Header Section */}
  <div className="mb-12 flex flex-col items-center text-center">
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
      Find All Exam Announcements Easily.
    </h2>
    <p className="text-gray-500 mt-1 text-sm sm:text-base">
      Discover institutions that match your academic profile and preferences.
    </p>
  </div>
  {/* Cards Grid (1 col on mobile, 2 on tablet, 4 on desktop) */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Card 1 */}
    <article className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 group flex flex-col">
      <div className="relative h-36 sm:h-40 overflow-hidden bg-slate-100">
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop"
          alt="Medical Lab"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold uppercase tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Ongoing
          </span>
        </div>
        <h2 className="text-base sm:text-lg font-bold text-slate-800 mb-1 leading-tight line-clamp-2">
          Staff Nurse (PCL Nursing)
        </h2>
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500 mb-3">
          <i data-lucide="building-2" className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">CTEVT</span>
          <span className="text-slate-300">|</span>
          <span className="truncate">Medical</span>
        </div>
        <div className="bg-slate-50 rounded-lg p-2.5 flex justify-between items-center mb-4 border border-slate-100 mt-auto">
          <div>
            <p className="text-[9px] text-slate-400 font-medium uppercase tracking-wider mb-0.5">
              Exam Date
            </p>
            <p className="text-xs font-semibold text-slate-700">Aug 05, 2026</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-slate-400 font-medium uppercase tracking-wider mb-0.5">
              Nepali Date
            </p>
            <p className="text-xs font-semibold text-slate-700">
              Shrawan 20, 2082
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-auto">
          <button className="flex-1 py-2 px-3 bg-white border border-slate-200 text-slate-700 font-medium text-xs rounded-lg hover:bg-slate-50 transition-colors focus:ring-2 focus:ring-slate-200 outline-none">
            Details
          </button>
          <button className="flex-1 py-2 px-3 bg-blue-600 text-white font-medium text-xs rounded-lg hover:bg-blue-700 transition-colors shadow-sm focus:ring-2 focus:ring-blue-300 outline-none">
            Apply Now
          </button>
          <button className="w-9 h-[34px] flex-shrink-0 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-colors focus:ring-2 focus:ring-slate-200 outline-none">
            <i data-lucide="heart" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
    {/* Card 2 */}
    <article className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 group flex flex-col">
      <div className="relative h-36 sm:h-40 overflow-hidden bg-slate-100">
        <img
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop"
          alt="Computer Science"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold uppercase tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Ongoing
          </span>
        </div>
        <h2 className="text-base sm:text-lg font-bold text-slate-800 mb-1 leading-tight line-clamp-2">
          B.Sc. CSIT Entrance Exam
        </h2>
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500 mb-3">
          <i data-lucide="building-2" className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">Tribhuvan University</span>
          <span className="text-slate-300">|</span>
          <span className="truncate">IT</span>
        </div>
        <div className="bg-slate-50 rounded-lg p-2.5 flex justify-between items-center mb-4 border border-slate-100 mt-auto">
          <div>
            <p className="text-[9px] text-slate-400 font-medium uppercase tracking-wider mb-0.5">
              Exam Date
            </p>
            <p className="text-xs font-semibold text-slate-700">Sep 12, 2026</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-slate-400 font-medium uppercase tracking-wider mb-0.5">
              Nepali Date
            </p>
            <p className="text-xs font-semibold text-slate-700">
              Bhadra 27, 2083
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-auto">
          <button className="flex-1 py-2 px-3 bg-white border border-slate-200 text-slate-700 font-medium text-xs rounded-lg hover:bg-slate-50 transition-colors focus:ring-2 focus:ring-slate-200 outline-none">
            Details
          </button>
          <button className="flex-1 py-2 px-3 bg-blue-600 text-white font-medium text-xs rounded-lg hover:bg-blue-700 transition-colors shadow-sm focus:ring-2 focus:ring-blue-300 outline-none">
            Apply Now
          </button>
          <button className="w-9 h-[34px] flex-shrink-0 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-colors focus:ring-2 focus:ring-slate-200 outline-none">
            <i data-lucide="heart" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
    {/* Card 3 */}
    <article className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 group flex flex-col">
      <div className="relative h-36 sm:h-40 overflow-hidden bg-slate-100">
        <img
          src="https://images.unsplash.com/photo-1541888086925-920a0eb414f5?q=80&w=800&auto=format&fit=crop"
          alt="Engineering"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100 text-[10px] font-bold uppercase tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Upcoming
          </span>
        </div>
        <h2 className="text-base sm:text-lg font-bold text-slate-800 mb-1 leading-tight line-clamp-2">
          Diploma in Civil Engineering
        </h2>
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500 mb-3">
          <i data-lucide="building-2" className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">CTEVT</span>
          <span className="text-slate-300">|</span>
          <span className="truncate">Engineering</span>
        </div>
        <div className="bg-slate-50 rounded-lg p-2.5 flex justify-between items-center mb-4 border border-slate-100 mt-auto">
          <div>
            <p className="text-[9px] text-slate-400 font-medium uppercase tracking-wider mb-0.5">
              Exam Date
            </p>
            <p className="text-xs font-semibold text-slate-700">Oct 20, 2026</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-slate-400 font-medium uppercase tracking-wider mb-0.5">
              Nepali Date
            </p>
            <p className="text-xs font-semibold text-slate-700">
              Kartik 04, 2083
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-auto">
          <button className="flex-1 py-2 px-3 bg-white border border-slate-200 text-slate-700 font-medium text-xs rounded-lg hover:bg-slate-50 transition-colors focus:ring-2 focus:ring-slate-200 outline-none">
            Details
          </button>
          <button className="flex-1 py-2 px-3 bg-blue-600 text-white font-medium text-xs rounded-lg hover:bg-blue-700 transition-colors shadow-sm focus:ring-2 focus:ring-blue-300 outline-none">
            Apply Now
          </button>
          <button className="w-9 h-[34px] flex-shrink-0 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-colors focus:ring-2 focus:ring-slate-200 outline-none">
            <i data-lucide="heart" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
    {/* Card 4 */}
    <article className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 group flex flex-col">
      <div className="relative h-36 sm:h-40 overflow-hidden bg-slate-100">
        <img
          src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop"
          alt="Medical Entrance"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-100 text-[10px] font-bold uppercase tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Closing
            Soon
          </span>
        </div>
        <h2 className="text-base sm:text-lg font-bold text-slate-800 mb-1 leading-tight line-clamp-2">
          MECEE-BL (MBBS/BDS)
        </h2>
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500 mb-3">
          <i data-lucide="building-2" className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">MEC</span>
          <span className="text-slate-300">|</span>
          <span className="truncate">Medical</span>
        </div>
        <div className="bg-slate-50 rounded-lg p-2.5 flex justify-between items-center mb-4 border border-slate-100 mt-auto">
          <div>
            <p className="text-[9px] text-slate-400 font-medium uppercase tracking-wider mb-0.5">
              Exam Date
            </p>
            <p className="text-xs font-semibold text-slate-700">Nov 15, 2026</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-slate-400 font-medium uppercase tracking-wider mb-0.5">
              Nepali Date
            </p>
            <p className="text-xs font-semibold text-slate-700">
              Mangsir 01, 2083
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-auto">
          <button className="flex-1 py-2 px-3 bg-white border border-slate-200 text-slate-700 font-medium text-xs rounded-lg hover:bg-slate-50 transition-colors focus:ring-2 focus:ring-slate-200 outline-none">
            Details
          </button>
          <button className="flex-1 py-2 px-3 bg-blue-600 text-white font-medium text-xs rounded-lg hover:bg-blue-700 transition-colors shadow-sm focus:ring-2 focus:ring-blue-300 outline-none">
            Apply Now
          </button>
          <button className="w-9 h-[34px] flex-shrink-0 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-colors focus:ring-2 focus:ring-slate-200 outline-none">
            <i data-lucide="heart" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  </div>
</main>

);

export default ExamAnnouncementsSection;
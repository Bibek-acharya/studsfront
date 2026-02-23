import React from "react";
import { useQuery } from "@tanstack/react-query";
import EntranceHero from "./EntranceHero";
import EntranceSidebar from "./EntranceSidebar";
import EntranceCard from "./EntranceCard";
import { MOCK_EXAMS } from "./Constants";
import { apiService } from "../../../services/api";

interface EntranceDiscoveryPageProps {
  onNavigate: (view: any, data?: any) => void;
}

const EntranceDiscoveryPage: React.FC<EntranceDiscoveryPageProps> = ({
  onNavigate,
}) => {
  const { data } = useQuery({
    queryKey: ["education-exams"],
    queryFn: () => apiService.getEducationExams(),
  });

  const exams =
    data?.data?.exams?.map((exam) => ({
      id: exam.id,
      title: exam.title,
      university: exam.board,
      faculty: exam.type,
      status:
        exam.status === "active"
          ? "Ongoing"
          : exam.status === "upcoming"
            ? "Upcoming"
            : "Closed",
      examDate: exam.examDate,
      nepaliDate: exam.formDeadline,
      imageUrl:
        "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
    })) || MOCK_EXAMS;

  const handleViewDetails = (id: string) => {
    onNavigate("examDetails", { id });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-jakarta">
      <EntranceHero />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <EntranceSidebar onReset={() => console.log("reset filters")} />
          </aside>

          {/* Results Area */}
          <div className="lg:col-span-9">
            {/* Active Filters Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
              <div className="flex items-center flex-wrap gap-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mr-2">
                  Active:
                </span>
                <ActiveFilterChip label="Bachelor" />
                <ActiveFilterChip label="TU Affiliated" />
                <button className="text-[10px] font-black text-primary-600 hover:text-primary-800 transition-colors uppercase tracking-widest">
                  Clear All
                </button>
              </div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                Showing <span className="text-slate-900 font-black">{exams.length}</span>{" "}
                results
              </p>
            </div>

            {/* Grid of Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {exams.map((exam) => (
                <EntranceCard
                  key={exam.id}
                  exam={exam}
                  onViewDetails={handleViewDetails}
                />
              ))}

              {/* Promo Banner in Grid */}
              <div className="md:col-span-2 relative h-64 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer animate-fadeInUp">
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  alt="Entrance Prep"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent flex items-center p-12">
                  <div className="max-w-md text-white">
                    <span className="bg-primary-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] mb-4 inline-block shadow-lg">
                      Mentorship
                    </span>
                    <h3 className="text-3xl font-black mb-4 leading-tight">
                      Master your entrance with top tutors.
                    </h3>
                    <p className="text-slate-300 font-medium text-sm mb-8 leading-relaxed">
                      Join our bridge course network to increase your chances of
                      getting into constituent campuses by 3x.
                    </p>
                    <button className="bg-white text-slate-900 px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-all active:scale-95">
                      Explore Tutors
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination Placeholder */}
            <div className="mt-16 flex justify-center items-center gap-3">
              <PageBtn icon="fa-chevron-left" disabled />
              <PageBtn label="1" active />
              <PageBtn label="2" />
              <PageBtn label="3" />
              <PageBtn icon="fa-chevron-right" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const ActiveFilterChip: React.FC<{ label: string }> = ({ label }) => (
  <div className="inline-flex items-center bg-white border border-slate-200 px-4 py-2 rounded-xl text-[10px] font-black text-slate-600 shadow-sm transition-all hover:border-primary-100">
    {label}
    <button className="ml-3 text-slate-300 hover:text-rose-500 transition-colors">
      <i className="fa-solid fa-xmark"></i>
    </button>
  </div>
);

const PageBtn: React.FC<{
  label?: string;
  icon?: string;
  active?: boolean;
  disabled?: boolean;
}> = ({ label, icon, active, disabled }) => (
  <button
    disabled={disabled}
    className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-xs transition-all border ${
      active
        ? "bg-primary-600 text-white border-primary-600 shadow-xl shadow-primary-500/20"
        : "bg-white text-slate-400 border-slate-100 hover:border-primary-200 hover:text-primary-600 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
    }`}
  >
    {icon ? <i className={`fa-solid ${icon}`}></i> : label}
  </button>
);

export default EntranceDiscoveryPage;

import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import AdmissionDiscoveryCard from "./AdmissionDiscoveryCard";
import AdmissionFeaturedCard from "./AdmissionFeaturedCard";
import AdmissionFilterSidebar from "./AdmissionFilterSidebar";
import { cardsByLevel, levelMeta, AdmissionLevel, AdmissionCardData } from "./admissionMockData";

interface AdmissionsDiscoveryPageProps {
  onNavigate: (view: any, data?: any) => void;
}

const AdmissionsDiscoveryPage: React.FC<AdmissionsDiscoveryPageProps> = ({ onNavigate }) => {
  const location = useLocation();

  const getLevelFromState = (state: any): AdmissionLevel => {
    const level = state?.level;
    const validLevels: AdmissionLevel[] = ["high-school", "alevel", "diploma", "bachelor", "master"];
    return validLevels.includes(level) ? level : "high-school";
  };

  const [activeLevel, setActiveLevel] = useState<AdmissionLevel>(getLevelFromState(location.state));
  const [filters, setFilters] = useState<any>({});

  useEffect(() => {
    setActiveLevel(getLevelFromState(location.state));
  }, [location.state]);

  const cards = useMemo(() => cardsByLevel[activeLevel] || [], [activeLevel]);

  const filteredCards = useMemo(() => {
    let result = [...cards];

    if (!filters) return result;

    // 1. Stream/Programs
    if (filters.streams?.length > 0) {
      result = result.filter(card => 
        (card.programs as string[]).some(p => filters.streams.includes(p))
      );
    }

    // 2. Location
    if (filters.province) {
      result = result.filter(card => card.province === filters.province);
    }
    if (filters.district) {
      result = result.filter(card => card.district === filters.district);
    }
    if (filters.city) {
      result = result.filter(card => card.city === filters.city);
    }

    // 3. Fee
    if (filters.maxFee !== undefined) {
      result = result.filter(card => (card.fee || 0) <= filters.maxFee);
    }

    // 4. College Type
    if (filters.collegeTypes?.length > 0) {
      result = result.filter(card => filters.collegeTypes.includes(card.type));
    }

    // 5. Scholarships
    if (filters.scholarships?.length > 0) {
      result = result.filter(card => 
        card.scholarships?.some(s => filters.scholarships.includes(s))
      );
    }

    // 6. Facilities
    if (filters.facilities?.length > 0) {
      result = result.filter(card => 
        card.facilities?.some(f => filters.facilities.includes(f))
      );
    }

    // 7. Sort
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "Rating: High to Low":
          result.sort((a, b) => b.rating - a.rating);
          break;
        case "Fee: Low to High":
          result.sort((a, b) => (a.fee || 0) - (b.fee || 0));
          break;
        case "Fee: High to Low":
          result.sort((a, b) => (b.fee || 0) - (a.fee || 0));
          break;
      }
    }

    return result;
  }, [cards, filters]);

  const featuredCards = useMemo(() => cards.filter(c => c.featured).slice(0, 3), [cards]);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 text-gray-800 md:p-6 lg:p-8">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 lg:flex-row lg:flex-nowrap lg:gap-8">
        
        {/* Sidebar */}
        <aside className="w-full shrink-0 lg:w-[320px] xl:w-[340px]">
          <AdmissionFilterSidebar 
            activeLevel={activeLevel} 
            onReset={() => setFilters({})} 
            onFilterChange={(f) => setFilters(f)} 
          />
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1 space-y-8">
          
          {/* Header
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
               <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                 {activeLevel.charAt(0).toUpperCase() + activeLevel.slice(1).replace("-", " ")} Admissions
               </h1>
            </div>
          </div> */}

          {/* Cards Grid Section - Part 1 (First 2 rows/8 cards) */}
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredCards.slice(0, 6).map((card) => (
                <AdmissionDiscoveryCard key={`discovery-${card.id}`} card={card} onNavigate={onNavigate} />
              ))}
            </div>
          </section>

          {/* Featured Cards Section (Inserted after 2 rows) */}
          {featuredCards.length > 0 && (
            <section className="bg-gradient-to-br from-[#1053F3] to-[#2563EB] rounded-2xl p-5 md:p-8 flex flex-col gap-6 shadow-xl shadow-blue-900/10">
              <div className="flex justify-between items-end text-white px-1">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight">{levelMeta[activeLevel].featuredTitle}</h2>
                  <p className="text-blue-100 text-sm mt-1">{levelMeta[activeLevel].subtitle}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredCards.map((card) => (
                  <AdmissionFeaturedCard 
                    key={`featured-${card.id}`} 
                    card={{
                      ...card, 
                      secondaryBadge: card.tag?.text || "Featured", 
                      badgeColor: card.tag?.color || "bg-[#0d6efd]",
                      title: card.title || `Admission open for ${ (card.programs as string[])[0]} and ${ (card.programs as string[])[1] || 'others'} 2026`
                    }} 
                    onNavigate={onNavigate} 
                  />
                ))}
              </div>
            </section>
          )}

          {/* Regular Results Section - Part 2 */}
          {filteredCards.length > 6 && (
            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredCards.slice(6).map((card) => (
                  <AdmissionDiscoveryCard key={`discovery-rem-${card.id}`} card={card} onNavigate={onNavigate} />
                ))}
              </div>
            </section>
          )}

          {filteredCards.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-dashed border-gray-200">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                 <i className="fa-solid fa-magnifying-glass text-[32px]"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">No matching results</h3>
              <p className="text-gray-500 text-sm px-4 text-center">Try adjusting your filters in the sidebar to find more colleges.</p>
              <button onClick={() => setFilters({})} className="mt-5 text-blue-600 font-bold hover:underline">Reset all filters</button>
            </div>
          )}

          {/* Pagination */}
          {filteredCards.length > 0 && (
            <div className="mt-12 flex items-center justify-center gap-2 pb-8">
              <button className="h-10 w-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 cursor-not-allowed" disabled>
                <i className="fa-solid fa-chevron-left text-[12px]"></i>
              </button>
              <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-600 text-[14px] font-bold text-white shadow-lg shadow-blue-600/20">1</button>
              <button className="h-10 w-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-[14px] font-bold text-gray-600 hover:bg-gray-50 transition-colors">2</button>
              <button className="h-10 w-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-[14px] font-bold text-gray-600 hover:bg-gray-50 transition-colors">3</button>
              <span className="flex h-10 w-10 items-center justify-center text-gray-400">...</span>
              <button className="h-10 w-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-[14px] font-bold text-gray-600 hover:bg-gray-50 transition-colors">12</button>
              <button className="h-10 w-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors">
                 <i className="fa-solid fa-chevron-right text-[12px]"></i>
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdmissionsDiscoveryPage;

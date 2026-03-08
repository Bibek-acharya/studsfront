import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AdmissionsHero from "./AdmissionsHero";
import SidebarFilters from "./Sidebar";
import CollegeCard from "./CollegeCard";
import AdmissionDetails from "./AdmissionDetails";
import { COLLEGES } from "./Constants";
import { College } from "./types";
import { apiService } from "../../../services/api";

interface AdmissionsDiscoveryPageProps {
  onNavigate: (view: any) => void;
}

const AdmissionsDiscoveryPage: React.FC<AdmissionsDiscoveryPageProps> = ({
  onNavigate,
}) => {
  const [view, setView] = useState<"search" | "details">("search");
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(false);

  const { data } = useQuery({
    queryKey: ["education-admissions"],
    queryFn: () => apiService.getEducationAdmissions(),
  });

  const colleges: College[] = (data?.data?.colleges as College[]) || COLLEGES;

  const handleViewDetails = async (college: College) => {
    setLoading(true);
    try {
      // Try to fetch real data from backend
      const response = await apiService.getCollegeById(parseInt(college.id));
      if (response.data) {
        const apiCollege = colleges.find((c) => c.id === college.id);
        const mergedCollege: College = {
          ...response.data,
          id: college.id,
          description: response.data.description || apiCollege?.description || college.description || "",
          programs: apiCollege?.programs || college.programs || [],
          facilities: apiCollege?.facilities || college.facilities || [],
          phoneNumber: response.data.phone || apiCollege?.phoneNumber || "",
          contactEmail: response.data.email || apiCollege?.contactEmail || "",
          website: response.data.website || apiCollege?.website || "",
          logo: response.data.image_url || apiCollege?.logo || "",
          university: response.data.affiliation || apiCollege?.university || "",
        };
        setSelectedCollege(mergedCollege);
      } else {
        // Fallback to mock data if API fetch fails
        setSelectedCollege(college);
      }
    } catch (error) {
      console.error("Error fetching college details:", error);
      // Fallback to mock data
      setSelectedCollege(college);
    } finally {
      setLoading(false);
      setView("details");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setView("search");
    setSelectedCollege(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getRelatedColleges = (currentId: string) => {
    return colleges.filter((c) => c.id !== currentId).slice(0, 4);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {view === "search" ? (
        <>
          <AdmissionsHero />

          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
              <aside className="lg:col-span-3">
                <div className="sticky top-24">
                  <SidebarFilters />
                </div>
              </aside>

              <main className="lg:col-span-9">
                <div className="mb-10">
                  <div className="flex items-center gap-4 mb-6 flex-wrap">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      Active :
                    </span>
                    <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-1.5 rounded-xl text-[10px] font-black text-slate-600 shadow-sm">
                      Bachelor
                      <button className="hover:text-rose-500 transition-colors">
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <button className="text-[10px] font-black text-primary-600 hover:text-primary-800 transition-colors uppercase tracking-widest">
                      Clear All
                    </button>
                  </div>
                  <h4 className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                    Showing{" "}
                    <span className="text-slate-900 font-black">
                      {colleges.length}
                    </span>{" "}
                    Results for{" "}
                    <span className="text-primary-600 font-black">
                      2025 Admissions
                    </span>
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {colleges.slice(0, 2).map((college) => (
                    <CollegeCard
                      key={college.id}
                      college={college}
                      onViewDetails={handleViewDetails}
                    />
                  ))}

                  {/* Sponsored Banner */}
                  <div className="md:col-span-2 relative min-h-[300px] md:h-64 rounded-xl overflow-hidden shadow-2xl group cursor-pointer animate-fadeInUp">
                    <img
                      src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
                      alt="Featured Admission"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-blue-900/95 via-blue-900/70 md:via-blue-900/40 to-transparent flex flex-col justify-center p-6 md:p-12 text-white">
                      <span className="inline-block w-fit px-4 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-[10px] font-black tracking-widest mb-4 uppercase">
                        Featured Partner
                      </span>
                      <h2 className="text-2xl md:text-4xl font-black mb-2 tracking-tight">
                        ADMISSION OPEN 2025
                      </h2>
                      <p className="text-base md:text-xl font-bold text-blue-300 mb-6 md:mb-8 uppercase tracking-widest">
                        Tribhuvan University Affiliated
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <button className="flex-1 sm:flex-none px-8 py-3 bg-white text-blue-600 font-black text-xs uppercase tracking-widest rounded-xl shadow-xl hover:bg-blue-50 transition-all">
                          Inquiry Now
                        </button>
                        <button className="flex-1 sm:flex-none px-8 py-3 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-xl hover:bg-blue-700 transition-all">
                          Details
                        </button>
                      </div>
                    </div>
                  </div>

                  {colleges.slice(2).map((college) => (
                    <CollegeCard
                      key={college.id}
                      college={college}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              </main>
            </div>
          </div>
        </>
      ) : loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-slate-600 font-semibold">Loading college details...</p>
          </div>
        </div>
      ) : (
        selectedCollege && (
          <AdmissionDetails
            college={selectedCollege}
            relatedColleges={getRelatedColleges(selectedCollege.id)}
            onBack={handleBack}
            onViewDetails={handleViewDetails}
          />
        )
      )}
    </div>
  );
};

export default AdmissionsDiscoveryPage;

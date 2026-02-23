import React, { useState, useMemo } from "react";
import ResourcesSidebar from "./ResourcesSidebar";
import ResourcesHero from "./ResourcesHero";
import FilterEngine from "./FilterEngine";
import ResourceCard from "./ResourceCard";
import PreviewModal from "./PreviewModal";
import UploadModal from "./UploadModal";
import { RESOURCE_DATA, ResourceType } from "../../../lib/resources-data";

interface ResourcesPageProps {
  onNavigate: (view: any) => void;
}

const ResourcesPage: React.FC<ResourcesPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<ResourceType>("all");
  const [selectedResourceId, setSelectedResourceId] = useState<number | null>(
    null,
  );
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const filteredResources = useMemo(() => {
    let result = [...RESOURCE_DATA];
    if (activeTab !== "all") {
      result = result.filter((r) => r.type === activeTab);
    }
    return result.sort((a, b) => b.id - a.id);
  }, [activeTab]);

  const selectedResource = useMemo(
    () => RESOURCE_DATA.find((r) => r.id === selectedResourceId) || null,
    [selectedResourceId],
  );

  const tabs: { label: string; value: ResourceType }[] = [
    { label: "All Resources", value: "all" },
    { label: "Notes & Summary", value: "notes" },
    { label: "Syllabus", value: "syllabus" },
    { label: "Books & Pdf", value: "books" },
    { label: "Solutions", value: "solutions" },
    { label: "Study Guides", value: "guides" },
  ];

  const handleBrowseClick = () => {
    document
      .getElementById("resource-content")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white font-jakarta">
      <ResourcesHero
        onUploadClick={() => setIsUploadModalOpen(true)}
        onBrowseClick={handleBrowseClick}
      />

      <main
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8"
        id="resource-content"
      >
        {/* Sidebar */}
        <aside className="lg:col-span-3">
          <ResourcesSidebar />
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-6">
          <div className="space-y-5">
            <div className="bg-slate-50 p-1 rounded-xl inline-flex flex-wrap gap-1.5 mb-2 border border-slate-100">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-sm
                    ${
                      activeTab === tab.value
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                        : "bg-white text-slate-500 hover:bg-slate-100"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Showing {filteredResources.length} results
              </h3>
              <div className="flex gap-2">
                <div className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-2 border border-blue-100">
                  TU <i className="fa-solid fa-xmark cursor-pointer"></i>
                </div>
                <button className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors">
                  Clear
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredResources.length > 0 ? (
                filteredResources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    onPreview={setSelectedResourceId}
                  />
                ))
              ) : (
                <div className="col-span-full bg-white rounded-2xl py-16 text-center border border-slate-100 shadow-sm">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-4 text-slate-200">
                    <i className="fa-solid fa-folder-open text-3xl"></i>
                  </div>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                    No resources found.
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-center pt-6">
              <button className="bg-white hover:bg-slate-50 text-slate-400 border border-slate-200 px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm transition-all flex items-center gap-2 group">
                Load More
                <i className="fa-solid fa-chevron-down group-hover:translate-y-0.5 transition-transform"></i>
              </button>
            </div>
          </div>
        </div>
      </main>

      {selectedResourceId && (
        <PreviewModal
          resource={selectedResource}
          onClose={() => setSelectedResourceId(null)}
        />
      )}

      {isUploadModalOpen && (
        <UploadModal onClose={() => setIsUploadModalOpen(false)} />
      )}
    </div>
  );
};

export default ResourcesPage;

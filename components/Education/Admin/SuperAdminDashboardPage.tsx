import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LayoutDashboard, Building2, Plus, ArrowLeft, LogOut } from "lucide-react";
import { apiService, University } from "../../../services/api";
import { useAuth } from "../../../services/AuthContext";
import UniversityList from "./UniversityList";
import UniversityForm from "./UniversityForm";

const SuperAdminDashboardPage: React.FC = () => {
  const { user, token, logout } = useAuth();
  const queryClient = useQueryClient();
  
  const [currentView, setCurrentView] = useState<"list" | "form">("list");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // Fetch Universities
  const universitiesQuery = useQuery({
    queryKey: ["admin-universities"],
    queryFn: () => apiService.getUniversities(),
    enabled: !!token,
  });

  const universities = universitiesQuery.data?.data?.universities || [];

  const filteredUniversities = useMemo(() => {
    let result = universities;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(u => 
        u.name.toLowerCase().includes(q) || 
        u.location.toLowerCase().includes(q)
      );
    }
    // Note: status filtering might need a "status" field in the database if it doesn't exist
    // For now, mapping from isPopular or just showing all
    return result;
  }, [universities, search]);

  const handleCreate = () => {
    setEditingId(null);
    setCurrentView("form");
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    setCurrentView("form");
  };

  const deleteUniversityMutation = useMutation({
    mutationFn: (id: number) => apiService.deleteUniversity(token!, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-universities"] });
    },
  });

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this university?")) {
      try {
        await deleteUniversityMutation.mutateAsync(id);
      } catch (err) {
        alert("Delete failed: " + (err as Error).message);
      }
    }
  };

  const handleSaveSuccess = () => {
    setCurrentView("list");
    queryClient.invalidateQueries({ queryKey: ["admin-universities"] });
  };

  if (user?.role !== "admin" && user?.role !== "super_admin") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
          <p className="text-slate-500 mb-6">You do not have permission to view the super admin dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-800">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col z-50 transition-all duration-300">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
          <Building2 className="w-8 h-8 text-indigo-500 mr-3" />
          <span className="text-xl font-bold text-white tracking-tight">UniCMS</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            <li>
              <button 
                onClick={() => setCurrentView("list")}
                className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                  currentView === "list" && !editingId
                    ? "bg-indigo-600/20 text-indigo-400 font-medium" 
                    : "hover:bg-slate-800 hover:text-white"
                }`}
              >
                <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentView("list")}
                className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                  currentView === "list" 
                    ? "bg-indigo-600/20 text-indigo-400 font-medium" 
                    : "hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Building2 className="w-5 h-5 mr-3" /> Universities
              </button>
            </li>
          </ul>
        </div>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={logout}
            className="w-full flex items-center px-3 py-2.5 rounded-lg text-slate-400 hover:bg-rose-500/10 hover:text-rose-500 transition-all font-medium"
          >
            <LogOut className="w-5 h-5 mr-3" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm backdrop-blur-md">
          <div className="flex items-center space-x-4">
            {currentView === "form" && (
              <button 
                onClick={() => setCurrentView("list")}
                className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
                title="Back to list"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <h1 className="text-xl font-semibold text-slate-800">
              {currentView === "list" ? "Manage Universities" : (editingId ? "Edit University" : "Add University")}
            </h1>
          </div>
          
          {currentView === "list" && (
            <button 
              onClick={handleCreate}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium text-sm"
            >
              <Plus className="w-4 h-4 mr-2" /> Add University
            </button>
          )}
        </header>

        {/* View Container */}
        <div className="flex-1 overflow-y-auto bg-slate-50 scroll-smooth">
          {currentView === "list" ? (
            <UniversityList 
              universities={filteredUniversities}
              isLoading={universitiesQuery.isLoading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              search={search}
              onSearchChange={setSearch}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
            />
          ) : (
            <UniversityForm 
              id={editingId}
              onSuccess={handleSaveSuccess}
              onCancel={() => setCurrentView("list")}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default SuperAdminDashboardPage;

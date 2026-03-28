import React from "react";
import { Search, Edit, Trash2 } from "lucide-react";
import { University } from "../../../services/api";

interface UniversityListProps {
  universities: University[];
  isLoading: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

const UniversityList: React.FC<UniversityListProps> = ({
  universities,
  isLoading,
  onEdit,
  onDelete,
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}) => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row justify-between items-center bg-slate-50/50 gap-4">
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search universities..."
              className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <div className="flex space-x-2 w-full md:w-auto">
            <select
              className="border border-slate-300 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-auto bg-white"
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
            >
              <option>All Status</option>
              <option>Published</option>
              <option>Draft</option>
              <option>In Review</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-20 text-center text-slate-500 font-semibold">
              <div className="animate-spin w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              Loading universities...
            </div>
          ) : universities.length === 0 ? (
            <div className="py-20 text-center text-slate-400 font-medium">
              No universities found matching your criteria.
            </div>
          ) : (
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold">University Name</th>
                  <th className="px-6 py-4 font-semibold">Location</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {universities.map((uni) => (
                  <tr key={uni.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mr-3 shrink-0">
                          {uni.name.charAt(0)}
                        </div>
                        {uni.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{uni.location || "-"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700`}>
                        {uni.isPopular ? "Popular" : "Standard"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => onEdit(uni.id)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors shadow-sm"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(uni.id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors shadow-sm"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UniversityList;

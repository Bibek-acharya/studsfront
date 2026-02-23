import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiService, College, CreateCollegePayload, University } from "../../../services/api";
import { useAuth } from "../../../services/AuthContext";

interface AdminCollegesPageProps {
  onNavigate: (view: any, data?: any) => void;
}

type AdminCollegesResponse = {
  success: boolean;
  message: string;
  data?: {
    colleges: College[];
    pagination: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
    };
  };
};

const defaultForm: CreateCollegePayload = {
  university_id: 0,
  name: "",
  location: "",
  type: "Private",
  rating: 4,
  reviews: 0,
  programs: 0,
};

type ToastState = {
  show: boolean;
  type: "success" | "error";
  title: string;
  message: string;
};

const AdminCollegesPage: React.FC<AdminCollegesPageProps> = ({ onNavigate }) => {
  const queryClient = useQueryClient();
  const { user, token } = useAuth();

  const [form, setForm] = useState<CreateCollegePayload>(defaultForm);
  const [editingCollegeId, setEditingCollegeId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: "success",
    title: "",
    message: "",
  });
  const [deleteCandidate, setDeleteCandidate] = useState<College | null>(null);

  const showToast = (
    type: "success" | "error",
    title: string,
    message: string,
  ) => {
    setToast({ show: true, type, title, message });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 2800);
  };

  const collegesQuery = useQuery({
    queryKey: ["admin-colleges"],
    queryFn: () =>
      apiService.getColleges({
        page: 1,
        pageSize: 100,
        sort: "name",
        order: "ASC",
      }),
  });

  const universitiesQuery = useQuery({
    queryKey: ["admin-universities"],
    queryFn: () => apiService.getUniversities(),
  });

  const createCollegeMutation = useMutation({
    mutationFn: (payload: CreateCollegePayload) =>
      apiService.createCollege(token as string, payload),
  });

  const updateCollegeMutation = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<College> }) =>
      apiService.updateCollege(token as string, id, updates),
  });

  const deleteCollegeMutation = useMutation({
    mutationFn: (id: number) => apiService.deleteCollege(token as string, id),
  });

  const colleges = collegesQuery.data?.data?.colleges || [];
  const universities = (universitiesQuery.data?.data?.universities || []) as University[];

  const filteredColleges = useMemo(() => {
    if (!search.trim()) return colleges;

    const query = search.toLowerCase();
    return colleges.filter(
      (college) =>
        college.name.toLowerCase().includes(query) ||
        college.location.toLowerCase().includes(query) ||
        (college.affiliation || "").toLowerCase().includes(query),
    );
  }, [colleges, search]);

  const resetForm = () => {
    setForm(defaultForm);
    setEditingCollegeId(null);
  };

  const startEdit = (college: College) => {
    setEditingCollegeId(college.id);
    setForm({
      university_id: college.university_id || 0,
      name: college.name,
      location: college.location,
      type: college.type,
      rating: college.rating,
      reviews: college.reviews,
      programs: college.programs,
      description: college.description,
      website: college.website,
      email: college.email,
      phone: college.phone,
    });
  };

  const handleCreate = async () => {
    if (!token) return;
    if (!form.university_id || !form.name || !form.location) return;

    const selectedUniversity = universities.find(
      (university) => university.id === form.university_id,
    );

    const previous = queryClient.getQueryData<AdminCollegesResponse>([
      "admin-colleges",
    ]);

    const optimisticCollege: College = {
      id: -Date.now(),
      university_id: form.university_id,
      name: form.name,
      location: form.location,
      affiliation: selectedUniversity?.name || "University",
      type: form.type || "Private",
      verified: false,
      popular: false,
      rating: form.rating || 0,
      reviews: form.reviews || 0,
      programs: form.programs || 0,
      description: form.description,
      website: form.website,
      email: form.email,
      phone: form.phone,
    };

    queryClient.setQueryData<AdminCollegesResponse>(["admin-colleges"], (old) => {
      if (!old?.data) {
        return {
          success: true,
          message: "Optimistic",
          data: {
            colleges: [optimisticCollege],
            pagination: { page: 1, pageSize: 100, total: 1, totalPages: 1 },
          },
        };
      }

      return {
        ...old,
        data: {
          ...old.data,
          colleges: [optimisticCollege, ...old.data.colleges],
          pagination: {
            ...old.data.pagination,
            total: old.data.pagination.total + 1,
          },
        },
      };
    });

    setSaving(true);
    try {
      const response = await createCollegeMutation.mutateAsync(form);
      const created = response.data;

      queryClient.setQueryData<AdminCollegesResponse>(["admin-colleges"], (old) => {
        if (!old?.data || !created) return old;

        return {
          ...old,
          data: {
            ...old.data,
            colleges: old.data.colleges.map((college) =>
              college.id === optimisticCollege.id ? created : college,
            ),
          },
        };
      });

      await queryClient.invalidateQueries({ queryKey: ["admin-colleges"] });
      await queryClient.invalidateQueries({ queryKey: ["universities"] });
      resetForm();
      showToast("success", "College Created", `${form.name} has been added successfully.`);
    } catch {
      queryClient.setQueryData(["admin-colleges"], previous);
      showToast("error", "Create Failed", "Could not create college. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!token || !editingCollegeId) return;

    const previous = queryClient.getQueryData<AdminCollegesResponse>([
      "admin-colleges",
    ]);

    queryClient.setQueryData<AdminCollegesResponse>(["admin-colleges"], (old) => {
      if (!old?.data) return old;

      return {
        ...old,
        data: {
          ...old.data,
          colleges: old.data.colleges.map((college) =>
            college.id === editingCollegeId
              ? {
                  ...college,
                  ...form,
                  type: form.type || college.type,
                  affiliation:
                    universities.find((university) => university.id === form.university_id)
                      ?.name || college.affiliation,
                }
              : college,
          ),
        },
      };
    });

    setSaving(true);
    try {
      await updateCollegeMutation.mutateAsync({
        id: editingCollegeId,
        updates: {
          university_id: form.university_id,
          name: form.name,
          location: form.location,
          type: form.type,
          rating: form.rating,
          reviews: form.reviews,
          programs: form.programs,
          description: form.description,
          website: form.website,
          email: form.email,
          phone: form.phone,
        },
      });

      await queryClient.invalidateQueries({ queryKey: ["admin-colleges"] });
      await queryClient.invalidateQueries({ queryKey: ["universities"] });
      resetForm();
      showToast("success", "College Updated", "College details were updated.");
    } catch {
      queryClient.setQueryData(["admin-colleges"], previous);
      showToast("error", "Update Failed", "Could not update college. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!token) return;

    const previous = queryClient.getQueryData<AdminCollegesResponse>([
      "admin-colleges",
    ]);

    queryClient.setQueryData<AdminCollegesResponse>(["admin-colleges"], (old) => {
      if (!old?.data) return old;

      return {
        ...old,
        data: {
          ...old.data,
          colleges: old.data.colleges.filter((college) => college.id !== id),
          pagination: {
            ...old.data.pagination,
            total: Math.max(0, old.data.pagination.total - 1),
          },
        },
      };
    });

    try {
      await deleteCollegeMutation.mutateAsync(id);
      await queryClient.invalidateQueries({ queryKey: ["admin-colleges"] });
      await queryClient.invalidateQueries({ queryKey: ["universities"] });
      if (editingCollegeId === id) resetForm();
      showToast("success", "College Deleted", "College has been removed.");
    } catch {
      queryClient.setQueryData(["admin-colleges"], previous);
      showToast("error", "Delete Failed", "Could not delete college. Please try again.");
    }
  };

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 px-6">
        <div className="max-w-3xl mx-auto bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
          <h1 className="text-2xl font-black text-slate-900 mb-2">Admin Access Required</h1>
          <p className="text-slate-500 font-medium mb-6">
            This page is restricted to admin accounts.
          </p>
          <button
            onClick={() => onNavigate("educationPage")}
            className="px-5 py-3 rounded-xl bg-primary-600 text-white font-black text-xs uppercase tracking-widest"
          >
            Back to Education
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 px-6 pb-16 font-jakarta">
      {toast.show && (
        <div className="fixed top-24 right-6 z-[220] animate-fadeInDown">
          <div
            className={`min-w-[320px] max-w-[420px] rounded-2xl shadow-2xl border px-4 py-3 flex items-start gap-3 ${
              toast.type === "success"
                ? "bg-emerald-50 border-emerald-100"
                : "bg-rose-50 border-rose-100"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                toast.type === "success"
                  ? "bg-emerald-500 text-white"
                  : "bg-rose-500 text-white"
              }`}
            >
              <i
                className={`fa-solid ${toast.type === "success" ? "fa-check" : "fa-xmark"}`}
              ></i>
            </div>
            <div>
              <p className="text-sm font-black text-slate-900">{toast.title}</p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">{toast.message}</p>
            </div>
            <button
              onClick={() => setToast((prev) => ({ ...prev, show: false }))}
              className="ml-auto text-slate-300 hover:text-slate-500"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      )}

      {deleteCandidate && (
        <div className="fixed inset-0 z-[210] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <i className="fa-solid fa-triangle-exclamation text-xl"></i>
            </div>
            <h3 className="text-lg font-black text-slate-900">Confirm Delete</h3>
            <p className="text-sm text-slate-500 font-semibold mt-2">
              Delete <span className="text-slate-900">{deleteCandidate.name}</span>? This action cannot be undone.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteCandidate(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-black uppercase tracking-widest"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  const id = deleteCandidate.id;
                  setDeleteCandidate(null);
                  await handleDelete(id);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-black uppercase tracking-widest"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8">
        <section className="xl:col-span-4 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm h-fit">
          <h2 className="text-xl font-black text-slate-900 mb-1">
            {editingCollegeId ? "Update College" : "Create College"}
          </h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-6">
            Admin College CRUD
          </p>

          <div className="space-y-4">
            <select
              value={form.university_id}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, university_id: Number(event.target.value) }))
              }
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700"
            >
              <option value={0}>Select University</option>
              {universities.map((university) => (
                <option key={university.id} value={university.id}>
                  {university.name}
                </option>
              ))}
            </select>

            <input
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold"
              placeholder="College name"
            />

            <input
              value={form.location}
              onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold"
              placeholder="Location"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                value={form.type || ""}
                onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold"
                placeholder="Type"
              />
              <input
                type="number"
                value={form.rating ?? 0}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, rating: Number(event.target.value) }))
                }
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold"
                placeholder="Rating"
                min={0}
                max={5}
                step={0.1}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                value={form.reviews ?? 0}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, reviews: Number(event.target.value) }))
                }
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold"
                placeholder="Reviews"
                min={0}
              />
              <input
                type="number"
                value={form.programs ?? 0}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, programs: Number(event.target.value) }))
                }
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold"
                placeholder="Programs"
                min={0}
              />
            </div>

            <textarea
              value={form.description || ""}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, description: event.target.value }))
              }
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold min-h-24"
              placeholder="Description"
            />

            <div className="grid grid-cols-2 gap-3">
              <button
                disabled={saving || !form.university_id || !form.name || !form.location}
                onClick={editingCollegeId ? handleUpdate : handleCreate}
                className="py-3 rounded-xl bg-primary-600 text-white font-black text-xs uppercase tracking-widest disabled:opacity-40"
              >
                {saving ? "Saving..." : editingCollegeId ? "Update" : "Create"}
              </button>
              <button
                disabled={saving}
                onClick={resetForm}
                className="py-3 rounded-xl border border-slate-200 text-slate-600 font-black text-xs uppercase tracking-widest"
              >
                Reset
              </button>
            </div>
          </div>
        </section>

        <section className="xl:col-span-8 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-xl font-black text-slate-900">Manage Colleges</h2>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, location, affiliation..."
              className="w-full md:w-80 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold"
            />
          </div>

          {collegesQuery.isLoading ? (
            <div className="py-10 text-center text-slate-500 font-semibold">Loading colleges...</div>
          ) : collegesQuery.error ? (
            <div className="py-10 text-center text-rose-600 font-semibold">
              {(collegesQuery.error as Error).message}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredColleges.map((college) => (
                <div
                  key={college.id}
                  className="border border-slate-100 rounded-xl p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
                >
                  <div>
                    <h3 className="text-slate-900 font-black text-base">{college.name}</h3>
                    <p className="text-slate-500 text-sm font-semibold">
                      {college.location} • {college.affiliation} • {college.type}
                    </p>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
                      Rating {college.rating} • Reviews {college.reviews} • Programs {college.programs}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startEdit(college)}
                      className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-xs font-black uppercase tracking-widest"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteCandidate(college)}
                      className="px-4 py-2 rounded-lg bg-rose-600 text-white text-xs font-black uppercase tracking-widest"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {filteredColleges.length === 0 && (
                <div className="py-10 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                  No colleges found
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminCollegesPage;

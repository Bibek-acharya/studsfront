import React, { useState, useEffect, useMemo, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css"; 
import { useQuery, useMutation } from "@tanstack/react-query";
import { 
  Save, Eye, RotateCcw, Image, Trash2, Plus, Info, Video, Mail, Phone, Globe, 
  Facebook, Instagram, Linkedin, Twitter, Target, Eye as Vision, Lightbulb, 
  MapPin, Zap, Calendar, FileText, Newspaper, Download, GraduationCap, 
  Star, School, Search, Building2
} from "lucide-react";
import { apiService, University } from "../../../services/api";
import { useAuth } from "../../../services/AuthContext";

// RTE Wrapper using ReactQuill (Optimized for performance)
const NewsRichEditor: React.FC<{ value: string; onChange: (val: string) => void }> = ({ value, onChange }) => {
  const [internalValue, setInternalValue] = useState(value || "");
  const debounceTimer = useRef<NodeJS.Timeout|null>(null);

  // Sync internal state with prop changes (only if substantially different to avoid loops)
  useEffect(() => {
    if (value !== internalValue && !debounceTimer.current) {
      setInternalValue(value || "");
    }
  }, [value]);

  const handleQuillChange = (content: string) => {
    setInternalValue(content);
    
    // Debounce state update to prevent re-rendering the entire parent on every keystroke
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      onChange(content);
      debounceTimer.current = null;
    }, 500);
  };

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm ring-1 ring-slate-900/5 focus-within:ring-indigo-500 transition-all font-sans editor-container">
       <ReactQuill
          theme="snow"
          value={internalValue}
          onChange={handleQuillChange}
          placeholder="Start writing university news..."
          className="bg-white"
          modules={{
            toolbar: [
              [{ 'header': [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              ['link', 'clean']
            ],
          }}
       />
       <style>{`
          .quill .ql-container { min-h-[300px]; font-size: 14px; }
          .quill .ql-toolbar { border-none; bg-slate-50; border-b: 1px solid #e2e8f0; }
          .quill .ql-container { border-none; }
       `}</style>
    </div>
  );
};

interface UniversityFormProps {
  id: number | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const FORM_TABS = [
  { id: "about", label: "About", icon: Info },
  { id: "courses", label: "Courses & Fees", icon: School },
  { id: "institutes", label: "Institutes", icon: Building2 },
  { id: "admissions", label: "Admissions", icon: GraduationCap },
  { id: "programs", label: "Programs", icon: Target },
  { id: "scholarships", label: "Scholarships", icon: Zap },
  { id: "events", label: "Events", icon: Calendar },
  { id: "news", label: "News", icon: Newspaper },
  { id: "downloads", label: "Downloads", icon: Download },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "reviews", label: "Reviews", icon: Star },
];

const UniversityForm: React.FC<UniversityFormProps> = ({ id, onSuccess, onCancel }) => {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState("about");
  const [saving, setSaving] = useState(false);

  const handleFileUpload = (file: File, callback: (result: string) => void, minWidth?: number) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      
      if (minWidth && file.type.startsWith("image/")) {
        const img = new window.Image();
        img.onload = () => {
          if (img.width < minWidth) {
            alert(`Error: Image width must be at least ${minWidth}px. Current width: ${img.width}px.`);
          } else {
            callback(result);
          }
        };
        img.src = result;
      } else {
        callback(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (file: File, path: string, minWidth?: number) => {
    handleFileUpload(file, (result) => updateField(path, result), minWidth);
  };

  const handleMultipleImagesUpload = (files: FileList) => {
    Array.from(files).forEach(file => {
      handleFileUpload(file, (result) => {
        setFormData(prev => ({
          ...prev,
          gallery: [...(prev.gallery || []), result]
        }));
      });
    });
  };

  // Initial Form State matching the prototype structure
  const [formData, setFormData] = useState<Partial<University>>({
    name: "",
    location: "",
    website: "",
    logo: "",
    cover: "",
    type: "Public",
    established: "",
    description: "",
    rank: 0,
    rating: 0,
    review_count: 0,
    verified: false,
    students: "",
    chancellor: "",
    vice_chancellor: "",
    founder: "",
    about: {
      yt1: "",
      yt2: "",
      desc: "",
      mission: "",
      vision: "",
      values: "",
      feature1Title: "",
      feature1Body: "",
      feature2Title: "",
      feature2Body: "",
      bannerTitle: "",
      bannerBody: "",
    },
    contact: {
      email: "",
      phone: "",
      fb: "",
      ig: "",
      li: "",
      tw: "",
    },
    quick: {
      est: "",
      type: "Public",
      size: "",
      students: "",
      campuses: 0,
      teachingStaff: "",
      nonTeachingStaff: "",
      constituentCampuses: "",
      affiliatedColleges: "",
      centralDepartments: "",
      researchCenters: "",
      intlCollabs: "",
    },
    overview: [],
    leadership: [],
    courses: { bachelor: [], master: [] },
    programs: [],
    scholarships: [],
    events: [],
    news: [],
    faculties: [],
    downloads: [],
    gallery: [],
    admissions: [],
    reviews: [],
  });

  // Fetch University if editing
  const universityQuery = useQuery({
    queryKey: ["admin-university", id],
    queryFn: () => apiService.getUniversityById(id!),
    enabled: !!id && !!token,
  });

  useEffect(() => {
    if (universityQuery.data?.data?.university) {
      const u = universityQuery.data.data.university;
      // Merge with default state to ensure nested objects exist
      setFormData(prev => ({
        ...prev,
        ...u,
        about: { ...prev.about, ...u.about },
        contact: { ...prev.contact, ...u.contact },
        quick: { ...prev.quick, ...u.quick },
        courses: u.courses || { bachelor: [], master: [] },
        overview: u.overview || [],
        leadership: u.leadership || [],
        programs: u.programs || [],
        scholarships: u.scholarships || [],
        events: u.events || [],
        news: u.news || [],
        faculties: u.faculties || [],
        downloads: u.downloads || [],
        gallery: u.gallery || [],
        admissions: u.admissions || [],
        reviews: u.reviews || [],
      }));
    }
  }, [universityQuery.data]);

  const saveMutation = useMutation({
    mutationFn: (data: any) => 
      id ? apiService.updateUniversity(token!, id, data) : apiService.createUniversity(token!, data),
    onSuccess: () => {
      onSuccess();
    },
  });

  const handleSave = async (status: string) => {
    if (!formData.name) {
      alert("University Name is required!");
      return;
    }

    setSaving(true);
    try {
      // Construction of payload matching prototype logic
      const payload = {
        ...formData,
        status: status,
        popular: formData.isPopular, // Mapping verified/isPopular
        verified: formData.verified,
        rating: Number(formData.rating || 0),
        review_count: Number(formData.review_count || 0),
        rank: Number(formData.rank || 0),
        students: formData.students || formData.quick?.students,
        chancellor: formData.chancellor,
        vice_chancellor: formData.vice_chancellor,
        founder: formData.founder,
        description: formData.about?.desc || formData.description,
        // Ensure nested structures are clean
        about: formData.about,
        contact: formData.contact,
        quick: formData.quick,
        overview: formData.overview || [],
        leadership: formData.leadership || [],
        courses: formData.courses || { bachelor: [], master: [] },
        programs: formData.programs || [],
        scholarships: formData.scholarships || [],
        events: formData.events || [],
        news: formData.news || [],
        faculties: formData.faculties || [],
        downloads: formData.downloads || [],
        gallery: formData.gallery || [],
        admissions: formData.admissions || [],
        reviews: formData.reviews || [],
      };
      
      await saveMutation.mutateAsync(payload);
    } catch (err) {
      alert("Save failed: " + (err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (path: string, value: any) => {
    setFormData(prev => {
      const newForm = { ...prev };
      const parts = path.split('.');
      let current: any = newForm;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) current[parts[i]] = {};
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = value;
      return newForm;
    });
  };

  const addArrayRow = (path: string, template: any) => {
    const current = getPath(formData, path) || [];
    updateField(path, [...current, template]);
  };

  const removeArrayRow = (path: string, index: number) => {
    const current = getPath(formData, path) || [];
    const newList = [...current];
    newList.splice(index, 1);
    updateField(path, newList);
  };

  const getPath = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  if (id && universityQuery.isLoading) return <div className="p-20 text-center">Loading university details...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto pb-32">
      {/* Action Bar (Matches Prototype Form Top Actions) */}
      <div className="sticky top-0 z-40 bg-slate-50 border-b border-slate-200 -mx-6 px-6 mb-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-600">
            {id ? "Editing Existing" : "New University"}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={onCancel} className="px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm transition-colors">
            <RotateCcw className="w-4 h-4 inline mr-1" /> Reset
          </button>
          <div className="h-5 w-px bg-slate-200 mx-2"></div>
          <button 
            disabled={saving}
            onClick={() => handleSave("Draft")} 
            className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium rounded-lg text-sm transition-colors disabled:opacity-50"
          >
            Save Draft
          </button>
          <button 
            disabled={saving}
            onClick={() => handleSave("In Review")} 
            className="px-4 py-2 bg-amber-500 text-white hover:bg-amber-600 shadow-sm font-medium rounded-lg text-sm transition-colors disabled:opacity-50 flex items-center"
          >
             <Eye className="w-4 h-4 mr-2" /> Submit for Review
          </button>
          <button 
            disabled={saving}
            onClick={() => handleSave("Published")} 
            className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm font-medium rounded-lg text-sm transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : (id ? "Update Published" : "Publish")}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-[72px] z-30 bg-slate-50 border-b border-slate-200 -mx-6 px-6 mb-8 flex space-x-8 overflow-x-auto no-scrollbar shadow-sm">
        {FORM_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 py-4 border-b-2 transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
              activeTab === tab.id 
                ? "border-indigo-600 text-slate-900 font-bold" 
                : "border-transparent text-slate-500 hover:text-slate-700 font-medium"
            }`}
          >
            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-indigo-600" : ""}`} />
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        {activeTab === "about" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Section 1: Basic Info */}
            <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 font-bold text-slate-800 flex justify-between items-center">
                <span>1. Basic Information</span>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-500 uppercase font-black tracking-wider">Popular</span>
                    <input 
                      type="checkbox" 
                      checked={formData.isPopular} 
                      onChange={(e) => setFormData(prev => ({ ...prev, isPopular: e.target.checked }))}
                      className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-500 uppercase font-black tracking-wider">Verified</span>
                    <input 
                      type="checkbox" 
                      checked={formData.verified} 
                      onChange={(e) => setFormData(prev => ({ ...prev, verified: e.target.checked }))}
                      className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {/* Cover & Logo upload (Simplified to URL inputs for now) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-4">
                      <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest text-[10px]">University Logo</label>
                      <div className="flex items-center space-x-4">
                         <div className="flex-1">
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], "logo")}
                              className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            />
                         </div>
                         <div className="h-16 w-16 border rounded bg-slate-50 flex items-center justify-center overflow-hidden">
                            {formData.logo ? <img src={formData.logo} alt="Logo" className="h-full w-full object-contain" /> : <Building2 className="w-8 h-8 text-slate-300" />}
                         </div>
                      </div>
                      <input 
                        type="text" 
                        value={formData.logo || ""} 
                        onChange={(e) => updateField("logo", e.target.value)}
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-[10px] p-2 border" 
                        placeholder="Or paste Logo URL here..."
                      />
                   </div>
                   <div className="space-y-4">
                      <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest text-[10px]">Cover Image (Min 1400px width)</label>
                      <div className="space-y-3">
                         <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], "cover", 1400)}
                            className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                         />
                         <div className="w-full h-32 border border-dashed border-slate-300 rounded-xl flex items-center justify-center overflow-hidden bg-slate-50">
                            {formData.cover ? (
                               <img src={formData.cover} alt="Cover" className="w-full h-full object-cover" />
                            ) : (
                               <div className="text-center">
                                  <Image className="w-10 h-10 text-slate-200 mx-auto mb-2" />
                                  <p className="text-[10px] text-slate-400 font-medium">1400px+ Recommended</p>
                               </div>
                            )}
                         </div>
                         <input 
                            type="text" 
                            value={formData.cover || ""} 
                            onChange={(e) => updateField("cover", e.target.value)}
                            className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-[10px] p-2 border" 
                            placeholder="Or paste Cover Image URL here..."
                         />
                      </div>
                   </div>
                </div>

                {/* Section 1: Basic Info - Row 2: Name, Location, Website */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">University Name *</label>
                    <input 
                      type="text" 
                      value={formData.name || ""} 
                      onChange={(e) => updateField("name", e.target.value)}
                      className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-3 border" 
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Location</label>
                      <input 
                        type="text" 
                        value={formData.location || ""} 
                        onChange={(e) => updateField("location", e.target.value)}
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-3 border" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Website URL</label>
                      <input 
                        type="url" 
                        value={formData.website || ""} 
                        onChange={(e) => updateField("website", e.target.value)}
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-3 border" 
                      />
                    </div>
                  </div>
                </div>

                {/* Section 1: Basic Info - Row 3: Established & Students */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Established Year</label>
                      <input 
                        type="text" 
                        value={formData.established || ""} 
                        onChange={(e) => updateField("established", e.target.value)}
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-3 border" 
                        placeholder="e.g. 1959"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Total Students</label>
                      <input 
                        type="text" 
                        value={formData.students || ""} 
                        onChange={(e) => updateField("students", e.target.value)}
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-3 border" 
                        placeholder="e.g. 400,000+"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Rank</label>
                        <input 
                          type="number" 
                          value={formData.rank || 0} 
                          onChange={(e) => updateField("rank", parseInt(e.target.value))}
                          className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-3 border" 
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">University Type</label>
                        <select 
                          value={formData.type || "Public"} 
                          onChange={(e) => updateField("type", e.target.value)}
                          className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-3 border bg-white"
                        >
                          <option>Public</option>
                          <option>Private</option>
                          <option>Deemed</option>
                          <option>Autonomous</option>
                        </select>
                     </div>
                  </div>
                </div>

                {/* Section 1: Basic Info - Row 4: Ratings & Reviews */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Rating</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={formData.rating || 0} 
                      onChange={(e) => updateField("rating", parseFloat(e.target.value))}
                      className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-3 border" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Review Count</label>
                    <input 
                      type="number" 
                      value={formData.review_count || 0} 
                      onChange={(e) => updateField("review_count", parseInt(e.target.value))}
                      className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-3 border" 
                    />
                  </div>
                </div>

                {/* Section 1: Basic Info - Row 5: Leadership */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Founder</label>
                    <input 
                      type="text" 
                      value={formData.founder || ""} 
                      onChange={(e) => updateField("founder", e.target.value)}
                      className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-3 border" 
                      placeholder="e.g. King Mahendra..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Chancellor</label>
                    <input 
                      type="text" 
                      value={formData.chancellor || ""} 
                      onChange={(e) => updateField("chancellor", e.target.value)}
                      className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-3 border" 
                      placeholder="e.g. Prime Minister..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Vice-Chancellor</label>
                    <input 
                      type="text" 
                      value={formData.vice_chancellor || ""} 
                      onChange={(e) => updateField("vice_chancellor", e.target.value)}
                      className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-3 border" 
                      placeholder="e.g. Prof. Dr. Dharma..."
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Detailed About */}
            <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
               <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 font-bold text-slate-800">2. About University</div>
               <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center"><Video className="w-4 h-4 mr-1 text-rose-500" /> YouTube Video 1</label>
                      <input 
                        type="url" 
                        value={formData.about?.yt1 || ""} 
                        onChange={(e) => updateField("about.yt1", e.target.value)}
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2.5 border" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center"><Video className="w-4 h-4 mr-1 text-rose-500" /> YouTube Video 2</label>
                      <input 
                        type="url" 
                        value={formData.about?.yt2 || ""} 
                        onChange={(e) => updateField("about.yt2", e.target.value)}
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2.5 border" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">University Description</label>
                    <textarea 
                      value={formData.about?.desc || ""} 
                      onChange={(e) => updateField("about.desc", e.target.value)}
                      className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-3 border min-h-[150px]" 
                      placeholder="Write description here..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Mission</label>
                      <textarea 
                        value={formData.about?.mission || ""} 
                        onChange={(e) => updateField("about.mission", e.target.value)}
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-3 border h-24" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Vision</label>
                      <textarea 
                        value={formData.about?.vision || ""} 
                        onChange={(e) => updateField("about.vision", e.target.value)}
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-3 border h-24" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Core Values</label>
                      <textarea 
                        value={formData.about?.values || ""} 
                        onChange={(e) => updateField("about.values", e.target.value)}
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-3 border h-24" 
                      />
                    </div>
                  </div>

                  {/* Feature & Banner Callouts (Matching Prototype) */}
                  <div className="pt-4 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-indigo-50/30 rounded-xl border border-indigo-100">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">Feature Callout 1</label>
                          <input type="text" placeholder="Feature Title (e.g. Semester System)" value={formData.about?.feature1Title || ""} onChange={(e) => updateField("about.feature1Title", e.target.value)} className="w-full p-2 border rounded text-sm font-bold" />
                          <textarea placeholder="Feature Description..." value={formData.about?.feature1Body || ""} onChange={(e) => updateField("about.feature1Body", e.target.value)} className="w-full p-2 border rounded text-xs h-16 resize-none" />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Feature Callout 2</label>
                          <input type="text" placeholder="Feature Title (e.g. Global Ties)" value={formData.about?.feature2Title || ""} onChange={(e) => updateField("about.feature2Title", e.target.value)} className="w-full p-2 border rounded text-sm font-bold" />
                          <textarea placeholder="Feature Description..." value={formData.about?.feature2Body || ""} onChange={(e) => updateField("about.feature2Body", e.target.value)} className="w-full p-2 border rounded text-xs h-16 resize-none" />
                       </div>
                    </div>
                    <div className="p-4 bg-slate-900/5 rounded-xl border border-slate-200 space-y-3">
                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Bottom Banner Callout</label>
                       <input type="text" placeholder="Banner Title (e.g. Commitment to Excellence)" value={formData.about?.bannerTitle || ""} onChange={(e) => updateField("about.bannerTitle", e.target.value)} className="w-full p-2 border rounded text-sm font-bold" />
                       <textarea placeholder="Banner Body..." value={formData.about?.bannerBody || ""} onChange={(e) => updateField("about.bannerBody", e.target.value)} className="w-full p-2 border rounded text-xs h-16 resize-none" />
                    </div>
                  </div>
               </div>
            </section>
            
            {/* Quick Facts & Contact Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 font-bold text-slate-800">3. Contact Information</div>
                  <div className="p-6 space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-500 mb-1 flex items-center font-bold"><Mail className="w-3 h-3 mr-1" /> Email</label>
                          <input 
                            type="email" 
                            value={formData.contact?.email || ""} 
                            onChange={(e) => updateField("contact.email", e.target.value)}
                            className="w-full text-sm p-2 border border-slate-300 rounded" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-500 mb-1 flex items-center font-bold"><Phone className="w-3 h-3 mr-1" /> Phone</label>
                          <input 
                            type="text" 
                            value={formData.contact?.phone || ""} 
                            onChange={(e) => updateField("contact.phone", e.target.value)}
                            className="w-full text-sm p-2 border border-slate-300 rounded" 
                          />
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-500 mb-1 flex items-center font-bold font-bold"><Facebook className="w-3 h-3 mr-1" /> Facebook</label>
                          <input 
                            type="text" 
                            value={formData.contact?.fb || ""} 
                            onChange={(e) => updateField("contact.fb", e.target.value)}
                            className="w-full text-sm p-2 border border-slate-300 rounded" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-500 mb-1 flex items-center font-bold"><Instagram className="w-3 h-3 mr-1" /> Instagram</label>
                          <input 
                            type="text" 
                            value={formData.contact?.ig || ""} 
                            onChange={(e) => updateField("contact.ig", e.target.value)}
                            className="w-full text-sm p-2 border border-slate-300 rounded" 
                          />
                        </div>
                     </div>
                  </div>
               </section>

               <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 font-bold text-slate-800">4. Quick Facts</div>
                  <div className="p-6 space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-500 mb-1 font-bold">Established Year</label>
                          <input 
                            type="text" 
                            value={formData.quick?.est || ""} 
                            onChange={(e) => updateField("quick.est", e.target.value)}
                            className="w-full text-sm p-2 border border-slate-300 rounded" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-500 mb-1 font-bold">Type</label>
                          <select 
                            value={formData.quick?.type || "Public"} 
                            onChange={(e) => updateField("quick.type", e.target.value)}
                            className="w-full text-sm p-2 border border-slate-300 rounded bg-white shadow-sm"
                          >
                            <option>Public</option>
                            <option>Private</option>
                            <option>Deemed</option>
                          </select>
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-500 mb-1 font-bold">Campus Size</label>
                          <input 
                            type="text" 
                            value={formData.quick?.size || ""} 
                            onChange={(e) => updateField("quick.size", e.target.value)}
                            className="w-full text-sm p-2 border border-slate-300 rounded" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-500 mb-1 font-bold">Total Students</label>
                          <input 
                            type="text" 
                            value={formData.quick?.students || ""} 
                            onChange={(e) => updateField("quick.students", e.target.value)}
                            className="w-full text-sm p-2 border border-slate-300 rounded" 
                          />
                        </div>
                     </div>
                     <div>
                        <label className="block text-xs text-slate-500 mb-1 font-bold">Campuses Count</label>
                        <input 
                          type="number" 
                          value={formData.quick?.campuses || 0} 
                          onChange={(e) => updateField("quick.campuses", parseInt(e.target.value))}
                          className="w-full text-sm p-2 border border-slate-300 rounded" 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-500 mb-1 font-bold">Teaching Staff</label>
                          <input 
                            type="text" 
                            value={formData.quick?.teachingStaff || ""} 
                            onChange={(e) => updateField("quick.teachingStaff", e.target.value)}
                            className="w-full text-sm p-2 border border-slate-300 rounded" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-500 mb-1 font-bold">Non-Teaching Staff</label>
                          <input 
                            type="text" 
                            value={formData.quick?.nonTeachingStaff || ""} 
                            onChange={(e) => updateField("quick.nonTeachingStaff", e.target.value)}
                            className="w-full text-sm p-2 border border-slate-300 rounded" 
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-500 mb-1 font-bold">Constituent Campuses</label>
                          <input 
                            type="text" 
                            value={formData.quick?.constituentCampuses || ""} 
                            onChange={(e) => updateField("quick.constituentCampuses", e.target.value)}
                            className="w-full text-sm p-2 border border-slate-300 rounded" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-500 mb-1 font-bold">Affiliated Colleges</label>
                          <input 
                            type="text" 
                            value={formData.quick?.affiliatedColleges || ""} 
                            onChange={(e) => updateField("quick.affiliatedColleges", e.target.value)}
                            className="w-full text-sm p-2 border border-slate-300 rounded" 
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-500 mb-1 font-bold">Central Departments</label>
                          <input 
                            type="text" 
                            value={formData.quick?.centralDepartments || ""} 
                            onChange={(e) => updateField("quick.centralDepartments", e.target.value)}
                            className="w-full text-sm p-2 border border-slate-300 rounded" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-500 mb-1 font-bold">Research Centers</label>
                          <input 
                            type="text" 
                            value={formData.quick?.researchCenters || ""} 
                            onChange={(e) => updateField("quick.researchCenters", e.target.value)}
                            className="w-full text-sm p-2 border border-slate-300 rounded" 
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-500 mb-1 font-bold">International Collaborations</label>
                          <input 
                            type="text" 
                            value={formData.quick?.intlCollabs || ""} 
                            onChange={(e) => updateField("quick.intlCollabs", e.target.value)}
                            className="w-full text-sm p-2 border border-slate-300 rounded" 
                          />
                        </div>
                        <div />
                      </div>
                  </div>
                </section>
              </div>
            </div>
        )}

        {/* Section: Courses & Fees */}
        {activeTab === "courses" && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-fadeIn">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 font-bold text-slate-800 flex justify-between items-center">
              <span>Bachelor Courses</span>
              <button 
                onClick={() => {
                  const current = formData.courses?.bachelor || [];
                  updateField("courses.bachelor", [...current, { name: "", duration: "", fees: "", eligibility: "", seats: "" }]);
                }}
                className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-md hover:bg-indigo-100 font-bold flex items-center transition-all active:scale-95"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Bachelor Course
              </button>
            </div>
            <div className="p-6">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-400 bg-slate-50 uppercase tracking-widest font-black">
                  <tr>
                    <th className="px-4 py-3">Course Name</th>
                    <th className="px-4 py-3">Duration</th>
                    <th className="px-4 py-3">Fees/Yr</th>
                    <th className="px-4 py-3">Eligibility</th>
                    <th className="px-4 py-3">Seats</th>
                    <th className="px-4 py-3 text-center w-16">Remove</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(formData.courses?.bachelor || []).map((row: any, idx: number) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-2 py-2"><input type="text" value={row.name} onChange={(e) => { const n = [...formData.courses.bachelor]; n[idx].name = e.target.value; updateField("courses.bachelor", n); }} className="w-full p-2 border rounded-lg text-sm" /></td>
                      <td className="px-2 py-2"><input type="text" value={row.duration} onChange={(e) => { const n = [...formData.courses.bachelor]; n[idx].duration = e.target.value; updateField("courses.bachelor", n); }} className="w-full p-2 border rounded-lg text-sm" /></td>
                      <td className="px-2 py-2"><input type="text" value={row.fees} onChange={(e) => { const n = [...formData.courses.bachelor]; n[idx].fees = e.target.value; updateField("courses.bachelor", n); }} className="w-full p-2 border rounded-lg text-sm" /></td>
                      <td className="px-2 py-2"><input type="text" value={row.eligibility} onChange={(e) => { const n = [...formData.courses.bachelor]; n[idx].eligibility = e.target.value; updateField("courses.bachelor", n); }} className="w-full p-2 border rounded-lg text-sm" /></td>
                      <td className="px-2 py-2"><input type="text" value={row.seats} onChange={(e) => { const n = [...formData.courses.bachelor]; n[idx].seats = e.target.value; updateField("courses.bachelor", n); }} className="w-full p-2 border rounded-lg text-sm" /></td>
                      <td className="px-4 py-2 text-center text-rose-500 hover:text-rose-700 cursor-pointer" onClick={() => { const n = [...formData.courses.bachelor]; n.splice(idx, 1); updateField("courses.bachelor", n); }}>
                        <Trash2 className="w-4 h-4 mx-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {(formData.courses?.bachelor || []).length === 0 && <div className="py-10 text-center text-slate-400 text-xs italic">No bachelor courses added yet.</div>}
            </div>

            <div className="bg-slate-50 px-6 py-4 border-t border-b border-slate-200 font-bold text-slate-800 flex justify-between items-center mt-8">
              <span>Master Courses</span>
              <button 
                onClick={() => {
                  const current = formData.courses?.master || [];
                  updateField("courses.master", [...current, { name: "", duration: "", fees: "", eligibility: "", seats: "" }]);
                }}
                className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-md hover:bg-indigo-100 font-bold flex items-center transition-all active:scale-95"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Master Course
              </button>
            </div>
            <div className="p-6">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-400 bg-slate-50 uppercase tracking-widest font-black">
                  <tr>
                    <th className="px-4 py-3">Course Name</th>
                    <th className="px-4 py-3">Duration</th>
                    <th className="px-4 py-3">Fees/Yr</th>
                    <th className="px-4 py-3">Eligibility</th>
                    <th className="px-4 py-3">Seats</th>
                    <th className="px-4 py-3 text-center w-16">Remove</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(formData.courses?.master || []).map((row: any, idx: number) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-2 py-2"><input type="text" value={row.name} onChange={(e) => { const n = [...formData.courses.master]; n[idx].name = e.target.value; updateField("courses.master", n); }} className="w-full p-2 border rounded-lg text-sm" /></td>
                      <td className="px-2 py-2"><input type="text" value={row.duration} onChange={(e) => { const n = [...formData.courses.master]; n[idx].duration = e.target.value; updateField("courses.master", n); }} className="w-full p-2 border rounded-lg text-sm" /></td>
                      <td className="px-2 py-2"><input type="text" value={row.fees} onChange={(e) => { const n = [...formData.courses.master]; n[idx].fees = e.target.value; updateField("courses.master", n); }} className="w-full p-2 border rounded-lg text-sm" /></td>
                      <td className="px-2 py-2"><input type="text" value={row.eligibility} onChange={(e) => { const n = [...formData.courses.master]; n[idx].eligibility = e.target.value; updateField("courses.master", n); }} className="w-full p-2 border rounded-lg text-sm" /></td>
                      <td className="px-2 py-2"><input type="text" value={row.seats} onChange={(e) => { const n = [...formData.courses.master]; n[idx].seats = e.target.value; updateField("courses.master", n); }} className="w-full p-2 border rounded-lg text-sm" /></td>
                      <td className="px-4 py-2 text-center text-rose-500 hover:text-rose-700 cursor-pointer" onClick={() => { const n = [...formData.courses.master]; n.splice(idx, 1); updateField("courses.master", n); }}>
                        <Trash2 className="w-4 h-4 mx-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {(formData.courses?.master || []).length === 0 && <div className="py-10 text-center text-slate-400 text-xs italic">No master courses added yet.</div>}
            </div>
          </div>
        )}

        {/* Dynamic Tables Style (for other tabs) */}
        {["overview", "leadership", "programs", "scholarships", "downloads"].includes(activeTab) && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-fadeIn">
             <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 font-bold text-slate-800 flex justify-between items-center">
                <span className="capitalize">{activeTab} Details</span>
                <button 
                  onClick={() => {
                    const templates: any = {
                      overview: { label: "", fact: "" },
                      leadership: { position: "", role: "", holder: "" },
                      programs: { name: "", level: "Bachelor", status: "Ongoing" },
                      scholarships: { program: "", name: "", benefit: "", for: "" },
                      downloads: { name: "", file: "", date: "" }
                    };
                    addArrayRow(activeTab, templates[activeTab]);
                  }}
                  className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-md hover:bg-indigo-100 font-bold flex items-center transition-all active:scale-95"
                >
                   <Plus className="w-3.5 h-3.5 mr-1" /> Add Row
                </button>
             </div>
             <div className="p-6">
                <table className="w-full text-sm text-left">
                   <thead className="text-xs text-slate-400 bg-slate-50 uppercase tracking-widest font-black">
                      <tr>
                        {activeTab === "overview" && <><th className="px-4 py-3">Label</th><th className="px-4 py-3">Fact</th></>}
                        {activeTab === "leadership" && <><th className="px-4 py-3">Position</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Holder</th></>}
                        {activeTab === "programs" && <><th className="px-4 py-3">Program Name</th><th className="px-4 py-3">Level</th><th className="px-4 py-3">Status</th></>}
                        {activeTab === "scholarships" && <><th className="px-4 py-3">Level</th><th className="px-4 py-3">Name</th><th className="px-4 py-3">Benefit</th><th className="px-4 py-3">For Whom</th></>}
                        {activeTab === "downloads" && <><th className="px-4 py-3">File Name</th><th className="px-4 py-3">URL</th><th className="px-4 py-3">Date</th></>}
                        <th className="px-4 py-3 text-center w-16">Remove</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {(getPath(formData, activeTab) || []).map((row: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                           {activeTab === "overview" && (
                             <>
                               <td className="px-2 py-2"><input type="text" value={row.label} onChange={(e) => { const n = [...formData.overview]; n[idx].label = e.target.value; updateField("overview", n); }} className="w-full p-2 border rounded-lg text-sm" /></td>
                               <td className="px-2 py-2"><input type="text" value={row.fact} onChange={(e) => { const n = [...formData.overview]; n[idx].fact = e.target.value; updateField("overview", n); }} className="w-full p-2 border rounded-lg text-sm" /></td>
                             </>
                           )}
                           {activeTab === "leadership" && (
                             <>
                               <td className="px-2 py-2"><input type="text" value={row.position} onChange={(e) => { const n = [...formData.leadership]; n[idx].position = e.target.value; updateField("leadership", n); }} className="w-full p-2 border rounded-lg text-sm" /></td>
                               <td className="px-2 py-2"><input type="text" value={row.role} onChange={(e) => { const n = [...formData.leadership]; n[idx].role = e.target.value; updateField("leadership", n); }} className="w-full p-2 border rounded-lg text-sm" /></td>
                               <td className="px-2 py-2"><input type="text" value={row.holder} onChange={(e) => { const n = [...formData.leadership]; n[idx].holder = e.target.value; updateField("leadership", n); }} className="w-full p-2 border rounded-lg text-sm" /></td>
                             </>
                           )}
                           {activeTab === "programs" && (
                             <>
                               <td className="px-2 py-2"><input type="text" value={row.name} onChange={(e) => { const n = [...formData.programs]; n[idx].name = e.target.value; updateField("programs", n); }} className="w-full p-2 border rounded-lg text-sm" /></td>
                               <td className="px-2 py-2">
                                 <select value={row.level} onChange={(e) => { const n = [...formData.programs]; n[idx].level = e.target.value; updateField("programs", n); }} className="w-full p-2 border rounded-lg text-sm bg-white shadow-sm border-slate-200">
                                    <option>Bachelor</option><option>Master</option><option>PhD</option><option>Diploma</option>
                                 </select>
                               </td>
                               <td className="px-2 py-2">
                                 <select value={row.status} onChange={(e) => { const n = [...formData.programs]; n[idx].status = e.target.value; updateField("programs", n); }} className="w-full p-2 border rounded-lg text-sm bg-white shadow-sm border-slate-200">
                                    <option>Ongoing</option><option>Closed</option><option>Coming Soon</option>
                                 </select>
                               </td>
                             </>
                           )}
                           {activeTab === "scholarships" && (
                             <>
                               <td className="px-2 py-2"><input type="text" value={row.program} onChange={(e) => { const n = [...formData.scholarships]; n[idx].program = e.target.value; updateField("scholarships", n); }} className="w-full p-2 border rounded-lg text-sm" /></td>
                               <td className="px-2 py-2"><input type="text" value={row.name} onChange={(e) => { const n = [...formData.scholarships]; n[idx].name = e.target.value; updateField("scholarships", n); }} className="w-full p-2 border rounded-lg text-sm" /></td>
                               <td className="px-2 py-2"><input type="text" value={row.benefit} onChange={(e) => { const n = [...formData.scholarships]; n[idx].benefit = e.target.value; updateField("scholarships", n); }} className="w-full p-2 border rounded-lg text-sm" /></td>
                               <td className="px-2 py-2"><input type="text" value={row.for} onChange={(e) => { const n = [...formData.scholarships]; n[idx].for = e.target.value; updateField("scholarships", n); }} className="w-full p-2 border rounded-lg text-sm" /></td>
                             </>
                           )}
                           {activeTab === "downloads" && (
                             <>
                               <td className="px-2 py-2"><input type="text" value={row.name} onChange={(e) => { const n = [...formData.downloads]; n[idx].name = e.target.value; updateField("downloads", n); }} className="w-full p-2 border rounded-lg text-sm" placeholder="File Display Name" /></td>
                               <td className="px-2 py-2">
                                  <div className="flex items-center space-x-2">
                                     <input 
                                        type="file" 
                                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], (res) => {
                                          const n = [...formData.downloads];
                                          n[idx].file = res;
                                          updateField("downloads", n);
                                        })}
                                        className="hidden" 
                                        id={`file-${idx}`}
                                     />
                                     <label htmlFor={`file-${idx}`} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded hover:bg-indigo-100 cursor-pointer transition-colors flex items-center shrink-0">
                                        <FileText className="w-3 h-3 mr-1" /> {row.file ? "Change File" : "Upload"}
                                     </label>
                                     <input type="text" value={row.file || ""} onChange={(e) => { const n = [...formData.downloads]; n[idx].file = e.target.value; updateField("downloads", n); }} className="w-full p-2 border bg-slate-50 rounded-lg text-[10px] font-mono" placeholder="File URL/Base64" />
                                  </div>
                               </td>
                               <td className="px-2 py-2"><input type="date" value={row.date} onChange={(e) => { const n = [...formData.downloads]; n[idx].date = e.target.value; updateField("downloads", n); }} className="w-full p-2 border rounded-lg text-sm" /></td>
                             </>
                           )}
                           <td className="px-4 py-2 text-center">
                              <button onClick={() => removeArrayRow(activeTab, idx)} className="text-slate-300 hover:text-rose-500 transition-colors">
                                 <Trash2 className="w-4 h-4 mx-auto" />
                              </button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
                {(getPath(formData, activeTab) || []).length === 0 && (
                  <div className="py-10 text-center text-slate-400 text-xs italic">No entries yet. Click "Add Row" to start.</div>
                )}
             </div>
          </div>
        )}

        {/* Admissions Tab */}
        {activeTab === "admissions" && (
           <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200">
                 <div>
                    <h3 className="text-lg font-bold text-slate-800">Manage Admissions</h3>
                    <p className="text-sm text-slate-500">Add cards for currently open admissions or faculties.</p>
                 </div>
                 <button 
                  onClick={() => addArrayRow("admissions", { title: "", status: "Open", faculty: "", admissionOpen: "", deadline: "", image: "" })}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-indigo-700 active:scale-95 transition-all flex items-center"
                 >
                    <Plus className="w-4 h-4 mr-1" /> Add Admission Card
                 </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {(formData.admissions || []).map((item: any, idx: number) => (
                    <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative space-y-4 hover:border-indigo-200 transition-colors group">
                       <button onClick={() => removeArrayRow("admissions", idx)} className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 group-hover:scale-110 transition-transform">
                          <Trash2 className="w-4 h-4" />
                       </button>
                       <div className="grid grid-cols-2 gap-3">
                          <div className="col-span-2">
                             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 block">Title</label>
                             <input type="text" value={item.title} onChange={(e) => { const n = [...formData.admissions]; n[idx].title = e.target.value; updateField("admissions", n); }} className="w-full p-2 border rounded-lg text-sm font-bold" />
                          </div>
                          <div>
                             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 block">Status</label>
                             <select value={item.status} onChange={(e) => { const n = [...formData.admissions]; n[idx].status = e.target.value; updateField("admissions", n); }} className="w-full p-2 border rounded-lg text-sm bg-white">
                                <option>Open</option><option>Closed</option><option>Coming Soon</option>
                             </select>
                          </div>
                          <div>
                             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 block">Faculty</label>
                             <input type="text" value={item.faculty} onChange={(e) => { const n = [...formData.admissions]; n[idx].faculty = e.target.value; updateField("admissions", n); }} className="w-full p-2 border rounded-lg text-sm" />
                          </div>
                          <div>
                             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 block">Admission Date</label>
                             <input type="text" value={item.admissionOpen} onChange={(e) => { const n = [...formData.admissions]; n[idx].admissionOpen = e.target.value; updateField("admissions", n); }} className="w-full p-2 border rounded-lg text-sm" />
                          </div>
                          <div>
                             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 block">Deadline</label>
                             <input type="text" value={item.deadline} onChange={(e) => { const n = [...formData.admissions]; n[idx].deadline = e.target.value; updateField("admissions", n); }} className="w-full p-2 border rounded-lg text-sm" />
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        )}


        {/* News Tab */}
        {activeTab === "news" && (
           <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200">
                 <div>
                    <h3 className="text-lg font-bold text-slate-800">News & Notices</h3>
                    <p className="text-sm text-slate-500">Add latest updates, notices or news articles.</p>
                 </div>
                 <button 
                  onClick={() => addArrayRow("news", { heading: "", type: "Notice", excerpt: "", body: "", date: new Date().toLocaleDateString(), image: "" })}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-indigo-700 active:scale-95 transition-all flex items-center"
                 >
                    <Plus className="w-4 h-4 mr-1" /> Add News Item
                 </button>
              </div>

              <div className="space-y-8">
                  {(formData.news || []).map((item: any, idx: number) => (
                     <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative space-y-6 hover:border-indigo-200 transition-colors group">
                        <button onClick={() => removeArrayRow("news", idx)} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors">
                           <Trash2 className="w-5 h-5" />
                        </button>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                           {/* News Banner Upload */}
                           <div className="lg:col-span-3 space-y-2">
                              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Banner Image</label>
                              <div className="relative aspect-[16/10] bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl overflow-hidden group/img cursor-pointer hover:border-indigo-400">
                                 {item.image ? (
                                    <img src={item.image} alt="Banner" className="w-full h-full object-cover" />
                                 ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40">
                                       <Image className="w-8 h-8 text-slate-400" />
                                       <span className="text-[10px] font-bold">Upload</span>
                                    </div>
                                 )}
                                 <input 
                                    type="file" 
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], (res) => {
                                       const n = [...formData.news];
                                       n[idx].image = res;
                                       updateField("news", n);
                                    })}
                                 />
                              </div>
                           </div>

                           <div className="lg:col-span-9 space-y-4">
                              <div className="flex gap-4">
                                 <input 
                                    type="text" 
                                    placeholder="News Heading" 
                                    value={item.heading} 
                                    onChange={(e) => { const n = [...formData.news]; n[idx].heading = e.target.value; updateField("news", n); }} 
                                    className="flex-1 p-3 border rounded-xl text-lg font-bold focus:ring-2 focus:ring-indigo-500 border-slate-200 outline-none" 
                                 />
                                 <select 
                                    value={item.type} 
                                    onChange={(e) => { const n = [...formData.news]; n[idx].type = e.target.value; updateField("news", n); }} 
                                    className="w-32 p-3 border rounded-xl bg-slate-50 font-bold text-xs uppercase"
                                 >
                                    <option>Notice</option><option>News</option><option>Update</option><option>Press</option>
                                 </select>
                              </div>
                              
                              <div>
                                 <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 block">Short Excerpt (Brief Summary)</label>
                                 <textarea 
                                    placeholder="Enter a brief summary for the news feed..." 
                                    value={item.excerpt || item.desc || ""} 
                                    onChange={(e) => { const n = [...formData.news]; n[idx].excerpt = e.target.value; updateField("news", n); }} 
                                    className="w-full p-3 border rounded-xl text-sm h-16 resize-none bg-slate-50/30 border-slate-200" 
                                 />
                              </div>
                           </div>
                        </div>

                        <div className="pt-2">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Content Body (Rich Editor)</label>
                           <NewsRichEditor 
                              value={item.body || ""} 
                              onChange={(val) => {
                                 const n = [...formData.news];
                                 n[idx].body = val;
                                 updateField("news", n);
                              }}
                           />
                           <p className="mt-1.5 text-[10px] text-slate-400 italic font-medium px-2 flex justify-between">
                              <span>Uses react-rte for professional formatting with state management.</span>
                              <span>Total length: {item.body?.length || 0} characters</span>
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
        )}

        {/* Institutes / Faculties Tab (NESTED TABLE) */}
        {activeTab === "institutes" && (
           <div className="space-y-10 animate-fadeIn">
              <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <div>
                    <h3 className="text-lg font-bold text-slate-800">Institutes & Faculties</h3>
                    <p className="text-sm text-slate-500">Add faculties and their constituent/affiliated colleges.</p>
                 </div>
                 <button 
                  onClick={() => addArrayRow("faculties", { name: "", colleges: [] })}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-indigo-700 active:scale-95 transition-all flex items-center"
                 >
                    <Plus className="w-4 h-4 mr-1" /> Add Faculty
                 </button>
              </div>

              <div className="space-y-8">
                 {(formData.faculties || []).map((faculty: any, fIdx: number) => (
                    <div key={fIdx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                       <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                          <input 
                            type="text" 
                            placeholder="Faculty Name (e.g. Institute of Medicine)" 
                            value={faculty.name} 
                            onChange={(e) => {
                              const n = [...formData.faculties];
                              n[fIdx].name = e.target.value;
                              updateField("faculties", n);
                            }}
                            className="bg-transparent border-none text-slate-800 font-bold focus:ring-0 p-0 text-lg w-full max-w-md"
                          />
                          <button onClick={() => removeArrayRow("faculties", fIdx)} className="text-slate-400 hover:text-rose-500 transition-colors">
                             <Trash2 className="w-5 h-5" />
                          </button>
                       </div>
                       <div className="p-6">
                          <table className="w-full text-sm text-left border-collapse">
                             <thead className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black bg-slate-50/50">
                                <tr>
                                   <th className="px-4 py-3 border-b">SN</th>
                                   <th className="px-4 py-3 border-b">College Name</th>
                                   <th className="px-4 py-3 border-b">Address</th>
                                   <th className="px-4 py-3 border-b">Programs</th>
                                   <th className="px-4 py-3 border-b text-center w-12">Action</th>
                                </tr>
                             </thead>
                             <tbody className="divide-y divide-slate-100">
                                {(faculty.colleges || []).map((college: any, cIdx: number) => (
                                   <tr key={cIdx} className="group">
                                      <td className="px-2 py-2 w-12"><input type="text" value={college.sn} onChange={(e) => { const n = [...formData.faculties]; n[fIdx].colleges[cIdx].sn = e.target.value; updateField("faculties", n); }} className="w-full p-2 border border-transparent group-hover:border-slate-200 rounded text-center" /></td>
                                      <td className="px-2 py-2"><input type="text" value={college.college} onChange={(e) => { const n = [...formData.faculties]; n[fIdx].colleges[cIdx].college = e.target.value; updateField("faculties", n); }} className="w-full p-2 border border-transparent group-hover:border-slate-200 rounded font-medium" /></td>
                                      <td className="px-2 py-2"><input type="text" value={college.address} onChange={(e) => { const n = [...formData.faculties]; n[fIdx].colleges[cIdx].address = e.target.value; updateField("faculties", n); }} className="w-full p-2 border border-transparent group-hover:border-slate-200 rounded" /></td>
                                      <td className="px-2 py-2"><input type="text" value={college.programs} onChange={(e) => { const n = [...formData.faculties]; n[fIdx].colleges[cIdx].programs = e.target.value; updateField("faculties", n); }} className="w-full p-2 border border-transparent group-hover:border-slate-200 rounded" /></td>
                                      <td className="px-4 py-2 text-center">
                                         <button onClick={() => {
                                           const n = [...formData.faculties];
                                           n[fIdx].colleges.splice(cIdx, 1);
                                           updateField("faculties", n);
                                         }} className="text-slate-200 hover:text-rose-500 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                         </button>
                                      </td>
                                   </tr>
                                ))}
                             </tbody>
                          </table>
                          <button 
                            onClick={() => {
                              const n = [...formData.faculties];
                              if(!n[fIdx].colleges) n[fIdx].colleges = [];
                              n[fIdx].colleges.push({ sn: n[fIdx].colleges.length + 1, college: "", address: "", programs: "" });
                              updateField("faculties", n);
                            }}
                            className="mt-4 text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 transition-colors"
                          >
                             <Plus className="w-3 h-3" /> <span>Add College to this Faculty</span>
                          </button>
                       </div>
                    </div>
                 ))}
                 {(formData.faculties || []).length === 0 && <div className="py-20 text-center text-slate-400 bg-white border border-dashed rounded-2xl">No faculties added. Great universities have many!</div>}
              </div>
           </div>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
           <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <div>
                    <h3 className="text-lg font-bold text-slate-800">Event Calendar</h3>
                    <p className="text-sm text-slate-500">Upcoming conferences, symposia, and campus events.</p>
                 </div>
                 <button 
                  onClick={() => addArrayRow("events", { type: "", date: "", heading: "", organizer: "", venue: "", desc: "", link: "" })}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-indigo-700 transition-all flex items-center"
                 >
                    <Plus className="w-4 h-4 mr-1" /> Add Event
                 </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {(formData.events || []).map((item: any, idx: number) => (
                    <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 hover:border-indigo-200 transition-colors relative space-y-4 group">
                       <button onClick={() => removeArrayRow("events", idx)} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                       <div className="flex gap-4">
                          <input type="text" placeholder="Type (e.g. Conference)" value={item.type} onChange={(e) => { const n = [...formData.events]; n[idx].type = e.target.value; updateField("events", n); }} className="w-1/3 p-2 border rounded text-xs" />
                          <input type="date" value={item.date} onChange={(e) => { const n = [...formData.events]; n[idx].date = e.target.value; updateField("events", n); }} className="w-2/3 p-2 border rounded text-xs" />
                       </div>
                       <input type="text" placeholder="Event Title" value={item.heading} onChange={(e) => { const n = [...formData.events]; n[idx].heading = e.target.value; updateField("events", n); }} className="w-full p-2 border rounded text-sm font-bold" />
                       <div className="grid grid-cols-2 gap-4">
                          <input type="text" placeholder="Organizer" value={item.organizer} onChange={(e) => { const n = [...formData.events]; n[idx].organizer = e.target.value; updateField("events", n); }} className="p-2 border rounded text-xs" />
                          <input type="text" placeholder="Venue" value={item.venue} onChange={(e) => { const n = [...formData.events]; n[idx].venue = e.target.value; updateField("events", n); }} className="p-2 border rounded text-xs" />
                       </div>
                       <textarea placeholder="Event Description..." value={item.desc} onChange={(e) => { const n = [...formData.events]; n[idx].desc = e.target.value; updateField("events", n); }} className="w-full p-2 border rounded text-xs h-20 resize-none" />
                       <input type="text" placeholder="Registration Link" value={item.link} onChange={(e) => { const n = [...formData.events]; n[idx].link = e.target.value; updateField("events", n); }} className="w-full p-2 border rounded text-xs font-mono text-indigo-500" />
                    </div>
                 ))}
              </div>
           </div>
        )}

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
           <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm animate-fadeIn">
              <div className="flex justify-between items-center mb-8 border-b pb-6">
                 <div>
                    <h3 className="text-xl font-bold text-slate-800">Media Gallery</h3>
                    <p className="text-sm text-slate-500">Collect images of the campus, facilities and graduation.</p>
                 </div>
                 <div className="flex items-center space-x-3">
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*" 
                      className="hidden" 
                      id="batch-upload" 
                      onChange={(e) => e.target.files && handleMultipleImagesUpload(e.target.files)}
                    />
                    <label 
                      htmlFor="batch-upload"
                      className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-indigo-100 flex items-center cursor-pointer transition-colors"
                    >
                      <Image className="w-4 h-4 mr-1" /> Batch Upload
                    </label>
                    <button 
                      onClick={() => addArrayRow("gallery", "")}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-indigo-700 flex items-center transition-colors"
                    >
                      <Plus className="w-4 h-4 mr-1" /> Add Empty Slot
                    </button>
                 </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                 {(formData.gallery || []).map((url: string, idx: number) => (
                    <div key={idx} className="group relative aspect-video rounded-xl border-2 border-slate-100 overflow-hidden bg-slate-50 shadow-sm hover:border-indigo-400 transition-all">
                       <input 
                          type="file" 
                          accept="image/*"
                          className="hidden" 
                          id={`gall-${idx}`}
                          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], (res) => {
                             const n = [...formData.gallery];
                             n[idx] = res;
                             updateField("gallery", n);
                          })}
                       />
                       {url ? (
                         <div className="relative w-full h-full group">
                            <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                            <label htmlFor={`gall-${idx}`} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold cursor-pointer transition-opacity">
                               Change Image
                            </label>
                         </div>
                       ) : (
                         <label htmlFor={`gall-${idx}`} className="w-full h-full flex flex-col items-center justify-center space-y-2 opacity-50 cursor-pointer hover:bg-slate-100 transition-colors">
                            <Image className="w-8 h-8 text-slate-300" />
                            <span className="text-[10px] uppercase font-bold text-slate-400">Click to Upload</span>
                         </label>
                       )}
                       <div className="absolute inset-x-0 bottom-0 p-2 bg-slate-900/80 translate-y-full group-hover:translate-y-0 transition-transform flex gap-2">
                          <input 
                            type="text" 
                            className="flex-1 bg-transparent border-none text-[10px] text-white focus:ring-0 p-0" 
                            placeholder="Or paste image URL" 
                            value={url}
                            onChange={(e) => {
                               const n = [...formData.gallery];
                               n[idx] = e.target.value;
                               updateField("gallery", n);
                            }}
                          />
                          <button onClick={() => removeArrayRow("gallery", idx)} className="text-rose-400 hover:text-rose-600 outline-none"><Trash2 className="w-3 h-3" /></button>
                       </div>
                    </div>
                 ))}
                 {(formData.gallery || []).length === 0 && <div className="col-span-full py-20 text-center text-slate-400">Gallery is empty. Add URLs to showcase your campus!</div>}
              </div>
           </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
           <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <div>
                    <h3 className="text-lg font-bold text-slate-800">Student Reviews</h3>
                    <p className="text-sm text-slate-500">Manage alumni and student testimonials.</p>
                 </div>
                 <button 
                  onClick={() => addArrayRow("reviews", { name: "", program: "", rating: 5, body: "" })}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-indigo-700 flex items-center"
                 >
                    <Plus className="w-4 h-4 mr-1" /> Add Review
                 </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {(formData.reviews || []).map((item: any, idx: number) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative space-y-4 hover:shadow-md transition-all">
                       <button onClick={() => removeArrayRow("reviews", idx)} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
                       <div className="grid grid-cols-2 gap-4">
                          <input type="text" placeholder="Student Name" value={item.name} onChange={(e) => { const n = [...formData.reviews]; n[idx].name = e.target.value; updateField("reviews", n); }} className="p-2 border rounded-lg text-sm font-bold" />
                          <input type="text" placeholder="Program (e.g. MBA)" value={item.program} onChange={(e) => { const n = [...formData.reviews]; n[idx].program = e.target.value; updateField("reviews", n); }} className="p-2 border rounded-lg text-sm" />
                       </div>
                       <div className="flex items-center space-x-3">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rating:</span>
                          <div className="flex space-x-1">
                             {[1,2,3,4,5].map(star => (
                                <button key={star} onClick={() => { const n = [...formData.reviews]; n[idx].rating = star; updateField("reviews", n); }}>
                                   <Star className={`w-5 h-5 transition-colors ${item.rating >= star ? "fill-amber-400 text-amber-400" : "text-slate-200 hover:text-amber-200"}`} />
                                </button>
                             ))}
                          </div>
                       </div>
                       <textarea placeholder="Student testimonial..." value={item.body} onChange={(e) => { const n = [...formData.reviews]; n[idx].body = e.target.value; updateField("reviews", n); }} className="w-full p-3 border rounded-xl text-sm h-32 resize-none italic text-slate-600 shadow-inner bg-slate-50/30" />
                    </div>
                 ))}
                 {(formData.reviews || []).length === 0 && <div className="col-span-full py-20 text-center text-slate-400 bg-white border-2 border-dashed rounded-3xl">No reviews yet. Real student voices build trust.</div>}
              </div>
           </div>
        )}
      </form>

    
    </div>
  );
};

export default UniversityForm;

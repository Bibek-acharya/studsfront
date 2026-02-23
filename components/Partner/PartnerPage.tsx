import React, { useState } from "react";

const PartnerPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    organizationName: "",
    contactPersonName: "",
    type: "",
    email: "",
    website: "",
    contactNumber: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Form submitted:", formData);
      alert("Partnership request submitted successfully!");
      setIsSubmitting(false);
      setFormData({
        organizationName: "",
        contactPersonName: "",
        type: "",
        email: "",
        website: "",
        contactNumber: "",
      });
      setFile(null);
    }, 1500);
  };

  const partners = Array(20).fill({ name: "Studsphere" });

  const events = [
    {
      id: 1,
      title: "Hackathons",
      description:
        "Competitive coding challenges where students build real projects.",
      image:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "bg-blue-200",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      title: "Codecamps",
      description:
        "Short, intensive training sessions on programming and development.",
      image:
        "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "bg-pink-200",
      iconColor: "text-pink-600",
    },
    {
      id: 3,
      title: "Bootcamps",
      description:
        "Fast-paced learning programs on tech, design, business, and skills.",
      image:
        "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "bg-amber-200",
      iconColor: "text-amber-600",
    },
    {
      id: 4,
      title: "Workshops",
      description:
        "Interactive sessions focused on specific skill mastery and career growth.",
      image:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
      color: "bg-purple-200",
      iconColor: "text-purple-600",
    },
    {
      id: 5,
      title: "Networking",
      description:
        "Curated events connecting students with industry leaders and alumni.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      color: "bg-teal-200",
      iconColor: "text-teal-600",
    },
    {
      id: 6,
      title: "Summit",
      description:
        "Large scale conferences discussing the future of education and tech.",
      image:
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
      color: "bg-red-200",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="pt-24 md:pt-32 pb-20 bg-gray-50 min-h-screen font-jakarta">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">
            Partner with us
          </h1>
          <nav className="text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <span className="text-slate-400">Home</span>
            <span className="text-slate-300">/</span>
            <span className="text-blue-600">Contact Us</span>
          </nav>
        </div>

        {/* Organization Form Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">
            Organization Details
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          >
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">
                    Organization/Company Name{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex. Studsphere"
                    required
                    className="w-full h-12 p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all font-medium"
                    value={formData.organizationName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        organizationName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">
                    Contact Person Full Name{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex. Jagdis Dhami"
                    required
                    className="w-full h-12 p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all font-medium"
                    value={formData.contactPersonName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contactPersonName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    className="w-full h-12 p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all font-medium appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%232563EB%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')] bg-[length:1em] bg-[right_1rem_center] bg-no-repeat"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      Select a type
                    </option>
                    <option value="corporate">Corporate Partner</option>
                    <option value="educational">Educational Institution</option>
                    <option value="ngo">NGO/Non-Profit</option>
                    <option value="government">Government Organization</option>
                    <option value="startup">Startup</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Ex. hello@studsphere.com"
                    required
                    className="w-full h-12 p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all font-medium"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">
                    Website/Social media Link{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    required
                    className="w-full h-12 p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all font-medium"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Ex. 98XXXXXXXX"
                    required
                    className="w-full h-12 p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all font-medium"
                    value={formData.contactNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contactNumber: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Document Upload & Action */}
            <div className="space-y-6">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">
                Upload Document
              </label>
              <div
                className="border-2 border-dashed border-blue-300 rounded-2xl p-10 text-center space-y-4 bg-blue-50/30 hover:bg-blue-50 transition-colors relative cursor-pointer"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
                <div className="mx-auto w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                  <i className="fa-solid fa-cloud-arrow-up text-blue-600 text-xl"></i>
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900">
                    Drag & Drop File
                  </p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                    OR
                  </p>
                </div>
                <button
                  type="button"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm shadow-lg shadow-blue-500/20"
                >
                  Browse File
                </button>
                {file && (
                  <p className="text-xs font-bold text-emerald-600 truncate px-2">
                    Selected: {file.name}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-black rounded-xl text-lg shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <i className="fa-solid fa-spinner animate-spin"></i>
                ) : (
                  "Send Request"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Partners Marquee Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 rounded-2xl border border-slate-100 mb-20 overflow-hidden">
          <div className="text-center mb-16 px-6">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Our Valuable Partners
            </h2>
            <p className="text-lg text-slate-500 max-w-3xl mx-auto font-medium">
              AI and learning: A new chapter for the students and educators
              worldwide
            </p>
          </div>

          <div className="space-y-8">
            {/* First Row: Scroll Left */}
            <div className="relative flex overflow-hidden group">
              <div className="flex animate-marquee gap-6 whitespace-nowrap">
                {[...partners.slice(0, 10), ...partners.slice(0, 10)].map(
                  (p, i) => (
                    <div
                      key={i}
                      className="min-w-[200px] h-24 bg-white border border-slate-100 rounded-xl shadow-sm hover:border-blue-400 hover:shadow-lg transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer"
                    >
                      <i className="fa-solid fa-graduation-cap text-blue-600 text-2xl group-hover:scale-110 transition-transform"></i>
                      <span className="text-sm font-bold text-blue-600">
                        {p.name}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Second Row: Scroll Right */}
            <div className="relative flex overflow-hidden group">
              <div className="flex animate-marquee-reverse gap-6 whitespace-nowrap">
                {[...partners.slice(10), ...partners.slice(10)].map((p, i) => (
                  <div
                    key={i}
                    className="min-w-[200px] h-24 bg-white border border-slate-100 rounded-xl shadow-sm hover:border-blue-400 hover:shadow-lg transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer"
                  >
                    <i className="fa-solid fa-graduation-cap text-blue-600 text-2xl group-hover:scale-110 transition-transform"></i>
                    <span className="text-sm font-bold text-blue-600">
                      {p.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">
            Trusted by leading educational institutions worldwide
          </div>
        </section>

        {/* What We Organize Grid Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              What We Organize
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Innovation events, tech camps, workshops & skill-building
              programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {events.map((event) => (
              <div key={event.id} className="group cursor-pointer">
                <div className="relative aspect-[4/3] mb-8 overflow-visible">
                  {/* The Notch Mask is applied here via the CSS class from index.html */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl image-notch-mask">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
                  </div>

                  {/* Circular Button sitting in the notch */}
                  <div
                    className={`absolute bottom-0 right-0 w-16 h-16 ${event.color} rounded-full flex items-center justify-center shadow-xl border-4 border-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-45 z-10`}
                  >
                    <i
                      className={`fa-solid fa-arrow-up-right-from-square ${event.iconColor} text-xl`}
                    ></i>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-3">
                  {event.title}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PartnerPage;

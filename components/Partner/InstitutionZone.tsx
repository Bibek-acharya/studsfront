import React, { useState } from "react";

interface ServiceDetail {
  title: string;
  icon: string;
  colorClass: string;
  description: string;
  features: string[];
}

const servicesContent: Record<string, ServiceDetail> = {
  admissions: {
    title: "Featured Admissions",
    icon: "fa-door-open",
    colorClass: "text-blue-600 bg-blue-100",
    description:
      "Ensure your enrollment periods get maximum visibility. Featured admissions are pinned to the top of the education portal for target students.",
    features: [
      "Top placement in 'Current Admissions' for 30 days",
      "Real-time countdown timer for application deadlines",
      "Automated lead notifications for interested students",
      "Up to 5x higher application conversion rates",
    ],
  },
  "ai-matcher": {
    title: "AI Enrollment Matcher",
    icon: "fa-wand-magic-sparkles",
    colorClass: "text-violet-600 bg-violet-100",
    description:
      "Our AI analyzes student academic performance and interests to match them with your specific courses and prerequisites.",
    features: [
      "Instant student eligibility scoring",
      "Personalized course recommendations for learners",
      "Predictive enrollment analytics for institutions",
      "Identify high-intent candidates automatically",
    ],
  },
  branding: {
    title: "Campus Branding",
    icon: "fa-building-columns",
    colorClass: "text-rose-600 bg-rose-100",
    description:
      "Showcase your campus life, faculty, and success stories. Build trust through verified student reviews and professional profiles.",
    features: [
      "Premium 360° Virtual Tour integration",
      "Alumni success story carousels",
      "Verified 'Top Tier Institution' badge",
      "Engagement analytics for institution profiles",
    ],
  },
  automation: {
    title: "Admissions Automation",
    icon: "fa-microchip",
    colorClass: "text-cyan-600 bg-cyan-100",
    description:
      "Handle thousands of inquiries without breaking a sweat. Automate the top of your funnel and focus on serious applicants.",
    features: [
      "AI-powered WhatsApp & Web inquiry bot",
      "Automated eligibility pre-screening",
      "Bulk application status updates",
      "Digital brochure & resource delivery",
    ],
  },
  scholarship: {
    title: "Scholarship Management",
    icon: "fa-award",
    colorClass: "text-emerald-600 bg-emerald-100",
    description:
      "Launch and manage scholarship programs to attract merit-based students. We handle the discovery and initial verification.",
    features: [
      "Direct discovery via Scholarship Finder",
      "Document verification workflows",
      "Merit-based candidate shortlisting",
      "Co-branded CSR scholarship initiatives",
    ],
  },
  leads: {
    title: "Student Lead Database",
    icon: "fa-users-viewfinder",
    colorClass: "text-indigo-600 bg-indigo-100",
    description:
      "Access our database of over 200,000 active students searching for higher education opportunities across Nepal and abroad.",
    features: [
      "Filtered search by grade and interest",
      "Direct outreach to prospective students",
      "Bulk email and SMS campaign tools",
      "GDPR & Local privacy compliant data",
    ],
  },
};

const InstitutionZone: React.FC = () => {
  const [heroTab, setHeroTab] = useState<"login" | "demo">("login");
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(
    null,
  );

  return (
    <div className="bg-slate-50 min-h-screen font-sans pt-0 overflow-x-hidden">
      <style>{`
        .folded-card {
            background: white;
            position: relative;
            clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%);
        }
        .folded-card::after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.1) 50%);
            border-top-left-radius: 8px;
            pointer-events: none;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute top-0 right-0 -z-10 w-full h-full bg-slate-50">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-50/50 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 animate-fadeInUp">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Trusted by 100+ Universities
            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight text-slate-900">
              Attract the <br />
              <span className="text-emerald-600">Top 1% Students</span> <br />
              Directly.
            </h1>

            <p className="text-lg md:text-xl text-slate-500 max-w-lg leading-relaxed font-medium">
              Transform your admission process with AI-driven matching and
              digital branding. Position your institution as the preferred
              choice for the next generation.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <BenefitItem icon="fa-user-graduate" text="High-Quality Leads" />
              <BenefitItem icon="fa-chart-pie" text="Enrollment Analytics" />
              <BenefitItem icon="fa-globe" text="Global Visibility" />
            </div>
          </div>

          <div
            className="w-full max-w-md mx-auto lg:ml-auto animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden">
              <div className="flex bg-slate-50 border-b border-slate-100 p-1">
                <button
                  onClick={() => setHeroTab("login")}
                  className={`flex-1 py-4 text-center text-xs font-black uppercase tracking-widest transition-all rounded-lg ${heroTab === "login" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                >
                  Institute Login
                </button>
                <button
                  onClick={() => setHeroTab("demo")}
                  className={`flex-1 py-4 text-center text-xs font-black uppercase tracking-widest transition-all rounded-lg ${heroTab === "demo" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                >
                  Partner With Us
                </button>
              </div>

              <div className="p-10">
                {heroTab === "login" ? (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-black text-slate-900">
                        Education Portal
                      </h3>
                      <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">
                        Enrollment dashboard
                      </p>
                    </div>
                    <button className="w-full py-4 px-6 border border-slate-200 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 transition-all text-sm">
                      <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        className="w-5 h-5"
                        alt=""
                      />
                      Login with University Email
                    </button>
                    <div className="relative flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-300">
                      <div className="flex-1 h-px bg-slate-100"></div>
                      OR
                      <div className="flex-1 h-px bg-slate-100"></div>
                    </div>
                    <input
                      type="email"
                      placeholder="Institutional Email"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 transition-all font-bold text-sm"
                    />
                    <button className="w-full py-4 bg-emerald-600 text-white font-black rounded-xl shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 transition-all active:scale-95 text-xs uppercase tracking-widest">
                      Access Dashboard
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-black text-slate-900">
                        Partner Inquiry
                      </h3>
                      <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">
                        Growth for your campus
                      </p>
                    </div>
                    <input
                      type="text"
                      placeholder="Name of Institution"
                      className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-sm outline-none focus:border-emerald-500 transition-all"
                    />
                    <input
                      type="text"
                      placeholder="Designation"
                      className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-sm outline-none focus:border-emerald-500 transition-all"
                    />
                    <input
                      type="tel"
                      placeholder="Official Contact No."
                      className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-sm outline-none focus:border-emerald-500 transition-all"
                    />
                    <button className="w-full py-4 bg-slate-900 text-white font-black rounded-xl shadow-xl hover:bg-black transition-all active:scale-95 text-xs uppercase tracking-widest mt-4">
                      Submit Interest
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-12">
            The StudSphere Advantage for Educators
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatBlock val="200K+" label="Active Students" />
            <StatBlock val="1.5M+" label="Monthly Inquiries" />
            <StatBlock val="75+" label="Districts Reached" />
            <StatBlock val="92%" label="Admission Success" />
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight uppercase">
              Presence & Growth Plans
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Choose the digital strategy that fits your institution's
              enrollment goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <PlanCard
              icon="fa-id-card"
              title="Digital Presence"
              desc="Verified profile with basic listing and review management."
              color="blue"
            />
            <PlanCard
              icon="fa-bullseye"
              title="Admission Suite"
              desc="Featured listings, lead database access, and AI matching."
              color="emerald"
              featured
            />
            <PlanCard
              icon="fa-crown"
              title="University Enterprise"
              desc="Custom microsite, automation bots, and pan-Nepal branding."
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* Premium Solutions Grid */}
      <section className="py-24 bg-slate-900 text-white rounded-2xl mx-4 md:mx-10 mb-24 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-600 rounded-full blur-[150px] opacity-20 -ml-32 -mt-32"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-6 tracking-tight uppercase">
              Institutional Solutions
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto font-medium text-lg">
              Harness technology to streamline and scale your recruitment
              efforts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(servicesContent).map(([id, service]) => (
              <div
                key={id}
                onClick={() => setSelectedService(service)}
                className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 group cursor-pointer"
              >
                <div
                  className={`w-14 h-14 ${service.colorClass} rounded-2xl flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <i className={`fa-solid ${service.icon}`}></i>
                </div>
                <h3 className="text-xl font-black text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
                  {service.description}
                </p>
                <button className="text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-3 group/btn">
                  Explore Solution{" "}
                  <i className="fa-solid fa-arrow-right transition-transform group-hover/btn:translate-x-2"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-16 tracking-tight uppercase">
            What Educators Say
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <QuoteCard
              name="Dr. Bijay Shrestha"
              role="Dean @ Tech University"
              quote="StudSphere has completely digitized our admission cycle. The quality of students we recruit has improved significantly."
            />
            <QuoteCard
              name="Sunita Malla"
              role="Admission Head @ City College"
              quote="The AI Enrollment Matcher filtered out 80% of unqualified inquiries, saving our staff hundreds of hours every month."
            />
            <QuoteCard
              name="Prof. Rajesh K.C."
              role="Director @ National Science"
              quote="The virtual campus tour and branding tools gave us an edge in a competitive market. Highly recommended."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-emerald-50 rounded-2xl p-12 md:p-20 border border-emerald-100 shadow-sm relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-200 rounded-full blur-[100px] opacity-30 -mr-32 -mb-32"></div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              Ready to boost your campus growth?
            </h2>
            <p className="text-lg text-slate-500 font-medium mb-12 max-w-2xl mx-auto">
              Connect with thousands of prospective students and build your
              brand presence with StudSphere's education tools.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="bg-emerald-600 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 transition-all active:scale-95">
                Become a Partner
              </button>
              <button className="bg-white border border-slate-200 text-slate-600 px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
                Download Info Pack
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-fadeIn">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          ></div>
          <div className="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-2xl animate-scaleIn">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors p-2 z-20"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
            <div
              className={`p-10 ${selectedService.colorClass.split(" ")[1]} transition-colors relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-3xl -mr-24 -mt-24"></div>
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-xl">
                  <i
                    className={`fa-solid ${selectedService.icon} ${selectedService.colorClass.split(" ")[0]}`}
                  ></i>
                </div>
                <h3 className="text-2xl font-black text-slate-900 leading-tight uppercase tracking-tight">
                  {selectedService.title}
                </h3>
              </div>
            </div>
            <div className="p-10 space-y-8">
              <p className="text-slate-500 font-medium leading-relaxed">
                {selectedService.description}
              </p>
              <div>
                <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-6">
                  Key Benefits
                </h4>
                <ul className="space-y-4">
                  {selectedService.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-4 text-sm font-bold text-slate-700"
                    >
                      <i className="fa-solid fa-circle-check text-emerald-500 text-lg"></i>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-10 bg-slate-50 border-t border-slate-100 flex gap-4">
              <button
                onClick={() => setSelectedService(null)}
                className="flex-1 py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-700 transition-colors"
              >
                Close
              </button>
              <button className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-500/10 active:scale-95 transition-all">
                Request Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BenefitItem: React.FC<{ icon: string; text: string }> = ({
  icon,
  text,
}) => (
  <div className="flex items-center gap-3 text-sm font-black text-slate-700 uppercase tracking-widest">
    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 text-xs">
      <i className={`fa-solid ${icon}`}></i>
    </div>
    {text}
  </div>
);

const StatBlock: React.FC<{ val: string; label: string }> = ({
  val,
  label,
}) => (
  <div>
    <p className="text-4xl font-black text-slate-900 mb-1">{val}</p>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
      {label}
    </p>
  </div>
);

const PlanCard: React.FC<{
  icon: string;
  title: string;
  desc: string;
  color: string;
  featured?: boolean;
}> = ({ icon, title, desc, color, featured }) => (
  <div
    className={`folded-card p-10 h-full flex flex-col group border transition-all ${featured ? "border-emerald-100 shadow-2xl scale-105 z-10" : "border-slate-100 shadow-sm hover:border-emerald-100"}`}
  >
    <div
      className={`w-16 h-16 rounded-2xl bg-${color}-50 text-${color}-600 flex items-center justify-center text-3xl mb-10 group-hover:scale-110 transition-transform duration-500 shadow-sm`}
    >
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight uppercase">
      {title}
    </h3>
    <p className="text-slate-500 font-medium mb-12 flex-grow leading-relaxed">
      {desc}
    </p>
    <button
      className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${featured ? "bg-emerald-600 text-white shadow-xl shadow-emerald-500/20" : "bg-white border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"}`}
    >
      Select Plan
    </button>
  </div>
);

const QuoteCard: React.FC<{ name: string; role: string; quote: string }> = ({
  name,
  role,
  quote,
}) => (
  <div className="bg-slate-50 p-10 rounded-2xl relative text-left group hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-slate-100">
    <div className="text-emerald-200 absolute top-6 right-10 text-6xl font-serif italic group-hover:text-emerald-100 transition-colors">
      "
    </div>
    <p className="text-slate-600 text-lg font-medium leading-relaxed italic mb-10 relative z-10">
      "{quote}"
    </p>
    <div className="flex items-center gap-5">
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-black text-emerald-600 shadow-sm border border-slate-100 uppercase">
        {name[0]}
      </div>
      <div className="text-left">
        <p className="font-black text-slate-900 leading-tight">{name}</p>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
          {role}
        </p>
      </div>
    </div>
  </div>
);

export default InstitutionZone;

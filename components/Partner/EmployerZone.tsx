import React, { useState, useEffect } from "react";

interface ServiceDetail {
  title: string;
  icon: string;
  colorClass: string;
  description: string;
  features: string[];
}

const servicesContent: Record<string, ServiceDetail> = {
  featured: {
    title: "Featured & Urgent Jobs",
    icon: "fa-bolt",
    colorClass: "text-amber-600 bg-amber-100",
    description:
      "Maximize exposure for your time-sensitive roles. Featured listings are pinned to the top of search results and highlighted to stand out.",
    features: [
      "Top placement in search results for 7 days",
      "Highlighted with a distinctive 'Urgent' badge",
      "Included in daily job alert emails to candidates",
      "Up to 3x more views and applications",
    ],
  },
  ai: {
    title: "AI-Based Matching",
    icon: "fa-wand-magic-sparkles",
    colorClass: "text-violet-600 bg-violet-100",
    description:
      "Let our advanced algorithms do the heavy lifting. We analyze job descriptions and candidate profiles to predict the perfect match instantly.",
    features: [
      "Instant candidate scoring (0-100%)",
      "Skill gap analysis for every applicant",
      "Behavioral prediction insights",
      "Reduces screening time by 75%",
    ],
  },
  branding: {
    title: "Employer Branding",
    icon: "fa-bullhorn",
    colorClass: "text-rose-600 bg-rose-100",
    description:
      "Tell your company's story. A strong employer brand attracts passive candidates and improves offer acceptance rates.",
    features: [
      "Customized Company Profile Page",
      "Employee Testimonials & Video Integration",
      "Verified 'Great Place to Work' Badge",
      "Analytics on brand reach and engagement",
    ],
  },
  automation: {
    title: "Hiring Automation",
    icon: "fa-robot",
    colorClass: "text-cyan-600 bg-cyan-100",
    description:
      "Streamline your workflow with intelligent automation. Focus on interviewing while we handle the logistics.",
    features: [
      "Automated interview scheduling",
      "Personalized email drip campaigns",
      "Bulk rejection/shortlisting actions",
      "Pre-screening chatbots",
    ],
  },
  campus: {
    title: "Campus Recruitment",
    icon: "fa-graduation-cap",
    colorClass: "text-emerald-600 bg-emerald-100",
    description:
      "Access fresh talent from top universities across Nepal. Manage thousands of entry-level applications effortlessly.",
    features: [
      "Direct integration with university placement cells",
      "Online assessment tests for bulk filtering",
      "Virtual career fair booths",
      "Dedicated support for fresh graduate hiring",
    ],
  },
  database: {
    title: "Talent Access Database",
    icon: "fa-database",
    colorClass: "text-indigo-600 bg-indigo-100",
    description:
      "Don't wait for applications. Proactively search our database of over 500,000 verified professionals.",
    features: [
      "Advanced boolean search filters",
      "Download resumes in one click",
      "Direct messaging to candidates",
      "Alerts for new matching profiles",
    ],
  },
  analytics: {
    title: "Hiring Analytics",
    icon: "fa-chart-line",
    colorClass: "text-blue-600 bg-blue-100",
    description:
      "Make data-driven decisions. Track job performance, applicant demographics, and ROI with our detailed reporting dashboards.",
    features: [
      "Recruitment funnel visualization",
      "Time-to-hire & Cost-per-hire reports",
      "Source effectiveness tracking",
      "Team performance metrics",
    ],
  },
};

const EmployerZone: React.FC = () => {
  const [heroTab, setHeroTab] = useState<"login" | "talk">("login");
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
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 animate-fadeInUp">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              #1 Choice for Recruiters
            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight text-slate-900">
              Hire the top <br />
              <span className="text-primary-600">1% Talent</span> <br />
              Faster.
            </h1>

            <p className="text-lg md:text-xl text-slate-500 max-w-lg leading-relaxed font-medium">
              Navigate an ocean of profiles. From AI-driven talent search to
              employer branding, we provide the tools to position you as the
              employer of choice.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <BenefitItem icon="fa-circle-check" text="Verified Candidates" />
              <BenefitItem icon="fa-robot" text="AI Matching" />
              <BenefitItem icon="fa-headset" text="24/7 Support" />
            </div>
          </div>

          <div
            className="w-full max-w-md mx-auto lg:ml-auto animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
              <div className="flex p-2 bg-slate-50 border-b border-slate-100">
                <button
                  onClick={() => setHeroTab("login")}
                  className={`flex-1 py-4 text-center text-xs font-black uppercase tracking-widest transition-all rounded-xl ${heroTab === "login" ? "bg-white text-primary-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                >
                  Login
                </button>
                <button
                  onClick={() => setHeroTab("talk")}
                  className={`flex-1 py-4 text-center text-xs font-black uppercase tracking-widest transition-all rounded-xl ${heroTab === "talk" ? "bg-white text-primary-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                >
                  Talk to Us
                </button>
              </div>

              <div className="p-10">
                {heroTab === "login" ? (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-black text-slate-900">
                        Welcome Back
                      </h3>
                      <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">
                        Hiring simplified
                      </p>
                    </div>
                    <button className="w-full py-4 px-6 border border-slate-200 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 transition-all text-sm">
                      <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        className="w-5 h-5"
                        alt=""
                      />
                      Continue with Google
                    </button>
                    <div className="relative flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-300">
                      <div className="flex-1 h-px bg-slate-100"></div>
                      OR
                      <div className="flex-1 h-px bg-slate-100"></div>
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-primary-50 focus:border-primary-500 transition-all font-bold text-sm"
                    />
                    <button className="w-full py-4 bg-primary-600 text-white font-black rounded-xl shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all active:scale-95 text-xs uppercase tracking-widest">
                      Continue with Email
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-black text-slate-900">
                        Get a Custom Demo
                      </h3>
                      <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">
                        Tailored for your needs
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-sm outline-none focus:border-primary-500 transition-all"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-sm outline-none focus:border-primary-500 transition-all"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-sm outline-none focus:border-primary-500 transition-all"
                    />
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-sm outline-none focus:border-primary-500 transition-all"
                    />
                    <button className="w-full py-4 bg-slate-900 text-white font-black rounded-xl shadow-xl hover:bg-black transition-all active:scale-95 text-xs uppercase tracking-widest mt-4">
                      Request Callback
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Logos */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-12">
            Trusted by 50K+ Recruiters Worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            <i className="fa-brands fa-google text-4xl"></i>
            <i className="fa-brands fa-amazon text-4xl"></i>
            <i className="fa-brands fa-netflix text-4xl"></i>
            <i className="fa-brands fa-ibm text-4xl"></i>
            <i className="fa-brands fa-microsoft text-4xl"></i>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">
              Hire Smarter, Not Harder
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Quick and easy plans on Nepal's leading job site tailored to your
              hiring volume.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <PlanCard
              icon="fa-file-lines"
              title="Job Posting"
              desc="Choose the job posting plan according to your needs."
              color="blue"
            />
            <PlanCard
              icon="fa-layer-group"
              title="Comprehensive"
              desc="Get access to job posting, candidate database and outreach as complete package."
              color="indigo"
              featured
            />
            <PlanCard
              icon="fa-sliders"
              title="Custom Plan"
              desc="Tailor your hiring needs with flexible plan that works for you."
              color="slate"
            />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
              Our Services
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg">
              Comprehensive tools and solutions to help you build your dream
              team effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(servicesContent).map(([id, service]) => (
              <div
                key={id}
                onClick={() => setSelectedService(service)}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-200 flex flex-col group cursor-pointer"
              >
                <div
                  className={`w-12 h-12 ${service.colorClass} rounded-lg flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform`}
                >
                  <i className={`fa-solid ${service.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow font-medium">
                  {service.description}
                </p>
                <button className="text-primary-600 font-bold text-sm flex items-center gap-2 group/btn">
                  Learn More{" "}
                  <i className="fa-solid fa-arrow-right transition-transform group-hover/btn:translate-x-1"></i>
                </button>
              </div>
            ))}

            {/* Need Help? Card */}
            <div className="bg-slate-900 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col text-white">
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-white mb-6">
                <i className="fa-solid fa-circle-question text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Need Custom Solutions?
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow font-medium">
                Have unique hiring needs? Our support team is here to assist you
                with tailored packages and integrations.
              </p>
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setHeroTab("talk");
                }}
                className="text-white font-bold text-sm flex items-center gap-2 group/btn"
              >
                Contact Support{" "}
                <i className="fa-solid fa-arrow-right transition-transform group-hover/btn:translate-x-1"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <div className="mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
              What Recruiters Say
            </h2>
            <p className="text-slate-500 font-medium text-lg">
              Don't just take our word for it.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <QuoteCard
              name="Aarav Sharma"
              role="HR Manager, TechNepal"
              quote="RecruitPro has significantly reduced our hiring time. The candidate quality is top-notch."
            />
            <QuoteCard
              name="Manisha Koirala"
              role="Recruiter, Global Solutions"
              quote="The comprehensive plan is a game changer. We filled 5 senior positions in just 2 weeks."
            />
            <QuoteCard
              name="Rohan Pradhan"
              role="Director, Future Minds"
              quote="Customer support is excellent. They helped us tailor a custom plan for our campus drive."
            />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 font-medium text-lg">
              Got questions? We have answers.
            </p>
          </div>
          <div className="space-y-4">
            <FAQItem
              q="How long do job postings stay active?"
              a="Standard job postings remain active for 30 days. You can renew or extend the duration at any time from your dashboard."
            />
            <FAQItem
              q="Can I access the candidate database with a basic plan?"
              a="Database access is included in our Comprehensive and Custom plans. The basic Job Posting plan covers listing your vacancy but does not include direct database search."
            />
            <FAQItem
              q="What payment methods do you accept?"
              a="We accept all major credit/debit cards, bank transfers, and popular digital wallets used in Nepal (eSewa, Khalti)."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-50 rounded-2xl p-10 md:p-16 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                Ready to hire your next star?
              </h3>
              <p className="text-slate-500 font-medium">
                Join a growing community of recruiters who are hiring better.
              </p>
            </div>
            <div className="shrink-0">
              <button className="bg-primary-600 text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all active:scale-95">
                Request a Demo
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
          <div className="relative w-full max-w-lg bg-white rounded-[3rem] overflow-hidden shadow-2xl animate-scaleIn">
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
                <h3 className="text-2xl font-black text-slate-900 leading-tight">
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
                  Key Features
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
              <button className="flex-1 bg-primary-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary-500/10 active:scale-95 transition-all">
                Get Started
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
    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-primary-600 text-xs">
      <i className={`fa-solid ${icon}`}></i>
    </div>
    {text}
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
    className={`folded-card p-10 h-full flex flex-col group border transition-all ${featured ? "border-primary-100 shadow-2xl scale-105 z-10" : "border-slate-100 shadow-sm hover:border-primary-100"}`}
  >
    <div
      className={`w-16 h-16 rounded-2xl bg-${color}-50 text-${color}-600 flex items-center justify-center text-3xl mb-10 group-hover:scale-110 transition-transform duration-500 shadow-sm`}
    >
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
      {title} Plan
    </h3>
    <p className="text-slate-500 font-medium mb-12 flex-grow leading-relaxed">
      {desc}
    </p>
    <button
      className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${featured ? "bg-primary-600 text-white shadow-xl shadow-primary-500/20" : "bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white"}`}
    >
      View Details
    </button>
  </div>
);

const QuoteCard: React.FC<{ name: string; role: string; quote: string }> = ({
  name,
  role,
  quote,
}) => (
  <div className="bg-slate-50 p-10 rounded-2xl relative text-left group hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-slate-100">
    <div className="text-blue-200 absolute top-6 right-10 text-6xl font-serif italic group-hover:text-primary-100 transition-colors">
      "
    </div>
    <p className="text-slate-600 text-lg font-medium leading-relaxed italic mb-10 relative z-10">
      "{quote}"
    </p>
    <div className="flex items-center gap-5">
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-black text-primary-600 shadow-sm border border-slate-100 uppercase">
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

const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => (
  <details className="bg-white rounded-[2rem] shadow-sm border border-slate-100 group overflow-hidden">
    <summary className="flex items-center justify-between p-8 cursor-pointer font-black text-slate-900 uppercase tracking-widest text-xs list-none">
      {q}
      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-open:rotate-180 transition-all">
        <i className="fa-solid fa-chevron-down text-[10px]"></i>
      </div>
    </summary>
    <div className="px-8 pb-8 text-slate-500 font-medium text-sm leading-relaxed border-t border-slate-50 pt-6">
      {a}
    </div>
  </details>
);

export default EmployerZone;

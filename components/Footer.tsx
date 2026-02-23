import React from "react";

interface FooterProps {
  onNavigate?: (view: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-white relative pt-10 pb-20 overflow-hidden font-jakarta">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="w-full px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <img
                src="/logo-white.png"
                alt="StudSphere"
                className="h-24 w-auto"
              />
            </div>
            <div className="space-y-4 text-slate-400 text-xs font-bold uppercase tracking-widest mb-10 leading-relaxed">
              <p className="flex items-start gap-3">
                <i className="fa-solid fa-phone mt-1 text-blue-400"></i> +977
                01-4433221
              </p>
              <p className="flex items-start gap-3">
                <i className="fa-solid fa-envelope mt-1 text-blue-400"></i>{" "}
                hello@studsphere.com
              </p>
              <p className="flex items-start gap-3">
                <i className="fa-solid fa-location-dot mt-1 text-blue-400"></i>{" "}
                New Baneshwor, Kathmandu, NP
              </p>
            </div>
            <div className="flex gap-4">
              {["facebook-f", "instagram", "linkedin-in", "twitter"].map(
                (social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 transition-all group shadow-sm"
                  >
                    <i
                      className={`fa-brands fa-${social} text-slate-400 group-hover:text-white`}
                    ></i>
                  </a>
                ),
              )}
            </div>
          </div>

          {/* Info Column */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-[0.2em] mb-8 text-white">
              Company
            </h4>
            <ul className="space-y-4 text-[10px] text-slate-400 font-black uppercase tracking-widest">
              <li>
                <button
                  onClick={() => onNavigate?.("about")}
                  className="hover:text-blue-400 transition-colors text-left w-full"
                >
                  About Us
                </button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors text-left w-full">
                  Career Opportunities
                </button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors text-left w-full">
                  Our Team
                </button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors text-left w-full">
                  Partners
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.("newsPage")}
                  className="hover:text-blue-400 transition-colors text-left w-full"
                >
                  Latest News
                </button>
              </li>
            </ul>
          </div>

          {/* For Students Column */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-[0.2em] mb-8 text-white">
              For Students
            </h4>
            <ul className="space-y-4 text-[10px] text-slate-400 font-black uppercase tracking-widest">
              <li>
                <button
                  onClick={() => onNavigate?.("findCollege")}
                  className="hover:text-blue-400 transition-colors text-left w-full"
                >
                  College Finder
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.("scholarshipFinder")}
                  className="hover:text-blue-400 transition-colors text-left w-full"
                >
                  Scholarship Finder
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.("eventsPage")}
                  className="hover:text-blue-400 transition-colors text-left w-full"
                >
                  Upcoming Events
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.("studyResources")}
                  className="hover:text-blue-400 transition-colors text-left w-full"
                >
                  Study Resources
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.("blogPage")}
                  className="hover:text-blue-400 transition-colors text-left w-full"
                >
                  Success Stories
                </button>
              </li>
            </ul>
          </div>

          {/* For Employers Column */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-[0.2em] mb-8 text-white">
              For Employers
            </h4>
            <ul className="space-y-4 text-[10px] text-slate-400 font-black uppercase tracking-widest">
              <li>
                <button
                  onClick={() => onNavigate?.("employerZone")}
                  className="hover:text-blue-400 transition-colors text-left w-full"
                >
                  Employer Portal
                </button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors text-left w-full">
                  Talent Solutions
                </button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors text-left w-full">
                  Job Posting
                </button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors text-left w-full">
                  Pricing Plans
                </button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors text-left w-full">
                  Case Studies
                </button>
              </li>
            </ul>
          </div>

          {/* For Institutions Column */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-[0.2em] mb-8 text-white">
              For Institutions
            </h4>
            <ul className="space-y-4 text-[10px] text-slate-400 font-black uppercase tracking-widest mb-12">
              <li>
                <button
                  onClick={() => onNavigate?.("partner")}
                  className="hover:text-blue-400 transition-colors text-left w-full"
                >
                  Partner With Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.("institutionZone")}
                  className="hover:text-blue-400 transition-colors text-left w-full"
                >
                  Institute Login
                </button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors text-left w-full">
                  Admission Management
                </button>
              </li>
            </ul>

            <button
              onClick={() => onNavigate?.("signup")}
              className="w-full px-6 py-4 bg-primary-600 hover:bg-primary-500 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-primary-500/20 active:scale-95"
            >
              Join StudSphere
            </button>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mb-20 p-8 md:p-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-xl text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase tracking-tighter">
                Stay Ahead of the Curve
              </h3>
              <p className="text-blue-100 text-sm font-bold uppercase tracking-widest leading-relaxed">
                Join 50,000+ students and professionals receiving weekly career
                insights and exclusive opportunities.
              </p>
            </div>
            <form className="w-full lg:max-w-md flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL ADDRESS"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-blue-200 outline-none focus:bg-white/20 transition-all font-black text-[10px] uppercase tracking-widest"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-blue-600 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-blue-50 transition-all shadow-xl active:scale-95 whitespace-nowrap"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] text-slate-500 font-black uppercase tracking-[0.3em]">
          <p>&copy; 2025 StudSphere Education. Built for the future.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

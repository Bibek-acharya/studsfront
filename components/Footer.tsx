import React from "react";

interface FooterProps {
  onNavigate?: (view: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = React.useState("");
  const [showSubscribed, setShowSubscribed] = React.useState(false);

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setShowSubscribed(true);
    setEmail("");
    window.setTimeout(() => setShowSubscribed(false), 3000);
  };

  const routeLink = (
    event: React.MouseEvent<HTMLButtonElement>,
    view: string,
  ) => {
    event.preventDefault();
    onNavigate?.(view);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 relative overflow-hidden border-t border-slate-800">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-indigo-500/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4 flex flex-col lg:pr-8">
            <button
              onClick={(event) => routeLink(event, "educationPage")}
              className="flex items-center space-x-3 mb-6 w-fit"
            >
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/25">
                <i className="fa-solid fa-graduation-cap w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">StudSphere</span>
            </button>

            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Empowering learners globally with advanced tools, community support, and career-defining opportunities. Join our growing ecosystem today.
            </p>

            <div className="mb-8 w-full max-w-sm">
              <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">
                Stay Updated
              </h4>
              <form onSubmit={handleNewsletterSubmit} className="relative flex items-center">
                <i className="fa-solid fa-envelope w-4 h-4 text-slate-500 absolute left-4 pointer-events-none" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 text-sm text-white px-10 py-3 rounded-full focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-full transition-colors"
                >
                  <span className="text-xs font-semibold">Subscribe</span>
                </button>
              </form>
              <p className={`text-xs text-emerald-400 mt-2 transition-opacity ${showSubscribed ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}>
                Thanks for subscribing!
              </p>
            </div>

            <div className="flex space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all hover:-translate-y-1">
                <i className="fa-brands fa-facebook-f" />
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition-all hover:-translate-y-1">
                <i className="fa-brands fa-x-twitter" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all hover:-translate-y-1">
                <i className="fa-brands fa-linkedin-in" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all hover:-translate-y-1">
                <i className="fa-brands fa-instagram" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-white mb-6">Company</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><button onClick={(event) => routeLink(event, "about")} className="hover:text-blue-400 transition-colors text-left">About Us</button></li>
              <li><button onClick={(event) => routeLink(event, "about")} className="hover:text-blue-400 transition-colors text-left">Our Team</button></li>
              <li><button onClick={(event) => routeLink(event, "about")} className="hover:text-blue-400 transition-colors text-left">Careers</button></li>
              <li><button onClick={(event) => routeLink(event, "contact")} className="hover:text-blue-400 transition-colors text-left">Contact Us</button></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-white mb-6">Students</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><button onClick={(event) => routeLink(event, "courseFinder")} className="hover:text-blue-400 transition-colors text-left">All Courses</button></li>
              <li><button onClick={(event) => routeLink(event, "scholarshipMain")} className="hover:text-blue-400 transition-colors text-left">Scholarships</button></li>
              <li><button onClick={(event) => routeLink(event, "bookCounselling")} className="hover:text-blue-400 transition-colors text-left">Career Counseling</button></li>
              <li><button onClick={(event) => routeLink(event, "campusForum")} className="hover:text-blue-400 transition-colors text-left">Community Hub</button></li>
              <li><button onClick={(event) => routeLink(event, "studyResources")} className="hover:text-blue-400 transition-colors text-left">Study Materials</button></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-white mb-6">For Institutions</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><button onClick={(event) => routeLink(event, "institutionZone")} className="hover:text-blue-400 transition-colors text-left">Institution Login</button></li>
              <li><button onClick={(event) => routeLink(event, "institutionZone")} className="hover:text-blue-400 transition-colors text-left">Dashboard</button></li>
              <li><button onClick={(event) => routeLink(event, "institutionZone")} className="hover:text-blue-400 transition-colors text-left">Pricing</button></li>
              <li><button onClick={(event) => routeLink(event, "signup")} className="hover:text-blue-400 transition-colors text-left">Become a Member</button></li>
              <li><button onClick={(event) => routeLink(event, "contact")} className="hover:text-blue-400 transition-colors text-left">Advertise With Us</button></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-white mb-6">Legal &amp; Help</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><button onClick={(event) => routeLink(event, "educationPage")} className="hover:text-blue-400 transition-colors text-left">FAQs</button></li>
              <li><button onClick={(event) => routeLink(event, "about")} className="hover:text-blue-400 transition-colors text-left">Terms of Use</button></li>
              <li><button onClick={(event) => routeLink(event, "about")} className="hover:text-blue-400 transition-colors text-left">Privacy Policy</button></li>
              <li><button onClick={(event) => routeLink(event, "contact")} className="hover:text-blue-400 transition-colors text-left">Advertising Policy</button></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-slate-950 border-t border-slate-800 relative z-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <i className="fa-solid fa-shield-halved w-4 h-4 text-emerald-500" />
              <span>Secure Platform</span>
            </div>
            <span className="hidden sm:inline-block text-slate-700">|</span>
            <p className="text-slate-500 text-sm">
              &copy; {currentYear} StudSphere Global Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

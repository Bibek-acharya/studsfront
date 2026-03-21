import React, { useEffect, useMemo, useRef, useState } from "react";
import { apiService } from "../../services/api";

interface InstitutionZoneProps {
  onNavigate?: (view: any, data?: any) => void;
}

type BillingCycle = "monthly" | "semiAnnually" | "annually";
type HeroTab = "advertise" | "login";
type AuthSubTab = "login" | "register";

interface ServiceCard {
  title: string;
  description: string;
  icon: string;
  blobClass: string;
  iconClass: string;
}

interface Tier {
  name: string;
  description: string;
  price: Record<BillingCycle, string>;
  period: Record<BillingCycle, string>;
  buttonText: string;
  highlighted: boolean;
  badge?: string;
  cardFeatures: string[];
}

interface CategoryFeature {
  name: string;
  free: string | boolean;
  standard: string | boolean;
  premium: string | boolean;
}

interface FeatureCategory {
  name: string;
  features: CategoryFeature[];
}

const services: ServiceCard[] = [
  {
    title: "Application Tracking",
    description: "Streamline and monitor student applications.",
    icon: "fa-list-check",
    blobClass: "bg-[#eef2ff]",
    iconClass: "text-blue-800",
  },
  {
    title: "Query Management",
    description: "Efficiently handle student inquiries.",
    icon: "fa-clipboard-question",
    blobClass: "bg-[#fff7ed]",
    iconClass: "text-orange-400",
  },
  {
    title: "Profile & Listing Control",
    description: "Showcase key information.",
    icon: "fa-building-columns",
    blobClass: "bg-[#f3e8ff]",
    iconClass: "text-purple-600",
  },
  {
    title: "Featured Promotions",
    description: "Highlight your best programs.",
    icon: "fa-bullhorn",
    blobClass: "bg-[#ecfdf5]",
    iconClass: "text-emerald-400",
  },
  {
    title: "Student Lead Generation",
    description: "Attract high-quality leads.",
    icon: "fa-user-plus",
    blobClass: "bg-[#fef2f2]",
    iconClass: "text-red-500",
  },
  {
    title: "Admission Campaigns",
    description: "Launch targeted campaigns.",
    icon: "fa-rocket",
    blobClass: "bg-[#f7fee7]",
    iconClass: "text-lime-500",
  },
  {
    title: "Virtual Admission Fair",
    description: "Connect globally.",
    icon: "fa-globe",
    blobClass: "bg-[#eef2ff]",
    iconClass: "text-blue-500",
  },
  {
    title: "Analytics Dashboard",
    description: "Insights into profile views.",
    icon: "fa-chart-line",
    blobClass: "bg-[#fff7ed]",
    iconClass: "text-orange-500",
  },
  {
    title: "Reviews & Ratings",
    description: "Authentic feedback.",
    icon: "fa-star-half-stroke",
    blobClass: "bg-[#f3e8ff]",
    iconClass: "text-purple-500",
  },
  {
    title: "Direct Chat",
    description: "Engage in real time.",
    icon: "fa-comments",
    blobClass: "bg-[#ecfdf5]",
    iconClass: "text-emerald-500",
  },
  {
    title: "Content Marketing",
    description: "Publish news and updates.",
    icon: "fa-newspaper",
    blobClass: "bg-[#fef2f2]",
    iconClass: "text-red-500",
  },
];

const tiers: Tier[] = [
  {
    name: "Free Listing",
    description: "Basic directory presence for visibility.",
    price: { monthly: "Free", semiAnnually: "Free", annually: "Free" },
    period: { monthly: "/month", semiAnnually: "/6 months", annually: "/year" },
    buttonText: "Claim Free Listing",
    highlighted: false,
    cardFeatures: [
      "Basic profile presence",
      "Standard search visibility",
      "Basic directory listing",
      "Email customer support",
    ],
  },
  {
    name: "Standard Membership",
    description: "Perfect for growing colleges needing branding.",
    price: {
      monthly: "NPR 5,000",
      semiAnnually: "NPR 25,000",
      annually: "NPR 45,000",
    },
    period: { monthly: "/month", semiAnnually: "/6 months", annually: "/year" },
    buttonText: "Get Standard",
    highlighted: true,
    badge: "Most Popular",
    cardFeatures: [
      "Full profile control",
      "1 Cover Banner & Video",
      "Courses & fees listing",
      "Standard lead collection",
      "Priority customer support",
    ],
  },
  {
    name: "Premium Membership",
    description: "Comprehensive solution for maximum leads.",
    price: {
      monthly: "NPR 10,000",
      semiAnnually: "NPR 50,000",
      annually: "NPR 90,000",
    },
    period: { monthly: "/month", semiAnnually: "/6 months", annually: "/year" },
    buttonText: "Get Premium",
    highlighted: false,
    cardFeatures: [
      "Top priority placement",
      "Up to 3 Cover Images & Videos",
      "Advanced lead dashboard",
      "Unlimited content publishing",
      "Dedicated account manager",
    ],
  },
];

const categories: FeatureCategory[] = [
  {
    name: "Homepage & Platform Visibility",
    features: [
      { name: "Home Page: Featured College", free: false, standard: false, premium: "Featured with website link" },
      { name: "Home Page: Course-Based Logo", free: false, standard: false, premium: "Displayed in relevant searches" },
      { name: "Profile Visibility & Search", free: "Listed at the bottom", standard: "Normal visibility", premium: "Top priority placement" },
      { name: "Website Link (SEO)", free: false, standard: "Shown (No-follow)", premium: "Do-follow SEO link" },
    ],
  },
  {
    name: "College Profile & Control",
    features: [
      { name: "Profile Control", free: "Basic info only", standard: "Full profile control", premium: "Priority updates & managed profile" },
      { name: "College Profile Page", free: "Basic (logo, name, location)", standard: "Full detailed profile page", premium: "Featured detailed profile with Verified Badge" },
      { name: "Cover Images & Banners", free: false, standard: "1 Cover Banner", premium: "Up to 3 Cover Images / Banners" },
      { name: "College Videos", free: false, standard: "1 video (Chairman or Campus)", premium: "2 videos (Chairman & Campus Tour)" },
      { name: "Brochure Download", free: false, standard: true, premium: true },
      { name: "Courses & Fees Listing", free: "Limited courses", standard: "Full courses listing", premium: "Featured courses" },
      { name: "Facilities Section", free: false, standard: true, premium: "Highlighted facilities" },
    ],
  },
  {
    name: "Admissions & Lead Generation",
    features: [
      { name: "Application Tracking", free: false, standard: "Basic application tracking", premium: "Advanced application management" },
      { name: "Programs & Admission Status", free: "Limited programs", standard: "Full listing + Admission Status", premium: "Priority display + Highlighted Status" },
      { name: "Admission Notice Posting", free: false, standard: "Can publish notices", premium: "Notices + 'Apply Now' lead collection" },
      { name: "Admission Page: Detailed Cards", free: false, standard: "Basic text listing", premium: "Featured Admission Card with College Photo" },
      { name: "Direct Admission Form", free: false, standard: "Basic admission form", premium: "Advanced admission lead dashboard" },
      { name: "Entrance Exam Posting", free: false, standard: "Can post entrance exams", premium: "Priority entrance exam promotion" },
      { name: "Scholarship Listing", free: false, standard: "Scholarship listing", premium: "Featured scholarship promotion" },
    ],
  },
  {
    name: "Content & Media Publishing",
    features: [
      { name: "News Page: Hero Section", free: false, standard: false, premium: "News featured in Hero Section" },
      { name: "News & Notices Publishing", free: false, standard: "Limited publishing", premium: "Unlimited publishing" },
      { name: "Events Page: Hero Section", free: false, standard: false, premium: "Event featured in Hero Section" },
      { name: "Events & Activities Page", free: false, standard: "Limited event posts", premium: "Unlimited events & activities" },
      { name: "Gallery & Alumni Section", free: false, standard: true, premium: "Featured alumni profiles" },
      { name: "Student Reviews", free: "Basic reviews", standard: "Full reviews", premium: "Featured reviews" },
    ],
  },
  {
    name: "Dashboards, Insights & Support",
    features: [
      { name: "User Insights", free: false, standard: "Basic page views", premium: "Advanced engagement & interest tracking" },
      { name: "Query Management", free: false, standard: "Limited student queries", premium: "Full QMS dashboard & unlimited replies" },
      { name: "Online Counselling Booking", free: false, standard: true, premium: "Priority booking with lead tracking" },
      { name: "Analytics Dashboard", free: false, standard: "Basic analytics", premium: "Advanced analytics & insights" },
      { name: "Customer Support", free: "Email support", standard: "Priority support", premium: "Dedicated account manager" },
    ],
  },
];

const checkIconPurple = (
  <div className="flex justify-center">
    <div className="bg-[#f0edff] rounded-full p-1 shadow-sm">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#5f61eb]">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </div>
  </div>
);

const checkIconWhite = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-white">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const crossIconGrey = (
  <div className="flex justify-center">
    <div className="rounded-full p-1">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-300">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </div>
  </div>
);

const InstitutionZone: React.FC<InstitutionZoneProps> = ({ onNavigate }) => {
  const [heroTab, setHeroTab] = useState<HeroTab>("login");
  const [authSubTab, setAuthSubTab] = useState<AuthSubTab>("login");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("annually");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showPricingOverlay, setShowPricingOverlay] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterConfirmPassword, setShowRegisterConfirmPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerInstitutionName, setRegisterInstitutionName] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  const contactDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const closeOnOutside = (event: MouseEvent) => {
      if (!contactDropdownRef.current) {
        return;
      }
      if (!contactDropdownRef.current.contains(event.target as Node)) {
        setIsContactOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutside);
    return () => document.removeEventListener("mousedown", closeOnOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showPricingOverlay || Boolean(selectedPlan) ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showPricingOverlay, selectedPlan]);

  const processedTiers = useMemo(
    () =>
      tiers.map((tier) => {
        const price = tier.price[billingCycle];
        const period = tier.period[billingCycle];
        const priceSize = price === "Free" ? "text-5xl" : price.length > 8 ? "text-3xl" : "text-[32px]";
        return { ...tier, price, period, priceSize };
      }),
    [billingCycle],
  );

  const handleHeroTab = (tab: HeroTab) => {
    setHeroTab(tab);
    if (tab === "advertise") {
      setAuthSubTab("login");
    }
  };

  const handlePricingOverlayClose = () => {
    setShowPricingOverlay(false);
  };

  const clearAuthMessages = () => {
    setAuthError(null);
    setAuthSuccess(null);
  };

  const handleInstitutionLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearAuthMessages();

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setAuthError("Email and password are required.");
      return;
    }

    setAuthLoading(true);
    try {
      const response = await apiService.institutionLogin({
        email: loginEmail.trim(),
        password: loginPassword,
      });

      const token = response.data?.token;
      const user = response.data?.user;

      if (!token || !user) {
        throw new Error("Invalid login response from server");
      }

      apiService.setInstitutionToken(token);
      apiService.setInstitutionUser(user);
      setAuthSuccess("Login successful. Your institution account is now connected.");
      setLoginPassword("");
      onNavigate?.("institutionDashboard");
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Login failed. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleInstitutionRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearAuthMessages();

    if (
      !registerInstitutionName.trim() ||
      !registerNumber.trim() ||
      !registerEmail.trim() ||
      !registerPassword.trim() ||
      !registerConfirmPassword.trim()
    ) {
      setAuthError("Please fill all required fields.");
      return;
    }

    if (registerPassword.length < 6) {
      setAuthError("Password must be at least 6 characters.");
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      setAuthError("Passwords do not match.");
      return;
    }

    setAuthLoading(true);
    try {
      const response = await apiService.institutionRegister({
        institution_name: registerInstitutionName.trim(),
        registration_number: registerNumber.trim(),
        email: registerEmail.trim(),
        password: registerPassword,
      });

      const token = response.data?.token;
      const user = response.data?.user;

      if (!token || !user) {
        throw new Error("Invalid registration response from server");
      }

      apiService.setInstitutionToken(token);
      apiService.setInstitutionUser(user);
      setAuthSuccess("Registration successful. Your institution account is now connected.");
      setRegisterPassword("");
      setRegisterConfirmPassword("");
      setAuthSubTab("login");
      setLoginEmail(user.email);
      onNavigate?.("institutionDashboard");
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Registration failed. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="text-gray-800 antialiased overflow-x-hidden bg-[#fcfcfc] min-h-screen font-sans">
      <style>{`
        input[type="password"] { letter-spacing: 0.2em; }
        input[type="password"]::placeholder { letter-spacing: normal; font-size: 15px; font-weight: 500; }
      `}</style>

      <div className="bg-[#2D68FE] min-h-screen flex flex-col selection:bg-white selection:text-[#2D68FE]">
        <header className="w-full max-w-7xl mx-auto px-6 py-6 lg:py-8 flex items-center justify-between text-white relative">
          <div className="lg:flex-1 text-2xl font-bold tracking-tight">StudSphere</div>

          <nav className="hidden lg:flex lg:flex-1 justify-center items-center gap-8 text-[15px] font-medium relative">
            <button type="button" className="hover:text-white/80 transition-colors">Services</button>
            <button
              type="button"
              onClick={() => setShowPricingOverlay(true)}
              className="hover:text-white/80 transition-colors"
            >
              Pricing
            </button>

            <div className="relative" ref={contactDropdownRef}>
              <button
                type="button"
                onClick={() => setIsContactOpen((prev) => !prev)}
                className="hover:text-white/80 transition-colors focus:outline-none flex items-center gap-1"
              >
                Contact us
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isContactOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-[2.2rem] z-50 w-[480px] opacity-100 scale-100 transition-all duration-200">
                  <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 rounded-tl-[3px] border-l border-t border-gray-100"></div>
                  <div className="relative bg-white rounded-[16px] p-2 border border-gray-100 shadow-xl">
                    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#f8f9fa] transition-colors group mb-1">
                      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200 shadow-sm">
                        <img src="https://i.pravatar.cc/150?img=47" alt="Sarah Jenkins" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col flex-grow pt-0.5">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-[16px] font-semibold text-[#202124]">Sarah Jenkins</h3>
                            <p className="text-[13px] text-[#4285F4] font-medium mt-1">Senior Recruitment Lead</p>
                          </div>
                          <a href="#" className="w-9 h-9 rounded-full bg-[#f0fdf4] text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors border border-green-100">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.183-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.765-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.369.846.144.072.228.058.315-.043.087-.101.376-.433.477-.582.101-.144.202-.12.356-.063.153.057.964.453 1.126.535.162.083.27.125.309.194.039.069.039.403-.105.808z" /></svg>
                          </a>
                        </div>
                        <div className="space-y-1.5">
                          <a href="mailto:sarah.jenkins@company.com" className="flex items-center gap-2 text-[13px] text-[#5f6368] hover:text-[#4285F4]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                            <span>sarah.jenkins@company.com</span>
                          </a>
                          <a href="tel:+15551234567" className="flex items-center gap-2 text-[13px] text-[#5f6368] hover:text-[#4285F4]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.733.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                            <span>+1 (555) 123-4567</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="h-[1px] bg-gray-100 mx-3 my-1"></div>

                    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#f8f9fa] transition-colors group mt-1">
                      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200 shadow-sm">
                        <img src="https://i.pravatar.cc/150?img=11" alt="Michael Chen" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col flex-grow pt-0.5">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-[16px] font-semibold text-[#202124]">Michael Chen</h3>
                            <p className="text-[13px] text-[#4285F4] font-medium mt-1">Technical HR Specialist</p>
                          </div>
                          <a href="#" className="w-9 h-9 rounded-full bg-[#f0fdf4] text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors border border-green-100">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.183-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.765-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.369.846.144.072.228.058.315-.043.087-.101.376-.433.477-.582.101-.144.202-.12.356-.063.153.057.964.453 1.126.535.162.083.27.125.309.194.039.069.039.403-.105.808z" /></svg>
                          </a>
                        </div>
                        <div className="space-y-1.5">
                          <a href="mailto:michael.chen@company.com" className="flex items-center gap-2 text-[13px] text-[#5f6368] hover:text-[#4285F4]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                            <span>michael.chen@company.com</span>
                          </a>
                          <a href="tel:+15559876543" className="flex items-center gap-2 text-[13px] text-[#5f6368] hover:text-[#4285F4]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.733.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                            <span>+1 (555) 987-6543</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="lg:flex-1 flex justify-end">
            {/* <button
              type="button"
              onClick={() => onNavigate?.("signup")}
              className="hidden lg:block bg-white text-[#2D68FE] px-5 py-2.5 rounded-full font-bold hover:bg-blue-50 transition-colors"
            >
              Become a Member
            </button>
            <button type="button" className="lg:hidden text-white hover:text-white/80">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            </button> */}
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center w-full pb-12 lg:pb-20 pt-4">
          <div className="max-w-7xl w-full mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
            <div className="flex-1 text-white w-full max-w-2xl text-center lg:text-left pt-6 lg:pt-0">
              <h1 className="text-4xl lg:text-[3.5rem] font-bold leading-[1.15] mb-6">Join StudSphere – Connect Your Institution with Students</h1>
              <p className="text-white/90 text-lg lg:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0 font-light">Promote your programs, facilities, and opportunities to students across Nepal and beyond.</p>
            </div>

            <div className="w-full max-w-[460px]">
              <div className="bg-white rounded-[2rem] p-8 sm:p-10 relative shadow-2xl shadow-black/10 text-gray-800">
                <div className="flex p-1.5 bg-[#F1F3F5] rounded-full mb-8 relative">
                  <button
                    type="button"
                    onClick={() => handleHeroTab("advertise")}
                    className={`flex-1 py-2.5 text-[15px] rounded-full transition-all ${heroTab === "advertise" ? "font-bold text-gray-900 bg-white shadow-sm z-10" : "font-semibold text-gray-500 hover:text-gray-700"}`}
                  >
                    Advertise with us
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHeroTab("login")}
                    className={`flex-1 py-2.5 text-[15px] rounded-full transition-all ${heroTab === "login" ? "font-bold text-gray-900 bg-white shadow-sm z-10" : "font-semibold text-gray-500 hover:text-gray-700"}`}
                  >
                    Register/Log in
                  </button>
                </div>

                {heroTab === "advertise" ? (
                  <div className="fade-in">
                    <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
                      <input type="text" placeholder="Full name" className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:border-[#2D68FE] focus:ring-1 focus:ring-[#2D68FE] outline-none" />
                      <input type="tel" placeholder="Mobile number" className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:border-[#2D68FE] focus:ring-1 focus:ring-[#2D68FE] outline-none" />
                      <input type="email" placeholder="Work email" className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:border-[#2D68FE] focus:ring-1 focus:ring-[#2D68FE] outline-none" />
                      <div className="pt-1 pb-1">
                        <label className="block text-[13px] font-medium text-gray-600 uppercase mb-3">Advertise for</label>
                        <div className="flex gap-3">
                          <label className="flex-1 cursor-pointer">
                            <input type="radio" name="advertise_for" className="peer sr-only" defaultChecked />
                            <div className="text-center py-2.5 border border-gray-200 rounded-[2rem] text-gray-500 peer-checked:border-[#2D68FE] peer-checked:text-gray-800 transition-all">Your college</div>
                          </label>
                          <label className="flex-1 cursor-pointer">
                            <input type="radio" name="advertise_for" className="peer sr-only" />
                            <div className="text-center py-2.5 border border-gray-200 rounded-[2rem] text-gray-500 peer-checked:border-[#2D68FE] peer-checked:text-gray-800 transition-all">Your consultancy</div>
                          </label>
                        </div>
                      </div>
                      <button type="submit" className="w-full mt-4 bg-white border-2 border-[#2D68FE] text-[#2D68FE] font-semibold py-3.5 rounded-[1.25rem] hover:bg-blue-50 transition-colors">Request callback</button>
                    </form>
                  </div>
                ) : authSubTab === "login" ? (
                  <div className="fade-in">
                    <form onSubmit={handleInstitutionLogin}>
                      <div className="space-y-4">
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={loginEmail}
                          onChange={(event) => setLoginEmail(event.target.value)}
                          className="w-full px-4 py-3.5 bg-[#EEF2F6] border border-[#D5DCE8] rounded-xl focus:bg-white focus:border-[#2D68FE] focus:ring-2 focus:ring-[#2D68FE]/20 outline-none"
                        />
                        <div className="relative">
                          <input
                            type={showLoginPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={loginPassword}
                            onChange={(event) => setLoginPassword(event.target.value)}
                            className="w-full px-4 py-3.5 pr-12 bg-[#EEF2F6] border border-[#D5DCE8] rounded-xl focus:bg-white focus:border-[#2D68FE] outline-none"
                          />
                          <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowLoginPassword((prev) => !prev)}>
                            <i className={`fa-solid ${showLoginPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-end mt-3 mb-6">
                        <button type="button" className="text-[15px] text-[#2D68FE] font-semibold hover:text-blue-800">Forgot password?</button>
                      </div>
                      {authError ? <p className="mb-3 text-sm font-medium text-red-500">{authError}</p> : null}
                      {authSuccess ? <p className="mb-3 text-sm font-medium text-emerald-600">{authSuccess}</p> : null}
                      <button type="submit" disabled={authLoading} className="w-full bg-[#2D68FE] hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl">{authLoading ? "Logging in..." : "Log in"}</button>
                      <div className="flex items-center my-5"><div className="flex-grow border-t border-gray-200"></div><span className="px-4 text-xs text-gray-400 font-semibold">Or</span><div className="flex-grow border-t border-gray-200"></div></div>
                      <button type="button" className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:bg-gray-50 text-[15px] font-semibold text-gray-700 py-3.5 rounded-xl shadow-sm">Log in with Google</button>
                    </form>
                    <div className="mt-8 text-center text-[15px] text-gray-500 font-medium">Don't have a registered email? <button type="button" onClick={() => setAuthSubTab("register")} className="text-[#2D68FE] font-semibold hover:underline">Create account</button></div>
                  </div>
                ) : (
                  <div className="fade-in">
                    <form onSubmit={handleInstitutionRegister}>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="College name"
                          value={registerInstitutionName}
                          onChange={(event) => setRegisterInstitutionName(event.target.value)}
                          className="w-full px-4 py-3.5 bg-[#EEF2F6] border border-[#D5DCE8] rounded-xl focus:bg-white focus:border-[#2D68FE] outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Institution registration number"
                          value={registerNumber}
                          onChange={(event) => setRegisterNumber(event.target.value)}
                          className="w-full px-4 py-3.5 bg-[#EEF2F6] border border-[#D5DCE8] rounded-xl focus:bg-white"
                        />
                        <input
                          type="email"
                          placeholder="Work email"
                          value={registerEmail}
                          onChange={(event) => setRegisterEmail(event.target.value)}
                          className="w-full px-4 py-3.5 bg-[#EEF2F6] border border-[#D5DCE8] rounded-xl focus:bg-white"
                        />
                        <div className="relative">
                          <input
                            type={showRegisterPassword ? "text" : "password"}
                            placeholder="Create password"
                            value={registerPassword}
                            onChange={(event) => setRegisterPassword(event.target.value)}
                            className="w-full px-4 py-3.5 pr-12 bg-[#EEF2F6] border border-[#D5DCE8] rounded-xl focus:bg-white"
                          />
                          <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowRegisterPassword((prev) => !prev)}>
                            <i className={`fa-solid ${showRegisterPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                          </button>
                        </div>
                        <div className="relative">
                          <input
                            type={showRegisterConfirmPassword ? "text" : "password"}
                            placeholder="Re-enter password"
                            value={registerConfirmPassword}
                            onChange={(event) => setRegisterConfirmPassword(event.target.value)}
                            className="w-full px-4 py-3.5 pr-12 bg-[#EEF2F6] border border-[#D5DCE8] rounded-xl focus:bg-white"
                          />
                          <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowRegisterConfirmPassword((prev) => !prev)}>
                            <i className={`fa-solid ${showRegisterConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                          </button>
                        </div>
                      </div>
                      {authError ? <p className="mt-4 text-sm font-medium text-red-500">{authError}</p> : null}
                      {authSuccess ? <p className="mt-4 text-sm font-medium text-emerald-600">{authSuccess}</p> : null}
                      <button type="submit" disabled={authLoading} className="w-full mt-6 bg-[#2D68FE] hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl">{authLoading ? "Creating account..." : "Sign up"}</button>
                    </form>
                    <div className="mt-8 text-center text-[15px] text-gray-500 font-medium">Already have an account? <button type="button" onClick={() => setAuthSubTab("login")} className="text-[#2D68FE] font-semibold hover:underline">Log in</button></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Our Service Area</h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Discover our comprehensive suite of services designed to streamline admissions, elevate your institution's profile, and boost student engagement.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service) => (
            <div key={service.title} className="bg-white rounded-xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-[5px] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-300">
              <div className="relative w-16 h-16 mb-6">
                <div className={`absolute top-0 right-2 w-10 h-10 rounded-full ${service.blobClass}`}></div>
                <div className={`relative z-10 flex items-center justify-center w-full h-full text-3xl ${service.iconClass}`}>
                  <i className={`fa-solid ${service.icon}`}></i>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-3">{service.title}</h3>
              <p className="text-gray-500 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {showPricingOverlay && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto py-10 px-4"
          style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(4px)" }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              handlePricingOverlayClose();
            }
          }}
        >
          <div className="max-w-7xl mx-auto relative">
            <div className="pt-12 pb-4 text-center">
              <span className="inline-flex items-center gap-2 bg-[#f0edff] text-[#5f61eb] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
                Pricing Plan
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight max-w-2xl mx-auto leading-tight">Select a Plan That Powers Your Success</h1>
              <p className="mt-4 text-slate-500 font-medium text-[15px]">Unlimited leads and workflows, no credit card required.</p>

              <div className="flex justify-center mt-10 mb-2">
                <div className="bg-slate-100 p-1.5 rounded-xl inline-flex border border-slate-200">
                  <button type="button" onClick={() => setBillingCycle("monthly")} className={`w-28 sm:w-32 py-2.5 text-sm font-bold rounded-lg transition-all ${billingCycle === "monthly" ? "bg-white text-slate-900 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-900 bg-transparent"}`}>1 Month</button>
                  <button type="button" onClick={() => setBillingCycle("semiAnnually")} className={`w-28 sm:w-32 py-2.5 text-sm font-bold rounded-lg transition-all ${billingCycle === "semiAnnually" ? "bg-white text-slate-900 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-900 bg-transparent"}`}>6 Months</button>
                  <button type="button" onClick={() => setBillingCycle("annually")} className={`w-28 sm:w-32 py-2.5 text-sm font-bold rounded-lg transition-all ${billingCycle === "annually" ? "bg-white text-slate-900 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-900 bg-transparent"}`}>1 Year</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10 mt-8">
              {processedTiers.map((tier) => (
                <div key={tier.name} className={`bg-white rounded-[1.5rem] p-8 ${tier.highlighted ? "border-2 border-[#5f61eb] md:scale-105" : "border border-slate-100"} transition-all duration-300`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-slate-900">{tier.name}</h3>
                    {tier.badge ? <span className="bg-[#f0edff] text-[#5f61eb] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{tier.badge}</span> : null}
                  </div>
                  <div className="flex items-end gap-1 mb-2 h-12">
                    <span className={`font-extrabold text-slate-900 ${tier.priceSize} tracking-tight`}>{tier.price}</span>
                    {tier.price !== "Free" ? <span className="text-slate-500 font-medium mb-1.5">{tier.period}</span> : null}
                  </div>
                  <p className="text-sm text-slate-500 h-10 mt-3">{tier.description}</p>
                  <button
                    type="button"
                    onClick={() => setSelectedPlan(tier.name)}
                    className={`w-full py-3.5 mt-6 rounded-xl font-semibold transition-colors ${tier.highlighted ? "bg-[#5f61eb] text-white hover:bg-[#4b4dd6]" : "bg-[#f4f2ff] text-[#5f61eb] hover:bg-[#ebe8ff]"}`}
                  >
                    {tier.buttonText}
                  </button>
                  <div className="mt-8">
                    <p className="font-bold text-slate-900 text-[15px] mb-4">Features:</p>
                    <ul className="space-y-3.5">
                      {tier.cardFeatures.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <div className="mt-0.5 bg-[#5f61eb] rounded-full p-[3px] flex-shrink-0">{checkIconWhite}</div>
                          <span className="text-sm text-slate-600 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-32 max-w-[1200px] mx-auto">
              <div className="text-center mb-10">
                <span className="text-[#5f61eb] font-bold text-[13px] uppercase tracking-wider mb-2 block">See features includes</span>
                <h2 className="text-[32px] font-extrabold text-slate-900">See Features Includes</h2>
              </div>
              <div className="bg-white rounded-[1.5rem] border border-slate-100 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                      <tr className="bg-[#f9f8ff]">
                        <th className="py-5 px-6 text-left font-bold text-slate-800 text-[15px]"></th>
                        {tiers.map((tier) => (
                          <th key={tier.name} className="py-5 px-6 text-center font-bold text-slate-800 text-[15px]">{tier.name.split(" ")[0]} Plan</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {categories.map((category, categoryIndex) => (
                        <React.Fragment key={category.name}>
                          <tr>
                            <td colSpan={4} className={`py-4 px-6 text-[12px] font-extrabold text-slate-400 uppercase tracking-wider bg-slate-50/50 ${categoryIndex !== 0 ? "border-t border-slate-100" : ""}`}>
                              {category.name}
                            </td>
                          </tr>
                          {category.features.map((feature) => (
                            <tr key={feature.name} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-4 px-6 text-[14px] font-medium text-slate-700">{feature.name}</td>
                              <td className="py-4 px-6 text-center">
                                {typeof feature.free === "boolean" ? feature.free ? checkIconPurple : crossIconGrey : <span className="text-[14px] text-slate-600 font-medium">{feature.free}</span>}
                              </td>
                              <td className="py-4 px-6 text-center border-l border-slate-50">
                                {typeof feature.standard === "boolean" ? feature.standard ? checkIconPurple : crossIconGrey : <span className="text-[14px] text-slate-600 font-medium">{feature.standard}</span>}
                              </td>
                              <td className="py-4 px-6 text-center border-l border-slate-50">
                                {typeof feature.premium === "boolean" ? feature.premium ? checkIconPurple : crossIconGrey : <span className="text-[14px] text-slate-600 font-medium">{feature.premium}</span>}
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-slate-400 mt-8">click outside to close</p>
          </div>
        </div>
      )}

      {selectedPlan && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[1.5rem] shadow-2xl overflow-hidden border border-slate-100">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-[#f9f8ff]">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Register Your College</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Selected Plan: {selectedPlan}</p>
              </div>
              <button type="button" onClick={() => setSelectedPlan(null)} className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form className="p-6 space-y-4" onSubmit={(event) => event.preventDefault()}>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">College Name *</label>
                <input type="text" required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Registration Number *</label>
                <input type="text" required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Contact Number *</label>
                <input type="tel" required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email *</label>
                <input type="email" required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>

              <button type="submit" className="w-full mt-2 bg-[#5f61eb] hover:bg-[#4b4dd6] text-white py-3 rounded-xl font-bold">Submit Request</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstitutionZone;

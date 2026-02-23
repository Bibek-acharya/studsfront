
import React, { useState } from 'react';

const AdvertisePage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPersonName: '',
    email: '',
    phoneNumber: '',
    website: '',
    advertisementType: '',
    budgetRange: '',
    campaignDuration: '',
    targetAudience: '',
    message: '',
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
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      alert('Advertisement request submitted successfully!');
      setIsSubmitting(false);
    }, 1500);
  };

  const benefits = [
    {
      id: 1,
      title: 'Large Audience',
      description: 'Reach over 50,000+ active students and young professionals.',
      icon: 'fa-users',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      id: 2,
      title: 'Targeted Reach',
      description: 'Connect with tech-savvy audiences interested in innovation.',
      icon: 'fa-crosshairs',
      color: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
    {
      id: 3,
      title: 'High Engagement',
      description: 'Average engagement rate of 8.5% across all campaigns.',
      icon: 'fa-chart-line',
      color: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
    {
      id: 4,
      title: 'Fast Results',
      description: 'See measurable results within the first week of your campaign.',
      icon: 'fa-bolt',
      color: 'bg-rose-100',
      iconColor: 'text-rose-600',
    },
    {
      id: 5,
      title: 'Premium Placement',
      description: 'Your brand featured in high-visibility areas and events.',
      icon: 'fa-award',
      color: 'bg-violet-100',
      iconColor: 'text-violet-600',
    },
    {
      id: 6,
      title: 'Analytics & Reports',
      description: 'Detailed performance metrics and ROI tracking included.',
      icon: 'fa-chart-pie',
      color: 'bg-cyan-100',
      iconColor: 'text-cyan-600',
    },
  ];

  return (
    <div className="pt-24 md:pt-32 pb-20 bg-slate-50 min-h-screen font-sans">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">Advertise with us</h1>
          <nav className="text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <span className="text-slate-400">Home</span>
            <span className="text-slate-300">/</span>
            <span className="text-blue-600">Advertise</span>
          </nav>
        </div>

        {/* Campaign Details Form Card */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100 mb-20">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Campaign Details</h2>
            <p className="text-slate-500 font-medium">Reach thousands of students and tech enthusiasts through our platform</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Company/Brand Name" required>
                  <input
                    type="text"
                    placeholder="Enter your company name"
                    required
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all font-medium"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                </InputGroup>

                <InputGroup label="Contact Person Name" required>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    required
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all font-medium"
                    value={formData.contactPersonName}
                    onChange={(e) => setFormData({ ...formData, contactPersonName: e.target.value })}
                  />
                </InputGroup>

                <InputGroup label="Email Address" required>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all font-medium"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </InputGroup>

                <InputGroup label="Phone Number" required>
                  <input
                    type="tel"
                    placeholder="+977 98XXXXXXXX"
                    required
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all font-medium"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  />
                </InputGroup>

                <InputGroup label="Website/Social Media" required>
                  <input
                    type="url"
                    placeholder="https://yourwebsite.com"
                    required
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all font-medium"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </InputGroup>

                <InputGroup label="Advertisement Type" required>
                  <select
                    required
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all font-medium appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%232563EB%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')] bg-[length:1em] bg-[right_1rem_center] bg-no-repeat"
                    value={formData.advertisementType}
                    onChange={(e) => setFormData({ ...formData, advertisementType: e.target.value })}
                  >
                    <option value="" disabled>Select ad type</option>
                    <option value="banner">Banner Ads</option>
                    <option value="video">Video Ads</option>
                    <option value="sponsored">Sponsored Content</option>
                    <option value="social">Social Media Campaign</option>
                    <option value="email">Email Marketing</option>
                    <option value="event">Event Sponsorship</option>
                  </select>
                </InputGroup>

                <InputGroup label="Budget Range" required>
                  <select
                    required
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all font-medium appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%232563EB%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')] bg-[length:1em] bg-[right_1rem_center] bg-no-repeat"
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  >
                    <option value="" disabled>Select budget</option>
                    <option value="1k-5k">$1,000 - $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k+">$50,000+</option>
                  </select>
                </InputGroup>

                <InputGroup label="Campaign Duration" required>
                  <select
                    required
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all font-medium appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%232563EB%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')] bg-[length:1em] bg-[right_1rem_center] bg-no-repeat"
                    value={formData.campaignDuration}
                    onChange={(e) => setFormData({ ...formData, campaignDuration: e.target.value })}
                  >
                    <option value="" disabled>Select duration</option>
                    <option value="1-week">1 Week</option>
                    <option value="2-weeks">2 Weeks</option>
                    <option value="1-month">1 Month</option>
                    <option value="3-months">3 Months</option>
                    <option value="6-months">6 Months</option>
                    <option value="12-months">12 Months</option>
                  </select>
                </InputGroup>

                <div className="md:col-span-2">
                  <InputGroup label="Target Audience" required>
                    <input
                      type="text"
                      placeholder="e.g., Students, Developers, Designers"
                      required
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all font-medium"
                      value={formData.targetAudience}
                      onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    />
                  </InputGroup>
                </div>

                <div className="md:col-span-2">
                  <InputGroup label="Additional Message">
                    <textarea
                      rows={4}
                      placeholder="Tell us more about your campaign goals..."
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all font-medium resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </InputGroup>
                </div>
              </div>
            </div>

            {/* Right Side: Upload & Action */}
            <div className="flex flex-col gap-6">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">Upload Creative Assets</label>
              <div
                className="border-2 border-dashed border-blue-300 rounded-[2rem] p-10 text-center space-y-4 bg-blue-50/50 hover:bg-blue-50 transition-colors relative cursor-pointer group"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <input
                  id="file-upload"
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-cloud-arrow-up text-blue-600 text-2xl"></i>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-bold text-slate-900">Drag & Drop File</p>
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">OR</p>
                </div>
                <button type="button" className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20">
                  Browse File
                </button>
                {file && (
                  <p className="text-xs font-bold text-emerald-600 truncate px-2">{file.name}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-black rounded-2xl text-lg shadow-xl shadow-blue-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
              >
                {isSubmitting ? <i className="fa-solid fa-spinner animate-spin"></i> : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>

        {/* Benefits Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Why Advertise With Us?</h2>
          <p className="text-lg text-slate-500 font-medium">Connect with the next generation of innovators and decision-makers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className={`w-16 h-16 ${benefit.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <i className={`fa-solid ${benefit.icon} ${benefit.iconColor} text-2xl`}></i>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-[3rem] p-12 md:p-20 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-5xl font-black mb-6">Ready to Get Started?</h3>
            <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">Join over 200+ brands who trust us to reach their target audience.</p>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <StatItem value="50K+" label="Active Users" />
              <StatItem value="200+" label="Partner Brands" />
              <StatItem value="8.5%" label="Engagement Rate" />
              <StatItem value="95%" label="Satisfaction" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputGroup: React.FC<{ label: string; required?: boolean; children: React.ReactNode }> = ({ label, required, children }) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const StatItem: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="text-center">
    <div className="text-4xl md:text-5xl font-black mb-2">{value}</div>
    <div className="text-blue-100 text-xs font-bold uppercase tracking-widest">{label}</div>
  </div>
);

export default AdvertisePage;

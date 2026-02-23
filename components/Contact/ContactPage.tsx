import React, { useState } from "react";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    services: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for contacting us! Your message has been sent.");
    setFormData({ name: "", email: "", phone: "", services: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header Section */}
      <div className="pt-24 md:pt-32 pb-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-black mb-3">
            Contact Us
          </h1>
          <nav className="text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <span className="text-gray-500">Home</span>
            <span className="text-gray-300">/</span>
            <span className="text-blue-600">Contact Us</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black text-black mb-10">
              Get your free quote Today
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black uppercase tracking-widest">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ex. Jagdish Dhami"
                    required
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all font-medium placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black uppercase tracking-widest">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Ex. jagdish@example.com"
                    required
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all font-medium placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Phone and Services Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black uppercase tracking-widest">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Ex. 98XXXXXXXX"
                    required
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all font-medium placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black uppercase tracking-widest">
                    Services <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="services"
                    value={formData.services}
                    onChange={handleChange}
                    placeholder="Ex. Career Counseling"
                    required
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all font-medium placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-black uppercase tracking-widest">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="enter here..."
                  rows={8}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all font-medium resize-none placeholder-gray-400"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-10 rounded-xl transition-all shadow-xl shadow-blue-500/20 active:scale-95 text-lg"
                >
                  Send Now
                </button>
              </div>
            </form>
          </div>

          {/* Info Card Section */}
          <div className="lg:col-span-1">
            <div className="bg-blue-600 rounded-2xl p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

              <div className="relative z-10 space-y-10">
                {/* Address Section */}
                <div>
                  <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                    <i className="fa-solid fa-location-dot text-blue-200"></i>
                    Address
                  </h3>
                  <p className="text-blue-50 font-medium leading-relaxed">
                    New Baneshwor
                    <br />
                    Kathmandu 44600, Nepal
                  </p>
                </div>

                {/* Contact Section */}
                <div>
                  <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                    <i className="fa-solid fa-phone text-blue-200"></i>
                    Contact
                  </h3>
                  <p className="text-blue-50 font-medium mb-1">
                    Tel : 01-456746, 01-985647
                  </p>
                  <p className="text-blue-50 font-medium">
                    Email: hello@studsphere.com
                  </p>
                </div>

                {/* Open Time Section */}
                <div>
                  <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                    <i className="fa-solid fa-clock text-blue-200"></i>
                    Open Time
                  </h3>
                  <p className="text-blue-50 font-medium mb-1">
                    Sunday - Friday
                  </p>
                  <p className="text-blue-50 font-medium">9:00 AM - 6:00 PM</p>
                </div>

                {/* Stay Connected Section */}
                <div>
                  <h3 className="text-2xl font-black mb-6">Stay Connected</h3>
                  <div className="flex gap-4">
                    <SocialIcon icon="fa-facebook-f" />
                    <SocialIcon icon="fa-instagram" />
                    <SocialIcon icon="fa-linkedin-in" />
                    <SocialIcon icon="fa-twitter" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="w-full lg:w-3/4 mx-auto overflow-hidden rounded-2xl shadow-xl border border-gray-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.814343940183!2d85.3312!3d27.6915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb199a06c2ad2b%3A0x390a3992d995bb!2sNew%20Baneshwor%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>
    </div>
  );
};

const SocialIcon: React.FC<{ icon: string }> = ({ icon }) => (
  <a
    href="#"
    className="bg-white text-blue-600 w-11 h-11 rounded-full flex items-center justify-center hover:bg-blue-50 transition-all duration-300 shadow-lg shadow-black/10 hover:scale-110"
  >
    <i className={`fa-brands ${icon} text-lg`}></i>
  </a>
);

export default ContactPage;

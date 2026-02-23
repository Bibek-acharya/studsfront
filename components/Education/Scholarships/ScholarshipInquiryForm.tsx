import React, { useState } from "react";

interface ScholarshipInquiryFormProps {
  scholarshipName?: string;
  onClose?: () => void;
}

const ScholarshipInquiryForm: React.FC<ScholarshipInquiryFormProps> = ({
  scholarshipName = "Global Scholars Program",
  onClose,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    scholarshipType: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      scholarshipType: "",
      message: "",
    });
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      {/* Main Content */}
      <main className="w-full max-w-lg">
        <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden relative">
          {/* Close Button if provided */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-blue-100 hover:text-white transition-colors z-10"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          )}

          {/* Form Header */}
          <div className="bg-[#002147] px-6 py-5 border-b border-blue-800 text-center">
            <i className="fa-solid fa-graduation-cap text-3xl text-blue-300 mb-2"></i>
            <h2 className="text-xl font-bold text-white">
              Scholarship Inquiry
            </h2>
            <p className="text-blue-100 text-sm mt-1">{scholarshipName}</p>
          </div>

          {isSubmitted ? (
            /* Success Message */
            <div className="p-8 text-center flex flex-col items-center justify-center min-h-[400px] animate-fadeIn">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 text-2xl">
                <i className="fa-solid fa-check"></i>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                Inquiry Received!
              </h3>
              <p className="text-blue-700 text-sm max-w-xs mx-auto mb-6">
                Thank you,{" "}
                <span className="font-semibold text-blue-900">
                  {formData.firstName}
                </span>
                . We have received your inquiry regarding the{" "}
                <span className="font-semibold text-blue-900">
                  {formData.scholarshipType || "selected"}
                </span>{" "}
                scholarship.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetForm}
                  className="px-6 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors"
                >
                  Submit Another
                </button>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-blue-700 text-white hover:bg-blue-800 rounded-lg text-sm font-medium transition-colors"
                  >
                    Go Back
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* The Form */
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Section 1: Personal Info */}
              <section>
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-blue-100">
                  <span className="bg-blue-100 text-blue-700 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
                    1
                  </span>
                  <h3 className="font-semibold text-sm text-blue-800">
                    Applicant Details
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {/* First Name */}
                    <div className="space-y-1">
                      <label
                        htmlFor="firstName"
                        className="block text-xs font-medium text-blue-800"
                      >
                        First Name <span className="text-blue-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-blue-300 text-blue-900"
                        placeholder="Jane"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="space-y-1">
                      <label
                        htmlFor="lastName"
                        className="block text-xs font-medium text-blue-800"
                      >
                        Last Name <span className="text-blue-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-blue-300 text-blue-900"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium text-blue-800"
                    >
                      Email Address <span className="text-blue-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-blue-300 text-blue-900"
                      placeholder="student@example.com"
                    />
                  </div>
                </div>
              </section>

              {/* Section 2: Inquiry Details */}
              <section>
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-blue-100">
                  <span className="bg-blue-100 text-blue-700 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
                    2
                  </span>
                  <h3 className="font-semibold text-sm text-blue-800">
                    Inquiry
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* Scholarship Type */}
                  <div className="space-y-1">
                    <label
                      htmlFor="scholarshipType"
                      className="block text-xs font-medium text-blue-800"
                    >
                      Scholarship Type <span className="text-blue-500">*</span>
                    </label>
                    <select
                      id="scholarshipType"
                      name="scholarshipType"
                      required
                      value={formData.scholarshipType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-blue-900"
                    >
                      <option value="" disabled>
                        Select category
                      </option>
                      <option value="Merit-Based">Merit-Based</option>
                      <option value="Need-Based">Need-Based</option>
                      <option value="Athletic">Athletic</option>
                      <option value="Arts">Arts</option>
                      <option value="STEM">STEM</option>
                      <option value="General">General</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label
                      htmlFor="message"
                      className="block text-xs font-medium text-blue-800"
                    >
                      Questions <span className="text-blue-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-blue-300 text-blue-900"
                      placeholder="Your questions..."
                    ></textarea>
                  </div>
                </div>
              </section>

              {/* Action Buttons */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-2.5 bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all flex items-center justify-center gap-2 ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
                >
                  <span>
                    {isSubmitting ? "Processing..." : "Submit Inquiry"}
                  </span>
                  <i
                    className={`fa-solid ${isSubmitting ? "fa-spinner fa-spin" : "fa-paper-plane"} text-xs`}
                  ></i>
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default ScholarshipInquiryForm;

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { apiService } from "../../../services/api";

interface CollegeDetailsPageProps {
  onNavigate: (view: any, data?: any) => void;
}

const CollegeDetailsPage: React.FC<CollegeDetailsPageProps> = ({ onNavigate }) => {
  const location = useLocation();
  const routeState = (location.state || {}) as { id?: number | string };
  const parsedCollegeId = Number(routeState.id);
  const collegeId = Number.isFinite(parsedCollegeId) && parsedCollegeId > 0
    ? parsedCollegeId
    : null;
  const hasInvalidCollegeId = routeState.id !== undefined && collegeId === null;

  const [activeTab, setActiveTab] = useState("about");
  const { data, isLoading, error } = useQuery({
    queryKey: ["college", collegeId],
    queryFn: () => apiService.getCollegeById(collegeId as number),
    enabled: collegeId !== null,
  });

  const college = data?.data || null;

  const collegeData = {
    name: "Goldenagete International College",
    fullName: "Studsphere Education",
    location: "KamalPokari,Kathmandu",
    rating: "4.5",
    reviewsCount: "1,024",
    website: "WWW.Studsphere.Com",
    established: "2005",
    type: "Private Engineering College",
    students: "15k+",
  };

  const courses = [
    {
      name: "B.Tech computer Science",
      specialization: "AI, Data Science",
      duration: "4 Year",
      type: "Full Time",
      fees: "Rs. 4,50,000",
      seats: "120 Seats",
      eligibility: "10 +2 with 75% (PCM)",
    },
    {
      name: "B.Tech computer Science",
      specialization: "AI, Data Science",
      duration: "4 Year",
      type: "Full Time",
      fees: "Rs. 4,50,000",
      seats: "120 Seats",
      eligibility: "10 +2 with 75% (PCM)",
    },
    {
      name: "B.Tech computer Science",
      specialization: "AI, Data Science",
      duration: "4 Year",
      type: "Full Time",
      fees: "Rs. 4,50,000",
      seats: "120 Seats",
      eligibility: "10 +2 with 75% (PCM)",
    },
    {
      name: "B.Tech computer Science",
      specialization: "AI, Data Science",
      duration: "4 Year",
      type: "Full Time",
      fees: "Rs. 4,50,000",
      seats: "120 Seats",
      eligibility: "10 +2 with 75% (PCM)",
    },
  ];

  const admissions = [
    {
      id: 1,
      name: "Bachelor In Information Technology",
      university: "Tribhuvan University",
      faculty: "Faculty of Education",
      status: "Ongoing",
      openDate: "20th, Dec, 2025",
      deadline: "20th, Dec, 2025",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 2,
      name: "Bachelor In Information Technology",
      university: "Tribhuvan University",
      faculty: "Faculty of Education",
      status: "Closed",
      openDate: "20th, Dec, 2025",
      deadline: "20th, Dec, 2025",
      image:
        "https://images.unsplash.com/photo-1454165833767-027eeef1596e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      name: "Bachelor In Information Technology",
      university: "Tribhuvan University",
      faculty: "Faculty of Education",
      status: "Ongoing",
      openDate: "20th, Dec, 2025",
      deadline: "20th, Dec, 2025",
      image:
        "https://images.unsplash.com/photo-1523240715627-5d0b5114233c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 4,
      name: "Bachelor In Information Technology",
      university: "Tribhuvan University",
      faculty: "Faculty of Education",
      status: "Closed",
      openDate: "20th, Dec, 2025",
      deadline: "20th, Dec, 2025",
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    },
  ];

  const offeredPrograms = [
    {
      id: "undergrad",
      title: "Undergraduate",
      icon: "fa-graduation-cap",
      count: "3 Programs",
      programs: [
        {
          name: "BE Computer Engineering",
          level: "Bachelor",
          status: "Ongoing",
        },
        {
          name: "BE Computer Engineering",
          level: "Bachelor",
          status: "Closed",
        },
        {
          name: "BE Computer Engineering",
          level: "Bachelor",
          status: "Ongoing",
        },
        {
          name: "BE Computer Engineering",
          level: "Bachelor",
          status: "Ongoing",
        },
      ],
    },
    {
      id: "postgrad",
      title: "Postgraduate",
      icon: "fa-building-columns",
      count: "3 Programs",
      programs: [
        {
          name: "BE Computer Engineering",
          level: "Bachelor",
          status: "Ongoing",
        },
        {
          name: "BE Computer Engineering",
          level: "Bachelor",
          status: "Closed",
        },
        {
          name: "BE Computer Engineering",
          level: "Bachelor",
          status: "Ongoing",
        },
        {
          name: "BE Computer Engineering",
          level: "Bachelor",
          status: "Ongoing",
        },
      ],
    },
  ];

  const alumni = [
    {
      name: "Sita Sharma",
      role: "Product Manger @ Google",
      batch: "Batch of 2015",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Sita Sharma",
      role: "Product Manger @ Google",
      batch: "Batch of 2015",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Sita Sharma",
      role: "Product Manger @ Google",
      batch: "Batch of 2015",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Sita Sharma",
      role: "Product Manger @ Google",
      batch: "Batch of 2015",
      image:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    },
  ];

  const scholarships = [
    {
      title: "Merti Scholarship",
      icon: "fa-medal",
      color: "amber",
      desc: "Up to 100% Wavier For Top Rankers",
    },
    {
      title: "Need Based",
      icon: "fa-hand-holding-heart",
      color: "emerald",
      desc: "Up to 100% Wavier For Top Rankers",
    },
    {
      title: "Sport Quota",
      icon: "fa-person-running",
      color: "rose",
      desc: "Up to 100% Wavier For Top Rankers",
    },
  ];

  const reviews = [
    {
      name: "Sushil Adhikari",
      initials: "SA",
      role: "BBA Student",
      time: "2 months ago",
      rating: 5,
      comment:
        "The faculty here is extremely supportive. The blend of practical workshops and theory really helped me land my internship at a top bank. Highly recommend for Management students!",
      avatarColor: "bg-indigo-100 text-indigo-600",
    },
    {
      name: "Priya Rana",
      initials: "PR",
      role: "CSIT Alumni",
      time: "5 months ago",
      rating: 4,
      comment:
        "Great computer labs and internet facilities. The curriculum is updated regularly. Canteen food could be better, but overall a fantastic learning environment.",
      avatarColor: "bg-pink-100 text-pink-600",
    },
    {
      name: "Anish Tamang",
      initials: "AT",
      role: "BIM Student",
      time: "1 year ago",
      rating: 5,
      comment:
        "The extracurricular activities and clubs are the best part. I joined the Robotics club and we won the national competition. It really balances study and fun.",
      avatarColor: "bg-emerald-100 text-emerald-600",
    },
  ];

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      caption: "Graduation Day 2023",
    },
    {
      url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      caption: "Modern Classrooms",
    },
    {
      url: "https://images.unsplash.com/photo-1599689018596-3d237199276e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      caption: "E-Library Facility",
    },
    {
      url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      caption: "IT Lab Session",
    },
    {
      url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      caption: "Annual Sports Meet",
    },
    {
      url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      caption: "Guest Lecture Series",
    },
  ];

  const collegeDataResolved = {
    name: college?.name || collegeData.name,
    fullName: college?.full_name || collegeData.fullName,
    location: college?.location || collegeData.location,
    rating: String(college?.rating ?? collegeData.rating),
    reviewsCount:
      college?.reviews !== undefined
        ? Number(college.reviews || 0).toLocaleString()
        : collegeData.reviewsCount,
    website: college?.website || collegeData.website,
    established: college?.established || collegeData.established,
    type: college?.type || collegeData.type,
    students: college?.students || collegeData.students,
  };

  const aboutDataResolved = {
    vision:
      college?.about?.vision ||
      "To become a leading institution that shapes globally competent graduates.",
    mission:
      college?.about?.mission ||
      "Deliver quality, practical, and inclusive education for lifelong success.",
    campusLife:
      college?.about?.campus_life ||
      "A vibrant campus with clubs, mentorship, and student-led innovation.",
    principalName: college?.about?.principal_name || "Principal Office",
    principalTitle:
      college?.about?.principal_title || "Academic Leadership Team",
    principalMessage:
      college?.about?.principal_message ||
      "We are committed to helping each learner grow academically and personally.",
  };

  const coursesData =
    Array.isArray(college?.courses) && college.courses.length > 0
      ? college.courses.map((course: any) => ({
        name: course.name || "N/A",
        specialization: course.specialization || course.focus || "General",
        duration: course.duration || "N/A",
        type: course.type || "Full Time",
        fees: course.fees || "N/A",
        seats: course.seats || "Seats N/A",
        eligibility: course.eligibility || "Eligibility details available on request",
      }))
      : courses;

  const admissionsData =
    Array.isArray(college?.admission_cards) && college.admission_cards.length > 0
      ? college.admission_cards
      : admissions;

  const offeredProgramsData =
    Array.isArray(college?.offered_programs) && college.offered_programs.length > 0
      ? college.offered_programs
      : offeredPrograms;

  const alumniData =
    Array.isArray(college?.alumni) && college.alumni.length > 0
      ? college.alumni
      : alumni;

  const scholarshipsData =
    Array.isArray(college?.scholarships) && college.scholarships.length > 0
      ? college.scholarships.map((scholarship: any) => ({
        title: scholarship.title || "Scholarship",
        icon: scholarship.icon || "fa-medal",
        color:
          scholarship.color === "yellow"
            ? "amber"
            : scholarship.color === "green"
              ? "emerald"
              : scholarship.color === "blue"
                ? "emerald"
                : scholarship.color || "amber",
        desc: scholarship.desc || scholarship.description || "Apply for scholarship support",
      }))
      : scholarships;

  const reviewsData =
    Array.isArray(college?.college_reviews) && college.college_reviews.length > 0
      ? college.college_reviews
      : reviews;

  const galleryImagesData =
    Array.isArray(college?.gallery) && college.gallery.length > 0
      ? college.gallery
      : galleryImages;

  const bannerImage = college?.image_url || galleryImagesData[0]?.url || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80";
  const normalizedWebsite = String(collegeDataResolved.website || "").trim();
  const websiteHref = normalizedWebsite.startsWith("http://") || normalizedWebsite.startsWith("https://")
    ? normalizedWebsite
    : `https://${normalizedWebsite}`;
  const contactEmail = college?.email || "N/A";
  const contactPhone = college?.phone || "N/A";
  const contactWebsiteDisplay = normalizedWebsite ? normalizedWebsite.toUpperCase() : "N/A";

  return (
    <div className="bg-white min-h-screen font-sans">
      {isLoading && (
        <div className="w-full px-6 lg:px-12 py-4 bg-blue-50 border-b border-blue-100 text-blue-700 text-xs font-black uppercase tracking-widest">
          Loading college details...
        </div>
      )}
      {hasInvalidCollegeId && (
        <div className="w-full px-6 lg:px-12 py-4 bg-amber-50 border-b border-amber-100 text-amber-700 text-xs font-black uppercase tracking-widest">
          Invalid college id in navigation state
        </div>
      )}
      {error && (
        <div className="w-full px-6 lg:px-12 py-4 bg-rose-50 border-b border-rose-100 text-rose-700 text-xs font-black uppercase tracking-widest">
          {(error as Error).message}
        </div>
      )}

      {/* Hero Banner */}
      <div className="relative h-96 w-full overflow-hidden">
        <img
          src={bannerImage}
          className="w-full h-full object-cover"
          alt="Banner"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* College Profile Header */}
      <div className="w-full bg-white border-b border-slate-100">
        <div className="px-6 lg:px-12 py-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Logo */}
              <div className="shrink-0">
                <div className="w-32 h-32 bg-white border border-slate-50 rounded-lg shadow-lg flex flex-col items-center justify-center p-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-md flex items-center justify-center mb-1">
                    <i className="fa-solid fa-layer-group text-white text-xl"></i>
                  </div>
                  <div className="text-center leading-tight">
                    <p className="text-[10px] font-bold text-blue-600">
                      Studsphere
                    </p>
                    <p className="text-[10px] font-bold text-blue-600">
                      Education
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Info */}
              <div className="text-center lg:text-left pt-2 space-y-2">
                <div className="flex items-center justify-center lg:justify-start gap-2 h-8">
                  <h1 className="text-2xl md:text-2xl font-bold text-slate-900 tracking-tight">
                    {collegeDataResolved.name}
                  </h1>
                  <i className="fa-solid fa-circle-check text-blue-500 text-lg"></i>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-2 text-slate-500">
                  <i className="fa-solid fa-location-dot"></i>
                  <span className="text-sm font-medium">
                    {collegeDataResolved.location}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <div className="flex items-center gap-1.5">
                    <i className="fa-solid fa-star text-blue-600"></i>
                    <span className="text-sm font-bold text-slate-700">
                      {collegeDataResolved.rating}
                    </span>
                    <span className="text-sm text-slate-500">
                      ({collegeDataResolved.reviewsCount} Reviews)
                    </span>
                  </div>
                  <span className="text-slate-200">|</span>
                  <a
                    href={websiteHref}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-sm font-semibold">
                      {contactWebsiteDisplay}
                    </span>
                    <i className="fa-solid fa-up-right-from-square text-[10px]"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-all shadow-lg active:scale-95 flex items-center gap-3">
                <i className="fa-regular fa-heart"></i>
                Apply Now
              </button>
              <button className="px-8 py-3 bg-white border-2 border-slate-100 rounded-lg font-bold text-sm text-slate-500 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm active:scale-95 flex items-center gap-3">
                <i className="fa-solid fa-download"></i>
                Brochure
              </button>
              <button className="w-12 h-12 bg-white border-2 border-slate-100 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all active:scale-95">
                <i className="fa-solid fa-share-nodes"></i>
              </button>
            </div>
          </div>

          {/* Inline Tabs Navigation - Separated from info part but inside the white container */}
          <div className="mt-8 pt-8 border-t border-slate-50 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-12 min-w-max pb-2">
              {[
                "About",
                "Courses & Fees",
                "Admissions",
                "Offered Program",
                "Scholarship",
                "Alumni",
                "Gallery",
                "Review",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() =>
                    setActiveTab(tab.toLowerCase().replace(/ /g, "_"))
                  }
                  className={`text-[12px] font-black uppercase tracking-[0.2em] relative transition-all whitespace-nowrap ${activeTab === tab.toLowerCase().replace(/ /g, "_")
                      ? "text-blue-600"
                      : "text-slate-400 hover:text-slate-600"
                    }`}
                >
                  {tab}
                  {activeTab === tab.toLowerCase().replace(/ /g, "_") && (
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-blue-600 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <main className="w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 px-6 lg:px-12">
          {/* Left Column - Content */}
          <div className="lg:col-span-8 space-y-16">
            {/* TAB: ABOUT */}
            {activeTab === "about" && (
              <div className="space-y-12 animate-fadeIn">
                <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src={bannerImage}
                    className="w-full h-full object-cover"
                    alt="Campus"
                  />
                </div>
                <div className="space-y-8">
                  <p className="text-lg text-slate-600 font-medium leading-relaxed">
                    <span className="font-black text-slate-900">
                      {collegeDataResolved.name}
                    </span>{" "}
                    {college?.description ||
                      "is committed to delivering quality education with strong academic foundations and real-world learning opportunities."}
                  </p>
                  <p className="text-lg text-slate-600 font-medium leading-relaxed">
                    {aboutDataResolved.campusLife}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <VisionMissionCard
                    type="Vision"
                    icon="fa-eye"
                    desc={aboutDataResolved.vision}
                    color="blue"
                    image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                  />
                  <VisionMissionCard
                    type="Mission"
                    icon="fa-bullseye"
                    desc={aboutDataResolved.mission}
                    color="emerald"
                    image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                  />
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-8">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                    Message from {aboutDataResolved.principalName}
                  </p>
                  <p className="text-sm font-bold text-slate-700 leading-relaxed mb-3">
                    {aboutDataResolved.principalMessage}
                  </p>
                  <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest">
                    {aboutDataResolved.principalTitle}
                  </p>
                </div>
              </div>
            )}

            {/* TAB: COURSES & FEES */}
            {activeTab === "courses_&_fees" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="bg-blue-50 text-blue-600 p-6 rounded-lg border border-blue-100 font-bold text-sm">
                  Fees listed below are in NPR per year. additional Charges
                </div>
                <div className="overflow-hidden bg-white rounded-xl shadow-sm border border-slate-100 overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                      <tr>
                        <th className="px-8 py-6">Courses Name</th>
                        <th className="px-8 py-6">Duration</th>
                        <th className="px-8 py-6">Fee / Year</th>
                        <th className="px-8 py-6">Eligibility & Seat</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {coursesData.map((course, i) => (
                        <tr
                          key={i}
                          className="hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-8 py-8">
                            <h4 className="text-lg font-black text-slate-900 mb-1">
                              {course.name}
                            </h4>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                              Specialization: {course.specialization}
                            </p>
                          </td>
                          <td className="px-8 py-8">
                            <div className="flex flex-col">
                              <span className="text-lg font-black text-slate-900">
                                {course.duration}
                              </span>
                              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                {course.type}
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-8">
                            <div className="flex flex-col">
                              <span className="text-lg font-black text-primary-600">
                                {course.fees}
                              </span>
                              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                / Year
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-8">
                            <div className="flex flex-col gap-2">
                              <span className="text-xs font-bold text-slate-500">
                                {course.eligibility}
                              </span>
                              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest w-fit">
                                {course.seats}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: ADMISSIONS */}
            {activeTab === "admissions" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
                {admissionsData.map((adm) => (
                  <div
                    key={adm.id}
                    className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden group hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={adm.image}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        alt=""
                      />
                      <div
                        className={`absolute top-6 left-6 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${adm.status === "Ongoing" ? "bg-green-500 text-white" : "bg-rose-500 text-white"}`}
                      >
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                        {adm.status}
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-black text-slate-900 mb-6 leading-tight">
                        {adm.name}
                      </h3>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-md bg-slate-50 flex items-center justify-center text-primary-600">
                          <i className="fa-solid fa-building-columns"></i>
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 uppercase tracking-tight">
                            {adm.university}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {adm.faculty}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg mb-8">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[10px] font-black text-primary-600 uppercase tracking-widest">
                            <i className="fa-solid fa-circle-play"></i>
                            Admission open
                          </div>
                          <p className="text-[11px] font-black text-slate-800">
                            {adm.openDate}
                          </p>
                        </div>
                        <div className="space-y-1 border-l border-slate-200 pl-4">
                          <div className="flex items-center gap-2 text-[10px] font-black text-rose-500 uppercase tracking-widest">
                            <i className="fa-solid fa-circle-stop"></i>
                            DEADLINE
                          </div>
                          <p className="text-[11px] font-black text-slate-800">
                            {adm.deadline}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button className="flex-1 py-4 bg-white border-2 border-slate-100 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary-600 hover:border-primary-100 transition-all">
                          Details
                        </button>
                        <button
                          className={`flex-1 py-4 rounded-lg text-[10px] font-black uppercase tracking-widest text-white transition-all ${adm.status === "Ongoing" ? "bg-primary-600 hover:bg-primary-700" : "bg-slate-400 cursor-not-allowed"}`}
                        >
                          Apply Now
                        </button>
                        <button className="w-14 h-14 bg-white border-2 border-slate-100 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-100 transition-all">
                          <i className="fa-regular fa-heart"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: OFFERED PROGRAM */}
            {activeTab === "offered_program" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
                {offeredProgramsData.map((cat) => (
                  <div
                    key={cat.id}
                    className="bg-white rounded-lg border border-slate-100 shadow-sm p-10 hover:shadow-2xl hover:border-primary-100 transition-all duration-500 group"
                  >
                    <div className="w-16 h-16 rounded-md bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center text-white text-3xl mb-10 shadow-xl shadow-primary-500/20 group-hover:scale-110 transition-transform">
                      <i className={`fa-solid ${cat.icon}`}></i>
                    </div>
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight">
                        {cat.title}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                      <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">
                        Admission Status
                      </span>
                      <span className="text-[11px] font-black text-primary-600 uppercase tracking-widest">
                        {cat.count}
                      </span>
                    </div>
                    <div className="space-y-4">
                      {cat.programs.map((p, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between group/item"
                        >
                          <div>
                            <p className="text-sm font-black text-slate-800 leading-tight">
                              {p.name}
                            </p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                              {p.level}
                            </p>
                          </div>
                          <span
                            className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${p.status === "Ongoing" ? "bg-green-50 text-green-600" : "bg-rose-50 text-rose-600"}`}
                          >
                            {p.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: SCHOLARSHIP */}
            {activeTab === "scholarship" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeIn">
                {scholarshipsData.map((s, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg border border-slate-100 p-12 text-center shadow-sm hover:shadow-2xl transition-all duration-500 group"
                  >
                    <div
                      className={`w-24 h-24 rounded-full mx-auto mb-10 flex items-center justify-center text-4xl shadow-inner ${s.color === "amber" ? "bg-amber-50 text-amber-500" : s.color === "emerald" ? "bg-emerald-50 text-emerald-500" : "bg-rose-50 text-rose-500"} group-hover:scale-110 transition-transform`}
                    >
                      <i className={`fa-solid ${s.icon}`}></i>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">
                      {s.title}
                    </h3>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-10">
                      {s.desc}
                    </p>
                    <button className="px-10 py-4 bg-primary-100 text-primary-600 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary-600 hover:text-white transition-all shadow-sm">
                      Apply Now
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: ALUMNI */}
            {activeTab === "alumni" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeIn">
                {alumniData.map((person, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg border border-slate-100 p-10 text-center shadow-sm hover:shadow-2xl transition-all duration-500 group"
                  >
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 border-4 border-slate-50 shadow-lg">
                      <img
                        src={person.image}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        alt=""
                      />
                    </div>
                    <h4 className="text-xl font-black text-slate-900 mb-1">
                      {person.name}
                    </h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                      {person.role}
                    </p>
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-8">
                      {person.batch}
                    </p>
                    <button className="flex items-center justify-center gap-3 w-full py-4 bg-primary-50 text-primary-600 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary-600 hover:text-white transition-all">
                      Connect
                      <i className="fa-brands fa-linkedin-in text-lg"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: GALLERY */}
            {activeTab === "gallery" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
                {galleryImagesData.map((img, i) => (
                  <div
                    key={i}
                    className="group relative aspect-square rounded-lg overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 cursor-zoom-in"
                  >
                    <img
                      src={img.url}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      alt=""
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                      <p className="font-black text-sm uppercase tracking-widest text-white">
                        {img.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: REVIEWS */}
            {activeTab === "review" && (
              <div className="space-y-16 animate-fadeIn">
                <div className="bg-white rounded-lg p-10 md:p-16 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-16">
                  <div className="text-center shrink-0">
                    <div className="text-7xl font-black text-slate-900 tracking-tighter mb-2">
                      4.8
                    </div>
                    <div className="flex gap-1 justify-center text-amber-400 text-xl mb-4">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fa-solid fa-star"></i>
                      ))}
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      Based on {collegeDataResolved.reviewsCount} reviews
                    </p>
                  </div>
                  <div className="flex-1 space-y-4 w-full">
                    {[
                      { l: "5 Star", w: "85%" },
                      { l: "4 Star", w: "10%" },
                      { l: "3 Star", w: "3%" },
                      { l: "2 Star", w: "1%" },
                      { l: "1 Star", w: "1%" },
                    ].map((bar, i) => (
                      <div key={i} className="flex items-center gap-6">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-12">
                          {bar.l}
                        </span>
                        <div className="flex-1 h-3 bg-slate-50 rounded-full border border-slate-100 overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full"
                            style={{ width: bar.w }}
                          ></div>
                        </div>
                        <span className="text-[10px] font-black text-slate-900 w-10 text-right">
                          {bar.w}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-10 w-full">
                  {reviewsData.map((r, i) => (
                    <div
                      key={i}
                      className="bg-white p-10 rounded-lg border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
                    >
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-6">
                          <div
                            className={`w-14 h-14 rounded-lg flex items-center justify-center font-black text-xl shadow-inner ${r.avatarColor}`}
                          >
                            {r.initials}
                          </div>
                          <div>
                            <h4 className="font-black text-slate-900 leading-tight group-hover:text-primary-600 transition-colors uppercase tracking-tight">
                              {r.name}
                            </h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                              {r.role} • {r.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-0.5 text-amber-400 text-sm">
                          {[...Array(5)].map((_, idx) => (
                            <i
                              key={idx}
                              className={`fa-solid fa-star ${idx < r.rating ? "text-amber-400" : "text-slate-100"}`}
                            ></i>
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-500 font-medium leading-relaxed italic text-lg">
                        "{r.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-28 space-y-8 animate-fadeIn">
              {/* Apply Today Card */}
              <div className="bg-white p-10 rounded-lg shadow-2xl border border-slate-100 text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <span className="bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-10 inline-block border border-green-100">
                    Admission open
                  </span>
                  <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
                    Apply Today
                  </h3>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-12">
                    Secure your future with admission
                  </p>

                  <div className="space-y-4">
                    <button className="w-full py-5 bg-primary-600 text-white rounded-md font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all active:scale-95">
                      Apply Now
                    </button>
                    <button className="w-full py-5 bg-white border-2 border-slate-100 text-primary-600 rounded-md font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary-50 hover:border-primary-100 transition-all active:scale-95">
                      Request call Back
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact & Support Card */}
              <div className="bg-white p-10 rounded-lg shadow-sm border border-slate-100">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 text-lg">
                    <i className="fa-solid fa-headset"></i>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    Contact & Support
                  </h3>
                </div>

                <div className="space-y-8">
                  <ContactItem
                    icon="fa-clock"
                    label="G-MAIL"
                    value={contactEmail}
                    color="blue"
                  />
                  <ContactItem
                    icon="fa-user-graduate"
                    label="PHONE SUPPORT"
                    value={contactPhone}
                    color="emerald"
                  />
                  <ContactItem
                    icon="fa-building"
                    label="WEBSITE"
                    value={contactWebsiteDisplay}
                    color="amber"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Action Footer */}
      <div className="bg-slate-900 py-24 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 w-full px-6">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight uppercase">
            Your future at <span className="text-primary-400">{collegeDataResolved.name}</span>{" "}
            starts today!
          </h2>
          <p className="text-xl text-slate-400 font-medium mb-12 w-full">
            Take the first step towards academic excellence. Apply now for the
            2025 intake and secure your global career.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-primary-600 text-white px-12 py-5 rounded-lg font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-primary-950/30 hover:bg-primary-500 transition-all active:scale-95">
              Complete Application
            </button>
            <button className="bg-white/10 text-white border border-white/20 backdrop-blur-md px-12 py-5 rounded-lg font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/20 transition-all">
              Talk to Counselor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components helpers
const VisionMissionCard: React.FC<{
  type: string;
  icon: string;
  desc: string;
  color: string;
  image: string;
}> = ({ type, icon, desc, color, image }) => (
  <div
    className={`rounded-xl border transition-all duration-500 hover:shadow-2xl flex flex-col h-full bg-${color === "blue" ? "blue" : "emerald"}-50/30 border-${color === "blue" ? "blue" : "emerald"}-100 overflow-hidden group`}
  >
    <div className="h-48 overflow-hidden">
      <img
        src={image}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        alt={type}
      />
    </div>
    <div className="p-10">
      <div className="flex items-center gap-6 mb-8">
        <div
          className={`w-14 h-14 rounded-md flex items-center justify-center text-2xl shadow-sm ${color === "blue" ? "bg-blue-100 text-blue-600" : "bg-emerald-100 text-emerald-600"}`}
        >
          <i className={`fa-solid ${icon}`}></i>
        </div>
        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
          Our {type}
        </h3>
      </div>
      <p className="text-sm font-bold text-slate-500 leading-relaxed uppercase tracking-widest">
        {desc}
      </p>
    </div>
  </div>
);

const ContactItem: React.FC<{
  icon: string;
  label: string;
  value: string;
  color: string;
}> = ({ icon, label, value, color }) => (
  <div className="flex items-start gap-6 group">
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 transition-all group-hover:scale-110 ${color === "blue"
          ? "bg-blue-100 text-blue-600"
          : color === "emerald"
            ? "bg-emerald-100 text-emerald-600"
            : "bg-amber-100 text-amber-600"
        }`}
    >
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div className="min-w-0">
      <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">
        {label}
      </p>
      <p className="text-[13px] font-black text-slate-800 leading-tight uppercase tracking-tight">
        {value}
      </p>
    </div>
  </div>
);

const AboutCard: React.FC<{
  icon: string;
  title: string;
  desc: string;
  color: string;
}> = ({ icon, title, desc, color }) => (
  <div className="bg-white p-10 rounded-md border border-slate-100 shadow-sm hover:shadow-2xl hover:border-primary-100 transition-all duration-500 group flex flex-col h-full transform hover:-translate-y-2">
    <div
      className={`w-16 h-16 rounded-md flex items-center justify-center text-3xl mb-8 transition-all group-hover:scale-110 shadow-sm ${color === "blue"
          ? "bg-blue-50 text-blue-600"
          : color === "emerald"
            ? "bg-emerald-50 text-emerald-600"
            : "bg-purple-50 text-purple-600"
        }`}
    >
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight leading-tight">
      {title}
    </h3>
    <p className="text-sm font-medium text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

const AdmissionItem: React.FC<{ icon: string; text: string }> = ({
  icon,
  text,
}) => (
  <li className="flex items-start gap-5 group">
    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center text-sm group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <span className="text-slate-600 font-bold text-sm leading-relaxed group-hover:text-slate-900 transition-colors pt-2">
      {text}
    </span>
  </li>
);

const TimelineStep: React.FC<{
  step: string;
  title: string;
  sub: string;
  desc: string;
  isLast?: boolean;
}> = ({ step, title, sub, desc, isLast }) => (
  <div className="relative group">
    <div
      className={`absolute -left-10 top-0 w-1 bg-slate-100 h-full ${isLast ? "hidden" : ""}`}
    ></div>
    <div className="absolute -left-12 top-0 w-5 h-5 rounded-full bg-white border-4 border-primary-600 shadow-lg z-10 group-hover:scale-125 transition-transform duration-300"></div>
    <div className="bg-white p-10 rounded-md border border-slate-100 shadow-sm group-hover:shadow-2xl transition-all duration-500 transform group-hover:translate-x-2 border-l-4 group-hover:border-l-primary-600">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            {title}
          </h3>
          <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest mt-1">
            {sub}
          </p>
        </div>
        <span className="text-5xl font-black text-slate-50 leading-none select-none group-hover:text-primary-50 transition-colors">
          {step}
        </span>
      </div>
      <p className="text-slate-500 font-medium text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  </div>
);

const DeptCard: React.FC<{
  icon: string;
  title: string;
  color: string;
  desc: string;
}> = ({ icon, title, color, desc }) => (
  <div
    className={`bg-white p-10 rounded-lg border transition-all duration-500 hover:shadow-2xl group flex flex-col h-full ${color === "blue"
        ? "border-blue-100 hover:border-blue-400"
        : color === "emerald"
          ? "border-emerald-100 hover:border-emerald-400"
          : "border-pink-100 hover:border-pink-400"
      }`}
  >
    <div
      className={`w-16 h-16 rounded-md flex items-center justify-center text-2xl mb-10 shadow-lg group-hover:scale-110 transition-transform duration-500 ${color === "blue"
          ? "bg-blue-600 text-white shadow-blue-200"
          : color === "emerald"
            ? "bg-emerald-600 text-white shadow-emerald-200"
            : "bg-pink-600 text-white shadow-pink-200"
        }`}
    >
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">
      {title}
    </h3>
    <p className="text-slate-500 font-medium text-sm leading-relaxed mb-10 flex-grow">
      {desc}
    </p>
    <button className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-600 hover:text-primary-800 flex items-center gap-3 transition-all group-hover:gap-5">
      View Faculty <i className="fa-solid fa-arrow-right-long"></i>
    </button>
  </div>
);

const MetaBlock: React.FC<{ icon: string; label: string; value: string }> = ({
  icon,
  label,
  value,
}) => (
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 rounded-md bg-slate-50 flex items-center justify-center text-slate-400 shrink-0 shadow-inner group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
      <i className={`fa-solid ${icon} text-lg`}></i>
    </div>
    <div className="min-w-0">
      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className="text-sm font-black text-slate-800 leading-tight uppercase tracking-tight">
        {value}
      </p>
    </div>
  </div>
);

const MiniStat: React.FC<{ value: string; label: string }> = ({
  value,
  label,
}) => (
  <div className="bg-slate-50/50 p-4 rounded-md border border-slate-100 flex flex-col items-center justify-center gap-1 hover:border-primary-100 transition-all group">
    <p className="text-lg font-black text-slate-900 tracking-tight group-hover:text-primary-600 transition-colors">
      {value}
    </p>
    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
      {label}
    </p>
  </div>
);

export default CollegeDetailsPage;

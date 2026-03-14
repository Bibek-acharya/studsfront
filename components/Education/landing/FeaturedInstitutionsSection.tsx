const featuredColleges = [
  {
    image:
      "https://scontent.fktm8-1.fna.fbcdn.net/v/t39.30808-6/514417031_1243063541165291_3100742828166290954_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=2a1932&_nc_ohc=k0LjnDUYEt0Q7kNvwHygwbl&_nc_oc=AdnM2qSCUo2yjLeLSVH5gIJ1S9jVEG8u8kusmoSP0hVbJrN1Qtnr0mlgCfovTtJeVVV_alNroR2PrKgPT2vZY9oI&_nc_zt=23&_nc_ht=scontent.fktm8-1.fna&_nc_gid=QLdkpdjhJI6DWegk360VLw&_nc_ss=8&oh=00_AfzcNVid5WztkIPEr_Tot_LIO9EsYvPdnN-Xbo4M7nXZhg&oe=69AD868C",
    alt: "Islington Campus",
    title: "Islington College",
    rating: "4.5",
    type: "Private",
    location: "Kamalpokhari",
    affiliations: "NEB, Tribhuwan University, Purbanchal University",
    description:
      "The Institute of Engineering (IOE) entrance exam is tough. Learn the strategies,",
  },
  {
    image:
      "https://scontent.fktm8-1.fna.fbcdn.net/v/t39.30808-6/514417031_1243063541165291_3100742828166290954_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=2a1932&_nc_ohc=k0LjnDUYEt0Q7kNvwHygwbl&_nc_oc=AdnM2qSCUo2yjLeLSVH5gIJ1S9jVEG8u8kusmoSP0hVbJrN1Qtnr0mlgCfovTtJeVVV_alNroR2PrKgPT2vZY9oI&_nc_zt=23&_nc_ht=scontent.fktm8-1.fna&_nc_gid=QLdkpdjhJI6DWegk360VLw&_nc_ss=8&oh=00_AfzcNVid5WztkIPEr_Tot_LIO9EsYvPdnN-Xbo4M7nXZhg&oe=69AD868C",
    alt: "Islington Campus",
    title: "Islington College",
    rating: "4.5",
    type: "Private",
    location: "Kamalpokhari",
    affiliations: "NEB, Tribhuwan University, Purbanchal University",
    description:
      "The Institute of Engineering (IOE) entrance exam is tough. Learn the strategies,",
  },
  {
    image:
      "https://scontent.fktm8-1.fna.fbcdn.net/v/t39.30808-6/514417031_1243063541165291_3100742828166290954_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=2a1932&_nc_ohc=k0LjnDUYEt0Q7kNvwHygwbl&_nc_oc=AdnM2qSCUo2yjLeLSVH5gIJ1S9jVEG8u8kusmoSP0hVbJrN1Qtnr0mlgCfovTtJeVVV_alNroR2PrKgPT2vZY9oI&_nc_zt=23&_nc_ht=scontent.fktm8-1.fna&_nc_gid=QLdkpdjhJI6DWegk360VLw&_nc_ss=8&oh=00_AfzcNVid5WztkIPEr_Tot_LIO9EsYvPdnN-Xbo4M7nXZhg&oe=69AD868C",
    alt: "Islington Campus",
    title: "Islington College",
    rating: "4.5",
    type: "Private",
    location: "Kamalpokhari",
    affiliations: "NEB, Tribhuwan University, Purbanchal University",
    description:
      "The Institute of Engineering (IOE) entrance exam is tough. Learn the strategies,",
  },
  {
    image:
      "https://scontent.fktm8-1.fna.fbcdn.net/v/t39.30808-6/514417031_1243063541165291_3100742828166290954_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=2a1932&_nc_ohc=k0LjnDUYEt0Q7kNvwHygwbl&_nc_oc=AdnM2qSCUo2yjLeLSVH5gIJ1S9jVEG8u8kusmoSP0hVbJrN1Qtnr0mlgCfovTtJeVVV_alNroR2PrKgPT2vZY9oI&_nc_zt=23&_nc_ht=scontent.fktm8-1.fna&_nc_gid=QLdkpdjhJI6DWegk360VLw&_nc_ss=8&oh=00_AfzcNVid5WztkIPEr_Tot_LIO9EsYvPdnN-Xbo4M7nXZhg&oe=69AD868C",
    alt: "Islington Campus",
    title: "Islington College",
    rating: "4.5",
    type: "Private",
    location: "Kamalpokhari",
    affiliations: "NEB, Tribhuwan University, Purbanchal University",
    description:
      "The Institute of Engineering (IOE) entrance exam is tough. Learn the strategies,",
  },
];

const FeaturedInstitutionsSection = ({ onNavigate }: any) => (
  <div className="w-full max-w-[1380px] mx-auto mt-24">
    <div className="mb-10 text-center">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
        Explore Featured Colleges &amp; Universities
      </h2>
      <p className="text-gray-500 mt-3 text-sm md:text-base max-w-xl mx-auto">
        Compare top-rated programs and find the perfect institution for your
        academic future.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredColleges.map((college, index) => (
        <div
          key={`${college.title}-${index}`}
          className="bg-white rounded-[16px] p-2.5 border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.04)] transition-transform hover:-translate-y-1 duration-300 flex flex-col cursor-pointer h-full"
          onClick={() => onNavigate("collegeDetails", college)}
        >
          <div className="relative h-[140px] rounded-[12px] overflow-hidden shrink-0">
            <img
              src={college.image}
              alt={college.alt}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="px-1.5 pt-3 pb-1 flex-grow flex flex-col">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5 w-full">
                <h3 className="font-bold text-[15px] text-gray-900 truncate hover:text-[#2563eb] transition-colors">
                  {college.title}
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#0866FF"
                  className="w-[14px] h-[14px] shrink-0"
                >
                  <path d="M12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307A4.49 4.49 0 0 1 12 2.25Zm2.39 6.936-3.236 4.53L9.53 12.09a.75.75 0 1 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25a.75.75 0 1 0-1.22-.87Z" />
                </svg>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mt-1.5 text-gray-500 text-[11.5px] font-medium leading-none">
              <div className="flex items-center gap-1 text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3.5 h-3.5 text-[#f59e0b]"
                >
                  <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span className="font-bold">{college.rating}</span>
              </div>
              <div className="w-[1px] h-3 bg-gray-300" />
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 text-gray-400"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                {college.type}
              </div>
              <div className="w-[1px] h-3 bg-gray-300" />
              <div className="flex items-center gap-1 truncate max-w-[90px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 text-gray-400 shrink-0"
                >
                  <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="truncate">{college.location}</span>
              </div>
              <div className="flex items-start gap-1 w-full mt-1.5 text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 shrink-0 mt-[2px] text-gray-400"
                >
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                </svg>
                <span className="leading-tight">{college.affiliations}</span>
              </div>
            </div>

            <p className="text-[11.5px] text-gray-600 mt-3 leading-relaxed">
              {college.description}
            </p>

            <div className="mt-auto pt-4">
              <div className="border-t-2 border-dotted border-gray-200 mb-2.5" />

              <button className="w-full mb-1.5 bg-[#2563eb] text-white font-bold text-[11.5px] h-[36px] px-1 rounded-[4px] shadow-sm hover:bg-blue-700 transition-colors truncate flex items-center justify-center">
                Get counselling
              </button>

              <div className="flex gap-1.5">
                <button className="flex-1 bg-white border border-gray-200 text-gray-800 font-bold text-[11px] h-[32px] px-1 rounded-[4px] hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5 shrink-0 text-gray-500"
                  >
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                  </svg>
                  <span className="truncate">Ask a question</span>
                </button>
                <button className="flex-1 bg-yellow-500 text-white font-bold text-[11.5px] h-[32px] px-1 rounded-[4px] shadow-sm hover:bg-yellow-600 transition-colors truncate flex items-center justify-center">
                  Compare now
                </button>
                <button className="w-[32px] h-[32px] shrink-0 bg-white border border-gray-200 text-gray-600 rounded-[4px] flex items-center justify-center hover:bg-gray-50 transition-colors group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-[14px] h-[14px] group-hover:text-red-500 transition-colors"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default FeaturedInstitutionsSection;
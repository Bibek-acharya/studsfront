import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

interface AdmissionsDiscoveryPageProps {
  onNavigate: (view: any, data?: any) => void;
}

type AdmissionLevel = "high-school" | "bachelor" | "master";

interface AdmissionCard {
  id: string;
  name: string;
  rating: number;
  type: string;
  location: string;
  website: string;
  featured: boolean;
  affiliation: string;
  programs: string[];
  imageUrls: string[];
}

const cardsByLevel: Record<AdmissionLevel, AdmissionCard[]> = {
  "high-school": [
    {
      id: "hs-kist",
      name: "KIST College",
      rating: 4.2,
      type: "Private",
      location: "Kamalpokhari",
      website: "www.kist.edu.np",
      featured: true,
      affiliation: "NEB",
      programs: ["+2 Science", "+2 Management", "+2 Humanities"],
      imageUrls: [
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1487611459768-bd414656ea10?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      id: "hs-xavier",
      name: "St. Xavier's College",
      rating: 4.8,
      type: "Private",
      location: "Maitighar",
      website: "www.sxc.edu.np",
      featured: true,
      affiliation: "NEB",
      programs: ["+2 Science", "A-Level"],
      imageUrls: [
        "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      id: "hs-prasadi",
      name: "Prasadi Academy",
      rating: 4.7,
      type: "Private",
      location: "Lalitpur",
      website: "www.prasadi.edu.np",
      featured: true,
      affiliation: "NEB",
      programs: ["+2 Science", "+2 Management"],
      imageUrls: [
        "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      id: "hs-trinity",
      name: "Trinity Int'l College",
      rating: 4.4,
      type: "Private",
      location: "Dillibazar",
      website: "www.trinity.edu.np",
      featured: true,
      affiliation: "NEB",
      programs: ["+2 Science", "+2 Management"],
      imageUrls: [
        "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=900&q=80",
      ],
    },
  ],
  bachelor: [
    {
      id: "b-islington",
      name: "Islington College",
      rating: 4.5,
      type: "Private",
      location: "Kamalpokhari",
      website: "www.islington.edu.np",
      featured: true,
      affiliation: "London Met University",
      programs: ["BIT (Hons)", "BBA", "BSc Computing"],
      imageUrls: [
        "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      id: "b-softwarica",
      name: "Softwarica College",
      rating: 4.4,
      type: "Private",
      location: "Dillibazar",
      website: "www.softwarica.edu.np",
      featured: true,
      affiliation: "Coventry University",
      programs: ["BSc Computing", "Ethical Hacking", "Data Science"],
      imageUrls: [
        "https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      id: "b-herald",
      name: "Herald College",
      rating: 4.3,
      type: "Private",
      location: "Naxal",
      website: "www.heraldcollege.edu.np",
      featured: true,
      affiliation: "University of Wolverhampton",
      programs: ["BSc IT", "AI", "Information Management"],
      imageUrls: [
        "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      id: "b-gcm",
      name: "Global College of Mgmt",
      rating: 4.6,
      type: "Private",
      location: "Mid-Baneshwor",
      website: "www.gcm.edu.np",
      featured: true,
      affiliation: "Mid-Western University",
      programs: ["BBA", "BHM", "BTTM"],
      imageUrls: [
        "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=900&q=80",
      ],
    },
  ],
  master: [
    {
      id: "m-kusom",
      name: "KUSOM",
      rating: 4.7,
      type: "Private",
      location: "Balkumari",
      website: "www.kusom.edu.np",
      featured: true,
      affiliation: "Kathmandu University",
      programs: ["MBA", "EMBA", "MPhil"],
      imageUrls: [
        "https://images.unsplash.com/photo-1592303637753-cec12b5f7f00?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      id: "m-ace",
      name: "Ace Institute",
      rating: 4.4,
      type: "Private",
      location: "New Baneshwor",
      website: "www.ace.edu.np",
      featured: true,
      affiliation: "Pokhara University",
      programs: ["MBA", "MIT", "MBS"],
      imageUrls: [
        "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      id: "m-kcm",
      name: "KCM",
      rating: 4.5,
      type: "Private",
      location: "Dhumbarahi",
      website: "www.kcm.edu.np",
      featured: true,
      affiliation: "SIAM University",
      programs: ["MBA", "MHRM", "MFA"],
      imageUrls: [
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      id: "m-nami",
      name: "NAMI",
      rating: 4.2,
      type: "Private",
      location: "Jorpati",
      website: "www.nami.edu.np",
      featured: true,
      affiliation: "University of Northampton",
      programs: ["MBA", "MSc IT", "MSc Finance"],
      imageUrls: [
        "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=900&q=80",
      ],
    },
  ],
};

const recommendedCards = [
  { name: "Kathmandu Model College", tag: "Top Rated", color: "bg-[#eab308]", cta: "bg-[#2563eb] hover:bg-blue-700", location: "Bagbazar, Kathmandu" },
  { name: "Islington College", tag: "Excellent IT", color: "bg-[#10b981]", cta: "bg-[#10b981] hover:bg-emerald-700", location: "Kamalpokhari, Kathmandu" },
  { name: "Global College of Mgmt", tag: "Best Management", color: "bg-[#8b5cf6]", cta: "bg-[#8b5cf6] hover:bg-violet-700", location: "Baneshwor, Kathmandu" },
  { name: "Softwarica College", tag: "Global Degree", color: "bg-[#f97316]", cta: "bg-[#f97316] hover:bg-orange-700", location: "Dillibazar, Kathmandu" },
];

const levelMeta: Record<AdmissionLevel, { title: string; subtitle: string; searchPlaceholder: string; }> = {
  "high-school": {
    title: "Admission Ongoing",
    subtitle: "(+2 Programs)",
    searchPlaceholder: "Search +2 colleges...",
  },
  bachelor: {
    title: "Admission Ongoing",
    subtitle: "(Bachelor Programs)",
    searchPlaceholder: "Search bachelor colleges...",
  },
  master: {
    title: "Admission Ongoing",
    subtitle: "(Master Programs)",
    searchPlaceholder: "Search master colleges...",
  },
};

const AdmissionsDiscoveryPage: React.FC<AdmissionsDiscoveryPageProps> = ({ onNavigate }) => {
  const location = useLocation();

  const getLevelFromState = (state: unknown): AdmissionLevel => {
    const level = (state as { level?: AdmissionLevel } | null)?.level;
    if (level === "high-school" || level === "bachelor" || level === "master") {
      return level;
    }
    return "high-school";
  };

  const initialLevel = getLevelFromState(location.state);

  const [activeLevel, setActiveLevel] = useState<AdmissionLevel>(initialLevel);
  const [search, setSearch] = useState("");
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState<Record<string, number>>({});

  useEffect(() => {
    setActiveLevel(getLevelFromState(location.state));
  }, [location.state]);

  const cards = useMemo(() => cardsByLevel[activeLevel], [activeLevel]);

  const filteredCards = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return cards;
    return cards.filter((card) => {
      const hay = `${card.name} ${card.location} ${card.programs.join(" ")}`.toLowerCase();
      return hay.includes(query);
    });
  }, [cards, search]);

  const moveCarousel = (cardId: string, direction: -1 | 1, size: number) => {
    setCarouselIndex((prev) => {
      const current = prev[cardId] || 0;
      const next = (current + direction + size) % size;
      return { ...prev, [cardId]: next };
    });
  };

  const currentImage = (card: AdmissionCard) => {
    const idx = carouselIndex[card.id] || 0;
    return card.imageUrls[idx] || card.imageUrls[0];
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 pb-12 pt-6 md:px-6">
      <div className="mx-auto w-full max-w-[1350px] space-y-10">
        {/* <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { key: "high-school", label: "High School (+2)" },
              { key: "bachelor", label: "Bachelors" },
              { key: "master", label: "Masters" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveLevel(item.key as AdmissionLevel)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  activeLevel === item.key
                    ? "bg-[#0866FF] text-white"
                    : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div> */}

        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-[20px] font-bold text-gray-900 md:text-[22px]">
              Featured Colleges
              <span className="text-lg text-[#f59e0b]">✨</span>
            </h2>
            <button className="text-[13px] font-semibold text-[#0866FF] hover:underline">View All</button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-5">
            {cards.map((card) => (
              <div
                key={card.id}
                className="flex cursor-pointer flex-col rounded-[16px] border border-gray-100 bg-white p-2.5 shadow-[0_2px_15px_rgb(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-1"
                onClick={() => onNavigate("collegeDetails", { id: card.id })}
              >
                <div className="group relative h-[140px] overflow-hidden rounded-[12px]">
                  {card.featured && (
                    <div className="absolute left-2 top-2 z-20 rounded-[4px] bg-[#0866FF] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
                      Featured
                    </div>
                  )}

                  <img
                    src={currentImage(card)}
                    alt={card.name}
                    className="h-full w-full object-cover"
                  />

                  {card.imageUrls.length > 1 && (
                    <>
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          moveCarousel(card.id, -1, card.imageUrls.length);
                        }}
                        className="absolute left-1.5 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 opacity-0 shadow-md transition-opacity group-hover:opacity-100"
                      >
                        ‹
                      </button>
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          moveCarousel(card.id, 1, card.imageUrls.length);
                        }}
                        className="absolute right-1.5 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 opacity-0 shadow-md transition-opacity group-hover:opacity-100"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>

                <div className="flex flex-grow flex-col px-1.5 pb-1 pt-3">
                  <div className="flex items-center gap-1.5">
                    <h3 className="truncate text-[15px] font-bold text-gray-900 transition-colors hover:text-[#2563eb]">{card.name}</h3>
                    <span className="text-xs text-[#0866FF]">✔</span>
                  </div>

                  <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[11.5px] font-medium leading-none text-gray-500">
                    <div className="flex items-center gap-1 text-gray-700">
                      <span className="text-[#f59e0b]">★</span>
                      <span className="font-bold">{card.rating}</span>
                    </div>
                    <div className="h-3 w-[1px] bg-gray-300"></div>
                    <div>{card.type}</div>
                    <div className="h-3 w-[1px] bg-gray-300"></div>
                    <div className="truncate">{card.location}</div>
                    <div className="h-3 w-[1px] bg-gray-300"></div>
                    <a
                      href={`https://${card.website}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="mt-0.5 w-full truncate hover:text-[#2563eb]"
                    >
                      {card.website}
                    </a>
                  </div>

                  <hr className="my-2.5 border-gray-100" />

                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-[12px] font-semibold text-gray-500">Programs Offered</h4>
                    <span className="text-[11px] font-bold text-[#2563eb]">{card.programs.length} Programs</span>
                  </div>

                  <div className="mb-3 space-y-2">
                    {card.programs.slice(0, 3).map((program) => (
                      <div key={program} className="flex items-center justify-between">
                        <span className="mr-2 truncate text-[11.5px] font-semibold text-gray-800 transition-colors hover:text-[#2563eb]">
                          {program}
                        </span>
                        <span className="flex shrink-0 items-center text-[9px] font-bold text-emerald-600">
                          <span className="mr-1 h-1 w-1 rounded-full bg-emerald-500"></span> Ongoing
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mb-3">
                    <button className="inline-flex items-center text-[11.5px] font-semibold text-[#2563eb] hover:underline">
                      View details <span className="ml-0.5">›</span>
                    </button>
                  </div>

                  <div className="mt-auto">
                    <div className="mb-2.5 border-t-2 border-dotted border-gray-200"></div>
                    <div className="flex gap-2">
                      <button className="flex-[1.2] whitespace-nowrap rounded-[4px] border border-gray-200 bg-white px-1 py-1.5 text-[11px] font-bold text-gray-800 transition-colors hover:bg-gray-50 sm:text-[12px]">
                        Get Counselling
                      </button>
                      <button className="flex-1 whitespace-nowrap rounded-[4px] bg-[#2563eb] px-1 py-1.5 text-[11px] font-bold text-white shadow-sm transition-colors hover:bg-blue-700 sm:text-[12px]">
                        Apply Now
                      </button>
                      <button className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[4px] border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50">
                        ♡
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4 mt-10 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-[20px] font-bold text-gray-900 md:text-[22px]">
              {levelMeta[activeLevel].title}
              <span className="mt-1 text-sm font-semibold text-gray-500">{levelMeta[activeLevel].subtitle}</span>
              <span className="text-red-500">🔥</span>
            </h2>
            <button className="text-[13px] font-semibold text-[#0866FF] hover:underline">View All</button>
          </div>

          <div className="relative z-50 mb-6 flex w-full flex-col items-start justify-between gap-4 xl:flex-row xl:items-center">
            <div className="flex w-full flex-wrap items-center gap-2 md:gap-3 xl:w-auto">
              {[
                { id: "stream", label: "All Streams" },
                { id: "location", label: "Location" },
                { id: "fee", label: "Fee Structure" },
                { id: "type", label: "College Type" },
                { id: "affiliation", label: "Affiliation" },
                { id: "status", label: "Status" },
              ].map((filter) => (
                <div key={filter.id} className="relative">
                  <button
                    onClick={() => setOpenFilter((prev) => (prev === filter.id ? null : filter.id))}
                    className="flex items-center gap-2 rounded-[8px] border border-gray-200 bg-white px-3.5 py-2 text-[13px] font-medium text-gray-700 shadow-sm transition-all hover:border-gray-300"
                  >
                    {filter.label}
                    <span className="text-gray-400">⌄</span>
                  </button>

                  {openFilter === filter.id && (
                    <div className="absolute left-0 top-full z-50 mt-2 w-52 rounded-[12px] border border-gray-100 bg-white p-3.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)]">
                      <div className="space-y-2 text-[13px] text-gray-600">
                        <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Option 1</label>
                        <label className="flex items-center gap-2"><input type="checkbox" /> Option 2</label>
                        <label className="flex items-center gap-2"><input type="checkbox" /> Option 3</label>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <button className="ml-1 flex shrink-0 items-center justify-center gap-1.5 rounded-[8px] border border-gray-200 bg-gray-50 px-3.5 py-2 text-[13px] font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-100">
                Reset
              </button>
            </div>

            <div className="relative h-[38px] w-full shrink-0 xl:w-[320px]">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                🔎
              </div>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={levelMeta[activeLevel].searchPlaceholder}
                className="h-full w-full rounded-[8px] border border-gray-200 bg-white py-2 pl-9 pr-3 text-[13px] font-medium text-gray-700 shadow-sm outline-none transition-all placeholder:font-normal placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-5">
            {filteredCards.map((card) => (
              <div key={`ongoing-${card.id}`} className="flex flex-col rounded-[16px] border border-gray-100 bg-white p-2.5 shadow-[0_2px_15px_rgb(0,0,0,0.04)]">
                <div className="relative h-[140px] overflow-hidden rounded-[12px]">
                  <img src={card.imageUrls[0]} alt={card.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="flex flex-grow flex-col px-1.5 pb-1 pt-3">
                  <div className="flex items-center gap-1.5">
                    <h3 className="truncate text-[15px] font-bold text-gray-900">{card.name}</h3>
                    <span className="text-xs text-[#0866FF]">✔</span>
                  </div>

                  <div className="mt-1.5 flex items-center gap-2 text-[11.5px] font-medium text-gray-500">
                    <span className="font-bold text-gray-700">★ {card.rating}</span>
                    <span className="h-3 w-[1px] bg-gray-300"></span>
                    <span>{card.type}</span>
                    <span className="h-3 w-[1px] bg-gray-300"></span>
                    <span>{card.location}</span>
                  </div>

                  <hr className="my-2.5 border-gray-100" />
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-[12px] font-semibold text-gray-500">Streams</h4>
                    <span className="text-[11px] font-bold text-[#2563eb]">{card.programs.length} Streams</span>
                  </div>

                  <div className="mb-3 space-y-2">
                    {card.programs.slice(0, 2).map((stream) => (
                      <div key={stream} className="flex items-center justify-between">
                        <span className="truncate text-[11.5px] font-semibold text-gray-800">{stream}</span>
                        <span className="text-[9px] font-bold text-emerald-600">● Ongoing</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <div className="mb-2.5 border-t-2 border-dotted border-gray-200"></div>
                    <div className="flex gap-2">
                      <button className="flex-[1.2] whitespace-nowrap rounded-[4px] border border-gray-200 bg-white px-1 py-1.5 text-[11px] font-bold text-gray-800 sm:text-[12px]">Get Counselling</button>
                      <button className="flex-1 whitespace-nowrap rounded-[4px] bg-[#2563eb] px-1 py-1.5 text-[11px] font-bold text-white shadow-sm sm:text-[12px]">Apply Now</button>
                      <button className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[4px] border border-gray-200 bg-white text-gray-600">♡</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 rounded-[20px] border border-blue-50 bg-[#F4F7FB] p-5 md:p-8">
          <div className="mb-6 flex items-start justify-between md:items-center">
            <div>
              <h2 className="font-display text-[20px] font-bold text-gray-900">Recommended Colleges in Nepal</h2>
              <p className="mt-1 text-[13px] text-gray-500">Admissions Open for 2026 Intake. Apply directly to top institutions.</p>
            </div>
            <span className="hidden rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#0866FF] shadow-sm sm:block">
              Promoted
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {recommendedCards.map((item) => (
              <div key={item.name} className="group flex flex-col overflow-hidden rounded-[16px] border border-gray-100 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-transform duration-300 hover:-translate-y-1">
                <div className="relative h-[160px] w-full">
                  <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80" alt={item.name} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                  <div className={`absolute right-3 top-3 rounded-[4px] px-2.5 py-1 text-[10px] font-bold tracking-wide text-white shadow-sm ${item.color}`}>
                    {item.tag}
                  </div>
                  <h3 className="absolute bottom-3 left-4 right-3 truncate text-[15px] font-bold leading-tight text-white transition-colors group-hover:text-yellow-300">
                    {item.name}
                  </h3>
                </div>

                <div className="flex flex-grow flex-col p-4">
                  <div className="mb-2.5 text-[12px] text-gray-500">📍 {item.location}</div>
                  <div className="mb-4 text-[13px] font-medium text-gray-800">
                    <span className="text-gray-500">Affiliation:</span> {activeLevel === "master" ? "University Program" : "Tribhuvan University"}
                  </div>

                  <div className="mb-5 mt-auto flex flex-wrap gap-1.5">
                    <span className="rounded-[6px] border border-blue-100/50 bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-600">Program 1</span>
                    <span className="rounded-[6px] border border-blue-100/50 bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-600">Program 2</span>
                  </div>

                  <button className={`w-full rounded-[8px] py-2.5 text-[13px] font-bold text-white transition-colors shadow-sm ${item.cta}`}>
                    Apply for Admission
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-2 mt-10 flex items-center justify-center gap-1 sm:gap-2">
          <button className="cursor-not-allowed rounded-[8px] border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-400" disabled>
            Prev
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#2563eb] text-sm font-medium text-white shadow-sm">1</button>
          <button className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50">2</button>
          <button className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50">3</button>
          <span className="flex h-9 w-9 select-none items-center justify-center text-gray-400">...</span>
          <button className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50">50</button>
          <button className="rounded-[8px] border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionsDiscoveryPage;

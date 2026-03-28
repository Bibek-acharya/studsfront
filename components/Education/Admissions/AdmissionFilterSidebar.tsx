import React, { useState, useEffect } from "react";
import DirectAdmissionModal from "./DirectAdmissionModal";

interface AdmissionFilterSidebarProps {
  activeLevel: string;
  onReset: () => void;
  onFilterChange: (filters: any) => void;
}

const rawLocationData: Record<string, Record<string, string[]>> = {
  "Bagmati": {
    "Kathmandu": ["Kathmandu Metropolitan", "Kirtipur", "Gokarneshwor", "Budhanilkantha", "Tarakeshwar", "Nagarjun", "Chandragiri"],
    "Lalitpur": ["Lalitpur Metropolitan", "Godawari", "Mahalaxmi"],
    "Bhaktapur": ["Bhaktapur Municipality", "Madhyapur Thimi", "Suryabinayak", "Changunarayan"],
    "Chitwan": ["Bharatpur", "Ratnanagar", "Rapti", "Khairahani"]
  },
  "Koshi": {
    "Morang": ["Biratnagar", "Urlabari", "Belbari", "Pathari"],
    "Sunsari": ["Dharan", "Itahari", "Inaruwa", "Duhabi"],
    "Jhapa": ["Birtamod", "Damak", "Bhadrapur", "Mechinagar"]
  },
  "Gandaki": {
    "Kaski": ["Pokhara", "Annapurna", "Machhapuchchhre"],
    "Tanahun": ["Vyas", "Bhanu", "Shuklagandaki"],
    "Gorkha": ["Gorkha Municipality", "Palungtar"]
  },
  "Lumbini": {
    "Rupandehi": ["Butwal", "Siddharthanagar", "Tillotama"],
    "Dang": ["Ghorahi", "Tulsipur"],
    "Banke": ["Nepalgunj", "Kohalpur"]
  },
  "Madhesh": {
    "Dhanusha": ["Janakpur", "Mithila"],
    "Parsa": ["Birgunj", "Pokhariya"]
  },
  "Karnali": {
    "Surkhet": ["Birendranagar", "Bheriganga"],
    "Jumla": ["Chandannath"]
  },
  "Sudurpashchim": {
    "Kailali": ["Dhangadhi", "Tikapur"],
    "Kanchanpur": ["Bhimdatta", "Punarwas"]
  }
};

const filterConfig = [
  { id: 'stream', label: 'Stream', options: ["Science", "Management", "Humanities", "Education", "Law"] },
  { id: 'location', label: 'Location', custom: true }, 
  { id: 'fee', label: 'Fee Range', custom: true },
  { id: 'type', label: 'College Type', options: ['Private College', 'Community College', 'Government College'] },
  { id: 'scholarship', label: 'Scholarship', options: ['Entrance Scholarship', 'Merit Scholarship', 'Need-based Scholarship'] },
  { id: 'facilities', label: 'Facilities', options: ['AC Classrooms', 'Digital Library', 'Sports Complex', 'Wi-Fi Campus', 'Hostel Available', 'Cafeteria'] },
  { id: 'sort', label: 'Sort By', type: 'radio', options: ['Popularity', 'Rating: High to Low', 'Fee: Low to High', 'Fee: High to Low'] }
];

const AdmissionFilterSidebar: React.FC<AdmissionFilterSidebarProps> = ({ activeLevel, onReset, onFilterChange }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    stream: true,
    location: true,
    fee: true,
    sort: true
  });

  const [filters, setFilters] = useState({
    streams: [] as string[],
    province: "",
    district: "",
    city: "",
    maxFee: 500000,
    collegeTypes: [] as string[],
    scholarships: [] as string[],
    facilities: [] as string[],
    sortBy: "Popularity",
    directAdmission: false
  });

  const [isDetecting, setIsDetecting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters]);

  const detectLocation = async () => {
    if (!navigator.geolocation) {
      alert("Browser does not support geolocation.");
      return;
    }
    
    setIsDetecting(true);
    
    const fetchWithFallback = async (lat: number, lon: number) => {
      try {
        // Try Nominatim First
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`);
        const data = await res.json();
        if (data && data.address) return data.address;
        
        // Fallback to BigDataCloud
        const res2 = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
        const data2 = await res2.json();
        return {
          state: data2.principalSubdivision,
          county: data2.locality,
          city: data2.city || data2.locality
        };
      } catch (err) {
        console.warn("Location service failed, trying next...", err);
        return null;
      }
    };

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const addr = await fetchWithFallback(latitude, longitude);

          if (!addr) throw new Error("Could not detect address");

          let province = "";
          const state = String(addr.state || addr.principalSubdivision || "").toLowerCase();
          const city_name = String(addr.city || addr.town || addr.village || addr.locality || "").toLowerCase();
          
          if (state.includes("bagmati") || city_name.includes("kathmandu")) province = "Bagmati";
          else if (state.includes("koshi") || state.includes("province 1") || city_name.includes("biratnagar")) province = "Koshi";
          else if (state.includes("madhesh") || state.includes("province 2") || city_name.includes("birgunj")) province = "Madhesh";
          else if (state.includes("gandaki") || city_name.includes("pokhara")) province = "Gandaki";
          else if (state.includes("lumbini") || state.includes("province 5") || city_name.includes("butwal")) province = "Lumbini";
          else if (state.includes("karnali") || city_name.includes("surkhet")) province = "Karnali";
          else if (state.includes("sudurpashchim") || city_name.includes("dhangadhi")) province = "Sudurpashchim";

          if (province && rawLocationData[province]) {
            const detectedDistrict = (addr.county || addr.city_district || addr.locality || "").toLowerCase();
            const detectedCity = (addr.city || addr.town || addr.village || addr.suburb || "").toLowerCase();
            
            const districts = Object.keys(rawLocationData[province]);
            const district = districts.find(d => 
              detectedDistrict.includes(d.toLowerCase()) || 
              detectedCity.includes(d.toLowerCase())
            ) || districts[0];

            const cities = rawLocationData[province][district];
            const city = cities.find(c => 
              detectedCity.includes(c.toLowerCase()) || 
              c.toLowerCase().includes(detectedCity.toLowerCase())
            ) || cities[0];

            setFilters(prev => ({ ...prev, province, district, city }));
          } else {
            // Default Kathmandu
            setFilters(prev => ({ ...prev, province: "Bagmati", district: "Kathmandu", city: "Kathmandu Metropolitan" }));
          }
        } catch (e) {
          console.error("Discovery Location Error:", e);
          // Standard fallback
          setFilters(prev => ({ ...prev, province: "Bagmati", district: "Kathmandu", city: "Kathmandu Metropolitan" }));
        } finally {
          setIsDetecting(false);
        }
      },
      (err) => {
        console.error("Geolocation Error:", err);
        setIsDetecting(false);
        // Fallback to Kathmandu if user denies
        setFilters(prev => ({ ...prev, province: "Bagmati", district: "Kathmandu", city: "Kathmandu Metropolitan" }));
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 30000 }
    );
  };

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCheckboxChange = (category: keyof typeof filters, value: string) => {
    setFilters(prev => {
      const current = prev[category] as string[];
      const next = current.includes(value) 
        ? current.filter(v => v !== value) 
        : [...current, value];
      return { ...prev, [category]: next };
    });
  };

  const resetAll = () => {
    setFilters({
      streams: [],
      province: "",
      district: "",
      city: "",
      maxFee: 500000,
      collegeTypes: [],
      scholarships: [],
      facilities: [],
      sortBy: "Popularity",
      directAdmission: false
    });
    onReset();
  };

  return (
    <aside className="w-full bg-white rounded-xl border border-gray-200 shadow-sm p-5 sticky font-['Inter',sans-serif]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-filter text-slate-900 text-[18px]"></i>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight font-['Poppins',sans-serif]">Filters</h2>
        </div>
        <button 
          onClick={resetAll}
          className="text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Detect Location Button */}
      <button 
        disabled={isDetecting}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors font-semibold text-sm mb-2 border border-blue-100 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed group"
        onClick={detectLocation}
      >
        <i className={`fa-solid ${isDetecting ? 'fa-spinner fa-spin' : filters.province ? 'fa-location-dot' : 'fa-location-crosshairs'} text-[14px]`}></i>
        <div className="flex flex-col items-center">
           <span className="leading-tight">
             {isDetecting ? 'Detecting...' : filters.city ? `${filters.city}, ${filters.district}` : filters.province ? `${filters.district || filters.province}` : 'Detect Location'}
           </span>
           {filters.province && !isDetecting && (
             <span className="text-[10px] opacity-70 font-medium">Recent Detection</span>
           )}
        </div>
      </button>

      {/* Filter Sections */}
      <div className="flex flex-col">
        {filterConfig.map((config, idx) => (
          <div key={config.id} className={`filter-item ${idx === filterConfig.length - 1 ? '' : 'border-b border-gray-100'}`}>
            <div 
              className="flex justify-between items-center py-4 cursor-pointer hover:text-blue-600 transition-colors group"
              onClick={() => toggleSection(config.id)}
            >
              <span className={`text-[15px] font-semibold transition-colors select-none ${openSections[config.id] ? 'text-blue-600' : 'text-slate-700'}`}>
                {config.label}
              </span>
              <i className={`fa-solid fa-chevron-down text-slate-400 text-[12px] transition-transform duration-200 ${openSections[config.id] ? 'rotate-180 text-blue-600' : ''}`}></i>
            </div>

            {openSections[config.id] && (
              <div className="pb-4 animate-in fade-in slide-in-from-top-1 duration-200">
                {config.id === 'location' ? (
                  <div className="flex flex-col gap-3 px-1">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1.5">Province</label>
                      <select 
                        value={filters.province}
                        onChange={(e) => setFilters(prev => ({ ...prev, province: e.target.value, district: "", city: "" }))}
                        className="w-full text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 p-2.5 bg-white text-slate-700 outline-none transition-all cursor-pointer hover:border-gray-300"
                      >
                        <option value="">Select Province</option>
                        {Object.keys(rawLocationData).map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1.5">District</label>
                      <select 
                        disabled={!filters.province}
                        value={filters.district}
                        onChange={(e) => setFilters(prev => ({ ...prev, district: e.target.value, city: "" }))}
                        className="w-full text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 p-2.5 bg-white text-slate-700 outline-none transition-all disabled:opacity-60 disabled:bg-slate-50 disabled:cursor-not-allowed"
                      >
                        <option value="">Select District</option>
                        {filters.province && Object.keys(rawLocationData[filters.province]).map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1.5">City</label>
                      <select 
                        disabled={!filters.district}
                        value={filters.city}
                        onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 p-2.5 bg-white text-slate-700 outline-none transition-all disabled:opacity-60 disabled:bg-slate-50 disabled:cursor-not-allowed"
                      >
                        <option value="">Select City</option>
                        {filters.province && filters.district && rawLocationData[filters.province][filters.district].map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                ) : config.id === 'fee' ? (
                  <div className="px-1 py-1">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-slate-500 font-medium">Max Fee:</span>
                      <span className="text-sm font-bold text-blue-600">
                        {filters.maxFee >= 1000000 ? 'NPR 10,00,000+' : `NPR ${filters.maxFee.toLocaleString('en-IN')}`}
                      </span>
                    </div>
                    <input 
                      type="range" 
                      min="0" max="1000000" step="50000" 
                      value={filters.maxFee}
                      onChange={(e) => setFilters(prev => ({ ...prev, maxFee: parseInt(e.target.value) }))}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-medium">
                      <span>0</span>
                      <span>10L+</span>
                    </div>
                  </div>
                ) : config.type === 'radio' ? (
                  <div className="flex flex-col gap-2.5 px-1 pb-1">
                    {config.options?.map(opt => (
                      <label key={opt} className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center pt-0.5">
                          <input 
                            type="radio" 
                            name={config.id} 
                            checked={filters.sortBy === opt}
                            onChange={() => setFilters(prev => ({ ...prev, sortBy: opt }))}
                            className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-slate-300 bg-white transition-all checked:border-blue-600 checked:border-[5px] hover:border-blue-500 focus:outline-none" 
                          />
                        </div>
                        <span className="text-slate-600 group-hover:text-blue-700 transition-colors leading-tight text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2.5 px-1">
                    {config.options?.map(opt => (
                      <label key={opt} className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center pt-0.5">
                          <input 
                            type="checkbox" 
                            checked={(filters[config.id === 'stream' ? 'streams' : config.id === 'type' ? 'collegeTypes' : config.id === 'scholarship' ? 'scholarships' : 'facilities' as keyof typeof filters] as string[]).includes(opt)}
                            onChange={() => handleCheckboxChange(config.id === 'stream' ? 'streams' : config.id === 'type' ? 'collegeTypes' : config.id === 'scholarship' ? 'scholarships' : 'facilities' as keyof typeof filters, opt)}
                            className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-slate-300 bg-white transition-all checked:border-blue-600 checked:bg-blue-600 hover:border-blue-500 focus:outline-none" 
                          />
                          <i className="fa-solid fa-check absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-white opacity-0 peer-checked:opacity-100 pointer-events-none"></i>
                        </div>
                        <span className="text-slate-600 group-hover:text-blue-700 transition-colors leading-tight text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Direct Admission Toggle */}
      <div className="mt-2 pt-5 border-t border-gray-100">
        <div className="flex flex-col gap-2 w-full">
          <div className="bg-slate-100 py-2 px-3 rounded-lg flex items-center justify-between transition-colors duration-300 w-full">
            <span className="text-[#1f304a] text-[13px] font-semibold whitespace-nowrap">
              Get college direct admission
            </span>
            <label className="relative inline-block w-11 h-6 cursor-pointer">
              <input 
                type="checkbox" 
                checked={filters.directAdmission}
                onChange={(e) => setFilters(prev => ({ ...prev, directAdmission: e.target.checked }))}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-slate-400 rounded-full peer peer-checked:bg-green-700 after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:after:translate-x-5 shadow-sm"></div>
            </label>
          </div>
          <div className="flex justify-end w-full px-1">
            <button 
              onClick={() => setShowModal(true)}
              className="text-[#4a5dc9] text-[11px] font-medium hover:underline flex items-center gap-1"
            >
              <i className="fa-solid fa-circle-info"></i>
              How it works?
            </button>
          </div>
        </div>
      </div>

      <DirectAdmissionModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </aside>
  );
};

export default AdmissionFilterSidebar;

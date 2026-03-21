import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchDatabase, trendingSearches, searchIcons, SearchItem } from '../../utils/searchDatabase';

export const SearchBar: React.FC = () => {
  const [locationText, setLocationText] = useState("Detect Location");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  
  const navigate = useNavigate();
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const locContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (locContainerRef.current && !locContainerRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsSearchOpen(true);
    
    if (query.trim() === '') {
      setSearchResults([]);
    } else {
      const keywords = query.toLowerCase().split(' ').filter(k => k.length > 0);
      const filtered = searchDatabase.filter(item => {
        const searchableText = (item.title + " " + item.type).toLowerCase();
        return keywords.every(keyword => searchableText.includes(keyword));
      });

      const locMatchStr = locationText !== "Detect Location" ? locationText.toLowerCase() : "";
      if (locMatchStr) {
        // Split complex location phrases into parts: "thamel, kathmandu" -> ["thamel", "kathmandu"]
        const locParts = locMatchStr.split(',').map(s => s.trim()).filter(s => s.length > 0);
        
        filtered.sort((a, b) => {
          const aTitle = a.title.toLowerCase();
          const bTitle = b.title.toLowerCase();
          
          let aScore = 0;
          let bScore = 0;
          
          locParts.forEach(part => {
             if (aTitle.includes(part)) aScore += 1;
             if (bTitle.includes(part)) bScore += 1;
          });
          
          return bScore - aScore;
        });
      }

      setSearchResults(filtered.slice(0, 10));
    }
  };

  const handleSearchExecute = (query: string) => {
    if (!query || query.trim() === '') return;
    setIsSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(query)}&loc=${encodeURIComponent(locationText)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchExecute(searchQuery);
    }
  };

  const autoDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLocationText('Detecting...');
    
    // Explicitly ask for high accuracy to get precise location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await response.json();
          
          if (data && data.address) {
            const addr = data.address;
            const localLevel = addr.suburb || addr.neighbourhood || addr.village || addr.town;
            const cityLevel = addr.city || addr.county || addr.state_district;
            
            if (localLevel && cityLevel) {
              setLocationText(`${localLevel}, ${cityLevel}`);
            } else if (cityLevel) {
              setLocationText(cityLevel);
            } else if (localLevel) {
              setLocationText(localLevel);
            } else {
              setLocationText("Location Found");
            }
          } else {
            setLocationText("Location Found");
          }
        } catch (error) {
          console.error("Error detecting location:", error);
          setLocationText("Kathmandu, Nepal"); // Error fallback
        }
        setIsLocationOpen(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Please enable location permissions in your browser to proceed.");
        setLocationText("Detect Location");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className="flex-1 max-w-3xl mx-10 hidden md:block">
      <div className="relative flex items-center w-full bg-white border border-gray-300 rounded-full focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 transition-all h-[46px] overflow-visible">
        
        {/* Location Dropdown Container */}
        <div className="relative h-full flex-shrink-0" ref={locContainerRef}>
          <button 
            onClick={() => {
              setIsLocationOpen(!isLocationOpen);
              setIsSearchOpen(false);
            }} 
            className="flex items-center gap-2 pl-4 pr-3 text-gray-600 hover:text-gray-900 transition-colors h-full bg-gray-50/30 hover:bg-gray-50 outline-none rounded-l-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span className={`text-[15px] whitespace-nowrap font-medium max-w-[140px] truncate ${locationText !== 'Detect Location' ? 'text-gray-900' : ''}`}>
              {locationText}
            </span>
          </button>

          {isLocationOpen && (
            <div className="absolute top-[calc(100%+8px)] left-0 w-[340px] bg-white rounded-lg shadow-xl border border-gray-100 z-[200] py-2 max-h-[420px] overflow-y-auto custom-scrollbar">
              <button onClick={autoDetectLocation} className="flex items-center gap-3 w-full px-5 py-3 text-blue-600 hover:bg-gray-50 transition-colors text-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <span className="font-medium text-[15px]">Detect Location</span>
              </button>
              <div className="flex items-center justify-between px-5 pt-3 pb-2">
                <span className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Recent Locations</span>
                <button className="text-[13px] font-medium text-blue-600 hover:text-blue-700">Clear All</button>
              </div>
              <button onClick={() => { setLocationText('Thamel, Kathmandu'); setIsLocationOpen(false); }} className="w-full text-left px-5 py-2.5 text-[15px] text-gray-800 hover:bg-gray-50 transition-colors">Thamel, Kathmandu</button>
              <button onClick={() => { setLocationText('Putalisadak, Kathmandu'); setIsLocationOpen(false); }} className="w-full text-left px-5 py-2.5 text-[15px] text-gray-800 hover:bg-gray-50 transition-colors">Putalisadak, Kathmandu</button>
              <div className="px-5 pt-4 pb-2">
                <span className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Trending Areas</span>
              </div>
              <button onClick={() => { setLocationText('Baneshwor, Kathmandu'); setIsLocationOpen(false); }} className="w-full text-left px-5 py-2.5 text-[15px] text-gray-800 hover:bg-gray-50 transition-colors">Baneshwor, Kathmandu</button>
              <button onClick={() => { setLocationText('Bharatpur, Chitwan'); setIsLocationOpen(false); }} className="w-full text-left px-5 py-2.5 text-[15px] text-gray-800 hover:bg-gray-50 transition-colors">Bharatpur, Chitwan</button>
              <button onClick={() => { setLocationText('Jawalakhel, Lalitpur'); setIsLocationOpen(false); }} className="w-full text-left px-5 py-2.5 text-[15px] text-gray-800 hover:bg-gray-50 transition-colors">Jawalakhel, Lalitpur</button>
              <button onClick={() => { setLocationText('Lakeside, Pokhara'); setIsLocationOpen(false); }} className="w-full text-left px-5 py-2.5 text-[15px] text-gray-800 hover:bg-gray-50 transition-colors">Lakeside, Pokhara</button>
            </div>
          )}
        </div>

        <div className="w-[1px] h-6 bg-gray-200"></div>

        {/* Search Input Area */}
        <div className="relative flex-1 flex items-center h-full px-3" ref={searchContainerRef}>
          <div className="text-gray-400 flex-shrink-0 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>

          <input 
            type="text" 
            value={searchQuery}
            onChange={handleSearchInput}
            onKeyDown={handleKeyDown}
            onClick={() => {
              setIsSearchOpen(true);
              setIsLocationOpen(false);
            }}
            placeholder=" " 
            className="w-full h-full text-[15px] bg-transparent text-gray-800 focus:outline-none z-10 peer"
            autoComplete="off"
          />

          {!searchQuery && (
            <div className="absolute inset-y-0 left-[38px] flex items-center pointer-events-none text-gray-400 text-[15px] peer-focus:hidden">
              <span className="whitespace-nowrap mr-1">Search</span>
              <div className="relative inline-block h-[20px] overflow-hidden align-bottom">
                <div className="sliding-text flex flex-col leading-[20px]">
                  <span className="block h-[20px] whitespace-nowrap">+2 science colleges...</span>
                  <span className="block h-[20px] whitespace-nowrap">BIT colleges in nepal...</span>
                  <span className="block h-[20px] whitespace-nowrap">CMAT entrance preparation...</span>
                  <span className="block h-[20px] whitespace-nowrap">MoE scholarships...</span>
                  <span className="block h-[20px] whitespace-nowrap">+2 science colleges...</span>
                </div>
              </div>
            </div>
          )}

          {isSearchOpen && (
            <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white rounded-lg shadow-xl border border-gray-100 z-[200] py-2 max-h-[420px] overflow-y-auto custom-scrollbar">
              {searchQuery.trim() === '' ? (
                <>
                  <div className="px-5 pt-3 pb-2">
                    <span className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Trending Searches</span>
                  </div>
                  {trendingSearches.map((item, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleSearchExecute(item.title)} 
                      className="flex items-center gap-4 w-full px-5 py-2.5 hover:bg-gray-50 transition-colors text-left group"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-400 text-white flex-shrink-0 group-hover:scale-105 transition-transform duration-200 shadow-sm" dangerouslySetInnerHTML={{ __html: searchIcons["Trending"] }}></div>
                      <div className="flex flex-col">
                        <span className="text-[15px] font-medium text-gray-900">{item.title}</span>
                        <span className="text-[13px] text-gray-500">{item.type}</span>
                      </div>
                    </button>
                  ))}
                </>
              ) : searchResults.length > 0 ? (
                <>
                  <div className="px-5 pt-3 pb-2">
                    <span className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Top Suggestions</span>
                  </div>
                  {searchResults.map((item, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleSearchExecute(item.title)} 
                      className="flex items-center gap-4 w-full px-5 py-2.5 hover:bg-gray-50 transition-colors text-left group"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 text-white flex-shrink-0 group-hover:scale-105 transition-transform duration-200 shadow-sm" dangerouslySetInnerHTML={{ __html: searchIcons[item.type] || searchIcons["Course"] }}></div>
                      <div className="flex flex-col">
                        <span className="text-[15px] font-medium text-gray-900">{item.title}</span>
                        <span className="text-[13px] text-gray-500">{item.type}</span>
                      </div>
                    </button>
                  ))}
                </>
              ) : (
                <div className="px-5 py-6 text-[14px] text-gray-500 text-center flex flex-col items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  No matches found for your query. Try searching for programs, colleges, or locations.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

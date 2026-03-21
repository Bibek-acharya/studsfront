import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchDatabase, searchIcons, SearchItem } from '../../utils/searchDatabase';

export const SearchPage: React.FC = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(search);
  const q = searchParams.get('q') || '';
  const loc = searchParams.get('loc') || '';

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const keywords = q.toLowerCase().split(' ').filter((k: string) => k.length > 0);
    const filtered = searchDatabase.filter((item: SearchItem) => {
      const searchableText = (item.title + " " + item.type).toLowerCase();
      // Lenient search
      return keywords.some((keyword: string) => searchableText.includes(keyword)) || 
             keywords.every((keyword: string) => searchableText.includes(keyword));
    });

    const locMatchStr = loc !== "Detect Location" && loc !== "" ? loc.toLowerCase() : "";
    if (locMatchStr) {
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

    return filtered;
  }, [q, loc]);

  const handleDetailedView = (item: SearchItem) => {
    // Basic routing logic depending on the type matched
    if (item.type === 'College' || item.type === 'University') {
      navigate('/collegeDetails', { state: { name: item.title } });
    } else if (item.type === 'Scholarship') {
      navigate('/scholarshipDetails', { state: { name: item.title } });
    } else if (item.type === 'Program' || item.type === 'Course') {
      navigate('/courseDetails', { state: { name: item.title } });
    } else {
      navigate('/educationPage');
    }
  };

  return (
    <main className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen">
      {!q.trim() ? (
        <div className="text-center py-20 flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Find Your Dream Path in Nepal</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">Use the search bar above to discover top colleges, programs, admissions, and scholarships tailored just for you.</p>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Results for &quot;{q}&quot; {loc && loc !== 'Detect Location' && `near ${loc}`}
            </h2>
            <div className="text-sm text-gray-500 font-medium">
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.length === 0 ? (
              <div className="col-span-full py-16 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No matches found</h3>
                <p className="text-gray-500 max-w-sm mx-auto">We couldn't find anything matching your search. Try checking your spelling or using different keywords.</p>
              </div>
            ) : (
              results.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => handleDetailedView(item)}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer flex flex-col h-full group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors"
                      dangerouslySetInnerHTML={{ __html: searchIcons[item.type] || searchIcons["Course"] }}
                    >
                    </div>
                    <span className="inline-block px-3 py-1 bg-gray-50 text-gray-600 text-[11px] font-bold rounded-full uppercase tracking-wider border border-gray-100">{item.type}</span>
                  </div>
                  <h3 className="text-[17px] font-bold text-gray-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors">{item.title}</h3>
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                    <span className="text-[13px] font-medium text-gray-500">View Details</span>
                    <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </main>
  );
};

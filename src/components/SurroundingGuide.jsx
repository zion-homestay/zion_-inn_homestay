import React, { useState, useMemo } from 'react';
import { ArrowRight, MapPin, ExternalLink } from 'lucide-react';
import { ATTRACTIONS_LIST } from '../data/homestayData';

export default function SurroundingGuide() {
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = useMemo(() => [
    { id: 'all', label: `All Sights (${ATTRACTIONS_LIST.length})` },
    { id: 'beaches', label: 'Beaches & Coast' },
    { id: 'nature', label: 'Nature & Waterfalls' },
    { id: 'heritage', label: 'Heritage & Temples' }
  ], []);

  const filteredAttractions = useMemo(() => {
    if (activeCategory === 'all') return ATTRACTIONS_LIST;
    if (activeCategory === 'beaches') {
      return ATTRACTIONS_LIST.filter(item => 
        item.category.toLowerCase().includes('coast') || 
        item.category.toLowerCase().includes('harbour') || 
        item.category.toLowerCase().includes('beach')
      );
    }
    if (activeCategory === 'nature') {
      return ATTRACTIONS_LIST.filter(item => 
        item.category.toLowerCase().includes('waterfall') || 
        item.category.toLowerCase().includes('forest') || 
        item.category.toLowerCase().includes('backwater') || 
        item.category.toLowerCase().includes('scenic') || 
        item.category.toLowerCase().includes('viewpoint') || 
        item.category.toLowerCase().includes('canal')
      );
    }
    if (activeCategory === 'heritage') {
      return ATTRACTIONS_LIST.filter(item => 
        item.category.toLowerCase().includes('history') || 
        item.category.toLowerCase().includes('monument') || 
        item.category.toLowerCase().includes('spiritual')
      );
    }
    return ATTRACTIONS_LIST;
  }, [activeCategory]);

  return (
    <section id="location" className="px-4 sm:px-8 max-w-7xl mx-auto py-12 sm:py-20 border-t border-[#EAE5DB]/60">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 text-left transition-all duration-500">
        <div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1F2421]">
            Explore Nearby Attractions
          </h2>
          <p className="text-xs sm:text-sm text-[#5D645E] mt-2 max-w-xl leading-relaxed">
            Pristine beaches, tranquil backwaters, cascading waterfalls, and historic royal palaces all within scenic driving distance from Zion Inn.
          </p>
        </div>

        <a 
          href="https://www.google.com/maps/search/tourist+attractions+near+Neyyoor,+Tamil+Nadu" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Explore nearby tourist attractions near Neyyoor on Google Maps"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#3A4B3D] hover:text-[#2D3B30] mt-3 sm:mt-0 group"
        >
          <span>Explore Nearby Attractions on Google Maps</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </a>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8 sm:mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#3A4B3D] text-[#FBF9F5] shadow-xs'
                : 'bg-[#F5F2EB] text-[#5D645E] hover:bg-[#EAE5DB] hover:text-[#1F2421]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Attractions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredAttractions.map((item) => (
          <div
            key={item.id}
            role="button"
            tabIndex={0}
            aria-label={`View attraction details for ${item.name}`}
            className="flex flex-col bg-white rounded-3xl overflow-hidden border border-[#EAE5DB] shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#3A4B3D]"
            onClick={() => setSelectedAttraction(item)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedAttraction(item);
              }
            }}
          >
            {/* Attraction Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-[#EAE5DB]/40">
              <img 
                src={item.image} 
                alt={item.name} 
                width="600"
                height="450"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                loading="lazy"
              />
              <div className="absolute bottom-3 left-3 glass-panel px-3 py-1 rounded-full text-xs font-semibold text-[#1F2421] flex items-center gap-1 shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-[#3A4B3D]" strokeWidth={1.5} />
                <span>{item.distance}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="font-editorial text-2xl font-medium text-[#1F2421] mb-1">
                  {item.name}
                </h3>
                {item.tamilName && (
                  <p className="text-xs text-[#3A4B3D] font-medium mb-1.5">
                    {item.tamilName}
                  </p>
                )}
                <p className="text-xs text-[#5D645E] font-medium tracking-wide">
                  {item.distance} • {item.category}
                </p>
                <p className="text-xs text-[#5D645E] mt-3 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#EAE5DB]/80 flex items-center justify-between text-xs text-[#3A4B3D] font-medium">
                <span>{item.driveTime}</span>
                <span className="inline-flex items-center gap-1 text-[11px] group-hover:underline">
                  Directions
                  <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for detailed attraction popup */}
      {selectedAttraction && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 overflow-y-auto p-4 sm:p-6 backdrop-blur-sm"
          onClick={() => setSelectedAttraction(null)}
        >
          <div className="min-h-full flex items-center justify-center py-6">
            <div 
              className="bg-[#FBF9F5] max-w-lg w-full rounded-3xl overflow-hidden border border-[#EAE5DB] shadow-2xl p-5 sm:p-6 text-left my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-4">
                <img src={selectedAttraction.image} alt={selectedAttraction.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-xs uppercase tracking-wider text-[#5D645E] font-semibold">
                {selectedAttraction.distance} • {selectedAttraction.category}
              </span>
              <h3 className="font-editorial text-2xl font-medium text-[#1F2421] mt-1 mb-1">
                {selectedAttraction.name}
              </h3>
              {selectedAttraction.tamilName && (
                <p className="text-xs font-semibold text-[#3A4B3D] mb-3">
                  {selectedAttraction.tamilName}
                </p>
              )}
              <p className="text-sm text-[#5D645E] leading-relaxed mb-4">
                {selectedAttraction.description}
              </p>
              <div className="bg-[#F5F2EB] p-3 rounded-xl border border-[#EAE5DB] text-xs text-[#1F2421] space-y-1 mb-5">
                <p>🚗 <strong>Drive from Zion Inn:</strong> {selectedAttraction.driveTime}</p>
                <p>☀️ <strong>Recommended Timing:</strong> {selectedAttraction.bestTime}</p>
              </div>
              <div className="flex gap-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedAttraction.name + ' Neyyoor Kanyakumari')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-full bg-[#3A4B3D] text-[#FBF9F5] text-xs sm:text-sm font-medium text-center shadow-xs hover:bg-[#2D3B30] transition-colors"
                >
                  Open in Google Maps
                </a>
                <button
                  onClick={() => setSelectedAttraction(null)}
                  className="px-5 py-2.5 rounded-full border border-[#EAE5DB] text-xs sm:text-sm font-medium hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

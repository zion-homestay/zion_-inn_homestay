import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  BedDouble, 
  Trees, 
  Compass, 
  Camera,
  ArrowRight
} from 'lucide-react';
import { subtleFadeUp } from '../utils/animations';

const GALLERY_ITEMS = [
  {
    id: 'hero-banner',
    image: '/images/hero-banner2.png',
    title: 'The Veranda at Dawn',
    category: 'spaces',
    categoryLabel: 'Verandas & Gardens',
    caption: 'Lush palms, gentle morning breezes, and peaceful open-air verandas overlooking tropical foliage.'
  },
  {
    id: 'ac-room-bed',
    image: '/images/ac-room1.jpg',
    title: 'AC Room — King Bed',
    category: 'rooms',
    categoryLabel: 'Rooms & Suites',
    caption: 'Handcrafted solid teakwood king bed, natural linen bedding, and tranquil morning garden views.'
  },
  {
    id: 'ac-room-tv',
    image: '/images/ac-room1-tv.jpg',
    title: 'AC Room — Lounge & Entertainment',
    category: 'rooms',
    categoryLabel: 'Rooms & Suites',
    caption: 'Private viewing area with LED TV, work desk nook, and curated shelving.'
  },
  {
    id: 'ac-room-ambience',
    image: '/images/ac-room2.jpg',
    title: 'AC Room — Spacious Layout',
    category: 'rooms',
    categoryLabel: 'Rooms & Suites',
    caption: 'Air-conditioned comfort with garden cross-ventilation and natural morning light.'
  },
  {
    id: 'non-ac-room-bed',
    image: '/images/non-ac room.jpg',
    title: 'Non-AC Room — Heritage Comfort',
    category: 'rooms',
    categoryLabel: 'Rooms & Suites',
    caption: 'Breezy, tranquil bedroom crafted with warm wood furnishings and high ceilings.'
  },
  {
    id: 'non-ac-room-view',
    image: '/images/non-ac room2 view2.jpg',
    title: 'Non-AC Room — Garden Outlook',
    category: 'rooms',
    categoryLabel: 'Rooms & Suites',
    caption: 'Natural ventilation and peaceful views of the surrounding flowering gardens.'
  },
  {
    id: 'bathroom-primary',
    image: '/images/bathroom.jpg',
    title: 'Attached En-Suite Bathroom',
    category: 'rooms',
    categoryLabel: 'Rooms & Suites',
    caption: 'Spotless tiled bathroom with clean sanitaryware and premium fixtures.'
  },
  {
    id: 'bathroom-secondary',
    image: '/images/bathroom2.jpg',
    title: 'Fresh Guest Washroom',
    category: 'rooms',
    categoryLabel: 'Rooms & Suites',
    caption: 'Clean, sanitized bathroom with daily fresh towels and essential toiletries.'
  },
  {
    id: 'reception-lobby',
    image: '/images/reception.jpg',
    title: 'Lobby & Welcoming Reception',
    category: 'spaces',
    categoryLabel: 'The Homestay',
    caption: 'Welcoming entrance space where host hospitality begins with cool refreshments.'
  },
  {
    id: 'the-space',
    image: '/images/the-space.jpg',
    title: 'Heritage Garden Courtyard',
    category: 'spaces',
    categoryLabel: 'The Homestay',
    caption: 'Paved stone pathways, tropical foliage, and outdoor cane seating under native fruit trees.'
  },
  {
    id: 'padmanabhapuram',
    image: '/images/padmanabhapuram.webp',
    title: 'Padmanabhapuram Wooden Palace',
    category: 'excursions',
    categoryLabel: 'Nearby Sights',
    caption: '16th-century wooden architectural marvel of the Travancore Maharajas, just 12 mins from Zion Inn.'
  },
  {
    id: 'thirparappu-waterfalls',
    image: '/images/thirparappu-waterfalls.webp',
    title: 'Thirparappu Waterfalls',
    category: 'excursions',
    categoryLabel: 'Nearby Sights',
    caption: 'A 50-foot cascading multi-tiered waterfall fed by the Kodayar River, featuring a picturesque bathing pool and the historic Lord Shiva temple.'
  },
  {
    id: 'thiruvithancode-arappally',
    image: '/images/thiruvithancode-arappally.webp',
    title: 'Historical Thomayar Kovil (Thiruvithancode Arappally)',
    category: 'excursions',
    categoryLabel: 'Nearby Sights',
    caption: 'Historical Thomayar Kovil built around 64 AD by St. Thomas, disciple of Jesus Christ. World-renowned ancient heritage church, just 8 mins from Zion Inn.'
  },
  {
    id: 'periya-nayagi-shrine',
    image: '/images/church-of-ascension.webp',
    title: 'பெரிய நாயகி அன்னை திருத்தலம் (Ascension Church)',
    category: 'excursions',
    categoryLabel: 'Nearby Sights',
    caption: 'Revered Catholic pilgrimage shrine of Periya Nayagi Annai (பெரிய நாயகி அன்னை திருத்தலம், திருவிதாங்கோடு) and Church of Ascension of Our Lord, 7 mins away.'
  },
  {
    id: 'muttom-beach',
    image: '/images/muttom-beach.webp',
    title: 'Muttom Rocky Beach & Lighthouse',
    category: 'excursions',
    categoryLabel: 'Nearby Sights',
    caption: 'A striking rocky coastline with a century-old lighthouse and sunset panoramas, 20 mins drive.'
  },
  {
    id: 'mathur-aqueduct',
    image: '/images/mathur-aqueduct.webp',
    title: 'Mathur Hanging Aqueduct',
    category: 'excursions',
    categoryLabel: 'Nearby Sights',
    caption: 'Asia’s highest hanging trough aqueduct towering over lush coconut valleys, 18 mins away.'
  },
  {
    id: 'villukuri-aqueduct',
    image: '/images/villukuri-aqueduct.webp',
    title: 'Villukuri Aqueduct',
    category: 'excursions',
    categoryLabel: 'Nearby Sights',
    caption: 'Historic canal water bridge (Thaneer Palam) carrying irrigation water above serene village roads.'
  },
  {
    id: 'manichithrathazhu-viewpoint',
    image: '/images/manichithrathazhu-viewpoint.webp',
    title: 'Manichithrathazhu View Point',
    category: 'excursions',
    categoryLabel: 'Nearby Sights',
    caption: 'Elevated panoramic viewpoint with breathtaking vistas across misty Western Ghats hills and lush valleys.'
  },
  {
    id: 'lemur-beach',
    image: '/images/lemur-beach.webp',
    title: 'Lemur Beach',
    category: 'excursions',
    categoryLabel: 'Nearby Sights',
    caption: 'Pristine coastal haven known for peaceful golden sands, coconut groves, and calm turquoise Arabian Sea shores.'
  },
  {
    id: 'colachel-harbour',
    image: '/images/colachel-harbour-viewpoint.jpg',
    title: 'Colachel Harbour View Point',
    category: 'excursions',
    categoryLabel: 'Nearby Sights',
    caption: 'Historic coastal natural harbour and scenic breakwater viewpoint overlooking active fishing vessels and expansive Arabian Sea horizons.'
  },
  {
    id: 'poovar-backwaters',
    image: '/images/poovar-backwaters.webp',
    title: 'Poovar Backwaters & Boating',
    category: 'excursions',
    categoryLabel: 'Nearby Sights',
    caption: 'Enchanting Kerala backwaters with motorized boat cruises through dense mangrove estuaries leading to the golden sand beach and Neyyar river.'
  },
  {
    id: 'kalikesam-forest-river',
    image: '/images/kalikesam-forest.jpeg',
    title: 'Kalikesam Forest & River',
    category: 'excursions',
    categoryLabel: 'Nearby Sights',
    caption: 'Lush tropical evergreen reserve forest tucked within the Western Ghats with pristine natural stream waters, forest walking trails, and sacred shrines.'
  },
  {
    id: 'sanguthurai-beach',
    image: '/images/sanguthurai-beach.jpg',
    title: 'Sanguthurai Beach',
    category: 'excursions',
    categoryLabel: 'Nearby Sights',
    caption: 'A serene coastline famous for its iconic white conch shell monument, golden sands, soothing sea breeze, and sweeping Indian Ocean horizons.'
  },
  {
    id: 'sothavilai-beach',
    image: '/images/sothavilai-beach.jpg',
    title: 'Sothavilai Beach',
    category: 'excursions',
    categoryLabel: 'Nearby Sights',
    caption: 'One of Tamil Nadu’s longest natural beaches with soft golden sands, shallow waters, thatched resting umbrellas, and stunning sunset views.'
  },
  {
    id: 'kanyakumari-monuments',
    image: '/images/kanyakumari-rock.jpeg',
    title: 'Vivekananda Rock & Thiruvalluvar Statue',
    category: 'excursions',
    categoryLabel: 'Nearby Sights',
    caption: 'Iconic offshore monuments sitting at the confluence of the Indian Ocean, Arabian Sea, and Bay of Bengal at the southernmost tip of mainland India.'
  },
  {
    id: 'suchindram-temple',
    image: '/images/suchindram-temple.jpg',
    title: 'Suchindram Thanumalayan Temple',
    category: 'excursions',
    categoryLabel: 'Nearby Sights',
    caption: 'Famous 17th-century Dravidian architectural masterpiece dedicated to the Trinity (Shiva, Vishnu, and Brahma), renowned for musical pillars and grand temple tank.'
  }
];

export default function GalleryPage({ onNavigateHome, onNavigateRooms }) {
  const [activeTab, setActiveTab] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = useMemo(() => {
    if (activeTab === 'all') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeTab);
  }, [activeTab]);

  const tabs = useMemo(() => [
    { id: 'all', label: `All Photos (${GALLERY_ITEMS.length})`, icon: Camera },
    { id: 'rooms', label: `Rooms & Suites (${GALLERY_ITEMS.filter(i => i.category === 'rooms').length})`, icon: BedDouble },
    { id: 'spaces', label: `Verandas & Spaces (${GALLERY_ITEMS.filter(i => i.category === 'spaces').length})`, icon: Trees },
    { id: 'excursions', label: `Nearby Excursions (${GALLERY_ITEMS.filter(i => i.category === 'excursions').length})`, icon: Compass }
  ], []);

  const handleNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
    }
  }, [lightboxIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    }
  }, [lightboxIndex, filteredItems.length]);

  // Lightbox keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleNext, handlePrev]);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#222623] pt-24 sm:pt-28 pb-24">
      {/* Top Header & Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-8 sm:mb-12">
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#4D5A50] hover:text-[#1F2421] transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={1.5} />
            <span>Back to Home</span>
          </button>

          <button
            onClick={onNavigateRooms}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium text-[#3A4B3D] bg-white border border-[#EAE5DB] hover:bg-[#F5F2EB] transition-all shadow-xs cursor-pointer"
          >
            <span>View Room Rates</span>
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={subtleFadeUp}
          className="text-left max-w-3xl"
        >
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#5D645E] mb-2 block">
            VISUAL JOURNAL
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1F2421] leading-tight mb-4">
            Glimpses of Zion Inn
          </h1>
          <p className="text-sm sm:text-base text-[#4F5751] font-normal leading-relaxed">
            Sun-drenched verandas, handcrafted teakwood furnishings, blooming garden pathways, and the tranquil pace of village life in Neyyoor, Kanyakumari.
          </p>
        </motion.div>

        {/* Filter Pills with animated active indicator */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-8 flex flex-wrap items-center gap-2"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#FBF9F5]'
                    : 'bg-white text-[#3A423C] border border-[#EAE5DB] hover:bg-[#F5F2EB]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeGalleryTabPill"
                    className="absolute inset-0 bg-[#3A4B3D] rounded-full shadow-xs -z-0"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>{tab.label}</span>
                </span>
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Gallery Grid with smooth tab transition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 min-h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.28, 
                  delay: Math.min(index * 0.035, 0.16), 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                onClick={() => setLightboxIndex(index)}
                className="group relative rounded-3xl overflow-hidden bg-white border border-[#EAE5DB] shadow-xs hover:shadow-md cursor-pointer transition-all duration-300 flex flex-col"
              >
                {/* Photo Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Expand icon pill */}
                  <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-[#1F2421] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                    <Maximize2 className="w-4 h-4" strokeWidth={1.5} />
                  </div>

                  {/* Category Pill */}
                  <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-white/90 backdrop-blur-md text-[#3A4B3D]">
                      {item.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Caption Bar */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <h3 className="font-editorial text-lg sm:text-xl font-medium text-[#1F2421] mb-1 group-hover:text-[#3A4B3D] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#5D645E] leading-relaxed line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-16 sm:mt-24">
        <div className="bg-[#3A4B3D] text-[#FBF9F5] rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="max-w-xl text-left">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-emerald-200/90 block mb-2">
              EXPERIENCE THE SANCTUARY
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal mb-2 leading-tight">
              Ready to unwind at Zion Inn?
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
              Choose your sanctuary room, check live dates, and reserve directly with the host family for the best local rates.
            </p>
          </div>

          <button
            onClick={onNavigateRooms}
            className="px-6 py-3 rounded-full bg-[#FBF9F5] text-[#1F2421] text-xs sm:text-sm font-semibold hover:bg-white active:scale-[0.98] transition-all shadow-xs whitespace-nowrap cursor-pointer"
          >
            Explore Rooms & Check Rates
          </button>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-5 right-5 sm:top-8 sm:right-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-50"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer z-50"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer z-50"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
            </button>

            {/* Modal Content */}
            <div 
              className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden max-h-[72vh] shadow-2xl border border-white/10 bg-black">
                <img
                  src={filteredItems[lightboxIndex].image}
                  alt={filteredItems[lightboxIndex].title}
                  className="w-auto h-auto max-h-[72vh] max-w-full object-contain mx-auto"
                />
              </div>

              {/* Lightbox Information Bar */}
              <div className="mt-4 text-center max-w-2xl px-4">
                <div className="flex items-center justify-center gap-3 text-xs text-white/60 mb-1">
                  <span>{filteredItems[lightboxIndex].categoryLabel}</span>
                  <span>•</span>
                  <span>{lightboxIndex + 1} of {filteredItems.length}</span>
                </div>
                <h3 className="font-editorial text-xl sm:text-2xl text-white font-medium">
                  {filteredItems[lightboxIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 mt-1 leading-relaxed">
                  {filteredItems[lightboxIndex].caption}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

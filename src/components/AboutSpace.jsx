import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function AboutSpace({ onOpenStory }) {
  return (
    <section id="about" className="px-4 sm:px-8 max-w-7xl mx-auto py-12 sm:py-20 border-t border-[#EAE5DB]/60">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left Column: Description */}
        <div className="lg:col-span-6 flex flex-col items-start text-left transition-all duration-500">

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3A4B3D]/10 text-xs font-semibold text-[#3A4B3D] mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" strokeWidth={2} />
            <span>Ministry of Tourism Approved</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1F2421] leading-[1.15] mb-3">
            A Peaceful Homestay in Neyyoor for Families &amp; Travelers
          </h2>
          <p className="font-editorial italic text-base sm:text-lg text-[#3A4B3D] mb-4">
            More than just a stay, it's a feeling.
          </p>

          <p className="text-base sm:text-lg text-[#5D645E] leading-relaxed mb-8">
            Starting from ₹1,000 per night with our two kids stay free policy, Zion Inn is a family-run retreat in Neyyoor crafted for comfort and peace. Situated just 750 m from Eraniel Railway Station, guests enjoy handcrafted king beds, breezy verandas, and quick access to Padmanabhapuram Palace (6.9 km) and Muttom Beach (11.6 km).
          </p>

          <button
            onClick={onOpenStory}
            className="px-6 py-2.5 rounded-full border border-[#3A4B3D] text-[#3A4B3D] text-sm font-medium hover:bg-[#3A4B3D] hover:text-[#FBF9F5] active:scale-[0.98] transition-all duration-200"
          >
            Our Story
          </button>
        </div>

        {/* Right Column: Image with Typography Overlay */}
        <div className="lg:col-span-6 relative transition-all duration-500">
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[#EAE5DB] bg-[#EAE5DB]/30 aspect-[4/3] group">
            <img 
              src="/images/the-space.webp" 
              alt="Zion Inn veranda and garden courtyard" 
              width="800"
              height="533"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              loading="lazy"
              decoding="async"
            />
            {/* Subtle Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/20 pointer-events-none" />

            {/* Typography Overlay: Peaceful / Comfortable / Personal */}
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8 glass-panel px-5 py-4 rounded-2xl shadow-md border border-[#EAE5DB] text-right pointer-events-none">
              <span className="font-editorial italic text-lg sm:text-xl text-[#1F2421] block leading-tight">
                Peaceful
              </span>
              <span className="font-editorial italic text-lg sm:text-xl text-[#1F2421] block leading-tight mt-1">
                Comfortable
              </span>
              <span className="font-editorial italic text-lg sm:text-xl text-[#1F2421] block leading-tight mt-1">
                Personal
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

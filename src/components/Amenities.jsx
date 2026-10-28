import React from 'react';
import { motion } from 'framer-motion';
import {
  Wifi,
  DoorOpen,
  Car,
  Zap,
  Sparkles,
  Trees
} from 'lucide-react';
import { subtleFadeUp } from '../utils/animations';
import { AMENITIES_LIST } from '../data/homestayData';

const iconMap = {
  Wifi: Wifi,
  DoorOpen: DoorOpen,
  Car: Car,
  Sparkles: Sparkles,
  Zap: Zap,
  Trees: Trees
};

export default function Amenities() {
  return (
    <section id="amenities" className="px-4 sm:px-8 max-w-7xl mx-auto py-12 sm:py-20 border-t border-[#EAE5DB]/60">
      {/* Section Header */}
      <motion.div
        className="text-left mb-8 sm:mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={subtleFadeUp}
      >
        <span className="text-xs uppercase tracking-[0.16em] font-semibold text-[#3A4B3D] block mb-2">
          Comfort &amp; Convenience
        </span>
        <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1F2421] mb-3">
          Homestay Amenities: High-Speed Fiber Wi-Fi, 24/7 Power &amp; Gated Parking
        </h2>
        <p className="text-sm sm:text-base text-[#5D645E] max-w-2xl leading-relaxed">
          Everything you need for a restful stay in Neyyoor. Enjoy uninterrupted power backup, dual-band fiber internet, private verandas, secure on-premises parking, and tranquil flowering gardens.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        {/* Left Column: 6 Amenity Cards Grid */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
          {AMENITIES_LIST.map((item, index) => {
            const IconComponent = iconMap[item.iconName] || Wifi;
            return (
              <motion.div
                key={item.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1.0] }
                  }
                }}
                className="bg-[#F5F2EB] p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#EAE5DB] hover:border-[#3A4B3D]/30 transition-all duration-300 flex flex-col items-center justify-center text-center group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-[#EAE5DB] flex items-center justify-center text-[#3A4B3D] mb-3.5 group-hover:scale-105 transition-transform">
                  <IconComponent className="w-6 h-6 text-[#3A4B3D]" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-semibold text-[#1F2421] mb-1">
                  {item.name}
                </h3>
                <p className="text-[11px] text-[#5D645E] leading-normal line-clamp-2">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Cozy Window Photo with Quote - increased top height */}
        <motion.div
          className="lg:col-span-5 relative w-full h-full min-h-[350px] lg:min-h-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={subtleFadeUp}
        >
          <div className="relative lg:absolute lg:-top-20 lg:bottom-0 lg:left-0 lg:right-0 w-full h-[380px] lg:h-auto rounded-3xl overflow-hidden shadow-lg border border-[#EAE5DB] bg-[#EAE5DB]/30 group">
            <img
              src="/images/simple-comforts.webp"
              alt="Homestay cozy chair with sunlight and plants"
              width="545"
              height="730"
              decoding="async"
              className="w-full h-full object-cover object-[center_12%] transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Subtle Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent pointer-events-none" />

            {/* Quote Overlay at bottom */}
            <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6 text-left pointer-events-none">
              <p className="font-editorial italic text-2xl sm:text-3xl text-white/95 leading-tight drop-shadow-sm">
                Simple comforts.
              </p>
              <p className="font-editorial italic text-2xl sm:text-3xl text-white/95 leading-tight drop-shadow-sm mt-0.5">
                Greater moments.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

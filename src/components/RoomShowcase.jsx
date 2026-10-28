import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BedDouble, Wifi, DoorOpen, Bath } from 'lucide-react';
import { subtleFadeUp } from '../utils/animations';

export default function RoomShowcase({ rooms, onSelectRoom, onQuickInquire, onViewAllRooms }) {
  const isTwoRooms = rooms.length === 2;

  return (
    <section id="rooms" className="px-4 sm:px-8 max-w-7xl mx-auto py-12 sm:py-20 border-t border-[#EAE5DB]/60">
      {/* Section Header */}
      <motion.div 
        className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 text-left"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={subtleFadeUp}
      >
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#5D645E] mb-2 block">
            ACCOMMODATION
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1F2421]">
            Our Rooms
          </h2>
        </div>

        <button 
          onClick={onViewAllRooms}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#3A4B3D] hover:text-[#2D3B30] mt-3 sm:mt-0 group cursor-pointer"
        >
          <span>Explore all room details & specs</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </button>
      </motion.div>

      {/* Rooms Grid: Balanced 2-column on tablet/desktop when 2 rooms exist */}
      <div className={`grid grid-cols-1 ${isTwoRooms ? 'md:grid-cols-2 max-w-5xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6 sm:gap-8`}>
        {rooms.map((room, index) => (
          <motion.div
            key={room.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1.0] }
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`View full details for ${room.name}`}
            className="flex flex-col bg-white rounded-3xl overflow-hidden border border-[#EAE5DB] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:border-[#3A4B3D]/30 hover:-translate-y-1 transition-all duration-300 group cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#3A4B3D]"
            onClick={() => onSelectRoom(room)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectRoom(room);
              }
            }}
          >
            {/* Room Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#EAE5DB]/40">
              <img 
                src={room.image} 
                alt={room.name} 
                width="800"
                height="500"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Top badges */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide backdrop-blur-md shadow-xs ${
                  room.status === 'Available'
                    ? 'bg-emerald-600/90 text-white'
                    : room.status === 'Limited'
                    ? 'bg-amber-600/90 text-white'
                    : 'bg-stone-700/90 text-white'
                }`}>
                  {room.status}
                </span>

                <span className="glass-panel px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#1F2421] shadow-xs">
                  {room.roomType === 'ac' ? 'Air Conditioned' : 'Natural Breeze'}
                </span>
              </div>

              {/* Bottom right: Size tag */}
              <div className="absolute bottom-3 right-3 glass-panel px-2.5 py-0.5 rounded-full text-[11px] font-medium text-[#1F2421] shadow-xs">
                {room.size || '180 sq.ft'}
              </div>
            </div>

            {/* Room Details */}
            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-[#1F2421] group-hover:text-[#3A4B3D] transition-colors">
                    {room.name}
                  </h3>
                  <span className="text-xs text-[#6B726C] font-medium mt-1">
                    {room.view}
                  </span>
                </div>

                <p className="text-xs text-[#5D645E] line-clamp-2 leading-relaxed mb-4">
                  {room.description}
                </p>

                {/* Key Amenity / Feature Pills */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F5F2EB] text-[#3A423C] text-[11px] font-medium">
                    <BedDouble className="w-3.5 h-3.5 text-[#3A4B3D]" strokeWidth={1.5} />
                    {room.bed || 'King Bed'}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F5F2EB] text-[#3A423C] text-[11px] font-medium">
                    <Wifi className="w-3.5 h-3.5 text-[#3A4B3D]" strokeWidth={1.5} />
                    Free Wi-Fi
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F5F2EB] text-[#3A423C] text-[11px] font-medium">
                    <DoorOpen className="w-3.5 h-3.5 text-[#3A4B3D]" strokeWidth={1.5} />
                    Private Balcony
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F5F2EB] text-[#3A423C] text-[11px] font-medium">
                    <Bath className="w-3.5 h-3.5 text-[#3A4B3D]" strokeWidth={1.5} />
                    Attached Bath
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-100/80">
                    Two kids go free
                  </span>
                </div>
              </div>

              {/* Bottom Price & Action Row */}
              <div className="mt-4 pt-4 border-t border-[#EAE5DB]/80 flex items-center justify-between gap-4">
                <div className="flex flex-col text-left">
                  <span className="text-[10px] uppercase tracking-wider text-[#7A827B] font-semibold leading-none mb-0.5">
                    Starting from
                  </span>
                  <div className="flex items-baseline gap-1 text-[#1F2421]">
                    <span className="font-editorial text-2xl sm:text-3xl font-semibold leading-none">
                      ₹{room.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-[#5D645E]">/ night</span>
                  </div>
                  <span className="text-[11px] text-[#3A4B3D] font-medium mt-0.5">
                    2 Adults • Two kids go free
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectRoom(room);
                    }}
                    className="hidden sm:inline-flex px-3.5 py-2.5 rounded-full border border-[#D5CEBF] text-[#2C322D] hover:bg-[#F5F2EB] text-xs font-medium transition-colors"
                  >
                    Details
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickInquire(room);
                    }}
                    className="px-5 py-2.5 rounded-full bg-[#3A4B3D] text-[#FBF9F5] text-xs sm:text-sm font-medium hover:bg-[#2D3B30] active:scale-[0.98] transition-all duration-200 text-center shadow-xs"
                  >
                    Quick Inquire
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

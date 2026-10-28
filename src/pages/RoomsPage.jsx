import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BedDouble, 
  Users, 
  Maximize2, 
  Check, 
  Calendar, 
  MessageCircle, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  Wifi, 
  Zap, 
  Car, 
  DoorOpen,
  Trees,
  Info
} from 'lucide-react';
import { subtleFadeUp } from '../utils/animations';
import { POLICIES, CONTACT_INFO } from '../data/homestayData';

export default function RoomsPage({ 
  rooms, 
  onSelectRoom, 
  onNavigateHome,
  checkInDate, 
  setCheckInDate, 
  checkOutDate, 
  setCheckOutDate, 
  guestCount, 
  setGuestCount: _setGuestCount
}) {
  const [selectedFilter, setSelectedFilter] = useState('all'); // 'all' | 'ac' | 'non-ac'
  const [activeGalleryIndices, setActiveGalleryIndices] = useState({});

  // Calculate nights
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 2;
    try {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    } catch {
      return 2;
    }
  };

  const nights = calculateNights();

  // Filter rooms based on selection
  const filteredRooms = rooms.filter((room) => {
    if (selectedFilter === 'ac') return room.roomType === 'ac';
    if (selectedFilter === 'non-ac') return room.roomType === 'non-ac';
    return true;
  });

  const handleThumbnailClick = (roomId, index) => {
    setActiveGalleryIndices((prev) => ({
      ...prev,
      [roomId]: index
    }));
  };

  const handleWhatsAppBooking = (room) => {
    const totalEst = room.price * nights;
    const message = encodeURIComponent(
      `Hello Zion Inn Homestay! 🌿\n\nI would like to inquire about reserving the *${room.name}*:\n` +
      `• Check-in: ${checkInDate || 'Not specified'}\n` +
      `• Check-out: ${checkOutDate || 'Not specified'}\n` +
      `• Duration: ${nights} ${nights === 1 ? 'night' : 'nights'}\n` +
      `• Guests: ${guestCount} ${guestCount === 1 ? 'Guest' : 'Guests'}\n` +
      `• Estimated Total: ₹${totalEst.toLocaleString('en-IN')}\n\n` +
      `Could you please confirm availability and advance payment details? Thank you!`
    );
    window.location.assign(`https://api.whatsapp.com/send?phone=${CONTACT_INFO.whatsapp}&text=${message}`);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#222623] pt-24 sm:pt-28 pb-20">
      {/* Top Breadcrumb & Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-8 sm:mb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#4D5A50] hover:text-[#1F2421] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={1.5} />
            <span>Back to Home</span>
          </button>

        </div>

        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={subtleFadeUp}
          className="text-left max-w-3xl"
        >
          <div className="flex flex-wrap items-center gap-2.5 mb-2">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#5D645E]">
              LIVING SPACES & ROOMS
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-[11px] font-semibold text-emerald-800 border border-emerald-200/80">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" strokeWidth={2} />
              Ministry of Tourism Approved
            </span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1F2421] leading-tight mb-4">
            Sanctuary Suites & Veranda Rooms
          </h1>
          <p className="text-sm sm:text-base text-[#4F5751] font-normal leading-relaxed">
            Immerse yourself in the tranquil breeze of Neyyoor. Each room is designed with handcrafted teakwood, soaring ceilings, soft cotton linens, and private veranda views of tropical greenery.
          </p>
        </motion.div>

        {/* Live Filter & Date Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#EAE5DB] shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4"
        >
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#5D645E] mr-1 hidden sm:inline">Filter:</span>
            {[
              { id: 'all', label: 'All Rooms (2)' },
              { id: 'ac', label: 'AC Rooms' },
              { id: 'non-ac', label: 'Non-AC Rooms' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedFilter === filter.id
                    ? 'bg-[#3A4B3D] text-[#FBF9F5] shadow-xs'
                    : 'bg-[#F5F2EB] text-[#3A423C] hover:bg-[#EAE5DB]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Quick Date & Guests Preview */}
          <div className="flex flex-wrap items-center gap-2.5 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#EAE5DB] w-full lg:w-auto">
            <div className="flex flex-wrap items-center gap-1.5 bg-[#F5F2EB] px-3 py-1.5 rounded-xl border border-[#EAE5DB]/80 text-xs text-[#222623] max-w-full">
              <Calendar className="w-3.5 h-3.5 text-[#3A4B3D] shrink-0" strokeWidth={1.5} />
              <input
                id="rooms-checkin-date"
                name="checkInDate"
                aria-label="Check-in Date"
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="bg-transparent border-none p-0 text-xs font-medium focus:outline-none cursor-pointer max-w-[105px] sm:max-w-none"
              />
              <span className="text-[#6B726C]">–</span>
              <input
                id="rooms-checkout-date"
                name="checkOutDate"
                aria-label="Check-out Date"
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="bg-transparent border-none p-0 text-xs font-medium focus:outline-none cursor-pointer max-w-[105px] sm:max-w-none"
              />
              <span className="text-[#4B5E4F] font-semibold text-[11px] ml-0.5">({nights} {nights === 1 ? 'nt' : 'nts'})</span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#F5F2EB] px-3 py-1.5 rounded-xl border border-[#EAE5DB]/80 text-xs font-medium text-[#222623]">
              <Users className="w-3.5 h-3.5 text-[#3A4B3D]" strokeWidth={1.5} />
              <span>{guestCount} Guests</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Section: Detailed Room Showcase Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 sm:space-y-16">
        {filteredRooms.map((room) => {
          const activeIndex = activeGalleryIndices[room.id] || 0;
          const currentImage = room.gallery?.[activeIndex] || room.image;
          const totalEstimate = room.price * nights;

          return (
            <motion.div
              key={room.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={subtleFadeUp}
              className="bg-white rounded-3xl sm:rounded-[32px] border border-[#EAE5DB] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Left Column: Interactive Photo Gallery */}
                <div className="lg:col-span-6 p-4 sm:p-6 flex flex-col justify-between bg-[#FAF8F5]">
                  {/* Main Display Image */}
                  <div className="relative aspect-[4/3] rounded-2xl sm:rounded-2xl overflow-hidden bg-stone-200 border border-[#EAE5DB]">
                    <img
                      src={currentImage}
                      alt={`${room.name} interior at Zion Inn`}
                      className="w-full h-full object-cover transition-all duration-500"
                    />

                    {/* Badge */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-xs ${
                        room.status === 'Available'
                          ? 'bg-[#3A4B3D]/90 text-white'
                          : 'bg-[#C17A44]/90 text-white'
                      }`}>
                        {room.status}
                      </span>
                      {room.featured && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-[#3A4B3D] shadow-xs">
                          Guest Favorite
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[11px] font-medium">
                      {activeIndex + 1} / {room.gallery?.length || 1}
                    </div>
                  </div>

                  {/* Thumbnail Row */}
                  {room.gallery && room.gallery.length > 1 && (
                    <div className="grid grid-cols-4 gap-2.5 mt-3 sm:mt-4">
                      {room.gallery.map((thumb, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleThumbnailClick(room.id, idx)}
                          className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                            activeIndex === idx 
                              ? 'border-[#3A4B3D] ring-2 ring-[#3A4B3D]/20 scale-98' 
                              : 'border-transparent opacity-75 hover:opacity-100'
                          }`}
                        >
                          <img 
                            src={thumb} 
                            alt={`${room.name} interior photo ${idx + 1}`} 
                            className="w-full h-full object-cover" 
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Column: Room Details, Specs & Booking */}
                <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    {/* Room Category & View */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase tracking-wider text-[#5D645E] font-semibold">
                        {room.view} • Ground & Veranda
                      </span>
                      <span className="text-xs font-medium text-[#4D5A50] bg-[#F5F2EB] px-2.5 py-1 rounded-full border border-[#EAE5DB]">
                        {room.size}
                      </span>
                    </div>

                    {/* Room Name */}
                    <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#1F2421] mb-3">
                      {room.name}
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-[#4A534C] leading-relaxed mb-6 font-normal">
                      {room.description}
                    </p>

                    {/* Key Specifications Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-[#FBF9F5] border border-[#EAE5DB]/80 text-xs">
                      <div className="flex items-center gap-2.5 text-[#333C35]">
                        <BedDouble className="w-4 h-4 text-[#3A4B3D] shrink-0" strokeWidth={1.5} />
                        <div>
                          <p className="text-[10px] text-[#717872] uppercase">Bedding</p>
                          <p className="font-semibold">{room.bed}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 text-[#333C35]">
                        <Users className="w-4 h-4 text-[#3A4B3D] shrink-0" strokeWidth={1.5} />
                        <div>
                          <p className="text-[10px] text-[#717872] uppercase">Capacity</p>
                          <p className="font-semibold">2 Adults (Two kids go free)</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 text-[#333C35] col-span-2 sm:col-span-1">
                        <Maximize2 className="w-4 h-4 text-[#3A4B3D] shrink-0" strokeWidth={1.5} />
                        <div>
                          <p className="text-[10px] text-[#717872] uppercase">Space</p>
                          <p className="font-semibold">{room.size}</p>
                        </div>
                      </div>
                    </div>

                    {/* Included Room Features Checklist */}
                    <div className="mb-6">
                      <p className="text-xs uppercase tracking-wider font-semibold text-[#5D645E] mb-3">
                        In-Room Amenities
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#2A312B]">
                        {room.amenities.map((amenity, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-[#3A4B3D]/10 text-[#3A4B3D] flex items-center justify-center shrink-0">
                              <Check className="w-2.5 h-2.5" strokeWidth={2} />
                            </div>
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Call to Action Bar */}
                  <div className="pt-6 border-t border-[#EAE5DB] mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-editorial text-3xl font-medium text-[#1F2421]">
                          ₹{room.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-[#5D645E]">/ night</span>
                      </div>
                      <p className="text-[11px] text-[#3A4B3D] font-medium mt-0.5">
                        Rate for 2 Adults • Two kids go free
                      </p>
                      <p className="text-[11px] text-[#717872] mt-0.5">
                        ₹{totalEstimate.toLocaleString('en-IN')} total for {nights} {nights === 1 ? 'night' : 'nights'} (incl. taxes)
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => onSelectRoom(room)}
                        className="px-4 py-2.5 rounded-full border border-[#EAE5DB] text-xs font-medium text-[#2C332E] hover:bg-[#F5F2EB] transition-colors"
                      >
                        More Info
                      </button>

                      <button
                        type="button"
                        onClick={() => handleWhatsAppBooking(room)}
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#3A4B3D] text-[#FBF9F5] text-xs font-semibold hover:bg-[#2D3B30] active:scale-[0.98] transition-all shadow-xs"
                      >
                        <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                        <span>Reserve via WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Comparison Matrix Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-16 sm:mt-24">
        <div className="text-left mb-8">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#5D645E] mb-2 block">
            ROOM COMPARISON
          </span>
          <div className="flex items-center justify-between">
            <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#1F2421]">
              Find the right sanctuary for your visit
            </h2>
            <span className="text-[11px] text-[#717872] sm:hidden font-medium">
              ← Scroll to compare →
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#EAE5DB] overflow-x-auto shadow-xs">
          <table className="w-full text-left border-collapse min-w-[620px]">
            <thead>
              <tr className="border-b border-[#EAE5DB] bg-[#FAF8F5]">
                <th className="py-4 px-6 text-xs font-semibold text-[#5D645E] uppercase tracking-wider">Features</th>
                {rooms.map((r) => (
                  <th key={r.id} className="py-4 px-6 text-sm font-editorial font-semibold text-[#1F2421]">
                    {r.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-xs text-[#333C35] divide-y divide-[#EAE5DB]/70">
              <tr>
                <td className="py-3.5 px-6 font-medium text-[#5D645E]">Nightly Rate</td>
                {rooms.map((r) => (
                  <td key={r.id} className="py-3.5 px-6 font-bold text-[#1F2421]">
                    ₹{r.price.toLocaleString('en-IN')}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-medium text-[#5D645E]">Bedding Type</td>
                {rooms.map((r) => (
                  <td key={r.id} className="py-3.5 px-6">{r.bed}</td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-medium text-[#5D645E]">Room Area</td>
                {rooms.map((r) => (
                  <td key={r.id} className="py-3.5 px-6">{r.size}</td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-medium text-[#5D645E]">Accreditation</td>
                {rooms.map((r) => (
                  <td key={r.id} className="py-3.5 px-6 font-medium text-emerald-800">
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      Ministry of Tourism Approved
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-medium text-[#5D645E]">Capacity & Kids Policy</td>
                {rooms.map((r) => (
                  <td key={r.id} className="py-3.5 px-6 font-medium text-[#222623]">2 Adults • Two kids go free</td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-medium text-[#5D645E]">Private Balcony</td>
                {rooms.map((r) => (
                  <td key={r.id} className="py-3.5 px-6">
                    <Check className="w-4 h-4 text-[#3A4B3D]" strokeWidth={2} />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-medium text-[#5D645E]">Attached Bathroom</td>
                {rooms.map((r) => (
                  <td key={r.id} className="py-3.5 px-6">
                    <Check className="w-4 h-4 text-[#3A4B3D]" strokeWidth={2} />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-[#5D645E]">Reservation</td>
                {rooms.map((r) => (
                  <td key={r.id} className="py-4 px-6">
                    <button
                      onClick={() => handleWhatsAppBooking(r)}
                      className="px-4 py-2 rounded-full bg-[#3A4B3D] text-[#FBF9F5] text-xs font-semibold hover:bg-[#2D3B30] transition-colors"
                    >
                      Book Now
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Included Stay Perks Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-16 sm:mt-24">
        <div className="text-left mb-8">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#5D645E] mb-2 block">
            HOMESTAY STANDARDS
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#1F2421]">
            Included with every room at Zion Inn
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: Sparkles,
              title: 'Amenities',
              desc: 'Complementary drinking water, brush, shampoo. Etc.'
            },
            {
              icon: Wifi,
              title: 'Dual-Band Fiber Wi-Fi',
              desc: 'High-speed internet capable of video streaming and remote work from room or veranda.'
            },
            {
              icon: Zap,
              title: '24/7 Power Security',
              desc: 'Continuous inverter & solar backup ensures uninterrupted lighting, fans, and device charging.'
            },
            {
              icon: DoorOpen,
              title: 'Private Balconies',
              desc: 'Breathe fresh morning air with views of flowering greenery.'
            },
            {
              icon: Car,
              title: 'Private On-Site Parking',
              desc: 'Secure gated space for guest cars and two-wheelers inside the homestay premises.'
            },
            {
              icon: Trees,
              title: 'Garden',
              desc: 'Lush outdoor greenery and peaceful open spaces to relax'
            }
          ].map((perk, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-[#EAE5DB] shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-[#F5F2EB] flex items-center justify-center text-[#3A4B3D] mb-4">
                <perk.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold text-[#1F2421] mb-1.5">{perk.title}</h3>
              <p className="text-xs text-[#5D645E] leading-relaxed">{perk.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* House Policies & Guest Information */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-16 sm:mt-24">
        <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border border-[#EAE5DB]">
          <div className="flex items-center gap-2 mb-3 text-[#3A4B3D]">
            <Info className="w-4 h-4" strokeWidth={1.5} />
            <span className="text-xs uppercase tracking-wider font-semibold">House Guidelines & Stay Policies</span>
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl text-[#1F2421] mb-6">
            Help us maintain a peaceful sanctuary
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-[#3A423C]">
            <div>
              <p className="font-semibold text-[#1F2421] mb-1">Check-in / Check-out</p>
              <p>Check-in: 2:00 PM – 10:00 PM</p>
              <p>Check-out: By 11:00 AM</p>
              <p className="text-[11px] text-[#717872] mt-1">Early check-in subject to room availability.</p>
            </div>

            <div>
              <p className="font-semibold text-[#1F2421] mb-1">Peaceful Hours</p>
              <p>Quiet hours observed from 10:00 PM to 7:00 AM to preserve our quiet residential neighborhood.</p>
            </div>

            <div>
              <p className="font-semibold text-[#1F2421] mb-1">Cancellation Policy</p>
              <p>{POLICIES.cancellation}</p>
              <p className="text-[11px] text-[#717872] mt-1">50% advance to confirm your booking.</p>
            </div>

            <div>
              <p className="font-semibold text-[#1F2421] mb-1">Host Assistance</p>
              <p>Caretaker on-site 24/7 for luggage assistance, local cab booking, and travel recommendations.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

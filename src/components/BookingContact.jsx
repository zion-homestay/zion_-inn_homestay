import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Check 
} from 'lucide-react';
import { subtleFadeUp } from '../utils/animations';
import { CONTACT_INFO } from '../data/homestayData';

export default function BookingContact({ 
  rooms, 
  selectedRoom, 
  checkInDate, 
  checkOutDate, 
  guestCount 
}) {
  const [guestName, setGuestName] = useState('');
  const [selectedRoomIdOverride, setSelectedRoomIdOverride] = useState(null);
  const [userEditedMessage, setUserEditedMessage] = useState(null);

  const activeRoomId = selectedRoomIdOverride || selectedRoom?.id || 'ac-room';
  const activeRoom = rooms.find(r => r.id === activeRoomId) || rooms[0];

  const formatDateStr = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const datesStr = (checkInDate && checkOutDate)
    ? `from ${formatDateStr(checkInDate)} to ${formatDateStr(checkOutDate)}`
    : 'from Oct 12 to Oct 14';

  const countStr = guestCount ? `${guestCount} guests` : '2 guests';
  const nameGreeting = guestName.trim() ? ` My name is ${guestName.trim()}.` : '';
  const generatedMessage = `Hi Zion Inn, I'd like to check availability for the ${activeRoom?.name || 'AC Room'} ${datesStr} for ${countStr}.${nameGreeting}`;

  const currentMessage = userEditedMessage !== null ? userEditedMessage : generatedMessage;

  const handleOpenWhatsApp = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const encoded = encodeURIComponent(currentMessage);
    window.location.href = `https://api.whatsapp.com/send?phone=${CONTACT_INFO.whatsappNumber}&text=${encoded}`;
  };

  const handleCallHost = () => {
    window.location.href = `tel:${CONTACT_INFO.phone1Raw}`;
  };

  return (
    <section id="contact" className="px-4 sm:px-8 max-w-7xl mx-auto py-12 sm:py-20 border-t border-[#EAE5DB]/60">
      {/* Section Header */}
      <motion.div 
        className="text-left mb-8 sm:mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={subtleFadeUp}
      >
        <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1F2421] mb-3">
          Ready to plan your stay?
        </h2>
        <p className="text-base sm:text-lg text-[#5D645E] max-w-2xl leading-relaxed">
          Message us on WhatsApp for instant confirmation or give us a call. We're happy to help!
        </p>

        {/* Action Pills (Mockup exact buttons) */}
        <div className="flex flex-wrap items-center gap-3.5 mt-6">
          <button
            onClick={handleOpenWhatsApp}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#3A4B3D] text-[#FBF9F5] text-xs sm:text-sm font-medium hover:bg-[#2D3B30] active:scale-[0.98] transition-all shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" strokeWidth={1.5} />
            <span>Chat on WhatsApp</span>
          </button>

          <button
            onClick={handleCallHost}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#EAE5DB] bg-white text-[#1F2421] text-xs sm:text-sm font-medium hover:bg-[#F5F2EB] active:scale-[0.98] transition-all shadow-xs"
          >
            <Phone className="w-4 h-4 text-[#3A4B3D]" strokeWidth={1.5} />
            <span>Call {CONTACT_INFO.phone1}</span>
          </button>
        </div>
      </motion.div>

      {/* Grid: Quick Booking Form + Map & Address */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left Column: Quick Booking Form Card (Mockup Style) */}
        <motion.div 
          className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE5DB] shadow-sm text-left flex flex-col justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={subtleFadeUp}
        >
          <div>
            <h3 className="font-editorial text-2xl font-medium text-[#1F2421] mb-1">
              Quick Booking
            </h3>
            <p className="text-xs text-[#5D645E] mb-6">
              Fill in your details and send directly via WhatsApp with zero hassle.
            </p>

            <form onSubmit={handleOpenWhatsApp} className="space-y-4">
              {/* Your Name */}
              <div>
                <label htmlFor="booking-guest-name" className="block text-xs font-semibold text-[#1F2421] mb-1.5 uppercase tracking-wider">
                  Your Name
                </label>
                <input
                  id="booking-guest-name"
                  name="name"
                  type="text"
                  aria-label="Your Name"
                  placeholder="John Doe"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EAE5DB] bg-[#FBF9F5] text-sm text-[#1F2421] placeholder:text-[#5D645E]/50 focus:outline-none focus:border-[#3A4B3D] focus:ring-1 focus:ring-[#3A4B3D] transition-all"
                />
              </div>

              {/* Room Choice */}
              <div>
                <label htmlFor="booking-room-select" className="block text-xs font-semibold text-[#1F2421] mb-1.5 uppercase tracking-wider">
                  Selected Room
                </label>
                <select
                  id="booking-room-select"
                  name="roomType"
                  aria-label="Select Room Type"
                  value={activeRoomId}
                  onChange={(e) => setSelectedRoomIdOverride(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EAE5DB] bg-[#FBF9F5] text-sm text-[#1F2421] focus:outline-none focus:border-[#3A4B3D] focus:ring-1 focus:ring-[#3A4B3D] transition-all cursor-pointer"
                >
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} — ₹{r.price.toLocaleString('en-IN')}/night ({r.view})
                    </option>
                  ))}
                </select>
              </div>

              {/* Message (optional) */}
              <div>
                <label htmlFor="booking-message-textarea" className="block text-xs font-semibold text-[#1F2421] mb-1.5 uppercase tracking-wider">
                  Message (optional)
                </label>
                <textarea
                  id="booking-message-textarea"
                  name="message"
                  aria-label="Special requests or message"
                  rows={3}
                  value={currentMessage}
                  onChange={(e) => setUserEditedMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EAE5DB] bg-[#FBF9F5] text-xs sm:text-sm text-[#1F2421] focus:outline-none focus:border-[#3A4B3D] focus:ring-1 focus:ring-[#3A4B3D] transition-all resize-none leading-relaxed"
                />
              </div>

              {/* Open WhatsApp Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#3A4B3D] text-[#FBF9F5] text-sm font-medium hover:bg-[#2D3B30] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" strokeWidth={1.5} />
                <span>Open WhatsApp</span>
              </button>
            </form>
          </div>

          <div className="mt-6 pt-4 border-t border-[#EAE5DB]/70 flex items-center justify-between text-[11px] text-[#5D645E]">
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              Direct host booking • No commission fees
            </span>
            <span>Avg reply: &lt; 15 mins</span>
          </div>
        </motion.div>

        {/* Right Column: Stylized Map & Contact Details Card */}
        <motion.div 
          className="lg:col-span-6 flex flex-col justify-between gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={subtleFadeUp}
        >
          {/* Stylized Google Map Preview Widget */}
          <div className="relative rounded-3xl overflow-hidden border border-[#EAE5DB] shadow-sm bg-stone-100 aspect-[16/9] group">
            {/* Embedded interactive styled OpenStreetMap / Google Maps iframe */}
            <iframe
              title="Zion Inn Homestay Map"
              src="https://maps.google.com/maps?q=Neyyoor,+Kanyakumari+District,+Tamil+Nadu&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 filter saturate-80 contrast-95"
              loading="lazy"
            />
            {/* Overlay Pin Badge */}
            <div className="absolute top-4 left-4 glass-panel px-3.5 py-1.5 rounded-full text-xs font-medium text-[#1F2421] shadow flex items-center gap-1.5 pointer-events-none">
              <MapPin className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
              <span>Zion Inn Homestay, Neyyoor</span>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="bg-white p-6 rounded-3xl border border-[#EAE5DB] shadow-xs text-left">
            <div className="space-y-3.5 text-sm text-[#222623]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#3A4B3D] shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="font-semibold text-[#1F2421]">{CONTACT_INFO.name}</p>
                  <p className="text-xs text-[#5D645E]">{CONTACT_INFO.addressLine1}</p>
                  <p className="text-xs text-[#5D645E]">{CONTACT_INFO.addressLine2}</p>
                  <p className="text-[11px] text-[#5D645E]/80 mt-0.5">{CONTACT_INFO.landmark}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-[#EAE5DB]/70">
                <Phone className="w-4 h-4 text-[#3A4B3D] shrink-0" strokeWidth={1.5} />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                  <a href={`tel:${CONTACT_INFO.phone1Raw}`} className="hover:text-[#3A4B3D] font-medium">
                    {CONTACT_INFO.phone1}
                  </a>
                  <span className="text-[#5D645E]/40">•</span>
                  <a href={`tel:${CONTACT_INFO.phone2Raw}`} className="hover:text-[#3A4B3D] font-medium">
                    {CONTACT_INFO.phone2}
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-[#EAE5DB]/70">
                <a
                  href={CONTACT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Zion Inn Homestay on Google Maps"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3A4B3D] hover:underline group"
                >
                  <span>View Zion Inn Homestay on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

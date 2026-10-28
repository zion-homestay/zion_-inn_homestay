import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Navigation, 
  Train, 
  Plane, 
  Calendar, 
  Users, 
  CheckCircle2, 
  ChevronDown, 
  Compass,
  ShieldCheck
} from 'lucide-react';
import { subtleFadeUp } from '../utils/animations';
import { CONTACT_INFO, HOMESTAY_FAQS } from '../data/homestayData';

export default function ContactPage({ 
  onNavigateHome, 
  onNavigateRooms,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  guestCount,
  setGuestCount 
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    roomType: 'AC Room',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmitWhatsApp = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please enter your name and contact phone number.');
      return;
    }

    const message = encodeURIComponent(
      `Hello Zion Inn Homestay! 🌿\n\n` +
      `I would like to inquire about booking a stay:\n` +
      `• Name: ${formData.name}\n` +
      `• Phone: ${formData.phone}\n` +
      `• Preferred Room: ${formData.roomType}\n` +
      `• Check-in: ${checkInDate || 'Flexible'}\n` +
      `• Check-out: ${checkOutDate || 'Flexible'}\n` +
      `• Guests: ${guestCount}\n` +
      (formData.message ? `• Note / Request: ${formData.message}\n` : '') +
      `\nPlease share availability and room confirmation details. Thank you!`
    );

    window.location.href = `https://api.whatsapp.com/send?phone=${CONTACT_INFO.whatsapp}&text=${message}`;
    setFormSubmitted(true);
  };

  const FAQS = HOMESTAY_FAQS;

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#222623] pt-24 sm:pt-28 pb-24">
      {/* Top Breadcrumb & Header */}
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
            <span>View All Rooms</span>
          </button>
        </div>

        {/* Page Title */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={subtleFadeUp}
          className="text-left max-w-3xl"
        >
          <div className="flex flex-wrap items-center gap-2.5 mb-2">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#5D645E]">
              REACH OUT TO US
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-[11px] font-semibold text-emerald-800 border border-emerald-200/80">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" strokeWidth={2} />
              Ministry of Tourism Approved
            </span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1F2421] leading-tight mb-4">
            We'd Love to Welcome You
          </h1>
          <p className="text-sm sm:text-base text-[#4F5751] font-normal leading-relaxed">
            Have questions about room availability, family bookings, or travel directions? Reach out directly to the host family. We typically respond within minutes.
          </p>
        </motion.div>
      </div>

      {/* Main Grid: Contact Channels + Reservation Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Direct Communication Cards */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5 text-left">
            {/* WhatsApp Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EAE5DB] shadow-xs hover:border-[#3A4B3D]/30 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#3A4B3D] flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  Fastest Response (Avg &lt;15m)
                </span>
              </div>
              <h3 className="font-editorial text-2xl font-medium text-[#1F2421] mb-1">
                WhatsApp Chat
              </h3>
              <p className="text-xs text-[#5D645E] leading-relaxed mb-4">
                Chat directly with our host for quick room confirmations, photo queries, and custom dates.
              </p>
              <a
                href={`https://api.whatsapp.com/send?phone=${CONTACT_INFO.whatsapp}&text=Hello%20Zion%20Inn%20Homestay!%20I%20would%20like%20to%20inquire%20about%20room%20availability.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#3A4B3D] text-[#FBF9F5] text-xs font-semibold hover:bg-[#2D3B30] active:scale-[0.98] transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                <span>Message Host on WhatsApp</span>
              </a>
            </div>

            {/* Direct Phone Call */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EAE5DB] shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-[#F5F2EB] text-[#3A4B3D] flex items-center justify-center">
                  <Phone className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-editorial text-xl font-medium text-[#1F2421]">
                    Direct Phone Calls
                  </h3>
                  <p className="text-[11px] text-[#717872]">Available 8:00 AM – 10:00 PM</p>
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t border-[#EAE5DB]">
                <a
                  href={`tel:${CONTACT_INFO.phone1Raw}`}
                  className="flex items-center justify-between text-xs font-semibold text-[#1F2421] hover:text-[#3A4B3D] p-2 rounded-xl hover:bg-[#F5F2EB] transition-colors"
                >
                  <span>Primary: {CONTACT_INFO.phone1}</span>
                  <span className="text-[11px] font-normal text-[#5D645E]">Call →</span>
                </a>
                <a
                  href={`tel:${CONTACT_INFO.phone2Raw}`}
                  className="flex items-center justify-between text-xs font-semibold text-[#1F2421] hover:text-[#3A4B3D] p-2 rounded-xl hover:bg-[#F5F2EB] transition-colors"
                >
                  <span>Secondary: {CONTACT_INFO.phone2}</span>
                  <span className="text-[11px] font-normal text-[#5D645E]">Call →</span>
                </a>
              </div>
            </div>

            {/* Physical Location Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EAE5DB] shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-[#F5F2EB] text-[#3A4B3D] flex items-center justify-center">
                  <MapPin className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-editorial text-xl font-medium text-[#1F2421]">
                    Homestay Address
                  </h3>
                  <p className="text-[11px] text-[#717872]">Neyyoor, Kanyakumari District</p>
                </div>
              </div>
              <div className="text-xs text-[#4A534C] space-y-1 pt-2 border-t border-[#EAE5DB]">
                <p className="font-medium text-[#1F2421]">{CONTACT_INFO.addressLine1}</p>
                <p>{CONTACT_INFO.addressLine2}</p>
                <p className="text-[11px] text-[#717872] pt-1">
                  Landmark: {CONTACT_INFO.landmark}
                </p>
              </div>
              <a
                href={CONTACT_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#3A4B3D] hover:underline"
              >
                <Navigation className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Open in Google Maps →</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Booking Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl sm:rounded-[32px] p-6 sm:p-10 border border-[#EAE5DB] shadow-sm text-left">
              <div className="mb-6">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#5D645E] block mb-1">
                  RESERVATION INQUIRY
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl text-[#1F2421] font-normal">
                  Check Dates & Direct Rates
                </h2>
                <p className="text-xs sm:text-sm text-[#5D645E] mt-1">
                  Fill in your preferred dates below to generate an instant inquiry directly to the host.
                </p>
              </div>

              <form onSubmit={handleSubmitWhatsApp} className="space-y-4 sm:space-y-5">
                {/* Guest Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-full-name" className="block text-xs font-semibold text-[#2C332E] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      id="contact-full-name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Arun Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#FBF9F5] border border-[#EAE5DB] text-xs sm:text-sm text-[#1F2421] focus:outline-none focus:border-[#3A4B3D] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold text-[#2C332E] mb-1.5">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="e.g. +91 98470 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#FBF9F5] border border-[#EAE5DB] text-xs sm:text-sm text-[#1F2421] focus:outline-none focus:border-[#3A4B3D] transition-colors"
                    />
                  </div>
                </div>

                {/* Dates & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="contact-checkin-date" className="block text-xs font-semibold text-[#2C332E] mb-1.5">
                      Check-in Date
                    </label>
                    <div className="flex items-center gap-2 px-3.5 py-3 rounded-2xl bg-[#FBF9F5] border border-[#EAE5DB]">
                      <Calendar className="w-4 h-4 text-[#3A4B3D] shrink-0" strokeWidth={1.5} />
                      <input
                        id="contact-checkin-date"
                        name="checkInDate"
                        aria-label="Check-in Date"
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="bg-transparent border-none p-0 text-xs text-[#1F2421] font-medium focus:outline-none w-full cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-checkout-date" className="block text-xs font-semibold text-[#2C332E] mb-1.5">
                      Check-out Date
                    </label>
                    <div className="flex items-center gap-2 px-3.5 py-3 rounded-2xl bg-[#FBF9F5] border border-[#EAE5DB]">
                      <Calendar className="w-4 h-4 text-[#3A4B3D] shrink-0" strokeWidth={1.5} />
                      <input
                        id="contact-checkout-date"
                        name="checkOutDate"
                        aria-label="Check-out Date"
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="bg-transparent border-none p-0 text-xs text-[#1F2421] font-medium focus:outline-none w-full cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-guest-count" className="block text-xs font-semibold text-[#2C332E] mb-1.5">
                      Number of Guests
                    </label>
                    <div className="flex items-center gap-2 px-3.5 py-3 rounded-2xl bg-[#FBF9F5] border border-[#EAE5DB]">
                      <Users className="w-4 h-4 text-[#3A4B3D] shrink-0" strokeWidth={1.5} />
                      <select
                        id="contact-guest-count"
                        name="guestCount"
                        aria-label="Number of Guests"
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="bg-transparent border-none p-0 text-xs text-[#1F2421] font-medium focus:outline-none w-full cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Room Preference */}
                <div>
                  <label htmlFor="contact-room-type" className="block text-xs font-semibold text-[#2C332E] mb-1.5">
                    Room Preference
                  </label>
                  <select
                    id="contact-room-type"
                    name="roomType"
                    aria-label="Select Room Type"
                    value={formData.roomType}
                    onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FBF9F5] border border-[#EAE5DB] text-xs sm:text-sm text-[#1F2421] focus:outline-none focus:border-[#3A4B3D] cursor-pointer"
                  >
                    <option value="AC Room">AC Room (Garden View, 1 King Bed, 2 Guests) – ₹1,200/night</option>
                    <option value="Non-AC Room">Non-AC Room (Garden View, 1 King Bed, 2 Guests) – ₹1,000/night</option>
                    <option value="Full Homestay">Entire Homestay Property (Up to 9 Guests)</option>
                  </select>
                </div>

                {/* Message / Special Needs */}
                <div>
                  <label htmlFor="contact-notes" className="block text-xs font-semibold text-[#2C332E] mb-1.5">
                    Questions or Special Notes (Optional)
                  </label>
                  <textarea
                    id="contact-notes"
                    name="message"
                    aria-label="Special requests or message"
                    rows={3}
                    placeholder="e.g. Need station pickup from Eraniel, traveling with elderly parent, early check-in requested..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FBF9F5] border border-[#EAE5DB] text-xs sm:text-sm text-[#1F2421] focus:outline-none focus:border-[#3A4B3D] transition-colors resize-none"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-[#3A4B3D] text-[#FBF9F5] text-xs sm:text-sm font-semibold hover:bg-[#2D3B30] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                    <span>Send Inquiry on WhatsApp</span>
                  </button>

                  <a
                    href={`mailto:${CONTACT_INFO.email}?subject=Reservation%20Inquiry%20Zion%20Inn`}
                    className="w-full sm:w-auto py-3.5 px-6 rounded-full border border-[#EAE5DB] text-[#2C332E] text-xs font-medium hover:bg-[#F5F2EB] transition-colors text-center cursor-pointer"
                  >
                    Send Email Instead
                  </a>
                </div>

                {formSubmitted && (
                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>WhatsApp chat launched with your details pre-filled!</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Transit Hubs & Directions Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-16 sm:mt-24">
        <div className="text-left mb-8">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#5D645E] mb-2 block">
            HOW TO GET HERE
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#1F2421]">
            Getting to Neyyoor, Kanyakumari
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {[
            {
              icon: Train,
              title: 'Eraniel Railway Station',
              dist: '750 m (2 mins)',
              desc: 'Closest railway station. Multiple daily trains to Trivandrum, Nagercoil, and Chennai.'
            },
            {
              icon: Train,
              title: 'Nagercoil Junction',
              dist: '18 km (35 mins)',
              desc: 'Major national rail terminal with express train connections across India.'
            },
            {
              icon: Plane,
              title: 'Trivandrum Airport (TRV)',
              dist: '58 km (1h 20m)',
              desc: 'Nearest airport with international and domestic flights. Direct highway drive via NH 66.'
            },
            {
              icon: Compass,
              title: 'Kanyakumari Cape',
              dist: '32 km (50 mins)',
              desc: 'The southernmost tip of mainland India, easy day excursion from Zion Inn.'
            }
          ].map((hub, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-[#EAE5DB] shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-[#F5F2EB] text-[#3A4B3D] flex items-center justify-center mb-3">
                <hub.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold text-[#1F2421] mb-0.5">{hub.title}</h3>
              <p className="text-xs font-bold text-[#3A4B3D] mb-2">{hub.dist}</p>
              <p className="text-xs text-[#5D645E] leading-relaxed">{hub.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Embedded Google Maps Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-12 sm:mt-16">
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#EAE5DB] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 text-left">
            <div>
              <h3 className="font-editorial text-2xl font-medium text-[#1F2421]">
                Zion Inn Homestay on Map
              </h3>
              <p className="text-xs text-[#5D645E]">
                Neyyoor Town, Kanyakumari District, Tamil Nadu – 629802
              </p>
            </div>
            <a
              href={CONTACT_INFO.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#3A4B3D] text-[#FBF9F5] text-xs font-semibold hover:bg-[#2D3B30] transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>Get Driving Directions</span>
            </a>
          </div>

          <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden border border-[#EAE5DB]">
            <iframe
              title="Zion Inn Homestay Neyyoor Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15796.88371239247!2d77.29177265!3d8.2144576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04fe1b34f89d53%3A0x70bcfe6ea86be8ea!2sNeyyoor%2C%20Tamil%20Nadu%20629802!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[0.15] contrast-[1.05]"
            />
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 mt-16 sm:mt-24 text-left">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#5D645E] mb-2 block">
            NEED TO KNOW
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#1F2421]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#EAE5DB] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF8F5] transition-colors"
                >
                  <span className="text-xs sm:text-sm font-semibold text-[#1F2421]">
                    {faq.q}
                  </span>
                  <ChevronDown 
                    className={`w-4 h-4 text-[#5D645E] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#3A4B3D]' : ''
                    }`} 
                    strokeWidth={1.5} 
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs text-[#5D645E] leading-relaxed border-t border-[#EAE5DB]/60 bg-[#FAF8F5]/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

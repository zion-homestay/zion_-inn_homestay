import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, ChevronRight, Check, ShieldCheck } from 'lucide-react';

export default function Hero({ 
  checkInDate, 
  setCheckInDate, 
  checkOutDate, 
  setCheckOutDate, 
  guestCount, 
  setGuestCount, 
  onCheckAvailability 
}) {
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  // Format date helper for clean display (e.g., "Oct 12 – Oct 14")
  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const formattedDateRange = checkInDate && checkOutDate
    ? `${formatDateDisplay(checkInDate)} – ${formatDateDisplay(checkOutDate)}`
    : 'Oct 12 – Oct 14';

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 2;
    try {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 1;
    } catch {
      return 2;
    }
  };

  const nights = calculateNights();

  return (
    <section className="relative w-full min-h-[780px] lg:min-h-[880px] overflow-hidden flex flex-col justify-between -mt-[76px] sm:-mt-[88px] pt-[100px] sm:pt-[120px] pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-8">
      {/* Background Hero Banner matching reference image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <img
          src="/images/hero-banner-v3.webp"
          srcSet="/images/hero-banner-v3-mobile.webp 768w, /images/hero-banner-v3.webp 1360w"
          sizes="100vw"
          alt="Zion Inn Homestay Neyyoor Veranda"
          width="1360"
          height="896"
          className="w-full h-full object-cover object-[center_right] sm:object-center"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        {/* Soft light gradient on the left for maximum text contrast and legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/35 to-transparent sm:w-[65%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent sm:hidden" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">
        {/* Editorial Text Block aligned to match reference image */}
        <div className="max-w-xl text-left my-auto pt-6 sm:pt-10 lg:pt-16 pb-4">
          {/* Official Accreditation Badge & SEO Entity H1 */}
          <div className="mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-[#EAE5DB] shadow-xs text-xs sm:text-[13px] font-medium text-[#222E25] w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-600" strokeWidth={2} />
              <span>Ministry of Tourism Approved</span>
            </div>
            <h1 className="sr-only">
              Family-Run Luxury Homestay in Neyyoor, Kanyakumari – Zion Inn Rooms
            </h1>
          </div>

          {/* Heading - exact editorial serif style matching reference image */}
          <h2 className="font-editorial text-5xl sm:text-6xl lg:text-[72px] xl:text-[80px] font-normal tracking-[-0.02em] text-[#19211A] leading-[1.04] mb-4 sm:mb-6">
            Your quiet<br />
            sanctuary in<br />
            Neyyoor
          </h2>

          {/* Subtext matching user reference */}
          <p className="text-base sm:text-lg lg:text-xl text-[#2D352F] font-normal leading-relaxed max-w-md">
            Comfortable stays. Warm hospitality.<br className="hidden sm:inline" /> A place that feels like home.
          </p>
        </div>

        {/* Floating Search Bar centered horizontally with comfortable width to prevent button overflow */}
        <motion.div 
          className="w-full max-w-lg sm:max-w-[620px] mx-auto text-left mb-2 sm:mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full p-2 sm:py-1.5 sm:pl-3.5 sm:pr-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.1)] border border-[#EAE5DB]/90 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-1.5">
            {/* Check-in – Check-out Picker with tight, harmonious alignment and reliable Popover */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => {
                  setIsDateDropdownOpen(!isDateDropdownOpen);
                  setIsGuestDropdownOpen(false);
                }}
                className="w-full sm:w-auto flex items-center justify-between gap-2.5 px-2.5 sm:px-3 py-1.5 rounded-xl sm:rounded-full hover:bg-stone-50 transition-colors cursor-pointer text-left outline-none focus:outline-none"
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#3A4B3D] shrink-0" strokeWidth={1.5} />
                  <div className="flex flex-col text-left">
                    <span className="text-[9.5px] uppercase tracking-wider text-[#6B726C] font-semibold leading-none mb-1 whitespace-nowrap">
                      Check in – Check out
                    </span>
                    <span className="text-xs sm:text-[13px] font-semibold text-[#1F2421] leading-tight whitespace-nowrap">
                      {formattedDateRange}
                    </span>
                  </div>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 text-[#8C938D] shrink-0 transition-transform ${isDateDropdownOpen ? 'rotate-90 text-[#3A4B3D]' : ''}`} strokeWidth={1.5} />
              </button>

              {/* Date Picker Popover - Opens Upward, 100% reliable native inputs */}
              {isDateDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsDateDropdownOpen(false)} 
                  />
                  <div className="absolute bottom-full mb-3 left-0 w-[calc(100vw-36px)] max-w-[340px] sm:w-88 bg-white rounded-2xl shadow-[0_-12px_40px_rgba(0,0,0,0.14)] border border-[#EAE5DB] p-4 sm:p-5 z-50 text-left">
                    <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#EAE5DB]">
                      <div>
                        <h4 className="font-editorial text-lg text-[#1F2421] font-semibold">Stay Dates</h4>
                        <p className="text-[11px] text-[#6B726C]">{nights} {nights === 1 ? 'night' : 'nights'} stay</p>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setIsDateDropdownOpen(false)}
                        className="text-xs font-semibold px-3 py-1 rounded-full bg-[#3A4B3D] text-white hover:bg-[#2D3B30] cursor-pointer"
                      >
                        Done
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="hero-check-in-date" className="block text-[10px] uppercase tracking-wider font-semibold text-[#6B726C] mb-1">
                          Check in
                        </label>
                        <input
                          id="hero-check-in-date"
                          name="checkInDate"
                          aria-label="Check-in Date"
                          type="date"
                          value={checkInDate}
                          onChange={(e) => setCheckInDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#F5F2EB] border border-[#EAE5DB] text-xs font-semibold text-[#1F2421] cursor-pointer focus:outline-none focus:border-[#3A4B3D]"
                        />
                      </div>
                      <div>
                        <label htmlFor="hero-check-out-date" className="block text-[10px] uppercase tracking-wider font-semibold text-[#6B726C] mb-1">
                          Check out
                        </label>
                        <input
                          id="hero-check-out-date"
                          name="checkOutDate"
                          aria-label="Check-out Date"
                          type="date"
                          value={checkOutDate}
                          onChange={(e) => setCheckOutDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#F5F2EB] border border-[#EAE5DB] text-xs font-semibold text-[#1F2421] cursor-pointer focus:outline-none focus:border-[#3A4B3D]"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Vertical Divider */}
            <div className="hidden sm:block w-[1px] h-7 bg-[#EAE5DB] shrink-0" />

            {/* Guests Selector matching reference */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
                className="w-full sm:w-auto flex items-center justify-between gap-2.5 px-3 py-1.5 rounded-xl sm:rounded-full hover:bg-stone-50 transition-colors text-left cursor-pointer outline-none focus:outline-none focus:ring-0 focus-visible:outline-none"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#3A4B3D] shrink-0" strokeWidth={1.5} />
                  <span className="text-xs sm:text-sm font-semibold text-[#1F2421] whitespace-nowrap">
                    {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#8C938D] shrink-0" strokeWidth={1.5} />
              </button>

              {/* Guests Dropdown - Opens Upward above the search bar to avoid clipping */}
              {isGuestDropdownOpen && (
                <>
                  {/* Backdrop to close on click outside */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsGuestDropdownOpen(false)} 
                  />
                  <div className="absolute bottom-full mb-3 left-0 sm:left-auto sm:right-0 w-48 bg-white rounded-2xl shadow-[0_-10px_35px_rgba(0,0,0,0.12)] border border-[#EAE5DB] py-2 z-50">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => {
                          setGuestCount(num);
                          setIsGuestDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-xs sm:text-sm flex items-center justify-between hover:bg-[#F5F2EB] transition-colors cursor-pointer ${
                          guestCount === num ? 'font-semibold text-[#3A4B3D] bg-[#F5F2EB]' : 'text-[#222623]'
                        }`}
                      >
                        <span>{num} {num === 1 ? 'Guest' : 'Guests'}</span>
                        {guestCount === num && <Check className="w-3.5 h-3.5 text-[#3A4B3D]" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Check Availability CTA Button matching reference */}
            <button
              onClick={onCheckAvailability}
              className="px-5 sm:px-5 py-2.5 sm:py-2.5 rounded-xl sm:rounded-full bg-[#3A4B3D] text-[#FBF9F5] text-xs sm:text-sm font-medium hover:bg-[#2D3B30] active:scale-[0.98] transition-all whitespace-nowrap shadow-sm text-center cursor-pointer shrink-0"
            >
              Check Availability
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

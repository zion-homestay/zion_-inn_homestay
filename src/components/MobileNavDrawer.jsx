import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function MobileNavDrawer({ 
  isOpen, 
  onClose, 
  currentPage = 'home', 
  onNavigate, 
  onBookStayClick
}) {
  const handleNavClick = (page, targetHash) => {
    onClose();
    if (onNavigate) {
      onNavigate(page, targetHash);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50 md:hidden backdrop-blur-xs"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed inset-y-0 right-0 w-[84%] max-w-sm bg-[#FBF9F5] z-50 md:hidden shadow-2xl flex flex-col justify-between p-6 border-l border-[#EAE5DB]"
          >
            {/* Top Bar */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#EAE5DB]">
                <a 
                  href="/"
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                    e.preventDefault();
                    handleNavClick('home', null);
                  }}
                  className="flex items-center gap-2.5 cursor-pointer"
                >
                  <img 
                    src="/images/logo.png" 
                    alt="Zion Inn Homestay" 
                    className="w-9 h-9 object-contain"
                  />
                  <div>
                    <span className="font-editorial text-base font-semibold tracking-wider text-[#1F2421] block leading-none uppercase">
                      Zion Inn Rooms
                    </span>
                    <span className="text-[8.5px] tracking-widest uppercase text-[#5D645E] font-medium block mt-0.5">
                      A Family-Run Luxury Homestay
                    </span>
                  </div>
                </a>

                <button
                  onClick={onClose}
                  aria-label="Close Menu"
                  className="p-2 rounded-full text-[#1F2421] hover:bg-[#3A4B3D]/10"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-5 pt-8 text-lg font-medium text-[#222623]">
                <a
                  href="/"
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                    e.preventDefault();
                    handleNavClick('home', null);
                  }}
                  className={`text-left py-1 transition-colors ${
                    currentPage === 'home' ? 'text-[#3A4B3D] font-bold' : 'hover:text-[#3A4B3D]'
                  }`}
                >
                  Home
                </a>
                <a
                  href="/rooms"
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                    e.preventDefault();
                    handleNavClick('rooms', null);
                  }}
                  className={`text-left py-1 transition-colors ${
                    currentPage === 'rooms' ? 'text-[#3A4B3D] font-bold' : 'hover:text-[#3A4B3D]'
                  }`}
                >
                  Rooms & Suites
                </a>
                <a
                  href="/gallery"
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                    e.preventDefault();
                    handleNavClick('gallery', null);
                  }}
                  className={`text-left py-1 transition-colors ${
                    currentPage === 'gallery' ? 'text-[#3A4B3D] font-bold' : 'hover:text-[#3A4B3D]'
                  }`}
                >
                  Gallery
                </a>
                <a
                  href="/contact"
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                    e.preventDefault();
                    handleNavClick('contact', null);
                  }}
                  className={`text-left py-1 transition-colors ${
                    currentPage === 'contact' ? 'text-[#3A4B3D] font-bold' : 'hover:text-[#3A4B3D]'
                  }`}
                >
                  Contact & Location
                </a>
              </nav>

              {/* CTA Button */}
              <div className="mt-8">
                <button
                  onClick={() => {
                    onClose();
                    onBookStayClick();
                  }}
                  className="w-full py-3.5 rounded-full bg-[#3A4B3D] text-[#FBF9F5] font-medium text-center shadow hover:bg-[#2D3B30] transition-colors"
                >
                  Book Stay
                </button>
              </div>
            </div>

            {/* Bottom Quote & Floral Motif */}
            <div className="pt-6 border-t border-[#EAE5DB] text-center">
              <p className="font-editorial italic text-base text-[#1F2421]">
                Your quiet sanctuary in Neyyoor
              </p>
              <div className="mt-2 text-[#3A4B3D] flex justify-center">
                <svg className="w-5 h-5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2a9 9 0 0 1 9 9c0 4-3 7-9 11-6-4-9-7-9-11a9 9 0 0 1 9-9z"/>
                  <path d="M12 2v20"/>
                </svg>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

import React from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ 
  currentPage = 'home', 
  onNavigate, 
  onBookStayClick, 
  onOpenMobileMenu, 
  isMobileMenuOpen 
}) {
  const handleLinkClick = (e, page, targetHash) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page, targetHash);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full pt-3 sm:pt-4 px-4 sm:px-8 transition-all duration-300 pointer-events-none">
      <nav 
        aria-label="Main Navigation"
        className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-full px-5 py-2.5 sm:px-7 sm:py-3 flex items-center justify-between shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-[#EAE5DB]/80 max-w-4xl mx-auto"
      >
        {/* Brand Logo matching reference */}
        <a 
          href="/" 
          onClick={(e) => handleLinkClick(e, 'home', null)}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <img 
            src="/images/logo.png" 
            alt="Zion Inn Homestay Logo" 
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col text-left">
            <span className="font-editorial text-base sm:text-lg tracking-[0.1em] font-semibold text-[#1F2421] leading-none uppercase">
              Zion Inn Rooms
            </span>
            <span className="text-[7.5px] sm:text-[8.5px] tracking-[0.13em] sm:tracking-[0.15em] uppercase text-[#6B726C] font-semibold leading-tight mt-0.5 whitespace-nowrap">
              A Family-Run Luxury Homestay
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-[14px] font-medium text-[#2C322D]">
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, 'home', null)}
            className={`py-1 cursor-pointer transition-colors relative ${
              currentPage === 'home' 
                ? 'text-[#3A4B3D] font-semibold after:w-full after:h-[2px] after:bg-[#3A4B3D] after:absolute after:bottom-0 after:left-0' 
                : 'hover:text-[#3A4B3D]'
            }`}
          >
            Home
          </a>
          <a 
            href="/rooms"
            onClick={(e) => handleLinkClick(e, 'rooms', null)}
            className={`py-1 cursor-pointer transition-colors relative ${
              currentPage === 'rooms' 
                ? 'text-[#3A4B3D] font-semibold after:w-full after:h-[2px] after:bg-[#3A4B3D] after:absolute after:bottom-0 after:left-0' 
                : 'hover:text-[#3A4B3D]'
            }`}
          >
            Rooms
          </a>
          <a 
            href="/gallery"
            onClick={(e) => handleLinkClick(e, 'gallery', null)}
            className={`py-1 cursor-pointer transition-colors relative ${
              currentPage === 'gallery' 
                ? 'text-[#3A4B3D] font-semibold after:w-full after:h-[2px] after:bg-[#3A4B3D] after:absolute after:bottom-0 after:left-0' 
                : 'hover:text-[#3A4B3D]'
            }`}
          >
            Gallery
          </a>
          <a 
            href="/contact"
            onClick={(e) => handleLinkClick(e, 'contact', null)}
            className={`py-1 cursor-pointer transition-colors relative ${
              currentPage === 'contact' 
                ? 'text-[#3A4B3D] font-semibold after:w-full after:h-[2px] after:bg-[#3A4B3D] after:absolute after:bottom-0 after:left-0' 
                : 'hover:text-[#3A4B3D]'
            }`}
          >
            Contact
          </a>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Book Stay CTA button */}
          <button
            onClick={onBookStayClick}
            id="nav-book-stay"
            className="hidden md:inline-flex items-center justify-center px-5 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide bg-[#3A4B3D] text-[#FBF9F5] hover:bg-[#2D3B30] active:scale-[0.98] transition-all shadow-xs"
          >
            Book Stay
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={onOpenMobileMenu}
            aria-label="Toggle Mobile Menu"
            className="md:hidden p-1.5 rounded-full text-[#1F2421] hover:bg-[#3A4B3D]/10 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" strokeWidth={1.5} />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}

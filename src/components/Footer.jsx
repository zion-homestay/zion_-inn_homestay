import React from 'react';
import { MessageCircle, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO } from '../data/homestayData';

export default function Footer({ onNavigate }) {
  const handleFooterLink = (e, page, targetHash) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page, targetHash);
    }
  };

  return (
    <footer className="w-full bg-[#354336] text-[#FBF9F5] pt-12 pb-24 md:pb-12 mt-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/10">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/95 p-1 flex items-center justify-center shadow-xs">
              <img 
                src="/images/logo.png" 
                alt="Zion Inn Homestay" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-left">
              <span className="font-editorial text-lg font-semibold tracking-wider block leading-none uppercase">
                Zion Inn
              </span>
              <span className="text-[9.5px] tracking-widest uppercase text-white/80 font-medium block mt-1">
                Family-Run Luxury Homestay
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-300 font-medium mt-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Ministry of Tourism Approved
              </span>
            </div>
          </div>

          {/* Center Editorial Quote */}
          <div className="text-center">
            <p className="font-editorial italic text-base sm:text-lg text-white/90">
              Stay. Relax. Feel at Home.
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex items-center gap-6 text-xs sm:text-sm font-medium text-white/80">
            <a 
              href="/"
              onClick={(e) => handleFooterLink(e, 'home', null)} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </a>
            <a 
              href="/rooms"
              onClick={(e) => handleFooterLink(e, 'rooms', null)} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Rooms
            </a>
            <a 
              href="/gallery"
              onClick={(e) => handleFooterLink(e, 'gallery', null)} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Gallery
            </a>
            <a 
              href="/contact"
              onClick={(e) => handleFooterLink(e, 'contact', null)} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Local SEO NAP Block: Name, Address, Phone & Nearby Hubs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-b border-white/10 text-xs text-white/80 text-left">
          <div>
            <h4 className="text-white font-semibold mb-2 uppercase tracking-wider text-[11px]">
              Location & Address
            </h4>
            <address className="not-italic leading-relaxed">
              <p className="font-medium text-white">{CONTACT_INFO.name}</p>
              <p>{CONTACT_INFO.addressLine1}</p>
              <p>{CONTACT_INFO.addressLine2}</p>
              <p className="text-white/60 mt-1">{CONTACT_INFO.landmark}</p>
            </address>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2 uppercase tracking-wider text-[11px]">
              Reservations & Inquiries
            </h4>
            <div className="space-y-1.5 leading-relaxed">
              <p>
                Phone:{' '}
                <a href={`tel:${CONTACT_INFO.phone1Raw}`} className="underline hover:text-white transition-colors">
                  {CONTACT_INFO.phone1}
                </a>
                {' / '}
                <a href={`tel:${CONTACT_INFO.phone2Raw}`} className="underline hover:text-white transition-colors">
                  {CONTACT_INFO.phone2}
                </a>
              </p>
              <p>
                WhatsApp:{' '}
                <a 
                  href={`https://api.whatsapp.com/send?phone=${CONTACT_INFO.whatsappNumber}&text=Hello%20Zion%20Inn%20Homestay`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="underline hover:text-white transition-colors"
                >
                  {CONTACT_INFO.whatsappDisplay}
                </a>
              </p>
              <p>
                Email:{' '}
                <a href={`mailto:${CONTACT_INFO.email}`} className="underline hover:text-white transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2 uppercase tracking-wider text-[11px]">
              Nearby Sights & Transit
            </h4>
            <div className="space-y-1 leading-relaxed text-white/75">
              <p>• Eraniel Railway Station (ERL) — 750 m (2 mins)</p>
              <p>• Padmanabhapuram Wooden Palace — 6.9 km (14 mins)</p>
              <p>• Muttom Rocky Beach & Lighthouse — 11.6 km (20 mins)</p>
              <p>• Mathur Hanging Aqueduct — 16.2 km (25 mins)</p>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>
            © 2026 Zion Inn Homestay. All rights reserved. Neyyoor, Kanyakumari District, Tamil Nadu.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-white/75">
            {/* WhatsApp */}
            <a 
              href={`https://api.whatsapp.com/send?phone=${CONTACT_INFO.whatsappNumber}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="WhatsApp"
              className="hover:text-white transition-colors"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
            </a>

            {/* Instagram */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
              className="hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

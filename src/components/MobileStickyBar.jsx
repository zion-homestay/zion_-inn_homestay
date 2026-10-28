import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../data/homestayData';

export default function MobileStickyBar() {
  const msg = encodeURIComponent("Hi Zion Inn, I'd like to check room availability.");
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${CONTACT_INFO.whatsappNumber}&text=${msg}`;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-white/95 backdrop-blur-md border-t border-[#EAE5DB] shadow-lg">
      <div className="flex items-center gap-3 max-w-md mx-auto">
        <a
          href={`tel:${CONTACT_INFO.phone1Raw}`}
          aria-label="Call Host directly at +91 81484 37600"
          className="flex-1 py-3 px-4 rounded-full border border-[#EAE5DB] bg-[#F5F2EB] text-[#1F2421] text-xs font-semibold hover:bg-[#EAE5DB] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer text-center"
        >
          <Phone className="w-4 h-4 text-[#3A4B3D]" strokeWidth={1.5} />
          <span>Call Host</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Host on WhatsApp"
          className="flex-1 py-3 px-4 rounded-full bg-[#3A4B3D] text-[#FBF9F5] text-xs font-semibold hover:bg-[#2D3B30] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer text-center"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" strokeWidth={1.5} />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

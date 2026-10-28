import React from 'react';
import { X, Heart, Shield, MapPin } from 'lucide-react';

export default function StoryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-6 transition-opacity duration-300"
      onClick={onClose}
    >
      <div className="min-h-full flex items-center justify-center py-6 sm:py-10">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-[#FBF9F5] max-w-xl w-full rounded-3xl overflow-hidden border border-[#EAE5DB] shadow-2xl p-6 sm:p-8 text-left my-auto transition-all duration-300 transform"
        >
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#EAE5DB]">
              <div className="flex-1 pr-2">
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#5D645E] font-semibold block mb-1">
                  Our Heritage & Philosophy
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-[#1F2421] leading-tight">
                  The Story of Zion Inn
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close Story"
                className="p-2 -mr-1 -mt-1 rounded-full text-[#1F2421] hover:bg-[#3A4B3D]/10 shrink-0 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

          <div className="mt-5 space-y-4 text-sm text-[#5D645E] leading-relaxed">
            <p>
              Tucked inside the serene green village of <strong>Neyyoor</strong> in southern Tamil Nadu, Zion Inn was envisioned as a quiet haven for travellers who appreciate genuine homestay warmth over impersonal commercial hotels.
            </p>
            <p>
              Located just 750 m from historic <strong>Eraniel</strong>, our home sits beneath swaying coconut palms and flowering bougainvillea. Here, days start with birdsong and peaceful mornings on the breezy veranda, and end with cool evening sea winds blowing inland from nearby Muttom.
            </p>
            <div className="p-4 rounded-2xl bg-[#F5F2EB] border border-[#EAE5DB] text-xs text-[#222623] space-y-2">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-600 shrink-0" strokeWidth={1.5} />
                <span><strong>Family-Run:</strong> Personal care, homecooked morning breakfast options, and local insights.</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={1.5} />
                <span><strong>Safe & Peaceful:</strong> Clean filtered water, uninterrupted power backup, and gated private parking.</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#3A4B3D] shrink-0" strokeWidth={1.5} />
                <span><strong>Convenient Hub:</strong> Minutes from Padmanabhapuram Palace, Mathur Aqueduct, and Kanyakumari.</span>
              </div>
            </div>
            <p>
              Whether you are working remotely, taking a restful family vacation, or exploring the cultural riches of Travancore and Kanyakumari, Zion Inn welcomes you with open doors.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#EAE5DB] flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full bg-[#3A4B3D] text-[#FBF9F5] text-xs sm:text-sm font-medium hover:bg-[#2D3B30] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  X, 
  Wifi, 
  Bed, 
  Bath, 
  DoorOpen, 
  Clock, 
  Ban, 
  CigaretteOff, 
  MessageCircle 
} from 'lucide-react';
import { CONTACT_INFO, POLICIES } from '../data/homestayData';

export default function RoomDetailDrawer({ 
  room, 
  isOpen, 
  onClose, 
  checkInDate, 
  checkOutDate, 
  guestCount 
}) {
  const [selectedImage, setSelectedImage] = useState(room?.image || '');

  if (!room) return null;

  // Active preview image fallback
  const currentImage = selectedImage || room.image || room.gallery?.[0] || '';

  // Formatted date string for WhatsApp message
  const formatDateStr = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const datesDisplay = checkInDate && checkOutDate 
    ? `from ${formatDateStr(checkInDate)} to ${formatDateStr(checkOutDate)}` 
    : 'in the coming days';

  const defaultMessage = `Hi Zion Inn, I'd like to check availability for the ${room.name} ${datesDisplay} for ${guestCount || room.capacity} guests.`;

  const handleWhatsAppBooking = () => {
    const encoded = encodeURIComponent(defaultMessage);
    window.location.href = `https://api.whatsapp.com/send?phone=${CONTACT_INFO.whatsappNumber}&text=${encoded}`;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-50 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer / Modal Container */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-lg bg-[#FBF9F5] z-50 shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-[#EAE5DB] transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
            {/* Header */}
            <div className="sticky top-0 bg-[#FBF9F5]/95 backdrop-blur-sm z-10 px-6 py-4 border-b border-[#EAE5DB] flex items-center justify-between">
              <div>
                <h3 className="font-editorial text-2xl font-medium text-[#1F2421]">
                  {room.name}
                </h3>
                <p className="text-xs text-[#5D645E]">
                  {room.view} • 2 Adults (Two kids go free)
                </p>
              </div>

              <button
                onClick={onClose}
                aria-label="Close Room Details"
                className="p-2 rounded-full text-[#1F2421] hover:bg-[#3A4B3D]/10 transition-colors"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 space-y-6 flex-1">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#EAE5DB]/40 border border-[#EAE5DB]">
                <img 
                  src={currentImage} 
                  alt={room.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <span className="absolute top-3 right-3 glass-panel px-3 py-1 rounded-full text-xs font-semibold text-[#1F2421]">
                  {room.size}
                </span>
              </div>

              {/* Thumbnails Gallery */}
              {room.gallery && room.gallery.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {room.gallery.map((thumb, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(thumb)}
                      className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                        currentImage === thumb ? 'border-[#3A4B3D] scale-95 shadow-sm' : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={thumb} 
                        alt={`${room.name} gallery image ${idx + 1}`} 
                        className="w-full h-full object-cover" 
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Room Rate */}
              <div className="flex items-baseline justify-between py-3 border-y border-[#EAE5DB]">
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1 text-[#1F2421]">
                    <span className="font-editorial text-3xl font-semibold">
                      ₹{room.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-[#5D645E]">/ night</span>
                  </div>
                  <span className="text-[11px] text-[#3A4B3D] font-medium mt-0.5">
                    Rate for 2 Adults • Two kids go free
                  </span>
                </div>

                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  room.status === 'Available' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-700'
                }`}>
                  Status: {room.status}
                </span>
              </div>

              {/* Room Key Features Grid (Mockup Exact Style) */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#5D645E] mb-3">
                  Room Features
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm text-[#222623]">
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-[#EAE5DB]">
                    <Bed className="w-4 h-4 text-[#3A4B3D] shrink-0" strokeWidth={1.5} />
                    <span>{room.bed}</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-[#EAE5DB]">
                    <Wifi className="w-4 h-4 text-[#3A4B3D] shrink-0" strokeWidth={1.5} />
                    <span>Free Wi-Fi</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-[#EAE5DB]">
                    <DoorOpen className="w-4 h-4 text-[#3A4B3D] shrink-0" strokeWidth={1.5} />
                    <span>Private Balcony</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-[#EAE5DB]">
                    <Bath className="w-4 h-4 text-[#3A4B3D] shrink-0" strokeWidth={1.5} />
                    <span>Attached Bathroom</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-100 col-span-2 font-medium">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span>Family Provision: Two kids go free</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-sm text-[#5D645E] leading-relaxed">
                  {room.description}
                </p>
              </div>

              {/* Check-in & Policies (Mockup exact section) */}
              <div className="bg-[#F5F2EB] p-4 rounded-2xl border border-[#EAE5DB] space-y-2 text-xs text-[#222623]">
                <h4 className="font-semibold text-[#1F2421] text-xs uppercase tracking-wider mb-2">
                  Check-in & Policies
                </h4>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#3A4B3D]" strokeWidth={1.5} />
                  <span>Check-in: {POLICIES.checkIn}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#3A4B3D]" strokeWidth={1.5} />
                  <span>Check-out: {POLICIES.checkOut}</span>
                </div>
                <div className="flex items-center gap-2 text-amber-900">
                  <Ban className="w-3.5 h-3.5 text-amber-800" strokeWidth={1.5} />
                  <span>No pets allowed</span>
                </div>
                <div className="flex items-center gap-2 text-amber-900">
                  <CigaretteOff className="w-3.5 h-3.5 text-amber-800" strokeWidth={1.5} />
                  <span>No smoking indoors</span>
                </div>
              </div>

              {/* WhatsApp message preview box */}
              <div className="p-3.5 bg-white rounded-2xl border border-[#EAE5DB] text-xs text-[#5D645E]">
                <span className="font-semibold text-[#1F2421] block mb-1">
                  WhatsApp Inquiry Preview:
                </span>
                <p className="italic bg-[#FBF9F5] p-2 rounded-xl text-[#3A4B3D]">
                  "{defaultMessage}"
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="sticky bottom-0 bg-[#FBF9F5] px-6 py-4 border-t border-[#EAE5DB] flex flex-col gap-2">
              <button
                type="button"
                onClick={handleWhatsAppBooking}
                className="w-full py-3 rounded-full bg-[#3A4B3D] text-[#FBF9F5] text-sm font-medium hover:bg-[#2D3B30] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Quick Inquire</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppBooking}
                className="w-full py-3 rounded-full border border-[#3A4B3D] text-[#3A4B3D] text-sm font-medium hover:bg-[#3A4B3D]/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" strokeWidth={1.5} />
                <span>Book via WhatsApp</span>
              </button>
            </div>
          </div>
        </>
      );
    }

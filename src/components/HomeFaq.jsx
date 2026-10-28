import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { subtleFadeUp } from '../utils/animations';
import { HOMESTAY_FAQS } from '../data/homestayData';

export default function HomeFaq() {
  const [openFaq, setOpenFaq] = useState(0); // First item open by default for immediate context

  return (
    <section id="faq" className="px-4 sm:px-8 max-w-4xl mx-auto py-12 sm:py-20 border-t border-[#EAE5DB]/60">
      <motion.div
        className="text-center mb-8 sm:mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={subtleFadeUp}
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3A4B3D]/10 text-xs font-semibold text-[#3A4B3D] mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-700" strokeWidth={2} />
          <span>Help &amp; Answers</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1F2421] mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base text-[#5D645E] max-w-xl mx-auto leading-relaxed">
          Quick, clear answers to common questions about our location, room amenities, transit proximity, and booking policies.
        </p>
      </motion.div>

      <div className="space-y-3.5 text-left">
        {HOMESTAY_FAQS.map((faq, idx) => {
          const isOpen = openFaq === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#EAE5DB] shadow-xs overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                aria-expanded={isOpen}
                className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF8F5] transition-colors"
              >
                <h3 className="text-sm sm:text-base font-semibold text-[#1F2421] pr-2">
                  {faq.q}
                </h3>
                <ChevronDown
                  className={`w-4 h-4 text-[#5D645E] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#3A4B3D]' : ''
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#5D645E] leading-relaxed border-t border-[#EAE5DB]/60 bg-[#FAF8F5]/40">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

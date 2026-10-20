import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Phone, MessageCircle, MapPin, Clock, Mail, ArrowUpRight } from 'lucide-react';

export const ContactLocation: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="location" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Scroll Reveal Container */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="bg-surface rounded-[18px] shadow-soft border border-hairline overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-hairline">
          
          {/* Left Column: Direct Phone & Front Desk */}
          <div id="contact" className="p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <span className="block text-[13px] uppercase tracking-wider font-semibold text-brass-600 mb-2">
                Front Desk &bull; Concierge 24/7
              </span>

              <h2 className="text-[28px] leading-[32px] font-semibold text-ink tracking-tight mb-4">
                Direct Contact &amp; Reservations
              </h2>

              <p className="text-[17px] leading-[24px] text-graphite-500 mb-8">
                Connect instantly with our on-site team. By booking or calling direct, you avoid intermediary service commissions, receive personalized room preferences, and secure early check-in priority.
              </p>

              {/* Action Buttons Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                {/* Primary Button */}
                <motion.a
                  href="tel:+2348000000000"
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  className="h-12 px-6 rounded-full bg-ink hover:bg-black text-white text-[15px] font-medium inline-flex items-center justify-center gap-2 transition-colors min-h-[44px]"
                  aria-label="Call Aurelia front desk directly at +234 800 000 0000"
                >
                  <Phone className="w-4 h-4 text-white" aria-hidden="true" />
                  <span>Call Hotel: +234 800 000 0000</span>
                </motion.a>

                {/* Secondary Button */}
                <motion.a
                  href="https://wa.me/2348000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  className="h-12 px-6 rounded-full border border-hairline bg-transparent hover:bg-stone-50 text-ink text-[15px] font-medium inline-flex items-center justify-center gap-2 transition-colors min-h-[44px]"
                  aria-label="Chat with WhatsApp Concierge (opens in new tab)"
                >
                  <MessageCircle className="w-4 h-4 text-sage-600" aria-hidden="true" />
                  <span>WhatsApp Front Desk</span>
                </motion.a>
              </div>
            </div>

            {/* Information Grid with 1px dividers */}
            <div className="space-y-4 pt-6 border-t border-hairline text-[15px]">
              
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brass-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="text-[13px] font-medium text-graphite-500 uppercase tracking-wide">Address</div>
                  <div className="text-ink font-medium">14 Victoria Island Boulevard, Lagos, Nigeria</div>
                </div>
              </div>

              {/* Hours / Check-in & Check-out */}
              <div className="flex items-start gap-3 pt-3 border-t border-hairline/60">
                <Clock className="w-5 h-5 text-brass-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="text-[13px] font-medium text-graphite-500 uppercase tracking-wide">Hours</div>
                  <div className="text-ink">
                    <span className="font-medium">Check-in: 2:00 PM</span> &bull; <span className="font-medium">Check-out: 11:00 AM</span>
                  </div>
                  <div className="text-[13px] text-graphite-500">24-hour front desk &amp; secure keycard access</div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 pt-3 border-t border-hairline/60">
                <Mail className="w-5 h-5 text-brass-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="text-[13px] font-medium text-graphite-500 uppercase tracking-wide">Direct Inquiries</div>
                  <a
                    href="mailto:reservations@aureliahotels.com"
                    className="link-underlined text-brass-600 font-medium inline-flex items-center"
                  >
                    reservations@aureliahotels.com
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Google Location Map */}
          <div className="p-8 sm:p-12 flex flex-col justify-between bg-stone-50/40">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[13px] uppercase tracking-wider font-semibold text-graphite-500">
                  Location &amp; Surrounds
                </span>
                <span className="inline-flex items-center gap-1.5 text-[13px] text-sage-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-sage-600"></span>
                  Safe, quiet enclave
                </span>
              </div>

              {/* Responsive Google Maps Iframe */}
              <div className="w-full h-[380px] rounded-[12px] overflow-hidden border border-hairline shadow-sm relative bg-hairline">
                <iframe
                  title="Aurelia Hotel Google Maps Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.726249712061!2d3.4245781!3d6.4292415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf53075c3f683%3A0x6b77bf9414e2d312!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Directions Link Below Map */}
            <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between">
              <span className="text-[13px] text-graphite-500">
                15 min from civic center &bull; 30 min from airport
              </span>
              <a
                href="https://maps.google.com/?q=Victoria+Island+Lagos"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underlined inline-flex items-center gap-1 text-[14px] font-medium text-brass-600"
                aria-label="Open in Google Maps (opens in new tab)"
              >
                <span>Open in Google Maps</span>
                <ArrowUpRight className="w-4 h-4 text-brass-600" aria-hidden="true" />
              </a>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

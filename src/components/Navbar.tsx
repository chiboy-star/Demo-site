import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Phone, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const shouldReduceMotion = useReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Rooms', href: '#rooms' },
    { label: 'Booking', href: '#booking' },
    { label: 'Location', href: '#location' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full h-[52px] bg-[#F5F4F0]/82 backdrop-blur-md border-b border-hairline transition-all">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Brand Wordmark */}
        <a 
          href="#" 
          className="text-[20px] font-semibold tracking-tight text-ink flex items-center gap-2 focus-visible:rounded-md"
          aria-label="Aurelia Hotels Home"
        >
          <span className="text-brass-600 font-serif text-2xl leading-none">✦</span>
          <span>Aurelia</span>
        </a>

        {/* Center: 4 Primary Anchor Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[14px] font-medium text-graphite-500 hover:text-ink transition-colors min-h-[44px] inline-flex items-center"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Direct Click-to-Call link + Accent Button */}
        <div className="hidden sm:flex items-center gap-6">
          <a
            href="tel:+2348000000000"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-brass-600 hover:opacity-80 transition-opacity min-h-[44px] px-1 focus-visible:rounded-md"
            aria-label="Call front desk directly at +234 800 000 0000"
          >
            <Phone className="w-4 h-4 text-brass-600" aria-hidden="true" />
            <span className="tracking-tight">+234 800 000 0000</span>
          </a>

          <motion.button
            onClick={onOpenBooking}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            className="h-11 px-6 rounded-full bg-brass-600 hover:bg-[#785b32] text-white text-[14px] font-medium shadow-none transition-colors inline-flex items-center justify-center min-w-[44px]"
            type="button"
          >
            Book now
          </motion.button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          <motion.button
            onClick={onOpenBooking}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            className="h-9 px-4 rounded-full bg-brass-600 text-white text-[13px] font-medium"
            type="button"
          >
            Book
          </motion.button>
          
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-11 h-11 flex items-center justify-center rounded-lg text-ink focus-visible:ring-2 focus-visible:ring-brass-600"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-hairline bg-[#F5F4F0] px-4 py-4 space-y-2 shadow-soft">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[15px] font-medium text-ink hover:text-brass-600"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-hairline flex flex-col gap-2">
            <a
              href="tel:+2348000000000"
              className="flex items-center gap-2 text-[14px] font-medium text-brass-600 py-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Front Desk: +234 800 000 0000</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

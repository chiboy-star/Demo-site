import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t border-hairline py-16 text-graphite-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-hairline">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-ink text-[22px] font-semibold">
              <span className="text-brass-600 font-serif text-2xl">✦</span>
              <span>Aurelia Hotels</span>
            </div>
            <p className="text-[15px] leading-[22px] text-graphite-500 max-w-md">
              A bespoke boutique hospitality collection offering contemplative luxury, tranquil courtyards, and personalized concierge care.
            </p>
            <div className="pt-2 text-[13px] text-graphite-500 flex flex-wrap gap-4">
              <span>&bull; Best Rate Guarantee</span>
              <span>&bull; Zero Hidden Booking Fees</span>
              <span>&bull; 24/7 Direct Front Desk</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <div className="text-[13px] font-semibold text-ink uppercase tracking-wider">
              Explore
            </div>
            <ul className="space-y-2 text-[14px]">
              <li>
                <a href="#rooms" className="hover:text-ink transition-colors">Suites &amp; Rates</a>
              </li>
              <li>
                <a href="#booking" className="hover:text-ink transition-colors">Interactive Booking</a>
              </li>
              <li>
                <a href="#location" className="hover:text-ink transition-colors">Neighborhood &amp; Map</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-ink transition-colors">Front Desk &amp; Concierge</a>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="space-y-3">
            <div className="text-[13px] font-semibold text-ink uppercase tracking-wider">
              Direct Inquiries
            </div>
            <div className="space-y-2 text-[14px]">
              <a
                href="tel:+2348000000000"
                className="flex items-center gap-2 text-brass-600 hover:text-ink transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+234 800 000 0000</span>
              </a>
              <a
                href="mailto:reservations@aureliahotels.com"
                className="flex items-center gap-2 text-graphite-500 hover:text-ink transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>reservations@aureliahotels.com</span>
              </a>
              <div className="flex items-start gap-2 text-graphite-500">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-1" />
                <span>14 Victoria Island Blvd, Lagos</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[13px] gap-4">
          <p>&copy; {new Date().getFullYear()} Aurelia Hotels Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-ink transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-ink transition-colors">Terms of Stay</a>
            <a href="#" className="hover:text-ink transition-colors">Direct Booking Guarantee</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

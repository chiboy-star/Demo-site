import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, Users, Home, AlertCircle } from 'lucide-react';
import type { RoomCategory } from '../types';

interface HeroProps {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: RoomCategory;
  onCheckInChange: (val: string) => void;
  onCheckOutChange: (val: string) => void;
  onGuestsChange: (val: number) => void;
  onRoomTypeChange: (val: RoomCategory) => void;
  onSearchAvailability: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  checkIn,
  checkOut,
  guests,
  roomType,
  onCheckInChange,
  onCheckOutChange,
  onGuestsChange,
  onRoomTypeChange,
  onSearchAvailability,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn && !checkOut) {
      setErrorMessage('Please choose both a check-in and check-out date to check availability.');
      return;
    }
    if (!checkIn) {
      setErrorMessage('Please select a valid check-in date.');
      return;
    }
    if (!checkOut) {
      setErrorMessage('Please select a valid check-out date.');
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      setErrorMessage('Check-out date must be at least one day after your check-in date.');
      return;
    }

    setErrorMessage(null);
    onSearchAvailability();
  };

  // Get today's ISO date string for min date
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <section className="relative pt-12 pb-24 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header Content */}
      <div className="max-w-3xl mb-12 sm:mb-16">
        <motion.span
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block text-[13px] uppercase tracking-wider font-semibold text-brass-600 mb-4"
        >
          Boutique Sanctuary &bull; Historic Heart
        </motion.span>

        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[40px] sm:text-[56px] leading-[44px] sm:leading-[60px] font-semibold text-ink tracking-[-0.02em] text-balance"
        >
          An architectural haven crafted for quiet indulgence.
        </motion.h1>

        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-[17px] leading-[24px] text-graphite-500 max-w-2xl"
        >
          Experience handcrafted hospitality, refined minimalist suites, and peaceful courtyard gardens. Direct reservations include personalized concierge care and complimentary arrival refreshments.
        </motion.p>
      </div>

      {/* Hero High-Resolution Image Container */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-[320px] sm:h-[480px] lg:h-[540px] rounded-[18px] overflow-hidden shadow-soft mb-8 bg-hairline"
      >
        <motion.img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80"
          alt="Aurelia Hotel serene architectural facade and sunlit warm interior courtyard"
          className="w-full h-full object-cover object-center"
          initial={shouldReduceMotion ? false : { scale: 1.04 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-6 left-6 text-white text-[13px] bg-ink/60 backdrop-blur-md px-3.5 py-1.5 rounded-full font-medium tracking-wide">
          Private Sanctuary &bull; 24h Concierge
        </div>
      </motion.div>

      {/* Interactive Booking Bar Card */}
      <motion.div
        id="booking"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="bg-surface rounded-[18px] p-6 lg:p-8 shadow-soft border border-hairline/60 relative z-20"
      >
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            
            {/* 1. Check-in Date */}
            <div>
              <label htmlFor="hero-check-in" className="block text-[13px] leading-[18px] font-medium text-graphite-500 mb-2">
                Check-in Date
              </label>
              <div className="relative">
                <input
                  id="hero-check-in"
                  type="date"
                  min={todayStr}
                  value={checkIn}
                  onChange={(e) => {
                    onCheckInChange(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full h-12 px-3.5 pr-9 bg-surface border border-hairline rounded-[12px] text-ink text-[15px] focus:outline-none focus:ring-2 focus:ring-brass-600 focus:border-brass-600 transition-all cursor-pointer"
                  required
                />
                <Calendar className="w-4 h-4 text-graphite-500 absolute right-3.5 top-4 pointer-events-none" aria-hidden="true" />
              </div>
            </div>

            {/* 2. Check-out Date */}
            <div>
              <label htmlFor="hero-check-out" className="block text-[13px] leading-[18px] font-medium text-graphite-500 mb-2">
                Check-out Date
              </label>
              <div className="relative">
                <input
                  id="hero-check-out"
                  type="date"
                  min={checkIn || todayStr}
                  value={checkOut}
                  onChange={(e) => {
                    onCheckOutChange(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full h-12 px-3.5 pr-9 bg-surface border border-hairline rounded-[12px] text-ink text-[15px] focus:outline-none focus:ring-2 focus:ring-brass-600 focus:border-brass-600 transition-all cursor-pointer"
                  required
                />
                <Calendar className="w-4 h-4 text-graphite-500 absolute right-3.5 top-4 pointer-events-none" aria-hidden="true" />
              </div>
            </div>

            {/* 3. Guests Dropdown */}
            <div>
              <label htmlFor="hero-guests" className="block text-[13px] leading-[18px] font-medium text-graphite-500 mb-2">
                Guests
              </label>
              <div className="relative">
                <select
                  id="hero-guests"
                  value={guests}
                  onChange={(e) => onGuestsChange(Number(e.target.value))}
                  className="w-full h-12 px-3.5 pr-9 bg-surface border border-hairline rounded-[12px] text-ink text-[15px] focus:outline-none focus:ring-2 focus:ring-brass-600 focus:border-brass-600 transition-all appearance-none cursor-pointer"
                >
                  <option value={1}>1 Adult</option>
                  <option value={2}>2 Adults</option>
                  <option value={3}>3 Adults</option>
                  <option value={4}>4 Adults</option>
                </select>
                <Users className="w-4 h-4 text-graphite-500 absolute right-3.5 top-4 pointer-events-none" aria-hidden="true" />
              </div>
            </div>

            {/* 4. Room Type Dropdown */}
            <div>
              <label htmlFor="hero-room-type" className="block text-[13px] leading-[18px] font-medium text-graphite-500 mb-2">
                Room Type
              </label>
              <div className="relative">
                <select
                  id="hero-room-type"
                  value={roomType}
                  onChange={(e) => onRoomTypeChange(e.target.value as RoomCategory)}
                  className="w-full h-12 px-3.5 pr-9 bg-surface border border-hairline rounded-[12px] text-ink text-[15px] focus:outline-none focus:ring-2 focus:ring-brass-600 focus:border-brass-600 transition-all appearance-none cursor-pointer"
                >
                  <option value="all">All Available Rooms</option>
                  <option value="suite">Suites &amp; Lofts</option>
                  <option value="studio">Studios</option>
                  <option value="king">King Rooms</option>
                </select>
                <Home className="w-4 h-4 text-graphite-500 absolute right-3.5 top-4 pointer-events-none" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Validation Error Message */}
          {errorMessage && (
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center gap-2 text-[14px] font-medium text-brass-600 bg-brass-600/10 px-4 py-2.5 rounded-[12px] border border-brass-600/20"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {/* Action Row */}
          <div className="mt-6 pt-6 border-t border-hairline flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2 text-[13px] text-graphite-500">
              <span className="w-2 h-2 rounded-full bg-sage-600"></span>
              <span>Guaranteed best direct rate &bull; No booking fees &bull; Free cancellation up to 48h prior</span>
            </div>

            <motion.button
              type="submit"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              className="h-12 px-8 rounded-full bg-ink text-white text-[15px] font-medium transition-colors hover:bg-black inline-flex items-center justify-center min-w-[200px]"
            >
              Check Availability
            </motion.button>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Room, RoomCategory } from '../types';
import { RoomCard } from './RoomCard';

interface RoomsGridProps {
  rooms: Room[];
  selectedCategory: RoomCategory;
  onCategoryChange: (cat: RoomCategory) => void;
  onSelectRoom: (room: Room) => void;
  selectedNights?: number;
}

export const RoomsGrid: React.FC<RoomsGridProps> = ({
  rooms,
  selectedCategory,
  onCategoryChange,
  onSelectRoom,
  selectedNights = 1,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Filter rooms based on selected category
  const filteredRooms = selectedCategory === 'all'
    ? rooms
    : rooms.filter((r) => r.category === selectedCategory);

  const filterTabs: { label: string; value: RoomCategory }[] = [
    { label: 'All Rooms', value: 'all' },
    { label: 'Suites & Lofts', value: 'suite' },
    { label: 'Studios', value: 'studio' },
    { label: 'King Rooms', value: 'king' },
  ];

  return (
    <section id="rooms" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="block text-[13px] uppercase tracking-wider font-semibold text-brass-600 mb-2"
          >
            Refined Accommodations
          </motion.span>
          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-[32px] sm:text-[40px] leading-[36px] sm:leading-[44px] font-semibold text-ink tracking-[-0.015em]"
          >
            Suites &amp; Sanctuaries
          </motion.h2>
        </div>

        {/* See all rates link (Resets filter) */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-4"
        >
          <button
            type="button"
            onClick={() => onCategoryChange('all')}
            className="link-underlined text-[15px] font-medium text-brass-600 focus-visible:rounded-md cursor-pointer inline-flex items-center"
          >
            See all rates &amp; availability &rarr;
          </button>
        </motion.div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-hairline/60">
        {filterTabs.map((tab) => {
          const isActive = selectedCategory === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onCategoryChange(tab.value)}
              className={`min-h-[44px] px-5 py-2 text-[14px] font-medium rounded-full transition-all cursor-pointer ${
                isActive
                  ? 'bg-ink text-white shadow-sm'
                  : 'bg-transparent text-graphite-500 hover:text-ink hover:bg-black/5'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3-Column Responsive Grid with Staggered Scroll-Reveal */}
      <motion.div
        layout={!shouldReduceMotion}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredRooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onSelect={onSelectRoom}
            selectedNights={selectedNights}
          />
        ))}
      </motion.div>

      {/* Direct Booking Value Guarantee */}
      <div className="mt-16 bg-surface border border-hairline/60 rounded-[18px] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h4 className="text-[17px] font-semibold text-ink">Aurelia Direct Booking Guarantee</h4>
          <p className="text-[14px] text-graphite-500">
            Complimentary room upgrade upon availability, 12:00 PM late check-out, and welcome artisan treats.
          </p>
        </div>
        <a
          href="tel:+2348000000000"
          className="h-11 px-6 rounded-full border border-hairline text-ink text-[14px] font-medium hover:bg-stone-50 transition-colors inline-flex items-center justify-center whitespace-nowrap min-h-[44px]"
        >
          Questions? Call Front Desk
        </a>
      </div>
    </section>
  );
};

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Room } from '../types';

interface RoomCardProps {
  room: Room;
  onSelect: (room: Room) => void;
  selectedNights?: number;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onSelect, selectedNights = 1 }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      layout={!shouldReduceMotion}
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-surface rounded-[18px] shadow-soft hover:shadow-soft-lift transition-shadow duration-300 overflow-hidden flex flex-col border border-hairline/40 h-full"
    >
      {/* 1. Top Photo (Aspect ratio 16:10) */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-hairline">
        <motion.img
          src={room.image}
          alt={room.imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />

        {/* 2. Availability Badge */}
        <div className="absolute top-4 left-4">
          {room.available ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/95 backdrop-blur-sm text-sage-600 text-[13px] leading-[18px] font-medium shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sage-600"></span>
              </span>
              <span>Available &bull; {room.roomsLeft} {room.roomsLeft === 1 ? 'room' : 'rooms'} left</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/95 backdrop-blur-sm text-graphite-500 text-[13px] leading-[18px] font-medium shadow-sm">
              <span className="w-2 h-2 rounded-full bg-graphite-500"></span>
              <span>Sold out for selected dates</span>
            </span>
          )}
        </div>

        {/* Room specs pill */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-ink/70 backdrop-blur-sm text-white text-[12px] font-normal">
          {room.sqm} m² &bull; {room.bedType}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          {/* 3. Room Name */}
          <h3 className="text-[28px] leading-[32px] font-semibold text-ink tracking-tight mb-2">
            {room.name}
          </h3>

          {/* 4. Description: Exactly one descriptive sentence */}
          <p className="text-[17px] leading-[24px] text-graphite-500 font-normal">
            {room.description}
          </p>
        </div>

        {/* 5. Footer Row */}
        <div className="mt-6 pt-6 border-t border-hairline flex items-center justify-between gap-4">
          {/* Left: Nightly rate in Brass + Caption */}
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-[24px] leading-[28px] font-semibold text-brass-600">
                ${room.ratePerNight}
              </span>
              <span className="text-[14px] text-graphite-500 font-normal">
                / night
              </span>
            </div>
            <p className="text-[13px] leading-[18px] text-graphite-500 font-normal">
              {selectedNights > 1 ? `$${room.ratePerNight * selectedNights} total (${selectedNights} nights)` : 'Includes taxes & fees'}
            </p>
          </div>

          {/* Right: Button State */}
          {room.available ? (
            <motion.button
              type="button"
              onClick={() => onSelect(room)}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              className="h-11 px-6 rounded-full bg-brass-600 hover:bg-[#785b32] text-white text-[14px] font-medium transition-colors inline-flex items-center justify-center min-w-[96px]"
              aria-label={`Select ${room.name} for $${room.ratePerNight} per night`}
            >
              Select
            </motion.button>
          ) : (
            <button
              type="button"
              disabled
              className="h-11 px-6 rounded-full bg-hairline text-graphite-500 text-[14px] font-medium cursor-not-allowed inline-flex items-center justify-center min-w-[96px]"
              aria-label={`${room.name} is sold out`}
            >
              Sold out
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, Calendar, Phone, Check, AlertCircle, ArrowRight } from 'lucide-react';
import type { Room } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoom: Room | null;
  initialCheckIn: string;
  initialCheckOut: string;
  initialGuests: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedRoom,
  initialCheckIn,
  initialCheckOut,
  initialGuests,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(initialGuests || 2);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  // Sync initial values when modal opens or props change
  useEffect(() => {
    if (isOpen) {
      setCheckIn(initialCheckIn);
      setCheckOut(initialCheckOut);
      setGuests(initialGuests || 2);
      setIsSuccess(false);
      setErrorMessage(null);
    }
  }, [isOpen, initialCheckIn, initialCheckOut, initialGuests]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Calculate nights
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diffTime = d2.getTime() - d1.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();
  const ratePerNight = selectedRoom?.ratePerNight || 285;
  const subtotal = ratePerNight * nights;
  const taxesAndFees = Math.round(subtotal * 0.075); // 7.5% VAT
  const total = subtotal + taxesAndFees;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setErrorMessage('Please provide your full name for the guest list.');
      return;
    }
    if (!guestPhone.trim()) {
      setErrorMessage('Please provide a contact phone number.');
      return;
    }
    if (!checkIn || !checkOut) {
      setErrorMessage('Please specify your arrival and departure dates.');
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      setErrorMessage('Check-out date must be after check-in date.');
      return;
    }

    // Success reservation
    const randomRef = 'AUR-' + Math.floor(100000 + Math.random() * 900000);
    setReferenceCode(randomRef);
    setIsSuccess(true);
    setErrorMessage(null);
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-8">
          
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1D1D1F]/40 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Dialog Container */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="relative w-full max-w-xl bg-surface rounded-[18px] shadow-modal border border-hairline overflow-hidden z-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header */}
            <div className="p-6 border-b border-hairline flex items-center justify-between">
              <div>
                <span className="text-[12px] font-semibold text-brass-600 uppercase tracking-wider block">
                  Direct Reservation
                </span>
                <h3 id="modal-title" className="text-[24px] font-semibold text-ink tracking-tight">
                  {selectedRoom ? selectedRoom.name : 'Select Accommodation'}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-11 h-11 rounded-full flex items-center justify-center text-graphite-500 hover:text-ink hover:bg-stone-50 transition-colors focus-visible:ring-2 focus-visible:ring-brass-600"
                aria-label="Close booking modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            {!isSuccess ? (
              <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 space-y-6">
                
                {/* Stay Dates & Guests Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Check-in */}
                  <div>
                    <label htmlFor="modal-checkin" className="block text-[13px] leading-[18px] font-medium text-graphite-500 mb-2">
                      Check-in Date
                    </label>
                    <div className="relative">
                      <input
                        id="modal-checkin"
                        type="date"
                        min={todayStr}
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full h-12 px-3.5 pr-9 bg-surface border border-hairline rounded-[12px] text-ink text-[14px] focus:outline-none focus:ring-2 focus:ring-brass-600 focus:border-brass-600 transition-all cursor-pointer"
                        required
                      />
                      <Calendar className="w-4 h-4 text-graphite-500 absolute right-3.5 top-4 pointer-events-none" />
                    </div>
                  </div>

                  {/* Check-out */}
                  <div>
                    <label htmlFor="modal-checkout" className="block text-[13px] leading-[18px] font-medium text-graphite-500 mb-2">
                      Check-out Date
                    </label>
                    <div className="relative">
                      <input
                        id="modal-checkout"
                        type="date"
                        min={checkIn || todayStr}
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full h-12 px-3.5 pr-9 bg-surface border border-hairline rounded-[12px] text-ink text-[14px] focus:outline-none focus:ring-2 focus:ring-brass-600 focus:border-brass-600 transition-all cursor-pointer"
                        required
                      />
                      <Calendar className="w-4 h-4 text-graphite-500 absolute right-3.5 top-4 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Guest Details */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="modal-name" className="block text-[13px] leading-[18px] font-medium text-graphite-500 mb-2">
                      Lead Guest Full Name
                    </label>
                    <input
                      id="modal-name"
                      type="text"
                      placeholder="e.g. Katherine Sterling"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full h-12 px-3.5 bg-surface border border-hairline rounded-[12px] text-ink text-[15px] focus:outline-none focus:ring-2 focus:ring-brass-600 focus:border-brass-600 transition-all placeholder:text-graphite-500/50"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="modal-phone" className="block text-[13px] leading-[18px] font-medium text-graphite-500 mb-2">
                        Mobile Phone Number
                      </label>
                      <input
                        id="modal-phone"
                        type="tel"
                        placeholder="+234 800 000 0000"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full h-12 px-3.5 bg-surface border border-hairline rounded-[12px] text-ink text-[15px] focus:outline-none focus:ring-2 focus:ring-brass-600 focus:border-brass-600 transition-all placeholder:text-graphite-500/50"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="modal-guests" className="block text-[13px] leading-[18px] font-medium text-graphite-500 mb-2">
                        Party Size
                      </label>
                      <select
                        id="modal-guests"
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full h-12 px-3.5 bg-surface border border-hairline rounded-[12px] text-ink text-[15px] focus:outline-none focus:ring-2 focus:ring-brass-600 focus:border-brass-600 transition-all cursor-pointer"
                      >
                        <option value={1}>1 Adult</option>
                        <option value={2}>2 Adults</option>
                        <option value={3}>3 Adults</option>
                        <option value={4}>4 Adults</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="modal-notes" className="block text-[13px] leading-[18px] font-medium text-graphite-500 mb-2">
                      Special Requests / Arrival Time (Optional)
                    </label>
                    <input
                      id="modal-notes"
                      type="text"
                      placeholder="e.g. Quiet upper floor, arrival at 3:00 PM"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full h-12 px-3.5 bg-surface border border-hairline rounded-[12px] text-ink text-[14px] focus:outline-none focus:ring-2 focus:ring-brass-600 focus:border-brass-600 transition-all placeholder:text-graphite-500/50"
                    />
                  </div>
                </div>

                {/* Automatic Multi-Night Price Calculator */}
                <div className="bg-stone-50 p-4 rounded-[12px] border border-hairline space-y-2 text-[14px]">
                  <div className="flex justify-between text-graphite-500">
                    <span>${ratePerNight} &times; {nights} {nights === 1 ? 'night' : 'nights'}</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-graphite-500">
                    <span>Taxes &amp; Local Fees (7.5%)</span>
                    <span>${taxesAndFees}</span>
                  </div>
                  <div className="pt-2 border-t border-hairline flex justify-between items-baseline font-semibold text-ink">
                    <span>Total Guaranteed Amount</span>
                    <span className="text-[20px] text-brass-600 font-bold">${total}</span>
                  </div>
                </div>

                {/* Validation Error */}
                {errorMessage && (
                  <div className="flex items-center gap-2 text-[14px] font-medium text-brass-600 bg-brass-600/10 px-4 py-2.5 rounded-[12px] border border-brass-600/20" role="alert">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Modal Actions */}
                <div className="pt-2 space-y-3">
                  <motion.button
                    type="submit"
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                    className="w-full h-12 rounded-full bg-ink hover:bg-black text-white text-[15px] font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Confirm Reservation</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  <div className="flex items-center justify-center gap-2 pt-1 text-[13px] text-graphite-500">
                    <span>Prefer to pay on arrival?</span>
                    <a
                      href="tel:+2348000000000"
                      className="link-underlined text-brass-600 font-medium inline-flex items-center gap-1"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Front Desk Directly</span>
                    </a>
                  </div>
                </div>
              </form>
            ) : (
              /* Success Confirmation State */
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="p-8 sm:p-10 text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-sage-600/10 text-sage-600 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 stroke-[2.5]" />
                </div>

                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-sage-600/15 text-sage-600 text-[13px] font-semibold mb-2">
                    Confirmed &bull; Zero Fees
                  </span>
                  <h4 className="text-[26px] font-semibold text-ink tracking-tight">
                    Reservation Received
                  </h4>
                  <p className="mt-2 text-[15px] text-graphite-500 max-w-sm mx-auto">
                    Thank you, <strong className="text-ink">{guestName}</strong>. Your suite has been reserved at our guaranteed direct rate.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="bg-stone-50 rounded-[12px] p-5 text-left text-[14px] space-y-2.5 border border-hairline">
                  <div className="flex justify-between">
                    <span className="text-graphite-500">Reference:</span>
                    <span className="font-mono font-semibold text-ink tracking-wide">{referenceCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-graphite-500">Room:</span>
                    <span className="font-medium text-ink">{selectedRoom?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-graphite-500">Stay Duration:</span>
                    <span className="text-ink">{nights} {nights === 1 ? 'Night' : 'Nights'} ({checkIn} &rarr; {checkOut})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-graphite-500">Guests:</span>
                    <span className="text-ink">{guests} {guests === 1 ? 'Adult' : 'Adults'}</span>
                  </div>
                  <div className="pt-2 border-t border-hairline flex justify-between font-semibold">
                    <span className="text-ink">Total to Pay on Arrival:</span>
                    <span className="text-brass-600 font-bold">${total}</span>
                  </div>
                </div>

                {/* Direct Assistance CTA */}
                <div className="space-y-3 pt-2">
                  <a
                    href="tel:+2348000000000"
                    className="w-full h-12 rounded-full bg-brass-600 hover:bg-[#785b32] text-white text-[15px] font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Concierge with Reference</span>
                  </a>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full h-12 rounded-full border border-hairline text-ink text-[14px] font-medium hover:bg-stone-50 transition-colors"
                  >
                    Done &amp; Return to Hotel
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

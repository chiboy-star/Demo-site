import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RoomsGrid } from './components/RoomsGrid';
import { ContactLocation } from './components/ContactLocation';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';
import { ROOMS } from './data/rooms';
import type { Room, RoomCategory } from './types';

export const App: React.FC = () => {
  // Booking state
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState<RoomCategory>('all');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // Calculate nights
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diffTime = d2.getTime() - d1.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const selectedNights = calculateNights();

  // Search availability handler
  const handleSearchAvailability = () => {
    const roomsSection = document.getElementById('rooms');
    if (roomsSection) {
      roomsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Select room handler
  const handleSelectRoom = (room: Room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  // Navbar "Book now" handler
  const handleOpenGeneralBooking = () => {
    // If no room is pre-selected, select the first available room
    if (!selectedRoom) {
      const defaultAvailable = ROOMS.find((r) => r.available) || ROOMS[0];
      setSelectedRoom(defaultAvailable);
    }
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-ink selection:bg-brass-600/20 selection:text-brass-600">
      {/* 1. Sticky Navigation Bar */}
      <Navbar onOpenBooking={handleOpenGeneralBooking} />

      {/* Main Content Area */}
      <main id="main-content">
        {/* 2. Hero Section & Interactive Booking Bar */}
        <Hero
          checkIn={checkIn}
          checkOut={checkOut}
          guests={guests}
          roomType={roomType}
          onCheckInChange={setCheckIn}
          onCheckOutChange={setCheckOut}
          onGuestsChange={setGuests}
          onRoomTypeChange={setRoomType}
          onSearchAvailability={handleSearchAvailability}
        />

        {/* 3. Room Showcase Grid (#rooms) */}
        <RoomsGrid
          rooms={ROOMS}
          selectedCategory={roomType}
          onCategoryChange={setRoomType}
          onSelectRoom={handleSelectRoom}
          selectedNights={checkIn && checkOut ? selectedNights : 1}
        />

        {/* 4. Direct Contact & Google Location (#location & #contact) */}
        <ContactLocation />
      </main>

      {/* 5. Booking Confirmation Modal (<AnimatePresence>) */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedRoom={selectedRoom}
        initialCheckIn={checkIn}
        initialCheckOut={checkOut}
        initialGuests={guests}
      />

      {/* 6. Footer */}
      <Footer />
    </div>
  );
};

export default App;

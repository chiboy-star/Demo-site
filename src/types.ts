export type RoomCategory = 'all' | 'suite' | 'studio' | 'king';

export interface Room {
  id: string;
  name: string;
  category: RoomCategory;
  categoryLabel: string;
  description: string;
  ratePerNight: number;
  available: boolean;
  roomsLeft?: number;
  image: string;
  imageAlt: string;
  maxGuests: number;
  bedType: string;
  sqm: number;
}

export interface BookingDetails {
  roomId: string;
  roomName: string;
  ratePerNight: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  guestPhone: string;
  specialRequests?: string;
  totalNights: number;
  totalPrice: number;
}

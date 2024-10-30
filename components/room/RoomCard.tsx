"use client";

import { Booking, Hotel, Room } from "@prisma/client";

interface RoomCardProps {
  hotel?: Hotel & {
    rooms: Room[];
  };
  room: Room;
  bookings?: Booking[];
}

const RoomCard = ({ hotel, room, bookings = [] }: RoomCardProps) => {
  return <div>{room.title}</div>;
};

export default RoomCard;

"use client";

import { Hotel, Room } from "@prisma/client";

interface AddHotelFormProps {
  hotel: HotelWithRooms | null;
}

export type HotelWithRooms = Hotel & {
  rooms: Room[];
};

const AddHotelForm = ({ hotel }: AddHotelFormProps) => {
  return <div>Add Hotel Form</div>;
};

export default AddHotelForm;

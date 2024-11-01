"use client";

import { Booking } from "@prisma/client";
import { HotelWithRooms } from "./AddHotelForm";
import useLocation from "@/hooks/useLocation";
import Image from "next/image";
import AmenityItem from "../AmenityItem";
import { MapPin } from "lucide-react";
import { FaSwimmer } from "react-icons/fa";

const HotelDetailsClient = ({
  hotel,
  booking,
}: {
  hotel: HotelWithRooms;
  booking?: Booking[];
}) => {
  const { getCountryByCode, getStatesByCode } = useLocation();
  const country = getCountryByCode(hotel.country);

  const state = getStatesByCode(hotel.country, hotel.state);
  return (
    <div className="flex flex-col gap-2 pb-2">
      <div className="aspect-square overflow-hidden relative w-full h-[200px] md:h-[400px] rounded-lg">
        <Image
          fill
          src={hotel.image}
          alt={hotel.title}
          className="object-cover"
        />
      </div>
      <div>
        <h3 className="font-semibold tex-xl md:text-3xl">{hotel.title}</h3>
        <div className="font-semibold mt-4">
          <AmenityItem>
            <MapPin className="size-4" />
            {country?.name}, {state?.name}, {hotel.city}
          </AmenityItem>
        </div>
        <h3 className="font-semibold text-lg mt-4 mb-2">Location Details</h3>
        <p className="text-primary/90 mb-2">{hotel.locationDescription}</p>
        <h3 className="font-semibold text-lg mt-4 mb-2">About this hotel</h3>
        <p className="text-primary/90 mb-2">{hotel.description}</p>
        <h3 className="font-semibold text-lg mt-4 mb-2">Popular Amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 content-start text-sm">
          {hotel.swimmingPool && (
            <AmenityItem>
              <FaSwimmer className="size-4" /> Swimming Pool
            </AmenityItem>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsClient;

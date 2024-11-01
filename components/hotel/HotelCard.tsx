"use client";

import { usePathname, useRouter } from "next/navigation";
import { HotelWithRooms } from "./AddHotelForm";
import { cn } from "@/lib/utils";
import Image from "next/image";
import AmenityItem from "../AmenityItem";
import {
  BedIcon,
  Bike,
  Car,
  Coffee,
  Dumbbell,
  IceCreamBowl,
  MapPin,
  Tv,
  Users,
  WashingMachine,
  Wifi,
  Wine,
} from "lucide-react";
import useLocation from "@/hooks/useLocation";
import { Button } from "../ui/button";
import { FaSpa, FaSwimmer } from "react-icons/fa";

const HotelCard = ({ hotel }: { hotel: HotelWithRooms }) => {
  const pathname = usePathname();
  const isMyHotels = pathname.includes("my-hotels");
  const router = useRouter();

  const { getCountryByCode } = useLocation();
  const country = getCountryByCode(hotel.country);

  return (
    <div
      onClick={() => !isMyHotels && router.push(`/hotel-details/${hotel.id}`)}
      className={cn(
        "col-span-1  cursor-pointer transition hover:scale-105",
        isMyHotels && "cursor-default"
      )}
    >
      <div className="flex gap-2 bg-background/50 border border-primary/10 rounded-lg">
        <div className="flex-1 aspect-square overflow-hidden relative w-full h-[210px] rounded-s-lg ">
          <Image
            fill
            src={hotel.image}
            layout="fill"
            objectFit="cover"
            alt={hotel.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between p-1 gap-1 py-2 text-sm">
          <h3 className="font-semibold text-xl">{hotel.title}</h3>
          <div className="text-primary/90 mb-2">
            {hotel.description.substring(0, 45)}...
          </div>{" "}
          <AmenityItem>
            <MapPin className="size-4" />
            <span>{country?.name}</span>
            <span>{hotel.city}</span>
          </AmenityItem>
          <div className="text-primary/90 grid grid-cols-2 gap-4">
            {hotel.bar && (
              <AmenityItem>
                <Wine className="size-4" />
                Bar
              </AmenityItem>
            )}
            {hotel.swimmingPool && (
              <AmenityItem>
                <FaSwimmer className="size-4" /> Swimming Pool
              </AmenityItem>
            )}
            {hotel.movieNights && (
              <AmenityItem>
                <Tv className="size-4" /> Movie Nights
              </AmenityItem>
            )}
            {hotel.gym && (
              <AmenityItem>
                <Dumbbell className="size-4" /> Gym
              </AmenityItem>
            )}
            {hotel.laundry && (
              <AmenityItem>
                <WashingMachine className="size-4" /> Laundry
              </AmenityItem>
            )}
            {hotel.bikeRental && (
              <AmenityItem>
                <Bike className="size-4" /> Bike Rental
              </AmenityItem>
            )}
            {hotel.freeWifi && (
              <AmenityItem>
                <Wifi className="size-4" />
                Free Wifi
              </AmenityItem>
            )}
            {hotel.freeParking && (
              <AmenityItem>
                <Car className="size-4" />
                Free Parking
              </AmenityItem>
            )}
            {hotel.coffeeShop && (
              <AmenityItem>
                <Coffee className="size-4" /> Coffee Shop
              </AmenityItem>
            )}
            {hotel.restaurant && (
              <AmenityItem>
                <IceCreamBowl className="size-4" /> Restaurant
              </AmenityItem>
            )}

            {hotel.spa && (
              <AmenityItem>
                <FaSpa className="size-4" /> Spa
              </AmenityItem>
            )}
            {hotel.conferenceRoom && (
              <AmenityItem>
                <Users className="size-4" /> Conference Room
              </AmenityItem>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {hotel?.rooms?.[0]?.roomPrice ? (
                <div className="font-semibold text-base">
                  ${hotel.rooms[0].roomPrice}
                  <span className="text-xs">/ 24hrs</span>
                </div>
              ) : (
                <div className="text-gray-500">Price unavailable</div>
              )}
            </div>
            {isMyHotels && (
              <Button
                onClick={() => router.push(`/hotel/${hotel.id}`)}
                variant="outline"
              >
                Edit Hotel
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
<></>;
export default HotelCard;

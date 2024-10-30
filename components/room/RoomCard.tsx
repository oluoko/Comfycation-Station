"use client";

import { Booking, Hotel, Room } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import AmenityItem from "../AmenityItem";
import {
  AirVent,
  Bath,
  Bed,
  BedDouble,
  Castle,
  Home,
  Loader2,
  MountainSnow,
  Ship,
  Speaker,
  Trash,
  Tv,
  Users,
  UtensilsCrossed,
  Wifi,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";

interface RoomCardProps {
  hotel?: Hotel & {
    rooms: Room[];
  };
  room: Room;
  bookings?: Booking[];
}

const RoomCard = ({ hotel, room, bookings = [] }: RoomCardProps) => {
  const pathname = usePathname();
  const isHotelDetailsPage = pathname.includes("hotel-details");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.title}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="aspect-square overflow-hidden relative h-[200px] rounded-lg">
          <Image
            fill
            src={room.image}
            alt={room.title}
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-2 content-start gap-4 text-sm">
          <AmenityItem>
            <Bed className="h-4 w-4" /> {room.bedCount} Bed{"(s)"}
          </AmenityItem>
          <AmenityItem>
            <Users className="h-4 w-4" /> {room.guestCount} Guest{"(s)"}
          </AmenityItem>
          <AmenityItem>
            <Bath className="h-4 w-4" />
            {room.bathroomCount} Bathrooms {"(s)"}
          </AmenityItem>
          {room.kingBed > 0 && (
            <AmenityItem>
              <BedDouble className="h-4 w-4" /> {room.kingBed} King Bed{"(s)"}
            </AmenityItem>
          )}
          {room.queenBed > 0 && (
            <AmenityItem>
              <Bed className="h-4 w-4" />
              {room.queenBed} Queen Bed{"(s)"}
            </AmenityItem>
          )}
          {room.roomService && (
            <AmenityItem>
              <UtensilsCrossed className="h-4 w-4" /> Room Service
            </AmenityItem>
          )}
          {room.TV && (
            <AmenityItem>
              <Tv className="h-4 w-4" />
              TV
            </AmenityItem>
          )}
          {room.balcony && (
            <AmenityItem>
              <Home className="h-4 w-4" /> Balcony
            </AmenityItem>
          )}

          {room.freeWifi && (
            <AmenityItem>
              <Wifi className="h-4 w-4" />
              Free Wifi
            </AmenityItem>
          )}
          {room.cityView && (
            <AmenityItem>
              <Castle className="h-4 w-4" />
              City View
            </AmenityItem>
          )}
          {room.oceanView && (
            <AmenityItem>
              <Ship className="h-4 w-4" />
              Ocean View
            </AmenityItem>
          )}
          {room.forestView && (
            <AmenityItem>
              <Trees className="h-4 w-4" />
              Forest View
            </AmenityItem>
          )}
          {room.mountainView && (
            <AmenityItem>
              <MountainSnow className="h-4 w-4" />
              Mountain View
            </AmenityItem>
          )}
          {room.airCondition && (
            <AmenityItem>
              <AirVent className="h-4 w-4" />
              Air Conditioning
            </AmenityItem>
          )}
          {room.soundProofed && (
            <AmenityItem>
              <Speaker className="h-4 w-4" />
              Sound Proofed
            </AmenityItem>
          )}
        </div>
        <Separator />
        <div className="flex gap-4 justify-between">
          <div className="">
            Room Price: <span className="font-bold">${room.roomPrice}</span>
            <span className="xs"> /24hrs</span>
          </div>{" "}
          {!!room.breakFastPrice && (
            <div>
              BreakFast Price:{" "}
              <span className="font-bold">{room.breakFastPrice}</span>
            </div>
          )}
        </div>
        <Separator />
        {isHotelDetailsPage ? (
          <div>Hotel Details Page</div>
        ) : (
          <div className="flex w-full justify-between">
            <Button>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash className="mr-2 h-4" />
                  Delete
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RoomCard;

import { HotelWithRooms } from "./AddHotelForm";
import HotelCard from "./HotelCard";

const HotelList = ({ hotels }: { hotels: HotelWithRooms[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 mt-4">
      {hotels.map((hotel) => (
        <div key={hotel.id}>
          <HotelCard hotel={hotel} />
        </div>
      ))}
    </div>
  );
};

export default HotelList;

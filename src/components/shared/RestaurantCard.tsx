import { Link } from "react-router-dom";
import { AspectRatio } from "../ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";
import { IRestaurantCard } from "@/types";

const RestaurantCard = ({ restaurant }: IRestaurantCard) => {
  return (
    <Link
      to={`/restaurant/${restaurant._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md w-full h-full object-cover"
          alt="image name"
        />
      </AspectRatio>
      <div>
        <h3 className="md:text-2xl font-bold tracking-tight mb-2 group-hover:underline">
          {restaurant.name}
        </h3>
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          <div className="flex flex-row flex-wrap">
            {restaurant.cuisines.map((item, index) => (
              <span className="flex">
                <span>{item}</span>
                {index < restaurant.cuisines.length - 1 && <Dot />}
              </span>
            ))}
          </div>
          <div className="flex gap-2 flex-col text-sm">
            <div className="flex items-center gap-1 text-green-600">
              <Clock className="text-green-600 w-5" />
              {restaurant.estimatedDeliveryTime} mins
            </div>
            <div className="flex items-center gap-1">
              <Banknote className="w-5" />
              Delivery from £{(restaurant.deliveryPrice / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;

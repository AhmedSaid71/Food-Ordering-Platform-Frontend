import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getOrders, getRestaurant } from "@/services";
import { getRestaurantInfo, getRestaurantStatus, getCartDiff } from "@/store";
import {
  Spinner,
  AspectRatio,
  RestaurantInfo,
  MenuItem,
  Card,
  OrderSummary,
  CardFooter,
  CheckoutButton,
  Warning,
} from "@/components";

const Restaurant = () => {
  const dispatch = useAppDispatch();
  const restaurant = useAppSelector(getRestaurantInfo);
  const { id } = useParams();
  const { loading } = useAppSelector(getRestaurantStatus);
  const diff = useAppSelector(getCartDiff);

  useEffect(() => {
    dispatch(getRestaurant(id as string));
    dispatch(getOrders());
  }, [dispatch, id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="flex flex-col gap-10">
      <Warning isOpen={diff} restaurantName={restaurant?.name as string} />
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant?.imageUrl}
          alt={restaurant?.name}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid grid-cols-1 md:grid-cols-[4fr_2fr] gap-5 md:px-32 m-w-[100%]">
        {restaurant && (
          <>
            <div className="flex flex-col gap-4">
              <RestaurantInfo restaurant={restaurant} />
              <span className="text-2xl font-bold tracking-tight">Menu</span>
              {restaurant.menuItems.map((menuItem) => (
                <MenuItem
                  menuItem={menuItem}
                  restaurantId={restaurant._id}
                  restaurantName={restaurant.name}
                  key={menuItem._id}
                />
              ))}
            </div>

            <div>
              <Card>
                <OrderSummary restaurant={restaurant} />
                <CardFooter>
                  <CheckoutButton restaurantId={restaurant._id} />
                </CardFooter>
              </Card>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Restaurant;

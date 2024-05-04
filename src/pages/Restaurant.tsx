import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getRestaurant } from "@/services";
import { getRestaurantInfo, getRestaurantStatus } from "@/store";
import { Spinner, AspectRatio } from "@/components";

const Restaurant = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const restaurant = useAppSelector(getRestaurantInfo);
  const { loading } = useAppSelector(getRestaurantStatus);
  useEffect(() => {
    dispatch(getRestaurant(id as string));
  }, [dispatch, id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant?.imageUrl}
          alt={restaurant?.name}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
    </section>
  );
};

export default Restaurant;

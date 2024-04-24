import { MangeRestaurant, Spinner } from "@/components";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { getRestaurant } from "@/store/restaurantSlice";
import { useEffect, useState } from "react";

const Restaurant = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(getRestaurant())
      .unwrap()
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  return <section>{isLoading ? <Spinner /> : <MangeRestaurant />}</section>;
};

export default Restaurant;

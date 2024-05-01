import { MangeRestaurant, Spinner } from "@/components";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { getMyRestaurant } from "@/services/apiRestaurants";
import { useEffect, useState } from "react";

const MyRestaurant = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(getMyRestaurant())
      .unwrap()
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  return <section>{isLoading ? <Spinner /> : <MangeRestaurant />}</section>;
};

export default MyRestaurant;

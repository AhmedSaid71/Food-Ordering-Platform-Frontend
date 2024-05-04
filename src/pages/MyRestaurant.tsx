import { useEffect, useState } from "react";
import { MangeRestaurant, Spinner } from "@/components";
import { useAppDispatch } from "@/hooks";
import { getMyRestaurant } from "@/services";

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

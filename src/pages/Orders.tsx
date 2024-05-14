import {
  AspectRatio,
  OrderStatusDetails,
  OrderStatusHeader,
  Spinner,
} from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getOrders } from "@/services";
import { getOrdersData, getOrdersStatus } from "@/store";
import { useEffect } from "react";

const Orders = () => {
  const orders = useAppSelector(getOrdersData);
  const { loading } = useAppSelector(getOrdersStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="md:space-y-10">
      {orders?.map((order) => (
        <div className="space-y-10 bg-gray-50 p-10 rounded-lg" key={order._id}>
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetails order={order} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl}
                className="rounded-md object-cover h-full w-full"
                alt={order._id}
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Orders;

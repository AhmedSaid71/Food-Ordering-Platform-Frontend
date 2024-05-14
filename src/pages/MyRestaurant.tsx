import { useEffect } from "react";
import {
  MangeRestaurant,
  OrderItemCard,
  Spinner,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getMyRestaurant, getMyRestaurantOrders } from "@/services";
import { getRestaurantOrders, getRestaurantStatus } from "@/store";

const MyRestaurant = () => {
  const { loading } = useAppSelector(getRestaurantStatus);
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getRestaurantOrders);
  useEffect(() => {
    dispatch(getMyRestaurant());
    dispatch(getMyRestaurantOrders());
  }, [dispatch]);

  return (
    <section>
      {loading ? (
        <Spinner />
      ) : (
        <Tabs defaultValue="orders">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="manage-restaurant">
              Manage Restaurant
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="orders"
            className="space-y-5 bg-gray-50 p-10 rounded-lg"
          >
            <h2 className="text-2xl font-bold">
              {orders?.length} active orders
            </h2>
            {orders?.map((order) => (
              <OrderItemCard order={order} />
            ))}
          </TabsContent>
          <TabsContent value="manage-restaurant">
            <MangeRestaurant />
          </TabsContent>
        </Tabs>
      )}
    </section>
  );
};

export default MyRestaurant;

import { useEffect, useState } from "react";
import {
  Button,
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
import {
  getIsAuthenticated,
  getMyRestaurantInfo,
  getRestaurantOrders,
  getRestaurantStatus,
} from "@/store";

const MyRestaurant = () => {
  const { loading } = useAppSelector(getRestaurantStatus);
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getRestaurantOrders);
  const isAuthenticated = useAppSelector(getIsAuthenticated);
  const myRestaurant = useAppSelector(getMyRestaurantInfo);
  const [tab, setTab] = useState("orders");
  useEffect(() => {
    dispatch(getMyRestaurant());
    dispatch(getMyRestaurantOrders());
  }, [dispatch]);
  const onTabChange = (value: string) => {
    setTab(value);
  };
  return (
    <section>
      <Tabs defaultValue={tab} value={tab} onValueChange={onTabChange}>
        {loading ? (
          <Spinner />
        ) : (
          <>
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
              {isAuthenticated && !myRestaurant ? (
                <div className="flex flex-col justify-center items-center gap-4">
                  <h1 className="text-xl">
                    You have to create restaurant to see restaurant's orders
                  </h1>
                  <Button
                    onClick={() => setTab("manage-restaurant")}
                    className="w-fit bg-orange-500"
                  >
                    Create Restaurant
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold">
                    {orders?.length} active orders
                  </h2>
                  {orders?.map((order) => (
                    <OrderItemCard order={order} key={order._id} />
                  ))}
                </>
              )}
            </TabsContent>
          </>
        )}
        <TabsContent value="manage-restaurant">
          <MangeRestaurant />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default MyRestaurant;

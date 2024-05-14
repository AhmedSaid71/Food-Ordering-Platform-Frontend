import { IOrderStatusHeader } from "@/types";
import { Progress } from "@/components";
import { ORDER_STATUS } from "@/constants";
import { getTime } from "@/utils";

const OrderStatusHeader = ({ order }: IOrderStatusHeader) => {
  const expectedDelivery = getTime(
    order.createdAt,
    order.restaurant.estimatedDeliveryTime
  );

  const getOrderStatusInfo = () => {
    return (
      ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
    );
  };
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
        <span> Order Status: {getOrderStatusInfo().label}</span>
        <span> Expected by: {expectedDelivery}</span>
      </h1>
      <Progress
        className="animate-pulse"
        value={getOrderStatusInfo().progressValue}
      />
    </>
  );
};

export default OrderStatusHeader;

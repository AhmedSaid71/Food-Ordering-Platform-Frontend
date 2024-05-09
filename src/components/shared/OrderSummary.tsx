import { ICartItem, IOrderSummary } from "@/types";
import {
  Badge,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from "@/components";
import { Trash } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getCart, removeFromCart } from "@/store";

const OrderSummary = ({ restaurant }: IOrderSummary) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(getCart);

  const getTotalCost = () => {
    const total = cartItems?.reduce(
      (totalCost, item) => totalCost + item?.price * item?.quantity,
      0
    );
    const totalCost = total + restaurant?.deliveryPrice;
    return (totalCost / 100).toFixed(2);
  };

  const remove = (item: ICartItem) => {
    dispatch(removeFromCart(item));
  };
  if (cartItems.length === 0) return null;
  return (
    <section>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>£{getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <Separator />
        {cartItems.map((item) => (
          <div className="flex justify-between" key={item._id}>
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className="flex items-center gap-1">
              <Trash
                className="cursor-pointer"
                color="red"
                size={20}
                onClick={() => remove(item)}
              />
              £{((item.price * item.quantity) / 100).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>£{(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>
      </CardContent>
    </section>
  );
};

export default OrderSummary;

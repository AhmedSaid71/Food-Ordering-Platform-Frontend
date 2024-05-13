import { getCart, getIsAuthenticated, getRestaurantInfo } from "@/store";
import { useAppSelector } from "@/hooks";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  ProfileForm,
} from "@/components";
import { useLocation, useNavigate } from "react-router-dom";
import { TUpdateProfileValidator } from "@/types";
import { useState } from "react";
import { createCheckoutSession } from "@/services";
type prop = {
  restaurantId: string;
};
const CheckoutButton = ({ restaurantId }: prop) => {
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = useAppSelector(getIsAuthenticated);
  const cartItems = useAppSelector(getCart);
  const restaurant = useAppSelector(getRestaurantInfo);

  const onLogin = () => {
    navigate("/login", { state: { from: pathname } });
  };

  const onCheckout = async (data: TUpdateProfileValidator) => {
    if (!restaurant) return;
    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId,
      deliveryDetails: {
        name: data.name,
        addressLine1: data.addressLine1,
        city: data.city,
        country: data.country,
        email: data.email as string,
      },
    };
    createCheckoutSession(checkoutData, setLoading);
  };

  return (
    <>
      {!isAuthenticated ? (
        <Button className="bg-orange-500 flex-1" onClick={onLogin}>
          Log in to check out
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 flex-1">Go to checkout</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
            <ProfileForm
              onSubmit={onCheckout}
              loading={loading}
              title="Confirm Delivery Details"
              buttonText="Continue to payment"
              loadingBtnText="Continue to payment"
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default CheckoutButton;

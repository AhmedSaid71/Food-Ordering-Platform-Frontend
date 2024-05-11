import { getIsAuthenticated } from "@/store";
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

const CheckoutButton = () => {
  const isAuthenticated = useAppSelector(getIsAuthenticated);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onLogin = () => {
    navigate("/login", { state: { from: pathname } });
  };
  const loading = false;
  const onCheckout = (data: TUpdateProfileValidator) => {
    console.log(data);
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
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default CheckoutButton;

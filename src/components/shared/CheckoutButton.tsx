import { getIsAuthenticated } from "@/store";
import { useAppSelector } from "@/hooks";
import { Button } from "@/components";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutButton = () => {
  const isAuthenticated = useAppSelector(getIsAuthenticated);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onLogin = () => {
    navigate("/login", { state: { from: pathname } });
  };
  return (
    <>
      {!isAuthenticated ? (
        <Button className="bg-orange-500 flex-1" onClick={onLogin}>
          Log in to check out
        </Button>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default CheckoutButton;

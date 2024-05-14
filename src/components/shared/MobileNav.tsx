import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CircleUserRound, Menu } from "lucide-react";

import { logout } from "@/services";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getAuthStatus, getIsAuthenticated, getUser } from "@/store";

import {
  Button,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components";

const MobileNav = () => {
  const user = useAppSelector(getUser);
  const { loading } = useAppSelector(getAuthStatus);
  const isAuthenticated = useAppSelector(getIsAuthenticated);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then((message) => {
        toast.success(message);
        navigate("/", { replace: true });
      })
      .catch((err) => toast.error(err));
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500 " />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {isAuthenticated ? (
            <span className="flex items-center from-bold gap-2">
              <CircleUserRound className="text-orange-500" />
              {user?.name}
            </span>
          ) : (
            <span>Welcome to MernEats.com!</span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="orders"
                className="flex items-center bg-white font-bold hover:text-orange-500"
              >
                Orders
              </Link>
              <Link
                to="manage-restaurant"
                className="flex items-center bg-white font-bold hover:text-orange-500"
              >
                Mange Restaurant
              </Link>
              <Link
                to="user-profile"
                className="flex items-center bg-white font-bold hover:text-orange-500"
              >
                User Profile
              </Link>
              <Button
                className="flex items-center px-3 font-bold hover:bg-gray-500"
                onClick={handleLogout}
                disabled={loading}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              className="flex-1 font-bold bg-orange-500"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;

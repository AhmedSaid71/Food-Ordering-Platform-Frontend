import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { CircleUserRound, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { UserMenu } from "..";
import { getUser } from "@/store/userSlice";
import { logout, getAuthObj } from "@/store/authSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const user = useAppSelector(getUser);
  const { loading, error, isAuthenticated } = useAppSelector(getAuthObj);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <nav>
      <div className="md:hidden flex items-center justify-center">
        <Sheet>
          <SheetTrigger>
            <Menu className="text-orange-500 " />
          </SheetTrigger>
          <SheetContent className="space-y-3">
            <SheetTitle>
              {isAuthenticated ? (
                <>
                  <span className="flex items-center from-bold gap-2">
                    <CircleUserRound className="text-orange-500" />
                  </span>
                  <span>{user?.name}</span>
                </>
              ) : (
                <span>Welcome to MernEats.com!</span>
              )}
            </SheetTitle>
            <Separator />
            <SheetDescription className="flex flex-col gap-4">
              {isAuthenticated ? (
                <>
                  <NavLink
                    to="user-profile"
                    className="flex items-center bg-white font-bold hover:text-orange-500"
                  >
                    User Profile
                  </NavLink>
                  <Button
                    className="flex items-center px-3 font-bold hover:bg-gray-500"
                    onClick={() =>
                      dispatch(logout())
                        .unwrap()
                        .then(() => {
                          if (error) {
                            return toast.error(
                              "Something went wrong!. please try again"
                            );
                          }
                          toast.success("You have been logged out");
                        })
                    }
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
      </div>
      <div className="hidden md:flex items-center justify-center">
        <span className="flex space-x-2 items-center">
          {isAuthenticated ? (
            <>
              <Link
                to="/order-status"
                className="font-bold hover:text-orange-500"
              >
                Order Status
              </Link>
              <UserMenu />
            </>
          ) : (
            <Button
              onClick={() => navigate("login")}
              className="font-bold hover:text-orange-500 hover:bg-white"
              variant="ghost"
            >
              Login
            </Button>
          )}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;

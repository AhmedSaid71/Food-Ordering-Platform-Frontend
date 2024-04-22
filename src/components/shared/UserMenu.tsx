import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { getAuthObj, logout } from "@/store/authSlice";
import { getUser } from "@/store/userSlice";
import toast from "react-hot-toast";

const UserMenu = () => {
  const user = useAppSelector(getUser);
  const { error } = useAppSelector(getAuthObj);
  const dispatch = useAppDispatch();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500 gap-2">
        <CircleUserRound className="text-orange-500" />
        <span className="capitalize">{user?.name}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="group">
          <Link
            to="/manage-restaurant"
            className="font-bold group-hover:text-orange-500"
          >
            Manage Restaurant
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="group">
          <Link
            to="/user-profile"
            className="font-bold group-hover:text-orange-500 w-[100%]"
          >
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
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
            className="flex flex-1 font-bold bg-orange-500"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;

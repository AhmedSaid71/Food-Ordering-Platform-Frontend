import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { getUser } from "@/store";
import { logout } from "@/services";
import { CircleUserRound } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
  Button,
} from "@/components";

const UserMenu = () => {
  const navigate = useNavigate();
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(logout())
      .unwrap()
      .then((message) => {
        toast.success(message);
        navigate("/", { replace: true });
      })
      .catch((err) => toast.error(err));
  };

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
            onClick={handleClick}
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

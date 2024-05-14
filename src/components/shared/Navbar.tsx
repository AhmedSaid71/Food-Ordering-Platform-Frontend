import { Link, useNavigate } from "react-router-dom";

import { useAppSelector } from "@/hooks";
import { getIsAuthenticated } from "@/store";

import { Button, MobileNav, UserMenu } from "@/components";

const Navbar = () => {
  const isAuthenticated = useAppSelector(getIsAuthenticated);
  const navigate = useNavigate();

  return (
    <nav>
      <div className="md:hidden flex items-center justify-center">
        <MobileNav />
      </div>
      <div className="hidden md:flex items-center justify-center">
        <span className="flex space-x-2 items-center">
          {isAuthenticated ? (
            <>
              <Link to="/orders" className="font-bold hover:text-orange-500">
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

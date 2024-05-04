import { NavLink } from "react-router-dom";
import { Navbar } from "@/components";
function Header() {
  return (
    <header className="border-b-2 border-b-orange-500 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink
          to="/"
          className="text-3xl from-bold tracking-tight text-orange-500"
        >
          MernEats.com
        </NavLink>
        <Navbar />
      </div>
    </header>
  );
}

export default Header;

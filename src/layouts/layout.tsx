import { Footer, Header } from "@/components";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto flex-1 py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

import { Footer, Header, Hero } from "@/components";
import { Home } from "@/pages";

const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <main className="container mx-auto flex-1 py-10">
        <Home />
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;

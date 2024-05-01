import { download, landing } from "@/assets";
import { SearchBar } from "@/components";
import { TSearchBarValidator } from "@/types";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: TSearchBarValidator) => {
    navigate(`/restaurants/${searchFormValues.searchQuery}`);
  };

  return (
    <section className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16 px-2">
        <h1 className=" text-4xl md:text-5xl font-bold tracking-tight text-orange-600">
          Tuck into a takway today
        </h1>
        <span>Food is just a click away!</span>
        <SearchBar
          placeholder="Search by City or Town"
          onSubmit={handleSearchSubmit}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landing} alt="landing image" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold tracking-tighter text-3xl">
            Order takeaway even faster
          </span>
          <span>
            Download the MernEats App for faster ordering and personalized
            recommendations
          </span>
          <img src={download} alt="download image" />
        </div>
      </div>
    </section>
  );
};

export default Home;

import {
  PaginationSelector,
  RestaurantCard,
  SearchBar,
  SearchResultInfo,
  Spinner,
} from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { getAllRestaurants } from "@/services/apiRestaurants";
import {
  getAllRestaurantsInfo,
  getPagination,
  getRestaurantStatus,
} from "@/store/restaurantSlice";
import { TSearchBarValidator } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Restaurants = () => {
  const dispatch = useAppDispatch();
  const [searchState, setSearchState] = useState({ searchQuery: "", page: 1 });

  const { page, pages, total } = useAppSelector(getPagination);
  const restaurants = useAppSelector(getAllRestaurantsInfo);
  const { loading } = useAppSelector(getRestaurantStatus);
  const { city } = useParams();

  const setSearchQuery = async (query: TSearchBarValidator) => {
    setSearchState((prev) => ({ ...prev, searchQuery: query.searchQuery }));
  };

  const setPage = (page: number) => {
    setSearchState((prev) => ({ ...prev, page }));
  };

  useEffect(() => {
    dispatch(getAllRestaurants({ city, searchState }));
  }, [dispatch, city, searchState]);

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
    }));
  };

  if (!restaurants) return <span>there are no results</span>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        {/* <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        /> */}
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeholder="Search by Cuisine or Restaurant Name"
          onReset={resetSearch}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={total} city={city as string} />
          {/* 
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          /> */}
        </div>

        {loading ? (
          <Spinner />
        ) : (
          restaurants.map((restaurant, i) => (
            <RestaurantCard restaurant={restaurant} key={restaurant._id || i} />
          ))
        )}
        <PaginationSelector page={page} pages={pages} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default Restaurants;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getAllRestaurants } from "@/services";
import {
  getAllRestaurantsInfo,
  getPagination,
  getRestaurantStatus,
} from "@/store";
import { TSearchBarValidator, TSearchState } from "@/types";

import {
  CuisineFilter,
  PaginationSelector,
  RestaurantCard,
  SearchBar,
  SearchResultInfo,
  SortBy,
  Spinner,
} from "@/components";

const Restaurants = () => {
  const dispatch = useAppDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchState, setSearchState] = useState<TSearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });

  const { page, pages, total } = useAppSelector(getPagination);
  const restaurants = useAppSelector(getAllRestaurantsInfo);
  const { loading } = useAppSelector(getRestaurantStatus);
  const { city } = useParams();

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prev) => ({
      ...prev,
      selectedCuisines,
      page: 1,
    }));
  };

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
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
    }));
  };

  const setSortOption = (sortOption: string) => {
    setSearchState((prev) => ({
      ...prev,
      sortOption,
      page: 1,
    }));
  };
  if (!restaurants) return <span>there are no results</span>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpand={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeholder="Search by Cuisine or Restaurant Name"
          onReset={resetSearch}
        />
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="flex justify-between flex-col gap-3 lg:flex-row">
              <SearchResultInfo total={total} city={city as string} />
              <SortBy
                sortOption={searchState.sortOption}
                onChange={(value) => setSortOption(value)}
              />
            </div>
            {restaurants.map((restaurant, i) => (
              <RestaurantCard restaurant={restaurant} key={restaurant._id} />
            ))}
            <PaginationSelector
              page={page}
              pages={pages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Restaurants;

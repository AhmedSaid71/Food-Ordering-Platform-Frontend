import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IRestaurantInitialState } from "@/types";
import { isString } from "@/utils";
import {
  createMyRestaurant,
  getAllRestaurants,
  getMyRestaurant,
  updateMyRestaurant,
} from "@/services/apiRestaurants";

const initialState: IRestaurantInitialState = {
  restaurant: null,
  restaurants: [],
  myRestaurant: null,
  totalRestaurants: 0,
  message: null,
  loading: false,
  error: null,
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //create my restaurant
      .addCase(createMyRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMyRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.myRestaurant = action.payload.restaurant;
        state.message = action.payload.message;
      })
      .addCase(createMyRestaurant.rejected, (state, action) => {
        state.loading = false;
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      })

      //get my restaurant
      .addCase(getMyRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.myRestaurant = action.payload;
      })
      .addCase(getMyRestaurant.rejected, (state, action) => {
        state.loading = false;
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      })

      //update my restaurant
      .addCase(updateMyRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMyRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.myRestaurant = action.payload.restaurant;
        state.message = action.payload.message;
      })
      .addCase(updateMyRestaurant.rejected, (state, action) => {
        state.loading = false;
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      })

      //get All Restaurants
      .addCase(getAllRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload.restaurants;
        state.totalRestaurants = action.payload.results;
      })
      .addCase(getAllRestaurants.rejected, (state, action) => {
        state.loading = false;
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });
  },
});

export default restaurantSlice.reducer;

export const getMyRestaurantInfo = (state: RootState) =>
  state.restaurant.myRestaurant;
export const getRestaurantInfo = (state: RootState) =>
  state.restaurant.restaurant;
export const getAllRestaurantsInfo = (state: RootState) =>
  state.restaurant.restaurants;

const loading = (state: RootState) => state.restaurant.loading;
const error = (state: RootState) => state.restaurant.error;

export const getRestaurantStatus = createSelector(
  [loading, error],
  (loading, error) => {
    return { loading, error };
  }
);
export const getTotalRestaurants = (state: RootState) => {
  return state.restaurant.totalRestaurants;
};

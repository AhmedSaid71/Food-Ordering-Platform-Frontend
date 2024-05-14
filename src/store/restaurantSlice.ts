import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { IRestaurantInitialState } from "@/types";
import { isString } from "@/utils";
import {
  createMyRestaurant,
  getAllRestaurants,
  getMyRestaurant,
  getMyRestaurantOrders,
  getRestaurant,
  updateMyRestaurant,
} from "@/services";

const initialState: IRestaurantInitialState = {
  restaurant: null,
  restaurants: [],
  myRestaurant: null,
  message: null,
  loading: false,
  error: null,
  total: 0,
  page: 0,
  pages: 0,
  orders: [],
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
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(getAllRestaurants.rejected, (state, action) => {
        state.loading = false;
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      })

      //get Restaurant
      .addCase(getRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurant = action.payload;
      })
      .addCase(getRestaurant.rejected, (state, action) => {
        state.loading = false;
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      })

      //get myRestaurant Orders
      .addCase(getMyRestaurantOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyRestaurantOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getMyRestaurantOrders.rejected, (state, action) => {
        state.loading = false;
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });
  },
});

export default restaurantSlice.reducer;

const loading = (state: RootState) => state.restaurant.loading;
const error = (state: RootState) => state.restaurant.error;
const total = (state: RootState) => state.restaurant.total;
const page = (state: RootState) => state.restaurant.page;
const pages = (state: RootState) => state.restaurant.pages;

export const getMyRestaurantInfo = (state: RootState) =>
  state.restaurant.myRestaurant;
export const getRestaurantInfo = (state: RootState) =>
  state.restaurant.restaurant;
export const getAllRestaurantsInfo = (state: RootState) =>
  state.restaurant.restaurants;

export const getRestaurantOrders = (state: RootState) =>
  state.restaurant.orders;
export const getRestaurantStatus = createSelector(
  [loading, error],
  (loading, error) => {
    return { loading, error };
  }
);

export const getPagination = createSelector(
  [page, pages, total],
  (page, pages, total) => {
    return {
      page,
      pages,
      total,
    };
  }
);

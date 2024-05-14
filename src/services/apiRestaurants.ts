import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, axiosErrorHandler } from "@/utils";
import {
  ICreateMyRestaurantResponse,
  IGetAllRestaurantsResponse,
  IGetAllResultsHandler,
  IGetMyRestaurantOrdersResponse,
  IGetMyRestaurantResponse,
  IGetRestaurantResponse,
  IUpdateMyRestaurantResponse,
} from "@/types";

export const createMyRestaurant = createAsyncThunk(
  "restaurant/createMyRestaurant",
  async (data: FormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await api.post<ICreateMyRestaurantResponse>(
        "/restaurants",
        data
      );
      const restaurant = res.data.data.restaurant;
      const message = res.data.message;
      return { restaurant, message };
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export const getMyRestaurant = createAsyncThunk(
  "restaurant/getMyRestaurant",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await api.get<IGetMyRestaurantResponse>("/restaurants/me");
      const restaurant = res.data.data.restaurant;
      return restaurant;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export const updateMyRestaurant = createAsyncThunk(
  "restaurant/updateMyRestaurant",
  async (data: FormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await api.patch<IUpdateMyRestaurantResponse>(
        "/restaurants",
        data
      );
      const restaurant = res.data.data.restaurant;
      const message = res.data.message;
      return { restaurant, message };
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export const getAllRestaurants = createAsyncThunk(
  "restaurants/getAllRestaurants",
  async (data: IGetAllResultsHandler, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const params = new URLSearchParams();
    params.set("searchQuery", data.searchState.searchQuery);
    params.set("page", data.searchState.page.toString());
    params.set("selectedCuisines", data.searchState.selectedCuisines.join(","));
    params.set("sortOption", data.searchState.sortOption);
    try {
      const res = await api.get<IGetAllRestaurantsResponse>(
        `/restaurants/${data.city}?${params.toString()}`
      );
      const total = res.data.total;
      const page = res.data.page;
      const pages = res.data.pages;
      const restaurants = res.data.data.restaurants;
      return { restaurants, total, page, pages };
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export const getRestaurant = createAsyncThunk(
  "restaurants/getRestaurant",
  async (id: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await api.get<IGetRestaurantResponse>(
        `/restaurants/details/${id}`
      );
      const restaurant = res.data.data.restaurant;
      return restaurant;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export const getMyRestaurantOrders = createAsyncThunk(
  "restaurants/getMyRestaurantOrders",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await api.get<IGetMyRestaurantOrdersResponse>(
        "/restaurants/order"
      );
      return res.data.data.orders;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

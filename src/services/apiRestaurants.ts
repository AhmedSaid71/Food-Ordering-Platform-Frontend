import { api, axiosErrorHandler } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createMyRestaurant = createAsyncThunk(
  "restaurant/createMyRestaurant",
  async (data: FormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await api.post("/restaurants", data);
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
      const res = await api.get("/restaurants/me");
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
      const res = await api.patch("/restaurants", data);
      const restaurant = res.data.data.restaurant;
      const message = res.data.message;
      return { restaurant, message };
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
export type TSearchState = {
  searchQuery?: string;
  page?: number;
  selectedCuisines?: string[];
  sortOption?: string;
};
interface IGetAllResultsHandler {
  city?: string;
  searchState?: TSearchState;
}
export const getAllRestaurants = createAsyncThunk(
  "restaurants/getAllRestaurants",
  async (data: IGetAllResultsHandler, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const params = new URLSearchParams();
    params.set("searchQuery", data?.searchState?.searchQuery as string);
    try {
      const res = await api.get(
        `/restaurants/${data.city}?${params.toString()}`
      );
      const results = res.data.results;
      const restaurants = res.data.data.restaurants;
      return { results, restaurants };
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

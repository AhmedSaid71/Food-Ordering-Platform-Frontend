import { IRestaurantInitialState } from "@/types";
import { api, axiosErrorHandler, isString } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const createRestaurant = createAsyncThunk(
  "restaurant/createRestaurant",
  async (data: FormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await api.post("/restaurant", data);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
export const getRestaurant = createAsyncThunk(
  "restaurant/getRestaurant",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await api.get("/restaurant");
      console.log(res)
      return res.data.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

const initialState: IRestaurantInitialState = {
  restaurant: null,
  loading: false,
  error: null,
};

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurant = action.payload.restaurant;
      })
      .addCase(createRestaurant.rejected, (state, action) => {
        state.loading = false;
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });
  },
});

export default restaurantSlice.reducer;

export const getRestaurantObj = (state: RootState) =>
  state.restaurant.restaurant;
export const getRestaurantStatus = (state: RootState) => {
  const { loading, error } = state.restaurant;
  return { loading, error };
};

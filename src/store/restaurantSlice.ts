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
      const restaurant = res.data.data.restaurant;
      const message = res.data.message;
      return { restaurant, message };
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
      const restaurant = res.data.data.restaurant;
      return restaurant;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
export const updateRestaurant = createAsyncThunk(
  "restaurant/updateRestaurant",
  async (data: FormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await api.patch("/restaurant", data);
      const restaurant = res.data.data.restaurant;
      const message = res.data.message;
      return { restaurant, message };
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

const initialState: IRestaurantInitialState = {
  restaurant: null,
  loading: false,
  error: null,
  message: null,
  isCreating: false,
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
        state.isCreating = true;
      })
      .addCase(createRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurant = action.payload.restaurant;
        state.message = action.payload.message;
        state.isCreating = false;
      })
      .addCase(createRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.isCreating = false;
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      })
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
      .addCase(updateRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurant = action.payload.restaurant;
        state.message = action.payload.message;
      })
      .addCase(updateRestaurant.rejected, (state, action) => {
        state.loading = false;
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });
  },
});

export default restaurantSlice.reducer;

export const getRestaurantData = (state: RootState) =>
  state.restaurant.restaurant;
export const getRestaurantStatus = (state: RootState) => {
  const { loading, error, isCreating } = state.restaurant;
  return { loading, error, isCreating };
};

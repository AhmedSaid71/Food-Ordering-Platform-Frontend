import { getOrders } from "@/services";
import { IOrdersInitialState } from "@/types";
import { isString } from "@/utils";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

const initialState: IOrdersInitialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setDefaultOrders: (state) => {
      state.orders = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      }),
});

export const { setDefaultOrders } = orderSlice.actions;
export default orderSlice.reducer;

const loading = (state: RootState) => state.order.loading;
const error = (state: RootState) => state.order.error;

export const getOrdersData = (state: RootState) => state.order.orders;
export const getOrdersStatus = createSelector(
  [loading, error],
  (loading, error) => {
    return { loading, error };
  }
);

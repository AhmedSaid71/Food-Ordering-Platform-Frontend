import {
  ICheckoutSessionRequest,
  ICheckoutSessionResponse,
  IGetOrdersResponse,
} from "@/types";
import { api, axiosErrorHandler } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createCheckoutSession = async (
  data: ICheckoutSessionRequest,
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);
    const res = await api.post<ICheckoutSessionResponse>(
      "/orders/checkout/create-checkout-session",
      data
    );
    window.location.href = res.data.url;
    return res.data.url;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    setLoading(false);
  }
};

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await api.get<IGetOrdersResponse>("/orders");
      return res.data.data.orders;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

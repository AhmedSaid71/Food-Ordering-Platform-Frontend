import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
});

export default orderSlice.reducer;

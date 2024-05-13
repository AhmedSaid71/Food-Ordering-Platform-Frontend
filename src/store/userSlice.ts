import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

import { IUserInitialState } from "@/types";
import { isString } from "@/utils";
import { getUserData, updateUser } from "@/services";

const initialState: IUserInitialState = {
  user: null,
  error: null,
  loading: false,
  message: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });
  },
});

export default userSlice.reducer;

export const { setUser } = userSlice.actions;

export const getUser = (state: RootState) => state.user.user;

const loading = (state: RootState) => state.user.loading;
const error = (state: RootState) => state.user.error;

export const getUserStatus = createSelector(
  [loading, error],
  (loading, error) => {
    return { loading, error };
  }
);

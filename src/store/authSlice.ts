import { createSlice } from "@reduxjs/toolkit";
import { isString } from "@/utils";
import { RootState } from "@/store";
import { IAuthInitialState } from "@/types";
import { login, logout, signup } from "@/services";

const initialState: IAuthInitialState = {
  loading: false,
  error: null,
  isAuthenticated: false,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateIsAuthenticatedState: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.message = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.message = action.payload;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });
  },
});

export default authSlice.reducer;
export const { updateIsAuthenticatedState } = authSlice.actions;

export const getAuthObj = (state: RootState) => state.auth;
export const getIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

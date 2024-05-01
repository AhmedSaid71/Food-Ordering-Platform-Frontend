import { updateIsAuthenticatedState } from "@/store/authSlice";
import { IUpdateUserRequest } from "@/types";
import { api, axiosErrorHandler } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await api.get("/users/me");
      dispatch(updateIsAuthenticatedState(true));
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data: IUpdateUserRequest, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await api.patch("/users/updateMe", data);
      const message = res.data.message;
      const user = res.data.data.user;
      return { user, message };
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

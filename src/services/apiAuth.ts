import { setUser } from "@/store/userSlice";
import { ILoginUserRequest, ISignupUserRequest } from "@/types";
import { api, axiosErrorHandler } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signup = createAsyncThunk(
  "auth/signup",
  async (data: ISignupUserRequest, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await api.post("/auth/signup", data);
      const { message } = res.data;
      return message;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data: ILoginUserRequest, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await api.post("/auth/login", data);
      const user = res.data.data.user;
      const message = res.data.message;
      dispatch(setUser(user));
      return message;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;
  try {
    const res = await api.get("/auth/logout");
    dispatch(setUser(null));
    const message = res.data.message;
    return message;
  } catch (error) {
    return rejectWithValue(axiosErrorHandler(error));
  }
});

import { IUpdateUserRequest, IUserInitialState } from "@/types";
import { api, axiosErrorHandler, isString } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateIsAuthenticatedState } from "./authSlice";
import { RootState } from "./store";

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await api.get("/user/me");
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
      const res = await api.patch("/user/updateMe", data);
      const message = res.data.message;
      const user = res.data.data.user;
      return { user, message };
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

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
        state.user = action.payload.data;
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
export const getUserStatus = (state: RootState) => {
  const { loading, error } = state.user;
  return { loading, error };
};

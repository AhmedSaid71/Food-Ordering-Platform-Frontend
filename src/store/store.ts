import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import restaurantReducer from "./restaurantSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    restaurant: restaurantReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

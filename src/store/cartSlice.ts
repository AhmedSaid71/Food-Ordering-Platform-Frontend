import { ICartInitialState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store";

const initialState: ICartInitialState = {
  cart: [],
  loading: false,
  error: null,
  restaurantId: null,
  restaurantName: null,
  differentId: false,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (
        state.restaurantId !== action.payload.restaurantId &&
        state.restaurantId !== null
      ) {
        state.error = "different restaurant id";
        state.differentId = true;
        return;
      }
      state.restaurantId = action.payload.restaurantId;
      state.restaurantName = action.payload.restaurantName;

      const existingItem = state.cart.find(
        (item) => item._id === action.payload.menuItem._id
      );
      if (existingItem) {
        const updatedCart = state.cart.map((item) =>
          item._id === action.payload.menuItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        state.cart = updatedCart;
      } else {
        const updatedCart = { ...action.payload.menuItem, quantity: 1 };
        state.cart.push(updatedCart);
      }
    },
    removeFromCart: (state, action) => {
      const updatedCart = state.cart.filter(
        (item) => item._id !== action.payload._id
      );
      state.cart = updatedCart;
    },
    clearCart: (state) => {
      state.cart = [];
      state.restaurantId = null;
      state.error = null;
      state.differentId = false;
    },
    cancelDiff: (state) => {
      state.differentId = false;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, cancelDiff } =
  cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state: RootState) => state.cart.cart;
export const getCartError = (state: RootState) => state.cart.error;
export const getCartDiff = (state: RootState) => state.cart.differentId;

import { ICartInitialState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store";

const initialState: ICartInitialState = {
  cart: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        const updatedCart = state.cart.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        state.cart = updatedCart;
      } else {
        const updatedCart = { ...action.payload, quantity: 1 };
        state.cart.push(updatedCart);
      }
    },
    removeFromCart: (state, action) => {
      const updatedCart = state.cart.filter(
        (item) => item._id !== action.payload._id
      );
      state.cart = updatedCart;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state: RootState) => state.cart.cart;

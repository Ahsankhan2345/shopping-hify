import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.cartItems.find((p) => p._id === item._id);
      if (existing) {
        existing.qty += 1;
      } else {
        state.cartItems.push({ ...item, qty: 1 });
      }
    },
    incrementQty: (state, action) => {
      const item = state.cartItems.find((p) => p._id === action.payload);
      if (item) {
        item.qty += 1;
      }
    },
    decrementQty: (state, action) => {
      const item = state.cartItems.find((p) => p._id === action.payload);
      if (item && item.qty > 1) {
        item.qty -= 1;
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQty,
  decrementQty,
} = cartSlice.actions;

export default cartSlice.reducer;

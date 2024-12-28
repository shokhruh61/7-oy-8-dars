import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.amount += action.payload.amount;
      } else {
        state.push(action.payload);
      }
    },
    remove: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateAmount: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        item.amount = action.payload.amount;
      }
    },
  },
});

export const { add, remove, updateAmount } = cartSlice.actions;
export default cartSlice.reducer;

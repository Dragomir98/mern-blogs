import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showSearch: false,
  },
  reducers: {
    toggleCart(state) {
      state.showSearch = !state.showSearch;
    },
  },
});

export const { toggleCart } = uiSlice.actions;

export default uiSlice;

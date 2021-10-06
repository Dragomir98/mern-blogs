import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showSearch: true,
  },
  reducers: {
    toggleSearch(state) {
      state.showSearch = !state.showSearch;
    },
  },
});

export const { toggleSearch } = uiSlice.actions;

export default uiSlice;

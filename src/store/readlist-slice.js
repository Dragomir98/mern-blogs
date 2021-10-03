import { createSlice } from "@reduxjs/toolkit";

const readlistSlice = createSlice({
  name: "readlist",
  initialState: {
    items: [],
    quantity: 0,
  },
  reducers: {
    addToList(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push(newItem);
        state.quantity++;
      }
    },
    removeFromList(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.items = state.items.filter((item) => item.id !== id);
        state.quantity--;
      }
    },
  },
});

export const { addToList, removeFromList } = readlistSlice.actions;

export default readlistSlice;

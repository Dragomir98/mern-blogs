import readlistSlice from "./readlist-slice";
import uiSlice from "./ui-slice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    readlist: readlistSlice.reducer,
  },
});

export default store;

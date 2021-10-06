import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBlogs, getBlogById, updateBlogById } from "../api";

export const fetchAsyncBlogs = createAsyncThunk(
  "readlist/getAllBlogs",
  async () => {
    const res = await getAllBlogs();
    return res.data;
  }
);

export const updateAsyncBlog = createAsyncThunk(
  "readlist/updateBlogById",
  async (id, updatedData) => {
    const res = await updateBlogById(id, updatedData);
    return res.data;
  }
);

export const fetchAsyncSingleBlog = createAsyncThunk(
  "readlist/getBlogById",
  async (id) => {
    const res = await getBlogById(id);
    return res.data;
  }
);

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
  extraReducers: {
    [fetchAsyncBlogs.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncBlogs.fulfilled]: (state, { payload }) => {
      console.log("All blogs fetched successful");
      console.log(payload);
      return { ...state, items: payload, quantity: payload.length };
    },
    [fetchAsyncBlogs.rejected]: () => {
      console.log("Rejected");
    },
    [fetchAsyncSingleBlog.fulfilled]: (state, { payload }) => {
      console.log("Single blog fetched successfully");
      return { ...state, payload };
    },
    [updateAsyncBlog.fulfilled]: (state, { payload }) => {
      console.log("Blog update fetched successfully");
      console.log("Updated blog: " + payload);
      return { ...state, payload };
    },
  },
});

export const { addToList, removeFromList } = readlistSlice.actions;

export default readlistSlice;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAuthor: null,
};

const authorSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {
    setCurrentAuthor: (state, action) => {
      state.currentAuthor = action.payload;
    },
    unSetCurrentAuthor: (state, action) => {
      state.currentAuthor = null;
    },
  },
});

export const { setCurrentAuthor, unSetCurrentAuthor } = authorSlice.actions;
export default authorSlice.reducer;

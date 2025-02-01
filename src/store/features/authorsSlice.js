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
  },
});

export const { setCurrentAuthor } = authorSlice.actions;
export default authorSlice.reducer;

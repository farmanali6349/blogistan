import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import AuthorsReducer from "./features/authorsSlice";

export const store = configureStore({
  reducer: {
    AuthReducer,
    AuthorsReducer,
  },
});

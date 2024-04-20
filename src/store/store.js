import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice"
import blogsSliceReducer from "./slices/blogsSlice";
import categoriesSliceReducer from "./slices/categoriesSlice";
import commentsSliceReducer from "./slices/commentsSlice";


const store = configureStore({
    reducer: {
        authSliceReducer,
        blogsSliceReducer,
        categoriesSliceReducer,
        commentsSliceReducer
    }
})

export default store;
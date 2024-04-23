import { configureStore } from "@reduxjs/toolkit";
import { authService } from "../services/authService";
import { databaseService } from "../services/databaseService";
import { login, logout } from "./slices/authSlice";
import { addAuthors } from "./slices/authorsSlice";
import { useDispatch } from "react-redux";
import authSliceReducer from "./slices/authSlice"
import blogsSliceReducer from "./slices/blogsSlice";
import authorsSliceReducer from "./slices/authorsSlice";
import categoriesSliceReducer from "./slices/categoriesSlice";
import commentsSliceReducer from "./slices/commentsSlice";


const store = configureStore({
    reducer: {
        authSliceReducer,
        blogsSliceReducer,
        authorsSliceReducer,
        categoriesSliceReducer,
        commentsSliceReducer
    }
})

// const dispatch = useDispatch();
export const updateStore = async () => {

//     authService.getCurrentUser()
//         .then((userData) => {
//             if (userData) {
//                 dispatch(login(userData))

//                 if (userData) {
//                     databaseService.getAuthors()
//                         .then((authors) => dispatch(addAuthors(authors.documents)))
//                         .catch((err) => console.log("Can't Get Authors : ", err))
//                 }
//             }
//         })
//         .catch((err) => {
//             console.log("No User Data Found");
//             dispatch(logout())
//         }).finally(() => console.log("Store Updated"))
    console.log("update store function runs")
}

export default store;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: []
}

const categoriesSlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        addCategories: (state, action) => {
           state.categories = action.payload; 
        },
        addCategory: (state, action) => {
            state.categories.push(action.payload);
        },
        getCategories: (state, action) => {
            return state.categories;
        },
        getCategory: (state, action) => {
            const categoryId = action.payload;
            const requiredCategory = state.categories.filter((category) => category.$id === categoryId);

            if(requiredCategory) {
                return requiredCategory[0]
            } else {
                return false;
            }
        }
    }
})


export const {addCategories, addCategory, getCategories, getCategory} = categoriesSlice.actions;
export default categoriesSlice.reducer;
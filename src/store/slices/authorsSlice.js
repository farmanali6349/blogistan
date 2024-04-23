import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authors: [],
    author: {}
}

const authorsSlice = createSlice({
    name: "author",
    initialState,
    reducers: {
        addAuthors: (state, action)=> {
            state.authors = action.payload;
        },
        addAuthor: (state, action)=> {
            state.author = action.payload;
        },
        updateAuthor: (state, action) => {
            const newAuthor = action.payload;

            state.author = newAuthor;
            state.authors = state.authors.map((author) => author.$id === newAuthor.$id ? newAuthor : author)
        },
        clearAuthor: (state, action) => {
            state.author = {}
        }
    }
})


export const {addAuthors, addAuthor, updateAuthor, clearAuthor} = authorsSlice.actions;
export default authorsSlice.reducer;
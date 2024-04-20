import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authors: []
}

const authorsSlice = createSlice({
    name: "author",
    initialState,
    reducers: {
        addAuthors: (state, action)=> {
            state.authors = action.payload;
        },
        addAuthor: (state, action)=> {
            state.authors.push(action.payload)
        },
        getAuthors: (state, action)=> {
            return state.authors;
        },
        getAuthor: (state, action)=> {
            const authorId = action.payload;
            const requestedAuthor = state.authors.filter((author) => author.$id === authorId)

            if(requestedAuthor) {
                return requestedAuthor[0];
            } else {
                return false;
            }
        }
    }
})


export const {addAuthors, addAuthor, getAuthors, getAuthor} = authorsSlice.actions;
export default authorsSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments: []
}

const commentsSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        addComments: () => {},
        addComment: () => {},
        getComments: () => {},
        getComment: () => {}
    }
})


export const {addComments, addComment, getComments, getComment} = commentsSlice.actions;
export default commentsSlice.reducer;
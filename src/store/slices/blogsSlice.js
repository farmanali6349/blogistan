import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    total: 0,
    blogs: []
}

const blogsSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        addBlogs: (state, action) => {
            const blogs = action.payload;
            state.blogs = blogs;
        },
        addBlog: (state, action) => {
            const blog = action.payload;
            state.blogs.push(blog);
        },
        getBlogs: (state, action) => {
            return state.blogs;
        },
        getBlog: (state, action) => {
            const blogId = action.payload;
            const requestedBlog = state.blogs.filter((blog) => blog.$id === blogId);

            if(requestedBlog) {
                return requestedBlog[0];
            } else {
                return false;
            }
        }
    }
})

export const {addBlog, addBlogs, getBlog, getBlogs} = blogsSlice.actions;
export default blogsSlice.reducer;
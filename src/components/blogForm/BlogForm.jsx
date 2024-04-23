import React from 'react'
import {Input, Categories} from "../index"
function BlogForm() {
  return (
    <form className="blog-form">
        <Input
            label="Title:"
            type="text"
            placeholder="Enter Blog Title"
        />

        <Input
            label="Slug:"
            type="text"
        />

        <Categories />

        

        {/* Content */}

        
    </form>
  )
}

export default BlogForm
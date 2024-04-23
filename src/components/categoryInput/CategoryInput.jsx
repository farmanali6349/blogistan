import React, { forwardRef, useId, useState } from 'react'
import "./CategoryInput.css"
function CategoryInput({
    label = "Undefined",
}) {

    const [disabled, setDisabled] = useState(true)
    const [inputValue, setInputValue] = useState(label)
    const id = useId()
    return (
        <div className="category-input">
            <input type="checkbox" name="" id={id} />
            {label && label ? (
                <input
                    type="text"
                    disabled={disabled}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            ) : null}
            <div className="category-controls">
                <button className="category-button edit">Edit</button>
                <button className="category-button delete">Delete</button>
            </div>
        </div>
    )
}

export default forwardRef(CategoryInput)

const category = {
    $id: "12334",
    name: "Technology",
    blogs: ["blog1", "blog2", "blog3", "blog4"],
    author: "authorId",
    isParent: true,
    subCategories: [
        {
            $id: "12334",
            name: "Computer",
            blogs: ["blog1", "blog2", "blog3", "blog4"],
            isParent: false
        }
    ]
}
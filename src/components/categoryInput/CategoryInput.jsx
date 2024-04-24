import React, { forwardRef, useId, useState } from 'react'
import "./CategoryInput.css"

function CategoryInput({
    label = "undefined",
    value = "undefined",
    $id,
    ref,
    deleteCategory,
    ...props

}) {

    const [disabled, setDisabled] = useState(true)

    return (
        <div className="category-input">
            <input type="checkbox" name={value} id={$id} value={value} ref={ref} {...props}/>
            <label htmlFor={$id}>{label}</label>

            <div className="category-controls">
                <button className="category-button delete" onClick={() => deleteCategory($id)}>Delete</button>
            </div>
        </div>
    )
}

export default forwardRef(CategoryInput)
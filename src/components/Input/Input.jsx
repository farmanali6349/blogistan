import React, { forwardRef } from 'react'
import "./Input.css"
function Input({
    label,
    type = "text",
    className = "",
    error = "",
    ...props
}, ref) {
  return (
    <div className="input">
        {label && label ? <label>{label}</label> : null}

        <input ref={ref} type={type} className={` ${className}`} {...props} />
        
        {error && error ? <p className='input-error'>{error}</p> : null}
    </div>
  )
}

export default forwardRef(Input)
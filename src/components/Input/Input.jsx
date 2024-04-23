import React, { forwardRef, useId } from 'react'
import "./Input.css"
function Input({
    label,
    type = "text",
    className = "",
    error = "",
    ...props
}, ref) {

  const id = useId();
  return (
    <div className="input">
        {label && label ? <label htmlFor={id}>{label}</label> : null}

        <input ref={ref} type={type} className={` ${className}`} {...props} id={id}/>
        
        {error && error ? <p className='input-error'>{error}</p> : null}
    </div>
  )
}

export default forwardRef(Input)
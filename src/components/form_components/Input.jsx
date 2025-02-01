import React, { useId } from "react";

function Input(
  {
    label,
    type = "text",
    placeholder,
    classes = "",
    inputError = "",
    value,
    loader,
    parentClass,
    ...props
  },
  ref
) {
  const id = useId();
  return (
    <div className={`input ${parentClass || ""}`}>
      {label && <label htmlFor={id}>{label}</label>}
      {loader && <div className="btn-loader"></div>}
      <input
        type={type}
        placeholder={placeholder}
        className={`${type === "submit" ? "" : "input-box"} ${classes}`}
        id={id}
        value={value}
        ref={ref}
        {...props}
      />
      {inputError && <p className="input-error">{inputError}</p>}
    </div>
  );
}

export default React.forwardRef(Input);

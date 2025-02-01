import { useId } from "react";

function Select({
  label,
  defaultOption = "select",
  options = [],
  classes,
  ...props
}) {
  const id = useId();
  return (
    <div className="select">
      {label && <label htmlFor={id}>{label}</label>}
      <select id={id} className={`select ${classes}`} {...props}>
        <option value={""}>---- {defaultOption} ----</option>
        {options.map((option) => (
          <option key={option.$id} value={option.$id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;

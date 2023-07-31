import React from "react";
import "./FormInput.css";

const FormInput = ({
  id,
  name,
  type,
  accept,
  placeholder,
  label,
  pattern,
  required,
  value,
  onChange,
  inputRef,
}) => {
  return (
    <div className="FormInput">
      <label htmlFor={id}>{label}</label>
      {type === "file" ? (
        <input
          id={id}
          name={name}
          type={type}
          accept={accept}
          placeholder={placeholder}
          pattern={pattern}
          required={required}
          value={value}
          onChange={onChange}
          ref={inputRef}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          pattern={pattern}
          required={required}
          value={value}
          onChange={onChange}
          ref={inputRef}
        />
      )}
    </div>
  );
};

export default FormInput;

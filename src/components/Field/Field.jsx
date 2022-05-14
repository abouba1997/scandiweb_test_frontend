import React from "react";
import "./Field.css";

const Field = ({
  text,
  type,
  name,
  id,
  placeholder,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="row">
      <div className="col-25">
        <label htmlFor={id}>{text}</label>
      </div>
      <div className="col-75">
        <span className="error__display">{error}</span>
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Field;

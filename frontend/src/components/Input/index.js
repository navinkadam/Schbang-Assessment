import React from "react";
import "./input.css";

export default function Input({ field, label, form: { touched, errors }, ...props }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input className="form-input" {...field} {...props} />
      <div className="form-error">{touched[field.name] && errors[field.name]}</div>
    </div>
  );
}

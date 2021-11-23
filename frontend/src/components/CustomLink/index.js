import React from "react";
import { Link } from "react-router-dom";
import "./customLink.css";

export default function CustomLink({ children, to }) {
  return (
    <Link to={to} className="custom-link">
      {children}
    </Link>
  );
}

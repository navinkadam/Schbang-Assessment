import React from "react";
import { NavLink } from "react-router-dom";

import "./logo.css";

export default function Logo() {
  return (
    <h1>
      <NavLink className="logo" to="/" exact>
        Logo
      </NavLink>
    </h1>
  );
}

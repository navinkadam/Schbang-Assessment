import React from "react";
import { NavLink } from "react-router-dom";
import "./navbarItem.css";

export default function NavbarItem({ to, label, onClick }) {
    return (
        <li className="nav-li">
            <NavLink exact to={to} className="nav-item" activeClassName={onClick ? null : "active"} onClick={onClick ? onClick : null}>
                {label}
            </NavLink>
        </li>
    );
}

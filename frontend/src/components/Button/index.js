import React from "react";
import "./button.css";

export default function Button({ variant, children, disabled = false, className = "", type = "button", onClick = null }) {
    const btnClass = (variant === "inline" && "inline-btn") || "";
    return (
        <button className={`button ${btnClass} ${className}`} type={type} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
}

import React from "react";
import "./heading.css";
export default function Heading({ variant, children, className = "" }) {
    let heading = <h1 className={`heading H1 ${className}`}>{children}</h1>;
    switch (variant) {
        case "h2":
            heading = <h2 className={`heading H2 ${className}`}>{children}</h2>;
            break;
        case "h3":
            heading = <h3 className={`heading H3 ${className}`}>{children}</h3>;
            break;
        case "h4":
            heading = <h4 className={`heading H4 ${className}`}>{children}</h4>;
            break;
        case "h5":
            heading = <h5 className={`heading H5 ${className}`}>{children}</h5>;
            break;
        case "h6":
            heading = <h6 className={`heading H6 ${className}`}>{children}</h6>;
            break;
        default:
            break;
    }

    return heading;
}

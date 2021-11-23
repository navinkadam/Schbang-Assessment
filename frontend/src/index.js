import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import store from "./redux-store";

import "./index.css";

const renderApp =
    process.env.NODE_ENV === "development" ? (
        <React.StrictMode>
            <App />
        </React.StrictMode>
    ) : (
        <App />
    );

ReactDOM.render(<Provider store={store}>{renderApp}</Provider>, document.getElementById("root"));

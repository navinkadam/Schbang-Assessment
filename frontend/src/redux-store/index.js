import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import allReducers from "./reducers/index";

const composeEnhancers = (process.env.NODE_ENV === "development" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(allReducers, {}, composeEnhancers(applyMiddleware(createLogger(), thunk, promise)));

export default store;

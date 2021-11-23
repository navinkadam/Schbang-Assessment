import { combineReducers } from "redux";

import user from "./User";
import product from "./Product";
import cart from "./Cart";
import order from "./Order";

export default combineReducers({ user, product, cart, order });

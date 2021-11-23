const initState = {
    loading: false,
    loaded: true,
    ui_error: false,
    refresh: true,
    order: [],
    singleOrder: {},
};
export default function order(state = { ...initState }, action) {
    const { type, payload = {} } = action;
    switch (type) {
        case "PLACE_ORDER_PENDING":
        case "GET_USER_ORDERS_PENDING":
        case "DELETE_TO_CART_PENDING":
            return { ...state, loaded: false, loading: true };

        case "PLACE_ORDER_FULFILLED":
        case "DELETE_TO_CART_FULFILLED":
            return { ...state, refresh: true, loaded: false, loading: true };

        case "GET_USER_ORDERS_FULFILLED":
            return { ...state, carts: payload.data, loaded: true, loading: false, ui_error: false, ui_error_msg: "" };

        case "PLACE_ORDER_REJECTED":
        case "GET_USER_ORDERS_REJECTED":
        case "DELETE_TO_CART_REJECTED":
            return { ...state, loaded: true, loading: false, ui_error: true, ui_error_msg: payload.message };

        case "SET_ORDER_DATA":
            return { ...state, ...payload };
        default:
            return { ...state };
    }
}

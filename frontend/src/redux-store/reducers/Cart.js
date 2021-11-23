const initState = {
    loading: false,
    loaded: true,
    ui_error: false,
    carts: [],
    addedProductId: [],
};
export default function cart(state = { ...initState }, action) {
    const { type, payload = {} } = action;
    switch (type) {
        case "ADD_TO_CART_PENDING":
        case "REMOVE_TO_CART_PENDING":
        case "CART_PENDING":
            return { ...state, loaded: false, loading: true };

        case "ADD_TO_CART_FULFILLED":
        case "REMOVE_TO_CART_FULFILLED":
        case "CART_FULFILLED": {
            const addedProductId = payload.data.map((x) => x._id);
            return { ...state, carts: payload.data, addedProductId, loaded: true, loading: false, ui_error: false, ui_error_msg: "" };
        }

        case "ADD_TO_CART_REJECTED":
        case "REMOVE_TO_CART_REJECTED":
        case "CART_REJECTED":
            return { ...state, loaded: true, loading: false, ui_error: true, ui_error_msg: payload.message };

        case "SET_ADD_TO_CART_DATA":
            return { ...state, ...payload };
        default:
            return { ...state };
    }
}

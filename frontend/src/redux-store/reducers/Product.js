const initState = {
    loading: false,
    loaded: true,
    redirect: false,
    ui_error: false,
    singleProduct: {},
    products: [],
};
export default function product(state = { ...initState }, action) {
    const { type, payload = {} } = action;
    switch (type) {
        // PENDING
        case "GET_ALL_PRODUCT_PENDING":
        case "GET_PRODUCT_BY_ID_PENDING":
        case "CREATE_PRODUCT_PENDING":
        case "UPDATE_PRODUCT_PENDING":
            return { ...state, loaded: false, loading: true };

        // FULFILLED
        case "GET_PRODUCT_BY_ID_FULFILLED":
            return { ...state, singleProduct: payload.data, loaded: true, loading: false };
        case "CREATE_PRODUCT_FULFILLED":
        case "UPDATE_PRODUCT_FULFILLED":
            return { ...state, refresh: true, loaded: true, loading: false, ui_error: false, ui_error_msg: "" };
        case "GET_ALL_PRODUCT_FULFILLED":
            return { ...state, products: payload.data, loaded: true, loading: false };

        // REJECT
        case "CREATE_PRODUCT_REJECTED":
        case "UPDATE_PRODUCT_REJECTED":
            return { ...state, loaded: true, loading: false, ui_error: true, ui_error_msg: payload.message };
        case "GET_ALL_PRODUCT_REJECTED":
            return { ...state, products: [], loaded: true, loading: false };
        case "GET_PRODUCT_BY_ID_REJECTED":
            return { ...state, singleProduct: {}, loaded: true, loading: false };

        case "SET_PRODUCT_DATA":
            return { ...state, ...payload };
        default:
            return { ...state };
    }
}

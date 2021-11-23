const initState = {
    loading: false,
    loaded: true,
    redirect: false,
    ui_error: false,
    profile: {},
    appInitialized: false,
};
export default function user(state = { ...initState }, action) {
    const { type, payload = {} } = action;
    switch (type) {
        case "GET_USER_DATA_PENDING":
        case "LOGOUT_PENDING":
        case "LOGIN_PENDING":
        case "SIGNUP_PENDING":
            return { ...state, loaded: false, loading: true };

        case "LOGOUT_FULFILLED":
            return { ...state, loaded: true, loading: false };

        case "LOGIN_FULFILLED":
        case "SIGNUP_FULFILLED":
            return { ...state, redirect: true, loaded: true, loading: false, ui_error: false, ui_error_msg: "" };

        case "GET_USER_DATA_FULFILLED":
            return { ...state, profile: payload.data, loaded: true, loading: false, appInitialized: true };

        case "SET_USER_DATA":
            return { ...state, ...payload };

        case "LOGIN_REJECTED":
        case "SIGNUP_REJECTED":
            return { ...state, redirect: false, loaded: true, loading: false, ui_error: true, ui_error_msg: payload.message };
        case "GET_USER_DATA_REJECTED":
            return { ...state, profile: {}, loaded: true, loading: false, appInitialized: true };
        case "LOGOUT_REJECTED":
            return { ...state, loaded: true, loading: false };

        default:
            return { ...state };
    }
}

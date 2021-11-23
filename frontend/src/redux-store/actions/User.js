import { postDataToService, getDataToService } from "../../utils/serviceUtil";

export function signUp(data, dispatch) {
    return {
        type: "SIGNUP",
        payload: new Promise(async (resolve, reject) => {
            try {
                await postDataToService("/app/signup", data);
                resolve({ data });
            } catch (error) {
                reject(error);
                alert(error.message);
            }
        }),
    };
}

export function getUserData() {
    return {
        type: "GET_USER_DATA",
        payload: new Promise(async (resolve, reject) => {
            try {
                const result = await getDataToService("/user/me");
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),
    };
}

export function logout(dispatch) {
    return {
        type: "LOGOUT",
        payload: new Promise(async function (resolve, reject) {
            try {
                await postDataToService("/app/logout");
                window.location.replace("/");
            } catch (error) {
                reject(error);
            }
        }),
    };
}

export function login(params, dispatch) {
    return {
        type: "LOGIN",
        payload: new Promise(async (resolve, reject) => {
            try {
                await postDataToService("/app/login", params);
                resolve({});
                window.location.reload();
            } catch (error) {
                reject(error);
            }
        }),
    };
}

export function setUserData(params) {
    return { type: "SET_USER_DATA", payload: params };
}

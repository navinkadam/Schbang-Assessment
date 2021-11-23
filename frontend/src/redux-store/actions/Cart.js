import { postDataToService, getDataToService, deleteDataToService } from "../../utils/serviceUtil";

export function addToCart(data, dispatch) {
    return {
        type: "ADD_TO_CART",
        payload: new Promise(async (resolve, reject) => {
            try {
                const result = await postDataToService("/cart", data);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),
    };
}

export function getUserCartData() {
    return {
        type: "CART",
        payload: new Promise(async (resolve, reject) => {
            try {
                const result = await getDataToService("/cart");
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),
    };
}

export function removeToCart({ cartId }, dispatch) {
    return {
        type: "REMOVE_TO_CART",
        payload: new Promise(async (resolve, reject) => {
            try {
                const result = await deleteDataToService(`/cart/${cartId}`);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),
    };
}

export function setAddToCartData(params) {
    return { type: "SET_ADD_TO_CART_DATA", payload: params };
}

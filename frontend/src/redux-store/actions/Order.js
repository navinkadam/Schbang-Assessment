import { postDataToService, getDataToService, deleteDataToService } from "../../utils/serviceUtil";
// import { removeToCart } from "./Cart";

export function placedOrder(data, dispatch) {
    return {
        type: "PLACE_ORDER",
        payload: new Promise(async (resolve, reject) => {
            try {
                const cartsIds = data.cartIds;
                delete data.cartIds;
                const result = await postDataToService("/order", data);
                window.location.reload();
                resolve(result);
                // if (typeof dispatch === "function") cartsIds.map((cartId) => dispatch(removeToCart(cartId)));
            } catch (error) {
                reject(error);
            }
        }),
    };
}

export function getUserOrders() {
    return {
        type: "GET_USER_ORDERS",
        payload: new Promise(async (resolve, reject) => {
            try {
                const result = await getDataToService("/order");
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),
    };
}

export function deleteOrder({ orderId }, dispatch) {
    return {
        type: "DELETE_TO_CART",
        payload: new Promise(async (resolve, reject) => {
            try {
                const result = await deleteDataToService(`/order/${orderId}`);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),
    };
}

export function setOrderData(params) {
    return { type: "SET_ORDER_DATA", payload: params };
}

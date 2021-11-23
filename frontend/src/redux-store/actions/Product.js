import { postDataToService, getDataToService, putDataToService } from "../../utils/serviceUtil";

export function getAllProduct(params, dispatch) {
    return {
        type: "GET_ALL_PRODUCT",
        payload: new Promise(async (resolve, reject) => {
            try {
                const result = await getDataToService("/product", params);
                resolve(result);
            } catch (error) {
                reject(error);
                alert(error.message);
            }
        }),
    };
}

export function getProductById({ productId }) {
    return {
        type: "GET_PRODUCT_BY_ID",
        payload: new Promise(async (resolve, reject) => {
            try {
                const result = await getDataToService(`/product/${productId}`);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),
    };
}

export function createProduct(params, dispatch) {
    return {
        type: "CREATE_PRODUCT",
        payload: new Promise(async (resolve, reject) => {
            try {
                const result = await postDataToService("/product", params);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),
    };
}

export function updateProduct(params, dispatch) {
    return {
        type: "UPDATE_PRODUCT",
        payload: new Promise(async (resolve, reject) => {
            try {
                const result = await putDataToService(`/product/${params._id}`, params);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),
    };
}

export function setProductData(params) {
    return { type: "SET_PRODUCT_DATA", payload: params };
}

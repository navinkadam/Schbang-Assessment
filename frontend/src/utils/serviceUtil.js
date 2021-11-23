const oConfigHeaders = {
    "Content-Type": "application/json",
    crossDomain: true,
};
const SERVICE_URL_PREFIX = "http://localhost:3000/api/v1";

async function postDataToService(serviceURI, body = {}) {
    const result = await fetch(`${SERVICE_URL_PREFIX}${serviceURI}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: oConfigHeaders,
    });
    const data = await result.json();
    if ([200, 201].includes(result.status)) return data;
    throw data;
}

async function putDataToService(serviceURI, body = {}) {
    const result = await fetch(`${SERVICE_URL_PREFIX}${serviceURI}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: oConfigHeaders,
    });
    const data = await result.json();
    if ([200, 201].includes(result.status)) return data;
    throw data;
}

async function deleteDataToService(serviceURI, body = {}) {
    const result = await fetch(`${SERVICE_URL_PREFIX}${serviceURI}`, {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: oConfigHeaders,
    });
    const data = await result.json();
    if ([200, 201].includes(result.status)) return data;
    throw data;
}

async function getDataToService(serviceURI, params) {
    const paramsString = new URLSearchParams(params || {}).toString();
    const url = `${SERVICE_URL_PREFIX}${serviceURI}?${paramsString}`;
    const result = await fetch(url, {
        method: "GET",
        headers: oConfigHeaders,
    });
    const data = await result.json();
    if ([200, 201].includes(result.status)) return data;
    throw data;
}

export { postDataToService, putDataToService, deleteDataToService, getDataToService };

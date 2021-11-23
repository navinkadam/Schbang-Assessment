export function setValue(key, value) {
    try {
        window.localStorage.setItem(key, value);
    } catch (e) {
        throw new Error(`Error While storing localStorage value for ${key}\n${e}`);
    }
}

export function getValue(key, parseInto) {
    const data = window.localStorage.getItem(key);
    try {
        if (data) {
            let response = data;
            if (parseInto === "json") response = JSON.parse(data);
            else if (parseInto === "int") response = parseInt(data);
            else if (parseInto === "float") response = parseFloat(data);
            return response;
        }
    } catch (e) {
        throw new Error(`Error While get localStorage value for ${key}\n${e}`);
    }
}

export function removeValue(key) {
    try {
        window.localStorage.removeItem(key);
    } catch (e) {
        throw new Error(`Error While removing localStorage value for ${key}\n${e}`);
    }
    return true;
}

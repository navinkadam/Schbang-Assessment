function getUniqueOrderNumber() {
    let orderNumber = Math.random().toString(10).substring(2, 8) + Math.random().toString(10).substring(2, 9);
    if (orderNumber[0] === "0") orderNumber = "1" + orderNumber.slice(1);
    return orderNumber;
}

module.exports = { getUniqueOrderNumber };

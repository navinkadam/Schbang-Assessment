const emailUtil = require("../../utils/emailUtil");

async function emailSendToUser(order, user) {
    const products = order._productId;
    const count = products.length;
    const itemText = count > 1 ? "items" : "item";
    const amount = products.reduce((sum, { price }) => (sum += price), 0);

    const subject = `Your order #${order.orderNumber} of ${count} ${itemText}`;
    const text = `
    Hi ${user.name},
    
    We have successfully received your order of ${count} ${itemText}.
    Your total bill is INR ${amount}.
    
    Thank you.
        `;
    return await emailUtil.sendEmail({ to: user.email, subject, text });
}

module.exports = { emailSendToUser };

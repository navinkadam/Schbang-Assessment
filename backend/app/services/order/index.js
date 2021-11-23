const Models = require("../../models");
const s3Helper = require("../../utils/s3Helper");
const orderHelper = require("./helper");

async function insertOrder(params) {
    const { productId, userId } = params;
    let errorMsg = "";
    if (!productId.length) errorMsg += "ProductId";
    if (!userId.length) errorMsg += "userId";
    if (errorMsg) throw { status: 422, message: errorMsg.substring(0, errorMsg.length - 2) + " is required." };

    const orderNumber = orderHelper.getUniqueOrderNumber();
    const payload = { _productId: productId, _userId: userId, orderNumber: orderNumber };
    const result = await new Models.Order(payload).save();
    await Models.Cart.updateMany({ _userId: userId, _productId: { $in: productId } }, { $set: { isActive: false } });
    return await getOrderById({ orderId: result._id });
}

async function getUserOrder(params) {
    const result = await Models.Order.find({ _id: params.userId }).populate("_userId").populate("_productId").lean();
    return result;
}

async function getOrderById(params) {
    if (!params.orderId) throw { message: "Order id missing!" };
    const result = await Models.Order.findOne({ _id: params.orderId }).lean();
    if (!result) throw { message: "Invalid Order Number id!" };
    return result;
}

async function deleteOrder(params) {
    const { orderId } = params;
    const result = await getOrderById({ orderId });
    return await Models.Order.updateOne({ _id: result._id }, { $set: { isActive: false } });
}

module.exports = { insertOrder, getUserOrder, deleteOrder };

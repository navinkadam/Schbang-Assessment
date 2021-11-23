const Models = require("../../models");
const s3Helper = require("../../utils/s3Helper");

async function insertCart(params) {
    const { productId, userId } = params;
    const payload = { _productId: productId, _userId: userId };
    const result = await new Models.Cart(payload).save();
    return result;
}

async function getUserCart(params) {
    const result = await Models.Cart.find({ _userId: params.userId, isActive: true }).populate("_productId").lean();
    return result.map((c) => ({ ...c._productId, cartId: c._id }));
}

async function getCartById(params) {
    if (!params.cartId) throw { message: "Cart id missing!" };
    const result = await Models.Cart.findOne({ _id: params.cartId }).lean();
    if (!result) throw { message: "Invalid Cart id!" };
    return result;
}

async function deleteCart(params) {
    const { cartId } = params;
    const result = await getCartById({ cartId });
    return await Models.Cart.updateOne({ _id: result._id }, { $set: { isActive: false } });
}

module.exports = { insertCart, getUserCart, deleteCart };

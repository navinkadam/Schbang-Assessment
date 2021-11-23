const Models = require("../../models");
const s3Helper = require("../../utils/s3Helper");

async function insertProduct(params) {
    const { name, description, price, images, userId } = params;
    let errorMsg = "";
    if (!(name && name.trim())) errorMsg += "Product Name, ";
    if (!(description && description.trim())) errorMsg += "Description, ";
    if (!price) errorMsg += "Price, ";
    if (!(images && images.length)) errorMsg += "Images, ";
    if (errorMsg) throw { status: 422, message: errorMsg.substring(0, errorMsg.length - 2) + " is required." };
    const imagesURLS = await Promise.all(
        images.map((img) => s3Helper.getUpload({ ...img, fileName: `${new Date().getTime()}-${img.fileName}` }))
    );
    const payload = { name, description, price, images: imagesURLS.map((x) => x.Location), _userId: userId };
    const result = await new Models.Product(payload).save();

    return result;
}

async function getAllProduct(params) {
    return await Models.Product.find();
}

async function getProductById(params) {
    if (!params.productId) throw { message: "Product id missing!" };
    const result = await Models.Product.findOne({ _id: params.productId }).lean();
    if (!result) throw { message: "Invalid product id!" };
    return result;
}

async function updateProduct(params) {
    const result = await getProductById({ productId: params.productId });
    let updatePayload = {};
    const { name, description, price, images, signedUrl } = params;
    if (name && name.trim()) updatePayload.name = name;
    if (description && description.trim()) updatePayload.description = description;
    if (price) updatePayload.price = price;
    if (images && images.length) updatePayload.images = images;
    await Models.Product.updateOne({ _id: result._id }, { $set: updatePayload });
    return await getProductById({ productId: params.productId });
}

async function deleteProduct(params) {
    const { productId } = params;
    const result = await getProductById({ productId });
    return await Models.Product.updateOne({ _id: mongoose.Types.ObjectId(result._id) }, { $set: { isActive: false } });
}

module.exports = { insertProduct, getAllProduct, getProductById, updateProduct, deleteProduct };

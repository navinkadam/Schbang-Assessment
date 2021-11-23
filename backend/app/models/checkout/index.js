const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const checkoutSchema = new Schema(
    {
        _userId: { type: Mongoose.Types.ObjectId, ref: "User", required: true },
        _productId: [{ type: Mongoose.Types.ObjectId, ref: "Product", required: true }],
        orderNumber: { type: String, required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = checkoutSchema;

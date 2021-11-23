const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const productSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        _userId: { type: Mongoose.Types.ObjectId, ref: "User", required: true },
        price: { type: Number, required: true },
        images: [],
        signedUrl: [{ name: String, url: String }],
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = productSchema;

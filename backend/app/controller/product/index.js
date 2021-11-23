const express = require("express");
const router = express.Router();
const ProductService = require("../../services/product");
const { getErrorPayload } = require("../../utils/errorUtil");

async function insertProduct(req, res) {
    try {
        const body = req.body;
        body.userId = req.user._id;
        const result = await ProductService.insertProduct(body);
        return res.status(201).json({ data: result, message: "Successfully created product." });
    } catch (error) {
        const { status, ...rest } = getErrorPayload(error, 401);
        res.status(status).json({ ...rest });
    }
}

async function updateProduct(req, res) {
    try {
        const body = req.body;
        const { productId } = req.params;
        body.productId = productId;
        const result = await ProductService.updateProduct(body);
        return res.status(200).json({ data: result, message: "Successfully updated product." });
    } catch (error) {
        const { status, ...rest } = getErrorPayload(error, 401);
        res.status(status).json({ ...rest });
    }
}

async function getProductById(req, res) {
    try {
        const { productId } = req.params;

        const result = await ProductService.getProductById({ productId });
        return res.status(200).json({ data: result });
    } catch (error) {
        const { status, ...rest } = getErrorPayload(error, 401);
        res.status(status).json({ ...rest });
    }
}

async function getAllProducts(req, res) {
    try {
        const result = await ProductService.getAllProduct({});
        if (!result.length) res.status.json({ message: "No records found Sorry! could not fetch the desired product.", data: [] });
        return res.status(200).json({ data: result, message: "Successfully fetch product." });
    } catch (error) {
        const { status, ...rest } = getErrorPayload(error, 401);
        res.status(status).json({ ...rest });
    }
}

async function deleteProduct(req, res) {
    try {
        const { productId } = req.params;
        await new ProductService.deleteProduct({ productId });
        return res.status(200).json({
            message: "Product has been successfully deleted.",
        });
    } catch (error) {
        let { status, errorObj } = responseHelper.getErrorPayload(error, 401);
        return res.status(status).json(errorObj);
    }
}

router.get("/", getAllProducts);

router.use((req, res, next) => {
    if (req.user.role === "admin") return next();
    return res.status(401).json({ message: "You Don't have access to product route's." });
});

router.post("/", insertProduct);
router.put("/:productId", updateProduct);
router.get("/:productId", getProductById);
router.delete("/:productId", deleteProduct);

module.exports = router;

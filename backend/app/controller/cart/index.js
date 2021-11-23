const express = require("express");
const router = express.Router();
const CartService = require("../../services/cart");
const { getErrorPayload } = require("../../utils/errorUtil");

async function insertCart(req, res) {
    try {
        const body = req.body;
        body.userId = req.user._id;
        await CartService.insertCart(body);
        const result = await CartService.getUserCart({ userId: req.user._id });
        return res.status(201).json({ data: result, message: "Successfully added to cart." });
    } catch (error) {
        const { status, ...rest } = getErrorPayload(error, 401);
        res.status(status).json({ ...rest });
    }
}

async function getUserCart(req, res) {
    try {
        const result = await CartService.getUserCart({ userId: req.user._id });
        return res.status(201).json({ data: result, message: "Successfully cart fetch." });
    } catch (error) {
        const { status, ...rest } = getErrorPayload(error, 401);
        res.status(status).json({ ...rest });
    }
}

async function deleteCart(req, res) {
    try {
        const { cartId } = req.params;
        await CartService.deleteCart({ cartId });
        const result = await CartService.getUserCart({ userId: req.user._id });
        return res.status(200).json({
            data: result,
            message: "Cart has been successfully remove.",
        });
    } catch (error) {
        let { status, errorObj } = getErrorPayload(error, 401);
        return res.status(status).json(errorObj);
    }
}

router.get("/", getUserCart);
router.post("/", insertCart);
router.delete("/:cartId", deleteCart);

module.exports = router;

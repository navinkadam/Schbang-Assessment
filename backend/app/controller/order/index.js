const express = require("express");
const router = express.Router();
const OrderService = require("../../services/order");
const { getErrorPayload } = require("../../utils/errorUtil");
const { emailSendToUser } = require("./helper");
async function insertOrder(req, res) {
    try {
        const user = req.user;
        const body = req.body;
        body.userId = user._id;
        const result = await OrderService.insertOrder(body);

        res.status(201).json({ data: result, message: "Successfully Order Placed." });

        return await emailSendToUser(result, user);
    } catch (error) {
        const { status, ...rest } = getErrorPayload(error, 401);
        res.status(status).json({ ...rest });
    }
}

async function getUserOrder(req, res) {
    try {
        const result = await OrderService.getUserOrder({ userId: req.user._id });
        return res.status(201).json({ data: result, message: "Successfully order fetch." });
    } catch (error) {
        const { status, ...rest } = getErrorPayload(error, 401);
        res.status(status).json({ ...rest });
    }
}

async function deleteOrder(req, res) {
    try {
        const { orderId } = req.params;
        await OrderService.deleteOrder({ orderId });
        return res.status(200).json({ message: "Order has been successfully deleted." });
    } catch (error) {
        let { status, errorObj } = getErrorPayload(error, 401);
        return res.status(status).json(errorObj);
    }
}

router.get("/", getUserOrder);
router.post("/", insertOrder);
router.delete("/:orderId", deleteOrder);

module.exports = router;

const express = require("express");
const router = express.Router();
const UserService = require("../../services/user");
const { getErrorPayload } = require("../../utils/errorUtil");

async function getLoginUser(req, res) {
    try {
        const result = await UserService.findUserById({ _id: req.user._id });
        return res.status(200).json({ data: result });
    } catch (error) {
        const { status, ...rest } = getErrorPayload(error, 401);
        res.status(status).json({ ...rest });
    }
}

router.get("/me", getLoginUser);

module.exports = router;

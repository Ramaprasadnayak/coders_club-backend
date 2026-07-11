const express = require("express");
const router = express.Router();
const userSchema = require("../models/user");
const auth = require("../middleware/auth");

router.get("/profile", auth, async (req, res) => {
    const user = await userSchema.findById(req.user.id).select("-password");

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
});

module.exports = router;

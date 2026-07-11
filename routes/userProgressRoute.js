const express = require('express');
const router = express.Router();
const userProgressSchema = require("../models/userprogress");

router.get("/", async (req, res) => {
    try {
        const progress=await userProgressSchema.find();
        res.json(progress);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;
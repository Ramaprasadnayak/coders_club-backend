const express = require("express");
const router = express.Router();
const userSchema = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//create new account
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await userSchema.findOne({$or: [{ email }, { username }]});
        if (existingUser) {
            return res.status(400).json({ message: "Username or Email already exists" });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newuser = new userSchema({
            username,
            email,
            password: hashedPassword
        });
        const saved = await newuser.save();

        const token = jwt.sign(
            { id: saved._id, username: saved.username, email: saved.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" } // token expires in 1 day
        );
        res.json({
            message: "Signup successful",
            token,
            user: { id: saved._id, username: saved.username, email: saved.email,points: saved.points }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalidd password" });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" } // token expires in 1 day
        );

        res.json({
            message: "Login successful",
            token,
            user: { id: user._id, username: user.username, email: user.email ,points: user.points}
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get("/leaderboard", async (req, res) => {
    try {
        const leaderboard = await userSchema.find({}, { username: 1, points: 1, _id: 0 }).sort({ points: -1 }).limit(5);
        res.json({leaderboard});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
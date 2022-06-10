const User = require("../models/userModel");
const asycnHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { use } = require("../routes/userRoutes");

const userSignup = asycnHandler(async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const dupUser = await User.findOne({ email: email });
        if (dupUser) {
            res.status(400).json({
                message: "Email is already used!!!",
            });
        } else {
            const salt = bcrypt.genSalt(10);
            const hash = bcrypt.hash(password, salt);
            const user = new User({
                name,
                email,
                phone,
                hash,
            });
            const response = await user.save();
            console.log(response);
            res.status(201).json({
                message: "User registered successfully!!!",
            });
        }
    } catch (error) {
        res.status(400).json({
            error: "User Registration failed!!!",
        });
    }
});

module.exports = { userSignup };

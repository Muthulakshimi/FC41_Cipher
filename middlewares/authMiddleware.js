const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            // console.log(token);
            const decode = jwt.verify(token, process.env.JWT_KEY);
            req.user = await User.findById(JSON.parse(decode));
            if (!req.user) {
                res.status(404).json({
                    status: false,
                    message: "No User Found",
                });
            }
            next();
        } catch (error) {
            res.status(401).json({
                status: false,
                message: "Token failed!!!",
            });
        }
    }
    console.log(req.user);
    if (!token) {
        res.status(401).json({
            status: false,
            message: "No token found!!!",
        });
    }
});

module.exports = { protect };

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
            token = req.headers.authorization.split(" ")[1];
            const decode = await jwt.verify(token, process.env.JWT_KEY);
            // console.log(decode);
            req.user = await User.findById(JSON.parse(decode)).select(
                "-password"
            );
            // console.log(req.user);
            if (!req.user) {
                res.status(404).json({
                    status: false,
                    message: "No User Found",
                });
            }
            next();
        } catch (err) {
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

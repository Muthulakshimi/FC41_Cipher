const asyncHandlder = require("express-async-handler");
const sendMail = require("../utils/sendMail");

const sendImages = asyncHandlder(async (req, res) => {
    try {
        sendMail(req);
        res.status(201).json({
            message: "Message send successfully",
        });
    } catch (error) {
        console.error("Error: " + error);
    }
});

module.exports = sendImages;

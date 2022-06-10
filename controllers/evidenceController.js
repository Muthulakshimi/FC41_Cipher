const asyncHandlder = require("express-async-handler");
const Contact = require("../models/contactModel");
const { sendImageMail } = require("../utils/sendMail");

const sendImages = asyncHandlder(async (req, res) => {
    try {
        console.log(req.file);
        const { userId } = req.body;
        const contacts = await Contact.find({ userId: userId });
        var email = contacts.map((contact) => contact.email);
        sendImageMail(req.file.filename, email);
        res.status(201).json({
            message: "Message send successfully",
        });
    } catch (error) {
        console.error("Error: " + error);
    }
});

module.exports = sendImages;

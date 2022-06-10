const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = (req) => {
    console.log(process.env.EMAIL2);
    console.log(process.env.PASS2);
    const transporter = nodemailer.createTransport({
        service: process.env.SERVICE2,
        auth: {
            user: process.env.EMAIL2,
            pass: process.env.PASS2,
        },
    });

    const options = {
        from: process.env.EMAIL2,
        to: "reports.ashwani@gmail.com",
        subject: "Sending test message",
        text: "Hii!! This is a test message",
        attachments: [
            {
                // file on disk as an attachment
                filename: "text3.txt",
                path: `${process.env.BASE_URL}:${PORT}/${req.files[0].destination}`, // stream this file
            },
        ],
    };

    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.error(err);
        } else {
            console.log(info.response);
        }
    });
};

module.exports = sendMail;

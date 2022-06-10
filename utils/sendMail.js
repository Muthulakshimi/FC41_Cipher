const nodemailer = require("nodemailer");
require("dotenv").config();

const sendImageMail = (filename, email) => {
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
        to: email,
        subject: "Sending test message",
        text: "Hii!! This is a test message",
        attachments: [
            {
                path: `public/evidence/${filename}`,
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

const sendMessageMail = (message, location, email) => {
    // console.log(process.env.EMAIL2);
    // console.log(process.env.PASS2);
    const transporter = nodemailer.createTransport({
        service: process.env.SERVICE2,
        auth: {
            user: process.env.EMAIL2,
            pass: process.env.PASS2,
        },
    });
    const options = {
        from: process.env.EMAIL2,
        to: email,
        subject: "Sending location",
        // text: ,
        html: `<p>${message}</p><p>Location: <b>${location}</b></p>`,
    };

    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.error(err);
        } else {
            console.log(info.response);
        }
    });
};

module.exports = { sendImageMail, sendMessageMail };

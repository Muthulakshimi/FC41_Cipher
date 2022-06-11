const User = require("../models/userModel");
const asycnHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const generateLocation = require("../utils/generateLocation");
const { sendMessageMail } = require("../utils/sendMail");
const Contact = require("../models/contactModel");

const login = asycnHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(req.body);
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(400).json({
                error: "Invalid login details!!!",
            });
        } else {
            await bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    var { _id } = user;
                    const token = generateToken(JSON.stringify(_id));
                    res.status(200).json({
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        phone: user.phone,
                        token: token,
                    });
                } else {
                    res.status(400).json({
                        error: "Incorrect email or password details!!!",
                    });
                }
            });
        }
    } catch (error) {
        res.status(400).json({
            error: "User Login failed!!!",
        });
    }
});

const userSignup = asycnHandler(async (req, res) => {
    try {
        // console.log(req.body);
        const { name, email, phone, password } = req.body;
        const dupUser = await User.findOne({ email: email });
        console.log("Dupuser: ", dupUser);
        if (dupUser) {
            res.status(400).json({
                message: "Email is already used!!!",
            });
        } else {
            // const salt = await bcrypt.genSalt(5);
            // const hashed = await bcrypt.hash(password, 10);
            // console.log(hashed);
            // const newUser = new User({
            //     name: name,
            //     email: email,
            //     phone: phone,
            //     password: hashed,
            // });
            // console.log(newUser);
            // await newUser.save();
            // console.log(response);
            // res.status(201).json({
            //     message: "User registered successfully!!!",
            // });
            await bcrypt.hash(password, 10, async function (err, hash) {
                const newUser = new User({
                    name: name,
                    email: email,
                    phone: phone,
                    password: hash,
                });
                const response = await newUser.save();
                console.log(response);
                res.status(201).json({
                    message: "User registered successfully!!!",
                });
            });
        }
    } catch (error) {
        res.status(400).json({
            error: "User Registration failed!!!",
        });
    }
});

const getUserLocation = asycnHandler(async (req, res) => {
    try {
        const { userId, lat, long, message } = req.body;
        if (!lat || !long || !message) {
            res.status(400).json({
                message: "Error in sending current location!!!",
            });
        }
        const location = generateLocation(lat, long);
        const contacts = await Contact.find({ userId: userId });
        // console.log(contacts);
        var email = contacts.map((contact) => contact.email);
        sendMessageMail(message, location, email);
        res.status(200).json({
            message: location,
        });
    } catch (error) {
        res.status(400).json({
            error: "Can't get user location!!!",
        });
    }
});

const sendMailToContacts = asycnHandler(async (req, res) => {
    try {
        const { userId, message, lat, long } = req.body;
        const location = generateLocation(lat, long);
        const contacts = await Contact.find({ userId: userId });
        // console.log(contacts);
        var email = contacts.map((contact) => contact.email);
        email.push("reports.ashwani@gmail.com");
        sendMessageMail(message, location, email);
        res.status(200).json({
            message: "Location updated to police",
        });
    } catch (err) {
        res.status(400).json({
            error: err,
        });
    }
});

// const updateProfile = asycnHandler(async (req, res) => {
//     try {
//         const {name,password}=req.body

//     } catch (error) {
//         res.status(400).json({
//             error: "Cannot update the profile",
//         });
//     }
// });

module.exports = { userSignup, login, getUserLocation, sendMailToContacts };

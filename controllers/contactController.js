const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const updateContacts = asyncHandler(async (req, res) => {
    try {
        const { userId, phone, email, relation, name } = req.body;
        console.log(req.body);
        var newContact;
        if (!userId && (!email || !phone)) {
            res.status(400).json({
                error: "Error in updating contact details !",
            });
        }
        if (!phone) {
            newContact = await new Contact({
                userId,
                phone,
                relation,
                name,
            });
        } else if (!email) {
            newContact = await new Contact({
                userId,
                email,
                relation,
                name,
            });
        } else {
            newContact = await new Contact({
                userId,
                email,
                phone,
                relation,
                name,
            });
        }
        const response = await newContact.save();
        console.log(response);
        res.status(201).json({
            message: "Contact details updated successfully !",
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: "Error in updating contact details !",
        });
    }
});

const deleteContact = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.body;
        console.log(_id);
        const contact = Contact.findById(_id);
        console.log(contact);
        await Contact.findByIdAndDelete(_id);
        res.status(201).json({
            message: "Contact deleted successfully!!!",
        });
    } catch (error) {
        res.status(400).json({
            error: "Error in deleting contact details!!!",
        });
    }
});

const getAllContacts = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.body;
        const contacts = await Contact.find({ userId: userId });
        if (contacts.length > 0) {
            res.status(200).json({
                data: contacts,
            });
        } else {
            res.status(400).json({
                message: "No contacts were found!!!",
            });
        }
    } catch (error) {
        res.status(400).json({
            error: "Error in fetching the contact details: ",
            error,
        });
    }
});

module.exports = { updateContacts, deleteContact, getAllContacts };

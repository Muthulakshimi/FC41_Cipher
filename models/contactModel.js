const mongoose = require("mongoose");

const contactModelSchema = mongoose.Schema(
    {
        userId: { type: String, required: true },
        relation: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Contact = mongoose.model("Contact", contactModelSchema);
module.exports = Contact;

const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            required: true,
            type: String,
        },
        email: {
            required: true,
            unique: true,
            type: String,
        },
        phone: {
            required: true,
            unique: true,
            type: Number,
        },
        password: {
            required: true,
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = User = mongoose.model("User", userSchema);

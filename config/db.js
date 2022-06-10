var mongoose = require("mongoose");
require("dotenv").config();

const db = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Mongodb connected to ${conn.connection.host}`);
        // mongoose.connection
        //     .once("open", () => {
        //         console.log("Database connected");
        //     })
        //     .on("error", (err) => {
        //         console.error("Error: ", err);
        //     });
    } catch (error) {
        console.error(error);
    }
};

module.exports = db;

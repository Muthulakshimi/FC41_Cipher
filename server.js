const express = require("express");
require("dotenv").config();
const db = require("./config/db");
const PORT = process.env.PORT || 5000;
const app = express();
db();
app.get("/", (req, res) => {
    res.end("Its running");
});

app.get("/another", (req, res) => {
    res.end("Its running here also");
});

app.listen(PORT, () => {
    console.log(`Server is running on : http://localhost:${PORT}`);
});

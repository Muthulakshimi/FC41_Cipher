const express = require("express");
require("dotenv").config();
const db = require("./config/db");
const PORT = process.env.PORT || 5000;
const userRoutes = require("./routes/userRoutes");
const app = express();
db();
app.get("/", (req, res) => {
    res.end("Its running");
});

app.get("/another", (req, res) => {
    res.end("Its running here also");
});

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on : http://localhost:${PORT}`);
});

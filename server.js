const express = require("express");
require("dotenv").config();
const db = require("./config/db");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 5000;
const userRoutes = require("./routes/userRoutes");
const evidenceRoutes = require("./routes/evidenceRoute");
const contactRoutes = require("./routes/contactRoutes");
const app = express();
app.use(express.json());
app.use(cors());
db();

// app.get("/", (req, res) => {
//     res.end("Its running");
// });

// app.get("/another", (req, res) => {
//     res.end("Its running here also");
// });

app.use("/api/public/", express.static("public/evidence"));
app.use("/api/public/audios", express.static("public/audios"));
app.use("/api/user", userRoutes);
app.use("/api/evidence", evidenceRoutes);
app.use("/api/contact", contactRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on : http://localhost:${PORT}`);
});

const express = require("express");
const app = express();

app.get((req, res) => {
    res.end("Its running");
});

app.listen(8000, () => {
    console.log(`Server is running on : http://localhost:8000`);
});

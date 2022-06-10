const { upload } = require("../utils/fileUpload");

const router = require("express").Router();

router.route("/").post(upload.array("files"), (req, res) => {
    res.end("Uploaded successfully!!!");
});

module.exports = router;

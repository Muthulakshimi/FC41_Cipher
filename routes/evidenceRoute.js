const sendImages = require("../controllers/evidenceController");
const { protect } = require("../middlewares/authMiddleware");
const { upload } = require("../utils/fileUpload");

const router = require("express").Router();

// router.route("/").post(upload.array("files"), (req, res) => {
//     console.log(req.files);
//     res.end("Images uploaded successfully!!!");
// });
router.route("/").post(protect, upload.single("file"), sendImages);
// router.route("/").post((req, res) => {
//     console.log(req);
//     res.end("bye");
// });
// router.route("/").put(sendImages);

module.exports = router;

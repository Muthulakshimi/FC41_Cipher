const router = require("express").Router();
const { userSignup } = require("../controllers/userController");
const { registerationValidation } = require("../middlewares/validation");

router.route("/").get((req, res) => {
    res.end("User route");
});
router.route("/signup").post(registerationValidation, userSignup);

module.exports = router;

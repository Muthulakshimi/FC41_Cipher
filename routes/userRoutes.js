const router = require("express").Router();
const { userSignup, login } = require("../controllers/userController");
const {
    registerationValidation,
    loginValidation,
} = require("../middlewares/validation");

router.route("/").get((req, res) => {
    res.end("User route");
});
router.route("/signup").post(registerationValidation, userSignup);
router.route("/login").post(loginValidation, login);

module.exports = router;

const router = require("express").Router();
const {
    userSignup,
    login,
    getUserLocation,
} = require("../controllers/userController");
const {
    registerationValidation,
    loginValidation,
} = require("../middlewares/validation");

router.route("/").get((req, res) => {
    res.end("User route");
});
router.route("/signup").post(registerationValidation, userSignup);
router.route("/login").post(loginValidation, login);
router.route("/location").post(getUserLocation);

module.exports = router;

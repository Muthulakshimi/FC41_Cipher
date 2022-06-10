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
const { protect } = require("../middlewares/authMiddleware");

router.route("/").get((req, res) => {
    res.end("User route");
});
router.route("/signup").post(registerationValidation, userSignup);
router.route("/login").post(loginValidation, login);
router.route("/location").post(protect, getUserLocation);

module.exports = router;

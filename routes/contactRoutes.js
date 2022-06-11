const router = require("express").Router();
const {
    updateContacts,
    deleteContact,
    getAllContacts,
} = require("../controllers/contactController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/update").post(protect, updateContacts);
router.route("/delete").post(protect, deleteContact);
router.route("/").post(protect, getAllContacts);

module.exports = router;

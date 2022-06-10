const router = require("express").Router();
const {
    updateContacts,
    deleteContact,
} = require("../controllers/contactController");

router.route("/update").post(updateContacts);
router.route("/delete").post(deleteContact);

module.exports = router;

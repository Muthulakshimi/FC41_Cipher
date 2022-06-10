const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { person, reason } = req.body;
        const path = `/public/evidence/${reason_person}-${Date.now().toString()}`;
        cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const maxSize = 10 * 1024 * 1024; //10MB

const upload = multer({
    storage,
    limits: { fileSize: maxSize },
});

module.exports = { upload };

const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = `public/evidence/`;
        if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
        cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.originalname +
                "-" +
                Date.now().toString() +
                path.extname(file.originalname)
        );
    },
});

const maxSize = 10 * 1024 * 1024; //10MB

const upload = multer({
    storage,
    limits: { fileSize: maxSize },
});

module.exports = { upload };

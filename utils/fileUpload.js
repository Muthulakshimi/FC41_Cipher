const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { person, reason } = req.body;
        console.log(req.body);
        const path = `public/evidence/${reason}-${person}-${Date.now().toString()}`;
        if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
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

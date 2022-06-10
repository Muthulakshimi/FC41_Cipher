const Validator = require("fastest-validator");
const v = new Validator();

const registerationValidation = (req, res, next) => {
    const schema = {
        name: { type: "string" },
        email: { type: "email" },
        phone: { type: "number" },
        password: { type: "string", min: 8 },
    };

    const validate = v.validate(req.body, schema);

    if (validate !== true) {
        return res.status(400).json({
            message: "Validation error",
            error: validate,
        });
    } else {
        next();
    }
};

module.exports = { registerationValidation };

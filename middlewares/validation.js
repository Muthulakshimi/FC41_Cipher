const Validator = require("fastest-validator");
const v = new Validator();

const registerationValidation = (req, res, next) => {
    const schema = {
        name: { type: "string" },
        email: { type: "email" },
        phone: { type: "number" },
        password: { type: "string" },
    };

    const validate = v.validate(req.body, schema);

    if (!validate) {
        return res.status(400).json({
            message: "Validation error",
            error: validate,
        });
    } else {
        next();
    }
};

const loginValidation = (req, res, next) => {
    const schema = {
        email: { type: "email" },
        password: { type: "string" },
    };

    const validate = v.validate(req.body, schema);

    if (!validate) {
        return res.status(400).json({
            message: "Validation error",
            error: validate,
        });
    } else {
        next();
    }
};

module.exports = { registerationValidation, loginValidation };

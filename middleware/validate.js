export default function validate(schema) {
    return (handler) => {
        return async (req, res) => {
            const body = req.body || {};
            const { error } = schema.validate(body, { abortEarly: false, stripUnknown: true });
            if (error) {
                return res.status(400).json({ success: false, message: "Validation error", details: error.details });
            }
            return handler(req, res);
        };
    };
}

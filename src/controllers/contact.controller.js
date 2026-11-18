const { validateContactMessage } = require("../validators/contact.validator");
const { receiveMessage } = require("../services/contact.service");

function sendMessage(req, res) {

    // Check the request content type
    if (!req.is("application/json")) {
        return res.status(415).json({
            success: false,
            message: "Content-Type must be application/json."
        });
    }

    // Validate submitted information
    const result = validateContactMessage(req.body);

    if (Object.keys(result.errors).length > 0) {
        return res.status(400).json({
            success: false,
            message: "Please correct the following errors.",
            errors: result.errors
        });
    }

    // Pass validated data to the service
    receiveMessage(result.data);

    return res.status(201).json({
        success: true,
        message: "Your message has been received."
    });
}

module.exports = { sendMessage };
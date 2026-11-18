function validateContactMessage(data) {
    const errors = {};

    // Ensure we received an object
    if (!data || typeof data !== "object" || Array.isArray(data)) {
        return {
            errors: {
                name: "Name is required.",
                email: "Email is required.",
                message: "Message is required."
            }
        };
    }

    const name = typeof data.name === "string" ? data.name.trim() : "";
    const email = typeof data.email === "string" ? data.email.trim() : "";
    const message = typeof data.message === "string" ? data.message.trim() : "";

    // Name validation
    if (!name) {
        errors.name = "Name is required.";
    } else if (name.length < 2 || name.length > 80) {
        errors.name = "Name must be between 2 and 80 characters.";
    }

    // Email validation
    if (!email) {
        errors.email = "Email is required.";
    } else if (
        email.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
        errors.email = "Please enter a valid email address.";
    }

    // Message validation
    if (!message) {
        errors.message = "Message is required.";
    } else if (message.length < 10 || message.length > 5000) {
        errors.message = "Message must be between 10 and 5000 characters.";
    }

    return {
        errors,
        data: {
            name,
            email,
            message
        }
    };
}

module.exports = { validateContactMessage };
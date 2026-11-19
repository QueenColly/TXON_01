
function validateContactMessage(data) {
    const errors = {};

    // 1. Check that the request body is an object
    if (!data || typeof data !== "object" || Array.isArray(data)) {
        return {
            errors: {
                name: "First name or username is required.",
                email: "Email address is required.",
                message: "Message is required."
            }
        };
    }

    // 2. Normalize the submitted values
    const name = typeof data.name === "string"
        ? data.name.trim()
        : "";

    const email = typeof data.email === "string"
        ? data.email.trim()
        : "";

    const message = typeof data.message === "string"
        ? data.message.trim()
        : "";

    // 3. Validate first name or username

    const validFirstName =
        /^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u;

    const validUsername =
        /^[\p{L}][\p{L}\p{N}._-]{2,29}$/u;

    if (!name) {
        errors.name = "First name or username is required.";

    } else if (name.length > 80) {
        errors.name = "Name must not exceed 80 characters.";

    } else if (name.length < 2) {
        errors.name = "Name must contain at least 2 characters.";

    } else if (
        !validFirstName.test(name) &&
        !validUsername.test(name)
    ) {
        errors.name =
            "Enter a valid first name or username.";
    }

    // 4. Validate email address

    const validEmail =
        /^(?!.*\.\.)[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i;

    if (!email) {
        errors.email = "Email address is required.";

    } else if (email.length > 254) {
        errors.email = "Email address is too long.";

    } else if (!validEmail.test(email)) {
        errors.email = "Please enter a valid email address.";
    }

    // 5. Validate message

    if (!message) {
        errors.message = "Message is required.";

    } else if (message.length < 10 || message.length > 5000) {
        errors.message =
            "Message must be between 10 and 5000 characters.";
    }

    // 6. Return validation result

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

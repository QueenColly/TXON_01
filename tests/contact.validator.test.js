const { validateContactMessage } = require("../src/validators/contact.validator");

describe("Contact Message Validator", () => {

    test("should accept valid contact information", () => {
        const input = {
            name: "Jane Doe",
            email: "jane@example.com",
            message: "I would like to discuss a project."
        };

        const result = validateContactMessage(input);

        expect(result.errors).toEqual({});
        expect(result.data).toEqual(input);
    });

    test("should trim whitespace from submitted values", () => {
        const input = {
            name: "  Jane Doe  ",
            email: "  jane@example.com  ",
            message: "  I would like to discuss a project.  "
        };

        const result = validateContactMessage(input);

        expect(result.errors).toEqual({});
        expect(result.data.name).toBe("Jane Doe");
        expect(result.data.email).toBe("jane@example.com");
        expect(result.data.message).toBe(
            "I would like to discuss a project."
        );
    });

    test("should reject an empty name", () => {
        const result = validateContactMessage({
            name: "",
            email: "jane@example.com",
            message: "I would like to discuss a project."
        });

        expect(result.errors.name).toBeDefined();
    });

    test("should reject a name shorter than 2 characters", () => {
        const result = validateContactMessage({
            name: "J",
            email: "jane@example.com",
            message: "I would like to discuss a project."
        });

        expect(result.errors.name).toBeDefined();
    });

    test("should reject an invalid email address", () => {
        const result = validateContactMessage({
            name: "Jane Doe",
            email: "not-an-email",
            message: "I would like to discuss a project."
        });

        expect(result.errors.email).toBeDefined();
    });

    test("should reject a message shorter than 10 characters", () => {
        const result = validateContactMessage({
            name: "Jane Doe",
            email: "jane@example.com",
            message: "Hi"
        });

        expect(result.errors.message).toBeDefined();
    });

    test("should reject missing contact information", () => {
        const result = validateContactMessage({});

        expect(result.errors.name).toBeDefined();
        expect(result.errors.email).toBeDefined();
        expect(result.errors.message).toBeDefined();
    });

    test("should reject a missing request body", () => {
        const result = validateContactMessage(undefined);

        expect(result.errors.name).toBeDefined();
        expect(result.errors.email).toBeDefined();
        expect(result.errors.message).toBeDefined();
    });
    test("should reject a name longer than 80 characters", () => {
    const result = validateContactMessage({
        name: "A".repeat(81),
        email: "jane@example.com",
        message: "I would like to discuss a project."
    });

    expect(result.errors.name).toBeDefined();
});

test("should reject an email longer than 254 characters", () => {
    const result = validateContactMessage({
        name: "Jane Doe",
        email: `${"a".repeat(245)}@example.com`,
        message: "I would like to discuss a project."
    });

    expect(result.errors.email).toBeDefined();
});

test("should reject a message longer than 5000 characters", () => {
    const result = validateContactMessage({
        name: "Jane Doe",
        email: "jane@example.com",
        message: "A".repeat(5001)
    });

    expect(result.errors.message).toBeDefined();
});

test("should accept Unicode names", () => {
    const result = validateContactMessage({
        name: "Chinwé",
        email: "chinwe@example.com",
        message: "I would like to discuss a project."
    });

    expect(result.errors).toEqual({});
    expect(result.data.name).toBe("Chinwé");
});

test("should accept a valid username", () => {
    const result = validateContactMessage({
        name: "collete_umeh",
        email: "collete@gmail.com",
        message: "I would like to discuss a project."
    });

    expect(result.errors).toEqual({});
    expect(result.data.name).toBe("collete_umeh");
});

test("should reject a name containing only numbers", () => {
    const result = validateContactMessage({
        name: "123456",
        email: "jane@example.com",
        message: "I would like to discuss a project."
    });

    expect(result.errors.name).toBeDefined();
});

test("should reject a name containing invalid characters", () => {
    const result = validateContactMessage({
        name: "Jane@Doe",
        email: "jane@example.com",
        message: "I would like to discuss a project."
    });

    expect(result.errors.name).toBeDefined();
});

test("should reject an email without a domain extension", () => {
    const result = validateContactMessage({
        name: "Jane Doe",
        email: "collete@company",
        message: "I would like to discuss a project."
    });

    expect(result.errors.email).toBeDefined();
});

test("should reject an email containing consecutive dots", () => {
    const result = validateContactMessage({
        name: "Jane Doe",
        email: "collete..umeh@gmail.com",
        message: "I would like to discuss a project."
    });

    expect(result.errors.email).toBeDefined();
});

test("should reject a name that is not a string", () => {
    const result = validateContactMessage({
        name: 12345,
        email: "jane@example.com",
        message: "I would like to discuss a project."
    });

    expect(result.errors.name).toBeDefined();
});

});

const request = require("supertest");
const app = require("../src/app");

describe("Application health check", () => {
    test("should return status 200", async () => {
        const response = await request(app).get("/api/health");

        expect(response.statusCode).toBe(200);
    });

    test("should return the correct health message", async () => {
        const response = await request(app).get("/api/health");

        expect(response.body).toEqual({
            message: "TXON Portfolio API is running"
        });
    });
});

describe("POST /send-message", () => {

    beforeEach(() => {
        jest.spyOn(console, "info").mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("should accept a valid contact message", async () => {
        const response = await request(app)
            .post("/send-message")
            .send({
                name: "Jane Doe",
                email: "jane@example.com",
                message: "I would like to discuss a project."
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe(
            "Your message has been received."
        );
    });

    test("should reject an empty request body", async () => {
        const response = await request(app)
            .post("/send-message")
            .send({});

        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.errors).toHaveProperty("name");
        expect(response.body.errors).toHaveProperty("email");
        expect(response.body.errors).toHaveProperty("message");
    });

    test("should reject an invalid email address", async () => {
        const response = await request(app)
            .post("/send-message")
            .send({
                name: "Jane Doe",
                email: "not-an-email",
                message: "I would like to discuss a project."
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.errors.email).toBeDefined();
    });

    test("should reject a message that is too short", async () => {
        const response = await request(app)
            .post("/send-message")
            .send({
                name: "Jane Doe",
                email: "jane@example.com",
                message: "Hi"
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.errors.message).toBeDefined();
    });

    test("should reject a name that is too short", async () => {
        const response = await request(app)
            .post("/send-message")
            .send({
                name: "J",
                email: "jane@example.com",
                message: "I would like to discuss a project."
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.errors.name).toBeDefined();
    });

    test("should reject an unsupported content type", async () => {
        const response = await request(app)
            .post("/send-message")
            .set("Content-Type", "text/plain")
            .send("name=Jane");

        expect(response.statusCode).toBe(415);
    });
    test("should reject malformed JSON", async () => {
    const response = await request(app)
        .post("/send-message")
        .set("Content-Type", "application/json")
        .send('{"name": "Jane",');

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Invalid JSON request body.");
});

test("should reject a request body larger than 10KB", async () => {
    const response = await request(app)
        .post("/send-message")
        .send({
            name: "Jane Doe",
            email: "jane@example.com",
            message: "A".repeat(11000)
        });

    expect(response.statusCode).toBe(413);
    expect(response.body.message).toBe("Request body is too large.");
});

test("should return 404 for an unknown endpoint", async () => {
    const response = await request(app)
        .get("/this-route-does-not-exist");

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Resource not found.");
});

});

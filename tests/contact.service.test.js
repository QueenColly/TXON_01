const { receiveMessage } = require("../src/services/contact.service");

describe("Contact Message Service", () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("should log the received contact message", () => {
        const consoleSpy = jest
            .spyOn(console, "info")
            .mockImplementation(() => {});

        const contactData = {
            name: "Jane Doe",
            email: "jane@example.com",
            message: "I would like to discuss a project."
        };

        const result = receiveMessage(contactData);

        expect(consoleSpy).toHaveBeenCalledWith(
            "Contact message received:",
            contactData
        );

        expect(result).toEqual({
            received: true
        });
    });

});
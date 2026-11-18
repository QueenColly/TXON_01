function receiveMessage(contactData) {
    console.info("Contact message received:", contactData);

    return {
        received: true
    };
}

module.exports = { receiveMessage };
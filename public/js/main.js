
// =====================================
// 1. SELECT HTML ELEMENTS
// =====================================

const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");
const submitButton = document.querySelector("#submitButton");
const currentYear = document.querySelector("#currentYear");


// =====================================
// 2. DISPLAY THE CURRENT YEAR
// =====================================

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// =====================================
// 3. HANDLE CONTACT FORM SUBMISSION
// =====================================

contactForm.addEventListener("submit", async (event) => {

    // Prevent the browser's default form submission
    event.preventDefault();

    // Prevent multiple submissions while a request is processing
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    // Clear previous status messages
    formStatus.textContent = "";

    // Collect the form values
    const formData = new FormData(contactForm);

    const contactData = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message")
    };

    try {

        // Send the data to our Express backend
        const response = await fetch("/send-message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contactData)
        });

        const result = await response.json();

        // Handle unsuccessful responses
        if (!response.ok) {

            if (result.errors) {
                formStatus.textContent =
                    Object.values(result.errors).join(" ");
            } else {
                formStatus.textContent = result.message ||
                    "Unable to send your message.";
            }

            return;
        }

        // Redirect after successful submission
        window.location.href = "/thank-you.html";

    } catch (error) {

        // Handle network or unexpected frontend errors
        console.error("Contact form error:", error);

        formStatus.textContent =
            "Unable to send your message. Please try again.";

    } finally {

        // Restore the button
        submitButton.disabled = false;
        submitButton.textContent = "Send message ↗";
    }
});

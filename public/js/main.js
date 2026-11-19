
// =====================================
// 1. SELECT HTML ELEMENTS
// =====================================

const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");
const submitButton = document.querySelector("#submitButton");
const currentYear = document.querySelector("#currentYear");


const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");

const nameError = document.querySelector("#nameError");
const emailError = document.querySelector("#emailError");

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
    if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
        // Keep your existing submission code here.
    });
}

    // Prevent the browser's default form submission
    event.preventDefault();

    // Validate name and email before sending the request
const nameValidation = validateName(nameInput.value);
const emailValidation = validateEmail(emailInput.value);

showValidation(nameInput, nameError, nameValidation);
showValidation(emailInput, emailError, emailValidation);

// Stop submission if either field is invalid
if (nameValidation || emailValidation) {
    return;
}

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



// =====================================
// 4. HERO TYPEWRITER ANIMATION
// =====================================

const changingRole = document.querySelector("#changingRole");

const roles = [
    "digital experiences.",
    "innovative solutions.",
    "reliable applications.",
    "meaningful technology."
];

let roleIndex = 0;
let characterIndex = 0;
let isDeleting = false;

function typeWriter() {

    // Stop if the HTML element does not exist
    if (!changingRole) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
        // Remove one character
        characterIndex--;
    } else {
        // Add one character
        characterIndex++;
    }

    // Display the current part of the phrase
    changingRole.textContent =
        currentRole.substring(0, characterIndex);

    let typingSpeed = isDeleting ? 45 : 90;

    // When the phrase is completely typed
    if (!isDeleting && characterIndex === currentRole.length) {

        // Pause before deleting
        typingSpeed = 1600;
        isDeleting = true;

    } else if (isDeleting && characterIndex === 0) {

        // Move to the next phrase
        isDeleting = false;

        roleIndex = (roleIndex + 1) % roles.length;

        // Pause before typing the next phrase
        typingSpeed = 400;
    }

    setTimeout(typeWriter, typingSpeed);
}

// Start the animation
if (changingRole) {
    typeWriter();
}


// =====================================
// 5. CONTACT FORM LIVE VALIDATION
// =====================================

// Validate first name or username
function validateName(name) {
    const validFirstName =
        /^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u;

    const validUsername =
        /^[\p{L}][\p{L}\p{N}._-]{2,29}$/u;

    const value = name.trim();

    if (!value) {
        return "First name or username is required.";
    }

    if (value.length < 2 || value.length > 80) {
        return "Name must contain 2–80 characters.";
    }

    if (
        !validFirstName.test(value) &&
        !validUsername.test(value)
    ) {
        return "Enter a valid first name or username.";
    }

    return "";
}


// Validate email address
function validateEmail(email) {
    const value = email.trim();

    const validEmail =
        /^(?!.*\.\.)[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i;

    if (!value) {
        return "Email address is required.";
    }

    if (value.length > 254 || !validEmail.test(value)) {
        return "Please enter a valid email address.";
    }

    return "";
}

function showValidation(input, errorElement, errorMessage) {

    errorElement.textContent = errorMessage;

    input.classList.toggle("invalid", Boolean(errorMessage));
    input.classList.toggle("valid", !errorMessage && input.value.trim() !== "");
}

nameInput.addEventListener("input", () => {
    const error = validateName(nameInput.value);

    showValidation(nameInput, nameError, error);
});

emailInput.addEventListener("input", () => {
    const error = validateEmail(emailInput.value);

    showValidation(emailInput, emailError, error);
});

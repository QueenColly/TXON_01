# TXON Task 01 — Personal Portfolio with Express Message Handler

## Project Overview

A responsive, single-page personal portfolio website built with HTML5, CSS3, and JavaScript, supported by a Node.js and Express.js backend.

The application includes a contact form that accepts visitor details, validates submissions, and logs successfully received messages on the server.

## Features

- Personal portfolio with About Me, Skills, and Contact sections.
- Responsive layout using CSS Flexbox.
- Dark-themed user interface.
- Contact form with client-side and server-side validation.
- Express.js API endpoint for receiving messages.
- Success and error responses.
- Thank-you page after successful submission.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- Jest
- Supertest

## Project Structure

- `public/` — Frontend files.
- `src/controllers/` — Request handling.
- `src/routes/` — API route definitions.
- `src/services/` — Message-handling logic.
- `src/validators/` — Input validation.
- `tests/` — Automated tests.
- `server.js` — Application entry point.

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/QueenColly/TXON_01.git
```

### 2. Enter the project directory

```bash
cd TXON_01
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Visit:

`http://localhost:3000`

## API Documentation

### POST /send-message

Receives contact form submissions.

**Request body:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "I would like to discuss a project."
}
```

**Successful response — HTTP 201**

```json
{
  "success": true,
  "message": "Your message has been received."
}
```

**Validation error — HTTP 400**

Returns an error message and field-specific validation errors.

## Running Tests

Execute:

```bash
npm test
```

## Message Handling

For this project, successfully submitted messages are logged to the server console. Messages are not persisted in a database.

## Author

 Collete Umeh

## Internship

TXON Full Stack Development Internship — Week 01
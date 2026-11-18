const express = require("express");
const path = require("path");

const contactRoutes = require("./routes/contact.routes");

const app = express();

// Middleware: parse incoming JSON requests
app.use(express.json({ limit: "10kb" }));

// API health check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        message: "TXON Portfolio API is running"
    });
});

// Contact routes
app.use("/", contactRoutes);

// Serve frontend files
app.use(express.static(path.join(__dirname, "../public")));

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Resource not found."
    });
});

// Handle application errors
app.use((err, req, res, next) => {
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({
            success: false,
            message: "Invalid JSON request body."
        });
    }

    if (err.type === "entity.too.large") {
        return res.status(413).json({
            success: false,
            message: "Request body is too large."
        });
    }

    console.error(err);

    return res.status(500).json({
        success: false,
        message: "An unexpected error occurred."
    });
});

module.exports = app;
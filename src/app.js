import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// 💡 Root Route — HTML Landing Page
app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <title>📘 School API</title>
            <style>
                body {
                    font-family: sans-serif;
                    background: #f4f4f4;
                    padding: 2rem;
                    text-align: center;
                }
                .container {
                    background: white;
                    padding: 2rem;
                    max-width: 800px;
                    margin: 0 auto;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                }
                pre {
                    background: #eee;
                    padding: 1rem;
                    border-radius: 5px;
                    text-align: left;
                    overflow: auto;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🚀 Welcome to the School API</h1>
                <p>This API allows you to manage schools, including listing nearby ones and adding new schools.</p>

                <h2>📍 List Schools</h2>
                <p><strong>GET /api/v1/schools/listSchools</strong></p>
                <p>Query: <code>?latitude=19.076&longitude=72.8777</code></p>
                <a href="/api/v1/schools/listSchools?latitude=19.076&longitude=72.8777" target="_blank">Try Now</a>

                <h2>🏫 Add School</h2>
                <p><strong>POST /api/v1/schools/addSchool</strong></p>
                <p>Sample JSON body:</p>
                <pre>{
    "name": "Green Future School",
    "address": "Tech Valley, Pune",
    "latitude": 18.5204,
    "longitude": 73.8567
}</pre>
            </div>
        </body>
        </html>
    `);
});

// 🔁 Routes
import schoolRoutes from "./routes/school.route.js";
app.use("/api/v1/schools", schoolRoutes);

// ❗ Global Error Handler
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
        status: err.statusCode || 500,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
});

export default app;

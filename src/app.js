import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

import schoolRoutes from "./routes/school.route.js";

app.use("/api/v1/schools", schoolRoutes);

// Global error handler
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
        status: err.statusCode || 500,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
});

export default app;
import dotenv from "dotenv";
dotenv.config({
    path: "./.env.local"
});

import connectToDb from "./db/db.js";
import app from "./app.js";

const connectDb = async () => {
    try {
        await connectToDb();
        console.log("✅ Database connected successfully");

        // Handle unexpected app errors
        app.on("error", (error) => {
            console.error("❌ Error in app:", error.message);
            throw error;
        });

        app.listen(process.env.PORT || 9211, () => {
            console.log(`🚀 Server is running on port ${process.env.PORT}`);
        });

    } catch (error) {
        console.error("❌ Error connecting to the database:", error.message);
        process.exit(1);
    }
};

connectDb();
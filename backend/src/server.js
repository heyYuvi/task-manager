import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import DBconnect from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import taskRouter from "./routes/taskRoutes.js";
import { protect } from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());

app.use(cookieParser());

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        status: "ok",
        date: new Date().toISOString(),
        message: "Task Manager is running"
    });
});

app.use("/api", userRouter);
app.use("/api", taskRouter);

const startServer = async () => {
    try {
        await DBconnect();
        app.listen(PORT, () => {
            console.log("Server is running on the PORT", PORT);
        });
    } catch (error) {
        console.error("Failed to connect to the database: ", error.message);
    }
}

startServer();
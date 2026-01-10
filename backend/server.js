import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./database/dbConnection.js";
import authRoutes from "./routes/authRoute.js";

const server = express();

server.use(cors({
  origin: "http://localhost:5174",
  credentials: true
}));

connectDB();

server.use(express.json());

server.use("/api/auth", authRoutes);

server.get("/", (req, res) => {
    try {
        res.send(`You're on chessPUZZ's backend page..`);
    } catch (err) {
        console.error("Something went wrong..", err);
    }
})

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`)
})
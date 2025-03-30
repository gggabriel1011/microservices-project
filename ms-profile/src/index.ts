import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import profileRoutes from "./routes/profile.routes";

import { verifyBasicAuth } from "./middleware/basicAuth.middleware";
import { connectDB } from "./config/database";
import type { RequestHandler } from "express";

import https from "https";
import fs from "fs";

// Load SSL certificate and private key for local HTTPS
const sslOptions = {
  key: fs.readFileSync("cert.key"),
  cert: fs.readFileSync("cert.pem")
};

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001; // Define working port for ms-profile service

// Enable JSON  request in body
app.use(express.json());

// Apply Basic Auth middleware globally to protect all routes
app.use(verifyBasicAuth as RequestHandler);

// Register all profile-related routes under /api
app.use("/api", profileRoutes);

// Connect to MongoDB and start the HTTPS server
connectDB()
  .then(() => {
    https.createServer(sslOptions, app).listen(PORT, () => {
      console.log(`MS-PROFILE running on https://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

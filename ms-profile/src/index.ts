import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import profileRoutes from "./routes/profile.routes";

import { verifyBasicAuth } from "./middleware/basicAuth.middleware";

import { connectDB } from "./config/database";

import type { RequestHandler } from "express";

import https from "https";
import fs from "fs";

const sslOptions = {
  key: fs.readFileSync("cert.key"),
  cert: fs.readFileSync("cert.pem")
};

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());

app.use(verifyBasicAuth as RequestHandler);

app.use("/api", profileRoutes);

connectDB().then(() => {
  https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`MS-PROFILE running on https://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});


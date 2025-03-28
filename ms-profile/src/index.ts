import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import profileRoutes from "./routes/profile.routes";

import { verifyBasicAuth } from "./middleware/basicAuth.middleware";

import { connectDB } from "./config/database";

import type { RequestHandler } from "express";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());

app.use(verifyBasicAuth as RequestHandler);

app.use("/api", profileRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`MS-PROFILE running on http://localhost:${PORT}`);
  });
});


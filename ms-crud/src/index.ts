import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import profileRoutes from "./routes/profile.routes";

import { verifyBasicAuth } from "./middleware/basicAuth.middleware";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4002;

app.use(express.json());

app.use(verifyBasicAuth);

app.use("/api", profileRoutes);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`MS-CRUD running on http://localhost:${PORT}`);
  });
});

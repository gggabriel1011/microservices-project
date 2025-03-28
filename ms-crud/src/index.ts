import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import profileRoutes from "./routes/profile.routes";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api", profileRoutes);

const PORT = process.env.PORT || 4002;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`MS-CRUD running on http://localhost:${PORT}`);
  });
});

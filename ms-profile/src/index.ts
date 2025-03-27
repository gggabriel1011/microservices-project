import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import profileRoutes from "./routes/profile.routes";

dotenv.config();
const app = express();

app.use(express.json());

// Conectamos las rutas
app.use("/api", profileRoutes);

const PORT = process.env.PORT || 4001;

mongoose.connect(process.env.MONGO_URI as string)
    .then(() => app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    }))
    .catch(err => console.error(err));

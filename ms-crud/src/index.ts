import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4002;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("MS-CRUD running");
});

app.listen(PORT, () => {
  console.log(`MS-CRUD running on http://localhost:${PORT}`);
});

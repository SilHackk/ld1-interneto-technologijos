import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB prijungta"))
  .catch(err => console.log("❌ Klaida:", err));

app.get("/", (req, res) => {
  res.send("Serveris veikia");
});

app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveris paleistas ant ${PORT}`);
});
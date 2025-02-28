import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import emailRoutes from "./routes/emailRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/email", emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

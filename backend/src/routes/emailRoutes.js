import express from "express";
import { createEmail, sendEmail } from "../controllers/emailController.js";

const router = express.Router();

router.post("/generate", createEmail);
router.post("/send", sendEmail);

export default router;

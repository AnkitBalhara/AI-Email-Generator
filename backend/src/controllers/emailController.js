import { generateEmail } from "../services/geminiService.js";
import { sendEmailService } from "../services/emailService.js";

export const createEmail = async (req, res) => {
    try {
        const { keyPoints } = req.body;
        if (!keyPoints) {
            return res.status(400).json({ error: "Key points are required" });
        }

        const { subject, emailBody } = await generateEmail(keyPoints);
        return res.status(200).json({ subject, emailBody });

    } catch (error) {
        console.error("Google Gemini API Error:", error);
        return res.status(500).json({ error: "Failed to generate email" });
    }
};

export const sendEmail = async (req, res) => {
    try {
        const { recipients, subject, emailBody } = req.body;

    
        if (!recipients || !subject || !emailBody) {
            return res.status(400).json({ error: "All fields are required" });
        }

        await sendEmailService(recipients, subject, emailBody);
        return res.status(200).json({ message: "Email sent successfully" });

    } catch (error) {
        console.error("Nodemailer Error:", error);
        return res.status(500).json({ error: "Failed to send email" });
    }
};

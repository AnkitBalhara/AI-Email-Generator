import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

// const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro-vision-latest:generateContent";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";


// const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export const generateEmail = async (keyPoints) => {
    console.log("Google API Key from geminiService.js:", process.env.GOOGLE_GEMINI_API_KEY);

    try {
        const response = await axios.post(
            `${GEMINI_API_URL}?key=${process.env.GOOGLE_GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: `Generate a professional email based on these key points: ${keyPoints}` }] }]
            }
        );

        const generatedText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to generate email.";
        return { subject: "Professional Email Based on Your Key Points", emailBody: generatedText };

    } catch (error) {
        console.error("Google Gemini API Error:", error.response?.data || error.message);
        throw new Error("Failed to generate email from Google Gemini API");
    }
};

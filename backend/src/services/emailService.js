import nodemailer from "nodemailer";
import transporter from "../config/nodemailerConfig.js";

export const sendEmailService = async (recipients, subject, emailBody) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipients,
        subject: subject,
        text: emailBody,
    };

    return await transporter.sendMail(mailOptions);
};

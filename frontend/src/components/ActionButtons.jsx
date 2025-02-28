import { useContext } from "react";
import { EmailContext } from "../context/EmailContext";
import axios from "axios";

export default function ActionButtons() {
  const { emails, keyPoints, subject, generatedEmail, validateEmails, validateKeyPoints } = useContext(EmailContext);

  const handleGenerateEmail = () => {
    if (!validateEmails(emails) || !validateKeyPoints()) {
      alert("Please correct the errors before generating the email.");
      return;
    }
    console.log("Generating email with:", { emails, keyPoints });
  };

  const handleSendEmail = async () => {
    if (!validateEmails(emails) || !validateKeyPoints()) {
      alert("Please correct the errors before sending the email.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/send-email", {
        emails: emails.split(",").map(email => email.trim()),
        subject,
        message: generatedEmail
      });
      alert("Emails sent successfully!");
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send email.");
    }
  };

  return (
    <div className="flex justify-between mt-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleGenerateEmail}
      >
        Generate Email
      </button>

      <button
        className="px-4 py-2 bg-green-500 text-white rounded"
        onClick={handleSendEmail}
      >
        Send Email
      </button>
    </div>
  );
}

import { useContext } from "react";
import { EmailContext } from "../context/EmailContext";
import axios from "axios";

export default function GeneratedEmail() {
  const { emails, subject, setSubject, generatedEmail, setGeneratedEmail, validateEmails, validateKeyPoints } = useContext(EmailContext);

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
    <div className="p-6 space-y-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-medium">Generated Email</h2>
      
      <input
        type="text"
        className="w-full p-2 border rounded font-bold"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      
      <textarea
        className="w-full p-2 border rounded"
        rows="6"
        value={generatedEmail}
        onChange={(e) => setGeneratedEmail(e.target.value)}
      />

      {/* Send Email Button */}
      <button
        className="w-full px-4 py-2 bg-green-500 text-white rounded"
        onClick={handleSendEmail}
      >
        Send Email
      </button>
    </div>
  );
}

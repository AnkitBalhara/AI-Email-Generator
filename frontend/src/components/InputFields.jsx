import { useContext } from "react";
import { EmailContext } from "../context/EmailContext";
import axios from "axios";

export default function InputFields() {
  const { emails, setEmails, keyPoints, setKeyPoints, validateEmails, validateKeyPoints,setGeneratedEmail,setSubject } = useContext(EmailContext);

  const handleGenerateEmail =async () => {
    if (!validateEmails(emails) || !validateKeyPoints()) {
      alert("Please correct the errors before generating the email.");
      return;
    }

    try {
      const connection = await axios.post("http://localhost:5000/api/email/generate", {
        keyPoints:keyPoints
      });
      console.log("Key points passed successful : -",connection.data.emailBody)

      let emailBody=connection.data.emailBody
      let emailSubject = emailBody.split("\n")[0]
      let contentBody =emailBody.split(emailSubject+"\n\n")[1]
      setGeneratedEmail(contentBody)
      setSubject(emailSubject)
      // setGeneratedEmail(emailBody)
    } catch (error) {
      console.log("Error in Connection with the Backend")
    }
    
    console.log("Generating email with:", { emails, keyPoints });

  };

  return (
    <div className="p-6 space-y-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold">Generate Professional Email</h2>
      
      <input
        type="text"
        placeholder="Enter recipient emails (comma-separated)"
        className="w-full p-2 border rounded"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
      />
      {!validateEmails(emails) && emails.length > 0 && <p className="text-red-500">Invalid email format!</p>}
      
      <textarea
        placeholder="Enter key points for the email"
        className="w-full p-2 border rounded"
        rows="4"
        value={keyPoints}
        onChange={(e) => setKeyPoints(e.target.value)}
      />
      {!validateKeyPoints() && keyPoints.length > 0 && <p className="text-red-500">Key points cannot be empty!</p>}

      {/* Generate Email Button */}
      <button
        className="w-full px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
        onClick={handleGenerateEmail}
      >
        Generate Email
      </button>
    </div>
  );
}

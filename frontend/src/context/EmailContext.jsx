import { createContext, useState } from "react";

export const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
  const [emails, setEmails] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [subject, setSubject] = useState("Generated Subject");
  const [generatedEmail, setGeneratedEmail] = useState("Generated email content...");

  const validateEmails = (emails) => {
    const emailArray = emails.split(",").map(email => email.trim());
    return emailArray.every(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  };

  const validateKeyPoints = () => keyPoints.trim().length > 0;

  return (
    <EmailContext.Provider value={{
      emails, setEmails, keyPoints, setKeyPoints,
      subject, setSubject, generatedEmail, setGeneratedEmail,
      validateEmails, validateKeyPoints
    }}>
      {children}
    </EmailContext.Provider>
  );
};

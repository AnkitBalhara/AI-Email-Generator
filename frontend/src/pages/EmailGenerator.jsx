import { EmailProvider } from "../context/EmailContext";
import InputFields from "../components/InputFields";
import GeneratedEmail from "../components/GeneratedEmail";

export default function EmailGenerator() {
  return (
    <EmailProvider>
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <InputFields />
        <GeneratedEmail />
      </div>
    </EmailProvider>
  );
}

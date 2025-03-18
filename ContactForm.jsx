import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // Success/Error message
  const [isSending, setIsSending] = useState(false); // Loading state

  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSending(true); // Disable button & show loading state
    setStatus(""); // Clear previous messages

    try {
      await emailjs.sendForm("service_67b487i", "template_cepyb1l", form.current, {
        publicKey: "kOzn_T_0J_NLm5uAW",
      });

      setStatus("✅ Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("FAILED...", error.text);
      setStatus("❌ Failed to send message. Please try again.");
    } finally {
      setIsSending(false); // Re-enable button
    }
  };

  return (
    <div>
      {status && <p className="text-cyan text-lg font-semibold">{status}</p>}

      <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
        <input
          type="text"
          name="from_name"
          placeholder="Your Name"
          required
          className="h-12 rounded-lg bg-lightBrown px-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="from_email"
          placeholder="Your Email"
          required
          className="h-12 rounded-lg bg-lightBrown px-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          name="message"
          rows="5"
          placeholder="Message"
          required
          className="rounded-lg bg-lightBrown p-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className={`w-full rounded-lg border border-cyan text-white h-12 font-bold text-xl transition-all duration-500 ${
            isSending ? "bg-gray-500 cursor-not-allowed" : "hover:bg-darkCyan bg-cyan"
          }`}
          disabled={isSending}
        >
          {isSending ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

import { useEffect, useRef, useState } from "react";
import "./styles/Contact.css";
import emailjs from "@emailjs/browser";

const TEMPLATE_ID = "template_knx28fs"; //! It doesn't matter if i show this, this is only to
const PUBLIC_KEY = "rkt9jX6zxrEIBi31q"; //! send emails to an account i created, so you can't
const SERVICE_ID = "service_qw94oim"; //! use it for spam

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(() => {
    if (localStorage.getItem("sent")) return true;
    return false;
  });
  const form = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    if (localStorage.getItem("sent")) {
      setSent(true);
      return;
    }
    setIsLoading(true);
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      )
      .finally(() => {
        setIsLoading(false);
        setSent(true);
        localStorage.setItem("sent", true);
      });
  }

  return (
    <main className="contact-container">
      <form ref={form} onSubmit={handleSubmit} className="address-form">
        <div className="address-container">
          <header className="contact-header">
            <h1>Send me an email</h1>
            <p>My email is ericktorresagui@gmail.com</p>
          </header>
          <label htmlFor="contact-firstName" className="form-label">
            Name
            <input
              className="address-input"
              type="text"
              name="from_name"
              id="contact-firstName"
              required
            />
          </label>
          <label htmlFor="contact-email" className="form-label">
            Email
            <input
              name="reply_to"
              className="address-input"
              type="email"
              id="contact-email"
              required
            />
          </label>
          <label htmlFor="contact-area" className="form-label">
            Message
            <textarea
              className="address-input contact-area"
              name="message"
              id="contact-area"
              rows="10"
              required
            ></textarea>
          </label>
        </div>
        <button
          type="submit"
          className={`shipping-button relative${
            isLoading ? " contact-loading" : sent ? " contact-sent" : ""
          }`}
        >
          Send
        </button>
      </form>
    </main>
  );
}

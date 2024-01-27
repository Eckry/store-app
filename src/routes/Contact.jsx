import "./styles/Contact.css";

export default function Contact() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <main className="contact-container">
      <form onSubmit={handleSubmit} className="address-form">
        <div className="address-container">
          <header className="contact-header">
            <h1>Send me an email</h1>
            <p>My email is ericktorresagui@gmail.com</p>
          </header>
          <div className="address-wrapper">
            <label htmlFor="contact-firstName" className="form-label">
              First name
              <input
                className="address-input"
                type="text"
                id="contact-firstName"
              />
            </label>
            <label htmlFor="contact-lastName" className="form-label">
              Last name
              <input
                className="address-input"
                type="text"
                id="contact-lastName"
              />
            </label>
          </div>
          <label htmlFor="contact-email" className="form-label">
            Email
            <input className="address-input" type="emsail" id="contact-email" />
          </label>
          <label htmlFor="contact-area" className="form-label">
            Message
            <textarea
              className="address-input contact-area"
              name=""
              id="contact-area"
              rows="10"
            ></textarea>
          </label>
        </div>
        <button type="submit" className="shipping-button">
          Send
        </button>
      </form>
    </main>
  );
}

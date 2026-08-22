function Contact({ onBack }) {
  return (
    <div className="legal-page">
      <button
        className="legal-back"
        onClick={onBack}
      >
        ← Back to Fixora
      </button>
      <div className="legal-content">
        <p className="eyebrow">
          CONTACT FIXORA
        </p>
        <h1>
          Contact Us
        </h1>
        <p className="legal-updated">
          We would love to hear from you.
        </p>
        <section>
          <h2>Get in Touch</h2>
          <p>
            Have a question, suggestion, or
            problem with a Fixora tool?
            We would love to hear from you.
          </p>
        </section>
        <section>
          <h2>Tool Support</h2>
          <p>
            If you experience a problem while
            using Fixora, please include the
            name of the tool and a short
            description of what happened.
          </p>
        </section>
        <section>
          <h2>Suggestions</h2>
          <p>
            We are continuously improving Fixora.
            Suggestions for useful image, PDF,
            document, or file tools are welcome.
          </p>
        </section>
        <section>
          <h2>Contact Method</h2>
          <p>
            A dedicated support contact method
            will be published here as the Fixora
            support channel is finalized.
          </p>
        </section>
        <section>
          <h2>Important</h2>
          <p>
            Please do not send passwords,
            payment information, or other highly
            sensitive information when contacting
            the service.
          </p>
        </section>
      </div>
    </div>
  )
}
export default Contact

function Contact({ onBack }) {
  return (
    <div className="legal-page">
      <button
        className="legal-back"
        onClick={onBack}
      >
        ← Back to Tools
      </button>

      <div className="legal-content">
        <p className="eyebrow">
          SMARTFILE TOOLS
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
            problem with one of our tools?
            We are always happy to hear from you.
          </p>
        </section>

        <section>
          <h2>Support</h2>

          <p>
            If you experience a problem while
            using SmartFile Tools, please include
            the name of the tool and a short
            description of the problem.
          </p>
        </section>

        <section>
          <h2>Suggestions</h2>

          <p>
            We are continuously improving
            SmartFile Tools. If you have an idea
            for a useful image, PDF, or file tool,
            let us know.
          </p>
        </section>

        <section>
          <h2>Email</h2>

          <p>
            You can contact the SmartFile Tools
            team by email:
          </p>

          <p>
            <strong>
              support@smartfiletools.com
            </strong>
          </p>
        </section>
      </div>
    </div>
  )
}

export default Contact
function Contact({ onBack }) {
  return (
    <div
      className="legal-page"
      style={{
        minHeight: "100vh",
        padding: "40px 20px 100px",
      }}
    >
      <div
        className="legal-container"
        style={{
          width: "min(900px, 100%)",
          margin: "0 auto",
        }}
      >
        <button
          className="legal-back"
          onClick={onBack}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "30px",
            padding: "10px 16px",
            border: "1px solid rgba(255,255,255,.1)",
            borderRadius: "10px",
            color: "#cbd5e1",
            background: "rgba(255,255,255,.05)",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "700",
          }}
        >
          ← Back to Fixora
        </button>

        <div
          style={{
            marginBottom: "55px",
          }}
        >
          <p className="eyebrow">CONTACT FIXORA</p>

          <h1
            style={{
              margin: 0,
              color: "#f8fafc",
              fontSize: "clamp(42px, 7vw, 70px)",
              lineHeight: "1",
              letterSpacing: "-3px",
              fontWeight: "900",
            }}
          >
            Contact Us
          </h1>

          <p
            className="legal-updated"
            style={{
              maxWidth: "700px",
              marginTop: "22px",
              color: "#94a3b8",
              fontSize: "18px",
              lineHeight: "1.8",
            }}
          >
            Have a question, suggestion, or problem with a Fixora tool?
            We are always interested in hearing from you.
          </p>
        </div>

        <section>
          <h2>Get in Touch</h2>

          <p>
            Fixora is being developed to make everyday file and document tasks
            easier. If you have feedback about the website or an idea that
            could make Fixora more useful, we welcome your suggestions.
          </p>
        </section>

        <section>
          <h2>Tool Support</h2>

          <p>
            If you experience a problem while using one of our tools, please
            note the name of the tool, the type of file you were working with,
            and a short description of what happened.
          </p>

          <p>
            This information can help us understand problems and improve the
            Fixora experience.
          </p>
        </section>

        <section>
          <h2>Suggestions and Feedback</h2>

          <p>
            We are continuously working on new tools and improvements.
            Suggestions for useful image, PDF, document, or file tools are
            welcome.
          </p>

          <p>
            If there is a common file-related problem that you think Fixora
            should solve, let us know when a dedicated contact channel becomes
            available.
          </p>
        </section>

        <section>
          <h2>Privacy Questions</h2>

          <p>
            If your question concerns privacy or how Fixora handles information,
            please review our Privacy Policy for the information currently
            available about data processing, analytics, cookies, advertising,
            and browser-based file processing.
          </p>
        </section>

        <section>
          <h2>Contact Channel</h2>

          <p>
            Fixora is currently preparing its dedicated support contact channel.
            We will publish the official contact details here once the support
            channel is finalized.
          </p>

          <p>
            Until then, please do not send passwords, payment information,
            private documents, or other highly sensitive information through
            unofficial channels.
          </p>
        </section>

        <section
          style={{
            marginTop: "45px",
            padding: "28px",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,.09)",
            background:
              "linear-gradient(145deg, rgba(139,92,246,.07), rgba(255,255,255,.02))",
          }}
        >
          <p
            style={{
              margin: "0 0 8px",
              color: "#64748b",
              fontSize: "11px",
              fontWeight: "800",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            FIXORA
          </p>

          <h2
            style={{
              margin: 0,
              color: "#f8fafc",
            }}
          >
            Have an idea?
            <br />
            Help us improve Fixora.
          </h2>

          <p
            style={{
              marginBottom: 0,
              color: "#94a3b8",
              lineHeight: "1.8",
            }}
          >
            Every useful suggestion helps us build simpler tools for everyday
            file and document tasks.
          </p>
        </section>
      </div>
    </div>
  )
}

export default Contact